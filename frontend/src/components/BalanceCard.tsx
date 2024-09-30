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

export const BalanceCard = () => {
  const [balance, setBalance] = useState(null); // Initialize balance as null
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
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
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to load balance");
          setLoading(false);
        });
    } else {
      setError("No token found");
      setLoading(false);
    }
  }, [jwt]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Balance</CardTitle>
          <CardDescription>As of July 27, 2023</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">
            ₹
            {balance && balance.msg && balance.msg[0].userBalance !== undefined
              ? balance.msg[0].userBalance
              : "Balance unavailable"}
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
