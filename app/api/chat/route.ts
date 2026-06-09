import { NextRequest, NextResponse } from "next/server"
import type { MeetingAnalysis } from "@/types/analysis"

export async function POST(req: NextRequest) {
  try {
    const { analysis, messages }: { analysis: MeetingAnalysis; messages: { role: string; content: string }[] } = await req.json()

    const systemPrompt = `You are a meeting assistant. You have full context of the following meeting analysis. Answer questions concisely and helpfully.

MEETING TITLE: ${analysis.title}

SUMMARY: ${analysis.summary}

ACTION ITEMS:
${analysis.actionItems.map((a) => `- ${a.task} | Assigned: ${a.assignee} | Due: ${a.due} | Priority: ${a.priority}`).join("\n")}

DECISIONS:
${analysis.decisions.map((d) => `- ${d}`).join("\n")}

PARTICIPANTS:
${analysis.participants.map((p) => `- ${p.name} (${p.role})`).join("\n")}

TRANSCRIPT:
${analysis.transcript}

Answer only based on the meeting content above. Be concise. If something isn't in the meeting, say so.`

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error("Groq chat error:", err)
      return NextResponse.json({ error: "Chat failed" }, { status: response.status })
    }

    const json = await response.json()
    const reply = json.choices?.[0]?.message?.content ?? "I couldn't generate a response."

    return NextResponse.json({ reply })
  } catch (err) {
    console.error("Chat route error:", err)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}