"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside style={{
      width: "220px",
      minWidth: "220px",
      minHeight: "100vh",
      background: "linear-gradient(180deg, #0f172a, #1e293b)",
      padding: "1.5rem 1rem",
      boxShadow: "4px 0 20px rgba(0,0,0,0.3)"
    }}>

      {/* Logo */}
      <div style={{ marginBottom: "2rem", borderBottom: "1px solid #334155", paddingBottom: "1.5rem" }}>
        <div style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>🛡</div>
        <h1 style={{ color: "#ffffff", fontWeight: 800, fontSize: "1.1rem", lineHeight: 1.3, whiteSpace: "nowrap" }}>
          OpenPolicyEnv
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "0.75rem", marginTop: "0.25rem" }}>
          Governance Platform
        </p>
      </div>

      {/* Nav */}
      <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {[
          { href: "/", icon: "📊", label: "Dashboard" },
          { href: "/upload-report", icon: "📤", label: "Upload Report" },
          { href: "/violations", icon: "⚠️", label: "Violations" },
          { href: "/analytics", icon: "📈", label: "Analytics" },
          { href: "/reports", icon: "📄", label: "Reports" },
        ].map(({ href, icon, label }) => (
          <Link key={href} href={href} style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.65rem 0.9rem",
            borderRadius: "0.75rem",
            color: "#e2e8f0",
            fontWeight: 600,
            fontSize: "0.92rem",
            textDecoration: "none",
            whiteSpace: "nowrap",
            transition: "background 0.2s"
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "#2563eb")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <span style={{ fontSize: "1rem" }}>{icon}</span>
            {label}
          </Link>
        ))}
      </nav>

    </aside>
  );
}