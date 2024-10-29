import { Plus, Send } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { RenderingIndianRupee } from "./RenderingIndianRupee";

type DefaulCardProps = {
  balance: { msg: { userBalance: number } } | null;
  setActiveComponent: (component: string) => void;
};

export function DefaulCard({ balance, setActiveComponent }: DefaulCardProps) {
  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Balance</CardTitle>
          <CardDescription>As of October 6, 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">
            {balance
              ? RenderingIndianRupee(Number(balance.msg.userBalance.toFixed(2)))
              : "Loading..."}
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
