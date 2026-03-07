from fastapi import APIRouter, Depends
from app.deps.auth import Principal, require_roles
router = APIRouter(prefix="", tags=["Gems"])
@router.post("/v1/gems/drafts", operation_id="createGemDraft", status_code=201)
async def create_gem_draft(body: dict, p: Principal = Depends(require_roles(["OPS_ADMIN"]))): return {"gem_draft_id": "GEMD-STUB", "status": "DRAFT", **body}
@router.patch("/v1/gems/drafts/{gem_draft_id}", operation_id="updateGemDraft")
async def update_gem_draft(gem_draft_id: str, body: dict, p: Principal = Depends(require_roles(["OPS_ADMIN"]))): return {"gem_draft_id": gem_draft_id, **body}
@router.post("/v1/gems/drafts/{gem_draft_id}/submit", operation_id="submitGemDraft", status_code=201)
async def submit_gem_draft(gem_draft_id: str, p: Principal = Depends(require_roles(["OPS_ADMIN"]))): return {"gem_draft_id": gem_draft_id, "approval_id": "APV-STUB", "status": "PENDING_REVIEW"}
@router.get("/v1/gems/inbox", operation_id="listGemInbox")
async def list_gem_inbox(p: Principal = Depends(require_roles(["COMPLIANCE_APPROVER","AUDITOR"]))): return {"items": [], "next_cursor": None}
@router.get("/v1/gems/{gem_id}", operation_id="getGem")
async def get_gem(gem_id: str, p: Principal = Depends(require_roles(["OPS_ADMIN","COMPLIANCE_APPROVER","AUDITOR"]))): return {"gem_id": gem_id}
