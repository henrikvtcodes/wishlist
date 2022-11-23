import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createItemSchema, type CreateItemType } from "schemas/item";
import { trpc } from "utils/trpc";
import { useDrawer } from "stores/drawer";
import { ItemCategory, ItemType } from "server/db/generated";

export const CreateForm = () => {
  const { register, handleSubmit } = useForm<CreateItemType>({
    resolver: zodResolver(createItemSchema),
    mode: "onChange",
  });

  const { mutateAsync: createItem } = trpc.items.create.useMutation();

  const close = useDrawer((state) => state.closeDrawer);

  const onSubmit = handleSubmit(async (data) => {
    await createItem(data);
    close();
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
            placeholder="Item Name"
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
            placeholder="Item Name"
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
            type="text"
            {...register("price")}
            className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="0.00"
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
      </div>
    </form>
  );
};