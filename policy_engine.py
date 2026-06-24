import pandas as pd

def normalize_columns(df):
    """Normalize column names to handle any CSV format"""
    df.columns = df.columns.str.strip().str.lower().str.replace(" ", "_")
    
    column_map = {
        # Employee name variations
        "employee_name": "Employee_Name",
        "employee": "Employee_Name",
        "name": "Employee_Name",
        "full_name": "Employee_Name",
        "user": "Employee_Name",
        "username": "Employee_Name",
        
        # Role variations
        "role": "Role",
        "job_role": "Role",
        "job_title": "Role",
        "title": "Role",
        "position": "Role",
        
        # Employment status variations
        "employment_status": "Employment_Status",
        "status": "Employment_Status",
        "emp_status": "Employment_Status",
        "employment": "Employment_Status",
        "active_status": "Employment_Status",
        
        # Permissions variations
        "permissions": "Permissions",
        "permission": "Permissions",
        "access": "Permissions",
        "access_level": "Permissions",
        "access_rights": "Permissions",
        "roles": "Permissions",
        
        # Department variations
        "department": "Department",
        "dept": "Department",
        "team": "Department",
        "division": "Department",
    }
    
    df = df.rename(columns=column_map)
    return df


def safe_get(row, col, default=""):
    """Safely get a column value"""
    try:
        val = row.get(col, default)
        return str(val).strip() if pd.notna(val) else default
    except:
        return default


def analyze_access(df):
    violations = []

    # Normalize columns
    df = normalize_columns(df)

    for _, row in df.iterrows():
        employee = safe_get(row, "Employee_Name", f"Employee_{_}")
        role = safe_get(row, "Role", "").lower()
        status = safe_get(row, "Employment_Status", "").lower()
        permissions = safe_get(row, "Permissions", "").lower()
        department = safe_get(row, "Department", "")

        # Rule 1: Terminated employee still has access
        if status in ["terminated", "inactive", "offboarded", "left", "resigned", "fired"]:
            if permissions and permissions not in ["none", "null", "", "n/a", "no access"]:
                violations.append({
                    "employee": employee,
                    "risk": "High",
                    "violation": "Terminated employee still has access"
                })

        # Rule 2: Contractor has production DB access
        if role in ["contractor", "vendor", "intern", "freelancer", "consultant"]:
            if any(x in permissions for x in [
                "prod_db", "production_db", "prod_db_read",
                "production", "database", "db_admin"
            ]):
                violations.append({
                    "employee": employee,
                    "risk": "High",
                    "violation": "Contractor has production DB access"
                })

        # Rule 3: Privileged access without proper role
        if any(x in permissions for x in [
            "admin", "root", "superuser", "sudo", "god_mode"
        ]):
            if role not in ["admin", "it_admin", "system_admin", "administrator", "manager"]:
                violations.append({
                    "employee": employee,
                    "risk": "High",
                    "violation": "Unauthorized privileged access detected"
                })

        # Rule 4: Finance access for non-finance roles
        if any(x in permissions for x in [
            "finance", "payroll", "salary", "billing", "accounting"
        ]):
            if "finance" not in role and "account" not in role and "cfo" not in role:
                violations.append({
                    "employee": employee,
                    "risk": "Medium",
                    "violation": "Non-finance employee has finance system access"
                })

        # Rule 5: HR data access for non-HR roles
        if any(x in permissions for x in [
            "hr_records", "hr_data", "employee_records", "personnel_data"
        ]):
            if "hr" not in role and "human_resource" not in role:
                violations.append({
                    "employee": employee,
                    "risk": "Medium",
                    "violation": "Non-HR employee has HR records access"
                })

    total = len(df)
    high_risk = len([v for v in violations if v["risk"] == "High"])
    medium_risk = len([v for v in violations if v["risk"] == "Medium"])

    compliance = max(0, 100 - (high_risk * 10) - (medium_risk * 5))

    return {
        "summary": {
            "total_employees": total,
            "violations": len(violations),
            "high_risk": high_risk,
            "medium_risk": medium_risk,
            "compliance_score": compliance
        },
        "violations": violations
    }