"use client";

import { Input } from "@/components/ui/input";
import LogoSVG from "@/public/icons/logo.svg";
import { Facebook, Instagram, Twitter } from "lucide-react";
import content from "./content.json";

export default function Footer() {
  const data = content as any;

  return (
    <div
      className="flex w-full flex-col items-center gap-6 p-[2rem] pb-10 sm:items-start sm:pl-[3.75rem] sm:pr-[3.75rem] sm:pt-[6.25rem]"
      id="section-4"
    >
      <div className="flex flex-wrap items-start justify-between gap-2 self-stretch sm:flex-row sm:gap-0">
        <div className="flex flex-col items-start gap-8">
          <div className="flex items-center gap-3">
            <LogoSVG color={"yellow"} width={40} height={40} />
            <div className="text-yellow-1  text-center text-[1.0625rem] font-semibold leading-[1.375rem]">
              NAMADA
            </div>
          </div>
          <div className="flex flex-col items-start gap-4">
            <div className="get_our_newsletter  text-yellow-1 text-2xl font-semibold leading-8">
              Get our newsletter
            </div>
            <Input placeholder="Enter your email" />
          </div>
          <div className="flex items-start gap-6">
            <Twitter height={32} width={32} color="yellow" />
            <Facebook height={32} width={32} color="yellow" />
            <Instagram height={32} width={32} color="yellow" />
          </div>
        </div>
        {data.slices.map((item: any, i: any) => {
          return (
            <div key={i} className="flex flex-col items-start gap-4">
              <div className="text-yellow-1 font-semibold leading-6">
                {item.primary.title[0].text}
              </div>
              <div className="flex flex-col items-start gap-4">
                {item?.items?.map((link: any, i: any) => {
                  return (
                    <div key={i} className=" text-yellow-1 text-sm leading-5">
                      {link.name[0]?.text}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 self-stretch sm:justify-between">
        <div className="flex items-center gap-1">
          <div className="text-yellow-1  text-center text-sm leading-5">
            {" "}
            2023
          </div>
          <div className="text-yellow-1  text-center text-sm leading-5">-</div>
          <div className="text-yellow-1  text-center text-sm leading-5">
            © NAMADA
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start sm:gap-10">
          <div className="text-yellow-1  text-center text-sm leading-5">
            Privacy Policy
          </div>
          <div className="text-yellow-1  text-center text-sm leading-5">
            Terms &amp; Conditions
          </div>
          <div className="text-yellow-1  text-center text-sm leading-5">
            Cookies Policy
          </div>
        </div>
      </div>
    </div>
  );
}
