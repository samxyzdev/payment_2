import { SendMoney } from "./SendMoney";

export const BalanceCard = () => {
  return (
    <div>
      <div className="w-[20%] shadow-md p-4">
        {/* // balance Card */}
        <div>
          <div className="flex justify-between">
            <div>Current Balance</div>
            <div>
              <div>Balance History</div>
            </div>
          </div>
          <div className="border-b-2"></div>
          <div className="flex justify-center text-3xl p-4 font-bold">
            120.556
            <span className="text-sm font-normal text-gray-500 flex items-end pl-1">
              Available
            </span>
          </div>
          <div className="flex text-sm gap-4">
            <button className="p-2 rounded-md bg-gray-200">
              Transfer Money
            </button>
            <button className="p-2 rounded-md bg-gray-200">Add Money</button>
            <button className="p-2 rounded-md bg-gray-200">
              Receive Money
            </button>
          </div>
        </div>
        {/* // balace card -------- */}
      </div>
      <div>
        <SendMoney />
      </div>
    </div>
  );
};
