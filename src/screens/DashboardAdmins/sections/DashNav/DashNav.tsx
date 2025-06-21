import { useLogout, useUser } from "@civic/auth/react";
import { BellIcon, LogOut } from "lucide-react";
import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../../../components/ui/navigation-menu";

interface User {
  name: string;
  avatar: string;
}

interface DashNavProps {
  user: User;
  onLogout: () => void;
}

export const DashNav = ({ user, onLogout }: DashNavProps): JSX.Element => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { logout } = useLogout();
  const { user: civicUser } = useUser();

  // Navigation menu items data
  const navItems = [
    { label: "Features", active: false },
    { label: "Dashboard", active: true },
    { label: "Training", active: false },
    { label: "Safety", active: false },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      onLogout();
    } catch (error) {
      console.error("Logout failed:", error);
      // Fallback to local logout
      onLogout();
    }
  };

  // Use Civic user data if available, otherwise fallback to prop user
  const displayUser = civicUser ? {
    name: civicUser.name || civicUser.email || user.name,
    avatar: civicUser.avatar || user.avatar
  } : user;

  return (
    <header className="flex w-full items-center justify-between px-20 py-4 bg-[#2c2c2c] border-b-[0.2px] border-white">
      {/* Logo and Brand */}
      <div className="flex items-center gap-2">
        <div className="relative w-[30px] h-[30px] bg-[#ff6b00] rounded-md overflow-hidden">
          <img
            className="absolute w-[22px] h-[22px] top-1 left-1"
            alt="Game icons mine"
            src="/game-icons-mine-truck.svg"
          />
        </div>

        <div className="flex flex-col w-[126px] items-start">
          <div className="self-stretch mt-[-1.00px] font-bold text-xs">
            <span className="text-white">Mine</span>
            <span className="text-[#ff6b00]">Guard</span>
          </div>

          <div className="self-stretch font-medium text-white text-[8px]">
            Advance Coal Mine Management
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <NavigationMenu>
        <NavigationMenuList className="flex items-center gap-[30px]">
          {navItems.map((item, index) => (
            <NavigationMenuItem key={index}>
              <NavigationMenuLink
                className={`font-medium text-base ${item.active ? "text-[#ff6b00]" : "text-white"}`}
              >
                {item.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* User Profile Section */}
      <div className="flex items-center justify-center gap-6">
        <BellIcon className="w-6 h-6 text-white" />

        <div className="relative">
          <div 
            className="flex items-center justify-center gap-2 cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Avatar className="w-9 h-9">
              <AvatarImage src={displayUser.avatar} alt={displayUser.name} />
              <AvatarFallback>{displayUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="font-medium text-white text-xs">{displayUser.name}</span>
            {civicUser && (
              <div className="w-2 h-2 bg-green-400 rounded-full" title="Verified with Civic" />
            )}
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#2c2c2c] border border-gray-700 rounded-md shadow-lg z-20">
              {civicUser && (
                <div className="px-4 py-2 border-b border-gray-700">
                  <div className="flex items-center gap-2 text-xs text-green-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    Civic Verified
                  </div>
                  {civicUser.email && (
                    <div className="text-xs text-gray-400 mt-1">{civicUser.email}</div>
                  )}
                </div>
              )}
              <Button
                variant="ghost"
                className="w-full flex items-center gap-2 px-4 py-2 text-white hover:bg-[#3c3c3c] justify-start"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};