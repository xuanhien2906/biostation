import React, { useState } from 'react';
import { Phone, MapPin, X, Navigation, Sparkles, ExternalLink } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const FloatingActions: React.FC = () => {
  const { siteData } = useSite();
  const [showMapOptions, setShowMapOptions] = useState(false);

  const hotline = siteData?.brandConfig?.hotline || '0901234567';
  const mapCenter = siteData?.brandConfig?.mapLinkCenter || 'https://maps.google.com';
  const mapStore = siteData?.brandConfig?.mapLinkStore || 'https://maps.google.com';

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-5 z-50 select-none">
      {/* ================= 1. GOOGLE MAPS FLOATING BUTTON ================= */}
      <div className="relative group flex items-center gap-3">
        {/* Hover Tooltip Label */}
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-2 group-hover:translate-x-0 bg-stone-900/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xl border border-stone-700/50 flex items-center gap-1.5 whitespace-nowrap">
          <Navigation className="w-3.5 h-3.5 text-amber-400" />
          <span>Tìm Điểm Trạm BiO</span>
        </div>

        {/* 3D Motion Popup Card */}
        {showMapOptions && (
          <div className="absolute bottom-full right-0 mb-4 w-72 sm:w-80 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-200/80 overflow-hidden transform transition-all duration-300 origin-bottom-right z-50 animate-fade-in-up">
            {/* Popup Header with 3D gradient */}
            <div className="bg-gradient-to-r from-[#1b3d17] via-[#274e23] to-[#366731] text-white p-4 relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex justify-between items-center relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-amber-300 animate-map-bounce" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white tracking-wide">Chỉ Đường Google Maps</h4>
                    <p className="text-[11px] text-amber-200/80">Chọn cơ sở bạn muốn ghé thăm</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => setShowMapOptions(false)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Đóng"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Popup List of Locations */}
            <div className="p-3 space-y-2.5 bg-gradient-to-b from-[#fdfcf9] to-[#f7f2ea]">
              {/* Option 1: BiO Station Trung Tâm */}
              <a 
                href={mapCenter} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setShowMapOptions(false)}
                className="group/item block p-3.5 rounded-2xl bg-white border border-stone-200/80 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5 ring-4 ring-emerald-100 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-stone-900 group-hover/item:text-[#274e23] transition-colors">
                        BiO Station Trung Tâm
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">Trụ sở sinh thái & Tiếp nhận thành viên</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-stone-400 group-hover/item:text-amber-600 transition-colors flex-shrink-0" />
                </div>
              </a>

              {/* Option 2: Cơm Cháo Gạo Lứt Hữu Cơ */}
              <a 
                href={mapStore} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setShowMapOptions(false)}
                className="group/item block p-3.5 rounded-2xl bg-white border border-stone-200/80 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1.5 ring-4 ring-amber-100 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-stone-900 group-hover/item:text-[#274e23] transition-colors">
                        Cơm Cháo Gạo Lứt Hữu Cơ BiO
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">Bếp ăn dinh dưỡng & Thực phẩm Bách Mộc</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-stone-400 group-hover/item:text-amber-600 transition-colors flex-shrink-0" />
                </div>
              </a>
            </div>

            {/* Popup Footer Note */}
            <div className="px-4 py-2 bg-stone-100/70 border-t border-stone-200/60 flex items-center justify-between text-[10px] text-stone-500">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" /> Dẫn đường trực tiếp qua GPS
              </span>
              <span className="font-semibold text-emerald-700">Mở Google Maps</span>
            </div>
          </div>
        )}
        
        {/* 3D Motion Sphere Button - Map */}
        <div className="relative animate-float-3d">
          {/* Radar Waves */}
          <div className="absolute -inset-2 bg-amber-400/40 rounded-full animate-ripple-1 pointer-events-none" />
          <div className="absolute -inset-2 bg-orange-400/30 rounded-full animate-ripple-2 pointer-events-none" />

          {/* 3D Sphere Button */}
          <button
            onClick={() => setShowMapOptions(!showMapOptions)}
            className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 p-[2px] shadow-[0_10px_25px_-5px_rgba(217,119,6,0.5),0_0_0_1px_rgba(255,255,255,0.4)_inset] hover:shadow-[0_15px_30px_-5px_rgba(217,119,6,0.7),0_0_0_2px_rgba(255,255,255,0.6)_inset] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer overflow-hidden flex items-center justify-center group/btn"
            title="Bản Đồ Điểm Trạm BiO Station"
          >
            {/* 3D Gloss reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-black/20 rounded-full pointer-events-none" />
            
            {/* Animated Gloss Shine Sweep */}
            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 animate-gloss-shine pointer-events-none" />

            {/* Inner Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-white">
              <MapPin className="w-6 h-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] animate-map-bounce" />
            </div>

            {/* Mini active badge */}
            <span className="absolute top-1.5 right-1.5 w-3 h-3 bg-red-500 border-2 border-white rounded-full shadow-sm animate-pulse" />
          </button>
        </div>
      </div>

      {/* ================= 2. HOTLINE FLOATING BUTTON ================= */}
      <div className="relative group flex items-center gap-3">
        {/* Hover Tooltip Label */}
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-2 group-hover:translate-x-0 bg-stone-900/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xl border border-stone-700/50 flex items-center gap-1.5 whitespace-nowrap">
          <Phone className="w-3.5 h-3.5 text-emerald-400 animate-phone-ring" />
          <span>Hotline: {hotline}</span>
        </div>

        {/* 3D Motion Sphere Button - Hotline */}
        <div className="relative animate-float-3d-delay">
          {/* Radar Waves */}
          <div className="absolute -inset-2 bg-emerald-500/40 rounded-full animate-ripple-1 pointer-events-none" />
          <div className="absolute -inset-2 bg-[#274e23]/35 rounded-full animate-ripple-2 pointer-events-none" />

          {/* 3D Sphere Button */}
          <a
            href={`tel:${hotline.replace(/\D/g, '')}`}
            className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#132c10] via-[#274e23] to-[#427d3c] p-[2px] shadow-[0_10px_25px_-5px_rgba(39,78,35,0.6),0_0_0_1px_rgba(255,255,255,0.4)_inset] hover:shadow-[0_15px_30px_-5px_rgba(39,78,35,0.8),0_0_0_2px_rgba(255,255,255,0.6)_inset] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer overflow-hidden flex items-center justify-center group/btn"
            title={`Gọi Ngay Hotline: ${hotline}`}
          >
            {/* 3D Gloss reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-black/30 rounded-full pointer-events-none" />

            {/* Animated Gloss Shine Sweep */}
            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 animate-gloss-shine pointer-events-none" />

            {/* Inner Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-white">
              <Phone className="w-6 h-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] animate-phone-ring text-emerald-300" />
            </div>

            {/* Mini pulsing live indicator */}
            <span className="absolute top-1.5 right-1.5 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full shadow-sm animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full shadow-sm" />
          </a>
        </div>
      </div>
    </div>
  );
};
