"use client"

import { ArrowLeft, Share, Heart, MapPin, Grid3X3, QrCode, Star, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function HotelGallery() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white">
        <Button variant="ghost" size="icon" className="h-10 w-10">
          <ArrowLeft className="h-6 w-6 text-[#0a0a0a]" />
        </Button>
        <h1 className="text-lg font-medium text-[#0a0a0a]">Tham quan qua ảnh</h1>
        <div className="flex items-center gap-2">
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

      {/* Photo Gallery */}
      <div className="px-4 pb-6">
        {/* Hotel Front and Room Section */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-2">
              <Image src="/placeholder.svg?height=200&width=300" alt="Hotel exterior" fill className="object-cover" />
            </div>
            <p className="text-sm font-medium text-[#0a0a0a]">Mặt tiền khách sạn</p>
          </div>
          <div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-2">
              <Image src="/placeholder.svg?height=200&width=300" alt="Hotel room" fill className="object-cover" />
            </div>
            <p className="text-sm font-medium text-[#0a0a0a]">Phòng Sơn ca</p>
          </div>
        </div>

        {/* Common Areas Section */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-[#0a0a0a] mb-4">Không gian chung</h2>

          {/* Large Cinema Image */}
          <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-3">
            <Image src="/placeholder.svg?height=250&width=400" alt="Cinema area" fill className="object-cover" />
          </div>

          {/* Grid of smaller images */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=150&width=200"
                alt="Hotel exterior day"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=150&width=200"
                alt="Hotel exterior night"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Bottom large image */}
          <div className="relative aspect-[16/10] rounded-lg overflow-hidden">
            <Image src="/placeholder.svg?height=250&width=400" alt="Hotel lobby" fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
        <div className="flex items-center justify-between px-6 py-3">
          <Button variant="ghost" size="icon" className="h-12 w-12">
            <Grid3X3 className="h-6 w-6 text-[#0a0a0a]" />
          </Button>
          <Button variant="ghost" size="icon" className="h-12 w-12">
            <QrCode className="h-6 w-6 text-[#0a0a0a]" />
          </Button>
          <Button variant="ghost" size="icon" className="h-12 w-12">
            <Star className="h-6 w-6 text-[#0a0a0a]" />
          </Button>
          <Button variant="ghost" size="icon" className="h-12 w-12">
            <MoreHorizontal className="h-6 w-6 text-[#0a0a0a]" />
          </Button>
        </div>

        {/* Floating Action Button */}
        <div className="absolute bottom-4 right-4">
          <Button className="h-14 w-14 rounded-2xl bg-orange-400 hover:bg-orange-500 shadow-lg">
            <div className="h-6 w-6 bg-[#0a0a0a] rounded-sm"></div>
          </Button>
        </div>
      </div>

      {/* Bottom padding to account for fixed navigation */}
      <div className="h-20"></div>
    </div>
  )
}
