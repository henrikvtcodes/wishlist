import { SignInOut } from "components/SignInOutBox";
import { AdminLayout } from "layouts/Admin";
import { useSession } from "next-auth/react";
import { NextSeo } from "next-seo";

const Page = () => {
  const { data: session, status } = useSession();

  return (
    <AdminLayout requireAuth={false}>
      <NextSeo title="Admin" noindex />
      <main className="flex h-screen w-full flex-col items-center justify-center">
        <nav className="w-fit rounded bg-gray-200 p-4 shadow-md">
          {status === "loading" ? (
            <p>Loading...</p>
          ) : (
            <SignInOut session={session} status={status} />
          )}
        </nav>
      </main>
    </AdminLayout>
  );
};

export default Page;
