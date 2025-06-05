"use client"

import { Share, Heart, MapPin, Building, Star, MoreHorizontal, ArrowLeft, LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button" // Đảm bảo bạn đã import Button từ đúng vị trí
import Image from "next/image"
import Link from "next/link"

export default function HotelGallery() {
  // THAY THẾ CÁC URL NÀY BẰNG ĐƯỜNG DẪN ẢNH THỰC TẾ CỦA BẠN
  const images = {
    ensoSign: "https://i.imgur.com/cMCBitN.jpeg",      // Ảnh biển hiệu "ENSO RETREAT HOI AN"
    deluxeRoom: "https://i.imgur.com/Xg5y40L.jpeg",    // Ảnh "Phòng Deluxe"
    aerialView: "https://i.imgur.com/VvR3qfJ.jpeg",    // Ảnh toàn cảnh resort từ trên cao
    billiards: "https://i.imgur.com/9e7G3jP.jpeg",     // Ảnh bàn bida
    spa: "https://i.imgur.com/k04t5yh.jpeg",           // Ảnh khu spa
    poolMain: "https://i.imgur.com/P0mER20.jpeg",      // Ảnh hồ bơi chính
    smallView1: "https://i.imgur.com/S33sHiR.jpeg",    // Ảnh nhỏ 1 ở cuối phần "Không gian chung"
    smallView2: "https://i.imgur.com/24Qf0Zz.jpeg",    // Ảnh nhỏ 2 ở cuối phần "Không gian chung"
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

      {/* Main Content Area */}
      <div className="pb-24"> {/* Padding dưới để không bị che bởi thanh điều hướng cố định */}
        
        {/* "Tham quan qua ảnh" Section */}
        <h1  className="text-lg font-semibold text-[#0a0a0a] mt-4 mb-3 px-4">Tham quan qua ảnh</h1>
        <div className="mb-6">
          <div className="overflow-x-auto">
            <div className="flex gap-3 pb-2 px-4"> {/* px-4 để có padding ở hai đầu scroll */}
              {/* Ảnh 1: Resort */}
              <div className="flex-shrink-0">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-1 w-40 sm:w-48">
                  <Image
                    src={images.ensoSign}
                    alt="Resort - Enso Retreat Hoi An"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 160px, 192px"
                  />
                </div>
                <p className="text-sm font-medium text-[#0a0a0a]">Resort</p>
              </div>
              {/* Ảnh 2: Phòng Deluxe */}
              <div className="flex-shrink-0">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-1 w-40 sm:w-48">
                  <Image
                    src={images.deluxeRoom}
                    alt="Phòng Deluxe"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 160px, 192px"
                  />
                </div>
                <p className="text-sm font-medium text-[#0a0a0a]">Phòng Deluxe</p>
              </div>
              {/* Bạn có thể thêm các ảnh khác vào đây nếu cần */}
            </div>
          </div>
        </div>

        {/* "Không gian chung" Section */}
        <div className="px-4"> {/* Padding ngang cho toàn bộ section */}
            <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3">Không gian chung</h2>
            <div className="space-y-3"> {/* Khoảng cách giữa các hàng ảnh */}
                {/* Ảnh 1: Lớn, ngang (Toàn cảnh) */}
                <div className="relative aspect-video rounded-lg overflow-hidden"> {/* aspect-video cho tỉ lệ 16:9 */}
                    <Image
                    src="https://pix8.agoda.net/hotelImages/48898017/-1/d138856dca2d16e1a7f6928e2dd65fc9.jpg?ce=0&s=1024x"
                    alt="Không gian chung - Toàn cảnh resort"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px" // Ví dụ sizes, điều chỉnh nếu cần
                    />
                </div>

                {/* Lưới 2 ảnh nhỏ (Bàn Bida, Spa) */}
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

                {/* Ảnh 3: Lớn, ngang (Hồ bơi) */}
                <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                    src={images.poolMain}
                    alt="Không gian chung - Hồ bơi"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px"
                    />
                </div>

                {/* Lưới 2 ảnh nhỏ khác */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                        src={images.smallView1}
                        alt="Không gian chung - View 1"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 384px"
                    />
                    </div>
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                        src={images.smallView2}
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
        <div className="px-4"> {/* Padding ngang cho toàn bộ section */}
            <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3 mt-5">Phòng Sơn Ca</h2>
            <div className="space-y-3"> {/* Khoảng cách giữa các hàng ảnh */}
                {/* Ảnh 1: Lớn, ngang (Toàn cảnh) */}
                <div className="relative aspect-video rounded-lg overflow-hidden"> {/* aspect-video cho tỉ lệ 16:9 */}
                    <Image
                    src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484553_66ab07495d890.webp"
                    alt="Không gian chung - Toàn cảnh resort"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px" // Ví dụ sizes, điều chỉnh nếu cần
                    />
                </div>

                {/* Lưới 2 ảnh nhỏ (Bàn Bida, Spa) */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                        src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484553_66ab07496a2ee.webp"
                        alt="Không gian chung - Bàn Bida"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 384px"
                    />
                    </div>
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                        src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484553_66ab07496c812.webp"
                        alt="Không gian chung - Spa"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 384px"
                    />
                    </div>
                </div>

                {/* Ảnh 3: Lớn, ngang (Hồ bơi) */}
                <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                    src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484553_66ab07496dcbb.webp"
                    alt="Không gian chung - Hồ bơi"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px"
                    />
                </div>

                {/* Lưới 2 ảnh nhỏ khác */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                        src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484553_66ab07496b5c0.webp"
                        alt="Không gian chung - View 1"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 384px"
                    />
                    </div>
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                        src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484553_66ab07495d890.webp"
                        alt="Không gian chung - View 2"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 384px"
                    />
                    </div>
                </div>
            </div>
        </div>
          {/* "Phòng Nhật bản" Section */}
        <div className="px-4"> {/* Padding ngang cho toàn bộ section */}
            <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3 mt-5">Phòng Nhật Bản</h2>
            <div className="space-y-3"> {/* Khoảng cách giữa các hàng ảnh */}
                {/* Ảnh 1: Lớn, ngang (Toàn cảnh) */}
                <div className="relative aspect-video rounded-lg overflow-hidden"> {/* aspect-video cho tỉ lệ 16:9 */}
                    <Image
                    src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484654_66ab07ae89e19.webp"
                    alt="Không gian chung - Toàn cảnh resort"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px" // Ví dụ sizes, điều chỉnh nếu cần
                    />
                </div>

                {/* Lưới 2 ảnh nhỏ (Bàn Bida, Spa) */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                        src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484654_66ab07ae96b97.webp"
                        alt="Không gian chung - Bàn Bida"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 384px"
                    />
                    </div>
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                        src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484654_66ab07ae97e57.webp"
                        alt="Không gian chung - Spa"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 384px"
                    />
                    </div>
                </div>

                {/* Ảnh 3: Lớn, ngang (Hồ bơi) */}
                <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                    src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484654_66ab07ae991b4.webp"
                    alt="Không gian chung - Hồ bơi"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px"
                    />
                </div>

                {/* Lưới 2 ảnh nhỏ khác */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                        src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484654_66ab07ae9a798.webp"
                        alt="Không gian chung - View 1"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 384px"
                    />
                    </div>
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                        src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484654_66ab07ae9d737.webp"
                        alt="Không gian chung - View 2"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 384px"
                    />
                    </div>
                </div>
            </div>
        </div>
          {/* "Phòng Mập Mờ" Section */}
        <div className="px-4"> {/* Padding ngang cho toàn bộ section */}
            <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3 mt-5">Phòng Mập Mờ</h2>
            <div className="space-y-3"> {/* Khoảng cách giữa các hàng ảnh */}
                {/* Ảnh 1: Lớn, ngang (Toàn cảnh) */}
                <div className="relative aspect-video rounded-lg overflow-hidden"> {/* aspect-video cho tỉ lệ 16:9 */}
                    <Image
                    src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484766_66ab081e6bcc1.webp"
                    alt="Không gian chung - Toàn cảnh resort"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px" // Ví dụ sizes, điều chỉnh nếu cần
                    />
                </div>

                {/* Lưới 2 ảnh nhỏ (Bàn Bida, Spa) */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                        src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484766_66ab081e7b30f.webp"
                        alt="Không gian chung - Bàn Bida"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 384px"
                    />
                    </div>
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                        src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484766_66ab081e78b7b.webp"
                        alt="Không gian chung - Spa"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 384px"
                    />
                    </div>
                </div>

                {/* Ảnh 3: Lớn, ngang (Hồ bơi) */}
                <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                    src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484766_66ab081e79ed3.webp"
                    alt="Không gian chung - Hồ bơi"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px"
                    />
                </div>

                {/* Lưới 2 ảnh nhỏ khác */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                        src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484766_66ab081e77699.webp"
                        alt="Không gian chung - View 1"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 384px"
                    />
                    </div>
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                        src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484766_66ab081e7e4b0.webp"
                        alt="Không gian chung - View 2"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 384px"
                    />
                    </div>
                </div>
            </div>
        </div>
          {/* "Phòng Sanroniti" Section */}
        <div className="px-4"> {/* Padding ngang cho toàn bộ section */}
            <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3 mt-5">Phòng Santorini</h2>
            <div className="space-y-3"> {/* Khoảng cách giữa các hàng ảnh */}
                {/* Ảnh 1: Lớn, ngang (Toàn cảnh) */}
                <div className="relative aspect-video rounded-lg overflow-hidden"> {/* aspect-video cho tỉ lệ 16:9 */}
                    <Image
                    src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484894_66ab089e3f2d2.webp"
                    alt="Không gian chung - Toàn cảnh resort"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px" // Ví dụ sizes, điều chỉnh nếu cần
                    />
                </div>

                {/* Lưới 2 ảnh nhỏ (Bàn Bida, Spa) */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                        src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484894_66ab089e4a8ed.webp"
                        alt="Không gian chung - Bàn Bida"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 384px"
                    />
                    </div>
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                        src="https://s3.go2joy.vn/1000w/hotel/543/9167_1713150149_661c98c5d55b2.jpg"
                        alt="Không gian chung - Spa"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 384px"
                    />
                    </div>
                </div>

                {/* Ảnh 3: Lớn, ngang (Hồ bơi) */}
                <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                    src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484894_66ab089e4d43b.webp"
                    alt="Không gian chung - Hồ bơi"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px"
                    />
                </div>

                {/* Lưới 2 ảnh nhỏ khác */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                        src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484894_66ab089e4f0ca.webp"
                        alt="Không gian chung - View 1"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 384px"
                    />
                    </div>
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                        src="https://s3.go2joy.vn/1000w/hotel/543/9167_1713150150_661c98c61561a.jpg"
                        alt="Không gian chung - View 2"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 384px"
                    />
                    </div>
                </div>
            </div>
        </div>
        {/*
          Các section phòng ("Phòng Sơn Ca", "Phòng Nhật Bản", v.v.) từ code gốc đã được comment lại
          để giao diện khớp với ảnh tham chiếu. Nếu bạn muốn giữ chúng, hãy bỏ comment và đặt vào đây.
          Ví dụ:
          <div className="mt-6 px-4">
            <div className="mb-6">
              <h2 className="text-lg font-medium text-[#0a0a0a] mb-4">Phòng Sơn Ca</h2>
              <div className="columns-2 gap-3 space-y-3">
                { // Code lưới ảnh cho Phòng Sơn Ca }
              </div>
            </div>
            { // Các section phòng khác }
          </div>
        */}

      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-white z-20 border-t border-gray-200">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-around px-1 py-1.5"> {/* Giảm py một chút */}
            <Button variant="ghost" className="h-auto flex flex-col items-center justify-center px-2 py-1.5 text-[#0a0a0a] hover:bg-gray-100 focus:bg-gray-100">
              <Building className="h-5 w-5 mb-0.5" />
              <span className="text-[11px] leading-tight font-medium">Khách sạn</span>
            </Button>
            <Button variant="ghost" className="h-auto flex flex-col items-center justify-center px-2 py-1.5 text-[#0a0a0a] hover:bg-gray-100 focus:bg-gray-100">
              <LayoutGrid className="h-5 w-5 mb-0.5" /> {/* Icon lưới cho Ảnh */}
              <span className="text-[11px] leading-tight font-medium">Ảnh</span>
            </Button>
            <Button variant="ghost" className="h-auto flex flex-col items-center justify-center px-2 py-1.5 text-[#0a0a0a] hover:bg-gray-100 focus:bg-gray-100">
              <Star className="h-5 w-5 mb-0.5" />
              <span className="text-[11px] leading-tight font-medium">Đánh giá</span>
            </Button>
            <Button variant="ghost" className="h-auto flex flex-col items-center justify-center px-2 py-1.5 text-[#0a0a0a] hover:bg-gray-100 focus:bg-gray-100">
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
                    <rect x="4" y="3" width="12" height="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    <circle cx="13" cy="12" r="1" fill="currentColor" />
                    <path d="M6 8H14M6 16H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M18 9L21 12L18 15M21 12H16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
