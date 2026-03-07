from fastapi import APIRouter, Depends
from app.deps.auth import Principal, require_roles
router = APIRouter(prefix="", tags=["Approvals"])
@router.get("/v1/approvals", operation_id="listApprovals")
async def list_approvals(p: Principal = Depends(require_roles(["COMPLIANCE_APPROVER","AUDITOR","OPS_ADMIN"]))): return {"items": [], "next_cursor": None}
@router.get("/v1/approvals/{approval_id}", operation_id="getApproval")
async def get_approval(approval_id: str, p: Principal = Depends(require_roles(["COMPLIANCE_APPROVER","AUDITOR","OPS_ADMIN"]))): return {"approval_id": approval_id}
@router.post("/v1/approvals/{approval_id}/decisions", operation_id="createApprovalDecision", status_code=201)
async def create_approval_decision(approval_id: str, p: Principal = Depends(require_roles(["COMPLIANCE_APPROVER"]))): return {"approval_id": approval_id, "status": "APPROVED", "next": {"action": "FINALIZE_GEM", "by": "gems-service"}}
