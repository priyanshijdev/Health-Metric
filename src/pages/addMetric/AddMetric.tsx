import React from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";

export const AddMetric = () => {
  return (
    <div>
        {/* <div>
               <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-2 p-5">
                Add Health Metric
          </h1>
          <p className="text-gray-600 text-lg">
           Record your daily health measurements
          </p>
        </div> */}
      <TabsContent value="input">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Add Health Metric</CardTitle>
                <CardDescription>Record your daily health measurements</CardDescription>
              </CardHeader>
              <CardContent>
                {/* <HealthDataForm onSubmit={addHealthMetric} /> */}
              </CardContent>
            </Card>
          </TabsContent>

    </div>
  )
}
