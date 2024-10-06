import { Plus, Send } from "lucide-react";
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
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" /> Request
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
