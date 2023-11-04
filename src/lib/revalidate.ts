import { revalidatePath } from "next/cache";
import "server-only";
import type { itemCategory } from "~/server/db/schema";

type Page = (typeof itemCategory)["enumValues"][number];

export function requestRevalidate(page: Page) {
  revalidatePath(`/${page}`, "page");
}
