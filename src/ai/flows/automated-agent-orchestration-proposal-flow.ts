'use server';
/**
 * @fileOverview This file defines a Genkit flow for proposing AI agent orchestration plans.
 *
 * - automatedAgentOrchestrationProposal - A function that generates an AI agent orchestration plan based on a high-level goal.
 * - AutomatedAgentOrchestrationProposalInput - The input type for the automatedAgentOrchestrationProposal function.
 * - AutomatedAgentOrchestrationProposalOutput - The return type for the automatedAgentOrchestrationProposal function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AutomatedAgentOrchestrationProposalInputSchema = z.object({
  highLevelGoal: z.string().describe('The high-level organizational goal for which to propose an AI agent orchestration plan.'),
});
export type AutomatedAgentOrchestrationProposalInput = z.infer<typeof AutomatedAgentOrchestrationProposalInputSchema>;

const AutomatedAgentOrchestrationProposalOutputSchema = z.object({
  orchestrationPlan: z.string().describe('A detailed, step-by-step plan for orchestrating AI agents to achieve the high-level goal.'),
  agentsRequired: z.array(z.string()).describe('A list of specific AI agents or types of agents required for this plan (e.g., "Data Processing Agent", "Customer Support Agent", "Anomaly Detection Agent").'),
  estimatedCompletionTime: z.string().describe('An estimate of the time required to achieve the goal using the proposed orchestration plan (e.g., "1 week", "3 days", "2 months").'),
});
export type AutomatedAgentOrchestrationProposalOutput = z.infer<typeof AutomatedAgentOrchestrationProposalOutputSchema>;

export async function automatedAgentOrchestrationProposal(input: AutomatedAgentOrchestrationProposalInput): Promise<AutomatedAgentOrchestrationProposalOutput> {
  return automatedAgentOrchestrationProposalFlow(input);
}

const proposeOrchestrationPrompt = ai.definePrompt({
  name: 'proposeOrchestrationPrompt',
  input: { schema: AutomatedAgentOrchestrationProposalInputSchema },
  output: { schema: AutomatedAgentOrchestrationProposalOutputSchema },
  prompt: `You are an expert AI agent orchestrator and system architect. Your task is to propose a detailed orchestration plan for AI agents to achieve a given high-level organizational goal.

Analyze the following high-level organizational goal and provide:
1.  A step-by-step orchestration plan.
2.  A list of specific AI agents or types of agents that would be required.
3.  An estimated completion time for achieving this goal with the proposed plan.

High-level organizational goal: "{{{highLevelGoal}}}"

Ensure your output strictly adheres to the provided JSON schema.`,
});

const automatedAgentOrchestrationProposalFlow = ai.defineFlow(
  {
    name: 'automatedAgentOrchestrationProposalFlow',
    inputSchema: AutomatedAgentOrchestrationProposalInputSchema,
    outputSchema: AutomatedAgentOrchestrationProposalOutputSchema,
  },
  async (input) => {
    const { output } = await proposeOrchestrationPrompt(input);
    return output!;
  }
);
