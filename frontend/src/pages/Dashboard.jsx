import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import StatsOverview from "../components/dashboard/StatsOverview";
import QuickActions from "../components/dashboard/QuickActions";
import RecentActivity from "../components/dashboard/RecentActivity";
import DataTrendsChart from "../components/dashboard/DataTrendsChart";
import FloatMap from "../components/dashboard/FloatMap";
import SearchAndFilter from "../components/dashboard/SearchAndFilter";

const Dashboard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <motion.div
        className="container mx-auto px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Ocean Intelligence Dashboard
              </h1>
              <p className="text-gray-600">
                Real-time insights from the global ARGO float network
              </p>
            </div>
            <Link
              to="/"
              className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div className="mb-8" variants={itemVariants}>
          <StatsOverview />
        </motion.div>

        {/* Search and Filter */}
        <motion.div className="mb-8" variants={itemVariants}>
          <SearchAndFilter />
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Charts and Map */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div variants={itemVariants}>
              <DataTrendsChart />
            </motion.div>
            <motion.div variants={itemVariants}>
              <FloatMap />
            </motion.div>
          </div>

          {/* Right Column - Actions and Activity */}
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <QuickActions />
            </motion.div>
            <motion.div variants={itemVariants}>
              <RecentActivity />
            </motion.div>
          </div>
        </div>

        {/* Additional Dashboard Widgets */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          variants={itemVariants}
        >
          {/* Performance Metrics */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              System Performance
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Data Processing</span>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "92%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    92%
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Float Connectivity</span>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "87%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-blue-600">87%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Data Quality</span>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: "95%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-purple-600">
                    95%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts & Notifications */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              System Alerts
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Low Battery Warning
                  </p>
                  <p className="text-xs text-gray-600">
                    Float #2847 - Arabian Sea
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    New Data Available
                  </p>
                  <p className="text-xs text-gray-600">
                    15 new profiles processed
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Calibration Complete
                  </p>
                  <p className="text-xs text-gray-600">
                    Float #1923 - Bay of Bengal
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Today's Summary
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Profiles Collected</span>
                <span className="font-semibold text-blue-600">127</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Floats</span>
                <span className="font-semibold text-green-600">43</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Data Transmitted</span>
                <span className="font-semibold text-purple-600">2.4 GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Response Time</span>
                <span className="font-semibold text-orange-600">1.2s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">System Uptime</span>
                <span className="font-semibold text-emerald-600">99.9%</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
