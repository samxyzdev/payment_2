import axios from "axios";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { ArrowLeft, Send } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface AddMoneyCardProps {
  setActiveComponent: (componentName: string) => void;
}

export function AddMoneyCard({ setActiveComponent }: AddMoneyCardProps) {
  const [amount, setAmount] = useState<number>(0);
  const jwt = localStorage.getItem("token");

  async function handleAddMoneyRequest() {
    if (jwt) {
      try {
        const backendData = await axios.post(
          "http://localhost:3000/api/v1/payment/onramp",
          { provider: "HDFC BANK", amount },
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
            type="number" // Ensures only numbers can be input
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
