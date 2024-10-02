import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useEffect, useState } from "react";
import axios from "axios";

export const RecentTransaction = () => {
  const [backendData, setBackendData] = useState(null);
  const [error, setError] = useState("");
  const jwt = localStorage.getItem("token");

  useEffect(() => {
    const request = axios
      .get("http://localhost:3000/api/v1/payment/status", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((result) => {
        setBackendData(result.data);
      })
      .catch((err) => {
        setError("Failed to load backendData");
      });
  }, [jwt]);
  console.log(backendData);

  return (
    <div>
      <CardData backendData={backendData} />
    </div>
  );
};

function CardData({ backendData }) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>You have 3 transactions this month.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Payment to John Doe
                </p>
                <p className="text-sm text-gray-500">
                  {backendData ? backendData.date.split("T")[0] : ""}
                </p>
              </div>
              <div className="ml-auto font-bold">
                {backendData ? `₹.${backendData.finalAmount.toFixed(2)}` : ""}
              </div>
              <div className="pl-9 font-bold">
                {backendData ? backendData.status : ""}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
