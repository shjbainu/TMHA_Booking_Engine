"use client"

import { X, Wifi, Car, Coffee, Utensils, Dumbbell, Waves, Shield, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HotelDetailsPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function HotelDetailsPopup({ isOpen, onClose }: HotelDetailsPopupProps) {
  if (!isOpen) return null

  const amenities = [
    { icon: Wifi, name: "WiFi miễn phí", description: "Tốc độ cao trong toàn bộ khách sạn" },
    { icon: Car, name: "Bãi đỗ xe", description: "Miễn phí cho khách lưu trú" },
    { icon: Coffee, name: "Quầy bar", description: "Phục vụ 24/7" },
    { icon: Utensils, name: "Nhà hàng", description: "Ẩm thực Việt Nam và quốc tế" },
    { icon: Dumbbell, name: "Phòng gym", description: "Trang thiết bị hiện đại" },
    { icon: Waves, name: "Hồ bơi", description: "Hồ bơi ngoài trời trên sân thượng" },
    { icon: Shield, name: "An ninh 24/7", description: "Camera giám sát và bảo vệ" },
    { icon: Phone, name: "Lễ tân 24/7", description: "Hỗ trợ khách hàng mọi lúc" },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Popup Content */}
      <div
        className={`relative w-full max-w-md bg-white rounded-t-3xl shadow-lg h-[90vh] flex flex-col transform transition-transform duration-300 ease-out
          ${isOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        {/* Handle bar */}
        <div className="pt-3">
          <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-2"></div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#0a0a0a]">Khách sạn 69 Boutique</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-10 w-10">
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Hotel Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#0a0a0a] mb-3">Về khách sạn</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Khách sạn 69 Boutique tọa lạc tại trung tâm phố cổ Hà Nội, mang đến trải nghiệm lưu trú độc đáo với thiết
              kế hiện đại kết hợp nét truyền thống Việt Nam. Với vị trí thuận lợi, quý khách có thể dễ dàng khám phá các
              điểm du lịch nổi tiếng của thủ đô.
            </p>
          </div>

          {/* Location */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#0a0a0a] mb-3">Vị trí</h3>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">123 Phố Cổ, Hoàn Kiếm, Hà Nội</p>
                <p className="text-xs text-gray-500 mt-1">
                  • 2 phút đi bộ đến Hồ Hoàn Kiếm
                  <br />• 5 phút đi bộ đến Chợ Đồng Xuân
                  <br />• 15 phút lái xe đến sân bay Nội Bài
                </p>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#0a0a0a] mb-4">Tiện ích</h3>
            <div className="space-y-4">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <amenity.icon className="h-5 w-5 text-[#0a0a0a] mt-0.5" />
                  <div>
                    <h4 className="font-medium text-[#0a0a0a] text-sm">{amenity.name}</h4>
                    <p className="text-xs text-gray-600 mt-1">{amenity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Policies */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#0a0a0a] mb-3">Chính sách</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Giờ nhận phòng:</span>
                <span className="font-medium">14:00</span>
              </div>
              <div className="flex justify-between">
                <span>Giờ trả phòng:</span>
                <span className="font-medium">12:00</span>
              </div>
              <div className="flex justify-between">
                <span>Hủy miễn phí:</span>
                <span className="font-medium">Trước 18:00 ngày nhận phòng</span>
              </div>
              <div className="flex justify-between">
                <span>Cho phép hút thuốc:</span>
                <span className="font-medium">Không</span>
              </div>
              <div className="flex justify-between">
                <span>Cho phép thú cưng:</span>
                <span className="font-medium">Không</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <Button onClick={onClose} className="w-full bg-[#0a0a0a] hover:bg-[#000000] text-white py-3 rounded-lg">
            Đóng
          </Button>
        </div>
      </div>
    </div>
  )
}
