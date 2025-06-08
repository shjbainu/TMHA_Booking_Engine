"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Copy, Lock, X, CreditCard } from "lucide-react" // Added Copy and X
import { Label } from "@/components/ui/label"

interface MomoPaymentPopupProps {
  amount: string
  onClose: () => void
}

export function MomoPaymentPopup({ amount, onClose }: MomoPaymentPopupProps) {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Đã sao chép: " + text)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0 rounded-lg shadow-lg overflow-hidden">
        {" "}
        {/* Updated className */}
        <DialogHeader className="p-4 border-b border-gray-200 relative">
          <DialogTitle className="text-lg font-medium text-[#0a0a0a] text-center">THANH TOÁN BẰNG MOMO</DialogTitle>
          <Button variant="ghost" size="icon" className="absolute top-3 left-3 h-8 w-8" onClick={onClose}>
            <X className="h-5 w-5 text-gray-500" />
          </Button>
        </DialogHeader>
        <div className="p-4">
          {/* Amount display */}
          <div className="bg-gray-200 rounded-lg p-3 flex items-center justify-center gap-2 mb-6">
            <CreditCard className="h-5 w-5 text-gray-700" />
            <span className="text-base font-medium text-[#0a0a0a]">Số tiền phải thanh toán {amount}</span>
          </div>

          {/* Transfer Information */}
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

          {/* QR Code Section */}
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm text-[#0a0a0a] mb-3">Mở app ngân hàng để quét mã</p>
            <div className="relative w-48 h-48 mb-4 border border-gray-200 rounded-lg overflow-hidden">
              <Image src="/images/momo-qr-code.png" alt="Momo QR Code" layout="fill" objectFit="contain" />
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
