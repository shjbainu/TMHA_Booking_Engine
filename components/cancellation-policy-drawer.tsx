"use client"

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CancellationPolicyDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CancellationPolicyDrawer({ isOpen, onClose }: CancellationPolicyDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[90vh] flex flex-col">
        <DrawerHeader className="text-center">
          <DrawerTitle className="text-lg font-medium text-[#0a0a0a]">Chính sách hủy phòng</DrawerTitle>
        </DrawerHeader>
        <ScrollArea className="flex-1 p-4 overflow-y-auto">
          <div className="text-sm text-[#0a0a0a] space-y-4">
            <p>
              Khi thực hiện đặt phòng tại hệ thống của chúng tôi, quý khách sẽ được lựa chọn chính sách hủy phù hợp với
              từng hạng phòng. Mỗi chính sách được thiết kế dựa trên mức độ linh hoạt và ưu đãi tương ứng nhằm mang lại
              trải nghiệm thuận tiện, minh bạch và phù hợp với nhu cầu khách hàng.
            </p>
            <div>
              <h3 className="font-semibold text-base mb-1">Phòng Standard</h3>
              <p>Chính sách áp dụng: Moderate Cancellation</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Hoàn tiền 100% nếu hủy ít nhất 6 ngày trước ngày nhận phòng</li>
                <li>Hoàn tiền 50% nếu hủy trong vòng 5 ngày</li>
                <li>Không hoàn tiền nếu hủy trong vòng 1 ngày</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-base mb-1">Phòng Luxury</h3>
              <p>Chính sách áp dụng: Strict Cancellation</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Hoàn tiền 100% nếu hủy ít nhất 16 ngày trước ngày nhận phòng</li>
                <li>Hoàn tiền 50% nếu hủy trong vòng 6-15 ngày</li>
                <li>Không hoàn tiền nếu hủy trước 7 ngày</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-base mb-1">Phòng Vip</h3>
              <p>Hoàn tiền trong mọi trường hợp sau khi đặt phòng</p>
            </div>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}
