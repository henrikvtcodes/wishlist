import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";

import { FormErrors } from "./FormErrors";
import { trpc } from "utils/trpc";
import { useRefDrawer } from "stores/refDrawer";
import { createRefSchema, type CreateRefType } from "schemas/ref";
import { useDebounce } from "usehooks-ts";

export const CreateForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<CreateRefType>({
    resolver: zodResolver(createRefSchema),
    mode: "onChange",
    shouldUseNativeValidation: true,
  });

  const { mutateAsync: createRef } = trpc.refs.create.useMutation();

  const trpcUtils = trpc.useContext();

  const close = useRefDrawer((state) => state.closeDrawer);

  const [isLoading, setIsLoading] = useState(false);

  const [value, setValue] = useState<string>("");

  const debouncedRef = useDebounce<string>(value, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const { data: refExists, refetch } = trpc.refs.refExists.useQuery(
    {
      ref: debouncedRef,
    },
    {
      onSuccess: (refExists) => {
        if (refExists) {
          setError("ref", {
            type: "manual",
            message: "Ref already exists",
          });
        } else if (!refExists) {
          clearErrors("ref");
        }
      },
    }
  );

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    await createRef(data);
    trpcUtils.refs.invalidate();
    close();
    setIsLoading(false);
  });

  useEffect(() => {
    refetch();
  }, [debouncedRef, refetch]);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-y-4">
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
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Ref
        </label>
        <div className="mt-1">
          <input
            type={"text"}
            {...register("ref")}
            value={value}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Ref"
          />
          {refExists !== undefined &&
            (refExists ? (
              <span className="text-sm font-medium text-red-600">
                Referrer Invalid
              </span>
            ) : (
              <span className="text-sm font-medium text-green-600">
                Referrer Valid
              </span>
            ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? <span className=" italic">Loading</span> : "Create Ref"}
        </button>
      </div>

      <FormErrors errors={errors} />
    </form>
  );
};
