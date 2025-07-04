import { createClient } from "@supabase/supabase-js"
import type { NextApiRequest, NextApiResponse } from "next"

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

function generateOrderId() {
  return Math.floor(100000 + Math.random() * 900000);
}

async function generateUniqueOrderId(supabase: any) {
  let isUnique = false;
  let orderId: number;
  while (!isUnique) {
    orderId = generateOrderId();
    // Kiểm tra trùng trong database
    const { data, error } = await supabase
      .from("tb_orders")
      .select("orders_id")
      .eq("orders_id", orderId)
      .single();
    if (!data) {
      isUnique = true;
    }
    // Nếu data có nghĩa là đã trùng, lặp lại
  }
  return orderId!;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end()
  const { amount, name } = req.body

  if (!amount || isNaN(amount)) {
    return res.status(400).json({ error: "Invalid amount" })
  }

  const orderId = await generateUniqueOrderId(supabase);

  // Đúng tên bảng và trường
  const { data, error } = await supabase.from("tb_orders").insert([{
    orders_id: orderId,
    total: amount,
    payment_status: ["Unpaid"],
    name: name || "Đơn hàng mới"
  }]).select("orders_id, total, name").single()

  if (error || !data) {
    console.error("Supabase error:", error); // Thêm dòng này để log lỗi ra console
   return res.status(500).json({ error: error?.message || "Cannot create order" })
  }
  const bank_code = "MB"
  const bank_account = "058585186969"
  const account_name = "VU NGOC DU"
  const transfer_content = `DH${data.orders_id}`
  const qr_url = `https://qr.sepay.vn/img?acc=${bank_account}&bank=${bank_code}&amount=${data.total}&des=${encodeURIComponent(transfer_content)}&template=compact`

  res.status(200).json({
    order_id: data.orders_id,
    bank_name: "MB Bank",
    bank_account,
    account_name,
    transfer_content,
    qr_url,
    amount: data.total,
    name: data.name
  })
}