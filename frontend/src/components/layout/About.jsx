import React from "react";
import { motion } from "framer-motion";
import { Globe, Users, Target, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import Button from "../ui/Button";

const About = () => {
  const values = [
    {
      icon: Globe,
      title: "Global Impact",
      description:
        "Supporting oceanographic research worldwide with accessible data analysis tools.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Built by researchers, for researchers, with input from the global ocean science community.",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      icon: Target,
      title: "Precision First",
      description:
        "Delivering scientifically accurate results with quality-controlled data and validated methods.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Pioneering the use of AI and natural language processing in oceanographic research.",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Bridging the Gap Between{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Data and Discovery
              </span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              ARGO Explorer revolutionizes how researchers interact with
              oceanographic data. By combining cutting-edge AI with the world's
              most comprehensive ocean dataset, we make complex marine science
              accessible to everyone.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our platform transforms natural language queries into
              sophisticated data analysis, enabling scientists, students, and
              decision-makers to uncover insights that were previously hidden in
              vast datasets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="ocean" size="lg">
                Learn More
              </Button>
              <Button variant="outline" size="lg">
                View Documentation
              </Button>
            </div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-600">
                    AI Processing Active
                  </span>
                </div>
                <div className="border rounded-lg p-4 bg-gray-50">
                  <p className="text-sm text-gray-500 mb-2">
                    Natural Language Query:
                  </p>
                  <p className="font-medium text-gray-900">
                    "Show me salinity profiles near the equator in March 2023"
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: "85%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, delay: 0.5 }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-600">85%</span>
                </div>
                <div className="text-sm text-gray-500">
                  Processing 2,847 ARGO profiles...
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              className="absolute -top-6 -right-6 w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Globe className="w-12 h-12 text-blue-600" />
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center"
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <Target className="w-8 h-8 text-cyan-600" />
            </motion.div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Our Core Values
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Guiding principles that drive our mission to democratize
            oceanographic research
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                  <CardHeader>
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${value.color} flex items-center justify-center mx-auto mb-4`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
