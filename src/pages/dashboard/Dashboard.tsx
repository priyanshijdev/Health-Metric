import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Activity, Droplets, Heart, TrendingUp } from "lucide-react";
import { AddMetric } from "../addMetric/AddMetric";

// import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen min-w-full bg-gradient-to-br from-blue-50 to-indigo-100 p-1">
      <div className="w-full mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-2 p-5">
            <Heart className="w-8 h-8 text-red-500" />
            HealthTracker
          </h1>
          <p className="text-gray-600 text-lg">
            Track and visualize your daily health metrics
          </p>
        </div>
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger
              value="dashboard"
              className="flex items-center gap-5 cursor-pointer border-2 bg-blue-300 p-2"
            >
              <TrendingUp className="w-4 h-4" />
              Dashboard
            </TabsTrigger>

            <TabsTrigger
              value="input"
              className="flex items-center gap-2 bg-blue-300 cursor-pointer  p-2"
            >
              <Activity className="w-4 h-4" />
              Add Data
            </TabsTrigger>

            <TabsTrigger
              value="charts"
              className="flex items-center gap-2  bg-blue-200 cursor-pointer  p-2"
            >
              <Droplets className="w-4 h-4" />
              Charts
            </TabsTrigger>
          </TabsList>
            <TabsContent value="input">
            <AddMetric />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
