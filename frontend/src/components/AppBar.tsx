import { Bell } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { jwtDecode, JwtPayload } from "jwt-decode";

// Define a custom interface for your token's structure
interface MyTokenPayload extends JwtPayload {
  id: {
    name: string;
  };
}

export const AppBar = () => {
  const token = localStorage.getItem("token");
  let name = "User";
  let initials = "U";
  if (token) {
    try {
      const decodedToken = jwtDecode<MyTokenPayload>(token);
      name = decodedToken.id?.name || name;
      const nameParts = name
        .split(" ")
        .filter((part: string) => part.length > 0);
      initials = nameParts
        .map((part: string) => part[0].toUpperCase())
        .join("");
    } catch (error) {
      console.error("Invalid token", error);
    }
  }
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
