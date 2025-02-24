import React from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EXPLORER } from "@/contants";

export default async function NavMobile() {
  return (
    <>
      <div className="body flex flex-col items-start gap-6 self-stretch px-4 py-0">
        <div className="items flex flex-col items-start gap-6 self-stretch rounded-[40px]">
          {/* {data?.map((item, i) => {
            return (
              <PrismicNextLink key={i} field={item.link}>
                <div className="product text-white-0 hover:text-green-0 text-center text-[1.0625rem] font-bold leading-[1.375rem]">
                  <PrismicRichText field={item.text} />
                </div>
              </PrismicNextLink>
            );
          })} */}
        </div>
        <div className="flex flex-col items-start justify-center gap-3 self-stretch">
          <Link href={EXPLORER.MAIN} className="w-full">
            <Button>{"Block Explorer"}</Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex h-[2.125rem] w-[23.4375rem] items-center justify-center pb-2 pl-[7.5625rem] pr-[7.5rem] pt-[1.3125rem]">
          <div className="h-[0.3125rem] w-[8.375rem] flex-shrink-0 rounded-full bg-white" />
        </div>
      </div>
    </>
  );
}
