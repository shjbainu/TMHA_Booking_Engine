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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, ExternalLink } from "lucide-react"
import Image from "next/image"

interface NearbyAmenitiesDrawerProps {
  isOpen: boolean
  onClose: () => void
  hotelName: string
  hotelAddress: string
}

export default function NearbyAmenitiesDrawer({
  isOpen,
  onClose,
  hotelName,
  hotelAddress,
}: NearbyAmenitiesDrawerProps) {
  const [activeTab, setActiveTab] = useState("nearby-amenities")
  const [selectedCategory, setSelectedCategory] = useState("supermarket")

  const categories = [
    { id: "supermarket", name: "Siêu thị bách hóa" },
    { id: "restaurant", name: "Nhà hàng" },
    { id: "cafe", name: "Quán cà phê" },
    { id: "park", name: "Công viên" },
  ]

  const supermarkets = [
    {
      id: "winmart",
      name: "Siêu thị Winmart",
      branches: "3.700 cơ sở",
      hours: "Hoạt động 08:00 - 23:00",
      image: "/public/images/winmart.png",
    },
    {
      id: "go",
      name: "Siêu thị Go!",
      branches: "42 cơ sở",
      hours: "Hoạt động 08:00 - 23:00",
      image: "/public/images/go-supermarket.png",
    },
    {
      id: "lotte",
      name: "Lotte Mart",
      branches: "15 cơ sở",
      hours: "Hoạt động 08:00 - 23:00",
      image: "/public/images/lotte-mart.png",
    },
  ]

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="h-[90vh] flex flex-col">
        <DrawerHeader className="text-center">
          <DrawerTitle className="text-2xl font-bold text-[#0a0a0a]">Tiện ích xung quanh {hotelName}</DrawerTitle>
          <DrawerDescription className="text-sm text-gray-600">
            Khám phá những gì gần khách sạn của chúng tôi
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full bg-black text-white rounded-lg px-4 py-2 text-base font-medium flex items-center justify-between h-12 mb-4"
              >
                {categories.find((cat) => cat.id === selectedCategory)?.name}
                <ChevronDown className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[calc(100%-32px)]">
              {categories.map((category) => (
                <DropdownMenuItem key={category.id} onClick={() => setSelectedCategory(category.id)}>
                  {category.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {selectedCategory === "supermarket" && (
            <>
              <h3 className="text-sm font-bold text-[#0a0a0a] uppercase mb-3">DANH SÁCH SIÊU THỊ BÁCH HÓA</h3>
              <div className="space-y-4">
                {supermarkets.map((item) => (
                  <div key={item.id} className="bg-gray-100 rounded-lg p-4 flex items-center gap-4">
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-[#0a0a0a] text-base">{item.name}</p>
                        <ExternalLink className="h-4 w-4 text-gray-500" />
                      </div>
                      <p className="text-sm text-gray-600">{item.branches}</p>
                      <p className="text-sm text-gray-600">{item.hours}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {/* Add other categories here if needed */}
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
