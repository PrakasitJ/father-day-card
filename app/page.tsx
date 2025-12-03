import Image from "next/image";
import { BanBangkhaeLink } from "@/components/main-page/banbangkhae-link";
import { Happyfatherday } from "@/components/main-page/happyfatherday";
import { InviteText } from "@/components/main-page/invite-text";
import { StartWritingButton } from "@/components/main-page/start-writing-button";
import { GlassBottom } from "@/components/main-page/glass-bottom";
import { Butterfly } from "@/components/main-page/butterfly";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#bfe7fc] font-sans dark:bg-black relative overflow-hidden">
      <Image
        src="/cloud-bg.svg"
        alt="Background"
        fill
        priority
        className="object-cover object-center z-0"
        quality={100}
      />
      <Butterfly />
      <main className="flex flex-col w-full h-full items-center justify-center gap-20 z-10 relative">
        <BanBangkhaeLink />
        <Happyfatherday />
        <InviteText />
        <StartWritingButton />
      </main>
      <GlassBottom />
    </div>
  );
}
