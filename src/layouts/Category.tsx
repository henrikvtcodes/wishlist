import type { FC, ReactNode } from "react";
import { Header } from "components/Header";

export const CategoryLayout: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <div>
      <Header />
      <main> {children} </main>
    </div>
  );
};
