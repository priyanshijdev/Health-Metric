##  Health Metrics Dashboard

A modern, responsive health metrics dashboard built using React, TypeScript, Vite, Tailwind CSS, and shadcn/ui. This application allows users to input daily health-related metrics, visualize them through tables and charts, and interact via filtering and sorting tools.

🔗 Live Demo: https://health-metric-tracker.vercel.app/
---

## Features
 ## Health Data Input
      Users can add metrics like Step Count, Water Intake, etc.
      Each entry includes a timestamp and numeric value.
      Input is validated to prevent empty or invalid submissions.

📊 Data Visualization
    Health data is shown in a table (most recent entries first).
    User can also have an option to export the data as a CSV file.
    Interactive Line/Bar charts (via Recharts) to track trends.
    Toggle views for Today, Last 7 Days, and Last 30 Days.

🔍 Filtering & Sorting
    Filter data by Time of Day (Morning / Afternoon / Evening).
    Sort values by ascending/descending order.

##  Tech Stack

-  **React** + **TypeScript**  : Component-based architecture and static typing
-  **Vite** (blazing-fast dev build) : Fast build tool and development server
-  **Tailwind CSS**  : Utility-first styling
-  **shadcn/ui** (modern component library built on Radix UI)  :Accessible components powered by Radix UI
-  **Recharts**  : Graphs for visual data representation
-  **Bun** (for development server and tooling)  : Alternative runtime for speed (optional) , but highly recommended as it's faster 

---

##  Installation & Setup


### 1. Clone the Repository

git clone https://github.com/priyanshijdev/Health-Metric
cd Health-Metric

  ### If you're using Bun:

bun install

Or with npm:
npm install

bun run dev

The app will be running at http://localhost:5173


## Future Improvements

🔹 Table Refactor with TanStack Table
  Replace custom table logic with TanStack Table to:
  Simplify sorting, filtering, and pagination
  Make table structure more modular and maintainable

🔹 Persistent Storage with useLocalStorage
   Integrate useLocalStorage hook from usehooks-ts to:
   Retain user-entered metrics between sessions

// Example
const [data, setData] = useLocalStorage<HealthMetric[]>("health-data", []);

