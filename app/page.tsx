"use client"

import { useRef } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function HotelPhotosPage() {
  const khongGianChungRef = useRef(null)
  const phongSonCaRef = useRef(null)
  const phongNhatBanRef = useRef(null)
  const phongMapMoRef = useRef(null)
  const phongSantoriniRef = useRef(null)

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white sticky top-0 z-10 border-b border-gray-200">
        <Button variant="ghost" size="icon" className="h-10 w-10">
          <ArrowLeft className="h-6 w-6 text-[#0a0a0a]" />
        </Button>
        <div className="flex items-center">
          {/* --- CÁC ICON TRÊN HEADER ĐÃ SỬA LẠI --- */}
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <img 
              src="/images/heart.png" // Sửa đường dẫn
              alt="Yêu thích"
              className="h-6 w-6" // Thêm class để chỉnh kích thước
            />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <img 
              src="/images/map.png" // Sửa đường dẫn
              alt="Bản đồ"
              className="h-6 w-6" // Thêm class để chỉnh kích thước
            />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <img 
              src="/images/share.png" // Sửa đường dẫn
              alt="Chia sẻ"
              className="h-6 w-6" // Thêm class để chỉnh kích thước
            />
          </Button>
        </div>
      </div>

      {/* Main Content Area (Giữ nguyên) */}
      <div className="pb-24">
        {/* "Tham quan qua ảnh" Section (Giữ nguyên) */}
        <h1 className="text-lg font-semibold text-[#0a0a0a] mt-4 mb-3 px-4">Tham quan qua ảnh</h1>
        <div className="mb-6">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 pb-2 px-4">
              {/* Ảnh 1: Resort */}
              <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection(khongGianChungRef)}>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-1 w-40 sm:w-48">
                  <Image src="https://pix8.agoda.net/hotelImages/48898017/-1/9ccca4c717fa39e5a00ec72b8c732c66.jpg?ce=0&s=1024x" alt="Resort - Enso Retreat Hoi An" fill className="object-cover" sizes="(max-width: 640px) 160px, 192px"/>
                </div>
                <p className="text-sm font-medium text-[#0a0a0a]">Không gian chung</p>
              </div>
              {/* Các ảnh khác... (Giữ nguyên) */}
              <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection(phongSonCaRef)}>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-1 w-40 sm:w-48">
                  <Image src="https://s3.go2joy.vn/1000w/hotel/543/1228_1724233053_66c5b55d89d68.JPG" alt="Phòng Sơn Ca Thumbnail" fill className="object-cover" sizes="(max-width: 640px) 160px, 192px"/>
                </div>
                <p className="text-sm font-medium text-[#0a0a0a]">Phòng Sơn Ca</p>
              </div>
            </div>
          </div>
        </div>
        {/* Các Section Ảnh Chi Tiết (Giữ nguyên) */}
        <div ref={khongGianChungRef} id="khong-gian-chung" className="px-4 scroll-mt-20">...</div>
        <div ref={phongSonCaRef} id="phong-son-ca" className="px-4 scroll-mt-20">...</div>
      </div>

      {/* ==================================================================== */}
      {/* BOTTOM NAVIGATION - PHẦN DUY NHẤT ĐƯỢC CHỈNH SỬA                    */}
      {/* ==================================================================== */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-white z-20 border-t border-gray-200">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-around px-1 py-1.5">
            {/* Button Tổng quan */}
            <Button variant="ghost" className="h-auto flex flex-col items-center justify-center px-2 py-1.5 text-[#0a0a0a] hover:bg-gray-100 focus:bg-gray-100">
              <img 
                src="/images/gen.png" 
                alt="Tổng quan"
                className="h-7 w-7 mb-1" // Thêm class để chỉnh kích thước và khoảng cách
              />
              <span className="text-xs">Tổng quan</span>
            </Button>
            {/* Button Tiện ích */}
            <Button variant="ghost" className="h-auto flex flex-col items-center justify-center px-2 py-1.5 text-[#0a0a0a] hover:bg-gray-100 focus:bg-gray-100">
              <img 
                src="/images/amenliti.png" 
                alt="Tiện ích"
                className="h-7 w-7 mb-1" // Thêm class để chỉnh kích thước và khoảng cách
              />
              <span className="text-xs">Tiện ích</span>
            </Button>
            {/* Button Đánh giá */}
            <Button variant="ghost" className="h-auto flex flex-col items-center justify-center px-2 py-1.5 text-[#0a0a0a] hover:bg-gray-100 focus:bg-gray-100">
              <img 
                src="/images/star.jpg" 
                alt="Đánh giá"
                className="h-7 w-7 mb-1" // Thêm class để chỉnh kích thước và khoảng cách
              />
              <span className="text-xs">Đánh giá</span>
            </Button>
            {/* Button Xem thêm */}
            <Button variant="ghost" className="h-auto flex flex-col items-center justify-center px-2 py-1.5 text-[#0a0a0a] hover:bg-gray-100 focus:bg-gray-100">
              <img 
                src="/images/more.png" 
                alt="Xem thêm"
                className="h-7 w-7 mb-1" // Thêm class để chỉnh kích thước và khoảng cách
              />
              <span className="text-xs">Xem thêm</span>
            </Button>
            {/* Nút Đặt phòng (Giữ nguyên) */}
            <Link href="/rooms" passHref legacyBehavior>
              <a className="h-10 w-10 p-0 rounded-lg bg-orange-400 hover:bg-orange-500 shadow-md flex items-center justify-center transform hover:scale-105 transition-transform duration-150">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                  <rect x="4" y="3" width="12" height="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <circle cx="13" cy="12" r="1" fill="currentColor" />
                  <path d="M6 8H14M6 16H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M18 9L21 12L18 15M21 12H16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
