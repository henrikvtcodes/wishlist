import { AdminTabs } from "components/Admin/AdminTabs";
import { AdminLayout } from "layouts/Admin";
import { NextSeo } from "next-seo";

const Page = () => {
  return (
    <AdminLayout>
      <NextSeo title="Admin Home" noindex />
      <h1 className="mt-4 py-4 px-8 text-4xl font-semibold">Admin Home</h1>
      <AdminTabs />
    </AdminLayout>
  );
};

export default Page;
