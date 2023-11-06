import { notFound } from "next/navigation";
import { api } from "~/trpc/server";
import { ItemEditForm } from "../../_components/item-edit-form";

type Props = {
  params: {
    itemId: string;
  };
};

export default async function Page({ params }: Props) {
  const item = await api.items.one.query({ id: params.itemId });
  if (!item) notFound();
  return (
    <div className="w-full flex justify-center">
      <ItemEditForm item={item} />
    </div>
  );
}
