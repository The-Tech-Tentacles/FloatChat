import React from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Database,
  TrendingUp,
  MapPin,
  Zap,
  Shield,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";

const Features = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "Natural Language Queries",
      description:
        "Ask questions about ocean data in plain English. Our AI understands your intent and delivers precise results.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Database,
      title: "ARGO Float Data",
      description:
        "Access comprehensive oceanographic data from thousands of autonomous ARGO floats worldwide.",
      color: "from-cyan-500 to-cyan-600",
    },
    {
      icon: TrendingUp,
      title: "Real-time Visualizations",
      description:
        "Generate interactive charts, depth profiles, and trend analysis with instant visual feedback.",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      icon: MapPin,
      title: "Geospatial Mapping",
      description:
        "Explore data on interactive maps with trajectory visualization and geographic filtering.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Powered by advanced RAG technology for instant responses to complex oceanographic queries.",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: Shield,
      title: "Research Grade",
      description:
        "Built for scientific accuracy with quality-controlled data and peer-reviewed methodologies.",
      color: "from-red-500 to-red-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Ocean Research
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock the full potential of oceanographic data with our
            comprehensive suite of AI-powered tools
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
                  <CardHeader>
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-24 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 md:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                4000+
              </div>
              <div className="text-gray-600">Active ARGO Floats</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                2M+
              </div>
              <div className="text-gray-600">Ocean Profiles</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                24/7
              </div>
              <div className="text-gray-600">Real-time Monitoring</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                99.9%
              </div>
              <div className="text-gray-600">Data Accuracy</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
