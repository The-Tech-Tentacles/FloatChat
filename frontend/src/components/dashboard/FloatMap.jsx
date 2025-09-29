import React, { useState } from "react";
import { Map, Navigation, Waves, Thermometer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";

const FloatMap = () => {
  const [selectedFloat, setSelectedFloat] = useState(null);

  // Mock ARGO float data
  const argoFloats = [
    {
      id: 1,
      lat: 20.5,
      lng: 68.2,
      status: "active",
      temperature: 26.8,
      depth: 2000,
      lastUpdate: "2h ago",
    },
    {
      id: 2,
      lat: 18.3,
      lng: 70.1,
      status: "surfacing",
      temperature: 28.2,
      depth: 150,
      lastUpdate: "30m ago",
    },
    {
      id: 3,
      lat: 22.1,
      lng: 65.8,
      status: "diving",
      temperature: 24.5,
      depth: 1500,
      lastUpdate: "1h ago",
    },
    {
      id: 4,
      lat: 19.8,
      lng: 72.5,
      status: "active",
      temperature: 27.3,
      depth: 1800,
      lastUpdate: "15m ago",
    },
    {
      id: 5,
      lat: 21.2,
      lng: 69.7,
      status: "maintenance",
      temperature: 25.9,
      depth: 0,
      lastUpdate: "6h ago",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "surfacing":
        return "bg-blue-500";
      case "diving":
        return "bg-purple-500";
      case "maintenance":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Active";
      case "surfacing":
        return "Surfacing";
      case "diving":
        return "Diving";
      case "maintenance":
        return "Maintenance";
      default:
        return "Unknown";
    }
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
          <Map className="h-5 w-5 mr-2 text-blue-600" />
          ARGO Float Network
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Map placeholder with ocean background */}
        <div className="relative h-80 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-lg overflow-hidden">
          {/* Ocean waves pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg
              className="w-full h-full"
              viewBox="0 0 400 300"
              preserveAspectRatio="none"
            >
              <path
                d="M0,150 Q100,120 200,150 T400,150 L400,300 L0,300 Z"
                fill="rgba(255,255,255,0.1)"
              />
              <path
                d="M0,180 Q150,150 300,180 T600,180 L600,300 L0,300 Z"
                fill="rgba(255,255,255,0.05)"
              />
            </svg>
          </div>

          {/* ARGO Float markers */}
          {argoFloats.map((float) => (
            <div
              key={float.id}
              className={`absolute w-4 h-4 rounded-full ${getStatusColor(
                float.status
              )} border-2 border-white shadow-lg cursor-pointer transform transition-all duration-200 hover:scale-125`}
              style={{
                left: `${((float.lng - 65) / (73 - 65)) * 100}%`,
                top: `${((22 - float.lat) / (22 - 18)) * 100}%`,
              }}
              onClick={() =>
                setSelectedFloat(selectedFloat === float.id ? null : float.id)
              }
            >
              <div
                className={`absolute inset-0 rounded-full ${getStatusColor(
                  float.status
                )} animate-ping opacity-30`}
              ></div>
            </div>
          ))}

          {/* Coordinate grid */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Latitude lines */}
            {[20, 22, 24].map((lat) => (
              <div
                key={lat}
                className="absolute w-full border-t border-white border-opacity-20"
                style={{ top: `${((22 - lat) / (22 - 18)) * 100}%` }}
              />
            ))}
            {/* Longitude lines */}
            {[66, 68, 70, 72].map((lng) => (
              <div
                key={lng}
                className="absolute h-full border-l border-white border-opacity-20"
                style={{ left: `${((lng - 65) / (73 - 65)) * 100}%` }}
              />
            ))}
          </div>

          {/* Compass */}
          <div className="absolute top-4 right-4 bg-white bg-opacity-90 p-2 rounded-lg">
            <Navigation className="h-4 w-4 text-gray-700" />
          </div>

          {/* Scale */}
          <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-2 py-1 rounded text-xs text-gray-700">
            Scale: 1:5M
          </div>
        </div>

        {/* Float details */}
        {selectedFloat && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            {(() => {
              const float = argoFloats.find((f) => f.id === selectedFloat);
              return (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-blue-900">
                      Float #{float.id}
                    </h4>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(
                        float.status
                      )}`}
                    >
                      {getStatusText(float.status)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Navigation className="h-4 w-4 mr-2 text-blue-600" />
                      <span className="text-gray-600">
                        {float.lat}°N, {float.lng}°E
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Thermometer className="h-4 w-4 mr-2 text-red-500" />
                      <span className="text-gray-600">
                        {float.temperature}°C
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Waves className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="text-gray-600">
                        {float.depth}m depth
                      </span>
                    </div>
                    <div className="text-gray-500">
                      Updated: {float.lastUpdate}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Legend */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { status: "active", count: 2 },
            { status: "surfacing", count: 1 },
            { status: "diving", count: 1 },
            { status: "maintenance", count: 1 },
          ].map((item) => (
            <div key={item.status} className="flex items-center">
              <div
                className={`w-3 h-3 rounded-full ${getStatusColor(
                  item.status
                )} mr-2`}
              ></div>
              <span className="text-sm text-gray-600">
                {getStatusText(item.status)} ({item.count})
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FloatMap;
