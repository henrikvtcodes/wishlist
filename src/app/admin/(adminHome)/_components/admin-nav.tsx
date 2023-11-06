"use client";

import Link from "next/link";

export function AdminNav() {
  return (
    <div className=" w-52">
      <div className="grid w-full grid-cols-2">
        <Link
          className="text-center py-2 border-b-2 hover:border-zinc-900 dark:hover:border-zinc-50"
          href="/admin"
        >
          Items
        </Link>
        <Link
          className="text-center py-2 border-b-2 hover:border-zinc-900 dark:hover:border-zinc-50"
          href="/admin/refs"
        >
          Refs
        </Link>
      </div>
    </div>
  );
}
