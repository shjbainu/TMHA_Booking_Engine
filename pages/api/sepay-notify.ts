import type { NextApiRequest, NextApiResponse } from "next"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end()

  // Lấy dữ liệu từ webhook SePay
  const data = req.body

  // Tách mã đơn hàng từ nội dung chuyển khoản (nếu cần)
  // Nếu SePay gửi trực tiếp order_id thì không cần tách, nếu gửi content thì cần tách bằng regex

  // Kiểm tra dữ liệu hợp lệ
  const { order_id, status, amount } = data
  if (!order_id || !status) {
    return res.status(400).json({ error: "Missing order_id or status" })
  }

  // Kiểm tra đơn hàng tồn tại, đúng số tiền, trạng thái 'pending'
  const { data: payment, error: findError } = await supabase
    .from("payments")
    .select("*")
    .eq("order_id", order_id)
    .eq("status", "pending")
    .maybeSingle()

  if (findError || !payment) {
    return res.status(404).json({ error: "Order not found or already updated" })
  }

  // Nếu có truyền amount, kiểm tra số tiền khớp
  if (amount && payment.amount !== amount) {
    return res.status(400).json({ error: "Amount does not match" })
  }

  // Cập nhật trạng thái đơn hàng
  const { error } = await supabase
    .from("payments")
    .update({ status })
    .eq("order_id", order_id)

  if (error) return res.status(500).json({ success: false, message: error.message })

  // Đúng chuẩn SePay yêu cầu:
  res.status(200).json({ success: true })
}