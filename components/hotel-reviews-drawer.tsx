"use client"

import { useState, useEffect, useActionState } from "react"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Loader } from "lucide-react"
import { generateHotelReviews } from "@/app/actions/generate-hotel-reviews"

interface HotelReviewsDrawerProps {
  isOpen: boolean
  onClose: () => void
  hotelName: string
}

export default function HotelReviewsDrawer({ isOpen, onClose, hotelName }: HotelReviewsDrawerProps) {
  const [state, action, isPending] = useActionState(generateHotelReviews, { success: false, content: "" })
  const [hasGenerated, setHasGenerated] = useState(false)

  useEffect(() => {
    if (isOpen && !hasGenerated) {
      action(hotelName)
      setHasGenerated(true)
    } else if (!isOpen) {
      // Reset state when drawer closes
      setHasGenerated(false)
    }
  }, [isOpen, hasGenerated, action, hotelName])

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="h-[90vh] flex flex-col">
        <DrawerHeader className="text-center">
          <DrawerTitle className="text-2xl font-bold text-[#0a0a0a]">Đánh giá về {hotelName}</DrawerTitle>
          <DrawerDescription className="text-sm text-gray-600">
            Tổng hợp ý kiến từ khách hàng của chúng tôi
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto p-4 text-gray-700 leading-relaxed">
          {isPending ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Loader className="h-8 w-8 animate-spin text-gray-700" />
              <p className="mt-2 text-sm">Đang tổng hợp đánh giá...</p>
            </div>
          ) : (
            <p className="whitespace-pre-wrap">{state.content}</p>
          )}
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Đóng</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
