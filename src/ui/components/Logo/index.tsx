import LogoSVG from "@/public/icons/logo.svg";

import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/explorer" className=" flex items-center gap-5">
      <LogoSVG color={"yellow"} width={80} height={80} />
      <div className="text-yellow-1 text-center text-[1.0625rem] font-semibold leading-[1.375rem]">
        NAMADA
      </div>
    </Link>
  );
};
