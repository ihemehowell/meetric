"use client"

import { useState } from "react"
import { CheckCircle2, Clock3, Pencil, Check, X } from "lucide-react"
import type { ActionItem, Priority } from "@/types/analysis"

const priorityStyles: Record<Priority, string> = {
  High: "bg-red-500/10 text-red-500",
  Medium: "bg-yellow-500/10 text-yellow-500",
  Low: "bg-green-500/10 text-green-500",
}

interface Props {
  initial: ActionItem[]
  onChange: (items: ActionItem[]) => void
}

export default function ActionItems({ initial, onChange }: Props) {
  const [items, setItems] = useState<ActionItem[]>(initial)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<Partial<ActionItem>>({})

  const startEdit = (item: ActionItem) => {
    setEditingId(item.id)
    setDraft({ ...item })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setDraft({})
  }

  const saveEdit = () => {
    const updated = items.map((item) =>
      item.id === editingId ? { ...item, ...draft } as ActionItem : item
    )
    setItems(updated)
    onChange(updated)
    setEditingId(null)
    setDraft({})
  }

  const toggleDone = (id: string) => {
    const updated = items.filter((item) => item.id !== id)
    setItems(updated)
    onChange(updated)
  }

  return (
    <div className="rounded-3xl border bg-card/70 p-7 backdrop-blur">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Action Items</h2>
        </div>
        <div className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
          {items.length} Tasks
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">All tasks cleared.</p>
        ) : (
          items.map((item) =>
            editingId === item.id ? (
              // Edit mode
              <div key={item.id} className="rounded-2xl border border-primary/30 bg-background/70 p-5 space-y-3">
                <input
                  className="w-full rounded-xl border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  value={draft.task ?? ""}
                  onChange={(e) => setDraft((d) => ({ ...d, task: e.target.value }))}
                  placeholder="Task"
                />
                <div className="flex gap-2">
                  <input
                    className="flex-1 rounded-xl border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    value={draft.assignee ?? ""}
                    onChange={(e) => setDraft((d) => ({ ...d, assignee: e.target.value }))}
                    placeholder="Assignee"
                  />
                  <input
                    className="flex-1 rounded-xl border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    value={draft.due ?? ""}
                    onChange={(e) => setDraft((d) => ({ ...d, due: e.target.value }))}
                    placeholder="Due date"
                  />
                  <select
                    className="rounded-xl border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    value={draft.priority ?? "Medium"}
                    onChange={(e) => setDraft((d) => ({ ...d, priority: e.target.value as Priority }))}
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                <div className="flex gap-2 justify-end">
                  <button onClick={cancelEdit} className="flex items-center gap-1 rounded-xl px-3 py-1.5 text-sm hover:bg-muted transition-colors">
                    <X className="h-3.5 w-3.5" /> Cancel
                  </button>
                  <button onClick={saveEdit} className="flex items-center gap-1 rounded-xl bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary/90 transition-colors">
                    <Check className="h-3.5 w-3.5" /> Save
                  </button>
                </div>
              </div>
            ) : (
              // View mode
              <div key={item.id} className="rounded-2xl border bg-background/70 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium">{item.task}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Assigned to {item.assignee}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`rounded-full px-3 py-1 text-xs ${priorityStyles[item.priority] ?? priorityStyles.Medium}`}>
                      {item.priority}
                    </div>
                    <button
                      onClick={() => startEdit(item)}
                      className="rounded-lg p-1.5 hover:bg-muted transition-colors"
                    >
                      <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => toggleDone(item.id)}
                      className="rounded-lg p-1.5 hover:bg-green-500/10 transition-colors"
                      title="Mark as done"
                    >
                      <Check className="h-3.5 w-3.5 text-muted-foreground hover:text-green-500" />
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock3 className="h-4 w-4" />
                  Due {item.due}
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  )
}