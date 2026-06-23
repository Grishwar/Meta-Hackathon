import Sidebar from "@/components/Sidebar";
import UploadReport from "@/components/UploadReport";

export default function UploadReportPage() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-8">

        {/* HERO */}
        <div style={{
          background: "linear-gradient(135deg, #0ea5e9, #1d4ed8)",
          borderRadius: "1.5rem",
          padding: "2.5rem",
          color: "white",
          marginBottom: "2rem",
          boxShadow: "0 10px 40px rgba(14,165,233,0.3)"
        }}>
          <h1 style={{ fontSize: "2.8rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            📤 Upload Access Report
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.1rem" }}>
            Upload employee access reports and automatically detect governance
            violations, privileged access risks, and compliance gaps.
          </p>
        </div>

        <div style={{ height: "1.5rem" }} />

        <UploadReport />

      </main>
    </div>
  );
}