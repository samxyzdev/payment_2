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
  const [ifTrue, setIfTrue] = useState(true);
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
      console.log("There is now JWT in localStorage");
    }
  }, [jwt]);

  return (
    <div>
      {ifTrue ? (
        <DefaulCard balance={balance} setIfTrue={setIfTrue} />
      ) : (
        <AddMoneyCard setIfTrue={setIfTrue} />
      )}
    </div>
  );
};

function DefaulCard({ balance, setIfTrue }: any) {
  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Balance</CardTitle>
          <CardDescription>As of July 27, 2023</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">
            ₹.{balance ? balance.msg.userBalance.toFixed(2) : "Loding..."}
          </div>
          <div className="mt-4 flex space-x-4">
            <Button>
              <Send className="mr-2 h-4 w-4" /> Send
            </Button>
            <Button onClick={() => setIfTrue(false)}>
              <Send className="mr-2 h-4 w-4" /> Add
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

function AddMoneyCard({ setIfTrue }: any) {
  const [amount, setAmount] = useState(0);
  const jwt = localStorage.getItem("token");
  async function handleAddMoneyRequest() {
    if (jwt) {
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
            onClick={() => setIfTrue(true)}
          />
        </div>
        <CardContent className="p-10">
          <Input
            type="amount"
            placeholder="Amount"
            onChange={(e) => {
              setAmount(Number(e.target.value));
            }}
          />
          <div className="flex justify-center pt-4">
            <Button onClick={handleAddMoneyRequest}>
              <Send className="mr-2 h-4 w-4 " /> Add
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
