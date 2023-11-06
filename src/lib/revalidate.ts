import { revalidatePath } from "next/cache";

import "server-only";

import type { ItemCategory } from "~/server/db/schema";

export function requestRevalidate(page: ItemCategory) {
  revalidatePath(`/${page}`, "page");
}
