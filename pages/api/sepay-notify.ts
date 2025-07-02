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
  await supabase.from("transactions").insert([{
    gateway: data.gateway,
    transaction_date: data.transactionDate,
    account_number: data.accountNumber,
    sub_account: data.subAccount,
    amount_in: data.transferAmount,
    amount_out: 0,
    accumulated: data.accumulated,
    code: data.code,
    transaction_content: data.content,
    reference_number: data.referenceCode,
    body: JSON.stringify(data),
  }])

  // 2. Bóc tách order_id từ content hoặc code
  let order_id: string | null = null;
  if (data.content) {
    const match = data.content.match(/DH(\d+)/i);
    order_id = match ? match[1] : null;
  }
  if (!order_id && data.code) {
    const match = data.code.match(/DH(\d+)/i);
    order_id = match ? match[1] : null;
  }
  const order_id_num = order_id ? Number(order_id) : null;

  // 3. Kiểm tra dữ liệu hợp lệ
  if (!order_id_num) {
    return res.status(400).json({ success: false, message: "Missing order_id" });
  }

  // 4. Kiểm tra đơn hàng tồn tại, đúng số tiền, trạng thái 'Unpaid'
  const { data: order, error: findError } = await supabase
    .from("orders")
    .select("*")
    .eq("order_id", order_id_num)
    .eq("total", data.transferAmount)
    .eq("payment_status", "Unpaid")
    .maybeSingle();

  if (findError || !order) {
    return res.status(404).json({ success: false, message: "Order not found or already paid" });
  }

  // 5. Cập nhật trạng thái đơn hàng sang 'Paid'
  const { error: updateError } = await supabase
    .from("orders")
    .update({ payment_status: "Paid" })
    .eq("order_id", order_id_num);

  if (updateError) {
    return res.status(500).json({ success: false, message: updateError.message });
  }

  // 6. Trả về đúng chuẩn SePay yêu cầu
  return res.status(200).json({ success: true });
}