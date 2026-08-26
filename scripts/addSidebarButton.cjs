const fs = require('fs');
const path = require('path');

const filePath = path.join('c:', 'Users', 'lenovo', 'OneDrive', 'Desktop', 'UPDATE STATION', 'src', 'components', 'AdminDashboard.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const targetStr = `<BookOpen className="w-4 h-4" /> Thư Viện Bài Viết ({siteData.articles.length})
            </button>
          )}`;

const insertionStr = `<BookOpen className="w-4 h-4" /> Thư Viện Bài Viết ({siteData.articles.length})
            </button>
          )}

          {isTabAllowed('chaoluame') && (
            <button
              onClick={() => setActiveTab('chaoluame')}
              className={\`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer \${
                activeTab === 'chaoluame' ? 'bg-[#274e23] text-white shadow-md' : 'text-[#5c4d43] hover:bg-[#f2e9dc]'
              }\`}
            >
              <BookOpen className="w-4 h-4 text-amber-600" /> Cháo Lúa Mẹ ({(siteData.chaoLuaMeArticles || []).length})
            </button>
          )}`;

// Replace first occurrence of normalized string to handle \r\n issues
const normalizedContent = content.replace(/\r\n/g, '\n');
const normalizedTarget = targetStr.replace(/\r\n/g, '\n');

if (!normalizedContent.includes(normalizedTarget)) {
    console.error("Target string not found.");
    process.exit(1);
}

const updatedContent = normalizedContent.replace(normalizedTarget, insertionStr);
fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log("Successfully added chaoluame button to sidebar.");
