import Balance from "@/src/ui/Explorer/Balance";
import { TransactionAddress } from "@/src/ui/Explorer/ExplorerTable/components/TransactionAddress";

import React from "react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Address",
};

export default async function Address({
  params,
}: {
  params: { hash: string };
}) {
  const { hash } = params;

  return (
    <div className="flex w-full flex-col items-start gap-8 rounded-2xl bg-[#1b1b1b] p-8">
      <div className="flex flex-col items-start gap-3 self-stretch">
        <div className="account_detail text-white-0 text-2xl font-semibold leading-8">
          Transaction Detail
        </div>
      </div>
      <TransactionAddress address={hash} />
    </div>
  );
}
