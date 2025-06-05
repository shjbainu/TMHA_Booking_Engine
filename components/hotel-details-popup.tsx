"use client"

import { X, MapPin, Phone, Mail, Globe, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface HotelDetailsPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function HotelDetailsPopup({ isOpen, onClose }: HotelDetailsPopupProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Popup Content */}
      <div
        className={`relative w-full max-w-md bg-white rounded-t-3xl shadow-lg h-[90vh] flex flex-col transform transition-transform duration-300 ease-out
          ${isOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        {/* Header */}
        <div className="w-full py-6 bg-[#0a0a0a] text-white flex items-center justify-center relative rounded-t-3xl">
          <h1 className="text-center text-xl font-semibold">Khách sạn 69 Boutique</h1>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
          {/* Hotel Image */}
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-md">
            <Image src="/placeholder.svg?height=400&width=600" alt="69 Boutique Hotel" fill className="object-cover" />
          </div>

          {/* About Section */}
          <div>
            <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3">Về chúng tôi</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Chào mừng đến với Khách sạn 69 Boutique, nơi sự sang trọng gặp gỡ sự thoải mái. Tọa lạc tại trung tâm
              thành phố, khách sạn của chúng tôi mang đến trải nghiệm lưu trú độc đáo với thiết kế hiện đại, tiện nghi
              cao cấp và dịch vụ tận tâm. Chúng tôi cam kết mang đến cho quý khách một kỳ nghỉ đáng nhớ, dù là cho công
              việc hay giải trí.
            </p>
          </div>

          {/* Amenities Section */}
          <div>
            <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3">Tiện nghi nổi bật</h2>
            <ul className="grid grid-cols-2 gap-3 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" /> Hồ bơi vô cực
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" /> Trung tâm thể dục
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" /> Nhà hàng cao cấp
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" /> Spa thư giãn
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" /> Wi-Fi miễn phí
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" /> Dịch vụ phòng 24/7
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3">Liên hệ</h2>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-600" /> 123 Đường ABC, Quận XYZ, Thành phố HCM
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-600" /> +84 123 456 789
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-600" /> info@69boutiquehotel.com
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-gray-600" /> www.69boutiquehotel.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
