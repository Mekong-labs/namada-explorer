import React, { Suspense } from "react";
import { getOverview } from "@/services";
import { ExplorerCard, ExplorerTable } from "@/src/ui";
import { ChartRadialBar } from "@/src/ui/components/Charts";
import { ExplorerTitle } from "@/src/ui/components/Layout/ExplorerLayout/components/ExplorerTitle";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Explorer",
};

export default async function Page() {
  const inforOverview = await getOverview();

  const count = parseInt(inforOverview.data.nb_validators);
  const total = parseInt(inforOverview.data.nb_validators);
  const percentage = (count / total) * 100;
  const percentageNumber = Number(percentage.toFixed(0));
  const blockHeight = inforOverview.data.last_height;
  const epoch = inforOverview.data.epoch;
  const block_time = Number(inforOverview.data.avg_blocktime).toFixed(2);
  const total_stake = Number(inforOverview.data.total_stake).toFixed(0);
  const chain = process.env.NEXT_PUBLIC_CHAIN_ID;

  return (
    <Suspense>
      <ExplorerTitle />
      <div className="flex flex-col w-full gap-3">
        <div className="flex flex-row w-full gap-2">
          <ExplorerCard
            title="Number of validators"
            prefixValue={`${percentageNumber}% active`}
            value={`${count}/${total}`}
            chart={<ChartRadialBar ratio={percentageNumber} />}
          />
          <ExplorerCard title="Total Stake" value={total_stake} chart={null} />
          <ExplorerCard title="Chain ID" value={chain} chart={null} />
        </div>
        <div className="flex flex-row w-full gap-2">
          <ExplorerCard title="Latest Block" value={blockHeight} chart={null} />
          <ExplorerCard title="Current Epoch" value={epoch} chart={null} />
          <ExplorerCard
            title="Block Time"
            value={`~ ${block_time}s`}
            chart={null}
          />
        </div>
      </div>
      <ExplorerTable />
    </Suspense>
  );
}
