import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://llkbikqnfqrdrmwslniw.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxsa2Jpa3FuZnFyZHJtd3Nsbml3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyNDMwODIsImV4cCI6MjEwMDgxOTA4Mn0.mx0NEmduc8tF1JjPaKdFko5Bjxt7yQfgQVGhrKFF8Ro';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials are missing. Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

