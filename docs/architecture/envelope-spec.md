# ASI Canonical Envelope Specification

The ASI Protocol uses a CloudEvents-compatible envelope for all inter-service communication. This document defines the structure and usage of the ASI Envelope.

## Format: CloudEvents 1.0 JSON

All messages must adhere to the [CloudEvents 1.0 JSON Specification](https://github.com/cloudevents/spec/blob/v1.0.1/json-format.md).

## Envelope Structure

```json
{
  "specversion": "1.0",
  "type": "string",
  "source": "string",
  "id": "string",
  "time": "string",
  "subject": "string",
  "datacontenttype": "application/json",
  "traceparent": "string",
  "tracestate": "string",
  "asi": {
    "agent_id": "string",
    "policy_scope": "string",
    "classification": "public | internal | restricted",
    "lineage_hash": "string",
    "parent_hash": "string",
    "payload_hash": "string",
    "signature": "string",
    "schema_ref": "string",
    "delivery": "at-least-once"
  },
  "data": { ... }
}
```

## Field Definitions

| Field | Type | Description |
| :--- | :--- | :--- |
| `specversion` | String | Must be "1.0". |
| `type` | String | The type of the event (e.g., `asi.decision.proposed`). |
| `source` | String | The originator of the event (e.g., `/agents/budget-agent-01`). |
| `id` | String | A unique ID for this specific event. |
| `time` | String | RFC 3339 timestamp of when the event occurred. |
| `subject` | String | (Optional) The identifier of the object the event is about. |
| `datacontenttype` | String | Must be "application/json". |
| `traceparent` | String | W3C Trace Context traceparent (e.g., `00-4bf92...-01`). |
| `tracestate` | String | (Optional) W3C Trace Context tracestate. |
| `asi.agent_id` | String | The unique identity of the agent generating the event. |
| `asi.policy_scope`| String | The governance scope under which this event was generated. |
| `asi.classification`| Enum | Data classification level (public, internal, restricted). |
| `asi.lineage_hash`| String | Hash of the input/state that led to this event. |
| `asi.parent_hash` | String | (Optional) The lineage hash of the parent event. |
| `asi.payload_hash`| String | SHA-256 hash of the `data` payload. |
| `asi.signature` | String | (Optional) Digital signature of the entire envelope. |
| `asi.schema_ref` | String | URI reference to the schema of the `data` payload. |
| `asi.delivery` | String | Delivery guarantee (e.g., `at-least-once`). |

## Implementation Notes
- The `traceparent` and `tracestate` fields are top-level extensions to allow easy extraction by middleware.
- The `asi` object contains all ASI-specific metadata required for trust and governance.
