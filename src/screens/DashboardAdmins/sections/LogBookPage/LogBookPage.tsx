
export const LogBookPage = (): JSX.Element => {
  const logEntries = [
    {
      id: 1,
      type: "Equipment Maintenance",
      description: "Routine maintenance completed on Truck A-1234",
      operator: "John Smith",
      timestamp: "2024-01-15 14:30",
      status: "completed",
      priority: "medium"
    },
    {
      id: 2,
      type: "Safety Inspection",
      description: "Daily safety check on Excavator E-5678",
      operator: "Mike Johnson",
      timestamp: "2024-01-15 13:45",
      status: "completed",
      priority: "high"
    },
    {
      id: 3,
      type: "Production Report",
      description: "Daily coal extraction: 2,450 tons",
      operator: "Sarah Wilson",
      timestamp: "2024-01-15 12:00",
      status: "completed",
      priority: "medium"
    },
    {
      id: 4,
      type: "Incident Report",
      description: "Minor equipment malfunction - resolved",
      operator: "David Brown",
      timestamp: "2024-01-15 10:15",
      status: "resolved",
      priority: "high"
    },
    {
      id: 5,
      type: "Training Session",
      description: "VR safety training completed for new workers",
      operator: "Lisa Davis",
      timestamp: "2024-01-15 09:30",
      status: "completed",
      priority: "low"
    }
  ];

  const logCategories = [
    { name: "All", count: 156, active: true },
    { name: "Equipment", count: 45, active: false },
    { name: "Safety", count: 32, active: false },
    { name: "Production", count: 28, active: false },
    { name: "Training", count: 18, active: false },
    { name: "Incidents", count: 12, active: false }
  ];

  return (
    <div className="flex-1 p-6 bg-[#1e1e1e] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">LogBook</h1>
          <p className="text-gray-400">Track and manage all mine activities and reports</p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search logs..."
              className="w-full px-4 py-2 bg-[#2c2c2c] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#ff6b00]"
            />
          </div>
          <button className="px-6 py-2 bg-[#ff6b00] text-white rounded-lg hover:bg-[#ff6b00] hover:opacity-90 transition-colors">
            Add New Entry
          </button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          {logCategories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                category.active
                  ? 'bg-[#ff6b00] text-white'
                  : 'bg-[#2c2c2c] text-gray-400 hover:bg-[#3c3c3c]'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Log Entries */}
        <div className="bg-[#2c2c2c] rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">Recent Entries</h2>
          </div>
          <div className="divide-y divide-gray-700">
            {logEntries.map((entry) => (
              <div key={entry.id} className="p-6 hover:bg-[#1e1e1e] transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-white">{entry.type}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        entry.priority === 'high' ? 'bg-red-500 bg-opacity-20 text-red-400' :
                        entry.priority === 'medium' ? 'bg-yellow-500 bg-opacity-20 text-yellow-400' :
                        'bg-green-500 bg-opacity-20 text-green-400'
                      }`}>
                        {entry.priority}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        entry.status === 'completed' ? 'bg-green-500 bg-opacity-20 text-green-400' :
                        entry.status === 'resolved' ? 'bg-blue-500 bg-opacity-20 text-blue-400' :
                        'bg-gray-500 bg-opacity-20 text-gray-400'
                      }`}>
                        {entry.status}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-2">{entry.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Operator: {entry.operator}</span>
                      <span>Time: {entry.timestamp}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-[#3c3c3c] rounded transition-colors">
                      <img src="/mdi-file-edit.svg" alt="Edit" className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-[#3c3c3c] rounded transition-colors">
                      <img src="/mingcute-link-fill.svg" alt="View" className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-[#2c2c2c] rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Entries</p>
                <p className="text-2xl font-bold text-white">156</p>
              </div>
              <img src="/logbook.svg" alt="LogBook" className="w-8 h-8" />
            </div>
          </div>
          <div className="bg-[#2c2c2c] rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">This Week</p>
                <p className="text-2xl font-bold text-white">23</p>
              </div>
              <img src="/tabler-chart-pie-filled.svg" alt="Chart" className="w-8 h-8" />
            </div>
          </div>
          <div className="bg-[#2c2c2c] rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pending</p>
                <p className="text-2xl font-bold text-white">5</p>
              </div>
              <img src="/material-symbols-exclamation-rounded.svg" alt="Pending" className="w-8 h-8" />
            </div>
          </div>
          <div className="bg-[#2c2c2c] rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Completed</p>
                <p className="text-2xl font-bold text-white">151</p>
              </div>
              <img src="/material-symbols-person-check-rounded.svg" alt="Completed" className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 