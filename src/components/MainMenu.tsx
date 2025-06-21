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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    // Close mobile menu when item is clicked
    setIsMobileMenuOpen(false);
  };

  const isItemSelected = (label: string) => selectedItem === label;

  return (
    <>
      {/* Mobile Menu Toggle Button - Only visible on mobile */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#2c2c2c] border border-gray-700 rounded-lg hover:bg-[#3c3c3c] transition-colors duration-200"
        title="Toggle menu"
      >
        <Icon 
          name="maki-arrow" 
          className={`w-5 h-5 text-white transition-transform duration-300 ${
            isMobileMenuOpen ? 'rotate-90' : '-rotate-90'
          }`} 
        />
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Navigation Menu */}
      <nav className={`flex flex-col h-screen transition-all duration-300 ${
        isCollapsed ? 'w-16 lg:w-20' : 'w-64 lg:w-72'
      } py-4 ${isCollapsed ? 'px-2' : 'px-4 lg:px-6'} bg-[#2c2c2c] border-r border-gray-700 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } fixed lg:relative z-50 lg:z-auto ${className || ''}`}>
        <div className="flex flex-col w-full items-start gap-3 h-full">
          {/* Desktop Toggle button - Only visible on desktop */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="self-end p-2 rounded-lg hover:bg-[#3c3c3c] transition-colors duration-200 hidden lg:block"
            title={isCollapsed ? "Expand menu" : "Collapse menu"}
          >
            <Icon 
              name="maki-arrow" 
              className={`w-4 h-4 text-white transition-transform duration-300 ${
                !isCollapsed ? 'rotate-90' : '-rotate-90'
              }`} 
            />
          </button>

          {/* Mobile Close Button - Only visible on mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="self-end p-2 rounded-lg hover:bg-[#3c3c3c] transition-colors duration-200 lg:hidden"
            title="Close menu"
          >
            <Icon 
              name="maki-arrow" 
              className="w-4 h-4 text-white rotate-90" 
            />
          </button>

          {/* Main Menu Items */}
          <div className="flex flex-col w-full items-start gap-2 mt-2">
            {!isCollapsed && (
              <h3 className="font-['Poppins',Helvetica] font-medium text-[#ffffff99] text-[10px] px-2 uppercase tracking-wider">
                Main
              </h3>
            )}

            <div className="flex flex-col items-start gap-2 w-full">
              {mainMenuItems.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 w-full cursor-pointer p-3 rounded-lg transition-all duration-200 group ${
                    isItemSelected(item.label) 
                      ? 'bg-[#ff6b00] bg-opacity-20 border border-[#ff6b00] border-opacity-30' 
                      : 'hover:bg-[#3c3c3c] hover:border hover:border-gray-600'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                  onClick={() => handleMenuItemClick(item.label)}
                  title={isCollapsed ? item.label : undefined}
                >
                  <div className={`transition-all duration-200 ${
                    isItemSelected(item.label) 
                      ? '[filter:invert(53%)_sepia(94%)_saturate(1493%)_hue-rotate(357deg)_brightness(101%)_contrast(102%)]' 
                      : 'filter brightness-0 invert opacity-70 group-hover:opacity-100'
                  }`}>
                    {item.icon}
                  </div>
                  {!isCollapsed && (
                    <span className={`font-['Poppins',Helvetica] font-medium text-sm transition-colors duration-200 ${
                      isItemSelected(item.label) 
                        ? "text-[#ff6b00] font-semibold" 
                        : "text-white opacity-70 group-hover:opacity-100"
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
              <h3 className="font-['Poppins',Helvetica] font-medium text-[#ffffff99] text-[10px] px-2 uppercase tracking-wider">
                Tools
              </h3>
            )}

            <div className="flex flex-col items-start gap-2 w-full">
              {toolsMenuItems.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 w-full cursor-pointer p-3 rounded-lg transition-all duration-200 group ${
                    isItemSelected(item.label) 
                      ? 'bg-[#ff6b00] bg-opacity-20 border border-[#ff6b00] border-opacity-30' 
                      : 'hover:bg-[#3c3c3c] hover:border hover:border-gray-600'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                  onClick={() => handleMenuItemClick(item.label)}
                  title={isCollapsed ? item.label : undefined}
                >
                  <div className={`transition-all duration-200 ${
                    isItemSelected(item.label) 
                      ? '[filter:invert(53%)_sepia(94%)_saturate(1493%)_hue-rotate(357deg)_brightness(101%)_contrast(102%)]'
                      : 'filter brightness-0 invert opacity-70 group-hover:opacity-100'
                  }`}>
                    {item.icon}
                  </div>
                  {!isCollapsed && (
                    <span className={`font-['Poppins',Helvetica] font-medium text-sm transition-colors duration-200 ${
                      isItemSelected(item.label) 
                        ? "text-[#ff6b00] font-semibold" 
                        : "text-white opacity-70 group-hover:opacity-100"
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
    </>
  );
}; 