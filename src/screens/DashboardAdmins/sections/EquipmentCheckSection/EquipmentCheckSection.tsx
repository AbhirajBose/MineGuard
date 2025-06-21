import { CameraIcon } from "lucide-react";
import { useState } from "react";
import { ScanModal } from "../../../../components/ScanModal";
import { Button } from "../../../../components/ui/button";
import { ScanSession } from "../../../../Module/scanDatabase";

interface EquipmentCheckSectionProps {
  onScanComplete?: (session: ScanSession) => void;
}

export const EquipmentCheckSection = ({ onScanComplete }: EquipmentCheckSectionProps): JSX.Element => {
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);

  const handleScanComplete = (session: ScanSession) => {
    setIsScanModalOpen(false);
    if (onScanComplete) {
      onScanComplete(session);
    }
  };

  return (
    <>
      <div className="flex w-full items-center justify-between px-10 py-5">
        <div className="flex flex-col items-start gap-0.5">
          <h2 className="text-2xl font-semibold text-white font-['Poppins',Helvetica] tracking-normal leading-normal">
            Equipment Check
          </h2>
          <p className="text-sm font-normal text-white font-['Poppins',Helvetica] tracking-normal leading-normal">
            Here's your overview for today Scans.
          </p>
        </div>

        <div className="flex items-center gap-5">
          <Button
            variant="outline"
            className="flex items-center gap-2.5 px-6 py-2 bg-[#2c2c2c] rounded-[10px] border-none hover:bg-[#3c3c3c]"
          >
            <div className="relative w-5 h-5">
              <img
                className="w-[19px] h-[19px] absolute top-px left-px"
                alt="History icon"
                src="/group-2.png"
              />
            </div>
            <span className="font-['Poppins',Helvetica] font-semibold text-white text-base tracking-[0.2px] leading-6">
              History
            </span>
          </Button>

          <Button 
            className="flex items-center gap-2.5 px-6 py-2 bg-[#ff6b00] rounded-[10px] hover:bg-[#e66000] border-none"
            onClick={() => setIsScanModalOpen(true)}
          >
            <CameraIcon className="w-6 h-6" />
            <span className="font-['Poppins',Helvetica] font-semibold text-white text-base tracking-[0.2px] leading-6">
              Start Scan
            </span>
          </Button>
        </div>
      </div>

      <ScanModal
        isOpen={isScanModalOpen}
        onClose={() => setIsScanModalOpen(false)}
        onScanComplete={handleScanComplete}
      />
    </>
  );
};
