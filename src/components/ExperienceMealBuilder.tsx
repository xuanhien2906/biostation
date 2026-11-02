import React, { useState } from "react";
import { useSite } from "../context/SiteContext";
import {
  Utensils,
  MapPin,
  Phone,
  Store,
  Image as ImageIcon,
  X,
  Sparkles,
} from "lucide-react";
import { Product } from "../types";

export const formatVietnameseDate = (dateStr: string) => {
  if (!dateStr) return "";
  const dateObj = new Date(dateStr + "T00:00:00");
  if (isNaN(dateObj.getTime())) return dateStr;
  const days = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  const dayName = days[dateObj.getDay()];
  const dd = String(dateObj.getDate()).padStart(2, "0");
  const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
  const yyyy = dateObj.getFullYear();
  return `${dayName}, ngày ${dd}/${mm}/${yyyy}`;
};

// 3 Khẩu phần cơm chính (Có giá & có hình ảnh thumbnail)
export const DEFAULT_MAIN_MEAL_SETS = [
  {
    id: "dish-com-trai-nghiem-79",
    name: "Mâm Cơm Trải Nghiệm (79.000đ)",
    price: 79000,
    badge: "Trải Nghiệm Tiêu Chuẩn",
    image: "/mam-com-trai-nghiem.jpg",
    flavor:
      'Không gian sạch sẽ, thưởng thức trọn vẹn "Hương mộc mạc, vị tự nhiên" của gạo Bách Mộc và nông sản thuần tự nhiên.',
    details: [
      "Gạo hữu cơ Bách Mộc thơm dẻo",
      "Món mặn kho / chiên thuần tự nhiên",
      "Rau luộc / xào theo mùa & nước canh thanh mát",
      "Cà pháo, dưa cải muối chua & tráng miệng hoa quả",
    ],
  },
  {
    id: "dish-com-trai-nghiem-99",
    name: "Mâm Cơm Trải Nghiệm (Đặc Biệt 99.000đ)",
    price: 99000,
    badge: "Trải Nghiệm Đặc Biệt",
    image: "/mam-com-trai-nghiem.jpg",
    flavor:
      "Thịnh soạn hơn với món mặn cao cấp (cá dứa Cần Giờ, thịt quay...), canh củ quả hầm dinh dưỡng & tráng miệng hoa quả tươi theo ngày.",
    details: [
      "Gạo hữu cơ Bách Mộc cao cấp tuyển chọn",
      "Món mặn thượng hạng: Cá dứa Cần Giờ, thịt quay, gà ta...",
      "Canh hầm củ quả dinh dưỡng",
      "Kèm đầy đủ rau xanh hữu cơ, dưa cà & tráng miệng",
    ],
  },
  {
    id: "dish-com-van-phong-59",
    name: "Cơm Văn Phòng Hộp Giấy (59.000đ)",
    price: 59000,
    badge: "Hộp Giấy Thân Thiện",
    image: "/com-van-phong.jpg",
    flavor:
      "Cơm hữu cơ, đầy đặn, món phong phú, tươi ngon. Hộp giấy thân thiện môi trường, thích hợp mang đi, ship tận nơi (Có thể điều chỉnh +/- 20% theo yêu cầu của Quý khách hàng).",
    details: [
      "Hộp giấy sinh học 5 ngăn sang trọng, giữ nhiệt tốt",
      "Cơm hữu cơ mềm dẻo, 1 món mặn, 1 món xào/luộc, canh & món kèm",
      "Thích hợp đặt cơm trưa văn phòng, hội họp, giao tận nơi",
      "Hỗ trợ điều chỉnh định lượng (+/- 20%) theo yêu cầu",
    ],
  },
];

// Danh mục các món trong thực đơn CHUẨN XÁC TỪ POSTER MENU GỐC (21 món - 5 nhóm)
export const MENU_DISH_GROUPS = [
  {
    id: "group-ca",
    category: "CÁ",
    icon: "🐟",
    dishes: [
      "Cá trắm kho riềng",
      "Cá chiên",
      "Cá nục kho dứa",
      "Cá dứa Cần Giờ",
      "Cá basa kho",
    ],
  },
  {
    id: "group-ga",
    category: "GÀ",
    icon: "🍗",
    dishes: ["Gà rang gừng", "Cánh gà chiên nước mắm"],
  },
  {
    id: "group-dau",
    category: "ĐẬU",
    icon: "🥢",
    dishes: ["Đậu chiên", "Đậu sốt cà chua", "Đậu tẩm hành"],
  },
  {
    id: "group-thit",
    category: "THỊT",
    icon: "🥩",
    dishes: [
      "Thịt kho tàu",
      "Thịt luộc",
      "Thịt ba chỉ rang cháy cạnh",
      "Thịt chiên",
      "Thịt quay",
    ],
  },
  {
    id: "group-rau-khac",
    category: "RAU & MÓN KHÁC",
    icon: "🥗",
    dishes: [
      "Rau theo mùa (luộc/xào)",
      "Canh theo ngày",
      "Trứng (luộc/kho)",
      "Dưa muối",
      "Nước chấm nhà làm",
      "Tráng miệng (theo ngày)",
    ],
  },
];

interface ExperienceMealBuilderProps {
  onAddToCart?: (product: Product) => void;
}

export const ExperienceMealBuilder: React.FC<ExperienceMealBuilderProps> = () => {
  const { siteData } = useSite();

  // State: modal xem ảnh poster menu gốc
  const [showPosterModal, setShowPosterModal] = useState<boolean>(false);

  // Sync main meal sets from config
  const mainMeals = React.useMemo(() => {
    const allConfigDishes = siteData.experienceMealConfig?.dishes || [];
    const mainConfigDishes = allConfigDishes.filter(
      (d) => d.category === "Cơm" || d.isMain === true
    );
    if (mainConfigDishes.length > 0) {
      return mainConfigDishes.map((cd) => {
        const fallback = DEFAULT_MAIN_MEAL_SETS.find((f) => f.id === cd.id);
        return {
          id: cd.id,
          name: cd.name,
          price: cd.price ?? fallback?.price ?? 0,
          badge: fallback?.badge || cd.category || "Khẩu Phần Cơm",
          image: cd.image || fallback?.image || "/mam-com-trai-nghiem.jpg",
          flavor: cd.flavor || fallback?.flavor || "",
          details: fallback?.details || (cd.origin ? [cd.origin] : []),
        };
      });
    }
    return DEFAULT_MAIN_MEAL_SETS;
  }, [siteData.experienceMealConfig?.dishes]);

  // Nhóm món ăn chuẩn poster (Đảm bảo không chứa món cũ, không có)
  const menuGroups = React.useMemo(() => {
    return MENU_DISH_GROUPS;
  }, []);

  const rawHotline =
    siteData.paymentConfig?.offlineCallPhone ||
    siteData.paymentConfig?.supportPhone ||
    siteData.brandConfig?.hotline ||
    "0388 500 500";
  const hotlineNum =
    rawHotline.includes("0813") || !rawHotline ? "0388 500 500" : rawHotline;

  const mapUrl =
    siteData.brandConfig?.mapLinkStore ||
    siteData.brandConfig?.mapLinkCenter ||
    "https://www.google.com/maps/search/?api=1&query=336+L%C6%B0%C6%A1ng+V%C4%83n+Nho,+C%E1%BA%A7n+Gi%E1%BB%9D,+TP.+H%E1%BB%93+Ch%C3%AD+Minh";

  return (
    <div className="bg-[#fbf9f5] rounded-3xl border border-[#e2d5c3] shadow-xl overflow-hidden text-[#2d241e]">
      {/* HEADER BANNER - Chuẩn Poster Bách Mộc */}
      <div className="bg-gradient-to-br from-[#1a3517] via-[#244b20] to-[#142912] p-6 sm:p-9 text-white relative overflow-hidden">
        {/* Subtle decorative leaves watermark */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>BiO Station • Chạm để trở về</span>
            </div>

            <button
              type="button"
              onClick={() => setShowPosterModal(true)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-emerald-100 hover:text-white border border-white/20 text-xs font-bold transition-all cursor-pointer shadow-sm"
            >
              <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>Xem Ảnh Menu Poster Gốc</span>
            </button>
          </div>

          <div>
            <h2 className="text-2xl sm:text-4xl font-black font-serif text-white tracking-tight leading-tight">
              MENU CƠM HỮU CƠ BÁCH MỘC
            </h2>
            <div className="text-amber-300 font-serif italic text-lg sm:text-xl font-bold mt-1">
              <span className="whitespace-nowrap">Trải nghiệm 79.000đ – 99.000đ</span> •{" "}
              <span className="whitespace-nowrap">Cơm văn phòng 59.000đ</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-emerald-100/95 leading-relaxed max-w-3xl">
            Không gian sạch sẽ, thưởng thức trọn vẹn{" "}
            <strong className="text-amber-300 font-serif">
              "Hương mộc mạc, vị tự nhiên"
            </strong>{" "}
            của gạo Bách Mộc và nông sản thuần tự nhiên.
          </p>

          {/* TÍN HIỆU MỜI TRẢI NGHIỆM TRỰC TIẾP */}
          <div className="mt-4 pt-4 border-t border-white/20 bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-amber-400/30 shadow-inner">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 text-amber-300 font-extrabold text-xs sm:text-sm uppercase tracking-wide">
                  <Store className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Mời Quý Khách Tới Trải Nghiệm Trực Tiếp Tại BiO Station Cần Giờ</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-50 font-medium leading-relaxed">
                  📍 Địa chỉ: <strong>336 Lương Văn Nho, Xã Cần Giờ (D51 Khu Dân cư Phước Lộc), TP. HCM</strong>
                </p>
                <p className="text-[11px] sm:text-xs text-amber-200/90">
                  Thưởng thức trực tiếp bữa cơm hữu cơ nóng hổi, trà thảo mộc & cảm nhận nông sản thuần tự nhiên (07:00 – 21:00 hàng ngày).
                </p>
              </div>

              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full lg:w-auto shrink-0">
                <a
                  href={`tel:${hotlineNum.replace(/\s+/g, "")}`}
                  className="flex-1 sm:flex-initial px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
                >
                  <Phone className="w-4 h-4 fill-slate-950" />
                  <span>Gọi: {hotlineNum}</span>
                </a>
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-4 py-3 rounded-xl bg-white hover:bg-emerald-50 text-[#274e23] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
                >
                  <MapPin className="w-4 h-4 text-red-600" />
                  <span>Xem Vị Trí Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-7 space-y-8">
        {/* KHỐI 1: 3 GÓI CƠM CHÍNH (CÓ GIÁ VÀ HÌNH ẢNH THUMBNAIL) */}
        <div>
          <div className="flex items-center justify-between mb-4 border-b border-[#e2d5c3] pb-2">
            <div>
              <h3 className="text-lg sm:text-xl font-black font-serif text-[#274e23] flex items-center gap-2">
                <Utensils className="w-5 h-5 text-amber-600" />
                <span>CÁC KHẨU PHẦN CƠM HỮU CƠ</span>
              </h3>
              <p className="text-xs text-[#7a6858] mt-0.5">
                Bao gồm 3 lựa chọn mâm cơm trải nghiệm & cơm văn phòng hộp giấy thân thiện
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {mainMeals.map((meal) => (
              <div
                key={meal.id}
                className="flex flex-col rounded-3xl border border-[#e2d5c3] hover:border-[#274e23] transition-all overflow-hidden bg-white shadow-sm hover:shadow-md"
              >
                {/* Thumbnail Image */}
                <div className="relative aspect-[16/10] bg-[#f0e6d8] overflow-hidden group">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#274e23] text-white text-[11px] font-black px-2.5 py-1 rounded-lg shadow-md uppercase tracking-wider">
                    {meal.badge}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 sm:p-5 flex flex-col flex-1 space-y-3">
                  <div>
                    <h4 className="font-bold text-base text-[#274e23] font-serif leading-snug">
                      {meal.name}
                    </h4>
                    <p className="text-xs text-[#5c4d43] mt-1.5 leading-relaxed">
                      {meal.flavor}
                    </p>
                  </div>

                  {/* Bullet features */}
                  {meal.details && meal.details.length > 0 && (
                    <div className="bg-[#fcfaf7] p-3 rounded-xl border border-[#f0e6d8] space-y-1 text-[11px] text-[#6b584a]">
                      {meal.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <span className="text-amber-600 font-bold">•</span>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* PHẦN GIÁ TO RÕ */}
                  <div className="mt-auto pt-2">
                    <div className="bg-gradient-to-r from-[#fff9f0] to-[#fff3e0] border border-amber-300/80 rounded-2xl px-4 py-3 flex items-center justify-between shadow-xs">
                      <div>
                        <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#7a6858] block">
                          Đơn Giá
                        </span>
                        <span className="text-[10px] text-amber-900 font-medium">
                          {meal.id === "dish-com-van-phong-59"
                            ? "±20% theo yêu cầu"
                            : "Khẩu phần đầy đủ"}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-2xl sm:text-3xl font-black text-[#c2410c] tracking-tight">
                          {meal.price.toLocaleString("vi-VN")}
                        </span>
                        <span className="text-base font-black text-[#c2410c]">đ</span>
                        <span className="text-xs font-semibold text-[#7a6858] ml-0.5">/ suất</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* KHỐI 2: CÁC MÓN TRONG THỰC ĐƠN (KHÔNG GIÁ, KHÔNG HÌNH ẢNH - CHUẨN POSTER GỐC) */}
        <div className="bg-gradient-to-b from-[#f5ede1] to-[#eedfcb] p-5 sm:p-7 rounded-3xl border border-[#dcd0bf] shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#d8c5b0] pb-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-600" />
                <span>Nông Sản & Thực Phẩm Thuần Tự Nhiên</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-serif text-[#274e23] mt-0.5 flex items-center gap-2">
                <span>CÁC MÓN TRONG THỰC ĐƠN</span>
              </h3>
              <p className="text-xs text-[#5c4d43] mt-1">
                Các món ăn truyền thống được chế biến luân phiên hàng ngày phục vụ kèm theo các set cơm (không tính giá lẻ từng món).
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowPosterModal(true)}
              className="text-[11px] font-bold text-[#274e23] hover:text-amber-800 bg-white/80 hover:bg-white px-3 py-1.5 rounded-full border border-[#dcd0bf] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
              <span>Xem Menu Poster Gốc</span>
            </button>
          </div>

          {/* 5 Menu Groups */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {menuGroups.map((group) => (
              <div
                key={group.id}
                className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl border border-[#dcd0bf] shadow-sm flex flex-col space-y-3"
              >
                {/* Group Title Badge */}
                <div className="flex items-center justify-between border-b border-[#f0e6d8] pb-2">
                  <span className="font-black text-sm font-serif text-[#274e23] tracking-wide flex items-center gap-1.5">
                    <span>{group.icon}</span>
                    <span>{group.category}</span>
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                    {group.dishes.length} món
                  </span>
                </div>

                {/* Dish List */}
                <ul className="space-y-1.5 flex-1">
                  {group.dishes.map((dishName) => (
                    <li
                      key={dishName}
                      className="text-xs text-[#3d3229] font-medium flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-amber-50/70 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#274e23] shrink-0" />
                      <span className="truncate">{dishName}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* KHỐI 3: TÍN HIỆU MỜI TRẢI NGHIỆM TRỰC TIẾP TẠI TRẠM CAN GIO (THAY THẾ CHO HỘP TÍNH TIỀN) */}
        <div className="bg-gradient-to-r from-[#1b3618] via-[#244b20] to-[#142912] p-5 sm:p-7 rounded-3xl text-white shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 border border-amber-400/30">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
              <Store className="w-3.5 h-3.5 text-amber-300" />
              <span>Trải Nghiệm Trực Tiếp Tại BiO Station Cần Giờ</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-black font-serif text-white">
              Kính Mời Quý Khách Đến Thưởng Thức Bữa Cơm Thuần Tự Nhiên
            </h4>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed max-w-2xl">
              📍 <strong>Địa chỉ:</strong> 336 Lương Văn Nho, Xã Cần Giờ (D51 Khu Dân cư Phước Lộc), TP. Hồ Chí Minh
              <br />
              📞 <strong>Hotline tư vấn & đặt bàn trước:</strong>{" "}
              <a
                href={`tel:${hotlineNum.replace(/\s+/g, "")}`}
                className="font-black text-amber-300 underline"
              >
                {hotlineNum}
              </a>{" "}
              (Phục vụ 07:00 – 21:00 hàng ngày)
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto shrink-0">
            <a
              href={`tel:${hotlineNum.replace(/\s+/g, "")}`}
              className="flex-1 lg:flex-initial px-5 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
            >
              <Phone className="w-4 h-4 fill-slate-950" />
              <span>Gọi: {hotlineNum}</span>
            </a>
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 lg:flex-initial px-5 py-3.5 rounded-xl bg-white hover:bg-emerald-50 text-[#274e23] font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
            >
              <MapPin className="w-4 h-4 text-red-600" />
              <span>Vị Trí Google Maps</span>
            </a>
            <button
              type="button"
              onClick={() => setShowPosterModal(true)}
              className="flex-1 lg:flex-initial px-4 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
            >
              <ImageIcon className="w-4 h-4 text-amber-300" />
              <span>Ảnh Poster Gốc</span>
            </button>
          </div>
        </div>
      </div>

      {/* POSTER MODAL LIGHTBOX */}
      {showPosterModal && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in"
          onClick={() => setShowPosterModal(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#1f381c] rounded-3xl overflow-hidden shadow-2xl border border-emerald-700/50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 bg-[#142912] text-white border-b border-emerald-800">
              <div className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-amber-400" />
                <h3 className="font-serif font-bold text-sm sm:text-base text-amber-200">
                  Menu Cơm Hữu Cơ Bách Mộc – BiO Station (Poster Gốc)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPosterModal(false)}
                className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-2 sm:p-4 max-h-[82vh] overflow-y-auto flex items-center justify-center bg-[#0d1b0c]">
              <img
                src="/menu-com-huu-co-bach-moc.jpg"
                alt="Menu Cơm Hữu Cơ Bách Mộc"
                className="w-full h-auto max-h-[78vh] object-contain rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
