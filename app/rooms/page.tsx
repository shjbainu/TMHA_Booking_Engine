"use client"

import { useState, useMemo } from "react"
import { ArrowLeft, Plus, Users, Bed, Wifi, Trash2, Loader, Check, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { rooms } from "@/lib/data"
import Image from "next/image"
import CalendarSelectionPopup from "@/components/calendar-selection-popup" // Import the new component
import { format } from "date-fns"
import { vi } from "date-fns/locale"

// Define a type for a single booking
interface Booking {
  id: string
  roomQuantities: { [key: string]: number }
  roomPolicies: { [key: string]: { breakfast: string | null; cancellation: string | null } }
  expandedRooms: string[]
}

export default function RoomSelection() {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "booking-1",
      roomQuantities: {},
      roomPolicies: {},
      expandedRooms: [],
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [includeBreakfastFilter, setIncludeBreakfastFilter] = useState(false)
  const [freeCancellationFilter, setFreeCancellationFilter] = useState(false)
  const [isCalendarPopupOpen, setIsCalendarPopupOpen] = useState(false) // State for popup visibility
  const [selectedBookingStartDate, setSelectedBookingStartDate] = useState<Date | null>(new Date(2025, 3, 25)) // April 25, 2025
  const [selectedBookingEndDate, setSelectedBookingEndDate] = useState<Date | null>(new Date(2025, 3, 27)) // April 27, 2025

  const handleAddBooking = () => {
    const newBookingId = `booking-${bookings.length + 1}`
    setBookings((prev) => [
      ...prev,
      {
        id: newBookingId,
        roomQuantities: {},
        roomPolicies: {},
        expandedRooms: [],
      },
    ])
  }

  const handleRemoveBooking = (bookingId: string) => {
    if (bookings.length === 1 && bookingId === "booking-1") {
      // Prevent removing the last booking (BOOKING 1)
      return
    }
    setBookings((prev) => prev.filter((booking) => booking.id !== bookingId))
  }

  const handleRoomExpand = (bookingId: string, roomId: string) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) => {
        if (booking.id === bookingId) {
          const isExpanded = booking.expandedRooms.includes(roomId)
          const newExpandedRooms = isExpanded
            ? booking.expandedRooms.filter((id) => id !== roomId)
            : [...booking.expandedRooms, roomId]

          const newRoomQuantities = { ...booking.roomQuantities }
          if (!newRoomQuantities[roomId]) {
            newRoomQuantities[roomId] = 1
          }

          const newRoomPolicies = { ...booking.roomPolicies }
          if (!newRoomPolicies[roomId]) {
            newRoomPolicies[roomId] = { breakfast: null, cancellation: null }
          }

          return {
            ...booking,
            expandedRooms: newExpandedRooms,
            roomQuantities: newRoomQuantities,
            roomPolicies: newRoomPolicies,
          }
        }
        return booking
      }),
    )
  }

  const updateQuantity = (bookingId: string, roomId: string, change: number) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) => {
        if (booking.id === bookingId) {
          const currentQuantity = booking.roomQuantities[roomId] || 1
          const newQuantity = Math.max(1, currentQuantity + change)
          return {
            ...booking,
            roomQuantities: {
              ...booking.roomQuantities,
              [roomId]: newQuantity,
            },
          }
        }
        return booking
      }),
    )
  }

  const updatePolicy = (
    bookingId: string,
    roomId: string,
    type: "breakfast" | "cancellation",
    value: string | null,
  ) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) => {
        if (booking.id === bookingId) {
          return {
            ...booking,
            roomPolicies: {
              ...booking.roomPolicies[roomId],
              [type]: value,
            },
          }
        }
        return booking
      }),
    )
  }

  const handleReset = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setBookings([
        {
          id: "booking-1",
          roomQuantities: {},
          roomPolicies: {},
          expandedRooms: [],
        },
      ])
      setIncludeBreakfastFilter(false)
      setFreeCancellationFilter(false)
      setSelectedBookingStartDate(new Date(2025, 3, 25)) // Reset to initial dates
      setSelectedBookingEndDate(new Date(2025, 3, 27))
    }, 2000)
  }

  const totalOverallPrice = useMemo(() => {
    return bookings.reduce((overallSum, booking) => {
      const bookingTotalPrice = Object.entries(booking.roomQuantities).reduce((sum, [roomId, quantity]) => {
        const room = rooms.find((r) => r.id === roomId)
        return sum + (room?.price || 0) * quantity
      }, 0)
      return overallSum + bookingTotalPrice
    }, 0)
  }, [bookings])

  const totalSelectedRoomsCount = useMemo(() => {
    return bookings.reduce((count, booking) => {
      return count + Object.values(booking.roomQuantities).reduce((sum, quantity) => sum + quantity, 0)
    }, 0)
  }, [bookings])

  const handleApplyDates = (startDate: Date | null, endDate: Date | null) => {
    setSelectedBookingStartDate(startDate)
    setSelectedBookingEndDate(endDate)
    setIsCalendarPopupOpen(false)
  }

  const displayDateRange = useMemo(() => {
    if (selectedBookingStartDate && selectedBookingEndDate) {
      const diffTime = Math.abs(selectedBookingEndDate.getTime() - selectedBookingStartDate.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 // +1 to include both start and end day
      return (
        <>
          <span className="text-sm text-[#0a0a0a]">
            {format(selectedBookingStartDate, "dd/MM", { locale: vi })} -{" "}
            {format(selectedBookingEndDate, "dd/MM", { locale: vi })}
          </span>
          <span className="text-xs text-[#999999]">{diffDays} ngày</span>
        </>
      )
    } else if (selectedBookingStartDate) {
      return (
        <>
          <span className="text-sm text-[#0a0a0a]">{format(selectedBookingStartDate, "dd/MM", { locale: vi })}</span>
          <span className="text-xs text-[#999999]">1 ngày</span>
        </>
      )
    }
    return (
      <>
        <span className="text-sm text-[#0a0a0a]">Chọn ngày</span>
        <span className="text-xs text-[#999999]"></span>
      </>
    )
  }, [selectedBookingStartDate, selectedBookingEndDate])

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
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {bookings.map((booking, index) => (
            <Button
              key={booking.id}
              variant="secondary"
              className="h-10 px-4 flex items-center justify-center bg-[#0a0a0a] text-white rounded-full hover:bg-[#0a0a0a]"
              onClick={() => booking.id !== "booking-1" && handleRemoveBooking(booking.id)}
            >
              BOOKING {index + 1}
              {booking.id !== "booking-1" && <Trash2 className="h-4 w-4 ml-2 text-white" />}
            </Button>
          ))}
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 border border-black rounded-full"
            onClick={() => {
              handleAddBooking()
              setIsCalendarPopupOpen(true)
            }}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Filter Tags */}
        <div className="flex gap-2 mb-4">
          <Button
            variant="outline"
            className={`rounded-full h-10 px-4 ${
              includeBreakfastFilter
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-gray-200 bg-white text-[#0a0a0a]"
            }`}
            onClick={() => setIncludeBreakfastFilter(!includeBreakfastFilter)}
          >
            Bao gồm bữa sáng
          </Button>
          <Button
            variant="outline"
            className={`rounded-full h-10 px-4 ${
              freeCancellationFilter
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-gray-200 bg-white text-[#0a0a0a]"
            }`}
            onClick={() => setFreeCancellationFilter(!freeCancellationFilter)}
          >
            Hủy miễn phí
          </Button>
          <Button
            variant="outline"
            className="rounded-full h-10 px-4 cursor-pointer hover:bg-gray-100"
            onClick={handleReset}
          >
            Reset
          </Button>
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
        {bookings.map((booking) => (
          <div key={booking.id}>
            {/* Phòng Sơn Ca Card */}
            {(() => {
              const room = rooms.find((r) => r.id === "1") // Find the specific room object
              if (!room) return null // Handle case where room is not found
              return (
                <div
                  key={`${booking.id}-${room.id}`}
                  className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 mb-4"
                >
                  {/* Room Images */}
                  <div className="grid grid-cols-5 gap-2 mb-4 p-2 border border-gray-100 rounded-2xl bg-gray-50/30">
                    {/* Large image on the left */}
                    <div className="col-span-3 relative aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                      <Image
                        src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484553_66ab07495d890.webp"
                        alt="Phòng Sơn Ca main image"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 60vw, 300px"
                      />
                    </div>

                    {/* Two stacked images on the right */}
                    <div className="col-span-2 grid grid-rows-2 gap-2">
                      <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                        <Image
                          src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484553_66ab07496a2ee.webp"
                          alt="Phòng Sơn Ca secondary image 1"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 40vw, 200px"
                        />
                      </div>
                      <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-300 to-gray-400 shadow-sm flex items-center justify-center">
                        <Image
                          src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484553_66ab07496dcbb.webp"
                          alt="Phòng Sơn Ca secondary image 1"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 40vw, 200px"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Room Info */}
                  <h3 className="text-lg font-semibold text-[#0a0a0a] mb-2">Phòng Sơn Ca</h3>

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
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-lg font-semibold text-[#0a0a0a]">Giá từ 500.000đ</span>
                    </div>
                    {!booking.expandedRooms.includes(room.id) ? (
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
                          className="h-8 w-8 rounded"
                          onClick={() => updateQuantity(booking.id, room.id, -1)}
                        >
                          <span className="text-lg">-</span>
                        </Button>
                        <span className="w-8 text-center font-medium">{booking.roomQuantities[room.id] || 1}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded"
                          onClick={() => updateQuantity(booking.id, room.id, 1)}
                        >
                          <span className="text-lg">+</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded border border-gray-300 text-gray-500"
                          onClick={() => {
                            setBookings((prevBookings) =>
                              prevBookings.map((b) => {
                                if (b.id === booking.id) {
                                  const newExpandedRooms = b.expandedRooms.filter((id) => id !== room.id)
                                  const newRoomQuantities = { ...b.roomQuantities }
                                  delete newRoomQuantities[room.id]
                                  return { ...b, expandedRooms: newExpandedRooms, roomQuantities: newRoomQuantities }
                                }
                                return b
                              }),
                            )
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Inline Options */}
                  {booking.expandedRooms.includes(room.id) && (
                    <div className="space-y-4 pt-2">
                      {/* Breakfast Policy */}
                      <div>
                        <h4 className="font-medium text-[#0a0a0a] mb-3">Chính sách ăn sáng</h4>
                        <div className="space-y-2">
                          <div
                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${
                              booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng"
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 bg-white"
                            }`}
                            onClick={() => updatePolicy(booking.id, room.id, "breakfast", "Bao gồm bữa sáng")}
                          >
                            <div className="relative">
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng"
                                    ? "bg-blue-500 border-blue-500 shadow-sm"
                                    : "border-gray-300"
                                }`}
                              >
                                {booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng" && (
                                  <Check className="w-3 h-3 text-white" />
                                )}
                              </div>
                            </div>
                            <span className="text-sm text-[#0a0a0a]">Bao gồm bữa sáng</span>
                          </div>
                          <div
                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${
                              booking.roomPolicies[room.id]?.breakfast === "Không gồm bữa sáng"
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 bg-white"
                            }`}
                            onClick={() => updatePolicy(booking.id, room.id, "breakfast", "Không gồm bữa sáng")}
                          >
                            <div className="relative">
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  booking.roomPolicies[room.id]?.breakfast === "Không gồm bữa sáng"
                                    ? "bg-blue-500 border-blue-500 shadow-sm"
                                    : "border-gray-300"
                                }`}
                              >
                                {booking.roomPolicies[room.id]?.breakfast === "Không gồm bữa sáng" && (
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
                              booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 15/06/2025"
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
                                  booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 15/06/2025"
                                    ? "bg-blue-500 border-blue-500 shadow-sm"
                                    : "border-gray-300"
                                }`}
                              >
                                {booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 15/06/2025" && (
                                  <Check className="w-3 h-3 text-white" />
                                )}
                              </div>
                            </div>
                            <span className="text-sm text-[#0a0a0a]">Hủy miễn phí trước 15/06/2025</span>
                          </div>
                          <div
                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${
                              booking.roomPolicies[room.id]?.cancellation === "Không hoàn tiền"
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 bg-white"
                            }`}
                            onClick={() => updatePolicy(booking.id, room.id, "cancellation", "Không hoàn tiền")}
                          >
                            <div className="relative">
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  booking.roomPolicies[room.id]?.cancellation === "Không hoàn tiền"
                                    ? "bg-blue-500 border-blue-500 shadow-sm"
                                    : "border-gray-300"
                                }`}
                              >
                                {booking.roomPolicies[room.id]?.cancellation === "Không hoàn tiền" && (
                                  <Check className="w-3 h-3 text-white" />
                                )}
                              </div>
                            </div>
                            <span className="text-sm text-[#0a0a0a]">Không hoàn tiền</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })()}

            {/* Phòng Nhật Bản Card */}
            {(() => {
              const room = rooms.find((r) => r.id === "2") // Find the specific room object
              if (!room) return null
              return (
                <div
                  key={`${booking.id}-${room.id}`}
                  className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 mb-4"
                >
                  {/* Room Images */}
                  <div className="grid grid-cols-5 gap-2 mb-4 p-2 border border-gray-100 rounded-2xl bg-gray-50/30">
                    {/* Large image on the left */}
                    <div className="col-span-3 relative aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                      <Image
                        src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484654_66ab07ae9a798.webp"
                        alt="Phòng Nhật Bản main image"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 60vw, 300px"
                      />
                    </div>

                    {/* Two stacked images on the right */}
                    <div className="col-span-2 grid grid-rows-2 gap-2">
                      <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                        <Image
                          src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484654_66ab07ae991b4.webp"
                          alt="Phòng Nhật Bản secondary image 1"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 40vw, 200px"
                        />
                      </div>
                      <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-300 to-gray-400 shadow-sm flex items-center justify-center">
                        <Image
                          src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484654_66ab07ae9d737.webp"
                          alt="Phòng Nhật Bản secondary image 1"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 40vw, 200px"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Room Info */}
                  <h3 className="text-lg font-semibold text-[#0a0a0a] mb-2">Phòng Nhật Bản</h3>

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
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-lg font-semibold text-[#0a0a0a]">Giá từ 500.000đ</span>
                    </div>
                    {!booking.expandedRooms.includes(room.id) ? (
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
                          className="h-8 w-8 rounded"
                          onClick={() => updateQuantity(booking.id, room.id, -1)}
                        >
                          <span className="text-lg">-</span>
                        </Button>
                        <span className="w-8 text-center font-medium">{booking.roomQuantities[room.id] || 1}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded"
                          onClick={() => updateQuantity(booking.id, room.id, 1)}
                        >
                          <span className="text-lg">+</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded border border-gray-300 text-gray-500"
                          onClick={() => {
                            setBookings((prevBookings) =>
                              prevBookings.map((b) => {
                                if (b.id === booking.id) {
                                  const newExpandedRooms = b.expandedRooms.filter((id) => id !== room.id)
                                  const newRoomQuantities = { ...b.roomQuantities }
                                  delete newRoomQuantities[room.id]
                                  return { ...b, expandedRooms: newExpandedRooms, roomQuantities: newRoomQuantities }
                                }
                                return b
                              }),
                            )
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Inline Options */}
                  {booking.expandedRooms.includes(room.id) && (
                    <div className="space-y-4 pt-2">
                      {/* Breakfast Policy */}
                      <div>
                        <h4 className="font-medium text-[#0a0a0a] mb-3">Chính sách ăn sáng</h4>
                        <div className="space-y-2">
                          <div
                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${
                              booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng"
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 bg-white"
                            }`}
                            onClick={() => updatePolicy(booking.id, room.id, "breakfast", "Bao gồm bữa sáng")}
                          >
                            <div className="relative">
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng"
                                    ? "bg-blue-500 border-blue-500 shadow-sm"
                                    : "border-gray-300"
                                }`}
                              >
                                {booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng" && (
                                  <Check className="w-3 h-3 text-white" />
                                )}
                              </div>
                            </div>
                            <span className="text-sm text-[#0a0a0a]">Bao gồm bữa sáng</span>
                          </div>
                          <div
                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${
                              booking.roomPolicies[room.id]?.breakfast === "Không gồm bữa sáng"
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 bg-white"
                            }`}
                            onClick={() => updatePolicy(booking.id, room.id, "breakfast", "Không gồm bữa sáng")}
                          >
                            <div className="relative">
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  booking.roomPolicies[room.id]?.breakfast === "Không gồm bữa sáng"
                                    ? "bg-blue-500 border-blue-500 shadow-sm"
                                    : "border-gray-300"
                                }`}
                              >
                                {booking.roomPolicies[room.id]?.breakfast === "Không gồm bữa sáng" && (
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
                              booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 15/06/2025"
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
                                  booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 15/06/2025"
                                    ? "bg-blue-500 border-blue-500 shadow-sm"
                                    : "border-gray-300"
                                }`}
                              >
                                {booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 15/06/2025" && (
                                  <Check className="w-3 h-3 text-white" />
                                )}
                              </div>
                            </div>
                            <span className="text-sm text-[#0a0a0a]">Hủy miễn phí trước 15/06/2025</span>
                          </div>
                          <div
                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${
                              booking.roomPolicies[room.id]?.cancellation === "Không hoàn tiền"
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 bg-white"
                            }`}
                            onClick={() => updatePolicy(booking.id, room.id, "cancellation", "Không hoàn tiền")}
                          >
                            <div className="relative">
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  booking.roomPolicies[room.id]?.cancellation === "Không hoàn tiền"
                                    ? "bg-blue-500 border-blue-500 shadow-sm"
                                    : "border-gray-300"
                                }`}
                              >
                                {booking.roomPolicies[room.id]?.cancellation === "Không hoàn tiền" && (
                                  <Check className="w-3 h-3 text-white" />
                                )}
                              </div>
                            </div>
                            <span className="text-sm text-[#0a0a0a]">Không hoàn tiền</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })()}

            {/* Phòng Mập Mờ Card */}
            {(() => {
              const room = rooms.find((r) => r.id === "3") // Find the specific room object
              if (!room) return null
              return (
                <div
                  key={`${booking.id}-${room.id}`}
                  className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 mb-4"
                >
                  {/* Room Images */}
                  <div className="grid grid-cols-5 gap-2 mb-4 p-2 border border-gray-100 rounded-2xl bg-gray-50/30">
                    {/* Large image on the left */}
                    <div className="col-span-3 relative aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                      <Image
                        src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484766_66ab081e79ed3.webp"
                        alt="Phòng Mập Mờ main image"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 60vw, 300px"
                      />
                    </div>

                    {/* Two stacked images on the right */}
                    <div className="col-span-2 grid grid-rows-2 gap-2">
                      <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                        <Image
                          src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484766_66ab081e7cfea.webp"
                          alt="Phòng Mập Mờ secondary image 1"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 40vw, 200px"
                        />
                      </div>
                      <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-300 to-gray-400 shadow-sm flex items-center justify-center">
                        <Image
                          src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484766_66ab081e7e4b0.webp"
                          alt="Phòng Mập Mờ secondary image 1"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 40vw, 200px"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Room Info */}
                  <h3 className="text-lg font-semibold text-[#0a0a0a] mb-2">Phòng Mập Mờ</h3>

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
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-lg font-semibold text-[#0a0a0a]">Giá từ 500.000đ</span>
                    </div>
                    {!booking.expandedRooms.includes(room.id) ? (
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
                          className="h-8 w-8 rounded"
                          onClick={() => updateQuantity(booking.id, room.id, -1)}
                        >
                          <span className="text-lg">-</span>
                        </Button>
                        <span className="w-8 text-center font-medium">{booking.roomQuantities[room.id] || 1}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded"
                          onClick={() => updateQuantity(booking.id, room.id, 1)}
                        >
                          <span className="text-lg">+</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded border border-gray-300 text-gray-500"
                          onClick={() => {
                            setBookings((prevBookings) =>
                              prevBookings.map((b) => {
                                if (b.id === booking.id) {
                                  const newExpandedRooms = b.expandedRooms.filter((id) => id !== room.id)
                                  const newRoomQuantities = { ...b.roomQuantities }
                                  delete newRoomQuantities[room.id]
                                  return { ...b, expandedRooms: newExpandedRooms, roomQuantities: newRoomQuantities }
                                }
                                return b
                              }),
                            )
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Inline Options */}
                  {booking.expandedRooms.includes(room.id) && (
                    <div className="space-y-4 pt-2">
                      {/* Breakfast Policy */}
                      <div>
                        <h4 className="font-medium text-[#0a0a0a] mb-3">Chính sách ăn sáng</h4>
                        <div className="space-y-2">
                          <div
                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${
                              booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng"
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 bg-white"
                            }`}
                            onClick={() => updatePolicy(booking.id, room.id, "breakfast", "Bao gồm bữa sáng")}
                          >
                            <div className="relative">
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng"
                                    ? "bg-blue-500 border-blue-500 shadow-sm"
                                    : "border-gray-300"
                                }`}
                              >
                                {booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng" && (
                                  <Check className="w-3 h-3 text-white" />
                                )}
                              </div>
                            </div>
                            <span className="text-sm text-[#0a0a0a]">Bao gồm bữa sáng</span>
                          </div>
                          <div
                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${
                              booking.roomPolicies[room.id]?.breakfast === "Không gồm bữa sáng"
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 bg-white"
                            }`}
                            onClick={() => updatePolicy(booking.id, room.id, "breakfast", "Không gồm bữa sáng")}
                          >
                            <div className="relative">
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  booking.roomPolicies[room.id]?.breakfast === "Không gồm bữa sáng"
                                    ? "bg-blue-500 border-blue-500 shadow-sm"
                                    : "border-gray-300"
                                }`}
                              >
                                {booking.roomPolicies[room.id]?.breakfast === "Không gồm bữa sáng" && (
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
                              booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 15/06/2025"
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
                                  booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 15/06/2025"
                                    ? "bg-blue-500 border-blue-500 shadow-sm"
                                    : "border-gray-300"
                                }`}
                              >
                                {booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 15/06/2025" && (
                                  <Check className="w-3 h-3 text-white" />
                                )}
                              </div>
                            </div>
                            <span className="text-sm text-[#0a0a0a]">Hủy miễn phí trước 15/06/2025</span>
                          </div>
                          <div
                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${
                              booking.roomPolicies[room.id]?.cancellation === "Không hoàn tiền"
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 bg-white"
                            }`}
                            onClick={() => updatePolicy(booking.id, room.id, "cancellation", "Không hoàn tiền")}
                          >
                            <div className="relative">
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  booking.roomPolicies[room.id]?.cancellation === "Không hoàn tiền"
                                    ? "bg-blue-500 border-blue-500 shadow-sm"
                                    : "border-gray-300"
                                }`}
                              >
                                {booking.roomPolicies[room.id]?.cancellation === "Không hoàn tiền" && (
                                  <Check className="w-3 h-3 text-white" />
                                )}
                              </div>
                            </div>
                            <span className="text-sm text-[#0a0a0a]">Không hoàn tiền</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })()}

            {/* Phòng Santorini Card */}
            {(() => {
              const room = rooms.find((r) => r.id === "4") // Assuming a new room ID for Santorini
              if (!room) return null
              return (
                <div
                  key={`${booking.id}-${room.id}`}
                  className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 mb-4"
                >
                  {/* Room Images */}
                  <div className="grid grid-cols-5 gap-2 mb-4 p-2 border border-gray-100 rounded-2xl bg-gray-50/30">
                    {/* Large image on the left */}
                    <div className="col-span-3 relative aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                      <Image
                        src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484894_66ab089e3f2d2.webp"
                        alt="Phòng Santorini main image"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 60vw, 300px"
                      />
                    </div>

                    {/* Two stacked images on the right */}
                    <div className="col-span-2 grid grid-rows-2 gap-2">
                      <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                        <Image
                          src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484894_66ab089e4a8ed.webp"
                          alt="Phòng Santorini secondary image 1"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 40vw, 200px"
                        />
                      </div>
                      <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-300 to-gray-400 shadow-sm flex items-center justify-center">
                        <Image
                          src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484894_66ab089e4f0ca.webp"
                          alt="Phòng Santorini secondary image 1"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 40vw, 200px"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Room Info */}
                  <h3 className="text-lg font-semibold text-[#0a0a0a] mb-2">Phòng Santorini</h3>

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
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-lg font-semibold text-[#0a0a0a]">Giá từ 500.000đ</span>
                    </div>
                    {!booking.expandedRooms.includes(room.id) ? (
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
                          className="h-8 w-8 rounded"
                          onClick={() => updateQuantity(booking.id, room.id, -1)}
                        >
                          <span className="text-lg">-</span>
                        </Button>
                        <span className="w-8 text-center font-medium">{booking.roomQuantities[room.id] || 1}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded"
                          onClick={() => updateQuantity(booking.id, room.id, 1)}
                        >
                          <span className="text-lg">+</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded border border-gray-300 text-gray-500"
                          onClick={() => {
                            setBookings((prevBookings) =>
                              prevBookings.map((b) => {
                                if (b.id === booking.id) {
                                  const newExpandedRooms = b.expandedRooms.filter((id) => id !== room.id)
                                  const newRoomQuantities = { ...b.roomQuantities }
                                  delete newRoomQuantities[room.id]
                                  return { ...b, expandedRooms: newExpandedRooms, roomQuantities: newRoomQuantities }
                                }
                                return b
                              }),
                            )
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Inline Options */}
                  {booking.expandedRooms.includes(room.id) && (
                    <div className="space-y-4 pt-2">
                      {/* Breakfast Policy */}
                      <div>
                        <h4 className="font-medium text-[#0a0a0a] mb-3">Chính sách ăn sáng</h4>
                        <div className="space-y-2">
                          <div
                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${
                              booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng"
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 bg-white"
                            }`}
                            onClick={() => updatePolicy(booking.id, room.id, "breakfast", "Bao gồm bữa sáng")}
                          >
                            <div className="relative">
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng"
                                    ? "bg-blue-500 border-blue-500 shadow-sm"
                                    : "border-gray-300"
                                }`}
                              >
                                {booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng" && (
                                  <Check className="w-3 h-3 text-white" />
                                )}
                              </div>
                            </div>
                            <span className="text-sm text-[#0a0a0a]">Bao gồm bữa sáng</span>
                          </div>
                          <div
                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${
                              booking.roomPolicies[room.id]?.breakfast === "Không gồm bữa sáng"
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 bg-white"
                            }`}
                            onClick={() => updatePolicy(booking.id, room.id, "breakfast", "Không gồm bữa sáng")}
                          >
                            <div className="relative">
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  booking.roomPolicies[room.id]?.breakfast === "Không gồm bữa sáng"
                                    ? "bg-blue-500 border-blue-500 shadow-sm"
                                    : "border-gray-300"
                                }`}
                              >
                                {booking.roomPolicies[room.id]?.breakfast === "Không gồm bữa sáng" && (
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
                              booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 15/06/2025"
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
                                  booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 15/06/2025"
                                    ? "bg-blue-500 border-blue-500 shadow-sm"
                                    : "border-gray-300"
                                }`}
                              >
                                {booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 15/06/2025" && (
                                  <Check className="w-3 h-3 text-white" />
                                )}
                              </div>
                            </div>
                            <span className="text-sm text-[#0a0a0a]">Hủy miễn phí trước 15/06/2025</span>
                          </div>
                          <div
                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${
                              booking.roomPolicies[room.id]?.cancellation === "Không hoàn tiền"
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 bg-white"
                            }`}
                            onClick={() => updatePolicy(booking.id, room.id, "cancellation", "Không hoàn tiền")}
                          >
                            <div className="relative">
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  booking.roomPolicies[room.id]?.cancellation === "Không hoàn tiền"
                                    ? "bg-blue-500 border-blue-500 shadow-sm"
                                    : "border-gray-300"
                                }`}
                              >
                                {booking.roomPolicies[room.id]?.cancellation === "Không hoàn tiền" && (
                                  <Check className="w-3 h-3 text-white" />
                                )}
                              </div>
                            </div>
                            <span className="text-sm text-[#0a0a0a]">Không hoàn tiền</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })()}
          </div>
        ))}
      </div>

      {/* Bottom Summary */}
      {totalSelectedRoomsCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsCalendarPopupOpen(true)}>
                <div className="relative w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Calendar className="lucide lucide-calendar text-[#0a0a0a]" />
                  <span className="absolute text-xs font-bold text-[#0a0a0a]">
                    {selectedBookingStartDate ? format(selectedBookingStartDate, "dd") : "Chọn"}
                  </span>
                </div>
                <div className="flex flex-col">{displayDateRange}</div>
              </div>
              <div>
                <div className="text-lg font-medium text-[#0a0a0a]">{totalOverallPrice.toLocaleString()}đ</div>
                <div className="text-xs text-[#999999]">Giá trên đã bao gồm thuế và phí dịch vụ</div>
              </div>
            </div>
            <Link href="/payment">
              <Button className="w-full bg-[#0a0a0a] hover:bg-[#000000] text-white py-3 rounded-lg">Hoàn tất</Button>
            </Link>
          </div>
        </div>
      )}

      <div className="h-24" />

      {/* Calendar Selection Popup */}
      <CalendarSelectionPopup
        isOpen={isCalendarPopupOpen}
        onClose={() => setIsCalendarPopupOpen(false)}
        onApply={handleApplyDates}
        initialStartDate={selectedBookingStartDate}
        initialEndDate={selectedBookingEndDate}
      />
    </div>
  )
}
