import { AgentRegistryEntry } from './agents';

export interface DecisionArtifact {
  id: string;
  type: 'decision' | 'approval' | 'report';
  title: string;
  description: string;
  timestamp: string;
  proposer_id: string;
  reviewer_id?: string;
  approver_id: string;
  risk_level: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Approved' | 'Pending' | 'Rejected' | 'Logged' | 'Verified';
  lineage_hashes: string[];
  policy_reference?: string;
}

export interface FinancialComparison {
  category: string;
  budgeted: number;
  actual: number;
  variance: number;
}
