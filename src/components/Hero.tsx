import React from 'react';
import { Sprout, Store, ArrowRight, ShieldCheck, CheckCircle2, Users, ShoppingBag, Sparkles, MapPin } from 'lucide-react';
import { TabType } from '../types';
import { useSite } from '../context/SiteContext';

interface HeroProps {
  setActiveTab: (tab: TabType) => void;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab }) => {
  const { siteData } = useSite();
  const heroConfig = siteData?.heroConfig || {
    badgeTag: 'Hệ Sinh Thái Nông Sản Hữu Cơ & Sống Xanh Bách Mộc',
    titlePart1: 'BiO Station –',
    titleHighlight: 'Chạm Để Trở Về',
    subTitle: 'Trải nghiệm – Bán lẻ – Kết nối Thuận tự nhiên',
    descriptionText: 'BiO Station là điểm chạm để mọi người sống thuận tự nhiên hơn mỗi ngày.',
    coreValue1Title: 'Đúng',
    coreValue1Desc: 'Nguồn gốc rõ ràng',
    coreValue2Title: 'Thật',
    coreValue2Desc: 'Sản phẩm & thông tin thật',
    coreValue3Title: 'Thuận tự nhiên',
    coreValue3Desc: 'Sống hài hòa sinh thái',
    ctaPrimaryText: 'Xem Mô Hình Kinh Doanh',
    ctaSecondaryText: 'Nông Sản BMQ Qualified',
  };
  const brandConfig = siteData?.brandConfig || {
    familyCountBadge: 'Hơn 10,000+ Gia Đình Sống Xanh',
  };

  return (
    <div className="relative bg-[#f8f5f0] text-[#2d241e] overflow-hidden border-b border-[#e2d5c3]">
      {/* Decorative Warm Organic Background Shapes */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-[#274e23]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headline & Main Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#274e23]/10 border border-[#274e23]/20 text-[#274e23] text-xs font-bold uppercase tracking-wider">
              <Sprout className="w-4 h-4 text-amber-600" />
              <span>{heroConfig.badgeTag}</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black font-serif tracking-tight leading-tight text-[#274e23]">
                {heroConfig.titlePart1} <br />
                <span className="text-[#a66e2c] font-serif italic">{heroConfig.titleHighlight}</span>
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-[#5c4d43] font-serif">
                {heroConfig.subTitle}
              </p>
            </div>

            <p className="text-base text-[#5c4d43] leading-relaxed max-w-2xl">
              {heroConfig.descriptionText}
            </p>

            {/* Core Values 3 Badges */}
            <div className="grid grid-cols-3 gap-3 bg-[#f2e9dc] p-3.5 rounded-2xl border border-[#e2d5c3]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#274e23] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-[#274e23]">{heroConfig.coreValue1Title}</div>
                  <div className="text-[10px] text-[#7a6858]">{heroConfig.coreValue1Desc}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-[#274e23]">{heroConfig.coreValue2Title}</div>
                  <div className="text-[10px] text-[#7a6858]">{heroConfig.coreValue2Desc}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Sprout className="w-5 h-5 text-emerald-700 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-[#274e23]">{heroConfig.coreValue3Title}</div>
                  <div className="text-[10px] text-[#7a6858]">{heroConfig.coreValue3Desc}</div>
                </div>
              </div>
            </div>

            {/* Main Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setActiveTab('model')}
                className="flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[#274e23] hover:bg-[#1e3e1a] text-white font-bold text-sm tracking-wide transition-all shadow-lg cursor-pointer"
              >
                <Store className="w-5 h-5 text-amber-400" />
                <span>{heroConfig.ctaPrimaryText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('shop')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#f0e6d8] hover:bg-[#e4d6c2] text-[#274e23] font-bold text-sm border border-[#dcd0bf] transition-all cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 text-[#274e23]" />
                <span>{heroConfig.ctaSecondaryText}</span>
              </button>
            </div>

            {/* Trust Footer Info */}
            <div className="pt-4 flex items-center gap-6 border-t border-[#e2d5c3] text-xs text-[#7a6858]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#274e23]" />
                <span>{brandConfig.headquarters}</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-600" />
                <span>{brandConfig.familyCountBadge}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Ecosystem Quick Launch Cards */}
          <div className="lg:col-span-5 space-y-3.5">
            {/* Card 1: Business Plan Canvas */}
            <div
              onClick={() => setActiveTab('model')}
              className="p-5 rounded-2xl bg-white border border-[#e2d5c3] hover:border-[#274e23] cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#274e23]/10 text-[#274e23] flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform shrink-0">
                  <Store className="w-6 h-6 text-[#274e23]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-[#274e23] font-serif group-hover:text-amber-700 transition-colors flex items-center justify-between">
                    {heroConfig.card1Title || 'Kế Hoạch Kinh Doanh 7 Trụ Cột'}
                    <ArrowRight className="w-4 h-4 text-[#8c7868] group-hover:text-[#274e23] transition-colors" />
                  </h3>
                  <p className="text-xs text-[#6e5d4f] mt-0.5">
                    {heroConfig.card1Desc || 'Mô hình Trải nghiệm – Bán lẻ – Doanh thu & Chi phí dự kiến.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Organic Shop */}
            <div
              onClick={() => setActiveTab('shop')}
              className="p-5 rounded-2xl bg-white border border-[#e2d5c3] hover:border-[#274e23] cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform shrink-0">
                  <ShoppingBag className="w-6 h-6 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-[#274e23] font-serif group-hover:text-amber-700 transition-colors flex items-center justify-between">
                    {heroConfig.card2Title || 'Gạo Hữu Cơ & Nông Sản BMQ'}
                    <ArrowRight className="w-4 h-4 text-[#8c7868] group-hover:text-[#274e23] transition-colors" />
                  </h3>
                  <p className="text-xs text-[#6e5d4f] mt-0.5">
                    {heroConfig.card2Desc || 'Gạo ST25 Bách Mộc, Rau củ tươi hái trong ngày, Mật ong BiO.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Station Network */}
            <div
              onClick={() => setActiveTab('network')}
              className="p-5 rounded-2xl bg-white border border-[#e2d5c3] hover:border-[#274e23] cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform shrink-0">
                  <MapPin className="w-6 h-6 text-emerald-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-[#274e23] font-serif group-hover:text-amber-700 transition-colors flex items-center justify-between">
                    Mạng Lưới Station Toàn Quốc
                    <ArrowRight className="w-4 h-4 text-[#8c7868] group-hover:text-[#274e23] transition-colors" />
                  </h3>
                  <p className="text-xs text-[#6e5d4f] mt-0.5">
                    Station Trung tâm, Station Cộng đồng khu dân cư & Điểm đối tác.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4: BiO AI Assistant */}
            <div
              onClick={() => setActiveTab('advisor')}
              className="p-5 rounded-2xl bg-white border border-[#e2d5c3] hover:border-[#274e23] cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-600/10 text-amber-700 flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform shrink-0">
                  <Sparkles className="w-6 h-6 text-amber-600 animate-pulse" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-[#274e23] font-serif group-hover:text-amber-700 transition-colors flex items-center justify-between">
                    Tư Vấn Viên AI Bách Mộc
                    <ArrowRight className="w-4 h-4 text-[#8c7868] group-hover:text-[#274e23] transition-colors" />
                  </h3>
                  <p className="text-xs text-[#6e5d4f] mt-0.5">
                    Hỏi đáp về nông sản sạch, bảo quản rau củ & chọn gạo cho bé.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
