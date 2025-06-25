"use client"

import { useState, useMemo } from "react"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Clock, ExternalLink, Sparkles, X, CalendarDays } from "lucide-react"
import Image from "next/image"

interface ExplorationDrawerProps {
  isOpen: boolean
  onClose: () => void
  hotelName: string
}

export default function ExplorationDrawer({ isOpen, onClose, hotelName }: ExplorationDrawerProps) {
  // === STATE CHO "TIỆN ÍCH XUNG QUANH" ===
  type AmenityCategory = "supermarket" | "restaurant" | "cafe" | "park"
  interface AmenityItem {
    id: string
    name: string
    branches: string
    hours: string
    image: string
  }
  const [activeCategory, setActiveCategory] = useState<AmenityCategory>("supermarket")
  
  // === DATA CHO "TIỆN ÍCH XUNG QUANH" ===
  const categories: { id: AmenityCategory; name: string }[] = [
    { id: "supermarket", name: "Siêu thị" },
    { id: "restaurant", name: "Nhà hàng" },
    { id: "cafe", name: "Quán cà phê" },
    { id: "park", name: "Công viên" },
  ]
  
  const amenitiesData: Record<AmenityCategory, AmenityItem[]> = {
    supermarket: [
      {
        id: "winmart",
        name: "Siêu thị Winmart ",
        branches: "Hội An, Quảng Nam",
        hours: "08:00 - 23:00",
        image:
          "https://danviet.ex-cdn.com/files/f1/296231569849192448/2021/12/22/winmarta-1640142773723-16401427738771005786314.jpg",
      },
      {
        id: "go",
        name: "Siêu thị Go!",
        branches: "Hội An, Quảng Nam",
        hours: "08:00 - 23:00",
        image: "https://centralretail.com.vn/wp-content/uploads/2024/03/go-bigc-cover-1.png",
      },
      {
        id: "lotte",
        name: "Lotte Mart ",
        branches: "Hội An, Quảng Nam",
        hours: "08:00 - 23:00",
        image: "https://images2.thanhnien.vn/528068263637045248/2025/4/28/lotte-mart-1-1745851235813715925965.jpg",
      },
      {
        id: "Cửa hàng tiện lợi",
        name: "Cửa hàng tiện lợi",  
        branches: "Hội An, Quảng Nam",
        hours: "08:00 - 23:00",
        image: "https://simg.zalopay.com.vn/zlp-website/assets/cua_hang_tien_loi_family_mart_4d88b0dce2.jpg",
      },
      {
        id: "Chợ địa phương",
        name: "Chợ địa phương",
        branches: "Hội An, Quảng Nam",
        hours: "08:00 - 23:00",
        image: "https://static.vinwonders.com/production/cho-quang-nam-2.jpg",
      },
    ],
    restaurant: [
      {
        id: "kfc",
        name: "KFC",
        branches: "Hội An, Quảng Nam",
        hours: "10:00 - 22:00",
        image: "https://upload.wikimedia.org/wikipedia/sco/thumb/b/bf/KFC_logo.svg/1200px-KFC_logo.svg.png",
      },
      {
        id: "pizza-hut",
        name: "Pizza Hut",
        branches: "Hội An, Quảng Nam",
        hours: "10:00 - 22:00",
        image: "https://bnhat.vn/wp-content/uploads/2023/08/355-1609900139-1609919005-9294-1609994824.png",
      },
      {
        id: "Lotteria",
        name: "Lotteria",
        branches: "Hội An, Quảng Nam",
        hours: "10:00 - 22:00",
        image: "https://thoitranghaianh.com/wp-content/uploads/2024/07/lotteria-logo.jpg",
      },
      {
        id: "Jollibee",
        name: "Jollibee",
        branches: "Hội An, Quảng Nam",
        hours: "10:00 - 22:00",
        image: "https://1000logos.net/wp-content/uploads/2021/05/Jollibee-logo.png",
      },
      {
        id: "Nhà hàng địa phương",
        name: "Nhà hàng địa phương",
        branches: "Hội An, Quảng Nam",
        hours: "10:00 - 22:00",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/10/b5/ca/home-hoi-an-overview.jpg?w=600&h=-1&s=1",
      }
    ],
    cafe: [
      {
        id: "highlands",
        name: "Highlands Coffee",
        branches: "Hơn 500 quán",
        hours: "07:00 - 23:00",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/57/d9/65/photo0jpg.jpg?w=900&h=500&s=1",
      },
      {
        id: "phuc-long",
        name: "Phúc Long Coffee & Tea",
        branches: "Hội An, Quảng Nam",
        hours: "07:00 - 22:30",
        image: "https://winci.com.vn/wp-content/uploads/2024/02/Su-ra-doi-cua-thuong-hieu-Phuc-Long.webp",
      },
      {
        id: "starbucks",
        name: "Starbucks Coffee",
        branches: "Hội An, Quảng Nam",
        hours: "07:00 - 23:00",
        image: "https://upload.wikimedia.org/wikipedia/vi/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png",
      },
      {
        id: "cà phê địa phương",
        name: "Cà phê địa phương",
        branches: "Hội An, Quảng Nam",
        hours: "07:00 - 22:00",
        image:
          "https://suckhoeviet.org.vn/stores/news_dataimages/2023/052023/21/15/3ab67a7cff8dc6f23616e658ca0c61c7.jpg?rt=20230521154605",
      },
    ],
    park: [
      {
        id: "Công viên trung tâm Hội An",
        name: "Công viên trung tâm Hội An",
        branches: "Hội An, Quảng Nam",
        hours: "Mở cửa 24h",
        image: "https://pcccquangnam.com/uploads/du-an-cong-trinh/2023_11/image_2.png",
      },
      {
        id: "VinWonders",
        name: "VinWonders Nam Hội An",
        branches: "Hội An, Quảng Nam",
        hours: "08:00 - 19:00",
        image:
          "https://vinwondershoian.com/userfiles/image/toan-canh-vinder-nam-hoi-an.jpg",
      },
    ],
  }
  const currentAmenities = useMemo(() => amenitiesData[activeCategory] || [], [activeCategory])

  // === DATA CHO "KHÁM PHÁ ĐỊA PHƯƠNG" ===
  const localExplorationEvents = [
    {
      id: "event1",
      name: "Lễ hội đêm rằm phố cổ Hội An",
      location: "Phố cổ Hội An, Quảng Nam",
      date: "đêm 14 âm lịch hằng tháng",
      description:
        "Đến với Đêm Phố cổ, du khách sẽ được đắm mình vào không gian huyền ảo, tham gia các trò chơi dân gian, các sinh hoạt truyền thống của người dân địa phương, và thật sự ấn tượng khi cảm thấy mình như đang lạc vào cõi thiên thai.",
      image: "https://dulichbinhduong.org.vn/storage/travels/xyfdFAo3TNm6DyjGgy6npdiDClXSBhLApUqy43am.jpg",
      link: "https://dulichbinhduong.org.vn/du-lich/le-hoi-dem-ram-pho-co-hoi-an-quang-nam/ct",
    },
    {
      id: "thubon",
      name: "Lễ hội bà Thu Bồn",
      location: "Duy Tân, Duy Xuyên, Quảng Nam",
      date: "Ngày 12 tháng 2 âm lịch hằng năm.",
      description:
        "Lễ hội bà Thu Bồn được tổ chức đơn giản nhưng cũng không kém phần trang trọng với các hoạt động truyền thống đặc sắc như: thi làm bánh, hát đối đáp, chơi cờ người, kéo co…",
      image: "https://statics.vinpearl.com/le-hoi-o-hoi-an-3.jpg",
      link: "https://dulichbinhduong.org.vn/du-lich/le-hoi-ba-thu-bon-quang-nam/ct",
    },
    
  ]

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="h-[90vh] flex flex-col bg-gray-50">
        <DrawerHeader className="p-4 border-b bg-white flex items-center justify-between flex-shrink-0">
          <div>
            <DrawerTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <span>Khám phá xung quanh {hotelName}</span>
            </DrawerTitle>
            <DrawerDescription className="text-sm text-gray-500 mt-1">
              Những trải nghiệm độc đáo đang chờ bạn
            </DrawerDescription>
          </div>
         
        </DrawerHeader>

        <Tabs defaultValue="local-exploration" className="w-full flex-1 flex flex-col overflow-hidden">
          {/* Phần TabsList cố định */}
          <div className="bg-white p-4 border-b flex-shrink-0">
            <TabsList className="grid w-full grid-cols-2 bg-gray-200/70 rounded-lg p-1">
              <TabsTrigger
                value="nearby-amenities"
                className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md text-sm font-medium text-gray-600 h-9"
              >
                Tiện ích xung quanh
              </TabsTrigger>
              <TabsTrigger
                value="local-exploration"
                className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md text-sm font-medium text-gray-600 h-9"
              >
                Khám phá địa phương
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Phần nội dung có thể cuộn */}
          <div className="flex-1 overflow-y-auto">
            {/* === NỘI DUNG TAB 1: TIỆN ÍCH XUNG QUANH === */}
            <TabsContent value="nearby-amenities">
              {/* Các nút lọc */}
              <div className="px-4 py-3 bg-gray-50 sticky top-0 z-10">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                  {categories.map((category) => (
                    // === THAY ĐỔI TẠI ĐÂY ===
                    <Button
                      key={category.id}
                      variant={activeCategory === category.id ? "default" : "outline"}
                      className={`rounded-full h-8 px-4 text-sm whitespace-nowrap transition-colors duration-200 ${
                        activeCategory === category.id
                          ? "bg-black text-white hover:bg-gray-800 border-black" // Nút được chọn: Nền đen, chữ trắng
                          : "bg-white text-gray-700 border-gray-300" // Nút không được chọn
                      }`}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Danh sách tiện ích */}
              <div className="px-4 pb-4">
                {currentAmenities.length > 0 ? (
                  <div className="space-y-3">
                    {currentAmenities.map((item) => (
                      <div key={item.id} className="bg-white rounded-xl shadow-sm p-3 flex items-center gap-4">
                        <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            layout="fill"
                            className="object-cover"
                          />
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
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${item.name} Quảng Nam`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Tìm ${item.name} tại Quảng Nam trên bản đồ`}
                        >
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-700">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    <p>Chưa có dữ liệu cho danh mục này.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* === NỘI DUNG TAB 2: KHÁM PHÁ ĐỊA PHƯƠNG === */}
            <TabsContent value="local-exploration" className="p-4">
              <div className="space-y-5">
                {localExplorationEvents.map((event) => (
                  <a
                    key={event.id}
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-64 bg-white rounded-xl shadow-lg overflow-hidden relative group transition-all duration-300 ease-in-out hover:shadow-2xl"
                  >
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.name}
                      layout="fill"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ExternalLink className="h-5 w-5 text-white" />
                    </div>
                    <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
                      <h3
                        className="text-xl font-bold leading-tight"
                        style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.7)" }}
                      >
                        {event.name}
                      </h3>
                      <p
                        className="text-sm mt-2 text-neutral-200 line-clamp-2"
                        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.7)" }}
                      >
                        {event.description}
                      </p>
                      <div className="mt-4 flex items-center gap-x-4 gap-y-1 text-xs text-neutral-300 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5" />
                          <span>{event.date}</span>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DrawerContent>
    </Drawer>
  )
}
