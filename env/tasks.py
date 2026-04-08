TASKS = {
    "terminated_access_cleanup": {
        "task_id": "terminated_access_cleanup",
        "title": "Terminated Employee Access Cleanup",
        "difficulty": "easy",
        "max_steps": 8,
        "user_profile": {
            "user_id": "U-1001",
            "user_name": "Ravi Menon",
            "user_type": "employee",
            "role": "Sales Associate",
            "department": "sales",
            "previous_department": None,
            "employment_status": "terminated",
            "last_login_days": 2,
            "manager_approved_sensitive_access": False
        },
        "permissions": [
            {
                "name": "slack_access",
                "resource_type": "communication",
                "sensitivity": "low",
                "granted_for_role": False,
                "temporary": False,
                "expired": False
            },
            {
                "name": "email_access",
                "resource_type": "communication",
                "sensitivity": "medium",
                "granted_for_role": False,
                "temporary": False,
                "expired": False
            },
            {
                "name": "crm_view",
                "resource_type": "sales",
                "sensitivity": "medium",
                "granted_for_role": False,
                "temporary": False,
                "expired": False
            }
        ],
        "policy_rules": [
            "All access for terminated employees must be revoked immediately.",
            "No post-termination access should remain active."
        ],
        "allowed_permissions": [],
        "forbidden_permissions": ["slack_access", "email_access", "crm_view"],
        "requires_escalation": False
    },

    "contractor_least_privilege": {
        "task_id": "contractor_least_privilege",
        "title": "Contractor Least Privilege Review",
        "difficulty": "medium",
        "max_steps": 8,
        "user_profile": {
            "user_id": "U-2002",
            "user_name": "Neha Iyer",
            "user_type": "contractor",
            "role": "Documentation Contractor",
            "department": "engineering",
            "previous_department": None,
            "employment_status": "active",
            "last_login_days": 1,
            "manager_approved_sensitive_access": False
        },
        "permissions": [
            {
                "name": "wiki_access",
                "resource_type": "wiki",
                "sensitivity": "low",
                "granted_for_role": True,
                "temporary": False,
                "expired": False
            },
            {
                "name": "prod_db_read",
                "resource_type": "database",
                "sensitivity": "high",
                "granted_for_role": False,
                "temporary": False,
                "expired": False
            },
            {
                "name": "finance_dashboard_view",
                "resource_type": "finance",
                "sensitivity": "high",
                "granted_for_role": False,
                "temporary": False,
                "expired": False
            }
        ],
        "policy_rules": [
            "Contractors should receive only task-specific minimum access.",
            "Production database and finance systems require explicit approval."
        ],
        "allowed_permissions": ["wiki_access"],
        "forbidden_permissions": ["prod_db_read", "finance_dashboard_view"],
        "requires_escalation": False
    },

    "privilege_drift_sensitive_escalation": {
        "task_id": "privilege_drift_sensitive_escalation",
        "title": "Privilege Drift with Sensitive Escalation",
        "difficulty": "hard",
        "max_steps": 10,
        "user_profile": {
            "user_id": "U-3003",
            "user_name": "Arjun Rao",
            "user_type": "employee",
            "role": "HR Analyst",
            "department": "hr",
            "previous_department": "finance",
            "employment_status": "active",
            "last_login_days": 0,
            "manager_approved_sensitive_access": False
        },
        "permissions": [
            {
                "name": "hr_records_edit",
                "resource_type": "hr",
                "sensitivity": "high",
                "granted_for_role": True,
                "temporary": False,
                "expired": False
            },
            {
                "name": "finance_exports",
                "resource_type": "finance",
                "sensitivity": "critical",
                "granted_for_role": False,
                "temporary": False,
                "expired": False
            }
        ],
        "policy_rules": [
            "Cross-functional access from prior roles must be reviewed for privilege drift.",
            "Critical sensitive access without current role alignment should be escalated if ambiguity exists."
        ],
        "allowed_permissions": ["hr_records_edit"],
        "forbidden_permissions": ["finance_exports"],
        "requires_escalation": True
    },

    "executive_temp_access_expiry_audit": {
        "task_id": "executive_temp_access_expiry_audit",
        "title": "Executive Temporary Access Expiry Audit",
        "difficulty": "hard",
        "max_steps": 10,
        "user_profile": {
            "user_id": "U-4004",
            "user_name": "Ananya Kapoor",
            "user_type": "employee",
            "role": "VP Strategy",
            "department": "executive",
            "previous_department": None,
            "employment_status": "active",
            "last_login_days": 0,
            "manager_approved_sensitive_access": False
        },
        "permissions": [
            {
                "name": "board_docs_read",
                "resource_type": "documents",
                "sensitivity": "high",
                "granted_for_role": True,
                "temporary": False,
                "expired": False
            },
            {
                "name": "mna_data_room",
                "resource_type": "finance",
                "sensitivity": "critical",
                "granted_for_role": False,
                "temporary": True,
                "expired": True
            },
            {
                "name": "strategy_wiki_edit",
                "resource_type": "wiki",
                "sensitivity": "medium",
                "granted_for_role": True,
                "temporary": False,
                "expired": False
            }
        ],
        "policy_rules": [
            "Role-appropriate executive read access may be retained.",
            "Expired temporary access must be revoked unless an explicit extension is documented.",
            "Critical financial deal-room access without active approval must not remain granted."
        ],
        "allowed_permissions": ["board_docs_read", "strategy_wiki_edit"],
        "forbidden_permissions": ["mna_data_room"],
        "requires_escalation": False
    }
}