import  { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import {  TrendingUp, TrendingDown } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Button } from '../../components/ui/button';
import { mockHealthData } from './index.constants';

type MetricKey = 'steps' | 'water' | 'heartRate';

const HealthMetricsVisualization = () => {
  
  const [selectedMetric, setSelectedMetric] = useState<MetricKey>('steps');
  const [timeRange, setTimeRange] = useState("Last 7 Days"); 
  const [chartType, setChartType] = useState("Line"); // 'Line' or 'Bar'

  const getFilteredData = () => {
    const today = new Date("2025-07-14"); 
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 6);

    return mockHealthData.filter(item => {
      const itemDate = new Date(`2025-${item.date.split(' ')[1]}-${item.date.split(' ')[0]}`);
      if (timeRange === "Last 7 Days") {
        return itemDate >= sevenDaysAgo && itemDate <= today;
      }
     
      if (timeRange === "Today") {
        return item.date === "14 Jul";
      }
      return true;
    });
  };

  const filteredData = getFilteredData();

  // Calculate statistics
  const dataPoints = filteredData.length;
  const values = filteredData.map(item => item[selectedMetric]);
  const average = values.length > 0 ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1) : 0;
  const highest = values.length > 0 ? Math.max(...values).toFixed(1) : 0;
  const lowest = values.length > 0 ? Math.min(...values).toFixed(1) : 0;

  // Trend analysis
  const calculateTrend = () => {
    if (filteredData.length < 2) {
      return { type: 'N/A', percentage: 'N/A', valueChange: 'N/A' };
    }

    const firstValue = filteredData[0][selectedMetric];
    const lastValue = filteredData[filteredData.length - 1][selectedMetric];
    const valueChange = lastValue - firstValue;
    const percentageChange = ((valueChange / firstValue) * 100).toFixed(1);

    if (valueChange > 0) {
      return { type: 'Increasing', percentage: `+${percentageChange}%`, valueChange: `+${valueChange.toFixed(1)} ${selectedMetric}` };
    } else if (valueChange < 0) {
      return { type: 'Decreasing', percentage: `${percentageChange}%`, valueChange: `${valueChange.toFixed(1)} ${selectedMetric}` };
    } else {
      return { type: 'Stable', percentage: '0.0%', valueChange: '0.0' };
    }
  };
  const handleMetricChange = (value: string) => {
  if (value === "steps" || value === "water" || value === "heartRate") {
    setSelectedMetric(value);
  }
};

  const trend = calculateTrend();
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Health Metrics Visualization</h2>
          <p className="text-gray-500">Track your progress over time with interactive charts</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={chartType === "Line" ? "default" : "outline"}
            onClick={() => setChartType("Line")}
            className="px-4 py-2 cursor-pointer bg-gray-100 hover:bg-gray-200"
          >
            Line
          </Button>
          <Button
            variant={chartType === "Bar" ? "default" : "outline"}
            onClick={() => setChartType("Bar")}
            className="px-4 py-2 cursor-pointer  bg-gray-100 hover:bg-gray-200"
          >
            Bar
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-6">
      <Select value={selectedMetric} onValueChange={handleMetricChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Metric" />
          </SelectTrigger>
          <SelectContent className='bg-white'>
            <SelectItem value="steps">Steps</SelectItem>
            <SelectItem value="water">Water Intake</SelectItem>
            <SelectItem value="heartRate">Heart Rate</SelectItem>
          </SelectContent>
        </Select>

        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Time Range" />
          </SelectTrigger>
          <SelectContent className='bg-white'>
            <SelectItem value="Today">Today</SelectItem>
            <SelectItem value="Last 7 Days">Last 7 Days</SelectItem>
            <SelectItem value="Last 30 Days">Last 30 Days</SelectItem>
          </SelectContent>
        </Select>

        <div className="text-gray-600 ml-auto">{dataPoints} data points</div>
      </div>

      <div className="w-full h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "Line" ? (
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} ${selectedMetric === 'steps' ? 'steps' : selectedMetric === 'water' ? 'liters' : 'bpm'}`, 'Value']} />
              <Line type="monotone" dataKey={selectedMetric} stroke="#82ca9d" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
            </LineChart>
          ) : (
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} ${selectedMetric === 'steps' ? 'steps' : selectedMetric === 'water' ? 'liters' : 'bpm'}`, 'Value']} />
              <Bar dataKey={selectedMetric} fill="#8884d8" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-4 gap-4 text-center mb-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-700">{dataPoints}</div>
          <div className="text-sm text-gray-500">Data Points</div>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-700">{average}</div>
          <div className="text-sm text-gray-500">Average</div>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-700">{highest}</div>
          <div className="text-sm text-gray-500">Highest</div>
        </div>
        <div className="p-4 bg-red-50 rounded-lg">
          <div className="text-2xl font-bold text-red-700">{lowest}</div>
          <div className="text-sm text-gray-500">Lowest</div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg flex items-center space-x-2 text-gray-700">
        {trend.type === 'Increasing' && <TrendingUp className="w-5 h-5 text-green-500" />}
        {trend.type === 'Decreasing' && <TrendingDown className="w-5 h-5 text-red-500" />}
        {trend.type === 'Stable' && <span className="text-xl font-bold">-</span>}
        <p>
          <span className="font-bold">Trend Analysis:</span> {trend.type === 'N/A' ? 'Not enough data' : `${trend.type} trend: ${trend.valueChange} (${trend.percentage})`}
        </p>
      </div>
    </div>
  );
};

export default HealthMetricsVisualization;