
export const Web3TrackingPage = (): JSX.Element => {
  const blockchainStats = [
    {
      title: "Total Transactions",
      value: "1,247",
      change: "+12%",
      changeType: "positive",
      icon: "web3"
    },
    {
      title: "Block Height",
      value: "2,847,392",
      change: "Latest",
      changeType: "positive",
      icon: "token-branded-aptos"
    },
    {
      title: "Gas Used",
      value: "1.2M",
      change: "-5%",
      changeType: "positive",
      icon: "mdi-dollar"
    },
    {
      title: "Active Nodes",
      value: "156",
      change: "+3",
      changeType: "positive",
      icon: "mingcute-link-fill"
    }
  ];

  const recentTransactions = [
    {
      id: "0x7a8b9c...",
      type: "Equipment Verification",
      amount: "1.5 ETH",
      status: "confirmed",
      timestamp: "2 minutes ago",
      from: "0x1234...",
      to: "0x5678..."
    },
    {
      id: "0x9d8e7f...",
      type: "Safety Certificate",
      amount: "0.8 ETH",
      status: "pending",
      timestamp: "5 minutes ago",
      from: "0x2345...",
      to: "0x6789..."
    },
    {
      id: "0x1a2b3c...",
      type: "Production Record",
      amount: "2.1 ETH",
      status: "confirmed",
      timestamp: "12 minutes ago",
      from: "0x3456...",
      to: "0x7890..."
    },
    {
      id: "0x4d5e6f...",
      type: "Maintenance Log",
      amount: "0.5 ETH",
      status: "confirmed",
      timestamp: "1 hour ago",
      from: "0x4567...",
      to: "0x8901..."
    }
  ];

  const smartContracts = [
    {
      name: "EquipmentRegistry",
      address: "0x1234567890abcdef...",
      status: "active",
      functions: 12,
      balance: "15.2 ETH"
    },
    {
      name: "SafetyCompliance",
      address: "0xabcdef1234567890...",
      status: "active",
      functions: 8,
      balance: "8.7 ETH"
    },
    {
      name: "ProductionTracker",
      address: "0x567890abcdef1234...",
      status: "active",
      functions: 15,
      balance: "22.1 ETH"
    }
  ];

  return (
    <div className="flex-1 p-6 bg-[#1e1e1e] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Web3 Tracking & Transparency</h1>
          <p className="text-gray-400">Blockchain-based tracking for enhanced security and transparency</p>
        </div>

        {/* Blockchain Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {blockchainStats.map((stat, index) => (
            <div key={index} className="bg-[#2c2c2c] rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.change}
                  </p>
                </div>
                <div className="w-12 h-12 bg-[#ff6b00] bg-opacity-20 rounded-lg flex items-center justify-center">
                  <img src={`/${stat.icon}.svg`} alt={stat.title} className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#2c2c2c] rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Recent Transactions</h2>
            <div className="space-y-4">
              {recentTransactions.map((tx, index) => (
                <div key={index} className="bg-[#1e1e1e] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-white text-sm">{tx.type}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      tx.status === 'confirmed' ? 'bg-green-500 bg-opacity-20 text-green-400' :
                      'bg-yellow-500 bg-opacity-20 text-yellow-400'
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Hash:</span>
                      <span className="text-white font-mono">{tx.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Amount:</span>
                      <span className="text-[#ff6b00] font-medium">{tx.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Time:</span>
                      <span className="text-gray-300">{tx.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Smart Contracts */}
          <div className="bg-[#2c2c2c] rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Smart Contracts</h2>
            <div className="space-y-4">
              {smartContracts.map((contract, index) => (
                <div key={index} className="bg-[#1e1e1e] rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-white">{contract.name}</h3>
                      <p className="text-gray-400 text-sm font-mono">{contract.address}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-500 bg-opacity-20 text-green-400 text-xs rounded-full">
                      {contract.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Functions:</span>
                      <span className="text-white ml-2">{contract.functions}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Balance:</span>
                      <span className="text-[#ff6b00] ml-2">{contract.balance}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Blockchain Network Status */}
        <div className="bg-[#2c2c2c] rounded-lg p-6 border border-gray-700 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Network Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <img src="/web3.svg" alt="Web3" className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-white mb-2">Network Health</h3>
              <p className="text-green-400 text-sm">Excellent</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <img src="/mingcute-link-fill.svg" alt="Nodes" className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-white mb-2">Node Distribution</h3>
              <p className="text-blue-400 text-sm">156 Active Nodes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <img src="/mdi-dollar.svg" alt="Gas" className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-white mb-2">Gas Price</h3>
              <p className="text-yellow-400 text-sm">15 Gwei</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-[#ff6b00] bg-opacity-20 border border-[#ff6b00] rounded-lg hover:bg-opacity-30 transition-colors">
            <div className="flex items-center space-x-3">
              <img src="/web3.svg" alt="Web3" className="w-6 h-6" />
              <span className="text-white font-medium">Deploy Contract</span>
            </div>
          </button>
          <button className="p-4 bg-[#2c2c2c] border border-gray-600 rounded-lg hover:bg-[#3c3c3c] transition-colors">
            <div className="flex items-center space-x-3">
              <img src="/token-branded-aptos.svg" alt="Token" className="w-6 h-6" />
              <span className="text-white font-medium">View Explorer</span>
            </div>
          </button>
          <button className="p-4 bg-[#2c2c2c] border border-gray-600 rounded-lg hover:bg-[#3c3c3c] transition-colors">
            <div className="flex items-center space-x-3">
              <img src="/mdi-file-edit.svg" alt="Report" className="w-6 h-6" />
              <span className="text-white font-medium">Generate Report</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}; 