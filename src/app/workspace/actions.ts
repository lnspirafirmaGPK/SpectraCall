"use server"

import { workspaceMockData, type WorkspaceData } from "@/lib/mock/workspace"

const withDelay = async <T>(value: T): Promise<T> => {
  await new Promise((resolve) => setTimeout(resolve, 250))
  return value
}

export async function getWorkspaceData(): Promise<WorkspaceData> {
  return withDelay(workspaceMockData)
}

async function messageAction(message: string) {
  return withDelay({ ok: true, message })
}

export async function executeApproval(id: string) {
  return messageAction(`Executed approval ${id}`)
}

export async function inspectApproval(id: string) {
  return messageAction(`Inspection opened for approval ${id}`)
}

export async function openAlert(id: string) {
  return messageAction(`Alert ${id} opened`)
}

export async function deployAction() {
  return messageAction("Deploy flow started")
}

export async function approveAction() {
  return messageAction("Bulk approval flow started")
}

export async function briefAction() {
  return messageAction("AI brief generated")
}

export async function escalteAction() {
  return messageAction("Escalation workflow opened")
}

export async function applyRecommendation(id: string) {
  return messageAction(`Recommendation ${id} applied`)
}
