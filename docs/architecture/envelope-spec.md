# AetherBus Envelope Specification

The Envelope is the fundamental unit of communication in AetherBus. It wraps the raw payload with the necessary metadata for distributed execution and tracing.

## Structure

```json
{
  "flow_id": "uuid",
  "task_id": "uuid",
  "parent_id": "uuid | null",
  "agent_id": "string",
  "intent": "string",
  "payload": "object",
  "timestamp": "iso8601",
  "signature": "string",
  "context": {
    "priority": "low | medium | high",
    "ttl": "number",
    "trace_level": "none | basic | verbose"
  },
  "metadata": {
    "version": "1.0",
    "encoding": "json | protobuf"
  }
}
```

## Key Fields

| Field | Description |
| :--- | :--- |
| `flow_id` | Groups related tasks into a single logical workflow. |
| `task_id` | Unique identifier for a specific execution step. |
| `parent_id` | The ID of the task that triggered this message. |
| `agent_id` | The unique identity of the agent sending the message. |
| `intent` | The semantic action requested (e.g., `RESOLVE_TICKET`). |
| `signature` | Cryptographic proof of the agent's identity and message integrity. |

## Execution Life Cycle

1. **Emission:** Agent generates an intent and wraps it in an Envelope.
2. **Validation:** AetherBus verifies the signature and schema.
3. **Routing:** Execution Engine determines the next step based on the intent.
4. **Processing:** The task is executed (locally or via Tachyon).
5. **Completion:** Results are wrapped in a new Envelope and returned or forwarded.
