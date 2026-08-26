require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function checkUser() {
  const { data: blob, error } = await supabase.storage
    .from('biostation_images')
    .download('config/admin_users.json');

  if (error) {
    console.error("Error downloading admin_users:", error);
    return;
  }

  const text = await blob.text();
  const users = JSON.parse(text);
  
  const anhHoa = users.find(u => u.fullName.includes('Hòa') || u.username.includes('hoa'));
  console.log("Found Anh Hoa user:", JSON.stringify(anhHoa, null, 2));

  // If found and missing chaoluame, update it
  if (anhHoa && !anhHoa.permissions.allowedTabs.includes('chaoluame')) {
    anhHoa.permissions.allowedTabs.push('chaoluame');
    const updatedJson = JSON.stringify(users, null, 2);
    const uploadBlob = new Blob([updatedJson], { type: 'application/json' });
    
    const { error: uploadError } = await supabase.storage
      .from('biostation_images')
      .upload('config/admin_users.json', uploadBlob, {
        upsert: true,
        contentType: 'application/json',
      });
      
    if (uploadError) {
      console.error("Error uploading:", uploadError);
    } else {
      console.log("Successfully updated Anh Hoa to include chaoluame.");
    }
  } else {
      console.log("No update needed or user not found.");
  }
}

checkUser();
