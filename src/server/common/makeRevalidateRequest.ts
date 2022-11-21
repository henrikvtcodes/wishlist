import { env } from "env/server.mjs";
import { getBaseUrl } from "./getBaseUrl";

export async function requestRevalidate(pathToRevalidate: string) {
  await fetch(`${getBaseUrl()}/api/revalidate/${pathToRevalidate}`, {
    headers: {
      authorization: env.REVALIDATE_AUTH_TOKEN,
    },
  });
}
