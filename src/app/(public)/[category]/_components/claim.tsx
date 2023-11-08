"use client";

import { Loader2Icon } from "lucide-react";
import { useMemo } from "react";
import { useIsClient } from "usehooks-ts";

import { Button } from "~/components/ui/button";
import { type Item } from "~/schemas/item";
import { useClaimModal } from "~/stores/claimModal";
import { useStoredUser } from "~/stores/storedUser";
import { api } from "~/trpc/react";

type Props = {
  item: Item;
};

export default function ClaimButton({ item }: Props) {
  const openClaimModal = useClaimModal((state) => state.openModal);
  const loading = useClaimModal((state) => state.claimButtonLoading);
  const setLoading = useClaimModal((state) => state.setClaimBtnLoading);

  const currentUser = useStoredUser((state) => state.user);

  const { data } = api.items.checkClaimed.useQuery(
    { id: item.id },
    {
      initialData: {
        claimed: item.isClaimed,
      },
    },
  );

  const isDisabled = useMemo(
    () => !item.isClaimable || !currentUser || data.claimed,
    [item, currentUser, data],
  );

  const isClient = useIsClient();
  if (!isClient) return null;

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
        <Loader2Icon className=" h-auto w-6 animate-spin" />
      ) : item.isClaimable ? (
        data.claimed ? (
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
