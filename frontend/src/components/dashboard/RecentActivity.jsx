import React from "react";
import { motion } from "framer-motion";
import { Clock, Upload, MessageSquare, Eye, Download } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "upload",
      title: "New NetCDF file uploaded",
      description: "ARGO_float_2901623_profiles.nc",
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      icon: Upload,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: 2,
      type: "query",
      title: "AI Query Processed",
      description: "Show salinity profiles near equator",
      timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
      icon: MessageSquare,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      id: 3,
      type: "view",
      title: "Data Visualization Created",
      description: "Temperature vs Depth Chart",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      icon: Eye,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: 4,
      type: "download",
      title: "Dataset Downloaded",
      description: "Arabian Sea BGC data (2023)",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      icon: Download,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      id: 5,
      type: "query",
      title: "AI Analysis Complete",
      description: "Oxygen trends in Indian Ocean",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      icon: MessageSquare,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
  ];

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
          <Clock className="h-5 w-5 mr-2 text-blue-600" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
              >
                <div
                  className={`p-2 rounded-lg ${activity.bgColor} flex-shrink-0`}
                >
                  <Icon className={`h-4 w-4 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatDistanceToNow(activity.timestamp, {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 pt-4 border-t border-gray-100"
        >
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
            View all activity →
          </button>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
