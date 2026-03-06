"use server"

import { workspaceMockData, type WorkspaceData } from "@/lib/mock/workspace"

/**
 * Utility to simulate network latency for development/demo purposes.
 */
const withDelay = async <T>(value: T, ms = 500): Promise<T> => {
  await new Promise((resolve) => setTimeout(resolve, ms))
  return value
}

/**
 * Fetches the complete workspace data object.
 * In a real production environment, this would call a database (e.g. Firestore)
 * or an internal API.
 */
export async function getWorkspaceData(): Promise<WorkspaceData> {
  try {
    // Simulate fetching from a persistent store
    const data = await withDelay(workspaceMockData, 800)

    // In production, you would validate the data structure here
    if (!data) {
      throw new Error("No workspace data found")
    }

    return data
  } catch (error) {
    console.error("[getWorkspaceData] Error fetching workspace data:", error)
    throw new Error("Failed to load Mission Control data. Please try again.")
  }
}

/**
 * General-purpose handler for message-based actions.
 */
async function performAction(message: string, success = true) {
  // Simulate processing time
  await withDelay(null, 400)

  if (!success) {
    return { ok: false, message: "Action could not be completed at this time." }
  }

  return { ok: true, message }
}

export async function executeApproval(id: string) {
  return performAction(`Executed approval ${id}`)
}

export async function inspectApproval(id: string) {
  return performAction(`Inspection opened for approval ${id}`)
}

export async function openAlert(id: string) {
  return performAction(`Alert ${id} details retrieval successful`)
}

export async function deployAction() {
  return performAction("Deployment orchestration started successfully.")
}

export async function approveAction() {
  return performAction("Bulk approval workflow initiated for all pending items.")
}

export async function briefAction() {
  return performAction("AI Strategic Brief has been generated and queued for review.")
}

export async function escalteAction() {
  return performAction("Mission critical escalation protocol activated.")
}

export async function applyRecommendation(id: string) {
  return performAction(`Applied ASI recommendation: ${id}`)
}
