import React, { createContext, useContext, useState, useEffect } from 'react';
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
      id: 'dish-thit-kho-to',
      name: 'Thịt Ba Chỉ Sinh Thái Kho Tộ',
      category: 'Món Mặn',
      origin: 'Thịt heo sinh thái Củ Chi nuôi thảo mộc, không chất tạo nạc',
      flavor: 'Đậm đà, béo ngậy vừa phải, thơm nức mùi hành ớt tiêu đen',
      extraPrice: 20000,
      image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'dish-ca-loc-kho',
      name: 'Cá Lóc Đồng Kho Riềng Bách Mộc',
      category: 'Món Mặn',
      origin: 'Cá lóc đồng tự nhiên miền Tây, riềng củ tươi Lâm Đồng',
      flavor: 'Thịt cá săn chắc, thấm vị mặn ngọt cay nồng chuẩn vị Nam Bộ',
      extraPrice: 20000,
      image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'dish-ga-xao-sa-ot',
      name: 'Gà Ta Đồi Xào Sả Ớt',
      category: 'Món Mặn',
      origin: 'Gà ta thả vườn đồi Lâm Đồng chạy bộ, sả tươi Củ Chi',
      flavor: 'Thịt gà dai ngọt, thơm nồng mùi sả tươi và ớt hiểm',
      extraPrice: 20000,
      image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'dish-rau-muong-xao',
      name: 'Rau Muống Hữu Cơ Xào Tỏi',
      category: 'Món Xào',
      origin: 'Rau muống hữu cơ Củ Chi thu hoạch trong ngày',
      flavor: 'Giòn ngọt tự nhiên, thơm lừng tỏi tép đập dập',
      extraPrice: 15000,
      image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'dish-cai-xao-nam',
      name: 'Cải Thìa Xào Nấm Tươi',
      category: 'Món Xào',
      origin: 'Cải thìa hữu cơ Lâm Đồng & Nấm đùi gà tươi',
      flavor: 'Thanh mát, giòn ngọt, giàu chất xơ & khoáng chất',
      extraPrice: 15000,
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'dish-canh-chua-ca',
      name: 'Canh Chua Cá Lóc Đồng Bách Mộc',
      category: 'Món Canh',
      origin: 'Cá lóc đồng, bạc hà, đậu okras, cà chua & me tươi Củ Chi',
      flavor: 'Chua thanh dịu mát, ngọt nước cá tự nhiên, rất đưa cơm',
      extraPrice: 20000,
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'dish-canh-suon-cu-qua',
      name: 'Canh Sườn Hầm Củ Quả Lâm Đồng',
      category: 'Món Canh',
      origin: 'Sườn heo sinh thái & Củ khoai tây, cà rốt, su su hữu cơ',
      flavor: 'Nước canh ngọt lịm đậm đà từ xương hầm và củ quả tươi',
      extraPrice: 20000,
      image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'dish-trung-chien-thao-moc',
      name: 'Trứng Gà Thảo Mộc Chiên Đốm Hành',
      category: 'Món Phụ & Tráng Miệng',
      origin: 'Trứng gà thảo mộc đốm tía tô & hành lá hữu cơ',
      flavor: 'Béo ngậy, vàng ươm, thơm lừng bơ thực vật & hành lá',
      extraPrice: 15000,
      image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=400&q=80',
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

  // FETCH FROM SUPABASE WITH SMART MERGING & FALLBACKS
  useEffect(() => {
    const fetchSupabaseData = async () => {
      try {
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
