import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import {
  Sprout,
  Building2,
  Home,
  Handshake,
  Network,
  Award,
  Database,
  Cog,
  Sparkles,
  MapPin,
  Phone,
  Globe,
  Maximize2,
  X,
  Store,
  ShoppingBag,
  ArrowRight,
  Eye,
  Heart,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { BioStationLogo } from './BioStationLogo';
import { TabType } from '../types';

interface BusinessModelCanvasProps {
  onGoToShop?: () => void;
  onGoToNetwork?: () => void;
  setActiveTab?: (tab: TabType) => void;
}

export const BusinessModelCanvas: React.FC<BusinessModelCanvasProps> = ({
  onGoToShop,
  onGoToNetwork,
  setActiveTab,
}) => {
  const { siteData } = useSite();
  const {
    businessMission,
    roadmapStages = [],
    principles = [],
  } = siteData || {};

  const [showPosterModal, setShowPosterModal] = useState(false);

  const getRoadmapIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className="w-6 h-6 text-[#274e23]" />;
      case 'Home':
        return <Home className="w-6 h-6 text-[#274e23]" />;
      case 'Handshake':
        return <Handshake className="w-6 h-6 text-amber-600" />;
      case 'Network':
        return <Network className="w-6 h-6 text-emerald-800" />;
      default:
        return <Building2 className="w-6 h-6 text-[#274e23]" />;
    }
  };

  return (
    <div className="bg-[#f8f5f0] min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-[#2d241e]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Business Title & Brand Header */}
        <div className="bg-[#fcfaf7] rounded-3xl p-6 sm:p-10 border border-[#e2d5c3] shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-[#274e23]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#274e23]/10 text-[#274e23] text-xs font-bold uppercase tracking-wider">
                <Sprout className="w-4 h-4 text-amber-600" />
                {businessMission?.topBadgeText || 'Mô Hình Kinh Doanh Chuẩn Quốc Gia'}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-[#274e23] tracking-tight">
                {businessMission?.pageTitle || 'Hệ Sinh Thái BiO Station'}
              </h1>

              <p className="text-lg font-semibold text-[#a66e2c] font-serif">
                Mô hình: Trải nghiệm – Bán lẻ – Kết nối Thuận tự nhiên
              </p>

              <p className="text-base text-[#5c4d43] leading-relaxed max-w-2xl bg-[#f2e9dc] p-4 rounded-2xl border-l-4 border-[#274e23]">
                <span className="font-bold text-[#274e23]">{businessMission?.missionLabel || 'Sứ mệnh:'}</span>{' '}
                {businessMission?.missionText ||
                  'BiO Station – Chạm để trở về: trở về với thiên nhiên, với bản thể gốc của chính mình. Hệ thống trạm trải nghiệm kết nối con người với thiên nhiên qua nông sản thuần tự nhiên, chuẩn BMQ Qualified.'}
              </p>
            </div>

            {businessMission?.partnershipImageUrl ? (
              <div className="flex flex-col items-center justify-center shrink-0 w-full md:w-[400px] lg:w-[480px]">
                <img
                  src={businessMission.partnershipImageUrl}
                  alt="Business Partnership"
                  className="w-full h-auto max-h-[220px] sm:max-h-[320px] md:max-h-[380px] object-contain mix-blend-multiply cursor-pointer hover:opacity-95 transition-opacity"
                  onClick={() => setShowPosterModal(true)}
                  style={{
                    WebkitMaskImage: 'radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 90%)',
                    maskImage: 'radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 90%)',
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="mt-1 text-center">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#274e23]">
                    Hệ Sinh Thái Bách Mộc
                  </p>
                  <p className="text-[11px] text-[#7a6858] mt-0.5">
                    VP Bách Mộc – Phú Mỹ Hưng, TP. HCM
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-[#e2d5c3] shadow-inner text-center shrink-0 w-full md:w-80">
                <BioStationLogo variant="full" className="mb-3" />
                <div className="w-full h-px bg-[#e2d5c3] my-3" />
                <p className="text-xs font-bold uppercase tracking-wider text-[#274e23]">
                  Hệ Sinh Thái Bách Mộc
                </p>
                <p className="text-[11px] text-[#7a6858] mt-1">
                  VP Bách Mộc – Phú Mỹ Hưng, TP. HCM
                </p>
              </div>
            )}
          </div>
        </div>

        {/* TUYÊN NGÔN THƯƠNG HIỆU & 3 TRỤ CỘT CHIẾN LƯỢC (OFFICIAL POSTER REPLICA) */}
        <div className="bg-[#274e23] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-[#1e3e1a] relative overflow-hidden space-y-8">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />

          {/* Heading & Slogan */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/15">
            <div className="space-y-3 text-center md:text-left flex-1">
              <span className="px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Định Vị Triết Lý Vận Hành
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-serif text-white tracking-tight">
                TUYÊN NGÔN THƯƠNG HIỆU BiO STATION
              </h2>
              <p className="text-lg sm:text-2xl font-serif italic text-amber-200 leading-snug">
                "Chạm để trở về – trở về với thiên nhiên, với bản thể gốc của chính mình"
              </p>
            </div>

            <button
              onClick={() => setShowPosterModal(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold text-xs flex items-center gap-2 shadow-lg transition-all shrink-0 cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" />
              <span>Xem Poster Tuyên Ngôn Gốc</span>
            </button>
          </div>

          {/* THE 3 STRATEGIC PILLARS */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Trụ Cột 1 */}
            <div className="bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/15 flex flex-col justify-between transition-all group">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                    🌿
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">
                      Trụ Cột #01
                    </span>
                    <h3 className="font-bold font-serif text-lg text-white">
                      Bản Chất & Trải Nghiệm
                    </h3>
                  </div>
                </div>

                <ul className="text-xs text-emerald-100 space-y-2.5 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>Là hệ thống trạm trải nghiệm, kết nối con người với thiên nhiên qua nông sản thuần tự nhiên.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>Nơi bạn được <strong>Nhìn - Chạm - Ngửi - Nếm</strong> sản vật thuận mùa, đạt chuẩn hữu cơ cao nhất.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>Không gian sống chậm để cảm nhận sự sống và tìm về giá trị nguyên sơ an lành.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>Trải nghiệm mâm cơm hữu cơ, thưởng trà hoa & ẩm thực bản địa thuận tự nhiên.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 text-[11px] text-amber-300 font-bold flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                <span>Đa giác quan: Nhìn • Chạm • Ngửi • Nếm</span>
              </div>
            </div>

            {/* Trụ Cột 2 */}
            <div className="bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/15 flex flex-col justify-between transition-all group">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                    🤝
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">
                      Trụ Cột #02
                    </span>
                    <h3 className="font-bold font-serif text-lg text-white">
                      Sứ Mệnh & Vận Hành
                    </h3>
                  </div>
                </div>

                <ul className="text-xs text-emerald-100 space-y-2.5 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span><strong>CHIA SẺ</strong> lối sống thuận tự nhiên đến từng gia đình và cộng đồng.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span><strong>TRẢI NGHIỆM</strong> chân thực về giá trị sản vật bản địa và văn hóa ẩm thực truyền thống.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span><strong>KẾT NỐI</strong> người canh tác tử tế với người tiêu dùng có ý thức sống xanh.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span><strong>PHÂN PHỐI</strong> nông sản sạch, phát triển Cộng đồng Tiêu dùng Thuần tự nhiên bền vững.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 text-[11px] text-amber-300 font-bold flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5" />
                <span>Chia sẻ – Trải nghiệm – Kết nối – Phân phối</span>
              </div>
            </div>

            {/* Trụ Cột 3 */}
            <div className="bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/15 flex flex-col justify-between transition-all group">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                    🛡️
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">
                      Trụ Cột #03
                    </span>
                    <h3 className="font-bold font-serif text-lg text-white">
                      Tiêu Chuẩn BMQ
                    </h3>
                  </div>
                </div>

                <ul className="text-xs text-emerald-100 space-y-2.5 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>Nguồn hàng từ Cộng đồng Canh tác Thuận tự nhiên khắp các vùng miền.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>Lấy hệ tiêu chuẩn <strong>BMQ (Bách Mộc)</strong> làm nền tảng lựa chọn và đánh giá chất lượng.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>Đảm bảo canh tác nghiêm ngặt, minh bạch, trách nhiệm với đất đai và hệ sinh thái.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>Gạo ST25 Bách Mộc, rau củ hữu cơ hái sớm & thực phẩm sinh thái tử tế.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 text-[11px] text-amber-300 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Thuận tự nhiên & Minh bạch</span>
              </div>
            </div>
          </div>

          {/* Model Station Footer Banner */}
          <div className="relative z-10 p-5 bg-black/20 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-emerald-100 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300">
                <MapPin className="w-5 h-5 shrink-0" />
              </div>
              <div>
                <p className="font-bold text-sm text-white">TRẠM TRẢI NGHIỆM MẪU: BiO Station Cần Giờ</p>
                <p className="text-emerald-200">Địa chỉ: 336 Lương Văn Nho, Xã Cần Giờ (D51 Khu Dân cư Phước Lộc), TP. HCM</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5 text-amber-300">
                <Phone className="w-4 h-4" />
                <span>Tel: 0388.500.500</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-200">
                <Globe className="w-4 h-4" />
                <span>biostation.vn</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Development Stages (Lộ Trình Phát Triển Hệ Thống) */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#274e23]/10 text-[#274e23] text-xs font-bold uppercase tracking-wider">
              <Network className="w-3.5 h-3.5 text-amber-600" />
              Quy Mô Mở Rộng
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-[#274e23]">
              {businessMission?.roadmapSectionTitle || '4 Giai Đoạn Phát Triển Hệ Thống'}
            </h2>
            <p className="text-sm text-[#7a6858]">
              {businessMission?.roadmapSectionSubtitle || 'Lộ trình mở rộng bền vững từ trung tâm điều phối tới toàn quốc'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roadmapStages.map((stg) => (
              <div
                key={stg.step}
                className="bg-white p-6 rounded-2xl border border-[#e2d5c3] relative shadow-sm hover:border-[#274e23] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-8 h-8 rounded-full bg-[#274e23] text-white font-bold text-sm flex items-center justify-center">
                      0{stg.step}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                        stg.status === 'active'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : stg.status === 'expanding'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {stg.status === 'active'
                        ? 'Đang Vận Hành'
                        : stg.status === 'expanding'
                        ? 'Đang Mở Rộng'
                        : 'Kế Hoạch'}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-[#274e23] font-serif">
                    {stg.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#a66e2c] mb-3">
                    {stg.subTitle}
                  </p>
                  <p className="text-xs text-[#5c4d43] leading-relaxed">
                    {stg.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#f0e6d8] flex items-center gap-2 text-xs font-bold text-[#274e23]">
                  {getRoadmapIcon(stg.icon)}
                  <span>Giai đoạn {stg.step}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5 Principles of Development (Nguyên Tắc Phát Triển Chuỗi) */}
        <div className="bg-[#f2e8da] rounded-3xl p-8 border border-[#e2d5c3]">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#274e23]/10 text-[#274e23] text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              Cam Kết Thương Hiệu
            </div>
            <h2 className="text-2xl font-black font-serif text-[#274e23]">
              {businessMission?.principlesSectionTitle || '5 Nguyên Tắc Phát Triển Chuỗi'}
            </h2>
            <p className="text-xs text-[#7a6858]">
              {businessMission?.principlesSectionSubtitle ||
                'Đảm bảo tính đồng nhất chất lượng và niềm tin thương hiệu Bách Mộc trên toàn hệ thống'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {(principles || []).map((pr) => (
              <div
                key={pr.id}
                className="bg-white p-4 rounded-2xl border border-[#e2d5c3] text-center space-y-2 shadow-sm hover:border-[#274e23] transition-all"
              >
                <div className="w-10 h-10 mx-auto rounded-xl bg-[#274e23]/10 flex items-center justify-center font-bold text-[#274e23]">
                  {pr.id === 1 ? (
                    <Sprout className="w-5 h-5 text-[#274e23]" />
                  ) : pr.id === 2 ? (
                    <Award className="w-5 h-5 text-amber-600" />
                  ) : pr.id === 3 ? (
                    <Database className="w-5 h-5 text-emerald-700" />
                  ) : pr.id === 4 ? (
                    <Cog className="w-5 h-5 text-amber-700" />
                  ) : (
                    <Sparkles className="w-5 h-5 text-[#274e23]" />
                  )}
                </div>
                <h4 className="font-bold text-sm text-[#274e23]">{pr.title}</h4>
                <p className="text-[11px] text-[#5c4d43] leading-snug">{pr.subTitle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-2xl border border-[#e2d5c3] shadow-sm">
          <div>
            <h3 className="font-bold text-lg text-[#274e23]">
              Khám phá sản phẩm nông sản BMQ chất lượng tại BiO Station
            </h3>
            <p className="text-xs text-[#7a6858] mt-1">
              Giao tận nơi hoặc trải nghiệm dùng thử trực tiếp tại cửa hàng và trạm giao điểm
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={onGoToShop || (() => setActiveTab && setActiveTab('shop'))}
              className="px-5 py-2.5 rounded-xl bg-[#274e23] hover:bg-[#1e3e1a] text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Xem Cửa Hàng Nông Sản</span>
            </button>
            <button
              onClick={onGoToNetwork || (() => setActiveTab && setActiveTab('network'))}
              className="px-5 py-2.5 rounded-xl bg-[#f0e6d8] hover:bg-[#e4d6c2] text-[#274e23] font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Store className="w-4 h-4" />
              <span>Tìm Điểm Station Gần Bạn</span>
            </button>
          </div>
        </div>
      </div>

      {/* POSTER MODAL POPUP */}
      {showPosterModal && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setShowPosterModal(false)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center justify-center bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-amber-600/40"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="w-full flex items-center justify-between px-4 py-3 bg-stone-950 border-b border-white/10 text-white">
              <div className="flex items-center gap-2">
                <Sprout className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-sm">Poster Gốc: Tuyên Ngôn Thương Hiệu BiO Station</span>
              </div>
              <button
                onClick={() => setShowPosterModal(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Poster Image */}
            <div className="w-full overflow-auto p-2 flex items-center justify-center max-h-[82vh]">
              <img
                src="/tuyen-ngon-thuong-hieu.jpg"
                alt="Tuyên Ngôn Thương Hiệu BiO Station"
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
