import { BusinessBlock, RoadmapStage, Principle } from '../types';

export const BUSINESS_MISSION = {
  title: 'KẾ HOẠCH KINH DOANH BiO Station',
  subTitle: 'MÔ HÌNH: TRẢI NGHIỆM – BÁN LẺ – KẾT NỐI THUẬN TỰ NHIÊN',
  missionText:
    'BiO Station là điểm chạm để mọi người sống thuận tự nhiên hơn mỗi ngày – qua thực phẩm sạch, sản phẩm tử tế và cộng đồng yêu thiên nhiên.',
  coreValues: [
    {
      name: 'Đúng',
      desc: 'Nguồn gốc rõ ràng',
      detail: 'Minh bạch 100% chứng nhận nông hộ & nhật ký canh tác.',
      icon: 'ShieldCheck',
    },
    {
      name: 'Thật',
      desc: 'Sản phẩm thật – thông tin thật',
      detail: 'Nói không với hóa chất, chất bảo quản và quảng cáo quá đà.',
      icon: 'CheckCircle2',
    },
    {
      name: 'Thuận tự nhiên',
      desc: 'Tôn trọng tự nhiên, sống hài hòa',
      detail: 'Canh tác tuần hoàn, bao bì thân thiện môi trường.',
      icon: 'Sprout',
    },
  ],
};

export const BUSINESS_BLOCKS: BusinessBlock[] = [
  {
    id: 1,
    number: '1',
    title: 'MÔ HÌNH KINHN DOANH',
    icon: 'Store',
    items: [
      'Trải nghiệm tại chỗ (Thử sản phẩm, thưởng trà & nước ép)',
      'Bán lẻ sản phẩm hữu cơ – thuận tự nhiên',
      'Kết nối nông dân – người tiêu dùng (Direct Farmer Bridge)',
      'Tổ chức workshop, sự kiện cộng đồng sống xanh',
    ],
    highlight: 'Điểm trải nghiệm & chạm trực tiếp tại khu dân cư',
  },
  {
    id: 2,
    number: '2',
    title: 'SẢN PHẨM CHÍNH',
    icon: 'Wheat',
    items: [
      'Gạo hữu cơ Bách Mộc và nông sản BMQ (Qualified by BM)',
      'Rau củ quả hữu cơ, thực phẩm sạch theo mùa',
      'Sản phẩm chăm sóc sức khỏe, gia dụng xanh',
      'Sản phẩm địa phương và thủ công tự nhiên',
    ],
    highlight: 'Tiêu chuẩn kiểm định nghiêm ngặt BMQ Standard',
  },
  {
    id: 3,
    number: '3',
    title: 'KHÁCH HÀNG MỤC TIÊU',
    icon: 'Users',
    items: [
      'Gia đình trẻ quan tâm sức khỏe & dinh dưỡng con trẻ',
      'Người ăn chay, eat clean, theo đuổi lối sống lành',
      'Người yêu thiên nhiên, thực hành sống xanh',
      'Cộng đồng yêu nông nghiệp bền vững & hữu cơ',
    ],
    highlight: 'Tỷ lệ khách hàng trung thành quay lại > 75%',
  },
  {
    id: 4,
    number: '4',
    title: 'DOANH THU DỰ KIẾN',
    icon: 'TrendingUp',
    items: [
      'Tháng đầu: 150 – 200 triệu VNĐ (Khai trương & truyền thông)',
      'Tháng 6: 400 – 600 triệu VNĐ (Ổn định điểm bán & online)',
      'Tháng 12: 700 triệu – 1 tỷ VNĐ (Mở rộng chuỗi cộng đồng)',
      'Tăng trưởng nhờ cộng đồng và khách hàng trung thành',
    ],
    highlight: 'Dòng tiền dương từ tháng thứ 3 vận hành',
  },
  {
    id: 5,
    number: '5',
    title: 'CHI PHÍ DỰ KIẾN',
    icon: 'PieChart',
    items: [
      'Mặt bằng & vận hành: 30%',
      'Nhân sự chuyên môn & hỗ trợ: 25%',
      'Nhập hàng & thu mua nông hộ: 40%',
      'Marketing & trải nghiệm cộng đồng: 5%',
    ],
    highlight: 'Tối ưu chi phí nhờ nguồn hàng trực tiếp Bách Mộc',
  },
  {
    id: 6,
    number: '6',
    title: 'KÊNH BÁN HÀNG',
    icon: 'ShoppingBag',
    items: [
      'Bán trực tiếp tại cửa hàng (Station trải nghiệm)',
      'Kênh online: Facebook, Zalo, Website biostation.vn',
      'Giao hàng tận nơi bằng đội xe giao vận xanh',
      'Hợp tác với doanh nghiệp & cộng đồng (B2B Gift Set)',
    ],
    highlight: 'Omnichannel mượt mà tích hợp Zalo OA & Web App',
  },
  {
    id: 7,
    number: '7',
    title: 'KẾ HOẠCH MARKETING',
    icon: 'Megaphone',
    items: [
      'Sự kiện khai trương & trải nghiệm dùng thử miễn phí',
      'Workshop định kỳ: Làm rau mầm, trà hoa, sống xanh',
      'Chương trình thành viên Bách Mộc Club',
      'Nội dung truyền cảm hứng về sống thuận tự nhiên',
    ],
    highlight: 'Chạm cảm xúc – Lan tỏa từ giá trị tử tế',
  },
];

export const ROADMAP_STAGES: RoadmapStage[] = [
  {
    step: 1,
    title: 'STATION TRUNG TÂM',
    subTitle: 'Trung Tâm Điều Phối & Đào Tạo',
    description:
      'Điểm trung tâm do Bách Mộc trực tiếp vận hành và kiểm chứng, đào tạo nhân sự và điều phối nguồn hàng.',
    icon: 'Building2',
    status: 'active',
  },
  {
    step: 2,
    title: 'STATION CỘNG ĐỒNG',
    subTitle: 'Điểm Chạm Khu Dân Cư',
    description:
      'Điểm nhỏ tại khu dân cư, chung cư, trường học, phục vụ cộng đồng dân cư xung quanh.',
    icon: 'Home',
    status: 'active',
  },
  {
    step: 3,
    title: 'ĐIỂM ĐỐI TÁC',
    subTitle: 'Hợp Tác Phân Phối',
    description:
      'Hợp tác với cửa hàng, nhà hàng, doanh nghiệp, trường học để phân phối sản phẩm BMQ.',
    icon: 'Handshake',
    status: 'expanding',
  },
  {
    step: 4,
    title: 'MẠNG LƯỚI PHÂN PHỐI HỮU CƠ TOÀN QUỐC',
    subTitle: 'Hệ Sinh Thái Rộng Khắp',
    description:
      'Kết nối dữ liệu, nguồn hàng và cộng đồng nông nghiệp sạch trên toàn quốc.',
    icon: 'Network',
    status: 'planned',
  },
];

export const DEVELOPMENT_PRINCIPLES: Principle[] = [
  {
    id: 1,
    title: 'Một nguồn hàng chung',
    subTitle: 'Đảm bảo kiểm soát chất lượng từ vườn nông hộ Bách Mộc',
    icon: 'Sprout',
  },
  {
    id: 2,
    title: 'Một chuẩn BMQ',
    subTitle: 'Tiêu chuẩn sản phẩm Qualified by Bách Mộc',
    icon: 'Award',
  },
  {
    id: 3,
    title: 'Một hệ thống dữ liệu',
    subTitle: 'Đồng bộ đơn hàng, kho bãi & thông tin thành viên',
    icon: 'Database',
  },
  {
    id: 4,
    title: 'Một quy trình vận hành',
    subTitle: 'Chuẩn hóa trải nghiệm dịch vụ & bảo quản tươi ngon',
    icon: 'Cog',
  },
  {
    id: 5,
    title: 'Một nhận diện thương hiệu',
    subTitle: 'Đồng nhất hình ảnh BiO Station – Chạm để trở về',
    icon: 'Sparkles',
  },
];
