from fastapi import APIRouter, Depends
from app.deps.auth import Principal, require_roles
router = APIRouter(prefix="", tags=["Replay"])
@router.get("/v1/replay/decisions/{decision_id}", operation_id="getReplayByDecision")
async def get_replay_by_decision(decision_id: str, p: Principal = Depends(require_roles(["OPS_ADMIN","COMPLIANCE_APPROVER","AUDITOR"]))): return {"decision_id": decision_id, "trace_id": "TRC-STUB", "coverage": "COMPLETE", "steps": [], "links": {}}
@router.get("/v1/replay/traces/{trace_id}", operation_id="getTrace")
async def get_trace(trace_id: str, p: Principal = Depends(require_roles(["OPS_ADMIN","COMPLIANCE_APPROVER","AUDITOR"]))): return {"trace_id": trace_id}
@router.post("/v1/replay/views", operation_id="createReplayView", status_code=201)
async def create_replay_view(p: Principal = Depends(require_roles(["OPS_ADMIN","COMPLIANCE_APPROVER","AUDITOR"]))): return {"ok": True, "audit_id": "AUD-REPLAY-STUB"}
@router.post("/v1/replay/traces/{trace_id}/annotations", operation_id="createTraceAnnotation", status_code=201)
async def create_trace_annotation(trace_id: str, body: dict, p: Principal = Depends(require_roles(["COMPLIANCE_APPROVER","AUDITOR"]))): return {"annotation_id": "ANN-STUB", "trace_id": trace_id, **body}
@router.get("/v1/replay/traces/{trace_id}/export", operation_id="exportTrace")
async def export_trace(trace_id: str, format: str, p: Principal = Depends(require_roles(["OPS_ADMIN","COMPLIANCE_APPROVER","AUDITOR"]))): return {"trace_id": trace_id, "format": format}
