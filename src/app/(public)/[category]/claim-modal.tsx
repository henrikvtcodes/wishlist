"use client";

import { Loader2Icon } from "lucide-react";
import { useCallback, useState } from "react";

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
import { api } from "~/trpc/react";

export function ClaimModal() {
  const claimCtx = useClaimModal((state) => state.ctx);
  const closeModal = useClaimModal((state) => state.closeModal);
  const setClaimCardBtnLoading = useClaimModal(
    (state) => state.setClaimBtnLoading,
  );
  const currentUser = useStoredUser((state) => state.user);
  const [isClaiming, setIsClaiming] = useState(false);

  const { mutateAsync } = api.items.claim.useMutation();

  const onOpenChange = useCallback(
    (isOpen: boolean) => {
      if (!isOpen) {
        closeModal();
        setClaimCardBtnLoading(false);
      }
    },
    [closeModal, setClaimCardBtnLoading],
  );

  const onClaim = useCallback(async () => {
    setIsClaiming(true);
    if (!currentUser || !claimCtx) return;
    await mutateAsync({
      id: claimCtx.itemId,
      refId: currentUser.id,
    });
    setIsClaiming(false);
    closeModal();
    setClaimCardBtnLoading(false);
  }, [claimCtx, closeModal, currentUser, mutateAsync, setClaimCardBtnLoading]);

  if (!currentUser) {
    return <></>;
  }

  return (
    <Dialog open={claimCtx !== null} onOpenChange={onOpenChange}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Claim Item</DialogTitle>
          <DialogDescription>
            Hi <span className="font-semibold">{currentUser.name}</span>. Are
            you sure you want to claim{" "}
            <span className="font-semibold">{claimCtx?.itemName}</span>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-y-2">
          <Button
            variant={"outline"}
            onClick={() => {
              closeModal();
              setClaimCardBtnLoading(false);
            }}
          >
            Nevermind
          </Button>
          <Button
            onClick={onClaim}
            variant={"default"}
            className=" transition-all duration-200 ease-in-out"
            aria-disabled={isClaiming}
            disabled={isClaiming}
          >
            {isClaiming ? (
              <Loader2Icon className=" h-auto w-6 animate-spin" />
            ) : (
              "Confirm Claim"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
