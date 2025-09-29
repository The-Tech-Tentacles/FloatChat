import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";

const DataTrendsChart = () => {
  // Mock data for ocean temperature trends
  const temperatureData = [
    { month: "Jan", temperature: 22.5, salinity: 35.2, profiles: 1240 },
    { month: "Feb", temperature: 23.1, salinity: 35.3, profiles: 1380 },
    { month: "Mar", temperature: 24.2, salinity: 35.1, profiles: 1520 },
    { month: "Apr", temperature: 25.8, salinity: 34.9, profiles: 1680 },
    { month: "May", temperature: 26.9, salinity: 34.8, profiles: 1850 },
    { month: "Jun", temperature: 27.8, salinity: 34.7, profiles: 1920 },
    { month: "Jul", temperature: 28.2, salinity: 34.6, profiles: 2100 },
    { month: "Aug", temperature: 28.5, salinity: 34.5, profiles: 2280 },
    { month: "Sep", temperature: 27.9, salinity: 34.7, profiles: 2150 },
    { month: "Oct", temperature: 26.8, salinity: 34.9, profiles: 1980 },
    { month: "Nov", temperature: 25.2, salinity: 35.0, profiles: 1750 },
    { month: "Dec", temperature: 23.8, salinity: 35.1, profiles: 1580 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{`Month: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}${
                entry.dataKey === "temperature"
                  ? "°C"
                  : entry.dataKey === "salinity"
                  ? " PSU"
                  : " profiles"
              }`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900 flex items-center justify-between">
          <div className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
            Ocean Data Trends
          </div>
          <div className="flex space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-gray-600">Temperature</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
              <span className="text-gray-600">Salinity</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={temperatureData}>
              <defs>
                <linearGradient
                  id="temperatureGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
                <linearGradient
                  id="salinityGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="month"
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="temperature"
                stroke="#3B82F6"
                strokeWidth={3}
                fill="url(#temperatureGradient)"
                dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#3B82F6", strokeWidth: 2 }}
              />
              <Area
                type="monotone"
                dataKey="salinity"
                stroke="#10B981"
                strokeWidth={3}
                fill="url(#salinityGradient)"
                dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#10B981", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">28.5°C</div>
            <div className="text-sm text-gray-500">Peak Temperature</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">35.3</div>
            <div className="text-sm text-gray-500">Peak Salinity (PSU)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">2,280</div>
            <div className="text-sm text-gray-500">Max Profiles/Month</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataTrendsChart;
