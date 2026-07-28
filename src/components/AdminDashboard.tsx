import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { BioStationLogo } from './BioStationLogo';
import {
  Product,
  Recipe,
  Article,
  SuccessStory,
  StationItem,
  BusinessBlock,
  RoadmapStage,
  Principle,
  ThemeConfig,
  BrandConfig,
  DishOption,
} from '../types';
import {
  Settings,
  Store,
  MapPin,
  ShoppingBag,
  BookOpen,
  Heart,
  Plus,
  Trash2,
  Edit2,
  Save,
  RotateCcw,
  Download,
  Upload,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Globe,
  Tag,
  ChefHat,
  Layers,
  FileText,
  AlertCircle,
  X,
  Phone,
  Mail,
  Home,
  Palette,
  Type,
  Image as ImageIcon,
  Sliders,
  QrCode,
  CreditCard,
  Building2,
  Truck,
  Percent,
  Eye,
  Lock,
  Unlock,
  ArrowUp,
  ArrowDown,
  Crop,
  Check,
  ExternalLink,
  MessageSquare,
  Wheat,
  Star,
  Users,
  TrendingUp,
  PieChart,
  Megaphone,
  Sprout,
  Utensils,
} from 'lucide-react';

// Helper to automatically convert Google Drive share links to direct image links
const formatImageUrl = (url: string) => {
  if (!url) return url;
  const driveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
  if (driveMatch && driveMatch[1]) {
    return `https://drive.google.com/uc?export=view&id=${driveMatch[1]}`;
  }
  return url;
};

// Preset sample images for quick selection in admin
const SAMPLE_IMAGES = [
  {
    name: 'Gạo Hữu Cơ Bách Mộc ST25',
    url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    category: 'Gạo & Nông Sản',
  },
  {
    name: 'Nông Trại Hữu Cơ Bách Mộc',
    url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    category: 'Nông Trại',
  },
  {
    name: 'Rau Củ Tươi Mới BMQ',
    url: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=800&q=80',
    category: 'Rau Củ',
  },
  {
    name: 'Điểm Trạm BiO Station',
    url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    category: 'Trạm BiO',
  },
  {
    name: 'Món Ăn Dinh Dưỡng Lành',
    url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    category: 'Công Thức',
  },
  {
    name: 'Trà & Nước Ép Thanh Lọc',
    url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    category: 'Thức Uống',
  },
];

// Preset Color Palettes
const THEME_PRESETS = [
  {
    name: 'Bách Mộc Nguyên Bản',
    primaryColor: '#274e23',
    accentColor: '#8c521f',
    bgTone: '#f8f5f0',
    headerBg: '#1f381c',
    footerBg: '#1f381c',
  },
  {
    name: 'Trà Xanh Sinh Thái',
    primaryColor: '#1b4332',
    accentColor: '#2d6a4f',
    bgTone: '#f4f9f4',
    headerBg: '#081c15',
    footerBg: '#081c15',
  },
  {
    name: 'Đất Mẹ Nông Sản',
    primaryColor: '#3d2b1f',
    accentColor: '#b06d3b',
    bgTone: '#faf6f0',
    headerBg: '#2a1d15',
    footerBg: '#2a1d15',
  },
  {
    name: 'Hoàng Hôn Nông Trại',
    primaryColor: '#4a3b32',
    accentColor: '#d97706',
    bgTone: '#fffbeb',
    headerBg: '#31231e',
    footerBg: '#31231e',
  },
];

const LogoEditorSection: React.FC<{
  brandConfig: BrandConfig;
  updateBrandConfig: (updated: Partial<BrandConfig>) => void;
}> = ({ brandConfig, updateBrandConfig }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialOffset, setInitialOffset] = useState({ x: 0, y: 0 });
  const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>('light');

  const logoType = brandConfig.logoType || 'vector';
  const logoScale = brandConfig.logoScale ?? 100;
  const logoOffsetX = brandConfig.logoOffsetX ?? 0;
  const logoOffsetY = brandConfig.logoOffsetY ?? 0;
  const logoHeight = brandConfig.logoHeight ?? 44;
  const logoImageUrl = brandConfig.logoImageUrl || '';

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          updateBrandConfig({
            logoImageUrl: result,
            logoType: logoType === 'vector' ? 'image' : logoType,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setInitialOffset({ x: logoOffsetX, y: logoOffsetY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const dx = Math.round(e.clientX - dragStart.x);
    const dy = Math.round(e.clientY - dragStart.y);
    const newX = Math.max(-200, Math.min(200, initialOffset.x + dx));
    const newY = Math.max(-150, Math.min(150, initialOffset.y + dy));
    updateBrandConfig({ logoOffsetX: newX, logoOffsetY: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const zoomStep = e.deltaY < 0 ? 5 : -5;
    const newScale = Math.max(30, Math.min(300, logoScale + zoomStep));
    updateBrandConfig({ logoScale: newScale });
  };

  const handleReset = () => {
    updateBrandConfig({
      logoScale: 100,
      logoOffsetX: 0,
      logoOffsetY: 0,
      logoHeight: 44,
    });
  };

  return (
    <div className="bg-gradient-to-br from-[#faf8f5] to-white p-6 rounded-3xl border border-[#e2d5c3] shadow-sm space-y-5 col-span-1 lg:col-span-2">
      <div className="flex items-center justify-between border-b border-[#f0e6d8] pb-3">
        <h3 className="text-lg font-bold font-serif text-[#274e23] flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-amber-600" />
          Tải Up & Căn Chỉnh Logo Website Tương Tác (Phóng To / Thu Nhỏ / Kéo Di Chuyển)
        </h3>
        <button
          type="button"
          onClick={handleReset}
          className="text-xs px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 flex items-center gap-1 font-semibold transition"
          title="Đặt lại vị trí & kích thước mặc định"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Đặt lại ban đầu
        </button>
      </div>

      {/* 1. Chọn kiểu hiển thị Logo */}
      <div>
        <label className="text-xs font-bold text-[#5c4d43] block mb-2">
          Chế độ hiển thị Logo:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => updateBrandConfig({ logoType: 'vector' })}
            className={`p-2.5 text-xs font-semibold rounded-xl border text-center transition ${
              logoType === 'vector'
                ? 'bg-[#274e23] text-white border-[#274e23] shadow-sm'
                : 'bg-white text-[#5c4d43] border-[#dcd0bf] hover:bg-[#fbf8f3]'
            }`}
          >
            🎨 SVG / Chữ Mặc Định
          </button>
          <button
            type="button"
            onClick={() => updateBrandConfig({ logoType: 'image' })}
            className={`p-2.5 text-xs font-semibold rounded-xl border text-center transition ${
              logoType === 'image'
                ? 'bg-[#274e23] text-white border-[#274e23] shadow-sm'
                : 'bg-white text-[#5c4d43] border-[#dcd0bf] hover:bg-[#fbf8f3]'
            }`}
          >
            🖼️ Logo Hình Ảnh Tùy Chỉnh
          </button>
          <button
            type="button"
            onClick={() => updateBrandConfig({ logoType: 'combined' })}
            className={`p-2.5 text-xs font-semibold rounded-xl border text-center transition ${
              logoType === 'combined'
                ? 'bg-[#274e23] text-white border-[#274e23] shadow-sm'
                : 'bg-white text-[#5c4d43] border-[#dcd0bf] hover:bg-[#fbf8f3]'
            }`}
          >
            🧩 Kết Hợp (Ảnh + Chữ)
          </button>
        </div>
      </div>

      {/* 2. Tải Ảnh Logo / URL */}
      {(logoType === 'image' || logoType === 'combined') && (
        <div className="space-y-3 bg-[#f7f3ed] p-4 rounded-2xl border border-[#e8ded1]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <label className="cursor-pointer bg-[#274e23] hover:bg-[#1f3f1c] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition flex items-center gap-2 shrink-0">
              <Upload className="w-4 h-4" />
              Tải Logo từ máy tính...
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <span className="text-xs text-stone-500 font-medium">
              (Chấp nhận định dạng PNG, SVG, JPG, WebP)
            </span>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#5c4d43] block mb-1">
              Hoặc dán Đường Dẫn (URL) Logo:
            </label>
            <input
              type="url"
              placeholder="https://domain.com/logo.png"
              value={logoImageUrl}
              onChange={(e) => updateBrandConfig({ logoImageUrl: formatImageUrl(e.target.value) })}
              className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-white focus:outline-none focus:ring-2 focus:ring-[#274e23]"
            />
          </div>

          <div className="pt-2 border-t border-[#e8ded1] mt-3">
            <label className="text-[11px] font-semibold text-[#5c4d43] block mb-1">
              URL Logo Phụ dưới chân trang (VD: Logo Bộ Công Thương, Đối Tác...):
            </label>
            <input
              type="url"
              placeholder="https://domain.com/bo-cong-thuong.png"
              value={brandConfig.certificationLogoUrl || ''}
              onChange={(e) => updateBrandConfig({ certificationLogoUrl: formatImageUrl(e.target.value) })}
              className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-white focus:outline-none focus:ring-2 focus:ring-[#274e23]"
            />
          </div>
        </div>
      )}

      {/* 3. Khung Canh Chỉnh Tương Tác Live Canvas (Kéo Rê chuột & Lăn chuột) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[#5c4d43] flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-[#274e23]" />
            Khung Canh Chỉnh Trực Tiếp (Bấm giữ & Kéo chuột để di chuyển | Lăn chuột để Phóng to/Thu nhỏ):
          </label>
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="text-stone-500">Xem nền:</span>
            <button
              type="button"
              onClick={() => setPreviewTheme('light')}
              className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                previewTheme === 'light'
                  ? 'bg-amber-200 text-amber-900'
                  : 'bg-stone-200 text-stone-600'
              }`}
            >
              Sáng
            </button>
            <button
              type="button"
              onClick={() => setPreviewTheme('dark')}
              className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                previewTheme === 'dark'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-200 text-stone-600'
              }`}
            >
              Tối
            </button>
          </div>
        </div>

        {/* Live Canvas Window */}
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          className={`relative h-44 rounded-2xl border-2 border-dashed border-[#cbbca7] flex items-center justify-center select-none overflow-hidden cursor-grab active:cursor-grabbing transition-colors ${
            previewTheme === 'dark' ? 'bg-[#1a2e18]' : 'bg-[#f4efe8]'
          }`}
        >
          {/* Alignment Crosshair lines */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-full h-[1px] bg-stone-400/20 border-t border-dashed border-stone-400/40"></div>
            <div className="absolute h-full w-[1px] bg-stone-400/20 border-l border-dashed border-stone-400/40"></div>
          </div>

          <div className="absolute top-2 left-2 text-[10px] bg-black/60 text-white px-2.5 py-1 rounded-md pointer-events-none z-10 flex items-center gap-1.5">
            <span>🔍 Scale: <b>{logoScale}%</b></span>
            <span>|</span>
            <span>↔️ X: <b>{logoOffsetX}px</b></span>
            <span>|</span>
            <span>↕️ Y: <b>{logoOffsetY}px</b></span>
          </div>

          <BioStationLogo
            variant={previewTheme === 'dark' ? 'dark' : 'full'}
            showSlogan={true}
          />
        </div>
      </div>

      {/* 4. Các thanh trượt điều chỉnh tinh vi (Fine Sliders) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#faf5ee] p-4 rounded-2xl border border-[#e5d9c8]">
        {/* Scale Zoom Slider */}
        <div>
          <div className="flex justify-between text-xs font-semibold text-[#5c4d43] mb-1">
            <span>🔍 Phóng To / Thu Nhỏ (Scale %):</span>
            <span className="font-bold text-[#274e23]">{logoScale}%</span>
          </div>
          <input
            type="range"
            min="30"
            max="300"
            step="1"
            value={logoScale}
            onChange={(e) => updateBrandConfig({ logoScale: Number(e.target.value) })}
            className="w-full accent-[#274e23] cursor-pointer"
          />
        </div>

        {/* Base Height Slider */}
        <div>
          <div className="flex justify-between text-xs font-semibold text-[#5c4d43] mb-1">
            <span>📐 Chiều Cao Cơ Sở (Height):</span>
            <span className="font-bold text-[#274e23]">{logoHeight}px</span>
          </div>
          <input
            type="range"
            min="20"
            max="120"
            step="1"
            value={logoHeight}
            onChange={(e) => updateBrandConfig({ logoHeight: Number(e.target.value) })}
            className="w-full accent-[#274e23] cursor-pointer"
          />
        </div>

        {/* Horizontal Offset X Slider */}
        <div>
          <div className="flex justify-between text-xs font-semibold text-[#5c4d43] mb-1">
            <span>↔️ Vị Trí Ngang (Offset X):</span>
            <span className="font-bold text-[#274e23]">{logoOffsetX}px</span>
          </div>
          <input
            type="range"
            min="-150"
            max="150"
            step="1"
            value={logoOffsetX}
            onChange={(e) => updateBrandConfig({ logoOffsetX: Number(e.target.value) })}
            className="w-full accent-[#274e23] cursor-pointer"
          />
        </div>

        {/* Vertical Offset Y Slider */}
        <div>
          <div className="flex justify-between text-xs font-semibold text-[#5c4d43] mb-1">
            <span>↕️ Vị Trí Dọc (Offset Y):</span>
            <span className="font-bold text-[#274e23]">{logoOffsetY}px</span>
          </div>
          <input
            type="range"
            min="-100"
            max="100"
            step="1"
            value={logoOffsetY}
            onChange={(e) => updateBrandConfig({ logoOffsetY: Number(e.target.value) })}
            className="w-full accent-[#274e23] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export const AdminDashboard: React.FC = () => {
  const {
    siteData,
    updateBrandConfig,
    updateHeroConfig,
    updateThemeConfig,
    updatePaymentConfig,
    updateExperienceMealConfig,
    updateBusinessMission,
    setBusinessBlocks,
    setRoadmapStages,
    setPrinciples,
    setStations,
    setProducts,
    setRecipes,
    setArticles,
    setStories,
    setBioCategories,
    toggleMainSaleProduct,
    resetToDefaults,
    importJSON,
    exportJSON,
  } = useSite();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('BIO_STATION_ADMIN_AUTH') === 'true';
  });
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [authError, setAuthError] = useState('');

  const [newAdminUser, setNewAdminUser] = useState(localStorage.getItem('BIO_STATION_ADMIN_USER') || 'admin');
  const [newAdminPass, setNewAdminPass] = useState(localStorage.getItem('BIO_STATION_ADMIN_PASS') || 'admin123');

  const [activeTab, setActiveTab] = useState<
    'brand' | 'theme' | 'payment' | 'experience_meal' | 'business' | 'products' | 'stations' | 'recipes' | 'articles' | 'stories' | 'tools'
  >('brand');

  const [saveSuccess, setSaveSuccess] = useState('');
  const [jsonInput, setJsonInput] = useState('');
  const [jsonError, setJsonError] = useState('');

  // Editing state modals
  const [editingDish, setEditingDish] = useState<DishOption | null>(null);
  const [isAddingDish, setIsAddingDish] = useState(false);

  // Editing state modals
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const [editingStation, setEditingStation] = useState<StationItem | null>(null);
  const [isAddingStation, setIsAddingStation] = useState(false);

  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [isAddingRecipe, setIsAddingRecipe] = useState(false);

  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isAddingArticle, setIsAddingArticle] = useState(false);

  const [editingStory, setEditingStory] = useState<SuccessStory | null>(null);
  const [isAddingStory, setIsAddingStory] = useState(false);

  // Image Cropper Sub-Modal State
  const [imageToolTarget, setImageToolTarget] = useState<{
    type: 'product' | 'station' | 'recipe' | 'article' | 'story' | 'brand';
    field: string;
    currentUrl: string;
    objectFit: string;
    aspectRatio: string;
  } | null>(null);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const validUser = localStorage.getItem('BIO_STATION_ADMIN_USER') || 'admin';
    const validPass = localStorage.getItem('BIO_STATION_ADMIN_PASS') || 'admin123';

    if ((loginUser === validUser || loginUser === 'biostation') && (loginPass === validPass || loginPass === 'biostation2026')) {
      setIsAuthenticated(true);
      sessionStorage.setItem('BIO_STATION_ADMIN_AUTH', 'true');
      setAuthError('');
      showNotification('Đăng nhập quản trị viên thành công!');
    } else {
      setAuthError('Tên đăng nhập hoặc mật khẩu không chính xác!');
    }
  };

  const handleQuickAutoLogin = () => {
    setLoginUser('admin');
    setLoginPass('admin123');
    setIsAuthenticated(true);
    sessionStorage.setItem('BIO_STATION_ADMIN_AUTH', 'true');
    setAuthError('');
    showNotification('Đã tự động đăng nhập quyền Quản trị viên!');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('BIO_STATION_ADMIN_AUTH');
    setLoginUser('');
    setLoginPass('');
    showNotification('Đã đăng xuất khỏi tài khoản Quản trị!');
  };

  const handleUpdateAdminCredentials = () => {
    if (!newAdminUser.trim() || !newAdminPass.trim()) {
      alert('Tên đăng nhập và mật khẩu không được để trống!');
      return;
    }
    localStorage.setItem('BIO_STATION_ADMIN_USER', newAdminUser.trim());
    localStorage.setItem('BIO_STATION_ADMIN_PASS', newAdminPass.trim());
    showNotification('Đã cập nhật thông tin đăng nhập Admin thành công!');
  };

  const showNotification = (msg: string) => {
    setSaveSuccess(msg);
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  const handleSaveAndRefresh = (msg: string) => {
    setSaveSuccess(`${msg} Đang làm mới và cập nhật giao diện toàn trang...`);
    setTimeout(() => {
      window.location.reload();
    }, 600);
  };

  const handleExport = () => {
    const jsonStr = exportJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `biostation-site-config-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showNotification('Đã xuất file cấu hình JSON thành công!');
  };

  const handleImport = () => {
    if (!jsonInput.trim()) return;
    const ok = importJSON(jsonInput);
    if (ok) {
      setJsonError('');
      setJsonInput('');
      showNotification('Đã nhập dữ liệu cấu hình mới thành công!');
    } else {
      setJsonError('Định dạng JSON không hợp lệ. Vui lòng kiểm tra lại cấu trúc file!');
    }
  };

  // Business Blocks (7 Pillars) Handlers
  const handleAddBlock = () => {
    const newId = Date.now();
    const nextNumber = ((siteData.businessBlocks?.length || 0) + 1).toString();
    const newBlock: BusinessBlock = {
      id: newId,
      number: nextNumber,
      title: `TRỤ CỘT MỚI #${nextNumber}`,
      icon: 'Store',
      highlight: 'Điểm nổi bật của trụ cột mới...',
      items: ['Nội dung chi tiết 1...', 'Nội dung chi tiết 2...'],
    };
    setBusinessBlocks((prev) => [...(prev || []), newBlock]);
    showNotification('Đã thêm trụ cột mới!');
  };

  const handleUpdateBlock = (blockId: number, updatedFields: Partial<BusinessBlock>) => {
    setBusinessBlocks((prev) =>
      (prev || []).map((blk) => (blk.id === blockId ? { ...blk, ...updatedFields } : blk))
    );
  };

  const handleDeleteBlock = (blockId: number, title: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa trụ cột "${title}"?`)) {
      setBusinessBlocks((prev) => (prev || []).filter((blk) => blk.id !== blockId));
      showNotification('Đã xóa trụ cột!');
    }
  };

  const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
    setBusinessBlocks((prev) => {
      const newArr = [...(prev || [])];
      const targetIdx = direction === 'up' ? index - 1 : index + 1;
      if (targetIdx >= 0 && targetIdx < newArr.length) {
        const temp = newArr[index];
        newArr[index] = newArr[targetIdx];
        newArr[targetIdx] = temp;
      }
      return newArr;
    });
  };

  const handleAddBlockItem = (blockId: number) => {
    setBusinessBlocks((prev) =>
      (prev || []).map((blk) => {
        if (blk.id === blockId) {
          return {
            ...blk,
            items: [...(blk.items || []), 'Nội dung chi tiết mới...'],
          };
        }
        return blk;
      })
    );
  };

  const handleUpdateBlockItem = (blockId: number, itemIndex: number, newValue: string) => {
    setBusinessBlocks((prev) =>
      (prev || []).map((blk) => {
        if (blk.id === blockId) {
          const newItems = [...(blk.items || [])];
          newItems[itemIndex] = newValue;
          return { ...blk, items: newItems };
        }
        return blk;
      })
    );
  };

  const handleDeleteBlockItem = (blockId: number, itemIndex: number) => {
    setBusinessBlocks((prev) =>
      (prev || []).map((blk) => {
        if (blk.id === blockId) {
          const newItems = (blk.items || []).filter((_, idx) => idx !== itemIndex);
          return { ...blk, items: newItems };
        }
        return blk;
      })
    );
  };

  const handleMoveBlockItem = (blockId: number, itemIndex: number, direction: 'up' | 'down') => {
    setBusinessBlocks((prev) =>
      (prev || []).map((blk) => {
        if (blk.id === blockId) {
          const newItems = [...(blk.items || [])];
          const targetIndex = direction === 'up' ? itemIndex - 1 : itemIndex + 1;
          if (targetIndex >= 0 && targetIndex < newItems.length) {
            const temp = newItems[itemIndex];
            newItems[itemIndex] = newItems[targetIndex];
            newItems[targetIndex] = temp;
          }
          return { ...blk, items: newItems };
        }
        return blk;
      })
    );
  };

  // If not logged in, render an elegant Admin Login Gateway
  if (!isAuthenticated) {
    return (
      <div className="bg-[#f8f5f0] min-h-screen py-12 px-4 flex items-center justify-center text-[#2d241e]">
        <div className="max-w-md w-full bg-white rounded-3xl border border-[#e2d5c3] p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-2xl bg-[#274e23] text-amber-300 shadow-md">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black font-serif text-[#274e23]">
              Đăng Nhập Quản Trị Hệ Thống
            </h2>
            <p className="text-xs text-[#7a6858]">
              Cổng quản trị toàn bộ dữ liệu, giao diện, sản phẩm, bếp ăn & bài viết BiO Station.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-[#5c4d43] block mb-1">Tên Đăng Nhập</label>
              <input
                type="text"
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
                placeholder="Nhập tên đăng nhập..."
                className="w-full p-3 rounded-xl border border-[#dcd0bf] bg-[#fbf8f3] focus:border-[#274e23] focus:ring-1 focus:ring-[#274e23] outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-[#5c4d43] block mb-1">Mật Khẩu</label>
              <input
                type="password"
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                placeholder="Nhập mật khẩu..."
                className="w-full p-3 rounded-xl border border-[#dcd0bf] bg-[#fbf8f3] focus:border-[#274e23] focus:ring-1 focus:ring-[#274e23] outline-none"
              />
            </div>

            {authError && (
              <p className="text-xs text-red-600 font-bold bg-red-50 p-2.5 rounded-xl border border-red-200">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#274e23] hover:bg-[#1f381c] text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4 text-amber-300" /> Đăng Nhập Quản Trị
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f5f0] min-h-screen py-8 px-4 sm:px-6 lg:px-8 text-[#2d241e]" style={{ backgroundColor: 'var(--bg-tone, #f8f5f0)' }}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header Banner */}
        <div className="bg-[#274e23] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-[#1e3e1a]" style={{ backgroundColor: 'var(--primary-color, #274e23)' }}>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Settings className="w-4 h-4 text-amber-300" />
              <span>Trung Tâm Quản Trị Hệ Thống BiO Station (Đã Đăng Nhập)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-serif">
              Quản Lý Chi Tiết Dữ Liệu, Bếp Ăn, Bài Viết & Giao Diện
            </h1>
            <p className="text-xs text-emerald-100 max-w-2xl leading-relaxed">
              Quyền hạn cao nhất: Bạn có thể chỉnh sửa hotline, footer, phông chữ Tiếng Việt, màu sắc, hình ảnh (xén/canh khung), công thức món ăn chi tiết và bài viết truyền cảm hứng.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExport}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow cursor-pointer"
            >
              <Download className="w-4 h-4" /> Xuất File JSON
            </button>
            <button
              onClick={() => {
                if (window.confirm('Bạn có chắc chắn muốn khôi phục về dữ liệu mặc định ban đầu?')) {
                  resetToDefaults();
                  showNotification('Đã khôi phục dữ liệu ban đầu!');
                }
              }}
              className="px-4 py-2.5 rounded-xl bg-red-800/80 hover:bg-red-900 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Khôi Phục Mặc Định
            </button>
            <button
              onClick={handleLogout}
              className="px-3.5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-black text-amber-300 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-amber-400/30"
            >
              <Lock className="w-4 h-4" /> Đăng Xuất
            </button>
          </div>
        </div>

        {/* Save Notification Toast */}
        {saveSuccess && (
          <div className="p-4 bg-emerald-700 text-white rounded-2xl shadow-lg flex items-center gap-3 animate-fade-in font-bold text-xs">
            <CheckCircle2 className="w-5 h-5 text-amber-300" />
            <span>{saveSuccess}</span>
          </div>
        )}

        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap items-center gap-2 bg-white p-2.5 rounded-2xl border border-[#e2d5c3] shadow-sm">
          <button
            onClick={() => setActiveTab('brand')}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'brand'
                ? 'bg-[#274e23] text-white shadow-md'
                : 'text-[#5c4d43] hover:bg-[#f2e9dc]'
            }`}
          >
            <Tag className="w-4 h-4" /> Thương Hiệu & Footer
          </button>
          <button
            onClick={() => setActiveTab('theme')}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'theme'
                ? 'bg-[#274e23] text-white shadow-md'
                : 'text-[#5c4d43] hover:bg-[#f2e9dc]'
            }`}
          >
            <Palette className="w-4 h-4" /> Giao Diện & Font Chữ
          </button>
          <button
            onClick={() => setActiveTab('payment')}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'payment'
                ? 'bg-[#274e23] text-white shadow-md'
                : 'text-[#5c4d43] hover:bg-[#f2e9dc]'
            }`}
          >
            <CreditCard className="w-4 h-4 text-amber-400" /> Thanh Toán & QR Code
          </button>
          <button
            onClick={() => setActiveTab('experience_meal')}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'experience_meal'
                ? 'bg-[#274e23] text-white shadow-md'
                : 'text-[#5c4d43] hover:bg-[#f2e9dc]'
            }`}
          >
            <Utensils className="w-4 h-4 text-amber-400" /> Mâm Cơm Trải Nghiệm
          </button>
          <button
            onClick={() => setActiveTab('business')}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'business'
                ? 'bg-[#274e23] text-white shadow-md'
                : 'text-[#5c4d43] hover:bg-[#f2e9dc]'
            }`}
          >
            <Store className="w-4 h-4" /> Mô Hình 7 Trụ Cột
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'products'
                ? 'bg-[#274e23] text-white shadow-md'
                : 'text-[#5c4d43] hover:bg-[#f2e9dc]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> Sản Phẩm ({siteData.products.length})
          </button>
          <button
            onClick={() => setActiveTab('stations')}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'stations'
                ? 'bg-[#274e23] text-white shadow-md'
                : 'text-[#5c4d43] hover:bg-[#f2e9dc]'
            }`}
          >
            <MapPin className="w-4 h-4" /> Trạm BiO ({siteData.stations.length})
          </button>
          <button
            onClick={() => setActiveTab('recipes')}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'recipes'
                ? 'bg-[#274e23] text-white shadow-md'
                : 'text-[#5c4d43] hover:bg-[#f2e9dc]'
            }`}
          >
            <ChefHat className="w-4 h-4" /> Công Thức Bếp Ăn ({siteData.recipes.length})
          </button>
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'articles'
                ? 'bg-[#274e23] text-white shadow-md'
                : 'text-[#5c4d43] hover:bg-[#f2e9dc]'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Thư Viện Bài Viết ({siteData.articles.length})
          </button>
          <button
            onClick={() => setActiveTab('stories')}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'stories'
                ? 'bg-[#274e23] text-white shadow-md'
                : 'text-[#5c4d43] hover:bg-[#f2e9dc]'
            }`}
          >
            <Heart className="w-4 h-4" /> Câu Chuyện ({siteData.stories.length})
          </button>
          <button
            onClick={() => setActiveTab('tools')}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'tools'
                ? 'bg-[#274e23] text-white shadow-md'
                : 'text-[#5c4d43] hover:bg-[#f2e9dc]'
            }`}
          >
            <Settings className="w-4 h-4" /> Sao Lưu & Import
          </button>
        </div>

        {/* TAB 1: BRAND & FOOTER CONFIG */}
        {activeTab === 'brand' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Interactive Logo Uploader & Real-time Alignment Tool */}
            <LogoEditorSection
              brandConfig={siteData.brandConfig}
              updateBrandConfig={updateBrandConfig}
            />

            {/* Brand General Info & Footer Contact */}
            <div className="bg-white p-6 rounded-3xl border border-[#e2d5c3] shadow-sm space-y-4">
              <h3 className="text-lg font-bold font-serif text-[#274e23] border-b border-[#f0e6d8] pb-3 flex items-center gap-2">
                <Tag className="w-5 h-5 text-amber-600" />
                Chỉnh Sửa Thương Hiệu & Thông Tin Chân Trang (Footer)
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                    Tên Thương Hiệu Chính
                  </label>
                  <input
                    type="text"
                    value={siteData.brandConfig.logoMainText}
                    onChange={(e) => updateBrandConfig({ logoMainText: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-[#fbf8f3]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                    Tên Thương Hiệu Phụ
                  </label>
                  <input
                    type="text"
                    value={siteData.brandConfig.logoSubText}
                    onChange={(e) => updateBrandConfig({ logoSubText: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-[#fbf8f3]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                  Slogan Khai Cuộc
                </label>
                <input
                  type="text"
                  value={siteData.brandConfig.slogan}
                  onChange={(e) => updateBrandConfig({ slogan: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-[#fbf8f3]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                  Mô Tả Định Vị (Sub Slogan)
                </label>
                <input
                  type="text"
                  value={siteData.brandConfig.subSlogan}
                  onChange={(e) => updateBrandConfig({ subSlogan: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-[#fbf8f3]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                  Thanh Khai Trương / Thông Báo Đỉnh Trang (Top Banner)
                </label>
                <textarea
                  rows={2}
                  value={siteData.brandConfig.topBannerText}
                  onChange={(e) => updateBrandConfig({ topBannerText: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-[#fbf8f3]"
                />
              </div>

              <div className="pt-2 border-t border-[#f0e6d8] space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#274e23]">
                  Thông Tin Chân Trang Footer
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                      Số Hotline Liên Hệ
                    </label>
                    <input
                      type="text"
                      value={siteData.brandConfig.hotline}
                      onChange={(e) => updateBrandConfig({ hotline: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-[#fbf8f3]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                      Địa Chỉ Email Hỗ Trợ
                    </label>
                    <input
                      type="text"
                      value={siteData.brandConfig.email}
                      onChange={(e) => updateBrandConfig({ email: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-[#fbf8f3]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                    Địa Chỉ Trụ Sở & Văn Phòng
                  </label>
                  <input
                    type="text"
                    value={siteData.brandConfig.address}
                    onChange={(e) => updateBrandConfig({ address: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-[#fbf8f3]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                      Tên Miền Website
                    </label>
                    <input
                      type="text"
                      value={siteData.brandConfig.websiteUrl}
                      onChange={(e) => updateBrandConfig({ websiteUrl: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-[#fbf8f3]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                      Giờ Mở Cửa Phục Vụ
                    </label>
                    <input
                      type="text"
                      value={siteData.brandConfig.operatingHours}
                      onChange={(e) => updateBrandConfig({ operatingHours: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-[#fbf8f3]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                    Dòng Bản Quyền Cuối Trang (Copyright)
                  </label>
                  <input
                    type="text"
                    value={siteData.brandConfig.copyrightText || ''}
                    onChange={(e) => updateBrandConfig({ copyrightText: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-[#fbf8f3]"
                  />
                </div>

                {/* Social Links */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                      Link Facebook Fanpage
                    </label>
                    <input
                      type="text"
                      value={siteData.brandConfig.socialFacebook || ''}
                      onChange={(e) => updateBrandConfig({ socialFacebook: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-[#fbf8f3]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                      Link Zalo Official Account
                    </label>
                    <input
                      type="text"
                      value={siteData.brandConfig.socialZalo || ''}
                      onChange={(e) => updateBrandConfig({ socialZalo: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-[#fbf8f3]"
                    />
                  </div>
                </div>

                {/* Hero / CTA Texts Editing */}
                <div className="pt-4 border-t border-[#f0e6d8] space-y-4">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#274e23] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    Chỉnh Sửa Nút Bấm & Ba Điểm Nhấn Trang Chủ
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-2 p-3 bg-[#f8f5f0] rounded-xl border border-[#e2d5c3]">
                      <h4 className="text-[11px] font-bold text-[#274e23]">Điểm Nhấn 1 (Biểu tượng Lúa)</h4>
                      <input
                        type="text"
                        value={siteData.heroConfig.coreValue1Title}
                        onChange={(e) => updateHeroConfig({ coreValue1Title: e.target.value })}
                        className="w-full text-xs p-2 rounded-lg border border-[#dcd0bf] bg-white font-bold"
                      />
                      <input
                        type="text"
                        value={siteData.heroConfig.coreValue1Desc}
                        onChange={(e) => updateHeroConfig({ coreValue1Desc: e.target.value })}
                        className="w-full text-[11px] p-2 rounded-lg border border-[#dcd0bf] bg-white"
                      />
                    </div>
                    
                    <div className="space-y-2 p-3 bg-[#f8f5f0] rounded-xl border border-[#e2d5c3]">
                      <h4 className="text-[11px] font-bold text-[#274e23]">Điểm Nhấn 2 (Biểu tượng Thịt)</h4>
                      <input
                        type="text"
                        value={siteData.heroConfig.coreValue2Title}
                        onChange={(e) => updateHeroConfig({ coreValue2Title: e.target.value })}
                        className="w-full text-xs p-2 rounded-lg border border-[#dcd0bf] bg-white font-bold"
                      />
                      <input
                        type="text"
                        value={siteData.heroConfig.coreValue2Desc}
                        onChange={(e) => updateHeroConfig({ coreValue2Desc: e.target.value })}
                        className="w-full text-[11px] p-2 rounded-lg border border-[#dcd0bf] bg-white"
                      />
                    </div>
                    
                    <div className="space-y-2 p-3 bg-[#f8f5f0] rounded-xl border border-[#e2d5c3]">
                      <h4 className="text-[11px] font-bold text-[#274e23]">Điểm Nhấn 3 (Biểu tượng Bát Súp)</h4>
                      <input
                        type="text"
                        value={siteData.heroConfig.coreValue3Title}
                        onChange={(e) => updateHeroConfig({ coreValue3Title: e.target.value })}
                        className="w-full text-xs p-2 rounded-lg border border-[#dcd0bf] bg-white font-bold"
                      />
                      <input
                        type="text"
                        value={siteData.heroConfig.coreValue3Desc}
                        onChange={(e) => updateHeroConfig({ coreValue3Desc: e.target.value })}
                        className="w-full text-[11px] p-2 rounded-lg border border-[#dcd0bf] bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div>
                      <label className="text-[11px] font-semibold text-[#5c4d43] block mb-1">Tên Nút Bấm Chính (Xanh)</label>
                      <input
                        type="text"
                        value={siteData.heroConfig.ctaPrimaryText}
                        onChange={(e) => updateHeroConfig({ ctaPrimaryText: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-white font-bold text-[#274e23]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-[#5c4d43] block mb-1">Tên Nút Bấm Phụ (Vàng)</label>
                      <input
                        type="text"
                        value={siteData.heroConfig.ctaSecondaryText}
                        onChange={(e) => updateHeroConfig({ ctaSecondaryText: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-white font-bold text-amber-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Custom Phrases & Terms Deep Customization */}
                <div className="pt-4 border-t border-[#f0e6d8] space-y-4">
                  <div className="bg-[#274e23]/5 p-4 rounded-2xl border border-[#274e23]/20 space-y-3">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#274e23] flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      Chỉnh Sửa Nhãn Thuật Ngữ & Từ Khóa Hệ Thống (Deep Text Customization)
                    </h4>
                    <p className="text-[11px] text-[#7a6858]">
                      Tùy biến tên gọi các mục như "Trang chủ", "Nông sản", "Mô hình BiO", v.v. Tất cả nhãn hiển thị trên toàn trang web sẽ lập tức thay đổi theo thiết lập này.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                          Tên Nhãn "Trang Chủ"
                        </label>
                        <input
                          type="text"
                          value={siteData.brandConfig.homepageLabel || 'Trang Chủ'}
                          onChange={(e) => updateBrandConfig({ homepageLabel: e.target.value })}
                          className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-white font-bold text-[#274e23]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                          Tên Nhãn "Mô Hình BiO Station"
                        </label>
                        <input
                          type="text"
                          value={siteData.brandConfig.bioStationLabel || 'Hệ Sinh Thái BiO Station'}
                          onChange={(e) => updateBrandConfig({ bioStationLabel: e.target.value })}
                          className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-white font-bold text-[#274e23]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                          Tên Nhãn "Nông Sản & Gạo Bách Mộc"
                        </label>
                        <input
                          type="text"
                          value={siteData.brandConfig.agriProductsLabel || 'Nông Sản & Gạo Bách Mộc'}
                          onChange={(e) => updateBrandConfig({ agriProductsLabel: e.target.value })}
                          className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-white font-bold text-[#274e23]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                          Tên Nhãn "Rau Củ Quả Hữu Cơ"
                        </label>
                        <input
                          type="text"
                          value={siteData.brandConfig.organicVegetablesLabel || 'Rau Củ Quả Hữu Cơ'}
                          onChange={(e) => updateBrandConfig({ organicVegetablesLabel: e.target.value })}
                          className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-white font-bold text-[#274e23]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                          Tên Nhãn "Thịt & Hải Sản Sạch"
                        </label>
                        <input
                          type="text"
                          value={siteData.brandConfig.cleanMeatLabel || 'Thịt & Hải Sản Sạch'}
                          onChange={(e) => updateBrandConfig({ cleanMeatLabel: e.target.value })}
                          className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-white font-bold text-[#274e23]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                          Tiêu Đề Khối "Sản Phẩm Bán Lẻ Chủ Lực"
                        </label>
                        <input
                          type="text"
                          value={siteData.brandConfig.mainSaleProductTitle || 'Sản Phẩm Bán Lẻ Chủ Lực Trang Chủ'}
                          onChange={(e) => updateBrandConfig({ mainSaleProductTitle: e.target.value })}
                          className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-white font-bold text-amber-800"
                        />
                      </div>
                    </div>
                  </div>

                  {/* BiO Station 3 Category Options Customization */}
                  <div className="bg-[#f8f5f0] p-4 rounded-2xl border border-[#e2d5c3] space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider text-[#274e23] flex items-center gap-1.5">
                          <Wheat className="w-4 h-4 text-amber-600" />
                          Quản Lý 3 Danh Mục Nông Sản BiO Station (Gạo/Nông Sản, Rau Củ, Thịt Sạch)
                        </h4>
                        <p className="text-[11px] text-[#7a6858]">
                          Thay đổi tiêu đề, mô tả, subtitle và biểu tượng icon/emoji của 3 mục chính trên Trang Chủ.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {(siteData.bioCategories || []).map((cat, catIdx) => (
                        <div key={cat.id || catIdx} className="bg-white p-3.5 rounded-xl border border-[#e2d5c3] shadow-sm space-y-3">
                          <div className="flex items-center gap-2 font-bold text-xs text-[#274e23]">
                            <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-[11px]">
                              {catIdx + 1}
                            </span>
                            <span>Danh Mục #{catIdx + 1}: {cat.title}</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                            <div className="sm:col-span-1">
                              <label className="text-[11px] font-semibold text-[#5c4d43] block mb-1">
                                Biểu Tượng Icon Emoji
                              </label>
                              <input
                                type="text"
                                value={cat.iconEmoji || ''}
                                onChange={(e) => {
                                  const updated = [...(siteData.bioCategories || [])];
                                  updated[catIdx] = { ...updated[catIdx], iconEmoji: e.target.value };
                                  setBioCategories(updated);
                                }}
                                className="w-full text-xs p-2 rounded-lg border border-[#dcd0bf] bg-[#fbf8f3] text-center text-lg"
                                placeholder="🌾"
                              />
                            </div>

                            <div className="sm:col-span-3">
                              <label className="text-[11px] font-semibold text-[#5c4d43] block mb-1">
                                Tên Danh Mục *
                              </label>
                              <input
                                type="text"
                                value={cat.title || ''}
                                onChange={(e) => {
                                  const updated = [...(siteData.bioCategories || [])];
                                  updated[catIdx] = { ...updated[catIdx], title: e.target.value };
                                  setBioCategories(updated);
                                }}
                                className="w-full text-xs p-2 rounded-lg border border-[#dcd0bf] font-bold text-[#274e23]"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="text-[11px] font-semibold text-[#5c4d43] block mb-1">
                                Phụ Đề Nổi Bật (Subtitle)
                              </label>
                              <input
                                type="text"
                                value={cat.subtitle || ''}
                                onChange={(e) => {
                                  const updated = [...(siteData.bioCategories || [])];
                                  updated[catIdx] = { ...updated[catIdx], subtitle: e.target.value };
                                  setBioCategories(updated);
                                }}
                                className="w-full text-xs p-2 rounded-lg border border-[#dcd0bf]"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] font-semibold text-[#5c4d43] block mb-1">
                                Mô Tả Tóm Tắt Chi Tiết
                              </label>
                              <input
                                type="text"
                                value={cat.description || ''}
                                onChange={(e) => {
                                  const updated = [...(siteData.bioCategories || [])];
                                  updated[catIdx] = { ...updated[catIdx], description: e.target.value };
                                  setBioCategories(updated);
                                }}
                                className="w-full text-xs p-2 rounded-lg border border-[#dcd0bf]"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] font-semibold text-[#5c4d43] block mb-1">
                                Liên Kết Danh Mục Cửa Hàng
                              </label>
                              <select
                                value={cat.categoryKey || 'Tất Cả'}
                                onChange={(e) => {
                                  const updated = [...(siteData.bioCategories || [])];
                                  updated[catIdx] = { ...updated[catIdx], categoryKey: e.target.value };
                                  setBioCategories(updated);
                                }}
                                className="w-full text-xs p-2 rounded-lg border border-[#dcd0bf] bg-white font-bold text-[#274e23]"
                              >
                                <option value="Tất Cả">Tất Cả Sản Phẩm</option>
                                <option value="Gạo & Nông Sản">Gạo & Nông Sản</option>
                                <option value="Rau Củ Hữu Cơ">Rau Củ Hữu Cơ</option>
                                <option value="Thịt & Hải Sản Sạch">Thịt & Hải Sản Sạch</option>
                                <option value="Mật Ong & Tự Nhiên">Mật Ong & Tự Nhiên</option>
                                <option value="Bộ Sản Phẩm Gia Đình">Bộ Sản Phẩm Gia Đình</option>
                                <option value="Chăm Sóc & Gia Dụng">Chăm Sóc & Gia Dụng</option>
                                <option value="Bữa Ăn Trải Nghiệm">Bữa Ăn Trải Nghiệm</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleSaveAndRefresh('Đã lưu thông tin thương hiệu & footer!')}
                className="w-full py-2.5 bg-[#274e23] hover:bg-[#1f381c] text-white font-bold text-xs rounded-xl shadow cursor-pointer flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <Save className="w-4 h-4 text-amber-300" /> Lưu Cấu Hình Thương Hiệu & Làm Mới Trang
              </button>
            </div>

            {/* Hero Section Config */}
            <div className="bg-white p-6 rounded-3xl border border-[#e2d5c3] shadow-sm space-y-4">
              <h3 className="text-lg font-bold font-serif text-[#274e23] border-b border-[#f0e6d8] pb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                Chỉnh Sửa Khối Đầu Trang (Hero Banner)
              </h3>

              <div>
                <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                  Thẻ Badge Nhỏ Trải Nghiệm
                </label>
                <input
                  type="text"
                  value={siteData.heroConfig.badgeTag}
                  onChange={(e) => updateHeroConfig({ badgeTag: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-[#fbf8f3]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                    Tiêu Đề Chính Vế 1
                  </label>
                  <input
                    type="text"
                    value={siteData.heroConfig.titlePart1}
                    onChange={(e) => updateHeroConfig({ titlePart1: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-[#fbf8f3]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                    Vế Nổi Bật Slogan
                  </label>
                  <input
                    type="text"
                    value={siteData.heroConfig.titleHighlight}
                    onChange={(e) => updateHeroConfig({ titleHighlight: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-[#fbf8f3]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                  Đoạn Văn Mô Tả Hero
                </label>
                <textarea
                  rows={3}
                  value={siteData.heroConfig.descriptionText}
                  onChange={(e) => updateHeroConfig({ descriptionText: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-[#fbf8f3]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                    Nút bấm chính (Primary CTA)
                  </label>
                  <input
                    type="text"
                    value={siteData.heroConfig.ctaPrimaryText}
                    onChange={(e) => updateHeroConfig({ ctaPrimaryText: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-[#fbf8f3]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                    Nút bấm phụ (Secondary CTA)
                  </label>
                  <input
                    type="text"
                    value={siteData.heroConfig.ctaSecondaryText}
                    onChange={(e) => updateHeroConfig({ ctaSecondaryText: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-[#fbf8f3]"
                  />
                </div>
              </div>

              <button
                onClick={() => handleSaveAndRefresh('Đã lưu cấu hình Hero Banner!')}
                className="w-full py-2.5 bg-[#274e23] hover:bg-[#1f381c] text-white font-bold text-xs rounded-xl shadow cursor-pointer flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <Save className="w-4 h-4 text-amber-300" /> Lưu Cấu Hình Hero Banner & Làm Mới Trang
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: THEME, FONTS & COLORS */}
        {activeTab === 'theme' && (
          <div className="bg-white p-6 rounded-3xl border border-[#e2d5c3] shadow-sm space-y-6">
            <div className="border-b border-[#f0e6d8] pb-4 space-y-1">
              <h3 className="text-lg font-bold font-serif text-[#274e23] flex items-center gap-2">
                <Palette className="w-5 h-5 text-amber-600" />
                Chỉnh Sửa Giao Diện, Phông Chữ Tiếng Việt & Màu Sắc Hệ Thống
              </h3>
              <p className="text-xs text-[#7a6858]">
                Tự do thay đổi phông chữ Tiếng Việt, phối màu sắc và kích thước văn bản. Bấm nút <strong>Lưu Cấu Hình & Làm Mới Trang</strong> phía dưới để cập nhật tức thì.
              </p>
            </div>

            {/* Presets */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#274e23] uppercase tracking-wider block">
                Bộ Phối Màu & Giao Diện Nhanh (Theme Presets):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {THEME_PRESETS.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => {
                      updateThemeConfig({
                        primaryColor: p.primaryColor,
                        accentColor: p.accentColor,
                        bgTone: p.bgTone,
                        headerBg: p.headerBg,
                        footerBg: p.footerBg,
                      });
                      showNotification(`Đã chọn bộ màu ${p.name}. Vui lòng bấm "Lưu & Làm Mới Trang" để hoàn tất!`);
                    }}
                    className="p-3 rounded-2xl border border-[#e2d5c3] hover:border-[#274e23] bg-white text-left text-xs transition-all cursor-pointer shadow-sm hover:shadow"
                  >
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="w-4 h-4 rounded-full border border-black/10 shadow-inner" style={{ backgroundColor: p.primaryColor }} />
                      <span className="w-4 h-4 rounded-full border border-black/10 shadow-inner" style={{ backgroundColor: p.accentColor }} />
                      <span className="w-4 h-4 rounded-full border border-black/10 shadow-inner" style={{ backgroundColor: p.bgTone }} />
                    </div>
                    <span className="font-bold block text-[#274e23]">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Fonts Editor */}
              <div className="p-5 rounded-2xl border border-[#e2d5c3] bg-[#fbf8f3] space-y-4">
                <h4 className="font-bold text-sm text-[#274e23] font-serif flex items-center gap-2">
                  <Type className="w-4 h-4 text-amber-600" />
                  Phông Chữ Tiếng Việt (Vietnamese Font Selector)
                </h4>

                <div>
                  <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                    Phông Tiêu Đề (Display Font)
                  </label>
                  <select
                    value={siteData.themeConfig?.displayFont || 'Playfair Display'}
                    onChange={(e) => updateThemeConfig({ displayFont: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-white font-serif"
                  >
                    <option value="Playfair Display">Playfair Display (Cổ Điển, Sang Trọng)</option>
                    <option value="Be Vietnam Pro">Be Vietnam Pro (Hiện Đại, Chuẩn Việt)</option>
                    <option value="Plus Jakarta Sans">Plus Jakarta Sans (Sắc Nét, Tinh Tế)</option>
                    <option value="Merriweather">Merriweather (Ấm Áp, Trang Trọng)</option>
                    <option value="Montserrat">Montserrat (Đỡ Dày, Mạnh Mẽ)</option>
                    <option value="Dancing Script">Dancing Script (Nét Chữ Uốn Lượn Thơ Mộng)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                    Phông Nội Dung Vấn Bản (Body Font)
                  </label>
                  <select
                    value={siteData.themeConfig?.bodyFont || 'Be Vietnam Pro'}
                    onChange={(e) => updateThemeConfig({ bodyFont: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-white"
                  >
                    <option value="Be Vietnam Pro">Be Vietnam Pro (Tối Ưu Tiếng Việt Đẹp Nhất)</option>
                    <option value="Plus Jakarta Sans">Plus Jakarta Sans (Rõ Ràng & Sạch Sẽ)</option>
                    <option value="Inter">Inter (Đơn Giản Tối Giản)</option>
                    <option value="Roboto">Roboto (Truyền Thống Dễ Đọc)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                    Tỷ Lệ Tỉ Lệ Kích Thước Chữ (Font Sizing Scale)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'compact', label: 'Nhỏ Gọn (93%)' },
                      { id: 'standard', label: 'Tiêu Chuẩn (100%)' },
                      { id: 'spacious', label: 'Thoáng Lớn (107%)' },
                    ].map((scale) => (
                      <button
                        key={scale.id}
                        onClick={() => updateThemeConfig({ fontScale: scale.id as ThemeConfig['fontScale'] })}
                        className={`py-2 px-2 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
                          (siteData.themeConfig?.fontScale || 'standard') === scale.id
                            ? 'bg-[#274e23] text-white border-[#274e23]'
                            : 'bg-white text-[#5c4d43] border-[#dcd0bf]'
                        }`}
                      >
                        {scale.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Color Pickers */}
              <div className="p-5 rounded-2xl border border-[#e2d5c3] bg-[#fbf8f3] space-y-4">
                <h4 className="font-bold text-sm text-[#274e23] font-serif flex items-center gap-2">
                  <Palette className="w-4 h-4 text-amber-600" />
                  Màu Sắc Thương Hiệu Trực Tiếp
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                      Màu Chủ Đạo (Primary)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={siteData.themeConfig?.primaryColor || '#274e23'}
                        onChange={(e) => updateThemeConfig({ primaryColor: e.target.value })}
                        className="w-10 h-9 rounded-lg border border-[#dcd0bf] cursor-pointer"
                      />
                      <input
                        type="text"
                        value={siteData.themeConfig?.primaryColor || '#274e23'}
                        onChange={(e) => updateThemeConfig({ primaryColor: e.target.value })}
                        className="w-full text-xs p-2 rounded-xl border border-[#dcd0bf] font-mono bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                      Màu Điểm Nhấn (Accent)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={siteData.themeConfig?.accentColor || '#8c521f'}
                        onChange={(e) => updateThemeConfig({ accentColor: e.target.value })}
                        className="w-10 h-9 rounded-lg border border-[#dcd0bf] cursor-pointer"
                      />
                      <input
                        type="text"
                        value={siteData.themeConfig?.accentColor || '#8c521f'}
                        onChange={(e) => updateThemeConfig({ accentColor: e.target.value })}
                        className="w-full text-xs p-2 rounded-xl border border-[#dcd0bf] font-mono bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                      Màu Nền Tổng Thể (Background Tone)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={siteData.themeConfig?.bgTone || '#f8f5f0'}
                        onChange={(e) => updateThemeConfig({ bgTone: e.target.value })}
                        className="w-10 h-9 rounded-lg border border-[#dcd0bf] cursor-pointer"
                      />
                      <input
                        type="text"
                        value={siteData.themeConfig?.bgTone || '#f8f5f0'}
                        onChange={(e) => updateThemeConfig({ bgTone: e.target.value })}
                        className="w-full text-xs p-2 rounded-xl border border-[#dcd0bf] font-mono bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                      Màu Nền Header & Footer
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={siteData.themeConfig?.footerBg || '#1f381c'}
                        onChange={(e) => updateThemeConfig({ footerBg: e.target.value, headerBg: e.target.value })}
                        className="w-10 h-9 rounded-lg border border-[#dcd0bf] cursor-pointer"
                      />
                      <input
                        type="text"
                        value={siteData.themeConfig?.footerBg || '#1f381c'}
                        onChange={(e) => updateThemeConfig({ footerBg: e.target.value, headerBg: e.target.value })}
                        className="w-full text-xs p-2 rounded-xl border border-[#dcd0bf] font-mono bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* DEDICATED PROMINENT SAVE BUTTON FOR THEME & FONTS */}
            <div className="pt-4 border-t border-[#f0e6d8] flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-[#7a6858]">
                💡 <strong>Hướng dẫn:</strong> Bấm nút bên phải sau khi chỉnh phông chữ hoặc màu sắc để hệ thống lưu và tự động tải lại toàn bộ trang web.
              </p>
              <button
                onClick={() => handleSaveAndRefresh('Đã lưu cấu hình phông chữ, màu sắc & giao diện!')}
                className="w-full sm:w-auto px-6 py-3 bg-[#274e23] hover:bg-[#1f381c] text-white font-bold text-xs rounded-xl shadow-lg cursor-pointer flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shrink-0"
              >
                <Save className="w-4 h-4 text-amber-300" /> Lưu Cấu Hình Giao Diện, Phông Chữ & Làm Mới Trang
              </button>
            </div>
          </div>
        )}

        {/* TAB PAYMENT: PAYMENT, SHIPPING & QR CODE CONFIG */}
        {activeTab === 'payment' && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 rounded-3xl border border-[#e2d5c3] shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#f0e6d8] pb-4">
                <div>
                  <h3 className="text-xl font-bold font-serif text-[#274e23] flex items-center gap-2">
                    <CreditCard className="w-6 h-6 text-amber-600" />
                    Quản Lý Thanh Toán Ngân Hàng, Mã QR Code & Cước Vận Chuyển VAT
                  </h3>
                  <p className="text-xs text-[#7a6858] mt-1">
                    Cấu hình thông tin chuyển khoản ngân hàng, mã QR VietQR, mức thuế VAT và cước vận chuyển áp dụng cho giỏ hàng.
                  </p>
                </div>
                <button
                  onClick={() => handleSaveAndRefresh('Đã lưu cấu hình thanh toán & QR Code!')}
                  className="px-5 py-2.5 bg-[#274e23] hover:bg-[#1f381c] text-white font-bold text-xs rounded-xl shadow cursor-pointer flex items-center gap-2 transition-all hover:scale-105 shrink-0"
                >
                  <Save className="w-4 h-4 text-amber-300" /> Lưu Cấu Hình Thanh Toán
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 1. BANK ACCOUNT & SUPPORT CONTACT */}
                <div className="space-y-4 bg-[#fbf8f3] p-5 rounded-2xl border border-[#e2d5c3]">
                  <h4 className="font-bold text-sm text-[#274e23] font-serif flex items-center gap-2 border-b border-[#e2d5c3] pb-2">
                    <Building2 className="w-4 h-4 text-amber-600" />
                    1. Thông Tin Tài Khoản Ngân Hàng Nhận Chuyển Khoản
                  </h4>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                        Tên Ngân Hàng
                      </label>
                      <input
                        type="text"
                        value={siteData.paymentConfig?.bankName || ''}
                        onChange={(e) => updatePaymentConfig({ bankName: e.target.value })}
                        placeholder="MBBank (Ngân Hàng Quân Đội)"
                        className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                        Số Tài Khoản
                      </label>
                      <input
                        type="text"
                        value={siteData.paymentConfig?.accountNumber || ''}
                        onChange={(e) => updatePaymentConfig({ accountNumber: e.target.value })}
                        placeholder="908123456789"
                        className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-white font-mono font-bold text-[#274e23]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                      Tên Chủ Tài Khoản (In Hoa)
                    </label>
                    <input
                      type="text"
                      value={siteData.paymentConfig?.accountName || ''}
                      onChange={(e) => updatePaymentConfig({ accountName: e.target.value })}
                      placeholder="HE SINH THAI BIO STATION BACH MOC"
                      className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-white uppercase font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                        Chi Nhánh Ngân Hàng
                      </label>
                      <input
                        type="text"
                        value={siteData.paymentConfig?.bankBranch || ''}
                        onChange={(e) => updatePaymentConfig({ bankBranch: e.target.value })}
                        placeholder="Phú Mỹ Hưng, TP.HCM"
                        className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                        Cú Pháp Nội Dung Chuyển Khoản
                      </label>
                      <input
                        type="text"
                        value={siteData.paymentConfig?.transferNotePrefix || ''}
                        onChange={(e) => updatePaymentConfig({ transferNotePrefix: e.target.value })}
                        placeholder="BIO"
                        className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#e2d5c3]">
                    <div>
                      <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                        Hotline Hỗ Trợ Đơn Hàng
                      </label>
                      <input
                        type="text"
                        value={siteData.paymentConfig?.supportPhone || ''}
                        onChange={(e) => updatePaymentConfig({ supportPhone: e.target.value })}
                        placeholder="0908 123 456"
                        className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                        Email Gửi Hóa Đơn Tự Động
                      </label>
                      <input
                        type="email"
                        value={siteData.paymentConfig?.emailSender || ''}
                        onChange={(e) => updatePaymentConfig({ emailSender: e.target.value })}
                        placeholder="donhang@biostation.vn"
                        className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. QR CODE IMAGE UPLOAD & SELECTION */}
                <div className="space-y-4 bg-[#fbf8f3] p-5 rounded-2xl border border-[#e2d5c3]">
                  <h4 className="font-bold text-sm text-[#274e23] font-serif flex items-center gap-2 border-b border-[#e2d5c3] pb-2">
                    <QrCode className="w-4 h-4 text-amber-600" />
                    2. Cấu Hình & Tải Ảnh Mã QR Code Ngân Hàng
                  </h4>

                  {/* QR Live Preview Card */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-[#dcd0bf]">
                    <div className="p-2 bg-[#f0e6d8] rounded-xl border border-[#dcd0bf] shrink-0">
                      <img
                        src={siteData.paymentConfig?.qrCodeUrl || 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=500&q=80'}
                        alt="Preview QR Code"
                        className="w-32 h-32 object-cover rounded-lg shadow"
                      />
                    </div>
                    <div className="space-y-2 flex-1 text-xs">
                      <span className="px-2.5 py-1 bg-[#274e23] text-white font-bold rounded-lg text-[10px] uppercase tracking-wider inline-block">
                        Xem Trước Mã QR Đang Hiển Thị
                      </span>
                      <p className="text-[#5c4d43]">
                        Khách hàng sẽ quét mã QR này trong giỏ hàng để chuyển khoản thanh toán trực tiếp.
                      </p>
                      
                      {/* Upload QR File Input */}
                      <div className="pt-1">
                        <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs cursor-pointer shadow transition-all">
                          <Upload className="w-4 h-4" />
                          <span>Tải Ảnh QR Code Mới Từ Máy</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  updatePaymentConfig({ qrCodeUrl: reader.result as string });
                                  showNotification('Đã tải lên ảnh mã QR Code thành công!');
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                      Đường Dẫn URL Ảnh QR Code (Hoặc Dán URL Trực Tiếp)
                    </label>
                    <input
                      type="text"
                      value={siteData.paymentConfig?.qrCodeUrl || ''}
                      onChange={(e) => updatePaymentConfig({ qrCodeUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-white font-mono"
                    />
                  </div>

                  {/* Preset Sample QR Selectors */}
                  <div className="space-y-1.5 pt-2 border-t border-[#e2d5c3]">
                    <label className="text-xs font-semibold text-[#5c4d43] block">
                      Chọn Mẫu Mã QR Chuẩn Ngân Hàng Nhanh:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          updatePaymentConfig({
                            qrCodeUrl: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=500&q=80',
                          });
                          showNotification('Đã chọn mẫu QR Code Chuẩn VietQR!');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#274e23] text-white font-bold text-[11px] cursor-pointer hover:bg-[#1f381c]"
                      >
                        Mẫu 1: VietQR Standard
                      </button>
                      <button
                        onClick={() => {
                          updatePaymentConfig({
                            qrCodeUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80',
                          });
                          showNotification('Đã chọn mẫu QR MBBank BiO Station!');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-amber-600 text-white font-bold text-[11px] cursor-pointer hover:bg-amber-700"
                      >
                        Mẫu 2: MBBank Official
                      </button>
                      <button
                        onClick={() => {
                          updatePaymentConfig({
                            qrCodeUrl: 'https://images.unsplash.com/photo-1595079672139-cee25694c965?auto=format&fit=crop&w=500&q=80',
                          });
                          showNotification('Đã chọn mẫu QR Vietcombank Business!');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 text-white font-bold text-[11px] cursor-pointer hover:bg-slate-900"
                      >
                        Mẫu 3: Vietcombank QR
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. SHIPPING RATES & VAT CONFIG */}
              <div className="bg-[#f0e6d8] p-5 rounded-2xl border border-[#dcd0bf] space-y-4">
                <h4 className="font-bold text-sm text-[#274e23] font-serif flex items-center gap-2 border-b border-[#dcd0bf] pb-2">
                  <Truck className="w-4 h-4 text-amber-600" />
                  3. Cấu Hình Thuế VAT & Bảng Phí Vận Chuyển Giao Hàng
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                      Mức Thuế Giá Trị Gia Tăng (VAT %)
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        min="0"
                        max="30"
                        value={siteData.paymentConfig?.vatRatePercent ?? 8}
                        onChange={(e) => updatePaymentConfig({ vatRatePercent: Number(e.target.value) })}
                        className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-white font-bold text-[#274e23]"
                      />
                      <span className="text-xs font-bold text-[#274e23]">%</span>
                    </div>
                    <span className="text-[10px] text-[#7a6858]">Tự động tính thuế VAT trên sản phẩm</span>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                      Cước Ship Nội Thành (VNĐ)
                    </label>
                    <input
                      type="number"
                      value={siteData.paymentConfig?.innerCityShippingFee ?? 20000}
                      onChange={(e) => updatePaymentConfig({ innerCityShippingFee: Number(e.target.value) })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-white font-bold text-amber-800"
                    />
                    <span className="text-[10px] text-[#7a6858]">Áp dụng cho khu vực TP.HCM / Hà Nội</span>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                      Cước Ship Ngoại Tỉnh (VNĐ)
                    </label>
                    <input
                      type="number"
                      value={siteData.paymentConfig?.outerCityShippingFee ?? 35000}
                      onChange={(e) => updatePaymentConfig({ outerCityShippingFee: Number(e.target.value) })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-white font-bold text-amber-800"
                    />
                    <span className="text-[10px] text-[#7a6858]">Cước tính theo bảng giá vận chuyển hiện hành</span>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                      Hạn Mức Miễn Phí Ship Nội Thành (VNĐ)
                    </label>
                    <input
                      type="number"
                      value={siteData.paymentConfig?.freeShippingThreshold ?? 300000}
                      onChange={(e) => updatePaymentConfig({ freeShippingThreshold: Number(e.target.value) })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-white font-bold text-[#274e23]"
                    />
                    <span className="text-[10px] text-[#7a6858]">Miễn phí vận chuyển nếu đơn đạt hạn mức này</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => handleSaveAndRefresh('Đã lưu toàn bộ cấu hình thanh toán & vận chuyển!')}
                  className="px-6 py-3 bg-[#274e23] hover:bg-[#1f381c] text-white font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <Save className="w-4 h-4 text-amber-300" /> Lưu Cấu Hình Thanh Toán & Làm Mới Trang
                </button>
              </div>

            </div>
          </div>
        )}

        {/* TAB: EXPERIENCE MEAL CONFIG & DISH MENU CRUD */}
        {activeTab === 'experience_meal' && (
          <div className="bg-white p-6 rounded-3xl border border-[#e2d5c3] shadow-sm space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f0e6d8] pb-4">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  Quản Lý Dịch Vụ Mâm Cơm Trải Nghiệm Cá Nhân Hóa
                </span>
                <h3 className="text-xl font-bold font-serif text-[#274e23] flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-amber-600" />
                  Cấu Hình Mâm Cơm 50k & Danh Sách Món Ăn Tự Chọn
                </h3>
              </div>

              <button
                onClick={() => handleSaveAndRefresh('Đã lưu cấu hình bữa ăn trải nghiệm!')}
                className="px-5 py-2.5 bg-[#274e23] hover:bg-[#1e3e1a] text-white font-bold text-xs rounded-xl shadow cursor-pointer flex items-center gap-2"
              >
                <Save className="w-4 h-4 text-amber-300" /> Lưu Cấu Hình & Làm Mới Trang
              </button>
            </div>

            {/* General Settings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#fbf8f3] p-5 rounded-2xl border border-[#e2d5c3]">
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-[#274e23] font-serif border-b border-[#e2d5c3] pb-2">
                  1. Tiêu Đề Banner & Giá Gói Cơ Bản
                </h4>

                <div>
                  <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                    Tiêu Đề Banner Trải Nghiệm
                  </label>
                  <input
                    type="text"
                    value={siteData.experienceMealConfig?.bannerTitle || ''}
                    onChange={(e) => updateExperienceMealConfig({ bannerTitle: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-white font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                    Tiêu Đề Phụ (Subtitle)
                  </label>
                  <input
                    type="text"
                    value={siteData.experienceMealConfig?.bannerSubtitle || ''}
                    onChange={(e) => updateExperienceMealConfig({ bannerSubtitle: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                    Mô Tả Khung Dịch Vụ
                  </label>
                  <textarea
                    rows={2}
                    value={siteData.experienceMealConfig?.bannerDescription || ''}
                    onChange={(e) => updateExperienceMealConfig({ bannerDescription: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-white"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-sm text-[#274e23] font-serif border-b border-[#e2d5c3] pb-2">
                  2. Đơn Giá & Quy Định Đặt Cọc 50%
                </h4>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                      Giá Khách (VNĐ/Người)
                    </label>
                    <input
                      type="number"
                      value={siteData.experienceMealConfig?.pricePerPerson ?? 50000}
                      onChange={(e) => updateExperienceMealConfig({ pricePerPerson: Number(e.target.value) })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-white font-bold text-[#274e23]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                      Mức Cọc (%)
                    </label>
                    <input
                      type="number"
                      value={siteData.experienceMealConfig?.depositPercent ?? 50}
                      onChange={(e) => updateExperienceMealConfig({ depositPercent: Number(e.target.value) })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-white font-bold text-amber-700"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                      Suất Món / Người
                    </label>
                    <input
                      type="number"
                      value={siteData.experienceMealConfig?.includedDishesPerPerson ?? 2}
                      onChange={(e) => updateExperienceMealConfig({ includedDishesPerPerson: Number(e.target.value) })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-white font-bold text-[#274e23]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                    Nội Dung Lưu Ý Đặt Cọc & Giữ Chỗ Mâm Cơm
                  </label>
                  <textarea
                    rows={3}
                    value={siteData.experienceMealConfig?.depositNoticeText || ''}
                    onChange={(e) => updateExperienceMealConfig({ depositNoticeText: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-white text-[#5c4d43]"
                  />
                </div>
              </div>
            </div>

            {/* Dish Menu List Management */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#f0e6d8] pb-3">
                <div>
                  <h4 className="font-bold text-base text-[#274e23] font-serif">
                    3. Danh Sách Món Ăn Trong Thực Đơn ({siteData.experienceMealConfig?.dishes?.length || 0} Món)
                  </h4>
                  <p className="text-xs text-[#7a6858]">
                    Thêm, sửa tên, xuất xứ, hương vị, ảnh minh họa và phụ thu thêm suất cho từng món ăn.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsAddingDish(true);
                    setEditingDish({
                      id: `dish-${Date.now()}`,
                      name: '',
                      category: 'Món Mặn',
                      origin: '',
                      flavor: '',
                      extraPrice: 20000,
                      image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=400&q=80',
                    });
                  }}
                  className="px-4 py-2 bg-[#274e23] hover:bg-[#1e3e1a] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-amber-300" /> Thêm Món Ăn Mới
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {(siteData.experienceMealConfig?.dishes || []).map((dish) => (
                  <div
                    key={dish.id}
                    className="bg-white p-3.5 rounded-2xl border border-[#e2d5c3] shadow-sm flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-[#f0e6d8]">
                        <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 bg-[#274e23] text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                          {dish.category}
                        </span>
                      </div>

                      <div>
                        <h5 className="font-bold text-xs text-[#274e23] line-clamp-1">{dish.name}</h5>
                        <p className="text-[10px] text-[#7a6858] line-clamp-2 mt-0.5">{dish.flavor}</p>
                        <div className="text-[11px] font-bold text-amber-700 mt-1">
                          Phụ thu thêm phần: +{dish.extraPrice.toLocaleString('vi-VN')}đ
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-[#f0e6d8]">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingDish(false);
                          setEditingDish(dish);
                        }}
                        className="flex-1 py-1.5 bg-[#f0e6d8] hover:bg-[#e4d6c2] text-[#274e23] font-bold text-xs rounded-lg flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" /> Sửa
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Xóa món "${dish.name}" khỏi thực đơn?`)) {
                            const updatedDishes = (siteData.experienceMealConfig?.dishes || []).filter(
                              (d) => d.id !== dish.id
                            );
                            updateExperienceMealConfig({ dishes: updatedDishes });
                            showNotification('Đã xóa món ăn khỏi thực đơn!');
                          }
                        }}
                        className="p-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BUSINESS MODEL 7 PILLARS */}
        {activeTab === 'business' && (
          <div className="bg-white p-6 rounded-3xl border border-[#e2d5c3] shadow-sm space-y-8">
            {/* Header & Mission Section */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f0e6d8] pb-4">
                <div>
                  <h3 className="text-lg font-bold font-serif text-[#274e23] flex items-center gap-2">
                    <Store className="w-5 h-5 text-amber-600" />
                    Sứ Mệnh & Bảy Trụ Cột Mô Hình Kinh Doanh ({siteData.businessBlocks?.length || 0})
                  </h3>
                  <p className="text-xs text-[#7a6858] mt-1">
                    Quản lý các trụ cột chiến lược của BiO Station. Bạn có thể chỉnh sửa, thêm mới, xóa hoặc thay đổi nội dung từng mục.
                  </p>
                </div>
                <button
                  onClick={handleAddBlock}
                  className="px-4 py-2 bg-[#274e23] hover:bg-[#1f381c] text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 cursor-pointer transition-all shrink-0"
                >
                  <Plus className="w-4 h-4 text-amber-300" /> Thêm Trụ Cột Mới
                </button>
              </div>

              {/* Mission Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#fbf8f3] p-4 rounded-2xl border border-[#e2d5c3]">
                <div>
                  <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                    Khẩu Hiệu Sứ Mệnh (Mission Quote)
                  </label>
                  <input
                    type="text"
                    value={siteData.businessMission?.quote || ''}
                    onChange={(e) => updateBusinessMission({ quote: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-white focus:ring-2 focus:ring-[#274e23] outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#5c4d43] block mb-1">
                    Mô Tả Chi Tiết Sứ Mệnh
                  </label>
                  <textarea
                    rows={2}
                    value={siteData.businessMission?.description || ''}
                    onChange={(e) => updateBusinessMission({ description: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-white focus:ring-2 focus:ring-[#274e23] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 7 Pillars (Business Blocks) Cards List */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-md font-bold font-serif text-[#274e23] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-600" />
                  Danh Sách Các Trụ Cột Chiến Lược
                </h4>
                <span className="text-xs font-semibold px-3 py-1 bg-[#274e23]/10 text-[#274e23] rounded-full">
                  Tổng số: {siteData.businessBlocks?.length || 0} Trụ Cột
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {(siteData.businessBlocks || []).map((block, bIndex) => (
                  <div
                    key={block.id || bIndex}
                    className="bg-[#fbf8f3] p-5 rounded-2xl border border-[#e2d5c3] shadow-sm space-y-4 relative flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      {/* Card Top Header & Order Controls */}
                      <div className="flex items-center justify-between gap-2 border-b border-[#e2d5c3] pb-3">
                        <div className="flex items-center gap-2 flex-1">
                          <span className="px-2.5 py-1 bg-[#274e23] text-white font-bold text-xs rounded-lg shrink-0">
                            #{block.number || bIndex + 1}
                          </span>
                          <input
                            type="text"
                            value={block.title || ''}
                            onChange={(e) => handleUpdateBlock(block.id, { title: e.target.value })}
                            className="font-bold text-xs text-[#274e23] p-1.5 rounded-lg border border-[#dcd0bf] bg-white w-full focus:ring-2 focus:ring-[#274e23] outline-none font-serif"
                            placeholder="Tên trụ cột..."
                          />
                        </div>

                        {/* Order & Delete Actions */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => handleMoveBlock(bIndex, 'up')}
                            disabled={bIndex === 0}
                            title="Di chuyển lên"
                            className="p-1.5 bg-white hover:bg-stone-200 disabled:opacity-30 rounded-lg border border-[#dcd0bf] text-stone-700 cursor-pointer"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleMoveBlock(bIndex, 'down')}
                            disabled={bIndex === ((siteData.businessBlocks?.length || 0) - 1)}
                            title="Di chuyển xuống"
                            className="p-1.5 bg-white hover:bg-stone-200 disabled:opacity-30 rounded-lg border border-[#dcd0bf] text-stone-700 cursor-pointer"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteBlock(block.id, block.title)}
                            title="Xóa trụ cột"
                            className="p-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg cursor-pointer transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Icon & Highlight Section */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="text-[11px] font-semibold text-[#7a6858] block mb-1">
                            Biểu tượng Icon
                          </label>
                          <select
                            value={block.icon || 'Store'}
                            onChange={(e) => handleUpdateBlock(block.id, { icon: e.target.value })}
                            className="w-full text-xs p-2 rounded-xl border border-[#dcd0bf] bg-white focus:ring-2 focus:ring-[#274e23]"
                          >
                            <option value="Store">🏪 Store (Cửa hàng / Trạm)</option>
                            <option value="Wheat">🌾 Wheat (Nông sản / Gạo)</option>
                            <option value="Users">👥 Users (Khách hàng / Cộng đồng)</option>
                            <option value="TrendingUp">📈 TrendingUp (Doanh thu)</option>
                            <option value="PieChart">📊 PieChart (Chi phí / Ngân sách)</option>
                            <option value="ShoppingBag">🛍️ ShoppingBag (Kênh bán hàng)</option>
                            <option value="Megaphone">📢 Megaphone (Truyền thông)</option>
                            <option value="ShieldCheck">🛡️ ShieldCheck (Kiểm định)</option>
                            <option value="Sprout">🌱 Sprout (Sinh thái)</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-[11px] font-semibold text-[#7a6858] block mb-1">
                            Điểm Nổi Bật / Ưu Thế (Highlight)
                          </label>
                          <input
                            type="text"
                            value={block.highlight || ''}
                            onChange={(e) => handleUpdateBlock(block.id, { highlight: e.target.value })}
                            className="w-full text-xs p-2 rounded-xl border border-[#dcd0bf] bg-white focus:ring-2 focus:ring-[#274e23]"
                            placeholder="Ví dụ: Điểm trải nghiệm & chạm trực tiếp..."
                          />
                        </div>
                      </div>

                      {/* Bullet Items List */}
                      <div className="space-y-2 pt-2 border-t border-[#f0e6d8]">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-[#5c4d43] uppercase tracking-wider">
                            Các mục chi tiết ({block.items?.length || 0})
                          </span>
                          <button
                            onClick={() => handleAddBlockItem(block.id)}
                            className="text-[11px] text-[#274e23] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" /> Thêm dòng
                          </button>
                        </div>

                        <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                          {(block.items || []).map((item, iIdx) => (
                            <div key={iIdx} className="flex items-center gap-1.5">
                              <span className="w-4 text-center text-xs text-[#7a6858] font-semibold">
                                •
                              </span>
                              <input
                                type="text"
                                value={item}
                                onChange={(e) => handleUpdateBlockItem(block.id, iIdx, e.target.value)}
                                className="flex-1 text-xs p-1.5 rounded-lg border border-[#dcd0bf] bg-white focus:ring-2 focus:ring-[#274e23] outline-none"
                              />
                              <button
                                onClick={() => handleMoveBlockItem(block.id, iIdx, 'up')}
                                disabled={iIdx === 0}
                                className="p-1 hover:bg-stone-200 disabled:opacity-20 text-stone-600 rounded cursor-pointer"
                              >
                                <ArrowUp className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleMoveBlockItem(block.id, iIdx, 'down')}
                                disabled={iIdx === ((block.items?.length || 0) - 1)}
                                className="p-1 hover:bg-stone-200 disabled:opacity-20 text-stone-600 rounded cursor-pointer"
                              >
                                <ArrowDown className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleDeleteBlockItem(block.id, iIdx)}
                                className="p-1 text-red-600 hover:bg-red-100 rounded cursor-pointer"
                                title="Xóa dòng"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Save Button */}
            <div className="pt-4 border-t border-[#f0e6d8] flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-[#7a6858]">
                💡 <strong>Lưu ý:</strong> Bấm nút bên phải để lưu toàn bộ các thay đổi về Sứ mệnh và Bảy trụ cột mô hình kinh doanh. Mọi thay đổi sẽ tự động làm mới và hiển thị trên toàn hệ thống.
              </p>
              <button
                onClick={() => handleSaveAndRefresh('Đã lưu cấu hình sứ mệnh & 7 trụ cột mô hình kinh doanh!')}
                className="w-full sm:w-auto px-6 py-3 bg-[#274e23] hover:bg-[#1f381c] text-white font-bold text-xs rounded-xl shadow-lg cursor-pointer flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shrink-0"
              >
                <Save className="w-4 h-4 text-amber-300" /> Lưu 7 Trụ Cột Mô Hình & Làm Mới Trang
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: PRODUCTS */}
        {activeTab === 'products' && (
          <div className="bg-white p-6 rounded-3xl border border-[#e2d5c3] shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-[#f0e6d8] pb-4">
              <div>
                <h3 className="text-lg font-bold font-serif text-[#274e23] flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber-600" />
                  Danh Sách Nông Sản & Sản Phẩm ({siteData.products.length})
                </h3>
              </div>
              <button
                onClick={() => {
                  const newProd: Product = {
                    id: `prod-${Date.now()}`,
                    name: 'Sản Phẩm Nông Sản Mới',
                    subtitle: 'Mô tả ngắn gọn sản phẩm',
                    category: 'Gạo & Nông Sản',
                    price: 150000,
                    originalPrice: 180000,
                    rating: 5,
                    reviewCount: 12,
                    badge: 'Mới Ra Mắt',
                    image: SAMPLE_IMAGES[0].url,
                    description: 'Mô tả chi tiết nguồn gốc và công dụng nông sản.',
                    keyBenefits: ['100% Hữu Cơ', 'An toàn tuyệt đối'],
                    origin: 'Đồng Bằng Sông Cửu Long',
                    certification: 'Tiêu chuẩn BMQ Qualified',
                    bmqNote: 'Kiểm định 100% sạch.',
                  };
                  setEditingProduct(newProd);
                  setIsAddingProduct(true);
                }}
                className="px-4 py-2 bg-[#274e23] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow"
              >
                <Plus className="w-4 h-4" /> Thêm Sản Phẩm Mới
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {siteData.products.map((p) => (
                <div key={p.id} className="p-4 rounded-2xl border border-[#e2d5c3] bg-[#fbf8f3] space-y-2 flex flex-col justify-between relative">
                  <div className="flex gap-3">
                    <img src={p.image} alt={p.name} className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#e2d5c3]" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="font-bold text-sm text-[#274e23] font-serif truncate">{p.name}</h4>
                        {p.isMainSaleProduct && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 flex items-center gap-1 shrink-0">
                            <Star className="w-3 h-3 fill-current" /> Bán Chính
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#7a6858]">{p.category}</p>
                      <p className="text-xs font-bold text-amber-700 mt-1">{p.price.toLocaleString('vi-VN')} đ</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-[#f0e6d8]">
                    <button
                      onClick={() => {
                        setEditingProduct(p);
                        setIsAddingProduct(false);
                      }}
                      className="px-3 py-1.5 bg-[#274e23] text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-amber-300" /> Chỉnh Sửa
                    </button>
                    <button
                      onClick={() => {
                        toggleMainSaleProduct(p.id);
                        showNotification(p.isMainSaleProduct ? `Đã bỏ SP bán chính: ${p.name}` : `Đã chọn làm SP bán chính: ${p.name}`);
                      }}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center gap-1 ${
                        p.isMainSaleProduct
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-stone-200 text-stone-700 hover:bg-amber-200'
                      }`}
                      title="Đặt/Bỏ đặt làm Sản phẩm bán lẻ chính ở Trang chủ"
                    >
                      <Star className={`w-3.5 h-3.5 ${p.isMainSaleProduct ? 'fill-amber-600 text-amber-600' : 'text-stone-500'}`} />
                      <span>{p.isMainSaleProduct ? 'Nổi Bật' : 'Đặt Chính'}</span>
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Xóa sản phẩm "${p.name}"?`)) {
                          setProducts((prev) => prev.filter((item) => item.id !== p.id));
                          showNotification('Đã xóa sản phẩm!');
                        }
                      }}
                      className="px-2.5 py-1.5 bg-red-100 hover:bg-red-200 text-red-800 text-xs font-bold rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: STATIONS */}
        {activeTab === 'stations' && (
          <div className="bg-white p-6 rounded-3xl border border-[#e2d5c3] shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-[#f0e6d8] pb-4">
              <div>
                <h3 className="text-lg font-bold font-serif text-[#274e23] flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-600" />
                  Mạng Lưới Điểm Trạm BiO Station ({siteData.stations.length})
                </h3>
              </div>
              <button
                onClick={() => {
                  const newStation: StationItem = {
                    id: `st-${Date.now()}`,
                    name: 'BiO Station Mới - Quận X',
                    type: 'community',
                    typeName: 'Station Cộng Đồng',
                    address: 'Số 123 Đường Mới, TP. HCM',
                    phone: '0909 888 999',
                    hours: '07:30 - 20:00',
                    status: 'Đang vận hành',
                    features: ['Giao tận nhà', 'Gạo đong trực tiếp'],
                    image: SAMPLE_IMAGES[3].url,
                  };
                  setEditingStation(newStation);
                  setIsAddingStation(true);
                }}
                className="px-4 py-2 bg-[#274e23] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow"
              >
                <Plus className="w-4 h-4" /> Thêm Điểm Trạm Mới
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {siteData.stations.map((st) => (
                <div key={st.id} className="p-4 rounded-2xl border border-[#e2d5c3] bg-[#fbf8f3] space-y-2 flex justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#274e23] text-white uppercase">{st.typeName}</span>
                    <h4 className="font-bold text-sm text-[#274e23] font-serif pt-1">{st.name}</h4>
                    <p className="text-xs text-[#5c4d43]">{st.address}</p>
                    <p className="text-xs text-[#7a6858]">Hotline: {st.phone}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => {
                        setEditingStation(st);
                        setIsAddingStation(false);
                      }}
                      className="px-3 py-1.5 bg-[#274e23] text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-amber-300" /> Sửa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: RECIPES (DEEP EDITOR) */}
        {activeTab === 'recipes' && (
          <div className="bg-white p-6 rounded-3xl border border-[#e2d5c3] shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-[#f0e6d8] pb-4">
              <div>
                <h3 className="text-lg font-bold font-serif text-[#274e23] flex items-center gap-2">
                  <ChefHat className="w-5 h-5 text-amber-600" />
                  Quản Lý Chi Tiết Bếp Ăn Lành & Công Thức Món Ăn ({siteData.recipes.length})
                </h3>
              </div>
              <button
                onClick={() => {
                  const newRecipe: Recipe = {
                    id: `rec-${Date.now()}`,
                    title: 'Cơm Chiên Hữu Cơ Bách Mộc',
                    category: 'Bữa Ăn Lành',
                    prepTime: '10 phút',
                    cookTime: '15 phút',
                    servings: 3,
                    calories: 320,
                    organicPercent: 100,
                    image: SAMPLE_IMAGES[4].url,
                    description: 'Món ăn thơm ngon, thanh đạm từ gạo ST25 Bách Mộc và rau củ tươi.',
                    ingredients: ['2 chén cơm nguội Gạo Bách Mộc ST25', '1/2 củ cà rốt thái hạt lựu', '100g hạt sen tươi', '1 thìa dầu hướng dương BMQ'],
                    instructions: [
                      'Bước 1: Vo gạo Bách Mộc và nấu chín, để nguội.',
                      'Bước 2: Luộc sơ hạt sen và cà rốt.',
                      'Bước 3: Phi thơm hành tăm với dầu hướng dương BMQ.',
                      'Bước 4: Cho cơm và rau củ vào đảo đều trên lửa vừa trong 5 phút.',
                    ],
                    bmqTip: 'Mẹo: Dùng cơm nguội nấu từ gạo hữu cơ Bách Mộc sẽ giúp hạt cơm dẻo ngon không dính.',
                  };
                  setEditingRecipe(newRecipe);
                  setIsAddingRecipe(true);
                }}
                className="px-4 py-2 bg-[#274e23] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow"
              >
                <Plus className="w-4 h-4" /> Thêm Công Thức Nấu Ăn
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {siteData.recipes.map((r) => (
                <div key={r.id} className="p-4 rounded-2xl border border-[#e2d5c3] bg-[#fbf8f3] space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="relative h-36 rounded-xl overflow-hidden bg-[#e2d5c3] mb-3">
                      <img src={r.image} alt={r.title} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 bg-[#274e23] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                        {r.category}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-[#274e23] font-serif">{r.title}</h4>
                    <p className="text-xs text-[#5c4d43] line-clamp-2 mt-1">{r.description}</p>
                    <div className="flex items-center gap-2 text-[11px] text-[#7a6858] pt-2">
                      <span>• {r.prepTime}</span>
                      <span>• {r.servings} người</span>
                      <span>• {r.instructions.length} bước nấu</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-[#f0e6d8]">
                    <button
                      onClick={() => {
                        setEditingRecipe(r);
                        setIsAddingRecipe(false);
                      }}
                      className="w-full py-2 bg-[#274e23] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-amber-300" /> Sửa Chi Tiết Các Bước Nấu
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Xóa công thức "${r.title}"?`)) {
                          setRecipes((prev) => prev.filter((item) => item.id !== r.id));
                          showNotification('Đã xóa công thức!');
                        }
                      }}
                      className="px-2.5 py-2 bg-red-100 hover:bg-red-200 text-red-800 text-xs font-bold rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: ARTICLES (DEEP EDITOR) */}
        {activeTab === 'articles' && (
          <div className="bg-white p-6 rounded-3xl border border-[#e2d5c3] shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-[#f0e6d8] pb-4">
              <div>
                <h3 className="text-lg font-bold font-serif text-[#274e23] flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-600" />
                  Chỉnh Sửa Bài Viết & Thư Viện Tri Thức ({siteData.articles.length})
                </h3>
              </div>
              <button
                onClick={() => {
                  const newArt: Article = {
                    id: `art-${Date.now()}`,
                    title: 'Lợi Ích Của Lối Sống Thuận Tự Nhiên Bách Mộc',
                    category: 'Sống Xanh & Sức Khỏe',
                    duration: '5 phút đọc',
                    views: '1.2k',
                    date: 'Hôm nay',
                    image: SAMPLE_IMAGES[1].url,
                    summary: 'Sống thuận tự nhiên bắt đầu từ việc lựa chọn nguồn thực phẩm hữu cơ minh bạch.',
                    keyTakeaways: [
                      'Lựa chọn thực phẩm kiểm định BMQ rõ ràng.',
                      'Ăn thực phẩm nguyên bản giàu vi chất.',
                      'Gia nhập điểm trạm cộng đồng địa phương.',
                    ],
                    transcriptSnippet:
                      'Chạm để trở về với mẹ thiên nhiên là chìa khóa bảo vệ sức khỏe và mang lại nguồn năng lượng an lành cho mỗi gia đình.',
                    recommendedProductIds: [siteData.products[0]?.id || 'p-st25'],
                  };
                  setEditingArticle(newArt);
                  setIsAddingArticle(true);
                }}
                className="px-4 py-2 bg-[#274e23] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow"
              >
                <Plus className="w-4 h-4" /> Thêm Bài Viết Mới
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {siteData.articles.map((a) => (
                <div key={a.id} className="p-4 rounded-2xl border border-[#e2d5c3] bg-[#fbf8f3] space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="relative h-36 rounded-xl overflow-hidden bg-[#e2d5c3] mb-3">
                      <img src={a.image} alt={a.title} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 bg-[#274e23] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                        {a.category}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-[#274e23] font-serif leading-snug">{a.title}</h4>
                    <p className="text-xs text-[#5c4d43] line-clamp-2 mt-1">{a.summary}</p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-[#f0e6d8]">
                    <button
                      onClick={() => {
                        setEditingArticle(a);
                        setIsAddingArticle(false);
                      }}
                      className="w-full py-2 bg-[#274e23] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-amber-300" /> Sửa Bài Viết & Ý Chính
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Xóa bài viết "${a.title}"?`)) {
                          setArticles((prev) => prev.filter((item) => item.id !== a.id));
                          showNotification('Đã xóa bài viết!');
                        }
                      }}
                      className="px-2.5 py-2 bg-red-100 hover:bg-red-200 text-red-800 text-xs font-bold rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: SUCCESS STORIES */}
        {activeTab === 'stories' && (
          <div className="bg-white p-6 rounded-3xl border border-[#e2d5c3] shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-[#f0e6d8] pb-4">
              <div>
                <h3 className="text-lg font-bold font-serif text-[#274e23] flex items-center gap-2">
                  <Heart className="w-5 h-5 text-amber-600" />
                  Câu Chuyện Tử Tế & Trải Nghiệm Khách Hàng ({siteData.stories.length})
                </h3>
              </div>
              <button
                onClick={() => {
                  const newStory: SuccessStory = {
                    id: `story-${Date.now()}`,
                    name: 'Gia Đình Anh Minh & Chị Mai',
                    role: 'Khách Hàng BiO Station Thảo Điền',
                    impactMetric: '100% Cơm Hữu Cơ Cho Con',
                    duration: '8 tháng đồng hành',
                    location: 'Thảo Điền, TP. Thủ Đức',
                    quote: 'Từ ngày ăn cơm từ gạo hữu cơ Bách Mộc, bé nhà mình ăn ngon miệng và tiêu hóa rất tốt.',
                    story: 'Câu chuyện trải nghiệm mua gạo tại Station Cộng Đồng.',
                    beforeImage: SAMPLE_IMAGES[0].url,
                    afterImage: SAMPLE_IMAGES[2].url,
                    stationType: 'Station Cộng Đồng',
                    keyStrategy: 'Đăng ký giỏ gạo & rau tuần',
                  };
                  setEditingStory(newStory);
                  setIsAddingStory(true);
                }}
                className="px-4 py-2 bg-[#274e23] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow"
              >
                <Plus className="w-4 h-4" /> Thêm Câu Chuyện
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {siteData.stories.map((s) => (
                <div key={s.id} className="p-4 rounded-2xl border border-[#e2d5c3] bg-[#fbf8f3] space-y-2 flex justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-sm text-[#274e23] font-serif">{s.name}</h4>
                    <p className="text-xs text-[#7a6858]">{s.role} • {s.location}</p>
                    <p className="text-xs italic text-[#5c4d43] mt-1">"{s.quote}"</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingStory(s);
                      setIsAddingStory(false);
                    }}
                    className="px-3 py-1.5 bg-[#274e23] text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer self-start"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-amber-300" /> Sửa
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: BACKUP & IMPORT */}
        {activeTab === 'tools' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-[#e2d5c3] shadow-sm space-y-6">
              <h3 className="text-lg font-bold font-serif text-[#274e23] flex items-center gap-2 border-b border-[#f0e6d8] pb-3">
                <Lock className="w-5 h-5 text-amber-600" />
                Thiết Lập Tài Khoản Đăng Nhập Admin
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-bold text-[#5c4d43] block mb-1 text-xs">Tên Đăng Nhập Mới</label>
                  <input
                    type="text"
                    value={newAdminUser}
                    onChange={(e) => setNewAdminUser(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#dcd0bf] bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#5c4d43] block mb-1 text-xs">Mật Khẩu Mới</label>
                  <input
                    type="text"
                    value={newAdminPass}
                    onChange={(e) => setNewAdminPass(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#dcd0bf] bg-white text-xs"
                  />
                </div>
              </div>
              <button
                onClick={handleUpdateAdminCredentials}
                className="py-2.5 px-6 bg-[#274e23] hover:bg-[#1f381c] text-white font-bold text-xs rounded-xl shadow cursor-pointer flex items-center justify-center gap-2 transition-colors"
              >
                <Save className="w-4 h-4 text-amber-300" /> Cập Nhật Thông Tin Đăng Nhập
              </button>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#e2d5c3] shadow-sm space-y-6">
              <h3 className="text-lg font-bold font-serif text-[#274e23] flex items-center gap-2 border-b border-[#f0e6d8] pb-3">
                <Settings className="w-5 h-5 text-amber-600" />
                Công Cụ Sao Lưu, Khôi Phục & Import File JSON
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl border border-[#e2d5c3] bg-[#fbf8f3] space-y-3">
                  <h4 className="font-bold text-sm text-[#274e23] flex items-center gap-1.5">
                    <Download className="w-4 h-4 text-amber-600" /> Xuất File Backup Toàn Bộ Dữ Liệu
                  </h4>
                  <p className="text-xs text-[#5c4d43]">
                    Tải về file JSON bảo toàn toàn bộ sản phẩm, công thức món ăn, phông chữ, màu sắc và bài viết đã chỉnh sửa.
                  </p>
                  <button
                    onClick={handleExport}
                    className="w-full py-2.5 bg-[#274e23] text-white font-bold text-xs rounded-xl shadow cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4 text-amber-300" /> Tải File Cấu Hình JSON
                  </button>
                </div>

                <div className="p-5 rounded-2xl border border-[#e2d5c3] bg-[#fbf8f3] space-y-3">
                  <h4 className="font-bold text-sm text-[#274e23] flex items-center gap-1.5">
                    <Upload className="w-4 h-4 text-amber-600" /> Nhập File JSON Mới
                  </h4>
                  <p className="text-xs text-[#5c4d43]">
                    Dán nội dung file JSON để cập nhật toàn bộ hệ thống ngay lập tức.
                  </p>
                  <textarea
                    rows={4}
                    placeholder="Dán chuỗi JSON cấu hình vào đây..."
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-white font-mono"
                  />
                  {jsonError && <p className="text-xs text-red-600 font-bold">{jsonError}</p>}
                  <button
                    onClick={handleImport}
                    className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4 text-white" /> Áp Dụng Dữ Liệu Mới
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: EDIT DEEP RECIPE */}
        {editingRecipe && (
          <div className="fixed inset-0 z-50 bg-[#2d241e]/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white border border-[#e2d5c3] rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto text-xs">
              <button
                onClick={() => setEditingRecipe(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#f0e6d8] hover:bg-[#e2d5c3]"
              >
                <X className="w-5 h-5 text-[#2d241e]" />
              </button>

              <div className="border-b border-[#f0e6d8] pb-3">
                <h3 className="text-xl font-bold font-serif text-[#274e23] flex items-center gap-2">
                  <ChefHat className="w-5 h-5 text-amber-600" />
                  {isAddingRecipe ? 'Thêm Công Thức Bếp Ăn Lành Mới' : 'Chỉnh Sửa Chi Tiết Công Thức Món Ăn'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#5c4d43] block mb-1">Tên Món Ăn *</label>
                  <input
                    type="text"
                    value={editingRecipe.title}
                    onChange={(e) => setEditingRecipe({ ...editingRecipe, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#dcd0bf]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#5c4d43] block mb-1">Danh Mục Món Ăn</label>
                  <select
                    value={editingRecipe.category}
                    onChange={(e) => setEditingRecipe({ ...editingRecipe, category: e.target.value as Recipe['category'] })}
                    className="w-full p-2.5 rounded-xl border border-[#dcd0bf] bg-white"
                  >
                    <option value="Bữa Ăn Lành">Bữa Ăn Lành</option>
                    <option value="Món Rau Củ">Món Rau Củ</option>
                    <option value="Món Chay Nutritive">Món Chay Nutritive</option>
                    <option value="Thức Uống Thanh Lọc">Thức Uống Thanh Lọc</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="font-bold text-[#5c4d43] block mb-1">Thời Gian Sơ Chế</label>
                  <input
                    type="text"
                    value={editingRecipe.prepTime}
                    onChange={(e) => setEditingRecipe({ ...editingRecipe, prepTime: e.target.value })}
                    className="w-full p-2 rounded-xl border border-[#dcd0bf]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#5c4d43] block mb-1">Thời Gian Nấu</label>
                  <input
                    type="text"
                    value={editingRecipe.cookTime}
                    onChange={(e) => setEditingRecipe({ ...editingRecipe, cookTime: e.target.value })}
                    className="w-full p-2 rounded-xl border border-[#dcd0bf]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#5c4d43] block mb-1">Khẩu Phần (Người)</label>
                  <input
                    type="number"
                    value={editingRecipe.servings}
                    onChange={(e) => setEditingRecipe({ ...editingRecipe, servings: Number(e.target.value) })}
                    className="w-full p-2 rounded-xl border border-[#dcd0bf]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#5c4d43] block mb-1">Năng Lượng (kcal)</label>
                  <input
                    type="number"
                    value={editingRecipe.calories}
                    onChange={(e) => setEditingRecipe({ ...editingRecipe, calories: Number(e.target.value) })}
                    className="w-full p-2 rounded-xl border border-[#dcd0bf]"
                  />
                </div>
              </div>

              {/* Image Input & Crop Assistant */}
              <div className="space-y-2">
                <label className="font-bold text-[#5c4d43] block">Hình Ảnh Món Ăn (URL + Chọn Mẫu)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingRecipe.image}
                    onChange={(e) => setEditingRecipe({ ...editingRecipe, image: formatImageUrl(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-[#dcd0bf]"
                  />
                </div>
                {/* Sample Images Quick Pick */}
                <div className="flex items-center gap-2 overflow-x-auto py-1">
                  <span className="text-[10px] text-[#7a6858] font-bold shrink-0">Ảnh Mẫu Lành:</span>
                  {SAMPLE_IMAGES.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setEditingRecipe({ ...editingRecipe, image: img.url })}
                      className="px-2 py-1 bg-[#f4ebe0] hover:bg-[#e2d5c3] rounded-lg text-[10px] font-bold text-[#274e23] shrink-0"
                    >
                      {img.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Line-by-Line Ingredients Editor */}
              <div className="space-y-2 border-t border-[#f0e6d8] pt-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-[#274e23] uppercase tracking-wider text-xs">
                    Danh Sách Nguyên Liệu ({editingRecipe.ingredients.length})
                  </label>
                  <button
                    type="button"
                    onClick={() => setEditingRecipe({ ...editingRecipe, ingredients: [...editingRecipe.ingredients, 'Nguyên liệu mới'] })}
                    className="px-2.5 py-1 bg-[#274e23] text-white font-bold rounded-lg text-[11px] flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Thêm Nguyên Liệu
                  </button>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {editingRecipe.ingredients.map((ing, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-5 font-bold text-[#274e23] text-center">{idx + 1}.</span>
                      <input
                        type="text"
                        value={ing}
                        onChange={(e) => {
                          const updated = [...editingRecipe.ingredients];
                          updated[idx] = e.target.value;
                          setEditingRecipe({ ...editingRecipe, ingredients: updated });
                        }}
                        className="w-full p-2 rounded-xl border border-[#dcd0bf]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = editingRecipe.ingredients.filter((_, i) => i !== idx);
                          setEditingRecipe({ ...editingRecipe, ingredients: updated });
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Instructions Editor */}
              <div className="space-y-2 border-t border-[#f0e6d8] pt-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-[#274e23] uppercase tracking-wider text-xs">
                    Các Bước Hướng Dẫn Thực Hiện ({editingRecipe.instructions.length} bước)
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingRecipe({
                        ...editingRecipe,
                        instructions: [...editingRecipe.instructions, `Bước ${editingRecipe.instructions.length + 1}: Thực hiện công đoạn tiếp theo.`],
                      })
                    }
                    className="px-2.5 py-1 bg-[#274e23] text-white font-bold rounded-lg text-[11px] flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Thêm Bước
                  </button>
                </div>

                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {editingRecipe.instructions.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-[#fbf8f3] p-2.5 rounded-xl border border-[#e2d5c3]">
                      <span className="font-bold text-[#274e23] shrink-0 mt-2">Bước {idx + 1}:</span>
                      <textarea
                        rows={2}
                        value={step}
                        onChange={(e) => {
                          const updated = [...editingRecipe.instructions];
                          updated[idx] = e.target.value;
                          setEditingRecipe({ ...editingRecipe, instructions: updated });
                        }}
                        className="w-full p-2 rounded-xl border border-[#dcd0bf] bg-white text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = editingRecipe.instructions.filter((_, i) => i !== idx);
                          setEditingRecipe({ ...editingRecipe, instructions: updated });
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer shrink-0 mt-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-[#5c4d43] block mb-1">Mẹo Lành Bách Mộc (BMQ Tip)</label>
                <input
                  type="text"
                  value={editingRecipe.bmqTip}
                  onChange={(e) => setEditingRecipe({ ...editingRecipe, bmqTip: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#dcd0bf]"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (isAddingRecipe) {
                      setRecipes((prev) => [editingRecipe, ...prev]);
                      showNotification('Đã thêm công thức nấu ăn mới thành công!');
                    } else {
                      setRecipes((prev) => prev.map((r) => (r.id === editingRecipe.id ? editingRecipe : r)));
                      showNotification('Đã lưu chi tiết công thức nấu ăn!');
                    }
                    setEditingRecipe(null);
                  }}
                  className="w-full py-3 bg-[#274e23] hover:bg-[#1f381c] text-white font-bold text-xs rounded-xl shadow cursor-pointer flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4 text-amber-300" /> Lưu Toàn Bộ Công Thức
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: EDIT DEEP ARTICLE */}
        {editingArticle && (
          <div className="fixed inset-0 z-50 bg-[#2d241e]/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white border border-[#e2d5c3] rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto text-xs">
              <button
                onClick={() => setEditingArticle(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#f0e6d8] hover:bg-[#e2d5c3]"
              >
                <X className="w-5 h-5 text-[#2d241e]" />
              </button>

              <div className="border-b border-[#f0e6d8] pb-3">
                <h3 className="text-xl font-bold font-serif text-[#274e23] flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-600" />
                  {isAddingArticle ? 'Thêm Bài Viết Mới Trong Thư Viện' : 'Chỉnh Sửa Chi Tiết Bài Viết & Tri Thức'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#5c4d43] block mb-1">Tiêu Đề Bài Viết *</label>
                  <input
                    type="text"
                    value={editingArticle.title}
                    onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#dcd0bf]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#5c4d43] block mb-1">Danh Mục Thư Viện</label>
                  <select
                    value={editingArticle.category}
                    onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value as Article['category'] })}
                    className="w-full p-2.5 rounded-xl border border-[#dcd0bf] bg-white"
                  >
                    <option value="Trồng Cây Thuận Tự Nhiên">Trồng Cây Thuận Tự Nhiên</option>
                    <option value="Mô Hình BiO Station">Mô Hình BiO Station</option>
                    <option value="Tiêu Chuẩn BMQ">Tiêu Chuẩn BMQ</option>
                    <option value="Sống Xanh & Sức Khỏe">Sống Xanh & Sức Khỏe</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-[#5c4d43] block mb-1">Thời Gian Đọc</label>
                  <input
                    type="text"
                    value={editingArticle.duration}
                    onChange={(e) => setEditingArticle({ ...editingArticle, duration: e.target.value })}
                    className="w-full p-2 rounded-xl border border-[#dcd0bf]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#5c4d43] block mb-1">Lượt Xem</label>
                  <input
                    type="text"
                    value={editingArticle.views}
                    onChange={(e) => setEditingArticle({ ...editingArticle, views: e.target.value })}
                    className="w-full p-2 rounded-xl border border-[#dcd0bf]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#5c4d43] block mb-1">Ngày Đăng</label>
                  <input
                    type="text"
                    value={editingArticle.date}
                    onChange={(e) => setEditingArticle({ ...editingArticle, date: e.target.value })}
                    className="w-full p-2 rounded-xl border border-[#dcd0bf]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#5c4d43] block mb-1">Mô Tả Tóm Tắt Bài Viết</label>
                <textarea
                  rows={2}
                  value={editingArticle.summary}
                  onChange={(e) => setEditingArticle({ ...editingArticle, summary: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#dcd0bf]"
                />
              </div>

              {/* Cover Image Input */}
              <div className="space-y-2">
                <label className="font-bold text-[#5c4d43] block">Ảnh Đao / Bìa Bài Viết (URL)</label>
                <input
                  type="text"
                  value={editingArticle.image}
                  onChange={(e) => setEditingArticle({ ...editingArticle, image: formatImageUrl(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border border-[#dcd0bf]"
                />
              </div>

              {/* Key Takeaways Editor */}
              <div className="space-y-2 border-t border-[#f0e6d8] pt-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-[#274e23] uppercase tracking-wider text-xs">
                    Cốt Lõi / Ý Chính Của Bài Viết ({editingArticle.keyTakeaways.length})
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingArticle({ ...editingArticle, keyTakeaways: [...editingArticle.keyTakeaways, 'Ý cốt lõi mới'] })
                    }
                    className="px-2.5 py-1 bg-[#274e23] text-white font-bold rounded-lg text-[11px] flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Thêm Ý Cốt Lõi
                  </button>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {editingArticle.keyTakeaways.map((take, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-5 font-bold text-[#274e23] text-center">•</span>
                      <input
                        type="text"
                        value={take}
                        onChange={(e) => {
                          const updated = [...editingArticle.keyTakeaways];
                          updated[idx] = e.target.value;
                          setEditingArticle({ ...editingArticle, keyTakeaways: updated });
                        }}
                        className="w-full p-2 rounded-xl border border-[#dcd0bf]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = editingArticle.keyTakeaways.filter((_, i) => i !== idx);
                          setEditingArticle({ ...editingArticle, keyTakeaways: updated });
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transcript / Full Text Snippet */}
              <div>
                <label className="font-bold text-[#5c4d43] block mb-1">Trích Đoạn / Nội Dung Chi Tiết Nổi Bật</label>
                <textarea
                  rows={4}
                  value={editingArticle.transcriptSnippet}
                  onChange={(e) => setEditingArticle({ ...editingArticle, transcriptSnippet: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#dcd0bf] font-sans"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (isAddingArticle) {
                      setArticles((prev) => [editingArticle, ...prev]);
                      showNotification('Đã thêm bài viết mới thành công!');
                    } else {
                      setArticles((prev) => prev.map((a) => (a.id === editingArticle.id ? editingArticle : a)));
                      showNotification('Đã cập nhật chi tiết bài viết!');
                    }
                    setEditingArticle(null);
                  }}
                  className="w-full py-3 bg-[#274e23] hover:bg-[#1f381c] text-white font-bold text-xs rounded-xl shadow cursor-pointer flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4 text-amber-300" /> Lưu Bài Viết
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: EDIT PRODUCT */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 bg-[#2d241e]/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white border border-[#e2d5c3] rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto text-xs">
              <button
                onClick={() => setEditingProduct(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-[#f0e6d8]"
              >
                <X className="w-5 h-5 text-[#2d241e]" />
              </button>

              <h3 className="text-lg font-bold font-serif text-[#274e23]">
                {isAddingProduct ? 'Thêm Sản Phẩm Mới' : 'Sửa Chi Tiết Sản Phẩm'}
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Tên Sản Phẩm *</label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full p-2 rounded-xl border border-[#dcd0bf]"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Danh Mục</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        category: e.target.value as Product['category'],
                      })
                    }
                    className="w-full p-2 rounded-xl border border-[#dcd0bf] bg-white"
                  >
                    <option value="Gạo & Nông Sản">Gạo & Nông Sản</option>
                    <option value="Rau Củ Hữu Cơ">Rau Củ Hữu Cơ</option>
                    <option value="Mật Ong & Tự Nhiên">Mật Ong & Tự Nhiên</option>
                    <option value="Chăm Sóc & Gia Dụng">Chăm Sóc & Gia Dụng</option>
                    <option value="Bộ Sản Phẩm Gia Đình">Bộ Sản Phẩm Gia Đình</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Giá Bán (VNĐ)</label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full p-2 rounded-xl border border-[#dcd0bf]"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Giá Gốc (VNĐ)</label>
                  <input
                    type="number"
                    value={editingProduct.originalPrice || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: Number(e.target.value) })}
                    className="w-full p-2 rounded-xl border border-[#dcd0bf]"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Thẻ Badge</label>
                  <input
                    type="text"
                    value={editingProduct.badge || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                    className="w-full p-2 rounded-xl border border-[#dcd0bf]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Mô Tả Phụ (Subtitle)</label>
                <input
                  type="text"
                  value={editingProduct.subtitle}
                  onChange={(e) => setEditingProduct({ ...editingProduct, subtitle: e.target.value })}
                  className="w-full p-2 rounded-xl border border-[#dcd0bf]"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">URL Hình Ảnh</label>
                <input
                  type="text"
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: formatImageUrl(e.target.value) })}
                  className="w-full p-2 rounded-xl border border-[#dcd0bf]"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Nguồn Gốc Xuất Xứ</label>
                <input
                  type="text"
                  value={editingProduct.origin}
                  onChange={(e) => setEditingProduct({ ...editingProduct, origin: e.target.value })}
                  className="w-full p-2 rounded-xl border border-[#dcd0bf]"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Tiêu Chuẩn Kiểm Định (BMQ)</label>
                <input
                  type="text"
                  value={editingProduct.certification}
                  onChange={(e) => setEditingProduct({ ...editingProduct, certification: e.target.value })}
                  className="w-full p-2 rounded-xl border border-[#dcd0bf]"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Mô Tả Chi Tiết</label>
                <textarea
                  rows={3}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full p-2 rounded-xl border border-[#dcd0bf]"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between">
                <div>
                  <label className="font-bold text-[#274e23] text-xs flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={!!editingProduct.isMainSaleProduct}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          isMainSaleProduct: e.target.checked,
                        })
                      }
                      className="w-4 h-4 accent-[#274e23] cursor-pointer"
                    />
                    <span>⭐ Đặt Làm Sản Phẩm Bán Chính Trang Chủ (Main Sales Product)</span>
                  </label>
                  <p className="text-[11px] text-[#7a6858] mt-1 ml-6">
                    Sản phẩm này sẽ ưu tiên hiển thị ở danh mục Sản Phẩm Bán Lẻ Chủ Lực ngoài Trang Chủ.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  if (isAddingProduct) {
                    setProducts((prev) => [editingProduct, ...prev]);
                    showNotification('Đã thêm sản phẩm mới!');
                  } else {
                    setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? editingProduct : p)));
                    showNotification('Đã cập nhật sản phẩm!');
                  }
                  setEditingProduct(null);
                }}
                className="w-full py-3 bg-[#274e23] text-white font-bold text-xs rounded-xl shadow cursor-pointer"
              >
                Lưu Sản Phẩm
              </button>
            </div>
          </div>
        )}

        {/* MODAL: EDIT STATION */}
        {editingStation && (
          <div className="fixed inset-0 z-50 bg-[#2d241e]/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white border border-[#e2d5c3] rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto text-xs">
              <button
                onClick={() => setEditingStation(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-[#f0e6d8]"
              >
                <X className="w-5 h-5 text-[#2d241e]" />
              </button>

              <h3 className="text-lg font-bold font-serif text-[#274e23]">
                {isAddingStation ? 'Thêm Trạm BiO Station Mới' : 'Sửa Thông Tin Trạm'}
              </h3>

              <div>
                <label className="font-semibold block mb-1">Tên Trạm BiO *</label>
                <input
                  type="text"
                  value={editingStation.name}
                  onChange={(e) => setEditingStation({ ...editingStation, name: e.target.value })}
                  className="w-full p-2 rounded-xl border border-[#dcd0bf]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Loại Trạm</label>
                  <select
                    value={editingStation.type}
                    onChange={(e) => {
                      const t = e.target.value as StationItem['type'];
                      const typeName =
                        t === 'center'
                          ? 'Station Trung Tâm'
                          : t === 'community'
                          ? 'Station Cộng Đồng'
                          : 'Điểm Đối Tác';
                      setEditingStation({ ...editingStation, type: t, typeName });
                    }}
                    className="w-full p-2 rounded-xl border border-[#dcd0bf] bg-white"
                  >
                    <option value="center">Station Trung Tâm</option>
                    <option value="community">Station Cộng Đồng</option>
                    <option value="partner">Điểm Đối Tác</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Trạng Thái Vận Hành</label>
                  <input
                    type="text"
                    value={editingStation.status}
                    onChange={(e) => setEditingStation({ ...editingStation, status: e.target.value })}
                    className="w-full p-2 rounded-xl border border-[#dcd0bf]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Địa Chỉ Trạm</label>
                <input
                  type="text"
                  value={editingStation.address}
                  onChange={(e) => setEditingStation({ ...editingStation, address: e.target.value })}
                  className="w-full p-2 rounded-xl border border-[#dcd0bf]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Số Điện Thoại</label>
                  <input
                    type="text"
                    value={editingStation.phone}
                    onChange={(e) => setEditingStation({ ...editingStation, phone: e.target.value })}
                    className="w-full p-2 rounded-xl border border-[#dcd0bf]"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Giờ Mở Cửa</label>
                  <input
                    type="text"
                    value={editingStation.hours}
                    onChange={(e) => setEditingStation({ ...editingStation, hours: e.target.value })}
                    className="w-full p-2 rounded-xl border border-[#dcd0bf]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">URL Hình Ảnh</label>
                <input
                  type="text"
                  value={editingStation.image}
                  onChange={(e) => setEditingStation({ ...editingStation, image: formatImageUrl(e.target.value) })}
                  className="w-full p-2 rounded-xl border border-[#dcd0bf]"
                />
              </div>

              <button
                onClick={() => {
                  if (isAddingStation) {
                    setStations((prev) => [editingStation, ...prev]);
                    showNotification('Đã thêm trạm mới!');
                  } else {
                    setStations((prev) => prev.map((s) => (s.id === editingStation.id ? editingStation : s)));
                    showNotification('Đã cập nhật thông tin trạm!');
                  }
                  setEditingStation(null);
                }}
                className="w-full py-3 bg-[#274e23] text-white font-bold text-xs rounded-xl shadow cursor-pointer"
              >
                Lưu Trạm BiO
              </button>
            </div>
          </div>
        )}

        {/* MODAL: EDIT STORY */}
        {editingStory && (
          <div className="fixed inset-0 z-50 bg-[#2d241e]/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white border border-[#e2d5c3] rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto text-xs">
              <button
                onClick={() => setEditingStory(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-[#f0e6d8]"
              >
                <X className="w-5 h-5 text-[#2d241e]" />
              </button>

              <h3 className="text-lg font-bold font-serif text-[#274e23]">
                {isAddingStory ? 'Thêm Câu Chuyện Mới' : 'Sửa Câu Chuyện Khách Hàng'}
              </h3>

              <div>
                <label className="font-semibold block mb-1">Tên Nhân Vật *</label>
                <input
                  type="text"
                  value={editingStory.name}
                  onChange={(e) => setEditingStory({ ...editingStory, name: e.target.value })}
                  className="w-full p-2 rounded-xl border border-[#dcd0bf]"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Trích Dẫn Impressive Quote</label>
                <input
                  type="text"
                  value={editingStory.quote}
                  onChange={(e) => setEditingStory({ ...editingStory, quote: e.target.value })}
                  className="w-full p-2 rounded-xl border border-[#dcd0bf]"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Nội Dung Câu Chuyện Chi Tiết</label>
                <textarea
                  rows={4}
                  value={editingStory.story}
                  onChange={(e) => setEditingStory({ ...editingStory, story: e.target.value })}
                  className="w-full p-2 rounded-xl border border-[#dcd0bf]"
                />
              </div>

              <button
                onClick={() => {
                  if (isAddingStory) {
                    setStories((prev) => [editingStory, ...prev]);
                    showNotification('Đã thêm câu chuyện mới!');
                  } else {
                    setStories((prev) => prev.map((s) => (s.id === editingStory.id ? editingStory : s)));
                    showNotification('Đã lưu câu chuyện!');
                  }
                  setEditingStory(null);
                }}
                className="w-full py-3 bg-[#274e23] text-white font-bold text-xs rounded-xl shadow cursor-pointer"
              >
                Lưu Câu Chuyện
              </button>
            </div>
          </div>
        )}

        {/* MODAL: EDIT / ADD DISH OPTION */}
        {editingDish && (
          <div className="fixed inset-0 z-50 bg-[#2d241e]/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white border border-[#e2d5c3] rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto text-xs">
              <button
                type="button"
                onClick={() => setEditingDish(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-[#f0e6d8]"
              >
                <X className="w-5 h-5 text-[#2d241e]" />
              </button>

              <h3 className="text-lg font-bold font-serif text-[#274e23]">
                {isAddingDish ? 'Thêm Món Ăn Mới Vào Bữa Trải Nghiệm' : 'Sửa Món Ăn Trải Nghiệm'}
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Tên Món Ăn *</label>
                  <input
                    type="text"
                    value={editingDish.name}
                    onChange={(e) => setEditingDish({ ...editingDish, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#dcd0bf] bg-[#fbf8f3]"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Loại Món *</label>
                  <select
                    value={editingDish.category}
                    onChange={(e) =>
                      setEditingDish({
                        ...editingDish,
                        category: e.target.value as any,
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-[#dcd0bf] bg-[#fbf8f3]"
                  >
                    <option value="Món Mặn">Món Mặn</option>
                    <option value="Món Xào">Món Xào</option>
                    <option value="Món Canh">Món Canh</option>
                    <option value="Món Phụ & Tráng Miệng">Món Phụ & Tráng Miệng</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Giá Phụ Thu Nếu Gọi Thêm Phần (VNĐ)</label>
                <input
                  type="number"
                  value={editingDish.extraPrice}
                  onChange={(e) => setEditingDish({ ...editingDish, extraPrice: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border border-[#dcd0bf] bg-[#fbf8f3] font-bold text-amber-700"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Nguồn Gốc / Xuất Xứ Nguyên Liệu</label>
                <input
                  type="text"
                  value={editingDish.origin}
                  onChange={(e) => setEditingDish({ ...editingDish, origin: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#dcd0bf] bg-[#fbf8f3]"
                  placeholder="VD: Thịt heo sinh thái Củ Chi, rau hái sáng..."
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Mô Tả Hương Vị Món Ăn</label>
                <textarea
                  rows={2}
                  value={editingDish.flavor}
                  onChange={(e) => setEditingDish({ ...editingDish, flavor: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#dcd0bf] bg-[#fbf8f3]"
                  placeholder="VD: Đậm đà, béo ngậy vừa phải, thơm lừng tiêu đen..."
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">URL Hình Ảnh Món Ăn</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingDish.image}
                    onChange={(e) => setEditingDish({ ...editingDish, image: formatImageUrl(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-[#dcd0bf] bg-[#fbf8f3]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImageToolTarget({
                        type: 'product',
                        field: 'image',
                        currentUrl: editingDish.image,
                        objectFit: 'cover',
                        aspectRatio: '16/10',
                      });
                    }}
                    className="px-3 py-2 bg-[#274e23] text-white rounded-xl text-xs font-bold shrink-0 cursor-pointer"
                  >
                    Xén Ảnh
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!editingDish.name.trim()) {
                    alert('Vui lòng nhập tên món ăn!');
                    return;
                  }
                  const currentList = siteData.experienceMealConfig?.dishes || [];
                  let updatedList: DishOption[] = [];
                  if (isAddingDish) {
                    updatedList = [editingDish, ...currentList];
                    showNotification('Đã thêm món ăn mới vào thực đơn!');
                  } else {
                    updatedList = currentList.map((d) => (d.id === editingDish.id ? editingDish : d));
                    showNotification('Đã cập nhật món ăn!');
                  }
                  updateExperienceMealConfig({ dishes: updatedList });
                  setEditingDish(null);
                }}
                className="w-full py-3 bg-[#274e23] text-white font-bold text-xs rounded-xl shadow cursor-pointer mt-2"
              >
                Lưu Món Ăn
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
