"use client"

import { useRef } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

// Giả sử component của bạn tên là HotelPhotosPage
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
      {/* Header (giữ nguyên) */}
      <div className="flex items-center justify-between p-4 bg-white sticky top-0 z-10 border-b border-gray-200">
        <Button variant="ghost" size="icon" className="h-10 w-10">
          <ArrowLeft className="h-6 w-6 text-[#0a0a0a]" />
        </Button>
        <div className="flex items-center">
           {/* Các nút icon trên header (giữ nguyên) */}
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Image src="/images/heart.png" alt="Yêu thích" width={24} height={24} />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Image src="/images/map.png" alt="Bản đồ" width={24} height={24} />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Image src="/images/share.png" alt="Chia sẻ" width={24} height={24} />
          </Button>
        </div>
      </div>

      {/* Main Content Area (giữ nguyên) */}
      <div className="pb-24">
        {/* ... (Toàn bộ nội dung trang của bạn giữ nguyên ở đây) ... */}
      </div>

      {/* ==================================================================== */}
      {/* BOTTOM NAVIGATION - PHẦN ĐÃ ĐƯỢC THIẾT KẾ LẠI                      */}
      {/* ==================================================================== */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-white z-20 border-t border-gray-200">
        <div className="w-full max-w-md">
          {/* Dùng flex và justify-around để tự động căn chỉnh khoảng cách */}
          <div className="flex items-center justify-around px-1 py-1.5">
            
            {/* Button Tổng quan */}
            <Button
              variant="ghost"
              className="h-auto flex flex-col items-center justify-center px-2 py-1.5 text-gray-600 hover:bg-gray-100 focus:bg-orange-50 focus:text-orange-500 rounded-lg"
            >
              <Image 
                src="/images/gen.png" 
                alt="Tổng quan"
                width={28} // Kích thước icon chuẩn
                height={28}
                className="mb-0.5" // Khoảng cách nhỏ giữa icon và chữ
              />
              <span className="text-xs font-medium">Tổng quan</span>
            </Button>

            {/* Button Tiện ích */}
            <Button
              variant="ghost"
              className="h-auto flex flex-col items-center justify-center px-2 py-1.5 text-gray-600 hover:bg-gray-100 focus:bg-orange-50 focus:text-orange-500 rounded-lg"
            >
              <Image 
                src="/images/amenliti.png" 
                alt="Tiện ích"
                width={28}
                height={28}
                className="mb-0.5"
              />
               <span className="text-xs font-medium">Tiện ích</span>
            </Button>

            {/* Button Đánh giá */}
            <Button
              variant="ghost"
              className="h-auto flex flex-col items-center justify-center px-2 py-1.5 text-gray-600 hover:bg-gray-100 focus:bg-orange-50 focus:text-orange-500 rounded-lg"
            >
              <Image 
                src="/images/star.jpg" 
                alt="Đánh giá"
                width={28}
                height={28}
                className="mb-0.5"
              />
               <span className="text-xs font-medium">Đánh giá</span>
            </Button>

            {/* Button Xem thêm */}
             <Button
              variant="ghost"
              className="h-auto flex flex-col items-center justify-center px-2 py-1.5 text-gray-600 hover:bg-gray-100 focus:bg-orange-50 focus:text-orange-500 rounded-lg"
            >
              <Image 
                src="/images/more.png" 
                alt="Xem thêm"
                width={28}
                height={28}
                className="mb-0.5"
              />
               <span className="text-xs font-medium">Xem thêm</span>
            </Button>

            {/* Nút Đặt phòng (giữ nguyên nhưng có thể tùy chỉnh thêm nếu muốn) */}
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
