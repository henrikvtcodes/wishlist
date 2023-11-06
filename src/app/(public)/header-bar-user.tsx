"use client";

import { useIsClient } from "usehooks-ts";

import { useStoredUser } from "~/stores/storedUser";

export function HeaderBarUser() {
  const isClient = useIsClient();
  const userName = useStoredUser((state) => state.user?.name);

  if (!isClient) return null;

  return userName ? (
    <span className="inline-flex px-2 text-base font-medium text-gray-600">
      {"Hi"}
      <span className="pl-1 font-semibold">{userName}</span>
    </span>
  ) : null;
}
