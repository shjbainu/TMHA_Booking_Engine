"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function generateLocalExploration(hotelName: string, hotelAddress: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Generate an engaging guide for exploring the local area around "${hotelName}" located at "${hotelAddress}". Suggest unique experiences, cultural insights, hidden gems, and tips for an authentic local experience. Keep it to about 3-4 paragraphs.`,
    })
    return { success: true, content: text }
  } catch (error) {
    console.error("Error generating local exploration guide:", error)
    return { success: false, content: "Failed to generate local exploration guide. Please try again later." }
  }
}
