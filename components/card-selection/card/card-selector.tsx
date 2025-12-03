"use client";

import { CardSelectorWrapper } from "./card-selector-wrapper";
import { Card1 } from "./card1";
import { Card2 } from "./card2";
import { Card3 } from "./card3";
import { Card4 } from "./card4";
import { Card5 } from "./card5";
import { useCardStore } from "@/store/use-card-store";

const CARDS = [
    { id: "card-1", component: Card1 },
    { id: "card-2", component: Card2 },
    { id: "card-3", component: Card3 },
    { id: "card-4", component: Card4 },
    { id: "card-5", component: Card5 }
];

export function CardSelector() {
    const { selectedCardId, setSelectedCardId } = useCardStore();

    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {CARDS.map((card) => (
                <CardSelectorWrapper
                    key={card.id}
                    isSelected={selectedCardId === card.id}
                    onSelect={() => setSelectedCardId(card.id)}
                >
                    <card.component width={200} height={200} />
                </CardSelectorWrapper>
            ))}
        </div>
    );
}