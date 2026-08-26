const fs = require('fs');
const path = require('path');

const filePath = path.join('c:', 'Users', 'lenovo', 'OneDrive', 'Desktop', 'UPDATE STATION', 'src', 'components', 'AdminDashboard.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace default category when creating new Chao Lua Me article
const targetAddStr = `const newArt: Article = {
                    id: \`art-\${Date.now()}\`,
                    title: 'Lợi Ích Của Lối Sống Thuận Tự Nhiên Bách Mộc',
                    category: 'Sống Xanh & Sức Khỏe',
                    duration: '5 phút đọc',`;

const replacementAddStr = `const newArt: Article = {
                    id: \`art-\${Date.now()}\`,
                    title: 'Lợi Ích Của Lối Sống Thuận Tự Nhiên Bách Mộc',
                    category: 'Chương Trình',
                    duration: '5 phút đọc',`;

// Replace dropdown for Chao Lua Me article
const targetDropdownStr = `                  <label className="font-bold text-[#5c4d43] block mb-1">Danh Mục Thư Viện</label>
                  <select
                    value={editingChaoLuaMeArticle.category}
                    onChange={(e) => setEditingChaoLuaMeArticle({ ...editingChaoLuaMeArticle, category: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-[#dcd0bf] bg-white"
                  >
                    <option value="Trồng Cây Thuận Tự Nhiên">Trồng Cây Thuận Tự Nhiên</option>
                    <option value="Mô Hình BiO Station">Mô Hình BiO Station</option>
                    <option value="Tiêu Chuẩn BMQ">Tiêu Chuẩn BMQ</option>
                    <option value="Sống Xanh & Sức Khỏe">Sống Xanh & Sức Khỏe</option>
                  </select>`;

const replacementDropdownStr = `                  <label className="font-bold text-[#5c4d43] block mb-1">Danh Mục Cháo Lúa Mẹ</label>
                  <select
                    value={editingChaoLuaMeArticle.category}
                    onChange={(e) => setEditingChaoLuaMeArticle({ ...editingChaoLuaMeArticle, category: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-[#dcd0bf] bg-white"
                  >
                    <option value="Chương Trình">Chương Trình</option>
                    <option value="Dữ Liệu Dinh Dưỡng">Dữ Liệu Dinh Dưỡng</option>
                    <option value="Câu Chuyện">Câu Chuyện</option>
                  </select>`;

const normContent = content.replace(/\r\n/g, '\n');
const normAddStr = targetAddStr.replace(/\r\n/g, '\n');
const normDropdownStr = targetDropdownStr.replace(/\r\n/g, '\n');

if (!normContent.includes(normAddStr)) {
  console.log("Could not find newArt string block.");
} else {
  content = normContent.replace(normAddStr, replacementAddStr);
}

if (!content.includes(normDropdownStr)) {
  console.log("Could not find dropdown string block.");
} else {
  content = content.replace(normDropdownStr, replacementDropdownStr);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log("Updated categories in AdminDashboard.");
