"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, Share2, Heart } from "lucide-react"
import CalendarSelectionPopup from "@/components/calendar-selection-popup"
import ShareOptionsPopup from "@/components/popups/ShareOptionsPopup"

export default function RoomsPage() {
  const router = useRouter()
  const [isCalendarOpen, setIsCalendarOpen] = useState(true)
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false)
  const [selectedBookingStartDate, setSelectedBookingStartDate] = useState<Date | null>(null)
  const [selectedBookingEndDate, setSelectedBookingEndDate] = useState<Date | null>(null)

  useEffect(() => {
    setIsCalendarOpen(true)
  }, [])

  const handleApplyDates = (startDate: Date | null, endDate: Date | null) => {
    setSelectedBookingStartDate(startDate)
    setSelectedBookingEndDate(endDate)
    setIsCalendarOpen(false)
  }

  const roomTypes = [
    {
      id: "standard",
      name: "Phòng Tiêu Chuẩn",
      description: "Phòng rộng rãi với đầy đủ tiện nghi cơ bản, phù hợp cho khách du lịch cá nhân hoặc cặp đôi.",
      price: "400.000 VND/đêm",
      image: "/placeholder.svg?height=200&width=300",
      features: ["1 Giường đôi", "View thành phố", "Wifi miễn phí"],
    },
    {
      id: "deluxe",
      name: "Phòng Deluxe",
      description: "Thiết kế sang trọng, không gian thoáng đãng, mang lại trải nghiệm nghỉ dưỡng đẳng cấp.",
      price: "600.000 VND/đêm",
      image: "/placeholder.svg?height=200&width=300",
      features: ["1 Giường King", "View biển", "Bồn tắm riêng"],
    },
    {
      id: "suite",
      name: "Phòng Suite",
      description: "Căn hộ cao cấp với phòng khách riêng biệt, lý tưởng cho gia đình hoặc nhóm bạn.",
      price: "800.000 VND/đêm",
      image: "/placeholder.svg?height=200&width=300",
      features: ["2 Giường đôi", "Phòng khách", "Bếp nhỏ"],
    },
  ]

  const handleBookNow = (roomType: string) => {
    if (selectedBookingStartDate && selectedBookingEndDate) {
      const bookingData = {
        roomType,
        startDate: selectedBookingStartDate.toISOString(),
        endDate: selectedBookingEndDate.toISOString(),
        checkInTime: "14:00", // Example default
        checkOutTime: "12:00", // Example default
        totalPrice: "1.200.000 VND", // Example total price
      }
      localStorage.setItem("bookingData", JSON.stringify(bookingData))
      router.push("/payment")
    } else {
      setIsCalendarOpen(true) // Re-open calendar if dates not selected
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="relative w-full h-[250px] overflow-hidden">
        <Image
          src="/images/room-selection.jpg"
          alt="Room Selection Background"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-20">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-white">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsSharePopupOpen(true)} className="text-white">
              <Share2 className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 z-20">
          <h1 className="text-3xl font-bold text-white">Chọn Phòng</h1>
        </div>
      </header>

      <main className="flex-1 p-4 space-y-6">
        {roomTypes.map((room) => (
          <Card key={room.id} className="w-full overflow-hidden rounded-xl shadow-lg bg-white/60 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="relative h-48 w-full">
                <Image
                  src={room.image || "/placeholder.svg"}
                  alt={room.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-xl"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{room.name}</h2>
                <p className="text-sm text-gray-700 mb-3">{room.description}</p>
                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                  {room.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Image src="/images/door_10010723.png" alt="icon" width={16} height={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">{room.price}</span>
                  <Button
                    onClick={() => handleBookNow(room.name)}
                    className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg"
                  >
                    Đặt ngay
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </main>

      {isCalendarOpen && (
        <CalendarSelectionPopup
          isOpen={isCalendarOpen}
          onClose={() => setIsCalendarOpen(false)}
          onApply={handleApplyDates}
          initialStartDate={selectedBookingStartDate}
          initialEndDate={selectedBookingEndDate}
        />
      )}

      {isSharePopupOpen && <ShareOptionsPopup isOpen={isSharePopupOpen} onClose={() => setIsSharePopupOpen(false)} />}
    </div>
  )
}
