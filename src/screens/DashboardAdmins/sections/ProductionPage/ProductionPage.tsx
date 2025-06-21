
export const ProductionPage = (): JSX.Element => {
  const productionMetrics = [
    {
      title: "Daily Production",
      value: "2,450",
      unit: "tons",
      change: "+5.2%",
      changeType: "positive",
      icon: "production"
    },
    {
      title: "Monthly Target",
      value: "65,200",
      unit: "tons",
      change: "94%",
      changeType: "positive",
      icon: "tabler-chart-pie-filled"
    },
    {
      title: "Efficiency Rate",
      value: "87.5",
      unit: "%",
      change: "+2.1%",
      changeType: "positive",
      icon: "mdi-graph-box"
    },
    {
      title: "Equipment Utilization",
      value: "92.3",
      unit: "%",
      change: "+1.8%",
      changeType: "positive",
      icon: "Equipment"
    }
  ];

  const productionData = [
    { date: "Jan 1", production: 2400, target: 2500 },
    { date: "Jan 2", production: 2350, target: 2500 },
    { date: "Jan 3", production: 2600, target: 2500 },
    { date: "Jan 4", production: 2450, target: 2500 },
    { date: "Jan 5", production: 2550, target: 2500 },
    { date: "Jan 6", production: 2300, target: 2500 },
    { date: "Jan 7", production: 2450, target: 2500 }
  ];

  const topPerformers = [
    { name: "Truck A-1234", efficiency: "95.2%", production: "320 tons" },
    { name: "Excavator E-5678", efficiency: "93.8%", production: "280 tons" },
    { name: "Loader L-9012", efficiency: "91.5%", production: "265 tons" },
    { name: "Truck A-1235", efficiency: "89.7%", production: "310 tons" }
  ];

  return (
    <div className="flex-1 p-6 bg-[#1e1e1e] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Production Statistics</h1>
          <p className="text-gray-400">Monitor and analyze mine production performance</p>
        </div>

        {/* Production Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {productionMetrics.map((metric, index) => (
            <div key={index} className="bg-[#2c2c2c] rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{metric.title}</p>
                  <div className="flex items-baseline gap-1 mt-1">
                    <p className="text-2xl font-bold text-white">{metric.value}</p>
                    <p className="text-sm text-gray-400">{metric.unit}</p>
                  </div>
                  <p className={`text-sm mt-1 ${metric.changeType === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
                    {metric.change} from last period
                  </p>
                </div>
                <div className="w-12 h-12 bg-[#ff6b00] bg-opacity-20 rounded-lg flex items-center justify-center">
                  <img src={`/${metric.icon}.svg`} alt={metric.title} className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Production Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#2c2c2c] rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Weekly Production Trend</h2>
            <div className="space-y-3">
              {productionData.map((data, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[#1e1e1e] rounded-lg">
                  <span className="text-white font-medium">{data.date}</span>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-white font-medium">{data.production} tons</p>
                      <p className="text-gray-400 text-sm">Target: {data.target} tons</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      data.production >= data.target ? 'bg-green-400' : 'bg-yellow-400'
                    }`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performers */}
          <div className="bg-[#2c2c2c] rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Top Performing Equipment</h2>
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[#1e1e1e] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#ff6b00] bg-opacity-20 rounded-lg flex items-center justify-center">
                      <span className="text-[#ff6b00] font-bold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-white">{performer.name}</p>
                      <p className="text-sm text-gray-400">Efficiency: {performer.efficiency}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">{performer.production}</p>
                    <p className="text-sm text-green-400">+{Math.floor(Math.random() * 10) + 5}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Production Insights */}
        <div className="bg-[#2c2c2c] rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Production Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <img src="/production.svg" alt="Production" className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-white mb-2">Peak Performance</h3>
              <p className="text-gray-400 text-sm">Production efficiency has increased by 12% this month</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <img src="/Equipment.svg" alt="Equipment" className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-white mb-2">Equipment Health</h3>
              <p className="text-gray-400 text-sm">All equipment operating at optimal performance levels</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <img src="/material-symbols-exclamation-rounded.svg" alt="Alert" className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-white mb-2">Maintenance Due</h3>
              <p className="text-gray-400 text-sm">3 pieces of equipment scheduled for maintenance this week</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <button className="p-4 bg-[#ff6b00] bg-opacity-20 border border-[#ff6b00] rounded-lg hover:bg-opacity-30 transition-colors">
            <div className="flex items-center space-x-3">
              <img src="/mdi-file-edit.svg" alt="Report" className="w-6 h-6" />
              <span className="text-white font-medium">Generate Report</span>
            </div>
          </button>
          <button className="p-4 bg-[#2c2c2c] border border-gray-600 rounded-lg hover:bg-[#3c3c3c] transition-colors">
            <div className="flex items-center space-x-3">
              <img src="/tabler-chart-pie-filled.svg" alt="Analytics" className="w-6 h-6" />
              <span className="text-white font-medium">View Analytics</span>
            </div>
          </button>
          <button className="p-4 bg-[#2c2c2c] border border-gray-600 rounded-lg hover:bg-[#3c3c3c] transition-colors">
            <div className="flex items-center space-x-3">
              <img src="/mdi-graph-box.svg" alt="Export" className="w-6 h-6" />
              <span className="text-white font-medium">Export Data</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}; 