"use client";

import dynamicImport from "next/dynamic";
import { Suspense } from "react";

const ClaimModal = dynamicImport(
  () =>
    import("~/app/(public)/[category]/claim-modal").then((e) => e.ClaimModal),
  { ssr: false },
);

export function ClaimModalClientWrapper() {
  return (
    <Suspense>
      <ClaimModal />
    </Suspense>
  );
}
