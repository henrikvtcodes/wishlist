import { env } from "env/server.mjs";
import { getBaseUrl } from "./getBaseUrl";

/**
 * Send a request from the server to revalidate a page
 * @param pathToRevalidate If you want to revalidate `/tools` then pass in `tools`
 */
export async function requestRevalidate(pathToRevalidate: string) {
  await fetch(`${getBaseUrl()}/api/revalidate/${pathToRevalidate}`, {
    headers: {
      authorization: env.REVALIDATE_AUTH_TOKEN,
    },
  });
}
