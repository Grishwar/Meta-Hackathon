"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "High", value: 3 },
  { name: "Medium", value: 5 },
  { name: "Low", value: 10 },
];

const COLORS = ["#ef4444", "#f59e0b", "#22c55e"];

export default function RiskChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4 text-black">
        Risk Distribution
      </h2>

      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={120}
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