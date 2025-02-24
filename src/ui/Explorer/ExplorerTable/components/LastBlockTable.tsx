"use client";

import { EXPLORER } from "@/contants";
import { tokenQueryKeys } from "@/query-keys";
import { getLatestBlocks } from "@/services";

import { useMemo, useState } from "react";

import Link from "next/link";

import { useInfiniteQuery } from "@tanstack/react-query";
import { formatDistance, formatDistanceStrict } from "date-fns";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { IBlocks } from "@/types";
import { displayHash } from "@/libs/utils";
import { Table } from "@/src/ui/components/Table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const useGetBlocks = () => {
  const query = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: tokenQueryKeys.blocks(),
    queryFn: ({ pageParam }) => {
      return getLatestBlocks();
    },
    getNextPageParam: () => {
      return undefined;
    },
  });

  return query;
};

const columnHelper = createColumnHelper<IBlocks>();

export const LastBlockTable = () => {
  const { data, isLoading, isFetching, fetchNextPage, hasNextPage } =
    useGetBlocks();

  const blocks = useMemo(
    () => (data ? data.pages.flatMap((page) => page.data) : []),
    [data]
  ) as IBlocks[];

  const columns = useMemo(() => {
    return [
      columnHelper.accessor("height", {
        cell: (info) => (
          <Link href={`${EXPLORER.BLOCK}/${info.renderValue()}`}>
            <div className="text-white-0 font-medium leading-6">
              {info.renderValue() || "-"}
            </div>
          </Link>
        ),
        header: () => <span className="text-green-0 font-bold">Block</span>,
      }),
      columnHelper.accessor("hash", {
        cell: (info) => (
          <Link href={`${EXPLORER.BLOCK}/${info.row.original.height}`}>
            <div className="text-white-0 font-medium leading-6">
              {displayHash(info.renderValue() || "-")}
            </div>
          </Link>
        ),
        header: () => <span className="text-green-0 font-bold">Hash</span>,
      }),
      columnHelper.accessor("transactions", {
        cell: (info) => (
          <div className="text-white-0 font-medium leading-6">
            {info.renderValue()?.length || "-"}
          </div>
        ),
        header: () => <span className="text-green-0 font-bold">No of Txs</span>,
      }),
      columnHelper.accessor("time", {
        cell: (info) => (
          <div className="text-white-0 font-medium leading-6">
            {formatDistanceStrict(
              new Date(info.renderValue() || "-"),
              new Date(),
              {
                addSuffix: true,
                roundingMethod: "ceil",
              }
            )}
          </div>
        ),
        header: () => <span className="text-green-0 font-bold">Time</span>,
      }),
    ] as ColumnDef<IBlocks>[];
  }, []);

  return (
    <div className="border-gray-8 flex-1 rounded-2xl border">
      <div className="text-yellow-1 px-3 py-4 text-lg font-semibold sm:px-6">
        Lastest Block
      </div>
      <Table data={blocks || []} columns={columns} isLoading={isLoading} />
    </div>
  );
};
