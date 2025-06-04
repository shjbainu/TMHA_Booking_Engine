"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Users, Bed, Wifi, Trash2, Loader, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { rooms } from "@/lib/data"
import type { BookingEntry } from "@/lib/types"
import { CalendarPopup } from "@/components/calendar-popup"

export default function RoomSelection() {
  const [bookings, setBookings] = useState<BookingEntry[]>([
    {
      id: "BOOKING 1",
      checkInDate: null,
      checkOutDate: null,
      selectedRooms: [],
      isCalendarOpen: false,
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [activeBookingIdForCalendar, setActiveBookingIdForCalendar] = useState<string | null>(null)

  const handleRoomExpand = (bookingId: string, roomId: string) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === bookingId
          ? {
              ...booking,
              selectedRooms: booking.selectedRooms.some((r) => r.roomId === roomId)
                ? booking.selectedRooms
                : [
                    ...booking.selectedRooms,
                    { roomId, quantity: 1, policies: { breakfast: null, cancellation: null } },
                  ],
            }
          : booking,
      ),
    )
  }

  const updateQuantity = (bookingId: string, roomId: string, change: number) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === bookingId
          ? {
              ...booking,
              selectedRooms: booking.selectedRooms.map((room) =>
                room.roomId === roomId ? { ...room, quantity: Math.max(1, room.quantity + change) } : room,
              ),
            }
          : booking,
      ),
    )
  }

  const updatePolicy = (
    bookingId: string,
    roomId: string,
    type: "breakfast" | "cancellation",
    value: string | null,
  ) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === bookingId
          ? {
              ...booking,
              selectedRooms: booking.selectedRooms.map((room) =>
                room.roomId === roomId
                  ? {
                      ...room,
                      policies: {
                        ...room.policies,
                        [type]: value,
                      },
                    }
                  : room,
              ),
            }
          : booking,
      ),
    )
  }

  const removeRoomFromBooking = (bookingId: string, roomId: string) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === bookingId
          ? {
              ...booking,
              selectedRooms: booking.selectedRooms.filter((room) => room.roomId !== roomId),
            }
          : booking,
      ),
    )
  }

  const handleReset = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setBookings([
        {
          id: "BOOKING 1",
          checkInDate: null,
          checkOutDate: null,
          selectedRooms: [],
          isCalendarOpen: false,
        },
      ])
    }, 2000)
  }

  const handleAddBooking = () => {
    const newBookingId = `BOOKING ${bookings.length + 1}`
    setBookings((prevBookings) => [
      ...prevBookings,
      {
        id: newBookingId,
        checkInDate: null,
        checkOutDate: null,
        selectedRooms: [],
        isCalendarOpen: true, // Open calendar for new booking
      },
    ])
    setActiveBookingIdForCalendar(newBookingId)
  }

  const handleCalendarApply = (bookingId: string, checkIn: Date, checkOut: Date) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === bookingId
          ? { ...booking, checkInDate: checkIn, checkOutDate: checkOut, isCalendarOpen: false }
          : booking,
      ),
    )
    setActiveBookingIdForCalendar(null)
    // Simulate fetching new room types based on selected dates
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      // In a real app, you would fetch rooms here based on the new dates
    }, 1000)
  }

  const handleCalendarClose = () => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === activeBookingIdForCalendar ? { ...booking, isCalendarOpen: false } : booking,
      ),
    )
    setActiveBookingIdForCalendar(null)
  }

  const calculateTotalPrice = () => {
    return bookings.reduce((totalSum, booking) => {
      const bookingTotal = booking.selectedRooms.reduce((sum, roomDetails) => {
        const room = rooms.find((r) => r.id === roomDetails.roomId)
        return sum + (room?.price || 0) * roomDetails.quantity
      }, 0)
      return totalSum + bookingTotal
    }, 0)
  }

  const totalSelectedRoomsCount = bookings.reduce((count, booking) => count + booking.selectedRooms.length, 0)

  return (
    <div className="min-h-screen bg-white relative">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <ArrowLeft className="h-6 w-6 text-[#0a0a0a]" />
          </Button>
        </Link>
        <h1 className="text-lg font-medium text-[#0a0a0a]">CHỌN PHÒNG</h1>
        <div className="w-10" />
      </div>

      {/* Booking Info */}
      <div className="p-4 bg-gray-50">
        {bookings.map((booking) => (
          <div key={booking.id} className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="bg-[#0a0a0a] text-white">
                {booking.id}
              </Badge>
              {booking.id === "BOOKING 1" && (
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleAddBooking}>
                  <Plus className="h-4 w-4" />
                </Button>
              )}
              {booking.id !== "BOOKING 1" && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-gray-500"
                  onClick={() => setBookings((prev) => prev.filter((b) => b.id !== booking.id))}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            {booking.checkInDate && booking.checkOutDate && (
              <div className="flex items-center gap-4 text-sm mb-2">
                <span className="bg-white px-2 py-1 rounded">
                  {booking.checkInDate.toLocaleDateString("vi-VN")} - {booking.checkOutDate.toLocaleDateString("vi-VN")}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveBookingIdForCalendar(booking.id)}
                  className="text-xs"
                >
                  Thay đổi ngày
                </Button>
              </div>
            )}
            {!booking.checkInDate && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveBookingIdForCalendar(booking.id)}
                className="text-xs"
              >
                Chọn ngày
              </Button>
            )}
            {booking.selectedRooms.length > 0 && (
              <div className="text-sm text-[#0a0a0a] space-y-1 mt-2">
                {booking.selectedRooms.map((roomDetails) => (
                  <div key={roomDetails.roomId}>
                    • Phòng {rooms.find((r) => r.id === roomDetails.roomId)?.name} x{roomDetails.quantity}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Filter Tags */}
        <div className="flex gap-2 mb-4">
          <Badge variant="outline" className="rounded-full">
            Bao gồm bữa sáng
          </Badge>
          <Badge variant="outline" className="rounded-full">
            Hủy miễn phí
          </Badge>
          <Badge variant="outline" className="rounded-full cursor-pointer hover:bg-gray-100" onClick={handleReset}>
            Reset
          </Badge>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 max-w-md mx-auto">
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white shadow-lg">
              <Loader className="h-8 w-8 animate-spin text-gray-700" />
              <p className="text-sm font-medium text-gray-700">Đang tải lại phòng</p>
            </div>
          </div>
        )}
      </div>

      {/* Room List */}
      <div className="p-4 space-y-4">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {/* Room Images */}
            <div className="grid grid-cols-5 gap-2 mb-4 p-2 border border-gray-100 rounded-2xl bg-gray-50/30">
              {/* Large image on the left */}
              <div className="col-span-3 relative aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-gray-400 rounded-full opacity-60"></div>
                </div>
              </div>

              {/* Two stacked images on the right */}
              <div className="col-span-2 grid grid-rows-2 gap-2">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 bg-gray-400 rounded-full opacity-60"></div>
                  </div>
                </div>
                <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-300 to-gray-400 shadow-sm flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">+8</span>
                </div>
              </div>
            </div>

            {/* Room Info */}
            <h3 className="text-lg font-semibold text-[#0a0a0a] mb-2">
              {room.id === "1" ? "Phòng Sơn Ca" : room.id === "2" ? "Phòng Nhật bản" : "Phòng Mập Mờ"}
            </h3>

            <div className="mb-3">
              <span className="text-sm text-gray-600">1 giường king, 2 giường đôi</span>
            </div>

            {/* Amenities */}
            <div className="grid grid-cols-2 gap-2 text-sm text-[#0a0a0a] mb-4">
              <div className="flex items-center gap-2">
                <Bed className="h-4 w-4" />
                <span>Hướng mặt phố</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Tối đa 3 người</span>
              </div>
              <div className="flex items-center gap-2">
                <Bed className="h-4 w-4" />
                <span>Còn 3 phòng</span>
              </div>
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4" />
                <span>Diện tích 30m2</span>
              </div>
            </div>

            {/* Price and Select */}
            {bookings.map((booking) => {
              const roomDetails = booking.selectedRooms.find((r) => r.roomId === room.id)
              const isExpanded = !!roomDetails

              return (
                <div key={`${booking.id}-${room.id}`} className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-lg font-semibold text-[#0a0a0a]">Giá từ {room.price.toLocaleString()}đ</span>
                  </div>
                  {!isExpanded ? (
                    <Button
                      className="bg-[#0a0a0a] hover:bg-[#000000] text-white px-6 py-2 rounded-full text-sm font-medium"
                      onClick={() => handleRoomExpand(booking.id, room.id)}
                    >
                      Chọn phòng
                    </Button>
                  ) : (
                    <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-2 bg-white">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded border border-gray-300"
                        onClick={() => updateQuantity(booking.id, room.id, -1)}
                      >
                        <span className="text-lg">-</span>
                      </Button>
                      <span className="w-8 text-center font-medium">{roomDetails?.quantity || 1}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded border border-gray-300"
                        onClick={() => updateQuantity(booking.id, room.id, 1)}
                      >
                        <span className="text-lg">+</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded border border-gray-300 text-gray-500"
                        onClick={() => removeRoomFromBooking(booking.id, room.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              )
            })}

            {/* Inline Options */}
            {bookings.map((booking) => {
              const roomDetails = booking.selectedRooms.find((r) => r.roomId === room.id)
              const isExpanded = !!roomDetails
              if (!isExpanded) return null

              return (
                <div key={`${booking.id}-${room.id}-policies`} className="space-y-4 pt-2">
                  {/* Breakfast Policy */}
                  <div>
                    <h4 className="font-medium text-[#0a0a0a] mb-3">Chính sách ăn sáng</h4>
                    <div className="space-y-2">
                      <div
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${
                          roomDetails?.policies.breakfast === "Bao gồm bữa sáng"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 bg-white"
                        }`}
                        onClick={() => updatePolicy(booking.id, room.id, "breakfast", "Bao gồm bữa sáng")}
                      >
                        <div className="relative">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              roomDetails?.policies.breakfast === "Bao gồm bữa sáng"
                                ? "bg-blue-500 border-blue-500 shadow-sm"
                                : "border-gray-300"
                            }`}
                          >
                            {roomDetails?.policies.breakfast === "Bao gồm bữa sáng" && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                        </div>
                        <span className="text-sm text-[#0a0a0a]">Bao gồm bữa sáng</span>
                      </div>
                      <div
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${
                          roomDetails?.policies.breakfast === "Không gồm bữa sáng"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 bg-white"
                        }`}
                        onClick={() => updatePolicy(booking.id, room.id, "breakfast", "Không gồm bữa sáng")}
                      >
                        <div className="relative">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              roomDetails?.policies.breakfast === "Không gồm bữa sáng"
                                ? "bg-blue-500 border-blue-500 shadow-sm"
                                : "border-gray-300"
                            }`}
                          >
                            {roomDetails?.policies.breakfast === "Không gồm bữa sáng" && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                        </div>
                        <span className="text-sm text-[#0a0a0a]">Không gồm bữa sáng</span>
                      </div>
                    </div>
                  </div>

                  {/* Cancellation Policy */}
                  <div>
                    <h4 className="font-medium text-[#0a0a0a] mb-3">Chính sách hủy</h4>
                    <div className="space-y-2">
                      <div
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${
                          roomDetails?.policies.cancellation === "Hủy miễn phí trước 15/06/2025"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 bg-white"
                        }`}
                        onClick={() =>
                          updatePolicy(booking.id, room.id, "cancellation", "Hủy miễn phí trước 15/06/2025")
                        }
                      >
                        <div className="relative">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              roomDetails?.policies.cancellation === "Hủy miễn phí trước 15/06/2025"
                                ? "bg-blue-500 border-blue-500 shadow-sm"
                                : "border-gray-300"
                            }`}
                          >
                            {roomDetails?.policies.cancellation === "Hủy miễn phí trước 15/06/2025" && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                        </div>
                        <span className="text-sm text-[#0a0a0a]">Hủy miễn phí trước 15/06/2025</span>
                      </div>
                      <div
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${
                          roomDetails?.policies.cancellation === "Không hoàn tiền"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 bg-white"
                        }`}
                        onClick={() => updatePolicy(booking.id, room.id, "cancellation", "Không hoàn tiền")}
                      >
                        <div className="relative">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              roomDetails?.policies.cancellation === "Không hoàn tiền"
                                ? "bg-blue-500 border-blue-500 shadow-sm"
                                : "border-gray-300"
                            }`}
                          >
                            {roomDetails?.policies.cancellation === "Không hoàn tiền" && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                        </div>
                        <span className="text-sm text-[#0a0a0a]">Không hoàn tiền</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Calendar Popup */}
      {activeBookingIdForCalendar && (
        <CalendarPopup
          isOpen={true}
          onClose={handleCalendarClose}
          onApply={handleCalendarApply}
          bookingId={activeBookingIdForCalendar}
          initialCheckIn={bookings.find((b) => b.id === activeBookingIdForCalendar)?.checkInDate}
          initialCheckOut={bookings.find((b) => b.id === activeBookingIdForCalendar)?.checkOutDate}
        />
      )}

      {/* Bottom Summary */}
      {totalSelectedRoomsCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm bg-gray-100 px-2 py-1 rounded">{totalSelectedRoomsCount}</span>
              <span className="text-sm text-[#0a0a0a]">
                {bookings.length > 0 && bookings[0].checkInDate && bookings[0].checkOutDate
                  ? `${bookings[0].checkInDate.toLocaleDateString("vi-VN")} - ${bookings[0].checkOutDate.toLocaleDateString("vi-VN")}`
                  : "Chọn ngày"}
              </span>
            </div>
            <div className="text-right">
              <div className="text-lg font-medium text-[#0a0a0a]">{calculateTotalPrice().toLocaleString()}đ</div>
              <div className="text-xs text-[#999999]">Giá trên đã bao gồm thuế và phí dịch vụ</div>
            </div>
          </div>
          <Link href="/payment">
            <Button className="w-full bg-[#0a0a0a] hover:bg-[#000000] text-white py-3 rounded-lg">Hoàn tất</Button>
          </Link>
        </div>
      )}

      <div className="h-24" />
    </div>
  )
}
