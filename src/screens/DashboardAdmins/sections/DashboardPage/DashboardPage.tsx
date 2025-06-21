import { useUser } from "@civic/auth/react";
import { Shield, User } from "lucide-react";
import { Button } from "../../../../components/ui/button";

interface User {
  name: string;
}

interface DashboardPageProps {
  user: User;
}

export const DashboardPage = ({ user }: DashboardPageProps): JSX.Element => {
  const { user: civicUser } = useUser();
  
  const statCards = [
    { title: "Current Shift", value: "Morning", subValue: "6:00 - 14:00", icon: "basil-book-solid" },
    { title: "Mine Temperature", value: "25.5°C", subValue: "Normal", icon: "game-icons-mine-truck", status: "normal" },
    { title: "Air Quality", value: "86%", subValue: "Risk", icon: "game-icons-mine-truck", status: "risk" },
    { title: "Methane Level", value: "1.2%", subValue: "Cautions", icon: "material-symbols-exclamation-rounded", status: "caution" }
  ];

  const alerts = [
    { title: "High Methane Levels Detected", description: "Section B-7 reported methane levels exceeding safety threshold. Ventilation increased.", time: "10 min ago", type: "high" },
    { title: "Equipment Maintenance Due", description: "Your drill equipment is due for maintenance check. Please report to maintenance bay.", time: "50 min ago", type: "warning" },
    { title: "Schedule Change Notice", description: "Your shift next week has been changed from morning to evening. Please check schedule.", time: "1 hour ago", type: "info" }
  ];

  // Get display name with fallbacks
  const getDisplayName = () => {
    if (civicUser) {
      if (civicUser.name) return civicUser.name;
      if (civicUser.given_name && civicUser.family_name) {
        return `${civicUser.given_name} ${civicUser.family_name}`;
      }
      if (civicUser.given_name) return civicUser.given_name;
      if (civicUser.email) return civicUser.email.split('@')[0];
    }
    return user.name;
  };

  const displayName = getDisplayName();

  // Days of the week with unique keys
  const daysOfWeek = [
    { key: 'mon', label: 'M' },
    { key: 'tue', label: 'T' },
    { key: 'wed', label: 'W' },
    { key: 'thu', label: 'T' },
    { key: 'fri', label: 'F' },
    { key: 'sat', label: 'S' },
    { key: 'sun', label: 'S' }
  ];

  return (
    <div className="flex-1 p-6 bg-[#1e1e1e] text-white font-['Inter',Helvetica]">
      <div className="max-w-full mx-auto">
        {/* Header with User Info */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white mb-1">Worker's Dashboard</h1>
            <p className="text-gray-400">Welcome back, {displayName}. Here's your overview for today.</p>
            
            {/* Civic User Info */}
            {civicUser && (
              <div className="mt-3 flex items-center gap-2 p-3 bg-[#6c47ff]/10 border border-[#6c47ff]/30 rounded-lg max-w-md">
                <Shield className="w-4 h-4 text-[#6c47ff]" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">Civic Identity Verified</div>
                  <div className="text-xs text-gray-400">
                    {civicUser.email && `${civicUser.email} • `}Secure blockchain authentication
                  </div>
                  {civicUser.given_name && civicUser.family_name && (
                    <div className="text-xs text-gray-500 mt-1">
                      {civicUser.given_name} {civicUser.family_name}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {civicUser && (
              <div className="flex items-center gap-2 px-3 py-2 bg-green-900/20 border border-green-500/30 rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-xs text-green-400 font-medium">Verified</span>
              </div>
            )}
            <Button variant="outline" className="bg-[#2c2c2c] border-gray-600 text-white">
              Today
              <img src="/maki-arrow.svg" alt="arrow" className="ml-2 w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {statCards.map((stat, index) => (
            <div key={index} className="bg-[#2c2c2c] rounded-lg p-4 border border-gray-700 flex items-center gap-4">
              <div className="w-10 h-10 bg-[#ff6b00] bg-opacity-20 rounded-lg flex items-center justify-center">
                <img src={`/${stat.icon}.svg`} alt={stat.title} className="w-5 h-5" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <p className="text-lg font-semibold text-white">{stat.value}</p>
                <p className={`text-sm ${
                  stat.status === 'normal' ? 'text-green-400' :
                  stat.status === 'risk' ? 'text-yellow-400' :
                  stat.status === 'caution' ? 'text-red-400' :
                  'text-gray-400'
                }`}>{stat.subValue}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left and Middle sections */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Worker's Dashboard - Attendance Heatmap */}
            <div className="bg-[#2c2c2c] rounded-lg p-6 border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Worker's Dashboard</h2>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-end gap-2 text-xs text-gray-400 pr-8">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
                    <div key={month} className="w-10 text-center">{month}</div>
                  ))}
                </div>
                {daysOfWeek.map((day, dayIndex) => (
                  <div key={day.key} className="flex items-center gap-2">
                    <div className="w-8 text-sm text-gray-400">{day.label}</div>
                    <div className="grid grid-cols-12 gap-1 flex-1">
                      {Array.from({ length: 12 }).map((_, monthIndex) => {
                        const value = Math.random();
                        let bgColor = 'bg-gray-700';
                        if (value > 0.3) bgColor = 'bg-green-800';
                        if (value > 0.6) bgColor = 'bg-green-600';
                        if (value > 0.8) bgColor = 'bg-green-400';
                        return <div key={`${day.key}-${monthIndex}`} className={`w-full h-6 rounded-sm ${bgColor}`} title={`Attendance: ${value > 0.3 ? 'Present' : 'Absent'}`} />;
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end items-center gap-4 mt-4 text-sm">
                  <span className="text-gray-400">Absent</span>
                  <div className="w-4 h-4 bg-gray-700 rounded-sm" />
                  <span className="text-gray-400">Present</span>
                  <div className="w-4 h-4 bg-green-800 rounded-sm" />
                  <div className="w-4 h-4 bg-green-600 rounded-sm" />
                  <div className="w-4 h-4 bg-green-400 rounded-sm" />
              </div>
            </div>

            {/* Production Performance Chart */}
            <div className="bg-[#2c2c2c] rounded-lg p-6 border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Production Performance</h2>
                <Button variant="outline" className="bg-[#2c2c2c] border-gray-600 text-white">
                  This Week
                  <img src="/maki-arrow.svg" alt="arrow" className="ml-2 w-3 h-3" />
                </Button>
              </div>
              <div className="flex gap-6 border-b border-gray-700 mb-4">
                <button className="text-[#ff6b00] border-b-2 border-[#ff6b00] pb-2">Coal Production</button>
                <button className="text-gray-400 pb-2">Total Production</button>
                <button className="text-gray-400 pb-2">Operating Status</button>
              </div>
              <div className="h-64 bg-[#1e1e1e] rounded-lg p-4">
                <p className="text-center text-gray-400">Chart will be implemented here</p>
              </div>
            </div>
          </div>

          {/* Right section - Recent Alerts */}
          <div className="bg-[#2c2c2c] rounded-lg p-6 border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Recent Alerts</h2>
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">3 New</span>
            </div>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div key={index} className={`p-4 rounded-lg border-l-4 ${
                  alert.type === 'high' ? 'bg-red-500/10 border-red-500' :
                  alert.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500' :
                  'bg-blue-500/10 border-blue-500'
                }`}>
                  <div className="flex items-start gap-3">
                    <img src="/material-symbols-exclamation-rounded.svg" alt="alert" className={`w-5 h-5 mt-1 ${
                      alert.type === 'high' ? 'text-red-500' :
                      alert.type === 'warning' ? 'text-yellow-500' :
                      'text-blue-500'
                    }`} />
                    <div>
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-semibold text-white">{alert.title}</h3>
                        <span className="text-gray-500 text-xs">{alert.time}</span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{alert.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 