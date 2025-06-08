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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { ExternalLink, MapPin, CalendarDays, Utensils, Banknote, ShoppingCart } from "lucide-react"

interface LocalExplorationDrawerProps {
  isOpen: boolean
  onClose: () => void
  hotelName: string
}

export default function LocalExplorationDrawer({ isOpen, onClose, hotelName }: LocalExplorationDrawerProps) {
  const localExplorationEvents = [
    {
      id: "carnaval",
      name: "Festival Carnaval Hạ Long",
      location: "Thành phố Hạ Long, Quảng Ninh",
      date: "Tháng 8 - Tháng 9 hàng năm",
      description: "Sự kiện văn hóa du lịch thường niên nhằm quảng bá nét đẹp và di sản của Vịnh Hạ Long.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ti%E1%BB%87n%20%C3%ADch%20xung%20quanh%20(1)-q0Paxz3AQAmgBa6BmyduTvxQcW7J61.png",
    },
    {
      id: "yen-tu",
      name: "Lễ Hội Yên Tử",
      location: "Núi Yên Tử, Uông Bí",
      date: "Tháng 1 - Tháng 3 âm lịch",
      description: "Lễ hội hành hương lớn nhất miền Bắc, thu hút hàng nghìn du khách về với đất Phật.",
      image: "https://images.pexels.com/photos/1007427/pexels-photo-1007427.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "bach-dang",
      name: "Lễ hội Bạch Đằng",
      location: "Khu di tích Bạch Đằng",
      date: "Tháng 3 âm lịch",
      description: "Tái hiện những chiến công lịch sử hào hùng của dân tộc trên dòng sông Bạch Đằng.",
      image: "https://images.pexels.com/photos/161296/river-asia-vietnam-water-161296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  const nearbyAmenities = [
    { icon: <Utensils className="text-red-500"/>, name: "Nhà hàng ABC", distance: "200m" },
    { icon: <ShoppingCart className="text-blue-500"/>, name: "Siêu thị VinMart", distance: "500m" },
    { icon: <Banknote className="text-green-500"/>, name: "ATM Vietcombank", distance: "150m" },
    { icon: <Utensils className="text-orange-500"/>, name: "Quán cà phê Highland", distance: "300m" },
  ];

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="h-[90vh] flex flex-col bg-gray-50">
        <DrawerHeader className="text-left p-4 border-b bg-white">
          <DrawerTitle className="text-xl font-bold text-gray-900">Khám phá xung quanh {hotelName}</DrawerTitle>
          <DrawerDescription className="text-sm text-gray-500">Những trải nghiệm độc đáo đang chờ bạn</DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto">
            <Tabs defaultValue="local-exploration" className="w-full pt-4">
                {/* === Tabs được thiết kế lại === */}
                <TabsList className="grid w-full grid-cols-2 bg-gray-200/70 rounded-lg p-1 mx-4">
                    <TabsTrigger value="nearby-amenities" className="data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm rounded-md text-sm font-medium text-gray-600 h-9">
                        Tiện ích xung quanh
                    </TabsTrigger>
                    <TabsTrigger value="local-exploration" className="data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm rounded-md text-sm font-medium text-gray-600 h-9">
                        Khám phá địa phương
                    </TabsTrigger>
                </TabsList>
                
                {/* === Nội dung Tab Khám phá địa phương === */}
                <TabsContent value="local-exploration" className="p-4">
                    <div className="space-y-4">
                        {localExplorationEvents.map((event) => (
                            <div key={event.id} className="w-full bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
                                {/* Phần ảnh */}
                                <div className="relative h-40 w-full">
                                    <Image src={event.image} alt={event.name} layout="fill" className="object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-4 text-white">
                                        <h3 className="text-lg font-bold leading-tight">{event.name}</h3>
                                    </div>
                                </div>
                                {/* Phần thông tin với gradient */}
                                <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-100/80 flex-1 flex flex-col">
                                    <div className="flex items-start gap-2 text-xs text-gray-600 mb-2">
                                        <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                        <span>{event.location}</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-xs text-gray-600 mb-3">
                                        <CalendarDays className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                        <span>{event.date}</span>
                                    </div>
                                    <p className="text-sm text-gray-800 mb-4 flex-grow">{event.description}</p>
                                    <Button variant="outline" className="w-full bg-white/50 border-gray-300 hover:bg-white">
                                        Xem chi tiết <ExternalLink className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabsContent>

                {/* === Nội dung Tab Tiện ích xung quanh === */}
                <TabsContent value="nearby-amenities" className="p-4">
                     <div className="space-y-3">
                        {nearbyAmenities.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 flex items-center justify-center bg-gray-100 rounded-lg">
                                  {item.icon}
                                </div>
                                <span className="font-medium text-gray-800">{item.name}</span>
                            </div>
                            <span className="text-sm text-gray-500">{item.distance}</span>
                          </div>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>

        
      </DrawerContent>
    </Drawer>
  )
}
