import { BusinessBlock, RoadmapStage, Principle } from '../types';

export const BUSINESS_MISSION = {
  pageTitle: 'Hệ Sinh Thái BiO Station',
  pageSubtitle: 'Mô hình kinh doanh tích hợp từ nông trại hữu cơ đến trạm trải nghiệm, mang lại giá trị thật cho sức khỏe người dùng và người nông dân.',
  missionLabel: 'Sứ mệnh:',
  missionText: 'BiO Station – Chạm để trở về: trở về với thiên nhiên, với bản thể gốc của chính mình. Hệ thống trạm trải nghiệm kết nối con người với thiên nhiên qua nông sản thuần tự nhiên, chuẩn BMQ Qualified.',
  blocksSectionTitle: '3 Trụ Cột Trong Mô Hình Kinh Doanh BiO Station',
  blocksSectionSubtitle: 'Cấu trúc vận hành đồng bộ hóa từ nguồn hàng Bách Mộc tới trải nghiệm người dùng',
  topBadgeText: 'Mô Hình Kinh Doanh Chuẩn Quốc Gia',
  roadmapSectionTitle: '4 Giai Đoạn Phát Triển Hệ Thống',
  roadmapSectionSubtitle: 'Lộ trình mở rộng bền vững từ trung tâm điều phối tới toàn quốc',
  principlesSectionTitle: '5 Nguyên Tắc Phát Triển Chuỗi',
  principlesSectionSubtitle: 'Đảm bảo tính đồng nhất chất lượng và niềm tin thương hiệu Bách Mộc trên toàn hệ thống',
  partnershipImageUrl: '/partnership.png',
  title: 'KẾ HOẠCH KINH DOANH BiO Station',
  subTitle: 'MÔ HÌNH: TRẢI NGHIỆM – BÁN LẺ – KẾT NỐI THUẬN TỰ NHIÊN',
  coreValues: [
    {
      name: 'Bản chất & Trải nghiệm',
      desc: 'Nhìn • Chạm • Ngửi • Nếm',
      detail: 'Đánh thức trọn vẹn 4 giác quan qua nông sản thuận mùa đạt chuẩn hữu cơ cao nhất.',
      icon: 'ShieldCheck',
    },
    {
      name: 'Sứ mệnh & Vận hành',
      desc: 'Chia sẻ • Trải nghiệm • Kết nối • Phân phối',
      detail: 'Cầu nối trực tiếp giữa người nông dân canh tác với người tiêu dùng tử tế.',
      icon: 'CheckCircle2',
    },
    {
      name: 'Tiêu chuẩn BMQ',
      desc: 'Canh tác thuận tự nhiên',
      detail: 'Kiểm định nghiêm ngặt, minh bạch, trách nhiệm với đất đai và hệ sinh thái.',
      icon: 'Sprout',
    },
  ],
};

export const BUSINESS_BLOCKS: BusinessBlock[] = [
  {
    id: 1,
    title: 'TRỤ CỘT 1: BẢN CHẤT & TRẢI NGHIỆM',
    icon: 'Store',
    items: [
      'Hệ thống trạm trải nghiệm kết nối con người với thiên nhiên qua nông sản thuần tự nhiên',
      'Đa giác quan: Nhìn - Chạm - Ngửi - Nếm sản vật thuận mùa đạt chuẩn hữu cơ cao nhất',
      'Không gian sống chậm để cảm nhận sự sống và tìm về giá trị nguyên sơ an lành',
      'Điểm chạm trải nghiệm trực tiếp: Thưởng thức mâm cơm hữu cơ, trà hoa & nước ép bản địa',
    ],
    highlight: 'Đánh thức 4 giác quan & không gian sống chậm',
  },
  {
    id: 2,
    title: 'TRỤ CỘT 2: SỨ MỆNH & VẬN HÀNH',
    icon: 'Users',
    items: [
      'CHIA SẺ: Lan tỏa lối sống thuận tự nhiên đến từng gia đình',
      'TRẢI NGHIỆM: Chân thực về sản vật bản địa và văn hóa ẩm thực truyền thống',
      'KẾT NỐI: Cầu nối trực tiếp giữa người nông dân canh tác với người tiêu dùng',
      'PHÂN PHỐI: Cung ứng nông sản sạch, phát triển Cộng đồng Tiêu dùng Thuần tự nhiên',
    ],
    highlight: 'Chia sẻ – Trải nghiệm – Kết nối – Phân phối',
  },
  {
    id: 3,
    title: 'TRỤ CỘT 3: TIÊU CHUẨN BMQ',
    icon: 'Wheat',
    items: [
      'Nguồn hàng từ Cộng đồng Canh tác Thuận tự nhiên khắp các vùng miền',
      'Lấy hệ tiêu chuẩn BMQ (Bách Mộc) làm nền tảng lựa chọn, đánh giá chất lượng',
      'Đảm bảo canh tác nghiêm ngặt, minh bạch, trách nhiệm với đất đai và hệ sinh thái',
      'Gạo ST25 Bách Mộc, rau củ hữu cơ hái sớm & thực phẩm sinh thái tử tế',
    ],
    highlight: '100% Thuận tự nhiên, minh bạch với đất đai & hệ sinh thái',
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
