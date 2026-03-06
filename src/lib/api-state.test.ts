import { apiState } from "./api-state"
import { AsiEnvelope } from "./types/envelope"
import { DecisionArtifact } from "./types/asi"

describe("apiState", () => {
  beforeEach(() => {
    // Clear state before each test if possible, but since it's a global singleton
    // we might need to be careful. For now, let's just test addition and retrieval.
  })

  it("should add and retrieve envelopes", () => {
    const envelope: AsiEnvelope<any> = {
      specversion: "1.0",
      type: "test.event",
      source: "/test",
      id: "env-123",
      time: new Date().toISOString(),
      datacontenttype: "application/json",
      traceparent: "00-trace-123-01",
      asi: {
        agent_id: "agent-1",
        policy_scope: "global",
        classification: "public",
        lineage_hash: "hash-1",
        payload_hash: "payload-1",
        schema_ref: "schema-1",
        delivery: "at-least-once"
      },
      data: { foo: "bar" }
    }

    apiState.addEnvelope(envelope)
    expect(apiState.getEnvelope("env-123")).toEqual(envelope)
  })

  it("should add, retrieve and update decisions", () => {
    const decision: DecisionArtifact = {
      id: "dec-123",
      envelope_id: "env-123",
      status: "proposed",
      lineage_record: {
        id: "lin-123",
        hash: "hash-1",
        agent_id: "agent-1",
        timestamp: new Date().toISOString(),
        proof_availability: true,
        payload_hash: "payload-1"
      }
    }

    apiState.addDecision(decision)
    expect(apiState.getDecision("dec-123")).toEqual(decision)

    apiState.updateDecision("dec-123", { status: "evaluated" })
    expect(apiState.getDecision("dec-123")?.status).toBe("evaluated")
  })
})
