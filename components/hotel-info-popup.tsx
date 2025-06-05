"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Star, Wifi, Car, Coffee, Utensils, Dumbbell, Waves } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface HotelInfoPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function HotelInfoPopup({ isOpen, onClose }: HotelInfoPopupProps) {
  const [startY, setStartY] = useState(0)
  const [currentY, setCurrentY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY)
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const deltaY = e.touches[0].clientY - startY
    if (deltaY > 0) {
      setCurrentY(deltaY)
    }
  }

  const handleTouchEnd = () => {
    if (currentY > 100) {
      onClose()
    }
    setCurrentY(0)
    setIsDragging(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Popup Content */}
      <div
        className={`relative w-full max-w-md bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{
          height: "90vh",
          transform: `translateY(${currentY}px)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Drag Handle */}
        <div className="w-full py-3 flex justify-center">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pb-4">
          <h1 className="text-2xl font-bold text-[#0a0a0a]">69 Boutique</h1>
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {/* Hotel Image */}
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 shadow-lg">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6nyvh45VHF0NJirvp1ZjX0KWyinsyA.png"
              alt="69 Boutique Hotel"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>

          {/* Hotel Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-gray-600">(4.8/5 - 1,234 đánh giá)</span>
          </div>

          {/* Address */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#0a0a0a] mb-2">Địa chỉ</h3>
            <p className="text-gray-700">69 Ng 53, Nguyễn Ngọc Vũ, Trung Hòa Cầu Giấy, Hà Nội</p>
          </div>

          {/* Hotel Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#0a0a0a] mb-3">Mô tả khách sạn</h3>
            <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
              <p>
                <strong>69 Boutique by Minova</strong> tọa lạc tại số 69 Ngõ 53 Nguyễn Ngọc Vũ, quận Cầu Giấy, Hà Nội -
                vị trí trung tâm thành phố. Khách sạn có thiết kế hiện đại, sang trọng với 15 phòng nghỉ được thiết kế
                theo nhiều phong cách từ tối giản hiện đại đến sang trọng âm cung, đầy đủ tiện nghi hiện đại như điều
                hòa, tivi màn hình phẳng, Wi-Fi tốc độ cao. Một số phòng cao cấp còn có bồn tắm jacuzzi riêng, phù hợp
                cho các cặp đôi nghỉ ngơi, thư giãn.
              </p>
              <p>
                <strong>Giá phòng:</strong> từ 200.000 - 1.500.000 VNĐ/đêm, phù hợp với nhiều nhu cầu từ nghỉ ngắn đến
                lưu trú dài ngày. Tư khách sạn, du khách dễ dàng di chuyển đến các điểm du lịch nổi tiếng như Hồ Tây, Hồ
                Hoàn Kiếm, Lăng Bác, Văn Miếu chỉ trong 10-25 phút lái xe.
              </p>
              <p>
                <strong>Dịch vụ tại khách sạn:</strong> bao gồm lễ tân 24/7, cho thuê xe, đưa đón sân bay, giặt ủi,
                thang máy tiện lợi. Nhân viên thân thiện, chuyên nghiệp, giao tiếp được bằng tiếng Việt, Anh và Nhật.
                Khách sạn được đánh giá cao trên Booking.com, MoMo, Trip.com nhờ không gian sạch sẽ, yên tĩnh và dịch vụ
                chu đáo. Đặt phòng dễ dàng với nhiều ưu đãi.
              </p>
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#0a0a0a] mb-3">Tiện ích</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Wifi className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">WiFi miễn phí</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Car className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">Bãi đỗ xe</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Coffee className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">Quầy bar</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Utensils className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">Nhà hàng</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Dumbbell className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">Phòng gym</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Waves className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">Spa & Massage</span>
              </div>
            </div>
          </div>

          {/* Policies */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#0a0a0a] mb-3">Chính sách khách sạn</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium">Giờ nhận phòng:</span>
                <span>14:00</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium">Giờ trả phòng:</span>
                <span>12:00</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium">Hủy miễn phí:</span>
                <span>Trước 24h</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium">Cho phép hút thuốc:</span>
                <span>Không</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium">Cho phép thú cưng:</span>
                <span>Không</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-[#0a0a0a] mb-3">Thông tin liên hệ</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-medium">Điện thoại:</span> +84 24 3123 4567
              </p>
              <p>
                <span className="font-medium">Email:</span> info@69boutique.com
              </p>
              <p>
                <span className="font-medium">Website:</span> www.69boutique.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
