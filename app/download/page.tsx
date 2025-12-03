'use client'

import Image from "next/image";
import { PageLayout } from "@/components/common/page-layout";
import { ChooseCardText } from "@/components/card-selection/choose-card-text";
import { Accept } from "@/components/card-selection/accept";
import { CuteLeftArrow } from "@/components/common/cute-left-arrow";
import { Stepper3 } from "@/components/blessing/stepper/stepper-3";
import { useCardStore } from "@/store/use-card-store";

import { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import { BanBangkhaeLink } from "@/components/main-page/banbangkhae-link";
import { ArrowRight, X, Loader2 } from "lucide-react";
import { WebLink } from "@/components/common/weblink";
import { saveAs } from 'file-saver';

export default function CardSelection() {
  const { selectedCardId, senderName, blessingMessage } = useCardStore();
  const cardRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Listen for message from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'CARD_CANVAS_READY') {
        setIframeLoaded(true);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleDownload = async () => {
    if (!isGenerating) {
      setIsGenerating(true);
      try {
        // Wait for iframe to be ready if it's not already
        if (!iframeLoaded) {
          // Wait up to 5 seconds
          for (let i = 0; i < 50; i++) {
            await new Promise(resolve => setTimeout(resolve, 100));
            if (iframeLoaded) break;
          }
        }

        // Add a small delay to allow the UI to update
        await new Promise(resolve => setTimeout(resolve, 100));

        const iframe = document.getElementById('card-canvas-iframe') as HTMLIFrameElement;
        if (!iframe || !iframe.contentWindow) {
          throw new Error("Iframe not found");
        }

        const iframeBody = iframe.contentWindow.document.body;
        const cardContainer = iframeBody.querySelector('#card-canvas-container') as HTMLElement;

        if (!cardContainer) {
          throw new Error("Card container not found in iframe");
        }

        // Capture the iframe content
        // Capture the iframe content
        // Capture the iframe content
        // Capture the iframe content
        const canvas = await html2canvas(cardContainer, {
          backgroundColor: null,
          scale: 1, // Already at high res (1200x1600px)
          useCORS: true,
          width: 1200,
          height: 1600,
          windowWidth: 1200,
          windowHeight: 1600,
        });

        const dataUrl = canvas.toDataURL("image/png");
        setGeneratedImage(dataUrl);

        // Try to save automatically
        try {
          canvas.toBlob((blob) => {
            if (blob) {
              saveAs(blob, "father-day-card.png");
            }
          });
        } catch (e) {
          console.warn("Auto-save failed, falling back to modal", e);
        }

        setShowModal(true);
      } catch (error) {
        console.error("Failed to download image:", error);
        alert("ขออภัย เกิดข้อผิดพลาดในการสร้างรูปภาพ กรุณาลองใหม่อีกครั้ง");
      } finally {
        setIsGenerating(false);
      }
    }
  };

  // Construct URL for the iframe
  const canvasUrl = `/card-canvas?cardId=${encodeURIComponent(selectedCardId)}&senderName=${encodeURIComponent(senderName)}&blessingMessage=${encodeURIComponent(blessingMessage)}`;

  return (
    <PageLayout>
      {/* Invisible Iframe for Capture */}
      <iframe
        id="card-canvas-iframe"
        src={canvasUrl}
        className="fixed top-0 left-0 w-[1200px] h-[1600px] -z-50 opacity-0 pointer-events-none"
        style={{ border: 'none' }}
      />

      <main className="flex flex-col w-full h-full items-center justify-center gap-4 z-10 relative">
        <ChooseCardText />
        <Stepper3 />
        <div className="relative z-10" ref={cardRef}>
          <BanBangkhaeLink />
          <div className="flex items-center gap-2 fixed top-4 right-4 md:top-20 md:right-20 z-50">
            <ArrowRight width={20} height={20} />
            <WebLink href="/" target="_self" rel="noopener noreferrer" className="text-black font-prompt">
              <span className="font-bold">กลับสู่หน้าแรก</span>
            </WebLink>
          </div>

          <Image src={`/card/${selectedCardId}.png`} alt="Logo" width={300} height={400} priority className="rounded-2xl" />
          <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
            <p className="text-2xl font-bold text-[#333333] font-itim whitespace-pre-wrap wrap-break-word w-[280px]">{blessingMessage}</p>
          </div>
          <div className="absolute bottom-12 left-0 w-full text-center px-12">
            <p className="text-xl font-bold text-[#333333] font-itim wrap-break-word">
              {(() => {
                const parts = senderName.split(" ");
                if (parts.length <= 2) {
                  return parts.join("\n");
                }
                const firstName = parts[0];
                const lastName = parts[parts.length - 1];
                const middleNames = parts.slice(1, parts.length - 1).join(" ");
                return `${firstName}\n${middleNames}\n${lastName}`;
              })()}
            </p>
          </div>
        </div>
        <Accept onClick={handleDownload} text={isGenerating ? "กำลังสร้างรูป..." : "บันทึกรูป"} />
        <WebLink href="/all-blessings" target="_self" className="text-[#1e3a8a] font-bold font-itim text-xl hover:underline">
          ดูคำอวยพรทั้งหมด
        </WebLink>
      </main>
      <CuteLeftArrow width={100} height={100} link="/blessing" />

      {/* Loading Overlay */}
      {isGenerating && (
        <div className="fixed inset-0 z-60 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl flex flex-col items-center gap-4 shadow-xl animate-in zoom-in-95">
            <Loader2 className="w-12 h-12 text-[#ffb830] animate-spin" />
            <p className="text-xl font-bold text-[#1e3a8a] font-itim">กำลังจัดเตรียมการ์ด...</p>
          </div>
        </div>
      )}

      {
        showModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm cursor-pointer animate-in fade-in duration-300"
            onClick={() => setShowModal(false)}
          >
            <div className="relative animate-in zoom-in-95 duration-300 flex flex-col items-center gap-4 p-4">
              <button className="absolute -top-4 -right-4 z-50 bg-white text-red-500 rounded-full p-2 shadow-lg hover:bg-gray-100 transition-transform hover:scale-110">
                <X size={24} strokeWidth={3} />
              </button>
              {generatedImage ? (
                <>
                  <img
                    src={generatedImage}
                    alt="Generated Card"
                    className="max-w-[500px] max-h-[70vh] w-auto h-auto rounded-2xl shadow-2xl object-contain"
                  />
                  <p className="text-white font-bold text-lg text-center bg-black/50 p-2 rounded-lg">
                    บันทึกรูปเรียบร้อย! <br /> (หากรูปไม่ขึ้น ให้กดค้างที่รูปเพื่อบันทึก)
                  </p>
                </>
              ) : (
                <Image
                  src="/card/card-6.png"
                  alt="Thank you"
                  width={375}
                  height={500}
                  className="rounded-2xl shadow-2xl"
                />
              )}
            </div>
          </div>
        )
      }
    </PageLayout >
  );
}
