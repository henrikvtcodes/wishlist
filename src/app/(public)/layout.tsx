import Loglib from "@loglib/tracker/react";
import { type ReactNode } from "react";

import { HeaderBar } from "./header-bar";
import { UserWatcher } from "./user-watcher";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <UserWatcher />
      <HeaderBar />
      {children}
      <Loglib
        config={{
          id: "wishlist_henrikvt",
          host: "/api/log/lib",
          consent: "granted",
        }}
      />
    </>
  );
}
