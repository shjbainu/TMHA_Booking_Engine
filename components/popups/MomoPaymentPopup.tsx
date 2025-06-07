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
import Image from "next/image"

interface MomoPaymentPopupProps {
  amount: string
  onClose: () => void // For Momo, onClose will also trigger navigation
}

export function MomoPaymentPopup({ amount, onClose }: MomoPaymentPopupProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-6 rounded-lg shadow-lg text-center">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#0a0a0a]">Thanh toán bằng MoMo</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Vui lòng quét mã QR dưới đây để hoàn tất thanh toán.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-4">
          <div className="text-lg font-semibold text-[#0a0a0a] mb-4">Tổng tiền: {amount}</div>
          <div className="relative w-48 h-48 mb-4 border border-gray-200 rounded-lg overflow-hidden">
            <Image
              src="/public/images/momo-qr-code.png" // Referencing the image by its file path
              alt="Momo QR Code"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <p className="text-sm text-gray-700 mb-2">Mở ứng dụng MoMo và quét mã QR này.</p>
          <p className="text-xs text-gray-500">Giao dịch sẽ tự động xác nhận sau khi quét thành công.</p>
        </div>
        <DialogFooter className="flex justify-center">
          <Button onClick={onClose} className="w-full sm:w-auto bg-[#0a0a0a] hover:bg-[#000000] text-white">
            Đã thanh toán / Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
