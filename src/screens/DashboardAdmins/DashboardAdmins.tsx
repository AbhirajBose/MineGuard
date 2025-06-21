import { useState } from "react";
import { DashboardPage } from "./sections/DashboardPage";
import { DashNav } from "./sections/DashNav";
import { EquipmentCheckSection } from "./sections/EquipmentCheckSection";
import { LogBookPage } from "./sections/LogBookPage";
import { MainMenuSection } from "./sections/MainMenuSection/MainMenuSection";
import { OCRLogsPage } from "./sections/OCRLogsPage";
import { ProductionPage } from "./sections/ProductionPage";
import { ScanActionsSection } from "./sections/ScanActionsSection";
import { SchedulePage } from "./sections/SchedulePage";
import { VRTrainingPage } from "./sections/VRTrainingPage";
import { Web3TrackingPage } from "./sections/Web3TrackingPage";

interface User {
  name: string;
  avatar: string;
}

interface DashboardAdminsProps {
  user: User;
  onLogout: () => void;
  onNavigateToLanding?: () => void;
}

export const DashboardAdmins = ({ user, onLogout, onNavigateToLanding }: DashboardAdminsProps): JSX.Element => {
  const [currentPage, setCurrentPage] = useState("Dashboard");

  const handleMenuClick = (menuItem: string) => {
    setCurrentPage(menuItem);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "Dashboard":
        return <DashboardPage user={user} />;
      case "Shift & Schedule":
        return <SchedulePage />;
      case "LogBook":
        return <LogBookPage />;
      case "Production Stats":
        return <ProductionPage />;
      case "VR Training":
        return <VRTrainingPage />;
      case "Equipment Verification":
        return (
          <>
            <EquipmentCheckSection />
            <ScanActionsSection />
          </>
        );
      case "Web3 Tracking":
        return <Web3TrackingPage />;
      case "OCR Logs":
        return <OCRLogsPage />;
      default:
        return <DashboardPage user={user} />;
    }
  };

  return (
    <div className="bg-[#1e1e1e] flex flex-col w-full min-h-screen">
      <DashNav user={user} onLogout={onLogout} />
      <div className="flex flex-1">
        <aside className="h-full">
          <MainMenuSection onMenuItemClick={handleMenuClick} selectedItem={currentPage} />
        </aside>
        <main className="flex-1 flex flex-col overflow-auto">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
};
