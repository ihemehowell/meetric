import { NextRequest, NextResponse } from "next/server"

const SYSTEM_PROMPT = `You are a meeting intelligence assistant. Analyze the transcript and return ONLY valid JSON matching this exact shape — no markdown, no explanation, no backticks, nothing else:

{
  "title": "string (meeting title, inferred from context)",
  "summary": "string (2-3 sentence summary)",
  "processingTime": 0,
  "actionItems": [
    {
      "id": "string (e.g. 'ai-1', 'ai-2')",
      "task": "string",
      "assignee": "string (full name or 'Unassigned')",
      "due": "string (e.g. 'Friday', 'End of week', 'Next Monday')",
      "priority": "High" | "Medium" | "Low"
    }
  ],
  "decisions": ["string", "string"],
  "participants": [
    { "name": "string", "role": "string (infer from context)" }
  ],
  "transcript": ""
}`

export async function POST(req: NextRequest) {
  try {
    const { transcript } = await req.json()

    if (!transcript?.trim()) {
      return NextResponse.json(
        { error: "Transcript is required" },
        { status: 400 }
      )
    }

    const start = Date.now()

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            {
              role: "user",
              content: `Analyze this meeting transcript:\n\n${transcript}`,
            },
          ],
        }),
      }
    )

    if (!response.ok) {
      const error = await response.text()
      console.error("Groq API error:", error)
      return NextResponse.json(
        { error: "Groq API request failed" },
        { status: response.status }
      )
    }

    const json = await response.json()
    const raw = json.choices?.[0]?.message?.content ?? ""
    const elapsed = parseFloat(((Date.now() - start) / 1000).toFixed(1))

    const data = JSON.parse(raw)
    data.processingTime = elapsed
    data.transcript = transcript

    return NextResponse.json(data)
  } catch (err) {
    console.error("Analyze route error:", err)
    return NextResponse.json(
      { error: "Failed to process transcript" },
      { status: 500 }
    )
  }
}