"use client";

import { tokenQueryKeys } from "@/query-keys";
import { getTransactionByAddress, getTransactions } from "@/services";
import { LIMIT_LIST } from "@/utils/constant";
import { Transaction } from "@/utils/types";

import { useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  PaginationState,
  createColumnHelper,
} from "@tanstack/react-table";
import Link from "next/link";
import { EXPLORER } from "@/contants";
import { Table } from "@/src/ui/components/Table";
import { ITransactionReceipt } from "@/types";
import Image from "next/image";

const useGetTransactionsByAddress = ({ address }: { address: string }) => {
  const query = useQuery({
    queryKey: tokenQueryKeys.transactionsByAddress(address),
    queryFn: () => {
      return getTransactionByAddress({
        address,
      });
    },
  });

  return query;
};

type ITransactionTableProps = {
  address: string;
};

const columnHelper = createColumnHelper<Transaction>();

export const TransactionAddress = ({ address }: ITransactionTableProps) => {
  const { data: transactions, isLoading } = useGetTransactionsByAddress({
    address,
  });

  const columns = useMemo(() => {
    return [
      columnHelper.accessor("hash", {
        cell: (info) => (
          <div>
            <Image
              width={32}
              height={32}
              className="w-8 h-auto rounded-full"
              src={info.renderValue() || "-"}
              alt="Logo"
            />
          </div>
        ),
        header: () => <span>Transaction Hash</span>,
      }),

      columnHelper.accessor("from", {
        cell: (info) => (
          <div className="text-white-0 font-medium leading-6">
            <Link href={`${EXPLORER.ADDRESS}/${info.renderValue()}`}>
              {info.renderValue() || "-"}
            </Link>
          </div>
        ),
        header: () => <span>From</span>,
      }),
      columnHelper.accessor("to", {
        cell: (info) => (
          <div className="text-white-0 font-medium leading-6">
            <Link href={`${EXPLORER.ADDRESS}/${info.renderValue()}`}>
              {info.renderValue() || "-"}
            </Link>
          </div>
        ),
        header: () => <span>To</span>,
      }),
      columnHelper.accessor("blockNumber", {
        cell: (info) => (
          <div className="text-white-0 font-medium leading-6">
            {info.renderValue() || "-"}
          </div>
        ),
        header: () => <span>Number</span>,
      }),
    ] as ColumnDef<any>[];
  }, []);

  return (
    <div className="border-gray-8 flex-1 rounded-2xl">
      <Table
        data={transactions?.tx as any}
        columns={columns}
        isLoading={isLoading}
      />
    </div>
  );
};
