"use client"

import { X, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

interface VisaMastercardPaymentPopupProps {
  isOpen: boolean
  onClose: () => void
  amount: string
}

export default function VisaMastercardPaymentPopup({ isOpen, onClose, amount }: VisaMastercardPaymentPopupProps) {
  const router = useRouter()

  if (!isOpen) return null

  const handleConfirmPayment = async () => {
    // Simulate payment processing
    console.log("Processing payment...")
    // Here you would typically call your payment gateway API
    // For demonstration, let's assume it's successful after a short delay
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

    console.log("Payment successful! Navigating to confirmation...")
    onClose() // Close the popup
    router.push("/confirmation") // Navigate to the confirmation page
  }

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 flex justify-center items-end z-50 transition-opacity duration-300 ease-out ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      onClick={onClose} // Close on backdrop click
    >
      <div
        className={`bg-white w-full max-w-md transform transition-transform duration-300 ease-out ${isOpen ? "translate-y-0" : "translate-y-full"}`}
        onClick={(e) => e.stopPropagation()} // Prevent click propagation to backdrop
      >
        {/* Handle bar */}
        <div className="pt-3">
          <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-2"></div>
        </div>

        <div className="p-5 pt-2">
          {/* Header with close button and title */}
          <div className="flex items-center mb-5">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-10 w-10 rounded-full flex items-center justify-center p-0 bg-gray-100 hover:bg-gray-200"
            >
              <X className="h-5 w-5 text-gray-700" />
            </Button>
            <h2 className="flex-grow text-center text-[15px] font-semibold text-gray-800 pr-10">
              THANH TOÁN BẰNG VISA/MASTER CARD
            </h2>
          </div>

          {/* Amount to pay */}
          <div className="bg-gray-100 p-3 rounded-lg flex items-center mb-6 text-sm border border-gray-200">
            <div className="w-6 h-4 border-2 border-gray-400 rounded-[3px] flex flex-col items-center justify-center mr-3 shrink-0">
              <div className="w-[18px] h-[3px] bg-gray-400 mt-[1px]"></div>
              <div className="w-[14px] h-[2px] bg-gray-400 mt-[1px]"></div>
            </div>
            <span className="text-gray-700 text-[13px]">
              Số tiền phải thanh toán <span className="font-semibold text-gray-800">{amount}</span>
            </span>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardNumber" className="text-[13px] font-medium text-gray-800 mb-1 block">
                SỐ THẺ
              </Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9123 4567"
                className="bg-gray-100 border-gray-100 placeholder-gray-400 text-gray-700 focus:bg-gray-200 focus:ring-0 focus:border-gray-200 rounded-md h-11 text-[14px]"
              />
            </div>
            <div>
              <Label htmlFor="cardHolderName" className="text-[13px] font-medium text-gray-800 mb-1 block">
                TÊN CHỦ THẺ
              </Label>
              <Input
                id="cardHolderName"
                placeholder="DANG VU MINH QUAN"
                className="bg-gray-100 border-gray-100 placeholder-gray-400 text-gray-700 focus:bg-gray-200 focus:ring-0 focus:border-gray-200 rounded-md h-11 text-[14px]"
              />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <Label htmlFor="expiryDate" className="text-[13px] font-medium text-gray-800 mb-1 block">
                  NGÀY HẾT HẠN
                </Label>
                <Input
                  id="expiryDate"
                  placeholder="05/2025"
                  className="bg-gray-100 border-gray-100 placeholder-gray-400 text-gray-700 focus:bg-gray-200 focus:ring-0 focus:border-gray-200 rounded-md h-11 text-[14px]"
                />
              </div>
              <div className="w-[30%]">
                <Label htmlFor="cvv" className="text-[13px] font-medium text-gray-800 mb-1 block">
                  CVV
                </Label>
                <Input
                  id="cvv"
                  placeholder="466"
                  className="bg-gray-100 border-gray-100 placeholder-gray-400 text-gray-700 focus:bg-gray-200 focus:ring-0 focus:border-gray-200 rounded-md h-11 text-[14px]"
                />
              </div>
            </div>
          </div>

          {/* Confirm Button */}
          <Button
            className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-lg text-[15px] font-semibold mt-8 shadow-md h-12"
            onClick={handleConfirmPayment}
          >
            XÁC NHẬN VÀ THANH TOÁN
          </Button>

          {/* Security Message */}
          <div className="flex items-center justify-center mt-4 text-xs text-gray-500">
            <Lock className="h-3 w-3 mr-1.5 text-gray-500" />
            <span>Thanh toán bảo mật và an toàn</span>
          </div>
        </div>
      </div>
    </div>
  )
}
