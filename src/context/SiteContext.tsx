import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import {
  BrandConfig,
  HeroConfig,
  ThemeConfig,
  PaymentConfig,
  Product,
  Recipe,
  Article,
  SuccessStory,
  StationItem,
  BusinessBlock,
  RoadmapStage,
  Principle,
  ExperienceMealConfig,
  DishOption,
  BioCategoryOption,
} from '../types';

export const DEFAULT_BIO_CATEGORIES: BioCategoryOption[] = [
  {
    id: 'bio-cat-1',
    title: 'Gạo & Nông Sản Bách Mộc',
    subtitle: 'Gạo ST25 Lúa Tôm Túi 5kg • 225.000đ',
    description: 'Nông sản sinh thái hữu cơ chuẩn lúa tôm Bách Mộc, hạt dẻo thơm nguyên cám, ngọt đậm đà.',
    iconEmoji: '🌾',
    categoryKey: 'Gạo & Nông Sản',
    isMainFeatured: true,
  },
  {
    id: 'bio-cat-2',
    title: 'Rau Củ Quả Hữu Cơ Tươi Mới',
    subtitle: 'Nông Trại Củ Chi & Lâm Đồng',
    description: 'Rau củ hái sáng 5h, chuẩn tiêu chuẩn BMQ Qualified không hóa chất bảo vệ thực vật.',
    iconEmoji: '🥬',
    categoryKey: 'Rau Củ Hữu Cơ',
    isMainFeatured: true,
  },
  {
    id: 'bio-cat-3',
    title: 'Thịt & Thực Phẩm Sinh Thái',
    subtitle: 'Heo Củ Chi & Gà Đồi Thảo Mộc',
    description: 'Thịt heo, gà đồi chăn nuôi sinh thái thảo mộc, không kháng sinh, bì giòn thơm ngậy.',
    iconEmoji: '🥩',
    categoryKey: 'Thịt & Hải Sản Sạch',
    isMainFeatured: true,
  },
];

export const DEFAULT_EXPERIENCE_MEAL_CONFIG: ExperienceMealConfig = {
  pricePerPerson: 50000,
  depositPercent: 50,
  includedDishesPerPerson: 2,
  bannerTitle: 'Thiết Kế Mâm Cơm Trải Nghiệm Cá Nhân Hóa',
  bannerSubtitle: 'Dịch Vụ Bữa Ăn Trải Nghiệm Độc Quyền BiO Station',
  bannerDescription:
    'Phục vụ từ 1 đến 10 khách. Mỗi phần ăn 50.000đ / người đã bao gồm Cơm ST25 Bách Mộc dẻo ngọt và 2 suất món ăn tự chọn. Quý khách có thể thoải mái ghi chú khẩu vị riêng cho từng thành viên, chọn số lượng phần ăn, đặt lịch hẹn ăn tại chỗ hoặc giao mâm cơm tận nơi.',
  depositNoticeText:
    'Để đảm bảo nguyên liệu hữu cơ (thịt sinh thái Củ Chi, rau hái sáng, cá lóc đồng) luôn được chuẩn bị tươi mới tuyệt đối và bếp không bị lãng phí food waste, BiO Station yêu cầu thanh toán cọc 50% sau khi quý khách xác nhận đơn.',
  dishes: [
    {
      id: 'dish-com-huu-co',
      name: 'Cơm hữu cơ Bách Mộc',
      category: 'Cơm',
      flavor: 'Gồm: Phần cơm, Canh, Rau luộc, Món mặn',
      price: 59000,
      isMain: true,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'dish-com-lut-huu-co',
      name: 'Cơm lứt hữu cơ Bách Mộc',
      category: 'Cơm',
      flavor: 'Gồm: Phần cơm, Canh, Rau luộc, Món mặn',
      price: 75000,
      isMain: true,
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'dish-do-an-them',
      name: 'Đồ ăn thêm (Extra dishes)',
      category: 'Món Phụ & Tráng Miệng',
      price: 30000,
    },
    {
      id: 'dish-com-them-huu-co',
      name: 'Cơm thêm - Hữu cơ (Extra organic rice)',
      category: 'Món Phụ & Tráng Miệng',
      price: 10000,
    },
    {
      id: 'dish-com-them-lut',
      name: 'Cơm thêm - Lứt (Extra brown rice)',
      category: 'Món Phụ & Tráng Miệng',
      price: 15000,
    },
    {
      id: 'dish-mang-cam-gao',
      name: 'Màng cám gạo dinh dưỡng Bách Mộc',
      category: 'Món Phụ & Tráng Miệng',
      flavor: 'Trộn cùng cơm gia tăng dinh dưỡng cho bữa ăn',
      price: 10000,
    },
    {
      id: 'drink-tra-chanh',
      name: 'Trà chanh (Lemon tea)',
      category: 'Nước',
      price: 15000,
    },
    {
      id: 'drink-tra-tac',
      name: 'Trà tắc (Kumquat tea)',
      category: 'Nước',
      price: 15000,
    },
    {
      id: 'drink-tra-bm',
      name: 'Trà Bách Mộc (Tea)',
      category: 'Nước',
      price: 5000,
    },
    {
      id: 'drink-khan-lanh',
      name: 'Khăn lạnh (Cold towel)',
      category: 'Nước',
      price: 3000,
    },
    {
      id: 'chao_1_loai_m',
      name: 'Cháo + 1 loại (Size M)',
      category: 'Cháo',
      price: 39000,
    },
    {
      id: 'chao_1_loai_l',
      name: 'Cháo + 1 loại (Size L)',
      category: 'Cháo',
      price: 59000,
    },
    {
      id: 'chao-ca-hoi-m',
      name: 'Cháo Cá hồi (Size M)',
      category: 'Cháo',
      price: 65000,
    },
    {
      id: 'chao-ca-hoi-l',
      name: 'Cháo Cá hồi (Size L)',
      category: 'Cháo',
      price: 85000,
    },
    {
      id: 'chao-suon-non-m',
      name: 'Cháo Sườn non (Size M)',
      category: 'Cháo',
      price: 50000,
    },
    {
      id: 'chao-suon-non-l',
      name: 'Cháo Sườn non (Size L)',
      category: 'Cháo',
      price: 65000,
    },
    {
      id: 'chao-dac-biet-l',
      name: 'Cháo đặc biệt (Size L)',
      category: 'Cháo',
      price: 89000,
      isMain: true,
    },
    {
      id: 'topping-chao-lua-me',
      name: 'Cháo Lúa Mẹ',
      category: 'Topping',
      price: 9000,
    },
    {
      id: 'topping-chao-them',
      name: 'Cháo thêm',
      category: 'Topping',
      price: 5000,
    },
    {
      id: 'topping-thit-heo-bam',
      name: 'Thịt heo băm',
      category: 'Topping',
      price: 20000,
    },
    {
      id: 'topping-rau-cu',
      name: 'Rau củ',
      category: 'Topping',
      price: 20000,
    },
    {
      id: 'topping-thit-ga',
      name: 'Thịt gà',
      category: 'Topping',
      price: 20000,
    },
    {
      id: 'topping-nam',
      name: 'Nấm',
      category: 'Topping',
      price: 20000,
    },
    {
      id: 'topping-ruoc-ca',
      name: 'Ruốc cá',
      category: 'Topping',
      price: 20000,
    },
    {
      id: 'topping-thit-bo-bam',
      name: 'Thịt bò băm',
      category: 'Topping',
      price: 20000,
    },
    {
      id: 'topping-tom',
      name: 'Tôm',
      category: 'Topping',
      price: 20000,
    },
    {
      id: 'topping-tim-cat',
      name: 'Tim - Cật',
      category: 'Topping',
      price: 20000,
    },
    {
      id: 'topping-trung',
      name: 'Trứng',
      category: 'Topping',
      price: 10000,
    },
  ],
};
import { PRODUCTS } from '../data/products';
import { RECIPES } from '../data/recipes';
import { ARTICLES } from '../data/articles';
import { SUCCESS_STORIES } from '../data/successStories';
import {
  BUSINESS_MISSION,
  BUSINESS_BLOCKS,
  ROADMAP_STAGES,
  DEVELOPMENT_PRINCIPLES,
} from '../data/businessModel';
import SITE_CONFIG_DATA from '../data/site_config.json';
import { supabase } from '../utils/supabaseClient';

export const DEFAULT_PAYMENT_CONFIG: PaymentConfig = SITE_CONFIG_DATA.paymentConfig as unknown as PaymentConfig;

export const DEFAULT_THEME_CONFIG: ThemeConfig = SITE_CONFIG_DATA.themeConfig as unknown as ThemeConfig;

export const DEFAULT_BRAND_CONFIG: BrandConfig = SITE_CONFIG_DATA.brandConfig as unknown as BrandConfig;

export const DEFAULT_HERO_CONFIG: HeroConfig = SITE_CONFIG_DATA.heroConfig as unknown as HeroConfig;

export const DEFAULT_STATIONS: StationItem[] = [
  {
    id: 'st-phu-my-hung',
    name: 'BiO Station Flagship Trung Tâm',
    type: 'center',
    typeName: 'Station Trung Tâm',
    address: 'Đường Nguyễn Văn Linh, Khu đô thị Phú Mỹ Hưng, Quận 7, TP. HCM',
    phone: '0813 13 13 85',
    hours: '07:00 - 21:00 Hàng ngày',
    status: 'Đang vận hành',
    features: ['Trải nghiệm nếm thử nông sản', 'Thưởng trà & nước ép', 'Trung tâm đào tạo & điều phối'],
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'st-vinhomes',
    name: 'BiO Station Cộng Đồng - Central Park',
    type: 'community',
    typeName: 'Station Cộng Đồng',
    address: 'Shophouse Park 2, Khu Đô Thị Vinhomes Central Park, Bình Thạnh, TP. HCM',
    phone: '0909 234 567',
    hours: '07:30 - 20:00 Hàng ngày',
    status: 'Đang vận hành',
    features: ['Giao tận căn hộ 15 phút', 'Giỏ hàng tuần đăng ký', 'Điểm nhận hàng nông sản hái sớm'],
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'st-thao-dien',
    name: 'BiO Station Cộng Đồng - Thảo Điền',
    type: 'community',
    typeName: 'Station Cộng Đồng',
    address: 'Đường Xuân Thủy, Phường Thảo Điền, Thành phố Thủ Đức, TP. HCM',
    phone: '0912 345 678',
    hours: '07:30 - 20:00 Hàng ngày',
    status: 'Đang vận hành',
    features: ['Workshop trồng cây hàng tuần', 'Gạo Bách Mộc đong trực tiếp', 'Gia dụng xanh sinh học'],
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'st-veggie-restaurant',
    name: 'Điểm Đối Tác - Nhà Hàng Sống Lành Veggie',
    type: 'partner',
    typeName: 'Điểm Đối Tác',
    address: 'Phố Nguyễn Thị Minh Khai, Quận 1, TP. HCM',
    phone: '0988 765 432',
    hours: '09:00 - 21:00 Hàng ngày',
    status: 'Điểm phân phối',
    features: ['Nguồn nguyên liệu gạo & rau BMQ', 'Gói quà tặng nông sản', 'Đặt trước qua ứng dụng'],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
  },
];

export interface SiteDataState {
  brandConfig: BrandConfig;
  heroConfig: HeroConfig;
  themeConfig: ThemeConfig;
  paymentConfig: PaymentConfig;
  experienceMealConfig: ExperienceMealConfig;
  businessMission: typeof BUSINESS_MISSION;
  businessBlocks: BusinessBlock[];
  roadmapStages: RoadmapStage[];
  principles: Principle[];
  stations: StationItem[];
  products: Product[];
  recipes: Recipe[];
  articles: Article[];
  stories: SuccessStory[];
  bioCategories: BioCategoryOption[];
}

interface SiteContextType {
  siteData: SiteDataState;
  updateBrandConfig: (config: Partial<BrandConfig>) => void;
  updateHeroConfig: (config: Partial<HeroConfig>) => void;
  updateThemeConfig: (config: Partial<ThemeConfig>) => void;
  updatePaymentConfig: (config: Partial<PaymentConfig>) => void;
  updateExperienceMealConfig: (config: Partial<ExperienceMealConfig>) => void;
  updateBusinessMission: (mission: Partial<typeof BUSINESS_MISSION>) => void;
  setBusinessBlocks: React.Dispatch<React.SetStateAction<BusinessBlock[]>>;
  setRoadmapStages: React.Dispatch<React.SetStateAction<RoadmapStage[]>>;
  setPrinciples: React.Dispatch<React.SetStateAction<Principle[]>>;
  setStations: React.Dispatch<React.SetStateAction<StationItem[]>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
  setStories: React.Dispatch<React.SetStateAction<SuccessStory[]>>;
  setBioCategories: React.Dispatch<React.SetStateAction<BioCategoryOption[]>>;
  toggleMainSaleProduct: (productId: string) => void;
  toggleProductVisibility: (productId: string) => Promise<void>;
  resetToDefaults: () => void;
  importJSON: (jsonString: string) => boolean;
  exportJSON: () => string;
}

const STORAGE_KEY = 'BIO_STATION_SITE_DATA_V9';

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [brandConfig, setBrandConfig] = useState<BrandConfig>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_brand`);
    return saved ? JSON.parse(saved) : DEFAULT_BRAND_CONFIG;
  });

  const [heroConfig, setHeroConfig] = useState<HeroConfig>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_hero`);
    return saved ? JSON.parse(saved) : DEFAULT_HERO_CONFIG;
  });

  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_theme`);
    return saved ? JSON.parse(saved) : DEFAULT_THEME_CONFIG;
  });

  const [paymentConfig, setPaymentConfig] = useState<PaymentConfig>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_payment`);
    return saved ? JSON.parse(saved) : DEFAULT_PAYMENT_CONFIG;
  });

  const [experienceMealConfig, setExperienceMealConfig] = useState<ExperienceMealConfig>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_experience_meal`);
    return saved ? JSON.parse(saved) : DEFAULT_EXPERIENCE_MEAL_CONFIG;
  });

  const [businessMission, setBusinessMissionState] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_mission`);
    return saved ? JSON.parse(saved) : (SITE_CONFIG_DATA.businessMission || BUSINESS_MISSION);
  });

  const [businessBlocks, setBusinessBlocks] = useState<BusinessBlock[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_blocks`);
    return saved ? JSON.parse(saved) : BUSINESS_BLOCKS;
  });

  const [roadmapStages, setRoadmapStages] = useState<RoadmapStage[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_roadmap`);
    return saved ? JSON.parse(saved) : ROADMAP_STAGES;
  });

  const [principles, setPrinciples] = useState<Principle[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_principles`);
    return saved ? JSON.parse(saved) : DEVELOPMENT_PRINCIPLES;
  });

  const [stations, setStations] = useState<StationItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_stations`);
    return saved ? JSON.parse(saved) : DEFAULT_STATIONS;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_products`);
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_recipes`);
    return saved ? JSON.parse(saved) : RECIPES;
  });

  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_articles`);
    return saved ? JSON.parse(saved) : ARTICLES;
  });

  const [stories, setStories] = useState<SuccessStory[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_stories`);
    return saved ? JSON.parse(saved) : SUCCESS_STORIES;
  });

  const [bioCategories, setBioCategories] = useState<BioCategoryOption[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_bio_categories`);
    return saved ? JSON.parse(saved) : DEFAULT_BIO_CATEGORIES;
  });

  // Save to LocalStorage on changes
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_bio_categories`, JSON.stringify(bioCategories));
  }, [bioCategories]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_brand`, JSON.stringify(brandConfig));
  }, [brandConfig]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_hero`, JSON.stringify(heroConfig));
  }, [heroConfig]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_mission`, JSON.stringify(businessMission));
  }, [businessMission]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_blocks`, JSON.stringify(businessBlocks));
  }, [businessBlocks]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_roadmap`, JSON.stringify(roadmapStages));
  }, [roadmapStages]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_principles`, JSON.stringify(principles));
  }, [principles]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_stations`, JSON.stringify(stations));
  }, [stations]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_products`, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_recipes`, JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_articles`, JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_stories`, JSON.stringify(stories));
  }, [stories]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_theme`, JSON.stringify(themeConfig));

    // Dynamic CSS & Font Variables
    const root = document.documentElement;
    root.style.setProperty('--primary-color', themeConfig.primaryColor || '#274e23');
    root.style.setProperty('--accent-color', themeConfig.accentColor || '#8c521f');
    root.style.setProperty('--bg-tone', themeConfig.bgTone || '#f8f5f0');
    root.style.setProperty('--header-bg', themeConfig.headerBg || '#1f381c');
    root.style.setProperty('--footer-bg', themeConfig.footerBg || '#1f381c');

    let scaleVal = '100%';
    if (themeConfig.fontScale === 'compact') scaleVal = '93%';
    if (themeConfig.fontScale === 'spacious') scaleVal = '107%';
    root.style.setProperty('--font-scale', scaleVal);

    // Set Font Families on Root & Body
    const displayFontName = themeConfig.displayFont || 'Montserrat';
    const bodyFontName = themeConfig.bodyFont || 'Montserrat';

    root.style.setProperty('--display-font', `'${displayFontName}', serif`);
    root.style.setProperty('--body-font', `'${bodyFontName}', sans-serif`);
    document.body.style.fontFamily = `'${bodyFontName}', sans-serif`;

  }, [themeConfig]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_payment`, JSON.stringify(paymentConfig));
  }, [paymentConfig]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_experience_meal`, JSON.stringify(experienceMealConfig));
  }, [experienceMealConfig]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_stories`, JSON.stringify(stories));
  }, [stories]);

  // ===== AUTO-SYNC & BACKUP SYSTEM =====
  // Track whether the initial data load from Supabase has completed.
  // This prevents creating spurious backup snapshots when the page first loads
  // and state is populated from the cloud/Supabase fetch.
  const isInitialLoadDone = useRef(false);
  const syncDebounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Helper to safely parse array or JSON string or fallback
  const parseArrayField = (val: any, fallback: string[] = []): string[] => {
    if (Array.isArray(val)) return val;
    if (typeof val === 'string' && val.trim().startsWith('[')) {
      try {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        // Fall through
      }
    }
    if (typeof val === 'string' && val.trim().length > 0) {
      return val.split(',').map((s) => s.trim()).filter(Boolean);
    }
    return fallback;
  };

  // Core function: sync current state to Supabase Cloud Storage + create timestamped backup snapshot
  const syncCloudConfig = useCallback(async (dataOverride?: Record<string, any>) => {
    try {
      const dataToSave = {
        brandConfig: dataOverride?.brandConfig || brandConfig,
        heroConfig: dataOverride?.heroConfig || heroConfig,
        themeConfig: dataOverride?.themeConfig || themeConfig,
        paymentConfig: dataOverride?.paymentConfig || paymentConfig,
        experienceMealConfig: dataOverride?.experienceMealConfig || experienceMealConfig,
        businessMission: dataOverride?.businessMission || businessMission,
        stations: dataOverride?.stations || stations,
        bioCategories: dataOverride?.bioCategories || bioCategories,
        products: dataOverride?.products || products,
        recipes: dataOverride?.recipes || recipes,
        articles: dataOverride?.articles || articles,
        stories: dataOverride?.stories || stories,
        updatedAt: new Date().toISOString(),
      };
      const jsonString = JSON.stringify(dataToSave, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      
      // 1. Primary Live Config — always overwrite
      await supabase.storage.from('biostation_images').upload('config/site_config.json', blob, {
        upsert: true,
        contentType: 'application/json',
      });

      // 2. Automated Real-time Timestamped Cloud Snapshot Backup
      try {
        const now = new Date();
        const pad = (n: number) => n.toString().padStart(2, '0');
        const timestamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
        const backupFilename = `backups/site_config_${timestamp}.json`;
        const backupBlob = new Blob([jsonString], { type: 'application/json' });
        await supabase.storage.from('biostation_images').upload(backupFilename, backupBlob, {
          upsert: true,
          contentType: 'application/json',
        });
        console.log(`[AutoBackup] ✅ Snapshot saved: ${backupFilename}`);
      } catch (backupErr) {
        console.warn('[AutoBackup] ⚠️ Could not create snapshot:', backupErr);
      }
    } catch (err) {
      console.error('[AutoBackup] ❌ Error syncing site_config to Supabase:', err);
    }
  }, [brandConfig, heroConfig, themeConfig, paymentConfig, experienceMealConfig, businessMission, stations, bioCategories, products, recipes, articles, stories]);

  // ===== MASTER AUTO-SYNC useEffect =====
  // This effect watches ALL primary state variables. Whenever ANY state changes
  // (after the initial page load is complete), it debounces and calls syncCloudConfig
  // to save the live config AND create a timestamped backup snapshot on Supabase Cloud.
  // This ensures that even raw setState calls (setProducts, setRecipes, etc.) from
  // AdminDashboard components will trigger a cloud sync + backup.
  useEffect(() => {
    // Skip auto-sync during initial page load (Supabase fetch populates state)
    if (!isInitialLoadDone.current) return;

    // Debounce: wait 2 seconds after the last state change before syncing.
    // This prevents creating dozens of backups during rapid sequential edits.
    if (syncDebounceTimer.current) {
      clearTimeout(syncDebounceTimer.current);
    }
    syncDebounceTimer.current = setTimeout(() => {
      syncCloudConfig();
    }, 2000);

    return () => {
      if (syncDebounceTimer.current) {
        clearTimeout(syncDebounceTimer.current);
      }
    };
  }, [brandConfig, heroConfig, themeConfig, paymentConfig, experienceMealConfig, businessMission, stations, bioCategories, products, recipes, articles, stories, syncCloudConfig]);

  // FETCH FROM SUPABASE WITH SMART MERGING & FALLBACKS
  useEffect(() => {
    const fetchSupabaseData = async () => {
      try {
        // Fetch Cloud Config (Brand, Logo, Banners, Stations, Theme) from Supabase Cloud Storage
        try {
          const { data: cloudBlob, error: cloudErr } = await supabase.storage
            .from('biostation_images')
            .download('config/site_config.json');

          if (!cloudErr && cloudBlob) {
            const text = await cloudBlob.text();
            const parsed = JSON.parse(text);
            if (parsed.brandConfig) setBrandConfig(parsed.brandConfig);
            if (parsed.heroConfig) setHeroConfig(parsed.heroConfig);
            if (parsed.themeConfig) setThemeConfig(parsed.themeConfig);
            if (parsed.paymentConfig) setPaymentConfig(parsed.paymentConfig);
            if (parsed.experienceMealConfig) setExperienceMealConfig(parsed.experienceMealConfig);
            if (parsed.businessMission) setBusinessMissionState(parsed.businessMission);
            if (parsed.stations && Array.isArray(parsed.stations)) setStations(parsed.stations);
            if (parsed.bioCategories && Array.isArray(parsed.bioCategories)) setBioCategories(parsed.bioCategories);
            if (parsed.products && Array.isArray(parsed.products) && parsed.products.length > 0) setProducts(parsed.products);
            if (parsed.recipes && Array.isArray(parsed.recipes) && parsed.recipes.length > 0) setRecipes(parsed.recipes);
            if (parsed.articles && Array.isArray(parsed.articles) && parsed.articles.length > 0) setArticles(parsed.articles);
            if (parsed.stories && Array.isArray(parsed.stories) && parsed.stories.length > 0) setStories(parsed.stories);
          }
        } catch (e) {
          console.warn('Could not fetch cloud site_config from Supabase:', e);
        }

        const { data: prodData, error: prodErr } = await supabase.from('products').select('*');
        if (!prodErr && prodData && prodData.length > 0) {
          setProducts((prev) => {
            return prodData.map((sp: any) => {
              const localMatch = prev.find((p) => p.id === sp.id) || PRODUCTS.find((p) => p.id === sp.id);
              return { ...localMatch, ...sp };
            });
          });
        }

        const { data: artData, error: artErr } = await supabase.from('articles').select('*');
        if (!artErr && artData && artData.length > 0) {
          setArticles((prev) => {
            return artData.map((sa: any) => {
              const defaultMatch = ARTICLES.find((a) => a.id === sa.id) || prev.find((a) => a.id === sa.id);
              return {
                ...defaultMatch,
                ...sa,
                category: sa.category || defaultMatch?.category || 'Sống Xanh & Sức Khỏe',
                duration: sa.duration || defaultMatch?.duration || '5 phút đọc',
                views: sa.views || defaultMatch?.views || '1.2K lượt xem',
                summary: sa.summary || sa.excerpt || defaultMatch?.summary || 'Bài viết truyền cảm hứng lối sống xanh và nông nghiệp sinh thái Bách Mộc.',
                keyTakeaways: parseArrayField(
                  sa.keyTakeaways,
                  defaultMatch?.keyTakeaways || [
                    'Trải nghiệm trực tiếp tại chỗ: Thử nông sản tươi & workshop cộng đồng.',
                    'Cầu nối trực tiếp nông dân - người tiêu dùng Bách Mộc.',
                    'Triết lý thương hiệu: Chạm để trở về với giá trị sống tử tế.',
                  ]
                ),
                transcriptSnippet:
                  sa.transcriptSnippet ||
                  sa.content ||
                  defaultMatch?.transcriptSnippet ||
                  'BiO Station là điểm chạm văn hóa sống xanh, mang nguồn thực phẩm an lành đến mỗi gia đình.',
                recommendedProductIds: parseArrayField(
                  sa.recommendedProductIds,
                  defaultMatch?.recommendedProductIds || ['prod-gao-bach-moc', 'prod-rau-cu-bmq']
                ),
              };
            });
          });
        }

        const { data: recData, error: recErr } = await supabase.from('recipes').select('*');
        if (!recErr && recData && recData.length > 0) {
          setRecipes((prev) => {
            return recData.map((sr: any) => {
              const defaultMatch = RECIPES.find((r) => r.id === sr.id) || prev.find((r) => r.id === sr.id);
              return {
                ...defaultMatch,
                ...sr,
                category: sr.category || defaultMatch?.category || 'Bữa Ăn Lành',
                prepTime: sr.prepTime || sr.time || defaultMatch?.prepTime || '15 phút',
                cookTime: sr.cookTime || defaultMatch?.cookTime || '20 phút',
                servings: sr.servings || defaultMatch?.servings || 2,
                calories: sr.calories || defaultMatch?.calories || 300,
                organicPercent: sr.organicPercent || defaultMatch?.organicPercent || 100,
                description:
                  sr.description ||
                  defaultMatch?.description ||
                  'Bữa ăn thuần tự nhiên dinh dưỡng chế biến đơn giản từ nguồn nguyên liệu Bách Mộc.',
                ingredients: parseArrayField(
                  sr.ingredients,
                  defaultMatch?.ingredients || [
                    'Gạo hữu cơ Bách Mộc ST25',
                    'Rau củ hữu cơ tươi hái trong ngày',
                    'Gia vị tự nhiên Bách Mộc',
                  ]
                ),
                instructions: parseArrayField(
                  sr.instructions || sr.steps,
                  defaultMatch?.instructions || [
                    'Sơ chế nguyên liệu tươi sạch.',
                    'Chế biến ở nhiệt độ vừa phải để giữ trọn vi chất.',
                    'Thưởng thức cùng gia đình.',
                  ]
                ),
                bmqTip: sr.bmqTip || defaultMatch?.bmqTip || 'Nguyên liệu đạt chuẩn kiểm định BMQ 100% Thuận Tự Nhiên.',
              };
            });
          });
        }
      } catch (err) {
        console.error('Error fetching data from Supabase:', err);
      }

      // Mark initial load as complete after a brief delay.
      // This delay ensures all React setState batches from the fetch above
      // have settled before we start watching for user-initiated changes.
      setTimeout(() => {
        isInitialLoadDone.current = true;
        console.log('[AutoBackup] ✅ Initial load complete. Auto-sync & backup now ACTIVE.');
      }, 3000);
    };
    fetchSupabaseData();
  }, []);

  const updateBrandConfig = (config: Partial<BrandConfig>) => {
    setBrandConfig((prev) => ({ ...prev, ...config }));
  };

  const updateHeroConfig = (config: Partial<HeroConfig>) => {
    setHeroConfig((prev) => ({ ...prev, ...config }));
  };

  const updateThemeConfig = (config: Partial<ThemeConfig>) => {
    setThemeConfig((prev) => ({ ...prev, ...config }));
  };

  const updatePaymentConfig = (config: Partial<PaymentConfig>) => {
    setPaymentConfig((prev) => ({ ...prev, ...config }));
  };

  const updateExperienceMealConfig = (config: Partial<ExperienceMealConfig>) => {
    setExperienceMealConfig((prev) => ({ ...prev, ...config }));
  };

  const updateBusinessMission = (mission: Partial<typeof BUSINESS_MISSION>) => {
    setBusinessMissionState((prev: typeof BUSINESS_MISSION) => ({ ...prev, ...mission }));
  };

  const toggleMainSaleProduct = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, isMainSaleProduct: !p.isMainSaleProduct } : p
      )
    );
  };

  const toggleProductVisibility = async (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const newHiddenState = !product.is_hidden;
    
    // Update local state first for immediate UI response
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, is_hidden: newHiddenState } : p
      )
    );

    // Update Supabase
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_hidden: newHiddenState })
        .eq('id', productId);
        
      if (error) {
        console.error('Error toggling product visibility:', error);
        // Revert on error
        setProducts((prev) =>
          prev.map((p) =>
            p.id === productId ? { ...p, is_hidden: !newHiddenState } : p
          )
        );
      }
    } catch (err) {
      console.error('Failed to update Supabase:', err);
    }
  };

  const resetToDefaults = () => {
    setBrandConfig(DEFAULT_BRAND_CONFIG);
    setHeroConfig(DEFAULT_HERO_CONFIG);
    setThemeConfig(DEFAULT_THEME_CONFIG);
    setPaymentConfig(DEFAULT_PAYMENT_CONFIG);
    setExperienceMealConfig(DEFAULT_EXPERIENCE_MEAL_CONFIG);
    setBusinessMissionState(BUSINESS_MISSION);
    setBusinessBlocks(BUSINESS_BLOCKS);
    setRoadmapStages(ROADMAP_STAGES);
    setPrinciples(DEVELOPMENT_PRINCIPLES);
    setStations(DEFAULT_STATIONS);
    setProducts(PRODUCTS);
    setRecipes(RECIPES);
    setArticles(ARTICLES);
    setStories(SUCCESS_STORIES);
    setBioCategories(DEFAULT_BIO_CATEGORIES);

    localStorage.removeItem(`${STORAGE_KEY}_brand`);
    localStorage.removeItem(`${STORAGE_KEY}_hero`);
    localStorage.removeItem(`${STORAGE_KEY}_theme`);
    localStorage.removeItem(`${STORAGE_KEY}_payment`);
    localStorage.removeItem(`${STORAGE_KEY}_experience_meal`);
    localStorage.removeItem(`${STORAGE_KEY}_mission`);
    localStorage.removeItem(`${STORAGE_KEY}_blocks`);
    localStorage.removeItem(`${STORAGE_KEY}_roadmap`);
    localStorage.removeItem(`${STORAGE_KEY}_principles`);
    localStorage.removeItem(`${STORAGE_KEY}_stations`);
    localStorage.removeItem(`${STORAGE_KEY}_products`);
    localStorage.removeItem(`${STORAGE_KEY}_recipes`);
    localStorage.removeItem(`${STORAGE_KEY}_articles`);
    localStorage.removeItem(`${STORAGE_KEY}_stories`);
    localStorage.removeItem(`${STORAGE_KEY}_bio_categories`);
  };

  const exportJSON = () => {
    const data: SiteDataState = {
      brandConfig,
      heroConfig,
      themeConfig,
      paymentConfig,
      experienceMealConfig,
      businessMission,
      businessBlocks,
      roadmapStages,
      principles,
      stations,
      products,
      recipes,
      articles,
      stories,
      bioCategories,
    };
    return JSON.stringify(data, null, 2);
  };

  const importJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.brandConfig) setBrandConfig(parsed.brandConfig);
      if (parsed.heroConfig) setHeroConfig(parsed.heroConfig);
      if (parsed.themeConfig) setThemeConfig(parsed.themeConfig);
      if (parsed.paymentConfig) setPaymentConfig(parsed.paymentConfig);
      if (parsed.experienceMealConfig) setExperienceMealConfig(parsed.experienceMealConfig);
      if (parsed.businessMission) setBusinessMissionState(parsed.businessMission);
      if (parsed.businessBlocks) setBusinessBlocks(parsed.businessBlocks);
      if (parsed.roadmapStages) setRoadmapStages(parsed.roadmapStages);
      if (parsed.principles) setPrinciples(parsed.principles);
      if (parsed.stations) setStations(parsed.stations);
      if (parsed.products) setProducts(parsed.products);
      if (parsed.recipes) setRecipes(parsed.recipes);
      if (parsed.articles) setArticles(parsed.articles);
      if (parsed.stories) setStories(parsed.stories);
      if (parsed.bioCategories) setBioCategories(parsed.bioCategories);
      syncCloudConfig(parsed);
      return true;
    } catch (e) {
      console.error('Failed to import JSON data:', e);
      return false;
    }
  };

  const siteData: SiteDataState = {
    brandConfig,
    heroConfig,
    themeConfig,
    paymentConfig,
    experienceMealConfig,
    businessMission,
    businessBlocks,
    roadmapStages,
    principles,
    stations,
    products,
    recipes,
    articles,
    stories,
    bioCategories,
  };

  return (
    <SiteContext.Provider
      value={{
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
        toggleProductVisibility,
        resetToDefaults,
        importJSON,
        exportJSON,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
