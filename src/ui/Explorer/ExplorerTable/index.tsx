import { LastBlockTable } from "./components/LastBlockTable";
import { TopValidator } from "./components/TopValidator";
import { LastTransactionTable } from "./components/LastTransactionTable";

export const ExplorerTable = () => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <LastBlockTable />
      <TopValidator />
    </div>
  );
};
