import type { NextApiRequest, NextApiResponse } from "next"
import mysql from "mysql2/promise"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { order_id } = req.query;
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3301,
    password: "minov@2025",
    database: "booking_engine"
  });
  const [rows] = await connection.execute<mysql.RowDataPacket[]>(
    "SELECT status FROM payments WHERE order_id = ?",
    [order_id]
  );
  await connection.end();
  if (Array.isArray(rows) && rows.length > 0) {
    res.status(200).json({ status: (rows[0] as mysql.RowDataPacket).status });
  } else {
    res.status(404).json({ status: "not_found" });
  }
}