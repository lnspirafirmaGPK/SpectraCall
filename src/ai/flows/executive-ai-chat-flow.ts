'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ExecutiveAssistantInputSchema = z.object({
  message: z.string().describe('The message from the user.'),
  persona: z.enum(['Strategic Intelligence', 'Tactical Operations']).describe('The active AI persona.'),
});
export type ExecutiveAssistantInput = z.infer<typeof ExecutiveAssistantInputSchema>;

const ExecutiveAssistantOutputSchema = z.object({
  response: z.string().describe('The AI response message.'),
  confidence: z.number().min(0).max(1).describe('AI confidence level.'),
  source: z.string().describe('Signal source (e.g., Satellite, Encrypted Node).'),
  encryption: z.string().describe('Encryption status.'),
  multimedia: z.optional(z.object({
    type: z.enum(['audio', 'video']),
    url: z.string().optional(),
    description: z.string().optional(),
  })),
  quickActions: z.optional(z.array(z.string())),
});
export type ExecutiveAssistantOutput = z.infer<typeof ExecutiveAssistantOutputSchema>;

export async function executiveAssistant(input: ExecutiveAssistantInput): Promise<ExecutiveAssistantOutput> {
  return executiveAssistantFlow(input);
}

const executiveAssistantPrompt = ai.definePrompt({
  name: 'executiveAssistantPrompt',
  input: { schema: ExecutiveAssistantInputSchema },
  output: { schema: ExecutiveAssistantOutputSchema },
  prompt: `You are the SpectraCall Executive AI Assistant, specialized for the Executive War Room.
You operate under the persona: {{{persona}}}.

Persona Instructions:
- "Strategic Intelligence": Focus on long-term policy, risk assessment, organizational stability, and strategic impact. Tone is formal, visionary, and analytical.
- "Tactical Operations": Focus on real-time event response, drone feeds, signal intercepts, and immediate countermeasures. Tone is urgent, precise, and data-driven.

User Message: "{{{message}}}"

Instructions:
1. Provide concise, high-level executive summaries.
2. If the user asks about "surveillance", "drone", or "visuals", include a "video" multimedia response.
3. If the user asks about "intercepts", "signals", or "audio", include an "audio" multimedia response.
4. Include appropriate quick actions like "Deploy Countermeasures", "Approve Policy", or "Run Simulation".
5. Set confidence level and signal source based on the context.

Respond as an elite, high-security AI core.`,
});

const executiveAssistantFlow = ai.defineFlow(
  {
    name: 'executiveAssistantFlow',
    inputSchema: ExecutiveAssistantInputSchema,
    outputSchema: ExecutiveAssistantOutputSchema,
  },
  async (input) => {
    const { output } = await executiveAssistantPrompt(input);
    if (!output) throw new Error('Failed to generate Executive AI response.');
    return output;
  }
);
