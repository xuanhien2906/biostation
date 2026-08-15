import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
  const { data, error } = await supabase.storage.from('biostation_images').download('config/site_config.json');
  if (error) {
    console.error("Error downloading:", error);
    return;
  }
  const text = await data.text();
  console.log("Does it contain 50.000đ?", text.includes("50.000"));
  console.log("Does it contain Thiết Kế?", text.includes("Thiết Kế"));
}
check();
