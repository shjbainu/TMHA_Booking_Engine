"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, RotateCcw, Trash2, ShieldCheck, CalendarRange, BedDouble } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ProgressIndicator } from "@/components/progress-indicator"
import Link from "next/link"
import { paymentMethods } from "@/lib/data"
import { VisaPaymentPopup } from "@/components/popups/VisaPaymentPopup"
import { MomoPaymentPopup } from "@/components/popups/MomoPaymentPopup"

export default function Payment() {
  const router = useRouter(); 
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [selectedPayment, setSelectedPayment] = useState("visa_mastercard")
  const [timeLeft, setTimeLeft] = useState(600)
  const [activePopup, setActivePopup] = useState<string | null>(null);

  useEffect(() => {
    if (timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const steps = ["Đặt phòng", "Thanh toán", "Xác nhận"]
  const totalAmount = "1.617.000đ";
  const popupAmount = "1.617.000đ";

  const handlePaymentConfirmation = () => {
    if (!selectedPayment) {
      alert("Vui lòng chọn phương thức thanh toán!");
      return;
    }
    if (!customer.name || !customer.phone || !customer.email) {
      alert("Vui lòng điền đầy đủ thông tin khách hàng!");
      return;
    }
    setActivePopup(selectedPayment);
  };

  const handleClosePopup = () => {
    setActivePopup(null);
  };
  
  const handleFinalizePayment = () => {
      console.log("Payment confirmed, navigating to confirmation page...");
      setActivePopup(null);
      router.push('/confirmation');
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1542314831-068cd1dbb563?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
      }}
    >
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between p-4 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <Link href="/rooms">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <ArrowLeft className="h-6 w-6 text-[#0a0a0a]" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold text-[#0a0a0a]">THANH TOÁN</h1>
        <div className="w-10" />
      </header>

      <main className="p-4 lg:p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
          
          {/* Cột chính (trái) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Indicator */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6">
              <ProgressIndicator currentStep={2} steps={steps} />
            </div>

            {/* Thông báo giữ phòng */}
            <div className="bg-yellow-100/80 backdrop-blur-md border border-yellow-400/50 shadow-lg rounded-2xl p-6 text-center">
              <p className="text-lg font-semibold text-yellow-900 mb-3">Chúng tôi đang giữ phòng cho bạn</p>
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg border-2 border-dashed border-yellow-500 shadow-inner">
                <span className="text-2xl font-mono text-yellow-900 tracking-wider">{formatTime(timeLeft)}</span>
              </div>
              <p className="text-xs text-yellow-800 mt-2">Vui lòng hoàn tất thanh toán trước khi hết thời gian.</p>
            </div>
            
            {/* Thông tin khách hàng */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 space-y-6">
                <h2 className="text-xl font-bold text-[#0a0a0a]">Thông tin người liên hệ</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="name" className="text-sm font-medium text-gray-700">Họ và tên *</Label>
                        <Input id="name" placeholder="Ví dụ: Nguyễn Văn A" value={customer.name} onChange={(e) => setCustomer((prev) => ({ ...prev, name: e.target.value }))} className="mt-1 h-12 bg-white/50" />
                    </div>
                    <div>
                        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Số điện thoại *</Label>
                        <Input id="phone" placeholder="Để chúng tôi liên hệ khi cần" value={customer.phone} onChange={(e) => setCustomer((prev) => ({ ...prev, phone: e.target.value }))} className="mt-1 h-12 bg-white/50" />
                    </div>
                </div>
                <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email *</Label>
                    <Input id="email" type="email" placeholder="Để nhận xác nhận đặt phòng" value={customer.email} onChange={(e) => setCustomer((prev) => ({ ...prev, email: e.target.value }))} className="mt-1 h-12 bg-white/50" />
                </div>
            </div>

             {/* Phương thức thanh toán */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 space-y-4">
              <h2 className="text-xl font-bold text-[#0a0a0a]">Chọn phương thức thanh toán</h2>
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.02] ${
                    selectedPayment === method.id 
                    ? "border-blue-500 bg-blue-50/50 ring-2 ring-blue-500/50" 
                    : "border-transparent bg-white/50"
                  }`}
                  onClick={() => setSelectedPayment(method.id)}
                >
                  <span className="text-3xl">{method.icon}</span>
                  <div className="flex-1">
                    <span className="text-base text-[#0a0a0a] font-semibold">{method.name}</span>
                    <p className="text-xs text-gray-500">{method.description}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                    ${selectedPayment === method.id ? 'bg-blue-500 border-blue-500' : 'bg-gray-200 border-gray-300'}`}
                  >
                    {selectedPayment === method.id && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cột tóm tắt (phải) */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-8">
              {/* Tóm tắt đơn hàng */}
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-[#0a0a0a] mb-4 border-b pb-3">Tóm tắt đơn hàng</h2>
                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center gap-2"><CalendarRange className="h-4 w-4"/> Ngày</span>
                    <span className="font-medium">25/04 - 27/04/2025 (2 đêm)</span>
                  </div>
                   <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center gap-2"><BedDouble className="h-4 w-4"/> Phòng</span>
                    <span className="font-medium">2 phòng</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tiền phòng</span>
                      <span>1.470.000đ</span>
                    </div>
                     <div className="flex justify-between">
                      <span className="text-gray-600">Thuế và phí</span>
                      <span>147.000đ</span>
                    </div>
                </div>
                
                <div className="mt-4 pt-4 border-t flex justify-between items-baseline">
                  <span className="text-base font-semibold text-gray-700">Tổng cộng</span>
                  <span className="text-2xl font-bold text-blue-600">{totalAmount}</span>
                </div>
              </div>
              
              {/* Nút thanh toán */}
              <div className="space-y-3">
                 <Button
                    onClick={handlePaymentConfirmation}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl h-14 transition-all duration-300 transform hover:-translate-y-1"
                >
                    Thanh toán ngay
                </Button>
                <div className="text-xs text-center text-gray-500 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="h-3 w-3 text-green-600" />
                    <span>Thanh toán an toàn và bảo mật 100%</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Popups */}
      {activePopup === 'visa_mastercard' && (
        <VisaPaymentPopup
          amount={popupAmount}
          onClose={handleClosePopup}
          onConfirm={handleFinalizePayment}
        />
      )}

      {activePopup === 'momo' && (
        <MomoPaymentPopup
          amount={popupAmount}
          onClose={handleFinalizePayment} 
        />
      )}
    </div>
  )
}
