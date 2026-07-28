import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Construct absolute path to .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function migrateData() {
  console.log('Starting migration to Supabase...');

  // 1. Products
  try {
    const { PRODUCTS } = await import('../src/data/products');
    console.log(`Found ${PRODUCTS.length} products to migrate...`);
    
    // We map frontend camelCase fields to Postgres columns
    const productsData = PRODUCTS.map((p: any) => ({
      id: p.id,
      name: p.name,
      subtitle: p.subtitle,
      category: p.category,
      price: p.price,
      rating: p.rating,
      reviewCount: p.reviewCount,
      badge: p.badge,
      image: p.image,
      description: p.description,
      keyBenefits: p.keyBenefits,
      nutritionalInfo: p.nutritionalInfo,
      usageInstructions: p.usageInstructions,
      certifications: p.certifications
    }));

    const { error } = await supabase.from('products').upsert(productsData);
    if (error) throw error;
    console.log('✅ Products migrated successfully.');
  } catch (err: any) {
    console.error('❌ Error migrating products:', err.message);
  }

  // 2. Articles
  try {
    const { ARTICLES } = await import('../src/data/articles');
    console.log(`Found ${ARTICLES.length} articles to migrate...`);
    
    const articlesData = ARTICLES.map((a: any) => ({
      id: a.id,
      title: a.title,
      category: a.category,
      duration: a.duration,
      views: a.views,
      date: a.date,
      image: a.image,
      excerpt: a.excerpt,
      content: a.content
    }));

    const { error } = await supabase.from('articles').upsert(articlesData);
    if (error) throw error;
    console.log('✅ Articles migrated successfully.');
  } catch (err: any) {
    console.error('❌ Error migrating articles:', err.message);
  }

  // 3. Recipes
  try {
    const { RECIPES } = await import('../src/data/recipes');
    console.log(`Found ${RECIPES.length} recipes to migrate...`);
    
    const recipesData = RECIPES.map((r: any) => ({
      id: r.id,
      title: r.title,
      author: r.author,
      time: r.time,
      difficulty: r.difficulty,
      calories: r.calories,
      image: r.image,
      ingredients: r.ingredients,
      steps: r.steps
    }));

    const { error } = await supabase.from('recipes').upsert(recipesData);
    if (error) throw error;
    console.log('✅ Recipes migrated successfully.');
  } catch (err: any) {
    console.error('❌ Error migrating recipes:', err.message);
  }

  // 4. Business Models
  try {
    const { ROADMAP_STAGES } = await import('../src/data/businessModel');
    console.log(`Found ${ROADMAP_STAGES.length} business models to migrate...`);
    
    const bmData = ROADMAP_STAGES.map((b: any) => ({
      id: b.step.toString(),
      title: b.title,
      description: b.description,
      features: null,
      requirements: null,
      investment: null
    }));

    const { error } = await supabase.from('business_models').upsert(bmData);
    if (error) throw error;
    console.log('✅ Business models migrated successfully.');
  } catch (err: any) {
    console.error('❌ Error migrating business models:', err.message);
  }

  console.log('🎉 Migration process completed!');
}

migrateData();
