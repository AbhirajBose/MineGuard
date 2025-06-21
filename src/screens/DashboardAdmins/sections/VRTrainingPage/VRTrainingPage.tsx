
export const VRTrainingPage = (): JSX.Element => {
  const trainingModules = [
    {
      id: 1,
      title: "Safety Protocol Training",
      description: "Learn essential safety procedures for mine operations",
      duration: "45 min",
      difficulty: "Beginner",
      status: "available",
      participants: 23,
      completion: "85%"
    },
    {
      id: 2,
      title: "Equipment Operation",
      description: "Master the operation of heavy mining equipment",
      duration: "90 min",
      difficulty: "Intermediate",
      status: "in-progress",
      participants: 18,
      completion: "60%"
    },
    {
      id: 3,
      title: "Emergency Response",
      description: "Practice emergency procedures in realistic scenarios",
      duration: "60 min",
      difficulty: "Advanced",
      status: "completed",
      participants: 15,
      completion: "100%"
    },
    {
      id: 4,
      title: "Hazard Recognition",
      description: "Identify and respond to potential hazards",
      duration: "30 min",
      difficulty: "Beginner",
      status: "available",
      participants: 12,
      completion: "0%"
    }
  ];

  const activeSessions = [
    {
      id: 1,
      user: "John Smith",
      module: "Equipment Operation",
      startTime: "14:30",
      duration: "45 min",
      progress: "60%"
    },
    {
      id: 2,
      user: "Mike Johnson",
      module: "Safety Protocol Training",
      startTime: "14:15",
      duration: "30 min",
      progress: "75%"
    }
  ];

  const trainingStats = [
    { title: "Total Sessions", value: "156", icon: "mingcute-cardboard-vr-fill" },
    { title: "Active Users", value: "8", icon: "material-symbols-person-check-rounded" },
    { title: "Completion Rate", value: "87%", icon: "tabler-chart-pie-filled" },
    { title: "Average Score", value: "92.5", icon: "mdi-graph-box" }
  ];

  return (
    <div className="flex-1 p-6 bg-[#1e1e1e] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">VR Training Center</h1>
          <p className="text-gray-400">Immersive training experiences for mine safety and operations</p>
        </div>

        {/* Training Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {trainingStats.map((stat, index) => (
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

        {/* Active Sessions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#2c2c2c] rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Active Training Sessions</h2>
            <div className="space-y-4">
              {activeSessions.map((session) => (
                <div key={session.id} className="bg-[#1e1e1e] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-white">{session.user}</h3>
                    <span className="px-3 py-1 bg-green-500 bg-opacity-20 text-green-400 text-xs rounded-full">
                      Active
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{session.module}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Started: {session.startTime}</span>
                    <span className="text-gray-500">Duration: {session.duration}</span>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white">{session.progress}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-[#ff6b00] h-2 rounded-full transition-all duration-300"
                        style={{ width: session.progress }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Training Modules */}
          <div className="bg-[#2c2c2c] rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Available Modules</h2>
            <div className="space-y-4">
              {trainingModules.map((module) => (
                <div key={module.id} className="bg-[#1e1e1e] rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">{module.title}</h3>
                      <p className="text-gray-400 text-sm mb-2">{module.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-500">Duration: {module.duration}</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          module.difficulty === 'Beginner' ? 'bg-green-500 bg-opacity-20 text-green-400' :
                          module.difficulty === 'Intermediate' ? 'bg-yellow-500 bg-opacity-20 text-yellow-400' :
                          'bg-red-500 bg-opacity-20 text-red-400'
                        }`}>
                          {module.difficulty}
                        </span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      module.status === 'available' ? 'bg-green-500 bg-opacity-20 text-green-400' :
                      module.status === 'in-progress' ? 'bg-blue-500 bg-opacity-20 text-blue-400' :
                      'bg-gray-500 bg-opacity-20 text-gray-400'
                    }`}>
                      {module.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                      {module.participants} participants • {module.completion} completion
                    </div>
                    <button className="px-4 py-2 bg-[#ff6b00] text-white rounded-lg hover:bg-opacity-90 transition-colors text-sm">
                      Start Training
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* VR Equipment Status */}
        <div className="bg-[#2c2c2c] rounded-lg p-6 border border-gray-700 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">VR Equipment Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <img src="/mingcute-cardboard-vr-fill.svg" alt="VR" className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-white mb-2">VR Headsets</h3>
              <p className="text-green-400 text-sm">8/10 Available</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <img src="/Equipment.svg" alt="Equipment" className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-white mb-2">Motion Controllers</h3>
              <p className="text-blue-400 text-sm">All Operational</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <img src="/material-symbols-exclamation-rounded.svg" alt="Maintenance" className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-white mb-2">Maintenance</h3>
              <p className="text-yellow-400 text-sm">2 Headsets Due</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-[#ff6b00] bg-opacity-20 border border-[#ff6b00] rounded-lg hover:bg-opacity-30 transition-colors">
            <div className="flex items-center space-x-3">
              <img src="/mingcute-cardboard-vr-fill.svg" alt="VR" className="w-6 h-6" />
              <span className="text-white font-medium">Launch VR Session</span>
            </div>
          </button>
          <button className="p-4 bg-[#2c2c2c] border border-gray-600 rounded-lg hover:bg-[#3c3c3c] transition-colors">
            <div className="flex items-center space-x-3">
              <img src="/mdi-file-edit.svg" alt="Report" className="w-6 h-6" />
              <span className="text-white font-medium">Training Reports</span>
            </div>
          </button>
          <button className="p-4 bg-[#2c2c2c] border border-gray-600 rounded-lg hover:bg-[#3c3c3c] transition-colors">
            <div className="flex items-center space-x-3">
              <img src="/material-symbols-person-check-rounded.svg" alt="Users" className="w-6 h-6" />
              <span className="text-white font-medium">Manage Users</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}; 