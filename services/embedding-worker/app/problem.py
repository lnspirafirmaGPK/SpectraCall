from __future__ import annotations

from typing import Any

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse


class ProblemException(Exception):
    def __init__(
        self,
        *,
        title: str,
        detail: str,
        status: int,
        type_: str = 'about:blank',
        instance: str | None = None,
        extra: dict[str, Any] | None = None,
    ) -> None:
        super().__init__(detail)
        self.title = title
        self.detail = detail
        self.status = status
        self.type_ = type_
        self.instance = instance
        self.extra = extra or {}


def problem_response(*, title: str, detail: str, status: int, type_: str = 'about:blank', instance: str | None = None, extra: dict[str, Any] | None = None) -> JSONResponse:
    body: dict[str, Any] = {
        'type': type_,
        'title': title,
        'status': status,
        'detail': detail,
    }
    if instance:
        body['instance'] = instance
    if extra:
        body.update(extra)
    return JSONResponse(status_code=status, content=body, media_type='application/problem+json')


def register_problem_handlers(app: FastAPI) -> None:
    @app.exception_handler(ProblemException)
    async def _problem_exception_handler(_: Request, exc: ProblemException) -> JSONResponse:
        return problem_response(
            title=exc.title,
            detail=exc.detail,
            status=exc.status,
            type_=exc.type_,
            instance=exc.instance,
            extra=exc.extra,
        )

    @app.exception_handler(RequestValidationError)
    async def _validation_handler(_: Request, exc: RequestValidationError) -> JSONResponse:
        return problem_response(
            title='Invalid Request',
            detail='Request body validation failed',
            status=400,
            type_='https://spectracall.dev/problems/invalid-request',
            extra={'errors': exc.errors()},
        )
