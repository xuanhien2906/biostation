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
  Star,
  Plus,
  Check,
  Phone,
  Maximize2,
  X,
  ExternalLink,
  Award,
  Eye,
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

// Map chuẩn hình ảnh local cho toàn bộ 15 sản phẩm trong Bảng Giá để luôn hiển thị 100% sắc nét
const LOCAL_PRODUCT_IMAGE_MAP: Record<string, string> = {
  'prod-gao-trang-xat-doi': '/gao-trang-xat-doi.jpg',
  'prod-gao-trang-nguyen-cam': '/gao-trang-nguyen-cam.jpg',
  'prod-gao-do-nguyen-cam': '/gao-do-nguyen-cam.jpg',
  'prod-gao-tim-nguyen-cam': '/gao-tim-nguyen-cam.jpg',
  'prod-gao-lua-me-yang': '/gao-lua-me-yang.jpg',
  'prod-gao-vung-dem-xat-doi': '/gao-vung-dem-xat-doi.jpg',
  'prod-gao-vung-dem-nguyen-cam': '/gao-vung-dem-nguyen-cam.jpg',
  'prod-nuoc-chiet-gao-len-men': '/nuoc-chiet-gao-len-men.jpg',
  'prod-vien-dan-mang-gao': '/vien-dan-mang-gao.jpg',
  'prod-mang-cam-gao-huu-co': '/mang-cam-gao-huu-co.jpg',
  'prod-mang-gao-vung-dem': '/mang-gao-vung-dem.jpg',
  'prod-bot-chuoi-hot': '/bot-chuoi-hot-rung.jpg',
  'prod-nuoc-ep-nhau-nano': '/nuoc-ep-nhau-nano.jpg',
  'prod-tra-thach-chau': '/tra-thach-chau.jpg',
  'prod-cafe-huu-co-dang-farm': '/cafe-dang-farm.jpg',
};

// Cấu trúc 5 nhóm sản phẩm chuẩn theo Poster BẢNG GIÁ SẢN PHẨM GẠO BÁCH MỘC
const PRICE_LIST_SECTIONS = [
  {
    id: 'sec-1',
    title: 'I. GẠO HỮU CƠ QUỐC TẾ',
    subtitle: 'Chứng nhận USDA (Mỹ) • JAS (Nhật Bản) • Liên minh Châu Âu (EU) • Canada | Quy cách: 452g/gói',
    badge: '4 Chứng Nhận Quốc Tế',
    productIds: [
      'prod-gao-trang-xat-doi',
      'prod-gao-trang-nguyen-cam',
      'prod-gao-do-nguyen-cam',
      'prod-gao-tim-nguyen-cam',
    ],
  },
  {
    id: 'sec-2',
    title: 'II. GẠO HỮU CƠ VIỆT NAM',
    subtitle: 'Chứng nhận Vietnam Certified Organic (VCO) | Quy cách: 452g/gói',
    badge: 'Vietnam Certified Organic',
    productIds: ['prod-gao-lua-me-yang'],
  },
  {
    id: 'sec-3',
    title: 'III. GẠO VÙNG ĐỆM HỮU CƠ',
    subtitle: 'Canh tác sinh thái vùng đệm thuận tự nhiên | Quy cách: 452g/gói',
    badge: 'Vùng Đệm Sinh Thái',
    productIds: ['prod-gao-vung-dem-xat-doi', 'prod-gao-vung-dem-nguyen-cam'],
  },
  {
    id: 'sec-4',
    title: 'IV. SẢN PHẨM CHẾ BIẾN SÂU TỪ LÚA GẠO HỮU CƠ',
    subtitle: 'Công nghệ sinh học bóc tách & giữ trọn dưỡng chất quý từ màng cám gạo Bách Mộc',
    badge: 'Tinh Hoa Chế Biến Sâu',
    productIds: [
      'prod-nuoc-chiet-gao-len-men',
      'prod-vien-dan-mang-gao',
      'prod-mang-cam-gao-huu-co',
      'prod-mang-gao-vung-dem',
    ],
  },
  {
    id: 'sec-5',
    title: 'V. SẢN PHẨM THUẦN TỰ NHIÊN KHÁC',
    subtitle: 'Đặc sản bản địa canh tác & chế biến thuận tự nhiên đạt chuẩn BMQ',
    badge: 'Nông Sản Thuần Tự Nhiên',
    productIds: [
      'prod-bot-chuoi-hot',
      'prod-nuoc-ep-nhau-nano',
      'prod-tra-thach-chau',
      'prod-cafe-huu-co-dang-farm',
    ],
  },
];

export const MAP_URL_CAN_GIO =
  'https://www.google.com/maps/search/?api=1&query=336+L%C6%B0%C6%A1ng+V%C4%83n+Nho,+C%E1%BA%A7n+Gi%E1%BB%9D,+TP.+H%E1%BB%93+Ch%C3%AD+Minh';

export const HomeOverview: React.FC<HomeOverviewProps> = ({
  setActiveTab,
  onAddToCart,
  onSelectProduct,
}) => {
  const { siteData } = useSite();
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [showPricePosterModal, setShowPricePosterModal] = useState(false);
  const [detailModalProduct, setDetailModalProduct] = useState<Product | null>(null);

  const rawProducts = siteData?.products && siteData.products.length > 0 ? siteData.products : PRODUCTS;
  // Đảm bảo luôn có đủ 15 sản phẩm chuẩn từ PRODUCTS nếu cache thiếu
  const mergedProducts: Product[] = PRODUCTS.map((defaultProd) => {
    const found = rawProducts.find((p) => p.id === defaultProd.id);
    if (!found) return defaultProd;
    return {
      ...defaultProd,
      ...found,
      image: found.image || LOCAL_PRODUCT_IMAGE_MAP[defaultProd.id] || defaultProd.image,
    };
  });
  // Thêm các sản phẩm mới do Admin tạo thêm (nếu có)
  const extraProducts = rawProducts.filter(
    (p) => !p.is_hidden && !PRODUCTS.some((dp) => dp.id === p.id)
  );
  const allProducts = [...mergedProducts.filter((p) => !p.is_hidden), ...extraProducts];

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1800);
  };

  const getProductImg = (product: Product) => {
    return LOCAL_PRODUCT_IMAGE_MAP[product.id] || product.image || '/gao-bach-moc-pack.jpg';
  };

  return (
    <div className="space-y-12 py-6 sm:py-10 text-[#2d241e]">
      {/* =====================================================================
          1. VỪA VÀO TRANG CHỦ: HIỂN THỊ NGAY MENU CƠM HỮU CƠ BÁCH MỘC
         ===================================================================== */}
      <section id="bua-an-trai-nghiem" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ExperienceMealBuilder onAddToCart={onAddToCart} />
      </section>

      {/* =====================================================================
          2. TIẾP SAU MENU: BẢNG GIÁ SẢN PHẨM CHI TIẾT & CẬP NHẬT ĐẦY ĐỦ HÌNH ẢNH
             (Kèm tín hiệu mời tới trải nghiệm trực tiếp tại BiO Station Cần Giờ)
         ===================================================================== */}
      <section id="bang-gia-san-pham" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#fcfaf7] rounded-3xl border-2 border-[#dcd0bf] shadow-xl overflow-hidden">
          
          {/* HEADER BẢNG GIÁ SẢN PHẨM */}
          <div className="bg-gradient-to-br from-[#1f3d1c] via-[#274e23] to-[#173014] p-6 sm:p-9 text-white relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
                  <Award className="w-4 h-4 text-amber-300" />
                  <span>Niêm Yết Chính Thức • Chuẩn Hữu Cơ BMQ</span>
                </div>

                <button
                  type="button"
                  onClick={() => setShowPricePosterModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all cursor-pointer shadow-md"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Xem Ảnh Poster Bảng Giá Gốc</span>
                </button>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-4xl font-black font-serif text-white tracking-tight uppercase">
                    BẢNG GIÁ SẢN PHẨM GẠO BÁCH MỘC & NÔNG SẢN
                  </h2>
                  <p className="text-amber-200 font-serif italic text-sm sm:text-lg mt-1">
                    Danh mục chi tiết kèm hình ảnh thực tế, quy cách đóng gói & giá niêm yết công khai
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-emerald-100 bg-white/10 px-3.5 py-2 rounded-xl border border-white/15 shrink-0 self-start lg:self-auto">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>USDA Organic • JAS • EU • Canada • VCO</span>
                </div>
              </div>

              {/* TÍN HIỆU MỜI TRẢI NGHIỆM TRỰC TIẾP NGAY ĐẦU BẢNG GIÁ */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-amber-400/30">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-amber-300 font-extrabold text-xs sm:text-sm uppercase tracking-wide">
                      <Store className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Mời Quý Khách Ghé Xem & Trải Nghiệm Sản Phẩm Trực Tiếp Tại BiO Station Cần Giờ</span>
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-50">
                      📍 Địa chỉ: <strong>336 Lương Văn Nho, Xã Cần Giờ (D51 Khu Dân cư Phước Lộc), TP. HCM</strong>
                    </p>
                    <p className="text-[11px] sm:text-xs text-amber-200/90">
                      Được trực tiếp Nhìn – Chạm – Ngửi – Nếm hạt gạo hữu cơ Bách Mộc, uống thử trà & nước chiết gạo lên men tại trạm.
                    </p>
                  </div>

                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full lg:w-auto shrink-0">
                    <a
                      href="tel:0388500500"
                      className="flex-1 sm:flex-initial px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
                    >
                      <Phone className="w-4 h-4 fill-slate-950" />
                      <span>Gọi: 0388 500 500</span>
                    </a>
                    <a
                      href={MAP_URL_CAN_GIO}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial px-4 py-3 rounded-xl bg-white hover:bg-emerald-50 text-[#274e23] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
                    >
                      <MapPin className="w-4 h-4 text-red-600" />
                      <span>Vị Trí Google Maps</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BODY: LIST CHI TIẾT 5 NHÓM SẢN PHẨM KÈM HÌNH ẢNH & BẢNG GIÁ RÕ RÀNG */}
          <div className="p-4 sm:p-8 space-y-10">
            {PRICE_LIST_SECTIONS.map((section) => {
              const sectionProducts = section.productIds
                .map((id) => allProducts.find((p) => p.id === id))
                .filter((p): p is Product => Boolean(p));

              if (sectionProducts.length === 0) return null;

              return (
                <div key={section.id} className="space-y-4">
                  {/* Tiêu đề phân mục */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b-2 border-[#274e23]/20">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg sm:text-xl font-black font-serif text-[#274e23]">
                          {section.title}
                        </h3>
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#274e23]/10 text-[#274e23] border border-[#274e23]/20">
                          {section.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[#6e5d4f] mt-0.5 font-medium">
                        {section.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Danh sách sản phẩm chi tiết có hình ảnh lớn, quy cách, mô tả ngắn & giá to rõ */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sectionProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => setDetailModalProduct(product)}
                        className="bg-white rounded-2xl border border-[#e2d5c3] hover:border-[#274e23] p-3.5 sm:p-4 shadow-sm hover:shadow-md transition-all flex items-center gap-4 group cursor-pointer"
                      >
                        {/* Ảnh sản phẩm */}
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-[#f4ebe0] border border-[#e2d5c3] shrink-0">
                          <img
                            src={getProductImg(product)}
                            alt={product.name}
                            onError={(e) => {
                              const fallback = LOCAL_PRODUCT_IMAGE_MAP[product.id] || '/gao-bach-moc-pack.jpg';
                              if (!e.currentTarget.src.endsWith(fallback)) {
                                e.currentTarget.src = fallback;
                              }
                            }}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {product.badge && (
                            <span className="absolute top-1.5 left-1.5 bg-[#274e23]/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                              {product.badge}
                            </span>
                          )}
                        </div>

                        {/* Thông tin chi tiết & Giá */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between h-full space-y-2">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-bold text-sm sm:text-base text-[#274e23] font-serif group-hover:text-amber-800 transition-colors leading-snug">
                                {product.name}
                              </h4>
                            </div>

                            <div className="inline-flex items-center gap-1.5 mt-1 px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200/80 text-[11px] font-bold text-amber-900">
                              <span>Quy cách: {product.unit || 'Gói tiêu chuẩn'}</span>
                            </div>

                            <p className="text-xs text-[#6e5d4f] line-clamp-2 mt-1 leading-relaxed">
                              {product.description || product.subtitle}
                            </p>
                          </div>

                          {/* Dòng Giá Niêm Yết & Nút chọn */}
                          <div className="pt-2 border-t border-[#f0e6d8] flex items-center justify-between gap-2">
                            <div>
                              <span className="text-[10px] uppercase font-bold text-[#8c7868] block">
                                Giá niêm yết
                              </span>
                              <div className="flex items-baseline gap-1">
                                <span className="text-lg sm:text-xl font-black text-[#c2410c]">
                                  {product.price.toLocaleString('vi-VN')}đ
                                </span>
                                <span className="text-[11px] text-[#7a6858] font-medium">
                                  / {product.unit || 'sp'}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
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
                                    <span>Đã Chọn</span>
                                  </>
                                ) : (
                                  <>
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>Đặt Mua</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* FOOTER BẢNG GIÁ: TÍN HIỆU MỜI TRẢI NGHIỆM TRỰC TIẾP TẠI BiO STATION CẦN GIỜ */}
            <div className="bg-gradient-to-r from-[#f3eadc] via-[#f8f2e7] to-[#f0e4d2] rounded-3xl p-5 sm:p-7 border-2 border-amber-400/60 shadow-md">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#274e23] text-amber-300 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Điểm Chạm Trực Tiếp BiO Station Cần Giờ</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-black font-serif text-[#274e23]">
                    Mời Quý Khách Đến Trải Nghiệm & Mua Sắm Trực Tiếp Tại Trạm Mẫu Cần Giờ
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5c4d43] leading-relaxed">
                    📍 <strong>Địa chỉ:</strong> 336 Lương Văn Nho, Xã Cần Giờ (D51 Khu Dân cư Phước Lộc), TP. Hồ Chí Minh
                    <br />
                    📞 <strong>Hotline tư vấn & đặt giao tận nơi:</strong>{' '}
                    <a href="tel:0388500500" className="font-black text-[#c2410c] underline">
                      0388 500 500
                    </a>{' '}
                    (Mở cửa 07:00 – 21:00 hàng ngày)
                  </p>
                </div>

                <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto shrink-0">
                  <a
                    href="tel:0388500500"
                    className="flex-1 sm:flex-initial px-5 py-3.5 rounded-xl bg-[#274e23] hover:bg-[#1e3e1a] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4 text-amber-300" />
                    <span>Gọi Ngay: 0388 500 500</span>
                  </a>
                  <a
                    href={MAP_URL_CAN_GIO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial px-5 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Chỉ Đường Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. CÁC GIÁ TRỊ KHÁC ĐỂ PHÍA SAU: TUYÊN NGÔN THƯƠNG HIỆU & 3 TRỤ CỘT
         ===================================================================== */}
      <BrandManifestoSection setActiveTab={setActiveTab} />

      {/* =====================================================================
          4. CHUYÊN MỤC KHÁM PHÁ THÊM
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <span className="px-3 py-1 rounded-full bg-[#274e23]/10 text-[#274e23] text-xs font-bold uppercase tracking-wider">
            Tìm Hiểu Thêm Giá Trị Hệ Sinh Thái
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#274e23]">
            Khám Phá Các Chuyên Mục BiO Station
          </h2>
          <p className="text-xs sm:text-sm text-[#7a6858]">
            Truy cập nhanh các khu vực thông tin chuyên sâu trong hệ sinh thái Bách Mộc
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                Xem đầy đủ chi tiết từng sản phẩm Gạo Bách Mộc, Màng cám gạo & Nông sản thuần tự nhiên.
              </p>
            </div>
          </div>

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
                Thông tin Trạm Trải Nghiệm Mẫu BiO Station Cần Giờ & các điểm trạm cộng đồng.
              </p>
            </div>
          </div>

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

      {/* MODAL XEM CHI TIẾT SẢN PHẨM NGAY TRÊN TRANG CHỦ */}
      {detailModalProduct && (
        <div
          onClick={() => setDetailModalProduct(null)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#fcfaf7] border border-[#e2d5c3] rounded-3xl max-w-2xl w-full p-5 sm:p-7 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setDetailModalProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#f0e6d8] text-[#5c4d43] hover:text-[#274e23] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
              <div className="rounded-2xl overflow-hidden bg-[#f0e6d8] border border-[#e2d5c3] aspect-square">
                <img
                  src={getProductImg(detailModalProduct)}
                  alt={detailModalProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3">
                <span className="text-xs font-bold text-[#274e23] uppercase tracking-wider bg-[#274e23]/10 px-2.5 py-1 rounded-full">
                  {detailModalProduct.category}
                </span>
                <h3 className="text-xl font-black font-serif text-[#274e23]">
                  {detailModalProduct.name}
                </h3>
                <p className="text-xs font-semibold text-amber-800">
                  Quy cách: {detailModalProduct.unit || 'Gói tiêu chuẩn'}
                </p>
                <div className="text-2xl font-black text-[#c2410c]">
                  {detailModalProduct.price.toLocaleString('vi-VN')}đ
                </div>
                <p className="text-xs text-[#5c4d43] leading-relaxed">
                  {detailModalProduct.description}
                </p>
                <button
                  onClick={() => {
                    onAddToCart(detailModalProduct);
                    setDetailModalProduct(null);
                  }}
                  className="w-full py-3 rounded-xl bg-[#274e23] hover:bg-[#1e3e1a] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-300" />
                  <span>Thêm Vào Giỏ Đặt Hàng</span>
                </button>
              </div>
            </div>

            {/* Kèm tín hiệu mời trải nghiệm trong popup chi tiết sản phẩm */}
            <div className="p-3.5 rounded-2xl bg-[#f3eadc] border border-amber-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="font-bold text-[#274e23]">
                  🌿 Trải nghiệm & mua trực tiếp tại BiO Station Cần Giờ
                </div>
                <div className="text-[#5c4d43] mt-0.5">
                  336 Lương Văn Nho, Xã Cần Giờ, TP. HCM • Hotline: 0388 500 500
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="tel:0388500500"
                  className="px-3 py-2 rounded-xl bg-[#274e23] text-white font-bold flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-300" />
                  <span>Gọi ngay</span>
                </a>
                <a
                  href={MAP_URL_CAN_GIO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center gap-1"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Bản đồ</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL XEM POSTER BẢNG GIÁ GỐC */}
      {showPricePosterModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowPricePosterModal(false)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 bg-[#274e23] text-white">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="font-serif font-bold text-sm sm:text-base text-amber-200">
                  Bảng Giá Sản Phẩm Gạo Bách Mộc & Nông Sản BiO Station
                </h3>
              </div>
              <button
                onClick={() => setShowPricePosterModal(false)}
                className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-2 sm:p-4 max-h-[80vh] overflow-y-auto flex items-center justify-center bg-[#f5ede2]">
              <img
                src="/bang-gia-san-pham-gao-bach-moc.jpg"
                alt="Bảng Giá Sản Phẩm Gạo Bách Mộc"
                className="w-full h-auto max-h-[75vh] object-contain rounded-xl shadow-md"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
