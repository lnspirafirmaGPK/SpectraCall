import { ExecutionMap } from '../types/execution-map';

export const mockExecutionMap: ExecutionMap = {
  flow_id: 'flow-101',
  root_task_id: 'task-501',
  status: 'running',
  nodes: [
    {
      id: 'task-501',
      agent_id: 'agent-001',
      action: 'Risk Assessment',
      status: 'completed',
      dependencies: [],
      timestamp_start: '2023-10-27T10:00:00Z',
      timestamp_end: '2023-10-27T10:00:05Z',
      output_summary: 'High risk detected in sector X.'
    },
    {
      id: 'task-502',
      agent_id: 'agent-002',
      action: 'Automated Mitigation',
      status: 'running',
      dependencies: ['task-501'],
      timestamp_start: '2023-10-27T10:00:06Z'
    },
    {
      id: 'task-503',
      agent_id: 'agent-003',
      action: 'Audit Logging',
      status: 'pending',
      dependencies: ['task-502']
    }
  ]
};
