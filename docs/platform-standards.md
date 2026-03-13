# Platform Standards

## Contract Standards
- Use strict TypeScript contracts for envelope, lineage, governance, service catalog, embeddings, and problem details.
- Envelope contract is CloudEvents-compatible with ASI extension metadata from day one.
- Prefer additive evolution to avoid breaking consumers.

## Tracing Standards
- `traceparent` is mandatory for all inter-service events.
- Preserve `tracestate` when provided.
- Log envelope ID + trace ID in every policy and execution step.

## Error Standards
- HTTP and workflow errors must use RFC 7807 Problem Details.
- Include typed extension fields for `envelope_id`, `policy_check_id`, and `replay_id` when available.

## Policy Standards
- Every mutable business action must have a `policy_scope`.
- Enforcement occurs before execution and is recorded as immutable policy check artifacts.
- Exceptions must be explicit and auditable (who, why, when, expiry).

## Replay and Lineage Standards
- Use hash-linked lineage for all control-impacting events.
- Support at-least-once delivery and idempotent processing through dedupe keys.
- Maintain replay references for forensic and compliance workflows.
