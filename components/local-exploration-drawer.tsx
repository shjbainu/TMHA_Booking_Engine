"use client"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { ExternalLink, MapPin, CalendarDays, Utensils, Banknote, ShoppingCart, Sparkles, X } from "lucide-react"

interface LocalExplorationDrawerProps {
  isOpen: boolean
  onClose: () => void
  hotelName: string // Giữ lại prop để có thể tùy biến nếu cần
}

export default function LocalExplorationDrawer({ isOpen, onClose, hotelName }: LocalExplorationDrawerProps) {
  // === DỮ LIỆU ĐÃ ĐƯỢC CẬP NHẬT VỀ CÁC LỄ HỘI QUANH HÀ NỘI ===
  const localExplorationEvents = [
    {
      id: "huong-pagoda",
      name: "Lễ hội Chùa Hương",
      location: "Mỹ Đức, Hà Nội",
      date: "Tháng 1 - Tháng 3 âm lịch",
      description: "Hành trình tâm linh trên dòng suối Yến thơ mộng để đến với một trong những lễ hội Phật giáo dài và lớn nhất Việt Nam.",
      image: "https://static.vinwonders.com/production/chua-huong-5.jpg",
      link: "https://vietnam.travel/things-to-do/huong-pagoda-festival",
    },
    {
      id: "giong-festival",
      name: "Hội Gióng ở đền Sóc",
      location: "Sóc Sơn, Hà Nội",
      date: "Mùng 6-8 tháng Giêng",
      description: "Di sản văn hóa phi vật thể của UNESCO, tái hiện lại huyền thoại Thánh Gióng oai hùng bay về trời sau khi đánh đuổi giặc Ân.",
      image: "https://cdnphoto.dantri.com.vn/S14A_G-P2q2UPEy3m0wE9sC6tS4=/thumb_w/1020/2024/02/16/hoi-giong-den-soc-son-2-1708051253909.jpeg",
      link: "https://ticotravel.com.vn/wp-content/uploads/2022/06/Den-Giong-Soc-Son-6.jpg",
    },
    {
      id: "dong-da-festival",
      name: "Lễ hội Gò Đống Đa",
      location: "Quận Đống Đa, Hà Nội",
      date: "Mùng 5 Tết Nguyên đán",
      description: "Kỷ niệm chiến thắng Ngọc Hồi – Đống Đa lừng lẫy của hoàng đế Quang Trung, với màn rước Rồng lửa Thăng Long hào hùng.",
      image: "https://vcdn1-vnexpress.vnecdn.net/2023/01/26/le-hoi-dong-da-7-1674721451.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=s98E8U1qB73qH5gXvV3lRg",
      link: "https://vnexpress.net/nguoi-dan-du-le-hoi-go-dong-da-4564016.html",
    },
  ]

  const nearbyAmenities = [
    { icon: <Utensils className="h-5 w-5 text-red-500" />, name: "Nhà hàng ABC", distance: "200m" },
    { icon: <ShoppingCart className="h-5 w-5 text-blue-500" />, name: "Siêu thị VinMart", distance: "500m" },
    { icon: <Banknote className="h-5 w-5 text-green-500" />, name: "ATM Vietcombank", distance: "150m" },
    { icon: <Utensils className="h-5 w-5 text-orange-500" />, name: "Quán cà phê Highland", distance: "300m" },
  ]

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="h-[90vh] flex flex-col bg-gray-50">
        <DrawerHeader className="p-4 border-b bg-white flex items-center justify-between flex-shrink-0">
            <div>
              <DrawerTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                <span>Khám phá Hà Nội</span>
              </DrawerTitle>
              <DrawerDescription className="text-sm text-gray-500 mt-1">
                Những trải nghiệm văn hóa độc đáo đang chờ bạn
              </DrawerDescription>
            </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto">
          <Tabs defaultValue="local-exploration" className="w-full">
            <div className="bg-white sticky top-0 z-10 p-4 border-b">
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

            {/* === NỘI DUNG MỚI VỚI THIẾT KẾ ĐƯỢC GIỮ NGUYÊN === */}
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
                      <h3 className="text-xl font-bold leading-tight" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>{event.name}</h3>
                      <p className="text-sm mt-2 text-neutral-200 line-clamp-2" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>{event.description}</p>
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
