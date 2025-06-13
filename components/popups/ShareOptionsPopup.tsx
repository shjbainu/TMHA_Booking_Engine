"use client"

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { X } from "lucide-react"
import { useMemo } from "react"

interface ShareOptionsPopupProps {
  isOpen: boolean
  onClose: () => void
  shareUrl: string
  shareTitle: string
}

export default function ShareOptionsPopup({ isOpen, onClose, shareUrl, shareTitle }: ShareOptionsPopupProps) {
  const encodedShareUrl = useMemo(() => encodeURIComponent(shareUrl), [shareUrl])
  const encodedShareTitle = useMemo(() => encodeURIComponent(shareTitle), [shareTitle])

  const shareOptions = [
    {
      name: "Facebook",
      icon: "/images/facebook-icon.png",
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`, "_blank"),
    },
    {
      name: "Messenger",
      icon: "/images/messenger-icon.png",
      action: () => window.open(`https://m.me/?link=${encodedShareUrl}`, "_blank"),
    },
    {
      name: "Zalo",
      icon: "/images/zalo-icon.jpg",
      action: () => window.open(`https://chat.zalo.me/?url=${encodedShareUrl}&text=${encodedShareTitle}`, "_blank"),
    },
    {
      name: "WhatsApp",
      icon: "/images/whatsapp-icon.jpg",
      action: () =>
        window.open(`https://api.whatsapp.com/send?text=${encodedShareTitle}%20${encodedShareUrl}`, "_blank"),
    },
  ]

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="h-auto max-h-[80vh] flex flex-col rounded-t-3xl bg-white">
        <DrawerHeader className="p-4 border-b border-gray-200 relative text-center">
          <DrawerTitle className="text-center font-medium text-[#0a0a0a]">Chia sẻ</DrawerTitle>
         
        </DrawerHeader>
        <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 overflow-y-auto">
          {shareOptions.map((option) => (
            <Button
              key={option.name}
              variant="ghost"
              className="flex flex-col items-center justify-center gap-2 h-auto py-4 px-2 text-sm font-medium text-[#0a0a0a] hover:bg-gray-100"
              onClick={option.action}
            >
              <div className="relative w-12 h-12">
                <Image src={option.icon || "/placeholder.svg"} alt={option.name} fill className="object-contain" />
              </div>
              <span>{option.name}</span>
            </Button>
          ))}
        </div>
        <DrawerDescription className="p-4 text-center text-xs text-gray-500 border-t border-gray-100">
          Chia sẻ liên kết này với bạn bè và gia đình.
        </DrawerDescription>
      </DrawerContent>
    </Drawer>
  )
}
