import { createClient } from "@/lib/supabase/client"
import { getDeviceId } from "@/lib/device-id"
import type { MeetingAnalysis, ActionItem, Participant } from "@/types/analysis"

export type HistoryEntry = MeetingAnalysis & {
  id: string
  savedAt: string
}

interface MeetingRow {
  id: string
  created_at: string
  title: string
  summary: string
  processing_time: number
  action_items: ActionItem[]
  decisions: string[]
  participants: Participant[]
  transcript: string
  device_id: string
  user_id: string | null
}

function toRow(analysis: MeetingAnalysis, deviceId: string, userId?: string) {
  return {
    device_id: deviceId,
    user_id: userId ?? null,
    title: analysis.title,
    summary: analysis.summary,
    processing_time: analysis.processingTime,
    action_items: analysis.actionItems,
    decisions: analysis.decisions,
    participants: analysis.participants,
    transcript: analysis.transcript,
  }
}

function fromRow(row: MeetingRow): HistoryEntry {
  return {
    id: row.id,
    savedAt: row.created_at,
    title: row.title,
    summary: row.summary,
    processingTime: row.processing_time,
    actionItems: row.action_items ?? [],
    decisions: row.decisions ?? [],
    participants: row.participants ?? [],
    transcript: row.transcript ?? "",
  }
}

export async function saveAnalysis(
  analysis: MeetingAnalysis,
  userId?: string
): Promise<void> {
  const supabase = createClient()
  const deviceId = getDeviceId()

  const { error } = await supabase
    .from("meetings")
    .insert(toRow(analysis, deviceId, userId))

  if (error) console.error("Save error:", error)
}

export async function getHistory(userId?: string): Promise<HistoryEntry[]> {
  const supabase = createClient()
  const deviceId = getDeviceId()

  const query = userId
    ? supabase.from("meetings").select("*").eq("user_id", userId)
    : supabase.from("meetings").select("*").eq("device_id", deviceId)

  const { data, error } = await query
    .order("created_at", { ascending: false })
    .limit(20)

  if (error) {
    console.error("Fetch error:", error)
    return []
  }

  return (data ?? []).map((row) => fromRow(row as MeetingRow))
}

export async function deleteAnalysis(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.from("meetings").delete().eq("id", id)
  if (error) console.error("Delete error:", error)
}

export async function claimDeviceMeetings(
  deviceId: string,
  userId: string
): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from("meetings")
    .update({ user_id: userId })
    .eq("device_id", deviceId)
    .is("user_id", null)

  if (error) console.error("Claim error:", error)
}