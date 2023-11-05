"use client";

import { Loader2Icon } from "lucide-react";
import { useMemo } from "react";
import { Button } from "~/components/ui/button";
import { type Item } from "~/schemas/item";
import { useClaimModal } from "~/stores/claimModal";
import { useStoredUser } from "~/stores/storedUser";

type Props = {
  item: Item;
};

export default function ClaimButton({ item }: Props) {
  const openClaimModal = useClaimModal((state) => state.openModal);
  const loading = useClaimModal((state) => state.claimButtonLoading);
  const setLoading = useClaimModal((state) => state.setClaimBtnLoading);

  const currentUser = useStoredUser((state) => state.user);

  const isDisabled = useMemo(
    () => !item.isClaimable || item.isClaimed || !currentUser,
    [item, currentUser],
  );

  return (
    <Button
      variant={"default"}
      className="w-full"
      size={"lg"}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      onClick={() => {
        if (!currentUser) return;
        setLoading(true);
        openClaimModal({
          refId: currentUser.id,
          itemId: item.id,
          itemName: item.name,
        });
      }}
      title={
        !currentUser
          ? "Henrik can send you a special link that will allow you log in."
          : undefined
      }
    >
      {loading ? (
        <Loader2Icon className=" animate-spin w-6 h-auto" />
      ) : item.isClaimable ? (
        item.isClaimed ? (
          "Item Claimed"
        ) : !currentUser ? (
          "Login to claim"
        ) : (
          "Claim Item"
        )
      ) : (
        "Item not claimable"
      )}
    </Button>
  );
}