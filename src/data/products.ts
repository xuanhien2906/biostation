import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // --- SẢN PHẨM CHÍNH: GẠO & NÔNG SẢN SẠCH ---
  {
    id: 'prod-gao-bach-moc',
    name: 'Gạo Hữu Cơ Bách Mộc ST25',
    subtitle: 'Lúa Tôm Thuận Tự Nhiên - Chuẩn BMQ (Túi 5kg)',
    category: 'Gạo & Nông Sản',
    price: 225000,
    originalPrice: 260000,
    rating: 4.95,
    reviewCount: 3820,
    badge: 'BESTSELLER BMQ',
    isMainSaleProduct: true,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    description: 'Gạo Bách Mộc trồng theo phương pháp canh tác thuận tự nhiên trên vùng đất lúa tôm sinh thái, không phân bón hóa học, không thuốc trừ sâu, giữ trọn vị ngọt đậm đà và hương thơm dẻo mềm tự nhiên. Đây là sản phẩm cốt lõi tạo nên những thố cơm ngon tại Bếp Trải Nghiệm BiO Station.',
    keyBenefits: [
      '100% Thuần Tự Nhiên – Không hóa chất bảo quản',
      'Đạt tiêu chuẩn kiểm định BMQ (Qualified by Bách Mộc)',
      'Hạt gạo dẻo thơm, chỉ số đường huyết an toàn cho sức khỏe',
      'Đóng gói hút chân không thân thiện môi trường'
    ],
    origin: 'Cánh đồng lúa tôm sinh thái Bách Mộc - Đồng Bằng Sông Cửu Long',
    certification: 'Chứng nhận Hữu Cơ BMQ Standard #2026-BM01',
    suggestedUse: 'Nấu theo tỷ lệ 1 chén gạo : 1.1 chén nước. Khi cơm chín, ủ thêm 10 phút để hạt cơm mềm dẻo nhất.',
    bmqNote: 'Mỗi túi gạo Bách Mộc bán ra đồng thời trích 5.000đ đóng góp vào quỹ hỗ trợ nông hộ chuyển đổi canh tác hữu cơ bền vững.'
  },
  {
    id: 'prod-rau-cu-bmq',
    name: 'Combo Rau Củ Quả Hữu Cơ Tươi Mới',
    subtitle: 'Nông Sản Xanh Hái Trong Ngày (Giỏ 3kg)',
    category: 'Rau Củ Hữu Cơ',
    price: 185000,
    originalPrice: 210000,
    rating: 4.9,
    reviewCount: 2450,
    badge: 'TƯƠI MỖI NGÀY',
    isMainSaleProduct: true,
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=600&q=80',
    description: 'Túi rau củ tươi ngon thu hoạch từ vườn Bách Mộc Lâm Đồng và Củ Chi vào buổi sáng sớm, bao gồm các loại rau ăn lá, củ quả theo mùa, giàu vitamin và khoáng chất tự nhiên.',
    keyBenefits: [
      'Thu hoạch & giao trực tiếp trong vòng 6 tiếng',
      'Không dư lượng thuốc bảo vệ thực vật',
      'Rau đậm vị, ngọt tự nhiên nhờ đất giàu vi sinh',
      'Đa dạng 5-6 loại rau củ hữu cơ tươi ngon'
    ],
    origin: 'Nông trại sinh thái Bách Mộc Lâm Đồng & Củ Chi',
    certification: 'Đạt chuẩn BMQ Certified Fresh Food',
    suggestedUse: 'Bảo quản ngăn mát tủ lạnh trong túi giấy Bách Mộc để giữ độ tươi giòn từ 5 - 7 ngày.',
    bmqNote: 'BiO Station cam kết bù đổi 100% nếu sản phẩm có bất kỳ vấn đề gì về độ tươi ngon khi giao đến tay khách hàng.'
  },

  // --- THỊT & HẢI SẢN SẠCH CHUẨN BMQ ---
  {
    id: 'prod-thit-heo-sinh-thai',
    name: 'Thịt Ba Chỉ Heo Sinh Thái Củ Chi',
    subtitle: 'Nuôi Thảo Mộc - Không Kháng Sinh (Khay 500g)',
    category: 'Thịt & Hải Sản Sạch',
    price: 110000,
    originalPrice: 125000,
    rating: 4.94,
    reviewCount: 1670,
    badge: 'SẠCH 100%',
    isMainSaleProduct: true,
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=600&q=80',
    description: 'Thịt ba chỉ heo nuôi thả trang trại sinh thái Củ Chi, cho ăn thảo mộc và xơ dừa. Thịt thơm ngậy, bì giòn, tỉ lệ nạc mỡ hoàn hảo, không tồn dư chất tăng trọng hay chất tạo nạc.',
    keyBenefits: [
      'Nuôi thả sinh thái, ăn đạm thực vật & thảo mộc',
      'Không chất tăng trọng, không kháng sinh',
      'Thịt thơm ngọt tự nhiên khi luộc hoặc kho tộ',
      'Đóng khay hút chân không khép kín'
    ],
    origin: 'Trang trại sinh thái Bách Mộc - Củ Chi',
    certification: 'Kiểm định BMQ Clean Meat Standard',
    suggestedUse: 'Thích hợp làm món heo kho tộ, heo luộc chấm mắm tôm/kho quẹt trong Bữa ăn trải nghiệm.',
    bmqNote: 'Dùng chế biến món thịt kho tộ trứ danh tại Bếp Trải Nghiệm BiO Station.'
  },
  {
    id: 'prod-ga-ta-lam-dong',
    name: 'Gà Ta Thả Vườn Thảo Mộc Lâm Đồng',
    subtitle: 'Gà Chạy Bộ Đồi - Thịt Săn Chắc (Con 1.2kg)',
    category: 'Thịt & Hải Sản Sạch',
    price: 195000,
    rating: 4.97,
    reviewCount: 1420,
    badge: 'ĐẶC SẢN ĐỒI',
    image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=600&q=80',
    description: 'Gà ta giống bản địa nuôi thả tự nhiên trên vùng đồi đèo Lâm Đồng. Da vàng óng, thịt săn chắc ngọt đậm, mỡ thơm không ngấy.',
    keyBenefits: [
      'Gà thả đồi vận động tự nhiên hơn 6 tháng',
      'Thịt thơm ngon đậm vị, da giòn sần sật',
      'Cung cấp nguồn đạm lành mạnh tốt cho sức khỏe',
      'Sơ chế sạch sẽ đóng gói tươi ngon'
    ],
    origin: 'Trang trại đồi Bách Mộc - Lâm Đồng',
    certification: 'Chuẩn Nông Sản Sạch BMQ Verified',
    suggestedUse: 'Làm món gà luộc lá chanh, gà xào sả ớt hoặc hầm sâm thảo mộc.',
    bmqNote: 'Món ăn chính được vô cùng yêu thích tại các Bữa ăn trải nghiệm gia đình.'
  },
  {
    id: 'prod-trung-ga-thao-moc',
    name: 'Trứng Gà Thảo Mộc Bách Mộc',
    subtitle: 'Lòng Đỏ Đậm Vị - Giàu Omega-3 (Hộp 10 Quả)',
    category: 'Thịt & Hải Sản Sạch',
    price: 480000 / 10,
    rating: 4.91,
    reviewCount: 2890,
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=600&q=80',
    description: 'Trứng gà từ đàn gà thả vườn ăn thảo mộc tía tô, đinh lăng. Lòng đỏ to dẻo, thơm ngậy, không có mùi tanh khó chịu.',
    keyBenefits: [
      'Giàu DHA, Omega-3 & Vitamin A, E tự nhiên',
      'Lòng đỏ chiếm >60% quả trứng, ngậy thơm',
      'Không dư lượng hóa chất chăn nuôi',
      'An toàn cho em bé và mẹ bầu'
    ],
    origin: 'Trang trại gia cầm sinh thái Bách Mộc',
    certification: 'Chứng nhận BMQ Egg Standard',
    suggestedUse: 'Chiên đốm hành, luộc lòng đào hoặc làm bánh tráng miệng.',
    bmqNote: 'Nguyên liệu làm món trứng chiên thảo mộc trong gói bữa ăn trải nghiệm.'
  },

  // --- MẬT ONG & NÔNG SẢN BÁCH MỘC ---
  {
    id: 'prod-mat-ong-bio',
    name: 'Mật Ong Rừng Tự Nhiên BiO Honey',
    subtitle: 'Mật Ong Hoa Rừng Nguyên Chất (Hũ Thuỷ Tinh 500ml)',
    category: 'Mật Ong & Tự Nhiên',
    price: 290000,
    originalPrice: 340000,
    rating: 4.98,
    reviewCount: 1980,
    badge: 'THIÊN NHIÊN 100%',
    image: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=600&q=80',
    description: 'Mật ong hoa rừng tự nhiên Bách Mộc được thu hoạch từ các vùng rừng sinh thái nguyên sinh. Mật có màu vàng óng, sánh mịn, hương thơm đặc trưng của hoa rừng và giàu enzym sống có lợi.',
    keyBenefits: [
      'Mật ong nguyên chất 100% không qua đun nấu',
      'Giàu enzym tự nhiên, khoáng chất & chất chống oxy hóa',
      'Hỗ trợ tiêu hóa, làm dịu họng, tăng sức đề kháng',
      'Đóng chai thủy tinh bảo quản tối ưu'
    ],
    origin: 'Rừng sinh thái Tây Nguyên - Bách Mộc Nature Preserve',
    certification: 'Kiểm định hàm lượng đường & enzym BMQ Verified',
    suggestedUse: 'Pha 2 thìa mật ong với 200ml nước ấm và vài giọt chanh tươi uống mỗi sáng.',
    bmqNote: 'Mật ong tự nhiên có thể kết tinh ở nhiệt độ lạnh. Đây là hiện tượng hoàn toàn tự nhiên của mật ong thô nguyên chất.'
  },
  {
    id: 'prod-gio-hang-gia-dinh',
    name: 'Giỏ Hàng Gia Đình BiO Station',
    subtitle: 'Thực Phẩm & Nông Sản Sạch Trọn Tuần (Gói Family)',
    category: 'Bộ Sản Phẩm Gia Đình',
    price: 680000,
    originalPrice: 790000,
    rating: 5.0,
    reviewCount: 1240,
    badge: 'TIẾT KIỆM 15%',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    description: 'Giải pháp đi chợ thông minh trọn tuần cho gia đình 3-5 người. Bao gồm 5kg gạo Bách Mộc, 4kg rau củ hữu cơ, thịt heo sinh thái, 1 hũ mật ong BiO Honey và gia vị tự nhiên.',
    keyBenefits: [
      'Đầy đủ thực phẩm xanh & gạo ngon cho cả tuần',
      'Tiết kiệm 15% so với mua lẻ từng sản phẩm',
      'Giao hàng định kỳ miễn phí tận nhà',
      'Tặng kèm túi vải canvas cao cấp BiO Station'
    ],
    origin: 'Hệ sinh thái Nông Sản Bách Mộc',
    certification: 'Chuẩn đồng bộ Hệ sinh thái BMQ',
    suggestedUse: 'Đăng ký gói giao hàng tuần/tháng để nhận thêm ưu đãi tích điểm Bách Mộc Club.',
    bmqNote: 'Giỏ hàng gia đình giúp các bà mẹ yên tâm hoàn toàn về nguồn gốc bữa ăn lành cho các con yêu.'
  },
  {
    id: 'prod-tra-thao-moc',
    name: 'Trà Thảo Mộc Bách Mộc Bát Bảo',
    subtitle: 'Nước Uống Thanh Lọc Sức Khỏe (Hộp 20 Túi Lọc)',
    category: 'Mật Ong & Tự Nhiên',
    price: 135000,
    rating: 4.9,
    reviewCount: 1120,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    description: 'Sự kết hợp tinh tế từ 8 vị thảo mộc tự nhiên: Hoa cúc, kỷ tử, táo đỏ, hoa lài, cỏ ngọt, đinh hương, lá bồ công anh và tía tô sạch từ nông trại Bách Mộc.',
    keyBenefits: [
      'Giúp thanh nhiệt, giải độc gan & ngủ ngon giấc',
      'Vị ngọt nhẹ tự nhiên từ cỏ ngọt, không đường',
      'An thần, giảm căng thẳng mệt mỏi công việc',
      'Đóng gói túi lọc sinh học tự phân hủy'
    ],
    origin: 'Vườn dược liệu Bách Mộc - Lâm Đồng',
    certification: 'BMQ Botanical Organic Standard',
    suggestedUse: 'Hãm 1 túi lọc với 300ml nước sôi trong 5 phút. Có thể uống nóng hoặc thêm đá tùy thích.',
    bmqNote: 'Thích hợp dùng thưởng trà chiều tại Station hoặc dùng tại văn phòng làm việc mỗi ngày.'
  }
];
