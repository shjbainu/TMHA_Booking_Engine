"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function generateHotelIntroduction(hotelName: string, hotelAddress: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Generate a concise and engaging introduction for a hotel named "${hotelName}" located at "${hotelAddress}". Focus on its unique selling points, atmosphere, and what guests can expect. Keep it to about 3-4 paragraphs.`,
    })
    return { success: true, content: text }
  } catch (error) {
    console.error("Error generating hotel introduction:", error)
    return { success: false, content: "Failed to generate hotel introduction. Please try again later." }
  }
}
