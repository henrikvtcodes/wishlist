import type { FC, ReactNode } from "react";
import { Header } from "components/Header";

export const CategoryLayout: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen w-screen max-w-full bg-gray-100">
      <Header />
      <main className="flex w-full flex-col items-center justify-start divide-y-2 divide-gray-300 overflow-x-clip">
        {children}
      </main>
    </div>
  );
};
