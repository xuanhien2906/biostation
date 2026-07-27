import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import {
  Utensils,
  Plus,
  Minus,
  Check,
  CheckCircle2,
  Users,
  ChefHat,
  Info,
  ChevronDown,
  ShoppingBag,
  Sparkles,
  Flame,
  Award,
  Clock,
  Calendar,
  MapPin,
  Truck,
  Heart,
  ShieldCheck,
  CreditCard,
  MessageSquare,
  User,
  AlertCircle,
  QrCode,
  ArrowRight,
} from 'lucide-react';
import { Product, DishOption } from '../types';

export const MENU_DISHES: DishOption[] = [
  {
    id: 'dish-thit-kho-to',
    name: 'Thịt Ba Chỉ Sinh Thái Kho Tộ',
    category: 'Món Mặn',
    origin: 'Thịt heo sinh thái Củ Chi nuôi thảo mộc, không chất tạo nạc',
    flavor: 'Đậm đà, béo ngậy vừa phải, thơm nức mùi hành ớt tiêu đen',
    extraPrice: 20000,
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'dish-ca-loc-kho',
    name: 'Cá Lóc Đồng Kho Riềng Bách Mộc',
    category: 'Món Mặn',
    origin: 'Cá lóc đồng tự nhiên miền Tây, riềng củ tươi Lâm Đồng',
    flavor: 'Thịt cá săn chắc, thấm vị mặn ngọt cay nồng chuẩn vị Nam Bộ',
    extraPrice: 20000,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'dish-ga-xao-sa-ot',
    name: 'Gà Ta Đồi Xào Sả Ớt',
    category: 'Món Mặn',
    origin: 'Gà ta thả vườn đồi Lâm Đồng chạy bộ, sả tươi Củ Chi',
    flavor: 'Thịt gà dai ngọt, thơm nồng mùi sả tươi và ớt hiểm',
    extraPrice: 20000,
    image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'dish-rau-muong-xao',
    name: 'Rau Muống Hữu Cơ Xào Tỏi',
    category: 'Món Xào',
    origin: 'Rau muống hữu cơ Củ Chi thu hoạch trong ngày',
    flavor: 'Giòn ngọt tự nhiên, thơm lừng tỏi tép đập dập',
    extraPrice: 15000,
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'dish-cai-xao-nam',
    name: 'Cải Thìa Xào Nấm Tươi',
    category: 'Món Xào',
    origin: 'Cải thìa hữu cơ Lâm Đồng & Nấm đùi gà tươi',
    flavor: 'Thanh mát, giòn ngọt, giàu chất xơ & khoáng chất',
    extraPrice: 15000,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'dish-canh-chua-ca',
    name: 'Canh Chua Cá Lóc Đồng Bách Mộc',
    category: 'Món Canh',
    origin: 'Cá lóc đồng, bạc hà, đậu okras, cà chua & me tươi Củ Chi',
    flavor: 'Chua thanh dịu mát, ngọt nước cá tự nhiên, rất đưa cơm',
    extraPrice: 20000,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'dish-canh-suon-cu-qua',
    name: 'Canh Sườn Hầm Củ Quả Lâm Đồng',
    category: 'Món Canh',
    origin: 'Sườn heo sinh thái & Củ khoai tây, cà rốt, su su hữu cơ',
    flavor: 'Nước canh ngọt lịm đậm đà từ xương hầm và củ quả tươi',
    extraPrice: 20000,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'dish-trung-chien-thao-moc',
    name: 'Trứng Gà Thảo Mộc Chiên Đốm Hành',
    category: 'Món Phụ & Tráng Miệng',
    origin: 'Trứng gà thảo mộc đốm tía tô & hành lá hữu cơ',
    flavor: 'Béo ngậy, vàng ươm, thơm lừng bơ thực vật & hành lá',
    extraPrice: 15000,
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=400&q=80',
  },
];

export interface GuestInfo {
  id: number;
  name: string;
  notes: string;
}

export const formatVietnameseDate = (dateStr: string) => {
  if (!dateStr) return '';
  const dateObj = new Date(dateStr + 'T00:00:00');
  if (isNaN(dateObj.getTime())) return dateStr;
  const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  const dayName = days[dateObj.getDay()];
  const dd = String(dateObj.getDate()).padStart(2, '0');
  const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
  const yyyy = dateObj.getFullYear();
  return `${dayName}, ngày ${dd}/${mm}/${yyyy}`;
};

interface ExperienceMealBuilderProps {
  onAddToCart: (product: Product) => void;
}

export const ExperienceMealBuilder: React.FC<ExperienceMealBuilderProps> = ({ onAddToCart }) => {
  const { siteData } = useSite();
  const mealConfig = siteData.experienceMealConfig || {
    pricePerPerson: 50000,
    depositPercent: 50,
    includedDishesPerPerson: 2,
    bannerTitle: 'Thiết Kế Mâm Cơm Trải Nghiệm Cá Nhân Hóa',
    bannerSubtitle: 'Dịch Vụ Bữa Ăn Trải Nghiệm Độc Quyền BiO Station',
    bannerDescription:
      'Phục vụ từ 1 đến 10 khách. Mỗi phần ăn 50.000đ / người đã bao gồm Cơm ST25 Bách Mộc dẻo ngọt và 2 suất món ăn tự chọn.',
    depositNoticeText:
      'Để đảm bảo nguyên liệu hữu cơ luôn tươi mới tuyệt đối và không lãng phí food waste, BiO Station yêu cầu thanh toán cọc 50% sau khi quý khách xác nhận đơn.',
    dishes: MENU_DISHES,
  };

  const availableDishes = mealConfig.dishes && mealConfig.dishes.length > 0 ? mealConfig.dishes : MENU_DISHES;

  // 1. Number of people (from 1 to 10)
  const [peopleCount, setPeopleCount] = useState<number>(1);

  // 2. Individual Guest Information & Specific Dietary Notes
  const [guests, setGuests] = useState<GuestInfo[]>([
    { id: 1, name: 'Khách 1 (Trưởng đoàn)', notes: '' },
  ]);

  const [activeGuestTab, setActiveGuestTab] = useState<number>(1);

  // Update people count and sync guest slots
  const handlePeopleCountChange = (count: number) => {
    setPeopleCount(count);
    setGuests((prev) => {
      const updated: GuestInfo[] = [];
      for (let i = 1; i <= count; i++) {
        const existing = prev.find((g) => g.id === i);
        if (existing) {
          updated.push(existing);
        } else {
          updated.push({
            id: i,
            name: i === 1 ? 'Khách 1 (Trưởng đoàn)' : `Khách ${i}`,
            notes: '',
          });
        }
      }
      return updated;
    });
    if (activeGuestTab > count) {
      setActiveGuestTab(1);
    }
  };

  const updateGuestDetail = (id: number, field: 'name' | 'notes', value: string) => {
    setGuests((prev) =>
      prev.map((g) => (g.id === id ? { ...g, [field]: value } : g))
    );
  };

  // 3. Dish Selection with Quantities (Map dishId -> quantity, default empty so user selects)
  const [dishQuantities, setDishQuantities] = useState<Record<string, number>>({});

  const [selectedCategory, setSelectedCategory] = useState<string>('Tất Cả');

  // 4. Dining Mode: initially null (unselected white state)
  const [diningMode, setDiningMode] = useState<'dine_in' | 'delivery' | null>(null);

  // Today ISO date YYYY-MM-DD
  const todayIsoDate = React.useMemo(() => new Date().toISOString().split('T')[0], []);

  // Dine-in appointment & delivery details
  const [reservationDate, setReservationDate] = useState<string>(todayIsoDate);
  const [reservationTime, setReservationTime] = useState<string>('12:00');
  const [selectedStation, setSelectedStation] = useState<string>(
    'BiO Station Phú Mỹ Hưng (124 Nguyễn Đức Cảnh, Q.7)'
  );

  // Delivery details
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [deliveryPhone, setDeliveryPhone] = useState<string>('');
  const [deliveryNotes, setDeliveryNotes] = useState<string>('');

  const [added, setAdded] = useState<boolean>(false);

  // Quantity Change Handlers
  const handleIncreaseDish = (dishId: string) => {
    setDishQuantities((prev) => ({
      ...prev,
      [dishId]: (prev[dishId] || 0) + 1,
    }));
  };

  const handleDecreaseDish = (dishId: string) => {
    setDishQuantities((prev) => {
      const current = prev[dishId] || 0;
      if (current <= 0) return prev;
      const updated = { ...prev };
      if (current === 1) {
        delete updated[dishId];
      } else {
        updated[dishId] = current - 1;
      }
      return updated;
    });
  };

  // Pricing calculations
  const pricePerPerson = mealConfig.pricePerPerson || 50000;
  const depositPercent = (mealConfig.depositPercent || 50) / 100;
  const basePrice = peopleCount * pricePerPerson;

  // Included dish portion allowance
  const includedPortionsAllowance = peopleCount * (mealConfig.includedDishesPerPerson || 2);

  // Selected dishes array with portion counts
  const selectedDishesWithQty = availableDishes.map((d) => ({
    dish: d,
    quantity: dishQuantities[d.id] || 0,
  })).filter((item) => item.quantity > 0);

  const totalPortionsSelected = selectedDishesWithQty.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  let remainingFreeAllowance = includedPortionsAllowance;
  let extraCostTotal = 0;

  const dishBillingBreakdown = selectedDishesWithQty.map((item) => {
    const qty = item.quantity;
    let freeQty = 0;
    let paidQty = 0;

    if (remainingFreeAllowance > 0) {
      if (remainingFreeAllowance >= qty) {
        freeQty = qty;
        remainingFreeAllowance -= qty;
      } else {
        freeQty = remainingFreeAllowance;
        paidQty = qty - remainingFreeAllowance;
        remainingFreeAllowance = 0;
      }
    } else {
      paidQty = qty;
    }

    const itemExtraCost = paidQty * item.dish.extraPrice;
    extraCostTotal += itemExtraCost;

    return {
      dish: item.dish,
      totalQty: qty,
      freeQty,
      paidQty,
      cost: itemExtraCost,
    };
  });

  const dishBillingMap = React.useMemo(() => {
    const map = new Map<string, { totalQty: number; freeQty: number; paidQty: number; cost: number }>();
    dishBillingBreakdown.forEach((b) => {
      map.set(b.dish.id, b);
    });
    return map;
  }, [dishBillingBreakdown]);

  // Grand Total Bill
  const grandTotal = basePrice + extraCostTotal;

  // Required Deposit
  const depositRequired = Math.round(grandTotal * depositPercent);
  const remainingAtService = grandTotal - depositRequired;

  // Filtered Dishes by Category
  const categories = ['Tất Cả', 'Món Mặn', 'Món Xào', 'Món Canh', 'Món Phụ & Tráng Miệng'];
  const filteredDishes = availableDishes.filter((dish) => {
    if (selectedCategory === 'Tất Cả') return true;
    return dish.category === selectedCategory;
  });

  // Submit & Add to Cart
  const handleAddToCart = () => {
    // Generate guest preferences string summary
    const guestSummary = guests
      .map(
        (g) =>
          `[${g.name}]: ${g.notes ? g.notes : 'Khống có lưu ý đặc biệt'}`
      )
      .join(' | ');

    const dishListSummary = dishBillingBreakdown.map(
      (b) =>
        `${b.dish.name} (x${b.totalQty}${
          b.paidQty > 0 ? ` - Phụ thu +${b.cost.toLocaleString('vi-VN')}đ` : ' - Bao gồm 0đ'
        })`
    );

    const formattedDateText = formatVietnameseDate(reservationDate);
    const diningSummary =
      diningMode === 'dine_in'
        ? `Ăn tại chỗ: ${selectedStation} vào ${formattedDateText} lúc ${reservationTime}`
        : `Giao hàng tận nơi: ${deliveryAddress} (SĐT: ${deliveryPhone}) - Ngày giao: ${formattedDateText} lúc ${reservationTime}`;

    const customProduct: Product = {
      id: `exp-luxury-${peopleCount}p-${Date.now()}`,
      name: `Bữa Ăn Trải Nghiệm Luxury ${peopleCount} Người (${totalPortionsSelected} Phần Món)`,
      subtitle: `${diningMode === 'dine_in' ? 'Ăn tại chỗ Bếp Station' : 'Giao mâm cơm tận nơi'} • Cọc 50%: ${depositRequired.toLocaleString('vi-VN')}đ`,
      category: 'Bữa Ăn Trải Nghiệm',
      price: grandTotal,
      rating: 5.0,
      reviewCount: 3800,
      badge: `${peopleCount} NGƯỜI • CỌC 50% (${depositRequired.toLocaleString('vi-VN')}đ)`,
      image:
        selectedDishesWithQty[0]?.dish.image ||
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      description: `Bữa ăn trải nghiệm cao cấp thiết kế riêng cho ${peopleCount} người. ${diningSummary}. Lưu ý khẩu vị các thành viên: ${guestSummary}.`,
      keyBenefits: [
        `Quy mô ${peopleCount} người (${basePrice.toLocaleString('vi-VN')}đ gói cơ bản)`,
        `Đã chọn ${totalPortionsSelected} phần món ăn phong phú (Số lượng tùy chỉnh)`,
        `Chính sách đặt cọc 50% (${depositRequired.toLocaleString('vi-VN')}đ) giữ chỗ & chuẩn bị nguyên liệu`,
        `Hình thức: ${diningMode === 'dine_in' ? 'Ăn tại chỗ có hẹn giờ' : 'Giao mâm cơm tận nơi'}`,
      ],
      origin: 'Bếp Trải Nghiệm BiO Station',
      certification: 'Tiêu chuẩn BMQ Qualified Dining & Prep',
      bmqNote: 'Mâm cơm chuẩn vị nhà làm, chế biến từ gạo ST25 Bách Mộc, thịt sinh thái & rau củ hữu cơ tươi hái.',
      dishSampleList: dishListSummary,
      flavorProfile: `Khẩu vị tùy biến từng người: ${guestSummary}`,
    };

    onAddToCart(customProduct);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl border border-[#e2d5c3] shadow-xl overflow-hidden text-[#2d241e]">
      {/* 1. LUXURY HEADER BANNER */}
      <div className="bg-gradient-to-r from-[#1b3318] via-[#274e23] to-[#172e15] p-6 sm:p-8 text-white space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
            <ChefHat className="w-4 h-4" />
            <span>Dịch Vụ Bữa Ăn Trải Nghiệm Độc Quyền BiO Station</span>
          </div>

          <div className="flex items-center gap-2 text-xs bg-black/30 backdrop-blur px-3.5 py-1.5 rounded-full border border-white/20 text-amber-200">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Cam Kết Đặt Cọc 50% – Nguyên Liệu Tươi Chuẩn BMQ</span>
          </div>
        </div>

        <h3 className="text-2xl sm:text-4xl font-black font-serif text-white tracking-tight">
          Thiết Kế Mâm Cơm Trải Nghiệm Cá Nhân Hóa
        </h3>

        <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed max-w-4xl">
          Phục vụ từ <strong>1 đến 10 khách</strong>. Mỗi phần ăn <strong className="text-amber-300">50.000đ / người</strong> đã bao gồm Cơm ST25 Bách Mộc dẻo ngọt và <strong>2 suất món ăn tự chọn</strong>. Quý khách có thể thoải mái ghi chú khẩu vị riêng cho từng thành viên, chọn số lượng phần ăn, đặt lịch hẹn ăn tại chỗ hoặc giao mâm cơm tận nơi.
        </p>
      </div>

      <div className="p-6 sm:p-8 space-y-10">
        {/* STEP 1: CHỌN SỐ LƯỢNG NGƯỜI (1 - 10 NGƯỜI) */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#e2d5c3] pb-3">
            <h4 className="font-bold font-serif text-base text-[#274e23] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#274e23] text-white text-xs flex items-center justify-center font-bold">1</span>
              <span>Bước 1: Chọn Số Lượng Khách (1 – 10 Người)</span>
            </h4>
            <div className="text-xs text-[#7a6858]">
              Giá gói cơ bản (50k/người): <strong className="text-[#a66e2c] text-sm font-bold">{basePrice.toLocaleString('vi-VN')} VNĐ</strong>
            </div>
          </div>

          {/* Clean, Streamlined Guest Selector (Dropdown Only) */}
          <div className="bg-[#f8f5f0] p-4 sm:p-5 rounded-2xl border border-[#e2d5c3] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#274e23]/10 text-[#274e23] flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-[#274e23]" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#274e23]">Số Lượng Người Dùng Bữa</div>
                <div className="text-[11px] text-[#7a6858]">Bao gồm {peopleCount * (mealConfig.includedDishesPerPerson || 2)} suất món tùy chọn tự chọn miễn phí</div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <label className="text-xs font-bold text-[#5c4d43] whitespace-nowrap shrink-0">
                Số lượng khách:
              </label>
              <select
                value={peopleCount}
                onChange={(e) => handlePeopleCountChange(Number(e.target.value))}
                className="w-full sm:w-64 px-4 py-3 rounded-xl border border-[#dcd0bf] bg-white text-xs font-bold text-[#274e23] focus:ring-2 focus:ring-[#274e23] outline-none shadow-sm cursor-pointer"
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num} Khách — { (num * (mealConfig.pricePerPerson || 50000)).toLocaleString('vi-VN') }đ gói cơ bản
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* STEP 2: LƯU Ý & SỞ THÍCH KHẨU VỊ DÀNH CHO TỪNG NGƯỜI (VERTICAL ACCORDION) */}
        <div className="space-y-4 bg-[#f8f5f0] p-4 sm:p-6 rounded-2xl border border-[#dcd0bf]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#dcd0bf] pb-3">
            <div>
              <h4 className="font-bold font-serif text-base text-[#274e23] flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-600 fill-rose-500" />
                <span>Bước 2: Ghi Chú Khẩu Vị Cho Từng Khách ({peopleCount} Người)</span>
              </h4>
              <p className="text-xs text-[#7a6858] mt-0.5">
                Bếp BiO Station chăm sóc riêng từng vị khách: khẩu vị nhạt, không ăn cay, dị ứng hải sản hay bớt mỡ.
              </p>
            </div>

            <span className="text-[11px] bg-amber-500/10 text-amber-800 font-bold px-3 py-1 rounded-full border border-amber-500/20 shrink-0 flex items-center gap-1">
              ✨ Chăm sóc tinh tế • Chuẩn Bếp Nhà
            </span>
          </div>

          {/* Vertical Stacked Guest Accordion List */}
          <div className="space-y-2.5">
            {guests.map((g) => {
              const isExpanded = activeGuestTab === g.id;
              return (
                <div
                  key={g.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white ${
                    isExpanded
                      ? 'border-[#274e23] shadow-md ring-1 ring-[#274e23]/20'
                      : 'border-[#e2d5c3] hover:border-[#274e23]/50 shadow-sm'
                  }`}
                >
                  {/* Accordion Header Bar */}
                  <button
                    type="button"
                    onClick={() => setActiveGuestTab(isExpanded ? 0 : g.id)}
                    className={`w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                      isExpanded ? 'bg-[#274e23]/5' : 'hover:bg-[#fbf8f3]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                        isExpanded
                          ? 'bg-[#274e23] text-white shadow-sm'
                          : g.notes
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-[#f0e6d8] text-[#5c4d43]'
                      }`}>
                        {g.id}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#274e23] truncate">
                            {g.name || `Khách ${g.id}`}
                          </span>
                          {g.id === 1 && (
                            <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded shrink-0">
                              Trưởng đoàn
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#7a6858] truncate mt-0.5">
                          {g.notes ? (
                            <span className="text-emerald-700 font-medium">✓ Ghi chú: {g.notes}</span>
                          ) : (
                            <span className="text-[#a69688]">Chạm để nhập thông tin & ghi chú...</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full hidden sm:inline-block ${
                        g.notes ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {g.notes ? 'Đã ghi chú' : 'Chưa ghi chú'}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#7a6858] transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-[#274e23]' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {/* Accordion Content Panel */}
                  {isExpanded && (
                    <div className="p-4 sm:p-5 pt-2 border-t border-[#f0e6d8] space-y-3 bg-white">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-semibold text-[#5c4d43] block mb-1">
                            Tên / Biệt Danh Khách {g.id}:
                          </label>
                          <input
                            type="text"
                            value={g.name}
                            onChange={(e) => updateGuestDetail(g.id, 'name', e.target.value)}
                            placeholder={g.id === 1 ? 'VD: Anh Nam (Trưởng đoàn)' : `VD: Khách ${g.id}`}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#dcd0bf] text-xs bg-[#fdfbf7] focus:outline-none focus:border-[#274e23]"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-[#5c4d43] block mb-1">
                            Ghi Chú Khẩu Vị & Yêu Cầu Đặc Biệt:
                          </label>
                          <input
                            type="text"
                            value={g.notes}
                            onChange={(e) => updateGuestDetail(g.id, 'notes', e.target.value)}
                            placeholder="VD: Không ăn cay, ăn nhạt, dị ứng hải sản..."
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#dcd0bf] text-xs bg-[#fdfbf7] focus:outline-none focus:border-[#274e23]"
                          />
                        </div>
                      </div>

                      {/* Quick suggestion chips */}
                      <div className="pt-1 flex flex-wrap items-center gap-1.5 text-[11px]">
                        <span className="text-[#7a6858] font-bold">Gợi ý nhanh:</span>
                        {['Không ăn cay', 'Không hành', 'Ăn nhạt', 'Ít dầu mỡ', 'Dị ứng hải sản', 'Bớt ngọt'].map((chip) => (
                          <button
                            key={chip}
                            type="button"
                            onClick={() => {
                              const newNotes = g.notes ? `${g.notes}, ${chip}` : chip;
                              updateGuestDetail(g.id, 'notes', newNotes);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-[#f0e6d8] hover:bg-[#e4d6c2] text-[#5c4d43] font-medium transition-colors cursor-pointer"
                          >
                            + {chip}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP 3: LỰA CHỌN MÓN ĂN VỚI CỘT SỐ LƯỢNG (QUANTITY COLUMN FOR ITEMS) */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#e2d5c3] pb-3">
            <div>
              <h4 className="font-bold font-serif text-base text-[#274e23] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#274e23] text-white text-xs flex items-center justify-center font-bold">3</span>
                <span>Bước 3: Chọn Món & Tùy Chỉnh Số Lượng Phần Món</span>
              </h4>
              <p className="text-xs text-[#7a6858] mt-0.5">
                • <strong>Suất món bao gồm miễn phí:</strong> <span className="text-emerald-700 font-bold">{includedPortionsAllowance} phần món</span> (2 phần / người x {peopleCount} người) <br className="hidden sm:inline" />
                • Đã chọn: <span className="font-bold text-[#a66e2c]">{totalPortionsSelected} phần món</span>. Tăng số lượng món phụ tùy thích!
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#274e23] text-white shadow-sm'
                      : 'bg-[#f0e6d8] text-[#5c4d43] hover:bg-[#e4d6c2]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Dishes Table / Grid with Explicit Quantity Column */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredDishes.map((dish) => {
              const qty = dishQuantities[dish.id] || 0;
              const isSelected = qty > 0;
              const billingInfo = dishBillingMap.get(dish.id);

              return (
                <div
                  key={dish.id}
                  className={`relative p-3.5 rounded-2xl border transition-all duration-200 flex flex-col justify-between group ${
                    isSelected
                      ? 'bg-amber-50/70 border-amber-600 shadow-sm ring-1 ring-amber-500'
                      : 'bg-white border-[#e2d5c3] hover:border-[#274e23] hover:shadow'
                  }`}
                >
                  {/* Badge Label when selected */}
                  {isSelected && (
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <span className="bg-[#274e23] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow flex items-center gap-1">
                        <Check className="w-3 h-3 text-amber-300" />
                        <span>Đã chọn {qty} phần</span>
                      </span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-[#f0e6d8]">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-1.5 left-1.5 bg-slate-900/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur">
                        {dish.category}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h5 className="font-bold text-xs sm:text-sm text-[#274e23] font-serif line-clamp-1">
                        {dish.name}
                      </h5>

                      <p className="text-[10px] text-[#7a6858] line-clamp-2">
                        {dish.flavor}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Control & Price Status Bar */}
                  <div className="pt-3 mt-2 border-t border-[#f0e6d8] flex items-center justify-between text-xs">
                    <div>
                      {isSelected ? (
                        <div>
                          <span className="text-[10px] text-[#274e23] font-bold block">Thành tiền món:</span>
                          <span className="font-bold text-[#a66e2c]">
                            {billingInfo && billingInfo.cost > 0
                              ? `+${billingInfo.cost.toLocaleString('vi-VN')}đ`
                              : '0đ (Bao gồm)'}
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span className="text-[10px] text-[#8c7868] block">Trạng thái:</span>
                          <span className="text-[11px] font-medium text-gray-500">Chưa chọn món</span>
                        </div>
                      )}
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-1.5 bg-[#f0e6d8] p-1 rounded-xl border border-[#dcd0bf]">
                      <button
                        type="button"
                        onClick={() => handleDecreaseDish(dish.id)}
                        disabled={qty === 0}
                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                          qty > 0
                            ? 'bg-white text-[#274e23] hover:bg-rose-100 hover:text-rose-700 font-bold shadow-sm cursor-pointer'
                            : 'text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <Minus className="w-3 h-3 stroke-[3]" />
                      </button>

                      <span className="w-6 text-center font-extrabold text-xs text-[#274e23]">
                        {qty}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleIncreaseDish(dish.id)}
                        className="w-6 h-6 rounded-lg bg-[#274e23] text-white hover:bg-[#1e3e1a] font-bold shadow-sm flex items-center justify-center cursor-pointer transition-colors"
                      >
                        <Plus className="w-3 h-3 stroke-[3]" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP 4: HÌNH THỨC TRẢI NGHIỆM (ĂN TẠI CHỖ CÓ HẸN GIỜ VS GIAO HÀNG TẬN NƠI) */}
        <div className="space-y-4 bg-[#f2e9dc] p-5 sm:p-6 rounded-2xl border border-[#dcd0bf]">
          <div className="border-b border-[#dcd0bf] pb-3">
            <h4 className="font-bold font-serif text-base text-[#274e23] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#274e23] text-white text-xs flex items-center justify-center font-bold">4</span>
              <span>Bước 4: Chọn Hình Thức Trải Nghiệm</span>
            </h4>
            <p className="text-xs text-[#7a6858] mt-0.5">
              Vui lòng trỏ chuột chọn hình thức trải nghiệm phù hợp để hiển thị thông tin đặt lịch & tính tổng chi phí bên dưới.
            </p>
          </div>

          {/* Mode Option Cards - White by default, turns green on hover/select */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setDiningMode('dine_in')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer text-left flex items-start gap-3.5 group ${
                diningMode === 'dine_in'
                  ? 'bg-[#274e23] text-white border-[#274e23] shadow-lg ring-2 ring-amber-400'
                  : 'bg-white text-[#2d241e] border-[#dcd0bf] hover:border-[#274e23] hover:bg-[#f4f9f4] hover:shadow-md'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold transition-colors ${
                  diningMode === 'dine_in'
                    ? 'bg-amber-400 text-[#1f381c]'
                    : 'bg-[#f0e6d8] text-[#274e23] group-hover:bg-[#274e23] group-hover:text-white'
                }`}
              >
                <Utensils className="w-5 h-5" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-sm font-serif">Ăn Tại Bếp / Nhận Tại Station</h5>
                  {diningMode === 'dine_in' && (
                    <span className="bg-amber-400 text-[#1f381c] text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" /> Đã Chọn
                    </span>
                  )}
                </div>
                <p
                  className={`text-xs ${
                    diningMode === 'dine_in' ? 'text-amber-100' : 'text-[#7a6858]'
                  }`}
                >
                  Thưởng thức trực tiếp mâm cơm nóng sốt tại không gian xanh của BiO Station hoặc ghé trạm nhận mâm.
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setDiningMode('delivery')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer text-left flex items-start gap-3.5 group ${
                diningMode === 'delivery'
                  ? 'bg-[#274e23] text-white border-[#274e23] shadow-lg ring-2 ring-amber-400'
                  : 'bg-white text-[#2d241e] border-[#dcd0bf] hover:border-[#274e23] hover:bg-[#f4f9f4] hover:shadow-md'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold transition-colors ${
                  diningMode === 'delivery'
                    ? 'bg-amber-400 text-[#1f381c]'
                    : 'bg-[#f0e6d8] text-[#274e23] group-hover:bg-[#274e23] group-hover:text-white'
                }`}
              >
                <Truck className="w-5 h-5" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-sm font-serif">Giao Mâm Cơm Tận Nơi</h5>
                  {diningMode === 'delivery' && (
                    <span className="bg-amber-400 text-[#1f381c] text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" /> Đã Chọn
                    </span>
                  )}
                </div>
                <p
                  className={`text-xs ${
                    diningMode === 'delivery' ? 'text-amber-100' : 'text-[#7a6858]'
                  }`}
                >
                  Bếp BiO Station đóng gói giữ nhiệt và giao mâm cơm sạch tận nhà hoặc văn phòng theo giờ hẹn.
                </p>
              </div>
            </button>
          </div>

          {/* Details Form rendered when mode is selected */}
          {diningMode === 'dine_in' && (
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#e2d5c3] space-y-3 shadow-sm animate-fadeIn">
              <div className="text-xs font-bold text-[#274e23] flex items-center gap-1.5 pb-2 border-b border-[#f0e6d8]">
                <Utensils className="w-4 h-4 text-amber-600" />
                <span>Chi Tiết Lịch Hẹn Đến Ăn Tại Chi Nhánh BiO Station:</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#274e23] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span>Chọn Chi Nhánh BiO Station:</span>
                  </label>
                  <select
                    value={selectedStation}
                    onChange={(e) => setSelectedStation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#dcd0bf] text-xs font-medium focus:outline-none focus:border-[#274e23] bg-[#fdfbf7]"
                  >
                    <option value="BiO Station Phú Mỹ Hưng (124 Nguyễn Đức Cảnh, Q.7)">
                      BiO Station Phú Mỹ Hưng (Quận 7)
                    </option>
                    <option value="BiO Station Thảo Điền (38 Quốc Hương, Q.2)">
                      BiO Station Thảo Điền (Quận 2)
                    </option>
                    <option value="BiO Station Củ Chi (Khu Nông Trại Sinh Thái Củ Chi)">
                      BiO Station Nông Trại Củ Chi
                    </option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#274e23] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>Chọn Ngày Đến Ăn (Lịch Bếp):</span>
                  </label>
                  <input
                    type="date"
                    min={todayIsoDate}
                    value={reservationDate}
                    onChange={(e) => setReservationDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#dcd0bf] text-xs font-bold text-[#274e23] focus:outline-none focus:border-[#274e23] bg-[#fdfbf7] cursor-pointer"
                  />
                  {reservationDate && (
                    <span className="text-[11px] font-semibold text-emerald-800 block mt-0.5">
                      🗓️ {formatVietnameseDate(reservationDate)}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#274e23] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Giờ Hẹn Ăn (Bếp Nấu Sẵn):</span>
                  </label>
                  <select
                    value={reservationTime}
                    onChange={(e) => setReservationTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#dcd0bf] text-xs font-medium focus:outline-none focus:border-[#274e23] bg-[#fdfbf7]"
                  >
                    <option value="11:30">11:30 (Trưa)</option>
                    <option value="12:00">12:00 (Trưa)</option>
                    <option value="12:30">12:30 (Trưa)</option>
                    <option value="18:00">18:00 (Tối)</option>
                    <option value="18:30">18:30 (Tối)</option>
                    <option value="19:00">19:00 (Tối)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {diningMode === 'delivery' && (
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#e2d5c3] space-y-3 shadow-sm animate-fadeIn">
              <div className="text-xs font-bold text-[#274e23] flex items-center gap-1.5 pb-2 border-b border-[#f0e6d8]">
                <Truck className="w-4 h-4 text-amber-600" />
                <span>Thông Tin Nhận Giao Mâm Cơm Tận Nơi:</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-bold text-[#274e23] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span>Địa Chỉ Giao Mâm Cơm:</span>
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Nhập số nhà, tên đường, phường/xã, quận/huyện..."
                    className="w-full px-3.5 py-2 rounded-xl border border-[#dcd0bf] text-xs focus:outline-none focus:border-[#274e23] bg-[#fdfbf7]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#274e23] flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-amber-600" />
                    <span>Số Điện Thoại Nhận Hàng:</span>
                  </label>
                  <input
                    type="tel"
                    value={deliveryPhone}
                    onChange={(e) => setDeliveryPhone(e.target.value)}
                    placeholder="VD: 0908123456"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#dcd0bf] text-xs focus:outline-none focus:border-[#274e23] bg-[#fdfbf7]"
                  />
                </div>
              </div>

              {/* Date & Time Selection for Delivery */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#f0e6d8]">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#274e23] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>Chọn Ngày Giao Mâm Cơm (Lịch Bếp):</span>
                  </label>
                  <input
                    type="date"
                    min={todayIsoDate}
                    value={reservationDate}
                    onChange={(e) => setReservationDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#dcd0bf] text-xs font-bold text-[#274e23] focus:outline-none focus:border-[#274e23] bg-[#fdfbf7] cursor-pointer"
                  />
                  {reservationDate && (
                    <span className="text-[11px] font-semibold text-emerald-800 block mt-0.5">
                      🗓️ {formatVietnameseDate(reservationDate)}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#274e23] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Giờ Muốn Nhận Mâm Cơm:</span>
                  </label>
                  <select
                    value={reservationTime}
                    onChange={(e) => setReservationTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#dcd0bf] text-xs font-medium focus:outline-none focus:border-[#274e23] bg-[#fdfbf7]"
                  >
                    <option value="11:00">11:00 (Giao trưa sớm)</option>
                    <option value="11:30">11:30 (Trưa)</option>
                    <option value="12:00">12:00 (Trưa)</option>
                    <option value="12:30">12:30 (Trưa)</option>
                    <option value="17:30">17:30 (Giao chiều sớm)</option>
                    <option value="18:00">18:00 (Tối)</option>
                    <option value="18:30">18:30 (Tối)</option>
                    <option value="19:00">19:00 (Tối)</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* STEP 5: CONDITIONAL RENDERING - ONLY SHOW AFTER DISHES AND DINING MODE ARE SELECTED */}
        {totalPortionsSelected === 0 ? (
          <div className="bg-amber-50/80 p-6 rounded-2xl border border-dashed border-amber-300 text-center space-y-2">
            <Sparkles className="w-8 h-8 text-amber-600 mx-auto" />
            <h5 className="font-bold text-[#274e23] font-serif text-base">
              Vui lòng chọn món ăn ở Bước 3 để tiếp tục
            </h5>
            <p className="text-xs text-[#7a6858] max-w-lg mx-auto">
              Quý khách vui lòng chọn ít nhất 1 món ăn trong thực đơn để bếp BiO Station có thể chuẩn bị khẩu phần và tổng hợp bảng giá.
            </p>
          </div>
        ) : diningMode === null ? (
          <div className="bg-amber-50/80 p-6 rounded-2xl border border-dashed border-amber-300 text-center space-y-2">
            <Sparkles className="w-8 h-8 text-amber-600 mx-auto" />
            <h5 className="font-bold text-[#274e23] font-serif text-base">
              Vui lòng chọn hình thức trải nghiệm ở Bước 4 trên đây
            </h5>
            <p className="text-xs text-[#7a6858] max-w-lg mx-auto">
              Nhấp chọn <strong>"Ăn Tại Bếp"</strong> hoặc <strong>"Giao Tận Nơi"</strong> để hiển thị tổng hóa đơn chi tiết, chính sách đặt cọc 50% và nút xác nhận đặt bữa ăn.
            </p>
          </div>
        ) : (
          /* STEP 5: FULL BILL BREAKDOWN & 50% DEPOSIT GUARANTEE POLICY */
          <div className="bg-[#f8f5f0] p-6 rounded-2xl border border-[#dcd0bf] space-y-6 animate-fadeIn">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#dcd0bf] pb-4">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  Tổng Hợp Tất Cả Thông Tin Bữa Ăn & Quy Định Cọc 50%
                </span>
                <h4 className="text-xl font-bold font-serif text-[#274e23]">
                  Bước 5: Tổng Hóa Đơn & Xác Nhận Đặt Bữa
                </h4>
              </div>

              <div className="text-right">
                <div className="text-xs text-[#7a6858]">Tổng giá trị mâm cơm ({peopleCount} người):</div>
                <div className="text-2xl sm:text-3xl font-black text-[#a66e2c]">
                  {grandTotal.toLocaleString('vi-VN')} VNĐ
                </div>
              </div>
            </div>

            {/* 50% Deposit Highlights Box */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 sm:p-5 rounded-2xl border border-amber-300 space-y-3">
              <div className="flex items-center gap-2 text-[#274e23] font-bold text-sm font-serif">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <span>Quy Định Chuyển Khoản Đặt Cọc 50% Giữ Chỗ:</span>
              </div>

              <p className="text-xs text-[#5c4d43] leading-relaxed">
                {mealConfig.depositNoticeText}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#7a6858] block">Thanh toán cọc 50% ngay:</span>
                    <span className="text-lg font-black text-amber-700">
                      {depositRequired.toLocaleString('vi-VN')} VNĐ
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px]">
                    CỌC {Math.round(depositPercent * 100)}%
                  </span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#7a6858] block">50% còn lại thanh toán tại bếp / khi nhận mâm:</span>
                    <span className="text-lg font-black text-[#274e23]">
                      {remainingAtService.toLocaleString('vi-VN')} VNĐ
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    TẠI BẾP
                  </span>
                </div>
              </div>
            </div>

            {/* Order Item Summary Table */}
            <div className="bg-white p-4 rounded-xl border border-[#e2d5c3] space-y-3 text-xs">
              <div className="font-bold text-[#274e23] border-b border-[#f0e6d8] pb-2 flex items-center justify-between">
                <span>Chi Tiết Mâm Cơm ({peopleCount} Khách • {totalPortionsSelected} Suất Món):</span>
                <span>Gói Cơ Bản: {basePrice.toLocaleString('vi-VN')}đ</span>
              </div>

              <ul className="space-y-2 text-[#5c4d43]">
                <li className="flex items-center justify-between bg-[#f8f5f0] p-2 rounded-lg">
                  <span className="font-bold text-[#274e23]">🌾 Thố Cơm Dẻo Gạo ST25 Bách Mộc (Lúa Tôm):</span>
                  <span className="font-bold text-emerald-700">Miễn phí theo suất</span>
                </li>

                {dishBillingBreakdown.map((item, idx) => (
                  <li key={item.dish.id} className="flex items-center justify-between border-b border-[#f0e6d8] pb-1.5">
                    <div>
                      <span className="font-bold text-[#274e23]">
                        Món {idx + 1}: {item.dish.name}
                      </span>
                      <span className="text-[11px] text-[#7a6858] block">
                        Số lượng: {item.totalQty} phần {item.freeQty > 0 ? `(${item.freeQty} phần trong suất 50k)` : ''}
                      </span>
                    </div>

                    <div>
                      {item.cost > 0 ? (
                        <span className="font-bold text-amber-700">
                          +{item.cost.toLocaleString('vi-VN')}đ
                        </span>
                      ) : (
                        <span className="font-bold text-emerald-700">0đ (Bao gồm)</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Note list for guests */}
              <div className="pt-2 border-t border-[#f0e6d8] text-[11px] text-[#7a6858]">
                <span className="font-bold text-[#274e23] block mb-1">Ghi chú khẩu vị khách hàng:</span>
                <ul className="list-disc list-inside space-y-0.5">
                  {guests.map((g) => (
                    <li key={g.id}>
                      <strong className="text-[#5c4d43]">{g.name}:</strong>{' '}
                      {g.notes ? g.notes : 'Khẩu vị mộc tự nhiên'}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA Submit Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#7a6858] flex items-center gap-1.5">
                <Info className="w-4 h-4 text-[#274e23] shrink-0" />
                <span>
                  Sau khi thêm vào giỏ, nhân viên BiO Station sẽ gửi mã QR chuyển khoản cọc 50% ({depositRequired.toLocaleString('vi-VN')}đ) để giữ lịch hẹn.
                </span>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className={`w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-xs sm:text-sm tracking-wide shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  added
                    ? 'bg-emerald-700 text-white scale-105'
                    : 'bg-[#274e23] hover:bg-[#1e3e1a] text-white hover:scale-105'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5 text-amber-300" />
                    <span>Đã Tạo Đơn & Chuyển Sang Giỏ Hàng!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5 text-amber-300" />
                    <span>
                      Xác Nhận Đặt Bữa Ăn (Cọc 50%: {depositRequired.toLocaleString('vi-VN')}đ)
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
