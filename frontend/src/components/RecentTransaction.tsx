// import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const RecentTransaction = () => {
  const [backendData, setBackendData] = useState(null);
  const [error, setError] = useState("");
  const jwt = localStorage.getItem("token");

  useEffect(() => {
    if (jwt) {
      axios
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
    } else {
      setError("JWT token is missing");
    }
  }, [jwt]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!backendData) {
    return <div>Loading....</div>;
  }

  return (
    <div>
      <CardData backendData={backendData} />
    </div>
  );
};

function CardData({ backendData }: any) {
  if (!backendData) return null;
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>You have 3 transactions this month.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  {backendData.date ? backendData.date.split("T")[0] : ""}
                </TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">
                  {backendData.finalAmount || "N/A"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
