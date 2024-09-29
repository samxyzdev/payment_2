import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export const RecentTransaction = () => {
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
                <p className="text-sm text-gray-500">July 25, 2023</p>
              </div>
              <div className="ml-auto font-medium">-$50.00</div>
            </div>
            <div className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Payment from Alice Johnson
                </p>
                <p className="text-sm text-gray-500">July 22, 2023</p>
              </div>
              <div className="ml-auto font-medium text-green-600">+$120.00</div>
            </div>
            <div className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                <AvatarFallback>SE</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Subscription - Spotify
                </p>
                <p className="text-sm text-gray-500">July 20, 2023</p>
              </div>
              <div className="ml-auto font-medium">-$9.99</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
