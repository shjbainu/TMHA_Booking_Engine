"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation" // Import useRouter
import { ArrowLeft, RotateCcw, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ProgressIndicator } from "@/components/progress-indicator"
import Link from "next/link"
import { paymentMethods } from "@/lib/data"
import { VisaPaymentPopup } from "@/components/popups/VisaPaymentPopup"
import { MomoPaymentPopup } from "@/components/popups/MomoPaymentPopup"
import { CancellationPolicyDrawer } from "@/components/cancellation-policy-drawer"
import { processPayment } from "@/lib/actions/payment.action"

export default function Payment() {
  const router = useRouter() // Khởi tạo router
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
  })
  const [selectedPayment, setSelectedPayment] = useState("visa_mastercard") // Đặt giá trị mặc định nếu muốn
  const [timeLeft, setTimeLeft] = useState(600)

  const [activePopup, setActivePopup] = useState<string | null>(null)
  const [showCancellationPolicy, setShowCancellationPolicy] = useState(false) // New state

  // New states for dynamic data
  const [currentBookings, setCurrentBookings] = useState<any[]>([])
  const [totalAmount, setTotalAmount] = useState("0đ")
  const [popupAmount, setPopupAmount] = useState("0đ")

  useEffect(() => {
    if (timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  // New useEffect to load data from localStorage
  useEffect(() => {
    const storedBookings = localStorage.getItem("currentBookings")
    if (storedBookings) {
      const parsedBookings = JSON.parse(storedBookings)
      setCurrentBookings(parsedBookings)

      const overallTotal = parsedBookings.reduce((sum: number, booking: any) => sum + booking.bookingTotalPrice, 0)
      setTotalAmount(overallTotal.toLocaleString("vi-VN") + "đ")
      // For popup amount, let's just use the first booking's total for now, or adjust as needed
      if (parsedBookings.length > 0) {
        setPopupAmount(parsedBookings[0].bookingTotalPrice.toLocaleString("vi-VN") + "đ")
      }
    }
  }, []) // Run once on mount

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const steps = ["Đặt phòng", "Thanh toán", "Xác nhận"]
  const handlePaymentConfirmation = () => {
    if (!selectedPayment) {
      alert("Vui lòng chọn phương thức thanh toán!")
      return
    }
    if (!customer.name || !customer.phone || !customer.email) {
      alert("Vui lòng điền đầy đủ thông tin khách hàng!")
      return
    }

    setActivePopup(selectedPayment)
  }

  const handleClosePopup = () => {
    setActivePopup(null)
  }

  const handleFinalizePayment = () => {
    console.log("Payment confirmed, navigating to confirmation page...")
    setActivePopup(null) // Đóng popup
    router.push("/confirmation") // Chuyển trang đến trang xác nhận
  }

  // Inside your handleFinalizePayment or a new function for payment submission
  const handlePaymentSubmission = async () => {
    if (!selectedPayment || !customer.name || !customer.phone || !customer.email) {
      alert("Vui lòng điền đầy đủ thông tin khách hàng và chọn phương thức thanh toán!")
      return
    }

    // Prepare payment details from your state (currentBookings, totalAmount, customer)
    const paymentDetails = {
      amount: Number.parseFloat(totalAmount.replace(/\./g, "").replace("đ", "")), // Convert "3.234.000đ" to 3234000
      currency: "VND",
      orderId: `ORDER-${Date.now()}`, // Generate a unique order ID
      customerName: customer.name,
      customerEmail: customer.email,
      // ... other details like selected rooms, check-in/out dates
    }

    try {
      // Call the Server Action
      const result = await processPayment(paymentDetails)

      if (result && !result.success) {
        alert(`Lỗi thanh toán: ${result.message}`)
      }
      // If result.redirectUrl was returned, the Server Action would have already redirected.
      // If it's a direct success, you can navigate to confirmation here.
      if (result && result.success && !result.redirectUrl) {
        router.push("/confirmation")
      }
    } catch (error) {
      console.error("Error during payment submission:", error)
      alert("Đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại.")
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
        <Link href="/rooms">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <ArrowLeft className="h-6 w-6 text-[#0a0a0a]" />
          </Button>
        </Link>
        <h1 className="text-lg font-medium text-[#0a0a0a]">THANH TOÁN</h1>
        <div className="w-10" />
      </div>

      {/* === CODE CỦA BẠN ĐÃ ĐƯỢC SỬA LẠI (XÓA 2 KÝ TỰ THỪA) === */}
      <div className="p-4">
        {/* Progress Indicator */}
        <ProgressIndicator currentStep={2} steps={steps} />

        {/* Holding Message */}
        <div className="bg-gray-50 border border-gray-200 shadow-sm rounded-lg p-4 text-center mb-6">
          <p className="text-sm text-[#0a0a0a] mb-2">Chúng tôi đang giữ phòng cho bạn</p>
          <div className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded border-2 border-dashed border-gray-400">
            <span className="text-sm font-mono">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Booking Information */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-[#0a0a0a] mb-4">Thông tin đặt phòng</h2>
          {currentBookings.length === 0 ? (
            <p className="text-gray-600">Không có phòng nào được chọn.</p>
          ) : (
            currentBookings.map((booking, index) => (
              <div key={booking.id} className="bg-white border border-gray-200 shadow-sm rounded-lg p-4 mb-3">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="bg-[#0a0a0a] text-white">
                    BOOKING {index + 1}
                  </Badge>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm mb-2">
                  <span className="bg-white px-2 py-1 rounded">
                    {booking.checkInDate ? booking.checkInDate.split(",")[1].trim() : "N/A"}
                  </span>
                  <span className="bg-white px-2 py-1 rounded">
                    {/* Calculate nights dynamically if needed, or pass from rooms page */}
                    {booking.checkInDate && booking.checkOutDate
                      ? `${Math.ceil(Math.abs(new Date(booking.checkOutDate).getTime() - new Date(booking.checkInDate).getTime()) / (1000 * 60 * 60 * 24))} đêm`
                      : "N/A"}
                  </span>
                  <span className="bg-white px-2 py-1 rounded">
                    {booking.checkOutDate ? booking.checkOutDate.split(",")[1].trim() : "N/A"}
                  </span>
                </div>
                <div className="text-sm text-[#0a0a0a] space-y-1">
                  {booking.rooms.map((room: any) => (
                    <div key={room.id}>
                      • {room.name} x{room.quantity}
                    </div>
                  ))}
                </div>
                <div className="text-right mt-2">
                  <span className="font-medium">Tổng tiền: {booking.bookingTotalPrice.toLocaleString("vi-VN")}đ</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Customer Information */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-[#0a0a0a] mb-4">Thông tin khách hàng</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-[#0a0a0a]">
                Họ tên *
              </Label>
              <Input
                id="name"
                placeholder="Vui lòng nhập họ tên"
                value={customer.name}
                onChange={(e) => setCustomer((prev) => ({ ...prev, name: e.target.value }))}
                className="mt-1 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-[#0a0a0a]">
                Số điện thoại *
              </Label>
              <Input
                id="phone"
                placeholder="Vui lòng nhập số điện thoại"
                value={customer.phone}
                onChange={(e) => setCustomer((prev) => ({ ...prev, phone: e.target.value }))}
                className="mt-1 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-[#0a0a0a]">
                Email *
              </Label>
              <Input
                id="email"
                placeholder="Vui lòng nhập email"
                value={customer.email}
                onChange={(e) => setCustomer((prev) => ({ ...prev, email: e.target.value }))}
                className="mt-1 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-[#0a0a0a] mb-4">Chi tiết thanh toán</h2>
          {currentBookings.length === 0 ? (
            <p className="text-gray-600">Không có chi tiết thanh toán.</p>
          ) : (
            currentBookings.map((booking, index) => (
              <div key={booking.id} className="bg-gray-50 border border-gray-200 shadow-sm p-3 rounded-lg mb-3">
                <div className="font-medium mb-2">BOOKING {index + 1}</div>
                <div className="space-y-1 text-sm">
                  {booking.rooms.map((room: any) => (
                    <div key={room.id} className="flex justify-between">
                      <span>
                        {room.name} x{room.quantity}
                      </span>
                      <span>{(room.price * room.quantity).toLocaleString("vi-VN")}đ</span>
                    </div>
                  ))}
                  {/* Assuming VAT is calculated per booking or overall, for simplicity, let's add a placeholder */}
                  <div className="flex justify-between">
                    <span>Phí VAT (Thuế 10%)</span>
                    <span>{(booking.bookingTotalPrice * 0.1).toLocaleString("vi-VN")}đ</span>{" "}
                    {/* Example VAT calculation */}
                  </div>
                  <div className="flex justify-between font-medium border-t border-gray-200 pt-2">
                    <span>TỔNG BOOKING {index + 1}:</span>
                    <span>{(booking.bookingTotalPrice * 1.1).toLocaleString("vi-VN")}đ</span>{" "}
                    {/* Total with example VAT */}
                  </div>
                </div>
              </div>
            ))
          )}
          <div className="flex justify-between items-center text-lg font-bold mt-4">
            <span>TỔNG TIỀN THANH TOÁN (VNĐ)</span>
            <span>{totalAmount}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-[#0a0a0a] mb-4">Phương thức thanh toán</h2>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`flex items-center gap-3 p-3 rounded-lg border shadow-sm cursor-pointer transition-all ${
                  selectedPayment === method.id
                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                    : "border-gray-300 bg-white"
                }`}
                onClick={() => setSelectedPayment(method.id)}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                    ${selectedPayment === method.id ? "border-blue-500" : "border-gray-300"}`}
                >
                  {selectedPayment === method.id && <div className="w-3 h-3 rounded-full bg-blue-500" />}
                </div>
                <span className="text-2xl">{method.icon}</span>
                <span className="text-sm text-[#0a0a0a] font-medium">{method.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Policy */}
        <div className="flex justify-between items-center text-sm text-[#0a0a0a] mb-6">
          <span>Chính sách hủy</span>
          <span className="text-blue-600 cursor-pointer" onClick={() => setShowCancellationPolicy(true)}>
            Xem chi tiết
          </span>
        </div>

        <Button
          onClick={handlePaymentSubmission}
          className="w-full bg-[#0a0a0a] hover:bg-[#000000] text-white py-3 rounded-lg text-base font-medium shadow-md hover:shadow-lg h-12"
        >
          Xác nhận & thanh toán
        </Button>
      </div>

      {/* Render Popups có điều kiện */}
      {activePopup === "visa_mastercard" && (
        <VisaPaymentPopup amount={popupAmount} onClose={handleClosePopup} onConfirm={handleFinalizePayment} />
      )}

      {activePopup === "momo" && (
        <MomoPaymentPopup
          amount={popupAmount}
          onClose={handleClosePopup} // Thay đổi để chỉ đóng popup
          onConfirm={handleFinalizePayment} // Thêm prop onConfirm để xử lý chuyển trang
        />
      )}

      {showCancellationPolicy && ( // New conditional render
        <CancellationPolicyDrawer isOpen={showCancellationPolicy} onClose={() => setShowCancellationPolicy(false)} />
      )}
    </div>
  )
}
