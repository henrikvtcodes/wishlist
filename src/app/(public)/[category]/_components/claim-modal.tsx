"use client";

import { useCallback } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { useClaimModal } from "~/stores/claimModal";
import { useStoredUser } from "~/stores/storedUser";

export function ClaimModal() {
  const claimCtx = useClaimModal((state) => state.ctx);
  const closeModal = useClaimModal((state) => state.closeModal);
  const setLoading = useClaimModal((state) => state.setClaimBtnLoading);

  const currentUser = useStoredUser((state) => state.user);

  const onOpenChange = useCallback(
    (isOpen: boolean) => {
      if (!isOpen) {
        closeModal();
        setLoading(false);
      }
    },
    [closeModal, setLoading],
  );

  if (!currentUser) {
    return null;
  }

  return (
    <Dialog open={claimCtx !== null} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Claim Item</DialogTitle>
          <DialogDescription>
            Hi <span className="font-semibold">{currentUser.name}</span>. Are
            you sure you want to claim{" "}
            <span className="font-semibold">{claimCtx?.itemName}</span>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant={"outline"} onClick={closeModal}>
            Nevermind
          </Button>
          <Button variant={"default"}>Confirm Claim</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
