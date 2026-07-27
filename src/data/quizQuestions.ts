import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Gia đình bạn quan tâm nhất đến tiêu chí nào khi lựa chọn thực phẩm hàng ngày?',
    description: 'BiO Station giúp cá nhân hóa giải pháp dinh dưỡng & nông sản sạch cho mái ấm của bạn.',
    options: [
      {
        label: 'Nguồn gốc 100% hữu cơ, không dư lượng thuốc trừ sâu & hóa chất bảo quản',
        scores: { OrganicFocus: 3, FamilyHealth: 2 }
      },
      {
        label: 'Gạo ngon dẻo thơm, an toàn chỉ số đường huyết cho trẻ em & người lớn tuổi',
        scores: { RiceFocus: 3, FamilyHealth: 2 }
      },
      {
        label: 'Sản phẩm thiên nhiên thanh lọc cơ thể, mật ong thô & trà thảo mộc',
        scores: { WellnessFocus: 3, DetoxFocus: 2 }
      },
      {
        label: 'Lối sống xanh tổng thể: Bao gồm cả nông sản sạch & đồ dùng gia dụng sinh học',
        scores: { EcoLiving: 3, FamilyHealth: 1 }
      }
    ]
  },
  {
    id: 2,
    question: 'Tần suất nấu ăn tại nhà của gia đình bạn như thế nào?',
    description: 'Giúp BiO Station đề xuất gói giao hàng hoặc dung tích sản phẩm tối ưu.',
    options: [
      {
        label: 'Nấu ăn hàng ngày (2-3 bữa/ngày cho cả gia đình 3-5 người)',
        scores: { FamilyHealth: 3, RiceFocus: 2 }
      },
      {
        label: 'Nấu ăn 3-4 ngày/tuần (Ưu tiên bữa ăn lành, eat clean & chay sinh thái)',
        scores: { OrganicFocus: 3, WellnessFocus: 1 }
      },
      {
        label: 'Bận rộn, ưu tiên các món chế biến nhanh nhưng phải đảm bảo nguồn gốc sạch',
        scores: { OrganicFocus: 2, WellnessFocus: 2 }
      }
    ]
  },
  {
    id: 3,
    question: 'Bạn mong muốn trải nghiệm dịch vụ nào nhất tại BiO Station?',
    description: 'Điểm chạm đa dạng tại BiO Station đáp ứng nhu cầu trải nghiệm của bạn.',
    options: [
      {
        label: 'Giao giỏ hàng nông sản hữu cơ BMQ tươi mới tận nhà định kỳ mỗi tuần',
        scores: { OrganicFocus: 3, FamilyHealth: 2 }
      },
      {
        label: 'Ghé Station trải nghiệm thử nông sản, thưởng trà & tham gia workshop cộng đồng',
        scores: { EcoLiving: 3, WellnessFocus: 2 }
      },
      {
        label: 'Mua sắm gạo hữu cơ Bách Mộc & sản phẩm quà tặng nông sản xanh tử tế',
        scores: { RiceFocus: 3, OrganicFocus: 1 }
      }
    ]
  }
];
