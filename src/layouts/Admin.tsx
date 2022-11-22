import { useSession } from "next-auth/react";

interface Props {
  children?: React.ReactNode;
  requireAuth?: boolean;
}

export const AdminLayout = ({ children, requireAuth = true }: Props) => {
  useSession({ required: requireAuth });

  return (
    <div className="min-h-screen w-screen max-w-full bg-gray-100">
      {children}
    </div>
  );
};
