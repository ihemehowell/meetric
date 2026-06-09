export type Priority = "High" | "Medium" | "Low"

export interface ActionItem {
  id: string
  task: string
  assignee: string
  due: string
  priority: Priority
}

export interface Participant {
  name: string
  role: string
}

export interface MeetingAnalysis {
  title: string
  summary: string
  processingTime: number       // seconds, e.g. 8.2
  actionItems: ActionItem[]
  decisions: string[]
  participants: Participant[]
  transcript: string
}