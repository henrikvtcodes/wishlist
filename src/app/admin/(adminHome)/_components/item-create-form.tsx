"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

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
import { updateItemSchema, type CreateItemType } from "~/schemas/item";
import { itemCategory, itemVendor } from "~/server/db/schema";
import { api } from "~/trpc/react";

export function ItemCreateForm() {
  const form = useForm<CreateItemType>({
    resolver: zodResolver(updateItemSchema),
    mode: "onChange",
    defaultValues: {
      isClaimable: true,
    },
    shouldUseNativeValidation: false,

    reValidateMode: "onChange",
  });

  const { handleSubmit } = form;

  const trpcUtils = api.useUtils();

  const { mutateAsync: createItem } = api.items.create.useMutation();

  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const router = useRouter();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSubmit = useCallback(
    handleSubmit(async (data) => {
      setIsLoading(true);
      const newItem = await createItem(data);
      void trpcUtils.items.invalidate();
      if (newItem.id && newItem.id.length > 0)
        router.push(`/admin/items/${newItem.id}`);
      toast({ title: "Item create" });
      setIsLoading(false);
    }),
    [handleSubmit, createItem, router, toast, trpcUtils.items],
  );

  return (
    <main className="w-1/2">
      <section className="p-4">
        <h2 className="w-full text-center text-4xl font-bold">Create Item</h2>
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
                          <SelectValue placeholder="Select Price Type" />
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
                          <SelectValue placeholder="Select a Vendor" />
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
                          <SelectValue placeholder="Select Category" />
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

            <FormField
              control={form.control}
              name="isClaimable"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-start rounded-lg border p-4">
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

            <div className="flex justify-between pt-4">
              <Button size={"lg"} type="submit">
                {isLoading ? (
                  <Loader2Icon className=" h-auto w-6 animate-spin" />
                ) : (
                  "Create Item"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </main>
  );
}
