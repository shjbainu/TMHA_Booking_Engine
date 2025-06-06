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
          {/* CÁC ICON TRÊN HEADER ĐÃ SỬA LẠI */}
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Image 
              src="/images/Trái tim.png" 
              alt="Yêu thích"
              width={24}
              height={24}
            />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Image 
              src="/images/Bản đồ.png" 
              alt="Bản đồ"
              width={24}
              height={24}
            />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Image 
              src="/images/Chia sẻ.png" 
              alt="Chia sẻ"
              width={24}
              height={24}
            />
          </Button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* KHỐI NỘI DUNG CHÍNH - PHẦN QUAN TRỌNG NHẤT ĐÃ SỬA LẠI CẤU TRÚC      */}
      {/* ==================================================================== */}
      <div className="pb-24">
        {/* "Tham quan qua ảnh" Section */}
        <h1 className="text-lg font-semibold text-[#0a0a0a] mt-4 mb-3 px-4">Tham quan qua ảnh</h1>
        <div className="mb-6">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 pb-2 px-4">
              {/* Ảnh 1: Resort */}
              <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection(khongGianChungRef)}>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-1 w-40 sm:w-48">
                  <Image src="https://pix8.agoda.net/hotelImages/48898017/-1/9ccca4c717fa39e5a00ec72b8c732c66.jpg?ce=0&s=1024x" alt="Resort" fill className="object-cover" sizes="(max-width: 640px) 160px, 192px" />
                </div>
                <p className="text-sm font-medium text-[#0a0a0a]">Không gian chung</p>
              </div>
              {/* Ảnh 2: Phòng Sơn Ca */}
              <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection(phongSonCaRef)}>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-1 w-40 sm:w-48">
                  <Image src="https://s3.go2joy.vn/1000w/hotel/543/1228_1724233053_66c5b55d89d68.JPG" alt="Phòng Sơn Ca" fill className="object-cover" sizes="(max-width: 640px) 160px, 192px" />
                </div>
                <p className="text-sm font-medium text-[#0a0a0a]">Phòng Sơn Ca</p>
              </div>
              {/* Ảnh 3: Phòng Nhật Bản */}
              <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection(phongNhatBanRef)}>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-1 w-40 sm:w-48">
                  <Image src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484654_66ab07ae9a798.webp" alt="Phòng Nhật Bản" fill className="object-cover" sizes="(max-width: 640px) 160px, 192px" />
                </div>
                <p className="text-sm font-medium text-[#0a0a0a]">Phòng Nhật Bản</p>
              </div>
              {/* Ảnh 4: Phòng Mập Mờ */}
              <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection(phongMapMoRef)}>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-1 w-40 sm:w-48">
                  <Image src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484766_66ab081e77699.webp" alt="Phòng Mập Mờ" fill className="object-cover" sizes="(max-width: 640px) 160px, 192px" />
                </div>
                <p className="text-sm font-medium text-[#0a0a0a]">Phòng Mập Mờ</p>
              </div>
              {/* Ảnh 5: Phòng Santorini */}
              <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection(phongSantoriniRef)}>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-1 w-40 sm:w-48">
                  <Image src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484894_66ab089e3f2d2.webp" alt="Phòng Santorini" fill className="object-cover" sizes="(max-width: 640px) 160px, 192px" />
                </div>
                <p className="text-sm font-medium text-[#0a0a0a]">Phòng Santorini</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Tất cả các section ảnh chi tiết nằm BÊN TRONG div này --- */}
        <div ref={khongGianChungRef} id="khong-gian-chung" className="px-4 scroll-mt-20">
          <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3">Không gian chung</h2>
          <div className="space-y-3">
             {/* ... Nội dung ảnh không gian chung ... */}
          </div>
        </div>
        
        <div ref={phongSonCaRef} id="phong-son-ca" className="px-4 scroll-mt-20 mt-6">
          <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3">Phòng Sơn Ca</h2>
          <div className="space-y-3">
             {/* ... Nội dung ảnh phòng Sơn Ca ... */}
          </div>
        </div>

        <div ref={phongNhatBanRef} id="phong-nhat-ban" className="px-4 scroll-mt-20 mt-6">
          <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3">Phòng Nhật Bản</h2>
          <div className="space-y-3">
             {/* ... Nội dung ảnh phòng Nhật Bản ... */}
          </div>
        </div>

        <div ref={phongMapMoRef} id="phong-map-mo" className="px-4 scroll-mt-20 mt-6">
          <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3">Phòng Mập Mờ</h2>
          <div className="space-y-3">
             {/* ... Nội dung ảnh phòng Mập Mờ ... */}
          </div>
        </div>
        
        <div ref={phongSantoriniRef} id="phong-santorini" className="px-4 scroll-mt-20 mt-6">
          <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3">Phòng Santorini</h2>
          <div className="space-y-3">
             {/* ... Nội dung ảnh phòng Santorini ... */}
          </div>
        </div>
      </div>
      {/* Thẻ đóng của div pb-24 đã được di chuyển xuống đây */}

      {/* ==================================================================== */}
      {/* BOTTOM NAVIGATION - ĐÃ ĐƯỢC THIẾT KẾ LẠI                           */}
      {/* ==================================================================== */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-white z-20 border-t border-gray-200">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-around px-1 py-1.5">

            <Button variant="ghost" className="h-auto flex flex-col items-center justify-center px-2 py-1.5 text-gray-600 hover:bg-gray-100 focus:bg-orange-50 focus:text-orange-500 rounded-lg">
              <Image src="/images/gen.png" alt="Tổng quan" width={28} height={28} className="mb-0.5"/>
              <span className="text-xs font-medium">Tổng quan</span>
            </Button>

            <Button variant="ghost" className="h-auto flex flex-col items-center justify-center px-2 py-1.5 text-gray-600 hover:bg-gray-100 focus:bg-orange-50 focus:text-orange-500 rounded-lg">
              <Image src="/images/amenliti.png" alt="Tiện ích" width={28} height={28} className="mb-0.5"/>
              <span className="text-xs font-medium">Tiện ích</span>
            </Button>

            <Button variant="ghost" className="h-auto flex flex-col items-center justify-center px-2 py-1.5 text-gray-600 hover:bg-gray-100 focus:bg-orange-50 focus:text-orange-500 rounded-lg">
              <Image src="/images/star.jpg" alt="Đánh giá" width={28} height={28} className="mb-0.5"/>
              <span className="text-xs font-medium">Đánh giá</span>
            </Button>

            <Button variant="ghost" className="h-auto flex flex-col items-center justify-center px-2 py-1.5 text-gray-600 hover:bg-gray-100 focus:bg-orange-50 focus:text-orange-500 rounded-lg">
              <Image src="/images/more.png" alt="Xem thêm" width={28} height={28} className="mb-0.5"/>
              <span className="text-xs font-medium">Xem thêm</span>
            </Button>

            <Link href="/rooms" passHref legacyBehavior>
              <a className="h-10 w-10 p-0 rounded-lg bg-orange-400 hover:bg-orange-500 shadow-md flex items-center justify-center transform hover:scale-105 transition-transform duration-150">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                  <rect x="4" y="3" width="12" height="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
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
