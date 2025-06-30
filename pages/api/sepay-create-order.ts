import type { NextApiRequest, NextApiResponse } from "next"
import mysql from "mysql2/promise"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end()
  const { amount, order_id, customer, description } = req.body

  // Thông tin ngân hàng nhận chuyển khoản
  const bank_code = "MB"
  const bank_account = "058585186969"
  const account_name = "VU NGOC DU"
  const transfer_content = `DH-${order_id}`

  // Kết nối database - tham khảo cấu hình từ hướng dẫn PHP
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    port: 3301, // thêm dòng này để đúng cổng
    user: "root",
    password: "minov@2025", // thay bằng mật khẩu thực tế
    database: "booking_engine"
  })

  await connection.execute(
    "INSERT INTO payments (order_id, amount, customer_name, customer_phone, customer_email) VALUES (?, ?, ?, ?, ?)",
    [order_id, amount, customer?.name || "", customer?.phone || "", customer?.email || ""]
  )
  await connection.end()

  // Tạo link QR động đúng chuẩn
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