import React, { useState } from 'react';
import { Sprout, Clock, Users, ChevronRight, X, Heart } from 'lucide-react';

import { useSite } from '../context/SiteContext';

export const ChaoLuaMe: React.FC = () => {
  const { siteData } = useSite();
  const [activeCategory, setActiveCategory] = useState<string>('Tất Cả');
  const [activeModalItem, setActiveModalItem] = useState<any | null>(null);

  const categories = ['Tất Cả', 'Chương Trình', 'Dữ Liệu Dinh Dưỡng', 'Câu Chuyện'];

  const chaoLuaMeArticles = siteData.chaoLuaMeArticles || [];

  const filteredItems = activeCategory === 'Tất Cả' 
    ? chaoLuaMeArticles 
    : chaoLuaMeArticles.filter(item => item.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-[#2d241e] space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#274e23]/10 text-[#274e23] text-xs font-bold uppercase tracking-wider">
          <Heart className="w-4 h-4 text-amber-600" />
          Cháo Lúa Mẹ
        </div>

        <h2 className="text-3xl sm:text-4xl font-black font-serif text-[#274e23]">
          Thông Tin & Dữ Liệu Cháo Lúa Mẹ
        </h2>

        <p className="text-[#5c4d43] text-sm max-w-2xl mx-auto leading-relaxed">
          Nơi tổng hợp các dữ liệu dinh dưỡng, thông tin chương trình và câu chuyện về hành trình mang Cháo Lúa Mẹ đến với cộng đồng.
        </p>
      </div>

      {/* Filter Categories */}
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

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveModalItem(item)}
            className="bg-white rounded-2xl border border-[#e2d5c3] overflow-hidden hover:border-[#274e23] transition-all shadow-sm hover:shadow-md cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 bg-[#f0e6d8] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#274e23] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase shadow">
                  {item.category}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-bold font-serif text-base text-[#274e23] group-hover:text-amber-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#5c4d43] line-clamp-2 leading-relaxed">
                  {item.summary || item.description}
                </p>
                <p className="text-[10px] text-[#7a6858] font-semibold">{item.date}</p>
              </div>
            </div>

            <div className="p-4 bg-[#f8f5f0] border-t border-[#f0e6d8] flex items-center justify-between text-xs font-bold text-[#274e23]">
              <span>Xem chi tiết</span>
              <ChevronRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeModalItem && (
        <div
          onClick={() => setActiveModalItem(null)}
          className="fixed inset-0 z-50 bg-[#2d241e]/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#fcfaf7] border border-[#e2d5c3] rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto cursor-default"
          >
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#f0e6d8] hover:bg-[#e4d6c2] text-[#2d241e] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <span className="text-xs font-bold text-[#274e23] uppercase tracking-wider">
                {activeModalItem.category}
              </span>
              <h3 className="text-2xl font-black font-serif text-[#274e23]">
                {activeModalItem.title}
              </h3>
              
              <div className="text-xs text-[#7a6858] font-semibold">
                Ngày đăng: {activeModalItem.date}
              </div>

              {activeModalItem.image && (
                <div className="h-60 rounded-2xl overflow-hidden bg-[#f0e6d8]">
                  <img
                    src={activeModalItem.image}
                    alt={activeModalItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="prose prose-sm text-[#3d3229] leading-relaxed">
                <p className="font-medium text-[#2d241e] mb-2">{activeModalItem.summary || activeModalItem.description}</p>
                <p>{activeModalItem.transcriptSnippet || activeModalItem.content}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#274e23]/10 border border-[#274e23]/20 text-[#274e23] text-xs">
                <span className="font-bold uppercase tracking-wider block mb-1">Giá Trị Cốt Lõi:</span>
                <p className="italic">Cháo Lúa Mẹ - Tinh hoa nông sản hữu cơ Bách Mộc, nuôi dưỡng thể chất và tinh thần.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
