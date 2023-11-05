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
  }, [claimCtx, currentUser, mutateAsync]);

  if (!currentUser) {
    return <></>;
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
            className=" transition-all ease-in-out duration-200"
            aria-disabled={isClaiming}
            disabled={isClaiming}
          >
            {isClaiming ? (
              <Loader2Icon className=" animate-spin w-6 h-auto" />
            ) : (
              "Confirm Claim"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}