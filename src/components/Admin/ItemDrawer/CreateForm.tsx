import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createItemSchema, type CreateItemType } from "schemas/item";

import { ItemCategory, ItemType, ItemVendor } from "server/db/generated";
import { FormErrors } from "./FormErrors";
import { trpc } from "utils/trpc";
import { useItemDrawer } from "stores/itemDrawer";
import { useState } from "react";

export const CreateForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateItemType>({
    resolver: zodResolver(createItemSchema),
    mode: "onChange",
    shouldUseNativeValidation: true,
  });

  const { mutateAsync: createItem } = trpc.items.create.useMutation();

  const trpcUtils = trpc.useContext();

  const close = useItemDrawer((state) => state.closeDrawer);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    await createItem(data);
    trpcUtils.items.invalidate();
    close();
    setIsLoading(false);
  });

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
            placeholder="Item Name"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <div className="mt-1">
          <textarea
            rows={6}
            {...register("description")}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="imgUrl"
          className="block text-sm font-medium text-gray-700"
        >
          Image URL
        </label>
        <div className="mt-1">
          <input
            type={"text"}
            {...register("imgUrl")}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Image URL"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="itemUrl"
          className="block text-sm font-medium text-gray-700"
        >
          Item URL
        </label>
        <div className="mt-1">
          <input
            type={"text"}
            {...register("itemUrl")}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Item URL"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            min={0}
            step={0.01}
            {...register("price")}
            className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            aria-describedby="price-currency"
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-gray-500 sm:text-sm" id="price-currency">
              USD
            </span>
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <select
          {...register("category")}
          className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
        >
          <option value={ItemCategory.tech}>Technology & Electronics</option>
          <option value={ItemCategory.tools}>Tools</option>
          <option value={ItemCategory.clothing}>Clothing</option>
          <option value={ItemCategory.legos}>Lego</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="type"
          className="block text-sm font-medium text-gray-700"
        >
          Type
        </label>
        <select
          {...register("type")}
          className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
        >
          <option value={ItemType.SMALL}>Small {"($0-$50)"}</option>
          <option value={ItemType.MEDIUM}>Medium {"($51-$100)"}</option>
          <option value={ItemType.LARGE}>Large {"($101-$150+)"}</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="vendor"
          className="block text-sm font-medium text-gray-700"
        >
          Vendor
        </label>
        <select
          {...register("vendor")}
          className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
        >
          <option value={ItemVendor.Amazon}>Amazon</option>
          <option value={ItemVendor.BHPhoto}>B & H Photo Video</option>
          <option value={ItemVendor.HomeDepot}>HomeDepot</option>
          <option value={ItemVendor.Lego}>Lego</option>
          <option value={ItemVendor.Other}>Other</option>
        </select>
      </div>

      <div className="flex justify-between">
        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? <span className=" italic">Loading</span> : "Create Item"}
        </button>
      </div>

      <FormErrors errors={errors} />
    </form>
  );
};
