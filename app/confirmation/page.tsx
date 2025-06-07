// @/app/confirmation/page.tsx

"use client"

import { ArrowLeft, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProgressIndicator } from "@/components/progress-indicator"
import Image from "next/image"
import Link from "next/link"
// UPDATE: Import component card mới
import { BookingConfirmationCard } from "@/components/BookingConfirmationCard"

// --- DỮ LIỆU GIẢ LẬP ---
// Trong ứng dụng thực tế, bạn sẽ lấy dữ liệu này từ state, context, hoặc API sau khi thanh toán thành công.
const confirmedBookings = [
  {
    id: "booking_1",
    name: "BOOKING 1",
    checkInDate: "25 tháng 4, 2025",
    checkOutDate: "27 tháng 4, 2025",
    bookingCode: "HOTEL1234",
    shareLink: "https://staybooking.com/room/hotel1234",
    rooms: [
      { name: "Phòng Standard", quantity: 2 },
      { name: "Phòng Luxury", quantity: 1 },
    ],
    totalPrice: "1.617.000đ"
  },
  {
    id: "booking_2",
    name: "BOOKING 2",
    checkInDate: "28 tháng 4, 2025",
    checkOutDate: "30 tháng 4, 2025",
    bookingCode: "HOTEL5678",
    shareLink: "https://staybooking.com/room/hotel5678",
    rooms: [
      { name: "Phòng Suite", quantity: 1 },
    ],
    totalPrice: "2.500.000đ"
  }
];

const customerInfo = {
    name: "Lê Tuấn Anh",
    phone: "0362423000",
    email: "letuananhk54@gmail.com"
}
// ----------------------


export default function PaymentConfirmation() {
  const steps = ["Đặt phòng", "Thanh toán", "Xác nhận"]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <ArrowLeft className="h-6 w-6 text-[#0a0a0a]" />
          </Button>
        </Link>
        <h1 className="text-lg font-medium text-[#0a0a0a]">CHI TIẾT HÓA ĐƠN</h1>
        <div className="w-10" />
      </div>

      <div className="p-4">
        {/* Progress Indicator */}
        <ProgressIndicator currentStep={3} steps={steps} />

        {/* Success Message */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-[#0a0a0a] mb-4">THANH TOÁN THÀNH CÔNG</h2>
          <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-4">
            <Image src="/images/confirmation-room.png" alt="Hotel room" fill className="object-cover" />
          </div>
        </div>

        {/* UPDATE: Hiển thị danh sách các booking đã xác nhận */}
        <div className="space-y-4 mb-6">
            <h3 className="text-lg font-bold text-[#0a0a0a]">CHI TIẾT ĐẶT PHÒNG</h3>
            {confirmedBookings.map((booking) => (
                <BookingConfirmationCard key={booking.id} booking={booking} />
            ))}
        </div>

        {/* UPDATE: Tách thông tin khách hàng ra một mục riêng */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-bold text-[#0a0a0a] mb-4">THÔNG TIN KHÁCH HÀNG</h3>
            <div className="space-y-2 text-sm text-[#0a0a0a]">
                <p><strong>Khách hàng:</strong> {customerInfo.name}</p>
                <p><strong>Số điện thoại:</strong> {customerInfo.phone}</p>
                <p><strong>Email:</strong> {customerInfo.email}</p>
            </div>
            <div className="mt-4 text-xs text-gray-500">
                <p>Chi tiết nhận phòng và hóa đơn đã được gửi đến email của bạn.</p>
            </div>
        </div>

        {/* Download Invoice Button */}
        <Button className="w-full bg-[#0a0a0a] hover:bg-[#000000] text-white py-3 rounded-lg text-base font-medium flex items-center justify-center gap-2">
          <Download className="h-5 w-5" />
          Tải về hóa đơn
        </Button>
      </div>
    </div>
  )
}
