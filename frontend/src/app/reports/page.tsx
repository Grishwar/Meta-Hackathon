import Sidebar from "@/components/Sidebar";

export default function ReportsPage() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 p-8">

        <div style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", borderRadius: "1.5rem", padding: "2.5rem", color: "white", marginBottom: "2rem", boxShadow: "0 10px 40px rgba(124,58,237,0.3)" }}>
          <h1 style={{ fontSize: "2.8rem", fontWeight: 800, marginBottom: "0.5rem" }}>📄 Compliance Reports</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.1rem" }}>Executive compliance summary and audit readiness report.</p>
        </div>

        <div style={{ height: "1.5rem" }} />

        <div className="grid md:grid-cols-4 gap-6" style={{ marginBottom: "2rem" }}>
          <div style={{ background: "linear-gradient(135deg, #16a34a, #059669)", borderRadius: "1.5rem", padding: "1.75rem", color: "white", boxShadow: "0 8px 24px rgba(22,163,74,0.35)" }}>
            <h3 style={{ color: "rgba(255,255,255,0.85)", marginBottom: "0.5rem" }}>Compliance Score</h3>
            <p style={{ fontSize: "3rem", fontWeight: 800 }}>85%</p>
          </div>
          <div style={{ background: "linear-gradient(135deg, #1d4ed8, #0ea5e9)", borderRadius: "1.5rem", padding: "1.75rem", color: "white", boxShadow: "0 8px 24px rgba(29,78,216,0.35)" }}>
            <h3 style={{ color: "rgba(255,255,255,0.85)", marginBottom: "0.5rem" }}>Employees</h3>
            <p style={{ fontSize: "3rem", fontWeight: 800 }}>6</p>
          </div>
          <div style={{ background: "linear-gradient(135deg, #dc2626, #f43f5e)", borderRadius: "1.5rem", padding: "1.75rem", color: "white", boxShadow: "0 8px 24px rgba(220,38,38,0.35)" }}>
            <h3 style={{ color: "rgba(255,255,255,0.85)", marginBottom: "0.5rem" }}>Violations</h3>
            <p style={{ fontSize: "3rem", fontWeight: 800 }}>3</p>
          </div>
          <div style={{ background: "linear-gradient(135deg, #ea580c, #dc2626)", borderRadius: "1.5rem", padding: "1.75rem", color: "white", boxShadow: "0 8px 24px rgba(234,88,12,0.35)" }}>
            <h3 style={{ color: "rgba(255,255,255,0.85)", marginBottom: "0.5rem" }}>High Risk</h3>
            <p style={{ fontSize: "3rem", fontWeight: 800 }}>3</p>
          </div>
        </div>

        <div style={{ background: "white", borderRadius: "1.5rem", padding: "2rem", marginBottom: "2rem", boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1e293b", marginBottom: "1rem" }}>Executive Summary</h2>
          <p style={{ color: "#475569", lineHeight: 1.8, fontSize: "1.05rem" }}>
            The organization currently maintains a compliance score of <strong>85%</strong> across all monitored employee accounts. Analysis identified <strong>3 policy violations</strong> and <strong>3 high-risk users</strong> requiring immediate remediation.
          </p>
        </div>

        <div style={{ background: "linear-gradient(135deg, #1e293b, #334155)", borderRadius: "1.5rem", padding: "2rem", marginBottom: "2rem", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "white", marginBottom: "1.5rem" }}>🛡️ Audit Readiness</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div style={{ background: "linear-gradient(135deg, #16a34a, #059669)", borderRadius: "1.25rem", padding: "1.5rem", color: "white", boxShadow: "0 4px 16px rgba(22,163,74,0.3)" }}>
              <h3 style={{ fontWeight: 700, marginBottom: "0.5rem", color: "rgba(255,255,255,0.85)" }}>Access Reviews</h3>
              <p style={{ fontSize: "2.5rem", fontWeight: 800 }}>92%</p>
            </div>
            <div style={{ background: "linear-gradient(135deg, #d97706, #f59e0b)", borderRadius: "1.25rem", padding: "1.5rem", color: "white", boxShadow: "0 4px 16px rgba(217,119,6,0.3)" }}>
              <h3 style={{ fontWeight: 700, marginBottom: "0.5rem", color: "rgba(255,255,255,0.85)" }}>Policy Coverage</h3>
              <p style={{ fontSize: "2.5rem", fontWeight: 800 }}>88%</p>
            </div>
            <div style={{ background: "linear-gradient(135deg, #dc2626, #f43f5e)", borderRadius: "1.25rem", padding: "1.5rem", color: "white", boxShadow: "0 4px 16px rgba(220,38,38,0.3)" }}>
              <h3 style={{ fontWeight: 700, marginBottom: "0.5rem", color: "rgba(255,255,255,0.85)" }}>Open Findings</h3>
              <p style={{ fontSize: "2.5rem", fontWeight: 800 }}>3</p>
            </div>
          </div>
        </div>

        <div style={{ background: "linear-gradient(135deg, #16a34a, #059669)", borderRadius: "1.5rem", padding: "2rem", marginBottom: "2rem", boxShadow: "0 8px 24px rgba(22,163,74,0.3)" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "white", marginBottom: "1.25rem" }}>🤖 Governance Recommendations</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {["Remove access from terminated employees", "Apply least-privilege access to contractors", "Review privileged accounts monthly", "Enable automated access certification", "Schedule quarterly governance audits"].map((item, i) => (
              <li key={i} style={{ color: "rgba(255,255,255,0.92)", padding: "0.6rem 0", borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.15)" : "none", display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "1rem" }}>
                <span>✔️</span> {item}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ background: "white", borderRadius: "1.5rem", padding: "2rem", boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1e293b", marginBottom: "1.25rem" }}>📥 Export Reports</h2>
          <a href="http://localhost:8000/download-csv" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "linear-gradient(135deg, #16a34a, #059669)", color: "white", padding: "0.8rem 2rem", borderRadius: "0.75rem", fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 16px rgba(22,163,74,0.35)" }}>📊 Download CSV</a>
        </div>

      </main>
    </div>
  );
}