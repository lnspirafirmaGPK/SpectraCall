# Budget Reallocation: Minimum Viable ASI Slice

Budget Reallocation is the first end-to-end slice because it naturally exercises policy, approval, lineage, replay, and audit.

## Flow
1. **Propose (Data Plane)**: worker publishes `asi.budget.reallocation.proposed` envelope.
2. **Evaluate (Governance Plane)**: policy engine returns pass/fail + obligations.
3. **Approve (Control Plane)**: Mission Control captures human decision and rationale.
4. **Execute (Data Plane)**: approved action is applied and result event emitted.
5. **Verify/Audit (Trust + Observability)**: lineage chain, replay pointer, and audit trail finalized.

## Guaranteed Artifacts Per Run
- Envelope chain (`proposed` -> `policy` -> `approved/rejected` -> `executed`).
- Trace continuity across all steps.
- Policy evaluation record with rule hits and risk score.
- Replay token or reference for deterministic reconstruction.
- RFC7807 problem details for any failure stage.

## Non-Goals
- No model serving from UI.
- No direct embedding generation in browser.
- No bypass of policy scope for execution.
