"use client";

import { useStoredUser } from "~/stores/storedUser";

export function HeaderBarUser() {
  const userName = useStoredUser((state) => state.user?.name);

  return userName ? (
    <span className="text-base font-medium text-gray-600 inline-flex">
      {"Hi"}
      <span className="font-semibold pl-1">{userName}</span>
    </span>
  ) : null;
}
