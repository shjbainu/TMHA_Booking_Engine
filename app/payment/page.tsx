"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowLeft, RotateCcw, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ProgressIndicator } from "@/components/progress-indicator"
import Link from "next/link"
import { paymentMethods } from "@/lib/data"
import VisaMastercardPaymentPopup from "@/components/visa-mastercard-payment-popup" // Correct default import

export default function Payment() {
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
  })
  const [selectedPayment, setSelectedPayment] = useState("")
  const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState(false)

  const steps = ["Đặt phòng", "Thanh toán", "Xác nhận"]

  const handleOpenPaymentPopup = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsPaymentPopupOpen(true)
  }

  const handleClosePaymentPopup = () => {
    setIsPaymentPopupOpen(false)
  }

  useEffect(() => {
    if (isPaymentPopupOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isPaymentPopupOpen])

  const paymentPopupAmount = "1.078.000đ" // Or "3.324.000đ" from your total

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

      <div className="p-4">
        {/* Progress Indicator */}
        <ProgressIndicator currentStep={2} steps={steps} />

        {/* Holding Message */}
        <div className="bg-gray-50 border border-gray-200 shadow-sm rounded-lg p-4 text-center mb-6">
          <p className="text-sm text-[#0a0a0a] mb-2">Chúng tôi đang giữ phòng cho bạn</p>
          <div className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded border-2 border-dashed border-gray-400">
            <span className="text-sm font-mono">10:00</span>
          </div>
        </div>

        {/* Booking Information */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-[#0a0a0a] mb-4">Thông tin đặt phòng</h2>

          {/* Booking 1 */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-4 mb-3">
            <div className="flex items-center justify-between mb-3">
              <Badge variant="secondary" className="bg-[#0a0a0a] text-white">
                BOOKING 1
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
              <span className="bg-white px-2 py-1 rounded">25/04/2025</span>
              <span className="bg-white px-2 py-1 rounded">2 đêm</span>
              <span className="bg-white px-2 py-1 rounded">27/04/2025</span>
            </div>
            <div className="text-sm text-[#0a0a0a] space-y-1">
              <div>• Phòng Standard x2</div>
              <div>• Phòng Luxury x1</div>
            </div>
            <div className="text-right mt-2">
              <span className="font-medium">Tổng tiền: 1.078.000đ</span>
            </div>
          </div>

          {/* Booking 2 */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-4 mb-3">
            <div className="flex items-center justify-between mb-3">
              <Badge variant="secondary" className="bg-[#0a0a0a] text-white">
                BOOKING 2
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
              <span className="bg-white px-2 py-1 rounded">25/04/2025</span>
              <span className="bg-white px-2 py-1 rounded">2 đêm</span>
              <span className="bg-white px-2 py-1 rounded">27/04/2025</span>
            </div>
            <div className="text-sm text-[#0a0a0a] space-y-1">
              <div>• Phòng Standard x2</div>
              <div>• Phòng Luxury x1</div>
            </div>
            <div className="text-right mt-2">
              <span className="font-medium">Tổng tiền: 1.078.000đ</span>
            </div>
          </div>
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

          <div className="space-y-4">
            {/* Booking 1 Details */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-[#0a0a0a]">Thông tin giá</span>
                <span className="font-medium text-[#0a0a0a]">Tổng tiền</span>
              </div>
              <div className="bg-gray-50 border border-gray-200 shadow-sm p-3 rounded-lg">
                <div className="font-medium mb-2">BOOKING 1</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Phòng Standard x2</span>
                    <span>980.000đ</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phòng Luxury x1</span>
                    <span>490.000đ</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí VAT (Thuế 10%)</span>
                    <span>147.000đ</span>
                  </div>
                  <div className="flex justify-between font-medium border-t border-gray-200 pt-2">
                    <span>TỔNG BOOKING 1:</span>
                    <span>1.617.000đ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking 2 Details */}
            <div className="bg-gray-50 border border-gray-200 shadow-sm p-3 rounded-lg">
              <div className="font-medium mb-2">BOOKING 2</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Phòng Standard x2</span>
                  <span>980.000đ</span>
                </div>
                <div className="flex justify-between">
                  <span>Phòng Luxury x1</span>
                  <span>490.000đ</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí VAT (Thuế 10%)</span>
                  <span>147.000đ</span>
                </div>
                <div className="flex justify-between font-medium border-t border-gray-200 pt-2">
                  <span>TỔNG BOOKING 2:</span>
                  <span>1.617.000đ</span>
                </div>
              </div>
            </div>

            {/* Voucher */}
            <div className="flex items-center justify-between py-2 border-b border-dashed">
              <span className="text-sm">Áp dụng voucher</span>
              <span className="text-sm">0đ</span>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center text-lg font-bold">
              <span>TỔNG TIỀN THANH TOÁN (VNĐ)</span>
              <span>3.324.000đ</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-[#0a0a0a] mb-4">Phương thức thanh toán</h2>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`flex items-center gap-3 p-3 rounded-lg border shadow-sm cursor-pointer ${
                  selectedPayment === method.id ? "border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
                onClick={() => setSelectedPayment(method.id)}
              >
                <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                  {selectedPayment === method.id && <div className="w-3 h-3 rounded-full bg-blue-500" />}
                </div>
                <span className="text-2xl">{method.icon}</span>
                <span className="text-sm text-[#0a0a0a]">{method.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Policy */}
        <div className="flex justify-between items-center text-sm text-[#0a0a0a] mb-6">
          <span>Chính sách hủy</span>
          <span className="text-blue-600">Xem chi tiết</span>
        </div>

        {/* Confirm Button - Modified to open popup */}
        <Button
          onClick={handleOpenPaymentPopup}
          className="w-full bg-[#0a0a0a] hover:bg-[#000000] text-white py-3 rounded-lg text-base font-medium shadow-md hover:shadow-lg"
        >
          Xác nhận & thanh toán
        </Button>
      </div>

      {/* Render the Visa/Mastercard Payment Popup */}
      <VisaMastercardPaymentPopup
        isOpen={isPaymentPopupOpen}
        onClose={handleClosePaymentPopup}
        amount={paymentPopupAmount}
      />
    </div>
  )
}
