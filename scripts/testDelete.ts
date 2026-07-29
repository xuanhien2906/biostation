/**
 * Script kiểm tra xóa ảnh Supabase Storage
 * Chạy: npx tsx scripts/testDelete.ts
 */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://llkbikqnfqrdrmwslniw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxsa2Jpa3FuZnFyZHJtd3Nsbml3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyNDMwODIsImV4cCI6MjEwMDgxOTA4Mn0.mx0NEmduc8tF1JjPaKdFko5Bjxt7yQfgQVGhrKFF8Ro';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testDelete() {
  console.log('=== KIỂM TRA XÓA ẢNH SUPABASE ===\n');

  // 1. List files in root
  console.log('1. Liệt kê file ở root...');
  const { data: rootFiles, error: listError } = await supabase.storage
    .from('biostation_images')
    .list('', { limit: 10 });

  if (listError) {
    console.error('❌ Lỗi liệt kê:', listError.message);
    return;
  }

  console.log(`✅ Tìm thấy ${rootFiles?.length || 0} items`);
  if (rootFiles && rootFiles.length > 0) {
    rootFiles.forEach(f => console.log(`   - ${f.name} (id: ${f.id})`));
  }

  // 2. Try to find a test file to delete
  const testFile = rootFiles?.find(f => f.id !== null && f.name !== '.emptyFolderPlaceholder');
  if (!testFile) {
    console.log('\n⚠️ Không tìm thấy file test nào ở root. Thử liệt kê thư mục con...');
    
    const dirs = rootFiles?.filter(f => f.id === null) || [];
    for (const dir of dirs) {
      const { data: subFiles } = await supabase.storage
        .from('biostation_images')
        .list(dir.name, { limit: 5 });
      
      const realFile = subFiles?.find(f => f.id !== null && f.name !== '.emptyFolderPlaceholder');
      if (realFile) {
        const filePath = `${dir.name}/${realFile.name}`;
        console.log(`\n2. Thử xóa file: "${filePath}"`);
        
        const { data: deleteData, error: deleteError } = await supabase.storage
          .from('biostation_images')
          .remove([filePath]);

        if (deleteError) {
          console.error(`❌ LỖI XÓA: ${deleteError.message}`);
          console.error('   Chi tiết:', JSON.stringify(deleteError, null, 2));
        } else {
          console.log('✅ Kết quả xóa:', JSON.stringify(deleteData, null, 2));
          
          // Verify by listing again
          const { data: verifyFiles } = await supabase.storage
            .from('biostation_images')
            .list(dir.name, { limit: 5 });
          const stillExists = verifyFiles?.some(f => f.name === realFile.name);
          console.log(`3. File "${realFile.name}" vẫn còn sau khi xóa? ${stillExists ? '⚠️ CÒN (XÓA THẤT BẠI!)' : '✅ ĐÃ XÓA THÀNH CÔNG'}`);
        }
        return;
      }
    }
    console.log('Không tìm thấy file nào để test.');
  } else {
    const filePath = testFile.name;
    console.log(`\n2. Thử xóa file ở root: "${filePath}"`);
    
    const { data: deleteData, error: deleteError } = await supabase.storage
      .from('biostation_images')
      .remove([filePath]);

    if (deleteError) {
      console.error(`❌ LỖI XÓA: ${deleteError.message}`);
      console.error('   Chi tiết:', JSON.stringify(deleteError, null, 2));
    } else {
      console.log('✅ Kết quả xóa:', JSON.stringify(deleteData, null, 2));
      
      // Verify
      const { data: verifyFiles } = await supabase.storage
        .from('biostation_images')
        .list('', { limit: 20 });
      const stillExists = verifyFiles?.some(f => f.name === testFile.name);
      console.log(`3. File "${testFile.name}" vẫn còn sau khi xóa? ${stillExists ? '⚠️ CÒN (XÓA THẤT BẠI - CÓ VẤN ĐỀ RLS!)' : '✅ ĐÃ XÓA THÀNH CÔNG'}`);
    }
  }
}

testDelete().catch(console.error);
