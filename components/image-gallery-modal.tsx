"use client"

import { Drawer, DrawerContent } from "@/components/ui/drawer" // Changed from Dialog
import Image from "next/image"

interface ImageGalleryModalProps {
  isOpen: boolean
  onClose: () => void
  images: string[]
}

export default function ImageGalleryModal({ isOpen, onClose, images }: ImageGalleryModalProps) {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      {" "}
      {/* Changed from Dialog */}
      <DrawerContent className="h-[90vh] flex flex-col p-4">
        {" "}
        {/* Changed from DialogContent, added height and flex */}
        {/* No header or close button */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {" "}
          {/* Scrollable container for images */}
          {images.map((image, index) => (
            <div key={index} className="relative w-full h-[200px] rounded-lg overflow-hidden">
              {" "}
              {/* Fixed height for grid items */}
              <Image
                src={image || "/placeholder.svg"}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover" // Use object-cover for grid display
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
