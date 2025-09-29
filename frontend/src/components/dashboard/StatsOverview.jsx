import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { Card, CardContent } from "../ui/Card";

const StatCard = ({
  title,
  value,
  unit = "",
  trend,
  trendValue,
  icon: Icon,
  color = "blue",
  isLoading = false,
  delay = 0,
}) => {
  const colorClasses = {
    blue: {
      bg: "from-blue-500 to-blue-600",
      text: "text-blue-600",
      lightBg: "bg-blue-50",
    },
    emerald: {
      bg: "from-emerald-500 to-emerald-600",
      text: "text-emerald-600",
      lightBg: "bg-emerald-50",
    },
    purple: {
      bg: "from-purple-500 to-purple-600",
      text: "text-purple-600",
      lightBg: "bg-purple-50",
    },
    orange: {
      bg: "from-orange-500 to-orange-600",
      text: "text-orange-600",
      lightBg: "bg-orange-50",
    },
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
              <div className="flex items-baseline space-x-1">
                {isLoading ? (
                  <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                      <CountUp
                        end={value}
                        duration={2}
                        delay={delay}
                        preserveValue
                      />
                    </h3>
                    {unit && (
                      <span className="text-sm font-medium text-gray-500">
                        {unit}
                      </span>
                    )}
                  </>
                )}
              </div>

              {trend && trendValue && (
                <div className="flex items-center mt-2 space-x-1">
                  {trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      trend === "up" ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    {trendValue}%
                  </span>
                  <span className="text-sm text-gray-500">vs last month</span>
                </div>
              )}
            </div>

            <div
              className={`p-3 rounded-xl bg-gradient-to-r ${colors.bg} ${colors.lightBg}`}
            >
              <Icon className={`h-6 w-6 text-white`} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const StatsOverview = ({ isLoading = false }) => {
  const stats = [
    {
      title: "Active ARGO Floats",
      value: 4127,
      trend: "up",
      trendValue: 12,
      icon: Activity,
      color: "blue",
    },
    {
      title: "Ocean Profiles",
      value: 2847652,
      unit: "",
      trend: "up",
      trendValue: 8,
      icon: TrendingUp,
      color: "emerald",
    },
    {
      title: "Data Coverage",
      value: 94,
      unit: "%",
      trend: "up",
      trendValue: 3,
      icon: TrendingUp,
      color: "purple",
    },
    {
      title: "Real-time Updates",
      value: 24,
      unit: "/hour",
      trend: "up",
      trendValue: 15,
      icon: Activity,
      color: "orange",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard
          key={stat.title}
          {...stat}
          isLoading={isLoading}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
};

export default StatsOverview;
