"use client";

import { tokenQueryKeys } from "@/query-keys";
import { getBlockDetail } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { Info, Link, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { IBlockDetail } from "@/types";
import clsx from "clsx";
import { displayHash } from "@/libs/utils";
import { format } from "date-fns";

export type IBlockTableProps = {
  height: string;
};

const useGetTransactionsDetail = ({ height }: { height: string }) => {
  const query = useQuery({
    queryKey: tokenQueryKeys.getBlockDetail({ hash: height }),
    queryFn: () => {
      return getBlockDetail({ height });
    },
  });

  return query;
};

export const BlockTable = ({ height }: IBlockTableProps) => {
  const router = useRouter();
  const {
    data: block,
    isError,
    isSuccess,
    isLoading = true,
  } = useGetTransactionsDetail({ height });

  if (isLoading) {
    return (
      <Loader className="absolute bottom-0 left-0 right-0 top-0 m-auto h-20 w-20 animate-spin text-green-0 " />
    );
  }

  if (isError) {
    router.push("/404");
  }

  const {
    data: {
      height: block_height,
      hash: hash_id,
      time: time,
      signatures: signatures,
      transactions: transactions,
      proposer: proposer,
      moniker: moniker,
      logo_url: logo_url,
    },
  } = block as IBlockDetail;

  const dataTable = [
    {
      title: "Time",
      value: format(new Date(time), "dd/MM/yyyy"),
    },
    {
      title: "Height",
      value: block_height,
    },
    { title: "Number of transactions", value: transactions.length },
    { title: "Block hash", value: hash_id },
    { title: "Proposer", value: proposer },
  ];

  return (
    <div className="flex flex-col gap-8 text-yellow-1">
      <div>
        <p>Block header: #{height}</p>
      </div>
      <div className="border-gray-8 bg-gray-9 w-full rounded-2xl border p-4 ">
        {!isLoading &&
          isSuccess &&
          dataTable.map((item, i) => {
            const lastItem = dataTable.length === i + 1;
            return (
              <div
                key={i}
                className={clsx(
                  "border-b-gray-8 flex w-[60rem] flex-wrap items-center justify-between gap-5 p-4 sm:w-full",
                  {
                    "border-b": !lastItem,
                  }
                )}
              >
                <div className="flex flex-row items-center justify-center gap-3">
                  <Info width={24} height={24} />
                  <div className="text-white-0 flex w-max flex-col gap-0.5 overflow-hidden text-ellipsis font-medium leading-6 ">
                    {item.title}
                  </div>
                </div>
                <p className="text-gray-2 w-[900px] overflow-hidden text-ellipsis break-words">
                  {item.value}
                </p>
              </div>
            );
          })}
      </div>

      <div className="bg-gray-9 flex w-full flex-col  gap-8 rounded-3xl p-4 sm:p-10">
        <div className="flex items-center gap-2 ">
          <div className="text-white-0  text-center text-2xl font-semibold leading-8">
            Block Transactions
          </div>
          <Info width={24} height={24} />
        </div>
        <div className="table-container max-h-[420px] overflow-y-auto">
          {transactions?.map((item, i) => {
            return (
              <div key={i} className="flex items-center justify-between ">
                <div className="flex">
                  <div className="table-cell-61 flex flex-col items-start justify-center gap-0.5 self-stretch p-4">
                    <div className="text-white-0 self-stretch  overflow-hidden text-sm leading-5">
                      {displayHash(item)}
                    </div>
                    <div className="text-gray-5 text-sm leading-5"></div>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col items-start justify-center gap-0.5 self-stretch p-4">
                    <div className="text-white-0 self-stretch  overflow-hidden text-sm leading-5">
                      {height}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
