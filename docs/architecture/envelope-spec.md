# ASI Envelope Specification (CloudEvents-Compatible)

## Canonical Shape

```json
{
  "specversion": "1.0",
  "type": "asi.budget.reallocation.proposed",
  "source": "/planes/data/workers/budget-worker",
  "id": "evt_01j...",
  "time": "2026-01-01T00:00:00.000Z",
  "subject": "budget-request-501",
  "datacontenttype": "application/json",
  "traceparent": "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01",
  "tracestate": "vendor=sample",
  "asi": {
    "agent_id": "agent-budget-01",
    "policy_scope": "finance.budget.reallocation",
    "classification": "internal",
    "lineage_hash": "sha256:...",
    "parent_hash": "sha256:...",
    "payload_hash": "sha256:...",
    "signature": "base64:...",
    "schema_ref": "urn:schema:asi:budget-reallocation:v1",
    "delivery": "at-least-once"
  },
  "data": {}
}
```

## Required Fields
- `specversion`: always `"1.0"`
- `datacontenttype`: always `"application/json"`
- `asi.delivery`: always `"at-least-once"` in this phase
- `traceparent`: required for distributed trace correlation
- `asi.lineage_hash` and `asi.payload_hash`: required for chain-of-evidence

## Compatibility Rules
- Fields align with CloudEvents JSON format.
- Unknown extension attributes must be preserved by intermediaries.
- `data` payload schema is referenced by `asi.schema_ref` and validated per consumer policy.

## Error Contract
All API and validation failures must return RFC 7807 Problem Details, with optional extension fields for envelope ID, policy check IDs, and replay IDs.
