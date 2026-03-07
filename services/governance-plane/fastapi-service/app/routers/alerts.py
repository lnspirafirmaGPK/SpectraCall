from fastapi import APIRouter, Depends
from app.deps.auth import Principal, require_roles
router = APIRouter(prefix="", tags=["Alerts"])
@router.get("/v1/alerts", operation_id="listAlerts")
async def list_alerts(p: Principal = Depends(require_roles(["OPS_ADMIN","COMPLIANCE_APPROVER","AUDITOR"]))): return {"items": [], "next_cursor": None}
@router.get("/v1/alerts/{alert_id}", operation_id="getAlert")
async def get_alert(alert_id: str, p: Principal = Depends(require_roles(["OPS_ADMIN","COMPLIANCE_APPROVER","AUDITOR"]))): return {"alert_id": alert_id}
@router.patch("/v1/alerts/{alert_id}", operation_id="updateAlert")
async def update_alert(alert_id: str, body: dict, p: Principal = Depends(require_roles(["OPS_ADMIN","COMPLIANCE_APPROVER"]))): return {"alert_id": alert_id, **body}
@router.post("/v1/alerts/{alert_id}/views", operation_id="createAlertView", status_code=201)
async def create_alert_view(alert_id: str, p: Principal = Depends(require_roles(["OPS_ADMIN","COMPLIANCE_APPROVER","AUDITOR"]))): return {"ok": True, "audit_id": f"AUD-{alert_id}"}
