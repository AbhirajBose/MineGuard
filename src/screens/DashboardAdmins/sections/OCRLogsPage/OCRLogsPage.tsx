import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CameraIcon, CheckIcon, DownloadIcon, FileTextIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { OcrScannerModal } from "../../../../components/OcrScannerModal";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { geminiService } from "../../../../Module/geminiService";
import { OcrScan, ocrDatabase } from "../../../../Module/ocrDatabase";

function parseMarkdownTable(md: string): { head: string[]; body: string[][] } | null {
  // Simple parser for markdown tables
  const lines = md.trim().split(/\r?\n/).filter(l => l.trim().length > 0);
  if (lines.length < 2) return null;
  const head = lines[0].split("|").map(s => s.trim()).filter(Boolean);
  const body = lines.slice(2).map(line => line.split("|").map(s => s.trim()).filter(Boolean));
  return { head, body };
}

export const OCRLogsPage = (): JSX.Element => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [recentScans, setRecentScans] = useState<OcrScan[]>([]);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    loadRecentScans();
  }, []);

  const loadRecentScans = async () => {
    const scans = await ocrDatabase.getRecentOcrScans(5);
    setRecentScans(scans);
  };

  const handleScanComplete = (scan: OcrScan) => {
    console.log("OCR Scan complete", scan);
    setRecentScans((prev) => [scan, ...prev].slice(0, 5));
  };

  const handleDownloadPdf = async (scan: OcrScan) => {
    setDownloadingId(scan.id);
    let tableMd = "";
    try {
      // Use Gemini to convert extracted text to markdown table
      tableMd = await geminiService.performTableExtraction(scan.extractedText);
    } catch (err) {
      tableMd = "";
    }
    let table = tableMd ? parseMarkdownTable(tableMd) : null;
    const doc = new jsPDF();
    doc.text(`Document: ${scan.filename}`, 14, 16);
    doc.setFontSize(10);
    doc.text(`Scanned: ${new Date(scan.timestamp).toLocaleString()}`, 14, 22);
    if (scan.note) {
      doc.setFontSize(11);
      doc.text("Note:", 14, 30);
      doc.setFontSize(10);
      doc.text(scan.note, 14, 36, { maxWidth: 180 });
    }
    let y = scan.note ? 44 : 30;
    if (table && table.body.length > 0) {
      autoTable(doc, {
        startY: y,
        head: [table.head],
        body: table.body,
      });
    } else {
      doc.text("Extracted Text:", 14, y);
      doc.setFontSize(10);
      doc.text(scan.extractedText, 14, y + 6, { maxWidth: 180 });
    }
    doc.save(`${scan.filename || 'ocr_scan'}.pdf`);
    setDownloadingId(null);
  };

  return (
    <>
      <div className="p-10 space-y-8 text-white font-['Inter',_Helvetica]">
        <h1 className="text-2xl font-bold">OCR Document Scanner</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="md:col-span-1 bg-[#2c2c2c] border-none p-6 flex flex-col items-center justify-center text-center shadow-lg">
            <CardContent className="flex flex-col items-center justify-center gap-4">
              <div className="bg-gray-700/50 p-4 rounded-full">
                <CameraIcon className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-300">Scan handwritten logs</p>
              <Button
                className="bg-[#6c47ff] hover:bg-[#5838d1] text-white font-semibold rounded-lg px-8 py-3 text-base transition-all"
                onClick={() => setIsScannerOpen(true)}
              >
                Start Scanner
              </Button>
            </CardContent>
          </Card>

          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Recent Scans</h2>
            <div className="space-y-3">
              {recentScans.length > 0 ? (
                recentScans.map((scan) => (
                  <div
                    key={scan.id}
                    className="flex items-center justify-between p-3 bg-[#2c2c2c] rounded-lg border border-gray-700/50"
                  >
                    <div className="flex items-center gap-3">
                      <FileTextIcon className="w-5 h-5 text-[#6c47ff]" />
                      <span className="font-medium">{scan.filename}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="border-gray-700 hover:bg-[#393939]"
                        onClick={() => handleDownloadPdf(scan)}
                        disabled={downloadingId === scan.id}
                        title="Download PDF"
                      >
                        {downloadingId === scan.id ? (
                          <svg className="animate-spin h-5 w-5 text-[#6c47ff]" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="#6c47ff" d="M4 12a8 8 0 018-8v8z" /></svg>
                        ) : (
                          <DownloadIcon className="w-5 h-5 text-[#6c47ff]" />
                        )}
                      </Button>
                      <CheckIcon className="w-5 h-5 text-green-500" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-8 bg-[#2c2c2c] rounded-lg border border-gray-700/50 text-gray-400">
                  No recent scans found. Start by scanning a document.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <OcrScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanComplete={handleScanComplete}
      />
    </>
  );
}; 