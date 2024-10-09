import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Send } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useEffect, useState } from "react";
import axios from "axios";

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

function DefaulCard({ balance, setActiveComponent }: any) {
  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Balance</CardTitle>
          <CardDescription>As of October 6, 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">
            ₹.{balance ? balance.msg.userBalance.toFixed(2) : "Loading..."}
          </div>
          <div className="mt-4 flex space-x-4">
            <Button onClick={() => setActiveComponent("SendMoneyCard")}>
              <Send className="mr-2 h-4 w-4" /> Send
            </Button>
            <Button onClick={() => setActiveComponent("AddMoneyCard")}>
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" /> Request
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AddMoneyCard({ setActiveComponent }: any) {
  const [amount, setAmount] = useState(0);
  const jwt = localStorage.getItem("token");

  async function handleAddMoneyRequest() {
    if (jwt) {
      try {
        const backendData = await axios.post(
          "http://localhost:3000/api/v1/payment/onramp",
          { provider: "HDFC BANK", amount: amount },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        console.log(backendData.data);
      } catch (err) {
        console.error("Error adding money:", err);
      }
    } else {
      console.log("JWT not found");
    }
  }

  return (
    <div>
      <Card className="mb-6">
        <div className="p-4">
          <ArrowLeft
            className="cursor-pointer"
            onClick={() => setActiveComponent("DefaulCard")}
          />
        </div>
        <CardContent className="p-10">
          <Input
            type="number" // Change "amount" to "number"
            placeholder="Amount"
            onChange={(e) => {
              setAmount(Number(e.target.value));
            }}
          />
          <div className="flex justify-center pt-4">
            <Button onClick={handleAddMoneyRequest}>
              <Send className="mr-2 h-4 w-4" /> Add
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SendMoneyCard({ setActiveComponent }: any) {
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState("");
  const jwt = localStorage.getItem("token");

  async function handleSendMoneyRequest() {
    if (jwt) {
      try {
        const backendData = await axios.post(
          "http://localhost:3000/api/v1/payment/p2ptransfer",
          { email: email, amount: amount },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        console.log(backendData.data);
      } catch (err) {
        console.error("Error adding money:", err);
      }
    } else {
      console.log("JWT not found");
    }
  }

  return (
    <div>
      <Card className="mb-6">
        <div className="p-4">
          <ArrowLeft
            className="cursor-pointer"
            onClick={() => setActiveComponent("DefaulCard")}
          />
        </div>
        <CardContent className="p-10">
          <Input
            className="mb-4"
            type="email" // Change "amount" to "number"
            placeholder="Enter the recepient email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="number" // Change "amount" to "number"
            placeholder="Enter the Amount"
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <div className="flex justify-center pt-4">
            <Button onClick={handleSendMoneyRequest}>
              <Send className="mr-2 h-4 w-4" /> Send
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
