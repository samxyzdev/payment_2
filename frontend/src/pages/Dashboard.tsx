import { BalanceCard } from "../components/BalanceCard";
import { RecentActivity } from "../components/RecentActivity";

export const Dashboard = () => {
  return (
    <div className="flex justify-center p-4">
      <div className="grid grid-cols-12">
        <div className="col-span-4">
          <BalanceCard />
        </div>
        <div className="col-span-8 pl-6">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};
