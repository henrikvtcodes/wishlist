import { getServerAuthSession } from "~/server/auth";
import { SignInCard } from "./SignInCard";

export default async function Page() {
  const session = await getServerAuthSession();

  return <>HELLO</>;
}
