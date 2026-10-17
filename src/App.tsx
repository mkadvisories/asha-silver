import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AkshayTritiyaBanner } from './components/AkshayTritiyaBanner';
import { SilverPriceLockSection } from './components/SilverPriceLockSection';
import { MetalByPuritySection } from './components/MetalByPuritySection';
import { LiveRateCalculator } from './components/LiveRateCalculator';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchWishlistModal } from './components/SearchWishlistModal';
import { AboutMaheshAgarwal } from './components/AboutMaheshAgarwal';
import { HeritageSection } from './components/HeritageSection';
import { Footer } from './components/Footer';
import { PRODUCTS, Product } from './data/products';
import { ASSET_IMAGES } from './assets/images';
import { CartItem, CustomerOrder, SilverPriceLock } from './types/cart';
import { Sparkles, SlidersHorizontal, Check, Filter, X } from 'lucide-react';

export default function App() {
  const [products] = useState<Product[]>(PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [purityFilter, setPurityFilter] = useState<'all' | '925' | '999' | '835'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'weight-desc'>('featured');

  // Load cart from localStorage or default
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('asha_silver_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        product: PRODUCTS[3], // 50g 999 pure silver coin
        quantity: 1,
        giftBoxRequested: true,
        giftNote: 'Auspicious silver blessings for the family'
      }
    ];
  });

  // Load wishlist from localStorage or default
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('asha_silver_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [PRODUCTS[1].id];
  });

  // Synchronize cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('asha_silver_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Synchronize wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('asha_silver_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

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
    }, 3200);
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
    setIsCartOpen(true); // Open bag immediately so user has zero ambiguity
  };

  // Add Silver Price Lock to Cart
  const handleAddLockToCart = (lockData: {
    grams: number;
    purity: '925' | '999';
    ratePerGram: number;
    totalAmount: number;
    durationDays: number;
  }) => {
    const certCode = 'ASL-VOUCHER-' + Math.floor(100000 + Math.random() * 900000);
    const lockProduct: Product = {
      id: `lock-${certCode}`,
      name: `Suraksha Silver Price Lock (${lockData.grams}g - ${lockData.purity} Grade)`,
      hindiName: `सुरक्षा चांदी भाव लॉक वाउचर (${lockData.grams} ग्राम)`,
      category: 'bullion',
      categoryLabel: 'Silver Rate Lock',
      purity: lockData.purity === '999' ? '999 Pure Silver' : '925 Sterling Silver',
      purityCode: lockData.purity,
      weightGrams: lockData.grams,
      price: lockData.totalAmount,
      makingChargesPerGram: 0,
      image: ASSET_IMAGES.silverCoin,
      description: `Official advance rate lock certificate for ${lockData.grams} grams of ${lockData.purity} pure silver at ₹${lockData.ratePerGram.toFixed(2)}/g. Valid for ${lockData.durationDays} days against any jewellery or bullion redemption.`,
      auspiciousSignificance: 'Guarantees lower purchase price against bullion inflation with 100% money-back safety.',
      hallmarkCode: certCode,
      dimensions: `${lockData.grams}g Bullion Backing`,
      inStock: true,
    };

    setCart((prev) => [
      ...prev,
      {
        product: lockProduct,
        quantity: 1,
        isPriceLockItem: true,
        lockDetails: {
          certificateId: certCode,
          lockedGrams: lockData.grams,
          lockedRatePerGram: lockData.ratePerGram,
          purity: lockData.purity,
          validityDays: lockData.durationDays,
        },
      },
    ]);

    showToast(`Added ${lockData.grams}g Silver Rate Lock to your shopping bag`);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from shopping bag');
  };

  const handleClearCart = () => {
    setCart([]);
    showToast('Shopping bag cleared');
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

    // Filter by category
    if (activeCategory === 'akshay-special') {
      result = result.filter((p) => p.isAkshayTritiyaSpecial);
    } else if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Filter by purity if selected
    if (purityFilter !== 'all') {
      result = result.filter((p) => p.purityCode === purityFilter);
    }

    return [...result].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'weight-desc') return b.weightGrams - a.weightGrams;
      // Default: featured first
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, activeCategory, purityFilter, sortBy]);

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
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-stone-50 text-xs px-4 py-3 rounded-lg shadow-2xl border border-stone-700 flex items-center gap-2 animate-fade-in">
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
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setPurityFilter('all');
        }}
        onNavigateToSection={scrollToSection}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onExploreCollection={() => scrollToSection('collection')}
          onOpenPriceLock={() => scrollToSection('price-lock')}
        />

        {/* Dedicated Silver Price Lock Section (e.g. 200g lock-in basis rate) */}
        <SilverPriceLockSection
          onAddLockToCart={handleAddLockToCart}
          onCertificateGenerated={(cert: SilverPriceLock) => {
            showToast(`Official Certificate #${cert.certificateNumber} generated for ${cert.customerName}`);
          }}
        />

        {/* Dedicated Metal by Purity Section (999, 925, 835) */}
        <MetalByPuritySection
          onSelectPurityFilter={(purityCode) => {
            setPurityFilter(purityCode);
            setActiveCategory('all');
          }}
          onNavigateToCollection={() => scrollToSection('collection')}
        />

        {/* Auspicious Akshay Tritiya Banner & Muhurat Card */}
        <AkshayTritiyaBanner
          onExploreAuspicious={() => {
            setActiveCategory('akshay-special');
            setPurityFilter('all');
            scrollToSection('collection');
          }}
          onSelectCoin={() => {
            setActiveCategory('bullion');
            setPurityFilter('999');
            scrollToSection('collection');
          }}
        />

        {/* Featured Silverware & Jewellery Catalog Grid */}
        <section id="collection" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
          <div className="space-y-8">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-900 uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>Certified Hallmarked Fine Silver</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight">
                  Handcrafted Silver Creations
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 max-w-xl">
                  Explore pure 925 sterling silver temple jewellery, consecrated pooja idols, royal banquet thalis, and pure bullion coins.
                </p>
              </div>

              {/* Sorting & Purity Indicators */}
              <div className="flex flex-wrap items-center gap-3 self-start md:self-auto text-xs">
                {purityFilter !== 'all' && (
                  <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-900 font-semibold rounded-md">
                    <span>Filter: {purityFilter} Grade</span>
                    <button
                      onClick={() => setPurityFilter('all')}
                      className="p-0.5 hover:text-amber-950 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
                  <label htmlFor="catalog-sort" className="text-stone-500 whitespace-nowrap">Sort by:</label>
                  <select
                    id="catalog-sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-white border border-stone-300 rounded-md px-2.5 py-1.5 text-xs font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900 cursor-pointer"
                  >
                    <option value="featured">Featured Curations</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="weight-desc">Heaviest Silver Weight</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Interactive Category Filter Tabs (Segmented Controls) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {[
                { id: 'all', label: 'All Creations' },
                { id: 'jewellery', label: 'Temple & Fine Jewellery' },
                { id: 'pooja', label: 'Pooja Idols & Diyas' },
                { id: 'dining', label: 'Royal Dining Thali Sets' },
                { id: 'bullion', label: '999 Pure Coins & Bars' },
                { id: 'bangles', label: 'Elephant Head Kadas' },
                { id: 'akshay-special', label: 'Akshay Tritiya Specials' },
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

            {/* 3-Column Product Grid */}
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

        {/* Dedicated About Us Section - Founded by Mahesh Agarwal in 1989 */}
        <AboutMaheshAgarwal />

        {/* Heritage Section: 37 Years Lineage, Hallmark Decoder, & Multi-decade Testimonials */}
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
        onBrowseMore={() => scrollToSection('collection')}
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
          setPurityFilter('all');
          scrollToSection('collection');
        }}
      />
    </div>
  );
}
