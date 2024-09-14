import { useState } from "react";
import { BalanceCard } from "../components/BalanceCard";
import { RecentActivity } from "../components/RecentActivity";
import { SendMoney } from "../components/SendMoney";
import { AddMoney } from "../components/AddMoney";

// Enum for different dashboard views
const DashboardViews = {
  RECENT_ACTIVITY: "RECENT_ACTIVITY",
  SEND_MONEY: "SEND_MONEY",
  ADD_MONEY: "ADD_MONEY",
};

export const Dashboard = () => {
  const [activeView, setActiveView] = useState(DashboardViews.RECENT_ACTIVITY);

  const handleAddMoneyClick = () => {
    setActiveView(DashboardViews.ADD_MONEY);
  };

  const handleTransferMoneyClick = () => {
    setActiveView(DashboardViews.SEND_MONEY);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case DashboardViews.SEND_MONEY:
        return <SendMoney />;
      case DashboardViews.ADD_MONEY:
        return <AddMoney />;
      default:
        return <RecentActivity />;
    }
  };

  return (
    <div className="flex justify-center p-4">
      <div className="grid grid-cols-12">
        <div className="col-span-4">
          <BalanceCard
            onTransferMoneyClick={handleTransferMoneyClick}
            onAddMoneyClick={handleAddMoneyClick}
          />
        </div>
        <div className="col-span-8 pl-6">{renderActiveView()}</div>
      </div>
    </div>
  );
};
