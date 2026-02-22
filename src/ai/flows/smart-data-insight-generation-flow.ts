'use server';
/**
 * @fileOverview A Genkit flow for generating prioritized insights from AetherBus processed data
 * using Tachyon Core analytics in response to natural language questions.
 *
 * - generateSmartDataInsight - The main function to call the flow.
 * - SmartDataInsightGenerationInput - The input type for the function.
 * - SmartDataInsightGenerationOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input schema for the user's natural language question
const SmartDataInsightGenerationInputSchema = z.object({
  userQuestion: z
    .string()
    .describe(
      'A natural language question about AetherBus processed data for which to generate insights.'
    ),
});
export type SmartDataInsightGenerationInput = z.infer<
  typeof SmartDataInsightGenerationInputSchema
>;

// Output schema for the prioritized insights
const SmartDataInsightGenerationOutputSchema = z.object({
  summary: z.string().describe('A high-level summary of the key insights.'),
  prioritizedInsights: z
    .array(
      z.object({
        insight: z.string().describe('The detailed insight.'),
        priority: z
          .enum(['High', 'Medium', 'Low'])
          .describe('The priority level of this insight.'),
        actionableRecommendation: z
          .string()
          .optional()
          .describe(
            'A recommendation for action based on this insight, if applicable.'
          ),
      })
    )
    .describe('A list of prioritized insights with optional recommendations.'),
  dataSourcesUsed: z
    .array(z.string())
    .optional()
    .describe('List of data sources referenced to generate these insights.'),
});
export type SmartDataInsightGenerationOutput = z.infer<
  typeof SmartDataInsightGenerationOutputSchema
>;

// Tool input schema for retrieving Tachyon Core analytics data
const GetTachyonAnalyticsDataInputSchema = z.object({
  query: z
    .string()
    .describe(
      'A specific query or keyword to retrieve relevant data from Tachyon Core analytics.'
    ),
});

// Tool output schema for Tachyon Core analytics data
const GetTachyonAnalyticsDataOutputSchema = z.object({
  data: z
    .string()
    .describe('Raw analytical data retrieved from Tachyon Core.'),
});

/**
 * Simulates retrieving analytical data from Tachyon Core. In a real application,
 * this would interface with a backend service or database.
 */
const getTachyonAnalyticsData = ai.defineTool(
  {
    name: 'getTachyonAnalyticsData',
    description:
      'Retrieves specific analytical data from Tachyon Core based on a given query.',
    inputSchema: GetTachyonAnalyticsDataInputSchema,
    outputSchema: GetTachyonAnalyticsDataOutputSchema,
  },
  async (input) => {
    // Simulate fetching data based on the query
    const lowerCaseQuery = input.query.toLowerCase();
    let simulatedData = '';

    if (lowerCaseQuery.includes('sales')) {
      simulatedData = 
        'Q1 sales increased by 15% year-over-year in region X, but declined by 5% in region Y. Top selling product: \'Product A\'. Overall revenue growth is slowing.';
    } else if (lowerCaseQuery.includes('customer churn')) {
      simulatedData = 
        'Customer churn rate increased by 2% last month, primarily in the SMB segment due to competitive pricing from \'Competitor Z\'. Retention strategies need immediate review.';
    } else if (lowerCaseQuery.includes('market share')) {
      simulatedData = 
        'Market share remained stable at 12% in the last quarter, with minor gains in new markets but slight losses in mature markets. Competitor \'Beta Corp\' launched an aggressive campaign.';
    } else if (lowerCaseQuery.includes('operational efficiency')) {
      simulatedData = 
        'Operational costs increased by 7% due to supply chain disruptions. Inventory turnover rate decreased, indicating potential overstocking in certain SKUs.';
    } else {
      simulatedData = 'No specific analytical data found for this query in Tachyon Core.';
    }
    return { data: simulatedData };
  }
);

// Prompt definition for generating insights using the Tachyon Core tool
const smartDataInsightPrompt = ai.definePrompt({
  name: 'smartDataInsightPrompt',
  input: { schema: SmartDataInsightGenerationInputSchema },
  output: { schema: SmartDataInsightGenerationOutputSchema },
  tools: [getTachyonAnalyticsData],
  prompt: `You are an expert business analyst specializing in real-time insights from Tachyon Core analytics.
Your goal is to answer the business leader's question by providing relevant and prioritized insights.
You have access to a tool called 'getTachyonAnalyticsData' which can retrieve specific analytical data from the Tachyon Core.

User Question: {{{userQuestion}}}

Follow these steps:
1. First, carefully analyze the user's question to understand their intent.
2. If the question requires specific analytical data that 'getTachyonAnalyticsData' might provide, use the tool with a relevant query to retrieve that data. Consider multiple queries if necessary to cover all aspects of the user's question.
3. Based on the retrieved data (if any) and your expert knowledge, synthesize clear, concise, and prioritized insights. If the tool reports 'No specific analytical data found', try to provide general market context or state that specific data was unavailable.
4. Ensure the insights directly address the user's question, highlight critical trends, and are relevant for making data-driven decisions efficiently.
5. Provide actionable recommendations where appropriate for each insight.
6. Specify the data sources used, if any, to generate these insights.

Provide your response in a well-formed JSON object that adheres strictly to the following schema:

`,
});

// Genkit flow definition
const smartDataInsightGenerationFlow = ai.defineFlow(
  {
    name: 'smartDataInsightGenerationFlow',
    inputSchema: SmartDataInsightGenerationInputSchema,
    outputSchema: SmartDataInsightGenerationOutputSchema,
  },
  async (input) => {
    const { output } = await smartDataInsightPrompt(input);
    if (!output) {
      throw new Error('Failed to generate smart data insights.');
    }
    return output;
  }
);

/**
 * Generates prioritized insights from AetherBus processed data in response to a natural language question.
 * It utilizes Tachyon Core analytics via a tool to retrieve relevant data.
 *
 * @param input - An object containing the user's natural language question.
 * @returns An object containing a summary, prioritized insights, and data sources used.
 */
export async function generateSmartDataInsight(
  input: SmartDataInsightGenerationInput
): Promise<SmartDataInsightGenerationOutput> {
  return smartDataInsightGenerationFlow(input);
}
