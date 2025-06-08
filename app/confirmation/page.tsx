// @/app/confirmation/page.tsx

"use client"

import { ArrowLeft, Download, CheckCircle, User, Phone, Mail, QrCode, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProgressIndicator } from "@/components/progress-indicator"
import Image from "next/image"
import Link from "next/link"
// Giữ lại component card của bạn để tái sử dụng logic bên trong nếu cần
import { BookingConfirmationCard } from "@/components/BookingConfirmationCard"

// --- DỮ LIỆU GIẢ LẬP (Giữ nguyên) ---
const confirmedBookings = [
  {
    id: "booking_1",
    name: "BOOKING 1",
    checkInDate: "Thứ Sáu, 25 tháng 4, 2025",
    checkOutDate: "Chủ Nhật, 27 tháng 4, 2025",
    bookingCode: "STAY-XYZ123",
    qrCodeValue: "STAY-XYZ123", // Giá trị để tạo mã QR
    rooms: [
      { name: "Phòng Standard", quantity: 2 },
      { name: "Phòng Luxury", quantity: 1 },
    ],
    totalPrice: "1.617.000đ"
  },
  {
    id: "booking_2",
    name: "BOOKING 2",
    checkInDate: "Thứ Hai, 28 tháng 4, 2025",
    checkOutDate: "Thứ Tư, 30 tháng 4, 2025",
    bookingCode: "STAY-ABC567",
    qrCodeValue: "STAY-ABC567",
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <ArrowLeft className="h-6 w-6 text-gray-800" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold text-gray-900">XÁC NHẬN ĐẶT PHÒNG</h1>
        <div className="w-10" />
      </header>

      <main className="p-4 md:p-8 max-w-4xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-8">
            <ProgressIndicator currentStep={3} steps={steps} />
        </div>

        {/* --- Thông điệp Thành công --- */}
        <div className="text-center mb-10">
            <CheckCircle className="mx-auto h-16 w-16 text-emerald-500 mb-4" strokeWidth={1.5} />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Đặt phòng thành công!</h2>
            <p className="text-gray-600">Cảm ơn bạn đã tin tưởng. Chi tiết đặt phòng đã được gửi đến email của bạn.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* --- Cột bên trái: Chi tiết các booking --- */}
            <div className="md:col-span-2 space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Chi tiết đặt phòng của bạn</h3>
                {confirmedBookings.map((booking) => (
                    <div key={booking.id} className="bg-white rounded-2xl shadow-lg border border-gray-200/80 overflow-hidden">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="text-sm font-semibold bg-gray-100 text-gray-800 px-3 py-1 rounded-full">{booking.name}</span>
                                    <p className="text-xs text-gray-500 mt-2">Mã đặt phòng:</p>
                                    <p className="text-lg font-mono font-bold text-emerald-600 tracking-wider">{booking.bookingCode}</p>
                                </div>
                                <div className="text-center">
                                     {/* Giả lập mã QR */}
                                     <div className="w-20 h-20 bg-gray-100 rounded-lg p-1">
                                        <Image 
                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${booking.qrCodeValue}`} 
                                            alt={`QR Code for ${booking.bookingCode}`}
                                            width={80}
                                            height={80}
                                            className="rounded-md"
                                        />
                                     </div>
                                     <p className="text-[10px] text-gray-500 mt-1">Quét mã để check-in</p>
                                </div>
                            </div>

                            <div className="border-t border-dashed my-4"></div>
                            
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Nhận phòng:</span>
                                    <span className="font-medium text-gray-800">{booking.checkInDate}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Trả phòng:</span>
                                    <span className="font-medium text-gray-800">{booking.checkOutDate}</span>
                                </div>
                            </div>
                            
                            <div className="mt-4 pt-4 border-t border-dashed">
                                <p className="text-sm font-semibold text-gray-800 mb-2">Các phòng đã đặt:</p>
                                <ul className="space-y-1 list-disc list-inside text-sm text-gray-700">
                                    {booking.rooms.map((room, index) => (
                                        <li key={index}>{room.name} (Số lượng: {room.quantity})</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="bg-gray-50/70 p-4 flex justify-between items-center border-t">
                            <span className="text-sm font-semibold text-gray-800">Tổng tiền</span>
                            <span className="text-lg font-bold text-gray-900">{booking.totalPrice}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- Cột bên phải: Thông tin khách hàng và Hành động --- */}
            <div className="md:col-span-1 space-y-6">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200/80 p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Thông tin liên hệ</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-3">
                            <User className="h-4 w-4 text-gray-500 flex-shrink-0" />
                            <span className="text-gray-800">{customerInfo.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="h-4 w-4 text-gray-500 flex-shrink-0" />
                            <span className="text-gray-800">{customerInfo.phone}</span>
                        </div>
                         <div className="flex items-center gap-3">
                            <Mail className="h-4 w-4 text-gray-500 flex-shrink-0" />
                            <span className="text-gray-800 break-all">{customerInfo.email}</span>
                        </div>
                    </div>
                </div>

                 <div className="space-y-3">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-base font-semibold flex items-center justify-center gap-2 h-12 shadow-lg hover:shadow-xl transition-all">
                        <Download className="h-5 w-5" />
                        Tải về hóa đơn
                    </Button>
                     <Button variant="outline" className="w-full bg-white hover:bg-gray-100 text-gray-800 py-3 rounded-xl text-base font-medium flex items-center justify-center gap-2 h-12 shadow-md">
                        <Share2 className="h-5 w-5" />
                        Chia sẻ đặt phòng
                    </Button>
                 </div>
            </div>
        </div>

        <div className="text-center mt-12">
            <Link href="/">
                <Button variant="link" className="text-gray-600 hover:text-gray-900">
                    Về trang chủ
                </Button>
            </Link>
        </div>
      </main>
    </div>
  )
}
