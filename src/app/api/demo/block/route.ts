import { google } from "@ai-sdk/google"
import { generateText } from "ai"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body: { message: string } = await req.json()

  const result = await generateText({
    model: google("gemini-3.1-flash-lite-preview"),
    prompt: body.message,
  })

  return NextResponse.json(result.text, { status: 200 })
}
