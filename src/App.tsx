import { useState } from "react";
import { DashboardAdmins } from "./screens/DashboardAdmins/DashboardAdmins";
import { LandingPage } from "./screens/LandingPage/LandingPage";
import { LoginPage } from "./screens/LoginPage";

type User = {
  name: string;
  avatar: string;
};

export const App = (): JSX.Element => {
  const [currentView, setCurrentView] = useState<"landing" | "login" | "dashboard">("landing");
  const [user, setUser] = useState<User | null>(null);

  const handleNavigateToLogin = () => {
    setCurrentView("login");
  };
  
  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView("login");
  };

  const handleNavigateToLanding = () => {
    setCurrentView("landing");
  };

  const renderView = () => {
    switch (currentView) {
      case "landing":
        return <LandingPage onNavigateToDashboard={handleNavigateToLogin} />;
      case "login":
        return <LoginPage onLogin={handleLogin} />;
      case "dashboard":
        return user && <DashboardAdmins user={user} onLogout={handleLogout} onNavigateToLanding={handleNavigateToLanding} />;
      default:
        return <LandingPage onNavigateToDashboard={handleNavigateToLogin} />;
    }
  };

  return (
    <div className="w-full h-full bg-[#1e1e1e]">
      {renderView()}
    </div>
  );
}; 