import type { NextApiRequest, NextApiResponse } from "next"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end()
  const { order_id, status } = req.body

  // Cập nhật trạng thái đơn hàng trên Supabase
  const { error } = await supabase
    .from("payments")
    .update({ status })
    .eq("order_id", order_id)

  if (error) return res.status(500).json({ error: error.message })

  res.status(200).json({ received: true })
}