"use client"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import HotelIntroDrawer from "@/components/hotel-intro-drawer"
import HotelAmenitiesDrawer from "@/components/hotel-amenities-drawer"
import HotelReviewsDrawer from "@/components/hotel-reviews-drawer"
import NearbyAmenitiesDrawer from "@/components/nearby-amenities-drawer" // Import new drawer
import LocalExplorationDrawer from "@/components/local-exploration-drawer" // Import new drawer
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ShareOptionsPopup } from "@/components/popups/ShareOptionsPopup" // Import new popup
import { ScrollIndicatorTooltip } from "@/components/scroll-indicator-tooltip"

export default function HotelPhotosPage() {
  const [isHotelIntroDrawerOpen, setIsHotelIntroDrawerOpen] = useState(false)
  const [isHotelAmenitiesDrawerOpen, setIsHotelAmenitiesDrawerOpen] = useState(false)
  const [isHotelReviewsDrawerOpen, setIsHotelReviewsDrawerOpen] = useState(false)
  const [isNearbyAmenitiesDrawerOpen, setIsNearbyAmenitiesDrawerOpen] = useState(false) // New state
  const [isLocalExplorationDrawerOpen, setIsLocalExplorationDrawerOpen] = useState(false) // New state
  const [isMoreOptionsDialogOpen, setIsMoreOptionsDialogOpen] = useState(false)
  const [isShareOptionsPopupOpen, setIsShareOptionsPopupOpen] = useState(false) // New state for share popup

  const hotelName = "69 Boutique by Minova"
  const hotelAddress = "69 Ng. 53 Đ. Nguyễn Ngọc Vũ, Trung Hoà, Cầu Giấy, Hà Nội"

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
      <ScrollIndicatorTooltip
        sections={[
          { id: "khong-gian-chung", ref: khongGianChungRef, label: "Không gian chung" },
          { id: "phong-son-ca", ref: phongSonCaRef, label: "Phòng Sơn Ca" },
          { id: "phong-nhat-ban", ref: phongNhatBanRef, label: "Phòng Nhật Bản" },
          { id: "phong-map-mo", ref: phongMapMoRef, label: "Phòng Mập Mờ" },
          { id: "phong-santorini", ref: phongSantoriniRef, label: "Phòng Santorini" },
        ]}
      />
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white sticky top-0 z-10 border-b border-gray-200">
        <h4 className="font-serif-display text-2xl font-bold text-gray-900">69 Boutique by Minova</h4>
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            onClick={() => {
              const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotelAddress)}`
              window.open(mapUrl, "_blank")
            }}
          >
            <Image src="/images/location_navigation.png" alt="Biểu tượng bản đồ" width={24} height={24} />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setIsShareOptionsPopupOpen(true)}>
            <Image src="/images/share_navigation.png" alt="Biểu tượng chia sẻ" width={24} height={24} />
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
              <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection(khongGianChungRef)}>
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
              <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection(phongSonCaRef)}>
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
              <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection(phongNhatBanRef)}>
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
              <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection(phongMapMoRef)}>
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
              <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection(phongSantoriniRef)}>
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
      <div className="fixed bottom-4 inset-x-0 z-20 flex justify-center">
        <div className="flex items-center gap-2">
          {/* Thanh chứa 4 icon với hiệu ứng kính mờ */}
          <div className="flex items-center rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-gray-200/50 px-10 py-1 gap-x-5">
            {/* Button Tổng quan */}
            <Button
              variant="ghost"
              className="h-auto flex flex-col items-center justify-center px-2 py-1.5 text-[#0a0a0a] hover:bg-gray-100 focus:bg-gray-100"
              onClick={() => setIsHotelIntroDrawerOpen(true)}
            >
              <Image src="/images/9tongquan.png" alt="Biểu tượng tổng quan" width={30} height={30} />
            </Button>
            {/* Button Tiện ích */}
            <Button
              variant="ghost"
              className="h-auto flex flex-col items-center justify-center px-2 py-1.5 text-[#0a0a0a] hover:bg-gray-100 focus:bg-gray-100"
              onClick={() => setIsHotelAmenitiesDrawerOpen(true)}
            >
              <Image src="/images/9tienich.png" alt="Biểu tượng tiện ích" width={30} height={30} />
            </Button>
            {/* Button Đánh giá */}
            <Button
              variant="ghost"
              className="h-auto flex flex-col items-center justify-center px-2 py-1.5 text-[#0a0a0a] hover:bg-gray-100 focus:bg-gray-100"
              onClick={() => setIsHotelReviewsDrawerOpen(true)}
            >
              <Image src="/images/9danhgia.png" alt="Biểu tượng đánh giá" width={30} height={30} />
            </Button>
            {/* Button More with Dropdown */}
            <Button
              variant="ghost"
              className="h-auto flex flex-col items-center justify-center px-2 py-1.5 text-[#0a0a0a] hover:bg-gray-100 focus:bg-gray-100"
              onClick={() => setIsMoreOptionsDialogOpen(true)}
            >
              <Image src="/images/9xemthem.png" alt="Biểu tượng thêm" width={30} height={30} />
            </Button>
            </div>
            <Link href="/rooms" passHref legacyBehavior>
              <a className="h-12 w-12 p-3 rounded-lg bg-orange-400 hover:bg-orange-500 shadow-md flex items-center justify-center transform hover:scale-105 transition-transform duration-150">
                <img src="/images/9chonphong.png" alt="Room" width="60%" height="60%" />
              </a>
            </Link>
          </div>
        </div>
      

      <MoreOptionsDialog
        isOpen={isMoreOptionsDialogOpen}
        onClose={() => setIsMoreOptionsDialogOpen(false)}
        onOpenNearbyAmenities={() => setIsNearbyAmenitiesDrawerOpen(true)}
        onOpenLocalExploration={() => setIsLocalExplorationDrawerOpen(true)}
      />

      {/* Hotel Intro Drawer */}
      <HotelIntroDrawer
        isOpen={isHotelIntroDrawerOpen}
        onClose={() => setIsHotelIntroDrawerOpen(false)}
        hotelName={hotelName}
        hotelAddress={hotelAddress}
      />
      {/* Hotel Amenities Drawer */}
      <HotelAmenitiesDrawer
        isOpen={isHotelAmenitiesDrawerOpen}
        onClose={() => setIsHotelAmenitiesDrawerOpen(false)}
        hotelName={hotelName}
      />
      {/* Hotel Reviews Drawer */}
      <HotelReviewsDrawer
        isOpen={isHotelReviewsDrawerOpen}
        onClose={() => setIsHotelReviewsDrawerOpen(false)}
        hotelName={hotelName}
      />
      {/* Nearby Amenities Drawer */}
      <NearbyAmenitiesDrawer
        isOpen={isNearbyAmenitiesDrawerOpen}
        onClose={() => setIsNearbyAmenitiesDrawerOpen(false)}
        hotelName={hotelName}
        hotelAddress={hotelAddress}
      />
      {/* Local Exploration Drawer */}
      <LocalExplorationDrawer
        isOpen={isLocalExplorationDrawerOpen}
        onClose={() => setIsLocalExplorationDrawerOpen(false)}
        hotelName={hotelName}
        hotelAddress={hotelAddress}
      />

      {/* Share Options Popup */}
      <ShareOptionsPopup
        isOpen={isShareOptionsPopupOpen}
        onClose={() => setIsShareOptionsPopupOpen(false)}
        shareUrl={typeof window !== "undefined" ? window.location.href : "https://v0.dev"}
        shareTitle={`Check out ${hotelName} on V0!`}
      />
    </div>
  )
}

function MoreOptionsDialog({ isOpen, onClose, onOpenNearbyAmenities, onOpenLocalExploration }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Lựa chọn</DialogTitle>
          <DialogDescription>Khám phá xung quanh khách sạn</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            onClick={() => {
              onOpenNearbyAmenities()
              onClose()
            }}
          >
            Tiện ích xung quanh
          </Button>
          <Button
            onClick={() => {
              onOpenLocalExploration()
              onClose()
            }}
          >
            Khám phá địa phương
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
