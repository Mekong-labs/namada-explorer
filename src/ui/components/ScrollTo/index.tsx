"use client";

import React from "react";

import Link from "next/link";
import { ArrowDown } from "lucide-react";

const ScrollTo = () => {
  const [current, setCurrent] = React.useState(1);

  return (
    <div className=" fixed bottom-0 right-0 z-50 mb-[14%] mr-20">
      <Link
        href={`#section-${current === 4 ? 4 : current}`}
        className="border-white-0 hover:bg-gray-1 hidden gap-2 rounded-full border-[1.5px] p-4 sm:block "
        onClick={() => {
          setCurrent((v) => (v === 4 ? 1 : v + 1));
        }}
      >
        <ArrowDown color="white" width={32} height={32} />
      </Link>
    </div>
  );
};

export default ScrollTo;
