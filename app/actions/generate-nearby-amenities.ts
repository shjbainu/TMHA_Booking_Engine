"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function generateNearbyAmenities(hotelName: string, hotelAddress: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Generate a concise and helpful summary of nearby amenities and attractions around "${hotelName}" located at "${hotelAddress}". Include categories like restaurants, cafes, shops, parks, and public transport. Keep it to about 3-4 paragraphs.`,
    })
    return { success: true, content: text }
  } catch (error) {
    console.error("Error generating nearby amenities summary:", error)
    return { success: false, content: "Failed to generate nearby amenities summary. Please try again later." }
  }
}
