import pandas as pd

def analyze_access(df):
    violations = []

    for _, row in df.iterrows():
        permissions = str(row["Permissions"])

        if row["Employment_Status"] == "Terminated" and permissions:
            violations.append({
                "employee": row["Employee_Name"],
                "risk": "High",
                "violation": "Terminated employee still has access"
            })

        if row["Role"] == "Contractor" and "prod_db_read" in permissions:
            violations.append({
                "employee": row["Employee_Name"],
                "risk": "High",
                "violation": "Contractor has production DB access"
            })

    total = len(df)
    high_risk = len([v for v in violations if v["risk"] == "High"])

    compliance = max(0, 100 - (len(violations) * 5))

    return {
        "summary": {
            "total_employees": total,
            "violations": len(violations),
            "high_risk": high_risk,
            "compliance_score": compliance
        },
        "violations": violations
    }