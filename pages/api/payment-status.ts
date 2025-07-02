import type { NextApiRequest, NextApiResponse } from "next"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Lấy order_id từ query, ép kiểu về số cho đúng với bảng orders mới
  const order_id = typeof req.query.order_id === "string"
    ? Number(req.query.order_id)
    : Array.isArray(req.query.order_id)
      ? Number(req.query.order_id[0])
      : undefined

  if (!order_id || isNaN(order_id)) {
    return res.status(400).json({ status: "not_found", error: "Missing or invalid order_id" })
  }

  // Truy vấn trạng thái đơn hàng từ bảng orders mới
  const { data, error } = await supabase
    .from("orders")
    .select("payment_status")
    .eq("order_id", order_id)
    .maybeSingle()

  if (error) {
    return res.status(500).json({ status: "error", error: error.message })
  }

  if (data && data.payment_status) {
    // Trả về đúng trạng thái đơn hàng
    return res.status(200).json({ status: data.payment_status })
  } else {
    // Không tìm thấy đơn hàng
    return res.status(404).json({ status: "not_found" })
  }
}