import React, { Suspense } from "react";
import { ProposalTable } from "@/src/ui/Explorer/ExplorerTable/components/ProposalTable";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Proposals",
};

export default async function Page() {
  return (
    <Suspense>
      <div className="green_net_explorer leading-0 text-yellow-1 w-[540px] text-[1.5rem] font-semibold sm:text-[2.5rem] sm:leading-[48px]">
        {"Proposals"}
      </div>
      <ProposalTable />
    </Suspense>
  );
}
