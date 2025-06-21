import { BellIcon } from "lucide-react";
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

interface DashNavProps {
  onNavigateToLanding?: () => void;
}

export const DashNav = ({ onNavigateToLanding }: DashNavProps): JSX.Element => {
  // Navigation menu items data
  const navItems = [
    { label: "Features", active: false },
    { label: "Dashboard", active: true },
    { label: "Tranning", active: false },
    { label: "Safety", active: false },
  ];

  const handleLogout = () => {
    if (onNavigateToLanding) {
      onNavigateToLanding();
    }
  };

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

        <div className="flex items-center justify-center gap-2">
          <Avatar className="w-9 h-9">
            <AvatarImage src="/frame-16.svg" alt="User avatar" />
            <AvatarFallback>CH</AvatarFallback>
          </Avatar>
          <span className="font-medium text-white text-xs">Charle</span>
        </div>

        <Button
          variant="ghost"
          className="h-auto px-4 py-1.5 bg-[#ffffff57] rounded text-white hover:bg-[#ffffff70] font-semibold text-xs"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </header>
  );
};
