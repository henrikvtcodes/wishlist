"use client";

import Link from "next/link";

export function AdminNav() {
  return (
    <div className=" w-52">
      <div className="grid w-full grid-cols-2">
        <Link
          className="border-b-2 py-2 text-center hover:border-zinc-900 dark:hover:border-zinc-50"
          href="/admin/home"
        >
          Items
        </Link>
        <Link
          className="border-b-2 py-2 text-center hover:border-zinc-900 dark:hover:border-zinc-50"
          href="/admin/refs"
        >
          Refs
        </Link>
      </div>
    </div>
  );
}
