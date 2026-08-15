import React, { useState } from 'react';
import { TabType, Product, Article, CartItem } from './types';
import { Header } from './components/Header';
import { HomeOverview } from './components/HomeOverview';
import { BusinessModelCanvas } from './components/BusinessModelCanvas';
import { StationNetwork } from './components/StationNetwork';
import { BodyTypeQuiz } from './components/BodyTypeQuiz';
import { ProductStore } from './components/ProductStore';
import { CartDrawer } from './components/CartDrawer';
import { RecipeDirectory } from './components/RecipeDirectory';
import { KnowledgeBase } from './components/KnowledgeBase';
import { AiAdvisor } from './components/AiAdvisor';
import { SuccessStories } from './components/SuccessStories';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { PRODUCTS } from './data/products';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('BIO_STATION_CART');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync cart to localStorage whenever it changes
  React.useEffect(() => {
    try {
      localStorage.setItem('BIO_STATION_CART', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Could not save cart to localStorage:', e);
    }
  }, [cartItems]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất Cả');

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProductId(product.id);
    setActiveTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSelectedProductId(undefined);
    setActiveTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (article: Article) => {
    setActiveTab('knowledge');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f8f5f0] text-[#2d241e] font-sans selection:bg-[#274e23] selection:text-white flex flex-col justify-between">
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        setIsCartOpen={setIsCartOpen}
        onSelectProduct={handleSelectProduct}
        onSelectArticle={handleSelectArticle}
      />

      {/* Main Content */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeOverview
            setActiveTab={setActiveTab}
            onAddToCart={handleAddToCart}
            onSelectCategory={handleSelectCategory}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {activeTab === 'model' && (
          <BusinessModelCanvas 
            onGoToShop={() => {
              setActiveTab('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToNetwork={() => {
              setActiveTab('network');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'network' && <StationNetwork />}

        {activeTab === 'shop' && (
          <ProductStore
            onAddToCart={handleAddToCart}
            selectedProductId={selectedProductId}
            selectedCategory={selectedCategory}
            onClearSelectedProductId={() => setSelectedProductId(undefined)}
          />
        )}

        {activeTab === 'recipes' && <RecipeDirectory />}

        {activeTab === 'knowledge' && <KnowledgeBase onSelectProduct={handleSelectProduct} />}

        {activeTab === 'quiz' && <BodyTypeQuiz onGoToShop={() => setActiveTab('shop')} />}

        {activeTab === 'advisor' && <AiAdvisor />}

        {activeTab === 'stories' && <SuccessStories />}

        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Slide-over Shopping Cart */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Global Footer */}
      <Footer setActiveTab={setActiveTab} />
      
      {/* Floating Actions */}
      <FloatingActions />
    </div>
  );
}
