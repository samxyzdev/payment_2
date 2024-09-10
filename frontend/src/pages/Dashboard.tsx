import { Appbar } from "../components/Appbar";
import { BalanceCard } from "../components/BalanceCard";
import { RecentTransaction } from "../components/RecentTransaction";
import { Transaction } from "../components/Transaction";

export const Dashboard = () => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center p-4">
        <div className="flex">
          <BalanceCard />
          <div className="pl-4">
            <Transaction />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <RecentTransaction />
      </div>
    </div>
  );
};
