"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function generateHotelReviews(hotelName: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Generate a concise summary of typical guest reviews for a hotel named "${hotelName}". Include common positive aspects (e.g., cleanliness, staff, location) and any minor areas for improvement (e.g., noise, limited amenities). Keep it to about 3-4 paragraphs, simulating real guest feedback.`,
    })
    return { success: true, content: text }
  } catch (error) {
    console.error("Error generating hotel reviews summary:", error)
    return { success: false, content: "Failed to generate hotel reviews summary. Please try again later." }
  }
}
