"use client"

import { useState, useEffect } from "react"
// Thêm Copy, Download, Check và các component mới
import { ArrowLeft, RotateCcw, Trash2, X, Lock } from "lucide-react" 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ProgressIndicator } from "@/components/progress-indicator"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Import dữ liệu và các popup mới
import { paymentMethods } from "@/lib/data"
import { VisaMastercardPaymentPopup } from "@/components/VisaMastercardPaymentPopup" // Giả sử bạn đã tách ra file riêng
import { MomoPaymentPopup } from "@/components/MomoPaymentPopup" // Component Momo mới

// [COMPONENTS 'VisaMastercardPaymentPopup' và 'MomoPaymentPopup' nên được đặt trong các file riêng như hướng dẫn ở trên]
// Tôi sẽ để lại component Visa ở đây để bạn dễ so sánh, nhưng khuyến khích tách file.

// ... (Component VisaMastercardPaymentPopup của bạn giữ nguyên) ...


export default function Payment() {
  const [customer, setCustomer] = useState({ name: "", phone: "", email: "" })
  const [selectedPayment, setSelectedPayment] = useState("")
  
  // Sử dụng state riêng cho mỗi popup để quản lý rõ ràng hơn
  const [isVisaPopupOpen, setIsVisaPopupOpen] = useState(false)
  const [isMomoPopupOpen, setIsMomoPopupOpen] = useState(false)

  const steps = ["Đặt phòng", "Thanh toán", "Xác nhận"]
  const totalAmountToPay = "3.324.000đ"
  // Lấy ra giá trị của booking đầu tiên cho popup Momo, theo như hình ảnh
  const momoAmount = "1.078.000đ";

  // Hàm xử lý nút thanh toán chính
  const handleConfirmAndPay = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!selectedPayment) {
      alert("Vui lòng chọn một phương thức thanh toán.");
      return;
    }

    if (selectedPayment === 'visa') {
      setIsVisaPopupOpen(true);
    } else if (selectedPayment === 'momo') {
      setIsMomoPopupOpen(true);
    } 
    // Thêm các trường hợp khác nếu cần
    // else if (selectedPayment === 'bank') { ... }
  };

  const handleClosePopups = () => {
    setIsVisaPopupOpen(false);
    setIsMomoPopupOpen(false);
  };

  // Hiệu ứng khóa scroll khi popup mở
  useEffect(() => {
    const isPopupOpen = isVisaPopupOpen || isMomoPopupOpen;
    if (isPopupOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisaPopupOpen, isMomoPopupOpen]);

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
        {/* ... (Các phần Progress, Holding Message, Booking Info, Customer Info, Payment Details không đổi) ... */}
        
        {/* Payment Methods - Cập nhật để sử dụng dữ liệu từ data.ts */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-[#0a0a0a] mb-4">Phương thức thanh toán</h2>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`flex items-center gap-3 p-3 rounded-lg border shadow-sm cursor-pointer transition-all ${
                  selectedPayment === method.id ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200" : "border-gray-200 bg-white"
                }`}
                onClick={() => setSelectedPayment(method.id)}
              >
                <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedPayment === method.id ? 'border-blue-500' : 'border-gray-300'}">
                  {selectedPayment === method.id && <div className="w-3 h-3 rounded-full bg-blue-500" />}
                </div>
                <span className="text-2xl">{method.icon}</span>
                <span className="text-sm font-medium text-[#0a0a0a]">{method.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Policy */}
        <div className="flex justify-between items-center text-sm text-[#0a0a0a] mb-6">
          <span>Chính sách hủy</span>
          <span className="text-blue-600">Xem chi tiết</span>
        </div>

        {/* Nút xác nhận - Đã cập nhật onClick */}
        <Button
          onClick={handleConfirmAndPay}
          className="w-full bg-[#0a0a0a] hover:bg-[#000000] text-white py-3 rounded-lg text-base font-medium shadow-md hover:shadow-lg transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!selectedPayment} // Vô hiệu hóa nút nếu chưa chọn phương thức
        >
          Xác nhận & thanh toán
        </Button>
      </div>

      {/* Render Cả Hai Popup */}
      {/* Chúng sẽ không bao giờ hiển thị cùng lúc vì state được quản lý riêng */}
      
      <VisaMastercardPaymentPopup
        isOpen={isVisaPopupOpen}
        onClose={handleClosePopups}
        amount={totalAmountToPay} // Visa thanh toán tổng tiền
      />

      <MomoPaymentPopup
        isOpen={isMomoPopupOpen}
        onClose={handleClosePopups}
        amount={momoAmount} // Momo thanh toán theo giá trị trong hình (bạn có thể đổi thành totalAmountToPay nếu muốn)
      />
    </div>
  )
}
