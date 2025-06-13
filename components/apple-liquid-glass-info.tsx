"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Glasses } from "lucide-react"

export default function AppleLiquidGlassInfo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Glasses className="h-4 w-4" />
          <span>Tìm hiểu về Apple Liquid Glass</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apple Liquid Glass</DialogTitle>
          <DialogDescription>Công nghệ kính thông minh cao cấp</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="rounded-lg bg-gray-100 p-4">
            <h3 className="mb-2 font-medium">Tính năng nổi bật</h3>
            <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
              <li>Điều chỉnh độ trong suốt tự động theo ánh sáng</li>
              <li>Chuyển đổi thành màn hình hiển thị thông tin</li>
              <li>Cách âm và cách nhiệt cao cấp</li>
              <li>Điều khiển bằng giọng nói hoặc cử chỉ</li>
              <li>Tích hợp với hệ thống điều khiển phòng thông minh</li>
            </ul>
          </div>

          <p className="text-sm text-gray-600">
            Apple Liquid Glass là công nghệ kính thông minh thế hệ mới được trang bị trong các phòng cao cấp. Kính có
            thể điều chỉnh độ trong suốt từ hoàn toàn trong suốt đến mờ đục để đảm bảo sự riêng tư, đồng thời có thể
            chuyển đổi thành màn hình hiển thị thông tin, thời tiết, tin tức hoặc giải trí.
          </p>

          <div className="rounded-lg bg-black p-4 text-white">
            <p className="text-sm">
              "Apple Liquid Glass đại diện cho bước đột phá trong trải nghiệm khách sạn cao cấp, kết hợp giữa công nghệ
              tiên tiến và thiết kế sang trọng."
            </p>
            <p className="mt-2 text-xs text-gray-400">- Tạp chí Công nghệ & Du lịch</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
