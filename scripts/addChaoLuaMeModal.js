const fs = require('fs');
const path = require('path');

const filePath = path.join('c:', 'Users', 'lenovo', 'OneDrive', 'Desktop', 'UPDATE STATION', 'src', 'components', 'AdminDashboard.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const targetStr = `        {/* MODAL: EDIT PRODUCT */}`;
const insertionStr = `        {/* MODAL: EDIT CHAO LUA ME ARTICLE */}
        {editingChaoLuaMeArticle && (
          <div className="fixed inset-0 z-50 bg-[#2d241e]/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white border border-[#e2d5c3] rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto text-xs">
              <button
                onClick={() => setEditingChaoLuaMeArticle(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#f0e6d8] hover:bg-[#e2d5c3]"
              >
                <X className="w-5 h-5 text-[#2d241e]" />
              </button>

              <div className="border-b border-[#f0e6d8] pb-3">
                <h3 className="text-xl font-bold font-serif text-[#274e23] flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-600" />
                  {isAddingChaoLuaMeArticle ? 'Thêm Bài Viết Mới Cháo Lúa Mẹ' : 'Chỉnh Sửa Chi Tiết Cháo Lúa Mẹ'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#5c4d43] block mb-1">Tiêu Đề Bài Viết *</label>
                  <input
                    type="text"
                    value={editingChaoLuaMeArticle.title}
                    onChange={(e) => setEditingChaoLuaMeArticle({ ...editingChaoLuaMeArticle, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#dcd0bf]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#5c4d43] block mb-1">Danh Mục Thư Viện</label>
                  <select
                    value={editingChaoLuaMeArticle.category}
                    onChange={(e) => setEditingChaoLuaMeArticle({ ...editingChaoLuaMeArticle, category: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-[#dcd0bf] bg-white"
                  >
                    <option value="Trồng Cây Thuận Tự Nhiên">Trồng Cây Thuận Tự Nhiên</option>
                    <option value="Mô Hình BiO Station">Mô Hình BiO Station</option>
                    <option value="Tiêu Chuẩn BMQ">Tiêu Chuẩn BMQ</option>
                    <option value="Sống Xanh & Sức Khỏe">Sống Xanh & Sức Khỏe</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-[#5c4d43] block mb-1">Thời Gian Đọc</label>
                  <input
                    type="text"
                    value={editingChaoLuaMeArticle.duration}
                    onChange={(e) => setEditingChaoLuaMeArticle({ ...editingChaoLuaMeArticle, duration: e.target.value })}
                    className="w-full p-2 rounded-xl border border-[#dcd0bf]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#5c4d43] block mb-1">Lượt Xem</label>
                  <input
                    type="text"
                    value={editingChaoLuaMeArticle.views}
                    onChange={(e) => setEditingChaoLuaMeArticle({ ...editingChaoLuaMeArticle, views: e.target.value })}
                    className="w-full p-2 rounded-xl border border-[#dcd0bf]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#5c4d43] block mb-1">Ngày Đăng</label>
                  <input
                    type="text"
                    value={editingChaoLuaMeArticle.date}
                    onChange={(e) => setEditingChaoLuaMeArticle({ ...editingChaoLuaMeArticle, date: e.target.value })}
                    className="w-full p-2 rounded-xl border border-[#dcd0bf]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#5c4d43] block mb-1">Mô Tả Tóm Tắt Bài Viết</label>
                <textarea
                  rows={2}
                  value={editingChaoLuaMeArticle.summary}
                  onChange={(e) => setEditingChaoLuaMeArticle({ ...editingChaoLuaMeArticle, summary: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#dcd0bf]"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-[#5c4d43] block">Ảnh Đại Diện (URL)</label>
                <input
                  type="text"
                  value={editingChaoLuaMeArticle.image}
                  onChange={(e) => setEditingChaoLuaMeArticle({ ...editingChaoLuaMeArticle, image: formatImageUrl(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border border-[#dcd0bf]"
                />
              </div>

              <div className="space-y-2 border-t border-[#f0e6d8] pt-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-[#274e23] uppercase tracking-wider text-xs">
                    Cốt Lõi / Ý Chính Của Bài Viết ({editingChaoLuaMeArticle.keyTakeaways?.length || 0})
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingChaoLuaMeArticle({ ...editingChaoLuaMeArticle, keyTakeaways: [...editingChaoLuaMeArticle.keyTakeaways, 'Ý cốt lõi mới'] })
                    }
                    className="px-2.5 py-1 bg-[#274e23] text-white font-bold rounded-lg text-[11px] flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Thêm Ý Cốt Lõi
                  </button>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {(editingChaoLuaMeArticle.keyTakeaways || []).map((take, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-5 font-bold text-[#274e23] text-center">•</span>
                      <input
                        type="text"
                        value={take}
                        onChange={(e) => {
                          const updated = [...editingChaoLuaMeArticle.keyTakeaways];
                          updated[idx] = e.target.value;
                          setEditingChaoLuaMeArticle({ ...editingChaoLuaMeArticle, keyTakeaways: updated });
                        }}
                        className="w-full p-2 rounded-xl border border-[#dcd0bf]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = editingChaoLuaMeArticle.keyTakeaways.filter((_, i) => i !== idx);
                          setEditingChaoLuaMeArticle({ ...editingChaoLuaMeArticle, keyTakeaways: updated });
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-[#5c4d43] block mb-1">Trích Đoạn / Nội Dung Chi Tiết Nổi Bật</label>
                <textarea
                  rows={4}
                  value={editingChaoLuaMeArticle.transcriptSnippet}
                  onChange={(e) => setEditingChaoLuaMeArticle({ ...editingChaoLuaMeArticle, transcriptSnippet: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#dcd0bf] font-sans"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (isAddingChaoLuaMeArticle) {
                      setChaoLuaMeArticles((prev) => [editingChaoLuaMeArticle, ...prev]);
                      showNotification('Đã thêm bài viết Cháo Lúa Mẹ mới thành công!');
                    } else {
                      setChaoLuaMeArticles((prev) => prev.map((a) => (a.id === editingChaoLuaMeArticle.id ? editingChaoLuaMeArticle : a)));
                      showNotification('Đã cập nhật chi tiết bài viết!');
                    }
                    setEditingChaoLuaMeArticle(null);
                  }}
                  className="w-full py-3 bg-[#274e23] hover:bg-[#1f381c] text-white font-bold text-xs rounded-xl shadow cursor-pointer flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4 text-amber-300" /> Lưu Bài Viết
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: EDIT PRODUCT */}`;

if (!content.includes(targetStr)) {
    console.error("Target string not found.");
    process.exit(1);
}
content = content.replace(targetStr, insertionStr);
fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully added editingChaoLuaMeArticle modal.");
