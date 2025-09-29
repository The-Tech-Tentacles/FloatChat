import React from "react";
import { motion } from "framer-motion";
import {
  Upload,
  MessageSquare,
  Database,
  Map,
  Search,
  BarChart3,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import Button from "../ui/Button";

const QuickActions = () => {
  const actions = [
    {
      title: "Upload NetCDF",
      description: "Upload new ARGO float data files",
      icon: Upload,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      href: "/upload",
    },
    {
      title: "AI Chat",
      description: "Ask questions about ocean data",
      icon: MessageSquare,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
      href: "/chat",
    },
    {
      title: "Explore Data",
      description: "Browse and filter datasets",
      icon: Database,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      href: "/data",
    },
    {
      title: "View Map",
      description: "Interactive ocean map",
      icon: Map,
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50",
      textColor: "text-cyan-600",
      href: "/map",
    },
    {
      title: "Advanced Search",
      description: "Find specific measurements",
      icon: Search,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      href: "/search",
    },
    {
      title: "Visualizations",
      description: "Create custom charts",
      icon: BarChart3,
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      textColor: "text-pink-600",
      href: "/visualizations",
    },
  ];

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
          <Zap className="h-5 w-5 mr-2 text-blue-600" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <div
                  className="w-full h-full min-h-[120px] p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer bg-white flex flex-col items-center justify-center text-center space-y-3"
                  onClick={() => {
                    // Handle navigation - for now just log
                    console.log(`Navigate to ${action.href}`);
                  }}
                >
                  <div
                    className={`p-2.5 rounded-xl bg-gradient-to-r ${action.color} flex-shrink-0`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="font-medium text-gray-900 text-sm leading-tight">
                      {action.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 line-clamp-2 leading-tight">
                      {action.description}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
