import { google } from "@ai-sdk/google"
import { generateText } from "ai"
import { inngest } from "./client"
import { firecrawl } from "~/firecrawl/client"

const REGEX_URL =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g

export const unblock = inngest.createFunction(
  { id: "unblock" },
  { event: "test/unblock" },
  async ({ step, event }) => {
    const prompt = event.data.message as string
    const urls = [...new Set(prompt.match(REGEX_URL) ?? [])]

    const context = urls.length
      ? await step.run("get context from urls", async () => {
          const scrapeResults = await Promise.allSettled(
            urls.map((url) =>
              firecrawl.scrape(url, {
                formats: ["markdown"],
              }),
            ),
          )

          return scrapeResults.flatMap((result) => {
            if (result.status !== "fulfilled") return []
            if (!result.value?.markdown) return []

            return [result.value.markdown]
          })
        })
      : []

    const finalPrompt = context.length
      ? `
Context from links:
${context.join("\n\n---\n\n")}

Question:
${prompt.replace(REGEX_URL, "").trim()}
`.trim()
      : prompt

    const result = await step.run("generate answer", async () => {
      const generateData = await generateText({
        model: google("gemini-3.1-flash-lite-preview"),
        prompt: finalPrompt,
      })

      return generateData.text
    })

    return { message: result }
  },
)
