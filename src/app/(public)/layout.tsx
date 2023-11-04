import { type ReactNode } from "react";

import { HeaderBar } from "./header-bar";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <HeaderBar /> {children}
    </>
  );
}
