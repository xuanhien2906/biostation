import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabase = createClient(
  'https://llkbikqnfqrdrmwslniw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxsa2Jpa3FuZnFyZHJtd3Nsbml3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyNDMwODIsImV4cCI6MjEwMDgxOTA4Mn0.mx0NEmduc8tF1JjPaKdFko5Bjxt7yQfgQVGhrKFF8Ro'
);

// We need to extract the new DEFAULT_EXPERIENCE_MEAL_CONFIG from SiteContext.tsx
// To keep this script simple, we'll download the current live config,
// update its experienceMealConfig.dishes array with the new one we just created,
// and upload it back.

const NEW_DISHES = [
  {
    id: 'dish-com-huu-co',
    name: 'Cơm hữu cơ Bách Mộc',
    category: 'Cơm',
    flavor: 'Gồm: Phần cơm, Canh, Rau luộc, Món mặn',
    price: 59000,
    isMain: true,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'dish-com-lut-huu-co',
    name: 'Cơm lứt hữu cơ Bách Mộc',
    category: 'Cơm',
    flavor: 'Gồm: Phần cơm, Canh, Rau luộc, Món mặn',
    price: 75000,
    isMain: true,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'dish-do-an-them',
    name: 'Đồ ăn thêm (Extra dishes)',
    category: 'Món Phụ & Tráng Miệng',
    price: 30000,
  },
  {
    id: 'dish-com-them-huu-co',
    name: 'Cơm thêm - Hữu cơ (Extra organic rice)',
    category: 'Món Phụ & Tráng Miệng',
    price: 10000,
  },
  {
    id: 'dish-com-them-lut',
    name: 'Cơm thêm - Lứt (Extra brown rice)',
    category: 'Món Phụ & Tráng Miệng',
    price: 15000,
  },
  {
    id: 'dish-mang-cam-gao',
    name: 'Màng cám gạo dinh dưỡng Bách Mộc',
    category: 'Món Phụ & Tráng Miệng',
    flavor: 'Trộn cùng cơm gia tăng dinh dưỡng cho bữa ăn',
    price: 10000,
  },
  {
    id: 'drink-tra-chanh',
    name: 'Trà chanh (Lemon tea)',
    category: 'Nước',
    price: 15000,
  },
  {
    id: 'drink-tra-tac',
    name: 'Trà tắc (Kumquat tea)',
    category: 'Nước',
    price: 15000,
  },
  {
    id: 'drink-tra-bm',
    name: 'Trà Bách Mộc (Tea)',
    category: 'Nước',
    price: 5000,
  },
  {
    id: 'drink-khan-lanh',
    name: 'Khăn lạnh (Cold towel)',
    category: 'Nước',
    price: 3000,
  },
  {
    id: 'chao_1_loai_m',
    name: 'Cháo + 1 loại (Size M)',
    category: 'Cháo',
    price: 39000,
  },
  {
    id: 'chao_1_loai_l',
    name: 'Cháo + 1 loại (Size L)',
    category: 'Cháo',
    price: 59000,
  },
  {
    id: 'chao-ca-hoi-m',
    name: 'Cháo Cá hồi (Size M)',
    category: 'Cháo',
    price: 65000,
  },
  {
    id: 'chao-ca-hoi-l',
    name: 'Cháo Cá hồi (Size L)',
    category: 'Cháo',
    price: 85000,
  },
  {
    id: 'chao-suon-non-m',
    name: 'Cháo Sườn non (Size M)',
    category: 'Cháo',
    price: 50000,
  },
  {
    id: 'chao-suon-non-l',
    name: 'Cháo Sườn non (Size L)',
    category: 'Cháo',
    price: 65000,
  },
  {
    id: 'chao-dac-biet-l',
    name: 'Cháo đặc biệt (Size L)',
    category: 'Cháo',
    price: 89000,
    isMain: true,
  },
  {
    id: 'topping-chao-lua-me',
    name: 'Cháo Lúa Mẹ',
    category: 'Topping',
    price: 9000,
  },
  {
    id: 'topping-chao-them',
    name: 'Cháo thêm',
    category: 'Topping',
    price: 5000,
  },
  {
    id: 'topping-thit-heo-bam',
    name: 'Thịt heo băm',
    category: 'Topping',
    price: 20000,
  },
  {
    id: 'topping-rau-cu',
    name: 'Rau củ',
    category: 'Topping',
    price: 20000,
  },
  {
    id: 'topping-thit-ga',
    name: 'Thịt gà',
    category: 'Topping',
    price: 20000,
  },
  {
    id: 'topping-nam',
    name: 'Nấm',
    category: 'Topping',
    price: 20000,
  },
  {
    id: 'topping-ruoc-ca',
    name: 'Ruốc cá',
    category: 'Topping',
    price: 20000,
  },
  {
    id: 'topping-thit-bo-bam',
    name: 'Thịt bò băm',
    category: 'Topping',
    price: 20000,
  },
  {
    id: 'topping-tom',
    name: 'Tôm',
    category: 'Topping',
    price: 20000,
  },
  {
    id: 'topping-tim-cat',
    name: 'Tim - Cật',
    category: 'Topping',
    price: 20000,
  },
  {
    id: 'topping-trung',
    name: 'Trứng',
    category: 'Topping',
    price: 10000,
  }
];

async function main() {
  console.log('Downloading current live config...');
  const { data: liveBlob, error: liveErr } = await supabase.storage
    .from('biostation_images')
    .download('config/site_config.json');

  if (liveErr || !liveBlob) {
    console.error('Failed to download live config:', liveErr);
    return;
  }

  const text = await liveBlob.text();
  const config = JSON.parse(text);

  console.log(`Current config has ${config.experienceMealConfig?.dishes?.length || 0} dishes.`);

  // Update the dishes array
  if (!config.experienceMealConfig) {
      config.experienceMealConfig = {};
  }
  config.experienceMealConfig.dishes = NEW_DISHES;

  console.log(`Updated config now has ${config.experienceMealConfig.dishes.length} dishes.`);

  // Upload back to Supabase
  const newJsonString = JSON.stringify(config, null, 2);
  const newBlob = new Blob([newJsonString], { type: 'application/json' });

  console.log('Uploading updated config to Supabase...');
  const { error: uploadErr } = await supabase.storage
    .from('biostation_images')
    .upload('config/site_config.json', newBlob, {
      upsert: true,
      contentType: 'application/json',
    });

  if (uploadErr) {
    console.error('Failed to upload updated config:', uploadErr);
  } else {
    console.log('✅ Successfully updated live config on Supabase Cloud!');
  }
}

main().catch(console.error);
