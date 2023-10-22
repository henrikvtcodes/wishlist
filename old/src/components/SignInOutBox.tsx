import type { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import NextLink from "next/link";

interface Props {
  session: Session | null;
  status: "authenticated" | "unauthenticated";
}

export const SignInOut = ({ session, status }: Props) => {
  return status === "unauthenticated" && !session ? (
    <button className="btn" onClick={() => signIn("google")}>
      Sign In with Google
    </button>
  ) : (
    <div className="flex flex-col gap-y-4">
      <span className="flex">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={session?.user?.image ?? ""}
          alt="Profile Picture"
          className="aspect-square h-12 w-12 rounded-full"
          referrerPolicy="no-referrer"
        />{" "}
        <h3 className="text-md ml-2 font-semibold">{session?.user?.name}</h3>
      </span>
      <NextLink href={"/admin/home"} className={"btn-2nd"}>
        {" "}
        Go to Admin Home
      </NextLink>
      <button className="btn" onClick={() => signOut()}>
        Sign Out
      </button>
    </div>
  );
};
