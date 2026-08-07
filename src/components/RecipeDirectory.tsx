import React, { useState } from 'react';
import { Recipe } from '../types';
import { Sprout, Clock, Users, Flame, ChevronRight, X, Sparkles } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const RecipeDirectory: React.FC = () => {
  const { siteData } = useSite();
  const recipes = siteData?.recipes || [];

  const [activeCategory, setActiveCategory] = useState<string>('Tất Cả');
  const [activeModalRecipe, setActiveModalRecipe] = useState<Recipe | null>(null);

  const categories = ['Tất Cả', 'Bữa Ăn Lành', 'Món Rau Củ', 'Thức Uống Thanh Lọc'];

  const filteredRecipes =
    activeCategory === 'Tất Cả'
      ? recipes
      : recipes.filter((r) => r.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-[#2d241e] space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#274e23]/10 text-[#274e23] text-xs font-bold uppercase tracking-wider">
          <Sprout className="w-4 h-4 text-amber-600" />
          Bếp Ăn Thuận Tự Nhiên Bách Mộc
        </div>

        <h2 className="text-3xl sm:text-4xl font-black font-serif text-[#274e23]">
          Công Thức Món Ăn Lành & Thức Uống Thanh Lọc
        </h2>

        <p className="text-[#5c4d43] text-sm max-w-2xl mx-auto leading-relaxed">
          Gợi ý món ăn ngon giầu dinh dưỡng chế biến đơn giản từ gạo hữu cơ Bách Mộc, rau củ BMQ tươi mới và mật ong rừng tự nhiên.
        </p>
      </div>

      {/* Filter Categories */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#274e23] text-white shadow-md'
                : 'bg-white text-[#5c4d43] border border-[#e2d5c3] hover:bg-[#f0e6d8]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Recipes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => setActiveModalRecipe(recipe)}
            className="bg-white rounded-2xl border border-[#e2d5c3] overflow-hidden hover:border-[#274e23] transition-all shadow-sm hover:shadow-md cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 bg-[#f0e6d8] overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#274e23] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase shadow">
                  {recipe.category}
                </span>
                <span className="absolute bottom-3 right-3 bg-amber-500 text-slate-950 font-bold text-[10px] px-2.5 py-1 rounded-full shadow">
                  {recipe.organicPercent}% Hữu Cơ
                </span>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-bold font-serif text-base text-[#274e23] group-hover:text-amber-700 transition-colors">
                  {recipe.title}
                </h3>
                <p className="text-xs text-[#5c4d43] line-clamp-2 leading-relaxed">
                  {recipe.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-[#7a6858] pt-2 border-t border-[#f0e6d8]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    {recipe.prepTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-amber-600" />
                    {recipe.servings} khẩu phần
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#f8f5f0] border-t border-[#f0e6d8] flex items-center justify-between text-xs font-bold text-[#274e23]">
              <span>Xem công thức chi tiết</span>
              <ChevronRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Recipe Modal */}
      {activeModalRecipe && (() => {
        const ingredients = Array.isArray(activeModalRecipe.ingredients)
          ? activeModalRecipe.ingredients
          : (typeof activeModalRecipe.ingredients === 'string'
              ? (() => { try { return JSON.parse(activeModalRecipe.ingredients); } catch { return []; } })()
              : []);

        const rawInstructions = activeModalRecipe.instructions || (activeModalRecipe as any).steps;
        const instructions = Array.isArray(rawInstructions)
          ? rawInstructions
          : (typeof rawInstructions === 'string'
              ? (() => { try { return JSON.parse(rawInstructions); } catch { return []; } })()
              : []);

        const prepTime = activeModalRecipe.prepTime || '15 phút';
        const cookTime = activeModalRecipe.cookTime || '20 phút';
        const servings = activeModalRecipe.servings || 2;
        const calories = activeModalRecipe.calories || 300;
        const bmqTip = activeModalRecipe.bmqTip || 'Nguyên liệu chuẩn kiểm định BMQ 100% Thuận Tự Nhiên.';

        return (
          <div
            onClick={() => setActiveModalRecipe(null)}
            className="fixed inset-0 z-50 bg-[#2d241e]/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto cursor-pointer"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-[#fcfaf7] border border-[#e2d5c3] rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto cursor-default"
            >
              <button
                onClick={() => setActiveModalRecipe(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#f0e6d8] hover:bg-[#e4d6c2] text-[#2d241e] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <span className="text-xs font-bold text-[#274e23] uppercase tracking-wider">
                  {activeModalRecipe.category || 'Bữa Ăn Lành'}
                </span>
                <h3 className="text-2xl font-black font-serif text-[#274e23]">
                  {activeModalRecipe.title}
                </h3>

                {activeModalRecipe.image && (
                  <div className="h-60 rounded-2xl overflow-hidden bg-[#f0e6d8]">
                    <img
                      src={activeModalRecipe.image}
                      alt={activeModalRecipe.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#f4ebe0] p-3 rounded-xl text-center text-xs text-[#274e23] font-bold">
                  <div>
                    <span className="text-[10px] text-[#7a6858] block font-normal">Sơ chế & Nấu:</span>
                    {prepTime} + {cookTime}
                  </div>
                  <div>
                    <span className="text-[10px] text-[#7a6858] block font-normal">Khẩu phần:</span>
                    {servings} người
                  </div>
                  <div>
                    <span className="text-[10px] text-[#7a6858] block font-normal">Năng lượng:</span>
                    {calories} kcal
                  </div>
                </div>

                {ingredients.length > 0 && (
                  <div>
                    <h4 className="font-bold text-[#274e23] text-sm font-serif mb-2">Nguyên Liệu Cần Chuẩn Bị</h4>
                    <ul className="space-y-1.5 text-xs text-[#3d3229]">
                      {ingredients.map((ing: string, i: number) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#274e23]" />
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {instructions.length > 0 && (
                  <div>
                    <h4 className="font-bold text-[#274e23] text-sm font-serif mb-2">Các Bước Thực Hiện</h4>
                    <ol className="space-y-2 text-xs text-[#3d3229]">
                      {instructions.map((step: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="font-bold text-[#274e23] shrink-0">{i + 1}.</span>
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                <div className="p-4 rounded-2xl bg-[#274e23]/10 border border-[#274e23]/20 text-[#274e23] text-xs">
                  <span className="font-bold uppercase tracking-wider block mb-1">Mẹo Lành Bách Mộc:</span>
                  <p className="italic">{bmqTip}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
