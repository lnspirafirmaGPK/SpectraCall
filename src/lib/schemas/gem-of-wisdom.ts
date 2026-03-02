import { z } from "zod";

const HumanAlignmentSchema = z.enum([
  "Principle A: Non-Harm",
  "Principle B: Efficiency",
  "Principle C: Truthfulness",
]);

export const GemOfWisdomSchema = z.object({
  gem_id: z.string().regex(/^GEM-[A-Z0-9]{4}-[A-Z0-9]{8}$/),
  metadata: z.object({
    version: z.string().regex(/^v[0-9]+\.[0-9]+\.[0-9]+$/),
    status: z.enum([
      "draft",
      "compliance_review",
      "approved",
      "active",
      "archived",
      "rolled_back",
    ]),
    created_at: z.string().datetime(),
    author_agent: z.string(),
  }),
  context_origin: z.object({
    incident_id: z.string(),
    root_cause_category: z.enum([
      "prompt_flaw",
      "tool_misuse",
      "schema_drift",
      "policy_ambiguity",
      "logic_fallacy",
      "resonance_divergence",
    ]),
    description: z.string().max(1000),
  }),
  crystallization_ritual: z.object({
    mode: z.enum(["Prophetic", "Philosophical", "Poetic", "Strict_Logic"]),
    emotional_tone: z.string(),
    reflection_focus: z.string(),
    human_alignment: z.array(HumanAlignmentSchema),
  }),
  patch_payload: z.object({
    patch_type: z.enum([
      "contract_patch",
      "schema_rule",
      "tool_restriction",
      "system_prompt_modifier",
    ]),
    rollout_scope: z.enum(["agent_only", "department", "org_wide"]),
    rules: z.record(z.unknown()),
  }),
  verification_metrics: z.object({
    target_resonance_improvement: z.number().min(0).max(100),
    acceptable_repeat_rate: z.number().min(0).max(1),
    rollback_threshold: z.number().optional(),
  }),
});

export type GemOfWisdom = z.infer<typeof GemOfWisdomSchema>;

export const gemDraftExample: GemOfWisdom = GemOfWisdomSchema.parse({
  gem_id: "GEM-DEPT-1234ABCD",
  metadata: {
    version: "v1.0.0",
    status: "compliance_review",
    created_at: "2026-03-02T10:42:00Z",
    author_agent: "AgioSage",
  },
  context_origin: {
    incident_id: "TRACE-4092-ALPHA",
    root_cause_category: "schema_drift",
    description: "Governance weighting drift caused recurring policy contradiction in Sector 7.",
  },
  crystallization_ritual: {
    mode: "Strict_Logic",
    emotional_tone: "Calm urgency",
    reflection_focus: "Stability through explicit policy constraints",
    human_alignment: ["Principle A: Non-Harm", "Principle C: Truthfulness"],
  },
  patch_payload: {
    patch_type: "schema_rule",
    rollout_scope: "department",
    rules: {
      contract: "gem-of-wisdom.v1",
      enforce_required_fields: true,
    },
  },
  verification_metrics: {
    target_resonance_improvement: 18,
    acceptable_repeat_rate: 0.01,
    rollback_threshold: 0.35,
  },
});
