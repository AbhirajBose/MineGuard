import { Badge } from "../../../../components/ui/badge";
import { Card } from "../../../../components/ui/card";

export const AiFeaturesSection = (): JSX.Element => {
  // Feature data for mapping
  const features = [
    {
      icon: "/mingcute-cardboard-vr-fill.svg",
      title: "VR Training Modules",
      description:
        "Immersive virtual reality training simulations for emergency procedures and equipment operation without real-world risks.",
    },
    {
      icon: "/garden-security-26.svg",
      title: "GenAl Safety Checks",
      description:
        "Al-powered computer vision ensures proper safety equipment usage with real-time alerts for compliance issues.",
    },
    {
      icon: "/fluent-bot-sparkle-32-filled.svg",
      title: "RAG Chatbot Assistant",
      description:
        "24/7 Al assistant with access to all safety protocols, equipment manuals, and historical incident data for immediate guidance.",
    },
  ];

  return (
    <section className="flex items-center justify-between px-[90px] py-[60px] relative self-stretch w-full bg-[#131313]">
      <div className="flex flex-col w-[570px] items-start justify-center gap-5 relative">
        <Badge className="px-6 py-1.5 bg-[#15ff0024] text-[#15ff00] font-medium border-[#15ff00] shadow-[0px_4px_4px_#00000040] rounded-[20px]">
          Ai Powered Safety
        </Badge>

        <div className="flex flex-col gap-10 items-start relative self-stretch w-full">
          <div className="flex flex-col items-start gap-6 relative self-stretch w-full">
            <h2 className="w-fit mt-[-1.00px] font-['Inter',Helvetica] font-bold text-white text-[32px] leading-normal">
              Advanced Safety Monitoring and <br />
              Training Systems
            </h2>

            <p className="self-stretch font-['Inter',Helvetica] font-medium text-[#ffffffb2] text-xl leading-normal">
              Our Al-powered safety systems continuously monitor <br />
              equipment and personnel to prevent accidents before they <br />
              happen.
            </p>
          </div>

          <div className="flex flex-col w-[527px] items-start gap-10 relative">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-6 w-full">
              <div className="w-10 h-10 bg-[#ff6b0033] rounded-[10px] overflow-hidden border border-solid border-[#ff6b00] relative flex-shrink-0">
                <img
                  className="absolute w-6 h-6 top-2 left-2"
                  alt={feature.title}
                  src={feature.icon}
                />
              </div>

              <div className="flex flex-col items-start gap-3.5">
                <h3 className="font-['Inter',Helvetica] font-bold text-white text-base leading-normal whitespace-nowrap">
                  {feature.title}
                </h3>

                <p className="font-['Inter',Helvetica] font-medium text-[#ffffffb2] text-sm leading-normal">
                  {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Card className="flex flex-col w-[540px] items-start gap-2.5 mr-[-10.00px] rounded-[20px] overflow-hidden border-[20px] border-solid border-[#2c2c2c] p-0">
        <img
          className="h-[501.94px] relative self-stretch w-full object-cover"
          alt="Worker with safety equipment"
          src="/image-6.png"
        />
      </Card>
    </section>
  );
};
