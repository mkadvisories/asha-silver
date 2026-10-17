import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AkshayTritiyaBanner } from './components/AkshayTritiyaBanner';
import { LiveRateCalculator } from './components/LiveRateCalculator';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchWishlistModal } from './components/SearchWishlistModal';
import { HeritageSection } from './components/HeritageSection';
import { Footer } from './components/Footer';
import { PRODUCTS, Product } from './data/products';
import { CartItem, CustomerOrder } from './types/cart';
import { Sparkles, SlidersHorizontal, Check } from 'lucide-react';

export default function App() {
  const [products] = useState<Product[]>(PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'weight-desc'>('featured');

  // Cart & Wishlist State
  const [cart, setCart] = useState<CartItem[]>([
    // Start with 1 auspicious Akshay Tritiya coin in cart for instant joy
    {
      product: PRODUCTS[3], // 50g 999 pure silver coin
      quantity: 1,
      giftBoxRequested: true,
      giftNote: 'Shubh Akshay Tritiya blessings for the family'
    }
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([PRODUCTS[1].id]);

  // Modal States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [searchModal, setSearchModal] = useState<{ isOpen: boolean; mode: 'search' | 'wishlist' }>({
    isOpen: false,
    mode: 'search',
  });

  // Notification Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Cart Management
  const handleAddToCart = (
    product: Product,
    quantity = 1,
    giftBox = true,
    giftNote = ''
  ) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, giftBoxRequested: giftBox, giftNote }
            : item
        );
      }
      return [...prev, { product, quantity, giftBoxRequested: giftBox, giftNote }];
    });
    showToast(`Added ${product.name} to your bag`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from bag');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist Management
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Removed from saved`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Saved ${product.name} to wishlist`);
        return [...prev, product.id];
      }
    });
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let result = products;

    if (activeCategory === 'akshay-special') {
      result = result.filter((p) => p.isAkshayTritiyaSpecial);
    } else if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    return [...result].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'weight-desc') return b.weightGrams - a.weightGrams;
      // Default: featured first
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, activeCategory, sortBy]);

  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-900 flex flex-col font-sans selection:bg-amber-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-stone-50 text-xs px-4 py-3 rounded-lg shadow-xl border border-stone-700 flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Header
        cartCount={cartItemCount}
        cartTotal={cartTotal}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setSearchModal({ isOpen: true, mode: 'wishlist' })}
        onOpenSearch={() => setSearchModal({ isOpen: true, mode: 'search' })}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => setActiveCategory(cat)}
        onNavigateToSection={scrollToSection}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onExploreCollection={() => scrollToSection('collection')}
          onOpenCalculator={() => scrollToSection('rate-calculator')}
        />

        {/* Auspicious Akshay Tritiya Banner & Muhurat Card */}
        <AkshayTritiyaBanner
          onExploreAuspicious={() => {
            setActiveCategory('all');
            scrollToSection('collection');
          }}
          onSelectCoin={() => {
            setActiveCategory('bullion');
            scrollToSection('collection');
          }}
        />

        {/* Featured Akshay Tritiya Collection Grid */}
        <section id="collection" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
          <div className="space-y-8">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-900 uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>Curated for Akshaya Abundance</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight">
                  Precious Silver Heirlooms
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 max-w-xl">
                  Each creation is crafted from pure 925 sterling silver or 999 fine bullion, stamped with official government BIS hallmarking.
                </p>
              </div>

              {/* Sorting Dropdown */}
              <div className="flex items-center gap-2 text-xs self-start md:self-auto">
                <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
                <label htmlFor="sort-collection-select" className="text-stone-500 whitespace-nowrap">Sort by:</label>
                <select
                  id="sort-collection-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-stone-200 rounded-md px-2.5 py-1.5 text-xs font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900 cursor-pointer"
                >
                  <option value="featured">Featured Curations</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="weight-desc">Heaviest Silver Weight</option>
                </select>
              </div>
            </div>

            {/* Interactive Filter Tabs (Segmented Controls) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              {[
                { id: 'all', label: 'All Curations' },
                { id: 'pooja', label: 'Pooja Idols & Diyas' },
                { id: 'jewellery', label: 'Temple Jewellery' },
                { id: 'dining', label: 'Royal Dining Sets' },
                { id: 'bullion', label: '999 Pure Coins' },
                { id: 'bangles', label: 'Antique Bangles' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-stone-900 text-stone-50 shadow-sm'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* 3-Column Product Grid (Responsive: 1 col on mobile, 2 on tablet, 3 on desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onToggleWishlist={handleToggleWishlist}
                  onQuickView={(p) => setSelectedProduct(p)}
                  onAddToCart={(p) => handleAddToCart(p, 1)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Live Transparent Silver Rate Calculator */}
        <LiveRateCalculator
          onSelectPoojaCategory={() => {
            setActiveCategory('pooja');
            scrollToSection('collection');
          }}
        />

        {/* Heritage Section: 1989 Legacy, Hallmarking & Testimonials */}
        <HeritageSection />
      </main>

      {/* Product Detail Modal (PDP) */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Cart Drawer & Checkout Flow */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onOrderSuccess={(order: CustomerOrder) => {
          showToast(`Order #${order.orderId} placed successfully!`);
        }}
      />

      {/* Search & Wishlist Drawer Modal */}
      <SearchWishlistModal
        isOpen={searchModal.isOpen}
        mode={searchModal.mode}
        onClose={() => setSearchModal({ ...searchModal, isOpen: false })}
        products={products}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
        onQuickView={(p) => setSelectedProduct(p)}
        onAddToCart={(p) => handleAddToCart(p, 1)}
      />

      {/* Luxury Footer */}
      <Footer
        onNavigateToSection={scrollToSection}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToSection('collection');
        }}
      />
    </div>
  );
}
