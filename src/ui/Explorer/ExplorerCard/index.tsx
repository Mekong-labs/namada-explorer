"use client";

type IExplorerCardProps = {
  title: string;
  value?: string | number;
  prefixValue?: string;
  chart?: React.ReactNode;
};

export const ExplorerCard = ({
  title,
  value,
  prefixValue,
  chart,
}: IExplorerCardProps) => {
  return (
    <div className=" border-yellow-1 border-[1px] flex-1 flex-col items-center gap-3 rounded-2xl p-4">
      <div className="flex w-full items-start justify-between gap-3 self-stretch">
        <div className="text-2 flex flex-col items-start gap-2">
          <div className="text-yellow-1 self-stretch leading-6">{title}</div>
          <div className="flex w-full items-center gap-1 self-stretch">
            <div className="41 text-yellow-1 text-2xl font-semibold leading-8">
              {value}
            </div>
            <div className="cam_active  text-yellow-1 text-sm leading-5">
              {prefixValue}
            </div>
          </div>
        </div>
        <svg
          width={32}
          height={32}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* <circle cx={16} cy={16} r={16} fill="#D9D9D9" /> */}
        </svg>
      </div>
      <div className="flex items-center justify-center pb-0 pt-1">{chart}</div>
    </div>
  );
};
