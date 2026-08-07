import React, { useState } from 'react';
import { Search, ShoppingBag, Sprout, Store, Sparkles, BookOpen, Layers, Menu, X, Phone, MapPin, Award, Settings } from 'lucide-react';
import { TabType, Product, Article } from '../types';
import { BioStationLogo } from './BioStationLogo';
import { useSite } from '../context/SiteContext';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  cartCount: number;
  setIsCartOpen: (open: boolean) => void;
  onSelectProduct: (product: Product) => void;
  onSelectArticle: (article: Article) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  setIsCartOpen,
  onSelectProduct,
  onSelectArticle,
}) => {
  const { siteData } = useSite();
  const brandConfig = siteData?.brandConfig || {
    topBannerText: '🔥 Khai trương Station Cộng Đồng mới – Ưu đãi 15% tất cả gạo hữu cơ Bách Mộc!',
    hotline: '0908 123 456',
    address: 'VP Bách Mộc – Phú Mỹ Hưng, Quận 7, TP. HCM',
  };
  const products = siteData?.products || [];
  const articles = siteData?.articles || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Search filtering
  const matchedProducts = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const matchedArticles = searchQuery.trim()
    ? articles.filter(
        (a) =>
          (a.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
          (a.summary || a.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleNavClick = (tab: TabType) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fbf8f3]/95 backdrop-blur-md border-b border-[#e6dbc8] text-[#2d241e] shadow-sm">
      {/* Top Banner Announcement */}
      <div className="bg-[#274e23] text-emerald-50 px-4 py-1.5 text-xs text-center font-medium flex items-center justify-between max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="hidden md:flex items-center gap-2 text-emerald-200 text-[11px]">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>{brandConfig.headquarters}</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4 mx-auto md:mx-0">
          <div className="flex flex-col items-center text-center leading-tight">
            <div className="flex items-center gap-1.5">
              <Sprout className="w-3 h-3 text-amber-300 animate-pulse shrink-0" />
              <span className="font-semibold">{brandConfig.topBannerText.split(/ – | - |\|/)[0]}</span>
            </div>
            {brandConfig.topBannerText.split(/ – | - |\|/).length > 1 && (
              <span className="font-semibold text-amber-300 mt-0.5">
                {brandConfig.topBannerText.split(/ – | - |\|/).slice(1).join(' - ')}
              </span>
            )}
          </div>
          <button
            onClick={() => handleNavClick('model')}
            className="underline font-bold text-amber-300 hover:text-white transition-colors cursor-pointer text-[10px] sm:text-[11px]"
          >
            Kế hoạch kinh doanh &rarr;
          </button>
        </div>

        <div className="hidden lg:flex flex-col items-end text-emerald-100 text-[11px] font-semibold leading-tight">
          <div className="flex items-center gap-1.5">
            <Phone className="w-3 h-3 text-amber-400" />
            <span>Hotline</span>
          </div>
          <span className="text-amber-300 tracking-wider">{brandConfig.hotline}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP ROW: Logo + Search Bar + Cart & Mobile Toggle */}
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between py-2 md:py-1.5 gap-y-3 gap-x-4">
          {/* Logo */}
          <div className="cursor-pointer shrink-0" onClick={() => handleNavClick('home')}>
            <BioStationLogo showSlogan={true} isHeader={true} />
          </div>

          {/* Universal Search Bar - Prominent & Flexible on 16:9 / Wide Displays */}
          <div className="relative w-full md:w-auto md:flex-1 md:max-w-2xl order-3 md:order-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm gạo hữu cơ, nông sản BMQ, mật ong, thư viện sống xanh..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="w-full bg-[#f4ebe0] text-sm text-[#2d241e] placeholder-[#8c7868] pl-10 pr-4 py-2.5 rounded-full border border-[#dcd0bf] focus:outline-none focus:border-[#274e23] focus:ring-2 focus:ring-[#274e23]/20 shadow-inner transition-all"
              />
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#8c7868]" />
            </div>

            {/* Live Search Dropdown */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 top-12 bg-[#fcfaf7] border border-[#dcd0bf] rounded-2xl shadow-2xl p-4 max-h-[70vh] overflow-y-auto z-50 text-[#2d241e]">
                <div className="text-xs font-semibold text-[#8c7868] uppercase tracking-wider mb-2">
                  Kết quả tìm kiếm cho "{searchQuery}"
                </div>

                {matchedProducts.length === 0 && matchedArticles.length === 0 && (
                  <p className="text-sm text-[#8c7868] py-4 text-center">
                    Không tìm thấy kết quả. Thử tìm "Gạo", "Mật ong" hoặc "Rau củ".
                  </p>
                )}

                {matchedProducts.length > 0 && (
                  <div className="mb-4">
                    <div className="text-xs font-bold text-[#274e23] mb-2 flex items-center gap-1">
                      <ShoppingBag className="w-3.5 h-3.5" /> Nông Sản & Thực Phẩm ({matchedProducts.length})
                    </div>
                    <div className="space-y-2">
                      {matchedProducts.slice(0, 3).map((prod) => (
                        <div
                          key={prod.id}
                          onClick={() => {
                            onSelectProduct(prod);
                            setSearchQuery('');
                          }}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#ebdcc8]/50 cursor-pointer transition-colors"
                        >
                          <img src={prod.image} alt={prod.name} className="w-10 h-10 object-cover rounded-md" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate text-[#2d241e]">{prod.name}</p>
                            <p className="text-xs text-[#6e5d4f]">
                              {prod.price.toLocaleString('vi-VN')}đ • {prod.category}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {matchedArticles.length > 0 && (
                  <div>
                    <div className="text-xs font-bold text-[#d97706] mb-2 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" /> Thư viện Bách Mộc ({matchedArticles.length})
                    </div>
                    <div className="space-y-2">
                      {matchedArticles.slice(0, 3).map((art) => (
                        <div
                          key={art.id}
                          onClick={() => {
                            onSelectArticle(art);
                            setSearchQuery('');
                          }}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#ebdcc8]/50 cursor-pointer transition-colors"
                        >
                          <img src={art.image} alt={art.title} className="w-10 h-10 object-cover rounded-md" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate text-[#2d241e]">{art.title}</p>
                            <p className="text-xs text-[#6e5d4f]">{art.duration}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Controls: Cart & Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0 order-2 md:order-3">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-[#f0e6d8] hover:bg-[#e4d6c2] text-[#274e23] transition-colors border border-[#dcd0bf] cursor-pointer shadow-sm flex items-center justify-center"
              aria-label="Giỏ hàng"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#d97706] text-white font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 text-[#5c4d43] hover:text-[#274e23] rounded-full hover:bg-[#f0e6d8] cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* BOTTOM ROW (DESKTOP): Horizontal Navigation Menu Bar */}
        <div className="hidden lg:block border-t border-[#e6dbc8]/80 py-2">
          <nav className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-[#274e23] text-white font-semibold shadow-sm'
                  : 'text-[#5c4d43] hover:text-[#274e23] hover:bg-[#f0e6d8]'
              }`}
            >
              {brandConfig.homepageLabel || 'Trang Chủ'}
            </button>

            <button
              onClick={() => handleNavClick('model')}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'model'
                  ? 'bg-[#274e23] text-white font-semibold shadow-sm'
                  : 'text-[#5c4d43] hover:text-[#274e23] hover:bg-[#f0e6d8]'
              }`}
            >
              <Store className="w-4 h-4 text-amber-500" />
              {brandConfig.bioStationLabel || 'Mô Hình BiO'}
            </button>

            <button
              onClick={() => handleNavClick('shop')}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'shop'
                  ? 'bg-[#274e23] text-white font-semibold shadow-sm'
                  : 'text-[#5c4d43] hover:text-[#274e23] hover:bg-[#f0e6d8]'
              }`}
            >
              {brandConfig.agriProductsLabel || 'Nông Sản BMQ'}
            </button>

            <button
              onClick={() => handleNavClick('network')}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'network'
                  ? 'bg-[#274e23] text-white font-semibold shadow-sm'
                  : 'text-[#5c4d43] hover:text-[#274e23] hover:bg-[#f0e6d8]'
              }`}
            >
              Mạng Lưới Station
            </button>

            <button
              onClick={() => handleNavClick('recipes')}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'recipes'
                  ? 'bg-[#274e23] text-white font-semibold shadow-sm'
                  : 'text-[#5c4d43] hover:text-[#274e23] hover:bg-[#f0e6d8]'
              }`}
            >
              Bữa Ăn Lành
            </button>

            <button
              onClick={() => handleNavClick('knowledge')}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'knowledge'
                  ? 'bg-[#274e23] text-white font-semibold shadow-sm'
                  : 'text-[#5c4d43] hover:text-[#274e23] hover:bg-[#f0e6d8]'
              }`}
            >
              Thư Viện Sống Xanh
            </button>

            <button
              onClick={() => handleNavClick('advisor')}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'advisor'
                  ? 'bg-amber-600 text-white font-semibold shadow-sm'
                  : 'bg-[#e2d5c3] text-[#274e23] hover:bg-[#d8c7b2] font-semibold'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
              BiO AI Bot
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#fbf8f3] border-b border-[#e6dbc8] px-4 pt-2 pb-6 space-y-2">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold ${
              activeTab === 'home' ? 'bg-[#274e23] text-white' : 'text-[#2d241e]'
            }`}
          >
            Trang Chủ Tổng Quan
          </button>
          <button
            onClick={() => handleNavClick('model')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 ${
              activeTab === 'model' ? 'bg-[#274e23] text-white' : 'text-[#2d241e]'
            }`}
          >
            <Store className="w-4 h-4 text-amber-500" />
            Kế Hoạch Kinh Doanh BiO Station
          </button>
          <button
            onClick={() => handleNavClick('shop')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold ${
              activeTab === 'shop' ? 'bg-[#274e23] text-white' : 'text-[#2d241e]'
            }`}
          >
            Cửa Hàng Nông Sản BMQ
          </button>
          <button
            onClick={() => handleNavClick('network')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold ${
              activeTab === 'network' ? 'bg-[#274e23] text-white' : 'text-[#2d241e]'
            }`}
          >
            Mạng Lưới Station Toàn Quốc
          </button>
          <button
            onClick={() => handleNavClick('recipes')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold ${
              activeTab === 'recipes' ? 'bg-[#274e23] text-white' : 'text-[#2d241e]'
            }`}
          >
            Công Thức Món Ăn Lành
          </button>
          <button
            onClick={() => handleNavClick('knowledge')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold ${
              activeTab === 'knowledge' ? 'bg-[#274e23] text-white' : 'text-[#2d241e]'
            }`}
          >
            Thư Viện Sống Xanh Bách Mộc
          </button>
        </div>
      )}
    </header>
  );
};
