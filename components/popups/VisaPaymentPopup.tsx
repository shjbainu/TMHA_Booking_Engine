"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock } from "lucide-react"
import { useState } from "react"
import { X } from "lucide-react"

interface VisaPaymentPopupProps {
  amount: string
  onClose: () => void
  onConfirm: () => void
}

export function VisaPaymentPopup({ amount, onClose, onConfirm }: VisaPaymentPopupProps) {
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvc, setCvc] = useState("")
  const [cardholderName, setCardholderName] = useState("")

  const handleConfirm = () => {
    if (cardNumber && expiryDate && cvc && cardholderName) {
      alert("Thanh toán Visa/Mastercard thành công!")
      onConfirm()
    } else {
      alert("Vui lòng điền đầy đủ thông tin thẻ!")
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0 rounded-lg shadow-lg overflow-hidden">
        <DialogHeader className="p-4 border-b border-gray-200 relative">
          <DialogTitle className="text-lg font-medium text-[#0a0a0a] text-center">
            THANH TOÁN BẰNG VISA/MASTER CARD
          </DialogTitle>
          <Button variant="ghost" size="icon" className="absolute top-3 left-3 h-8 w-8" onClick={onClose}>
            <X className="h-5 w-5 text-gray-500" />
          </Button>
        </DialogHeader>
        <div className="p-4">
          {/* Amount display */}
          <div className="bg-gray-200 rounded-lg p-3 flex items-center justify-center gap-2 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-credit-card h-5 w-5 text-gray-700"
            >
              <rect width="22" height="16" x="1" y="4" rx="2" ry="2" />
              <line x1="1" x2="23" y1="10" y2="10" />
              <line x1="7" x2="7" y1="14" y2="18" />
              <line x1="11" x2="11" y1="14" y2="18" />
            </svg>
            <span className="text-base font-medium text-[#0a0a0a]">Số tiền phải thanh toán {amount}</span>
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber" className="text-sm font-bold text-[#0a0a0a] uppercase">
                Số thẻ
              </Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9123 4567"
                className="bg-gray-200 border-none focus:ring-0 focus:border-transparent text-base font-medium placeholder:text-gray-500 h-12 px-4"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                maxLength={19}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardholderName" className="text-sm font-bold text-[#0a0a0a] uppercase">
                Tên chủ thẻ
              </Label>
              <Input
                id="cardholderName"
                placeholder="DANG VU MINH QUAN"
                className="bg-gray-200 border-none focus:ring-0 focus:border-transparent text-base font-medium placeholder:text-gray-500 h-12 px-4"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate" className="text-sm font-bold text-[#0a0a0a] uppercase">
                  Ngày hết hạn
                </Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  className="bg-gray-200 border-none focus:ring-0 focus:border-transparent text-base font-medium placeholder:text-gray-500 h-12 px-4"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  maxLength={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc" className="text-sm font-bold text-[#0a0a0a] uppercase">
                  CVV
                </Label>
                <Input
                  id="cvc"
                  placeholder="XXX"
                  className="bg-gray-200 border-none focus:ring-0 focus:border-transparent text-base font-medium placeholder:text-gray-500 h-12 px-4"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  maxLength={3}
                />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="p-4 flex flex-col items-center gap-4">
          <Button
            onClick={handleConfirm}
            className="w-full bg-[#0a0a0a] hover:bg-[#000000] text-white py-3 rounded-lg text-base font-medium shadow-md hover:shadow-lg h-12"
          >
            XÁC NHẬN VÀ THANH TOÁN
          </Button>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Lock className="h-4 w-4" />
            <span>Thanh toán bảo mật và an toàn</span>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
