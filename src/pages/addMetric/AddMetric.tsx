import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  TabsContent,
} from "../../components/ui/tabs";
import { CalendarIcon, Clock } from "lucide-react";
import  { useState } from "react";
import { metricConfig } from "./metric.constants";

export const AddMetric = () => {
  const [formData, setFormData] = useState({
    type: "" as "steps" | "water" | "heart_rate" | "",
    value: "",
    date: new Date().toISOString().split("T")[0],
    time: new Date().toTimeString().slice(0, 5),
  });
  const [errors, setErrors] = useState({
    type: "",
    value: "",
    date: "",
    time: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentConfig = formData.type ? metricConfig[formData.type] : null;

  const validateForm = () => {
    const newErrors = {
    type: "",
    value: "",
    date: "",
    time: "",
  };

    if (!formData.type) {
      newErrors.type = "Metric type is required";
    }
    if (!formData.value) {
      newErrors.value = "Value is required";
    } 
      if (!formData.date) {
      newErrors.date = "Date is required";
    }
    if (!formData.time) {
      newErrors.time = "Time is required";
    }
    else if (currentConfig) {
      const value = parseFloat(formData.value);
      if (isNaN(value) ||  value < currentConfig.min || value > currentConfig.max) 
      {
        newErrors.value = `Value must be between ${currentConfig.min} and ${currentConfig.max} ${currentConfig.unit}`;
      }
    }
    if (!formData.date) {
      newErrors.date = "Date is required";
    }
    if (!formData.time) {
      newErrors.time = "Time is required";
    }
    const isValid = Object.values(newErrors).every((msg) => msg === "");
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const existingData = JSON.parse(
        localStorage.getItem("healthMetrics") || "[]"
      );
      const newEntry = {
        ...formData,
        id: Date.now(),
        timestamp: new Date().toISOString(),
      };
      // Save updated data to---->> localStorage
      localStorage.setItem(
        "healthMetrics",
        JSON.stringify([...existingData, newEntry])
      );
      alert("Health metric saved successfully!");

      setFormData({
        type: "",
        value: "",
        date: new Date().toISOString().split("T")[0],
        time: new Date().toTimeString().slice(0, 5),
      });
      setErrors({
        type: "",
        value: "",
        date: "",
        time: "",
      });
    } catch (error) {
      console.error("Error saving to localStorage::", error);
      alert("Failed to save health metric. Please try again.");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TabsContent value="input">
          <Card className="max-w-3xl mx-auto py-8 backdrop-blur-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl">Add Health Metric</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Record your daily health measurements
              </CardDescription>
            </CardHeader>

            <CardContent className="py-6">
              {/* <HealthDataForm onSubmit={addHealthMetric} /> */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4 ">
                  <Label htmlFor="type">Metric Type *</Label>
                  <Select 
                    value={formData.type}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        type: value as any,
                        value: "",
                      }))
                    }
                  >
                    <SelectTrigger
                  className={`w-88 ${errors.type ? "border-red-500" : ""}-mt-2`}
                    >
                      <SelectValue placeholder="Select metric type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white cursor-pointer  w-80">
                      <SelectItem value="steps">📱 Step Count</SelectItem>
                      <SelectItem value="water">💧 Water Intake</SelectItem>
                      <SelectItem value="heart_rate">❤️ Heart Rate</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.type && (
                    <p className="text-sm text-red-500">{errors.type}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">
                    Value * {currentConfig && `(${currentConfig.unit})`}
                  </Label>
                  <Input
                    id="value"
                    type="number"
                    placeholder={currentConfig?.placeholder || "Enter value"}
                    value={formData.value}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        value: e.target.value,
                      }))
                    }
                    min={currentConfig?.min}
                    max={currentConfig?.max}
                    step={currentConfig?.step || 1}
                    className={errors.value ? "border-red-500" : ""}
                  />
                  {errors.value && (
                    <p className="text-sm text-red-500">{errors.value}</p>
                  )}
                  {currentConfig && (
                    <p className="text-xs text-gray-500">
                      Range: {currentConfig.min} - {currentConfig.max}{" "}
                      {currentConfig.unit}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2 mt-9">
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    Date *
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, date: e.target.value }))
                    }
                    max={new Date().toISOString().split("T")[0]}
                    className={errors.date ? "border-red-500" : ""}
                  />
                  {errors.date && (
                    <p className="text-sm text-red-500">{errors.date}</p>
                  )}
                </div>
                {/* time and date */}
                <div className="space-y-2">
                  <Label htmlFor="time" className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Time *
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, time: e.target.value }))
                    }
                    className={errors.time ? "border-red-500" : ""}
                  />
                  {errors.time && (
                    <p className="text-sm text-red-500">{errors.time}</p>
                  )}
                </div>
              </div>
            </CardContent>
            <div className="max-w-xl mx-auto mt-8">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-4">
                  <h4 className="font-semibold text-blue-900 mb-3 text-lg">
                    💡 Quick Tips
                  </h4>
                  <ul className="text-base text-blue-800 space-y-2 text-left">
                    <li>
                      • Record metrics at consistent times for better tracking
                    </li>
                    <li>
                      • Water intake: Include all fluids (water, tea, coffee,
                      etc.)
                    </li>
                    <li>• Heart rate: Best measured when resting</li>
                    <li>
                      • Steps: Your phone or fitness tracker can provide this
                      data
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            <Button
              type="submit"
              className="w-2xl h-10 bg-black text-white cursor-pointer ml-12"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Add Health Metric"}
            </Button>
          </Card>
        </TabsContent>
      </form>
    </div>
  );
};
