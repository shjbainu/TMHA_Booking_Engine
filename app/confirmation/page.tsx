// @/app/confirmation/page.tsx

"use client"

import { ArrowLeft, Download, CheckCircle, User, Phone, Mail, QrCode, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProgressIndicator } from "@/components/progress-indicator"
import Image from "next/image"
import Link from "next/link"
// BƯỚC 1: IMPORT THƯ VIỆN
import html2pdf from "html2pdf.js"

// --- DỮ LIỆU GIẢ LẬP (Giữ nguyên) ---
const hotelInfo = {
    name: "Staybooking Grand Hotel",
    address: "123 Đường ABC, Quận 1, TP. Hồ Chí Minh",
    phone: "028 3333 8888",
    email: "contact@staybooking.com"
}

const confirmedBookings = [
  {
    id: "booking_1",
    name: "BOOKING 1",
    checkInDate: "Thứ Sáu, 25 tháng 4, 2025",
    checkOutDate: "Chủ Nhật, 27 tháng 4, 2025",
    bookingCode: "STAY-XYZ123",
    qrCodeValue: "STAY-XYZ123",
    rooms: [
      { name: "Phòng Standard", quantity: 2, price: "980.000đ" },
      { name: "Phòng Luxury", quantity: 1, price: "490.000đ" },
    ],
    subtotal: "1.470.000đ",
    vat: "147.000đ",
    totalPrice: "1.617.000đ"
  },
];

const customerInfo = {
    name: "Lê Tuấn Anh",
    phone: "0362423000",
    email: "letuananhk54@gmail.com"
}
// ----------------------


export default function PaymentConfirmation() {
  const steps = ["Đặt phòng", "Thanh toán", "Xác nhận"]

  // BƯỚC 2: TẠO HÀM XỬ LÝ TẢI PDF
  const handleDownloadInvoice = () => {
    // Lấy phần tử HTML chứa nội dung hóa đơn
    const invoiceElement = document.getElementById('invoice-content');

    // Cấu hình cho file PDF đầu ra
    const opt = {
      margin:       0.5,
      filename:     `Hoa_Don_${customerInfo.name.replace(/\s/g, '_')}_${confirmedBookings[0].bookingCode}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true }, // useCORS cho trường hợp ảnh từ nguồn khác
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    // Gọi thư viện để tạo và tải PDF
    html2pdf().from(invoiceElement).set(opt).save();
  }


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <ArrowLeft className="h-6 w-6 text-gray-800" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold text-gray-900">XÁC NHẬN ĐẶT PHÒNG</h1>
        <div className="w-10" />
      </header>

      <main className="p-4 md:p-8 max-w-4xl mx-auto">
        {/* ... (Phần UI hiện tại của bạn giữ nguyên) ... */}
        <div className="mb-8">
            <ProgressIndicator currentStep={3} steps={steps} />
        </div>

        <div className="text-center mb-10">
            <CheckCircle className="mx-auto h-16 w-16 text-emerald-500 mb-4" strokeWidth={1.5} />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Đặt phòng thành công!</h2>
            <p className="text-gray-600">Cảm ơn bạn đã tin tưởng. Chi tiết đặt phòng đã được gửi đến email của bạn.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
                 {confirmedBookings.map((booking) => (
                    <div key={booking.id} className="bg-white rounded-2xl shadow-lg border border-gray-200/80 overflow-hidden">
                        {/* ... UI của thẻ booking ... */}
                    </div>
                ))}
            </div>
            <div className="md:col-span-1 space-y-6">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200/80 p-6">
                    {/* ... UI thông tin khách hàng ... */}
                </div>
                 <div className="space-y-3">
                    {/* BƯỚC 3: GÁN HÀM VÀO NÚT BẤM */}
                    <Button 
                        onClick={handleDownloadInvoice}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-base font-semibold flex items-center justify-center gap-2 h-12 shadow-lg hover:shadow-xl transition-all">
                        <Download className="h-5 w-5" />
                        Tải về hóa đơn
                    </Button>
                     <Button variant="outline" className="w-full bg-white hover:bg-gray-100 text-gray-800 py-3 rounded-xl text-base font-medium flex items-center justify-center gap-2 h-12 shadow-md">
                        <Share2 className="h-5 w-5" />
                        Chia sẻ đặt phòng
                    </Button>
                 </div>
            </div>
        </div>

        <div className="text-center mt-12">
            <Link href="/">
                <Button variant="link" className="text-gray-600 hover:text-gray-900">
                    Về trang chủ
                </Button>
            </Link>
        </div>
      </main>

      {/* 
        BƯỚC 4: TẠO CONTAINER ẨN CHO NỘI DUNG PDF
        - Nội dung bên trong div này sẽ được chuyển thành file PDF.
        - Nó được ẩn khỏi màn hình để không ảnh hưởng đến giao diện chính.
      */}
      <div id="invoice-content" style={{ position: 'absolute', left: '-9999px', width: '8.27in', fontFamily: 'sans-serif', color: '#333' }}>
        <div style={{ padding: '0.5in' }}>
          {/* Header của hóa đơn */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #eee', paddingBottom: '20px' }}>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#10b981' }}>HÓA ĐƠN ĐẶT PHÒNG</h1>
              <p style={{ margin: '5px 0 0', fontSize: '14px' }}>Mã đặt phòng: <span style={{ fontWeight: 'bold', fontFamily: 'monospace' }}>{confirmedBookings[0].bookingCode}</span></p>
            </div>
            <div style={{ textAlign: 'right', fontSize: '12px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 5px' }}>{hotelInfo.name}</h2>
              <p style={{ margin: 0 }}>{hotelInfo.address}</p>
              <p style={{ margin: 0 }}>{hotelInfo.phone}</p>
            </div>
          </div>

          {/* Thông tin khách hàng và ngày đặt */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', fontSize: '14px' }}>
            <div>
              <p style={{ margin: 0, color: '#555' }}>HÓA ĐƠN CHO:</p>
              <p style={{ margin: '5px 0 0', fontWeight: 'bold' }}>{customerInfo.name}</p>
              <p style={{ margin: '5px 0 0' }}>{customerInfo.email}</p>
              <p style={{ margin: '5px 0 0' }}>{customerInfo.phone}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: '0', color: '#555' }}>NGÀY PHÁT HÀNH:</p>
              <p style={{ margin: '5px 0 0', fontWeight: 'bold' }}>{new Date().toLocaleDateString('vi-VN')}</p>
              <p style={{ margin: '20px 0 0', color: '#555' }}>NGÀY NHẬN PHÒNG:</p>
              <p style={{ margin: '5px 0 0', fontWeight: 'bold' }}>{confirmedBookings[0].checkInDate}</p>
            </div>
          </div>
          
          {/* Bảng chi tiết hóa đơn */}
          <div style={{ marginTop: '40px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '2px solid #ddd' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Mô tả</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Số lượng</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {confirmedBookings[0].rooms.map((room, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px' }}>{room.name}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>{room.quantity}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>{room.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Phần tổng kết */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <div style={{ width: '250px', fontSize: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
                <span style={{ color: '#555' }}>Tạm tính:</span>
                <span style={{ fontWeight: 'medium' }}>{confirmedBookings[0].subtotal}</span>
              </div>
               <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
                <span style={{ color: '#555' }}>Thuế (VAT):</span>
                <span style={{ fontWeight: 'medium' }}>{confirmedBookings[0].vat}</span>
              </div>
              <div style={{ borderTop: '2px solid #333', marginTop: '10px', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold', fontSize: '16px' }}>TỔNG CỘNG:</span>
                <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#10b981' }}>{confirmedBookings[0].totalPrice}</span>
              </div>
            </div>
          </div>

          {/* Footer của hóa đơn */}
          <div style={{ marginTop: '50px', paddingTop: '20px', borderTop: '1px solid #eee', textAlign: 'center', fontSize: '12px', color: '#777' }}>
            <p>Cảm ơn quý khách đã sử dụng dịch vụ của {hotelInfo.name}!</p>
            <p>Vui lòng xuất trình mã đặt phòng hoặc mã QR tại quầy lễ tân để check-in.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
