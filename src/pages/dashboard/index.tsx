import { Activity, Droplets, Heart, TrendingUp, TrendingDown } from "lucide-react";
import type { HealthMetric } from "../mainDashboard/Dashboard";
import {  Card, CardContent, CardDescription, CardHeader, CardTitle  } from "../../components/ui/card";


export const Dashboard = ()=> {
    return (
        <>
        <div>
             <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-2 p-5">
            {/* <Heart className="w-8 h-8 text-red-500" /> */}
           Dashboard
          </h1>
        </div>
        </div>
        </>
    )
}