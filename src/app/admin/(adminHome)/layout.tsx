import { type ReactNode } from "react";
import { getServerAuthSession } from "~/server/auth";
import { UserCard } from "./UserCard";

type Props = {
  children: ReactNode;
};

export default async function Layout({ children }: Props) {
  const session = await getServerAuthSession();

  if (!session) {
    return <></>;
  }

  return (
    <div className="min-h-screen w-screen">
      <section className="flex w-full items-center justify-between p-2">
        <h1 className="p-2 text-4xl text-primary">Admin Page</h1>
        <UserCard session={session} />
      </section>
      {children}
    </div>
  );
}
