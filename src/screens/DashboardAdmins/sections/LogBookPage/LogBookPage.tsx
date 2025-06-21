import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button";
import { logbookDatabase, LogbookEntry } from "../../../../Module/logbookDatabase";
import { ocrDatabase, OcrScan } from "../../../../Module/ocrDatabase";

// Dummy user for demo; replace with prop/context if needed
const currentUser = { name: "James", avatar: "/image-8.png" };

const logbookTableColumns = [
  "Date", "Type", "Operator", "Filename", "Note"
];

const demoRows = [
  ["2024-06-01", "Equipment Maintenance", "John Smith", "-", "Routine maintenance completed on Truck A-1234"],
  ["2024-06-01", "Safety Inspection", "Mike Johnson", "-", "Daily safety check on Excavator E-5678"],
  ["2024-06-01", "Incident Report", "David Brown", "-", "Minor equipment malfunction - resolved"],
];

const equipmentLogs = [
  { type: "Equipment Maintenance", description: "Routine maintenance completed on Truck A-1234", operator: "John Smith", date: "2024-06-01" },
  { type: "Safety Inspection", description: "Daily safety check on Excavator E-5678", operator: "Mike Johnson", date: "2024-06-01" },
  { type: "Incident Report", description: "Minor equipment malfunction - resolved", operator: "David Brown", date: "2024-06-01" },
];

export const LogBookPage = (): JSX.Element => {
  const [ocrToday, setOcrToday] = useState<OcrScan[]>([]);
  const [logbookEntries, setLogbookEntries] = useState<LogbookEntry[]>([]);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    const allOcr = await ocrDatabase.getRecentOcrScans(100);
    const today = allOcr.filter(scan => {
      const scanDate = new Date(scan.timestamp);
      const now = new Date();
      return scanDate.getFullYear() === now.getFullYear() &&
        scanDate.getMonth() === now.getMonth() &&
        scanDate.getDate() === now.getDate();
    });
    setOcrToday(today);
    const entries = await logbookDatabase.getRecentLogEntries(50);
    setLogbookEntries(entries);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("MineGuard Logbook Report", 14, 16);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 22);
    doc.text(`Operator: ${currentUser.name}`, 14, 28);
    doc.setFontSize(12);
    doc.text("\nMain Log Table:", 14, 36);
    const allRows = [
      ...demoRows,
      ...logbookEntries.filter(e => e.type === "OCR Document").map(e => [
        e.date.toLocaleDateString(),
        e.type,
        e.operator,
        e.filename || "-",
        (e.note || "").slice(0, 100) + (e.note && e.note.length > 100 ? "..." : "")
      ])
    ];
    autoTable(doc, {
      startY: 40,
      head: [logbookTableColumns],
      body: allRows,
    });
    let y = doc.lastAutoTable.finalY + 10;
    doc.text("OCR Log Summary (Today):", 14, y);
    y += 4;
    doc.text(`Docs Scanned: ${ocrToday.length}`, 14, y);
    ocrToday.forEach((scan, i) => {
      doc.text(`- ${scan.filename} (by ${currentUser.name})`, 14, y + 6 + i * 6);
    });
    doc.save("MineGuard_Logbook.pdf");
  };

  return (
    <div className="flex-1 p-6 bg-[#1e1e1e] text-white font-['Inter',Helvetica]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Main Table */}
          <div className="flex-1 bg-[#2c2c2c] rounded-lg p-6 border border-gray-700 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Logbook Entries</h2>
              <Button className="bg-[#6c47ff] hover:bg-[#5838d1] text-white font-semibold rounded-lg px-6 py-2 text-base" onClick={exportPDF}>
                Export PDF
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left border-separate border-spacing-y-2">
                <thead>
                  <tr>
                    {logbookTableColumns.map((col) => (
                      <th key={col} className="px-3 py-2 bg-[#393939] text-gray-300 font-semibold rounded-t-lg">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...demoRows,
                    ...logbookEntries.filter(e => e.type === "OCR Document").map(e => [
                      e.date.toLocaleDateString(),
                      e.type,
                      e.operator,
                      e.filename || "-",
                      (e.note || "").slice(0, 100) + (e.note && e.note.length > 100 ? "..." : "")
                    ])
                  ].map((row, i) => (
                    <tr key={i} className="bg-[#232323] hover:bg-[#292929] rounded-lg">
                      {row.map((cell, j) => (
                        <td key={j} className="px-3 py-2 rounded-lg border-b border-[#393939]">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* OCR Bento Grid */}
          <div className="w-full md:w-80 flex flex-col gap-4">
            <div className="bg-[#2c2c2c] rounded-lg p-5 border border-gray-700 shadow-lg flex flex-col gap-2">
              <h3 className="text-lg font-semibold mb-2">OCR Log Summary (Today)</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl font-bold text-[#6c47ff]">{ocrToday.length}</span>
                <span className="text-gray-400">docs scanned</span>
              </div>
              <div className="mb-2">
                <span className="text-gray-400 text-sm">Scanned by:</span>
                <span className="ml-2 text-white font-medium">{currentUser.name}</span>
              </div>
              <div className="mb-2">
                <span className="text-gray-400 text-sm">Docs:</span>
                <ul className="list-disc ml-6 text-gray-200 text-sm">
                  {ocrToday.length === 0 ? <li>No docs today</li> : ocrToday.map(scan => <li key={scan.id}>{scan.filename}</li>)}
                </ul>
              </div>
            </div>
            <div className="bg-[#2c2c2c] rounded-lg p-5 border border-gray-700 shadow-lg flex flex-col gap-2">
              <h3 className="text-lg font-semibold mb-2">Equipment & Safety Logs</h3>
              <ul className="list-disc ml-6 text-gray-200 text-sm">
                {equipmentLogs.map((log, i) => (
                  <li key={i}>
                    <span className="font-medium">[{log.type}]</span> {log.description} <span className="text-gray-400">({log.operator})</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 