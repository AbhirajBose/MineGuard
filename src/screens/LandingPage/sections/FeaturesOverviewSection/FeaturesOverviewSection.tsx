import {
  ArrowRightIcon
} from "lucide-react";
import { Card, CardContent } from "../../../../components/ui/card";

export const FeaturesOverviewSection = (): JSX.Element => {
  // Feature data for mapping
  const features = [
    {
      title: "Bento-Style Dashboard",
      description:
        "Modular, customizable dashboard providing at-a-glance insights into all critical mine operations and safety metrics.",
      icon: "/mage-dashboard-2-fill.svg",
      alt: "Mage dashboard",
    },
    {
      title: "Digital Logbook System",
      description:
        "Centralized logging system for shift reports, maintenance records, and safety incidents with OCR for paper log conversion.",
      icon: "/basil-book-solid.svg",
      alt: "Basil book solid",
    },
    {
      title: "Real-Time Alerts",
      description:
        "Immediate notifications for safety concerns, equipment failures, and environmental changes requiring attention.",
      icon: "/mdi-bell.svg",
      alt: "Mdi bell",
    },
    {
      title: "Attendance Tracking",
      description:
        "Automated personnel tracking with biometric verification for enhanced safety and accurate time management.",
      icon: "/material-symbols-person-check-rounded.svg",
      alt: "Material symbols",
    },
    {
      title: "Production Analytics",
      description:
        "Advanced data visualization and predictive analytics to optimize production and identify efficiency improvements.",
      icon: "/tabler-chart-pie-filled.svg",
      alt: "Group",
    },
    {
      title: "Aptos Batch Tracking",
      description:
        "Web3-powered supply chain visibility with immutable records of coal batches from extraction to delivery.",
      icon: "/mingcute-link-fill.svg",
      alt: "Group",
    },
  ];

  return (
    <section className="flex flex-col items-center gap-11 py-[45px] relative w-full bg-[#1e1e1e]">
      <div className="flex flex-col max-w-[635px] items-center gap-2.5">
        <h2 className="font-bold text-white text-[32px] text-center tracking-[0] leading-normal [font-family:'Inter',Helvetica]">
          Comprehensive Mine Management <br />
          Features
        </h2>

        <p className="font-medium text-[#ffffffb2] text-base text-center tracking-[0] leading-normal [font-family:'Inter',Helvetica]">
          Our platform integrates Cutting edge technologies to revolutionize
          coal mine operations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1160px] px-4">
        {features.slice(0, 3).map((feature, index) => (
          <Card
            key={`feature-${index}`}
            className="bg-[#2c2c2c] border-none rounded-[10px] overflow-hidden"
          >
            <CardContent className="flex flex-col items-start gap-4 p-5">
              <div className="inline-flex items-center gap-2.5 p-2 bg-[#ff6b0033] rounded-[10px] overflow-hidden border border-solid border-[#ff6b00]">
                <img
                  className="relative w-6 h-6"
                  alt={feature.alt}
                  src={feature.icon}
                />
              </div>

              <div className="flex flex-col items-start gap-[18px] w-full">
                <h3 className="font-bold text-white text-base tracking-[0] leading-normal whitespace-nowrap [font-family:'Inter',Helvetica]">
                  {feature.title}
                </h3>

                <p className="font-medium text-[#ffffffb2] text-sm tracking-[0] leading-normal [font-family:'Inter',Helvetica]">
                  {feature.description}
                </p>

                <div className="flex items-center gap-2.5">
                  <span className="font-medium text-[#ff6b00] text-sm tracking-[0] leading-normal [font-family:'Inter',Helvetica]">
                    Learn More
                  </span>
                  <ArrowRightIcon className="w-[15px] h-[15px] text-[#ff6b00]" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1160px] px-4">
        {features.slice(3, 6).map((feature, index) => (
          <Card
            key={`feature-${index + 3}`}
            className="bg-[#2c2c2c] border-none rounded-[10px] overflow-hidden"
          >
            <CardContent className="flex flex-col items-start gap-4 p-5">
              <div className="inline-flex items-center gap-2.5 p-2 bg-[#ff6b0033] rounded-[10px] overflow-hidden border border-solid border-[#ff6b00]">
                <img
                  className="relative w-6 h-6"
                  alt={feature.alt}
                  src={feature.icon}
                />
              </div>

              <div className="flex flex-col items-start gap-[18px] w-full">
                <h3 className="font-bold text-white text-base tracking-[0] leading-normal whitespace-nowrap [font-family:'Inter',Helvetica]">
                  {feature.title}
                </h3>

                <p className="font-medium text-[#ffffffb2] text-sm tracking-[0] leading-normal [font-family:'Inter',Helvetica]">
                  {feature.description}
                </p>

                <div className="flex items-center gap-2.5">
                  <span className="font-medium text-[#ff6b00] text-sm tracking-[0] leading-normal [font-family:'Inter',Helvetica]">
                    Learn More
                  </span>
                  <ArrowRightIcon className="w-[15px] h-[15px] text-[#ff6b00]" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
