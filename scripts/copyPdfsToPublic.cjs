const fs = require('fs');
const path = require('path');

const srcPdf1 = path.join('C:', 'Users', 'lenovo', '.gemini', 'antigravity-ide', 'brain', 'fe9d8aee-8806-45c5-8ff8-cf0a4cd73a1a', '.user_uploaded', 'media_1791975621004.pdf');
const srcPdf2 = path.join('C:', 'Users', 'lenovo', '.gemini', 'antigravity-ide', 'brain', 'fe9d8aee-8806-45c5-8ff8-cf0a4cd73a1a', '.user_uploaded', 'media_1791975621393.pdf');

const destPdf1 = path.join(__dirname, '..', 'public', 'menu-com-huu-co-bach-moc.pdf');
const destPdf2 = path.join(__dirname, '..', 'public', 'bang-gia-san-pham-gao-bach-moc.pdf');

if (fs.existsSync(srcPdf1)) {
  fs.copyFileSync(srcPdf1, destPdf1);
  console.log("Copied menu PDF to public!");
}

if (fs.existsSync(srcPdf2)) {
  fs.copyFileSync(srcPdf2, destPdf2);
  console.log("Copied price list PDF to public!");
}
