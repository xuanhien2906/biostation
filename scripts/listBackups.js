import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://llkbikqnfqrdrmwslniw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxsa2Jpa3FuZnFyZHJtd3Nsbml3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyNDMwODIsImV4cCI6MjEwMDgxOTA4Mn0.mx0NEmduc8tF1JjPaKdFko5Bjxt7yQfgQVGhrKFF8Ro'
);

async function main() {
  // List backup files
  const { data, error } = await supabase.storage
    .from('biostation_images')
    .list('backups', { limit: 100, sortBy: { column: 'name', order: 'desc' } });

  if (error) {
    console.error('Error listing backups:', error);
    return;
  }

  console.log(`Found ${data.length} backup(s):`);
  for (const file of data) {
    console.log(`  ${file.name} (created: ${file.created_at})`);
  }

  // Download the current live config
  console.log('\n--- Checking current live config ---');
  const { data: liveBlob, error: liveErr } = await supabase.storage
    .from('biostation_images')
    .download('config/site_config.json');

  if (liveErr) {
    console.error('Error downloading live config:', liveErr);
    return;
  }

  const text = await liveBlob.text();
  const parsed = JSON.parse(text);
  const dishes = parsed.experienceMealConfig?.dishes || [];
  console.log(`Live config has ${dishes.length} dishes:`);
  for (const d of dishes) {
    console.log(`  [${d.category}] ${d.name} — price: ${d.price ?? d.extraPrice ?? 'MISSING'}`);
  }

  // Try to find a backup with more dishes (probably the one with cháo)
  if (data.length > 0) {
    console.log('\n--- Scanning backups for one with Cháo dishes ---');
    for (const file of data.slice(0, 20)) {
      try {
        const { data: bBlob, error: bErr } = await supabase.storage
          .from('biostation_images')
          .download(`backups/${file.name}`);
        if (bErr || !bBlob) continue;
        const bText = await bBlob.text();
        const bParsed = JSON.parse(bText);
        const bDishes = bParsed.experienceMealConfig?.dishes || [];
        const chaoDishes = bDishes.filter(d => d.category === 'Cháo' || d.category === 'Topping' || d.category === 'Nước');
        if (chaoDishes.length > 0) {
          console.log(`\n✅ FOUND! Backup "${file.name}" has ${bDishes.length} total dishes, including ${chaoDishes.length} Cháo/Topping/Nước dishes:`);
          for (const cd of chaoDishes) {
            console.log(`  [${cd.category}] ${cd.name}`);
          }
          console.log(`\nFull dish list in this backup:`);
          for (const d of bDishes) {
            console.log(`  [${d.category}] ${d.name} — price: ${d.price ?? d.extraPrice ?? 'N/A'}`);
          }
          return; // Stop at first good backup
        } else {
          console.log(`  ${file.name}: ${bDishes.length} dishes, no Cháo/Topping/Nước`);
        }
      } catch (e) {
        console.log(`  ${file.name}: error reading`);
      }
    }
    console.log('No backup found with Cháo dishes in the most recent 20 backups.');
  }
}

main().catch(console.error);
