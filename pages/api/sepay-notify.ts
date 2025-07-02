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

  // 1. Lưu log giao dịch vào bảng transactions
  // Giả sử các trường giống bảng payments, bạn có thể lưu toàn bộ data hoặc chỉ các trường cần thiết
  await supabase.from("payments").insert([{
    order_id: data.order_id,
    amount: data.amount,
    customer_name: data.customer_name || "",
    customer_phone: data.customer_phone || "",
    customer_email: data.customer_email || "",
    status: data.status || "pending",
    // Thêm các trường khác nếu cần
  }])

  // 2. Kiểm tra dữ liệu hợp lệ
  const { order_id, amount } = data
  if (!order_id) {
    return res.status(400).json({ success: false, message: "Missing order_id" })
  }

  // 3. Kiểm tra đơn hàng tồn tại, đúng số tiền, trạng thái 'pending'
  const { data: payment, error: findError } = await supabase
    .from("payments")
    .select("*")
    .eq("order_id", order_id)
    .eq("amount", amount)
    .eq("status", "pending")
    .maybeSingle()

  if (findError || !payment) {
    return res.status(404).json({ success: false, message: "Order not found or already paid" })
  }

  // 4. Cập nhật trạng thái đơn hàng sang 'Paid'
  const { error } = await supabase
    .from("payments")
    .update({ status: "success" })
    .eq("order_id", order_id)

  if (error) return res.status(500).json({ success: false, message: error.message })

  // 5. Trả về đúng chuẩn SePay yêu cầu
  res.status(200).json({ success: true })
}