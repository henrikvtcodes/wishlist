import dynamic from "next/dynamic";

// import { ItemTable } from "components/Admin/ItemTable";
import { AdminLayout } from "layouts/Admin";

const ItemTable = dynamic(
  () => import("components/Admin/ItemTable").then((value) => value.ItemTable),
  {
    ssr: false,
  }
);

const ItemDrawer = dynamic(
  () => import("components/Admin/Drawer").then((value) => value.ItemDrawer),
  {
    ssr: false,
  }
);

const Page = () => {
  return (
    <AdminLayout>
      <ItemDrawer />
      <h1 className="py-8 px-8 text-4xl font-semibold"> Admin Home</h1>
      <ItemTable />
    </AdminLayout>
  );
};

export default Page;
