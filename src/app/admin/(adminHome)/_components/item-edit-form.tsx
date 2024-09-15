"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import currency from "currency.js";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { ItemCard } from "~/app/(public)/[category]/_components/item-card";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Switch } from "~/components/ui/switch";
import { Textarea } from "~/components/ui/textarea";
import { useToast } from "~/components/ui/use-toast";
import { categoryToTitleMap } from "~/constants";
import { fakeDelay } from "~/lib/fakeDelay";
import {
  updateItemSchema,
  type Item,
  type UpdateItemType,
} from "~/schemas/item";
import { itemCategory, itemVendor } from "~/server/db/schema";
import { api } from "~/trpc/react";
import { itemData } from "./edit-form-utils";

type Props = {
  item: Item;
};

export function ItemEditForm({ item: initialItemData }: Props) {
  const form = useForm<UpdateItemType>({
    resolver: zodResolver(updateItemSchema),
    mode: "onChange",
    defaultValues: {
      name: initialItemData.name,
      description: initialItemData.description,
      imgUrl: initialItemData.imgUrl,
      itemUrl: initialItemData.itemUrl,
      price: currency(initialItemData.priceCents, { fromCents: true }).value,
      vendor: initialItemData.vendor,
      category: initialItemData.category,
      type: initialItemData.type,
      isClaimable: initialItemData.isClaimable,
      show: initialItemData.show,
    },
    shouldUseNativeValidation: false,
  });

  const { handleSubmit, watch } = form;

  const trpcUtils = api.useUtils();

  const { mutateAsync: updateItem } = api.items.update.useMutation();
  const { mutateAsync: deleteItem } = api.items.delete.useMutation();

  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const router = useRouter();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSubmit = useCallback(
    handleSubmit(async (data) => {
      setIsLoading(true);
      try {
        await updateItem({ itemId: initialItemData.id, data });
        await trpcUtils.items.invalidate();
      } catch (e) {
        toast({ title: "Error updating item" });
        setIsLoading(false);
        return;
      }
      toast({ title: "Item updated" });
      setIsLoading(false);
    }),
    [handleSubmit, fakeDelay],
  );

  const onDelete = useCallback(async () => {
    setIsLoading(true);
    try {
      await trpcUtils.items.one.cancel({ id: initialItemData.id });
      await deleteItem({ itemId: initialItemData.id });
      await trpcUtils.items.invalidate();
    } catch (e) {
      toast({ title: "Error deleting item" });
      setIsLoading(false);
      return;
    }
    router.push("/admin");
    toast({ title: "Item deleted" });
    setIsLoading(false);
  }, [deleteItem, initialItemData.id, router, toast, trpcUtils.items]);

  return (
    <main className="grid w-5/6 grid-cols-2">
      <section className="col-span-1 col-start-1 flex justify-center p-4 px-10 pb-10">
        <ItemCard item={itemData(initialItemData, watch)} />
      </section>
      <section className="col-span-1 col-start-2 w-full justify-center p-4">
        <h2 className="w-full text-center text-4xl font-bold">Edit Item</h2>
        <Form {...form}>
          <form className="flex w-full flex-col gap-y-2" onSubmit={onSubmit}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea className=" min-h-[200px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imgUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="itemUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex w-full justify-evenly gap-x-2">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="basis-1/2">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input className="p-[1.1rem]" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="basis-1/2">
                    <FormLabel>Price Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="base">Low</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-x-2">
              <FormField
                control={form.control}
                name="vendor"
                render={({ field }) => (
                  <FormItem className="basis-1/2">
                    <FormLabel>Vendor</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {itemVendor.enumValues.map((value, i) => (
                          <SelectItem key={i} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="basis-1/2">
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {itemCategory.enumValues.map((value, i) => (
                          <SelectItem key={i} value={value}>
                            {categoryToTitleMap.get(value)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-x-2">
              <FormField
                control={form.control}
                name="isClaimable"
                render={({ field }) => (
                  <FormItem className="flex basis-1/2 flex-row items-center justify-start rounded-lg border p-4">
                    <FormLabel className="pr-4 text-base">Claimable</FormLabel>
                    <FormControl>
                      <Switch
                        className="!my-0"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="show"
                render={({ field }) => (
                  <FormItem className="flex basis-1/2 flex-row items-center justify-start rounded-lg border p-4">
                    <FormLabel className="pr-4 text-base">Show</FormLabel>
                    <FormControl>
                      <Switch
                        className="!my-0"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-between pt-4">
              <Button size={"lg"} variant={"destructive"} onClick={onDelete}>
                Delete Item
              </Button>
              <Button size={"lg"} type="submit">
                {isLoading ? (
                  <Loader2Icon className=" h-auto w-6 animate-spin" />
                ) : (
                  "Update Item"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </main>
  );
}
