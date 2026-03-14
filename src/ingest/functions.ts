import { google } from "@ai-sdk/google"
import { generateText } from "ai"
import { inngest } from "./client"

export const unblock = inngest.createFunction(
  { id: "unblock" },
  { event: "test/unblock" },
  async ({ event }) => {
    const result = await generateText({
      model: google("gemini-3.1-flash-lite-preview"),
      prompt: event.data.message,
    })

    return { message: result.text }
  },
)
