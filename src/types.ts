export type TabType = 
  | 'home' 
  | 'model' 
  | 'shop' 
  | 'network' 
  | 'recipes' 
  | 'knowledge' 
  | 'quiz' 
  | 'advisor' 
  | 'stories'
  | 'admin';

export interface DishOption {
  id: string;
  name: string;
  category: 'Cơm' | 'Nước' | 'Cháo' | 'Topping' | 'Món Mặn' | 'Món Xào' | 'Món Canh' | 'Món Phụ & Tráng Miệng';
  origin?: string;
  flavor?: string;
  price: number;
  image?: string;
  color?: string;
  isMain?: boolean;
}

export interface ExperienceMealConfig {
  pricePerPerson: number;
  depositPercent: number;
  includedDishesPerPerson: number;
  bannerTitle: string;
  bannerSubtitle: string;
  bannerDescription: string;
  depositNoticeText: string;
  dishes: DishOption[];
}

export interface ThemeConfig {
  primaryColor: string;
  accentColor: string;
  bgTone: string;
  headerBg: string;
  footerBg: string;
  displayFont: string;
  bodyFont: string;
  fontScale: 'compact' | 'standard' | 'spacious';
}

export interface ImageCropConfig {
  url: string;
  objectFit: 'cover' | 'contain' | 'fill' | 'scale-down';
  aspectRatio: '16:9' | '4:3' | '1:1' | '3:4' | 'free';
  position: 'center' | 'top' | 'bottom' | 'left' | 'right';
}

export interface BioCategoryOption {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconEmoji: string;
  image?: string;
  categoryKey?: string;
  isMainFeatured?: boolean;
}

export interface BrandConfig {
  logoType?: 'vector' | 'image' | 'combined'; // 'vector' (default), 'image', or 'combined'
  logoImageUrl?: string;                      // custom image base64 data URL or external URL
  footerLogoImageUrl?: string;                // footer logo URL
  logoScale?: number;                         // scale zoom factor percentage (50% - 300%)
  logoOffsetX?: number;                       // horizontal offset position in px (-150 to +150)
  logoOffsetY?: number;                       // vertical offset position in px (-100 to +100)
  logoHeight?: number;                        // base height in px (20 - 150)
  certificationLogoUrl?: string;              // additional logo (e.g., Bo Cong Thuong)
  logoMainText: string;
  logoSubText: string;
  slogan: string;
  subSlogan: string;
  topBannerText: string;
  hotline: string;
  email: string;
  address: string;
  websiteUrl: string;
  operatingHours: string;
  headquarters: string;
  familyCountBadge: string;
  copyrightText?: string;
  footerDescription?: string;
  socialFacebook?: string;
  socialZalo?: string;
  socialYoutube?: string;
  socialTiktok?: string;
  // Customizable terms & section titles
  homepageLabel?: string;          // e.g. "Trang Chủ"
  agriProductsLabel?: string;      // e.g. "Nông Sản & Gạo Bách Mộc"
  organicVegetablesLabel?: string; // e.g. "Rau Củ Quả Hữu Cơ"
  cleanMeatLabel?: string;         // e.g. "Thịt & Thực Phẩm Sinh Thái"
  bioStationLabel?: string;        // e.g. "Hệ Sinh Thái BiO Station"
  mainSaleProductTitle?: string;   // e.g. "Sản Phẩm Bán Chính Trang Chủ"
  
  // Maps links
  mapLinkCenter?: string;
  mapLinkStore?: string;
}

export interface FooterConfig {
  sloganHighlight?: string; // "Đúng: Nguồn gốc rõ ràng • Thật: Thông tin thật • Thuận tự nhiên"
  column1Title?: string; // "Khám Phá Hệ Sinh Thái"
  column2Title?: string; // "Văn Phòng & Điểm Trạm"
  policy1Label?: string; // "Chính Sách Bảo Mật"
  policy2Label?: string; // "Tiêu Chuẩn BMQ"
  policy3Label?: string; // "Điều Khoản Dịch Vụ"
}

export interface NavTabConfig {
  id: TabType;
  label: string;
}

export interface NavConfig {
  tabs: NavTabConfig[];
}

export interface HeroConfig {
  badgeTag: string;
  titlePart1: string;
  titleHighlight: string;
  subTitle: string;
  descriptionText: string;
  coreValue1Title: string;
  coreValue1Desc: string;
  coreValue2Title: string;
  coreValue2Desc: string;
  coreValue3Title: string;
  coreValue3Desc: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
  card1Title?: string;
  card1Desc?: string;
  card2Title?: string;
  card2Desc?: string;
}

export interface CoreValue {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  iconName: string;
}

export interface StationItem {
  id: string;
  name: string;
  type: 'center' | 'community' | 'partner';
  typeName: string;
  address: string;
  phone: string;
  hours: string;
  status: string;
  features: string[];
  image: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'Gạo' | 'Cafe' | 'Nước nhàu' | 'Màng cám gạo' | 'Trà' | 'Nước Mắm' | 'Viên cám gạo' | string;
  is_hidden?: boolean;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  image: string;
  description: string;
  keyBenefits: string[];
  origin: string;
  certification: string;
  bmqNote: string;
  suggestedUse?: string;
  dishOptions?: number[]; // e.g. [2, 3, 4, 5] dishes
  servingsCount?: number; // e.g. 1, 2, 3, 4, 5 people
  dishSampleList?: string[]; // list of dishes included
  flavorProfile?: string; // flavor description
  isMainSaleProduct?: boolean; // Flagged in admin to display on homepage as Main Sales Product
  unit?: string; // e.g. "Túi 5kg", "Gói 1kg", "Chai 500ml", "Phần"
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Recipe {
  id: string;
  title: string;
  category: 'Bữa Ăn Lành' | 'Món Rau Củ' | 'Món Chay Nutritive' | 'Thức Uống Thanh Lọc';
  prepTime: string;
  cookTime: string;
  servings: number;
  calories: number;
  organicPercent: number;
  image: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  bmqTip: string;
}

export interface PaymentConfig {
  bankName: string;
  accountNumber: string;
  accountName: string;
  bankBranch: string;
  qrCodeUrl: string;
  transferNotePrefix: string;
  vatRatePercent: number;
  innerCityShippingFee: number;
  outerCityShippingFee: number;
  freeShippingThreshold: number;
  emailSender: string;
  supportPhone: string;
}

export interface OrderRecipient {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  district?: string;
  shippingType: 'inner' | 'outer';
  orderType: 'delivery' | 'takeaway' | 'dine-in';
  notes?: string;
}

export interface OrderRecord {
  id: string;
  orderType: 'product' | 'experience_meal';
  fulfillmentType: 'dine_in' | 'takeaway' | 'delivery';
  status: 'new' | 'confirmed' | 'completed' | 'cancelled';
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerAddress?: string;
  city?: string;
  district?: string;
  stationName?: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    extraNote?: string;
  }>;
  subtotal: number;
  discountAmount?: number;
  shippingFee?: number;
  grandTotal: number;
  paidAmount: number;
  remainingAmount: number;
  notes?: string;
  createdAt: string;
}

export type AdminTabId =
  | 'brand'
  | 'theme'
  | 'payment'
  | 'experience_meal'
  | 'business'
  | 'orders'
  | 'products'
  | 'stations'
  | 'recipes'
  | 'articles'
  | 'stories'
  | 'media'
  | 'tools'
  | 'users'
  | 'logs'
  | 'backups';

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  username: string;
  fullName: string;
  role: 'super_admin' | 'staff' | 'system' | 'guest';
  category: 'login' | 'content' | 'media' | 'settings' | 'order' | 'user' | 'backup' | 'config';
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT' | 'UPLOAD' | 'RESTORE';
  target: string;
  details?: string;
  ipDevice?: string;
}

export interface AdminUserPermissions {
  allowedTabs: AdminTabId[];
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

export interface AdminUser {
  id: string;
  username: string;
  fullName: string;
  phone: string;
  password?: string;
  role: 'super_admin' | 'staff';
  permissions: AdminUserPermissions;
  isActive: boolean;
  createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  category: 'Trồng Cây Thuận Tự Nhiên' | 'Mô Hình BiO Station' | 'Tiêu Chuẩn BMQ' | 'Sống Xanh & Sức Khỏe';
  duration: string;
  views: string;
  date: string;
  image: string;
  summary: string;
  keyTakeaways: string[];
  transcriptSnippet: string;
  recommendedProductIds: string[];
}

export interface SuccessStory {
  id: string;
  name: string;
  role: string;
  impactMetric: string;
  duration: string;
  location: string;
  quote: string;
  story: string;
  beforeImage: string;
  afterImage: string;
  stationType: string;
  keyStrategy: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  description: string;
  options: {
    label: string;
    scores: { [key: string]: number };
  }[];
}

export interface BusinessMissionConfig {
  pageTitle: string;
  pageSubtitle: string;
  missionLabel: string;
  missionText: string;
  blocksSectionTitle: string;
  blocksSectionSubtitle: string;
  topBadgeText?: string;
  roadmapSectionTitle?: string;
  roadmapSectionSubtitle?: string;
  principlesSectionTitle?: string;
  principlesSectionSubtitle?: string;
  partnershipImageUrl?: string;
  title?: string;
  subTitle?: string;
  coreValues?: any[]; // Keep backward compatibility
}

export interface BusinessBlock {
  id: number;
  title: string;
  icon: string;
  items: string[];
  highlight?: string;
}

export interface RoadmapStage {
  step: number;
  title: string;
  subTitle: string;
  description: string;
  icon: string;
  status: 'active' | 'expanding' | 'planned';
}

export interface Principle {
  id: number;
  title: string;
  subTitle: string;
  icon: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
