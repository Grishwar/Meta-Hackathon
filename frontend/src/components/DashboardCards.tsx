"use client";

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

      <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-3xl shadow-xl p-8 text-white hover:scale-105 transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <span className="text-5xl">👥</span>
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">+12%</span>
        </div>
        <h3 className="text-blue-100 text-lg mb-2">Employees</h3>
        <p className="text-5xl font-bold">250</p>
      </div>

      <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-3xl shadow-xl p-8 text-white hover:scale-105 transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <span className="text-5xl">⚠</span>
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">-8%</span>
        </div>
        <h3 className="text-red-100 text-lg mb-2">Violations</h3>
        <p className="text-5xl font-bold">32</p>
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl shadow-xl p-8 text-white hover:scale-105 transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <span className="text-5xl">🔥</span>
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">-5%</span>
        </div>
        <h3 className="text-orange-100 text-lg mb-2">High Risk</h3>
        <p className="text-5xl font-bold">11</p>
      </div>

      <div className="bg-gradient-to-r from-green-500 to-emerald-700 rounded-3xl shadow-xl p-8 text-white hover:scale-105 transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <span className="text-5xl">✅</span>
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">+4%</span>
        </div>
        <h3 className="text-green-100 text-lg mb-2">Compliance</h3>
        <p className="text-5xl font-bold">87%</p>
      </div>

    </div>
  );
}