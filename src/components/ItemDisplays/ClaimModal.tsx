import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { useClaimModal } from "stores/claimModal";
import { useStoredUser } from "stores/storedUser";
import { trpc } from "utils/trpc";
import clsx from "clsx";

export const ClaimModal = () => {
  const { ctx, closeModal } = useClaimModal((state) => state);
  const user = useStoredUser((state) => state.user);

  const cancelButtonRef = useRef(null);

  const { data: item } = trpc.items.one.useQuery(
    { id: ctx?.itemId ? ctx.itemId : "" },
    {
      enabled: ctx?.itemId !== undefined,
    }
  );

  const { mutateAsync: claimItem } = trpc.items.claim.useMutation();

  const trpcUtils = trpc.useContext();

  const [isLoading, setIsLoading] = useState(false);

  const handleClaim = async () => {
    if (!ctx?.itemId || !ctx?.refId) {
      return;
    }
    setIsLoading(true);
    await claimItem({
      id: ctx.itemId,
      refId: ctx.refId,
    });
    trpcUtils.items.invalidate();
    setIsLoading(false);
    closeModal();
  };

  return (
    <Transition.Root show={ctx !== null} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Claim Item
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Hi, <span className="font-medium">{user?.name}</span>!
                        Are you sure you want to mark{" "}
                        <span className="font-medium">{item?.name}</span> as
                        purchased?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className={clsx(
                      "inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm",
                      isLoading && "cursor-wait"
                    )}
                    disabled={isLoading}
                    onClick={handleClaim}
                  >
                    {isLoading ? (
                      <span className="italic">Loading...</span>
                    ) : (
                      "Claim as Purchased"
                    )}
                  </button>
                  <button
                    type="button"
                    className={clsx(
                      "mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm",
                      isLoading && "cursor-wait"
                    )}
                    onClick={() => closeModal()}
                    disabled={isLoading}
                    ref={cancelButtonRef}
                  >
                    {isLoading ? (
                      <span className="italic">Loading...</span>
                    ) : (
                      "Cancel"
                    )}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
