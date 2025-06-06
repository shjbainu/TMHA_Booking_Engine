"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Users, MapPin, Heart, Share, Star, MoreHorizontal, Grid3X3, QrCode, ArrowLeft } from "lucide-react"
import HotelDetailsPopup from "@/components/hotel-details-popup" // Correct default import

export default function Home() {
  const [isHotelDetailsPopupOpen, setIsHotelDetailsPopupOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white">
        <Button variant="ghost" size="icon" className="h-10 w-10">
          <ArrowLeft className="h-6 w-6 text-[#0a0a0a]" />
        </Button>
        <h1 className="text-lg font-medium text-[#0a0a0a]">69 BOUTIQUE HOTEL</h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Share className="h-6 w-6 text-[#0a0a0a]" />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Heart className="h-6 w-6 text-[#0a0a0a]" />
          </Button>
        </div>
      </div>

      {/* Hotel Image Gallery */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-2">
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
            <Image src="/public/images/hotel-exterior.jpg" alt="Hotel exterior" fill className="object-cover" />
          </div>
          <div className="grid grid-rows-2 gap-2">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image src="/public/images/room-selection.jpg" alt="Room selection" fill className="object-cover" />
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image src="/public/images/payment.jpg" alt="Payment" fill className="object-cover" />
            </div>
          </div>
        </div>
        <Link href="/hotel-gallery">
          <Button className="w-full mt-3 bg-[#0a0a0a] hover:bg-[#000000] text-white py-2 rounded-lg text-sm font-medium">
            Xem tất cả ảnh
          </Button>
        </Link>
      </div>

      {/* Hotel Info */}
      <div className="px-4 mb-6">
        <h2 className="text-xl font-bold text-[#0a0a0a] mb-2">69 Boutique Hotel</h2>
        <div className="flex items-center gap-1 mb-3">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-[#0a0a0a]">4.5 (120 đánh giá)</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <MapPin className="h-4 w-4" />
          <span>123 Đường ABC, Quận XYZ, TP.HCM</span>
        </div>
        <p className="text-sm text-[#0a0a0a] mb-4">
          Khách sạn 69 Boutique tọa lạc tại trung tâm thành phố, mang đến trải nghiệm lưu trú sang trọng và tiện nghi.
        </p>
        <Button
          variant="outline"
          className="w-full bg-white border-gray-200 text-[#0a0a0a] py-2 rounded-lg text-sm font-medium"
          onClick={() => setIsHotelDetailsPopupOpen(true)} // Open popup on click
        >
          Tiện ích
        </Button>
      </div>

      {/* Room Booking Section */}
      <div className="px-4 pb-20">
        <h2 className="text-xl font-bold text-[#0a0a0a] mb-4">Đặt phòng</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#0a0a0a]" />
              <span className="text-sm font-medium text-[#0a0a0a]">Ngày nhận - trả phòng</span>
            </div>
            <Link href="/rooms">
              <Button variant="ghost" className="text-blue-600 text-sm font-medium">
                Thay đổi
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-between text-sm text-[#0a0a0a]">
            <span>25/04/2025 - 27/04/2025</span>
            <span>2 đêm</span>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#0a0a0a]" />
              <span className="text-sm font-medium text-[#0a0a0a]">Số lượng phòng & khách</span>
            </div>
            <Link href="/rooms">
              <Button variant="ghost" className="text-blue-600 text-sm font-medium">
                Thay đổi
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-between text-sm text-[#0a0a0a]">
            <span>2 phòng, 4 khách</span>
            <span></span>
          </div>
        </div>

        <Link href="/rooms">
          <Button className="w-full bg-[#0a0a0a] hover:bg-[#000000] text-white py-3 rounded-lg text-base font-medium">
            Tìm phòng
          </Button>
        </Link>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
        <div className="flex items-center justify-between px-6 py-3">
          <Button variant="ghost" size="icon" className="h-12 w-12">
            <Grid3X3 className="h-6 w-6 text-[#0a0a0a]" />
          </Button>
          <Button variant="ghost" size="icon" className="h-12 w-12">
            <QrCode className="h-6 w-6 text-[#0a0a0a]" />
          </Button>
          <Button variant="ghost" size="icon" className="h-12 w-12">
            <Star className="h-6 w-6 text-[#0a0a0a]" />
          </Button>
          <Button variant="ghost" size="icon" className="h-12 w-12">
            <MoreHorizontal className="h-6 w-6 text-[#0a0a0a]" />
          </Button>
        </div>

        {/* Floating Action Button */}
        <div className="absolute bottom-4 right-4">
          <Button className="h-14 w-14 rounded-2xl bg-orange-400 hover:bg-orange-500 shadow-lg">
            <div className="h-6 w-6 bg-[#0a0a0a] rounded-sm"></div>
          </Button>
        </div>
      </div>

      {/* Hotel Details Popup */}
      <HotelDetailsPopup isOpen={isHotelDetailsPopupOpen} onClose={() => setIsHotelDetailsPopupOpen(false)} />
    </div>
  )
}
