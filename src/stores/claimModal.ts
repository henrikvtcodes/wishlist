import { create } from "zustand";
import { devtools } from "zustand/middleware";

type ClaimContext = {
  refId: string;
  itemId: string;
  itemName: string;
};

interface ClaimModalData {
  ctx: ClaimContext | null;
  claimButtonLoading: boolean;
}

interface ClaimModalActions {
  openModal: (ctx: ClaimContext) => void;
  closeModal: () => void;
  setClaimBtnLoading: (loading: boolean) => void;
}

export const useClaimModal = create<ClaimModalData & ClaimModalActions>()(
  devtools((set) => ({
    ctx: null,
    claimButtonLoading: false,

    openModal: (ctx) => set({ ctx }),
    closeModal: () => set({ ctx: null }),
    setClaimBtnLoading: (claimButtonLoading) => set({ claimButtonLoading }),
  })),
);
