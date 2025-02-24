import { ExplorerHeader } from "./components/ExplorerHeader";

export const ExplorerLayout = ({ children, ...props }: any) => {
  return (
    <div className="flex flex-col ">
      <ExplorerHeader />
      <div className="flex w-full flex-col gap-8 px-2 pb-10 pt-2 sm:px-10 sm:pt-6">
        {children}
      </div>
    </div>
  );
};
