{/* Main Content Area */}
  <div className="pb-24"> {/* Padding dưới để không bị che bởi thanh điều hướng cố định */}
    
    {/* "Tham quan qua ảnh" Section */}
    <h1 className="text-lg font-semibold text-[#0a0a0a] mt-4 mb-3 px-4">Tham quan qua ảnh</h1>
    <div className="mb-6">
      <div className="overflow-x-auto">
        <div className="flex gap-3 pb-2 px-4"> {/* px-4 để có padding ở hai đầu scroll */}
          {/* Ảnh 1: Resort */}
          <div className="flex-shrink-0">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-1 w-40 sm:w-48">
              <Image
                src={images.ensoSign}
                alt="Resort - Enso Retreat Hoi An"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 160px, 192px"
              />
            </div>
            <p className="text-sm font-medium text-[#0a0a0a]">Resort</p>
          </div>
          {/* Ảnh 2: Phòng Deluxe */}
          <div className="flex-shrink-0">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-1 w-40 sm:w-48">
              <Image
                src={images.deluxeRoom}
                alt="Phòng Deluxe"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 160px, 192px"
              />
            </div>
            <p className="text-sm font-medium text-[#0a0a0a]">Phòng Deluxe</p>
          </div>
          {/* Bạn có thể thêm các ảnh khác vào đây nếu cần */}
        </div>
      </div>
    </div>

    {/* "Không gian chung" Section */}
    <div className="px-4"> {/* Padding ngang cho toàn bộ section */}
        <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3">Không gian chung</h2>
        <div className="space-y-3"> {/* Khoảng cách giữa các hàng ảnh */}
            {/* Ảnh 1: Lớn, ngang (Toàn cảnh) */}
            <div className="relative aspect-video rounded-lg overflow-hidden"> {/* aspect-video cho tỉ lệ 16:9 */}
                <Image
                src={images.aerialView}
                alt="Không gian chung - Toàn cảnh resort"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px" // Ví dụ sizes, điều chỉnh nếu cần
                />
            </div>

            {/* Lưới 2 ảnh nhỏ (Bàn Bida, Spa) */}
            <div className="grid grid-cols-2 gap-3">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                    src={images.billiards}
                    alt="Không gian chung - Bàn Bida"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 384px"
                />
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                    src={images.spa}
                    alt="Không gian chung - Spa"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 384px"
                />
                </div>
            </div>

            {/* Ảnh 3: Lớn, ngang (Hồ bơi) */}
            <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                src={images.poolMain}
                alt="Không gian chung - Hồ bơi"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                />
            </div>

            {/* Lưới 2 ảnh nhỏ khác */}
            <div className="grid grid-cols-2 gap-3">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                    src={images.smallView1}
                    alt="Không gian chung - View 1"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 384px"
                />
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                    src={images.smallView2}
                    alt="Không gian chung - View 2"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 384px"
                />
                </div>
            </div>
        </div>
    </div>
    {/* Phòng Sơn Ca*/}
     <div className="px-4"> {/* Padding ngang cho toàn bộ section */}
        <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3">Phòng Sơn Ca</h2>
        <div className="space-y-3"> {/* Khoảng cách giữa các hàng ảnh */}
            {/* Ảnh 1: Lớn, ngang (Toàn cảnh) */}
            <div className="relative aspect-video rounded-lg overflow-hidden"> {/* aspect-video cho tỉ lệ 16:9 */}
                <Image
                src={images.aerialView}
                alt="Không gian chung - Toàn cảnh resort"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px" // Ví dụ sizes, điều chỉnh nếu cần
                />
            </div>

            {/* Lưới 2 ảnh nhỏ (Bàn Bida, Spa) */}
            <div className="grid grid-cols-2 gap-3">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                    src={images.billiards}
                    alt="Không gian chung - Bàn Bida"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 384px"
                />
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                    src={images.spa}
                    alt="Không gian chung - Spa"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 384px"
                />
                </div>
            </div>

            {/* Ảnh 3: Lớn, ngang (Hồ bơi) */}
            <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                src={images.poolMain}
                alt="Không gian chung - Hồ bơi"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                />
            </div>

            {/* Lưới 2 ảnh nhỏ khác */}
            <div className="grid grid-cols-2 gap-3">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                    src={images.smallView1}
                    alt="Không gian chung - View 1"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 384px"
                />
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                    src={images.smallView2}
                    alt="Không gian chung - View 2"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 384px"
                />
                </div>
            </div>
        </div>
    </div>
    
    {/*
      Các section phòng ("Phòng Sơn Ca", "Phòng Nhật Bản", v.v.) từ code gốc đã được comment lại
      để giao diện khớp với ảnh tham chiếu. Nếu bạn muốn giữ chúng, hãy bỏ comment và đặt vào đây.
      Ví dụ:
      <div className="mt-6 px-4">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-[#0a0a0a] mb-4">Phòng Sơn Ca</h2>
          <div className="columns-2 gap-3 space-y-3">
            { // Code lưới ảnh cho Phòng Sơn Ca }
          </div>
        </div>
        { // Các section phòng khác }
      </div>
    */}

  </div>

  {/* Bottom Navigation */}
  <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-white z-20 border-t border-gray-200">
    <div className="w-full max-w-md">
      <div className="flex items-center justify-around px-1 py-1.5"> {/* Giảm py một chút */}
        <Button variant="ghost" className="h-auto flex flex-col items-center justify-center px-2 py-1.5 text-[#0a0a0a] hover:bg-gray-100 focus:bg-gray-100">
          <Building className="h-5 w-5 mb-0.5" />
          <span className="text-[11px] leading-tight font-medium">Khách sạn</span>
        </Button>
        <Button variant="ghost" className="h-auto flex flex-col items-center justify-center px-2 py-1.5 text-[#0a0a0a] hover:bg-gray-100 focus:bg-gray-100">
          <LayoutGrid className="h-5 w-5 mb-0.5" /> {/* Icon lưới cho Ảnh */}
          <span className="text-[11px] leading-tight font-medium">Ảnh</span>
        </Button>
        <Button variant="ghost" className="h-auto flex flex-col items-center justify-center px-2 py-1.5 text-[#0a0a0a] hover:bg-gray-100 focus:bg-gray-100">
          <Star className="h-5 w-5 mb-0.5" />
          <span className="text-[11px] leading-tight font-medium">Đánh giá</span>
        </Button>
        <Button variant="ghost" className="h-auto flex flex-col items-center justify-center px-2 py-1.5 text-[#0a0a0a] hover:bg-gray-100 focus:bg-gray-100">
          <MoreHorizontal className="h-5 w-5 mb-0.5" />
          <span className="text-[11px] leading-tight font-medium">Thêm</span>
        </Button>
        <Link href="/rooms" passHref legacyBehavior>
          <a className="h-10 w-10 p-0 rounded-lg bg-orange-400 hover:bg-orange-500 shadow-md flex items-center justify-center transform hover:scale-105 transition-transform duration-150">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <rect x="4" y="3" width="12" height="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <circle cx="13" cy="12" r="1" fill="currentColor" />
                <path d="M6 8H14M6 16H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M18 9L21 12L18 15M21 12H16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
          </a>
        </Link>
      </div>
    </div>
  </div>
</div>
