from fastapi import APIRouter, Depends
from app.deps.auth import Principal, require_roles
router = APIRouter(prefix="", tags=["Freeze"])
@router.post("/v1/freeze-actions", operation_id="createFreezeAction", status_code=201)
async def create_freeze_action(body: dict, p: Principal = Depends(require_roles(["OPS_ADMIN"]))): return {"freeze_id": "FRZ-STUB", "status": "APPLIED", **body}
