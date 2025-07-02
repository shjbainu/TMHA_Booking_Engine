import type { NextApiRequest, NextApiResponse } from "next"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { order_id } = req.query

  const { data, error } = await supabase
    .from("payments")
    .select("status")
    .eq("order_id", order_id)
    .single()

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  if (data) {
    res.status(200).json({ status: data.status })
  } else {
    res.status(404).json({ status: "not_found" })
  }
}