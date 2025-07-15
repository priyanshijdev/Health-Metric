import { Badge } from "../../components/ui/badge";
import {  Card,CardContent,CardDescription,CardHeader,CardTitle  } from "../../components/ui/card";
import { metricTypes } from "./index.constants";
import {
  Activity,
  Droplets,
  Heart,
} from "lucide-react";

export const Dashboard = () => {
  return (
    <div className="p-6 bg-blue-50 min-h-screen space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-m">Steps</CardTitle>
            <Activity className="w-5 h-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">10,000</div>
            <div className="text-sm text-muted-foreground">
              steps • 14/07/2025
            </div>
            <div className="text-xs mt-2">7-day average: 8500.0 steps</div>
            <Badge
              variant="outline"
              className="mt-2 bg-green-100 text-green-700"
            >
              ✅ Target Met
            </Badge>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm">Water Intake </CardTitle>
            <Droplets className=" text-blue-600  " />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1</div>
            <div className="text-sm text-muted-foreground">
              liters • 14/07/2025
            </div>
            <div className="text-xs mt-2">7-day average: 1.3 liters</div>
            <Badge variant="outline" className="mt-2 bg-red-100 text-red-700">
              ⚠️ Below Target
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            {" "}
            {/* Add flexbox classes here */}
            <CardTitle className="text-sm">Heart Rate</CardTitle>
            <Heart className="mt-2 text-red-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72</div>
            <div className="text-sm text-muted-foreground">
              bpm • 14/07/2025
            </div>
            <div className="text-xs mt-2">7-day average: 70.0 bpm</div>
            <Badge
              variant="outline"
              className="mt-2 bg-green-100 text-green-700"
            >
              ✅ Target Met
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Tablee*/}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest health metric entries</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {metricTypes.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-full"
                    style={{ backgroundColor: item.bgColor }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <div>
                    <div className="font-medium capitalize">{item.type}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.time}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{item.target}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.unit}
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};
