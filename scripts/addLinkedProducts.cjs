const fs = require('fs');
const path = require('path');

const filePath = path.join('c:', 'Users', 'lenovo', 'OneDrive', 'Desktop', 'UPDATE STATION', 'src', 'components', 'AdminDashboard.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Normalize line endings
content = content.replace(/\r\n/g, '\n');

// 1. Add Linked Products to editingArticle
const targetArticleStr = `              {/* Transcript / Full Text Snippet */}
              <div>
                <label className="font-bold text-[#5c4d43] block mb-1">Trích Đoạn / Nội Dung Chi Tiết Nổi Bật</label>`;

const replacementArticleStr = `              {/* Linked Products */}
              <div className="space-y-2 border-t border-[#f0e6d8] pt-3 pb-2">
                <label className="font-bold text-[#274e23] uppercase tracking-wider text-xs">
                  Sản Phẩm Khuyên Dùng / Liên Kết Hệ Sinh Thái
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                  {(siteData.products || []).map((prod) => (
                    <label key={prod.id} className="flex items-center gap-2 p-2 border border-[#f0e6d8] rounded-xl hover:bg-[#fbf8f3] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(editingArticle.recommendedProductIds || []).includes(prod.id)}
                        onChange={(e) => {
                          const currentIds = editingArticle.recommendedProductIds || [];
                          const newIds = e.target.checked 
                            ? [...currentIds, prod.id] 
                            : currentIds.filter(id => id !== prod.id);
                          setEditingArticle({ ...editingArticle, recommendedProductIds: newIds });
                        }}
                        className="w-4 h-4 text-[#274e23] rounded border-gray-300 focus:ring-[#274e23]"
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#5c4d43] line-clamp-1">{prod.name}</span>
                        <span className="text-[10px] text-stone-500">{prod.price.toLocaleString()}đ</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Transcript / Full Text Snippet */}
              <div>
                <label className="font-bold text-[#5c4d43] block mb-1">Trích Đoạn / Nội Dung Chi Tiết Nổi Bật</label>`;

if (!content.includes(targetArticleStr)) {
    console.error("Target Article string not found.");
    process.exit(1);
}
content = content.replace(targetArticleStr, replacementArticleStr);

// 2. Add Linked Products to editingChaoLuaMeArticle
// The structure in Chao Lua Me modal is:
//               <div>
//                 <label className="font-bold text-[#5c4d43] block mb-1">Trích Đoạn / Nội Dung Chi Tiết Nổi Bật</label>
const targetChaoLuaMeStr = `              <div>
                <label className="font-bold text-[#5c4d43] block mb-1">Trích Đoạn / Nội Dung Chi Tiết Nổi Bật</label>
                <textarea
                  rows={4}
                  value={editingChaoLuaMeArticle.transcriptSnippet}`;

const replacementChaoLuaMeStr = `              {/* Linked Products */}
              <div className="space-y-2 border-t border-[#f0e6d8] pt-3 pb-2">
                <label className="font-bold text-[#274e23] uppercase tracking-wider text-xs">
                  Sản Phẩm Khuyên Dùng / Liên Kết Hệ Sinh Thái
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                  {(siteData.products || []).map((prod) => (
                    <label key={prod.id} className="flex items-center gap-2 p-2 border border-[#f0e6d8] rounded-xl hover:bg-[#fbf8f3] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(editingChaoLuaMeArticle.recommendedProductIds || []).includes(prod.id)}
                        onChange={(e) => {
                          const currentIds = editingChaoLuaMeArticle.recommendedProductIds || [];
                          const newIds = e.target.checked 
                            ? [...currentIds, prod.id] 
                            : currentIds.filter(id => id !== prod.id);
                          setEditingChaoLuaMeArticle({ ...editingChaoLuaMeArticle, recommendedProductIds: newIds });
                        }}
                        className="w-4 h-4 text-[#274e23] rounded border-gray-300 focus:ring-[#274e23]"
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#5c4d43] line-clamp-1">{prod.name}</span>
                        <span className="text-[10px] text-stone-500">{prod.price.toLocaleString()}đ</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-[#5c4d43] block mb-1">Trích Đoạn / Nội Dung Chi Tiết Nổi Bật</label>
                <textarea
                  rows={4}
                  value={editingChaoLuaMeArticle.transcriptSnippet}`;

if (!content.includes(targetChaoLuaMeStr)) {
    console.error("Target Chao Lua Me string not found.");
    process.exit(1);
}
content = content.replace(targetChaoLuaMeStr, replacementChaoLuaMeStr);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully added Linked Products to both modals.");
