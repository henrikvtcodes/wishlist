import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Referrers } from "server/db/generated";

import { updateRefSchema, type UpdateRefType } from "schemas/ref";
import { trpc } from "utils/trpc";
import { useRefDrawer } from "stores/refDrawer";
import { FormErrors } from "./FormErrors";
import { useState } from "react";

export const EditForm = ({ id, item }: { id: string; item: Referrers }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateRefType>({
    resolver: zodResolver(updateRefSchema),
    mode: "onChange",
    defaultValues: {
      name: item.name,
      ref: item.ref,
    },
    shouldUseNativeValidation: true,
  });

  const trpcUtils = trpc.useContext();

  const { mutateAsync: updateRef } = trpc.refs.update.useMutation();
  const { mutateAsync: deleteRef } = trpc.refs.delete.useMutation();

  const close = useRefDrawer((state) => state.closeDrawer);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    await updateRef({ refId: id, data });
    trpcUtils.refs.invalidate();
    close();
    setIsLoading(false);
  });

  const onDelete = async () => {
    setIsLoading(true);
    trpcUtils.refs.get.cancel({ id });
    await deleteRef({ refId: id });
    trpcUtils.refs.invalidate();
    close();
    setIsLoading(false);
  };

  return (
    <>
      <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <div className="mt-1">
            <input
              type={"text"}
              {...register("name")}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Ref Name"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Ref</label>
          <input
            type="text"
            disabled
            defaultValue={item.ref}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div className="flex justify-between">
          <button type="submit" className="btn" disabled={isLoading}>
            {isLoading ? (
              <span className=" italic">Loading</span>
            ) : (
              "Update Ref"
            )}
          </button>

          <button
            type="button"
            className="btn-danger"
            onClick={onDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className=" italic">Loading</span>
            ) : (
              "Delete Ref"
            )}
          </button>
        </div>

        <FormErrors errors={errors} />
      </form>
    </>
  );
};

export const EditFormWrapper = ({ id }: { id: string }) => {
  const { data: item } = trpc.refs.get.useQuery({ id });

  return item ? (
    <EditForm id={id} item={item} />
  ) : (
    <span className="text-md font-semibold">Loading..</span>
  );
};
