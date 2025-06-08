"use client"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { ExternalLink, MapPin, CalendarDays, Utensils, Banknote, ShoppingCart, Sparkles, X } from "lucide-react"

interface LocalExplorationDrawerProps {
  isOpen: boolean
  onClose: () => void
  hotelName: string
}

export default function LocalExplorationDrawer({ isOpen, onClose, hotelName }: LocalExplorationDrawerProps) {
  // === DỮ LIỆU ĐƯỢC CẬP NHẬT VỚI HÌNH ẢNH VÀ LINK THẬT ===
  const localExplorationEvents = [
    {
      id: "carnaval",
      name: "Festival Carnaval Hạ Long",
      location: "Thành phố Hạ Long, Quảng Ninh",
      date: "Tháng 4 - Tháng 5 hàng năm",
      description: "Sự kiện văn hóa du lịch thường niên rực rỡ sắc màu, quảng bá nét đẹp và di sản Vịnh Hạ Long.",
      image: "https://cdn.baoquocte.vn/stores/news_dataimages/dangcongsan/042024/28/10/in_article/20240428104711_33221.jpg",
      link: "https://vietnamtourism.gov.vn/vi/post/30048",
    },
    {
      id: "yen-tu",
      name: "Lễ Hội Xuân Yên Tử",
      location: "Núi Yên Tử, Uông Bí",
      date: "Tháng 1 - Tháng 3 âm lịch",
      description: "Lễ hội hành hương lớn nhất miền Bắc, thu hút hàng triệu du khách về với cõi Phật linh thiêng.",
      image: "https://baochinhphu.vn/thumb_w/1000/446259498576228352/2024/2/19/le-hoi-xuan-yen-tu-17083162237001409252494.jpg",
      link: "https://baochinhphu.vn/khai-hoi-xuan-yen-tu-2024-102240219105436329.htm",
    },
    {
      id: "bach-dang",
      name: "Lễ hội Bạch Đằng",
      location: "Khu di tích Bạch Đằng, Quảng Yên",
      date: "Mùng 6-8/3 âm lịch",
      description: "Tái hiện những chiến công lịch sử hào hùng của dân tộc trên dòng sông Bạch Đằng bất tử.",
      image: "https://baoquangninh.vn/Upload/Images/2024/4/15/22/0R7A7233_152220.jpg",
      link: "https://baoquangninh.vn/khai-mac-le-hoi-truyen-thong-bach-dang-nam-2024-3291811.html",
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
                <span>Khám phá {hotelName}</span>
              </DrawerTitle>
              <DrawerDescription className="text-sm text-gray-500 mt-1">
                Những trải nghiệm độc đáo đang chờ bạn
              </DrawerDescription>
            </div>
            {/* Nút đóng drawer cho UX tốt hơn */}
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

            {/* === NỘI DUNG TAB KHÁM PHÁ ĐỊA PHƯƠNG - ĐƯỢC THIẾT KẾ LẠI HOÀN TOÀN === */}
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
                    {/* Phần ảnh nền với hiệu ứng phóng to khi hover */}
                    <Image
                      src={event.image}
                      alt={event.name}
                      layout="fill"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Lớp phủ gradient để làm nổi bật chữ */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    
                    {/* Icon xem chi tiết chỉ hiện khi hover */}
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ExternalLink className="h-5 w-5 text-white" />
                    </div>

                    {/* Phần thông tin chữ */}
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

            {/* === Nội dung Tab Tiện ích xung quanh (Giữ nguyên thiết kế cũ) === */}
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
