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
import { UrlCopyBox } from "./copy-box";

export async function RefTable() {
  const refs = await api.refs.all.query();

  return (
    <main className="w-full px-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="">Code</TableHead>
            <TableHead className="">Copy</TableHead>
            <TableHead className="w-16 sr-only">Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {refs.map((ref) => (
            <TableRow key={ref.id} className="">
              <TableCell>{ref.name}</TableCell>
              <TableCell>{ref.ref}</TableCell>
              <TableCell>
                <UrlCopyBox userRef={ref.ref} />
              </TableCell>

              <TableCell>
                <NextLinkButton variant={"link"} href={`/admin/refs/${ref.id}`}>
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
