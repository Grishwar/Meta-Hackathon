"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { department: "IT", violations: 8 },
  { department: "HR", violations: 2 },
  { department: "Finance", violations: 5 },
  { department: "Sales", violations: 3 },
];

export default function DepartmentChart() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 min-w-0">

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Violations by Department
      </h2>

      <div className="w-full h-[350px] min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="violations"
              fill="#ef4444"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}