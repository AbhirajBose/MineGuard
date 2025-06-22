import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Card } from "../../../../components/ui/card";

export const BlockchainIntegrationSection = (): JSX.Element => {
  const features = [
    {
      icon: "/mingcute-link-fill.svg",
      title: "QR Batch Tracking System",
      description:
        "Advanced QR code generation for coal batches with detailed PDF reports containing weight, quality, location, and dispatch timestamps.",
    },
    {
      icon: "/mdi-file-edit.svg",
      title: "OCR Log Conversion",
      description:
        "Automated conversion of handwritten logs to digital format for comprehensive data analysis and historical tracking.",
    },
  ];

  return (
    <section className="flex flex-wrap items-center justify-between px-6 py-24 md:px-[90px] md:py-[100px] w-full">
      <Card className="flex flex-col w-full md:w-[540px] items-start gap-2.5 rounded-[20px] overflow-hidden border-[20px] border-solid border-[#131313] bg-transparent">
        <img
          className="h-[478.49px] w-full object-cover"
          alt="QR tracking technology interface"
          src="/image-8.png"
        />
      </Card>

      <div className="flex flex-col items-start gap-6 w-full md:w-[527px]">
        <Badge className="px-6 py-1.5 bg-[#0066ff24] text-[#0066ff] rounded-[20px] border border-solid border-[#0066ff] shadow-[0px_4px_4px_#00000040] font-medium text-base">
          Advanced QR Tracking
        </Badge>

        <div className="flex flex-col gap-10 w-full">
          <div className="flex flex-col items-start gap-6 w-full">
            <h2 className="text-[32px] font-bold text-white font-['Inter',Helvetica] leading-normal">
              QR Batch Tracking
            </h2>

            <p className="text-xl font-medium text-[#ffffffb2] font-['Inter',Helvetica] leading-normal">
              QR code technology to optimize operations and ensure
              transparent supply chain management for coal batches.
            </p>
          </div>

          <div className="flex flex-col w-full md:w-[527px] gap-10">
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
    </section>
  );
};
