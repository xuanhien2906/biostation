import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // ==========================================
  // I. GẠO HỮU CƠ QUỐC TẾ (USDA, JAS, EU, Canada)
  // Quy cách: 452g/gói. Giá niêm yết theo gói.
  // ==========================================
  {
    id: 'prod-gao-trang-xat-doi',
    name: 'Gạo Trắng Xát Dối Bách Mộc',
    subtitle: 'Hữu Cơ Quốc Tế (USDA, JAS, EU, Canada) - Gói 452g',
    category: 'Gạo',
    price: 75000,
    originalPrice: 85000,
    unit: 'Gói 452g',
    rating: 4.95,
    reviewCount: 3820,
    badge: 'CHUẨN QUỐC TẾ',
    isMainSaleProduct: true,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    description: 'Gạo Trắng Xát Dối Bách Mộc đạt đồng thời 4 chứng nhận hữu cơ quốc tế khắt khe: USDA Organic (Mỹ), JAS (Nhật Bản), Liên minh Châu Âu (EU) và Canada. Hạt gạo chỉ xát dối nhẹ lớp vỏ trấu, giữ lại lớp cám mỏng giàu vitamin nhóm B, khoáng chất và chất xơ tự nhiên. Cơm mềm dẻo, ngọt hậu đậm đà và an lành tuyệt đối.',
    keyBenefits: [
      'Chứng nhận hữu cơ quốc tế: USDA, JAS, EU, Canada',
      'Xát dối giữ trọn lớp cám dinh dưỡng tự nhiên',
      'Không phân bón hóa học, không thuốc bảo vệ thực vật, không chất bảo quản',
      'Đóng gói hút chân không 452g tiêu chuẩn quốc tế'
    ],
    origin: 'Cánh đồng hữu cơ Bách Mộc - Đạt chuẩn USDA Organic',
    certification: 'USDA Organic (Mỹ) | JAS (Nhật Bản) | EU (Châu Âu) | Canada Organic',
    suggestedUse: 'Vo nhẹ tay 1-2 lần. Tỷ lệ nấu chuẩn: 1 phần gạo : 1.1 - 1.2 phần nước. Khi chín ủ thêm 10 phút để hạt cơm dẻo mềm thơm ngon.',
    bmqNote: 'Quy cách gói 452g tiện lợi, bảo quản tối ưu vi chất dinh dưỡng nguyên bản của hạt gạo.'
  },
  {
    id: 'prod-gao-trang-nguyen-cam',
    name: 'Gạo Trắng Nguyên Cám Bách Mộc',
    subtitle: 'Hữu Cơ Quốc Tế (USDA, JAS, EU, Canada) - Gói 452g',
    category: 'Gạo',
    price: 90000,
    originalPrice: 105000,
    unit: 'Gói 452g',
    rating: 4.96,
    reviewCount: 2950,
    badge: 'GIÀU DINH DƯỠNG',
    isMainSaleProduct: true,
    image: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=600&q=80',
    description: 'Gạo Trắng Nguyên Cám Bách Mộc giữ nguyên 100% lớp vỏ cám và phôi mầm gạo - nơi tập trung hơn 70% giá trị dinh dưỡng của hạt lúa. Đạt đầy đủ các chứng nhận hữu cơ uy tín toàn cầu (USDA, JAS, EU, Canada). Rất thích hợp cho người theo đuổi lối sống thực dưỡng, bảo vệ tim mạch và duy trì chỉ số đường huyết ổn định.',
    keyBenefits: [
      '100% Nguyên cám & mầm phôi dinh dưỡng tự nhiên',
      'Đạt 4 chứng nhận hữu cơ quốc tế: USDA, JAS, EU, Canada',
      'Giàu chất xơ, vitamin B1, B6, E và khoáng chất Magie, Kẽm',
      'Hương vị bùi béo tự nhiên, chỉ số GI an toàn'
    ],
    origin: 'Trang trại sinh thái hữu cơ Bách Mộc',
    certification: 'USDA Organic | JAS | EU Organic | Canada Organic',
    suggestedUse: 'Ngâm gạo trước khi nấu 20-30 phút để cơm mềm ngon nhất. Tỷ lệ 1 gạo : 1.25 nước.',
    bmqNote: 'Nguyên liệu vàng cho các bữa cơm thực dưỡng và bảo vệ sức khỏe cả gia đình.'
  },
  {
    id: 'prod-gao-do-nguyen-cam',
    name: 'Gạo Đỏ Nguyên Cám Bách Mộc',
    subtitle: 'Hữu Cơ Quốc Tế (USDA, JAS, EU, Canada) - Gói 452g',
    category: 'Gạo',
    price: 100000,
    originalPrice: 115000,
    unit: 'Gói 452g',
    rating: 4.98,
    reviewCount: 2180,
    badge: 'HỮU CƠ CAO CẤP',
    isMainSaleProduct: true,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    description: 'Gạo Đỏ Nguyên Cám Bách Mộc sở hữu sắc đỏ ruby tự nhiên từ chất chống oxy hóa Iron & Antioxidant hữu cơ. Canh tác thuận tự nhiên đạt chuẩn USDA, JAS, EU và Canada. Hạt gạo đậm vị, thơm bùi, cung cấp lượng sắt và chất xơ dồi dào, hỗ trợ tái tạo máu và thanh lọc cơ thể hiệu quả.',
    keyBenefits: [
      'Sắc đỏ tự nhiên giàu Sắt hữu cơ và hợp chất chống oxy hóa',
      'Chứng nhận hữu cơ quốc tế: USDA, JAS, EU, Canada',
      'Hỗ trợ bổ máu, tăng cường đề kháng và kiểm soát cân nặng',
      'Hạt gạo thơm ngọt đậm đà, no lâu không đầy bụng'
    ],
    origin: 'Cánh đồng sinh thái Bách Mộc',
    certification: 'USDA Organic | JAS | EU Organic | Canada',
    suggestedUse: 'Ngâm gạo khoảng 30 phút trước khi nấu. Nấu theo tỷ lệ 1 gạo : 1.3 nước.',
    bmqNote: 'Món cơm gạo đỏ nguyên cám là điểm nhấn đặc sắc trong Menu Cơm Trải Nghiệm BiO Station.'
  },
  {
    id: 'prod-gao-tim-nguyen-cam',
    name: 'Gạo Tím Nguyên Cám Bách Mộc',
    subtitle: 'Hữu Cơ Quốc Tế (USDA, JAS, EU, Canada) - Gói 452g',
    category: 'Gạo',
    price: 120000,
    originalPrice: 140000,
    unit: 'Gói 452g',
    rating: 5.0,
    reviewCount: 1890,
    badge: 'THƯỢNG HẠNG ANTHOCYANIN',
    isMainSaleProduct: true,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
    description: 'Dòng gạo tím thượng hạng của Bách Mộc chứa hàm lượng sắc tố Anthocyanin tự nhiên cực kỳ cao - hoạt chất chống oxy hóa mạnh mẽ giúp ngăn ngừa lão hóa và bảo vệ tế bào. Đạt chuẩn 4 chứng nhận hữu cơ quốc tế hàng đầu thế giới (USDA, JAS, EU, Canada).',
    keyBenefits: [
      'Giàu chất chống oxy hóa Anthocyanin tự nhiên quý giá',
      'Đạt đầy đủ 4 chứng nhận hữu cơ quốc tế uy tín',
      'Hương thơm thảo mộc đặc trưng, vị dẻo bùi đặc biệt',
      'Tốt cho người tiểu đường, tim mạch và người cao tuổi'
    ],
    origin: 'Vùng canh tác sinh thái đặc biệt Bách Mộc',
    certification: 'USDA Organic (Mỹ) | JAS (Nhật Bản) | EU | Canada Organic',
    suggestedUse: 'Tỷ lệ 1 gạo : 1.3 nước. Có thể nấu riêng hoặc trộn cùng gạo trắng xát dối để đa dạng hương vị.',
    bmqNote: 'Mỗi hạt gạo tím Bách Mộc là kết tinh của đất lành và quy trình chăm sóc thuận tự nhiên nghiêm ngặt.'
  },

  // ==========================================
  // II. GẠO HỮU CƠ VIỆT NAM (Vietnam Certified Organic)
  // ==========================================
  {
    id: 'prod-gao-lua-me-yang',
    name: 'Gạo Lúa Mẹ (YANG) Nguyên Cám',
    subtitle: 'Vietnam Certified Organic (VCO) - Gói 452g',
    category: 'Gạo',
    price: 90000,
    originalPrice: 100000,
    unit: 'Gói 452g',
    rating: 4.97,
    reviewCount: 3120,
    badge: 'LÚA MẸ YANG VCO',
    isMainSaleProduct: true,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    description: 'Gạo Lúa Mẹ (YANG) Nguyên Cám mang năng lượng thuần khiết từ giống lúa cổ bản địa canh tác theo triết lý thuận tự nhiên, đạt chứng nhận Vietnam Certified Organic (VCO). Hạt gạo lưu giữ trọn vẹn tinh túy đất trời, mang lại sự cân bằng âm dương và dinh dưỡng trọn lành cho cơ thể.',
    keyBenefits: [
      'Đạt chuẩn Chứng Nhận Hữu Cơ Việt Nam (VCO)',
      'Giống lúa cổ mang năng lượng sinh học tự nhiên dồi dào',
      'Nguyên cám giàu khoáng chất vi lượng và vitamin',
      'Cốt lõi của chương trình dinh dưỡng Cháo Lúa Mẹ BiO Station'
    ],
    origin: 'Cánh đồng sinh thái Lúa Mẹ Bách Mộc',
    certification: 'Vietnam Certified Organic (VCO)',
    suggestedUse: 'Dùng nấu cơm hoặc nấu cháo dinh dưỡng Lúa Mẹ cho người cần bồi bổ, phục hồi sinh lực.',
    bmqNote: 'Sản phẩm nền tảng trong phong trào sống xanh thuận tự nhiên của cộng đồng BiO Station.'
  },

  // ==========================================
  // III. GẠO VÙNG ĐỆM HỮU CƠ
  // ==========================================
  {
    id: 'prod-gao-vung-dem-xat-doi',
    name: 'Gạo Vùng Đệm Xát Dối Bách Mộc',
    subtitle: 'Canh Tác Sinh Thái Vùng Đệm Thuận Tự Nhiên - Gói 452g',
    category: 'Gạo',
    price: 50000,
    originalPrice: 60000,
    unit: 'Gói 452g',
    rating: 4.91,
    reviewCount: 1640,
    badge: 'VÙNG ĐỆM XANH',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    description: 'Được gieo trồng tại các vùng đệm sinh thái bao quanh khu bảo tồn tự nhiên, canh tác theo hướng hữu cơ chuyển đổi nghiêm ngặt, cách ly tuyệt đối hóa chất độc hại. Hạt gạo xát dối thơm mềm, giá thành hợp lý để mọi gia đình đều dễ dàng tiếp cận nguồn lương thực an toàn mỗi ngày.',
    keyBenefits: [
      'Canh tác vùng đệm sinh thái thuận tự nhiên',
      'Không hóa chất bảo quản, quy trình kiểm soát BMQ',
      'Hạt cơm thơm dẻo, dễ nấu, phù hợp khẩu vị cả nhà',
      'Mức giá tiếp cận nhân văn cho bữa cơm xanh hàng ngày'
    ],
    origin: 'Vùng đệm sinh thái Bách Mộc',
    certification: 'Tiêu chuẩn Kiểm định Vùng Đệm BMQ Qualified',
    suggestedUse: 'Tỷ lệ nấu: 1 chén gạo : 1.1 chén nước.',
    bmqNote: 'Mỗi gói gạo bán ra hỗ trợ nông hộ vùng đệm chuyển đổi canh tác hữu cơ bền vững.'
  },
  {
    id: 'prod-gao-vung-dem-nguyen-cam',
    name: 'Gạo Vùng Đệm Nguyên Cám Bách Mộc',
    subtitle: 'Canh Tác Sinh Thái Vùng Đệm Thuận Tự Nhiên - Gói 452g',
    category: 'Gạo',
    price: 60000,
    originalPrice: 70000,
    unit: 'Gói 452g',
    rating: 4.93,
    reviewCount: 1530,
    badge: 'NGUYÊN CÁM VÙNG ĐỆM',
    image: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=600&q=80',
    description: 'Gạo vùng đệm sinh thái giữ nguyên vỏ cám dinh dưỡng, vừa bổ dưỡng vừa kinh tế. Cung cấp trọn vẹn chất xơ, vitamin và khoáng chất tự nhiên từ vùng đất lành sinh thái.',
    keyBenefits: [
      '100% Nguyên cám tự nhiên giàu chất xơ và vitamin B',
      'Canh tác sinh thái an toàn, không phân thuốc hóa học',
      'Vị ngọt mộc mạc tự nhiên, tốt cho hệ tiêu hóa',
      'Đóng gói hút chân không 452g tiêu chuẩn'
    ],
    origin: 'Vùng đệm sinh thái Bách Mộc',
    certification: 'Tiêu chuẩn Kiểm định Vùng Đệm BMQ Qualified',
    suggestedUse: 'Ngâm 20 phút trước khi nấu. Tỷ lệ 1 gạo : 1.25 nước.',
    bmqNote: 'Lựa chọn tuyệt vời cho người muốn ăn gạo lứt/nguyên cám chất lượng với chi phí tiết kiệm.'
  },

  // ==========================================
  // IV. SẢN PHẨM CHẾ BIẾN SÂU TỪ LÚA GẠO HỮU CƠ
  // ==========================================
  {
    id: 'prod-nuoc-chiet-gao-len-men',
    name: 'Nước Chiết Gạo Lên Men Bách Mộc',
    subtitle: 'Lên Men Tự Nhiên Giàu Lợi Khuẩn - Chai 250ml',
    category: 'Màng cám gạo',
    price: 29000,
    originalPrice: 35000,
    unit: 'Chai 250ml',
    rating: 4.92,
    reviewCount: 980,
    badge: 'LÊN MEN TỰ NHIÊN',
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80',
    description: 'Nước chiết từ tinh chất gạo hữu cơ lên men theo công nghệ sinh học tự nhiên, giàu enzyme sống, lợi khuẩn probiotic và axit amin thiết yếu. Giúp làm dịu hệ tiêu hóa, thanh mát cơ thể và bổ sung năng lượng thuần khiết.',
    keyBenefits: [
      '100% Chiết xuất từ gạo hữu cơ Bách Mộc lên men',
      'Bổ sung lợi khuẩn tự nhiên giúp hệ vi sinh đường ruột khỏe mạnh',
      'Hương vị thanh mát dịu nhẹ, không chất bảo quản',
      'Đóng chai tiện lợi 250ml mang theo hằng ngày'
    ],
    origin: 'Phòng nghiên cứu chế biến sâu Bách Mộc',
    certification: 'Tiêu chuẩn Chế Biến Sâu BMQ Advanced',
    suggestedUse: 'Uống trực tiếp, ngon hơn khi ướp lạnh. Uống 1 chai mỗi ngày sau bữa ăn.',
    bmqNote: 'Thức uống thanh lọc lành mạnh được phục vụ tại các điểm trạm BiO Station.'
  },
  {
    id: 'prod-vien-dan-mang-gao',
    name: 'Viên Đan Màng Gạo Dinh Dưỡng',
    subtitle: 'Tinh Chất Màng Cám Gạo Hữu Cơ - Hũ 30 viên',
    category: 'Viên cám gạo',
    price: 199000,
    originalPrice: 240000,
    unit: 'Hũ 30 viên',
    rating: 4.97,
    reviewCount: 1420,
    badge: 'TINH HOA DINH DƯỠNG',
    isMainSaleProduct: true,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    description: 'Viên Đan Màng Gạo là sản phẩm chế biến sâu độc quyền của Bách Mộc, cô đọng tinh chất dinh dưỡng quý giá nhất từ lớp màng cám gạo hữu cơ vào dạng viên nang tiện lợi. Giàu Gamma-Oryzanol, Vitamin E tự nhiên và khoáng chất vi lượng, giúp cải thiện giấc ngủ, tăng cường tuần hoàn và chống oxy hóa mạnh mẽ.',
    keyBenefits: [
      'Hàm lượng Gamma-Oryzanol tự nhiên đậm đặc',
      'Hỗ trợ giảm cholesterol, điều hòa huyết áp & tim mạch',
      'Dạng viên tiện dụng, dễ uống, bảo toàn tối đa hoạt tính sinh học',
      'Quy cách hũ 30 viên dùng trong 1 tháng'
    ],
    origin: 'Viện sinh học chế biến sâu Bách Mộc',
    certification: 'Chứng nhận An Toàn Thực Phẩm & Kiểm định BMQ Pharma',
    suggestedUse: 'Uống 1-2 viên mỗi ngày sau bữa ăn sáng hoặc tối.',
    bmqNote: 'Món quà sức khỏe trân quý dành tặng ông bà, cha mẹ và người thân.'
  },
  {
    id: 'prod-mang-cam-gao-huu-co',
    name: 'Màng Cám Gạo Bách Mộc Hữu Cơ',
    subtitle: 'Dinh Dưỡng Đậm Đặc Từ Hạt Gạo Hữu Cơ - Hũ 300g',
    category: 'Màng cám gạo',
    price: 999000,
    originalPrice: 1200000,
    unit: 'Hũ 300g',
    rating: 5.0,
    reviewCount: 890,
    badge: 'HỮU CƠ ĐẬM ĐẶC',
    isMainSaleProduct: true,
    image: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=600&q=80',
    description: 'Màng Cám Gạo Bách Mộc Hữu Cơ là "trái tim dinh dưỡng" của hạt thóc hữu cơ đạt chuẩn quốc tế. Qua công nghệ bóc tách và ổn định enzym sinh học độc quyền, giữ trọn 120+ chất chống oxy hóa, vitamin và khoáng chất quý hiếm. Siêu thực phẩm vàng giúp phục hồi tế bào, cân bằng chuyển hóa và tăng cường sinh lực.',
    keyBenefits: [
      'Chiết xuất từ 100% màng cám gạo hữu cơ quốc tế',
      'Chứa hơn 120 hợp chất chống oxy hóa tự nhiên quý giá',
      'Giúp thanh lọc máu, trẻ hóa làn da và nâng cao hệ miễn dịch',
      'Quy cách hũ 300g cao cấp, công nghệ ổn định enzym tự nhiên'
    ],
    origin: 'Khu công nghệ cao chế biến sâu Bách Mộc',
    certification: 'USDA Organic / BMQ Deep-Processing Certified',
    suggestedUse: 'Pha 1-2 muỗng (10g) với 150ml nước ấm hoặc trộn cùng cháo, sữa chua, sinh tố, cơm nóng.',
    bmqNote: 'Siêu dinh dưỡng được tin dùng hàng đầu trong cộng đồng tiêu dùng thuận tự nhiên.'
  },
  {
    id: 'prod-mang-gao-vung-dem',
    name: 'Màng Gạo Bách Mộc Vùng Đệm',
    subtitle: 'Dinh Dưỡng Tự Nhiên Vùng Đệm Sinh Thái - Hũ 450g',
    category: 'Màng cám gạo',
    price: 999000,
    originalPrice: 1150000,
    unit: 'Hũ 450g',
    rating: 4.95,
    reviewCount: 760,
    badge: 'HŨ LỚN 450G',
    isMainSaleProduct: true,
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=600&q=80',
    description: 'Màng Gạo Bách Mộc Vùng Đệm quy cách hũ lớn 450g, được thu hoạch từ vùng lúa sinh thái vùng đệm. Sản phẩm mang lại nguồn dưỡng chất dồi dào, hàm lượng dinh dưỡng cao và khối lượng nhiều hơn, đáp ứng nhu cầu bổ sung dinh dưỡng đều đặn cho cả gia đình.',
    keyBenefits: [
      'Thu hoạch từ màng cám lúa vùng đệm sinh thái thuận tự nhiên',
      'Khối lượng lớn 450g tiết kiệm và tiện lợi cho cả gia đình',
      'Cung cấp chất xơ hòa tan, vitamin E và nhóm B tự nhiên',
      'Giúp nhuận tràng, tăng sức bền và phục hồi thể trạng'
    ],
    origin: 'Vùng đệm sinh thái Bách Mộc',
    certification: 'BMQ Standard Ecological Nutrition',
    suggestedUse: 'Pha 1-2 muỗng vào nước ấm, cháo lúa mẹ hoặc nước ép hàng ngày.',
    bmqNote: 'Giải pháp dinh dưỡng dài hạn bền vững cho sức khỏe gia đình.'
  },

  // ==========================================
  // V. SẢN PHẨM THUẦN TỰ NHIÊN KHÁC
  // ==========================================
  {
    id: 'prod-bot-chuoi-hot',
    name: 'Bột Chuối Hột Rừng Thuần Tự Nhiên',
    subtitle: 'Nguyên Chất Sấy Lạnh Giữ Trọn Dược Tính - Gói 250g',
    category: 'Sản Phẩm Khác',
    price: 99000,
    originalPrice: 120000,
    unit: 'Gói 250g',
    rating: 4.93,
    reviewCount: 840,
    badge: 'THUẦN TỰ NHIÊN',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    description: 'Bột chuối hột rừng nguyên chất thu hái từ rừng sinh thái tự nhiên, sấy lạnh công nghệ cao để bảo toàn dược tính. Hỗ trợ tiêu hóa, giải nhiệt, hỗ trợ bài sỏi thận và giảm đau nhức xương khớp theo kinh nghiệm dân gian.',
    keyBenefits: [
      '100% Chuối hột rừng tự nhiên, không pha trộn',
      'Công nghệ sấy lạnh giữ nguyên hoạt chất sinh học',
      'Hỗ trợ tiêu hóa, tốt cho thận và xương khớp',
      'Gói 250g tiện lợi bảo quản'
    ],
    origin: 'Rừng sinh thái Bách Mộc Tây Nguyên',
    certification: 'Kiểm định chất lượng BMQ Wild Organic',
    suggestedUse: 'Hòa 1 muỗng cà phê bột chuối hột vào nước ấm, uống sau bữa ăn.',
    bmqNote: 'Nông sản bản địa thuần tự nhiên vì sức khỏe cộng đồng.'
  },
  {
    id: 'prod-nuoc-ep-nhau-nano',
    name: 'Nước Ép Nhàu Nano Lên Men',
    subtitle: 'Công Nghệ Nano Tinh Chất Trái Nhàu - Chai 500ml',
    category: 'Nước nhàu',
    price: 139000,
    originalPrice: 160000,
    unit: 'Chai 500ml',
    rating: 4.96,
    reviewCount: 1680,
    badge: 'NANO LÊN MEN',
    isMainSaleProduct: true,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80',
    description: 'Nước ép từ trái nhàu chín tự nhiên qua quá trình lên men yếm khí kết hợp công nghệ phân tách Nano sinh học giúp khử hoàn toàn mùi nồng khó chịu, giữ lại hàm lượng Proxeronine và enzyme quý báu ở mức cao nhất. Giúp hạ huyết áp, giảm đau nhức cơ xương và tăng cường miễn dịch vượt trội.',
    keyBenefits: [
      'Công nghệ Nano lên men sinh học dễ uống, thơm dịu',
      'Hàm lượng Proxeronine & chất chống oxy hóa cực cao',
      'Hỗ trợ huyết áp, xương khớp, tiểu đường và giấc ngủ',
      'Chai thủy tinh 500ml sang trọng bảo quản tối ưu'
    ],
    origin: 'Vùng nguyên liệu nhàu sinh thái Bách Mộc',
    certification: 'Chứng nhận Nano Organic BMQ Verified',
    suggestedUse: 'Uống 30ml mỗi sáng trước khi ăn hoặc trước khi đi ngủ.',
    bmqNote: 'Thần dược tự nhiên của đất phương Nam được nâng tầm bằng công nghệ hiện đại.'
  },
  {
    id: 'prod-tra-thach-chau',
    name: 'Trà Thạch Châu Bách Mộc',
    subtitle: 'Thảo Mộc Thanh Lọc Tự Nhiên - Hộp 15 gói',
    category: 'Trà',
    price: 179000,
    originalPrice: 210000,
    unit: 'Hộp 15 gói',
    rating: 4.97,
    reviewCount: 1190,
    badge: 'THẢO MỘC THANH LỌC',
    isMainSaleProduct: true,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    description: 'Trà Thạch Châu là sự phối hòa tinh tế giữa các loại thảo dược rừng tự nhiên thu hái thủ công. Trà có vị ngọt thanh dịu mát, hương thơm thảo mộc an lành, giúp thanh nhiệt, mát gan, tiêu độc và mang lại giấc ngủ sâu êm dịu.',
    keyBenefits: [
      'Thảo mộc tự nhiên 100% không hương liệu hóa chất',
      'Thanh lọc cơ thể, giải độc gan và giảm căng thẳng',
      'Vị ngọt hậu tự nhiên không cần thêm đường',
      'Đóng hộp 15 gói tiện lợi pha chế nóng/lạnh'
    ],
    origin: 'Vườn thảo dược sinh thái Bách Mộc',
    certification: 'Tiêu chuẩn BMQ Herbal Standard',
    suggestedUse: 'Hãm 1 gói trà với 300 - 500ml nước sôi trong 5-7 phút. Có thể dùng cả ngày.',
    bmqNote: 'Thức trà an yên tâm trí được yêu thích hàng đầu tại không gian BiO Station.'
  },
  {
    id: 'prod-cafe-huu-co-dang-farm',
    name: 'Cafe Hữu Cơ Đặng Farm',
    subtitle: 'Cà Phê Sinh Thái Thuần Tự Nhiên - Gói 250g',
    category: 'Cafe',
    price: 199000,
    originalPrice: 230000,
    unit: 'Gói 250g',
    rating: 4.99,
    reviewCount: 2240,
    badge: 'ĐẶNG FARM ORGANIC',
    isMainSaleProduct: true,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80',
    description: 'Cafe Hữu Cơ Đặng Farm canh tác dưới tán rừng tự nhiên trên cao nguyên bazan màu mỡ. Thu hái thủ công 100% quả chín mọng, sơ chế mật ong (honey process) và rang mộc nguyên chất. Giữ trọn vị chua thanh trái cây, hậu vị ngọt kéo dài và hương thơm quyến rũ không hương liệu.',
    keyBenefits: [
      'Canh tác hữu cơ dưới tán rừng Đặng Farm',
      '100% Trái cà phê chín đỏ hái chọn lọc thủ công',
      'Rang mộc nguyên chất, không bơ, không tẩm ướp',
      'Hậu vị ngọt sâu, an lành và tỉnh thức sảng khoái'
    ],
    origin: 'Trang trại Đặng Farm - Cao nguyên Lâm Đồng',
    certification: 'Tiêu chuẩn Cà Phê Sinh Thái BMQ Specialty Coffee',
    suggestedUse: 'Thích hợp pha phin truyền thống, pha máy Espresso hoặc Pour-over.',
    bmqNote: 'Hương vị cà phê nguyên bản đánh thức nguồn năng lượng sáng tạo thuần tự nhiên.'
  }
];
