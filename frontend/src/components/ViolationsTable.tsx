"use client";

import { useState } from "react";

const violations = [
{
employee: "Sarah Johnson",
department: "IT",
role: "Contractor",
risk: "High",
status: "Open",
violation: "Production DB Access",
},
{
employee: "Michael Brown",
department: "Finance",
role: "Analyst",
risk: "High",
status: "Under Review",
violation: "Terminated Employee Access",
},
{
employee: "Alex Carter",
department: "HR",
role: "Manager",
risk: "Medium",
status: "Open",
violation: "Privilege Escalation",
},
{
employee: "Emma Wilson",
department: "Sales",
role: "Executive",
risk: "Low",
status: "Resolved",
violation: "Temporary Access Expired",
},
];

export default function ViolationsTable() {
const [search, setSearch] = useState("");

const filtered = violations.filter((item) =>
item.employee.toLowerCase().includes(search.toLowerCase())
);

return ( <div className="bg-white rounded-3xl shadow-xl p-8">

```
  <div className="flex justify-between items-center mb-6">

    <h2 className="text-3xl font-bold text-gray-800">
      Violation Registry
    </h2>

    <input
      type="text"
      placeholder="🔍 Search Employee..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border border-gray-300 rounded-xl px-4 py-2 w-72"
    />

  </div>

  <div className="overflow-x-auto">

    <table className="w-full">

      <thead>
        <tr className="bg-gray-100">

          <th className="p-4 text-left">
            Employee
          </th>

          <th className="p-4 text-left">
            Department
          </th>

          <th className="p-4 text-left">
            Role
          </th>

          <th className="p-4 text-left">
            Risk
          </th>

          <th className="p-4 text-left">
            Violation
          </th>

          <th className="p-4 text-left">
            Status
          </th>

        </tr>
      </thead>

      <tbody>

        {filtered.map((item, index) => (
          <tr
            key={index}
            className="border-b hover:bg-gray-50"
          >
            <td className="p-4 font-medium">
              {item.employee}
            </td>

            <td className="p-4">
              {item.department}
            </td>

            <td className="p-4">
              {item.role}
            </td>

            <td className="p-4">

              {item.risk === "High" && (
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold">
                  High
                </span>
              )}

              {item.risk === "Medium" && (
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-semibold">
                  Medium
                </span>
              )}

              {item.risk === "Low" && (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                  Low
                </span>
              )}

            </td>

            <td className="p-4">
              {item.violation}
            </td>

            <td className="p-4">

              {item.status === "Open" && (
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
                  Open
                </span>
              )}

              {item.status === "Under Review" && (
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                  Review
                </span>
              )}

              {item.status === "Resolved" && (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  Resolved
                </span>
              )}

            </td>

          </tr>
        ))}

      </tbody>

    </table>

  </div>

</div>


);
}
