import React, { Suspense } from "react";
import { TopValidator } from "@/src/ui/Explorer/ExplorerTable/components/TopValidator";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Validator",
};

export default async function Page() {
  return (
    <Suspense>
      <div className="green_net_explorer leading-0 text-yellow-1 w-[540px] text-[1.5rem] font-semibold sm:text-[2.5rem] sm:leading-[48px]">
        {"Validator"}
      </div>
      <TopValidator />
    </Suspense>
  );
}
