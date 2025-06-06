"use client"

import { useRef, useState } from "react"
import { MoreHorizontal, ArrowLeft, LayoutGrid, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function HotelPhotosPage() {
  // --- Refs để cuộn đến các section ---
  const khongGianChungRef = useRef(null)
  const phongSonCaRef = useRef(null)
  const phongNhatBanRef = useRef(null)
  const phongMapMoRef = useRef(null)
  const phongSantoriniRef = useRef(null)

  // --- State để quản lý việc mở/đóng popup ---
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  // Hàm xử lý cuộn mượt đến section được chọn
  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  // Hàm này ngăn việc click vào nội dung popup làm đóng popup
  const handleContentClick = (e) => {
    e.stopPropagation()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ==================== HEADER CHÍNH ==================== */}
      <div className="flex items-center justify-between p-4 bg-white sticky top-0 z-10 border-b border-gray-200">
        <Link href="/" passHref>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <ArrowLeft className="h-6 w-6 text-[#0a0a0a]" />
          </Button>
        </Link>
        <h2 className="font-semibold text-lg">69 Boutique</h2>
        <div className="flex items-center">
          {/* Nút bấm để mở popup */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-10 w-10"
            onClick={() => setIsPopupOpen(true)}
          >
            <LayoutGrid className="h-6 w-6 text-[#0a0a0a]" />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <MoreHorizontal className="h-6 w-6 text-[#0a0a0a]" />
          </Button>
        </div>
      </div>

      {/* ==================== NỘI DUNG CHÍNH CỦA TRANG ==================== */}
      <div className="pb-24">
        {/* "Tham quan qua ảnh" Section */}
        <h1 className="text-lg font-semibold text-[#0a0a0a] mt-4 mb-3 px-4">Tham quan qua ảnh</h1>
        <div className="mb-6">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 pb-2 px-4">
              <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection(khongGianChungRef)}>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-1 w-40 sm:w-48"><Image src="https://pix8.agoda.net/hotelImages/48898017/-1/9ccca4c717fa39e5a00ec72b8c732c66.jpg?ce=0&s=1024x" alt="Resort - Enso Retreat Hoi An" fill className="object-cover" sizes="(max-width: 640px) 160px, 192px" /></div>
                <p className="text-sm font-medium text-[#0a0a0a]">Không gian chung</p>
              </div>
              <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection(phongSonCaRef)}>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-1 w-40 sm:w-48"><Image src="https://s3.go2joy.vn/1000w/hotel/543/1228_1724233053_66c5b55d89d68.JPG" alt="Phòng Sơn Ca Thumbnail" fill className="object-cover" sizes="(max-width: 640px) 160px, 192px" /></div>
                <p className="text-sm font-medium text-[#0a0a0a]">Phòng Sơn Ca</p>
              </div>
              <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection(phongNhatBanRef)}>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-1 w-40 sm:w-48"><Image src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484654_66ab07ae9a798.webp" alt="Phòng Nhật Bản Thumbnail" fill className="object-cover" sizes="(max-width: 640px) 160px, 192px" /></div>
                <p className="text-sm font-medium text-[#0a0a0a]">Phòng Nhật Bản</p>
              </div>
              <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection(phongMapMoRef)}>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-1 w-40 sm:w-48"><Image src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484766_66ab081e77699.webp" alt="Phòng Mập Mờ Thumbnail" fill className="object-cover" sizes="(max-width: 640px) 160px, 192px" /></div>
                <p className="text-sm font-medium text-[#0a0a0a]">Phòng Mập Mờ</p>
              </div>
              <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection(phongSantoriniRef)}>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-1 w-40 sm:w-48"><Image src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484894_66ab089e3f2d2.webp" alt="Phòng Santorini Thumbnail" fill className="object-cover" sizes="(max-width: 640px) 160px, 192px" /></div>
                <p className="text-sm font-medium text-[#0a0a0a]">Phòng Santorini</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Section "Không gian chung" --- */}
        <div ref={khongGianChungRef} id="khong-gian-chung" className="px-4 scroll-mt-20">
          <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3">Không gian chung</h2>
          <div className="space-y-3">
            <div className="relative aspect-video rounded-lg overflow-hidden"><Image src="https://pix8.agoda.net/hotelImages/48898017/-1/d138856dca2d16e1a7f6928e2dd65fc9.jpg?ce=0&s=1024x" alt="Không gian chung - Toàn cảnh resort" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden"><Image src="https://pix8.agoda.net/hotelImages/48898017/-1/23ffae2b7ab87fc65d78e4b0c95dec3d.jpg?ce=0&s=1024x" alt="Không gian chung - Bàn Bida" fill className="object-cover" sizes="(max-width: 768px) 50vw, 384px" /></div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden"><Image src="https://pix8.agoda.net/hotelImages/48898017/-1/77c68141307f1aad7b9f5fdd7b2f2ece.jpg?ce=0&s=1024x" alt="Không gian chung - Spa" fill className="object-cover" sizes="(max-width: 768px) 50vw, 384px" /></div>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden"><Image src="https://pix8.agoda.net/hotelImages/48898017/-1/93e78b4f5286d8e3a6adae4e524c2a6a.png?ce=0&s=1024x" alt="Không gian chung - Hồ bơi" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" /></div>
          </div>
        </div>

        {/* --- Section "Phòng Sơn Ca" --- */}
        <div ref={phongSonCaRef} id="phong-son-ca" className="px-4 scroll-mt-20 mt-6">
          <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3">Phòng Sơn Ca</h2>
          <div className="space-y-3">
            <div className="relative aspect-video rounded-lg overflow-hidden"><Image src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484553_66ab07495d890.webp" alt="Phòng Sơn Ca - Ảnh 1" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden"><Image src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484553_66ab07496a2ee.webp" alt="Phòng Sơn Ca - Ảnh 2" fill className="object-cover" sizes="(max-width: 768px) 50vw, 384px" /></div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden"><Image src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484553_66ab07496c812.webp" alt="Phòng Sơn Ca - Ảnh 3" fill className="object-cover" sizes="(max-width: 768px) 50vw, 384px" /></div>
            </div>
          </div>
        </div>

        {/* --- Section "Phòng Nhật Bản" --- */}
        <div ref={phongNhatBanRef} id="phong-nhat-ban" className="px-4 scroll-mt-20 mt-6">
          <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3">Phòng Nhật Bản</h2>
          <div className="space-y-3">
            <div className="relative aspect-video rounded-lg overflow-hidden"><Image src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484654_66ab07ae89e19.webp" alt="Phòng Nhật Bản - Ảnh 1" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" /></div>
            <div className="relative aspect-video rounded-lg overflow-hidden"><Image src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484654_66ab07ae9a798.webp" alt="Phòng Nhật Bản - Ảnh 5" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" /></div>
          </div>
        </div>
        
        {/* --- Section "Phòng Mập Mờ" --- */}
        <div ref={phongMapMoRef} id="phong-map-mo" className="px-4 scroll-mt-20 mt-6">
          <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3">Phòng Mập Mờ</h2>
          <div className="space-y-3">
            <div className="relative aspect-video rounded-lg overflow-hidden"><Image src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484766_66ab081e6bcc1.webp" alt="Phòng Mập Mờ - Ảnh 1" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" /></div>
            <div className="relative aspect-video rounded-lg overflow-hidden"><Image src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484766_66ab081e79ed3.webp" alt="Phòng Mập Mờ - Ảnh 4" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" /></div>
          </div>
        </div>
        
        {/* --- Section "Phòng Santorini" --- */}
        <div ref={phongSantoriniRef} id="phong-santorini" className="px-4 scroll-mt-20 mt-6">
          <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3">Phòng Santorini</h2>
          <div className="space-y-3">
            <div className="relative aspect-video rounded-lg overflow-hidden"><Image src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484894_66ab089e3f2d2.webp" alt="Phòng Santorini - Ảnh 1" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" /></div>
            <div className="relative aspect-video rounded-lg overflow-hidden"><Image src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484894_66ab089e4d43b.webp" alt="Phòng Santorini - Ảnh 4" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" /></div>
          </div>
        </div>
      </div>

      {/* ==================== BOTTOM NAVIGATION ==================== */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-white z-20 border-t border-gray-200">
        {/* ... (Nội dung bottom nav của bạn giữ nguyên ở đây) ... */}
      </div>
      
      {/* ==================== POPUP THƯ VIỆN ẢNH ==================== */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setIsPopupOpen(false)}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-2xl h-[90vh] flex flex-col shadow-lg"
            onClick={handleContentClick}
          >
            {/* --- Header của Popup --- */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
              <div className="w-10"></div>
              <h2 className="text-lg font-semibold text-center text-[#0a0a0a]">Tất cả ảnh</h2>
              <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setIsPopupOpen(false)}>
                <X className="h-6 w-6 text-gray-500" />
              </Button>
            </div>

            {/* --- Khu vực nội dung có thể cuộn của Popup --- */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* --- Section "Không gian chung" trong Popup --- */}
              <div>
                <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3">Không gian chung</h2>
                <div className="space-y-3">
                  <div className="relative aspect-video rounded-lg overflow-hidden"><Image src="https://pix8.agoda.net/hotelImages/48898017/-1/d138856dca2d16e1a7f6928e2dd65fc9.jpg?ce=0&s=1024x" alt="Không gian chung - Toàn cảnh resort" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" /></div>
                  <div className="grid grid-cols-2 gap-3"><div className="relative aspect-[4/3] rounded-lg overflow-hidden"><Image src="https://pix8.agoda.net/hotelImages/48898017/-1/23ffae2b7ab87fc65d78e4b0c95dec3d.jpg?ce=0&s=1024x" alt="Không gian chung - Bàn Bida" fill className="object-cover" sizes="(max-width: 768px) 50vw, 384px" /></div><div className="relative aspect-[4/3] rounded-lg overflow-hidden"><Image src="https://pix8.agoda.net/hotelImages/48898017/-1/77c68141307f1aad7b9f5fdd7b2f2ece.jpg?ce=0&s=1024x" alt="Không gian chung - Spa" fill className="object-cover" sizes="(max-width: 768px) 50vw, 384px" /></div></div>
                  <div className="relative aspect-video rounded-lg overflow-hidden"><Image src="https://pix8.agoda.net/hotelImages/48898017/-1/93e78b4f5286d8e3a6adae4e524c2a6a.png?ce=0&s=1024x" alt="Không gian chung - Hồ bơi" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" /></div>
                </div>
              </div>

              {/* --- Section "Phòng Sơn Ca" trong Popup --- */}
              <div>
                <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3">Phòng Sơn Ca</h2>
                <div className="space-y-3">
                  <div className="relative aspect-video rounded-lg overflow-hidden"><Image src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484553_66ab07495d890.webp" alt="Phòng Sơn Ca - Ảnh 1" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" /></div>
                  <div className="grid grid-cols-2 gap-3"><div className="relative aspect-[4/3] rounded-lg overflow-hidden"><Image src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484553_66ab07496a2ee.webp" alt="Phòng Sơn Ca - Ảnh 2" fill className="object-cover" sizes="(max-width: 768px) 50vw, 384px" /></div><div className="relative aspect-[4/3] rounded-lg overflow-hidden"><Image src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484553_66ab07496c812.webp" alt="Phòng Sơn Ca - Ảnh 3" fill className="object-cover" sizes="(max-width: 768px) 50vw, 384px" /></div></div>
                </div>
              </div>

              {/* --- Section "Phòng Nhật Bản" trong Popup --- */}
              <div>
                <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3">Phòng Nhật Bản</h2>
                <div className="space-y-3">
                  <div className="relative aspect-video rounded-lg overflow-hidden"><Image src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484654_66ab07ae89e19.webp" alt="Phòng Nhật Bản - Ảnh 1" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" /></div>
                  <div className="relative aspect-video rounded-lg overflow-hidden"><Image src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484654_66ab07ae9a798.webp" alt="Phòng Nhật Bản - Ảnh 5" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" /></div>
                </div>
              </div>
              
              {/* --- Section "Phòng Mập Mờ" trong Popup --- */}
              <div>
                <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3">Phòng Mập Mờ</h2>
                <div className="space-y-3">
                  <div className="relative aspect-video rounded-lg overflow-hidden"><Image src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484766_66ab081e6bcc1.webp" alt="Phòng Mập Mờ - Ảnh 1" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" /></div>
                  <div className="relative aspect-video rounded-lg overflow-hidden"><Image src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484766_66ab081e79ed3.webp" alt="Phòng Mập Mờ - Ảnh 4" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" /></div>
                </div>
              </div>
              
              {/* --- Section "Phòng Santorini" trong Popup --- */}
              <div>
                <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3">Phòng Santorini</h2>
                <div className="space-y-3">
                  <div className="relative aspect-video rounded-lg overflow-hidden"><Image src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484894_66ab089e3f2d2.webp" alt="Phòng Santorini - Ảnh 1" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" /></div>
                  <div className="relative aspect-video rounded-lg overflow-hidden"><Image src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484894_66ab089e4d43b.webp" alt="Phòng Santorini - Ảnh 4" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
