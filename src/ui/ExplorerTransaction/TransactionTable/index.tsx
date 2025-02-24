"use client";

import { tokenQueryKeys } from "@/query-keys";
import { getBlockDetail, getTransactionDetail } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { Info, Link, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { IBlockDetail, ITransactionReceipt } from "@/types";
import clsx from "clsx";
import { displayHash } from "@/libs/utils";
import { format } from "date-fns";

export type IBlockTableProps = {
  hash: string;
};

const useGetTransactionsDetail = ({ hash }: { hash: string }) => {
  const query = useQuery({
    queryKey: tokenQueryKeys.getTransactionDetail({ hash: hash }),
    queryFn: () => {
      return getTransactionDetail({ hash: hash });
    },
  });

  return query;
};

export const TransactionTable = ({ hash }: IBlockTableProps) => {
  const router = useRouter();
  const {
    data: transaction,
    isError,
    isSuccess,
    isLoading = true,
  } = useGetTransactionsDetail({ hash });

  if (isLoading) {
    return (
      <Loader className="absolute bottom-0 left-0 right-0 top-0 m-auto h-20 w-20 animate-spin text-green-0 " />
    );
  }

  if (isError) {
    router.push("/404");
  }

  const {
    hash: hashBlock,
    code,
    block_id,
    tx_type,
    wrapper_id,
    fee_amount_per_gas_unit,
    gas_limit_multiplier,
  } = transaction as ITransactionReceipt;

  const dataTable = [
    { title: "Block hash", value: hash || "-"},
    { title: "Block ID", value: block_id || "-"},
    { title: "Wrapper ID", value: wrapper_id || "-" },
    { title: "Transaction Type", value: tx_type || "-" },
    { title: "Fee (gas unit)", value: fee_amount_per_gas_unit || "-" },
    { title: "Gas limit", value: gas_limit_multiplier || "-" },
  ];

  return (
    <div className="flex flex-col gap-8 text-yellow-1">
      <div>
        <p>Transaction Detail</p>
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
    </div>
  );
};
