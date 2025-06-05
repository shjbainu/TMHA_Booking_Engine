"use client"

import { ArrowLeft, Copy, QrCode, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProgressIndicator } from "@/components/progress-indicator"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react" // Added for fetching/simulating data

// Define interfaces for our data structures
interface ConfirmedRoom {
  name: string;
  quantity: number;
}

interface ConfirmedBooking {
  id: string; // e.g., "BOOKING 1"
  bookingCode: string; // e.g., "HOTEL1234"
  shareLink: string;
  tripInfo: string; // e.g., "Ngày 25 - 27 tháng 4, 2025"
  checkInDate: string;
  checkOutDate: string;
  rooms: ConfirmedRoom[];
}

interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
}

// Sample data - In a real app, this would be fetched or passed
const sampleConfirmedBookings: ConfirmedBooking[] = [
  {
    id: "BOOKING 1",
    bookingCode: "HOTEL1234",
    shareLink: "https://staybooking.com/booking/hotel1234",
    tripInfo: "Ngày 25 - 27 tháng 4, 2025",
    checkInDate: "12:00 ngày 25 tháng 4, 2025",
    checkOutDate: "12:00 ngày 27 tháng 4, 2025",
    rooms: [
      { name: "Phòng Standard", quantity: 2 },
      { name: "Phòng Luxury", quantity: 1 },
    ],
  },
  {
    id: "BOOKING 2",
    bookingCode: "RESORT5678",
    shareLink: "https://staybooking.com/booking/resort5678",
    tripInfo: "Ngày 01 - 03 tháng 5, 2025",
    checkInDate: "14:00 ngày 01 tháng 5, 2025",
    checkOutDate: "11:00 ngày 03 tháng 5, 2025",
    rooms: [{ name: "Phòng Deluxe Suite", quantity: 1 }],
  },
];

const sampleCustomerInfo: CustomerInfo = {
  name: "Lê Tuấn Anh",
  phone: "0362423000",
  email: "letuananhk54@gmail.com",
};

export default function PaymentConfirmation() {
  const steps = ["Đặt phòng", "Thanh toán", "Xác nhận"];
  const [bookings, setBookings] = useState<ConfirmedBooking[]>([]);
  const [customer, setCustomer] = useState<CustomerInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    // In a real app, you might fetch this based on a transaction ID
    // or data passed from the previous page.
    setTimeout(() => {
      setBookings(sampleConfirmedBookings);
      setCustomer(sampleCustomerInfo);
      setLoading(false);
    }, 500); // Simulate a short delay
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        // Optional: Show a success message (e.g., using a toast notification)
        console.log("Copied to clipboard:", text);
      },
      (err) => {
        console.error("Failed to copy:", err);
      }
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p>Đang tải chi tiết hóa đơn...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
        <Link href="/payment"> {/* Or perhaps to homepage "/" if payment is truly done */}
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <ArrowLeft className="h-6 w-6 text-[#0a0a0a]" />
          </Button>
        </Link>
        <h1 className="text-lg font-medium text-[#0a0a0a]">CHI TIẾT HÓA ĐƠN</h1>
        <div className="w-10" />
      </div>

      <div className="p-4">
        {/* Progress Indicator */}
        <ProgressIndicator currentStep={3} steps={steps} />

        {/* Success Message */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-[#0a0a0a] mb-4">THANH TOÁN THÀNH CÔNG</h2>
          {/* You might want a more generic success image or remove it if it's too room-specific */}
        
        </div>

        {/* Iterate over each confirmed booking */}
        {bookings.map((booking) => (
          <div key={booking.id} className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-bold text-[#0a0a0a] mb-2">{booking.id.toUpperCase()}</h3>
            
            <div className="mb-3">
              <span className="font-medium text-sm">Các loại phòng đã đặt:</span>
              {booking.rooms.map((room, index) => (
                <div key={index} className="text-sm text-[#0a0a0a] ml-2">
                  • {room.name} {room.quantity > 1 ? `(x${room.quantity})` : ""}
                </div>
              ))}
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium">Thông tin chuyến đi:</span>
              </div>
              <div>
                <span className="text-[#0a0a0a]">{booking.tripInfo}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[#0a0a0a]">Mã nhận phòng: {booking.bookingCode}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={() => copyToClipboard(booking.bookingCode)}>
                  <Copy className="h-4 w-4" />
                </Button>
                {/* QR Code might be generated based on bookingCode or shareLink */}
                <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                  <QrCode className="h-4 w-4" />
                </Button>
              </div>

              <div>
                <span className="font-medium">Link chia sẻ phòng:</span>
              </div>
              <div className="bg-gray-100 p-3 rounded flex items-center justify-between">
                <span className="text-xs text-[#0a0a0a] truncate mr-2">{booking.shareLink}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 p-0 flex-shrink-0"
                  onClick={() => copyToClipboard(booking.shareLink)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <div>
                <span className="font-medium">Thông tin ngày nhận trả phòng:</span>
              </div>
              <div>
                <span className="text-[#0a0a0a]">Ngày nhận phòng: {booking.checkInDate}</span>
              </div>
              <div>
                <span className="text-[#0a0a0a]">Ngày trả phòng: {booking.checkOutDate}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Customer Information (Displayed once, assuming it's the same for all bookings in this transaction) */}
        {customer && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-bold text-[#0a0a0a] mb-4">THÔNG TIN KHÁCH HÀNG</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-[#0a0a0a]">Khách hàng: {customer.name}</span>
              </div>
              <div>
                <span className="text-[#0a0a0a]">Số điện thoại: {customer.phone}</span>
              </div>
              <div>
                <span className="text-[#0a0a0a]">Email: {customer.email}</span>
              </div>
            </div>
          </div>
        )}

        {/* Download Invoice Button */}
        <Button className="w-full bg-[#0a0a0a] hover:bg-[#000000] text-white py-3 rounded-lg text-base font-medium flex items-center justify-center gap-2">
          <Download className="h-5 w-5" />
          Tải về hóa đơn
        </Button>
      </div>
    </div>
  );
}
