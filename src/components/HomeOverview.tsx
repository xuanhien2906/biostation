import React, { useState } from 'react';
import {
  Sprout,
  Store,
  Wheat,
  ShoppingBag,
  MapPin,
  Sparkles,
  BookOpen,
  Utensils,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Star,
  Plus,
  Check,
  Flame,
  ChefHat,
  Calendar,
  Clock,
  Heart,
  ChevronRight,
  Info,
} from 'lucide-react';
import { TabType, Product } from '../types';
import { useSite } from '../context/SiteContext';
import { PRODUCTS } from '../data/products';
import { ExperienceMealBuilder } from './ExperienceMealBuilder';
import { BrandManifestoSection } from './BrandManifestoSection';

interface HomeOverviewProps {
  setActiveTab: (tab: TabType) => void;
  onAddToCart: (product: Product) => void;
  onSelectCategory?: (category: string) => void;
  onSelectProduct?: (product: Product) => void;
}

export const HomeOverview: React.FC<HomeOverviewProps> = ({
  setActiveTab,
  onAddToCart,
  onSelectCategory,
  onSelectProduct,
}) => {
  const { siteData } = useSite();
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const brandConfig = siteData?.brandConfig || {};
  const rawProducts = siteData?.products || PRODUCTS;
  const allProducts = rawProducts.filter(p => !p.is_hidden);
  const bioCategories = siteData?.bioCategories || [];

  // Main sales products selected in Admin
  const mainSaleProducts = allProducts.filter((p) => p.isMainSaleProduct);
  const displayStaples = mainSaleProducts.length > 0 
    ? mainSaleProducts 
    : allProducts.filter((p) => p.category !== 'Bữa Ăn Trải Nghiệm').slice(0, 4);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1800);
  };

  return (
    <div className="space-y-12 pb-12 text-[#2d241e]">
      {/* 1. TUYÊN NGÔN THƯƠNG HIỆU BiO STATION & 3 TRỤ CỘT CHIẾN LƯỢC */}
      <BrandManifestoSection setActiveTab={setActiveTab} />

      {/* 2. DỊCH VỤ BỮA ĂN TRẢI NGHIỆM (SPECIAL FEATURED EXPERIENCE DINING SECTION) */}
      <section id="bua-an-trai-nghiem" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ExperienceMealBuilder onAddToCart={onAddToCart} />
      </section>

      {/* 3. FEATURED CORE PRODUCTS (GẠO, RAU CỦ, THỊT SẠCH, MẬT ONG) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#f0e6d8] p-6 sm:p-8 rounded-3xl border border-[#dcd0bf] space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#dcd0bf] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  Nông Sản Bán Lẻ
                </span>
                {!siteData?.paymentConfig?.isOnlinePaymentEnabled && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 border border-amber-300">
                    Bảng Giá Tham Khảo
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#274e23]">
                Gạo ST25 & Thực Phẩm Sạch Cốt Lõi Tại Cửa Hàng
              </h2>
              <p className="text-xs sm:text-sm text-[#7a6858] mt-1">
                Các mặt hàng gạo, rau củ và thịt sinh thái bán chạy nhất tại BiO Station
              </p>
            </div>

            <button
              onClick={() => setActiveTab('shop')}
              className="px-5 py-2.5 rounded-xl bg-[#274e23] hover:bg-[#1e3e1a] text-white font-bold text-xs sm:text-sm tracking-wide flex items-center gap-2 cursor-pointer shadow transition-all hover:scale-105 shrink-0"
            >
              <span>Đến Cửa Hàng ({allProducts.length} Sản Phẩm)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {displayStaples.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  if (onSelectProduct) {
                    onSelectProduct(product);
                  } else {
                    setActiveTab('shop');
                  }
                }}
                className="bg-white rounded-2xl border border-[#e2d5c3] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer relative"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-[#f0e6d8]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.isMainSaleProduct ? (
                    <span className="absolute top-3 left-3 bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow flex items-center gap-1">
                      ⭐ Sản Phẩm Bán Chính
                    </span>
                  ) : (
                    product.badge && (
                      <span className="absolute top-3 left-3 bg-[#274e23] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                        {product.badge}
                      </span>
                    )
                  )}
                </div>

                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-amber-700 font-bold">
                      <span className="text-[#274e23]">{product.category}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{product.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-sm text-[#274e23] font-serif line-clamp-1 group-hover:text-amber-800 transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-[11px] text-[#7a6858] line-clamp-2">
                      {product.subtitle}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#f0e6d8] flex items-center justify-between">
                    <div>
                      <div className="text-sm font-black text-[#a66e2c]">
                        {product.price.toLocaleString('vi-VN')}đ
                      </div>
                      {product.originalPrice && (
                        <div className="text-[10px] text-[#8c7868] line-through">
                          {product.originalPrice.toLocaleString('vi-VN')}đ
                        </div>
                      )}
                    </div>

                    <button
                      onClick={(e) => handleQuickAdd(e, product)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow ${
                        addedProductId === product.id
                          ? 'bg-emerald-700 text-white'
                          : 'bg-[#274e23] hover:bg-[#1e3e1a] text-white'
                      }`}
                    >
                      {addedProductId === product.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-amber-300" />
                          <span>Đã Thêm</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Thêm</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ECOSYSTEM NAVIGATION SHORTCUTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <span className="px-3 py-1 rounded-full bg-[#274e23]/10 text-[#274e23] text-xs font-bold uppercase tracking-wider">
            Lựa Chọn Chuyên Mục
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#274e23]">
            Khám Phá Toàn Bộ Mạng Lưới BiO Station
          </h2>
          <p className="text-xs sm:text-sm text-[#7a6858]">
            Truy cập nhanh các khu vực chuyên môn trong hệ sinh thái Bách Mộc
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 1. Shop Card */}
          <div
            onClick={() => setActiveTab('shop')}
            className="p-5 rounded-2xl bg-white border border-[#e2d5c3] hover:border-[#274e23] cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold shrink-0 group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-6 h-6 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base text-[#274e23] font-serif group-hover:text-amber-700 transition-colors flex items-center justify-between">
                Cửa Hàng Nông Sản
                <ArrowRight className="w-4 h-4 text-[#8c7868] group-hover:text-[#274e23]" />
              </h3>
              <p className="text-xs text-[#7a6858] mt-1 leading-relaxed">
                Gạo Bách Mộc ST25, Rau củ hữu cơ tươi, Mật ong rừng & Combo thực phẩm trọn tuần.
              </p>
            </div>
          </div>

          {/* 2. Business Model Card */}
          <div
            onClick={() => setActiveTab('model')}
            className="p-5 rounded-2xl bg-white border border-[#e2d5c3] hover:border-[#274e23] cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#274e23]/10 text-[#274e23] flex items-center justify-center font-bold shrink-0 group-hover:scale-105 transition-transform">
              <Store className="w-6 h-6 text-[#274e23]" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base text-[#274e23] font-serif group-hover:text-amber-700 transition-colors flex items-center justify-between">
                Mô Hình 3 Trụ Cột
                <ArrowRight className="w-4 h-4 text-[#8c7868] group-hover:text-[#274e23]" />
              </h3>
              <p className="text-xs text-[#7a6858] mt-1 leading-relaxed">
                Bản chất & Trải nghiệm – Sứ mệnh & Vận hành – Hệ tiêu chuẩn BMQ.
              </p>
            </div>
          </div>

          {/* 3. Station Network Card */}
          <div
            onClick={() => setActiveTab('network')}
            className="p-5 rounded-2xl bg-white border border-[#e2d5c3] hover:border-[#274e23] cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center font-bold shrink-0 group-hover:scale-105 transition-transform">
              <MapPin className="w-6 h-6 text-emerald-700" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base text-[#274e23] font-serif group-hover:text-amber-700 transition-colors flex items-center justify-between">
                Mạng Lưới Station
                <ArrowRight className="w-4 h-4 text-[#8c7868] group-hover:text-[#274e23]" />
              </h3>
              <p className="text-xs text-[#7a6858] mt-1 leading-relaxed">
                Tra cứu điểm Station Trung tâm, Station Cư dân & Điểm nhận hàng gần bạn nhất.
              </p>
            </div>
          </div>

          {/* 4. Healthy Recipes Card */}
          <div
            onClick={() => setActiveTab('recipes')}
            className="p-5 rounded-2xl bg-white border border-[#e2d5c3] hover:border-[#274e23] cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-700 flex items-center justify-center font-bold shrink-0 group-hover:scale-105 transition-transform">
              <Utensils className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base text-[#274e23] font-serif group-hover:text-amber-700 transition-colors flex items-center justify-between">
                Bữa Ăn Lành
                <ArrowRight className="w-4 h-4 text-[#8c7868] group-hover:text-[#274e23]" />
              </h3>
              <p className="text-xs text-[#7a6858] mt-1 leading-relaxed">
                Gợi ý công thức nấu ăn dinh dưỡng, thực đơn cơm nhà chuẩn vị & gợi ý món theo ngày.
              </p>
            </div>
          </div>

          {/* 5. Green Knowledge Library Card */}
          <div
            onClick={() => setActiveTab('knowledge')}
            className="p-5 rounded-2xl bg-white border border-[#e2d5c3] hover:border-[#274e23] cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-700 flex items-center justify-center font-bold shrink-0 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6 text-teal-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base text-[#274e23] font-serif group-hover:text-amber-700 transition-colors flex items-center justify-between">
                Thư Viện Sống Xanh
                <ArrowRight className="w-4 h-4 text-[#8c7868] group-hover:text-[#274e23]" />
              </h3>
              <p className="text-xs text-[#7a6858] mt-1 leading-relaxed">
                Bài viết hướng dẫn chọn thực phẩm sạch, phân biệt hữu cơ & mẹo chăm sóc gia đình.
              </p>
            </div>
          </div>

          {/* 6. Cháo Lúa Mẹ Card */}
          <div
            onClick={() => setActiveTab('chaoluame')}
            className="p-5 rounded-2xl bg-white border border-[#e2d5c3] hover:border-[#274e23] cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-600/10 text-amber-700 flex items-center justify-center font-bold shrink-0 group-hover:scale-105 transition-transform">
              <Wheat className="w-6 h-6 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base text-[#274e23] font-serif group-hover:text-amber-700 transition-colors flex items-center justify-between">
                Cháo Lúa Mẹ Bách Mộc
                <ArrowRight className="w-4 h-4 text-[#8c7868] group-hover:text-[#274e23]" />
              </h3>
              <p className="text-xs text-[#7a6858] mt-1 leading-relaxed">
                Ẩm thực thuận tự nhiên, bát cháo thơm lành nuôi dưỡng nguyên khí từ hạt ngọc trời.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BRAND MISSION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#1f381c] to-[#274e23] text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl text-left">
            <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
              Cam Kết Từ Tâm
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
              Sống Hài Hòa Sinh Thái – Tử Tế Với Môi Trường
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Mỗi túi gạo ST25 hay đơn hàng nông sản Bách Mộc trích đóng góp quỹ đồng hành cùng nông hộ chuyển đổi canh tác hữu cơ bền vững.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('stories')}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm shadow cursor-pointer transition-all hover:scale-105"
            >
              Xem Câu Chuyện Khách Hàng
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 cursor-pointer transition-all"
            >
              Trắc Nghiệm Thể Tạng
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
