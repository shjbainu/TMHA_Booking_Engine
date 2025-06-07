// @/components/popups/MomoPaymentPopup.tsx

"use client";

import { useState } from "react";
import { X, Lock, Copy } from "lucide-react";

interface MomoPaymentPopupProps {
  amount: string;
  onClose: () => void;
}

const InfoRow = ({ label, value }: { label: string; value: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="flex justify-between items-center py-2 relative">
      <span className="text-sm text-gray-600">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-gray-800">{value}</span>
        <button onClick={handleCopy} title="Copy">
          <Copy className="h-4 w-4 text-gray-500 hover:text-blue-600" />
        </button>
      </div>
       {copied && <span className="text-xs text-green-500 absolute right-5 -bottom-3">Copied!</span>}
    </div>
  );
};


export function MomoPaymentPopup({ amount, onClose }: MomoPaymentPopupProps) {
  const handlePopupContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={onClose}
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
          THANH TOÁN BẰNG MOMO
        </h2>

        <div className="bg-gray-100 border border-gray-200 rounded-lg p-3 text-center mb-5">
          <span className="text-sm">Số tiền phải thanh toán </span>
          <span className="font-bold">{amount}</span>
        </div>
        
        <div className="mb-4 px-2">
            <h3 className="font-semibold mb-2 text-center">Thông tin chuyển khoản</h3>
            <div className="divide-y divide-gray-200">
                <InfoRow label="Tên tài khoản" value="CTY TNHH MINOVA" />
                <InfoRow label="Nội dung" value="HOTELHANOI" />
                <InfoRow label="Ngân hàng" value="VIETCOMBANK" />
                <InfoRow label="Số tài khoản" value="19998866" />
            </div>
        </div>

        <div className="text-center">
            <h3 className="font-semibold mb-2">Mở app ngân hàng để quét mã</h3>
            {/* Placeholder for QR Code Image */}
            <div className="w-48 h-48 bg-gray-200 mx-auto my-4 flex items-center justify-center rounded-lg">
                <img src="https://api.vietqr.io/image/970436-19998866-2x14x1X.jpg?accountName=CTY%20TNHH%20MINOVA&amount=1078000&addInfo=HOTELHANOI" alt="QR Code" className="w-full h-full object-cover rounded-lg"/>
            </div>
            <a href="#" className="text-sm text-blue-600 underline">Lưu mã QR</a>
        </div>

        <div className="flex justify-center items-center gap-2 mt-6 text-gray-500 text-sm">
          <Lock size={16} />
          <span>Thanh toán bảo mật và an toàn</span>
        </div>
      </div>
    </div>
  );
}
