
export const SchedulePage = (): JSX.Element => {
  const shifts = [
    {
      id: 1,
      name: "Morning Shift",
      time: "06:00 - 14:00",
      workers: 25,
      status: "active",
      equipment: ["Truck A-1234", "Excavator E-5678", "Loader L-9012"]
    },
    {
      id: 2,
      name: "Afternoon Shift",
      time: "14:00 - 22:00",
      workers: 22,
      status: "upcoming",
      equipment: ["Truck A-1235", "Excavator E-5679", "Loader L-9013"]
    },
    {
      id: 3,
      name: "Night Shift",
      time: "22:00 - 06:00",
      workers: 18,
      status: "scheduled",
      equipment: ["Truck A-1236", "Excavator E-5680", "Loader L-9014"]
    }
  ];

  const weeklySchedule = [
    { day: "Monday", shifts: ["Morning", "Afternoon", "Night"] },
    { day: "Tuesday", shifts: ["Morning", "Afternoon", "Night"] },
    { day: "Wednesday", shifts: ["Morning", "Afternoon", "Night"] },
    { day: "Thursday", shifts: ["Morning", "Afternoon", "Night"] },
    { day: "Friday", shifts: ["Morning", "Afternoon", "Night"] },
    { day: "Saturday", shifts: ["Morning", "Afternoon"] },
    { day: "Sunday", shifts: ["Morning"] }
  ];

  return (
    <div className="flex-1 p-6 bg-[#1e1e1e] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Shift & Schedule Management</h1>
          <p className="text-gray-400">Manage worker shifts and equipment scheduling</p>
        </div>

        {/* Current Shifts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#2c2c2c] rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Current Shifts</h2>
            <div className="space-y-4">
              {shifts.map((shift) => (
                <div key={shift.id} className="bg-[#1e1e1e] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-white">{shift.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      shift.status === 'active' ? 'bg-green-500 bg-opacity-20 text-green-400' :
                      shift.status === 'upcoming' ? 'bg-blue-500 bg-opacity-20 text-blue-400' :
                      'bg-gray-500 bg-opacity-20 text-gray-400'
                    }`}>
                      {shift.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{shift.time}</p>
                  <p className="text-gray-400 text-sm mb-3">Workers: {shift.workers}</p>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Equipment:</p>
                    <div className="flex flex-wrap gap-2">
                      {shift.equipment.map((item, index) => (
                        <span key={index} className="px-2 py-1 bg-[#ff6b00] bg-opacity-20 text-[#ff6b00] text-xs rounded">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Schedule */}
          <div className="bg-[#2c2c2c] rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Weekly Schedule</h2>
            <div className="space-y-3">
              {weeklySchedule.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[#1e1e1e] rounded-lg">
                  <span className="font-medium text-white">{day.day}</span>
                  <div className="flex gap-2">
                    {day.shifts.map((shift, shiftIndex) => (
                      <span key={shiftIndex} className="px-2 py-1 bg-[#ff6b00] bg-opacity-20 text-[#ff6b00] text-xs rounded">
                        {shift}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#2c2c2c] rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-[#ff6b00] bg-opacity-20 border border-[#ff6b00] rounded-lg hover:bg-opacity-30 transition-colors">
              <div className="flex items-center space-x-3">
                <img src="/schedule.svg" alt="Schedule" className="w-6 h-6" />
                <span className="text-white font-medium">Create New Shift</span>
              </div>
            </button>
            <button className="p-4 bg-[#2c2c2c] border border-gray-600 rounded-lg hover:bg-[#3c3c3c] transition-colors">
              <div className="flex items-center space-x-3">
                <img src="/material-symbols-person-check-rounded.svg" alt="Workers" className="w-6 h-6" />
                <span className="text-white font-medium">Assign Workers</span>
              </div>
            </button>
            <button className="p-4 bg-[#2c2c2c] border border-gray-600 rounded-lg hover:bg-[#3c3c3c] transition-colors">
              <div className="flex items-center space-x-3">
                <img src="/Equipment.svg" alt="Equipment" className="w-6 h-6" />
                <span className="text-white font-medium">Schedule Equipment</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 