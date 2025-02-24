"use client";

import { EXPLORER } from "@/contants";
import { EXPLORER_NET_VALUE, EXPLORER_PRAMS } from "@/types";
import useQueryParams from "@/utils/hooks/useQueryParams";

import { useRef } from "react";

import { useRouter } from "next/navigation";

import { z } from "zod";
import { Input } from "@/components/ui/input";

const allowedValues = {
  [EXPLORER_PRAMS.NET]: [
    EXPLORER_NET_VALUE.MAIN,
    EXPLORER_NET_VALUE.ETHER,
    EXPLORER_NET_VALUE.BINANCE,
  ],
} as const;

const ParamsSchema = z.object({
  [EXPLORER_PRAMS.NET]: z.enum(allowedValues.net),
});

export const ExplorerTitle = () => {
  const router = useRouter();
  const inputRef = useRef<any>(null);

  const { urlSearchParams } = useQueryParams();

  const searchNet =
    urlSearchParams.get(EXPLORER_PRAMS.NET) || EXPLORER_NET_VALUE.MAIN;
  const searchKeyword = urlSearchParams.get(EXPLORER_PRAMS.Q);

  const isValid = ParamsSchema.safeParse({
    net: urlSearchParams.get(EXPLORER_PRAMS.NET) || EXPLORER_NET_VALUE.MAIN,
  });

  if (!isValid.success) {
    router.replace("/404");
  }

  const title = {
    [EXPLORER_NET_VALUE.MAIN]: "Namada Overview",
    [EXPLORER_NET_VALUE.ETHER]: "Block Explorer",
    [EXPLORER_NET_VALUE.BINANCE]: "Binance Explorer",
  }[searchNet];

  function handlePress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key == "Enter") {
      const keyword = inputRef.current.value;
      return router.replace(`${EXPLORER.TRANSACTION}/${keyword}`, {
        scroll: false,
      });
    }
  }

  return (
    <div className="flex flex-col items-center justify-between gap-4 self-stretch sm:flex-row">
      <div className="green_net_explorer leading-0 text-yellow-1 w-[540px] text-[1.5rem] font-semibold sm:text-[2.5rem] sm:leading-[48px]">
        {title}
      </div>
      <div className="w-full sm:w-72">
        <Input
          defaultValue={searchKeyword || ""}
          onKeyDown={handlePress}
          ref={inputRef}
          placeholder="Search by Transaction"
        />
      </div>
    </div>
  );
};
