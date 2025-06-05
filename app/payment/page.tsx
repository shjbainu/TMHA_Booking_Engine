"use client"

import { useState, useEffect } from "react" // Added useEffect
import { ArrowLeft, RotateCcw, Trash2, X, CreditCard, Lock } from "lucide-react" // Added X, CreditCard, Lock
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ProgressIndicator } from "@/components/progress-indicator"
import Link from "next/link" // Link is still used elsewhere
import { paymentMethods } from "@/lib/data"

// Define the new VisaMastercardPaymentPopup component
interface VisaMastercardPaymentPopupProps {
  isOpen: boolean;
  onClose: () => void;
  amount: string;
}

function VisaMastercardPaymentPopup({ isOpen, onClose, amount }: VisaMastercardPaymentPopupProps) {
  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-60 flex justify-center items-end z-50 transition-opacity duration-300 ease-out ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      onClick={onClose} // Close on backdrop click
    >
      <div
        className={`bg-white w-full max-w-md transform transition-transform duration-300 ease-out ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
        onClick={(e) => e.stopPropagation()} // Prevent click propagation to backdrop
      >
        {/* Handle bar */}
        <div className="pt-3"> {/* Added padding top for the handle bar space */}
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-2"></div>
        </div>

        <div className="p-5 pt-2"> {/* Main content padding */}
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
                <h2 className="flex-grow text-center text-[15px] font-semibold text-gray-800 pr-10"> {/* Adjusted pr to better center title */}
                    THANH TOÁN BẰNG VISA/MASTER CARD
                </h2>
            </div>

            {/* Amount to pay */}
            <div className="bg-gray-100 p-3 rounded-lg flex items-center mb-6 text-sm border border-gray-200">
              {/* Custom icon similar to image */}
              <div className="w-6 h-4 border-2 border-gray-400 rounded-[3px] flex flex-col items-center justify-center mr-3 shrink-0">
                <div className="w-[18px] h-[3px] bg-gray-400 mt-[1px]"></div>
                <div className="w-[14px] h-[2px] bg-gray-400 mt-[1px]"></div>
              </div>
              <span className="text-gray-700 text-[13px]">Số tiền phải thanh toán <span className="font-semibold text-gray-800">{amount}</span></span>
            </div>

            {/* Form */}
            <div className="space-y-4">
                <div>
                    <Label htmlFor="cardNumber" className="text-[13px] font-medium text-gray-800 mb-1 block">SỐ THẺ</Label>
                    <Input
                        id="cardNumber"
                        placeholder="1234 5678 9123 4567"
                        className="bg-gray-100 border-gray-100 placeholder-gray-400 text-gray-700 focus:bg-gray-200 focus:ring-0 focus:border-gray-200 rounded-md h-11 text-[14px]"
                    />
                </div>
                <div>
                    <Label htmlFor="cardHolderName" className="text-[13px] font-medium text-gray-800 mb-1 block">TÊN CHỦ THẺ</Label>
                    <Input
                        id="cardHolderName"
                        placeholder="DANG VU MINH QUAN"
                        className="bg-gray-100 border-gray-100 placeholder-gray-400 text-gray-700 focus:bg-gray-200 focus:ring-0 focus:border-gray-200 rounded-md h-11 text-[14px]"
                    />
                </div>
                <div className="flex gap-3">
                    <div className="flex-1">
                        <Label htmlFor="expiryDate" className="text-[13px] font-medium text-gray-800 mb-1 block">NGÀY HẾT HẠN</Label>
                        <Input
                            id="expiryDate"
                            placeholder="05/2025"
                            className="bg-gray-100 border-gray-100 placeholder-gray-400 text-gray-700 focus:bg-gray-200 focus:ring-0 focus:border-gray-200 rounded-md h-11 text-[14px]"
                        />
                    </div>
                    <div className="w-[30%]">
                        <Label htmlFor="cvv" className="text-[13px] font-medium text-gray-800 mb-1 block">CVV</Label>
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
              onClick={() => {
                // Handle actual payment submission here
                console.log("Payment submitted");
                onClose(); // Close popup after submission for now
                // Potentially navigate to confirmation page after successful payment
              }}
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
  );
}


export default function Payment() {
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
  })
  const [selectedPayment, setSelectedPayment] = useState("")
  const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState(false); // State for popup

  const steps = ["Đặt phòng", "Thanh toán", "Xác nhận"]

  const handleOpenPaymentPopup = (e: React.MouseEvent) => {
    e.preventDefault(); 
    setIsPaymentPopupOpen(true);
  };

  const handleClosePaymentPopup = () => {
    setIsPaymentPopupOpen(false);
  };

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isPaymentPopupOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px'; // Adjust if scrollbar causes layout shift
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [isPaymentPopupOpen]);


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
        {/* Progress Indicator */}
        <ProgressIndicator currentStep={2} steps={steps} />

        {/* Holding Message */}
        <div className="bg-gray-50 border border-gray-200 shadow-sm rounded-lg p-4 text-center mb-6">
          <p className="text-sm text-[#0a0a0a] mb-2">Chúng tôi đang giữ phòng cho bạn</p>
          <div className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded border-2 border-dashed border-gray-400">
            <span className="text-sm font-mono">10:00</span>
          </div>
        </div>

        {/* Booking Information */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-[#0a0a0a] mb-4">Thông tin đặt phòng</h2>

          {/* Booking 1 */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-4 mb-3">
            <div className="flex items-center justify-between mb-3">
              <Badge variant="secondary" className="bg-[#0a0a0a] text-white">
                BOOKING 1
              </Badge>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm mb-2">
              <span className="bg-white px-2 py-1 rounded">25/04/2025</span>
              <span className="bg-white px-2 py-1 rounded">2 đêm</span>
              <span className="bg-white px-2 py-1 rounded">27/04/2025</span>
            </div>
            <div className="text-sm text-[#0a0a0a] space-y-1">
              <div>• Phòng Standard x2</div>
              <div>• Phòng Luxury x1</div>
            </div>
            <div className="text-right mt-2">
              <span className="font-medium">Tổng tiền: 1.078.000đ</span>
            </div>
          </div>

          {/* Booking 2 */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-4 mb-3">
            <div className="flex items-center justify-between mb-3">
              <Badge variant="secondary" className="bg-[#0a0a0a] text-white">
                BOOKING 2
              </Badge>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm mb-2">
              <span className="bg-white px-2 py-1 rounded">25/04/2025</span>
              <span className="bg-white px-2 py-1 rounded">2 đêm</span>
              <span className="bg-white px-2 py-1 rounded">27/04/2025</span>
            </div>
            <div className="text-sm text-[#0a0a0a] space-y-1">
              <div>• Phòng Standard x2</div>
              <div>• Phòng Luxury x1</div>
            </div>
            <div className="text-right mt-2">
              <span className="font-medium">Tổng tiền: 1.078.000đ</span>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-[#0a0a0a] mb-4">Thông tin khách hàng</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-[#0a0a0a]">
                Họ tên *
              </Label>
              <Input
                id="name"
                placeholder="Vui lòng nhập họ tên"
                value={customer.name}
                onChange={(e) => setCustomer((prev) => ({ ...prev, name: e.target.value }))}
                className="mt-1 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-[#0a0a0a]">
                Số điện thoại *
              </Label>
              <Input
                id="phone"
                placeholder="Vui lòng nhập số điện thoại"
                value={customer.phone}
                onChange={(e) => setCustomer((prev) => ({ ...prev, phone: e.target.value }))}
                className="mt-1 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-[#0a0a0a]">
                Email *
              </Label>
              <Input
                id="email"
                placeholder="Vui lòng nhập email"
                value={customer.email}
                onChange={(e) => setCustomer((prev) => ({ ...prev, email: e.target.value }))}
                className="mt-1 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-[#0a0a0a] mb-4">Chi tiết thanh toán</h2>

          <div className="space-y-4">
            {/* Booking 1 Details */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-[#0a0a0a]">Thông tin giá</span>
                <span className="font-medium text-[#0a0a0a]">Tổng tiền</span>
              </div>
              <div className="bg-gray-50 border border-gray-200 shadow-sm p-3 rounded-lg">
                <div className="font-medium mb-2">BOOKING 1</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Phòng Standard x2</span>
                    <span>980.000đ</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phòng Luxury x1</span>
                    <span>490.000đ</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí VAT (Thuế 10%)</span>
                    <span>147.000đ</span>
                  </div>
                  <div className="flex justify-between font-medium border-t border-gray-200 pt-2">
                    <span>TỔNG BOOKING 1:</span>
                    <span>1.617.000đ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking 2 Details */}
            <div className="bg-gray-50 border border-gray-200 shadow-sm p-3 rounded-lg">
              <div className="font-medium mb-2">BOOKING 2</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Phòng Standard x2</span>
                  <span>980.000đ</span>
                </div>
                <div className="flex justify-between">
                  <span>Phòng Luxury x1</span>
                  <span>490.000đ</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí VAT (Thuế 10%)</span>
                  <span>147.000đ</span>
                </div>
                <div className="flex justify-between font-medium border-t border-gray-200 pt-2">
                  <span>TỔNG BOOKING 2:</span>
                  <span>1.617.000đ</span>
                </div>
              </div>
            </div>

            {/* Voucher */}
            <div className="flex items-center justify-between py-2 border-b border-dashed">
              <span className="text-sm">Áp dụng voucher</span>
              <span className="text-sm">0đ</span>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center text-lg font-bold">
              <span>TỔNG TIỀN THANH TOÁN (VNĐ)</span>
              <span>3.324.000đ</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-[#0a0a0a] mb-4">Phương thức thanh toán</h2>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`flex items-center gap-3 p-3 rounded-lg border shadow-sm cursor-pointer ${
                  selectedPayment === method.id ? "border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
                onClick={() => setSelectedPayment(method.id)}
              >
                <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                  {selectedPayment === method.id && <div className="w-3 h-3 rounded-full bg-blue-500" />}
                </div>
                <span className="text-2xl">{method.icon}</span>
                <span className="text-sm text-[#0a0a0a]">{method.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Policy */}
        <div className="flex justify-between items-center text-sm text-[#0a0a0a] mb-6">
          <span>Chính sách hủy</span>
          <span className="text-blue-600">Xem chi tiết</span>
        </div>

        {/* Confirm Button - Modified to open popup */}
        <Button 
          onClick={handleOpenPaymentPopup}
          className="w-full bg-[#0a0a0a] hover:bg-[#000000] text-white py-3 rounded-lg text-base font-medium shadow-md hover:shadow-lg"
        >
          Xác nhận & thanh toán
        </Button>
      </div>

      {/* Render the Visa/Mastercard Payment Popup */}
      <VisaMastercardPaymentPopup
        isOpen={isPaymentPopupOpen}
        onClose={handleClosePaymentPopup}
        amount="1.078.000đ" // Amount as shown in the popup image
      />
    </div>
  )
}
