import Nav from "@/src/slices/Nav";
import { Logo } from "../../../..";
import { ExplorerDrawer } from "../ExplorerDrawer";
import { ExplorerHeaderItems } from "../ExplorerHeaderItems";

export const ExplorerHeader = () => {
  return (
    <div className="flex w-full items-center justify-between px-2 py-6 sm:px-10">
      <Logo />
      <div className="flex w-full items-center justify-center">
        <Nav />
      </div>
      <div className="hidden items-center justify-end gap-4 sm:flex">
        <ExplorerHeaderItems />
      </div>
      <ExplorerDrawer />
    </div>
  );
};
