import axios from "axios";
import { useEffect, useState } from "react";

export const BalanceCard = ({
  onTransferMoneyClick,
  onAddMoneyClick,
}: {
  onTransferMoneyClick: () => void;
  onAddMoneyClick: () => void;
}) => {
  const [userBalance, setUserBalance] = useState(0);
  const jwtToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/payment/balance",
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        const { msg } = response.data;
        const [{ userBalance }] = msg;
        setUserBalance(userBalance); // assuming the balance is in `response.data.balance`
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };
    fetchBalance();
  }, []); // empty dependency array to run only once when component mounts

  return (
    <div>
      <div className="shadow-lg p-4 ">
        <div>
          <div className="flex justify-between">
            <div>Current Balance</div>
            <div>
              <div>Balance History</div>
            </div>
          </div>
          <div className="border-b-2"></div>
          <div className="flex justify-center text-6xl p-14 font-bold">
            {userBalance}
            <span className="text-sm font-normal text-gray-500 flex items-end pl-1">
              Available
            </span>
          </div>
          <div className="flex justify-center text-sm gap-4">
            <button
              className="p-2 rounded-md bg-gray-200"
              onClick={onTransferMoneyClick}
            >
              Transfer Money
            </button>
            <button
              className="p-2 rounded-md bg-gray-200"
              onClick={onAddMoneyClick}
            >
              Add Money
            </button>
            <button className="p-2 rounded-md bg-gray-200">
              Receive Money
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
