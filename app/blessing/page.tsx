'use client'


import { PageLayout } from "@/components/common/page-layout";
import { ChooseCardText } from "@/components/blessing/choose-card-text";
import { Stepper2 } from "@/components/blessing/stepper/stepper-2";
import { Accept } from "@/components/blessing/accept";
import { BlessingForm } from "@/components/blessing/blessing-form";
import { CuteLeftArrow } from "@/components/common/cute-left-arrow";
import { useCardStore } from "@/store/use-card-store";

import { CardPreview } from "@/components/blessing/card-preview";

export default function Blessing() {
  const { selectedCardId, senderName, blessingMessage } = useCardStore();
  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-40 z-10 relative px-8 pb-10">
        <main className="flex flex-col items-center justify-center gap-10">
          <ChooseCardText />
          <Stepper2 />
          <CardPreview className="block md:hidden" />
          <BlessingForm />
        </main>
        <div className="hidden md:block relative">
          <CardPreview />
        </div>
      </div>
      <CuteLeftArrow width={100} height={100} link="/card-selection" />
    </PageLayout>
  );
}
