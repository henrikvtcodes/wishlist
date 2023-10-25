import { getServerAuthSession } from "~/server/auth";
import { SignInCard } from "./SignInCard";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return session ? (
    <>{children}</>
  ) : (
    <div className="grid min-h-screen w-screen place-content-center">
      <SignInCard />
    </div>
  );
}
