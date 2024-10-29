import { useEffect, useState } from "react";
import axios from "axios";
import { AddMoneyCard } from "./AddMoneyCard";
import { SendMoneyCard } from "./SendMoneyCard";
import { DefaulCard } from "./DefaultMoneyCard";

// Define the shape of the balance data
interface BalanceData {
  msg: {
    userBalance: number;
  };
}

export const BalanceCard = () => {
  const [balance, setBalance] = useState<BalanceData | null>(null); // Initialize balance as null
  const [activeComponent, setActiveComponent] = useState("DefaulCard");
  const jwt = localStorage.getItem("token");
  console.log(jwt);
  useEffect(() => {
    if (jwt) {
      axios
        .get("http://localhost:3000/api/v1/payment/balance", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((result) => {
          setBalance(result.data);
          console.log(result.data);
        })
        .catch((err) => {
          console.log(`Error while ${err}`);
        });
    } else {
      console.log("There is no JWT in localStorage");
    }
  }, [jwt]);

  const renderComponent = () => {
    switch (activeComponent) {
      case "DefaulCard":
        return (
          <DefaulCard
            balance={balance}
            setActiveComponent={setActiveComponent}
          />
        );
      case "AddMoneyCard":
        return <AddMoneyCard setActiveComponent={setActiveComponent} />;
      case "SendMoneyCard":
        return <SendMoneyCard setActiveComponent={setActiveComponent} />;
      default:
        return null;
    }
  };

  return <div>{renderComponent()}</div>;
};
