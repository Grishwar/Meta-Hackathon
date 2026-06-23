import Sidebar from "@/components/Sidebar";
import ComplianceChart from "@/components/ComplianceChart";
import DepartmentChart from "@/components/DepartmentChart";

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-8">

        {/* HERO */}
        <div style={{
          background: "linear-gradient(135deg, #1d4ed8, #7c3aed)",
          borderRadius: "1.5rem",
          padding: "2.5rem",
          color: "white",
          marginBottom: "2rem",
          boxShadow: "0 10px 40px rgba(29,78,216,0.3)"
        }}>
          <h1 style={{ fontSize: "2.8rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            📈 Security Analytics
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.1rem" }}>
            Enterprise risk insights and compliance metrics
          </p>
        </div>

        <div style={{ height: "1.5rem" }} />

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div style={{ background: "white", borderRadius: "1.5rem", boxShadow: "0 8px 24px rgba(0,0,0,0.08)", padding: "2rem" }}>
            <ComplianceChart />
          </div>
          <div style={{ background: "white", borderRadius: "1.5rem", boxShadow: "0 8px 24px rgba(0,0,0,0.08)", padding: "2rem" }}>
            <DepartmentChart />
          </div>
        </div>

        <div style={{ height: "1.5rem" }} />

        {/* KPI Cards */}
        <div className="grid md:grid-cols-3 gap-6">

          <div style={{
            background: "linear-gradient(135deg, #dc2626, #f43f5e)",
            borderRadius: "1.5rem",
            padding: "2rem",
            color: "white",
            boxShadow: "0 8px 24px rgba(220,38,38,0.35)"
          }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.75rem", color: "rgba(255,255,255,0.85)" }}>
              ⚠️ Critical Risks
            </h3>
            <p style={{ fontSize: "3.5rem", fontWeight: 800 }}>11</p>
          </div>

          <div style={{
            background: "linear-gradient(135deg, #1d4ed8, #0ea5e9)",
            borderRadius: "1.5rem",
            padding: "2rem",
            color: "white",
            boxShadow: "0 8px 24px rgba(29,78,216,0.35)"
          }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.75rem", color: "rgba(255,255,255,0.85)" }}>
              👥 Employees
            </h3>
            <p style={{ fontSize: "3.5rem", fontWeight: 800 }}>250</p>
          </div>

          <div style={{
            background: "linear-gradient(135deg, #16a34a, #059669)",
            borderRadius: "1.5rem",
            padding: "2rem",
            color: "white",
            boxShadow: "0 8px 24px rgba(22,163,74,0.35)"
          }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.75rem", color: "rgba(255,255,255,0.85)" }}>
              ✅ Compliance
            </h3>
            <p style={{ fontSize: "3.5rem", fontWeight: 800 }}>87%</p>
          </div>

        </div>

      </main>
    </div>
  );
}