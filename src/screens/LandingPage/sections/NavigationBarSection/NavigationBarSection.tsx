import { Button } from "../../../../components/ui/button";

interface NavigationBarSectionProps {
  onNavigateToDashboard?: () => void;
  onNavItemClick?: (section: string) => void;
}

export const NavigationBarSection = ({ onNavigateToDashboard, onNavItemClick }: NavigationBarSectionProps): JSX.Element => {
  // Navigation menu items
  const navItems = [
    { label: "Features", href: "#features" },
    { label: "Dashboard", href: "#dashboard" },
    { label: "Training", href: "#training" },
    { label: "Safety", href: "#safety" },
  ];

  const handleLoginClick = () => {
    if (onNavigateToDashboard) {
      onNavigateToDashboard();
    }
  };

  const handleGetStartedClick = () => {
    if (onNavigateToDashboard) {
      onNavigateToDashboard();
    }
  };

  const handleNavItemClick = (e: React.MouseEvent, item: { label: string; href: string }) => {
    e.preventDefault();
    if (onNavItemClick) {
      onNavItemClick(item.label);
    }
  };

  return (
    <nav className="flex items-center justify-between px-20 py-4 sticky top-0 z-50 self-stretch w-full flex-[0_0_auto] bg-[#2c2c2c] border-b-[0.2px] [border-bottom-style:solid] border-white">
      {/* Logo and Brand */}
      <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
        <div className="relative w-[30px] h-[30px] bg-[#ff6b00] rounded-md overflow-hidden">
          <img
            className="absolute w-[22px] h-[22px] top-1 left-1"
            alt="Game icons mine"
            src="/game-icons-mine-truck.svg"
          />
        </div>

        <div className="flex flex-col w-[126px] items-start relative">
          <div className="relative self-stretch mt-[-1.00px] [font-family:'Inter',Helvetica] font-bold text-xs tracking-[0] leading-[normal]">
            <span className="text-white">Mine</span>
            <span className="text-[#ff6b00]">Guard</span>
          </div>

          <div className="relative self-stretch whitespace-nowrap [font-family:'Inter',Helvetica] font-medium text-white text-[8px] tracking-[0] leading-[normal]">
            Advance Coal Mine Management
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="inline-flex items-center gap-[30px] relative flex-[0_0_auto]">
        {navItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-medium text-white text-base tracking-[0] leading-[normal] whitespace-nowrap hover:text-[#ff6b00] transition-colors cursor-pointer"
            onClick={(e) => handleNavItemClick(e, item)}
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="inline-flex items-center gap-5 relative flex-[0_0_auto]">
        <Button
          variant="ghost"
          className="h-auto px-4 py-1.5 bg-[#ffffff57] rounded text-white hover:bg-[#ffffff70] [font-family:'Inter',Helvetica] font-semibold text-xs"
          onClick={handleLoginClick}
        >
          Login
        </Button>

        <Button 
          className="h-auto px-4 py-1.5 bg-[#ff6b00] hover:bg-[#ff6b00]/90 rounded text-white [font-family:'Inter',Helvetica] font-semibold text-xs"
          onClick={handleGetStartedClick}
        >
          Get Started
        </Button>
      </div>
    </nav>
  );
};
