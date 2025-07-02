import { createClient } from "@supabase/supabase-js"
import type { NextApiRequest, NextApiResponse } from "next"

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end()
  const { amount, order_id, customer, description } = req.body

  // Lưu vào Supabase
  const { error } = await supabase.from("payments").insert([{
    order_id,
    amount,
    customer_name: customer?.name || "",
    customer_phone: customer?.phone || "",
    customer_email: customer?.email || "",
    status: "pending"
  }])
  if (error) return res.status(500).json({ error: error.message })

  // Tạo link QR động
  const bank_code = "MB"
  const bank_account = "058585186969"
  const account_name = "VU NGOC DU"
  const transfer_content = `DH-${order_id}`
  const qr_url = `https://qr.sepay.vn/img?acc=${bank_account}&bank=${bank_code}&amount=${amount}&des=${encodeURIComponent(transfer_content)}&template=compact`

  res.status(200).json({
    bank_name: "MB Bank",
    bank_account,
    account_name,
    transfer_content,
    qr_url,
    amount,
  })
}