import { RecentTransaction } from "@/components/RecentTransaction";
import { BalanceCard } from "@/components/BalanceCard";
import { AppBar } from "@/components/AppBar";
import { SideBar } from "@/components/Sidebar";

export function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar />
      <main className="flex-1 p-8">
        <AppBar />
        <BalanceCard />
        <RecentTransaction />
      </main>
    </div>
  );
}
