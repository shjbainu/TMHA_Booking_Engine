import type { NextApiRequest, NextApiResponse } from "next"
import mysql from "mysql2/promise"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end()
  const { order_id, status } = req.body

  // Cập nhật trạng thái đơn hàng
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3301,
    password: "minov@2025",
    database: "booking_engine"
  })
  await connection.execute(
    "UPDATE payments SET status = ? WHERE order_id = ?",
    [status, order_id]
  )
  await connection.end()

  res.status(200).json({ received: true })
}