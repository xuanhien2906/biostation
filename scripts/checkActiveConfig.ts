import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkCurrentConfig() {
  const { data, error } = await supabase.storage.from('biostation_images').download('config/site_config.json');

  if (error) {
    console.error('Error downloading config:', error);
    return;
  }

  if (data) {
    const text = await data.text();
    const config = JSON.parse(text);
    console.log("CURRENT EXPERIENCE MEAL CONFIG:");
    console.log(JSON.stringify(config.experienceMealConfig, null, 2));
  }
}

checkCurrentConfig();
