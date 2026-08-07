import React, { useState } from 'react';
import { Article, Product } from '../types';
import { BookOpen, Eye, Clock, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useSite } from '../context/SiteContext';

interface KnowledgeBaseProps {
  onSelectProduct: (product: Product) => void;
}

export const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({ onSelectProduct }) => {
  const { siteData } = useSite();
  const articles = siteData?.articles || [];
  const products = siteData?.products || [];

  const [activeCategory, setActiveCategory] = useState<string>('Tất Cả');
  const [activeModalArticle, setActiveModalArticle] = useState<Article | null>(null);

  const categories = [
    'Tất Cả',
    'Mô Hình BiO Station',
    'Tiêu Chuẩn BMQ',
    'Trồng Cây Thuận Tự Nhiên',
  ];

  const filteredArticles =
    activeCategory === 'Tất Cả'
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-[#2d241e] space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#274e23]/10 text-[#274e23] text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-amber-600" />
          Tri Thức Sống Xanh & Nông Nghiệp Sinh Thái
        </div>

        <h2 className="text-3xl sm:text-4xl font-black font-serif text-[#274e23]">
          Thư Viện Sống Thuận Tự Nhiên Bách Mộc
        </h2>

        <p className="text-[#5c4d43] text-sm max-w-2xl mx-auto leading-relaxed">
          Tổng hợp các bài viết truyền cảm hứng về lối sống xanh, chuẩn kiểm định BMQ và mô hình phát triển chuỗi BiO Station.
        </p>
      </div>

      {/* Categories */}
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

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((art) => (
          <div
            key={art.id}
            onClick={() => setActiveModalArticle(art)}
            className="bg-white rounded-2xl border border-[#e2d5c3] overflow-hidden hover:border-[#274e23] transition-all shadow-sm hover:shadow-md cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 bg-[#f0e6d8] overflow-hidden">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#274e23] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase shadow">
                  {art.category}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-bold font-serif text-base text-[#274e23] group-hover:text-amber-700 transition-colors leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-[#5c4d43] line-clamp-3 leading-relaxed">
                  {art.summary}
                </p>

                <div className="flex items-center gap-4 text-xs text-[#7a6858] pt-2 border-t border-[#f0e6d8]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    {art.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-amber-600" />
                    {art.views}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#f8f5f0] border-t border-[#f0e6d8] flex items-center justify-between text-xs font-bold text-[#274e23]">
              <span>Đọc bài viết</span>
              <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Modal */}
      {activeModalArticle && (() => {
        const keyTakeaways = Array.isArray(activeModalArticle.keyTakeaways)
          ? activeModalArticle.keyTakeaways
          : (typeof activeModalArticle.keyTakeaways === 'string'
              ? (() => { try { return JSON.parse(activeModalArticle.keyTakeaways); } catch { return []; } })()
              : []);

        const recommendedProductIds = Array.isArray(activeModalArticle.recommendedProductIds)
          ? activeModalArticle.recommendedProductIds
          : (typeof activeModalArticle.recommendedProductIds === 'string'
              ? (() => { try { return JSON.parse(activeModalArticle.recommendedProductIds); } catch { return []; } })()
              : []);

        const snippet = activeModalArticle.transcriptSnippet || activeModalArticle.summary || activeModalArticle.excerpt || 'Tri thức sống xanh và nông nghiệp sinh thái Bách Mộc.';

        return (
          <div
            onClick={() => setActiveModalArticle(null)}
            className="fixed inset-0 z-50 bg-[#2d241e]/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto cursor-pointer"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-[#fcfaf7] border border-[#e2d5c3] rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto cursor-default"
            >
              <button
                onClick={() => setActiveModalArticle(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#f0e6d8] hover:bg-[#e4d6c2] text-[#2d241e] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <span className="text-xs font-bold text-[#274e23] uppercase tracking-wider">
                  {activeModalArticle.category || 'Mô Hình BiO Station'}
                </span>
                <h3 className="text-2xl font-black font-serif text-[#274e23]">
                  {activeModalArticle.title}
                </h3>

                {activeModalArticle.image && (
                  <div className="h-56 rounded-2xl overflow-hidden bg-[#f0e6d8]">
                    <img
                      src={activeModalArticle.image}
                      alt={activeModalArticle.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {keyTakeaways.length > 0 && (
                  <div className="p-4 bg-[#f4ebe0] rounded-2xl border border-[#e2d5c3]">
                    <h4 className="font-bold text-[#274e23] text-xs uppercase tracking-wider mb-2 font-serif">
                      Điểm Cốt Lõi Bài Viết
                    </h4>
                    <ul className="space-y-2 text-xs text-[#3d3229]">
                      {keyTakeaways.map((take: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#274e23] mt-1.5 shrink-0" />
                          <span className="leading-relaxed">{take}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h4 className="font-bold text-[#274e23] text-sm font-serif mb-1">Trích Đoạn</h4>
                  <p className="text-xs text-[#5c4d43] italic leading-relaxed bg-white p-4 rounded-xl border border-[#e2d5c3]">
                    "{snippet}"
                  </p>
                </div>

                {/* Recommended Products */}
                {recommendedProductIds.length > 0 && (
                  <div className="pt-4 border-t border-[#e2d5c3]">
                    <h4 className="font-bold text-[#274e23] text-xs uppercase tracking-wider mb-3 font-serif">
                      Sản Phẩm Đề Xuất Liên Quan
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {recommendedProductIds.map((pId: string) => {
                        const prod = products.find((p) => p.id === pId);
                        if (!prod) return null;
                        return (
                          <div
                            key={prod.id}
                            onClick={() => {
                              setActiveModalArticle(null);
                              onSelectProduct(prod);
                            }}
                            className="flex items-center gap-3 p-2.5 bg-white rounded-xl border border-[#e2d5c3] hover:border-[#274e23] cursor-pointer transition-all"
                          >
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-10 h-10 object-cover rounded-lg bg-[#f0e6d8]"
                            />
                            <div className="flex-1 min-w-0 text-xs">
                              <p className="font-bold text-[#274e23] truncate">{prod.name}</p>
                              <p className="text-[#a66e2c] font-black">{prod.price ? prod.price.toLocaleString('vi-VN') : 0}đ</p>
                            </div>
                            <ShoppingBag className="w-4 h-4 text-[#274e23]" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
