"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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

export default function Payment() {
  const router = useRouter()
  const [customer, setCustomer] = useState({ name: "", phone: "", email: "" })
  const [selectedPayment, setSelectedPayment] = useState("visa_mastercard")
  const [timeLeft, setTimeLeft] = useState(600)
  const [activePopup, setActivePopup] = useState<string | null>(null)

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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const steps = ["Đặt phòng", "Thanh toán", "Xác nhận"]
  const totalAmount = "3.234.000đ"
  const popupAmount = "1.078.000đ"

  const handlePaymentConfirmation = () => {
    if (!selectedPayment) return alert("Vui lòng chọn phương thức thanh toán!")
    if (!customer.name || !customer.phone || !customer.email) return alert("Vui lòng điền đầy đủ thông tin khách hàng!")
    setActivePopup(selectedPayment)
  }

  const handleClosePopup = () => setActivePopup(null)

  const handleFinalizePayment = () => {
    setActivePopup(null)
    router.push("/confirmation")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white border-b border-gray-100 shadow-sm">
        <Link href="/rooms">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <ArrowLeft className="h-6 w-6 text-[#0a0a0a]" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold text-[#0a0a0a] tracking-tight">THANH TOÁN</h1>
        <div className="w-10" />
      </div>

      <div className="p-4 space-y-8 max-w-2xl mx-auto">
        <ProgressIndicator currentStep={2} steps={steps} />

        {/* Holding Message */}
        <div className="bg-gray-50 border border-gray-200 shadow-sm rounded-xl p-4 text-center">
          <p className="text-sm text-[#0a0a0a]">Chúng tôi đang giữ phòng cho bạn</p>
          <div className="inline-flex items-center gap-1 bg-white px-4 py-1.5 mt-2 rounded-lg border-2 border-dashed border-gray-400">
            <span className="text-base font-mono tracking-wider text-[#0a0a0a]">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Booking Info */}
        <section className="space-y-4">
          <h2 className="text-lg font-medium text-[#0a0a0a]">Thông tin đặt phòng</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="secondary" className="bg-[#0a0a0a] text-white">BOOKING 1</Badge>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8"><RotateCcw className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8"><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm mb-2 text-[#0a0a0a]">
              <span>25/04/2025</span>
              <span>•</span>
              <span>2 đêm</span>
              <span>•</span>
              <span>27/04/2025</span>
            </div>
            <div className="text-sm text-[#0a0a0a] space-y-1">
              <p>• Phòng Standard x2</p>
              <p>• Phòng Luxury x1</p>
            </div>
            <div className="text-right font-medium mt-4 text-[#0a0a0a]">Tổng tiền: 1.078.000đ</div>
          </div>
        </section>

        {/* Customer Info */}
        <section className="space-y-4">
          <h2 className="text-lg font-medium text-[#0a0a0a]">Thông tin khách hàng</h2>
          {["name", "phone", "email"].map((field, idx) => (
            <div key={idx}>
              <Label htmlFor={field} className="text-sm font-medium text-[#0a0a0a] capitalize">
                {field === "name" ? "Họ tên *" : field === "phone" ? "Số điện thoại *" : "Email *"}
              </Label>
              <Input
                id={field}
                placeholder={`Vui lòng nhập ${field === "name" ? "họ tên" : field === "phone" ? "số điện thoại" : "email"}`}
                value={customer[field]}
                onChange={(e) => setCustomer((prev) => ({ ...prev, [field]: e.target.value }))}
                className="mt-1 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          ))}
        </section>

        {/* Payment Summary */}
        <section className="space-y-4">
          <h2 className="text-lg font-medium text-[#0a0a0a]">Chi tiết thanh toán</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="font-medium text-[#0a0a0a] mb-3">BOOKING 1</div>
            <div className="space-y-2 text-sm text-[#0a0a0a]">
              <div className="flex justify-between"><span>Phòng Standard x2</span><span>980.000đ</span></div>
              <div className="flex justify-between"><span>Phòng Luxury x1</span><span>490.000đ</span></div>
              <div className="flex justify-between"><span>Phí VAT (10%)</span><span>147.000đ</span></div>
              <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold">
                <span>TỔNG BOOKING 1:</span><span>1.617.000đ</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between text-lg font-bold text-[#0a0a0a]">
            <span>TỔNG TIỀN THANH TOÁN</span>
            <span>{totalAmount}</span>
          </div>
        </section>

        {/* Payment Methods */}
        <section className="space-y-3">
          <h2 className="text-lg font-medium text-[#0a0a0a]">Phương thức thanh toán</h2>
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => setSelectedPayment(method.id)}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                selectedPayment === method.id ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200" : "border-gray-200 bg-white"
              }`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPayment === method.id ? "border-blue-500" : "border-gray-300"}`}>
                {selectedPayment === method.id && <div className="w-3 h-3 rounded-full bg-blue-500" />}
              </div>
              <span className="text-2xl">{method.icon}</span>
              <span className="text-sm font-medium text-[#0a0a0a]">{method.name}</span>
            </div>
          ))}
        </section>

        <div className="flex justify-between text-sm text-[#0a0a0a]">
          <span>Chính sách hủy</span>
          <span className="text-blue-600 cursor-pointer">Xem chi tiết</span>
        </div>

        <Button
          onClick={handlePaymentConfirmation}
          className="w-full bg-[#0a0a0a] hover:bg-[#000000] text-white py-3 rounded-xl text-base font-medium shadow-md hover:shadow-lg h-12"
        >
          Xác nhận & thanh toán
        </Button>
      </div>

      {activePopup === "visa_mastercard" && (
        <VisaPaymentPopup amount={popupAmount} onClose={handleClosePopup} onConfirm={handleFinalizePayment} />
      )}

      {activePopup === "momo" && (
        <MomoPaymentPopup amount={popupAmount} onClose={handleFinalizePayment} />
      )}
    </div>
  )
}
