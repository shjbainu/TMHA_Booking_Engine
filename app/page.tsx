{/* "Không gian chung" Section */}
        <div className="px-4"> {/* Padding ngang cho toàn bộ section */}
            <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3">Không gian chung</h2>
            <div className="space-y-3"> {/* Khoảng cách giữa các hàng ảnh */}
                {/* Ảnh 1: Lớn, ngang (Toàn cảnh) */}
                <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                    src={images.aerialView}
                    alt="Không gian chung - Toàn cảnh resort"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px"
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
         <div className="px-4 mt-6"> {/* THÊM mt-6 VÀO ĐÂY ĐỂ TẠO KHOẢNG CÁCH */}
            <h2 className="text-lg font-semibold text-[#0a0a0a] mb-3">Phòng Sơn Ca</h2>
            <div className="space-y-3"> {/* Khoảng cách giữa các hàng ảnh */}
                {/* Ảnh 1: Lớn, ngang (Toàn cảnh) - LƯU Ý: BẠN NÊN THAY BẰNG ẢNH CỦA PHÒNG SƠN CA */}
                <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                    src={images.aerialView} // THAY ĐỔI ẢNH NÀY
                    alt="Phòng Sơn Ca - Ảnh 1" // THAY ĐỔI ALT TEXT
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px"
                    />
                </div>

                {/* Lưới 2 ảnh nhỏ - LƯU Ý: BẠN NÊN THAY BẰNG ẢNH CỦA PHÒNG SƠN CA */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                        src={images.billiards} // THAY ĐỔI ẢNH NÀY
                        alt="Phòng Sơn Ca - Ảnh 2" // THAY ĐỔI ALT TEXT
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 384px"
                    />
                    </div>
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                        src={images.spa} // THAY ĐỔI ẢNH NÀY
                        alt="Phòng Sơn Ca - Ảnh 3" // THAY ĐỔI ALT TEXT
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 384px"
                    />
                    </div>
                </div>

                {/* Ảnh 3: Lớn, ngang - LƯU Ý: BẠN NÊN THAY BẰNG ẢNH CỦA PHÒNG SƠN CA */}
                <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                    src={images.poolMain} // THAY ĐỔI ẢNH NÀY
                    alt="Phòng Sơn Ca - Ảnh 4" // THAY ĐỔI ALT TEXT
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px"
                    />
                </div>

                {/* Lưới 2 ảnh nhỏ khác - LƯU Ý: BẠN NÊN THAY BẰNG ẢNH CỦA PHÒNG SƠN CA */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                        src={images.smallView1} // THAY ĐỔI ẢNH NÀY
                        alt="Phòng Sơn Ca - Ảnh 5" // THAY ĐỔI ALT TEXT
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 384px"
                    />
                    </div>
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                        src={images.smallView2} // THAY ĐỔI ẢNH NÀY
                        alt="Phòng Sơn Ca - Ảnh 6" // THAY ĐỔI ALT TEXT
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 384px"
                    />
                    </div>
                </div>
            </div>
        </div>
