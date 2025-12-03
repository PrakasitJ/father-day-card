import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface CardState {
    selectedCardId: string
    setSelectedCardId: (id: string) => void
    senderName: string
    setSenderName: (name: string) => void
    blessingMessage: string
    setBlessingMessage: (message: string) => void
}

export const useCardStore = create(persist<CardState>((set) => ({
    selectedCardId: 'card-1',
    setSelectedCardId: (id) => set({ selectedCardId: id }),
    senderName: '',
    setSenderName: (name) => set({ senderName: name }),
    blessingMessage: '',
    setBlessingMessage: (message) => set({ blessingMessage: message }),
}), {
    name: 'card-store',
    storage: createJSONStorage(() => localStorage),
}))
