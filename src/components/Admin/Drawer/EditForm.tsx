import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Item } from "server/db/generated";
import { ItemCategory, ItemType } from "server/db/generated";
import currency from "currency.js";

import { updateItemSchema, type UpdateItemType } from "schemas/item";
import { trpc } from "utils/trpc";
import { useDrawer } from "stores/drawer";
import { LargeItemCard } from "components/ItemDisplays/LargeItemCard";
import type { ItemPick } from "components/ItemDisplays/ItemCard";
import { ItemCard } from "components/ItemDisplays/ItemCard";
import { FormErrors } from "./FormErrors";
import { itemData } from "./utils";

export const EditForm = ({
  id,
  item,
}: {
  id: string;
  item: ItemPick & Pick<Item, "category" | "type">;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UpdateItemType>({
    resolver: zodResolver(updateItemSchema),
    mode: "onChange",
    defaultValues: {
      name: item.name,
      description: item.description,
      imgUrl: item.imgUrl,
      itemUrl: item.itemUrl,
      price: currency(item.priceCents, { fromCents: true }).value,
      vendor: item.vendor,
      category: item.category,
      type: item.type,
    },
    shouldUseNativeValidation: true,
  });

  const trpcUtils = trpc.useContext();

  const { mutateAsync: updateItem } = trpc.items.update.useMutation();
  const { mutateAsync: deleteItem } = trpc.items.delete.useMutation();

  const close = useDrawer((state) => state.closeDrawer);

  const onSubmit = handleSubmit(async (data) => {
    await updateItem({ itemId: id, data });
    trpcUtils.items.invalidate();
    close();
  });

  const onDelete = async () => {
    trpcUtils.items.one.cancel({ id });
    await deleteItem({ itemId: id });
    trpcUtils.items.invalidate();
    close();
  };

  return (
    <>
      <h3 className="mb-2 text-lg font-medium">Preview</h3>
      {item &&
        (item.type === ItemType.LARGE ? (
          <LargeItemCard item={itemData(item, watch)} sizingOverride />
        ) : (
          <ItemCard item={itemData(item, watch)} sizingOverride />
        ))}

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
              maxLength={256}
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

        <div className="flex justify-between">
          <button type="submit" className="btn">
            Update Item
          </button>

          <button type="button" className="btn-danger" onClick={onDelete}>
            Delete Item
          </button>
        </div>

        <FormErrors errors={errors} />
      </form>
    </>
  );
};

export const EditFormWrapper = ({ id }: { id: string }) => {
  const { data: item } = trpc.items.one.useQuery({ id });

  return item ? (
    <EditForm id={id} item={item} />
  ) : (
    <span className="text-md font-semibold">Loading..</span>
  );
};
