from __future__ import annotations

import logging
from datetime import UTC, datetime
from enum import Enum
from typing import Any
from uuid import uuid4

from fastapi import APIRouter, Depends, Header, HTTPException, Query, status
from pydantic import BaseModel, ConfigDict, Field

from app.deps.auth import Principal, require_roles

router = APIRouter(prefix="", tags=["Replay"])
logger = logging.getLogger(__name__)


class TraceCoverage(str, Enum):
    COMPLETE = "COMPLETE"
    INCOMPLETE = "INCOMPLETE"


class TraceStepType(str, Enum):
    CONTEXT = "CONTEXT"
    OPTIONS = "OPTIONS"
    SCORING = "SCORING"
    ACTION = "ACTION"
    CONTRACTS = "CONTRACTS"
    OUTCOME = "OUTCOME"


class ReplayStepPresence(BaseModel):
    model_config = ConfigDict(extra="forbid", strict=True)

    step: TraceStepType
    present: bool


class TraceStep(BaseModel):
    model_config = ConfigDict(extra="forbid", strict=True)

    step: TraceStepType
    content: dict[str, Any]


class Trace(BaseModel):
    model_config = ConfigDict(extra="forbid", strict=True)

    trace_id: str
    decision_id: str
    dept_id: str | None = None
    agent_id: str | None = None
    coverage: TraceCoverage
    steps: list[TraceStep]
    created_at: datetime


class ReplayDecisionResponse(BaseModel):
    model_config = ConfigDict(extra="forbid", strict=True)

    decision_id: str
    trace_id: str
    coverage: TraceCoverage
    steps: list[ReplayStepPresence]
    links: dict[str, str]


class ReplayViewCreateRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    decision_id: str = Field(min_length=1)
    trace_id: str = Field(min_length=1)


class TraceAnnotationCreateRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    step: TraceStepType
    note: str = Field(min_length=1)
    tags: list[str] = Field(default_factory=list)


class TraceAnnotationResponse(BaseModel):
    model_config = ConfigDict(extra="forbid", strict=True)

    annotation_id: str
    trace_id: str
    step: TraceStepType
    note: str
    tags: list[str]
    created_at: datetime


class ReplayStore:
    def __init__(self) -> None:
        seed_trace = Trace(
            trace_id="TRC-STUB",
            decision_id="DEC-STUB",
            dept_id="OPS",
            agent_id="agent-risk-01",
            coverage=TraceCoverage.COMPLETE,
            steps=[
                TraceStep(step=TraceStepType.CONTEXT, content={"incident_id": "INC-1001"}),
                TraceStep(step=TraceStepType.OPTIONS, content={"count": 3}),
                TraceStep(step=TraceStepType.OUTCOME, content={"selected": "rollback"}),
            ],
            created_at=datetime.now(UTC),
        )
        self._traces_by_id: dict[str, Trace] = {seed_trace.trace_id: seed_trace}
        self._trace_ids_by_decision: dict[str, str] = {seed_trace.decision_id: seed_trace.trace_id}
        self._idempotent_annotations: dict[tuple[str, str], TraceAnnotationResponse] = {}

    def get_replay_by_decision(self, decision_id: str) -> ReplayDecisionResponse:
        trace_id = self._trace_ids_by_decision.get(decision_id)
        if trace_id is None:
            raise KeyError("decision")

        trace = self._traces_by_id[trace_id]
        present_steps = {step.step for step in trace.steps}
        step_presence = [
            ReplayStepPresence(step=step_type, present=step_type in present_steps) for step_type in TraceStepType
        ]

        return ReplayDecisionResponse(
            decision_id=decision_id,
            trace_id=trace.trace_id,
            coverage=trace.coverage,
            steps=step_presence,
            links={
                "export_pdf": f"/v1/replay/traces/{trace.trace_id}/export?format=pdf",
                "export_json": f"/v1/replay/traces/{trace.trace_id}/export?format=json",
            },
        )

    def get_trace(self, trace_id: str) -> Trace:
        trace = self._traces_by_id.get(trace_id)
        if trace is None:
            raise KeyError("trace")
        return trace

    def create_view(self, payload: ReplayViewCreateRequest) -> str:
        trace = self._traces_by_id.get(payload.trace_id)
        if trace is None:
            raise KeyError("trace")
        if trace.decision_id != payload.decision_id:
            raise ValueError("decision_trace_mismatch")
        return f"AUD-{uuid4().hex[:10].upper()}"

    def create_annotation(
        self,
        trace_id: str,
        payload: TraceAnnotationCreateRequest,
        idempotency_key: str | None,
    ) -> TraceAnnotationResponse:
        if trace_id not in self._traces_by_id:
            raise KeyError("trace")

        if idempotency_key:
            cache_key = (trace_id, idempotency_key)
            cached = self._idempotent_annotations.get(cache_key)
            if cached is not None:
                return cached

        annotation = TraceAnnotationResponse(
            annotation_id=f"ANN-{uuid4().hex[:10].upper()}",
            trace_id=trace_id,
            step=payload.step,
            note=payload.note,
            tags=payload.tags,
            created_at=datetime.now(UTC),
        )

        if idempotency_key:
            self._idempotent_annotations[(trace_id, idempotency_key)] = annotation
        return annotation


store = ReplayStore()


@router.get("/v1/replay/decisions/{decision_id}", operation_id="getReplayByDecision")
async def get_replay_by_decision(
    decision_id: str,
    p: Principal = Depends(require_roles(["OPS_ADMIN", "COMPLIANCE_APPROVER", "AUDITOR"])),
):
    try:
        return store.get_replay_by_decision(decision_id).model_dump(mode="json")
    except KeyError as exc:
        logger.info("replay.decision_not_found", extra={"decision_id": decision_id, "principal": p.sub})
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Replay decision not found") from exc


@router.get("/v1/replay/traces/{trace_id}", operation_id="getTrace")
async def get_trace(
    trace_id: str,
    p: Principal = Depends(require_roles(["OPS_ADMIN", "COMPLIANCE_APPROVER", "AUDITOR"])),
):
    try:
        return store.get_trace(trace_id).model_dump(mode="json")
    except KeyError as exc:
        logger.info("replay.trace_not_found", extra={"trace_id": trace_id, "principal": p.sub})
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trace not found") from exc


@router.post("/v1/replay/views", operation_id="createReplayView", status_code=201)
async def create_replay_view(
    body: ReplayViewCreateRequest,
    p: Principal = Depends(require_roles(["OPS_ADMIN", "COMPLIANCE_APPROVER", "AUDITOR"])),
):
    try:
        audit_id = store.create_view(body)
    except KeyError as exc:
        logger.info(
            "replay.view_trace_not_found",
            extra={"trace_id": body.trace_id, "decision_id": body.decision_id, "principal": p.sub},
        )
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trace not found") from exc
    except ValueError as exc:
        logger.warning(
            "replay.view_decision_trace_mismatch",
            extra={"trace_id": body.trace_id, "decision_id": body.decision_id, "principal": p.sub},
        )
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Decision and trace mismatch") from exc

    return {"ok": True, "audit_id": audit_id}


@router.post("/v1/replay/traces/{trace_id}/annotations", operation_id="createTraceAnnotation", status_code=201)
async def create_trace_annotation(
    trace_id: str,
    body: TraceAnnotationCreateRequest,
    idempotency_key: str | None = Header(default=None, alias="Idempotency-Key"),
    p: Principal = Depends(require_roles(["COMPLIANCE_APPROVER", "AUDITOR"])),
):
    try:
        annotation = store.create_annotation(trace_id, body, idempotency_key)
    except KeyError as exc:
        logger.info(
            "replay.annotation_trace_not_found",
            extra={"trace_id": trace_id, "idempotency_key": idempotency_key, "principal": p.sub},
        )
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trace not found") from exc

    return annotation.model_dump(mode="json")


@router.get("/v1/replay/traces/{trace_id}/export", operation_id="exportTrace")
async def export_trace(
    trace_id: str,
    format: str = Query(pattern="^(pdf|json)$"),
    p: Principal = Depends(require_roles(["OPS_ADMIN", "COMPLIANCE_APPROVER", "AUDITOR"])),
):
    try:
        trace = store.get_trace(trace_id)
    except KeyError as exc:
        logger.info("replay.export_trace_not_found", extra={"trace_id": trace_id, "principal": p.sub})
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trace not found") from exc

    logger.info("replay.export_requested", extra={"trace_id": trace_id, "format": format, "principal": p.sub})
    return {
        "trace_id": trace.trace_id,
        "decision_id": trace.decision_id,
        "format": format,
        "generated_at": datetime.now(UTC).isoformat(),
        "contract_versions": ["replay.v1"],
    }
