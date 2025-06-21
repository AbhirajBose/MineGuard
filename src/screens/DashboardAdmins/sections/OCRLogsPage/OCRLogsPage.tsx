
export const OCRLogsPage = (): JSX.Element => {
  const ocrStats = [
    { title: "Documents Processed", value: "2,847", icon: "ocrlog" },
    { title: "Accuracy Rate", value: "96.8%", icon: "tabler-chart-pie-filled" },
    { title: "Processing Time", value: "1.2s", icon: "mdi-graph-box" },
    { title: "Pending Queue", value: "23", icon: "material-symbols-exclamation-rounded" }
  ];

  return (
    <div className="flex-1 p-6 bg-[#1e1e1e] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">OCR Logs & Document Processing</h1>
          <p className="text-gray-400">Optical Character Recognition for automated document processing</p>
        </div>

        {/* OCR Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {ocrStats.map((stat, index) => (
            <div key={index} className="bg-[#2c2c2c] rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <div className="w-12 h-12 bg-[#ff6b00] bg-opacity-20 rounded-lg flex items-center justify-center">
                  <img src={`/${stat.icon}.svg`} alt={stat.title} className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Content Placeholder */}
        <div className="bg-[#2c2c2c] rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Document Processing</h2>
          <p className="text-gray-400">OCR processing interface will be implemented here.</p>
        </div>
      </div>
    </div>
  );
}; 