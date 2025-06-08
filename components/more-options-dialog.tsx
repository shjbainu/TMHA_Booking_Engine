"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface MoreOptionsDialogProps {
  isOpen: boolean
  onClose: () => void
  onOpenNearbyAmenities: () => void
  onOpenLocalExploration: () => void
}

export default function MoreOptionsDialog({
  isOpen,
  onClose,
  onOpenNearbyAmenities,
  onOpenLocalExploration,
}: MoreOptionsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[320px] p-0 rounded-lg shadow-lg overflow-hidden">
        <DialogHeader className="p-4 border-b border-gray-200 relative">
          <DialogTitle className="text-lg font-medium text-[#0a0a0a] text-center">Thêm lựa chọn</DialogTitle>
          <Button variant="ghost" size="icon" className="absolute top-3 right-3 h-8 w-8" onClick={onClose}>
            <X className="h-5 w-5 text-gray-500" />
          </Button>
        </DialogHeader>
        <div className="p-4 flex flex-col gap-3">
          <Button
            variant="outline"
            className="w-full justify-start text-base font-medium text-[#0a0a0a] h-12"
            onClick={() => {
              onClose()
              onOpenNearbyAmenities()
            }}
          >
            Tiện ích xung quanh
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-base font-medium text-[#0a0a0a] h-12"
            onClick={() => {
              onClose()
              onOpenLocalExploration()
            }}
          >
            Khám phá địa phương
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
