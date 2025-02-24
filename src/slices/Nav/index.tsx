"use client";

import Link from "next/link";
import content from "./content.json";
import { usePathname } from "next/navigation";

const Allow_Router = ["/explorer", "/blocks", "/validators", "/proposals"];

export default function Nav() {
  const pathname = usePathname();
  const data = content;
  const hasNav = Allow_Router.some((e: string) => e === pathname);

  if (!hasNav) return null;
  return (
    <div className="border-yellow-1 z-50 hidden items-center gap-6 rounded-full border-[0.5px] px-6 py-4 sm:inline-flex ">
      {data?.map((item, i) => {
        return (
          <Link key={i} href={item.link.url}>
            <div className="product text-yellow-1 text-center hover:text-green-0 text-[1.0625rem] font-medium leading-[1.375rem]">
              {item.text[0].text}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
