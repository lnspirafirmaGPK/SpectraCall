import { WorkplaceConnector } from '../types/asi';

export const mockWorkplaceConnectors: WorkplaceConnector[] = [
  {
    id: "conn-m365-01",
    name: "Microsoft 365 Enterprise",
    type: "M365",
    status: "connected",
    classificationMode: "automatic",
    redactionEnabled: true,
    capabilities: ["Graph API", "SharePoint Sync", "Outlook Events"],
    lastSync: new Date().toISOString(),
    tenantId: "m365-tenant-001"
  },
  {
    id: "conn-gsuite-01",
    name: "Google Workspace - Finance",
    type: "Google",
    status: "connected",
    classificationMode: "manual",
    redactionEnabled: true,
    capabilities: ["Drive API", "Sheets Interactivity", "Admin SDK"],
    lastSync: new Date().toISOString(),
    tenantId: "gsuite-tenant-55"
  },
  {
    id: "conn-zoho-01",
    name: "Zoho CRM Integration",
    type: "Zoho",
    status: "disconnected",
    classificationMode: "manual",
    redactionEnabled: false,
    capabilities: ["CRM Sync", "Ticket Ingestion"],
    lastSync: "2023-11-20T10:00:00Z",
    tenantId: "zoho-org-99"
  }
];
