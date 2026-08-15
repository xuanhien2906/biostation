import React from 'react';
import { TabType } from '../types';
import { BioStationLogo } from './BioStationLogo';
import { MapPin, Phone, Mail, Globe, Sprout, Heart, ShieldCheck } from 'lucide-react';
import { useSite } from '../context/SiteContext';

interface FooterProps {
  setActiveTab: (tab: TabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const { siteData } = useSite();
  const brandConfig = siteData?.brandConfig || {
    subSlogan: 'Trải nghiệm – Bán lẻ – Kết nối Thuận tự nhiên',
    address: 'VP Bách Mộc – Khu đô thị Phú Mỹ Hưng, Quận 7, TP. HCM',
    hotline: '0908 123 456',
    websiteUrl: 'biostation.vn',
    email: 'contact@biostation.vn',
    copyrightText: '© 2026 BiO Station – Hệ Sinh Thái Bách Mộc. Chạm để trở về.',
    footerDescription: 'BiO Station là hệ sinh thái điểm trạm nông sản hữu cơ Bách Mộc, kết nối cộng đồng sống xanh và tiêu dùng tử tế.',
  };

  return (
    <footer className="bg-[#1f381c] text-emerald-100 border-t border-[#274e23] pt-6 pb-8" style={{ backgroundColor: 'var(--footer-bg, #1f381c)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 pb-8 border-b border-emerald-800/80">
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col items-center text-center space-y-3 lg:pr-4">
            <div className="lg:-mt-2 w-full flex justify-center">
              <BioStationLogo variant="dark" showSlogan={true} />
            </div>

            {/* Certification / Extra Logo */}
            {brandConfig.certificationLogoUrl && (
              <div className="flex justify-center w-full">
                <img 
                  src={brandConfig.certificationLogoUrl} 
                  alt="Logo Footer" 
                  className="max-h-20 object-contain" onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
              </div>
            )}

            <p className="text-xs text-emerald-200/90 leading-relaxed max-w-sm pt-1">
              {brandConfig.footerDescription || brandConfig.subSlogan}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] sm:text-xs text-amber-300 font-bold">
              {siteData?.footerConfig?.sloganHighlight?.split('•').map((part, idx, arr) => (
                <React.Fragment key={idx}>
                  <span>{part.trim()}</span>
                  {idx < arr.length - 1 && <span>•</span>}
                </React.Fragment>
              ))}
            </div>

            {/* Social Links if present */}
            {(brandConfig.socialFacebook || brandConfig.socialZalo || brandConfig.socialYoutube || brandConfig.socialTiktok) && (
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1 text-xs w-full">
                <span className="text-emerald-300/80 text-[11px] font-bold">Kênh Truyền Thông:</span>
                {brandConfig.socialFacebook && (
                  <a href={brandConfig.socialFacebook} target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 rounded-md bg-emerald-800/60 hover:bg-emerald-700 text-amber-300 font-bold text-[11px] transition-colors">
                    Facebook
                  </a>
                )}
                {brandConfig.socialZalo && (
                  <a href={brandConfig.socialZalo} target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 rounded-md bg-emerald-800/60 hover:bg-emerald-700 text-amber-300 font-bold text-[11px] transition-colors">
                    Zalo OA
                  </a>
                )}
                {brandConfig.socialYoutube && (
                  <a href={brandConfig.socialYoutube} target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 rounded-md bg-emerald-800/60 hover:bg-emerald-700 text-amber-300 font-bold text-[11px] transition-colors">
                    Youtube
                  </a>
                )}
                {brandConfig.socialTiktok && (
                  <a href={brandConfig.socialTiktok} target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 rounded-md bg-emerald-800/60 hover:bg-emerald-700 text-amber-300 font-bold text-[11px] transition-colors">
                    TikTok
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold font-serif text-sm text-white uppercase tracking-wider">
              {siteData?.footerConfig?.column1Title || 'Khám Phá Hệ Sinh Thái'}
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200">
              {siteData?.navConfig?.tabs?.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => {
                      setActiveTab(tab.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-bold font-serif text-sm text-white uppercase tracking-wider">
              {siteData?.footerConfig?.column2Title || 'Văn Phòng & Điểm Trạm'}
            </h4>
            <div className="space-y-2 text-xs text-emerald-200">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{brandConfig.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Hotline: {brandConfig.hotline} / Zalo OA BiO Station</span>
              </p>
              <p className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Website: {brandConfig.websiteUrl}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Email: {brandConfig.email}</span>
              </p>
              {brandConfig.operatingHours && (
                <p className="flex items-center gap-2 text-amber-300 font-semibold pt-1">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Giờ mở cửa: {brandConfig.operatingHours}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Copyright & Subtle Admin Gateway */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-300/80 gap-4">
          <p>{brandConfig.copyrightText || '© 2026 BiO Station – Hệ Sinh Thái Bách Mộc. Chạm để trở về.'}</p>
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-end">
            <span className="hover:text-white cursor-pointer transition-colors">{siteData?.footerConfig?.policy1Label || 'Chính Sách Bảo Mật'}</span>
            <span className="hover:text-white cursor-pointer transition-colors">{siteData?.footerConfig?.policy2Label || 'Tiêu Chuẩn BMQ'}</span>
            <span className="hover:text-white cursor-pointer transition-colors">{siteData?.footerConfig?.policy3Label || 'Điều Khoản Dịch Vụ'}</span>
            <span className="text-emerald-800 select-none">|</span>
            <button
              onClick={() => {
                setActiveTab('admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-emerald-400/60 hover:text-amber-300 font-medium transition-colors cursor-pointer flex items-center gap-1 opacity-70 hover:opacity-100"
              title="Truy cập Trang Quản Trị Hệ Thống"
            >
              <span>🔑</span>
              <span>Quản Trị Admin</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
