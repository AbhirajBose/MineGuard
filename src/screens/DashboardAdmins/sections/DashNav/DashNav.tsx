import { useUser } from "@civic/auth/react";
import { BellIcon, LogOut, User, Shield, Settings } from "lucide-react";
import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";

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
  const { user: civicUser, signOut } = useUser();

  const handleLogout = async () => {
    try {
      await signOut();
      onLogout();
    } catch (error) {
      console.error("Logout failed:", error);
      // Fallback to local logout
      onLogout();
    }
    setIsDropdownOpen(false);
  };

  // Use Civic user data if available, otherwise fallback to prop user
  const displayUser = civicUser ? {
    name: civicUser.name || civicUser.given_name || civicUser.email || user.name,
    avatar: civicUser.picture || user.avatar,
    email: civicUser.email,
    id: civicUser.id,
    givenName: civicUser.given_name,
    familyName: civicUser.family_name
  } : user;

  // Get display name with fallbacks
  const getDisplayName = () => {
    if (civicUser) {
      if (civicUser.name) return civicUser.name;
      if (civicUser.given_name && civicUser.family_name) {
        return `${civicUser.given_name} ${civicUser.family_name}`;
      }
      if (civicUser.given_name) return civicUser.given_name;
      if (civicUser.email) return civicUser.email.split('@')[0];
    }
    return user.name;
  };

  const displayName = getDisplayName();

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

      {/* User Profile Section */}
      <div className="flex items-center justify-center gap-6">
        <BellIcon className="w-6 h-6 text-white cursor-pointer hover:text-[#ff6b00] transition-colors" />

        <div className="relative">
          <div 
            className="flex items-center justify-center gap-2 cursor-pointer hover:bg-[#3c3c3c] px-2 py-1 rounded-md transition-colors"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Avatar className="w-9 h-9">
              <AvatarImage src={displayUser.avatar} alt={displayName} />
              <AvatarFallback className="bg-[#6c47ff] text-white">
                {displayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <span className="font-medium text-white text-xs">{displayName}</span>
              {civicUser && (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full" title="Verified with Civic" />
                  <span className="text-[8px] text-green-400">Verified</span>
                </div>
              )}
            </div>
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-[#2c2c2c] border border-gray-700 rounded-md shadow-lg z-20">
              {/* User Info Header */}
              <div className="px-4 py-3 border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={displayUser.avatar} alt={displayName} />
                    <AvatarFallback className="bg-[#6c47ff] text-white">
                      {displayName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium text-white text-sm">{displayName}</div>
                    {displayUser.email && (
                      <div className="text-xs text-gray-400">{displayUser.email}</div>
                    )}
                    {civicUser && civicUser.given_name && civicUser.family_name && (
                      <div className="text-xs text-gray-500 mt-1">
                        {civicUser.given_name} {civicUser.family_name}
                      </div>
                    )}
                  </div>
                </div>
                
                {civicUser && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-green-400">
                    <Shield className="w-3 h-3" />
                    <span>Civic Identity Verified</span>
                  </div>
                )}
              </div>

              {/* Menu Items */}
              <div className="py-1">
                <Button
                  variant="ghost"
                  className="w-full flex items-center gap-3 px-4 py-2 text-white hover:bg-[#3c3c3c] justify-start"
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </Button>
                
                <Button
                  variant="ghost"
                  className="w-full flex items-center gap-3 px-4 py-2 text-white hover:bg-[#3c3c3c] justify-start"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </Button>
                
                <div className="border-t border-gray-700 my-1"></div>
                
                <Button
                  variant="ghost"
                  className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-900/20 justify-start"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};