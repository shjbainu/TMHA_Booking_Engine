"use client"

import { useRef, useState } from "react"
import { MoreHorizontal, ArrowLeft, LayoutGrid, X, ExternalLink } from "lucide-react" // Thêm icon ExternalLink
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

  // --- State để quản lý việc mở/đóng các popup ---
  const [isGalleryPopupOpen, setIsGalleryPopupOpen] = useState(false)
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false) // State mới cho popup thông tin

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
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-10 w-10"
            onClick={() => setIsGalleryPopupOpen(true)}
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
        {/* --- Section "Tham quan qua ảnh" --- */}
        <h1 className="text-lg font-semibold text-[#0a0a0a] mt-4 mb-3 px-4">Tham quan qua ảnh</h1>
        <div className="mb-6">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 pb-2 px-4">
              <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection(khongGianChungRef)}><div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-1 w-40 sm:w-48"><Image src="https://pix8.agoda.net/hotelImages/48898017/-1/9ccca4c717fa39e5a00ec72b8c732c66.jpg?ce=0&s=1024x" alt="Resort - Enso Retreat Hoi An" fill className="object-cover" sizes="(max-width: 640px) 160px, 192px" /></div><p className="text-sm font-medium text-[#0a0a0a]">Không gian chung</p></div>
              <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection(phongSonCaRef)}><div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-1 w-40 sm:w-48"><Image src="https://s3.go2joy.vn/1000w/hotel/543/1228_1724233053_66c5b55d89d68.JPG" alt="Phòng Sơn Ca Thumbnail" fill className="object-cover" sizes="(max-width: 640px) 160px, 192px" /></div><p className="text-sm font-medium text-[#0a0a0a]">Phòng Sơn Ca</p></div>
              <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection(phongNhatBanRef)}><div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-1 w-40 sm:w-48"><Image src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484654_66ab07ae9a798.webp" alt="Phòng Nhật Bản Thumbnail" fill className="object-cover" sizes="(max-width: 640px) 160px, 192px" /></div><p className="text-sm font-medium text-[#0a0a0a]">Phòng Nhật Bản</p></div>
              <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection(phongMapMoRef)}><div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-1 w-40 sm:w-48"><Image src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484766_66ab081e77699.webp" alt="Phòng Mập Mờ Thumbnail" fill className="object-cover" sizes="(max-width: 640px) 160px, 192px" /></div><p className="text-sm font-medium text-[#0a0a0a]">Phòng Mập Mờ</p></div>
              <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection(phongSantoriniRef)}><div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-1 w-40 sm:w-48"><Image src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484894_66ab089e3f2d2.webp" alt="Phòng Santorini Thumbnail" fill className="object-cover" sizes="(max-width: 640px) 160px, 192px" /></div><p className="text-sm font-medium text-[#0a0a0a]">Phòng Santorini</p></div>
            </div>
          </div>
        </div>

        {/* --- Các section ảnh --- */}
        <div ref={khongGianChungRef} id="khong-gian-chung" className="px-4 scroll-mt-20"> {/*...*/} </div>
        <div ref={phongSonCaRef} id="phong-son-ca" className="px-4 scroll-mt-20 mt-6">{/*...*/}</div>
        {/* ... các section còn lại ... */}
      </div>

      {/* ==================== BOTTOM NAVIGATION ==================== */}
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
            
            {/* ... các button khác trong bottom nav ... */}

          </div>
        </div>
      </div>
      
      {/* ==================== POPUP THƯ VIỆN ẢNH ==================== */}
      {isGalleryPopupOpen && (
        // ... (code popup thư viện ảnh giữ nguyên) ...
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setIsGalleryPopupOpen(false)}>
           {/* ... */}
        </div>
      )}

      {/* ==================== POPUP THÔNG TIN KHÁCH SẠN ==================== */}
      {isInfoPopupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
          onClick={() => setIsInfoPopupOpen(false)}
        >
          {/* Khung nội dung của popup */}
          <div
            className="relative w-full max-w-md bg-white rounded-t-2xl h-[90vh] flex flex-col shadow-lg transition-transform duration-300 ease-out transform translate-y-0"
            onClick={handleContentClick}
          >
            {/* Header của Popup */}
            <div className="flex-shrink-0 pt-4 px-4 pb-2 text-center relative">
              {/* Thanh "handle" */}
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
