"use client"

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CancellationPolicyDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function CancellationPolicyDrawer({ isOpen, onClose }: CancellationPolicyDrawerProps) {
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
              <h3 className="font-semibold text-base mb-1">Chính sách: Huỷ miễn phí trước 7 ngày</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Khách có thể hủy miễn phí cho đến 7 ngày trước ngày đến.</li>
                <li>Khách sẽ bị tính toàn bộ giá trị đặt phòng nếu hủy trong vòng 7 ngày trước ngày đến.</li>
                <li>Khách sẽ bị tính trước toàn bộ số tiền đặt phòng trong vòng 7 ngày trước ngày đến.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-base mb-1">Chính sách: Không hoàn tiền</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Khách sẽ bị tính toàn bộ giá trị đặt phòng nếu hủy vào bất kỳ thời điểm nào.</li>
                <li>Khách sẽ bị thu trước toàn bộ số tiền đặt phòng vào bất kỳ thời điểm nào</li>
              </ul>
            </div>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}
