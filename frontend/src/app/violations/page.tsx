import Sidebar from "@/components/Sidebar";
import ViolationsTable from "@/components/ViolationsTable";

export default function ViolationsPage() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-8">

        {/* HERO */}
        <div style={{
          background: "linear-gradient(135deg, #dc2626, #f43f5e)",
          borderRadius: "1.5rem",
          padding: "2.5rem",
          color: "white",
          marginBottom: "2rem",
          boxShadow: "0 10px 40px rgba(220,38,38,0.3)"
        }}>
          <h1 style={{ fontSize: "2.8rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            🚨 Policy Violations
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.1rem" }}>
            Monitor high-risk access violations and governance issues.
          </p>
        </div>

        <div style={{ height: "1.5rem" }} />

        {/* KPI Cards */}
        <div className="grid md:grid-cols-4 gap-6" style={{ marginBottom: "2rem" }}>
          <div style={{ background: "linear-gradient(135deg, #dc2626, #b91c1c)", borderRadius: "1.5rem", padding: "1.75rem", color: "white", boxShadow: "0 8px 24px rgba(220,38,38,0.35)" }}>
            <h3 style={{ color: "rgba(255,255,255,0.85)", marginBottom: "0.5rem" }}>Total Violations</h3>
            <p style={{ fontSize: "3rem", fontWeight: 800 }}>32</p>
          </div>
          <div style={{ background: "linear-gradient(135deg, #ea580c, #dc2626)", borderRadius: "1.5rem", padding: "1.75rem", color: "white", boxShadow: "0 8px 24px rgba(234,88,12,0.35)" }}>
            <h3 style={{ color: "rgba(255,255,255,0.85)", marginBottom: "0.5rem" }}>Critical Risk</h3>
            <p style={{ fontSize: "3rem", fontWeight: 800 }}>11</p>
          </div>
          <div style={{ background: "linear-gradient(135deg, #d97706, #f59e0b)", borderRadius: "1.5rem", padding: "1.75rem", color: "white", boxShadow: "0 8px 24px rgba(217,119,6,0.35)" }}>
            <h3 style={{ color: "rgba(255,255,255,0.85)", marginBottom: "0.5rem" }}>Medium Risk</h3>
            <p style={{ fontSize: "3rem", fontWeight: 800 }}>14</p>
          </div>
          <div style={{ background: "linear-gradient(135deg, #16a34a, #059669)", borderRadius: "1.5rem", padding: "1.75rem", color: "white", boxShadow: "0 8px 24px rgba(22,163,74,0.35)" }}>
            <h3 style={{ color: "rgba(255,255,255,0.85)", marginBottom: "0.5rem" }}>Resolved</h3>
            <p style={{ fontSize: "3rem", fontWeight: 800 }}>7</p>
          </div>
        </div>

        <ViolationsTable />

      </main>
    </div>
  );
}