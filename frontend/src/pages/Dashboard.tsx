import { useState } from "react";
import { BalanceCard } from "../components/BalanceCard";
import { RecentActivity } from "../components/RecentActivity";
import { SendMoney } from "../components/SendMoney";
import { AddMoney } from "../components/AddMoney";

export const Dashboard = () => {
  const [transferMoney, setTransferMoney] = useState(false);
  const [addMoney, setAddMoney] = useState(false);
  const handleAddMoneyClick = () => {
    setAddMoney((prevState) => !prevState);
  };
  const handleTransferMoneyClick = () => {
    setAddMoney((prevState) => !prevState);
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
        <div className="col-span-8 pl-6">
          {transferMoney === false ? (
            <RecentActivity />
          ) : addMoney === false ? (
            <SendMoney />
          ) : (
            <AddMoney />
          )}
        </div>
      </div>
    </div>
  );
};
