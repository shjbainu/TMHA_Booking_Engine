"use client"

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface ImageGalleryModalProps {
  isOpen: boolean
  onClose: () => void
  images: string[]
}

export default function ImageGalleryModal({ isOpen, onClose, images }: ImageGalleryModalProps) {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[80vh] flex flex-col">
        <DrawerHeader className="flex justify-between items-center">
          <DrawerTitle>Xem ảnh phòng</DrawerTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </DrawerHeader>
        <div className="flex-1 overflow-hidden p-4">
          {images.length > 0 ? (
            <Carousel className="w-full h-full">
              <CarouselContent className="h-full">
                {images.map((src, index) => (
                  <CarouselItem key={index} className="h-full flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <Image
                        src={src || "/placeholder.svg"}
                        alt={`Room image ${index + 1}`}
                        fill
                        className="object-contain rounded-lg"
                        sizes="(max-width: 768px) 100vw, 700px"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
            </Carousel>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">Không có ảnh nào để hiển thị.</div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
