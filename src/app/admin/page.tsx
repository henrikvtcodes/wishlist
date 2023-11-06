import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/server/auth";
import { SignInCard } from "./SignInCard";

export default async function Page() {
  const session = await getServerAuthSession();
  if (session) redirect("/admin/home");

  return (
    <>
      <SignInCard />
    </>
  );
}
