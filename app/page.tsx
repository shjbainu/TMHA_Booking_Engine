"use client"

import { useState } from "react"
import { ArrowLeft, Share, Heart, MapPin, Star, Calendar, Users, Bed, Wifi } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import HotelDetailsPopup from "@/components/hotel-details-popup"

export default function HotelLanding() {
  const [isHotelDetailsOpen, setIsHotelDetailsOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white">
        <Button variant="ghost" size="icon" className="h-10 w-10">
          <ArrowLeft className="h-6 w-6 text-[#0a0a0a]" />
        </Button>
        <h1 className="text-lg font-medium text-[#0a0a0a]">69 BOUTIQUE</h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Share className="h-6 w-6 text-[#0a0a0a]" />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Heart className="h-6 w-6 text-[#0a0a0a]" />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <MapPin className="h-6 w-6 text-[#0a0a0a]" />
          </Button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative aspect-[16/10] mx-4 rounded-lg overflow-hidden mb-4">
        <Image
          src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484553_66ab07495d890.webp"
          alt="69 Boutique Hotel"
          fill
          className="object-cover"
        />
      </div>

      {/* Hotel Info */}
      <div className="px-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-sm text-gray-600">4.8 (120 đánh giá)</span>
        </div>
        <h2 className="text-xl font-bold text-[#0a0a0a] mb-2">Khách sạn 69 Boutique</h2>
        <p className="text-sm text-gray-600 mb-4">123 Phố Cổ, Hoàn Kiếm, Hà Nội</p>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button
            variant="outline"
            className="h-12 border-[#0a0a0a] text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white"
            onClick={() => setIsHotelDetailsOpen(true)}
          >
            Tiện ích
          </Button>
          <Button className="h-12 bg-[#0a0a0a] hover:bg-[#000000] text-white">Xem bản đồ</Button>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-4 text-sm text-[#0a0a0a] mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Check-in: 14:00</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Check-out: 12:00</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Tối đa 2 người/phòng</span>
          </div>
          <div className="flex items-center gap-2">
            <Wifi className="h-4 w-4" />
            <span>WiFi miễn phí</span>
          </div>
        </div>

        {/* Room Preview */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#0a0a0a] mb-3">Phòng phổ biến</h3>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex gap-3 mb-3">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                <Image
                  src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484553_66ab07495d890.webp"
                  alt="Standard Room"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-[#0a0a0a] mb-1">Phòng Standard</h4>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Bed className="h-4 w-4" />
                  <span>1 giường đôi</span>
                </div>
                <div className="text-lg font-semibold text-[#0a0a0a]">500.000đ/đêm</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-lg font-semibold text-[#0a0a0a]">Từ 500.000đ</div>
              <div className="text-xs text-gray-600">Giá/đêm, đã bao gồm thuế</div>
            </div>
            <Link href="/rooms">
              <Button className="bg-[#0a0a0a] hover:bg-[#000000] text-white px-8 py-3 rounded-lg">Chọn phòng</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Hotel Details Popup */}
      <HotelDetailsPopup isOpen={isHotelDetailsOpen} onClose={() => setIsHotelDetailsOpen(false)} />

      {/* Bottom padding to account for fixed CTA */}
      <div className="h-20"></div>
    </div>
  )
}
