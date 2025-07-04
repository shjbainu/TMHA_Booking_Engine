"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation" // Import useRouter
import { ArrowLeft, RotateCcw, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import  ProgressIndicator  from "@/components/progress-indicator"
import Link from "next/link"
import { paymentMethods } from "@/lib/data"
import { VisaPaymentPopup } from "@/components/popups/VisaPaymentPopup"
import { MomoPaymentPopup } from "@/components/popups/MomoPaymentPopup"
import  CancellationPolicyDrawer  from "@/components/cancellation-policy-drawer"
import { sendBookingConfirmationEmail } from "@/app/actions/send-booking-email";

export default function Payment() {
  const router = useRouter() // Khởi tạo router
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
  })
  const [selectedPayment, setSelectedPayment] = useState("visa_mastercard") // Đặt giá trị mặc định nếu muốn
  const [timeLeft, setTimeLeft] = useState(600)

  const [activePopup, setActivePopup] = useState<string | null>(null)
  const [showCancellationPolicy, setShowCancellationPolicy] = useState(false) // New state

  // New states for dynamic data
  const [currentBookings, setCurrentBookings] = useState<any[]>([])
  const [totalAmount, setTotalAmount] = useState("0đ")
  const [popupAmount, setPopupAmount] = useState("0đ")
  const [isProcessing, setIsProcessing] = useState(false)
  const [sepayData, setSepayData] = useState<any>(null)
  const [showSepayPopup, setShowSepayPopup] = useState(false)
  const [showCopyToast, setShowCopyToast] = useState("");

  const pollingRef = useRef<NodeJS.Timeout | null>(null);

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

  // New useEffect to load data from localStorage
  useEffect(() => {
    const storedBookings = localStorage.getItem("currentBookings")
    if (storedBookings) {
      const parsedBookings = JSON.parse(storedBookings)
      setCurrentBookings(parsedBookings)

      const overallTotal = parsedBookings.reduce((sum: number, booking: any) => sum + booking.bookingTotalPrice, 0)
      setTotalAmount(overallTotal.toLocaleString("vi-VN") + "đ")
      // For popup amount, let's just use the first booking's total for now, or adjust as needed
      if (parsedBookings.length > 0) {
        setPopupAmount(parsedBookings[0].bookingTotalPrice.toLocaleString("vi-VN") + "đ")
      }
    }
  }, []) // Run once on mount

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const steps = ["Đặt phòng", "Thanh toán", "Xác nhận"]

// Hàm sinh mã bookingCode 6 số ngẫu nhiên
const generateBookingCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6 chữ số ngẫu nhiên
};

const handlePaymentConfirmation = async () => {
  if (!customer.name || !customer.phone || !customer.email) {
    alert("Vui lòng điền đầy đủ thông tin khách hàng!");
    return;
  }
  setIsProcessing(true);

  // Sinh bookingCode 6 số
  const bookingCode = generateBookingCode();

  if (selectedPayment === "bank_transfer") {
    // Gọi API tạo đơn SePay
    const numericAmount = Number(totalAmount.replace(/[^\d]/g, ""));

    const res = await fetch("/api/sepay-create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: numericAmount,
        orders_id: bookingCode,
        customer, // THÊM DÒNG NÀY
        description: "Thanh toán đặt phòng"
      }),
    });
    const data = await res.json();
    setSepayData(data);
    setShowSepayPopup(true);
    // Lưu bookingCode vào state/sessionStorage nếu cần dùng ở màn confirm
    // setBookingCode(bookingCode); // Removed because setBookingCode is not defined
    return;
  }

  // Xử lý cho thẻ tín dụng (visa_mastercard)
  try {
    // Đảm bảo không có mã bookingCode nào bị trùng trong sessionStorage
    let usedCodes: string[] = [];
    const storedCodes = sessionStorage.getItem("usedBookingCodes");
    if (storedCodes) {
      usedCodes = JSON.parse(storedCodes);
    }
    let uniqueBookingCode = bookingCode;
    while (usedCodes.includes(uniqueBookingCode)) {
      uniqueBookingCode = generateBookingCode();
    }
    usedCodes.push(uniqueBookingCode);
    sessionStorage.setItem("usedBookingCodes", JSON.stringify(usedCodes));
    // Gắn bookingCode vào từng booking con
    const bookingsWithCode = currentBookings.map(b => ({
      ...b,
      bookingCode,
    }));

    // Gửi email, truyền thêm bookingCode
    const result = await sendBookingConfirmationEmail(customer, bookingsWithCode, bookingCode);
    if (result?.error) {
      alert("Gửi email thất bại: " + result.error);
      setIsProcessing(false);
      return;
    }
    // Lưu dữ liệu booking, khách hàng và bookingCode vào sessionStorage
    sessionStorage.setItem(
      "confirmedBookingData",
      JSON.stringify({
        bookings: bookingsWithCode,
        customer,
        bookingCode,
      })
    );
    router.push("/confirmation");
  } catch (error) {
    alert("Có lỗi xảy ra khi gửi email!");
    setIsProcessing(false);
  }
  setIsProcessing(false);
};

  useEffect(() => {
    // Chỉ polling khi đang show popup chuyển khoản và đã có bookingCode
    if (showSepayPopup && sepayData?.transfer_content) {
      const orderId = sepayData.transfer_content.replace("DH", "");
      pollingRef.current = setInterval(async () => {
        const res = await fetch(`/api/payment-status?order_id=${orderId}`);
        const data = await res.json();
        if (
          data.status === "Paid" ||
          (Array.isArray(data.status) && data.status.includes("Paid"))
        ) {
          clearInterval(pollingRef.current!);
          // Lưu thông tin vào sessionStorage nếu cần
          sessionStorage.setItem(
            "confirmedBookingData",
            JSON.stringify({
              bookings: currentBookings,
              customer,
              bookingCode: orderId,
              paymentResult: {
                method: "bank_transfer",
                status: "success",
                sepayInfo: sepayData,
              },
            })
          );
          router.push("/confirmation");
        }
      }, 5000); // Kiểm tra mỗi 5 giây
      return () => clearInterval(pollingRef.current!);
    }
  }, [showSepayPopup, sepayData]);

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

      {/* === CODE CỦA BẠN ĐÃ ĐƯỢC SỬA LẠI (XÓA 2 KÝ TỰ THỪA) === */}
      <div className="p-4">
        {/* Progress Indicator */}
        <ProgressIndicator currentStep={2} steps={steps} />

        {/* Holding Message */}
        <div className="bg-gray-50 border border-gray-200 shadow-sm rounded-lg p-4 text-center mb-6">
          <p className="text-sm text-[#0a0a0a] mb-2">Chúng tôi đang giữ phòng cho bạn</p>
          <div className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded border-2 border-dashed border-gray-400">
            <span className="text-sm font-mono">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Booking Information */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-[#0a0a0a] mb-4">Thông tin đặt phòng</h2>
          {currentBookings.length === 0 ? (
            <p className="text-gray-600">Không có phòng nào được chọn.</p>
          ) : (
            currentBookings.map((booking, index) => (
              <div key={booking.id} className="bg-white border border-gray-200 shadow-sm rounded-lg p-4 mb-3">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="bg-[#0a0a0a] text-white">
                    BOOKING {index + 1}
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
                  <span className="bg-white px-2 py-1 rounded">
                    {booking.checkInDate ? booking.checkInDate.split(",")[1].trim() : "N/A"}
                  </span>
                  <span className="bg-white px-2 py-1 rounded">
                    {/* Calculate nights dynamically if needed, or pass from rooms page */}
                    {booking.checkInDate && booking.checkOutDate
                      ? (() => {
    // Lấy phần ngày/tháng/năm từ chuỗi, ví dụ: "Thứ sáu, 25/04/2025" => "25/04/2025"
    const parseDate = (str: string) => {
      const match = str.match(/(\d{2}\/\d{2}\/\d{4})/)
      if (!match) return null
      const [day, month, year] = match[1].split("/")
      return new Date(Number(year), Number(month) - 1, Number(day))
    }
    const inDate = booking.checkInDate ? parseDate(booking.checkInDate) : null
    const outDate = booking.checkOutDate ? parseDate(booking.checkOutDate) : null
    if (!inDate || !outDate) return "N/A"
    const diff = Math.round((outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60 * 24))
    return `${diff > 0 ? diff : 1} đêm`
  })()
: "N/A"}
                  </span>
                  <span className="bg-white px-2 py-1 rounded">
                    {booking.checkOutDate ? booking.checkOutDate.split(",")[1].trim() : "N/A"}
                  </span>
                </div>
                <div className="text-sm text-[#0a0a0a] space-y-1">
                  {booking.rooms.map((room: any) => (
  <div key={room.id} className="mb-1">
    <div className="flex justify-between">
      <span>
        {room.name} x{room.quantity}
      </span>
      <span>{room.roomTotalPrice ? room.roomTotalPrice.toLocaleString("vi-VN") + "đ" : ""}</span>
    </div>
    <div className="ml-4 text-xs text-gray-600 space-y-0.5">
      {room.policies?.breakfast && <div>- {room.policies.breakfast}</div>}
      {room.policies?.cancellation && <div>- {room.policies.cancellation}</div>}
    </div>
  </div>
))}
                </div>
                <div className="text-right mt-2">
                  <span className="font-medium">Tổng tiền: {booking.bookingTotalPrice.toLocaleString("vi-VN")}đ</span>
                </div>
              </div>
            ))
          )}
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

        {/* Tổng tiền thanh toán */}
        <div className="flex justify-between items-center text-lg font-bold mt-4 mb-6">
          <span>TỔNG TIỀN THANH TOÁN (VNĐ)</span>
          <span>{totalAmount}</span>
        </div>
        {/* Chọn phương thức thanh toán */}
<div className="mb-6">
  <h2 className="text-lg font-medium text-[#0a0a0a] mb-4">Phương thức thanh toán</h2>
  <div className="flex gap-4">
    <label className="flex items-center cursor-pointer">
      <input
        type="radio"
        name="payment"
        value="bank_transfer"
        checked={selectedPayment === "bank_transfer"}
        onChange={() => setSelectedPayment("bank_transfer")}
        className="mr-2"
      />
      Chuyển khoản (SePay)
    </label>
    <label className="flex items-center cursor-pointer">
      <input
        type="radio"
        name="payment"
        value="visa_mastercard"
        checked={selectedPayment === "visa_mastercard"}
        onChange={() => setSelectedPayment("visa_mastercard")}
        className="mr-2"
      />
      Sử dụng thẻ tín dụng
    </label>
  </div>
</div>
        

        {/* Privacy Policy */}
        <div className="flex justify-between items-center text-sm text-[#0a0a0a] mb-6">
          <span>Chính sách hủy</span>
          <span className="text-blue-600 cursor-pointer" onClick={() => setShowCancellationPolicy(true)}>
            Xem chi tiết
          </span>
        </div>

        <Button
  onClick={handlePaymentConfirmation}
  className="w-full bg-[#0a0a0a] hover:bg-[#000000] text-white py-3 rounded-lg text-base font-medium shadow-md hover:shadow-lg h-12 flex items-center justify-center"
  disabled={isProcessing}
>
  {isProcessing ? (
    <>
      <svg className="animate-spin mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
      </svg>
      Đang xử lý...
    </>
  ) : (
    "Xác nhận đặt phòng"
  )}
</Button>
      </div>


      {showCancellationPolicy && ( // New conditional render
        <CancellationPolicyDrawer isOpen={showCancellationPolicy} onClose={() => setShowCancellationPolicy(false)} />
      )}
{showSepayPopup && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg relative">
      <h2 className="text-lg font-bold mb-4">Thông tin chuyển khoản</h2>
      {sepayData && sepayData.qr_url ? (
        <div className="flex flex-col items-center gap-3">
          <img src={sepayData.qr_url} alt="QR chuyển khoản" className="w-48 h-48" />
          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            onClick={async () => {
              try {
                const response = await fetch(sepayData.qr_url, { mode: "cors" });
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `qr_chuyen_khoan.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
                setShowCopyToast("Đã lưu QR");
                setTimeout(() => setShowCopyToast(""), 3000);
              } catch (e) {
                setShowCopyToast("Không thể lưu QR");
                setTimeout(() => setShowCopyToast(""), 3000);
              }
            }}
          >
            Lưu QR
          </button>
          <div className="text-left w-full mt-2 space-y-4"> {/* tăng space-y-4 */}
            {[
              { label: "Ngân hàng", value: sepayData.bank_name },
              { label: "Số tài khoản", value: sepayData.bank_account },
              { label: "Tên chủ tài khoản", value: sepayData.account_name },
              { label: "Nội dung", value: sepayData.transfer_content },
              { label: "Số tiền", value: sepayData.amount?.toLocaleString("vi-VN") + "đ" },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center py-2">
                <div className="font-medium flex-shrink-0">{item.label}:</div>
                <div className="flex items-center gap-2 min-w-0">
                  <span className="truncate">{item.value}</span>
                  <button
                    className="ml-2 px-2 py-1 bg-gray-200 rounded text-xs hover:bg-gray-300"
                    onClick={() => {
                      navigator.clipboard.writeText(item.value);
                      setShowCopyToast("Đã copy " + item.label);
                      setTimeout(() => setShowCopyToast(""), 3000);
                    }}
                  >
                    Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>Không lấy được thông tin chuyển khoản. Vui lòng thử lại.</div>
      )}
      {/* Toast thông báo copy */}
      {showCopyToast && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 transition-all">
          {showCopyToast}
        </div>
      )}
    </div>
  </div>
)}
    </div>
  )
}
