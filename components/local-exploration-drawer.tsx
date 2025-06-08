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
  const [activeCategory, setActiveCategory] = useState("supermarket")

  // === DATA CHO "TIỆN ÍCH XUNG QUANH" ===
  const categories = [
    { id: "supermarket", name: "Siêu thị" },
    { id: "restaurant", name: "Nhà hàng" },
    { id: "cafe", name: "Quán cà phê" },
    { id: "park", name: "Công viên" },
  ]

  const amenitiesData = {
    supermarket: [
      {
        id: "winmart",
        name: "Siêu thị Winmart",
        branches: "3.700 cơ sở",
        hours: "08:00 - 23:00",
        image:
          "https://danviet.ex-cdn.com/files/f1/296231569849192448/2021/12/22/winmarta-1640142773723-16401427738771005786314.jpg",
      },
      {
        id: "go",
        name: "Siêu thị Go!",
        branches: "42 cơ sở",
        hours: "08:00 - 23:00",
        image: "https://centralretail.com.vn/wp-content/uploads/2024/03/go-bigc-cover-1.png",
      },
      {
        id: "lotte",
        name: "Lotte Mart",
        branches: "15 cơ sở",
        hours: "08:00 - 23:00",
        image: "https://images2.thanhnien.vn/528068263637045248/2025/4/28/lotte-mart-1-1745851235813715925965.jpg",
      },
    ],
    restaurant: [
      {
        id: "kfc",
        name: "KFC",
        branches: "Hơn 150 nhà hàng",
        hours: "10:00 - 22:00",
        image: "https://upload.wikimedia.org/wikipedia/sco/thumb/b/bf/KFC_logo.svg/1200px-KFC_logo.svg.png",
      },
      {
        id: "pizza-hut",
        name: "Pizza Hut",
        branches: "Hơn 100 nhà hàng",
        hours: "10:00 - 22:00",
        image: "https://bnhat.vn/wp-content/uploads/2023/08/355-1609900139-1609919005-9294-1609994824.png",
      },
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
        branches: "Hơn 150 cửa hàng",
        hours: "07:00 - 22:30",
        image: "https://winci.com.vn/wp-content/uploads/2024/02/Su-ra-doi-cua-thuong-hieu-Phuc-Long.webp",
      },
    ],
    park: [
      {
        id: "hanoi-zoo",
        name: "Vườn thú Hà Nội (Công viên Thủ Lệ)",
        branches: "Đường Bưởi, Ba Đình",
        hours: "08:00 - 18:00",
        image: "https://vietair.com.vn/Media/Images/vietair/Tin-tuc/2023/10/cong-vien-thu-le.jpg",
      },
      {
        id: "thong-nhat-park",
        name: "Công viên Thống Nhất",
        branches: "Trần Nhân Tông, Hai Bà Trưng",
        hours: "06:00 - 22:00",
        image:
          "https://ik.imagekit.io/tvlk/blog/2023/10/GaXyhe6R-cong-vien-thong-nhat-3.jpg?tr=q-70,c-at_max,w=500,h-300,dpr-2",
      },
    ],
  }
  const currentAmenities = useMemo(() => amenitiesData[activeCategory] || [], [activeCategory])

  // === DATA CHO "KHÁM PHÁ ĐỊA PHƯƠNG" ===
  const localExplorationEvents = [
    {
      id: "huong-pagoda",
      name: "Lễ hội Chùa Hương",
      location: "Mỹ Đức, Hà Nội",
      date: "Tháng 1 - Tháng 3 âm lịch",
      description: "Hành trình tâm linh trên dòng suối Yến thơ mộng để đến với một trong những lễ hội Phật giáo dài và lớn nhất Việt Nam.",
      image: "https://static.vinwonders.com/production/chua-huong-5.jpg",
      link: "https://www.bestprice.vn/blog/diem-den-8/chua-huong-467.html",
    },
    {
      id: "giong-festival",
      name: "Hội Gióng ở đền Sóc",
      location: "Sóc Sơn, Hà Nội",
      date: "Mùng 6-8 tháng Giêng",
      description: "Di sản văn hóa phi vật thể của UNESCO, tái hiện lại huyền thoại Thánh Gióng oai hùng bay về trời sau khi đánh đuổi giặc Ân.",
      image: "https://nhaquanly.vn/uploads/images/2024/02/15/le-hoi-giong-2024-1708009514.png",
      link: "https://vinpearl.com/vi/hoi-giong-le-hoi-co-truyen-viet-nam",
    },
    {
      id: "dong-da-festival",
      name: "Lễ hội Gò Đống Đa",
      location: "Quận Đống Đa, Hà Nội",
      date: "Mùng 5 Tết Nguyên đán",
      description: "Kỷ niệm chiến thắng Ngọc Hồi – Đống Đa lừng lẫy của hoàng đế Quang Trung, với màn rước Rồng lửa Thăng Long hào hùng.",
      image: "https://media-cdn-v2.laodong.vn/storage/newsportal/2025/2/2/1457462/Lehoi_Godongda-1.jpg",
      link: "https://vinpearl.com/vi/le-hoi-go-dong-da-dien-ra-khi-nao-o-dau-co-gi-dac-sac",
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
          <DrawerClose asChild>
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
              <X className="h-4 w-4" />
              <span className="sr-only">Đóng</span>
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <Tabs defaultValue="local-exploration" className="w-full flex-1 flex flex-col overflow-hidden">
          {/* Phần TabsList cố định */}
          <div className="bg-white p-4 border-b flex-shrink-0">
            <TabsList className="grid w-full grid-cols-2 bg-gray-200/70 rounded-lg p-1">
              <TabsTrigger
                value="nearby-amenities"
                className="data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm rounded-md text-sm font-medium text-gray-600 h-9"
              >
                Tiện ích xung quanh
              </TabsTrigger>
              <TabsTrigger
                value="local-exploration"
                className="data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm rounded-md text-sm font-medium text-gray-600 h-9"
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
                      variant={activeCategory === category.id ? 'default' : 'outline'}
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
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${item.name}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Tìm ${item.name} trên bản đồ`}
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
                      src={event.image}
                      alt={event.name}
                      layout="fill"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ExternalLink className="h-5 w-5 text-white" />
                    </div>
                    <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
                      <h3 className="text-xl font-bold leading-tight" style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.7)" }}>
                        {event.name}
                      </h3>
                      <p className="text-sm mt-2 text-neutral-200 line-clamp-2" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.7)" }}>
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
