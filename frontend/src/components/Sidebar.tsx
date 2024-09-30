import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { CreditCard, Home, LogOut, PieChart, User } from "lucide-react";

export const SideBar = () => {
  return (
    <div>
      <aside className="w-64 bg-white p-4 shadow-md min-h-screen">
        <div className="flex items-center mb-6">
          {/* <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback>PAY</AvatarFallback>
          </Avatar> */}
          <div className="ml-3">
            <h2 className="font-semibold">Payment</h2>
            <p className="text-sm text-gray-500">Welcome back!</p>
          </div>
        </div>
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          {/* <Button variant="ghost" className="w-full justify-start">
            <CreditCard className="mr-2 h-4 w-4" />
            Cards
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <PieChart className="mr-2 h-4 w-4" />
            Analytics
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button> */}
          <Button variant="ghost" className="w-full justify-start text-red-500">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </nav>
      </aside>
    </div>
  );
};
