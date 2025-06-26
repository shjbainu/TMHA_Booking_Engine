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
  Square,
  WavesLadder,
  ShowerHead,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { rooms } from "@/lib/data"
import ImageComponent from "next/image"
import CalendarSelectionPopup from "@/components/calendar-selection-popup"
import { format, isSameDay } from "date-fns"
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
  startDate: Date | null
  endDate: Date | null
  bookingType: "day" | "hour" | "overnight"
  checkInTime: string
  hoursOfUse: number
}

export default function RoomSelection() {
  const router = useRouter()
  const defaultStartDate = new Date(2025, 3, 25)
  const defaultEndDate = new Date(2025, 3, 27)

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "booking-1",
      roomQuantities: {},
      roomPolicies: rooms.reduce<Record<string, { breakfast: string | null; cancellation: string | null; bedType: string | null }>>(
        (acc, room) => {
          acc[room.id] = { breakfast: null, cancellation: null, bedType: "1 giường king" }
          return acc
        },
        {},
      ),
      expandedRooms: [],
      startDate: defaultStartDate,
      endDate: defaultEndDate,
      bookingType: "day",
      checkInTime: "08:00",
      hoursOfUse: 2,
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [includeBreakfastFilter, setIncludeBreakfastFilter] = useState(false)
  const [freeCancellationFilter, setFreeCancellationFilter] = useState(false)
  const [isCalendarPopupOpen, setIsCalendarPopupOpen] = useState(true)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [currentGalleryImages, setCurrentGalleryImages] = useState<string[]>([])
  const [isHotelIntroDrawerOpen, setIsHotelIntroDrawerOpen] = useState(false)
  const [activeBookingId, setActiveBookingId] = useState<string>("booking-1")

  const hotelName = "69 Boutique by Minova"
  const hotelAddress = "69 Ng. 53 Đ. Nguyễn Ngọc Vũ, Trung Hoà, Cầu Giấy, Hà Nội"

  // Get the active booking
  const activeBooking = useMemo(() => {
    return bookings.find((booking) => booking.id === activeBookingId) || bookings[0]
  }, [bookings, activeBookingId])

  const handleAddBooking = () => {
    const newBookingId = `booking-${bookings.length + 1}`
    setBookings((prev) => [
      ...prev,
      {
        id: newBookingId,
        roomQuantities: {},
        roomPolicies: rooms.reduce<Record<string, { breakfast: string | null; cancellation: string | null; bedType: string | null }>>(
          (acc, room) => {
            acc[room.id] = { breakfast: null, cancellation: null, bedType: "1 giường king" }
            return acc
          },
          {},
        ),
        expandedRooms: [],
        startDate: defaultStartDate,
        endDate: defaultEndDate,
        bookingType: "day",
        checkInTime: "08:00",
        hoursOfUse: 2,
      },
    ])
    setActiveBookingId(newBookingId)
    setIsCalendarPopupOpen(true)
  }

  const handleRemoveBooking = (bookingId: string) => {
    if (bookings.length === 1) return
    setBookings((prev) => prev.filter((booking) => booking.id !== bookingId))
    if (activeBookingId === bookingId) {
      setActiveBookingId(bookings.find((b) => b.id !== bookingId)?.id || "booking-1")
    }
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
          roomPolicies: rooms.reduce<Record<string, { breakfast: string | null; cancellation: string | null; bedType: string | null }>>(
            (acc, room) => {
              acc[room.id] = { breakfast: null, cancellation: null, bedType: "1 giường king" }
              return acc
            },
            {},
          ),
          expandedRooms: [],
          startDate: defaultStartDate,
          endDate: defaultEndDate,
          bookingType: "day",
          checkInTime: "08:00",
          hoursOfUse: 2,
        },
      ])
      setIncludeBreakfastFilter(false)
      setFreeCancellationFilter(false)
      setActiveBookingId("booking-1")
    }, 2000)
  }

  // === LOGIC TÍNH GIÁ MỚI ===
  const totalOverallPrice = useMemo(() => {
  return bookings.reduce((overallSum, booking) => {
    const bookingTotalPrice = Object.entries(booking.roomQuantities).reduce(
      (sum, [roomId, quantity]) => {
        const room = rooms.find((r) => r.id === roomId)
        if (!room || !booking.startDate || !booking.endDate) return sum

        let priceForRange = 0
        let currentDate = new Date(booking.startDate)
        while (currentDate < booking.endDate) {
          const dayOfWeek = currentDate.getDay()
          if (dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6) {
            priceForRange += room.priceWeekend
          } else {
            priceForRange += room.priceWeekday
          }
          currentDate = addDays(currentDate, 1)
        }
        // Cộng thêm 100.000đ nếu chọn bữa sáng
        let extra = 0
        if (booking.roomPolicies[roomId]?.breakfast === "Bao gồm bữa sáng cho 2 người") {
          extra = 100000
        }
        return sum + (priceForRange + extra) * quantity
      },
      0,
    )
    return overallSum + bookingTotalPrice
  }, 0)
}, [bookings])
  // === END LOGIC TÍNH GIÁ MỚI ===

  const totalSelectedRoomsCount = useMemo(() => {
    return bookings.reduce((count, booking) => {
      return count + Object.values(booking.roomQuantities).reduce((sum, quantity) => sum + quantity, 0)
    }, 0)
  }, [bookings])

  const handleApplyDates = (
    startDate: Date | null,
    endDate: Date | null,
    bookingType: "day" | "hour" | "overnight",
    checkInTime: string,
    hoursOfUse: number,
  ) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) => {
        if (booking.id === activeBookingId) {
          return {
            ...booking,
            startDate,
            endDate,
            bookingType,
            checkInTime,
            hoursOfUse,
          }
        }
        return booking
      }),
    )
    setIsCalendarPopupOpen(false)
  }

  const displayDateRange = useMemo(() => {
    if (!activeBooking)
      return (
        <>
          <span className="text-sm text-[#0a0a0a]">Chọn ngày</span>
          <span className="text-xs text-[#999999]"></span>
        </>
      )

    if (activeBooking.bookingType === "hour") {
      const [startHour, startMinute] = activeBooking.checkInTime.split(":").map(Number)
      const endHour = startHour + activeBooking.hoursOfUse
      const formattedEndTime = `${String(endHour % 24).padStart(2, "0")}:${String(startMinute).padStart(2, "0")}`
      return (
        <>
          <span className="text-sm text-[#0a0a0a]">
            {activeBooking.checkInTime} - {formattedEndTime}
          </span>
          <span className="text-xs text-[#999999]">
            {activeBooking.hoursOfUse} giờ, {format(activeBooking.startDate!, "dd/MM", { locale: vi })}
          </span>
        </>
      )
    } else if (activeBooking.startDate && activeBooking.endDate) {
      let duration
      if (activeBooking.bookingType === "day") {
        if (isSameDay(activeBooking.startDate, activeBooking.endDate)) {
          duration = 1
        } else {
          const diffTime = Math.abs(activeBooking.endDate.getTime() - activeBooking.startDate.getTime())
          duration = Math.round(diffTime / (1000 * 60 * 60 * 24))
        }
      } else {
        const diffTime = Math.abs(activeBooking.endDate.getTime() - activeBooking.startDate.getTime())
        duration = Math.round(diffTime / (1000 * 60 * 60 * 24))
      }
      return (
        <>
          <span className="text-sm text-[#0a0a0a]">
            {format(activeBooking.startDate, "dd/MM", { locale: vi })} -{" "}
            {format(activeBooking.endDate, "dd/MM", { locale: vi })}
          </span>
          <span className="text-xs text-[#999999]">
            {`${duration} đêm`}
          </span>
        </>
      )
    } else if (activeBooking.startDate) {
      return (
        <>
          <span className="text-sm text-[#0a0a0a]">{format(activeBooking.startDate, "dd/MM", { locale: vi })}</span>
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
  }, [activeBooking])

  return (
    <div
      className="min-h-screen relative bg-cover bg-center bg-fixed"
      style={{
  backgroundImage: `
    radial-gradient(circle at 70% 30%, #e9cfc3 0%, transparent 60%),
    radial-gradient(circle at 30% 70%, #d6a77a 0%, transparent 70%),
    linear-gradient(120deg, #e9cfc3 30%, #d6a77a 60%, #b97a56 100%)
  `
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
              handleAddBooking()
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
        {bookings.map(
          (booking) =>
            booking.id === activeBookingId && (
              <div key={booking.id}>
                {/* === PHÒNG SUPERIOR === */}
                {(() => {
                  const room = rooms.find((r) => r.id === "1")
                  if (!room) return null
                  const today = new Date();
                  const checkInDate = booking.startDate;
                  let daysToCheckIn = 0;
                  if (checkInDate) {
                  const diffTime = checkInDate.getTime() - today.setHours(0,0,0,0);
                  daysToCheckIn = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  }
                  const canSelectFreeCancel = daysToCheckIn > 7;
                  return (
                    <div
                      key={`${booking.id}-${room.id}`}
                      className="relative border border-gray-200/50 rounded-2xl p-5 shadow-xl hover:shadow-xl transition-shadow duration-200 mb-4"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl opacity-50"></div>
                      <div className="relative">
                        <div className="grid grid-cols-5 gap-2 mb-4 rounded-2xl bg-gray-50/30">
                          <div className="col-span-3 relative aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                            <ImageComponent
                              src="https://ak-d.tripcdn.com/images/1mc3512000cpiz3ejAB1F_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F"
                              alt="Phòng Sơn Ca main image"
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 60vw, 300px"
                            />
                          </div>
                          <div className="col-span-2 grid grid-rows-2 gap-2">
                            <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                              <ImageComponent
                                src="https://ak-d.tripcdn.com/images/1mc5l12000cpiz28359FB_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F"
                                alt="Phòng Sơn Ca secondary image 1"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 40vw, 200px"
                              />
                            </div>
                            <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-300 to-gray-400 shadow-sm flex items-center justify-center">
                              <ImageComponent
                                src="https://ak-d.tripcdn.com/images/1mc6j12000cpiylg8B415_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F"
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
                                    "https://ak-d.tripcdn.com/images/1mc5l12000cpiz28359FB_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F",
                                    "https://ak-d.tripcdn.com/images/1mc0b12000cpiyqtw6294_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F",
                                    "https://ak-d.tripcdn.com/images/1mc2s12000cpiz3v81D04_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F",
                                    "https://ak-d.tripcdn.com/images/1mc6j12000cpiylg8B415_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F",
                                    "https://ak-d.tripcdn.com/images/1mc3r12000cq82rkqE904_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F",
                                    "https://ak-d.tripcdn.com/images/0224812000k2ndeik5689_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F",
                                  ])
                                }}
                              >
                                <ImageIcon className="h-3 w-3" />
                                <span>6</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-[#0a0a0a] mb-2">Superior With Window</h3>
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
                            
                          </RadioGroup>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-[#0a0a0a] mb-4">
                          <div className="flex items-center gap-2">
                            <Wifi className="h-4 w-4" />
                            <span>Wifi miễn phí</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span>Tối đa 2 người</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Bed className="h-4 w-4" />
                            <span>Còn 2 phòng</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Square className="h-4 w-4" />
                            <span>Diện tích 17m2</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-lg font-semibold text-[#0a0a0a]">Giá từ 650.000đ</span>
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
                              <span className="w-8 text-center font-medium">
                                {booking.roomQuantities[room.id] || 1}
                              </span>
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
                                        return {
                                          ...b,
                                          expandedRooms: newExpandedRooms,
                                          roomQuantities: newRoomQuantities,
                                        }
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
                                    booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng cho 2 người"
                                      ? "border-blue-500 bg-blue-50"
                                      : "border-gray-200 bg-white"
                                  }`}
                                  onClick={() =>
                                    updatePolicy(
                                      booking.id,
                                      room.id,
                                      "breakfast",
                                      booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng cho 2 người"
                                        ? null
                                        : "Bao gồm bữa sáng cho 2 người",
                                    )
                                  }
                                >
                                  <div className="relative">
                                    <div
                                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                        booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng cho 2 người"
                                          ? "bg-blue-500 border-blue-500 shadow-sm"
                                          : "border-gray-300"
                                      }`}
                                    >
                                      {booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng cho 2 người" && (
                                        <Check className="w-3 h-3 text-white" />
                                      )}
                                    </div>
                                  </div>
                                  <span className="text-sm text-[#0a0a0a]">Bao gồm bữa sáng cho 2 người</span>
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
  className={`flex items-center gap-3 p-3 rounded-lg border ${
    canSelectFreeCancel
      ? "cursor-pointer"
      : "cursor-not-allowed opacity-50"
  } ${
    booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 7 ngày"
      ? "border-blue-500 bg-blue-50"
      : "border-gray-200 bg-white"
  }`}
  onClick={() => {
    if (!canSelectFreeCancel) return;
    updatePolicy(
      booking.id,
      room.id,
      "cancellation",
      booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 7 ngày"
        ? null
        : "Hủy miễn phí trước 7 ngày",
    )
  }}
>
  <div className="relative">
    <div
      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
        booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 7 ngày"
          ? "bg-blue-500 border-blue-500 shadow-sm"
          : "border-gray-300"
      }`}
    >
      {booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 7 ngày" && (
        <Check className="w-3 h-3 text-white" />
      )}
    </div>
  </div>
  <span className="text-sm text-[#0a0a0a]">Hủy miễn phí trước 7 ngày</span>
  {!canSelectFreeCancel }
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

                {/* === PHÒNG STUDIO POOL VIEW === */}
                {(() => {
                  const room = rooms.find((r) => r.id === "2")
                  if (!room) return null
                  const today = new Date();
const checkInDate = booking.startDate;
let daysToCheckIn = 0;
if (checkInDate) {
  const diffTime = checkInDate.getTime() - today.setHours(0,0,0,0);
  daysToCheckIn = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
const canSelectFreeCancel = daysToCheckIn > 7;
                  return (
                    <div
                      key={`${booking.id}-${room.id}`}
                      className="relative border border-gray-200/50 rounded-2xl p-5 shadow-xl hover:shadow-xl transition-shadow duration-200 mb-4"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-teal-100 rounded-2xl opacity-55"></div>
                      <div className="relative">
                        <div className="grid grid-cols-5 gap-2 mb-4 rounded-2xl bg-gray-50/30">
                          <div className="col-span-3 relative aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                            <ImageComponent
                              src="https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10028977-d019abcf9bfcdde3e8488b654cce7b0e.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-460,pr-true,q-40,w-724"
                              alt="Phòng Nhật Bản main image"
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 60vw, 300px"
                            />
                          </div>
                          <div className="col-span-2 grid grid-rows-2 gap-2">
                            <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                              <ImageComponent
                                src="https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10028977-1e8de7a25d8dd56b63dcede3c03d7b04.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-460,pr-true,q-40,w-724"
                                alt="Phòng Nhật Bản secondary image 1"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 40vw, 200px"
                              />
                            </div>
                            <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-300 to-gray-400 shadow-sm flex items-center justify-center">
                              <ImageComponent
                                src="https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10028977-200820dabd00b6d92ce63c65a01d2670.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-460,pr-true,q-40,w-724"
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
                                    "https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10028977-7716795615b9e86fb80dff548ff6d2fd.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-600,pr-true,q-40,w-724",
                                    "https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10028977-9b06ad3aae364db783cf2b63e76e8fda.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-460,pr-true,q-40,w-724",
                                    "https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10028977-878275f38a1f4c9ce40b474f12846e00.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-460,pr-true,q-40,w-724",
                                    "https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10028977-a9e152d21e16ff8d39241027fa7a3cfc.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-460,pr-true,q-40,w-724",
                                    "https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10028977-d019abcf9bfcdde3e8488b654cce7b0e.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-460,pr-true,q-40,w-724",
                                    "https://ik.imagekit.io/tvlk/generic-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/10028977-c1da87397f43753d11f3d08e50737e5a.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-460,pr-true,q-40,w-724",
                                  ])
                                }}
                              >
                                <ImageIcon className="h-3 w-3" />
                                <span>6</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-[#0a0a0a] mb-2">Studio Double With Pool View</h3>
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
                                1 giường queen
                              </label>
                            </div>
                            
                          </RadioGroup>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-[#0a0a0a] mb-4">
                          <div className="flex items-center gap-2">
                            <Wifi className="h-4 w-4" />
                            <span>Wifi miễn phí</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span>Tối đa 2 người</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Bed className="h-4 w-4" />
                            <span>Còn 1 phòng</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Square className="h-4 w-4" />
                            <span>Diện tích 20m2</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-lg font-semibold text-[#0a0a0a]">Giá từ 750.000đ</span>
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
                              <span className="w-8 text-center font-medium">
                                {booking.roomQuantities[room.id] || 1}
                              </span>
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
                                        return {
                                          ...b,
                                          expandedRooms: newExpandedRooms,
                                          roomQuantities: newRoomQuantities,
                                        }
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
                                    booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng cho 2 người"
                                      ? "border-blue-500 bg-blue-50"
                                      : "border-gray-200 bg-white"
                                  }`}
                                  onClick={() =>
                                    updatePolicy(
                                      booking.id,
                                      room.id,
                                      "breakfast",
                                      booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng cho 2 người"
                                        ? null
                                        : "Bao gồm bữa sáng cho 2 người",
                                    )
                                  }
                                >
                                  <div className="relative">
                                    <div
                                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                        booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng cho 2 người"
                                          ? "bg-blue-500 border-blue-500 shadow-sm"
                                          : "border-gray-300"
                                      }`}
                                    >
                                      {booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng cho 2 người" && (
                                        <Check className="w-3 h-3 text-white" />
                                      )}
                                    </div>
                                  </div>
                                  <span className="text-sm text-[#0a0a0a]">Bao gồm bữa sáng cho 2 người</span>
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
  className={`flex items-center gap-3 p-3 rounded-lg border ${
    canSelectFreeCancel
      ? "cursor-pointer"
      : "cursor-not-allowed opacity-50"
  } ${
    booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 7 ngày"
      ? "border-blue-500 bg-blue-50"
      : "border-gray-200 bg-white"
  }`}
  onClick={() => {
    if (!canSelectFreeCancel) return;
    updatePolicy(
      booking.id,
      room.id,
      "cancellation",
      booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 7 ngày"
        ? null
        : "Hủy miễn phí trước 7 ngày",
    )
  }}
>
  <div className="relative">
    <div
      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
        booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 7 ngày"
          ? "bg-blue-500 border-blue-500 shadow-sm"
          : "border-gray-300"
      }`}
    >
      {booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 7 ngày" && (
        <Check className="w-3 h-3 text-white" />
      )}
    </div>
  </div>
  <span className="text-sm text-[#0a0a0a]">Hủy miễn phí trước 7 ngày</span>
  {!canSelectFreeCancel }
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

                {/* === PHÒNG STUDIO WINDOW === */}
                {(() => {
                  const room = rooms.find((r) => r.id === "3")
                  if (!room) return null
                  const today = new Date();
const checkInDate = booking.startDate;
let daysToCheckIn = 0;
if (checkInDate) {
  const diffTime = checkInDate.getTime() - today.setHours(0,0,0,0);
  daysToCheckIn = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
const canSelectFreeCancel = daysToCheckIn > 7;
                  return (
                    <div
                      key={`${booking.id}-${room.id}`}
                      className="relative border border-gray-200/50 rounded-2xl p-5 shadow-xl hover:shadow-xl transition-shadow duration-200 mb-4"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl opacity-55"></div>
                      <div className="relative">
                        <div className="grid grid-cols-5 gap-2 mb-4 rounded-2xl bg-gray-50/30">
                          <div className="col-span-3 relative aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                            <ImageComponent
                              src={"/00_Final/2.3 Tran Ai_2.jpeg"}
                              alt={"Phòng Mập Mờ main image"}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 60vw, 300px"
                            />
                          </div>
                          <div className="col-span-2 grid grid-rows-2 gap-2">
                            <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                              <ImageComponent
                                src={"/00_Final/2.3 Tran Ai_4.jpeg"}
                                alt={"Phòng Mập Mờ secondary image 1"}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 40vw, 200px"
                              />
                            </div>
                            <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-300 to-gray-400 shadow-sm flex items-center justify-center">
                              <ImageComponent
                                src={"/00_Final/2.3 Tran Ai_6.jpeg"}
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
                                    "https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10028977-bfef99c0139356cd6d0c64809faa0a8b.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-460,pr-true,q-40,w-724",
                                    "/00_Final/2.3 Tran Ai_2.jpeg",
                                    "/00_Final/2.3 Tran Ai_3.jpeg",
                                    "/00_Final/2.3 Tran Ai_4.jpeg",
                                    "/00_Final/2.3 Tran Ai_5.jpeg",
                                    "/00_Final/2.3 Tran Ai_6.jpeg",
                                  ])
                                }}
                              >
                                <ImageIcon className="h-3 w-3" />
                                <span>6</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-[#0a0a0a] mb-2">Studio Twin With Window</h3>
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
                                2 giường đơn
                              </label>
                            </div>
                            
                          </RadioGroup>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-[#0a0a0a] mb-4">
                          <div className="flex items-center gap-2">
                            <Wifi className="h-4 w-4" />
                            <span>Wifi miễn phí</span>
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
                            <Square className="h-4 w-4" />
                            <span>Diện tích 30m2</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-lg font-semibold text-[#0a0a0a]">Giá từ 750.000đ</span>
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
                              <span className="w-8 text-center font-medium">
                                {booking.roomQuantities[room.id] || 1}
                              </span>
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
                                        return {
                                          ...b,
                                          expandedRooms: newExpandedRooms,
                                          roomQuantities: newRoomQuantities,
                                        }
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
                                    booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng cho 2 người"
                                      ? "border-blue-500 bg-blue-50"
                                      : "border-gray-200 bg-white"
                                  }`}
                                  onClick={() =>
                                    updatePolicy(
                                      booking.id,
                                      room.id,
                                      "breakfast",
                                      booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng cho 2 người"
                                        ? null
                                        : "Bao gồm bữa sáng cho 2 người",
                                    )
                                  }
                                >
                                  <div className="relative">
                                    <div
                                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                        booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng cho 2 người"
                                          ? "bg-blue-500 border-blue-500 shadow-sm"
                                          : "border-gray-300"
                                      }`}
                                    >
                                      {booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng cho 2 người" && (
                                        <Check className="w-3 h-3 text-white" />
                                      )}
                                    </div>
                                  </div>
                                  <span className="text-sm text-[#0a0a0a]">Bao gồm bữa sáng cho 2 người</span>
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
  className={`flex items-center gap-3 p-3 rounded-lg border ${
    canSelectFreeCancel
      ? "cursor-pointer"
      : "cursor-not-allowed opacity-50"
  } ${
    booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 7 ngày"
      ? "border-blue-500 bg-blue-50"
      : "border-gray-200 bg-white"
  }`}
  onClick={() => {
    if (!canSelectFreeCancel) return;
    updatePolicy(
      booking.id,
      room.id,
      "cancellation",
      booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 7 ngày"
        ? null
        : "Hủy miễn phí trước 7 ngày",
    )
  }}
>
  <div className="relative">
    <div
      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
        booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 7 ngày"
          ? "bg-blue-500 border-blue-500 shadow-sm"
          : "border-gray-300"
      }`}
    >
      {booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 7 ngày" && (
        <Check className="w-3 h-3 text-white" />
      )}
    </div>
  </div>
  <span className="text-sm text-[#0a0a0a]">Hủy miễn phí trước 7 ngày</span>
  {!canSelectFreeCancel }
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

                {/* === PHÒNG DELUXE === */}
                {(() => {
                  const room = rooms.find((r) => r.id === "4")
                  if (!room) return null
                  const today = new Date();
const checkInDate = booking.startDate;
let daysToCheckIn = 0;
if (checkInDate) {
  const diffTime = checkInDate.getTime() - today.setHours(0,0,0,0);
  daysToCheckIn = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
const canSelectFreeCancel = daysToCheckIn > 7;
                  return (
                    <div
                      key={`${booking.id}-${room.id}`}
                      className="relative border border-gray-200/50 rounded-2xl p-5 shadow-xl hover:shadow-xl transition-shadow duration-200 mb-4"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-orange-100 rounded-2xl opacity-55"></div>
                      <div className="relative">
                        <div className="grid grid-cols-5 gap-2 mb-4 rounded-2xl bg-gray-50/30">
                          <div className="col-span-3 relative aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                            <ImageComponent
                              src={"/00_Final/2.2 An Ha_4.jpeg"}
                              alt={"Phòng Santorini main image"}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 60vw, 300px"
                            />
                          </div>
                          <div className="col-span-2 grid grid-rows-2 gap-2">
                            <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                              <ImageComponent
                                src={"/00_Final/2.2 An Ha_1.jpeg"}
                                alt={"Phòng Santorini secondary image 1"}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 40vw, 200px"
                              />
                            </div>
                            <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-300 to-gray-400 shadow-sm flex items-center justify-center">
                              <ImageComponent
                                src={"/00_Final/2.2 An Ha_6.jpeg"}
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
                                    "/00_Final/2.2 An Ha_1.jpeg",
                                    "/00_Final/2.2 An Ha_2.jpeg",
                                    "/00_Final/2.2 An Ha_3.jpeg",
                                    "/00_Final/2.2 An Ha_4.jpeg",
                                    "/00_Final/2.2 An Ha_5.jpeg",
                                    "/00_Final/2.2 An Ha_6.jpeg",
                                  ])
                                }}
                              >
                                <ImageIcon className="h-3 w-3" />
                                <span>6</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-[#0a0a0a] mb-2">Deluxe With Balcony</h3>
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
                            
                          </RadioGroup>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-[#0a0a0a] mb-4">
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            <span>Có ban công </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span>Tối đa 2 người</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Bed className="h-4 w-4" />
                            <span>Còn 2 phòng</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Square className="h-4 w-4" />
                            <span>Diện tích 23m2</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-lg font-semibold text-[#0a0a0a]">Giá từ 900.000đ</span>
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
                              <span className="w-8 text-center font-medium">
                                {booking.roomQuantities[room.id] || 1}
                              </span>
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
                                        return {
                                          ...b,
                                          expandedRooms: newExpandedRooms,
                                          roomQuantities: newRoomQuantities,
                                        }
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
                                    booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng cho 2 người"
                                      ? "border-blue-500 bg-blue-50"
                                      : "border-gray-200 bg-white"
                                  }`}
                                  onClick={() =>
                                    updatePolicy(
                                      booking.id,
                                      room.id,
                                      "breakfast",
                                      booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng cho 2 người"
                                        ? null
                                        : "Bao gồm bữa sáng cho 2 người",
                                    )
                                  }
                                >
                                  <div className="relative">
                                    <div
                                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                        booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng cho 2 người"
                                          ? "bg-blue-500 border-blue-500 shadow-sm"
                                          : "border-gray-300"
                                      }`}
                                    >
                                      {booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng cho 2 người" && (
                                        <Check className="w-3 h-3 text-white" />
                                      )}
                                    </div>
                                  </div>
                                  <span className="text-sm text-[#0a0a0a]">Bao gồm bữa sáng cho 2 người</span>
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
  className={`flex items-center gap-3 p-3 rounded-lg border ${
    canSelectFreeCancel
      ? "cursor-pointer"
      : "cursor-not-allowed opacity-50"
  } ${
    booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 7 ngày"
      ? "border-blue-500 bg-blue-50"
      : "border-gray-200 bg-white"
  }`}
  onClick={() => {
    if (!canSelectFreeCancel) return;
    updatePolicy(
      booking.id,
      room.id,
      "cancellation",
      booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 7 ngày"
        ? null
        : "Hủy miễn phí trước 7 ngày",
    )
  }}
>
  <div className="relative">
    <div
      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
        booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 7 ngày"
          ? "bg-blue-500 border-blue-500 shadow-sm"
          : "border-gray-300"
      }`}
    >
      {booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 7 ngày" && (
        <Check className="w-3 h-3 text-white" />
      )}
    </div>
  </div>
  <span className="text-sm text-[#0a0a0a]">Hủy miễn phí trước 7 ngày</span>
  {!canSelectFreeCancel }
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

                {/* === PHÒNG FAMILY === */}
                {(() => {
                  const room = rooms.find((r) => r.id === "5")
                  if (!room) return null
                  const today = new Date();
const checkInDate = booking.startDate;
let daysToCheckIn = 0;
if (checkInDate) {
  const diffTime = checkInDate.getTime() - today.setHours(0,0,0,0);
  daysToCheckIn = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
const canSelectFreeCancel = daysToCheckIn > 7;
                  return (
                    <div
                      key={`${booking.id}-${room.id}`}
                      className="relative border border-gray-200/50 rounded-2xl p-5 shadow-xl hover:shadow-xl transition-shadow duration-200 mb-4"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-teal-100 rounded-2xl opacity-55"></div>
                      <div className="relative">
                        <div className="grid grid-cols-5 gap-2 mb-4 rounded-2xl bg-gray-50/30">
                          <div className="col-span-3 relative aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                            <ImageComponent
                              src={"/00_Final/2.5 Family_6.jpeg"}
                              alt={"Phòng Santorini main image"}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 60vw, 300px"
                            />
                          </div>
                          <div className="col-span-2 grid grid-rows-2 gap-2">
                            <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                              <ImageComponent
                                src={"/00_Final/2.5 Family_4.jpeg"}
                                alt={"Phòng Santorini secondary image 1"}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 40vw, 200px"
                              />
                            </div>
                            <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-300 to-gray-400 shadow-sm flex items-center justify-center">
                              <ImageComponent
                                src={"/00_Final/2.5 Family_10.jpeg"}
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
                                    "https://ak-d.tripcdn.com/images/0224812000k2ndeik5689_R_600_400_R5.webp",
                                    "/00_Final/2.5 Family_4.jpeg",
                                    "/00_Final/2.5 Family_5.jpeg",
                                    "https://ak-d.tripcdn.com/images/1mc6r12000cpj9lx003E3_R_600_400_R5.webp",
                                    "/00_Final/2.5 Family_8.jpeg",
                                    "/00_Final/2.5 Family_10.jpeg",
                                  ])
                                }}
                              >
                                <ImageIcon className="h-3 w-3" />
                                <span>6</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-[#0a0a0a] mb-2">Family Room With Bathtub and Pool Garden View</h3>
                        <div className="mb-3">
                          <RadioGroup
                            value={booking.roomPolicies[room.id]?.bedType || "1 giường king"}
                            onValueChange={(value) => updateBedType(booking.id, room.id, value)}
                            className="flex flex-wrap gap-2"
                          >
                            
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
                                1 giường queen và 1 giường đơn
                              </label>
                            </div>
                          </RadioGroup> 
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-[#0a0a0a] mb-4">
                          <div className="flex items-center gap-2">
                            <WavesLadder className="h-4 w-4" />
                            <span>Nhìn ra hồ bơi</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span>Tối đa 3 người</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Bed className="h-4 w-4" />
                            <span>Còn 1 phòng</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Square className="h-4 w-4" />
                            <span>Diện tích 33m2</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-lg font-semibold text-[#0a0a0a]">Giá từ 1.050.000đ</span>
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
                              <span className="w-8 text-center font-medium">
                                {booking.roomQuantities[room.id] || 1}
                              </span>
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
                                        return {
                                          ...b,
                                          expandedRooms: newExpandedRooms,
                                          roomQuantities: newRoomQuantities,
                                        }
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
                                    booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng cho 2 người"
                                      ? "border-blue-500 bg-blue-50"
                                      : "border-gray-200 bg-white"
                                  }`}
                                  onClick={() =>
                                    updatePolicy(
                                      booking.id,
                                      room.id,
                                      "breakfast",
                                      booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng cho 2 người"
                                        ? null
                                        : "Bao gồm bữa sáng cho 2 người",
                                    )
                                  }
                                >
                                  <div className="relative">
                                    <div
                                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                        booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng cho 2 người"
                                          ? "bg-blue-500 border-blue-500 shadow-sm"
                                          : "border-gray-300"
                                      }`}
                                    >
                                      {booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng cho 2 người" && (
                                        <Check className="w-3 h-3 text-white" />
                                      )}
                                    </div>
                                  </div>
                                  <span className="text-sm text-[#0a0a0a]">Bao gồm bữa sáng cho 2 người</span>
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
  className={`flex items-center gap-3 p-3 rounded-lg border ${
    canSelectFreeCancel
      ? "cursor-pointer"
      : "cursor-not-allowed opacity-50"
  } ${
    booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 7 ngày"
      ? "border-blue-500 bg-blue-50"
      : "border-gray-200 bg-white"
  }`}
  onClick={() => {
    if (!canSelectFreeCancel) return;
    updatePolicy(
      booking.id,
      room.id,
      "cancellation",
      booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 7 ngày"
        ? null
        : "Hủy miễn phí trước 7 ngày",
    )
  }}
>
  <div className="relative">
    <div
      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
        booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 7 ngày"
          ? "bg-blue-500 border-blue-500 shadow-sm"
          : "border-gray-300"
      }`}
    >
      {booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 7 ngày" && (
        <Check className="w-3 h-3 text-white" />
      )}
    </div>
  </div>
  <span className="text-sm text-[#0a0a0a]">Hủy miễn phí trước 7 ngày</span>
  {!canSelectFreeCancel }
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

                {/* === PHÒNG ALEX === */}
                {(() => {
                  const room = rooms.find((r) => r.id === "6")
                  if (!room) return null
                  const today = new Date();
const checkInDate = booking.startDate;
let daysToCheckIn = 0;
if (checkInDate) {
  const diffTime = checkInDate.getTime() - today.setHours(0,0,0,0);
  daysToCheckIn = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
const canSelectFreeCancel = daysToCheckIn > 7;
                  return (
                    <div
                      key={`${booking.id}-${room.id}`}
                      className="relative border border-gray-200/50 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow duration-200 mb-4"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-pink-100 rounded-2xl opacity-75"></div>
                      <div className="relative">
                        <div className="grid grid-cols-5 gap-2 mb-4 rounded-2xl bg-gray-50/30">
                          <div className="col-span-3 relative aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                            <ImageComponent
                              src={"/00_Final/1.1 Alex_1.JPG"}
                              alt={"Phòng Santorini main image"}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 60vw, 300px"
                            />
                          </div>
                          <div className="col-span-2 grid grid-rows-2 gap-2">
                            <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                              <ImageComponent
                                src={"/00_Final/1.1 Alex_3.JPG"}
                                alt={"Phòng Santorini secondary image 1"}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 40vw, 200px"
                              />
                            </div>
                            <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-300 to-gray-400 shadow-sm flex items-center justify-center">
                              <ImageComponent
                                src={"/00_Final/1.1 Alex_4.JPG"}
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
                                    "/00_Final/1.1 Alex_5.JPG",
                                    "/00_Final/1.1 Alex_6.JPG",
                                    "/00_Final/1.1 Alex_7.JPG",
                                    "/00_Final/1.1 Alex_8.JPG",
                                    "/00_Final/1.1 Alex_3.JPG",
                                    "/00_Final/1.1 Alex_4.JPG",
                                  ])
                                }}
                              >
                                <ImageIcon className="h-3 w-3" />
                                <span>6</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-[#0a0a0a] mb-2">Alex Premium Private Pool</h3>
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
                            
                          </RadioGroup>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-[#0a0a0a] mb-4">
                          <div className="flex items-center gap-2">
                            <WavesLadder className="h-4 w-4" />
                            <span>Hồ bơi riêng tư</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span>Tối đa 2 người</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Bed className="h-4 w-4" />
                            <span>Còn 1 phòng</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Square className="h-4 w-4" />
                            <span>Diện tích 28m2</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-lg font-semibold text-[#0a0a0a]">Giá từ 2.000.000đ</span>
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
                              <span className="w-8 text-center font-medium">
                                {booking.roomQuantities[room.id] || 1}
                              </span>
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
                                        return {
                                          ...b,
                                          expandedRooms: newExpandedRooms,
                                          roomQuantities: newRoomQuantities,
                                        }
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
                                    booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng cho 2 người"
                                      ? "border-blue-500 bg-blue-50"
                                      : "border-gray-200 bg-white"
                                  }`}
                                  onClick={() =>
                                    updatePolicy(
                                      booking.id,
                                      room.id,
                                      "breakfast",
                                      booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng cho 2 người"
                                        ? null
                                        : "Bao gồm bữa sáng cho 2 người",
                                    )
                                  }
                                >
                                  <div className="relative">
                                    <div
                                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                        booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng cho 2 người"
                                          ? "bg-blue-500 border-blue-500 shadow-sm"
                                          : "border-gray-300"
                                      }`}
                                    >
                                      {booking.roomPolicies[room.id]?.breakfast === "Bao gồm bữa sáng cho 2 người" && (
                                        <Check className="w-3 h-3 text-white" />
                                      )}
                                    </div>
                                  </div>
                                  <span className="text-sm text-[#0a0a0a]">Bao gồm bữa sáng cho 2 người</span>
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
  className={`flex items-center gap-3 p-3 rounded-lg border ${
    canSelectFreeCancel
      ? "cursor-pointer"
      : "cursor-not-allowed opacity-50"
  } ${
    booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 7 ngày"
      ? "border-blue-500 bg-blue-50"
      : "border-gray-200 bg-white"
  }`}
  onClick={() => {
    if (!canSelectFreeCancel) return;
    updatePolicy(
      booking.id,
      room.id,
      "cancellation",
      booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 7 ngày"
        ? null
        : "Hủy miễn phí trước 7 ngày",
    )
  }}
>
  <div className="relative">
    <div
      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
        booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 7 ngày"
          ? "bg-blue-500 border-blue-500 shadow-sm"
          : "border-gray-300"
      }`}
    >
      {booking.roomPolicies[room.id]?.cancellation === "Hủy miễn phí trước 7 ngày" && (
        <Check className="w-3 h-3 text-white" />
      )}
    </div>
  </div>
  <span className="text-sm text-[#0a0a0a]">Hủy miễn phí trước 7 ngày</span>
  {!canSelectFreeCancel }
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
            ),
        )}
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
                <div className="text-xs text-[#999999]">Giá đã bao gồm thuế & phí dịch vụ</div>
              </div>
            )}
          </div>
          <Button
            className="w-full bg-[#0a0a0a] hover:bg-[#000000] text-white py-3 rounded-lg"
            onClick={() => {
              const selectedRoomsData = bookings
                .map((booking) => {
                  const roomsInBooking = Object.entries(booking.roomQuantities)
  .filter(([, quantity]) => quantity > 0)
  .map(([roomId, quantity]) => {
    const roomDetail = rooms.find((r) => r.id === roomId)
    if (!roomDetail || !booking.startDate || !booking.endDate) return null

    // Tính tổng tiền cho phòng này
    let priceForRange = 0
    let currentDate = new Date(booking.startDate)
    while (currentDate < booking.endDate) {
      const dayOfWeek = currentDate.getDay()
      if (dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6) {
        priceForRange += roomDetail.priceWeekend
      } else {
        priceForRange += roomDetail.priceWeekday
      }
      currentDate = addDays(currentDate, 1)
    }
    let extra = 0
    if (booking.roomPolicies[roomId]?.breakfast === "Bao gồm bữa sáng cho 2 người") {
      extra = 100000
    }

    const roomTotalPrice = (priceForRange + extra) * quantity

    return {
      id: roomDetail.id,
      name: roomDetail.name,
      quantity: quantity,
      policies: booking.roomPolicies[roomId],
      roomTotalPrice, // Thêm trường này để sang trang payment lấy đúng giá
    }
  })
  .filter(Boolean)

                  // === LOGIC TÍNH GIÁ MỚI ===
                  const bookingTotalPrice = Object.entries(booking.roomQuantities).reduce(
                    (sum, [roomId, quantity]) => {
                      const room = rooms.find((r) => r.id === roomId)
                      if (!room || !booking.startDate || !booking.endDate) return sum

                      let priceForRange = 0
                      let currentDate = new Date(booking.startDate)
                      while (currentDate < booking.endDate) {
                        const dayOfWeek = currentDate.getDay()
                        if (dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6) {
                          priceForRange += room.priceWeekend
                        } else {
                          priceForRange += room.priceWeekday
                        }
                        currentDate = addDays(currentDate, 1)
                      }
                      let extra = 0
                      if (booking.roomPolicies[roomId]?.breakfast === "Bao gồm bữa sáng cho 2 người") {
                        extra = 100000
                      }
                      return sum + (priceForRange + extra) * quantity
                    },
                    0,
                  )
                  // === END LOGIC TÍNH GIÁ MỚI ===

                  let formattedCheckIn = ""
                  let formattedCheckOut = ""
                  if (booking.startDate && booking.endDate) {
                    formattedCheckIn = format(booking.startDate, "EEEE, dd/MM/yyyy", { locale: vi })
                    formattedCheckOut = format(booking.endDate, "EEEE, dd/MM/yyyy", { locale: vi })
                  }

                  return {
                    id: booking.id,
                    rooms: roomsInBooking,
                    bookingTotalPrice: bookingTotalPrice,
                    checkInDate: formattedCheckIn,
                    checkOutDate: formattedCheckOut,
                  }
                })
                .filter((b) => b.rooms.length > 0)

              if (selectedRoomsData.length > 0) {
                localStorage.setItem("currentBookings", JSON.stringify(selectedRoomsData))
                router.push("/payment")
              } else {
                alert("Vui lòng chọn ít nhất một phòng để tiếp tục.")
              }
            }}
          >
            Hoàn tất
          </Button>
        </div>
      </div>
      <div className="h-24" />

      {/* Popups */}
      <CalendarSelectionPopup
  isOpen={isCalendarPopupOpen}
  onClose={() => setIsCalendarPopupOpen(false)}
  onApply={handleApplyDates}
  initialStartDate={activeBooking?.startDate || defaultStartDate}
  initialEndDate={activeBooking?.endDate || defaultEndDate}
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
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}