import { useState } from "react";

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
      isCollapsed ? 'w-24' : 'w-[237px]'
    } py-4 ${isCollapsed ? 'px-4' : 'px-[27px]'} bg-[#2c2c2c] ${className || ''}`}>
      <div className="flex flex-col w-full items-start gap-6">
        {/* Toggle button for responsive behavior */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="self-end p-1 rounded-full hover:bg-[#3c3c3c] transition-colors"
        >
          <Icon name="maki-arrow" className={`w-5 h-5 text-white transition-transform duration-300 ${!isCollapsed ? 'rotate-90' : '-rotate-90'}`} />
        </button>

        {/* Main Menu Items */}
        <div className="flex flex-col w-full items-start gap-2 mt-4">
          {!isCollapsed && (
            <h3 className="font-['Poppins',Helvetica] font-medium text-[#ffffff99] text-[10px] px-2">
              MAIN
            </h3>
          )}

          <div className="flex flex-col items-start gap-3.5 w-full">
            {mainMenuItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 w-full cursor-pointer hover:opacity-80 p-2 rounded transition-colors ${
                  isItemSelected(item.label) ? 'bg-[#ff6b00] bg-opacity-20' : 'hover:bg-[#3c3c3c]'
                } ${isCollapsed ? 'justify-center' : ''}`}
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
            <h3 className="font-['Poppins',Helvetica] font-medium text-[#ffffff99] text-[10px] px-2">
              TOOLS
            </h3>
          )}

          <div className="flex flex-col items-start gap-3.5 w-full">
            {toolsMenuItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 w-full cursor-pointer hover:opacity-80 p-2 rounded transition-colors ${
                  isItemSelected(item.label) ? 'bg-[#ff6b00] bg-opacity-20' : 'hover:bg-[#3c3c3c]'
                } ${isCollapsed ? 'justify-center' : ''}`}
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