require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

async function main() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase credentials in .env");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const publicDir = path.resolve('public');

  const filesToUpload = [
    { local: 'gao-trang-xat-doi.jpg', remote: 'products/gao-trang-xat-doi.jpg' },
    { local: 'gao-trang-nguyen-cam.jpg', remote: 'products/gao-trang-nguyen-cam.jpg' },
    { local: 'gao-do-nguyen-cam.jpg', remote: 'products/gao-do-nguyen-cam.jpg' },
    { local: 'gao-tim-nguyen-cam.jpg', remote: 'products/gao-tim-nguyen-cam.jpg' },
    { local: 'gao-lua-me-yang.jpg', remote: 'products/gao-lua-me-yang.jpg' },
    { local: 'gao-vung-dem-xat-doi.jpg', remote: 'products/gao-vung-dem-xat-doi.jpg' },
    { local: 'gao-vung-dem-nguyen-cam.jpg', remote: 'products/gao-vung-dem-nguyen-cam.jpg' },
    { local: 'nuoc-chiet-gao-len-men.jpg', remote: 'products/nuoc-chiet-gao-len-men.jpg' },
    { local: 'vien-dan-mang-gao.jpg', remote: 'products/vien-dan-mang-gao.jpg' },
    { local: 'mang-cam-gao-huu-co.jpg', remote: 'products/mang-cam-gao-huu-co.jpg' },
    { local: 'mang-gao-vung-dem.jpg', remote: 'products/mang-gao-vung-dem.jpg' },
    { local: 'bot-chuoi-hot-rung.jpg', remote: 'products/bot-chuoi-hot-rung.jpg' },
    { local: 'nuoc-ep-nhau-nano.jpg', remote: 'products/nuoc-ep-nhau-nano.jpg' },
    { local: 'tra-thach-chau.jpg', remote: 'products/tra-thach-chau.jpg' },
    { local: 'cafe-dang-farm.jpg', remote: 'products/cafe-dang-farm.jpg' },
    { local: 'gao-bach-moc-pack.jpg', remote: 'products/gao-bach-moc-pack.jpg' },
    { local: 'mam-com-trai-nghiem.jpg', remote: 'dishes/mam-com-trai-nghiem.jpg' },
    { local: 'com-van-phong.jpg', remote: 'dishes/com-van-phong.jpg' }
  ];

  console.log('Uploading images to Supabase Storage bucket "biostation_images"...');
  const urls = {};

  for (const item of filesToUpload) {
    const fullLocalPath = path.join(publicDir, item.local);
    if (!fs.existsSync(fullLocalPath)) {
      console.warn('File not found locally:', item.local);
      continue;
    }

    const fileBuffer = fs.readFileSync(fullLocalPath);
    const { error } = await supabase.storage
      .from('biostation_images')
      .upload(item.remote, fileBuffer, {
        contentType: 'image/jpeg',
        upsert: true
      });

    if (error) {
      console.error(`Failed to upload ${item.local} -> ${item.remote}:`, error.message);
    } else {
      const { data: pubData } = supabase.storage
        .from('biostation_images')
        .getPublicUrl(item.remote);
      urls[item.local] = pubData.publicUrl;
      console.log(`Uploaded ${item.local} -> ${pubData.publicUrl}`);
    }
  }

  // Load site_config.json
  const siteConfigPath = path.resolve('src/data/site_config.json');
  let raw = fs.readFileSync(siteConfigPath, 'utf8');
  if (raw.charCodeAt(0) === 0xFEFF) {
    raw = raw.slice(1);
  }
  const config = JSON.parse(raw);

  // Map product IDs to their new Supabase / local URLs
  const productImages = {
    'prod-gao-trang-xat-doi': urls['gao-trang-xat-doi.jpg'] || '/gao-trang-xat-doi.jpg',
    'prod-gao-trang-nguyen-cam': urls['gao-trang-nguyen-cam.jpg'] || '/gao-trang-nguyen-cam.jpg',
    'prod-gao-do-nguyen-cam': urls['gao-do-nguyen-cam.jpg'] || '/gao-do-nguyen-cam.jpg',
    'prod-gao-tim-nguyen-cam': urls['gao-tim-nguyen-cam.jpg'] || '/gao-tim-nguyen-cam.jpg',
    'prod-gao-lua-me-yang': urls['gao-lua-me-yang.jpg'] || '/gao-lua-me-yang.jpg',
    'prod-gao-vung-dem-xat-doi': urls['gao-vung-dem-xat-doi.jpg'] || '/gao-vung-dem-xat-doi.jpg',
    'prod-gao-vung-dem-nguyen-cam': urls['gao-vung-dem-nguyen-cam.jpg'] || '/gao-vung-dem-nguyen-cam.jpg',
    'prod-nuoc-chiet-gao-len-men': urls['nuoc-chiet-gao-len-men.jpg'] || '/nuoc-chiet-gao-len-men.jpg',
    'prod-vien-dan-mang-gao': urls['vien-dan-mang-gao.jpg'] || '/vien-dan-mang-gao.jpg',
    'prod-mang-cam-gao-huu-co': urls['mang-cam-gao-huu-co.jpg'] || '/mang-cam-gao-huu-co.jpg',
    'prod-mang-gao-vung-dem': urls['mang-gao-vung-dem.jpg'] || '/mang-gao-vung-dem.jpg',
    'prod-bot-chuoi-hot': urls['bot-chuoi-hot-rung.jpg'] || '/bot-chuoi-hot-rung.jpg',
    'prod-nuoc-ep-nhau-nano': urls['nuoc-ep-nhau-nano.jpg'] || '/nuoc-ep-nhau-nano.jpg',
    'prod-tra-thach-chau': urls['tra-thach-chau.jpg'] || '/tra-thach-chau.jpg',
    'prod-cafe-huu-co-dang-farm': urls['cafe-dang-farm.jpg'] || '/cafe-dang-farm.jpg'
  };

  if (Array.isArray(config.products)) {
    config.products.forEach(p => {
      if (productImages[p.id]) {
        p.image = productImages[p.id];
      }
    });
  }

  // Update experience meal dishes
  if (config.experienceMealConfig && Array.isArray(config.experienceMealConfig.dishes)) {
    config.experienceMealConfig.dishes.forEach(d => {
      if (d.id === 'dish-com-trai-nghiem-79' || d.id === 'dish-com-trai-nghiem-99') {
        d.image = urls['mam-com-trai-nghiem.jpg'] || '/mam-com-trai-nghiem.jpg';
      } else if (d.id === 'dish-com-van-phong-59') {
        d.image = urls['com-van-phong.jpg'] || '/com-van-phong.jpg';
      }
    });
  }

  // Save updated site_config.json
  fs.writeFileSync(siteConfigPath, JSON.stringify(config, null, 2), 'utf8');
  console.log('✅ Updated src/data/site_config.json');

  // Update src/data/products.ts with new images
  let productsTs = fs.readFileSync(path.resolve('src/data/products.ts'), 'utf8');
  for (const [prodId, imgUrl] of Object.entries(productImages)) {
    // Regex to match the block for this product and replace its image field
    const regex = new RegExp(`(id:\\s*['"]${prodId}['"][\\s\\S]*?image:\\s*['"])([^'"]+)(['"])`);
    if (regex.test(productsTs)) {
      productsTs = productsTs.replace(regex, `$1${imgUrl}$3`);
      console.log(`Updated products.ts for ${prodId}`);
    }
  }
  fs.writeFileSync(path.resolve('src/data/products.ts'), productsTs, 'utf8');
  console.log('✅ Updated src/data/products.ts');

  // Upload config/site_config.json to Supabase Storage
  const jsonString = JSON.stringify(config, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const { error: configUploadError } = await supabase.storage
    .from('biostation_images')
    .upload('config/site_config.json', blob, {
      upsert: true,
      contentType: 'application/json'
    });

  if (configUploadError) {
    console.error('❌ Failed to upload config/site_config.json to Supabase:', configUploadError);
  } else {
    console.log('🎉 Successfully uploaded updated site_config.json to Supabase Storage!');
  }
}

main().catch(console.error);
