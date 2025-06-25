// @/app/confirmation/page.tsx

"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Download, CheckCircle, User, Phone, Mail, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import  ProgressIndicator  from "@/components/progress-indicator"
import Link from "next/link"

export default function PaymentConfirmation() {
  const steps = ["Đặt phòng", "Thanh toán", "Xác nhận"]
  const [bookingCode, setbookingCode] = useState<string | null>(null)
  const [bookings, setBookings] = useState<any[]>([])
  const [customer, setCustomer] = useState({
    name: "Đang tải...",
    phone: "Đang tải...",
    email: "Đang tải...",
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const confirmedDataString = sessionStorage.getItem('confirmedBookingData');
      if (confirmedDataString) {
        try {
          const confirmedData = JSON.parse(confirmedDataString);
          
          setBookings(confirmedData.bookings);
          setCustomer(confirmedData.customer);
          setbookingCode(confirmedData.bookingCode || null);
        } catch (error) {
            console.error("Lỗi khi đọc dữ liệu booking:", error);
        }
      }
    }
  }, []);


  return (
    <div className="min-h-screen bg-gray-50">
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
        <div className="mb-8">
            <ProgressIndicator currentStep={3} steps={steps} />
        </div>

        <div className="text-center mb-10">
            <CheckCircle className="mx-auto h-16 w-16 text-emerald-500 mb-4" strokeWidth={1.5} />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Đặt phòng thành công!</h2>
            <p className="text-gray-600">Cảm ơn bạn đã tin tưởng. Chi tiết đặt phòng đã được gửi đến email của bạn.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Chi tiết đặt phòng của bạn</h3>
            {bookingCode && (
    <div className="text-lg font-semibold text-black-700 mb-2">
      Mã đơn đặt phòng: {bookingCode}
    </div>
  )}
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <div key={booking.id} className="bg-white rounded-2xl shadow-lg border border-gray-200/80 overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-semibold bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
                        BOOKING {index + 1}
                      </span>
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
                      <div className="flex justify-between">
                        <span className="text-gray-500">Số đêm:</span>
                        <span className="font-medium text-gray-800">
                          {(() => {
                            const parseDate = (str: string) => {
                              const match = str.match(/(\d{2}\/\d{2}\/\d{4})/)
                              if (!match) return null
                              const [day, month, year] = match[1].split("/")
                              return new Date(Number(year), Number(month) - 1, Number(day))
                            }
                            const inDate = booking.checkInDate ? parseDate(booking.checkInDate) : null
                            const outDate = booking.checkOutDate ? parseDate(booking.checkOutDate) : null
                            if (!inDate || !outDate) return "N/A"
                            const diff = Math.round((outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60 * 24))
                            return `${diff > 0 ? diff : 1} đêm`
                          })()}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-dashed">
                      {booking.rooms.map((room: any) => (
                        <div key={room.id} className="mb-1">
                          <div className="flex justify-between">
                            <span>
                              {room.name} x{room.quantity}
                            </span>
                            <span>
                              {room.roomTotalPrice
                                ? room.roomTotalPrice.toLocaleString("vi-VN") + "đ"
                                : ""}
                            </span>
                          </div>
                          <div className="ml-4 text-xs text-gray-600 space-y-0.5">
                            {room.policies?.breakfast && <div>- {room.policies.breakfast}</div>}
                            {room.policies?.cancellation && <div>- {room.policies.cancellation}</div>}
                            {room.policies?.bedType && <div>- {room.policies.bedType}</div>}
                          </div>
                        </div>
                      ))}
                      <div className="text-right mt-2">
                        <span className="font-medium">
                          Tổng tiền: {booking.bookingTotalPrice?.toLocaleString("vi-VN")}đ
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">Không có thông tin đặt phòng.</div>
            )}
          </div>

          <div className="md:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200/80 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Thông tin liên hệ</h3>
                  <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3">
                          <User className="h-4 w-4 text-gray-500 flex-shrink-0" />
                          <span className="text-gray-800">{customer.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-gray-500 flex-shrink-0" />
                          <span className="text-gray-800">{customer.phone}</span>
                      </div>
                       <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-gray-500 flex-shrink-0" />
                          <span className="text-gray-800 break-all">{customer.email}</span>
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