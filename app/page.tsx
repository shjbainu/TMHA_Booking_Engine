"use client"

import { useRef } from "react" // 1. Import useRef
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

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
            <Image src="/images/hotel_8375675.png" alt="Hotel Icon" width={35} height={35} className="mb-0.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Image src="/images/hotel_8375675.png" alt="Hotel Icon" width={35} height={35} className="mb-0.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Image src="/images/hotel_8375675.png" alt="Hotel Icon" width={35} height={35} className="mb-0.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
