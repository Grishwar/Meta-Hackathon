"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Compliant", value: 87 },
  { name: "Violations", value: 13 },
];

const COLORS = ["#22c55e", "#ef4444"];

export default function ComplianceChart() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 min-w-0">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Compliance Score
        </h2>

        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">
          87%
        </div>
      </div>

      <div className="w-full h-[350px] min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={70}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}