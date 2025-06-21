import {
  AlertCircleIcon,
  CameraIcon,
  CheckIcon,
  UploadIcon,
} from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";

export const ScanActionsSection = (): JSX.Element => {
  // Current scan items data
  const scanItems = [
    { name: "Safety Helmet", passed: true },
    { name: "Jacket", passed: false },
    { name: "Googgles", passed: true },
    { name: "Earplugs", passed: true },
    { name: "Respiration", passed: true },
    { name: "Gloves", passed: false },
  ];

  // Recent scans data
  const recentScans = [
    { name: "Moulendu Chowley", passed: true, timeAgo: "2min ago" },
    { name: "Moulendu Chowley", passed: false, timeAgo: "2min ago" },
    { name: "Moulendu Chowley", passed: true, timeAgo: "2min ago" },
    { name: "Moulendu Chowley", passed: true, timeAgo: "2min ago" },
    { name: "Moulendu Chowley", passed: false, timeAgo: "2min ago" },
    { name: "Moulendu Chowley", passed: false, timeAgo: "2min ago" },
    { name: "Moulendu Chowley", passed: true, timeAgo: "2min ago" },
  ];

  return (
    <div className="flex flex-wrap gap-5 w-full px-10 py-0">
      {/* Current Scan Card */}
      <Card className="flex-1 min-w-[450px] bg-[#2c2c2c] border-none text-white">
        <CardHeader className="pb-0">
          <CardTitle className="text-base font-semibold font-['Poppins',Helvetica]">
            Current Scan
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            {scanItems.map((item, index) => (
              <div
                key={`scan-item-${index}`}
                className="flex items-center justify-between p-[9px] px-[13px] bg-[#393939] rounded-[10px] h-[50px]"
              >
                <div className="font-medium text-sm font-['Inter',Helvetica]">
                  {item.name}
                </div>
                {item.passed ? (
                  <CheckIcon className="w-6 h-6 text-green-500" />
                ) : (
                  <AlertCircleIcon className="w-6 h-6 text-red-500" />
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-5">
            <Button className="flex items-center gap-2.5 bg-[#ff6b00] hover:bg-[#e05f00] text-white rounded-[10px]">
              <CameraIcon className="w-6 h-6" />
              <span className="font-button-large text-white">Scan Again</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2.5 bg-[#393939] hover:bg-[#444444] text-white border-none rounded-[10px]"
            >
              <UploadIcon className="w-6 h-6" />
              <span className="font-button-large text-white">
                UploadIcon Photo
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Scans Card */}
      <Card className="flex-1 min-w-[350px] bg-[#2c2c2c] border-none text-white">
        <CardHeader className="pb-0">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base font-semibold font-['Poppins',Helvetica]">
              Recent Scans
            </CardTitle>
            <Button
              variant="link"
              className="text-[#ff6b00] text-[10px] font-medium p-0.5 h-auto"
            >
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {recentScans.map((scan, index) => (
            <div
              key={`recent-scan-${index}`}
              className="flex items-center justify-between p-[9px] px-[13px] bg-[#393939] rounded-[10px] h-[50px]"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-[32px] bg-[url(..//frame-79-6.png)] bg-cover bg-center" />
                <div className="font-medium text-sm font-['Inter',Helvetica]">
                  {scan.name}
                </div>
              </div>
              <div className="flex flex-col items-end w-[55px]">
                <div className="flex items-center gap-1 w-full justify-center">
                  <div
                    className={`w-[9px] h-[9px] rounded-[4.5px] ${
                      scan.passed ? "bg-[#1da003]" : "bg-[#ff1500]"
                    }`}
                  />
                  <div
                    className={`text-xs font-medium ${
                      scan.passed ? "text-[#1da003]" : "text-[#ff1500]"
                    }`}
                  >
                    {scan.passed ? "Passed" : "Failed"}
                  </div>
                </div>
                <div className="text-[10px] font-medium text-[#939492] text-center w-[45px]">
                  {scan.timeAgo}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
