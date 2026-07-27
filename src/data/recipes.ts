import { Recipe } from '../types';

export const RECIPES: Recipe[] = [
  {
    id: 'rec-com-bach-moc-cuon-la-lot',
    title: 'Cơm Gạo Hữu Cơ Bách Mộc Cuộn Củ Quả & Nấm',
    category: 'Bữa Ăn Lành',
    prepTime: '15 phút',
    cookTime: '20 phút',
    servings: 3,
    calories: 340,
    organicPercent: 100,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    description: 'Bữa ăn thuần tự nhiên đong đầy hương vị quê nhà. Cơm gạo Bách Mộc dẻo thơm kết hợp nấm đùi gà, cà rốt hữu cơ BMQ và hạt sen thanh mát.',
    ingredients: [
      '200g gạo hữu cơ Bách Mộc ST25',
      '100g nấm đùi gà hữu cơ tươi',
      '1 củ cà rốt hữu cơ BMQ thái hạt lựu',
      '50g hạt sen tươi hấp chín',
      '2 thìa dầu mè nguyên chất Bách Mộc',
      'Hành taro, muối biển tự nhiên & tiêu thơm'
    ],
    instructions: [
      'Vo nhẹ gạo Bách Mộc 1 lần, nấu cơm dẻo vừa tới.',
      'Sơ chế nấm đùi gà và cà rốt thái nhỏ, xào nhẹ với dầu mè và chút muối biển.',
      'Trộn đều cơm nóng với rau củ xào và hạt sen.',
      'Trình bày ra đĩa ăn kèm rau sống hữu cơ tươi ngon hái trong ngày.'
    ],
    bmqTip: 'Gạo Bách Mộc giữ nguyên lớp cám vi chất tự nhiên, cung cấp năng lượng bền vững cho cả gia đình.'
  },
  {
    id: 'rec-canh-rau-cu-bmq',
    title: 'Canh Rau Củ Hữu Cơ BMQ Thập Cẩm Thanh Lọc',
    category: 'Món Rau Củ',
    prepTime: '10 phút',
    cookTime: '15 phút',
    servings: 4,
    calories: 180,
    organicPercent: 100,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80',
    description: 'Bát canh ngọt mát tự nhiên từ củ bắp ngọt, bí đỏ, củ cải trắng và nấm hương tươi Bách Mộc. Không cần hạt nêm hóa chất.',
    ingredients: [
      '1/2 củ bắp mỹ ngọt hữu cơ',
      '150g bí đỏ hữu cơ BMQ',
      '1 củ cải trắng, 50g nấm hương tươi',
      'Hành lá, ngò rí tươi Bách Mộc',
      'Muối hột tự nhiên & tiêu hạt giã tay'
    ],
    instructions: [
      'Cắt bắp, bí đỏ, củ cải thành miếng vừa ăn.',
      'Đun sôi 1.2 lít nước tinh khiết, cho bắp và củ cải vào hầm nhẹ 10 phút lấy vị ngọt tự nhiên.',
      'Cho bí đỏ và nấm hương vào đun tiếp 5 phút.',
      'Nêm muối biển tự nhiên, tắt bếp và rắc hành ngò tươi.'
    ],
    bmqTip: 'Vị ngọt đậm đà hoàn toàn đến từ rau củ quả tươi hái trong ngày tại trang trại Bách Mộc.'
  },
  {
    id: 'rec-tra-mat-ong-chanh-bio',
    title: 'Trà Mật Ong BiO Honey & Chanh Tươi Ấm Bụng',
    category: 'Thức Uống Thanh Lọc',
    prepTime: '5 phút',
    cookTime: '0 phút',
    servings: 1,
    calories: 60,
    organicPercent: 100,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    description: 'Thức uống dưỡng sinh khởi đầu ngày mới năng lượng. Mật ong hoa rừng BiO Honey kết hợp chanh đào tươi và gừng ta ấm áp.',
    ingredients: [
      '2 thìa canh mật ong rừng BiO Honey',
      '1/2 quả chanh tươi vắt lấy nước',
      '3 lát gừng tươi thái mỏng',
      '200ml nước ấm 45 độ C'
    ],
    instructions: [
      'Cho gừng tươi vào ly nước ấm hãm trong 3 phút.',
      'Cho nước cốt chanh tươi và mật ong BiO Honey vào khuấy nhẹ.',
      'Thưởng thức vào buổi sáng sớm trước bữa ăn 30 phút.'
    ],
    bmqTip: 'Lưu ý không dùng nước quá sôi để giữ trọn vẹn các enzym sống quý giá trong mật ong thô Bách Mộc.'
  }
];
