# 🛡️ OpenPolicyEnv – Enterprise Access Governance Platform

OpenPolicyEnv is an AI-powered Enterprise Access Governance Platform designed to detect access control violations, identify high-risk users, generate compliance insights, and recommend remediation actions.

Built for the Meta OpenPolicyEnv Hackathon, the platform helps organizations strengthen security posture through automated governance and policy analysis.

---

## 🚀 Live Demo

### Frontend (Vercel)
https://meta-hackathon-frontend-g0roagaxv-grishwars-projects.vercel.app

### Backend API (Render)
https://name-meta-hackathon-api.onrender.com

---

## 📌 Problem Statement

Organizations often struggle with:

- Excessive user permissions
- Privileged account misuse
- Orphaned accounts
- Contractor access violations
- Compliance audit readiness
- Access review management

Manual access governance is slow, expensive, and error-prone.

OpenPolicyEnv automates these processes using policy-driven analysis.

---

## 🎯 Features

### 📤 Access Report Upload
- Upload employee access reports (CSV)
- Automated validation and processing

### ⚠️ Policy Violation Detection
Detects:

- Contractor with production database access
- Terminated employee still has access
- Unauthorized privileged access
- Excessive permissions
- Policy compliance violations

### 📊 Analytics Dashboard
Visualize:

- Compliance Score
- Risk Score
- High Risk Users
- Total Violations
- Department Risk Trends

### 🔐 Governance Recommendations
Provides actionable recommendations:

- Remove inactive accounts
- Apply least privilege principles
- Review privileged access
- Schedule certification reviews
- Improve compliance posture

### 📄 Executive Reporting
Generate audit-ready governance insights.

---

## 🏗️ System Architecture

```text
Frontend (Next.js + React)
            │
            ▼
      REST API Calls
            │
            ▼
Backend (FastAPI)
            │
            ▼
Policy Analysis Engine
            │
            ▼
Risk Assessment & Compliance Reports
