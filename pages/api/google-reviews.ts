import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { placeId } = req.query
  const apiKey = process.env.GOOGLE_PLACES_API_KEY // Đặt key trong .env.local

  if (!placeId || !apiKey) {
    return res.status(400).json({ error: "Missing placeId or API key" })
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=review,rating,user_ratings_total&key=${apiKey}`

  const response = await fetch(url)
  const data = await response.json()
  console.log("Google API response:", data)
  res.status(200).json(data.result)
}