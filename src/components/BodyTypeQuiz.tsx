import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { Sprout, CheckCircle2, ArrowRight, RotateCcw, ShieldCheck, Sparkles, Heart } from 'lucide-react';

interface BodyTypeQuizProps {
  onGoToShop: () => void;
}

export const BodyTypeQuiz: React.FC<BodyTypeQuizProps> = ({ onGoToShop }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [questionId: number]: number }>({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    const updated = { ...userAnswers, [questionId]: optionIndex };
    setUserAnswers(updated);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setUserAnswers({});
    setQuizCompleted(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-[#2d241e] space-y-8">
      {/* Quiz Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#274e23]/10 text-[#274e23] text-xs font-bold uppercase tracking-wider">
          <Sprout className="w-4 h-4 text-amber-600" />
          Đánh Giá Sống Thuận Tự Nhiên 2 Phút
        </div>

        <h2 className="text-3xl sm:text-4xl font-black font-serif text-[#274e23]">
          Gợi Ý Giải Pháp Thực Phẩm Lành Cho Gia Đình
        </h2>

        <p className="text-[#5c4d43] text-sm max-w-xl mx-auto leading-relaxed">
          Trả lời 3 câu hỏi ngắn để BiO Station đề xuất giỏ nông sản hữu cơ BMQ và loại gạo Bách Mộc phù hợp nhất với gia đình bạn.
        </p>
      </div>

      {!quizCompleted ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e2d5c3] shadow-md space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-[#7a6858]">
              <span>Câu hỏi {currentStep + 1} / {QUIZ_QUESTIONS.length}</span>
              <span>{Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}% hoàn thành</span>
            </div>
            <div className="w-full h-2 bg-[#f0e6d8] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#274e23] transition-all duration-300"
                style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Title */}
          <div className="space-y-2 pt-2">
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#274e23]">
              {QUIZ_QUESTIONS[currentStep].question}
            </h3>
            <p className="text-xs text-[#5c4d43]">
              {QUIZ_QUESTIONS[currentStep].description}
            </p>
          </div>

          {/* Options Grid */}
          <div className="space-y-3 pt-2">
            {QUIZ_QUESTIONS[currentStep].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(QUIZ_QUESTIONS[currentStep].id, idx)}
                className="w-full text-left p-4 rounded-2xl bg-[#fbf8f3] border border-[#e2d5c3] hover:border-[#274e23] hover:bg-[#f2e9dc] transition-all duration-200 flex items-center justify-between group cursor-pointer"
              >
                <span className="text-sm font-semibold text-[#2d241e] group-hover:text-[#274e23]">
                  {opt.label}
                </span>
                <ArrowRight className="w-4 h-4 text-[#a89584] group-hover:text-[#274e23] transition-transform group-hover:translate-x-1 shrink-0 ml-3" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Quiz Completed Results Screen */
        <div className="bg-white rounded-3xl p-8 border border-[#e2d5c3] shadow-lg space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-[#274e23] text-white mx-auto flex items-center justify-center font-bold text-2xl shadow-md">
            ✓
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black font-serif text-[#274e23]">
              Gói Đề Xuất Phù Hợp: Giỏ Hàng Gia Đình BiO Station
            </h3>
            <p className="text-sm text-[#5c4d43] max-w-lg mx-auto leading-relaxed">
              Dựa trên câu trả lời, gia đình bạn thích hợp nhất với <span className="font-bold text-[#274e23]">Gạo ST25 Bách Mộc Hữu Cơ</span> kết hợp với <span className="font-bold text-[#274e23]">Giỏ Rau Củ Quả BMQ Tươi Mỗi Ngày</span>.
            </p>
          </div>

          <div className="bg-[#f4ebe0] p-6 rounded-2xl border border-[#e2d5c3] text-left space-y-3 max-w-lg mx-auto text-xs text-[#3d3229]">
            <div className="font-bold text-[#274e23] text-sm font-serif flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" /> Giải pháp dinh dưỡng cho gia đình:
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#274e23] shrink-0 mt-0.5" />
                <span><strong className="text-[#274e23]">Gạo Bách Mộc ST25:</strong> Dẻo thơm tự nhiên, thuần lúa tôm sinh thái an toàn đường huyết.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#274e23] shrink-0 mt-0.5" />
                <span><strong className="text-[#274e23]">Rau củ hữu cơ BMQ:</strong> Hái trực tiếp buổi sáng từ Lâm Đồng, tươi nguyên hương vị.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#274e23] shrink-0 mt-0.5" />
                <span><strong className="text-[#274e23]">Mật ong BiO Honey:</strong> Thêm 2 thìa mật ong chanh ấm mỗi sáng tăng đề kháng.</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onGoToShop}
              className="px-6 py-3.5 bg-[#274e23] hover:bg-[#1e3e1a] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md cursor-pointer flex items-center gap-2"
            >
              <span>Xem Giỏ Hàng Đề Xuất</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>

            <button
              onClick={handleReset}
              className="px-5 py-3.5 bg-[#f0e6d8] hover:bg-[#e4d6c2] text-[#274e23] font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Đánh Giá Lại</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
