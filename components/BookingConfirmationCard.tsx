"use client"

import { Copy, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface RoomDetail {
  name: string
  quantity: number
}

interface BookingConfirmationCardProps {
  booking: {
    id: string
    name: string
    checkInDate: string
    checkOutDate: string
    bookingCode: string
    shareLink: string
    rooms: RoomDetail[]
    totalPrice: string
  }
}

export function BookingConfirmationCard({ booking }: BookingConfirmationCardProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Card className="border-2 border-dashed border-gray-300 rounded-lg p-4">
      <CardContent className="p-0">
        <h3 className="text-lg font-bold text-[#0a0a0a] mb-4">{booking.name}</h3>

        <div className="space-y-3 text-sm">
          <div>
            <span className="font-medium">Thông tin chuyến đi</span>
          </div>

          <div>
            <span className="text-[#0a0a0a]">
              Ngày {booking.checkInDate} - {booking.checkOutDate}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#0a0a0a]">Mã nhận phòng: {booking.bookingCode}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => copyToClipboard(booking.bookingCode)}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <QrCode className="h-4 w-4" />
            </Button>
          </div>

          <div>
            <span className="font-medium">Link chia sẻ phòng</span>
          </div>

          <div className="bg-gray-100 p-3 rounded flex items-center justify-between">
            <span className="text-xs text-[#0a0a0a] truncate">{booking.shareLink}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 flex-shrink-0"
              onClick={() => copyToClipboard(booking.shareLink)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          <div>
            <span className="font-medium">Các phòng đã đặt:</span>
            <ul className="list-disc list-inside ml-2">
              {booking.rooms.map((room, index) => (
                <li key={index} className="text-[#0a0a0a]">
                  {room.name} ({room.quantity})
                </li>
              ))}
            </ul>
          </div>

          <div className="text-right text-base font-bold text-[#0a0a0a] pt-2">Tổng cộng: {booking.totalPrice}</div>
        </div>
      </CardContent>
    </Card>
  )
}
