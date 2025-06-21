import { AiFeaturesSection } from "./sections/AiFeaturesSection";
import { BlockchainIntegrationSection } from "./sections/BlockchainIntegrationSection";
import { CallToActionSection } from "./sections/CallToActionSection";
import { DashboardSection } from "./sections/DashboardSection";
import { FeaturesOverviewSection } from "./sections/FeaturesOverviewSection";
import { FooterSection } from "./sections/FooterSection";
import { HeroSection } from "./sections/HeroSection";
import { NavigationBarSection } from "./sections/NavigationBarSection";

interface LandingPageProps {
  onNavigateToDashboard?: () => void;
}

export const LandingPage = ({ onNavigateToDashboard }: LandingPageProps): JSX.Element => {
  return (
    <main className="flex flex-col w-full bg-[#1e1e1e]">
      <NavigationBarSection onNavigateToDashboard={onNavigateToDashboard} />
      <HeroSection />
      <FeaturesOverviewSection />
      <DashboardSection />
      <AiFeaturesSection />
      <BlockchainIntegrationSection />
      <CallToActionSection onNavigateToDashboard={onNavigateToDashboard} />
      <FooterSection />
    </main>
  );
};
