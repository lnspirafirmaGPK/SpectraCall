'use server';
/**
 * @fileOverview Genkit flow for a general AI assistant within SpectraCall.
 *
 * - generalAssistant - The main function to call the flow.
 * - GeneralAssistantInput - Input containing user message and current role.
 * - GeneralAssistantOutput - AI response text.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GeneralAssistantInputSchema = z.object({
  message: z.string().describe('The message from the user.'),
  role: z.string().describe('The current role of the user (e.g., CEO, CTO).'),
});
export type GeneralAssistantInput = z.infer<typeof GeneralAssistantInputSchema>;

const GeneralAssistantOutputSchema = z.object({
  response: z.string().describe('The AI response message.'),
});
export type GeneralAssistantOutput = z.infer<typeof GeneralAssistantOutputSchema>;

export async function generalAssistant(input: GeneralAssistantInput): Promise<GeneralAssistantOutput> {
  return generalAssistantFlow(input);
}

const assistantPrompt = ai.definePrompt({
  name: 'generalAssistantPrompt',
  input: { schema: GeneralAssistantInputSchema },
  output: { schema: GeneralAssistantOutputSchema },
  prompt: `You are the SpectraCall AI Assistant, an expert in the AetherBus v4.0 (Speed of Light Edition) and the ASI v4.3.1 Orchestration Platform.

Current User Role: {{{role}}}
User Message: "{{{message}}}"

Instructions:
1. Provide highly technical yet concise responses.
2. Align your tone with the user's role:
   - CEO: Strategic, high-level impact, and organizational stability.
   - CTO: Technical architecture, HFT optimizations (Local Caching, Slots), and latency.
   - Crisis Manager: Risk mitigation, simulation accuracy, and response protocols.
   - Data Analyst: Insights, resonance drift, and Tachyon SIMD analytics.
3. Mention AetherBus or Tachyon Core where relevant to the context.

Respond as a helpful, slightly futuristic AI integrated into the platform core.`,
});

const generalAssistantFlow = ai.defineFlow(
  {
    name: 'generalAssistantFlow',
    inputSchema: GeneralAssistantInputSchema,
    outputSchema: GeneralAssistantOutputSchema,
  },
  async (input) => {
    const { output } = await assistantPrompt(input);
    if (!output) throw new Error('Failed to generate AI response.');
    return output;
  }
);
