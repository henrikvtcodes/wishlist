import dynamic from "next/dynamic";
import { NextSeo } from "next-seo";

import { AdminTabs } from "components/Admin/AdminTabs";
import { AdminLayout } from "layouts/Admin";

const RefDrawer = dynamic(
  () => import("components/Admin/RefDrawer").then((value) => value.RefDrawer),
  {
    ssr: false,
  }
);

const RefTable = dynamic(
  () => import("components/Admin/RefTable").then((value) => value.RefTable),
  {
    ssr: false,
  }
);

const Page = () => {
  return (
    <AdminLayout>
      <RefDrawer />
      <NextSeo title="Admin Home" noindex />
      <h1 className="py-4 px-8 pt-4 text-4xl font-semibold">Admin Home</h1>
      <AdminTabs />
      <RefTable />
    </AdminLayout>
  );
};

export default Page;
