import currency from "currency.js";
import { NextLinkButton } from "~/components/ui/button-link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { api } from "~/trpc/server";

export async function ItemTable() {
  const items = await api.items.all.query();

  return (
    <main className="w-full px-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="w-20">Price</TableHead>
            <TableHead className="w-26">Vendor</TableHead>
            <TableHead className="text-left">Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Claimable</TableHead>
            <TableHead>Claimed</TableHead>
            <TableHead className="w-16 sr-only">Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id} className="">
              <TableCell>{item.name}</TableCell>
              <TableCell>
                {currency(item.priceCents, { fromCents: true }).format()}
              </TableCell>
              <TableCell>{item.vendor}</TableCell>
              <TableCell className="text-left">{item.category}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.isClaimable ? "Yes" : "No"}</TableCell>
              <TableCell>{item.isClaimed ? "Yes" : "No"}</TableCell>
              <TableCell>
                <NextLinkButton
                  variant={"link"}
                  href={`/admin/item/${item.id}`}
                >
                  Edit
                </NextLinkButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
