
export const DashboardPage = (): JSX.Element => {
  const dashboardStats = [
    {
      title: "Total Equipment",
      value: "156",
      change: "+12%",
      changeType: "positive",
      icon: "Equipment"
    },
    {
      title: "Active Workers",
      value: "89",
      change: "+5%",
      changeType: "positive",
      icon: "material-symbols-person-check-rounded"
    },
    {
      title: "Production Rate",
      value: "94%",
      change: "+2%",
      changeType: "positive",
      icon: "production"
    },
    {
      title: "Safety Score",
      value: "98.5",
      change: "+1.2%",
      changeType: "positive",
      icon: "garden-security-26"
    }
  ];

  const recentActivities = [
    {
      type: "Equipment Check",
      description: "Truck #A-1234 passed inspection",
      time: "2 minutes ago",
      status: "success"
    },
    {
      type: "Worker Login",
      description: "John Smith started shift",
      time: "5 minutes ago",
      status: "info"
    },
    {
      type: "Maintenance Alert",
      description: "Excavator #E-5678 needs service",
      time: "15 minutes ago",
      status: "warning"
    },
    {
      type: "Production Update",
      description: "Daily target achieved: 95%",
      time: "1 hour ago",
      status: "success"
    }
  ];

  return (
    <div className="flex-1 p-6 bg-[#1e1e1e] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
          <p className="text-gray-400">Monitor your mine operations in real-time</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <div key={index} className="bg-[#2c2c2c] rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-[#ff6b00] bg-opacity-20 rounded-lg flex items-center justify-center">
                  <img src={`/${stat.icon}.svg`} alt={stat.title} className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activities */}
        <div className="bg-[#2c2c2c] rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-[#1e1e1e] rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.status === 'success' ? 'bg-green-400' :
                    activity.status === 'warning' ? 'bg-yellow-400' :
                    activity.status === 'info' ? 'bg-blue-400' : 'bg-gray-400'
                  }`}></div>
                  <div>
                    <p className="font-medium text-white">{activity.type}</p>
                    <p className="text-sm text-gray-400">{activity.description}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 