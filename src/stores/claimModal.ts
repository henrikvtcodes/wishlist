import { create } from "zustand";
import { devtools } from "zustand/middleware";

type ClaimContext = {
  refId: string;
  itemId: string;
};

interface ClaimModalData {
  ctx: ClaimContext | null;
}

interface ClaimModalActions {
  openModal: (ctx: ClaimContext) => void;
  closeModal: () => void;
}

export const useClaimModal = create<ClaimModalData & ClaimModalActions>()(
  devtools((set) => ({
    ctx: null,

    openModal: (ctx) => set({ ctx }),
    closeModal: () => set({ ctx: null }),
  })),
);
