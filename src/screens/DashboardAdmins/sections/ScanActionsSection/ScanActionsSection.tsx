import {
  AlertCircleIcon,
  CameraIcon,
  CheckIcon,
  UploadIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { ScanModal } from "../../../../components/ScanModal";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { REQUIRED_EQUIPMENT } from "../../../../Module/geminiService";
import { scanDatabase, ScanSession } from "../../../../Module/scanDatabase";

export const ScanActionsSection = (): JSX.Element => {
  const [currentScan, setCurrentScan] = useState<ScanSession | null>(null);
  const [recentScans, setRecentScans] = useState<ScanSession[]>([]);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadScanData();
  }, []);

  const loadScanData = async () => {
    try {
      const recent = await scanDatabase.getRecentScans(7);
      setRecentScans(recent);
      
      // Set the most recent scan as current scan
      if (recent.length > 0) {
        setCurrentScan(recent[0]);
      }
    } catch (error) {
      console.error('Error loading scan data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScanComplete = async (session: ScanSession) => {
    setIsScanModalOpen(false);
    setCurrentScan(session);
    await loadScanData(); // Refresh the data
  };

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}min ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getEquipmentStatus = (equipmentName: string) => {
    if (!currentScan) return { passed: false, confidence: 0 };
    
    const result = currentScan.results.find(r => r.equipmentName === equipmentName);
    return {
      passed: result?.isPresent || false,
      confidence: result?.confidence || 0
    };
  };

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-5 w-full px-10 py-0">
        <Card className="flex-1 min-w-[450px] bg-[#2c2c2c] border-none text-white">
          <CardContent className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff6b00]"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap gap-5 w-full px-10 py-0">
        {/* Current Scan Card */}
        <Card className="flex-1 min-w-[450px] bg-[#2c2c2c] border-none text-white">
          <CardHeader className="pb-0">
            <CardTitle className="text-base font-semibold font-['Poppins',Helvetica]">
              Current Scan
              {currentScan && (
                <span className="text-sm text-gray-400 ml-2">
                  {formatTimeAgo(currentScan.timestamp)}
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            {currentScan ? (
              <>
                <div className="flex flex-col gap-2">
                  {REQUIRED_EQUIPMENT.map((equipment, index) => {
                    const status = getEquipmentStatus(equipment.name);
                    return (
                      <div
                        key={`scan-item-${index}`}
                        className="flex items-center justify-between p-[9px] px-[13px] bg-[#393939] rounded-[10px] h-[50px]"
                      >
                        <div className="font-medium text-sm font-['Inter',Helvetica]">
                          {equipment.name}
                        </div>
                        <div className="flex items-center gap-2">
                          {status.passed ? (
                            <CheckIcon className="w-6 h-6 text-green-500" />
                          ) : (
                            <AlertCircleIcon className="w-6 h-6 text-red-500" />
                          )}
                          <span className="text-xs text-gray-400">
                            {status.confidence}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-5">
                  <Button 
                    className="flex items-center gap-2.5 bg-[#ff6b00] hover:bg-[#e05f00] text-white rounded-[10px]"
                    onClick={() => setIsScanModalOpen(true)}
                  >
                    <CameraIcon className="w-6 h-6" />
                    <span className="font-button-large text-white">Scan Again</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2.5 bg-[#393939] hover:bg-[#444444] text-white border-none rounded-[10px]"
                    onClick={() => setIsScanModalOpen(true)}
                  >
                    <UploadIcon className="w-6 h-6" />
                    <span className="font-button-large text-white">
                      Upload Photo
                    </span>
                  </Button>
                </div>

                <div className={`p-3 rounded-lg text-center ${
                  currentScan.overallPassed 
                    ? 'bg-green-500/20 border border-green-500' 
                    : 'bg-red-500/20 border border-red-500'
                }`}>
                  <h4 className="font-semibold">
                    {currentScan.overallPassed ? '✅ All Equipment Present' : '❌ Missing Equipment'}
                  </h4>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">No scan data available</p>
                <Button 
                  className="bg-[#ff6b00] hover:bg-[#e05f00] text-white"
                  onClick={() => setIsScanModalOpen(true)}
                >
                  <CameraIcon className="w-5 h-5 mr-2" />
                  Start First Scan
                </Button>
              </div>
            )}
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
            {recentScans.length > 0 ? (
              recentScans.slice(0, 7).map((scan, index) => (
                <div
                  key={`recent-scan-${index}`}
                  className="flex items-center justify-between p-[9px] px-[13px] bg-[#393939] rounded-[10px] h-[50px]"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-[32px] bg-[#ff6b00] flex items-center justify-center">
                      <CameraIcon className="w-4 h-4 text-white" />
                    </div>
                    <div className="font-medium text-sm font-['Inter',Helvetica]">
                      Scan #{scan.id.slice(-6)}
                    </div>
                  </div>
                  <div className="flex flex-col items-end w-[55px]">
                    <div className="flex items-center gap-1 w-full justify-center">
                      <div
                        className={`w-[9px] h-[9px] rounded-[4.5px] ${
                          scan.overallPassed ? "bg-[#1da003]" : "bg-[#ff1500]"
                        }`}
                      />
                      <div
                        className={`text-xs font-medium ${
                          scan.overallPassed ? "text-[#1da003]" : "text-[#ff1500]"
                        }`}
                      >
                        {scan.overallPassed ? "Passed" : "Failed"}
                      </div>
                    </div>
                    <div className="text-[10px] font-medium text-[#939492] text-center w-[45px]">
                      {formatTimeAgo(scan.timestamp)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                No recent scans
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <ScanModal
        isOpen={isScanModalOpen}
        onClose={() => setIsScanModalOpen(false)}
        onScanComplete={handleScanComplete}
      />
    </>
  );
};
