import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import {
  Store,
  Wheat,
  Users,
  TrendingUp,
  PieChart,
  ShoppingBag,
  Megaphone,
  CheckCircle2,
  ShieldCheck,
  Sprout,
  Award,
  Database,
  Cog,
  Sparkles,
  Building2,
  Home,
  Handshake,
  Network,
  Calculator,
  ArrowRight,
} from 'lucide-react';
import { BioStationLogo } from './BioStationLogo';

interface BusinessModelCanvasProps {
  onGoToShop?: () => void;
  onGoToNetwork?: () => void;
}

export const BusinessModelCanvas: React.FC<BusinessModelCanvasProps> = ({
  onGoToShop,
  onGoToNetwork,
}) => {
  const { siteData } = useSite();
  const {
    businessMission,
    businessBlocks = [],
    roadmapStages = [],
    principles = [],
  } = siteData || {};

  // Financial Simulator State
  const [targetRevenueMonth, setTargetRevenueMonth] = useState<number>(450000000); // 450 Million VND

  // Cost calculations based on 30% rent/ops, 25% staff, 40% inventory, 5% marketing
  const spaceOpsCost = Math.round(targetRevenueMonth * 0.30);
  const staffCost = Math.round(targetRevenueMonth * 0.25);
  const inventoryCost = Math.round(targetRevenueMonth * 0.40);
  const mktgCost = Math.round(targetRevenueMonth * 0.05);
  const estimatedProfit = Math.round(targetRevenueMonth * 0.18); // ~18% net margin after scale efficiencies

  const getBlockIcon = (iconName: string) => {
    switch (iconName) {
      case 'Store':
        return <Store className="w-6 h-6 text-[#274e23]" />;
      case 'Wheat':
        return <Wheat className="w-6 h-6 text-amber-600" />;
      case 'Users':
        return <Users className="w-6 h-6 text-emerald-700" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-green-700" />;
      case 'PieChart':
        return <PieChart className="w-6 h-6 text-amber-700" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-6 h-6 text-[#274e23]" />;
      case 'Megaphone':
        return <Megaphone className="w-6 h-6 text-[#d97706]" />;
      default:
        return <Store className="w-6 h-6 text-[#274e23]" />;
    }
  };

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
                Mô Hình Kinh Doanh Chuẩn Quốc Gia
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-[#274e23] tracking-tight">
                KẾ HOẠCH KINH DOANH BiO Station
              </h1>

              <p className="text-lg font-semibold text-[#a66e2c] font-serif">
                MÔ HÌNH: TRẢI NGHIỆM – BÁN LẺ – KẾT NỐI THUẬN TỰ NHIÊN
              </p>

              <p className="text-base text-[#5c4d43] leading-relaxed max-w-2xl bg-[#f2e9dc] p-4 rounded-2xl border-l-4 border-[#274e23]">
                <span className="font-bold text-[#274e23]">Sứ mệnh:</span>{' '}
                {businessMission?.missionText}
              </p>
            </div>

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
          </div>

          {/* 3 Core Values Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {(businessMission?.coreValues || []).map((val, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-[#e2d5c3] hover:border-[#274e23] transition-all shadow-sm"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-[#274e23]/10 text-[#274e23]">
                    {val.name === 'Đúng' ? (
                      <ShieldCheck className="w-5 h-5 text-[#274e23]" />
                    ) : val.name === 'Thật' ? (
                      <CheckCircle2 className="w-5 h-5 text-amber-600" />
                    ) : (
                      <Sprout className="w-5 h-5 text-emerald-700" />
                    )}
                  </div>
                  <div>
                    <span className="text-xs text-[#a66e2c] font-bold uppercase tracking-wider">
                      Giá trị #{idx + 1}
                    </span>
                    <h3 className="text-lg font-bold text-[#274e23]">
                      {val.name}: {val.desc}
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-[#5c4d43] leading-relaxed">{val.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 7 Key Business Canvas Blocks (As requested in Image 4) */}
        <div>
          <div className="text-center mb-8 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-[#274e23]">
              7 Trụ Cột Trong Mô Hình Kinh Doanh BiO Station
            </h2>
            <p className="text-sm text-[#7a6858]">
              Cấu trúc vận hành đồng bộ hóa từ nguồn hàng Bách Mộc tới trải nghiệm người dùng
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessBlocks.map((block) => (
              <div
                key={block.id}
                className="bg-white rounded-2xl p-6 border border-[#e2d5c3] hover:shadow-lg hover:border-[#274e23] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#274e23]/10 flex items-center justify-center font-black text-[#274e23]">
                        {getBlockIcon(block.icon)}
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase text-[#a66e2c] tracking-wider">
                          Khối #{block.number}
                        </span>
                        <h3 className="font-bold text-base text-[#274e23] leading-snug">
                          {block.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2.5 my-4">
                    {block.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#3d3229]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#274e23] mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {block.highlight && (
                  <div className="mt-4 pt-3 border-t border-[#f0e6d8] bg-[#fbf8f3] -mx-6 -mb-6 p-4 rounded-b-2xl">
                    <p className="text-[11px] font-bold text-[#274e23] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{block.highlight}</span>
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Financial Forecast Simulator Interactive Component */}
        <div className="bg-[#274e23] text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Calculator className="w-4 h-4 text-amber-300" />
              Mô Phỏng Doanh Thu & Chi Phí Trạm BiO
            </div>

            <h2 className="text-2xl sm:text-3xl font-black font-serif">
              Bảng Ước Tính Dòng Tiền Vận Hành
            </h2>

            <p className="text-sm text-emerald-100 leading-relaxed">
              Theo kế hoạch: Tháng 1 đạt 150–200 triệu, Tháng 6 đạt 400–600 triệu, Tháng 12 đạt 700M–1 Tỷ VNĐ.
              Sử dụng thanh trượt bên dưới để mô phỏng bài toán kinh doanh cho 1 điểm Station.
            </p>

            {/* Range Slider */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-emerald-200 font-semibold uppercase">
                  Mục Tiêu Doanh Thu Tháng:
                </span>
                <span className="text-2xl font-black text-amber-300">
                  {targetRevenueMonth.toLocaleString('vi-VN')} VNĐ
                </span>
              </div>

              <input
                type="range"
                min={150000000}
                max={1000000000}
                step={25000000}
                value={targetRevenueMonth}
                onChange={(e) => setTargetRevenueMonth(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-2 bg-emerald-950/60 rounded-lg"
              />

              <div className="flex justify-between text-[11px] text-emerald-200">
                <span>150 Triệu (Tháng 1)</span>
                <span>500 Triệu (Tháng 6)</span>
                <span>1 Tỷ (Tháng 12)</span>
              </div>

              {/* Calculated Breakdown Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
                <div className="bg-black/20 p-3 rounded-xl">
                  <span className="text-[10px] text-emerald-200 block font-semibold">
                    Nhập hàng (40%)
                  </span>
                  <span className="text-sm font-bold text-white">
                    {inventoryCost.toLocaleString('vi-VN')}đ
                  </span>
                </div>
                <div className="bg-black/20 p-3 rounded-xl">
                  <span className="text-[10px] text-emerald-200 block font-semibold">
                    Mặt bằng & vận hành (30%)
                  </span>
                  <span className="text-sm font-bold text-white">
                    {spaceOpsCost.toLocaleString('vi-VN')}đ
                  </span>
                </div>
                <div className="bg-black/20 p-3 rounded-xl">
                  <span className="text-[10px] text-emerald-200 block font-semibold">
                    Nhân sự (25%)
                  </span>
                  <span className="text-sm font-bold text-white">
                    {staffCost.toLocaleString('vi-VN')}đ
                  </span>
                </div>
                <div className="bg-black/20 p-3 rounded-xl">
                  <span className="text-[10px] text-emerald-200 block font-semibold">
                    Marketing (5%)
                  </span>
                  <span className="text-sm font-bold text-white">
                    {mktgCost.toLocaleString('vi-VN')}đ
                  </span>
                </div>
              </div>

              <div className="bg-amber-500/20 p-4 rounded-xl border border-amber-400/40 flex items-center justify-between">
                <div>
                  <span className="text-xs text-amber-200 font-bold block">
                    Lợi Nhuận Ròng Dự Kiến (~18%):
                  </span>
                  <span className="text-xl font-black text-amber-300">
                    +{estimatedProfit.toLocaleString('vi-VN')} VNĐ / tháng
                  </span>
                </div>
                <button
                  onClick={onGoToNetwork}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Mạng Lưới Station</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Development Stages (Lộ Trình Phát Triển) */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-[#274e23]">
              4 Giai Đoạn Phát Triển Hệ Thống
            </h2>
            <p className="text-sm text-[#7a6858]">
              Lộ trình mở rộng bền vững từ trung tâm điều phối tới toàn quốc
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

        {/* 5 Principles of Development (Nguyên Tắc Phát Triển) */}
        <div className="bg-[#f2e8da] rounded-3xl p-8 border border-[#e2d5c3]">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <h2 className="text-2xl font-black font-serif text-[#274e23]">
              5 Nguyên Tắc Phát Triển Chuỗi
            </h2>
            <p className="text-xs text-[#7a6858]">
              Đảm bảo tính đồng nhất chất lượng và niềm tin thương hiệu Bách Mộc trên toàn hệ thống
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {(principles || []).map((pr) => (
              <div
                key={pr.id}
                className="bg-white p-4 rounded-2xl border border-[#e2d5c3] text-center space-y-2 shadow-sm"
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#e2d5c3]">
          <div>
            <h3 className="font-bold text-lg text-[#274e23]">
              Khám phá sản phẩm nông sản BMQ chất lượng tại BiO Station
            </h3>
            <p className="text-xs text-[#7a6858]">
              Giao tận nơi hoặc trải nghiệm dùng thử trực tiếp tại cửa hàng
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onGoToShop}
              className="px-5 py-2.5 rounded-xl bg-[#274e23] hover:bg-[#1e3e1a] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Xem Cửa Hàng Nông Sản
            </button>
            <button
              onClick={onGoToNetwork}
              className="px-5 py-2.5 rounded-xl bg-[#f0e6d8] hover:bg-[#e4d6c2] text-[#274e23] font-bold text-xs transition-all cursor-pointer"
            >
              Tìm Điểm Station Gần Bạn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
