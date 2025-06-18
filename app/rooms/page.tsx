"use client"

import { useState, useMemo } from "react"
import {
  ArrowLeft,
  Plus,
  Users,
  Bed,
  Wifi,
  Trash2,
  Loader,
  Check,
  CalendarDays,
  ImageIcon,
  Building,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { rooms } from "@/lib/data"
import ImageComponent from "next/image"
import CalendarSelectionPopup from "@/components/calendar-selection-popup"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import ImageGalleryModal from "@/components/image-gallery-modal"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import HotelIntroDrawer from "@/components/hotel-intro-drawer"
import { useRouter } from "next/navigation"

// Define a type for a single booking
interface Booking {
  id: string
  roomQuantities: { [key: string]: number }
  roomPolicies: { [key: string]: { breakfast: string | null; cancellation: string | null; bedType: string | null } }
  expandedRooms: string[]
}

export default function RoomSelection() {
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "booking-1",
      roomQuantities: {},
      roomPolicies: rooms.reduce((acc, room) => {
        acc[room.id] = { breakfast: null, cancellation: null, bedType: "1 giường king" }
        return acc
      }, {}),
      expandedRooms: [],
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [includeBreakfastFilter, setIncludeBreakfastFilter] = useState(false)
  const [freeCancellationFilter, setFreeCancellationFilter] = useState(false)
  const [isCalendarPopupOpen, setIsCalendarPopupOpen] = useState(true)
  const [selectedBookingStartDate, setSelectedBookingStartDate] = useState<Date | null>(new Date(2025, 3, 25))
  const [selectedBookingEndDate, setSelectedBookingEndDate] = useState<Date | null>(new Date(2025, 3, 27))
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [currentGalleryImages, setCurrentGalleryImages] = useState<string[]>([])
  const [isHotelIntroDrawerOpen, setIsHotelIntroDrawerOpen] = useState(false)
  const [activeBookingId, setActiveBookingId] = useState<string>("booking-1");

  const hotelName = "69 Boutique by Minova"
  const hotelAddress = "69 Ng. 53 Đ. Nguyễn Ngọc Vũ, Trung Hoà, Cầu Giấy, Hà Nội"

  // All handler functions are kept as is
  const handleAddBooking = () => {
    const newBookingId = `booking-${bookings.length + 1}`;
    setBookings((prev) => [
      ...prev,
      {
        id: newBookingId,
        roomQuantities: {},
        roomPolicies: rooms.reduce((acc, room) => {
          acc[room.id] = { breakfast: null, cancellation: null, bedType: "1 giường king" }
          return acc
        }, {}),
        expandedRooms: [],
      },
    ]);
    setActiveBookingId(newBookingId);
    setIsCalendarPopupOpen(true);
  };

  const handleRemoveBooking = (bookingId: string) => {
    if (bookings.length === 1) {
      return;
    }
    
    setBookings((prev) => {
      const updatedBookings = prev.filter((booking) => booking.id !== bookingId);
      return updatedBookings;
    });
    
    // If we're removing the active booking, select the first available booking
    if (activeBookingId === bookingId) {
      setActiveBookingId(bookings.find(b => b.id !== bookingId)?.id || "booking-1");
    }
  };

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
            newRoomPolicies[roomId] = { breakfast: null, cancellation: null, bedType: "1 giường king" }
          } else if (newRoomPolicies[roomId].bedType === undefined || newRoomPolicies[roomId].bedType === null) {
            newRoomPolicies[roomId].bedType = "1 giường king"
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
          const currentRoomPolicy = booking.roomPolicies[roomId] || {
            breakfast: null,
            cancellation: null,
            bedType: null,
          }
          return {
            ...booking,
            roomPolicies: {
              ...booking.roomPolicies,
              [roomId]: {
                ...currentRoomPolicy,
                [type]: value,
              },
            },
          }
        }
        return booking
      }),
    )
  }

  const updateBedType = (bookingId: string, roomId: string, value: string | null) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) => {
        if (booking.id === bookingId) {
          const currentRoomPolicy = booking.roomPolicies[roomId] || {
            breakfast: null,
            cancellation: null,
            bedType: null,
          }
          return {
            ...booking,
            roomPolicies: {
              ...booking.roomPolicies,
              [roomId]: {
                ...currentRoomPolicy,
                bedType: value,
              },
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
      setSelectedBookingStartDate(new Date(2025, 3, 25))
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
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
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
    <div
      className="min-h-screen relative bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('/placeholder.svg?height=1080&width=1920')",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <ArrowLeft className="h-6 w-6 text-[#0a0a0a]" />
          </Button>
        </Link>
        <h1 className="text-lg font-medium text-[#0a0a0a]">CHỌN PHÒNG</h1>
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            onClick={() => setIsHotelIntroDrawerOpen(true)}
          ></Button>
        </div>
      </div>

      {/* Booking Info */}
      <div className="p-4 bg-gray-50/90 backdrop-blur-sm">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {bookings.map((booking, index) => (
            <div key={booking.id} className="flex items-center">
              <Button
                variant="secondary"
                className={`h-10 px-4 flex items-center justify-center rounded-l-full ${
                  activeBookingId === booking.id 
                    ? "bg-[#0a0a0a] text-white" 
                    : "bg-gray-200 text-[#0a0a0a] hover:bg-gray-300"
                }`}
                onClick={() => setActiveBookingId(booking.id)}
              >
                BOOKING {index + 1}
              </Button>
              {bookings.length > 1 && (
                <Button
                  variant="secondary"
                  size="icon"
                  className={`h-10 w-10 rounded-r-full border-l border-white/20 ${
                    activeBookingId === booking.id 
                      ? "bg-[#0a0a0a] text-white" 
                      : "bg-gray-200 text-[#0a0a0a] hover:bg-gray-300"
                  }`}
                  onClick={() => handleRemoveBooking(booking.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 border border-black rounded-full bg-white/50"
            onClick={() => {
              handleAddBooking();
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
            className="rounded-full h-10 px-4 cursor-pointer hover:bg-gray-100 bg-white"
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
          booking.id === activeBookingId && (
            <div key={booking.id}>
              {/* === PHÒNG SƠN CA === */}
              {(() => {
                const room = rooms.find((r) => r.id === "1")
                if (!room) return null
                return (
                  <div
                    key={`${booking.id}-${room.id}`}
                    className="relative border border-gray-200/50 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow duration-200 mb-4"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl opacity-55"></div>
                    <div className="relative">
                      <div className="grid grid-cols-5 gap-2 mb-4 rounded-2xl bg-gray-50/30">
                        <div className="col-span-3 relative aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                          <ImageComponent
                            src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484553_66ab07495d890.webp"
                            alt="Phòng Sơn Ca main image"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 60vw, 300px"
                          />
                        </div>
                        <div className="col-span-2 grid grid-rows-2 gap-2">
                          <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                            <ImageComponent
                              src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484553_66ab07496a2ee.webp"
                              alt="Phòng Sơn Ca secondary image 1"
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 40vw, 200px"
                            />
                          </div>
                          <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-300 to-gray-400 shadow-sm flex items-center justify-center">
                            <ImageComponent
                              src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484553_66ab07496c812.webp"
                              alt="Phòng Sơn Ca secondary image 2"
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 40vw, 200px"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute bottom-2 right-2 bg-black/50 text-white rounded-full px-2 py-1 text-xs flex items-center gap-0.5 hover:bg-black/70"
                              onClick={() => {
                                setIsGalleryOpen(true)
                                setCurrentGalleryImages([
                                  "https://s3.go2joy.vn/1000w/hotel/543/9167_1722484553_66ab07495d890.webp",
                                  "https://s3.go2joy.vn/1000w/hotel/543/9167_1722484553_66ab07496a2ee.webp",
                                  "https://s3.go2joy.vn/1000w/hotel/543/9167_1722484553_66ab07496b5c0.webp",
                                  "https://s3.go2joy.vn/1000w/hotel/543/9167_1722484553_66ab07496c812.webp",
                                  "https://s3.go2joy.vn/1000w/hotel/543/9167_1722484553_66ab07496dcbb.webp",
                                  "https://s3.go2joy.vn/1000w/hotel/543/9167_1722484553_66ab074968e9e.webp",
                                ])
                              }}
                            >
                              <ImageIcon className="h-3 w-3" />
                              <span>6</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-[#0a0a0a] mb-2">Phòng Sơn Ca</h3>
                      <div className="mb-3">
                        <RadioGroup
                          value={booking.roomPolicies[room.id]?.bedType || "1 giường king"}
                          onValueChange={(value) => updateBedType(booking.id, room.id, value)}
                          className="flex flex-wrap gap-2"
                        >
                          <div
                            className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                              booking.roomPolicies[room.id]?.bedType === "1 giường king"
                                ? "border-black bg-black text-white"
                                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            <RadioGroupItem
                              value="1 giường king"
                              id={`booking-${booking.id}-room-${room.id}-bed-king`}
                              className="sr-only"
                            />
                            <label
                              htmlFor={`booking-${booking.id}-room-${room.id}-bed-king`}
                              className="text-sm font-medium cursor-pointer"
                            >
                              1 giường king
                            </label>
                          </div>
                          <div
                            className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                              booking.roomPolicies[room.id]?.bedType === "2 giường đôi"
                                ? "border-black bg-black text-white"
                                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            <RadioGroupItem
                              value="2 giường đôi"
                              id={`booking-${booking.id}-room-${room.id}-bed-double`}
                              className="sr-only"
                            />
                            <label
                              htmlFor={`booking-${booking.id}-room-${room.id}-bed-double`}
                              className="text-sm font-medium cursor-pointer"
                            >
                              2 giường đôi
                            </label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm text-[#0a0a0a] mb-4">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4" />
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
                      {/* RATE PLAN SECTION RESTORED */}
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
                                onClick={() =>
                                  updatePolicy(
                                    booking.id,
                                    room.id,
                                    "breakfast",
                                    booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng"
                                      ? null
                                      : "Bao gồm bữa sáng",
                                  )
                                }
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
                                onClick={() =>
                                  updatePolicy(
                                    booking.id,
                                    room.id,
                                    "breakfast",
                                    booking.roomPolicies[room.id]?.breakfast === "Không gồm bữa sáng"
                                      ? null
                                      : "Không gồm bữa sáng",
                                  )
                                }
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
                                  updatePolicy(
                                    booking.id,
                                    room.id,
                                    "cancellation",
                                    booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 15/06/2025"
                                      ? null
                                      : "Hủy miễn phí trước 15/06/2025",
                                  )
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
                                onClick={() =>
                                  updatePolicy(
                                    booking.id,
                                    room.id,
                                    "cancellation",
                                    booking.roomPolicies[room.id]?.cancellation === "Không hoàn tiền"
                                      ? null
                                      : "Không hoàn tiền",
                                  )
                                }
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
                  </div>
                )
              })()}

              {/* === PHÒNG NHẬT BẢN === */}
              {(() => {
                const room = rooms.find((r) => r.id === "2")
                if (!room) return null
                return (
                  <div
                    key={`${booking.id}-${room.id}`}
                    className="relative border border-gray-200/50 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow duration-200 mb-4"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-teal-100 rounded-2xl opacity-55"></div>
                    <div className="relative">
                      <div className="grid grid-cols-5 gap-2 mb-4 rounded-2xl bg-gray-50/30">
                        <div className="col-span-3 relative aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                          <ImageComponent
                            src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484654_66ab07ae9a798.webp"
                            alt="Phòng Nhật Bản main image"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 60vw, 300px"
                          />
                        </div>
                        <div className="col-span-2 grid grid-rows-2 gap-2">
                          <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                            <ImageComponent
                              src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484654_66ab07ae95633.webp"
                              alt="Phòng Nhật Bản secondary image 1"
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 40vw, 200px"
                            />
                          </div>
                          <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-300 to-gray-400 shadow-sm flex items-center justify-center">
                            <ImageComponent
                              src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484654_66ab07ae9d737.webp"
                              alt="Phòng Nhật Bản secondary image 2"
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 40vw, 200px"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute bottom-2 right-2 bg-black/50 text-white rounded-full px-2 py-1 text-xs flex items-center gap-0.5 hover:bg-black/70"
                              onClick={() => {
                                setIsGalleryOpen(true)
                                setCurrentGalleryImages([
                                  "https://s3.go2joy.vn/1000w/hotel/543/9167_1722484654_66ab07ae89e19.webp",
                                  "https://s3.go2joy.vn/1000w/hotel/543/9167_1722484654_66ab07ae96b97.webp",
                                  "https://s3.go2joy.vn/1000w/hotel/543/9167_1722484654_66ab07ae97e57.webp",
                                  "https://s3.go2joy.vn/1000w/hotel/543/9167_1722484654_66ab07ae991b4.webp",
                                  "https://s3.go2joy.vn/1000w/hotel/543/9167_1722484654_66ab07ae9a798.webp",
                                  "https://s3.go2joy.vn/1000w/hotel/543/9167_1722484654_66ab07ae9c480.webp",
                                  "https://s3.go2joy.vn/1000w/hotel/543/9167_1722484654_66ab07ae9d737.webp",
                                ])
                              }}
                            >
                              <ImageIcon className="h-3 w-3" />
                              <span>6</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-[#0a0a0a] mb-2">Phòng Nhật Bản</h3>
                      <div className="mb-3">
                        <RadioGroup
                          value={booking.roomPolicies[room.id]?.bedType || "1 giường king"}
                          onValueChange={(value) => updateBedType(booking.id, room.id, value)}
                          className="flex flex-wrap gap-2"
                        >
                          <div
                            className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                              booking.roomPolicies[room.id]?.bedType === "1 giường king"
                                ? "border-black bg-black text-white"
                                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            <RadioGroupItem
                              value="1 giường king"
                              id={`booking-${booking.id}-room-${room.id}-bed-king`}
                              className="sr-only"
                            />
                            <label
                              htmlFor={`booking-${booking.id}-room-${room.id}-bed-king`}
                              className="text-sm font-medium cursor-pointer"
                            >
                              1 giường king
                            </label>
                          </div>
                          <div
                            className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                              booking.roomPolicies[room.id]?.bedType === "2 giường đôi"
                                ? "border-black bg-black text-white"
                                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            <RadioGroupItem
                              value="2 giường đôi"
                              id={`booking-${booking.id}-room-${room.id}-bed-double`}
                              className="sr-only"
                            />
                            <label
                              htmlFor={`booking-${booking.id}-room-${room.id}-bed-double`}
                              className="text-sm font-medium cursor-pointer"
                            >
                              2 giường đôi
                            </label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm text-[#0a0a0a] mb-4">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4" />
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
                      {/* RATE PLAN SECTION RESTORED */}
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
                                onClick={() =>
                                  updatePolicy(
                                    booking.id,
                                    room.id,
                                    "breakfast",
                                    booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng"
                                      ? null
                                      : "Bao gồm bữa sáng",
                                  )
                                }
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
                                onClick={() =>
                                  updatePolicy(
                                    booking.id,
                                    room.id,
                                    "breakfast",
                                    booking.roomPolicies[room.id]?.breakfast === "Không gồm bữa sáng"
                                      ? null
                                      : "Không gồm bữa sáng",
                                  )
                                }
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
                                  updatePolicy(
                                    booking.id,
                                    room.id,
                                    "cancellation",
                                    booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 15/06/2025"
                                      ? null
                                      : "Hủy miễn phí trước 15/06/2025",
                                  )
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
                                onClick={() =>
                                  updatePolicy(
                                    booking.id,
                                    room.id,
                                    "cancellation",
                                    booking.roomPolicies[room.id]?.cancellation === "Không hoàn tiền"
                                      ? null
                                      : "Không hoàn tiền",
                                  )
                                }
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
                  </div>
                )
              })()}

              {/* === PHÒNG MẬP MỜ === */}
              {(() => {
                const room = rooms.find((r) => r.id === "3")
                if (!room) return null
                return (
                  <div
                    key={`${booking.id}-${room.id}`}
                    className="relative border border-gray-200/50 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow duration-200 mb-4"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl opacity-55"></div>
                    <div className="relative">
                      <div className="grid grid-cols-5 gap-2 mb-4 rounded-2xl bg-gray-50/30">
                        <div className="col-span-3 relative aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                          <ImageComponent
                            src={"/placeholder.svg?height=400&width=300&query=Phòng%20Mập%20Mờ%20main%20image"}
                            alt={"Phòng Mập Mờ main image"}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 60vw, 300px"
                          />
                        </div>
                        <div className="col-span-2 grid grid-rows-2 gap-2">
                          <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                            <ImageComponent
                              src={"/placeholder.svg?height=200&width=200&query=Phòng%20Mập%20Mờ%20secondary%20image%201"}
                              alt={"Phòng Mập Mờ secondary image 1"}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 40vw, 200px"
                            />
                          </div>
                          <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-300 to-gray-400 shadow-sm flex items-center justify-center">
                            <ImageComponent
                              src={"/placeholder.svg?height=200&width=200&query=Phòng%20Mập%20Mờ%20secondary%20image%202"}
                              alt={"Phòng Mập Mờ secondary image 2"}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 40vw, 200px"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute bottom-2 right-2 bg-black/50 text-white rounded-full px-2 py-1 text-xs flex items-center gap-0.5 hover:bg-black/70"
                              onClick={() => {
                                setIsGalleryOpen(true)
                                setCurrentGalleryImages([
                                  "/placeholder.svg?height=400&width=300",
                                  "/placeholder.svg?height=200&width=200",
                                  "/placeholder.svg?height=200&width=200",
                                  "/placeholder.svg?height=200&width=200",
                                  "/placeholder.svg?height=200&width=200",
                                  "/placeholder.svg?height=200&width=200",
                                ])
                              }}
                            >
                              <ImageIcon className="h-3 w-3" />
                              <span>6</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-[#0a0a0a] mb-2">Phòng Mập Mờ</h3>
                      <div className="mb-3">
                        <RadioGroup
                          value={booking.roomPolicies[room.id]?.bedType || "1 giường king"}
                          onValueChange={(value) => updateBedType(booking.id, room.id, value)}
                          className="flex flex-wrap gap-2"
                        >
                          <div
                            className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                              booking.roomPolicies[room.id]?.bedType === "1 giường king"
                                ? "border-black bg-black text-white"
                                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            <RadioGroupItem
                              value="1 giường king"
                              id={`booking-${booking.id}-room-${room.id}-bed-king`}
                              className="sr-only"
                            />
                            <label
                              htmlFor={`booking-${booking.id}-room-${room.id}-bed-king`}
                              className="text-sm font-medium cursor-pointer"
                            >
                              1 giường king
                            </label>
                          </div>
                          <div
                            className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                              booking.roomPolicies[room.id]?.bedType === "2 giường đôi"
                                ? "border-black bg-black text-white"
                                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            <RadioGroupItem
                              value="2 giường đôi"
                              id={`booking-${booking.id}-room-${room.id}-bed-double`}
                              className="sr-only"
                            />
                            <label
                              htmlFor={`booking-${booking.id}-room-${room.id}-bed-double`}
                              className="text-sm font-medium cursor-pointer"
                            >
                              2 giường đôi
                            </label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm text-[#0a0a0a] mb-4">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4" />
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
                      {/* RATE PLAN SECTION RESTORED */}
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
                                onClick={() =>
                                  updatePolicy(
                                    booking.id,
                                    room.id,
                                    "breakfast",
                                    booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng"
                                      ? null
                                      : "Bao gồm bữa sáng",
                                  )
                                }
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
                                onClick={() =>
                                  updatePolicy(
                                    booking.id,
                                    room.id,
                                    "breakfast",
                                    booking.roomPolicies[room.id]?.breakfast === "Không gồm bữa sáng"
                                      ? null
                                      : "Không gồm bữa sáng",
                                  )
                                }
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
                                  updatePolicy(
                                    booking.id,
                                    room.id,
                                    "cancellation",
                                    booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 15/06/2025"
                                      ? null
                                      : "Hủy miễn phí trước 15/06/2025",
                                  )
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
                                onClick={() =>
                                  updatePolicy(
                                    booking.id,
                                    room.id,
                                    "cancellation",
                                    booking.roomPolicies[room.id]?.cancellation === "Không hoàn tiền"
                                      ? null
                                      : "Không hoàn tiền",
                                  )
                                }
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
                  </div>
                )
              })()}

              {/* === PHÒNG SANTORINI === */}
              {(() => {
                const room = rooms.find((r) => r.id === "4")
                if (!room) return null
                return (
                  <div
                    key={`${booking.id}-${room.id}`}
                    className="relative border border-gray-200/50 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow duration-200 mb-4"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-orange-100 rounded-2xl opacity-55"></div>
                    <div className="relative">
                      <div className="grid grid-cols-5 gap-2 mb-4 rounded-2xl bg-gray-50/30">
                        <div className="col-span-3 relative aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                          <ImageComponent
                            src={"/placeholder.svg?height=400&width=300&query=Phòng%20Santorini%20main%20image"}
                            alt={"Phòng Santorini main image"}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 60vw, 300px"
                          />
                        </div>
                        <div className="col-span-2 grid grid-rows-2 gap-2">
                          <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                            <ImageComponent
                              src={"/placeholder.svg?height=200&width=200&query=Phòng%20Santorini%20secondary%20image%201"}
                              alt={"Phòng Santorini secondary image 1"}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 40vw, 200px"
                            />
                          </div>
                          <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-300 to-gray-400 shadow-sm flex items-center justify-center">
                            <ImageComponent
                              src={"/placeholder.svg?height=200&width=200&query=Phòng%20Santorini%20secondary%20image%202"}
                              alt={"Phòng Santorini secondary image 2"}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 40vw, 200px"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute bottom-2 right-2 bg-black/50 text-white rounded-full px-2 py-1 text-xs flex items-center gap-0.5 hover:bg-black/70"
                              onClick={() => {
                                setIsGalleryOpen(true)
                                setCurrentGalleryImages([
                                  "/placeholder.svg?height=400&width=300",
                                  "/placeholder.svg?height=200&width=200",
                                  "/placeholder.svg?height=200&width=200",
                                  "/placeholder.svg?height=200&width=200",
                                  "/placeholder.svg?height=200&width=200",
                                  "/placeholder.svg?height=200&width=200",
                                ])
                              }}
                            >
                              <ImageIcon className="h-3 w-3" />
                              <span>6</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-[#0a0a0a] mb-2">Phòng Santorini</h3>
                      <div className="mb-3">
                        <RadioGroup
                          value={booking.roomPolicies[room.id]?.bedType || "1 giường king"}
                          onValueChange={(value) => updateBedType(booking.id, room.id, value)}
                          className="flex flex-wrap gap-2"
                        >
                          <div
                            className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                              booking.roomPolicies[room.id]?.bedType === "1 giường king"
                                ? "border-black bg-black text-white"
                                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            <RadioGroupItem
                              value="1 giường king"
                              id={`booking-${booking.id}-room-${room.id}-bed-king`}
                              className="sr-only"
                            />
                            <label
                              htmlFor={`booking-${booking.id}-room-${room.id}-bed-king`}
                              className="text-sm font-medium cursor-pointer"
                            >
                              1 giường king
                            </label>
                          </div>
                          <div
                            className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                              booking.roomPolicies[room.id]?.bedType === "2 giường đôi"
                                ? "border-black bg-black text-white"
                                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            <RadioGroupItem
                              value="2 giường đôi"
                              id={`booking-${booking.id}-room-${room.id}-bed-double`}
                              className="sr-only"
                            />
                            <label
                              htmlFor={`booking-${booking.id}-room-${room.id}-bed-double`}
                              className="text-sm font-medium cursor-pointer"
                            >
                              2 giường đôi
                            </label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm text-[#0a0a0a] mb-4">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4" />
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
                      {/* RATE PLAN SECTION RESTORED */}
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
                                onClick={() =>
                                  updatePolicy(
                                    booking.id,
                                    room.id,
                                    "breakfast",
                                    booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng"
                                      ? null
                                      : "Bao gồm bữa sáng",
                                  )
                                }
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
                                onClick={() =>
                                  updatePolicy(
                                    booking.id,
                                    room.id,
                                    "breakfast",
                                    booking.roomPolicies[room.id]?.breakfast === "Không gồm bữa sáng"
                                      ? null
                                      : "Không gồm bữa sáng",
                                  )
                                }
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
                                  updatePolicy(
                                    booking.id,
                                    room.id,
                                    "cancellation",
                                    booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 15/06/2025"
                                      ? null
                                      : "Hủy miễn phí trước 15/06/2025",
                                  )
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
                                onClick={() =>
                                  updatePolicy(
                                    booking.id,
                                    room.id,
                                    "cancellation",
                                    booking.roomPolicies[room.id]?.cancellation === "Không hoàn tiền"
                                      ? null
                                      : "Không hoàn tiền",
                                  )
                                }
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
                  </div>
                )
              })()}
            </div>
          )
        ))}
      </div>

      {/* Bottom Summary */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200/50 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsCalendarPopupOpen(true)}>
              <div className="relative w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <CalendarDays className="lucide-calendar" />
              </div>
              <div className="flex flex-col">{displayDateRange}</div>
            </div>
            {totalSelectedRoomsCount > 0 && (
              <div className="text-right">
                <div className="text-lg font-medium text-[#0a0a0a]">{totalOverallPrice.toLocaleString()}đ</div>
                <div className="text-xs text-[#999999]">Giá trên đã bao gồm thuế và phí dịch vụ</div>
              </div>
            )}
          </div>
          {totalSelectedRoomsCount > 0 && (
            <Button
              className="w-full bg-[#0a0a0a] hover:bg-[#000000] text-white py-3 rounded-lg"
              onClick={() => {
                const selectedRoomsData = bookings
                  .map((booking) => {
                    const roomsInBooking = Object.entries(booking.roomQuantities)
                      .filter(([, quantity]) => quantity > 0)
                      .map(([roomId, quantity]) => {
                        const roomDetail = rooms.find((r) => r.id === roomId)
                        return roomDetail
                          ? {
                              id: roomDetail.id,
                              name: roomDetail.name,
                              price: roomDetail.price,
                              quantity: quantity,
                              policies: booking.roomPolicies[roomId],
                            }
                          : null
                      })
                      .filter(Boolean) // Filter out nulls

                    const bookingTotalPrice = roomsInBooking.reduce(
                      (sum, room) => sum + (room?.price || 0) * (room?.quantity || 0),
                      0,
                    )

                    return {
                      id: booking.id,
                      rooms: roomsInBooking,
                      bookingTotalPrice: bookingTotalPrice,
                      checkInDate: selectedBookingStartDate
                        ? format(selectedBookingStartDate, "EEEE, dd 'tháng' MM, yyyy", { locale: vi })
                        : "",
                      checkOutDate: selectedBookingEndDate
                        ? format(selectedBookingEndDate, "EEEE, dd 'tháng' MM, yyyy", { locale: vi })
                        : "",
                    }
                  })
                  .filter((b) => b.rooms.length > 0) // Only include bookings with selected rooms

                localStorage.setItem("currentBookings", JSON.stringify(selectedRoomsData))
                router.push("/payment")
              }}
            >
              Hoàn tất
            </Button>
          )}
        </div>
      </div>
      <div className="h-24" />

      {/* Popups */}
      <CalendarSelectionPopup
        isOpen={isCalendarPopupOpen}
        onClose={() => setIsCalendarPopupOpen(false)}
        onApply={handleApplyDates}
        initialStartDate={selectedBookingStartDate}
        initialEndDate={selectedBookingEndDate}
      />
      <ImageGalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} images={currentGalleryImages} />
      <HotelIntroDrawer
        isOpen={isHotelIntroDrawerOpen}
        onClose={() => setIsHotelIntroDrawerOpen(false)}
        hotelName={hotelName}
        hotelAddress={hotelAddress}
      />
    </div>
  )
