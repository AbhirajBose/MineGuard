import React, { useEffect, useState, useRef } from 'react';
import { qrDatabase } from '../../../../Module/qrDatabase';
import { CoalBatchData } from '../../../../Module/qrService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Sector } from 'recharts';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { qrService } from '../../../../Module/qrService';

interface ProductionStats {
  totalBatches: number;
  totalWeight: number;
  qualityDistribution: Record<string, number>;
  locationDistribution: Record<string, number>;
  averageWeight: number;
}

interface TimeSeriesData {
  date: string;
  weight: number;
}

export const ProductionPage = (): JSX.Element => {
  const [stats, setStats] = useState<ProductionStats | null>(null);
  const [recentBatches, setRecentBatches] = useState<CoalBatchData[]>([]);
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const volumeChartRef = useRef<HTMLDivElement>(null);
  const qualityChartRef = useRef<HTMLDivElement>(null);
  const locationChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [batchStats, batches] = await Promise.all([
          qrDatabase.getBatchStats(),
          qrDatabase.getRecentBatches(100) // Fetch more for better time series
        ]);
        
        setStats(batchStats);
        setRecentBatches(batches.slice(0, 10)); // Show latest 10 in table
        
        // Process data for time series chart (last 7 days)
        const seriesData: Record<string, number> = {};
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            seriesData[d.toISOString().split('T')[0]] = 0;
        }

        batches.forEach(batch => {
          const batchDate = batch.dispatchTime.toISOString().split('T')[0];
          if (seriesData[batchDate] !== undefined) {
            seriesData[batchDate] += batch.weight;
          }
        });

        setTimeSeriesData(Object.entries(seriesData).map(([date, weight]) => ({ date, weight })));

      } catch (error) {
        console.error("Failed to fetch production data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleExportPdf = async () => {
    if (!stats || !recentBatches.length) {
      alert("No data available to export.");
      return;
    }
    try {
      await qrService.generateProductionReport(stats, recentBatches, {
        volumeChart: volumeChartRef.current,
        qualityChart: qualityChartRef.current,
        locationChart: locationChartRef.current,
      });
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("An error occurred while generating the PDF report.");
    }
  };

  const qualityPieData = stats ? Object.entries(stats.qualityDistribution).map(([name, value]) => ({ name, value })) : [];
  const locationPieData = stats ? Object.entries(stats.locationDistribution).map(([name, value]) => ({ name, value })) : [];
  
  const COLORS = ['#ff6b00', '#0088FE', '#FFBB28', '#00C49F', '#FF8042'];

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#fff">{`${value} Batches`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  if (loading) {
    return (
      <div className="flex-1 p-6 bg-[#1e1e1e] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        <p className="ml-4 text-lg">Loading Production Data...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 bg-[#1e1e1e] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Production Statistics</h1>
          <Button onClick={handleExportPdf} className="bg-[#ff6b00] hover:bg-[#e55a00] text-white">
            Export as PDF
          </Button>
        </div>
        
        {/* Key Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-[#2c2c2c] p-6 border border-gray-700">
                <h3 className="text-gray-400 text-sm font-medium">Total Production</h3>
                <p className="text-2xl font-bold text-white mt-1">{stats?.totalWeight.toLocaleString() || 0} tons</p>
            </Card>
            <Card className="bg-[#2c2c2c] p-6 border border-gray-700">
                <h3 className="text-gray-400 text-sm font-medium">Total Batches</h3>
                <p className="text-2xl font-bold text-white mt-1">{stats?.totalBatches.toLocaleString() || 0}</p>
            </Card>
            <Card className="bg-[#2c2c2c] p-6 border border-gray-700">
                <h3 className="text-gray-400 text-sm font-medium">Avg. Batch Weight</h3>
                <p className="text-2xl font-bold text-white mt-1">{stats?.averageWeight.toFixed(2) || 0} tons</p>
            </Card>
            <Card className="bg-[#2c2c2c] p-6 border border-gray-700">
                <h3 className="text-gray-400 text-sm font-medium">Premium Quality Rate</h3>
                <p className="text-2xl font-bold text-white mt-1">
                    {stats && stats.totalBatches > 0 ? 
                        ((stats.qualityDistribution['Premium'] || 0) / stats.totalBatches * 100).toFixed(1) : 0
                    }%
                </p>
            </Card>
        </div>

        {/* Production Volume Chart */}
        <Card ref={volumeChartRef} className="bg-[#2c2c2c] p-6 border border-gray-700 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Production Volume (Last 7 Days)</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="date" stroke="#888" />
                    <YAxis stroke="#888" label={{ value: 'Tons', angle: -90, position: 'insideLeft', fill: '#888' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e1e1e', border: '1px solid #444' }} />
                    <Legend />
                    <Bar dataKey="weight" fill="#ff6b00" name="Production Weight (tons)" />
                </BarChart>
            </ResponsiveContainer>
        </Card>

        {/* Quality and Location Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card ref={qualityChartRef} className="bg-[#2c2c2c] p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Production by Quality</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie 
                  data={qualityPieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  onMouseEnter={onPieEnter}
                >
                  {qualityPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Card>
          <Card ref={locationChartRef} className="bg-[#2c2c2c] p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Production by Location</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={locationPieData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis type="number" stroke="#888" />
                    <YAxis type="category" dataKey="name" stroke="#888" width={120} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e1e1e', border: '1px solid #444' }} />
                    <Bar dataKey="value" fill="#0088FE" name="Batches" />
                </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Recent Batches Table */}
        <Card className="bg-[#2c2c2c] p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Recent Production Batches</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-700">
                            <th className="p-3 text-sm font-medium text-gray-400">Batch ID</th>
                            <th className="p-3 text-sm font-medium text-gray-400">Weight (tons)</th>
                            <th className="p-3 text-sm font-medium text-gray-400">Quality</th>
                            <th className="p-3 text-sm font-medium text-gray-400">Location</th>
                            <th className="p-3 text-sm font-medium text-gray-400">Dispatch Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentBatches.map(batch => (
                            <tr key={batch.id} className="border-b border-gray-700 hover:bg-[#3c3c3c]">
                                <td className="p-3 text-sm text-white font-mono">{batch.id.slice(-12)}</td>
                                <td className="p-3 text-sm text-white">{batch.weight.toLocaleString()}</td>
                                <td className="p-3 text-sm text-white">{batch.quality}</td>
                                <td className="p-3 text-sm text-white">{batch.mineLocation}</td>
                                <td className="p-3 text-sm text-white">{batch.dispatchTime.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
      </div>
    </div>
  );
}; 