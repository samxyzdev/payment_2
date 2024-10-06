import { RecentTransaction } from "@/components/RecentTransaction";
import { BalanceCard } from "@/components/BalanceCard";
import { AppBar } from "@/components/AppBar";
import { SideBar } from "@/components/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar />
      {/* Main Content */}
      <main className="flex-1 p-8">
        <AppBar />
        {/* Balance Card */}
        <BalanceCard />

        {/* Recent Transactions */}
        <RecentTransaction />
      </main>
    </div>
  );
}
