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

      {/* Right Sidebar */}
      {/* <aside className="w-64 bg-white p-4 shadow-md">
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
      </aside> */}
    </div>
  );
}

// import { useState } from "react";
// import { BalanceCard } from "../components/BalanceCard";
// import { RecentActivity } from "../components/RecentActivity";
// import { TransferMoney } from "../components/TransferMoney";
// import { AddMoney } from "../components/AddMoney";

// // Enum for different dashboard views
// const DashboardViews = {
//   RECENT_ACTIVITY: "RECENT_ACTIVITY",
//   SEND_MONEY: "SEND_MONEY",
//   ADD_MONEY: "ADD_MONEY",
// };

// export const Dashboard = () => {
//   const [activeView, setActiveView] = useState(DashboardViews.RECENT_ACTIVITY);

//   const handleAddMoneyClick = () => {
//     setActiveView(DashboardViews.ADD_MONEY);
//   };

//   const handleTransferMoneyClick = () => {
//     setActiveView(DashboardViews.SEND_MONEY);
//   };

//   const renderActiveView = () => {
//     switch (activeView) {
//       case DashboardViews.SEND_MONEY:
//         return <TransferMoney />;
//       case DashboardViews.ADD_MONEY:
//         return <AddMoney />;
//       default:
//         return <AddMoney />;
//     }
//   };

//   return (
//     <div>
//       <div className="p-4">
//         <div className="flex justify-center">
//           <div className="grid grid-cols-12 gap-4">
//             <div className="col-span-4">
//               <BalanceCard
//                 onTransferMoneyClick={handleTransferMoneyClick}
//                 onAddMoneyClick={handleAddMoneyClick}
//               />
//             </div>
//             <div className="col-span-8">{renderActiveView()}</div>
//           </div>
//         </div>
//         <div className="w-full">
//           <div className="flex justify-center">
//             <div className="w-[61%] pt-5">
//               <RecentActivity />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
