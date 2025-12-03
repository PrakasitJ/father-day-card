import { PageLayout } from "@/components/common/page-layout";
import { ChooseCardText } from "@/components/card-selection/choose-card-text";
import { Stepper1 } from "@/components/card-selection/stepper/stepper-1";
import { Accept } from "@/components/card-selection/accept";
import { CardSelector } from "@/components/card-selection/card/card-selector";
import { CuteLeftArrow } from "@/components/common/cute-left-arrow";

export default function CardSelection() {
  return (
    <PageLayout>
      <main className="flex flex-col w-full h-full items-center justify-center gap-20 z-10 relative px-8 pb-10">
        <ChooseCardText />
        <Stepper1 />
        <CardSelector />
        <Accept href="/blessing" />
      </main>
      <CuteLeftArrow width={100} height={100} link="/" />
    </PageLayout>
  );
}
