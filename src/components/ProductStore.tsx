import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingBag, Star, CheckCircle, ShieldCheck, Info, X, Plus, Sprout, Award } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { ExperienceMealBuilder } from './ExperienceMealBuilder';

interface ProductStoreProps {
  onAddToCart: (product: Product) => void;
  selectedProductId?: string;
  selectedCategory?: string;
}

export const ProductStore: React.FC<ProductStoreProps> = ({
  onAddToCart,
  selectedProductId,
  selectedCategory = 'Tất Cả',
}) => {
  const { siteData } = useSite();
  const products = siteData?.products || [];

  const [activeCategory, setActiveCategory] = useState<string>(selectedCategory);
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(
    selectedProductId ? products.find((p) => p.id === selectedProductId) || null : null
  );

  React.useEffect(() => {
    if (selectedCategory) {
      setActiveCategory(selectedCategory);
    }
  }, [selectedCategory]);

  React.useEffect(() => {
    if (selectedProductId) {
      const found = products.find((p) => p.id === selectedProductId);
      if (found) {
        setActiveModalProduct(found);
      }
    }
  }, [selectedProductId, products]);

  const categories = [
    'Tất Cả',
    'Bữa Ăn Trải Nghiệm',
    'Gạo & Nông Sản',
    'Thịt & Hải Sản Sạch',
    'Rau Củ Hữu Cơ',
    'Mật Ong & Tự Nhiên',
    'Bộ Sản Phẩm Gia Đình',
    'Chăm Sóc & Gia Dụng',
  ];

  const filteredProducts =
    activeCategory === 'Tất Cả'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-[#2d241e] space-y-10">
      {/* Store Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#274e23]/10 text-[#274e23] text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-amber-600" />
          Tiêu Chuẩn Kiểm Định BMQ Standard (Qualified by Bách Mộc)
        </div>

        <h2 className="text-3xl sm:text-4xl font-black font-serif text-[#274e23]">
          Cửa Hàng Nông Sản Hữu Cơ & Thực Phẩm Lành
        </h2>

        <p className="text-[#5c4d43] text-sm max-w-2xl mx-auto leading-relaxed">
          100% Nông sản thu hoạch từ trang trại Bách Mộc và các nông hộ liên kết. Cam kết không hóa chất,
          không chất bảo quản, thông tin minh bạch từng túi hàng.
        </p>
      </div>

      {/* Category Pills Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#274e23] text-white shadow-md'
                : 'bg-white text-[#5c4d43] border border-[#e2d5c3] hover:bg-[#f0e6d8]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Experience Meal Builder when viewing Bữa Ăn Trải Nghiệm */}
      {activeCategory === 'Bữa Ăn Trải Nghiệm' && (
        <div className="my-6">
          <ExperienceMealBuilder onAddToCart={onAddToCart} />
        </div>
      )}

      {/* Product Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-[#e2d5c3] hover:border-[#274e23] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-lg group"
          >
            {/* Image */}
            <div
              className="relative h-52 bg-[#f0e6d8] overflow-hidden cursor-pointer"
              onClick={() => setActiveModalProduct(product)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-[#274e23] text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full shadow">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-[#7a6858]">
                  <span className="font-semibold text-[#274e23]">{product.category}</span>
                  <div className="flex items-center gap-1 text-amber-600 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span>{product.rating}</span>
                    <span className="text-[#a89584] font-normal">({product.reviewCount})</span>
                  </div>
                </div>

                <h3
                  onClick={() => setActiveModalProduct(product)}
                  className="font-bold font-serif text-base text-[#274e23] hover:text-amber-700 cursor-pointer transition-colors leading-snug"
                >
                  {product.name}
                </h3>
                <p className="text-xs text-[#5c4d43] line-clamp-2 leading-relaxed">
                  {product.subtitle}
                </p>
              </div>

              {/* Price & Add */}
              <div className="pt-3 border-t border-[#f0e6d8] flex items-center justify-between gap-2">
                <div>
                  <span className="text-lg font-black text-[#274e23]">
                    {product.price.toLocaleString('vi-VN')}đ
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-[#9e8b7b] line-through ml-1.5">
                      {product.originalPrice.toLocaleString('vi-VN')}đ
                    </span>
                  )}
                </div>

                <button
                  onClick={() => onAddToCart(product)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#274e23] hover:bg-[#1e3e1a] text-white font-bold text-xs tracking-wide transition-all shadow cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Thêm
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 bg-[#2d241e]/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#fcfaf7] border border-[#e2d5c3] rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#f0e6d8] hover:bg-[#e4d6c2] text-[#2d241e]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-5 h-56 rounded-2xl overflow-hidden bg-[#f0e6d8]">
                <img
                  src={activeModalProduct.image}
                  alt={activeModalProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="sm:col-span-7 space-y-3">
                <span className="text-xs font-bold text-[#274e23] uppercase tracking-wider">
                  {activeModalProduct.category}
                </span>
                <h3 className="text-2xl font-black font-serif text-[#274e23]">
                  {activeModalProduct.name}
                </h3>
                <p className="text-xs text-[#5c4d43] font-medium">{activeModalProduct.subtitle}</p>

                <div className="flex items-center gap-2 text-sm text-amber-600 font-bold">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>{activeModalProduct.rating} / 5</span>
                  <span className="text-[#8c7868]">({activeModalProduct.reviewCount} đánh giá)</span>
                </div>

                <div className="text-2xl font-black text-[#274e23] pt-1">
                  {activeModalProduct.price.toLocaleString('vi-VN')} VNĐ
                </div>

                <button
                  onClick={() => {
                    onAddToCart(activeModalProduct);
                    setActiveModalProduct(null);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#274e23] hover:bg-[#1e3e1a] text-white font-bold text-sm tracking-wide transition-all shadow cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-300" /> Thêm Vào Giỏ Hàng
                </button>
              </div>
            </div>

            {/* Description & Key Benefits */}
            <div className="space-y-4 pt-4 border-t border-[#e2d5c3] text-xs text-[#3d3229]">
              <div>
                <h4 className="font-bold text-[#274e23] text-sm mb-1 font-serif">Mô Tả Sản Phẩm</h4>
                <p className="leading-relaxed">{activeModalProduct.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-[#f4ebe0] p-3 rounded-xl border border-[#e2d5c3]">
                <div>
                  <span className="font-bold text-[#274e23] block text-[11px]">Nguồn Gốc Xuất Xứ:</span>
                  <span className="text-[11px] text-[#5c4d43]">{activeModalProduct.origin}</span>
                </div>
                <div>
                  <span className="font-bold text-[#274e23] block text-[11px]">Tiêu Chuẩn Kiểm Định:</span>
                  <span className="text-[11px] text-[#5c4d43]">{activeModalProduct.certification}</span>
                </div>
              </div>

              {activeModalProduct.dishSampleList && (
                <div className="bg-[#f2e9dc] p-3.5 rounded-2xl border border-[#dcd0bf] space-y-2">
                  <h4 className="font-bold text-[#274e23] text-xs uppercase tracking-wider font-serif">
                    Gợi Ý Các Món Trong Combo Bữa Ăn Trải Nghiệm:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#5c4d43]">
                    {activeModalProduct.dishSampleList.map((dish, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#a66e2c] font-bold">▪</span>
                        <span>{dish}</span>
                      </li>
                    ))}
                  </ul>
                  {activeModalProduct.flavorProfile && (
                    <div className="pt-2 border-t border-[#dcd0bf] text-[11px] text-[#7a6858] italic">
                      <span className="font-bold text-[#274e23] not-italic">Hương vị & Phong cách:</span> {activeModalProduct.flavorProfile}
                    </div>
                  )}
                </div>
              )}

              <div>
                <h4 className="font-bold text-[#274e23] text-xs uppercase tracking-wider mb-2 font-serif">
                  Lợi Ích Sức Khỏe & Điểm Nổi Bật
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeModalProduct.keyBenefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#3d3229]">
                      <CheckCircle className="w-4 h-4 text-[#274e23] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* BMQ Note */}
              <div className="p-4 rounded-2xl bg-[#274e23]/10 border border-[#274e23]/20 text-[#274e23] space-y-1">
                <div className="font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" /> Cam Kết Bách Mộc (BMQ Standard)
                </div>
                <p className="italic leading-relaxed">{activeModalProduct.bmqNote}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
