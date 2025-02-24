"use client";

import { tokenQueryKeys } from "@/query-keys";

import { useMemo } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getValidator } from "@/services";
import { Validator } from "@/types";
import Image from "next/image";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Table } from "@/src/ui/components/Table";
import { Badge } from "@/components/ui/badge";

const useGetValidators = () => {
  const query = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: tokenQueryKeys.validator(),
    queryFn: () => {
      return getValidator();
    },
    getNextPageParam: () => {
      return undefined;
    },
  });

  return query;
};

const columnHelper = createColumnHelper<Validator>();

export const TopValidator = () => {
  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useGetValidators();

  const validators = useMemo(
    () => (data ? data.pages.flatMap((page) => page.data.validators) : []),
    [data]
  ) as Validator[];

  const columns = useMemo(() => {
    return [
      columnHelper.accessor("logo_url", {
        cell: (info) => (
          <div className="">
            <Image
              width={32}
              height={32}
              className="w-8 h-auto rounded-full"
              src={info.renderValue() || "-"}
              alt="Logo"
            />
          </div>
        ),
        header: () => <span className="text-green-0 font-bold">Logo</span>,
      }),
      columnHelper.accessor("moniker", {
        cell: (info) => (
          <div className="text-white-0 font-medium leading-6">
            {info.renderValue() || "-"}
          </div>
        ),
        header: () => <span className="text-green-0 font-bold">Moniker</span>,
      }),
      columnHelper.accessor("address", {
        cell: (info) => (
          <div className="text-white-0 font-medium leading-6">
            {info.renderValue() || "-"}
          </div>
        ),
        header: () => <span className="text-green-0 font-bold">Address</span>,
      }),
      columnHelper.accessor("commission_rate", {
        cell: (info) => (
          <div className="text-white-0 font-medium leading-6">
            {info.renderValue() || "-"}
          </div>
        ),
        header: () => (
          <span className="text-green-0 font-bold">Commission Rate</span>
        ),
      }),
      columnHelper.accessor("status", {
        cell: (info) => (
          <div className="text-white-0 font-medium leading-6">
            <Badge>{info.renderValue() || "-"}</Badge>
          </div>
        ),
        header: () => <span className="text-green-0 font-bold">State</span>,
      }),
    ] as ColumnDef<Validator>[];
  }, []);

  return (
    <div className="border-gray-8 flex-1 rounded-2xl border">
      <div className="text-yellow-1 px-3 py-4 text-lg font-semibold sm:px-6">
        Top Validator
      </div>
      <Table data={validators || []} columns={columns} isLoading={isLoading} />
    </div>
  );
};
