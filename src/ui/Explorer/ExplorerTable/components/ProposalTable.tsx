"use client";

import { tokenQueryKeys } from "@/query-keys";
import { getLatestProposals } from "@/services";

import { useLayoutEffect, useMemo } from "react";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { IBlocks, Proposal } from "@/types";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Table } from "@/src/ui/components/Table";

const useGetProposals = () => {
  const query = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: tokenQueryKeys.proposals(),
    queryFn: ({ pageParam }) => {
      return getLatestProposals();
    },
    getNextPageParam: (lastPage) => {
      return undefined;
    },
  });

  return query;
};

const columnHelper = createColumnHelper<Proposal>();

export const ProposalTable = () => {
  const { data, isLoading, isFetching, fetchNextPage, hasNextPage } =
    useGetProposals();

  const proposals = useMemo(
    () => (data ? data.pages.flatMap((page) => page.data.proposals) : []),
    [data]
  ) as Proposal[];

  const columns = useMemo(() => {
    return [
      columnHelper.accessor("proposal_id", {
        cell: (info) => (
          <div className="text-white-0 font-medium leading-6">
            {info.renderValue() || "-"}
          </div>
        ),
        header: () => <span className="text-green-0 font-bold">ID</span>,
      }),
      columnHelper.accessor("author", {
        cell: (info) => (
          <div className="text-white-0 font-medium leading-6">
            {info.renderValue() || "-"}
          </div>
        ),
        header: () => <span className="text-green-0 font-bold">Author</span>,
      }),
      columnHelper.accessor("start_epoch", {
        cell: (info) => (
          <div className="text-white-0 font-medium leading-6">
            {info.renderValue() || "-"}
          </div>
        ),
        header: () => (
          <span className="text-green-0 font-bold">Start Epoch</span>
        ),
      }),
      columnHelper.accessor("end_epoch", {
        cell: (info) => (
          <div className="text-white-0 font-medium leading-6">
            {info.renderValue() || "-"}
          </div>
        ),
        header: () => <span className="text-green-0 font-bold">End Epoch</span>,
      }),
      columnHelper.accessor("type", {
        cell: (info) => (
          <div className="text-white-0 font-medium leading-6">
            {info.renderValue() as string}
          </div>
        ),
        header: () => <span className="text-green-0 font-bold">Type</span>,
      }),
    ] as ColumnDef<Proposal>[];
  }, []);

  return (
    <div className="border-gray-8 flex-1 rounded-2xl border">
      <div className="text-yellow-1 px-3 py-4 text-lg font-semibold sm:px-6">
        Lastest Proposals
      </div>
      <Table data={proposals || []} columns={columns} isLoading={isLoading} />
    </div>
  );
};
