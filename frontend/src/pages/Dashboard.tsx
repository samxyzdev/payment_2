import { Appbar } from "../components/Appbar";
import { BalanceCard } from "../components/BalanceCard";
import { RecentTransaction } from "../components/RecentTransaction";

export const Dashboard = () => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center p-4">
        <div className="flex">
          <BalanceCard />
          <div className="pl-4">
            <RecentTransaction />
          </div>
        </div>
      </div>
    </div>
  );
};
