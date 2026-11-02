import React, { useState } from "react";
import { useSite } from "../context/SiteContext";
import {
  Utensils,
  Plus,
  Minus,
  Check,
  Truck,
  MapPin,
  Clock,
  Calendar,
  MessageSquare,
  ShoppingBag,
  Info,
  Phone,
  Store,
  Copy,
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
      'Không gian sạch sẽ, thưởng thức trọn vẹn <span className="whitespace-nowrap">"Hương mộc mạc, vị tự nhiên"</span> của gạo Bách Mộc và nông sản thuần tự nhiên.',
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

// Danh mục các món trong thực đơn (Không giá, không hình ảnh - từ poster menu)
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
  onAddToCart: (product: Product) => void;
}

export const ExperienceMealBuilder: React.FC<ExperienceMealBuilderProps> = ({
  onAddToCart,
}) => {
  const { siteData } = useSite();

  // State: số lượng từng set cơm (79k, 99k, 59k)
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // State: các món khách mong muốn ăn kèm (tùy chọn)
  const [selectedDishes, setSelectedDishes] = useState<string[]>([]);

  // State: modal xem ảnh poster menu gốc
  const [showPosterModal, setShowPosterModal] = useState<boolean>(false);

  // Delivery / Dine in states
  const [diningMode, setDiningMode] = useState<"dine_in" | "delivery" | null>(
    null,
  );
  const todayIsoDate = React.useMemo(
    () => new Date().toISOString().split("T")[0],
    [],
  );
  const [reservationDate, setReservationDate] = useState<string>(todayIsoDate);
  const [reservationTime, setReservationTime] = useState<string>("12:00");
  const [selectedStation, setSelectedStation] = useState<string>(
    "BiO Station Phú Mỹ Hưng (124 Nguyễn Đức Cảnh, Q.7)",
  );
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  const [deliveryPhone, setDeliveryPhone] = useState<string>("");
  const [orderNotes, setOrderNotes] = useState<string>("");
  const [added, setAdded] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  // Sync main meal sets from config if available, or fallback
  const mainMeals = React.useMemo(() => {
    const configDishes = (siteData.experienceMealConfig?.dishes || []).filter(
      (d) => d.category === "Cơm" || (d.price && d.price > 0),
    );
    if (configDishes.length >= 3) {
      return configDishes.map((cd) => {
        const fallback = DEFAULT_MAIN_MEAL_SETS.find((f) => f.id === cd.id);
        return {
          id: cd.id,
          name: cd.name,
          price: cd.price || 0,
          badge: fallback?.badge || "Khẩu Phần Cơm",
          image: cd.image || fallback?.image || "/mam-com-trai-nghiem.jpg",
          flavor: cd.flavor || fallback?.flavor || "",
          details: fallback?.details || [],
        };
      });
    }
    return DEFAULT_MAIN_MEAL_SETS;
  }, [siteData.experienceMealConfig?.dishes]);

  // Quantity controllers
  const handleIncrease = (id: string) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleDecrease = (id: string) => {
    setQuantities((prev) => {
      const current = prev[id] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: current - 1 };
    });
  };

  // Toggle dish preference
  const toggleDishPreference = (dishName: string) => {
    setSelectedDishes((prev) =>
      prev.includes(dishName)
        ? prev.filter((d) => d !== dishName)
        : [...prev, dishName],
    );
  };

  // Calculate totals
  let grandTotal = 0;
  let totalSetsCount = 0;
  const selectedSetsSummary: { name: string; qty: number; total: number }[] = [];

  mainMeals.forEach((meal) => {
    const qty = quantities[meal.id] || 0;
    if (qty > 0) {
      const lineTotal = meal.price * qty;
      grandTotal += lineTotal;
      totalSetsCount += qty;
      selectedSetsSummary.push({
        name: meal.name,
        qty,
        total: lineTotal,
      });
    }
  });

  // Sao chép đơn hàng gửi Zalo
  const handleCopyOrder = () => {
    if (totalSetsCount === 0 && selectedDishes.length === 0) {
      alert("Vui lòng chọn số lượng suất cơm hoặc các món mong muốn!");
      return;
    }

    const setsText = selectedSetsSummary
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.name} (x${item.qty}) = ${item.total.toLocaleString("vi-VN")}đ`,
      )
      .join("\n");

    const preferredText =
      selectedDishes.length > 0
        ? `\n👉 Món muốn ăn kèm đã chọn:\n- ${selectedDishes.join(", ")}`
        : "";

    const copyText = `DANH SÁCH ĐẶT CƠM TẠI BIO STATION:
${setsText || "Chưa chọn số lượng suất cụ thể"}
${preferredText}
----------------------------------------
Tổng dự tính: ${grandTotal.toLocaleString("vi-VN")} VNĐ
Địa chỉ trạm: 336 Lương Văn Nho, Cần Giờ
Hotline: ${siteData.paymentConfig?.offlineCallPhone || siteData.paymentConfig?.supportPhone || siteData.brandConfig?.hotline || "0388 500 500"}`;

    navigator.clipboard.writeText(copyText);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  // Đặt hàng online (khi tính năng thanh toán online BẬT)
  const handleAddToCart = () => {
    if (totalSetsCount === 0) {
      alert("Vui lòng chọn ít nhất 1 suất cơm!");
      return;
    }

    const dishListSummary = selectedSetsSummary.map(
      (item) => `${item.name} (x${item.qty}) - ${item.total.toLocaleString("vi-VN")}đ`,
    );

    if (selectedDishes.length > 0) {
      dishListSummary.push(`Món ăn kèm ưu thích: ${selectedDishes.join(", ")}`);
    }

    const formattedDateText = formatVietnameseDate(reservationDate);
    const diningSummary =
      diningMode === "dine_in"
        ? `Ăn tại chỗ: ${selectedStation} vào ${formattedDateText} lúc ${reservationTime}`
        : `Giao tận nơi: ${deliveryAddress} (SĐT: ${deliveryPhone}) - ${formattedDateText} lúc ${reservationTime}`;

    const customProduct: Product = {
      id: `order-meal-${Date.now()}`,
      name: `Đơn Cơm Hữu Cơ Bách Mộc (${totalSetsCount} suất)`,
      subtitle: `${diningMode === "dine_in" ? "Ăn tại chỗ Trạm BiO" : "Giao hàng tận nơi"}`,
      category: "Bữa Ăn Trải Nghiệm",
      price: grandTotal,
      rating: 5.0,
      reviewCount: 1520,
      badge: `TỔNG CỘNG: ${grandTotal.toLocaleString("vi-VN")}đ`,
      image: "/mam-com-trai-nghiem.jpg",
      description: `Chi tiết: ${diningSummary}. Ghi chú: ${orderNotes || "Không có"}.`,
      keyBenefits: [
        `Tổng cộng ${totalSetsCount} suất cơm`,
        `Thành tiền: ${grandTotal.toLocaleString("vi-VN")}đ`,
        `Hình thức: ${diningMode === "dine_in" ? "Ăn tại chỗ" : "Giao tận nơi"}`,
      ],
      origin: "Bếp Trải Nghiệm BiO Station - Cần Giờ",
      certification: "Tiêu chuẩn BMQ",
      bmqNote: "100% gạo Bách Mộc hữu cơ, canh tác thuận tự nhiên.",
      dishSampleList: dishListSummary,
      flavorProfile: orderNotes ? `Ghi chú: ${orderNotes}` : "",
    };

    onAddToCart(customProduct);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    setQuantities({});
    setSelectedDishes([]);
  };

  const rawHotline =
    siteData.paymentConfig?.offlineCallPhone ||
    siteData.paymentConfig?.supportPhone ||
    siteData.brandConfig?.hotline ||
    "0388 500 500";
  const hotlineNum =
    rawHotline.includes("0813") || !rawHotline ? "0388 500 500" : rawHotline;

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
              <span className="whitespace-nowrap">Trải nghiệm 79.000đ – 99.000đ</span> • <span className="whitespace-nowrap">Cơm văn phòng 59.000đ</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-emerald-100/95 leading-relaxed max-w-3xl">
            Không gian sạch sẽ, thưởng thức trọn vẹn{" "}
            <strong className="text-amber-300 font-serif">
              "Hương mộc mạc, vị tự nhiên"
            </strong>{" "}
            của gạo Bách Mộc và nông sản thuần tự nhiên.
          </p>

          <div className="pt-2 border-t border-white/15 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-emerald-100">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>336 Lương Văn Nho, Xã Cần Giờ (D51 Khu Dân cư Phước Lộc)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Hotline đặt món: {hotlineNum}</span>
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
                <span>CHỌN KHẨU PHẦN CƠM HỮU CƠ</span>
              </h3>
              <p className="text-xs text-[#7a6858] mt-0.5">
                Bao gồm 3 lựa chọn mâm cơm trải nghiệm & cơm văn phòng hộp giấy thân thiện
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {mainMeals.map((meal) => {
              const qty = quantities[meal.id] || 0;
              return (
                <div
                  key={meal.id}
                  className={`flex flex-col rounded-3xl border transition-all overflow-hidden bg-white ${
                    qty > 0
                      ? "border-[#274e23] ring-2 ring-[#274e23]/30 shadow-lg scale-[1.01]"
                      : "border-[#e2d5c3] hover:border-amber-500/70 shadow-sm hover:shadow-md"
                  }`}
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

                    {/* PHẦN GIÁ TO RÕ: Nằm dưới phần chi tiết thông tin, trên phần số lượng */}
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

                    {/* Quantity Control Selector */}
                    <div className="pt-2.5 border-t border-[#f0e6d8] flex items-center justify-between">
                      <span className="text-xs font-bold text-[#5c4d43]">
                        Số lượng đặt:
                      </span>

                      <div className="flex items-center gap-2 p-1 rounded-xl border border-[#dcd0bf] bg-[#f8f5f0]">
                        <button
                          type="button"
                          onClick={() => handleDecrease(meal.id)}
                          disabled={qty === 0}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                            qty > 0
                              ? "bg-white text-[#274e23] hover:bg-[#e4d6c2] shadow-sm cursor-pointer"
                              : "text-gray-300 cursor-not-allowed"
                          }`}
                          aria-label="Giảm số lượng"
                        >
                          <Minus className="w-4 h-4 stroke-[3]" />
                        </button>

                        <span className="w-7 text-center font-bold text-sm text-[#274e23]">
                          {qty}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleIncrease(meal.id)}
                          className="w-8 h-8 rounded-lg bg-[#274e23] hover:bg-[#1e3e1a] text-white shadow-sm flex items-center justify-center transition-all cursor-pointer"
                          aria-label="Tăng số lượng"
                        >
                          <Plus className="w-4 h-4 stroke-[3]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* KHỐI 2: CÁC MÓN TRONG THỰC ĐƠN (KHÔNG GIÁ, KHÔNG HÌNH ẢNH) */}
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

            <span className="text-[11px] font-semibold text-[#7a6858] bg-white/70 px-3 py-1.5 rounded-full border border-[#dcd0bf]">
              💡 Bấm vào tên món để đánh dấu món bạn muốn ăn kèm
            </span>
          </div>

          {/* 5 Menu Groups */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {MENU_DISH_GROUPS.map((group) => (
              <div
                key={group.id}
                className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-[#dcd0bf] shadow-sm flex flex-col space-y-3"
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
                  {group.dishes.map((dishName) => {
                    const isSelected = selectedDishes.includes(dishName);
                    return (
                      <li key={dishName}>
                        <button
                          type="button"
                          onClick={() => toggleDishPreference(dishName)}
                          className={`w-full text-left p-2 rounded-xl text-xs transition-all flex items-center justify-between gap-1.5 cursor-pointer ${
                            isSelected
                              ? "bg-[#274e23] text-white font-bold shadow-sm"
                              : "text-[#3d3229] hover:bg-amber-100/60 font-medium"
                          }`}
                        >
                          <span className="truncate">{dishName}</span>
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Selected Dish Summary Pill */}
          {selectedDishes.length > 0 && (
            <div className="bg-white p-3 rounded-2xl border border-emerald-300 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex flex-wrap items-center gap-1.5 text-[#274e23]">
                <strong className="font-serif">Món ăn kèm đã chọn ({selectedDishes.length}):</strong>
                {selectedDishes.map((d) => (
                  <span
                    key={d}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 text-[11px] font-semibold"
                  >
                    {d}
                    <button
                      type="button"
                      onClick={() => toggleDishPreference(d)}
                      className="hover:text-red-700 ml-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setSelectedDishes([])}
                className="text-[11px] text-gray-500 hover:text-red-600 underline cursor-pointer"
              >
                Xóa chọn
              </button>
            </div>
          )}
        </div>

        {/* HÌNH THỨC TRẢI NGHIỆM - CHỈ HIỂN THỊ KHI BẬT THANH TOÁN / ĐẶT HÀNG ONLINE */}
        {siteData.paymentConfig?.isOnlinePaymentEnabled && (
          <div className="bg-[#f2e9dc] p-5 rounded-2xl border border-[#dcd0bf]">
            <h4 className="font-bold font-serif text-base text-[#274e23] mb-4">
              Chọn Hình Thức Nhận Đơn
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <button
                type="button"
                onClick={() => setDiningMode("dine_in")}
                className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-colors ${diningMode === "dine_in" ? "bg-[#274e23] text-white border-[#274e23] shadow-md" : "bg-white text-[#2d241e] border-[#dcd0bf] hover:border-[#274e23]"}`}
              >
                <Utensils
                  className={`w-6 h-6 ${diningMode === "dine_in" ? "text-amber-400" : "text-[#274e23]"}`}
                />
                <div>
                  <div className="font-bold text-sm">
                    Ăn Tại Bếp / Lấy Tại Quầy
                  </div>
                  <div
                    className={`text-xs mt-1 ${diningMode === "dine_in" ? "text-emerald-100" : "text-gray-500"}`}
                  >
                    Dùng bữa trực tiếp hoặc ghé lấy.
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setDiningMode("delivery")}
                className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-colors ${diningMode === "delivery" ? "bg-[#274e23] text-white border-[#274e23] shadow-md" : "bg-white text-[#2d241e] border-[#dcd0bf] hover:border-[#274e23]"}`}
              >
                <Truck
                  className={`w-6 h-6 ${diningMode === "delivery" ? "text-amber-400" : "text-[#274e23]"}`}
                />
                <div>
                  <div className="font-bold text-sm">Giao Hàng Tận Nơi</div>
                  <div
                    className={`text-xs mt-1 ${diningMode === "delivery" ? "text-emerald-100" : "text-gray-500"}`}
                  >
                    Giao nóng sốt tận nhà.
                  </div>
                </div>
              </button>
            </div>

            {diningMode === "dine_in" && (
              <div className="bg-white p-4 rounded-xl border border-[#dcd0bf] space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#5c4d43] mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> Chọn Trạm BiO Station:
                  </label>
                  <select
                    value={selectedStation}
                    onChange={(e) => setSelectedStation(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#dcd0bf] text-sm"
                  >
                    <option>
                      BiO Station Phú Mỹ Hưng (124 Nguyễn Đức Cảnh, Q.7)
                    </option>
                    <option>
                      BiO Station Cần Giờ (336 Lương Văn Nho, Xã Cần Giờ)
                    </option>
                    <option>
                      BiO Station Thảo Điền (32 Trần Ngọc Diện, Q.2)
                    </option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#5c4d43] mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> Ngày Hẹn:
                    </label>
                    <input
                      type="date"
                      value={reservationDate}
                      onChange={(e) => setReservationDate(e.target.value)}
                      min={todayIsoDate}
                      className="w-full p-2.5 rounded-lg border border-[#dcd0bf] text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#5c4d43] mb-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> Giờ Tới:
                    </label>
                    <input
                      type="time"
                      value={reservationTime}
                      onChange={(e) => setReservationTime(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-[#dcd0bf] text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {diningMode === "delivery" && (
              <div className="bg-white p-4 rounded-xl border border-[#dcd0bf] space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#5c4d43] mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> Địa chỉ giao hàng:
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Nhập số nhà, tên đường, phường, quận..."
                    className="w-full p-2.5 rounded-lg border border-[#dcd0bf] text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#5c4d43] mb-1 flex items-center gap-1.5">
                    Số điện thoại người nhận:
                  </label>
                  <input
                    type="tel"
                    value={deliveryPhone}
                    onChange={(e) => setDeliveryPhone(e.target.value)}
                    placeholder="09x..."
                    className="w-full p-2.5 rounded-lg border border-[#dcd0bf] text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#5c4d43] mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> Ngày Giao:
                    </label>
                    <input
                      type="date"
                      value={reservationDate}
                      onChange={(e) => setReservationDate(e.target.value)}
                      min={todayIsoDate}
                      className="w-full p-2.5 rounded-lg border border-[#dcd0bf] text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#5c4d43] mb-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> Giờ Giao:
                    </label>
                    <input
                      type="time"
                      value={reservationTime}
                      onChange={(e) => setReservationTime(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-[#dcd0bf] text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 bg-white p-4 rounded-xl border border-[#dcd0bf]">
              <label className="text-xs font-bold text-[#5c4d43] mb-1 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" /> Ghi Chú Đơn Hàng (Khẩu
                vị, yêu cầu khác):
              </label>
              <input
                type="text"
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="Vd: Không hành, không cay, ít cơm..."
                className="w-full p-2.5 rounded-lg border border-[#dcd0bf] text-sm"
              />
            </div>
          </div>
        )}

        {/* DEPOSIT NOTICE - CHỈ HIỂN THỊ KHI BẬT THANH TOÁN ONLINE */}
        {siteData.paymentConfig?.isOnlinePaymentEnabled &&
          siteData.experienceMealConfig?.depositNoticeText && (
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-900 flex gap-3 items-start shadow-sm">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block mb-1 text-sm text-amber-800">
                  Lưu ý Đặt Cọc & Giữ Chỗ
                </strong>
                <div className="whitespace-pre-wrap leading-relaxed">
                  {siteData.experienceMealConfig.depositNoticeText}
                </div>
              </div>
            </div>
          )}

        {/* ORDER SUMMARY & ACTION FOOTER BAR */}
        <div className="bg-[#274e23] p-5 sm:p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-white w-full md:w-auto">
            <div className="text-sm text-emerald-100 mb-1">
              Tổng Cộng ({totalSetsCount} suất cơm)
            </div>
            <div className="text-3xl font-black text-amber-400">
              {grandTotal.toLocaleString("vi-VN")} VNĐ
            </div>

            {selectedSetsSummary.length > 0 && (
              <div className="mt-2 space-y-1">
                {selectedSetsSummary.map((item, idx) => (
                  <div
                    key={idx}
                    className="text-xs text-emerald-50 flex justify-between gap-4 border-b border-emerald-800/30 pb-1"
                  >
                    <span>
                      {item.name} (x{item.qty})
                    </span>
                    <span className="font-bold">
                      {item.total.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                ))}
              </div>
            )}

            {selectedDishes.length > 0 && (
              <div className="text-[11px] text-amber-200 mt-1 line-clamp-1">
                Ưu thích: {selectedDishes.join(", ")}
              </div>
            )}
          </div>

          {!siteData.paymentConfig?.isOnlinePaymentEnabled ? (
            <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
              <button
                type="button"
                onClick={handleCopyOrder}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs sm:text-sm cursor-pointer transition-all shadow-md"
              >
                {copySuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-950" />
                    <span>Đã Sao Chép Đơn!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-950" />
                    <span>Sao Chép Đơn Gửi Zalo</span>
                  </>
                )}
              </button>

              <a
                href={`tel:${hotlineNum.replace(/\s+/g, "")}`}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 bg-amber-400 text-[#1f381c] hover:bg-amber-300 shadow-xl shadow-amber-900/20 text-xs sm:text-sm cursor-pointer transition-all hover:scale-105"
              >
                <Phone className="w-4 h-4 text-[#1f381c]" />
                <span>Gọi Hotline Đặt Món ({hotlineNum})</span>
              </a>

              <a
                href={
                  siteData.brandConfig?.mapLinkStore ||
                  siteData.brandConfig?.mapLinkCenter ||
                  "https://maps.google.com"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm cursor-pointer transition-all"
              >
                <MapPin className="w-4 h-4 text-amber-300" />
                <span>Đến Trải Nghiệm Tại Trạm</span>
              </a>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={totalSetsCount === 0 || !diningMode}
              className={`w-full md:w-auto px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                added
                  ? "bg-emerald-500 text-white shadow-lg"
                  : totalSetsCount === 0 || !diningMode
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-amber-400 text-[#1f381c] hover:bg-amber-300 shadow-xl shadow-amber-900/20 cursor-pointer"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" /> Đã Lên Đơn Thành Công
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" /> Đặt Hàng Ngay
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* POSTER MODAL LIGHTBOX */}
      {showPosterModal && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in"
          onClick={() => setShowPosterModal(false)}
        >
          <div
            className="relative max-w-2xl max-h-[92vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 bg-[#274e23] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-amber-400" />
                <span className="font-bold text-sm font-serif">
                  Ảnh Poster Menu Gốc BiO Station
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowPosterModal(false)}
                className="p-1 rounded-full hover:bg-white/20 text-white cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Poster Image */}
            <div className="overflow-y-auto flex-1 p-2 bg-[#f0e6d8]">
              <img
                src="/menu-com-huu-co-bach-moc.jpg"
                alt="Poster Menu Cơm Hữu Cơ Bách Mộc"
                className="w-full h-auto rounded-2xl shadow-inner"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-white border-t border-[#e2d5c3] flex items-center justify-between text-xs">
              <span className="text-[#5c4d43]">
                Hotline hỗ trợ: <strong>{hotlineNum}</strong>
              </span>
              <a
                href="/menu-com-huu-co-bach-moc.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 bg-[#274e23] text-white rounded-xl font-bold hover:bg-[#1e3e1a] transition-colors"
              >
                Mở Ảnh To
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
