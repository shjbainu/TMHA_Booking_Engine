"use client"

import { useState } from "react"
import { X, Lock, Copy, Download, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

// Define the component props
interface MomoPaymentPopupProps {
  isOpen: boolean
  onClose: () => void
  amount: string
}

// A reusable row for displaying payment information
const InfoRow = ({ label, value }: { label: string; value: string }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // Reset after 2 seconds
    })
  }

  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-600">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-gray-800">{value}</span>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy}>
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 text-gray-500" />
          )}
        </Button>
      </div>
    </div>
  )
}


export function MomoPaymentPopup({ isOpen, onClose, amount }: MomoPaymentPopupProps) {
  if (!isOpen) return null

  // The QR code image from your original screenshot
  const qrCodeImageUrl = "/original_image.png"

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 flex justify-center items-end z-50 transition-opacity duration-300 ease-out ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      onClick={onClose}
    >
      <div
        className={`bg-white w-full max-w-md transform transition-transform duration-300 ease-out ${isOpen ? "translate-y-0" : "translate-y-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar */}
        <div className="pt-3">
          <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-2"></div>
        </div>

        <div className="p-5 pt-2">
          {/* Header */}
          <div className="flex items-center mb-5">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-10 w-10 rounded-full flex items-center justify-center p-0 bg-gray-100 hover:bg-gray-200"
            >
              <X className="h-5 w-5 text-gray-700" />
            </Button>
            <h2 className="flex-grow text-center text-lg font-semibold text-gray-800 pr-10">
              THANH TOÁN BẰNG MOMO
            </h2>
          </div>

          {/* Amount to pay */}
          <div className="bg-gray-100 p-3 rounded-lg flex items-center mb-6 text-sm border border-gray-200">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3 shrink-0">
                <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 10H21" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-gray-700">Số tiền phải thanh toán <span className="font-semibold text-gray-800">{amount}</span></span>
          </div>

          {/* Transfer Information */}
          <div className="space-y-3 mb-6">
            <h3 className="text-base font-semibold text-gray-800 mb-2">Thông tin chuyển khoản</h3>
            <InfoRow label="Tên tài khoản" value="CTY TNHH MINOVA" />
            <InfoRow label="Nội dung" value="HOTELHANOI" />
            <InfoRow label="Ngân hàng" value="VIETCOMBANK" />
            <InfoRow label="Số tài khoản" value="19998866" />
          </div>
          
          {/* QR Code Section */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">Mở app ngân hàng để quét mã</p>
            <div className="flex justify-center mb-3">
              {/* Using the actual QR code from your image */}
              <img src={qrCodeImageUrl} alt="Momo QR Code" className="w-48 h-48 border rounded-lg" />
            </div>
            {/* Download QR button */}
            <a href={qrCodeImageUrl} download="momo-qr-code.png" className="inline-flex items-center gap-2 text-sm text-blue-600 font-medium hover:underline">
              <Download className="h-4 w-4" />
              Lưu mã QR
            </a>
          </div>

          {/* Security Message */}
          <div className="flex items-center justify-center mt-6 text-xs text-gray-500">
            <Lock className="h-3 w-3 mr-1.5" />
            <span>Thanh toán bảo mật và an toàn</span>
          </div>
        </div>
      </div>
    </div>
  )
}
