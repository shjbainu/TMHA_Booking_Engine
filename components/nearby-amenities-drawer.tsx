"use client"

import { useState, useMemo } from "react"
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
import { MapPin, Clock, ExternalLink } from "lucide-react"
import Image from "next/image"

interface NearbyAmenitiesDrawerProps {
  isOpen: boolean
  onClose: () => void
  hotelName: string
}

export default function NearbyAmenitiesDrawer({ isOpen, onClose, hotelName }: NearbyAmenitiesDrawerProps) {
  const [activeCategory, setActiveCategory] = useState("supermarket")

  const categories = [
    { id: "supermarket", name: "Siêu thị" },
    { id: "restaurant", name: "Nhà hàng" },
    { id: "cafe", name: "Quán cà phê" },
    { id: "park", name: "Công viên" },
  ];

  const amenitiesData = {
    supermarket: [
      { id: "winmart", name: "Siêu thị Winmart", branches: "3.700 cơ sở", hours: "08:00 - 23:00", image: "https://danviet.ex-cdn.com/files/f1/296231569849192448/2021/12/22/winmarta-1640142773723-16401427738771005786314.jpg" },
      { id: "go", name: "Siêu thị Go!", branches: "42 cơ sở", hours: "08:00 - 23:00", image: "https://centralretail.com.vn/wp-content/uploads/2024/03/go-bigc-cover-1.png" },
      { id: "lotte", name: "Lotte Mart", branches: "15 cơ sở", hours: "08:00 - 23:00", image: "https://images2.thanhnien.vn/528068263637045248/2025/4/28/lotte-mart-1-1745851235813715925965.jpg" },
    ],
    restaurant: [
      { id: "kfc", name: "KFC", branches: "Hơn 150 nhà hàng", hours: "10:00 - 22:00", image: "https://upload.wikimedia.org/wikipedia/sco/thumb/b/bf/KFC_logo.svg/1200px-KFC_logo.svg.png" },
      { id: "pizza-hut", name: "Pizza Hut", branches: "Hơn 100 nhà hàng", hours: "10:00 - 22:00", image: "https://bnhat.vn/wp-content/uploads/2023/08/355-1609900139-1609919005-9294-1609994824.png" },
    ],
    cafe: [
       { id: "highlands", name: "Highlands Coffee", branches: "Hơn 500 quán", hours: "07:00 - 23:00", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/57/d9/65/photo0jpg.jpg?w=900&h=500&s=1" },
       { id: "phuc-long", name: "Phúc Long Coffee & Tea", branches: "Hơn 150 cửa hàng", hours: "07:00 - 22:30", image: "https://static.mservice.io/placebrand/s/momo-upload-api-200218150929-637176161694856011.jpg" },
    ]
  };
  
  const currentAmenities = useMemo(() => amenitiesData[activeCategory] || [], [activeCategory]);

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="h-[90vh] flex flex-col bg-gray-50">
        <DrawerHeader className="text-left p-4 border-b bg-white">
          <DrawerTitle className="text-xl font-bold text-gray-900">Tiện ích xung quanh {hotelName}</DrawerTitle>
          <DrawerDescription className="text-sm text-gray-500">Khám phá những địa điểm gần bạn</DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto">
          <Tabs defaultValue="nearby-amenities" className="w-full pt-4">
            <TabsList className="grid w-full grid-cols-2 bg-gray-200/70 rounded-lg p-1 mx-4">
              <TabsTrigger value="nearby-amenities" className="data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm rounded-md text-sm font-medium text-gray-600 h-9">
                Tiện ích xung quanh
              </TabsTrigger>
              <TabsTrigger value="local-exploration" className="data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm rounded-md text-sm font-medium text-gray-600 h-9">
                Khám phá địa phương
              </TabsTrigger>
            </TabsList>

            <div className="px-4 mt-4">
                {/* === Bộ lọc dạng "Chips" thay thế Dropdown === */}
                <div className="flex gap-2 pb-2 overflow-x-auto scrollbar-hide">
                    {categories.map((category) => (
                        <Button
                        key={category.id}
                        variant="outline"
                        className={`rounded-full h-8 px-4 text-sm whitespace-nowrap transition-colors duration-200 ${
                            activeCategory === category.id
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-700 border-gray-300"
                        }`}
                        onClick={() => setActiveCategory(category.id)}
                        >
                        {category.name}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="p-4">
                {currentAmenities.length > 0 ? (
                    <div className="space-y-3">
                        {currentAmenities.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl shadow-sm p-3 flex items-center gap-4">
                            <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                <Image src={item.image} alt={item.name} layout="fill" className="object-contain p-1" />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-gray-800">{item.name}</p>
                                <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                                    <MapPin className="h-3.5 w-3.5" />
                                    <span>{item.branches}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                                    <Clock className="h-3.5 w-3.5" />
                                    <span>{item.hours}</span>
                                </div>
                            </div>
                             <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-700">
                                <ExternalLink className="h-4 w-4" />
                            </Button>
                        </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 text-gray-500">
                        <p>Chưa có dữ liệu cho danh mục này.</p>
                    </div>
                )}
            </div>
          </Tabs>
        </div>

        
      </DrawerContent>
    </Drawer>
  )
}
