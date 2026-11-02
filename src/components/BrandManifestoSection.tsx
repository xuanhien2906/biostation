import React, { useState } from 'react';
import {
  Sprout,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Phone,
  Globe,
  ArrowRight,
  Maximize2,
  X,
  Eye,
  Heart,
  Store,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import { TabType } from '../types';

interface BrandManifestoSectionProps {
  setActiveTab?: (tab: TabType) => void;
}

export const BrandManifestoSection: React.FC<BrandManifestoSectionProps> = ({ setActiveTab }) => {
  const [showPosterModal, setShowPosterModal] = useState(false);

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 bg-gradient-to-b from-[#f2e9dc] via-[#f8f5f0] to-[#f4ece1] border-b border-[#dfd2bf] text-[#2d241e]">
      {/* Decorative organic background blurs */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-[#274e23]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* GRAND MANIFESTO HERO HEADER: LEFT TEXT CLUSTER + RIGHT LARGE TRANSPARENT LOGO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* BÊN TRÁI: Cụm thông điệp Tuyên Ngôn Thương Hiệu */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-5 order-1">
            <div className="inline-flex items-center gap-1.5 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#274e23] text-amber-300 border border-[#1e3e1a] text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest shadow-sm whitespace-nowrap">
              <Sprout className="w-4 h-4 text-amber-400 shrink-0" />
              <span>TUYÊN NGÔN THƯƠNG HIỆU BiO STATION</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-serif text-[#274e23] tracking-tight leading-none">
                Chạm Để Trở Về
              </h1>
              <p className="text-lg sm:text-2xl md:text-3xl font-bold font-serif text-[#a66e2c] italic max-w-2xl mx-auto lg:mx-0 leading-snug text-balance">
                Trở về với thiên nhiên, với bản thể gốc của chính mình
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#5c4d43] leading-relaxed max-w-2xl mx-auto lg:mx-0 text-balance">
              Là hệ thống trạm trải nghiệm kết nối con người với thiên nhiên qua nông sản thuần tự nhiên. 
              Nơi bạn được sống chậm để cảm nhận sự sống và tìm về giá trị nguyên sơ an lành nhất.
            </p>

            {/* 4 SENSES BADGE STRIP */}
            <div className="inline-flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#dcd0bf] shadow-sm text-xs text-[#274e23] font-bold max-w-full">
              <span className="text-amber-800 uppercase tracking-wider text-[11px]">Trải nghiệm 4 giác quan:</span>
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-nowrap">
                <span className="px-2 sm:px-2.5 py-1 rounded-lg bg-[#274e23]/10 whitespace-nowrap">👁️ Nhìn</span>
                <span className="px-2 sm:px-2.5 py-1 rounded-lg bg-[#274e23]/10 whitespace-nowrap">✋ Chạm</span>
                <span className="px-2 sm:px-2.5 py-1 rounded-lg bg-[#274e23]/10 whitespace-nowrap">👃 Ngửi</span>
                <span className="px-2 sm:px-2.5 py-1 rounded-lg bg-[#274e23]/10 whitespace-nowrap">👅 Nếm</span>
              </div>
              <span className="text-[11px] text-[#7a6858] font-normal hidden xl:inline">• Sản vật thuận mùa đạt chuẩn hữu cơ cao nhất</span>
            </div>

            {/* MAIN CTAS */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
              {setActiveTab && (
                <button
                  onClick={() => {
                    setActiveTab('model');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#274e23] hover:bg-[#1e3e1a] text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg transition-all hover:scale-105 cursor-pointer"
                >
                  <Store className="w-4 h-4 text-amber-300" />
                  <span>Xem Mô Hình Kinh Doanh</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {setActiveTab && (
                <button
                  onClick={() => {
                    setActiveTab('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow hover:scale-105 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Nông Sản BMQ Qualified</span>
                </button>
              )}

              <button
                onClick={() => setShowPosterModal(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-[#274e23] hover:text-amber-800 bg-white/90 hover:bg-white px-5 py-3.5 rounded-xl border border-[#dcd0bf] transition-all shadow-sm cursor-pointer"
              >
                <Maximize2 className="w-4 h-4 text-amber-600" />
                <span>Xem Poster Tuyên Ngôn Gốc</span>
              </button>
            </div>
          </div>

          {/* BÊN PHẢI: Logo BiO Station Tách Nền Hiển Thị To & Nổi Bật */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end order-2">
            <div className="relative flex items-center justify-center p-2 sm:p-4">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#274e23]/10 via-amber-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />
              <img
                src="/bio-station-tree-logo.png"
                alt="BiO Station – Chạm để trở về"
                className="relative z-10 w-72 sm:w-80 md:w-96 lg:w-[430px] xl:w-[480px] h-auto object-contain drop-shadow-[0_12px_24px_rgba(39,78,35,0.18)] hover:scale-[1.03] transition-transform duration-500 select-none"
              />
            </div>
          </div>

        </div>

        {/* 3 CORE PILLARS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* CỘT 1: BẢN CHẤT & TRẢI NGHIỆM */}
          <div className="bg-white/95 rounded-3xl p-6 sm:p-7 border border-[#dfd2bf] hover:border-[#274e23] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#f0e6d8]">
                <div className="w-12 h-12 rounded-2xl bg-[#274e23]/10 text-[#274e23] flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform">
                  🌿
                </div>
                <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-emerald-50 text-[#274e23] border border-emerald-200">
                  Trụ Cột 01
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold font-serif text-[#274e23] uppercase tracking-wide">
                  Bản Chất & Trải Nghiệm
                </h3>
                <p className="text-xs text-[#a66e2c] font-medium mt-0.5">
                  Đánh thức trọn vẹn giác quan nguyên sơ
                </p>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-[#5c4d43] leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Là hệ thống trạm trải nghiệm:</strong> Kết nối con người với thiên nhiên qua <span className="whitespace-nowrap">nông sản thuần tự nhiên.</span>
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Trải nghiệm đa giác quan:</strong> Nơi bạn được <span className="font-bold text-[#274e23] whitespace-nowrap">Nhìn – Chạm – Ngửi – Nếm</span> sản vật thuận mùa, đạt chuẩn <span className="whitespace-nowrap">hữu cơ cao nhất.</span>
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Không gian sống chậm:</strong> Để cảm nhận sự sống và tìm về <span className="whitespace-nowrap">giá trị nguyên sơ.</span>
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-[#f0e6d8] bg-[#f8f5f0] p-3 rounded-2xl">
              <div className="text-[11px] font-bold text-[#274e23] flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-amber-600" />
                <span>Nhìn • Chạm • Ngửi • Nếm</span>
              </div>
              <div className="text-[10px] text-[#7a6858] mt-0.5">
                Sản vật thuận tự nhiên tại các điểm trạm
              </div>
            </div>
          </div>

          {/* CỘT 2: SỨ MỆNH & VẬN HÀNH */}
          <div className="bg-white/95 rounded-3xl p-6 sm:p-7 border border-[#dfd2bf] hover:border-amber-600 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#f0e6d8]">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform">
                  🤝
                </div>
                <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                  Trụ Cột 02
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold font-serif text-[#274e23] uppercase tracking-wide">
                  Sứ Mệnh & Vận Hành
                </h3>
                <p className="text-xs text-amber-700 font-medium mt-0.5">
                  4 Hành động cốt lõi kiến tạo cộng đồng
                </p>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-[#5c4d43] leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <span>
                    <strong className="text-[#274e23] uppercase">Chia sẻ:</strong> Lối sống thuận tự nhiên.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <span>
                    <strong className="text-[#274e23] uppercase">Trải nghiệm:</strong> Chân thực về sản vật bản địa.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <span>
                    <strong className="text-[#274e23] uppercase">Kết nối:</strong> Người canh tác với người tiêu dùng.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </div>
                  <span>
                    <strong className="text-[#274e23] uppercase">Phân phối:</strong> Nông sản, phát triển Cộng đồng Tiêu dùng Thuần tự nhiên.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-[#f0e6d8] bg-[#f8f5f0] p-3 rounded-2xl">
              <div className="text-[11px] font-bold text-amber-800 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-amber-600" />
                <span>Chia Sẻ • Trải Nghiệm • Kết Nối • Phân Phối</span>
              </div>
              <div className="text-[10px] text-[#7a6858] mt-0.5">
                Mô hình khép kín từ đất mẹ đến bàn ăn
              </div>
            </div>
          </div>

          {/* CỘT 3: TIÊU CHUẨN BMQ */}
          <div className="bg-white/95 rounded-3xl p-6 sm:p-7 border border-[#dfd2bf] hover:border-emerald-600 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#f0e6d8]">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-800 flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform">
                  🛡️
                </div>
                <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200">
                  Trụ Cột 03
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold font-serif text-[#274e23] uppercase tracking-wide">
                  Tiêu Chuẩn BMQ
                </h3>
                <p className="text-xs text-emerald-800 font-medium mt-0.5">
                  Hệ quy chuẩn Bách Mộc Qualified
                </p>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-[#5c4d43] leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Nguồn hàng:</strong> Từ Cộng đồng Canh tác Thuận tự nhiên.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Hệ tiêu chuẩn BMQ (Bách Mộc):</strong> Làm nền tảng lựa chọn, đánh giá.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Đạo đức nông nghiệp:</strong> Đảm bảo canh tác nghiêm ngặt, minh bạch, trách nhiệm với đất đai và hệ sinh thái.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-[#f0e6d8] bg-[#f8f5f0] p-3 rounded-2xl">
              <div className="text-[11px] font-bold text-emerald-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>100% Thuận Tự Nhiên & Minh Bạch</span>
              </div>
              <div className="text-[10px] text-[#7a6858] mt-0.5">
                Trách nhiệm cao nhất với đất đai và sức khỏe
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM BANNER: TRẠM TRẢI NGHIỆM MẪU CẦN GIỜ & LIÊN HỆ */}
        <div className="bg-[#274e23] text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-[#1e3e1a] relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
            {/* Left Info: Trạm mẫu Cần Giờ */}
            <div className="lg:col-span-7 space-y-3 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Store className="w-3.5 h-3.5 text-amber-400" />
                <span>Trạm Trải Nghiệm Mẫu Điển Hình</span>
              </div>

              <h4 className="text-xl sm:text-2xl font-bold font-serif text-white">
                BiO Station Cần Giờ
              </h4>

              <div className="space-y-1.5 text-xs sm:text-sm text-emerald-100">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Địa chỉ:</strong> 336 Lương Văn Nho, Xã Cần Giờ, TP. Hồ Chí Minh</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>Hotline:</strong> 0388.500.500</span>
                </p>
                <p className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>Website:</strong> biostation.vn</span>
                </p>
              </div>
            </div>

            {/* Right Action Buttons */}
            <div className="lg:col-span-5 flex flex-wrap items-center justify-start lg:justify-end gap-3 pt-2 lg:pt-0">
              {setActiveTab && (
                <button
                  onClick={() => {
                    setActiveTab('network');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow transition-all hover:scale-105 cursor-pointer"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Khám Phá Điểm Trạm Cần Giờ</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {setActiveTab && (
                <button
                  onClick={() => {
                    setActiveTab('model');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Store className="w-4 h-4 text-amber-300" />
                  <span>Mô Hình Kinh Doanh</span>
                </button>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* MODAL PHÓNG TO POSTER TUYÊN NGÔN GỐC */}
      {showPosterModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowPosterModal(false)}
        >
          <div 
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-700 animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 bg-[#274e23] text-white">
              <div className="flex items-center gap-2">
                <Sprout className="w-5 h-5 text-amber-400" />
                <h3 className="font-serif font-bold text-base text-amber-200">
                  Poster Tuyên Ngôn Thương Hiệu BiO Station
                </h3>
              </div>
              <button
                onClick={() => setShowPosterModal(false)}
                className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-2 sm:p-4 max-h-[80vh] overflow-y-auto flex items-center justify-center bg-[#f5ede2]">
              <img
                src="/tuyen-ngon-thuong-hieu.jpg"
                alt="Tuyên Ngôn Thương Hiệu BiO Station"
                className="w-full h-auto max-h-[75vh] object-contain rounded-xl shadow-md border border-[#dfd2bf]"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80';
                }}
              />
            </div>

            <div className="p-3 bg-[#f8f5f0] border-t border-[#dfd2bf] flex items-center justify-between text-xs text-[#5c4d43]">
              <span className="font-semibold">Chạm để trở về – trở về với thiên nhiên, với bản thể gốc của chính mình</span>
              <button
                onClick={() => setShowPosterModal(false)}
                className="px-4 py-1.5 bg-[#274e23] text-white rounded-lg font-bold text-xs hover:bg-[#1e3e1a] cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
