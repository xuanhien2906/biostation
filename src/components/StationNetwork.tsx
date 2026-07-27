import React, { useState } from 'react';
import {
  MapPin,
  Store,
  Building2,
  Home,
  Handshake,
  Truck,
  CheckCircle2,
  Clock,
  Phone,
  Send,
  Sparkles,
  Users,
} from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const StationNetwork: React.FC = () => {
  const { siteData } = useSite();
  const stations = siteData?.stations || [];

  const [selectedStationCategory, setSelectedStationCategory] = useState<
    'all' | 'center' | 'community' | 'partner'
  >('all');
  const [partnerName, setPartnerName] = useState('');
  const [partnerPhone, setPartnerPhone] = useState('');
  const [partnerLocation, setPartnerLocation] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const filteredStations =
    selectedStationCategory === 'all'
      ? stations
      : stations.filter((s) => s.type === selectedStationCategory);

  const handleSubmitPartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerName || !partnerPhone) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-[#f8f5f0] min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-[#2d241e]">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#274e23]/10 text-[#274e23] text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-amber-600" />
            <span>Mạng Lưới Phân Phối Hữu Cơ Toàn Quốc</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black font-serif text-[#274e23]">
            Hệ Thống BiO Station Gần Bạn
          </h1>

          <p className="text-sm text-[#5c4d43] leading-relaxed">
            BiO Station kết nối từ nông trại sinh thái Bách Mộc đến các trạm điểm tại khu dân cư,
            mang nông sản tươi hái trong ngày tới từng căn bếp gia đình.
          </p>
        </div>

        {/* Filter Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setSelectedStationCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedStationCategory === 'all'
                ? 'bg-[#274e23] text-white shadow-md'
                : 'bg-white text-[#5c4d43] border border-[#e2d5c3] hover:bg-[#f0e6d8]'
            }`}
          >
            Tất Cả Điểm Chạm ({stations.length})
          </button>
          <button
            onClick={() => setSelectedStationCategory('center')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedStationCategory === 'center'
                ? 'bg-[#274e23] text-white shadow-md'
                : 'bg-white text-[#5c4d43] border border-[#e2d5c3] hover:bg-[#f0e6d8]'
            }`}
          >
            Station Trung Tâm ({stations.filter((s) => s.type === 'center').length})
          </button>
          <button
            onClick={() => setSelectedStationCategory('community')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedStationCategory === 'community'
                ? 'bg-[#274e23] text-white shadow-md'
                : 'bg-white text-[#5c4d43] border border-[#e2d5c3] hover:bg-[#f0e6d8]'
            }`}
          >
            Station Cộng Đồng ({stations.filter((s) => s.type === 'community').length})
          </button>
          <button
            onClick={() => setSelectedStationCategory('partner')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedStationCategory === 'partner'
                ? 'bg-[#274e23] text-white shadow-md'
                : 'bg-white text-[#5c4d43] border border-[#e2d5c3] hover:bg-[#f0e6d8]'
            }`}
          >
            Điểm Đối Tác ({stations.filter((s) => s.type === 'partner').length})
          </button>
        </div>

        {/* Station Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredStations.map((st) => (
            <div
              key={st.id}
              className="bg-white rounded-2xl border border-[#e2d5c3] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden bg-[#f0e6d8]">
                <img
                  src={st.image}
                  alt={st.name}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#274e23] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                  {st.typeName}
                </div>
                <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow">
                  {st.status}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-bold font-serif text-[#274e23]">{st.name}</h3>
                  <p className="text-xs text-[#5c4d43] flex items-start gap-1.5 mt-1.5">
                    <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{st.address}</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#7a6858] border-t border-b border-[#f0e6d8] py-2.5">
                  <span className="flex items-center gap-1 font-semibold text-[#274e23]">
                    <Phone className="w-3.5 h-3.5 text-amber-600" />
                    {st.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    {st.hours}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-[#a66e2c] uppercase tracking-wider block mb-2">
                    Đặc quyền trải nghiệm tại Station:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {st.features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-[#f4ebe0] text-[#274e23] font-semibold px-2.5 py-1 rounded-lg border border-[#e2d5c3]"
                      >
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Partner Application Form (Đăng ký mở Station Cộng Đồng) */}
        <div className="bg-[#274e23] text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Handshake className="w-4 h-4 text-amber-300" />
                Đồng Hành Cùng Bách Mộc
              </div>

              <h2 className="text-2xl sm:text-3xl font-black font-serif">
                Đăng Ký Mở BiO Station Tại Khu Dân Cư Của Bạn
              </h2>

              <p className="text-sm text-emerald-100 leading-relaxed">
                Bạn muốn đưa thực phẩm hữu cơ chuẩn BMQ tới cộng đồng cư dân nơi mình sinh sống?
                Bách Mộc hỗ trợ 100% chi phí nhận diện, đào tạo vận hành & nguồn hàng tận gốc.
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs text-emerald-100 pt-2">
                <div className="flex items-center gap-2 bg-white/10 p-2.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Một chuẩn BMQ chất lượng</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 p-2.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Một hệ thống dữ liệu chung</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white text-[#2d241e] p-6 rounded-2xl border border-[#e2d5c3] shadow-lg">
              {submitted ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <h3 className="font-bold text-lg text-[#274e23]">Cảm ơn bạn đã đăng ký!</h3>
                  <p className="text-xs text-[#5c4d43]">
                    Đội ngũ điều phối BiO Station Phú Mỹ Hưng sẽ liên hệ trực tiếp tới số điện thoại{' '}
                    <span className="font-bold">{partnerPhone}</span> trong vòng 24 giờ.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitPartner} className="space-y-3">
                  <h3 className="font-bold text-base text-[#274e23] font-serif">
                    Đăng Ký Tư Vấn Điểm Chạm Cộng Đồng
                  </h3>

                  <div>
                    <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                      Họ và tên của bạn *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Nguyễn Văn An"
                      value={partnerName}
                      onChange={(e) => setPartnerName(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-[#fbf8f3] focus:outline-none focus:border-[#274e23]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                      Số điện thoại Zalo *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="09xx xxx xxx"
                      value={partnerPhone}
                      onChange={(e) => setPartnerPhone(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-[#fbf8f3] focus:outline-none focus:border-[#274e23]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                      Khu vực dự định mở Station
                    </label>
                    <input
                      type="text"
                      placeholder="Tên chung cư / khu dân cư / quận huyện"
                      value={partnerLocation}
                      onChange={(e) => setPartnerLocation(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-[#fbf8f3] focus:outline-none focus:border-[#274e23]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#274e23] hover:bg-[#1e3e1a] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <Send className="w-3.5 h-3.5 text-amber-300" />
                    <span>Gửi Đăng Ký Đối Tác</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
