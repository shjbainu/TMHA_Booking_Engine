"use client"

import { useRef, useState } from "react"
import { MoreHorizontal, ArrowLeft, LayoutGrid, X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function HotelPhotosPage() {
  // --- Refs để cuộn đến các section (giữ nguyên) ---
  const khongGianChungRef = useRef(null)
  const phongSonCaRef = useRef(null)
  const phongNhatBanRef = useRef(null)
  const phongMapMoRef = useRef(null)
  const phongSantoriniRef = useRef(null)

  // --- State để quản lý việc mở/đóng các popup ---
  const [isGalleryPopupOpen, setIsGalleryPopupOpen] = useState(false)
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false) // State mới cho popup thông tin

  // Hàm xử lý cuộn mượt đến section được chọn (giữ nguyên)
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
      {/* ==================== HEADER CHÍNH (giữ nguyên) ==================== */}
      <div className="flex items-center justify-between p-4 bg-white sticky top-0 z-10 border-b border-gray-200">
        <Button variant="ghost" size="icon" className="h-10 w-10">
          <ArrowLeft className="h-6 w-6 text-[#0a0a0a]" />
        </Button>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Image src="data:image/jpeg;base64,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" width={35} height={35} className="mb-0.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <MoreHorizontal className="h-6 w-6 text-[#0a0a0a]" />
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="pb-24">
        {/* "Tham quan qua ảnh" Section */}
        <h1 className="text-lg font-semibold text-[#0a0a0a] mt-4 mb-3 px-4">Tham quan qua ảnh</h1>
        <div className="mb-6">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 pb-2 px-4">
              {/* Ảnh 1: Resort */}
              <div
                className="flex-shrink-0 cursor-pointer"
                onClick={() => scrollToSection(khongGianChungRef)} // 5. Thêm onClick
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-1 w-40 sm:w-48">
                  <Image
                    src="https://pix8.agoda.net/hotelImages/48898017/-1/9ccca4c717fa39e5a00ec72b8c732c66.jpg?ce=0&s=1024x"
                    alt="Resort - Enso Retreat Hoi An"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 160px, 192px"
                  />
                </div>
                <p className="text-sm font-medium text-[#0a0a0a]">Không gian chung</p>
              </div>
              {/* Ảnh 2: Phòng Sơn Ca */}
              <div
                className="flex-shrink-0 cursor-pointer"
                onClick={() => scrollToSection(phongSonCaRef)} // 5. Thêm onClick
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-1 w-40 sm:w-48">
                  <Image
                    src="https://s3.go2joy.vn/1000w/hotel/543/1228_1724233053_66c5b55d89d68.JPG"
                    alt="Phòng Sơn Ca Thumbnail"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 160px, 192px"
                  />
                </div>
                <p className="text-sm font-medium text-[#0a0a0a]">Phòng Sơn Ca</p>
              </div>
              {/* Ảnh 3: Phòng Nhật Bản */}
              <div
                className="flex-shrink-0 cursor-pointer"
                onClick={() => scrollToSection(phongNhatBanRef)} // 5. Thêm onClick
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-1 w-40 sm:w-48">
                  <Image
                    src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484654_66ab07ae9a798.webp"
                    alt="Phòng Nhật Bản Thumbnail"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 160px, 192px"
                  />
                </div>
                <p className="text-sm font-medium text-[#0a0a0a]">Phòng Nhật Bản</p>
              </div>
              {/* Ảnh 4: Phòng Mập Mờ */}
              <div
                className="flex-shrink-0 cursor-pointer"
                onClick={() => scrollToSection(phongMapMoRef)} // 5. Thêm onClick
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-1 w-40 sm:w-48">
                  <Image
                    src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484766_66ab081e77699.webp"
                    alt="Phòng Mập Mờ Thumbnail"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 160px, 192px"
                  />
                </div>
                <p className="text-sm font-medium text-[#0a0a0a]">Phòng Mập Mờ</p>
              </div>
              {/* Ảnh 5: Phòng Santorini */}
              <div
                className="flex-shrink-0 cursor-pointer"
                onClick={() => scrollToSection(phongSantoriniRef)} // 5. Thêm onClick
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-1 w-40 sm:w-48">
                  <Image
                    src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484894_66ab089e3f2d2.webp"
                    alt="Phòng Santorini Thumbnail"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 160px, 192px"
                  />
                </div>
                <p className="text-sm font-medium text-[#0a0a0a]">Phòng Santorini</p>
              </div>
            </div>
          </div>
        </div>

        {/* "Không gian chung" Section */}
        <div ref={khongGianChungRef} id="khong-gian-chung" className="px-4 scroll-mt-20">
          {" "}
          {/* 3. Gán ref và id, thêm scroll-mt */}
          <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3">Không gian chung</h2>
          <div className="space-y-3">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="https://pix8.agoda.net/hotelImages/48898017/-1/d138856dca2d16e1a7f6928e2dd65fc9.jpg?ce=0&s=1024x"
                alt="Không gian chung - Toàn cảnh resort"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://pix8.agoda.net/hotelImages/48898017/-1/23ffae2b7ab87fc65d78e4b0c95dec3d.jpg?ce=0&s=1024x"
                  alt="Không gian chung - Bàn Bida"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://pix8.agoda.net/hotelImages/48898017/-1/77c68141307f1aad7b9f5fdd7b2f2ece.jpg?ce=0&s=1024x"
                  alt="Không gian chung - Spa"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="https://pix8.agoda.net/hotelImages/48898017/-1/93e78b4f5286d8e3a6adae4e524c2a6a.png?ce=0&s=1024x"
                alt="Không gian chung - Hồ bơi"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://pix8.agoda.net/hotelImages/48898017/-1/54c149e26857b71d1ddd37bd8af57fcb.jpg?ce=0&s=1024x"
                  alt="Không gian chung - View 1"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://pix8.agoda.net/hotelImages/48898017/-1/18ef5ac6240e9186c2260536404b04bd.png?ce=0&s=1024x"
                  alt="Không gian chung - View 2"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
            </div>
          </div>
        </div>
        {/* "Phòng Sơn Ca" Section */}
        <div ref={phongSonCaRef} id="phong-son-ca" className="px-4 scroll-mt-20">
          {" "}
          {/* 3. Gán ref và id, thêm scroll-mt */}
          <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3 mt-5">Phòng Sơn Ca</h2>
          <div className="space-y-3">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484553_66ab07495d890.webp"
                alt="Phòng Sơn Ca - Ảnh 1"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484553_66ab07496a2ee.webp"
                  alt="Phòng Sơn Ca - Ảnh 2"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484553_66ab07496c812.webp"
                  alt="Phòng Sơn Ca - Ảnh 3"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484553_66ab07496dcbb.webp"
                alt="Phòng Sơn Ca - Ảnh 4"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484553_66ab07496b5c0.webp"
                  alt="Phòng Sơn Ca - Ảnh 5"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484553_66ab07495d890.webp"
                  alt="Phòng Sơn Ca - Ảnh 6"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
            </div>
          </div>
        </div>
        {/* "Phòng Nhật bản" Section */}
        <div ref={phongNhatBanRef} id="phong-nhat-ban" className="px-4 scroll-mt-20">
          {" "}
          {/* 3. Gán ref và id, thêm scroll-mt */}
          <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3 mt-5">Phòng Nhật Bản</h2>
          <div className="space-y-3">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484654_66ab07ae89e19.webp"
                alt="Phòng Nhật Bản - Ảnh 1"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484654_66ab07ae96b97.webp"
                  alt="Phòng Nhật Bản - Ảnh 2"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484654_66ab07ae97e57.webp"
                  alt="Phòng Nhật Bản - Ảnh 3"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484654_66ab07ae991b4.webp"
                alt="Phòng Nhật Bản - Ảnh 4"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484654_66ab07ae9a798.webp"
                  alt="Phòng Nhật Bản - Ảnh 5"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484654_66ab07ae9d737.webp"
                  alt="Phòng Nhật Bản - Ảnh 6"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
            </div>
          </div>
        </div>
        {/* "Phòng Mập Mờ" Section */}
        <div ref={phongMapMoRef} id="phong-map-mo" className="px-4 scroll-mt-20">
          {" "}
          {/* 3. Gán ref và id, thêm scroll-mt */}
          <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3 mt-5">Phòng Mập Mờ</h2>
          <div className="space-y-3">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484766_66ab081e6bcc1.webp"
                alt="Phòng Mập Mờ - Ảnh 1"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484766_66ab081e7b30f.webp"
                  alt="Phòng Mập Mờ - Ảnh 2"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484766_66ab081e78b7b.webp"
                  alt="Phòng Mập Mờ - Ảnh 3"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484766_66ab081e79ed3.webp"
                alt="Phòng Mập Mờ - Ảnh 4"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484766_66ab081e77699.webp"
                  alt="Phòng Mập Mờ - Ảnh 5"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484766_66ab081e7e4b0.webp"
                  alt="Phòng Mập Mờ - Ảnh 6"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
            </div>
          </div>
        </div>
        {/* "Phòng Santorini" Section */}
        <div ref={phongSantoriniRef} id="phong-santorini" className="px-4 scroll-mt-20">
          {" "}
          {/* 3. Gán ref và id, thêm scroll-mt */}
          <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3 mt-5">Phòng Santorini</h2>
          <div className="space-y-3">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484894_66ab089e3f2d2.webp"
                alt="Phòng Santorini - Ảnh 1"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484894_66ab089e4a8ed.webp"
                  alt="Phòng Santorini - Ảnh 2"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://s3.go2joy.vn/1000w/hotel/543/9167_1713150149_661c98c5d55b2.jpg"
                  alt="Phòng Santorini - Ảnh 3"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484894_66ab089e4d43b.webp"
                alt="Phòng Santorini - Ảnh 4"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484894_66ab089e4f0ca.webp"
                  alt="Phòng Santorini - Ảnh 5"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://s3.go2joy.vn/1000w/hotel/543/9167_1713150150_661c98c61561a.jpg"
                  alt="Phòng Santorini - Ảnh 6"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* ==================== BOTTOM NAVIGATION (giữ nguyên) ==================== */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-white z-20 border-t border-gray-200">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-around px-1 py-1.5">
            {/* --- Nút Tổng quan - Mở popup thông tin --- */}
            <Button
              variant="ghost"
              className="h-auto flex flex-col items-center justify-center px-2 py-1.5 text-[#0a0a0a] hover:bg-gray-100 focus:bg-gray-100"
              onClick={() => setIsInfoPopupOpen(true)}
            >
              <Image src="data:image/jpeg;base64,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" alt="Hotel Icon" width={40} height={40} className="mb-0.5" />
              <span className="text-xs">Tổng quan</span>
            </Button>
            {/* Các button khác... */}
          </div>
        </div>
      </div>
      
      {/* ==================== POPUP THƯ VIỆN ẢNH (giữ nguyên) ==================== */}
      {isGalleryPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setIsGalleryPopupOpen(false)}>
          {/* ... */}
        </div>
      )}

      {/* ==================== POPUP THÔNG TIN KHÁCH SẠN ==================== */}
      {isInfoPopupOpen && (
        // Lớp phủ
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
          onClick={() => setIsInfoPopupOpen(false)}
        >
          {/* Khung nội dung với hiệu ứng trượt */}
          <div
            className={`relative w-full max-w-md bg-white rounded-t-2xl h-[90vh] flex flex-col shadow-lg transition-transform duration-300 ease-out transform ${
              isInfoPopupOpen ? 'translate-y-0' : 'translate-y-full'
            }`}
            onClick={handleContentClick}
          >
            {/* Header của Popup */}
            <div className="flex-shrink-0 pt-4 px-4 pb-2 text-center relative">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-300 rounded-full"></div>
              <h2 className="text-xl font-bold mt-4 flex items-center justify-center">
                69 Boutique
                <ExternalLink className="inline-block h-5 w-5 ml-2 text-gray-500" />
              </h2>
              <p className="text-sm text-gray-500 mt-1">69.Ng 53, Nguyễn Ngọc Vũ, Trung Hòa Cầu Giấy, Hà Nội</p>
            </div>

            {/* Khu vực nội dung có thể cuộn */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="space-y-4 text-gray-800 leading-relaxed">
                <li className="flex">
                  <span className="mr-3 text-gray-500">•</span>
                  <div>
                    69 Boutique by Minova tọa lạc tại số 69 Ngõ 53 Nguyễn Ngọc Vũ, quận Cầu Giấy, Hà Nội – vị trí trung tâm nhưng vẫn giữ được sự yên tĩnh và riêng tư. Khách sạn có 15 phòng nghỉ được thiết kế theo nhiều phong cách từ tối giản hiện đại đến sang trọng ấm cúng, đầy đủ tiện nghi như điều hòa, TV, minibar, Wi-Fi tốc độ cao. Một số phòng cao cấp còn có bồn tắm jacuzzi riêng, phù hợp cho nhu cầu nghỉ ngơi, thư giãn.
                  </div>
                </li>
                <li className="flex">
                  <span className="mr-3 text-gray-500">•</span>
                  <div>
                    Giá phòng linh hoạt, từ 200.000 VNĐ/giờ đến 1.500.000 VNĐ/đêm, phù hợp với nhiều nhu cầu từ nghỉ ngắn đến lưu trú dài ngày. Từ khách sạn, du khách dễ dàng di chuyển đến các địa điểm nổi tiếng như Hồ Tây, Hồ Hoàn Kiếm, Lăng Bác, Văn Miếu chỉ trong 10-25 phút lái xe.
                  </div>
                </li>
                <li className="flex">
                  <span className="mr-3 text-gray-500">•</span>
                  <div>
                    Dịch vụ tại khách sạn bao gồm lễ tân 24/7, cho thuê xe, đưa đón sân bay, giặt ủi, thang máy tiện lợi. Nhân viên thân thiện, chuyên nghiệp, giao tiếp được bằng tiếng Việt, Anh và Nhật. Khách sạn được đánh giá cao trên Booking.com, MoMo, Trip.com nhờ không gian sạch sẽ, yên tĩnh và dịch vụ chu đáo. Đặt phòng dễ dàng với nhiều ưu đãi.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
