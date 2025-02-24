import Loading from "@/src/app/loading";
import { TransactionTable } from "@/src/ui";

import React, { Suspense } from "react";

export const metadata = {
  title: "Transaction",
};

export default async function ExplorerTransaction({
  params,
}: {
  params: { hash: string };
}) {
  const { hash } = params;

  return (
    <Suspense fallback={<Loading />}>
      <TransactionTable hash={hash} />
    </Suspense>
  );
}
