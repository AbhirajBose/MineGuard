import { useState } from "react";
import { DashboardAdmins } from "./screens/DashboardAdmins/DashboardAdmins";
import { LandingPage } from "./screens/LandingPage/LandingPage";

export const App = (): JSX.Element => {
  const [currentView, setCurrentView] = useState<"landing" | "dashboard">("landing");

  const handleNavigateToDashboard = () => {
    setCurrentView("dashboard");
  };

  const handleNavigateToLanding = () => {
    setCurrentView("landing");
  };

  return (
    <div className="w-full h-full">
      {currentView === "landing" ? (
        <LandingPage onNavigateToDashboard={handleNavigateToDashboard} />
      ) : (
        <DashboardAdmins onNavigateToLanding={handleNavigateToLanding} />
      )}
    </div>
  );
}; 