"use client";

import { EXPLORER } from "@/contants";
import Arrows from "@/public/icons/arrows.svg";
import { tokenQueryKeys } from "@/query-keys";
import { getTransactions } from "@/services";
import { LIMIT_LIST } from "@/utils/constant";
import { Transaction } from "@/utils/types";

import { useMemo, useState } from "react";

import Link from "next/link";

import { useInfiniteQuery } from "@tanstack/react-query";
import { formatDistance, formatDistanceStrict } from "date-fns";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

const useGetTransactions = () => {
  const query = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: tokenQueryKeys.transactions(),
    queryFn: ({ pageParam = 1 }) => {
      return getTransactions({ query: pageParam.toString() });
    },
    getNextPageParam: (lastPage) => {
      return lastPage?.page < lastPage?.totalPages
        ? lastPage?.page + 1
        : undefined;
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage?.page !== 1 ? firstPage?.page - 1 : 1;
    },
  });

  return query;
};

export const LastTransactionTable = () => {
  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useGetTransactions();
  const transactions = useMemo(
    () => (data ? data.pages.flatMap((page) => page.data) : []),
    [data]
  ) as Transaction[];

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex animate-pulse space-x-4">
          <div className="flex-1 space-y-6 px-2 py-2">
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1 h-5 rounded bg-slate-700"></div>
                <div className="col-span-1 h-5 rounded bg-slate-700"></div>
                <div className="col-span-1 h-5 rounded bg-slate-700"></div>
                <div className="col-span-1 h-5 rounded bg-slate-700"></div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1 h-5 rounded bg-slate-700"></div>
                <div className="col-span-1 h-5 rounded bg-slate-700"></div>
                <div className="col-span-1 h-5 rounded bg-slate-700"></div>
                <div className="col-span-1 h-5 rounded bg-slate-700"></div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1 h-5 rounded bg-slate-700"></div>
                <div className="col-span-1 h-5 rounded bg-slate-700"></div>
                <div className="col-span-1 h-5 rounded bg-slate-700"></div>
                <div className="col-span-1 h-5 rounded bg-slate-700"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="table-container max-h-[420px] overflow-y-auto">
        {transactions.map((transaction, index) => {
          return (
            <div key={index} className="text-white-0 w-full text-sm">
              <Link
                href={`${EXPLORER.TRANSACTION}/${transaction.hash}`}
                className="hover:bg-gray-10  sm:border-gray-0 border-gray-0 flex cursor-pointer flex-col justify-between border-b px-3 sm:flex-row sm:items-center sm:gap-5 sm:px-4"
              >
                <div className="hidden py-2 pl-2 sm:flex">
                  <Arrows />
                </div>
                <div className="py-3 ">
                  <p className="min-w-[144px] max-w-[9rem] overflow-hidden text-ellipsis">
                    {transaction.from || "-"}
                  </p>
                  <div className="text-gray-5">
                    {formatDistanceStrict(
                      new Date(transaction.timestamp),
                      new Date(),
                      {
                        addSuffix: true,
                        roundingMethod: "ceil",
                      }
                    )}
                  </div>
                </div>
                <div className="hidden py-2 font-medium sm:flex sm:flex-col">
                  <p>From</p>
                  <p className="text-gray-2">To</p>
                </div>
                <div className="py-2">
                  <p className="min-w-[144px] max-w-[9rem] overflow-hidden text-ellipsis">
                    {transaction.to || "-"}
                  </p>
                  <div className="text-gray-5">
                    {formatDistance(
                      new Date(transaction.timestamp),
                      new Date(),
                      {
                        addSuffix: true,
                      }
                    )}
                  </div>
                </div>
                <div className="flex flex-row items-center justify-start gap-1 py-2 font-medium sm:justify-center">
                  {transaction.index}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="border-gray-8 flex-1 rounded-2xl border">
      <div className="text-yellow-1 px-3 py-4 text-lg font-semibold sm:px-6">
        Latest transactions
      </div>
      {renderContent()}

      {hasNextPage && (
        <div className="flex items-center justify-center px-4 py-4">
          <Button
            onClick={() => {
              fetchNextPage();
            }}
          >
            {isFetching && (
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            )}
            {"Load More"}
          </Button>
        </div>
      )}
    </div>
  );
};
