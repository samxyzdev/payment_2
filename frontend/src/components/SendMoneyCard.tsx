import axios from "axios";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { ArrowLeft, Send } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

// Define the props type for SendMoneyCard
type SendMoneyCardProps = {
  setActiveComponent: (component: string) => void;
};

// Define the component
export function SendMoneyCard({ setActiveComponent }: SendMoneyCardProps) {
  // State for amount and email
  const [amount, setAmount] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const jwt = localStorage.getItem("token");

  // Async function to handle the money sending request
  async function handleSendMoneyRequest(): Promise<void> {
    if (jwt) {
      try {
        const backendData = await axios.post(
          "http://localhost:3000/api/v1/payment/p2ptransfer",
          { email, amount },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        console.log(backendData.data);
      } catch (err) {
        console.error("Error sending money:", err);
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
            type="email"
            placeholder="Enter the recipient email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="number"
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
