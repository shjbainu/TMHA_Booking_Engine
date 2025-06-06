"use client"

import { ArrowLeft, Copy, QrCode, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProgressIndicator } from "@/components/progress-indicator"
// import Image from "next/image" // Image was removed from the previous request, uncomment if needed
import Link from "next/link"
import { useEffect, useState } from "react"

// Define interfaces for our data structures
interface ConfirmedRoom {
  name: string;
  quantity: number;
  pricePerRoom: number; // Price for one room of this type
  // totalRoomPrice will be calculated: quantity * pricePerRoom
}

interface ConfirmedBooking {
  id: string; // e.g., "BOOKING 1"
  bookingCode: string; // e.g., "HOTEL1234"
  shareLink: string;
  tripInfo: string; // e.g., "Ngày 25 - 27 tháng 4, 2025"
  checkInDate: string;
  checkOutDate: string;
  rooms: ConfirmedRoom[];
  // totalBookingPrice will be calculated by summing totalRoomPrice of all rooms
  // You might also have taxes or fees to add here if they are part of the booking total
  vatPercent?: number; // Optional VAT percentage for the booking
}

interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
}

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

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
      { name: "Phòng Standard", quantity: 2, pricePerRoom: 490000 }, // 2 * 490000 = 980000
      { name: "Phòng Luxury", quantity: 1, pricePerRoom: 637000 },   // 1 * 637000 = 637000
    ],
    vatPercent: 10, // Example VAT for this booking
  },
  {
    id: "BOOKING 2",
    bookingCode: "RESORT5678",
    shareLink: "https://staybooking.com/booking/resort5678",
    tripInfo: "Ngày 01 - 03 tháng 5, 2025",
    checkInDate: "14:00 ngày 01 tháng 5, 2025",
    checkOutDate: "11:00 ngày 03 tháng 5, 2025",
    rooms: [
        { name: "Phòng Deluxe Suite", quantity: 1, pricePerRoom: 1500000 }
    ],
    // No VAT specified for this booking, or it's 0
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
    setTimeout(() => {
      setBookings(sampleConfirmedBookings);
      setCustomer(sampleCustomerInfo);
      setLoading(false);
    }, 500);
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => console.log("Copied to clipboard:", text),
      (err) => console.error("Failed to copy:", err)
    );
  };

  // Calculate total price for a booking, including VAT if applicable
  const calculateBookingTotal = (booking: ConfirmedBooking): number => {
    const roomsSubtotal = booking.rooms.reduce((sum, room) => sum + room.quantity * room.pricePerRoom, 0);
    const vatAmount = booking.vatPercent ? roomsSubtotal * (booking.vatPercent / 100) : 0;
    return roomsSubtotal + vatAmount;
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
        <Link href="/payment">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <ArrowLeft className="h-6 w-6 text-[#0a0a0a]" />
          </Button>
        </Link>
        <h1 className="text-lg font-medium text-[#0a0a0a]">CHI TIẾT HÓA ĐƠN</h1>
        <div className="w-10" />
      </div>

      <div className="p-4">
        <ProgressIndicator currentStep={3} steps={steps} />

        <div className="text-center my-6"> {/* Added my-6 for spacing */}
          <h2 className="text-xl font-bold text-[#0a0a0a] mb-4">THANH TOÁN THÀNH CÔNG</h2>
          {/* Consider adding a success icon here if the room image was too specific */}
        </div>

        {bookings.map((booking) => {
          const roomsSubtotal = booking.rooms.reduce((sum, room) => sum + room.quantity * room.pricePerRoom, 0);
          const vatAmount = booking.vatPercent ? roomsSubtotal * (booking.vatPercent / 100) : 0;
          const bookingTotal = roomsSubtotal + vatAmount;

          return (
            <div key={booking.id} className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-bold text-[#0a0a0a] mb-3">{booking.id.toUpperCase()}</h3>
              
              <div className="mb-4 text-sm">
                <div className="flex justify-between font-medium mb-1">
                  <span>Chi tiết phòng đã đặt:</span>
                  <span>Thành tiền</span>
                </div>
                {booking.rooms.map((room, index) => {
                  const totalRoomPrice = room.quantity * room.pricePerRoom;
                  return (
                    <div key={index} className="flex justify-between text-[#0a0a0a] py-1">
                      <span>• {room.name} {room.quantity > 1 ? `(x${room.quantity})` : ""}</span>
                      <span>{formatCurrency(totalRoomPrice)}</span>
                    </div>
                  );
                })}
                {booking.vatPercent && vatAmount > 0 && (
                  <div className="flex justify-between text-[#0a0a0a] py-1 border-t border-gray-200 mt-1 pt-1">
                    <span>Phí VAT ({booking.vatPercent}%)</span>
                    <span>{formatCurrency(vatAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-[#0a0a0a] border-t-2 border-gray-300 mt-2 pt-2">
                  <span>TỔNG {booking.id.toUpperCase()}:</span>
                  <span>{formatCurrency(bookingTotal)}</span>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium">Thông tin chuyến đi:</span>
                  <p className="text-[#0a0a0a]">{booking.tripInfo}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[#0a0a0a]">Mã nhận phòng: {booking.bookingCode}</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={() => copyToClipboard(booking.bookingCode)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                    <QrCode className="h-4 w-4" />
                  </Button>
                </div>

                <div>
                  <span className="font-medium">Link chia sẻ phòng:</span>
                  <div className="bg-gray-100 p-3 rounded flex items-center justify-between mt-1">
                    <span className="text-xs text-[#0a0a0a] truncate mr-2">{booking.shareLink}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6 p-0 flex-shrink-0" onClick={() => copyToClipboard(booking.shareLink)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <span className="font-medium">Thông tin ngày nhận trả phòng:</span>
                  <p className="text-[#0a0a0a]">Ngày nhận phòng: {booking.checkInDate}</p>
                  <p className="text-[#0a0a0a]">Ngày trả phòng: {booking.checkOutDate}</p>
                </div>
              </div>
            </div>
          );
        })}

        {customer && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-bold text-[#0a0a0a] mb-4">THÔNG TIN KHÁCH HÀNG</h3>
            <div className="space-y-2 text-sm">
              <div><span className="text-[#0a0a0a]">Khách hàng: {customer.name}</span></div>
              <div><span className="text-[#0a0a0a]">Số điện thoại: {customer.phone}</span></div>
              <div><span className="text-[#0a0a0a]">Email: {customer.email}</span></div>
            </div>
          </div>
        )}

        <Button className="w-full bg-[#0a0a0a] hover:bg-[#000000] text-white py-3 rounded-lg text-base font-medium flex items-center justify-center gap-2">
          <Download className="h-5 w-5" />
          Tải về hóa đơn
        </Button>
      </div>
    </div>
  );
}
