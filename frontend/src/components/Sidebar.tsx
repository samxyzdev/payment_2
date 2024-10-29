import { Button } from "./ui/button";
import { Home, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SideBar = () => {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.clear();
    navigate("/signup");
    console.log("Insise logout");
  }

  return (
    <div>
      <aside className="w-64 bg-white p-4 shadow-md min-h-screen">
        <div className="flex items-center mb-6">
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
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-red-500"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </nav>
      </aside>
    </div>
  );
};
