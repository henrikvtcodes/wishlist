import { NextLinkButton } from "~/components/ui/button-link";
import { ItemTable } from "./_components/item-table";

export default function Page() {
  return (
    <div className="w-full">
      <section className="flex w-full justify-end px-6 pb-4">
        <NextLinkButton variant={"outline"} href={"/admin/item"}>
          Create New Item
        </NextLinkButton>
      </section>
      <ItemTable />
    </div>
  );
}
