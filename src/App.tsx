import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { DhanterasBanner } from './components/DhanterasBanner';
import { SilverPriceLockSection } from './components/SilverPriceLockSection';
import { MetalByPuritySection } from './components/MetalByPuritySection';
import { LiveRateCalculator } from './components/LiveRateCalculator';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchWishlistModal } from './components/SearchWishlistModal';
import { GiftingConciergeModal } from './components/GiftingConciergeModal';
import { AboutMaheshAgarwal } from './components/AboutMaheshAgarwal';
import { HeritageSection } from './components/HeritageSection';
import { ContactUsSection } from './components/ContactUsSection';
import { ContactUsModal, VideoCallBooking } from './components/ContactUsModal';
import { Footer } from './components/Footer';
import { PRODUCTS, Product, ProductCategory } from './data/products';
import { ASSET_IMAGES } from './assets/images';
import { CartItem, CustomerOrder, SilverPriceLock } from './types/cart';
import { SilverRateProvider } from './context/SilverRateContext';
import {
  Sparkles,
  SlidersHorizontal,
  Check,
  Filter,
  X,
  Video,
  Gift,
  Award,
  ShieldCheck,
  ChevronRight,
  Package,
} from 'lucide-react';

export default function App() {
  const [products] = useState<Product[]>(PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [purityFilter, setPurityFilter] = useState<'all' | '925' | '999' | '880'>('all');
  const [occasionFilter, setOccasionFilter] = useState<string>('all');
  const [budgetFilter, setBudgetFilter] = useState<string>('all');
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
        product: PRODUCTS[0], // Royal Grandeur Velvet Gifting Hamper
        quantity: 1,
        giftBoxRequested: true,
        giftNote: 'Shubh Dhanteras & Diwali blessings for the family',
      },
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
    return [PRODUCTS[2].id]; // Pichwai lotus frame
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
  const [quoteInquiryProduct, setQuoteInquiryProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState<boolean>(false);
  const [searchModal, setSearchModal] = useState<{ isOpen: boolean; mode: 'search' | 'wishlist' }>({
    isOpen: false,
    mode: 'search',
  });

  const handleRequestQuote = (product: Product) => {
    setQuoteInquiryProduct(product);
    setIsContactModalOpen(true);
  };

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
    setIsCartOpen(true);
  };

  // Add Silver Price Lock to Cart
  const handleAddLockToCart = (lockData: {
    grams: number;
    purity: '999' | '880' | '925';
    ratePerGram: number;
    totalAmount: number;
    durationDays: number;
  }) => {
    const lockCode = 'ASL-LOCK-' + Math.floor(100000 + Math.random() * 900000);
    const lockProduct: Product = {
      id: `lock-${lockCode}`,
      name: `Suraksha Silver Price Lock (${lockData.grams}g - ${lockData.purity} Grade)`,
      hindiName: `सुरक्षा चांदी भाव लॉक वाउचर (${lockData.grams} ग्राम)`,
      category: 'bullion',
      categoryLabel: 'Silver Rate Lock',
      purity: lockData.purity === '999' ? '999 Pure Silver' : lockData.purity === '880' ? '880 Traditional Silverware' : '925 Sterling Silver',
      purityCode: lockData.purity as any,
      weightGrams: lockData.grams,
      price: lockData.totalAmount,
      makingChargesPerGram: 0,
      image: ASSET_IMAGES.silverCoin,
      description: `Official advance rate lock booking for ${lockData.grams} grams of ${lockData.purity} pure silver at ₹${lockData.ratePerGram.toFixed(2)}/g. Valid for ${lockData.durationDays} days against silver utensils, god items, or bullion redemption.`,
      auspiciousSignificance: 'Guarantees locked rate against silver market inflation with 100% money-back safety.',
      dimensions: `${lockData.grams}g Silver Bullion Backing`,
      inStock: true,
    };

    setCart((prev) => [
      ...prev,
      {
        product: lockProduct,
        quantity: 1,
        isPriceLockItem: true,
        lockDetails: {
          lockBookingId: lockCode,
          lockedGrams: lockData.grams,
          lockedRatePerGram: lockData.ratePerGram,
          purity: lockData.purity as any,
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

    // Filter by primary category
    if (activeCategory === 'dhanteras-special') {
      result = result.filter((p) => p.isDhanterasSpecial);
    } else if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Filter by purity if selected
    if (purityFilter !== 'all') {
      result = result.filter((p) => p.purityCode === purityFilter);
    }

    // Filter by gifting occasion
    if (occasionFilter !== 'all') {
      result = result.filter((p) => p.giftingOccasion === occasionFilter);
    }

    // Filter by budget benchmark
    if (budgetFilter !== 'all') {
      if (budgetFilter === 'under-2500') {
        result = result.filter((p) => (p.price || 0) <= 2500 && !p.priceOnRequest);
      } else if (budgetFilter === '2500-5000') {
        result = result.filter((p) => (p.price || 0) > 2500 && (p.price || 0) <= 5000);
      } else if (budgetFilter === '5000-15000') {
        result = result.filter((p) => (p.price || 0) > 5000 && (p.price || 0) <= 15000);
      } else if (budgetFilter === 'above-15000') {
        result = result.filter((p) => (p.price || 0) > 15000 || p.priceOnRequest);
      }
    }

    return [...result].sort((a, b) => {
      if (sortBy === 'price-asc') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'price-desc') return (b.price || 0) - (a.price || 0);
      if (sortBy === 'weight-desc') return b.weightGrams - a.weightGrams;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, activeCategory, purityFilter, occasionFilter, budgetFilter, sortBy]);

  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price || 0) * item.quantity, 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <SilverRateProvider>
      <div className="min-h-screen bg-[#FAF9F5] text-stone-900 flex flex-col font-sans selection:bg-amber-200">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-stone-50 text-xs px-4 py-3 rounded-lg shadow-2xl border border-stone-700 flex items-center gap-2 animate-fade-in">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Bar Navigation with Auto-refreshing MCX Ticker & Competitive Categories */}
        <Header
          cartCount={cartItemCount}
          cartTotal={cartTotal}
          wishlistCount={wishlistIds.length}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => setSearchModal({ isOpen: true, mode: 'wishlist' })}
          onOpenSearch={() => setSearchModal({ isOpen: true, mode: 'search' })}
          onOpenContact={() => setIsContactModalOpen(true)}
          onOpenConcierge={() => setIsConciergeOpen(true)}
          activeCategory={activeCategory}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            setPurityFilter('all');
            setOccasionFilter('all');
            setBudgetFilter('all');
          }}
          onNavigateToSection={scrollToSection}
        />

        <main className="flex-1">
          {/* Landing Hero Section: "A legacy of trust since 1989" */}
          <HeroSection
            onExploreCollection={() => scrollToSection('collection')}
            onOpenPriceLock={() => scrollToSection('price-lock')}
            onOpenContact={() => setIsContactModalOpen(true)}
            onOpenConcierge={() => setIsConciergeOpen(true)}
          />

          {/* Dedicated Silver Price Lock Section (Initiation Flow) */}
          <SilverPriceLockSection
            onAddLockToCart={handleAddLockToCart}
            onLockGenerated={(lock: SilverPriceLock) => {
              showToast(`Rate lock request #${lock.confirmationNumber} initiated! We will call you shortly.`);
            }}
          />

          {/* Dedicated Metal by Purity Section (999, 925, 880) */}
          <MetalByPuritySection
            onSelectPurityFilter={(purityCode) => {
              setPurityFilter(purityCode);
              setActiveCategory('all');
            }}
            onNavigateToCollection={() => scrollToSection('collection')}
          />

          {/* Auspicious Dhanteras Banner & Shubh Muhurat Card */}
          <DhanterasBanner
            onExploreAuspicious={() => {
              setActiveCategory('dhanteras-special');
              setPurityFilter('all');
              scrollToSection('collection');
            }}
            onSelectUtensils={() => {
              setActiveCategory('utensils');
              setPurityFilter('all');
              scrollToSection('collection');
            }}
          />

          {/* Catalog Grid with Competitive Benchmarking Categories & Gifting Studio Callout */}
          <section id="collection" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
            <div className="space-y-8">
              {/* Feature Banner: Bespoke Gifting & Curated Hamper Studio */}
              <div className="relative rounded-2xl bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white p-6 sm:p-8 overflow-hidden shadow-xl border border-amber-900/30">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                      <Gift className="w-4 h-4 text-amber-400" />
                      <span>Asha Silver Bespoke Studio</span>
                      <span className="text-stone-400">·</span>
                      <span className="text-stone-300 font-normal">Luxury Hampers, Barware &amp; Decor</span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-semibold leading-tight">
                      Curated Silver Hampers &amp; Heirloom Keepsakes
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                      Customized luxury presentation in handcrafted midnight-blue or crimson velvet gift boxes. Complimentary laser monogramming, couple name engraving, and auspicious roli-chawal for weddings, graha pravesh, and corporate milestones.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => setIsConciergeOpen(true)}
                      className="px-5 py-3 bg-amber-200 hover:bg-amber-100 text-stone-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <Gift className="w-4 h-4" />
                      <span>Customize Hamper</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Section Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-900 uppercase tracking-widest">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>A Legacy of Trust Since 1989</span>
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight">
                    Pure Silver Utensils, Deities &amp; Lifestyle Collections
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-500 max-w-xl">
                    Handcrafted by master Indian silversmiths. Filter by lifestyle category, gifting occasion, or budget benchmark.
                  </p>
                </div>

                {/* Sorting & Filter Reset */}
                <div className="flex flex-wrap items-center gap-3 self-start md:self-auto text-xs">
                  {(purityFilter !== 'all' || occasionFilter !== 'all' || budgetFilter !== 'all') && (
                    <button
                      onClick={() => {
                        setPurityFilter('all');
                        setOccasionFilter('all');
                        setBudgetFilter('all');
                      }}
                      className="flex items-center gap-1 px-2.5 py-1 bg-stone-200 text-stone-800 font-medium rounded-md hover:bg-stone-300 cursor-pointer"
                    >
                      <span>Reset Filters</span>
                      <X className="w-3 h-3" />
                    </button>
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

              {/* Primary Category Filter Tabs (Competitive Reference Navigation) */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {[
                  { id: 'all', label: 'All Collections' },
                  { id: 'hampers', label: 'Luxury Hampers & Gift Sets' },
                  { id: 'home-decor', label: 'Home Decor & Pichwai Frames' },
                  { id: 'barware', label: 'Barware & Fine Dining' },
                  { id: 'god-items', label: 'Items of God (Mandir Idols)' },
                  { id: 'utensils', label: 'Silver Utensils (Thalis & Pitchers)' },
                  { id: 'desk', label: 'Executive Desk & Accessories' },
                  { id: 'gifts', label: '999 Pure Coins & Tokens' },
                  { id: 'dhanteras-special', label: 'Dhanteras Specials' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id)}
                    className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      activeCategory === tab.id
                        ? 'bg-stone-900 text-stone-50 shadow-sm font-semibold'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Secondary Navigation: Gifting Occasion & Budget Tiers */}
              <div className="bg-white p-4 rounded-xl border border-stone-200/90 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                {/* Occasion Filter */}
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
                  <span className="font-semibold text-stone-700 whitespace-nowrap text-[11px] uppercase tracking-wider">
                    Occasion:
                  </span>
                  {[
                    { id: 'all', label: 'All Occasions' },
                    { id: 'baby', label: '👶 New Born & Baby' },
                    { id: 'wedding', label: '💍 Wedding & Anniversary' },
                    { id: 'housewarming', label: '🏡 Graha Pravesh' },
                    { id: 'corporate', label: '💼 Corporate Milestones' },
                    { id: 'festive', label: '🪔 Diwali & Dhanteras' },
                  ].map((occ) => (
                    <button
                      key={occ.id}
                      onClick={() => setOccasionFilter(occ.id)}
                      className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer text-xs ${
                        occasionFilter === occ.id
                          ? 'bg-amber-100 text-amber-950 font-bold border border-amber-300'
                          : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200'
                      }`}
                    >
                      {occ.label}
                    </button>
                  ))}
                </div>

                {/* Budget Benchmark Filter */}
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-none border-t md:border-t-0 pt-2 md:pt-0">
                  <span className="font-semibold text-stone-700 whitespace-nowrap text-[11px] uppercase tracking-wider">
                    Budget:
                  </span>
                  {[
                    { id: 'all', label: 'All Prices' },
                    { id: 'under-2500', label: '< ₹2,500' },
                    { id: '2500-5000', label: '₹2.5K – ₹5K' },
                    { id: '5000-15000', label: '₹5K – ₹15K' },
                    { id: 'above-15000', label: '₹15K+' },
                  ].map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setBudgetFilter(b.id)}
                      className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer text-xs ${
                        budgetFilter === b.id
                          ? 'bg-stone-900 text-white font-bold'
                          : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200'
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
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
                    onRequestQuote={handleRequestQuote}
                  />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-8 space-y-3">
                  <p className="text-stone-600 text-sm">No products found matching your current filter combination.</p>
                  <button
                    onClick={() => {
                      setActiveCategory('all');
                      setPurityFilter('all');
                      setOccasionFilter('all');
                      setBudgetFilter('all');
                    }}
                    className="px-4 py-2 bg-stone-900 text-stone-50 text-xs font-semibold rounded-lg hover:bg-stone-800 cursor-pointer"
                  >
                    View All Silverware
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Live Transparent Silver Rate Calculator (1-Hr Refreshed Engine) */}
          <LiveRateCalculator
            onSelectPoojaCategory={() => {
              setActiveCategory('god-items');
              scrollToSection('collection');
            }}
          />

          {/* Dedicated About Us Section - Founded by Mahesh Agarwal in 1989 */}
          <AboutMaheshAgarwal />

          {/* Heritage Section: 37 Years Lineage & Decades of Patron Trust */}
          <HeritageSection />

          {/* Contact Us Section: Schedule Video Call Appointment */}
          <ContactUsSection
            onBookingSuccess={(booking: VideoCallBooking) => {
              showToast(`Video call appointment scheduled for ${booking.date}`);
            }}
          />
        </main>

        {/* Product Detail Modal (PDP) */}
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
          onToggleWishlist={handleToggleWishlist}
          onRequestQuote={handleRequestQuote}
        />

        {/* Bespoke Gifting Concierge & Hamper Studio Modal */}
        <GiftingConciergeModal
          isOpen={isConciergeOpen}
          onClose={() => setIsConciergeOpen(false)}
          onAddToCart={handleAddToCart}
          onSelectProductForDetail={(p) => setSelectedProduct(p)}
        />

        {/* Cart Drawer & Checkout Flow (Cash on Delivery Only) */}
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

        {/* Contact Us & Schedule Video Call Modal */}
        <ContactUsModal
          isOpen={isContactModalOpen}
          onClose={() => {
            setIsContactModalOpen(false);
            setQuoteInquiryProduct(null);
          }}
          inquiryProduct={quoteInquiryProduct}
        />

        {/* Luxury Footer with Contact Us & Video Call link */}
        <Footer
          onNavigateToSection={scrollToSection}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            setPurityFilter('all');
            setOccasionFilter('all');
            setBudgetFilter('all');
            scrollToSection('collection');
          }}
          onOpenContact={() => setIsContactModalOpen(true)}
        />
      </div>
    </SilverRateProvider>
  );
}
