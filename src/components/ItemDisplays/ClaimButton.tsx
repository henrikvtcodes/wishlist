import clsx from "clsx";
import { useClaimModal } from "stores/claimModal";
import { useStoredUser } from "stores/storedUser";

export const ClaimButton = ({
  id,
  claimable = true,
  isClaimed,
  className,
}: {
  id: string;
  claimable: boolean;
  isClaimed: boolean;
  className?: string;
}) => {
  const refId = useStoredUser((state) => state.user?.id);
  const openModal = useClaimModal((state) => state.openModal);

  if (!refId) {
    return <></>;
  }

  if (!claimable) {
    return (
      <span className={`btn-grey cursor-not-allowed italic ${className}`}>
        Item Not Claimable
      </span>
    );
  }

  return (
    <button
      onClick={() => openModal({ itemId: id, refId })}
      className={clsx(`btn-grey ${className}`, isClaimed && "italic")}
      disabled={isClaimed}
    >
      <span className="mx-auto">
        {isClaimed ? "Item Already Claimed" : "Claim Item"}
      </span>
    </button>
  );
};
