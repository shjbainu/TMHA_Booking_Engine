// @/components/popups/VisaPaymentPopup.tsx

"use client";

import { X, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface VisaPaymentPopupProps {
  amount: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function VisaPaymentPopup({ amount, onClose, onConfirm }: VisaPaymentPopupProps) {
  // Ngăn chặn sự kiện click lan ra overlay phía sau
  const handlePopupContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={onClose} // Đóng popup khi click vào overlay
    >
      <div
        className="bg-white rounded-xl w-full max-w-md p-5 relative"
        onClick={handlePopupContentClick}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        <h2 className="text-center font-semibold text-lg mb-4">
          THANH TOÁN BẰNG VISA/MASTER CARD
        </h2>

        <div className="bg-gray-100 border border-gray-200 rounded-lg p-3 text-center mb-5">
          <span className="text-sm">Số tiền phải thanh toán </span>
          <span className="font-bold">{amount}</span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">SỐ THẺ</label>
            <Input
              placeholder="1234 5678 9123 4567"
              className="mt-1 bg-gray-100"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">TÊN CHỦ THẺ</label>
            <Input
              placeholder="DANG VU MINH QUAN"
              className="mt-1 bg-gray-100"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700">NGÀY HẾT HẠN</label>
              <Input placeholder="MM/YYYY" className="mt-1 bg-gray-100" />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700">CVV</label>
              <Input placeholder="123" className="mt-1 bg-gray-100" />
            </div>
          </div>
        </div>

        <Button
          onClick={onConfirm}
          className="w-full bg-[#0a0a0a] hover:bg-black text-white py-6 mt-6 text-base font-semibold"
        >
          XÁC NHẬN VÀ THANH TOÁN
        </Button>

        <div className="flex justify-center items-center gap-2 mt-3 text-gray-500 text-sm">
          <Lock size={16} />
          <span>Thanh toán bảo mật và an toàn</span>
        </div>
      </div>
    </div>
  );
}
