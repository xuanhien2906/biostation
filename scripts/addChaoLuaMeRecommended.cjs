const fs = require('fs');
const path = require('path');

const filePath = path.join('c:', 'Users', 'lenovo', 'OneDrive', 'Desktop', 'UPDATE STATION', 'src', 'components', 'ChaoLuaMe.tsx');
let content = fs.readFileSync(filePath, 'utf8');
content = content.replace(/\r\n/g, '\n');

// 1. Import ShoppingBag
const targetImportStr = `import { Sprout, Clock, Users, ChevronRight, X, Heart } from 'lucide-react';`;
const replaceImportStr = `import { Sprout, Clock, Users, ChevronRight, X, Heart, ShoppingBag } from 'lucide-react';`;

if (content.includes(targetImportStr)) {
  content = content.replace(targetImportStr, replaceImportStr);
}

// 2. Add Recommended Products inside the Modal
// The modal ends with:
//               <div className="p-4 rounded-2xl bg-[#274e23]/10 border border-[#274e23]/20 text-[#274e23] text-xs">
//                 <span className="font-bold uppercase tracking-wider block mb-1">Giá Trị Cốt Lõi:</span>
//                 <p className="italic">Cháo Lúa Mẹ - Tinh hoa nông sản hữu cơ Bách Mộc, nuôi dưỡng thể chất và tinh thần.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
const targetBlockStr = `              <div className="p-4 rounded-2xl bg-[#274e23]/10 border border-[#274e23]/20 text-[#274e23] text-xs">
                <span className="font-bold uppercase tracking-wider block mb-1">Giá Trị Cốt Lõi:</span>
                <p className="italic">Cháo Lúa Mẹ - Tinh hoa nông sản hữu cơ Bách Mộc, nuôi dưỡng thể chất và tinh thần.</p>
              </div>`;

const replaceBlockStr = `              <div className="p-4 rounded-2xl bg-[#274e23]/10 border border-[#274e23]/20 text-[#274e23] text-xs">
                <span className="font-bold uppercase tracking-wider block mb-1">Giá Trị Cốt Lõi:</span>
                <p className="italic">Cháo Lúa Mẹ - Tinh hoa nông sản hữu cơ Bách Mộc, nuôi dưỡng thể chất và tinh thần.</p>
              </div>

              {/* Recommended Products */}
              {activeModalItem.recommendedProductIds && activeModalItem.recommendedProductIds.length > 0 && (
                <div className="pt-4 border-t border-[#e2d5c3]">
                  <h4 className="font-bold text-[#274e23] text-xs uppercase tracking-wider mb-3 font-serif">
                    Sản Phẩm Đề Xuất Liên Quan
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeModalItem.recommendedProductIds.map((pId: string) => {
                      const prod = (siteData.products || []).find((p) => p.id === pId);
                      if (!prod) return null;
                      return (
                        <div
                          key={prod.id}
                          onClick={() => {
                            // Close modal and emit custom event or navigate
                            setActiveModalItem(null);
                            // We can just dispatch a custom event to open Cart or Product modal if supported
                            window.dispatchEvent(new CustomEvent('open-product', { detail: prod }));
                          }}
                          className="flex items-center gap-3 p-2.5 bg-white rounded-xl border border-[#e2d5c3] hover:border-[#274e23] cursor-pointer transition-all"
                        >
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-10 h-10 object-cover rounded-lg bg-[#f0e6d8]"
                          />
                          <div className="flex-1 min-w-0 text-xs">
                            <p className="font-bold text-[#274e23] truncate">{prod.name}</p>
                            <p className="text-[#a66e2c] font-black">{prod.price ? prod.price.toLocaleString('vi-VN') : 0}đ</p>
                          </div>
                          <ShoppingBag className="w-4 h-4 text-[#274e23]" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}`;

if (content.includes(targetBlockStr)) {
  content = content.replace(targetBlockStr, replaceBlockStr);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log("Updated ChaoLuaMe.tsx");
