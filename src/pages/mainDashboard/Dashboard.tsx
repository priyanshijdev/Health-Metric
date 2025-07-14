import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Activity, Droplets, Heart, TrendingUp , Table} from "lucide-react";
import { AddMetric } from "../addMetric/AddMetric";
import { Dashboard } from "../dashboard";
import HealthTable from "../dataTable/DataTable";
// import { Table } from "../../components/ui/table";

// import React from "react";
export interface HealthMetric {
  id: string
  type: "steps" | "water" | "heart_rate"
  value: number
  timestamp: Date
  unit: string
}

const MainDashboard = () => {
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
          <TabsList className="grid w-full grid-cols-4 gap-8 max-w-3xl mx-auto text-lg px-6 py-3">
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
            
            <TabsTrigger value="table" className="flex items-center gap-2  bg-blue-200 cursor-pointer  p-2">
              <Table className="w-4 h-4" />
              Data Table
            </TabsTrigger>

          </TabsList>

          {/* Component calling */}
            <TabsContent value="input">
            <AddMetric />
          </TabsContent>

             <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>

             <TabsContent value="table">
            <HealthTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MainDashboard;
