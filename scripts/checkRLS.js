import { createClient } from '@supabase/supabase-js';

const s = createClient(
  'https://llkbikqnfqrdrmwslniw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxsa2Jpa3FuZnFyZHJtd3Nsbml3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyNDMwODIsImV4cCI6MjEwMDgxOTA4Mn0.mx0NEmduc8tF1JjPaKdFko5Bjxt7yQfgQVGhrKFF8Ro'
);

async function checkAndFixRLS() {
  console.log('=== KIỂM TRA RLS POLICIES ===');

  // Try to query pg_policies via PostgREST
  const { data: policies, error: polError } = await s
    .from('pg_policies')
    .select('*');
  
  console.log('pg_policies result:', JSON.stringify(polError || policies, null, 2));

  // Alternative: Try using SQL via rpc  
  const { data: rpcData, error: rpcError } = await s.rpc('exec_sql', {
    query: "SELECT policyname, tablename, cmd FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage'"
  });
  console.log('rpc exec_sql result:', JSON.stringify(rpcError || rpcData, null, 2));

  // Try direct approach - create a test file, then try to delete
  console.log('\n=== TEST: Upload rồi xóa ===');
  
  const testBlob = Buffer.from('test delete');
  const testPath = '__test_delete_rls__.txt';
  
  // Upload
  const { error: upErr } = await s.storage
    .from('biostation_images')
    .upload(testPath, testBlob, { contentType: 'text/plain', upsert: true });
  
  if (upErr) {
    console.log('Upload error:', upErr.message);
    // If upload also fails, the issue might be broader
  } else {
    console.log('Upload OK');
    
    // Try delete
    const { data: delData, error: delErr } = await s.storage
      .from('biostation_images')
      .remove([testPath]);
    
    console.log('Delete result:', JSON.stringify({ data: delData, error: delErr }));
    
    // Verify
    const { data: listData } = await s.storage
      .from('biostation_images')
      .list('', { search: testPath });
    
    const stillExists = listData && listData.some(f => f.name === testPath);
    console.log('File still exists after delete?', stillExists);
    
    if (stillExists) {
      console.log('\n❌ RLS đang CHẶN DELETE. Cần thêm policy hoặc dùng service_role key.');
      console.log('\nThử dùng REST API trực tiếp...');
      
      // Try direct REST DELETE
      const url = `https://llkbikqnfqrdrmwslniw.supabase.co/storage/v1/object/biostation_images/${testPath}`;
      const resp = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxsa2Jpa3FuZnFyZHJtd3Nsbml3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyNDMwODIsImV4cCI6MjEwMDgxOTA4Mn0.mx0NEmduc8tF1JjPaKdFko5Bjxt7yQfgQVGhrKFF8Ro',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxsa2Jpa3FuZnFyZHJtd3Nsbml3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyNDMwODIsImV4cCI6MjEwMDgxOTA4Mn0.mx0NEmduc8tF1JjPaKdFko5Bjxt7yQfgQVGhrKFF8Ro',
        }
      });
      console.log('REST DELETE status:', resp.status);
      const body = await resp.text();
      console.log('REST DELETE body:', body);
      
      // Verify again
      const { data: listData2 } = await s.storage
        .from('biostation_images')
        .list('', { search: testPath });
      const stillExists2 = listData2 && listData2.some(f => f.name === testPath);
      console.log('Still exists after REST DELETE?', stillExists2);
      
      if (stillExists2) {
        console.log('\n❌ REST API cũng không xóa được. Chắc chắn cần service_role key hoặc sửa RLS trên Dashboard.');
      } else {
        console.log('\n✅ REST API xóa thành công! Sẽ dùng REST API làm fallback.');
      }
    } else {
      console.log('\n✅ Xóa thành công bằng JS client. RLS đã được cấu hình đúng.');
    }
  }
}

checkAndFixRLS().catch(console.error);
