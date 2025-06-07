"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Calendar, Lock } from "lucide-react"
import { useState } from "react"

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
      // Simulate payment processing
      alert("Thanh toán Visa/Mastercard thành công!")
      onConfirm()
    } else {
      alert("Vui lòng điền đầy đủ thông tin thẻ!")
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#0a0a0a]">Thanh toán bằng Visa/Mastercard</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Vui lòng nhập thông tin thẻ của bạn để hoàn tất thanh toán.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between text-lg font-semibold text-[#0a0a0a]">
            <span>Tổng tiền:</span>
            <span>{amount}</span>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cardNumber" className="text-sm font-medium text-[#0a0a0a]">
              Số thẻ
            </Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="cardNumber"
                placeholder="XXXX XXXX XXXX XXXX"
                className="pl-10 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                maxLength={19} // 16 digits + 3 spaces
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate" className="text-sm font-medium text-[#0a0a0a]">
                Ngày hết hạn
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  className="pl-10 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  maxLength={5}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc" className="text-sm font-medium text-[#0a0a0a]">
                CVC
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="cvc"
                  placeholder="XXX"
                  className="pl-10 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  maxLength={3}
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cardholderName" className="text-sm font-medium text-[#0a0a0a]">
              Tên chủ thẻ
            </Label>
            <Input
              id="cardholderName"
              placeholder="Tên trên thẻ"
              className="bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Hủy
          </Button>
          <Button onClick={handleConfirm} className="w-full sm:w-auto bg-[#0a0a0a] hover:bg-[#000000] text-white">
            Xác nhận thanh toán
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
