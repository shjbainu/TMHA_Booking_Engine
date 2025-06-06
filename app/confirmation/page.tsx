"use client"

import { ArrowLeft, Copy, QrCode, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProgressIndicator } from "@/components/progress-indicator"
import Image from "next/image"
import Link from "next/link"

export default function PaymentConfirmation() {
  const steps = ["Đặt phòng", "Thanh toán", "Xác nhận"]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
        <Link href="/payment">
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

          {/* Room Image */}
          <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-4">
            <Image src="/public/images/confirmation-room.png" alt="Hotel room" fill className="object-cover" />
          </div>
        </div>

        {/* Room Details */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-bold text-[#0a0a0a] mb-4">PHÒNG STANDARD</h3>

          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium">Thông tin chuyến đi</span>
            </div>

            <div>
              <span className="text-[#0a0a0a]">Ngày 25 - 27 tháng 4, 2025</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#0a0a0a]">Mã nhận phòng: HOTEL1234</span>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard("HOTEL1234")}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <QrCode className="h-4 w-4" />
              </Button>
            </div>

            <div>
              <span className="font-medium">Link chia sẻ phòng</span>
            </div>

            <div className="bg-gray-100 p-3 rounded flex items-center justify-between">
              <span className="text-xs text-[#0a0a0a] truncate">https://staybooking.com/room/hotel1234</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 flex-shrink-0"
                onClick={() => copyToClipboard("https://staybooking.com/room/hotel1234")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            <div>
              <span className="font-medium">Thông tin ngày nhận trả phòng</span>
            </div>

            <div>
              <span className="text-[#0a0a0a]">Ngày nhận phòng: 12:00 ngày 25 tháng 4, 2025</span>
            </div>

            <div>
              <span className="text-[#0a0a0a]">Ngày trả phòng: 12:00 ngày 27 tháng 4, 2025</span>
            </div>

            <div>
              <span className="font-medium">Thông tin khách hàng</span>
            </div>

            <div>
              <span className="text-[#0a0a0a]">Khách hàng: Lê Tuấn Anh</span>
            </div>

            <div>
              <span className="text-[#0a0a0a]">Số điện thoại: 0362423000</span>
            </div>

            <div>
              <span className="text-[#0a0a0a]">Email: letuananhk54@gmail.com</span>
            </div>
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
