import React from "react";

export default function Balance({ hash }: { hash: string }) {
  return (
    <div className="flex flex-col items-start gap-3 self-stretch rounded-2xl bg-[#1c2a29] p-4">
      <div className="overview text-white-0 text-lg font-semibold leading-7">
        Overview
      </div>
      <div className="text-white-0 text-center leading-6">Namada Balance</div>
      <div className="flex items-start gap-3"></div>
    </div>
  );
}
