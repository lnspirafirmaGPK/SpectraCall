export type EnvelopePriority = 'low' | 'medium' | 'high';
export type TraceLevel = 'none' | 'basic' | 'verbose';
export type EncodingType = 'json' | 'protobuf';

export interface ExecutionContext {
  priority: EnvelopePriority;
  ttl: number;
  trace_level: TraceLevel;
}

export interface EnvelopeMetadata {
  version: string;
  encoding: EncodingType;
}

export interface Envelope {
  flow_id: string;
  task_id: string;
  parent_id: string | null;
  agent_id: string;
  intent: string;
  payload: any;
  timestamp: string;
  signature: string;
  context: ExecutionContext;
  metadata: EnvelopeMetadata;
}

export interface ValidationResult {
  valid: boolean;
  errors?: string[];
  checks: {
    schema: boolean;
    authentication: boolean;
    signature: boolean;
    intent: boolean;
  };
  timestamp: string;
}

export interface CassetteMemoryRecord {
  id: string;
  flow_id: string;
  agent_id: string;
  snapshot: any;
  timestamp: string;
  tags: string[];
}
