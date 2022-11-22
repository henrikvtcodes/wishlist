import type { FC, ReactNode } from "react";
import { Header } from "components/Header";

export const CategoryLayout: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen w-screen bg-gray-100">
      <Header />
      <main> {children} </main>
    </div>
  );
};
