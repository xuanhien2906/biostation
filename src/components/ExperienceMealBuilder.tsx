import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import {
  Utensils, Plus, Minus, Check, Truck, 
  MapPin, Clock, Calendar, MessageSquare
} from 'lucide-react';
import { Product } from '../types';

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

interface OrderItem {
  id: string;
  name: string;
  price: number;
}

const MENU_COM: OrderItem[] = [
  { id: 'com_huu_co', name: '16. Cơm hữu cơ Bách Mộc (Gồm: Cơm, Canh, Rau luộc, Món mặn)', price: 59000 },
  { id: 'com_lut_huu_co', name: '17. Cơm lứt hữu cơ Bách Mộc (Gồm: Cơm lứt, Canh, Rau, Món mặn)', price: 75000 },
  { id: 'do_an_them', name: '18. Đồ ăn thêm', price: 30000 },
  { id: 'com_them_huu_co', name: '19. Cơm thêm - Hữu cơ', price: 10000 },
  { id: 'com_them_lut', name: '20. Cơm thêm - Lứt', price: 15000 },
  { id: 'mang_cam_gao', name: '21. Màng cám gạo dinh dưỡng Bách Mộc', price: 10000 },
];

const MENU_NUOC: OrderItem[] = [
  { id: 'tra_chanh', name: '22. Trà chanh', price: 15000 },
  { id: 'tra_tac', name: '23. Trà tắc', price: 15000 },
  { id: 'tra_bach_moc', name: '24. Trà Bách Mộc', price: 5000 },
  { id: 'khan_lanh', name: '25. Khăn lạnh', price: 3000 },
];

const MENU_CHAO_CHINH = [
  { id: 'chao_1_loai_M', name: '1. Cháo + 1 loại (Size M)', price: 39000 },
  { id: 'chao_1_loai_L', name: '1. Cháo + 1 loại (Size L)', price: 59000 },
  { id: 'chao_ca_hoi_M', name: '2. Cháo Cá hồi (Size M)', price: 65000 },
  { id: 'chao_ca_hoi_L', name: '2. Cháo Cá hồi (Size L)', price: 85000 },
  { id: 'chao_suon_non_M', name: '3. Cháo Sườn non (Size M)', price: 50000 },
  { id: 'chao_suon_non_L', name: '3. Cháo Sườn non (Size L)', price: 65000 },
  { id: 'chao_dac_biet_L', name: '4. Cháo đặc biệt (Size L)', price: 89000 },
];

const MENU_CHAO_TOPPING: OrderItem[] = [
  { id: 'top_chao_lua_me', name: '5. Cháo Lúa Mẹ', price: 9000 },
  { id: 'top_chao_them', name: '6. Cháo thêm', price: 5000 },
  { id: 'top_thit_heo_bam', name: '7. Thịt heo băm', price: 20000 },
  { id: 'top_rau_cu', name: '8. Rau củ', price: 20000 },
  { id: 'top_thit_ga', name: '9. Thịt gà', price: 20000 },
  { id: 'top_nam', name: '10. Nấm', price: 20000 },
  { id: 'top_ruoc_ca', name: '11. Ruốc cá', price: 20000 },
  { id: 'top_thit_bo_bam', name: '12. Thịt bò băm', price: 20000 },
  { id: 'top_tom', name: '13. Tôm', price: 20000 },
  { id: 'top_tim_cat', name: '14. Tim - Cật', price: 20000 },
  { id: 'top_trung', name: '15. Trứng', price: 10000 },
];

interface ExperienceMealBuilderProps {
  onAddToCart: (product: Product) => void;
}

export const ExperienceMealBuilder: React.FC<ExperienceMealBuilderProps> = ({ onAddToCart }) => {
  const [activeTab, setActiveTab] = useState<'com_nuoc' | 'chao'>('com_nuoc');
  
  // Cart state: item_id -> quantity
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const handleIncrease = (id: string) => {
    setQuantities(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleDecrease = (id: string) => {
    setQuantities(prev => {
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
  const [diningMode, setDiningMode] = useState<'dine_in' | 'delivery' | null>(null);
  const todayIsoDate = React.useMemo(() => new Date().toISOString().split('T')[0], []);
  const [reservationDate, setReservationDate] = useState<string>(todayIsoDate);
  const [reservationTime, setReservationTime] = useState<string>('12:00');
  const [selectedStation, setSelectedStation] = useState<string>('BiO Station Phú Mỹ Hưng (124 Nguyễn Đức Cảnh, Q.7)');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [deliveryPhone, setDeliveryPhone] = useState<string>('');
  const [orderNotes, setOrderNotes] = useState<string>('');
  const [added, setAdded] = useState<boolean>(false);

  // Calculate totals
  const allItems = [...MENU_COM, ...MENU_NUOC, ...MENU_CHAO_CHINH, ...MENU_CHAO_TOPPING];
  let grandTotal = 0;
  let totalItemsCount = 0;
  const selectedItemsDetails: { name: string; qty: number; total: number }[] = [];

  Object.entries(quantities).forEach(([id, qty]) => {
    const item = allItems.find(i => i.id === id);
    if (item) {
      const lineTotal = item.price * qty;
      grandTotal += lineTotal;
      totalItemsCount += qty;
      selectedItemsDetails.push({ name: item.name, qty, total: lineTotal });
    }
  });

  const handleAddToCart = () => {
    if (totalItemsCount === 0) {
      alert("Vui lòng chọn ít nhất 1 món!");
      return;
    }

    const dishListSummary = selectedItemsDetails.map(item => `${item.name} (x${item.qty}) - ${item.total.toLocaleString('vi-VN')}đ`);
    
    const formattedDateText = formatVietnameseDate(reservationDate);
    const diningSummary =
      diningMode === 'dine_in'
        ? `Ăn tại chỗ: ${selectedStation} vào ${formattedDateText} lúc ${reservationTime}`
        : `Giao hàng tận nơi: ${deliveryAddress} (SĐT: ${deliveryPhone}) - Ngày giao: ${formattedDateText} lúc ${reservationTime}`;

    const customProduct: Product = {
      id: `order-menu-${Date.now()}`,
      name: `Đơn Đặt Hàng Cơm & Cháo (${totalItemsCount} món)`,
      subtitle: `${diningMode === 'dine_in' ? 'Ăn tại chỗ Bếp Station' : 'Giao hàng tận nơi'}`,
      category: 'Bữa Ăn Trải Nghiệm',
      price: grandTotal,
      rating: 5.0,
      reviewCount: 1520,
      badge: `TỔNG CỘNG: ${grandTotal.toLocaleString('vi-VN')}đ`,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      description: `Chi tiết đơn hàng: ${diningSummary}. Ghi chú: ${orderNotes || 'Không có'}.`,
      keyBenefits: [
        `Tổng cộng ${totalItemsCount} phần ăn / uống`,
        `Thành tiền: ${grandTotal.toLocaleString('vi-VN')}đ`,
        `Hình thức: ${diningMode === 'dine_in' ? 'Ăn tại chỗ có hẹn giờ' : 'Giao hàng tận nơi'}`
      ],
      origin: 'Bếp Trải Nghiệm BiO Station',
      certification: 'Tiêu chuẩn BMQ',
      bmqNote: 'Mâm cơm chuẩn vị nhà làm, chế biến từ nguyên liệu sạch Bách Mộc.',
      dishSampleList: dishListSummary,
      flavorProfile: orderNotes ? `Ghi chú: ${orderNotes}` : '',
    };

    onAddToCart(customProduct);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    // Reset
    setQuantities({});
  };

  const renderMenuItem = (item: OrderItem) => {
    const qty = quantities[item.id] || 0;
    return (
      <div key={item.id} className={`flex items-center justify-between p-3 sm:p-4 rounded-xl border mb-2 transition-all ${qty > 0 ? 'bg-[#274e23]/5 border-[#274e23]' : 'bg-white border-[#e2d5c3] hover:border-[#274e23]/50'}`}>
        <div className="flex-1">
          <div className="font-bold text-sm text-[#274e23]">{item.name}</div>
          <div className="text-sm font-bold text-[#a66e2c] mt-1">{item.price.toLocaleString('vi-VN')}đ</div>
        </div>
        <div className="flex items-center gap-3 bg-[#f0e6d8] p-1.5 rounded-xl border border-[#dcd0bf] shrink-0">
          <button
            onClick={() => handleDecrease(item.id)}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${qty > 0 ? 'bg-white text-[#274e23] shadow-sm' : 'text-gray-400 cursor-not-allowed'}`}
            disabled={qty === 0}
          >
            <Minus className="w-4 h-4 stroke-[3]" />
          </button>
          <span className="w-6 text-center font-bold text-sm text-[#274e23]">{qty}</span>
          <button
            onClick={() => handleIncrease(item.id)}
            className="w-7 h-7 rounded-lg bg-[#274e23] text-white hover:bg-[#1e3e1a] shadow-sm flex items-center justify-center transition-colors"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-3xl border border-[#e2d5c3] shadow-xl overflow-hidden text-[#2d241e]">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-[#1b3318] via-[#274e23] to-[#172e15] p-6 sm:p-8 text-white relative overflow-hidden">
        <h3 className="text-2xl sm:text-3xl font-black font-serif text-white tracking-tight mb-2">
          Thực Đơn Cơm & Cháo Bách Mộc
        </h3>
        <p className="text-sm text-emerald-100">
          Chế biến từ nguyên liệu hữu cơ chuẩn BMQ. Chọn món, lên đơn và thưởng thức trọn vị tự nhiên.
        </p>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* TABS */}
        <div className="flex gap-2 border-b border-[#e2d5c3] pb-4">
          <button
            onClick={() => setActiveTab('com_nuoc')}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-colors ${activeTab === 'com_nuoc' ? 'bg-[#274e23] text-white' : 'bg-[#f0e6d8] text-[#5c4d43] hover:bg-[#e4d6c2]'}`}
          >
            Menu Cơm & Nước
          </button>
          <button
            onClick={() => setActiveTab('chao')}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-colors ${activeTab === 'chao' ? 'bg-[#274e23] text-white' : 'bg-[#f0e6d8] text-[#5c4d43] hover:bg-[#e4d6c2]'}`}
          >
            Menu Cháo
          </button>
        </div>

        {/* MENU CONTENT */}
        <div className="min-h-[400px]">
          {activeTab === 'com_nuoc' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-lg text-[#274e23] font-serif mb-4 flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-amber-500" /> Cơm (Rice Meals)
                </h4>
                {MENU_COM.map(renderMenuItem)}
              </div>
              <div>
                <h4 className="font-bold text-lg text-[#274e23] font-serif mb-4">Nước (Drinks)</h4>
                {MENU_NUOC.map(renderMenuItem)}
              </div>
            </div>
          )}

          {activeTab === 'chao' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-lg text-[#274e23] font-serif mb-4 flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-amber-500" /> Loại Cháo (Porridge)
                </h4>
                {MENU_CHAO_CHINH.map(renderMenuItem)}
                <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800">
                  <strong className="block mb-1">Lưu ý cho món Cháo + 1 loại:</strong>
                  Khi gọi cháo từ 2 món topping trở lên, giá sẽ tính = Giá cháo 1 loại + Giá các món topping mua lẻ.
                </div>
              </div>
              <div>
                <h4 className="font-bold text-lg text-[#274e23] font-serif mb-4">Giá Tách Lẻ / Gọi Thêm</h4>
                {MENU_CHAO_TOPPING.map(renderMenuItem)}
              </div>
            </div>
          )}
        </div>

        {/* HÌNH THỨC TRẢI NGHIỆM */}
        <div className="bg-[#f2e9dc] p-5 rounded-2xl border border-[#dcd0bf] mt-8">
          <h4 className="font-bold font-serif text-base text-[#274e23] mb-4">Chọn Hình Thức Nhận Đơn</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <button
              onClick={() => setDiningMode('dine_in')}
              className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-colors ${diningMode === 'dine_in' ? 'bg-[#274e23] text-white border-[#274e23] shadow-md' : 'bg-white text-[#2d241e] border-[#dcd0bf] hover:border-[#274e23]'}`}
            >
              <Utensils className={`w-6 h-6 ${diningMode === 'dine_in' ? 'text-amber-400' : 'text-[#274e23]'}`} />
              <div>
                <div className="font-bold text-sm">Ăn Tại Bếp / Lấy Tại Quầy</div>
                <div className={`text-xs mt-1 ${diningMode === 'dine_in' ? 'text-emerald-100' : 'text-gray-500'}`}>Dùng bữa trực tiếp hoặc ghé lấy.</div>
              </div>
            </button>
            <button
              onClick={() => setDiningMode('delivery')}
              className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-colors ${diningMode === 'delivery' ? 'bg-[#274e23] text-white border-[#274e23] shadow-md' : 'bg-white text-[#2d241e] border-[#dcd0bf] hover:border-[#274e23]'}`}
            >
              <Truck className={`w-6 h-6 ${diningMode === 'delivery' ? 'text-amber-400' : 'text-[#274e23]'}`} />
              <div>
                <div className="font-bold text-sm">Giao Hàng Tận Nơi</div>
                <div className={`text-xs mt-1 ${diningMode === 'delivery' ? 'text-emerald-100' : 'text-gray-500'}`}>Giao nóng sốt tận nhà.</div>
              </div>
            </button>
          </div>

          {diningMode === 'dine_in' && (
            <div className="bg-white p-4 rounded-xl border border-[#dcd0bf] space-y-4">
              <div>
                <label className="text-xs font-bold text-[#5c4d43] mb-1 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Chọn Trạm BiO Station:</label>
                <select value={selectedStation} onChange={(e) => setSelectedStation(e.target.value)} className="w-full p-2.5 rounded-lg border border-[#dcd0bf] text-sm">
                  <option>BiO Station Phú Mỹ Hưng (124 Nguyễn Đức Cảnh, Q.7)</option>
                  <option>BiO Station Thảo Điền (32 Trần Ngọc Diện, Q.2)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#5c4d43] mb-1 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Ngày Hẹn:</label>
                  <input type="date" value={reservationDate} onChange={(e) => setReservationDate(e.target.value)} min={todayIsoDate} className="w-full p-2.5 rounded-lg border border-[#dcd0bf] text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#5c4d43] mb-1 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Giờ Tới:</label>
                  <input type="time" value={reservationTime} onChange={(e) => setReservationTime(e.target.value)} className="w-full p-2.5 rounded-lg border border-[#dcd0bf] text-sm" />
                </div>
              </div>
            </div>
          )}

          {diningMode === 'delivery' && (
            <div className="bg-white p-4 rounded-xl border border-[#dcd0bf] space-y-4">
              <div>
                <label className="text-xs font-bold text-[#5c4d43] mb-1 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Địa chỉ giao hàng:</label>
                <input type="text" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} placeholder="Nhập số nhà, tên đường, phường, quận..." className="w-full p-2.5 rounded-lg border border-[#dcd0bf] text-sm" />
              </div>
              <div>
                <label className="text-xs font-bold text-[#5c4d43] mb-1 flex items-center gap-1.5">Số điện thoại người nhận:</label>
                <input type="tel" value={deliveryPhone} onChange={(e) => setDeliveryPhone(e.target.value)} placeholder="09x..." className="w-full p-2.5 rounded-lg border border-[#dcd0bf] text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#5c4d43] mb-1 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Ngày Giao:</label>
                  <input type="date" value={reservationDate} onChange={(e) => setReservationDate(e.target.value)} min={todayIsoDate} className="w-full p-2.5 rounded-lg border border-[#dcd0bf] text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#5c4d43] mb-1 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Giờ Giao:</label>
                  <input type="time" value={reservationTime} onChange={(e) => setReservationTime(e.target.value)} className="w-full p-2.5 rounded-lg border border-[#dcd0bf] text-sm" />
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 bg-white p-4 rounded-xl border border-[#dcd0bf]">
            <label className="text-xs font-bold text-[#5c4d43] mb-1 flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5" /> Ghi Chú Đơn Hàng (Khẩu vị, yêu cầu khác):</label>
            <input type="text" value={orderNotes} onChange={(e) => setOrderNotes(e.target.value)} placeholder="Vd: Không hành, không cay..." className="w-full p-2.5 rounded-lg border border-[#dcd0bf] text-sm" />
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-[#274e23] p-5 sm:p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white w-full md:w-auto">
            <div className="text-sm text-emerald-100 mb-1">Tổng Cộng ({totalItemsCount} món)</div>
            <div className="text-3xl font-black text-amber-400">{grandTotal.toLocaleString('vi-VN')} VNĐ</div>
            {totalItemsCount > 0 && (
              <div className="mt-2 space-y-1">
                {selectedItemsDetails.map((item, idx) => (
                  <div key={idx} className="text-xs text-emerald-50 flex justify-between gap-4 border-b border-emerald-800/30 pb-1">
                    <span>{item.name} (x{item.qty})</span>
                    <span className="font-bold">{item.total.toLocaleString('vi-VN')}đ</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={totalItemsCount === 0 || !diningMode}
            className={`w-full md:w-auto px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              added ? 'bg-emerald-500 text-white shadow-lg' : 
              totalItemsCount === 0 || !diningMode ? 'bg-gray-400 text-gray-200 cursor-not-allowed' : 
              'bg-amber-400 text-[#1f381c] hover:bg-amber-300 shadow-xl shadow-amber-900/20'
            }`}
          >
            {added ? (
              <><Check className="w-5 h-5" /> Đã Lên Đơn Thành Công</>
            ) : (
              <><ShoppingBag className="w-5 h-5" /> Đặt Hàng Ngay</>
            )}
          </button>
        </div>
        
      </div>
    </div>
  );
};
