import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { mockData } from "./table.constants";

const HealthTable = () => {

  const [data, setData] = useState(mockData);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filterTimeOfDay, setFilterTimeOfDay] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredAndSortedData = [...data]
    .filter(
      (item) =>
        item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.value.toString().includes(searchTerm.toLowerCase()) ||
        item.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.time.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.timeOfDay.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (item) => filterTimeOfDay === "All" || item.timeOfDay === filterTimeOfDay
    )
    .sort((a, b) =>
      sortOrder === "asc" ? a.value - b.value : b.value - a.value
    );

  const handleDelete = (id: number) => {
    setData(data.filter((item) => item.id !== id));
  };

  const todaysEntries = data.filter( (item) => item.date === "14/07/2025").length; 
  const totalEntries = data.length;
  const morningEntries = data.filter(
    (item) => item.timeOfDay === "Morning").length;
  const eveningEntries = data.filter(
    (item) => item.timeOfDay === "Evening"
  ).length;

  return (
    <div className="space-y-4 p-6 bg-white rounded-lg shadow-md">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold text-gray-800">
            Health Data Table
          </h2>
        </div>
        <p className="text-gray-500 mb-4 text-left">
          View, filter, and manage your health metrics ({data.length} entries
          shown)
        </p>
            {/* Showng alll the entries in small box/divs */}
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-700">
              {todaysEntries}
            </div>
            <div className="text-sm text-gray-500">Today's Entries</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-700">
              {totalEntries}
            </div>
            <div className="text-sm text-gray-500">Total Entries</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-700">
              {morningEntries}
            </div>
            <div className="text-sm text-gray-500">Morning</div>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-700">
              {eveningEntries}
            </div>
            <div className="text-sm text-gray-500">Evening</div>
          </div>
        </div>
      </div>
      {/* End Header Section */}

      <div className="flex flex-wrap items-center gap-4 justify-between">
        <Input
          placeholder="Search metrics..."
          className="max-w-sm flex-grow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select value={filterTimeOfDay} onValueChange={setFilterTimeOfDay}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time of Day" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Morning">Morning</SelectItem>
            <SelectItem value="Afternoon">Afternoon</SelectItem>
            <SelectItem value="Evening">Evening</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={sortOrder}
          onValueChange={(v: "asc" | "desc") => setSortOrder(v)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="asc">Lowest First</SelectItem>
            <SelectItem value="desc">Highest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table className="min-w-full">
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="py-3 pl-6 text-center text-s font-medium text-gray-700 uppercase tracking-wider">
              Metric Type
            </TableHead>
            <TableHead className="py-3 pl-6 text-center text-s font-medium text-gray-700 uppercase tracking-wider">
              Value
            </TableHead>
            <TableHead className="py-3 pl-6 text-center text-s font-medium text-gray-700 uppercase tracking-wider">
              Date & Time
            </TableHead>
            <TableHead className="py-3 pl-6 text-center text-s font-medium text-gray-700 uppercase tracking-wider">
              Time of Day
            </TableHead>
            <TableHead className="py-3 pr-6 text-right text-s font-medium text-gray-700 uppercase tracking-wider">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-white divide-y divide-gray-200">
          {filteredAndSortedData.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell className="py-3 px-4 whitespace-nowrap">
                {entry.type}
              </TableCell>
              <TableCell className="py-3 px-4 whitespace-nowrap font-bold text-gray-900">
                {entry.value}{" "}
                <span className="text-sm font-normal text-gray-500">
                  {entry.unit}
                </span>
              </TableCell>
              <TableCell className="py-3 px-4 whitespace-nowrap">
                {entry.date}{" "}
                <div className="text-sm text-gray-500">{entry.time}</div>
              </TableCell>
              <TableCell className="py-3 px-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  {entry.timeOfDay}
                </span>
              </TableCell>
              <TableCell className="py-3 px-4 whitespace-nowrap text-right text-sm font-medium">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(entry.id)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default HealthTable;
