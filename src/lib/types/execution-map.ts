export type ExecutionNodeStatus = 'pending' | 'running' | 'completed' | 'failed';

export interface ExecutionMapNode {
  id: string;
  agent_id: string;
  action: string;
  status: ExecutionNodeStatus;
  dependencies: string[];
  timestamp_start?: string;
  timestamp_end?: string;
  output_summary?: string;
}

export interface ExecutionMap {
  flow_id: string;
  root_task_id: string;
  nodes: ExecutionMapNode[];
  status: ExecutionNodeStatus;
}
