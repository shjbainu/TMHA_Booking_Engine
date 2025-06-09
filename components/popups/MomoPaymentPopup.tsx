"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Copy, Lock, X, CreditCard } from "lucide-react"
import { Label } from "@/components/ui/label"
// BƯỚC 2.1: Import component Image từ Next.js
import Image from "next/image"

// Giả sử bạn đặt ảnh trong thư mục public
// Nếu bạn đặt ở nơi khác và dùng bundler (như Webpack), bạn có thể import trực tiếp
// import momoQrCode from "../path/to/momo-qr-code.png";

interface MomoPaymentPopupProps {
  amount: string
  onClose: () => void
  onConfirm: () => void // Thêm prop onConfirm
}

export function MomoPaymentPopup({ amount, onClose, onConfirm }: MomoPaymentPopupProps) {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Đã sao chép: " + text)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0 rounded-lg shadow-lg overflow-hidden">
        <DialogHeader className="p-4 border-b border-gray-200 relative">
          <DialogTitle className="text-lg font-medium text-[#0a0a0a] text-center">THANH TOÁN BẰNG MOMO</DialogTitle>
          <Button variant="ghost" size="icon" className="absolute top-3 left-3 h-8 w-8" onClick={onClose}>
            <X className="h-5 w-5 text-gray-500" />
          </Button>
        </DialogHeader>
        <div className="p-4">
          <div className="bg-gray-200 rounded-lg p-3 flex items-center justify-center gap-2 mb-6">
            <CreditCard className="h-5 w-5 text-gray-700" />
            <span className="text-base font-medium text-[#0a0a0a]">Số tiền phải thanh toán {amount}</span>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-bold text-[#0a0a0a] uppercase mb-3">Thông tin chuyển khoản</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-sm text-gray-700">Tên tài khoản</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#0a0a0a]">CTY TNHH MINOVA</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleCopy("CTY TNHH MINOVA")}>
                    <Copy className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Label className="text-sm text-gray-700">Nội dung</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#0a0a0a]">HOTELHANOI</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleCopy("HOTELHANOI")}>
                    <Copy className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Label className="text-sm text-gray-700">Ngân hàng</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#0a0a0a]">VIETCOMBANK</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleCopy("VIETCOMBANK")}>
                    <Copy className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Label className="text-sm text-gray-700">Số tài khoản</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#0a0a0a]">1998866</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleCopy("1998866")}>
                    <Copy className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <p className="text-sm text-[#0a0a0a] mb-3">Mở app ngân hàng để quét mã</p>
            <div
              className="relative w-48 h-48 mb-4 border border-gray-200 rounded-lg overflow-hidden cursor-pointer"
              onClick={onConfirm} // Thêm onClick để chuyển trang khi click QR
            >
              {/* BƯỚC 2.2: Thay thẻ <img> bằng component <Image> của Next.js */}
              <Image
                src="/images/momo-qr-code.png" // Đường dẫn tuyệt đối từ thư mục public
                alt="Momo QR Code"
                width={192} // 48 * 4
                height={192} // 48 * 4
                className="object-contain"
              />
            </div>
            <Button variant="ghost" className="text-blue-600 text-sm font-medium">
              Lưu mã QR
            </Button>
          </div>
        </div>
        <DialogFooter className="p-4 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Lock className="h-4 w-4" />
            <span>Thanh toán bảo mật và an toàn</span>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
