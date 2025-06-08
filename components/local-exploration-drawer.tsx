"use client"

import { useState } from "react"
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { ExternalLink } from "lucide-react"

interface LocalExplorationDrawerProps {
  isOpen: boolean
  onClose: () => void
  hotelName: string
  hotelAddress: string
}

export default function LocalExplorationDrawer({
  isOpen,
  onClose,
  hotelName,
  hotelAddress,
}: LocalExplorationDrawerProps) {
  const [activeTab, setActiveTab] = useState("local-exploration")

  const localExplorationEvents = [
    {
      id: "carnaval",
      name: "Festival Carnaval Hạ Long",
      locationDate: "Thành phố Hạ Long, Quảng Ninh\nTháng 8 - Tháng 9 hàng năm",
      description:
        "Carnaval Hạ Long là sự kiện văn hóa du lịch thường niên do tỉnh Quảng Ninh tổ chức, nhằm quảng bá văn hóa địa phương...",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ti%E1%BB%87n%20%C3%ADch%20xung%20quanh%20%281%29-q0Paxz3AQAmgBa6BmyduTvxQcW7J61.png", // Placeholder image from provided screenshot
    },
    {
      id: "yen-tu",
      name: "Lễ Hội Yên Tử",
      locationDate: "Núi Yên Tử\n10 Tháng giêng - Tháng 3 âm lịch",
      description:
        "Cứ mỗi dịp xuân về, lễ hội Yên Tử lại được tổ chức tham gia đông đúc của hàng nghìn du khách thập phương. Những nghi lễ tôn nghiêm được thực...",
      image: "/placeholder.svg?height=120&width=120",
    },
    {
      id: "bach-dang",
      name: "Lễ hội Bạch Đằng",
      locationDate: "Khu di tích Bạch Đằng\nTháng 3 âm lịch",
      description:
        "Lễ hội Bạch Đằng là một trong những lễ hội nổi tiếng của người dân Quảng Ninh. Đây không chỉ là hoạt động văn hóa....",
      image: "/placeholder.svg?height=120&width=120",
    },
  ]

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="h-[90vh] flex flex-col">
        <DrawerHeader className="text-center">
          <DrawerTitle className="text-2xl font-bold text-[#0a0a0a]">Khám phá địa phương gần {hotelName}</DrawerTitle>
          <DrawerDescription className="text-sm text-gray-600">
            Những trải nghiệm độc đáo đang chờ bạn
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-4">
            <TabsList className="grid w-full grid-cols-2 bg-black text-white rounded-lg p-1">
              <TabsTrigger
                value="nearby-amenities"
                className="data-[state=active]:bg-white data-[state=active]:text-black rounded-md text-sm font-medium h-10"
              >
                Tiện ích xung quanh
              </TabsTrigger>
              <TabsTrigger
                value="local-exploration"
                className="data-[state=active]:bg-white data-[state=active]:text-black rounded-md text-sm font-medium h-10"
              >
                Khám phá địa phương
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-4">
            {localExplorationEvents.map((event) => (
              <div key={event.id} className="bg-gray-100 rounded-lg p-4 flex items-start gap-4">
                <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden">
                  <Image src={event.image || "/placeholder.svg"} alt={event.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-[#0a0a0a] text-base">{event.name}</p>
                    <ExternalLink className="h-4 w-4 text-gray-500" />
                  </div>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap mb-1">{event.locationDate}</p>
                  <p className="text-sm text-gray-700">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
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
