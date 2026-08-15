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

interface OrderItem {
  id: string;
  name: string;
  price: number;
  image?: string;
}

// Menu items will be fetched dynamically from SiteContext

interface ExperienceMealBuilderProps {
  onAddToCart: (product: Product) => void;
}

export const ExperienceMealBuilder: React.FC<ExperienceMealBuilderProps> = ({
  onAddToCart,
}) => {
  const [activeTab, setActiveTab] = useState<"com_nuoc" | "chao">("com_nuoc");

  // Cart state: item_id -> quantity
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  // Chao toppings state: item_id -> selected topping string
  const [chaoToppings, setChaoToppings] = useState<Record<string, string>>({});

  const handleIncrease = (id: string) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleDecrease = (id: string) => {
    setQuantities((prev) => {
      const current = prev[id] || 0;
      if (current <= 1) {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      }
      return { ...prev, [id]: current - 1 };
    });
  };

  // Delivery / Dine in
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

  // Calculate totals
  const { siteData } = useSite();
  const allItems = siteData.experienceMealConfig?.dishes || [];

  const MENU_COM = allItems.filter((d) =>
    ["Cơm", "Món Mặn", "Món Xào", "Món Canh", "Món Phụ & Tráng Miệng"].includes(
      d.category,
    ),
  );
  const MENU_NUOC = allItems.filter((d) => d.category === "Nước");
  const MENU_CHAO_CHINH = allItems.filter((d) => d.category === "Cháo");
  const MENU_CHAO_TOPPING = allItems.filter((d) => d.category === "Topping");

  let grandTotal = 0;
  let totalItemsCount = 0;
  const selectedItemsDetails: { name: string; qty: number; total: number }[] =
    [];

  Object.entries(quantities).forEach(([id, qtyRaw]) => {
    const qty = Number(qtyRaw);
    const item = allItems.find((i) => i.id === id);
    if (item) {
      const lineTotal = ((item.price ?? (item as any).extraPrice) || 0) * qty;
      grandTotal += lineTotal;
      totalItemsCount += qty;
      const toppingStr = chaoToppings[id] ? ` (${chaoToppings[id]})` : "";
      selectedItemsDetails.push({
        name: item.name + toppingStr,
        qty,
        total: lineTotal,
      });
    }
  });

  const handleAddToCart = () => {
    if (totalItemsCount === 0) {
      alert("Vui lòng chọn ít nhất 1 món!");
      return;
    }

    const dishListSummary = selectedItemsDetails.map(
      (item) =>
        `${item.name} (x${item.qty}) - ${item.total.toLocaleString("vi-VN")}đ`,
    );

    const formattedDateText = formatVietnameseDate(reservationDate);
    const diningSummary =
      diningMode === "dine_in"
        ? `Ăn tại chỗ: ${selectedStation} vào ${formattedDateText} lúc ${reservationTime}`
        : `Giao hàng tận nơi: ${deliveryAddress} (SĐT: ${deliveryPhone}) - Ngày giao: ${formattedDateText} lúc ${reservationTime}`;

    const customProduct: Product = {
      id: `order-menu-${Date.now()}`,
      name: `Đơn Đặt Hàng Cơm & Cháo (${totalItemsCount} món)`,
      subtitle: `${diningMode === "dine_in" ? "Ăn tại chỗ Bếp Station" : "Giao hàng tận nơi"}`,
      category: "Bữa Ăn Trải Nghiệm",
      price: grandTotal,
      rating: 5.0,
      reviewCount: 1520,
      badge: `TỔNG CỘNG: ${grandTotal.toLocaleString("vi-VN")}đ`,
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
      description: `Chi tiết đơn hàng: ${diningSummary}. Ghi chú: ${orderNotes || "Không có"}.`,
      keyBenefits: [
        `Tổng cộng ${totalItemsCount} phần ăn / uống`,
        `Thành tiền: ${grandTotal.toLocaleString("vi-VN")}đ`,
        `Hình thức: ${diningMode === "dine_in" ? "Ăn tại chỗ có hẹn giờ" : "Giao hàng tận nơi"}`,
      ],
      origin: "Bếp Trải Nghiệm BiO Station",
      certification: "Tiêu chuẩn BMQ",
      bmqNote:
        "Mâm cơm chuẩn vị nhà làm, chế biến từ nguyên liệu sạch Bách Mộc.",
      dishSampleList: dishListSummary,
      flavorProfile: orderNotes ? `Ghi chú: ${orderNotes}` : "",
    };

    onAddToCart(customProduct);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    // Reset
    setQuantities({});
  };

  const renderDishName = (name: string, isMainDish: boolean, qty: number) => {
    const textColor = isMainDish && qty > 0 ? "text-white" : "text-[#274e23]";
    if (name.includes("(Size M)")) {
      const parts = name.split("(Size M)");
      return (
        <div
          className={`font-bold text-base leading-snug line-clamp-3 mb-2 ${textColor}`}
        >
          {parts[0]}
          <span className="inline-block px-1.5 py-0.5 rounded-md text-[11px] font-black bg-emerald-100 text-emerald-700 ml-1 shadow-sm border border-emerald-200 tracking-wide">
            (Size M)
          </span>
          {parts[1]}
        </div>
      );
    }
    if (name.includes("(Size L)")) {
      const parts = name.split("(Size L)");
      return (
        <div
          className={`font-bold text-base leading-snug line-clamp-3 mb-2 ${textColor}`}
        >
          {parts[0]}
          <span className="inline-block px-1.5 py-0.5 rounded-md text-[11px] font-black bg-rose-100 text-rose-700 ml-1 shadow-sm border border-rose-200 tracking-wide">
            (Size L)
          </span>
          {parts[1]}
        </div>
      );
    }
    return (
      <div
        className={`font-bold text-base leading-snug line-clamp-3 mb-2 ${textColor}`}
      >
        {name}
      </div>
    );
  };

  const renderMenuItem = (
    item: any,
    isMainDish?: boolean,
    isChao1Loai?: boolean,
  ) => {
    const qty = quantities[item.id] || 0;
    const itemColor = item.color || (isMainDish ? "#274e23" : "#b45309");

    return (
      <div
        key={item.id}
        className={`flex flex-col h-full rounded-3xl border transition-all overflow-hidden ${
          isMainDish
            ? qty > 0
              ? "bg-[#274e23] border-[#274e23] text-white shadow-lg scale-[1.02]"
              : "bg-[#fffbeb] border-amber-400 hover:border-amber-600 shadow-md hover:shadow-lg hover:-translate-y-1 relative"
            : qty > 0
              ? "bg-amber-50/50 border-amber-500 shadow-sm"
              : "bg-white border-[#e2d5c3] hover:border-amber-500/50 shadow-sm hover:shadow"
        }`}
      >
        {isMainDish && qty === 0 && (
          <div className="absolute inset-0 border-2 border-amber-400 rounded-3xl pointer-events-none opacity-50"></div>
        )}
        {item.image && (
          <div className="w-full aspect-[4/3] bg-[#f0e6d8] relative overflow-hidden shrink-0 border-b border-black/5">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            {isMainDish && (
              <span className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-md border border-amber-400 uppercase tracking-wider">
                Món Chính
              </span>
            )}
          </div>
        )}
        <div className="p-4 flex flex-col flex-1 relative z-10">
          {renderDishName(item.name, !!isMainDish, qty)}

          <div className="mt-auto pt-3 flex items-center justify-between border-t border-black/5">
            <div
              className="text-lg sm:text-xl font-black"
              style={{ color: isMainDish && qty > 0 ? "#fde047" : itemColor }}
            >
              {((item.price ?? item.extraPrice) || 0).toLocaleString("vi-VN")}đ
            </div>

            <div
              className={`flex items-center gap-3 p-1 rounded-xl border shrink-0 ${isMainDish && qty > 0 ? "bg-white/10 border-white/20" : "bg-[#f0e6d8] border-[#dcd0bf]"}`}
            >
              <button
                onClick={() => handleDecrease(item.id)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${qty > 0 ? "bg-white text-[#274e23] shadow-sm" : "text-gray-400 cursor-not-allowed"}`}
                disabled={qty === 0}
              >
                <Minus className="w-4 h-4 stroke-[3]" />
              </button>
              <span
                className={`w-6 text-center font-bold text-base ${isMainDish && qty > 0 ? "text-white" : "text-[#274e23]"}`}
              >
                {qty}
              </span>
              <button
                onClick={() => handleIncrease(item.id)}
                className="w-8 h-8 rounded-lg bg-[#274e23] text-white hover:bg-[#1e3e1a] shadow-sm flex items-center justify-center transition-colors"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>

          {isChao1Loai && qty > 0 && (
            <div
              className={`mt-4 p-3 rounded-xl border flex flex-col gap-2 shadow-inner ${isMainDish && qty > 0 ? "bg-white/10 border-white/20" : "bg-white/80 border-amber-200"}`}
            >
              <span
                className={`text-xs font-bold ${isMainDish && qty > 0 ? "text-white" : "text-amber-900"}`}
              >
                Vui lòng chọn 1 loại dùng kèm:
              </span>
              <select
                className={`w-full p-2.5 rounded-lg border text-sm outline-none font-medium ${isMainDish && qty > 0 ? "bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-amber-300 [&>option]:text-[#2d241e]" : "bg-white border-amber-300 text-[#2d241e] focus:border-[#274e23]"}`}
                value={chaoToppings[item.id] || ""}
                onChange={(e) =>
                  setChaoToppings((prev) => ({
                    ...prev,
                    [item.id]: e.target.value,
                  }))
                }
              >
                <option value="" disabled>
                  -- Chọn 1 loại topping --
                </option>
                <option value="Thịt heo băm">Thịt heo băm</option>
                <option value="Rau củ">Rau củ</option>
                <option value="Thịt gà">Thịt gà</option>
                <option value="Nấm">Nấm</option>
                <option value="Ruốc cá">Ruốc cá</option>
                <option value="Thịt bò băm">Thịt bò băm</option>
                <option value="Tôm">Tôm</option>
                <option value="Tim - Cật">Tim - Cật</option>
                <option value="Trứng">Trứng</option>
              </select>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-3xl border border-[#e2d5c3] shadow-xl overflow-hidden text-[#2d241e]">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-[#1b3318] via-[#274e23] to-[#172e15] p-6 sm:p-8 text-white relative overflow-hidden">
        <h3 className="text-2xl sm:text-3xl font-black font-serif text-white tracking-tight mb-2">
          {siteData.experienceMealConfig?.bannerTitle ||
            "Thực Đơn Cơm & Cháo Bách Mộc"}
        </h3>
        <p className="text-sm text-emerald-100">
          {siteData.experienceMealConfig?.bannerSubtitle ||
            "Chế biến từ nguyên liệu hữu cơ chuẩn BMQ. Chọn món, lên đơn và thưởng thức trọn vị tự nhiên."}
        </p>
        {siteData.experienceMealConfig?.bannerDescription && (
          <div className="mt-4 p-4 bg-white/10 rounded-xl border border-white/20 text-sm text-white/90 leading-relaxed whitespace-pre-wrap">
            {siteData.experienceMealConfig.bannerDescription}
          </div>
        )}
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* TABS */}
        <div className="flex gap-2 border-b border-[#e2d5c3] pb-4">
          <button
            onClick={() => setActiveTab("com_nuoc")}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-colors ${activeTab === "com_nuoc" ? "bg-[#274e23] text-white" : "bg-[#f0e6d8] text-[#5c4d43] hover:bg-[#e4d6c2]"}`}
          >
            Menu Cơm & Nước
          </button>
          <button
            onClick={() => setActiveTab("chao")}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-colors ${activeTab === "chao" ? "bg-[#274e23] text-white" : "bg-[#f0e6d8] text-[#5c4d43] hover:bg-[#e4d6c2]"}`}
          >
            Menu Cháo
          </button>
        </div>

        {/* MENU CONTENT */}
        <div className="min-h-[400px]">
          {activeTab === "com_nuoc" && (
            <div className="space-y-8">
              <div>
                <h4 className="font-bold text-xl text-[#274e23] font-serif mb-4 flex items-center gap-2 border-b border-[#e2d5c3] pb-2">
                  <Utensils className="w-6 h-6 text-amber-500" /> Cơm (Rice
                  Meals)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {MENU_COM.map((item) => renderMenuItem(item, item.isMain))}
                </div>
              </div>
              <div>
                <h4 className="font-bold text-xl text-[#274e23] font-serif mb-4 border-b border-[#e2d5c3] pb-2">
                  Nước (Drinks)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {MENU_NUOC.map((item) => renderMenuItem(item, item.isMain))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "chao" && (
            <div className="space-y-8">
              <div>
                <h4 className="font-bold text-xl text-[#274e23] font-serif mb-4 flex items-center gap-2 border-b border-[#e2d5c3] pb-2">
                  <Utensils className="w-6 h-6 text-amber-500" /> Loại Cháo
                  (Porridge)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {MENU_CHAO_CHINH.map((item) =>
                    renderMenuItem(
                      item,
                      item.isMain,
                      item.id.includes("chao_1_loai"),
                    ),
                  )}
                </div>
                <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800">
                  <strong className="block mb-1">
                    Lưu ý cho món Cháo + 1 loại:
                  </strong>
                  Khi gọi cháo từ 2 món topping trở lên, giá sẽ tính = Giá cháo
                  1 loại + Giá các món topping mua lẻ.
                </div>
              </div>

              <div>
                <h4 className="font-bold text-lg text-[#274e23] font-serif mb-4 border-b border-[#e2d5c3] pb-2">
                  Giá tách lẻ gọi thêm (Toppings)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {MENU_CHAO_TOPPING.map((item) =>
                    renderMenuItem(item, item.isMain),
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* HÌNH THỨC TRẢI NGHIỆM */}
        <div className="bg-[#f2e9dc] p-5 rounded-2xl border border-[#dcd0bf] mt-8">
          <h4 className="font-bold font-serif text-base text-[#274e23] mb-4">
            Chọn Hình Thức Nhận Đơn
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <button
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
              placeholder="Vd: Không hành, không cay..."
              className="w-full p-2.5 rounded-lg border border-[#dcd0bf] text-sm"
            />
          </div>
        </div>

        {/* DEPOSIT NOTICE */}
        {siteData.experienceMealConfig?.depositNoticeText && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-900 mt-4 flex gap-3 items-start shadow-sm">
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

        {/* ORDER SUMMARY */}
        <div className="bg-[#274e23] p-5 sm:p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white w-full md:w-auto">
            <div className="text-sm text-emerald-100 mb-1">
              Tổng Cộng ({totalItemsCount} món)
            </div>
            <div className="text-3xl font-black text-amber-400">
              {grandTotal.toLocaleString("vi-VN")} VNĐ
            </div>
            {totalItemsCount > 0 && (
              <div className="mt-2 space-y-1">
                {selectedItemsDetails.map((item, idx) => (
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
          </div>

          <button
            onClick={handleAddToCart}
            disabled={totalItemsCount === 0 || !diningMode}
            className={`w-full md:w-auto px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              added
                ? "bg-emerald-500 text-white shadow-lg"
                : totalItemsCount === 0 || !diningMode
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-amber-400 text-[#1f381c] hover:bg-amber-300 shadow-xl shadow-amber-900/20"
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
        </div>
      </div>
    </div>
  );
};
