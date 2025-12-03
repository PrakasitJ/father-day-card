'use client'

import Image from "next/image";
import { PageLayout } from "@/components/common/page-layout";
import { ChooseCardText } from "@/components/card-selection/choose-card-text";
import { Accept } from "@/components/card-selection/accept";
import { CuteLeftArrow } from "@/components/common/cute-left-arrow";
import { Stepper3 } from "@/components/blessing/stepper/stepper-3";
import { useCardStore } from "@/store/use-card-store";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { BanBangkhaeLink } from "@/components/main-page/banbangkhae-link";
import { ArrowRight, X } from "lucide-react";
import { WebLink } from "@/components/common/weblink";

export default function CardSelection() {
  const { selectedCardId, senderName, blessingMessage } = useCardStore();
  const cardRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);

  const handleDownload = async () => {
    if (cardRef.current) {
      try {
        const canvas = await html2canvas(cardRef.current, {
          backgroundColor: null,
          scale: 2,
        });
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "father-day-card.png";
        link.click();
        setShowModal(true);
      } catch (error) {
        console.error("Failed to download image:", error);
      }
    }
  };

  return (
    <PageLayout>
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

          <Image src={`/card/${selectedCardId}.png`} alt="Logo" width={400} height={400} priority className="rounded-2xl" />
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
        <Accept onClick={handleDownload} text="บันทึกรูป" />
        <WebLink href="/all-blessings" target="_self" className="text-[#1e3a8a] font-bold font-itim text-xl hover:underline">
          ดูคำอวยพรทั้งหมด
        </WebLink>
      </main>
      <CuteLeftArrow width={100} height={100} link="/blessing" />

      {
        showModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm cursor-pointer animate-in fade-in duration-300"
            onClick={() => setShowModal(false)}
          >
            <div className="relative animate-in zoom-in-95 duration-300">
              <button className="absolute -top-4 -right-4 z-50 bg-white text-red-500 rounded-full p-2 shadow-lg hover:bg-gray-100 transition-transform hover:scale-110">
                <X size={24} strokeWidth={3} />
              </button>
              <Image
                src="/card/card-6.png"
                alt="Thank you"
                width={500}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        )
      }
    </PageLayout >
  );
}
