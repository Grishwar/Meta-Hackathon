"use client";

import Sidebar from "@/components/Sidebar";
import DashboardCards from "@/components/DashboardCards";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-8">

        {/* HERO SECTION */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl shadow-2xl text-white px-10 pt-10 pb-10">
          <h1 className="text-6xl font-extrabold mb-4">
            🛡 Enterprise Access Governance Platform
          </h1>
          <p className="text-2xl text-blue-100 mb-4">
            Monitor • Detect • Remediate • Comply
          </p>
          <p className="max-w-4xl text-lg text-blue-100 leading-relaxed">
            Real-time access governance solution for detecting policy violations,
            monitoring high-risk users, generating compliance reports,
            and improving enterprise security posture.
          </p>
        </div>

        <div style={{ height: "2rem" }} />

        {/* KPI SECTION */}
        <div style={{ marginBottom: "2rem" }}>
          <DashboardCards />
        </div>

        <div style={{ height: "2rem" }} />

        {/* QUICK ACTIONS */}
        <div className="grid md:grid-cols-3 gap-8" style={{ marginBottom: "2rem" }}>

          <Link href="/upload-report">
            <div className="hover:scale-105 transition-transform duration-300" style={{
              background: "linear-gradient(135deg, #1d4ed8, #0ea5e9)",
              borderRadius: "1.5rem",
              padding: "2rem",
              color: "white",
              boxShadow: "0 10px 30px rgba(29,78,216,0.4)",
              cursor: "pointer",
              height: "100%"
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📤</div>
              <div style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.2)",
                borderRadius: "999px",
                padding: "2px 14px",
                fontSize: "0.75rem",
                marginBottom: "0.75rem",
                fontWeight: 600
              }}>ACTION</div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.75rem" }}>
                Upload Report
              </h2>
              <p style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>
                Upload employee access reports and instantly detect
                policy violations and high-risk users.
              </p>
            </div>
          </Link>

          <Link href="/analytics">
            <div className="hover:scale-105 transition-transform duration-300" style={{
              background: "linear-gradient(135deg, #059669, #10b981)",
              borderRadius: "1.5rem",
              padding: "2rem",
              color: "white",
              boxShadow: "0 10px 30px rgba(5,150,105,0.4)",
              cursor: "pointer",
              height: "100%"
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📈</div>
              <div style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.2)",
                borderRadius: "999px",
                padding: "2px 14px",
                fontSize: "0.75rem",
                marginBottom: "0.75rem",
                fontWeight: 600
              }}>INSIGHTS</div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.75rem" }}>
                Analytics
              </h2>
              <p style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>
                Visualize compliance score, department risk,
                and governance trends.
              </p>
            </div>
          </Link>

          <Link href="/reports">
            <div className="hover:scale-105 transition-transform duration-300" style={{
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              borderRadius: "1.5rem",
              padding: "2rem",
              color: "white",
              boxShadow: "0 10px 30px rgba(124,58,237,0.4)",
              cursor: "pointer",
              height: "100%"
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📄</div>
              <div style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.2)",
                borderRadius: "999px",
                padding: "2px 14px",
                fontSize: "0.75rem",
                marginBottom: "0.75rem",
                fontWeight: 600
              }}>REPORTS</div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.75rem" }}>
                Reports
              </h2>
              <p style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>
                Generate executive compliance reports and
                audit-ready summaries.
              </p>
            </div>
          </Link>

        </div>

        <div style={{ height: "2rem" }} />

        {/* SECURITY OVERVIEW */}
        <div style={{
          background: "linear-gradient(135deg, #1e293b, #334155)",
          borderRadius: "1.5rem",
          padding: "2.5rem",
          boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
        }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "white", marginBottom: "2rem" }}>
            🔐 Security Overview
          </h2>
          <div className="grid md:grid-cols-2 gap-8">

            <div style={{
              background: "linear-gradient(135deg, #dc2626, #f43f5e)",
              borderRadius: "1.25rem",
              padding: "1.75rem",
              boxShadow: "0 8px 24px rgba(220,38,38,0.35)"
            }}>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "white", marginBottom: "1.25rem" }}>
                ⚠️ Recent Risks
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  "Contractor has production DB access",
                  "Terminated employee still has access",
                  "Privileged account not reviewed"
                ].map((item, i) => (
                  <li key={i} style={{
                    color: "rgba(255,255,255,0.9)",
                    padding: "0.6rem 0",
                    borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.15)" : "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}>
                    <span>🔴</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{
              background: "linear-gradient(135deg, #16a34a, #059669)",
              borderRadius: "1.25rem",
              padding: "1.75rem",
              boxShadow: "0 8px 24px rgba(22,163,74,0.35)"
            }}>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "white", marginBottom: "1.25rem" }}>
                ✅ Recommended Actions
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  "Remove terminated employee access",
                  "Apply least privilege model",
                  "Review privileged accounts monthly",
                  "Enable automated certification"
                ].map((item, i) => (
                  <li key={i} style={{
                    color: "rgba(255,255,255,0.9)",
                    padding: "0.6rem 0",
                    borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.15)" : "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}>
                    <span>✔️</span> {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}