"use client"

import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer" // Thêm DrawerTitle
import { VisuallyHidden } from "@radix-ui/react-visually-hidden" // Thêm nếu muốn ẩn tiêu đề
import Image from "next/image"

interface ImageGalleryModalProps {
  isOpen: boolean
  onClose: () => void
  images: string[]
}

export default function ImageGalleryModal({ isOpen, onClose, images }: ImageGalleryModalProps) {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[90vh] flex flex-col p-4">
        {/* Thêm tiêu đề cho accessibility */}
        <DrawerTitle>
          <VisuallyHidden>Bộ sưu tập hình ảnh</VisuallyHidden>
        </DrawerTitle>
        <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative w-full h-[200px] rounded-lg overflow-hidden">
              <Image
                src={image || "/placeholder.svg"}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  )
}