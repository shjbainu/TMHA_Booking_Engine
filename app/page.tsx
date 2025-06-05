"use client"

import { useRef } from "react"
import { ArrowLeft, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { OverviewContent } from "@/components/overview-content"

export default function HotelPhotosPage() {
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
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white sticky top-0 z-10 border-b border-gray-200">
        <Button variant="ghost" size="icon" className="h-10 w-10">
          <ArrowLeft className="h-6 w-6 text-[#0a0a0a]" />
        </Button>
        <div className="flex items-center">
          <a
            href="https://www.google.com/maps/search/69+Boutique+by+Minova"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 w-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Image
              src="data:image/jpeg;base64,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"
              alt="Hotel Icon"
              width={30}
              height={30}
              className="mb-0.5"
            />
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

      {/* Bottom Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="h-auto flex flex-col items-center justify-center px-2 py-1.5 text-[#0a0a0a] hover:bg-gray-100 focus:bg-gray-100"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FCCsACmb9nKp4o9VOhVbb646m5g9OL.png"
              alt="Hotel Icon"
              width={40}
              height={40}
              className="mb-0.5"
            />
            <span className="text-[11px] leading-tight font-medium">Tổng quan</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl p-0">
          <OverviewContent />
        </SheetContent>
      </Sheet>
    </div>
  )
}
