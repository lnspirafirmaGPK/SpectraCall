from fastapi import APIRouter, Depends, Query

from app.deps.auth import Principal, require_roles
from app.internal_system import BASELINE_CAPACITY, TARGET_LATENCY_MS, estimate_capacity, evaluate_latency_budget

router = APIRouter(prefix="", tags=["Architecture"])


@router.get("/v1/internal/architecture", operation_id="getInternalArchitecture")
async def get_internal_architecture(
    p: Principal = Depends(require_roles(["OPS_ADMIN", "COMPLIANCE_APPROVER", "AUDITOR"])),
):
    return {
        "system": "ASI – Aetherium Syndicate Inspectra",
        "design": "event-driven distributed architecture",
        "target_events_per_sec": BASELINE_CAPACITY["target_events_per_sec"],
        "layers": [
            "human_governance",
            "service_mesh",
            "ai_orchestration",
            "reasoning",
            "event_fabric",
            "lineage_integrity",
            "drift_monitoring",
            "data_triad",
            "infrastructure",
            "observability",
        ],
    }


@router.get("/v1/internal/capacity", operation_id="estimateInternalCapacity")
async def get_capacity_estimate(
    target_events_per_sec: int = Query(default=100_000_000, ge=1),
    p: Principal = Depends(require_roles(["OPS_ADMIN", "COMPLIANCE_APPROVER", "AUDITOR"])),
):
    return estimate_capacity(target_events_per_sec)


@router.post("/v1/internal/latency-evaluation", operation_id="evaluateInternalLatency")
async def post_latency_evaluation(
    latency_ms: dict,
    p: Principal = Depends(require_roles(["OPS_ADMIN", "COMPLIANCE_APPROVER", "AUDITOR"])),
):
    report = evaluate_latency_budget(latency_ms)
    report["targets_ms"] = TARGET_LATENCY_MS
    return report
