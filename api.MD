// import { NextRequest, NextResponse } from "next/server"

// const SYSTEM_PROMPT = `You are a meeting intelligence assistant. Analyze the transcript and return ONLY valid JSON matching this exact shape — no markdown, no explanation, no backticks, nothing else:

// {
//   "title": "string (meeting title, inferred from context)",
//   "summary": "string (2-3 sentence summary)",
//   "processingTime": 0,
//   "actionItems": [
//     {
//       "id": "string (e.g. 'ai-1', 'ai-2')",
//       "task": "string",
//       "assignee": "string (full name or 'Unassigned')",
//       "due": "string (e.g. 'Friday', 'End of week', 'Next Monday')",
//       "priority": "High" | "Medium" | "Low"
//     }
//   ],
//   "decisions": ["string", "string"],
//   "participants": [
//     { "name": "string", "role": "string (infer from context)" }
//   ],
//   "transcript": ""
// }`

// export async function POST(req: NextRequest) {
//   try {
//     const { transcript } = await req.json()

//     if (!transcript?.trim()) {
//       return NextResponse.json(
//         { error: "Transcript is required" },
//         { status: 400 }
//       )
//     }

//     const start = Date.now()

//     const response = await fetch(
//       "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.QWEN_API_KEY}`,
//         },
//         body: JSON.stringify({
//           model: "qwen-plus",
//           messages: [
//             { role: "system", content: SYSTEM_PROMPT },
//             {
//               role: "user",
//               content: `Analyze this meeting transcript:\n\n${transcript}`,
//             },
//           ],
//         }),
//       }
//     )

//     if (!response.ok) {
//       const error = await response.text()
//       console.error("Qwen API error:", error)
//       return NextResponse.json(
//         { error: "Qwen API request failed" },
//         { status: response.status }
//       )
//     }

//     const json = await response.json()
//     const raw = json.choices?.[0]?.message?.content ?? ""
//     const elapsed = parseFloat(((Date.now() - start) / 1000).toFixed(1))

//     const data = JSON.parse(raw)
//     data.processingTime = elapsed
//     data.transcript = transcript

//     return NextResponse.json(data)
//   } catch (err) {
//     console.error("Analyze route error:", err)
//     return NextResponse.json(
//       { error: "Failed to process transcript" },
//       { status: 500 }
//     )
//   }
// }

Alex: Alright let's kick off. We're three weeks out from the beta launch and I want to make sure everyone's aligned on priorities.

Priya: On the backend side, the authentication flow is done. We still need to finish the notification service — that's probably two more days of work. I can have it ready by Wednesday.

Jordan: Design-wise, the dashboard screens are approved. I'm still working on the empty states and error screens. I'll get those to Priya by Tuesday so she has time to integrate.

Alex: Good. What about the onboarding? That was flagged last week.

Jordan: The onboarding illustrations are done but the copy isn't finalized yet. I need Marcus to sign off on the tone before I can lock it.

Marcus: I can review the onboarding copy today and send feedback by end of day Monday.

Alex: Perfect. Priya, once the notification service is done, can you write up the API documentation for the mobile team?

Priya: Yes, I'll add that to my list. Probably Thursday or Friday.

Alex: The mobile team needs it before next Monday at the latest — they're blocked on their integration testing.

Priya: Understood, I'll prioritize it. Friday at the latest.

Alex: One more thing — we agreed last sprint to cut the social login feature from the beta. That stays cut. We also confirmed we're going with a 14-day free trial, no credit card required.

Marcus: Should I update the landing page copy to reflect the trial terms?

Alex: Yes, please do that. Aim for end of this week.

Jordan: Also worth noting — we decided to ship mobile-first and hold the desktop dashboard until post-beta. That should be documented somewhere.

Alex: Agreed. I'll add it to the decision log. Okay, I think we're good. Let's reconvene Thursday.