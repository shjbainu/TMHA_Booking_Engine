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
import ScrollIndicatorTooltip from "@/components/scroll-indicator-tooltip"

export default function HotelPhotosPage() {
  const [isHotelIntroDrawerOpen, setIsHotelIntroDrawerOpen] = useState(false)
  const [isHotelAmenitiesDrawerOpen, setIsHotelAmenitiesDrawerOpen] = useState(false)
  const [isHotelReviewsDrawerOpen, setIsHotelReviewsDrawerOpen] = useState(false)
  const [isNearbyAmenitiesDrawerOpen, setIsNearbyAmenitiesDrawerOpen] = useState(false) // New state
  const [isLocalExplorationDrawerOpen, setIsLocalExplorationDrawerOpen] = useState(false) // New state
  const [isMoreOptionsDialogOpen, setIsMoreOptionsDialogOpen] = useState(false)
  const [isShareOptionsPopupOpen, setIsShareOptionsPopupOpen] = useState(false) // New state for share popup

  const hotelName = "The Mansion Hoi An by Minova"
  const hotelAddress = "The Mansion Hội An"

  const khongGianChungRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>
  const phongSuperiorRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>
  const phongDeluxeRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>
  const phongStudioRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>
  const phongFamilyRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>
  const phongPremiumRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
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
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <h4 className="font-serif-display text-2xl font-bold text-gray-900">The Mansion Hoi An by Minova</h4>
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
            <Image src="fluent_location-24-regular.svg" alt="Biểu tượng bản đồ" width={30} height={30} />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setIsShareOptionsPopupOpen(true)}>
            <Image src="share.svg" alt="Biểu tượng chia sẻ" width={28} height={28} />
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
              {/* Ảnh 1: Không gian chung */}
              <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection(khongGianChungRef)}>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-1 w-40 sm:w-48">
                  <Image
                    src="https://ik.imagekit.io/tvlk/apr-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/10028977-b1f7a5723f17709b2249791615289ca1.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640"
                    alt="Không gian chung"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 160px, 192px"
                  />
                </div>
                <p className="text-sm font-medium text-[#0a0a0a]">Không gian chung</p>
              </div>
              {/* Ảnh 2: Phòng Superior */}
              <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection(phongSuperiorRef)}>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-1 w-40 sm:w-48">
                  <Image
                    src="https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10028977-02950be4c37348f9a0afbcc3617e4e13.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-460,pr-true,q-40,w-724"
                    alt="Phòng Superior Thumbnail"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 160px, 192px"
                  />
                </div>
                <p className="text-sm font-medium text-[#0a0a0a]">Phòng Superior</p>
              </div>
              {/* Ảnh 3: Phòng Deluxe */}
              <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection(phongDeluxeRef)}>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-1 w-40 sm:w-48">
                  <Image
                    src="https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10028977-386606f609ada0b7dca90a7bd25b7144.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-460,pr-true,q-40,w-724"
                    alt="Phòng Deluxe Thumbnail"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 160px, 192px"
                  />
                </div>
                <p className="text-sm font-medium text-[#0a0a0a]">Phòng Deluxe</p>
              </div>
              {/* Ảnh 4: Phòng Studio */}
              <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection(phongStudioRef)}>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-1 w-40 sm:w-48">
                  <Image
                    src="https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10028977-7716795615b9e86fb80dff548ff6d2fd.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-460,pr-true,q-40,w-724"
                    alt="Phòng Studio Thumbnail"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 160px, 192px"
                  />
                </div>
                <p className="text-sm font-medium text-[#0a0a0a]">Phòng Studio</p>
              </div>
              {/* Ảnh 5: Phòng Family */}
              <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection(phongFamilyRef)}>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-1 w-40 sm:w-48">
                  <Image
                    src="https://ik.imagekit.io/tvlk/generic-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/33000000/32400000/32399100/32399033/f6c2c4c4_z.jpg?_src=imagekit&tr=c-at_max,f-jpg,h-460,pr-true,q-40,w-724"
                    alt="Phòng Family Thumbnail"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 160px, 192px"
                  />
                </div>
                <p className="text-sm font-medium text-[#0a0a0a]">Phòng Family</p>
              </div>
              {/* Ảnh 6: Phòng Premium */}
              <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection(phongPremiumRef)}>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-1 w-40 sm:w-48">
                  <Image
                    src="https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10028977-3f12a687acba8a934aeede1427673d83.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-460,pr-true,q-40,w-724"
                    alt="Phòng Premium Thumbnail"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 160px, 192px"
                  />
                </div>
                <p className="text-sm font-medium text-[#0a0a0a]">Phòng Premium</p>
              </div>
            </div>
          </div>
        </div>

        {/* "Không gian chung" Section */}
        <div ref={khongGianChungRef} id="khong-gian-chung" className="px-4 scroll-mt-20">
          <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3">Không gian chung</h2>
          <div className="space-y-3">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="https://ik.imagekit.io/tvlk/apr-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/10028977-07bbfe6825ccbc3348626765a2cc3506.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640"
                alt="Không gian chung - Toàn cảnh resort"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://ik.imagekit.io/tvlk/apr-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/10028977-b1f7a5723f17709b2249791615289ca1.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640"
                  alt="Không gian chung - Bàn Bida"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://ik.imagekit.io/tvlk/apr-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/10028977-b9c752049854b799e8cd7fc09ba267f0.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640"
                  alt="Không gian chung - Spa"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="https://ak-d.tripcdn.com/images/1mc1k12000cpiztl2B975_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F"
                alt="Không gian chung - Hồ bơi"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10028977-745141994f793d1be91fe5bd9dfd9648.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640"
                  alt="Không gian chung - View 1"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10028977-cc1c81c5699beac973ece74df08567b5.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640"
                  alt="Không gian chung - View 2"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
            </div>
          </div>
        </div>
        {/* "Phòng Superior" Section */}
        <div ref={phongSuperiorRef} id="phong-superior" className="px-4 scroll-mt-20">
          <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3 mt-5">Phòng Superior</h2>
          <div className="space-y-3">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="https://ak-d.tripcdn.com/images/1mc5l12000cpiz28359FB_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F"
                alt="Phòng Superior - Ảnh 1"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://ak-d.tripcdn.com/images/1mc6j12000cpiylg8B415_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F"
                  alt="Phòng Superior - Ảnh 2"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10028977-02950be4c37348f9a0afbcc3617e4e13.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-460,pr-true,q-40,w-724"
                  alt="Phòng Superior - Ảnh 3"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="https://ak-d.tripcdn.com/images/1mc3r12000cq82rkqE904_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F"
                alt="Phòng Superior - Ảnh 4"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://ak-d.tripcdn.com/images/0224812000k2ndeik5689_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F"
                  alt="Phòng Superior - Ảnh 5"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://ak-d.tripcdn.com/images/1mc3r12000cq82xpg82C6_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F"
                  alt="Phòng Superior - Ảnh 6"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
            </div>
          </div>
        </div>
        {/* "Phòng Deluxe" Section */}
        <div ref={phongDeluxeRef} id="phong-deluxe" className="px-4 scroll-mt-20">
          <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3 mt-5">Phòng Deluxe</h2>
          <div className="space-y-3">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="https://ak-d.tripcdn.com/images/1mc6i12000cpiyw6h706E_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F"
                alt="Phòng Deluxe - Ảnh 1"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://ak-d.tripcdn.com/images/1mc4w12000cpiy8v4906B_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F"
                  alt="Phòng Deluxe - Ảnh 2"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://ak-d.tripcdn.com/images/1mc3312000cpiywo71BBC_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F"
                  alt="Phòng Deluxe - Ảnh 3"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="https://ak-d.tripcdn.com/images/1mc4h12000cpiz8d4C747_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F"
                alt="Phòng Deluxe - Ảnh 4"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://ak-d.tripcdn.com/images/1mc4v12000cpiyv1aFFFC_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F"
                  alt="Phòng Deluxe - Ảnh 5"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://ak-d.tripcdn.com/images/0224i12000g41jbxh958B_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F"
                  alt="Phòng Deluxe - Ảnh 6"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
            </div>
          </div>
        </div>
        {/* "Phòng Studio" Section */}
        <div ref={phongStudioRef} id="phong-studio" className="px-4 scroll-mt-20">
          <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3 mt-5">Phòng Studio</h2>
          <div className="space-y-3">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="https://ak-d.tripcdn.com/images/1mc6v12000cpj9lysF7FF_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F"
                alt="Phòng Studio - Ảnh 1"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://ak-d.tripcdn.com/images/1mc4k12000cpiyno19DC4_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F"
                  alt="Phòng Studio - Ảnh 2"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://ak-d.tripcdn.com/images/1mc3912000cpiyj0n46B6_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F"
                  alt="Phòng Studio - Ảnh 3"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="https://ak-d.tripcdn.com/images/1mc5o12000cpiyq28CF1A_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F"
                alt="Phòng Studio - Ảnh 4"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://ak-d.tripcdn.com/images/1mc6y12000cq82gzo46C3_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F"
                  alt="Phòng Studio - Ảnh 5"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://ak-d.tripcdn.com/images/1mc4712000cpj9p3sC1BB_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F"
                  alt="Phòng Studio - Ảnh 6"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
            </div>
          </div>
        </div>
        {/* "Phòng Family" Section */}
        <div ref={phongFamilyRef} id="phong-family" className="px-4 scroll-mt-20">
          <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3 mt-5">Phòng Family</h2>
          <div className="space-y-3">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="/00_Final/2.5 Family_4.jpeg"
                alt="Phòng Family - Ảnh 1"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://ak-d.tripcdn.com/images/1mc2412000cpj9t3219A3_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F"
                  alt="Phòng Family - Ảnh 2"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://ak-d.tripcdn.com/images/1mc5t12000cpiyt0bA1D7_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F"
                  alt="Phòng Family - Ảnh 3"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="https://ak-d.tripcdn.com/images/1mc3912000cpiyodcF4C0_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F"
                alt="Phòng Family - Ảnh 4"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://ak-d.tripcdn.com/images/1mc4g12000cpiyq4i3B6C_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F"
                  alt="Phòng Family - Ảnh 5"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://ak-d.tripcdn.com/images/1mc6r12000cpj9lx003E3_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F"
                  alt="Phòng Family - Ảnh 6"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
            </div>
          </div>
        </div>
        {/* "Phòng Premium" Section */}
        <div ref={phongPremiumRef} id="phong-premium" className="px-4 scroll-mt-20">
          <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3 mt-5">Phòng Premium</h2>
          <div className="space-y-3">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src= "/00_Final/1.1 Alex_1.JPG"
                alt="Phòng Premium - Ảnh 1"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://ak-d.tripcdn.com/images/1mc0812000cpiycsq0BEC_R_600_400_R5.webp"
                  alt="Phòng Premium - Ảnh 2"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="/00_Final/1.1 Alex_4.JPG"
                  alt="Phòng Premium - Ảnh 3"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="/00_Final/1.1 Alex_5.JPG"
                alt="Phòng Premium - Ảnh 4"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="/00_Final/1.1 Alex_6.JPG"
                  alt="Phòng Premium - Ảnh 5"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 384px"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="/00_Final/1.1 Alex_7.JPG"
                  alt="Phòng Premium - Ảnh 6"
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
    <div className="flex items-center rounded-full bg-white/30 backdrop-blur-xl shadow-lg border border-gray-200/50 px-5 py-1 gap-x-4 h-12 opacity-95">
      {/* Button Tổng quan */}
      <Button
        variant="ghost"
        className="h-auto flex flex-col items-center justify-center px-2 py-1.5 text-[#0a0a0a] hover:bg-transparent focus:bg-transparent [-webkit-tap-highlight-color:transparent]"
        onClick={() => setIsHotelIntroDrawerOpen(true)}
      >
        <Image src="buildings.svg" alt="Biểu tượng tổng quan" width={24} height={24} />
      </Button>
      {/* Button Tiện ích */}
      <Button
        variant="ghost"
        className="h-auto flex flex-col items-center justify-center px-2 py-1.5 text-[#0a0a0a] hover:bg-transparent focus:bg-transparent [-webkit-tap-highlight-color:transparent]"
        onClick={() => setIsHotelAmenitiesDrawerOpen(true)}
      >
        <Image src="element-1.svg" alt="Biểu tượng tiện ích" width={24} height={24} />
      </Button>
      {/* Button Đánh giá */}
      <Button
        variant="ghost"
        className="h-auto flex flex-col items-center justify-center px-2 py-1.5 text-[#0a0a0a] hover:bg-transparent focus:bg-transparent [-webkit-tap-highlight-color:transparent]"
        onClick={() => setIsHotelReviewsDrawerOpen(true)}
      >
        <Image src="star.svg" alt="Biểu tượng đánh giá" width={24} height={24} />
      </Button>
      {/* Button More with Dropdown */}
      <Button
        variant="ghost"
        className="h-auto flex flex-col items-center justify-center px-2 py-1.5 text-[#0a0a0a] hover:bg-transparent focus:bg-transparent [-webkit-tap-highlight-color:transparent]"
        onClick={() => setIsLocalExplorationDrawerOpen(true)}
      >
        <Image src="menu.svg" alt="Biểu tượng thêm" width={24} height={24} />
      </Button>
    </div>
    <Link href="/rooms" passHref legacyBehavior>
  <a
    className="h-12 w-12 min-w-[48px] min-h-[48px] p-0 rounded-lg bg-orange-400/80 hover:bg-orange-500/90 shadow-md flex items-center justify-center transform hover:scale-105 transition-transform duration-150 opacity-100"
    style={{ lineHeight: "48px" }}
  >
    <img src="room.svg" alt="Room" width="26" height="26" />
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
      />
      {/* Local Exploration Drawer */}
      <LocalExplorationDrawer
        isOpen={isLocalExplorationDrawerOpen}
        onClose={() => setIsLocalExplorationDrawerOpen(false)}
        hotelName={hotelName}
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

type MoreOptionsDialogProps = {
  isOpen: boolean
  onClose: () => void
  onOpenNearbyAmenities: () => void
  onOpenLocalExploration: () => void
}

function MoreOptionsDialog({
  isOpen,
  onClose,
  onOpenNearbyAmenities,
  onOpenLocalExploration,
}: MoreOptionsDialogProps) {
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
