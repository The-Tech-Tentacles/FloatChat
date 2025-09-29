import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  Thermometer,
  Waves,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import Button from "../ui/Button";

const SearchAndFilter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: "last-30-days",
    location: "all",
    temperature: { min: "", max: "" },
    depth: { min: "", max: "" },
    status: "all",
    dataType: "all",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleRangeChange = (category, field, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  const clearFilters = () => {
    setFilters({
      dateRange: "last-30-days",
      location: "all",
      temperature: { min: "", max: "" },
      depth: { min: "", max: "" },
      status: "all",
      dataType: "all",
    });
  };

  const activeFiltersCount = Object.values(filters).filter((value) => {
    if (typeof value === "object") {
      return value.min !== "" || value.max !== "";
    }
    return value !== "all" && value !== "last-30-days";
  }).length;

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900 flex items-center justify-between">
          <div className="flex items-center">
            <Search className="h-5 w-5 mr-2 text-blue-600" />
            Data Search & Filters
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="relative"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search floats, regions, or data profiles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Filter Panel */}
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-100 pt-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Date Range */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  Date Range
                </label>
                <select
                  value={filters.dateRange}
                  onChange={(e) =>
                    handleFilterChange("dateRange", e.target.value)
                  }
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="last-7-days">Last 7 days</option>
                  <option value="last-30-days">Last 30 days</option>
                  <option value="last-90-days">Last 90 days</option>
                  <option value="last-year">Last year</option>
                  <option value="custom">Custom range</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  Ocean Region
                </label>
                <select
                  value={filters.location}
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Regions</option>
                  <option value="arabian-sea">Arabian Sea</option>
                  <option value="bay-of-bengal">Bay of Bengal</option>
                  <option value="indian-ocean">Indian Ocean</option>
                  <option value="pacific">Pacific Ocean</option>
                  <option value="atlantic">Atlantic Ocean</option>
                </select>
              </div>

              {/* Float Status */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Waves className="h-4 w-4 mr-2" />
                  Float Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="surfacing">Surfacing</option>
                  <option value="diving">Diving</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>

              {/* Temperature Range */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Thermometer className="h-4 w-4 mr-2" />
                  Temperature (°C)
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.temperature.min}
                    onChange={(e) =>
                      handleRangeChange("temperature", "min", e.target.value)
                    }
                    className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.temperature.max}
                    onChange={(e) =>
                      handleRangeChange("temperature", "max", e.target.value)
                    }
                    className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Depth Range */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Waves className="h-4 w-4 mr-2" />
                  Depth (m)
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.depth.min}
                    onChange={(e) =>
                      handleRangeChange("depth", "min", e.target.value)
                    }
                    className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.depth.max}
                    onChange={(e) =>
                      handleRangeChange("depth", "max", e.target.value)
                    }
                    className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Data Type */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Filter className="h-4 w-4 mr-2" />
                  Data Type
                </label>
                <select
                  value={filters.dataType}
                  onChange={(e) =>
                    handleFilterChange("dataType", e.target.value)
                  }
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Data Types</option>
                  <option value="temperature">Temperature</option>
                  <option value="salinity">Salinity</option>
                  <option value="pressure">Pressure</option>
                  <option value="oxygen">Dissolved Oxygen</option>
                  <option value="ph">pH Levels</option>
                </select>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-500">
                {activeFiltersCount > 0 &&
                  `${activeFiltersCount} filter${
                    activeFiltersCount > 1 ? "s" : ""
                  } applied`}
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-1" />
                  Clear All
                </Button>
                <Button variant="ocean" size="sm">
                  Apply Filters
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Quick Search Suggestions */}
        {searchQuery === "" && !isFilterOpen && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Quick Searches:
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                "Arabian Sea floats",
                "High temperature",
                "Recent profiles",
                "Active floats",
                "Deep water data",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setSearchQuery(suggestion)}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-colors duration-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results Preview */}
        {searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-gray-50 rounded-lg"
          >
            <p className="text-sm text-gray-600 mb-2">
              Searching for:{" "}
              <span className="font-medium">"{searchQuery}"</span>
            </p>
            <div className="text-sm text-blue-600">
              Found 23 floats, 1,847 profiles, 5 regions
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default SearchAndFilter;
