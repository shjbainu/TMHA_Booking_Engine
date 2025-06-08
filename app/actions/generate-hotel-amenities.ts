"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function generateHotelAmenities(hotelName: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Generate a concise and engaging introduction to the amenities available at "${hotelName}". Highlight key facilities, services, and unique offerings that enhance the guest experience. Keep it to about 3-4 paragraphs.`,
    })
    return { success: true, content: text }
  } catch (error) {
    console.error("Error generating hotel amenities introduction:", error)
    return { success: false, content: "Failed to generate hotel amenities introduction. Please try again later." }
  }
}
