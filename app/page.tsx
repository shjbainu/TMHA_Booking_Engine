"use client"

import { Share, Heart, MapPin, Building, Star, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function HotelGallery() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white">
        <h2 className="text-xl font-bold text-[#0a0a0a]">69 Boutique By Minova</h2>
        <div className="flex items-center gap-0 pr-0">
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

      {/* Photo Gallery */}
      <div className="px-4 pb-6">
        {/* Title */}
        <h1 className="text-lg font-medium text-[#0a0a0a] mb-4">Tham quan qua ảnh</h1>

        {/* Hotel Gallery Section */}
        <div className="mb-6">
          <div className="overflow-x-auto">
            <div className="flex gap-3 pb-2">
              <div className="flex-shrink-0">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-2 w-64">
                  <Image
                    src="/public/images/hotel-exterior-main.png"
                    alt="Hotel exterior"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm font-medium text-[#0a0a0a]">Mặt tiền khách sạn</p>
              </div>
              <div className="flex-shrink-0">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-2 w-64">
                  <Image src="/public/images/room-sonca-main.png" alt="Phòng Sơn Ca" fill className="object-cover" />
                </div>
                <p className="text-sm font-medium text-[#0a0a0a]">Phòng Sơn Ca</p>
              </div>
              <div className="flex-shrink-0">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-2 w-64">
                  <Image
                    src="/public/images/room-nhatban-main.png"
                    alt="Phòng Nhật Bản"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm font-medium text-[#0a0a0a]">Phòng Nhật Bản</p>
              </div>
              <div className="flex-shrink-0">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-2 w-64">
                  <Image src="/public/images/room-mapmo-main.png" alt="Phòng Mập Mờ" fill className="object-cover" />
                </div>
                <p className="text-sm font-medium text-[#0a0a0a]">Phòng Mập Mờ</p>
              </div>
              <div className="flex-shrink-0">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-2 w-64">
                  <Image
                    src="/public/images/room-santorini-main.png"
                    alt="Phòng Santorini"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm font-medium text-[#0a0a0a]">Phòng Santorini</p>
                
              </div>
            </div>
          </div>
        </div>

        {/* Common Areas Section */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-[#0a0a0a] mb-4">Không gian chung</h2>

          {/* Large Cinema Image */}
          <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-3">
            <Image src="/public/images/cinema-area.png" alt="Cinema area" fill className="object-cover" />
          </div>

          {/* Grid of smaller images */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/public/images/hotel-exterior-day.png"
                alt="Hotel exterior day"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/public/images/hotel-exterior-night.png"
                alt="Hotel exterior night"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Bottom large image */}
          <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-3">
            <Image src="/public/images/hotel-lobby.png" alt="Hotel lobby" fill className="object-cover" />
          </div>

          {/* Additional 6 images */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image src="/public/images/restaurant-area.png" alt="Restaurant area" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image src="/public/images/swimming-pool.png" alt="Swimming pool" fill className="object-cover" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image src="/public/images/gym-area.png" alt="Gym area" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image src="/public/images/spa-area.png" alt="Spa area" fill className="object-cover" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image src="/public/images/rooftop-terrace.png" alt="Rooftop terrace" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image src="/public/images/business-center.png" alt="Business center" fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* Phòng Sơn Ca Section */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-[#0a0a0a] mb-4">Phòng Sơn Ca</h2>
          <div className="columns-2 gap-3 space-y-3">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-1.png" alt="Phòng Sơn Ca 1" fill className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-2.png" alt="Phòng Sơn Ca 2" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-3.png" alt="Phòng Sơn Ca 3" fill className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-4.png" alt="Phòng Sơn Ca 4" fill className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-1.png" alt="Phòng Sơn Ca 5" fill className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-2.png" alt="Phòng Sơn Ca 6" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-3.png" alt="Phòng Sơn Ca 7" fill className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-4.png" alt="Phòng Sơn Ca 8" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-1.png" alt="Phòng Sơn Ca 9" fill className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-2.png" alt="Phòng Sơn Ca 10" fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* Phòng Nhật Bản Section */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-[#0a0a0a] mb-4">Phòng Nhật Bản</h2>
          <div className="columns-2 gap-3 space-y-3">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-3.png" alt="Phòng Nhật Bản 1" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-4.png" alt="Phòng Nhật Bản 2" fill className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-1.png" alt="Phòng Nhật Bản 3" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-2.png" alt="Phòng Nhật Bản 4" fill className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-3.png" alt="Phòng Nhật Bản 5" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-4.png" alt="Phòng Nhật Bản 6" fill className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-1.png" alt="Phòng Nhật Bản 7" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-2.png" alt="Phòng Nhật Bản 8" fill className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-3.png" alt="Phòng Nhật Bản 9" fill className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-4.png" alt="Phòng Nhật Bản 10" fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* Phòng Mập Mờ Section */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-[#0a0a0a] mb-4">Phòng Mập Mờ</h2>
          <div className="columns-2 gap-3 space-y-3">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-1.png" alt="Phòng Mập Mờ 1" fill className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-2.png" alt="Phòng Mập Mờ 2" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-3.png" alt="Phòng Mập Mờ 3" fill className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-4.png" alt="Phòng Mập Mờ 4" fill className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-1.png" alt="Phòng Mập Mờ 5" fill className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-2.png" alt="Phòng Mập Mờ 6" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-3.png" alt="Phòng Mập Mờ 7" fill className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-4.png" alt="Phòng Mập Mờ 8" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-1.png" alt="Phòng Mập Mờ 9" fill className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-2.png" alt="Phòng Mập Mờ 10" fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* Phòng Santorini Section */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-[#0a0a0a] mb-4">Phòng Santorini</h2>
          <div className="columns-2 gap-3 space-y-3">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-3.png" alt="Phòng Santorini 1" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-4.png" alt="Phòng Santorini 2" fill className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-1.png" alt="Phòng Santorini 3" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-2.png" alt="Phòng Santorini 4" fill className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-3.png" alt="Phòng Santorini 5" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-4.png" alt="Phòng Santorini 6" fill className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-1.png" alt="Phòng Santorini 7" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-2.png" alt="Phòng Santorini 8" fill className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-3.png" alt="Phòng Santorini 9" fill className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden break-inside-avoid">
              <Image src="/public/images/room-generic-4.png" alt="Phòng Santorini 10" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-transparent">
        <div className="w-full max-w-md bg-white border-t border-gray-100">
          <div className="flex items-center justify-between px-3 py-3">
            <Button variant="ghost" size="icon" className="h-12 w-12 flex flex-col items-center justify-center">
              <Building className="h-5 w-5 text-[#0a0a0a]" />
              <span className="text-xs text-[#0a0a0a] mt-1">Tổng quan</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-12 w-12 flex flex-col items-center justify-center">
              <div className="relative">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#0a0a0a]"
                >
                  <path
                    d="M12 18L12 18.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.5 14.5C10.2 13.8 11.1 13.5 12 13.5C12.9 13.5 13.8 13.8 14.5 14.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 11C8.3 9.9 10.1 9.3 12 9.3C13.9 9.3 15.7 9.9 17 11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17 8H19C20.1 8 21 8.9 21 10V10C21 11.1 20.1 12 19 12H17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 8H17V16C17 17.1 16.1 18 15 18H5C3.9 18 3 17.1 3 16V8Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-xs text-[#0a0a0a] mt-1">Tiện ích</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-12 w-12 flex flex-col items-center justify-center">
              <Star className="h-5 w-5 text-[#0a0a0a]" />
              <span className="text-xs text-[#0a0a0a] mt-1">Đánh giá</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-12 w-12 flex flex-col items-center justify-center">
              <MoreHorizontal className="h-5 w-5 text-[#0a0a0a]" />
              <span className="text-xs text-[#0a0a0a] mt-1">Mở rộng</span>
            </Button>
            <Link href="/rooms">
              <Button className="h-12 w-12 rounded-xl bg-orange-400 hover:bg-orange-500 shadow-lg flex flex-col items-center justify-center transform hover:scale-105 transition-all duration-200">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <rect
                    x="4"
                    y="3"
                    width="12"
                    height="18"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <circle cx="13" cy="12" r="1" fill="currentColor" />
                  <path d="M6 8H14M6 16H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path
                    d="M18 9L21 12L18 15M21 12H16"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom padding to account for fixed navigation */}
      <div className="h-20"></div>
    </div>
  )
}
