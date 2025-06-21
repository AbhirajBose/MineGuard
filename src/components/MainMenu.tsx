import { useState } from "react";
import { Input } from "./ui/input";

// Custom Icon component for using SVG files from public folder
const Icon = ({ name, className, ...props }: { name: string; className?: string; [key: string]: any }) => {
  return (
    <img 
      src={`/${name}.svg`} 
      alt={name} 
      className={className} 
      {...props}
    />
  );
};

interface MainMenuProps {
  className?: string;
  onMenuItemClick?: (label: string) => void;
  selectedItem?: string;
}

export const MainMenu = ({ className, onMenuItemClick, selectedItem = "Dashboard" }: MainMenuProps): JSX.Element => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const mainMenuItems = [
    {
      icon: <Icon name="dashboard" className="w-5 h-5" />,
      label: "Dashboard",
    },
    {
      icon: <Icon name="schedule" className="w-5 h-5" />,
      label: "Shift & Schedule",
    },
    {
      icon: <Icon name="logbook" className="w-5 h-5" />,
      label: "LogBook",
    },
    {
      icon: <Icon name="production" className="w-5 h-5" />,
      label: "Production Stats",
    },
  ];

  const toolsMenuItems = [
    {
      icon: <Icon name="vr tranning" className="w-5 h-5" />,
      label: "VR Training",
    },
    {
      icon: <Icon name="Equipment" className="w-5 h-5" />,
      label: "Equipment Verification",
    },
    {
      icon: <Icon name="web3" className="w-5 h-5" />,
      label: "Web3 Tracking",
    },
    {
      icon: <Icon name="ocrlog" className="w-5 h-5" />,
      label: "OCR Logs",
    },
  ];

  const handleMenuItemClick = (label: string) => {
    if (onMenuItemClick) {
      onMenuItemClick(label);
    }
  };

  const isItemSelected = (label: string) => selectedItem === label;

  return (
    <nav className={`flex flex-col h-screen transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-[237px]'
    } py-4 px-[27px] bg-[#2c2c2c] ${className || ''}`}>
      <div className="flex flex-col w-full items-start gap-6">
        {/* Toggle button for responsive behavior */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="self-end p-1 rounded hover:bg-[#3c3c3c] transition-colors"
        >
          <Icon name="maki-arrow" className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>

        {/* Search bar - hidden when collapsed */}
        {!isCollapsed && (
          <div className="relative w-full h-[30px] bg-[#1e1e1e] rounded-[30px] overflow-hidden">
            <div className="flex items-center gap-[5px] absolute top-1.5 left-[11px] w-[calc(100%-22px)]">
              <Icon name="mage-dashboard-2-fill" className="w-[18px] h-[18px] text-[#ffffff99]" />
              <Input
                className="h-6 px-0 border-0 bg-transparent text-xs text-[#ffffff99] font-['Poppins',Helvetica] placeholder:text-[#ffffff99] focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Search"
              />
            </div>
          </div>
        )}

        {/* Main Menu Items */}
        <div className="flex flex-col w-full items-start gap-2">
          {!isCollapsed && (
            <h3 className="font-['Poppins',Helvetica] font-medium text-[#ffffff99] text-[10px]">
              MAIN
            </h3>
          )}

          <div className="flex flex-col items-start gap-3.5 w-full">
            {mainMenuItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 w-full cursor-pointer hover:opacity-80 p-2 rounded transition-colors ${
                  isItemSelected(item.label) ? 'bg-[#ff6b00] bg-opacity-20' : 'hover:bg-[#3c3c3c]'
                }`}
                onClick={() => handleMenuItemClick(item.label)}
                title={isCollapsed ? item.label : undefined}
              >
                {item.icon}
                {!isCollapsed && (
                  <span className={`font-['Poppins',Helvetica] font-medium text-sm ${
                    isItemSelected(item.label) ? "text-[#ff6b00]" : "text-white"
                  }`}>
                    {item.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tools Menu Items */}
        <div className="flex flex-col w-full items-start gap-2">
          {!isCollapsed && (
            <h3 className="font-['Poppins',Helvetica] font-medium text-[#ffffff99] text-[10px]">
              TOOLS
            </h3>
          )}

          <div className="flex flex-col items-start gap-3.5 w-full">
            {toolsMenuItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 w-full cursor-pointer hover:opacity-80 p-2 rounded transition-colors ${
                  isItemSelected(item.label) ? 'bg-[#ff6b00] bg-opacity-20' : 'hover:bg-[#3c3c3c]'
                }`}
                onClick={() => handleMenuItemClick(item.label)}
                title={isCollapsed ? item.label : undefined}
              >
                {item.icon}
                {!isCollapsed && (
                  <span className={`font-['Poppins',Helvetica] font-medium text-sm ${
                    isItemSelected(item.label) ? "text-[#ff6b00]" : "text-white"
                  }`}>
                    {item.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}; 