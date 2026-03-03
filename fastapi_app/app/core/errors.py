from __future__ import annotations

from typing import Any
from uuid import uuid4

from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from starlette.exceptions import HTTPException as StarletteHTTPException


class ProblemDetails(BaseModel):
    type: str = "about:blank"
    title: str
    status: int
    detail: str
    request_id: str = Field(default_factory=lambda: str(uuid4()))
    errors: list[dict[str, Any]] = Field(default_factory=list)


def _build_problem(status_code: int, detail: str, title: str, request_id: str) -> dict[str, Any]:
    return ProblemDetails(
        title=title,
        status=status_code,
        detail=detail,
        request_id=request_id,
    ).model_dump()


async def http_exception_handler(request: Request, exc: HTTPException) -> JSONResponse:
    request_id = request.headers.get("x-request-id", str(uuid4()))
    title = "Unauthorized" if exc.status_code == 401 else "Forbidden" if exc.status_code == 403 else "Error"
    detail = str(exc.detail) if exc.detail else "Request failed"
    payload = _build_problem(exc.status_code, detail, title, request_id)
    return JSONResponse(status_code=exc.status_code, content=payload, media_type="application/problem+json")


async def starlette_http_exception_handler(request: Request, exc: StarletteHTTPException) -> JSONResponse:
    request_id = request.headers.get("x-request-id", str(uuid4()))
    payload = _build_problem(exc.status_code, str(exc.detail), "Error", request_id)
    return JSONResponse(status_code=exc.status_code, content=payload, media_type="application/problem+json")


async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    request_id = request.headers.get("x-request-id", str(uuid4()))
    payload = _build_problem(500, "Internal server error", "Internal Server Error", request_id)
    return JSONResponse(status_code=500, content=payload, media_type="application/problem+json")


def install_exception_handlers(app: FastAPI) -> None:
    app.add_exception_handler(HTTPException, http_exception_handler)
    app.add_exception_handler(StarletteHTTPException, starlette_http_exception_handler)
    app.add_exception_handler(Exception, unhandled_exception_handler)
