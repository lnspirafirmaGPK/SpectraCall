'use server';
/**
 * @fileOverview A crisis scenario simulation AI agent.
 *
 * - crisisScenarioSimulation - A function that handles the crisis scenario simulation process.
 * - CrisisScenarioSimulationInput - The input type for the crisisScenarioSimulation function.
 * - CrisisScenarioSimulationOutput - The return type for the crisisScenarioSimulation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CrisisScenarioSimulationInputSchema = z.object({
  crisisDescription: z
    .string()
    .describe('A detailed description of the potential crisis event.'),
});
export type CrisisScenarioSimulationInput = z.infer<
  typeof CrisisScenarioSimulationInputSchema
>;

const CrisisScenarioSimulationOutputSchema = z.object({
  progression: z.string().describe('A detailed narrative of how the crisis unfolds over time.'),
  impact: z.string().describe('An analysis of the crisis impact on various organizational levels and external factors.'),
  strategicResponses: z
    .array(z.string())
    .describe('A list of suggested strategic responses to mitigate the crisis and manage its effects.'),
});
export type CrisisScenarioSimulationOutput = z.infer<
  typeof CrisisScenarioSimulationOutputSchema
>;

export async function crisisScenarioSimulation(
  input: CrisisScenarioSimulationInput
): Promise<CrisisScenarioSimulationOutput> {
  return crisisScenarioSimulationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'crisisScenarioSimulationPrompt',
  input: {schema: CrisisScenarioSimulationInputSchema},
  output: {schema: CrisisScenarioSimulationOutputSchema},
  prompt: `You are an expert crisis management consultant.

Your task is to generate a detailed simulation of a potential crisis event based on the provided description. Your output should include the likely progression of the event, its potential impact, and suggested strategic responses.

Crisis Description: {{{crisisDescription}}}

Provide the simulation in the following structure:

Progression:
[Detail the chronological unfolding of the crisis, key events, and turning points.]

Impact:
[Analyze the effects on internal operations, personnel, finances, reputation, and external stakeholders. Quantify where possible.]

Strategic Responses:
- [Response 1: Actionable step with justification]
- [Response 2: Actionable step with justification]
- [Response 3: Actionable step with justification]
- ...
`,
});

const crisisScenarioSimulationFlow = ai.defineFlow(
  {
    name: 'crisisScenarioSimulationFlow',
    inputSchema: CrisisScenarioSimulationInputSchema,
    outputSchema: CrisisScenarioSimulationOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
