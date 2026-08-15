import React, { useState } from 'react';
import { Phone, MapPin, X } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const FloatingActions: React.FC = () => {
  const { siteData } = useSite();
  const [showMapOptions, setShowMapOptions] = useState(false);

  const hotline = siteData?.brandConfig?.hotline || '';
  const mapCenter = siteData?.brandConfig?.mapLinkCenter || '';
  const mapStore = siteData?.brandConfig?.mapLinkStore || '';

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      {/* Google Maps Actions */}
      <div className="relative">
        {showMapOptions && (
          <div className="absolute bottom-full right-0 mb-4 w-64 bg-white rounded-2xl shadow-xl border border-[#e2d5c3] overflow-hidden animate-fade-in-up origin-bottom-right">
            <div className="bg-[#274e23] text-white p-3 flex justify-between items-center">
              <span className="font-bold text-sm">Chọn Điểm Trạm</span>
              <button 
                onClick={() => setShowMapOptions(false)}
                className="hover:bg-white/20 p-1 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-2 space-y-1">
              <a 
                href={mapCenter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-3 hover:bg-[#f8f5f0] rounded-xl transition-colors text-sm font-semibold text-[#274e23]"
              >
                BiO Station Trung tâm
              </a>
              <a 
                href={mapStore} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-3 hover:bg-[#f8f5f0] rounded-xl transition-colors text-sm font-semibold text-[#274e23]"
              >
                Cơm Cháo Gạo Lứt Hữu Cơ BiO Station
              </a>
            </div>
          </div>
        )}
        
        <button
          onClick={() => setShowMapOptions(!showMapOptions)}
          className="w-14 h-14 bg-amber-500 hover:bg-amber-600 text-white rounded-full shadow-lg shadow-amber-500/30 flex justify-center items-center cursor-pointer transition-transform hover:scale-110 active:scale-95"
          title="Bản Đồ Điểm Trạm"
        >
          <MapPin className="w-6 h-6" />
        </button>
      </div>

      {/* Hotline Action */}
      <a
        href={`tel:${hotline.replace(/\D/g, '')}`}
        className="w-14 h-14 bg-[#274e23] hover:bg-[#1a3517] text-white rounded-full shadow-lg shadow-[#274e23]/30 flex justify-center items-center cursor-pointer transition-transform hover:scale-110 active:scale-95 animate-bounce-slow"
        title="Gọi Điện Hotline"
      >
        <Phone className="w-6 h-6" />
      </a>
    </div>
  );
};
