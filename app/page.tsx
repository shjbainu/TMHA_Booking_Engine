"use client"

import { useRef } from "react" // 1. Import useRef

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

// Giả sử component của bạn tên là HotelPhotosPage
export default function HotelPhotosPage() {
  // 2. Tạo Refs
  const khongGianChungRef = useRef(null)
  const phongSonCaRef = useRef(null)
  const phongNhatBanRef = useRef(null)
  const phongMapMoRef = useRef(null)
  const phongSantoriniRef = useRef(null)

  // 4. Tạo hàm xử lý cuộn
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
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Image src="data:image/jpeg;base64,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" width={30} height={30} className="mb-0.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10">
           <Image src="data:image/jpeg;base64,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" alt="Hotel Icon" width={35} height={35} className="mb-0.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Image src="data:image/jpeg;base64,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" alt="Hotel Icon" width={30} height={30} className="mb-0.5" />
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

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-white z-20 border-t border-gray-200">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-around px-1 py-1.5">
            <Button
              variant="ghost"
              className="h-auto flex flex-col items-center justify-center px-2 py-1.5 text-[#0a0a0a] hover:bg-gray-100 focus:bg-gray-100"
            >
              <Image src="data:image/jpeg;base64,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" alt="Hotel Icon" width={40} height={40} className="mb-0.5" />
              
            </Button>
            <Button
              variant="ghost"
              className="h-auto flex flex-col items-center justify-center px-2 py-1.5 text-[#0a0a0a] hover:bg-gray-100 focus:bg-gray-100"
            >
              <Image src="data:image/jpeg;base64,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" alt="Hotel Icon" width={40} height={40} className="mb-0.5"/>
            </Button>
            <Button
              variant="ghost"
              className="h-auto flex flex-col items-center justify-center px-2 py-1.5 text-[#0a0a0a] hover:bg-gray-100 focus:bg-gray-100"
            >
              <Image src="data:image/jpeg;base64,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
            " alt="Hotel Icon" width={40} height={40} className="mb-0.5"/>
            </Button>
            <Button
              variant="ghost"
              className="h-auto flex flex-col items-center justify-center px-2 py-1.5 text-[#0a0a0a] hover:bg-gray-100 focus:bg-gray-100"
            >
              <MoreHorizontal className="h-5 w-5 mb-0.5" />
              <span className="text-[11px] leading-tight font-medium">Thêm</span>
            </Button>
            <Link href="/rooms" passHref legacyBehavior>
              <a className="h-10 w-10 p-0 rounded-lg bg-orange-400 hover:bg-orange-500 shadow-md flex items-center justify-center transform hover:scale-105 transition-transform duration-150">
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
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
