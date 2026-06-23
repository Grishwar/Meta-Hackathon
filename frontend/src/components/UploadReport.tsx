"use client";

import { useState } from "react";
import axios from "axios";

export default function UploadReport() {
const [file, setFile] = useState<File | null>(null);
const [result, setResult] = useState<any>(null);
const [loading, setLoading] = useState(false);
const [uploadTime, setUploadTime] = useState("");

const handleUpload = async () => {
if (!file) {
alert("Please select a file");
return;
}


const formData = new FormData();
formData.append("file", file);

try {
  setLoading(true);

  const response = await axios.post(
    "http://localhost:8000/upload-report",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  setResult(response.data);
  setUploadTime(new Date().toLocaleString());

} catch (error) {
  console.error(error);
  alert("Upload failed");
} finally {
  setLoading(false);
}


};

return ( <div className="space-y-8">


  <section className="bg-white rounded-3xl shadow-xl p-8">

    <h2 className="text-3xl font-bold text-gray-800 mb-2">
      📤 Upload Employee Access Report
    </h2>

    <p className="text-gray-500 mb-6">
      Upload CSV or Excel files to detect policy violations and high-risk users.
    </p>

    <input
      type="file"
      accept=".csv,.xlsx"
      onChange={(e) =>
        setFile(e.target.files?.[0] || null)
      }
      className="mb-5 block"
    />

    <button
      onClick={handleUpload}
      className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-all duration-300"
    >
      {loading
        ? "⏳ Uploading & Analyzing..."
        : "🚀 Analyze Report"}
    </button>

  </section>

  {result && (
    <>

      <div className="bg-white rounded-3xl shadow-xl p-6">

        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          📋 Analysis Status
        </h3>

        <div className="grid md:grid-cols-3 gap-6">

          <div>
            <p className="text-gray-500">
              Selected File
            </p>

            <p className="font-bold text-gray-800">
              {file?.name}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Status
            </p>

            <p className="font-bold text-green-600">
              ✅ Analysis Completed
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Upload Time
            </p>

            <p className="font-bold text-gray-800">
              {uploadTime}
            </p>
          </div>

        </div>

      </div>

      <div className="grid md:grid-cols-5 gap-6">

        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-3xl p-6 shadow-xl">
          <h4 className="text-blue-100 mb-2">
            👥 Employees
          </h4>
          <p className="text-4xl font-bold">
            {result.summary.total_employees}
          </p>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-3xl p-6 shadow-xl">
          <h4 className="text-red-100 mb-2">
            ⚠ Violations
          </h4>
          <p className="text-4xl font-bold">
            {result.summary.violations}
          </p>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-3xl p-6 shadow-xl">
          <h4 className="text-orange-100 mb-2">
            🔥 High Risk
          </h4>
          <p className="text-4xl font-bold">
            {result.summary.high_risk}
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-700 text-white rounded-3xl p-6 shadow-xl">
          <h4 className="text-green-100 mb-2">
            ✅ Compliance
          </h4>
          <p className="text-4xl font-bold">
            {result.summary.compliance_score}%
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-indigo-700 text-white rounded-3xl p-6 shadow-xl">
          <h4 className="text-purple-100 mb-2">
            📊 Risk Score
          </h4>
          <p className="text-4xl font-bold">
            {100 - result.summary.compliance_score}
          </p>
        </div>

      </div>

      <div className="bg-gradient-to-r from-indigo-900 to-blue-800 text-white rounded-3xl p-8 shadow-xl">

        <h3 className="text-2xl font-bold mb-4">
          🤖 Governance Recommendations
        </h3>

        <ul className="space-y-3 text-blue-100">
          <li>✅ Remove terminated employee access immediately</li>
          <li>✅ Review privileged account permissions</li>
          <li>✅ Revoke contractor production database access</li>
          <li>✅ Schedule monthly access certification reviews</li>
          <li>✅ Enforce least-privilege access policy</li>
        </ul>

      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8">

        <div className="mb-6">

          <h3 className="text-2xl font-bold text-gray-800">
            🚨 Policy Violations
          </h3>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="bg-gray-100">

                <th className="p-4 text-left">
                  Employee
                </th>

                <th className="p-4 text-left">
                  Risk
                </th>

                <th className="p-4 text-left">
                  Violation
                </th>

              </tr>
            </thead>

            <tbody>
              {result.violations.map(
                (item: any, index: number) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-4 font-medium text-gray-800">
                      {item.employee}
                    </td>

                    <td className="p-4">
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold">
                        {item.risk}
                      </span>
                    </td>

                    <td className="p-4 text-gray-700">
                      {item.violation}
                    </td>
                  </tr>
                )
              )}
            </tbody>

          </table>

        </div>

      </div>

    </>
  )}

</div>
);
}
