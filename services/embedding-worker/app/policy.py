from __future__ import annotations

from app.contracts import EmbedRequest
from app.problem import ProblemException


def run_policy_precheck(request: EmbedRequest) -> None:
    # Placeholder hook for Governance Plane integration.
    if not request.policy_scope.strip():
        raise ProblemException(
            title='Policy Scope Required',
            detail='policy_scope must be non-empty for policy precheck',
            status=400,
            type_='https://spectracall.dev/problems/policy-scope-required',
        )
