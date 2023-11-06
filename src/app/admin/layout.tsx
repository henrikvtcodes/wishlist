import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/server/auth";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen w-screen place-content-center">
      {children}
    </div>
  );
}
