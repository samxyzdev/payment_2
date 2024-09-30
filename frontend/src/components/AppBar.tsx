import { Bell } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { jwtDecode } from "jwt-decode";

export const AppBar = () => {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token || "");
  const name = decodedToken.id.name;

  const nameParts = name.split(" ").filter((part) => part.length > 0);
  const initials = nameParts.map((part) => part[0].toUpperCase()).join("");
  return (
    <div>
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
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </div>
      </header>
    </div>
  );
};
