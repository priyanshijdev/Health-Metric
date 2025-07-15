import { Activity, Droplets, Heart } from "lucide-react";

 // Configuration for our three metric types
  export const metricTypes = [
    {
      type: "steps",
      title: "Steps",
      icon: Activity,
      color: "#16a34a",
      bgColor: "#f0fdf4",
      target: 10000,
      unit: "steps",
      time: "14/07/2025 at 15:47"
    },
    {
      type: "water",
      title: "Water Intake",
      icon: Droplets,
      color: "#2563eb",
      bgColor: "#eff6ff",
      target: 2.5,
      unit: "liters",
       time: "14/07/2025 at 15:16" 
    },
    {
      type: "heart_rate",
      title: "Heart Rate",
      icon: Heart,
      color: "#dc2626",
      bgColor: "#fef2f2",
      target: 70,
      unit: "bpm",
       time: "14/07/2025 at 14:46" 
    },
       {
      type: "steps",
      title: "Steps",
      icon: Activity,
      color: "#16a34a",
      bgColor: "#f0fdf4",
      target: 8000,
      unit: "steps",
      time: "15/07/2025 at 18:47"
    },
      {
      type: "water",
      title: "Water Intake",
      icon: Droplets,
      color: "#2563eb",
      bgColor: "#eff6ff",
      target: 7,
      unit: "liters",
       time: "15/07/2025 at 15:16" 
    },
     {
      type: "heart_rate",
      title: "Heart Rate",
      icon: Heart,
      color: "#dc2626",
      bgColor: "#fef2f2",
      target: 50,
      unit: "bpm",
       time: "14/07/2025 at 11:46" 
    },
      {
      type: "steps",
      title: "Steps",
      icon: Activity,
      color: "#16a34a",
      bgColor: "#f0fdf4",
      target: 10000,
      unit: "steps",
      time: "14/07/2025 at 15:47"
    },
     {
      type: "heart_rate",
      title: "Heart Rate",
      icon: Heart,
      color: "#dc2626",
      bgColor: "#fef2f2",
      target: 90,
      unit: "bpm",
       time: "14/07/2025 at 14:46" 
    },
  ]

  export const mockMetrics = [
  { type: "Steps", value: "10,000", unit: "steps", time: "14/07/2025 at 15:47" },
  { type: "Water Intake", value: "2.1", unit: "liters", time: "14/07/2025 at 15:16" },
  { type: "Steps", value: "12,000", unit: "steps", time: "14/07/2025 at 14:46" },
  { type: "Heart Rate", value: "72", unit: "bpm", time: "14/07/2025 at 13:46" },
  { type: "Water Intake", value: "1.2", unit: "liters", time: "14/07/2025 at 12:46" }
];
