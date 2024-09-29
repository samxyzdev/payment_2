import {
  Bell,
  CreditCard,
  DollarSign,
  Home,
  LogOut,
  PieChart,
  Plus,
  Search,
  Send,
  User,
  UserPlus,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Component() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-4 shadow-md">
        <div className="flex items-center mb-6">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback>PP</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <h2 className="font-semibold">PayPal Clone</h2>
            <p className="text-sm text-gray-500">Welcome back!</p>
          </div>
        </div>
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
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
          </Button>
          <Button variant="ghost" className="w-full justify-start text-red-500">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-500">
              Here's what's happening with your account today.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Balance Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Your Balance</CardTitle>
            <CardDescription>As of July 27, 2023</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">$2,745.00</div>
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

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              You have 3 transactions this month.
            </CardDescription>
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
                <div className="ml-auto font-medium text-green-600">
                  +$120.00
                </div>
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
      </main>

      {/* Right Sidebar */}
      <aside className="w-64 bg-white p-4 shadow-md">
        <h3 className="font-semibold mb-4">Quick Actions</h3>
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Contact
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <DollarSign className="mr-2 h-4 w-4" />
            Currency Exchange
          </Button>
        </div>
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Search Transactions</h3>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search..." className="pl-8" />
          </div>
        </div>
      </aside>
    </div>
  );
}
