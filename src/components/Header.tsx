import React, { useState } from 'react';
import { ShoppingBag, Search, Heart, Sparkles, X, Menu } from 'lucide-react';
import { LIVE_SILVER_RATES } from '../data/products';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onSelectCategory,
  onNavigateToSection,
}) => {
  const [showBanner, setShowBanner] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Auspicious Festive Announcement Strip */}
      {showBanner && (
        <div className="bg-[#1C1917] text-[#FAF9F5] px-4 py-2 text-xs border-b border-stone-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="font-medium tracking-wide">
                Akshay Tritiya Mahotsav: Complimentary 5g Pure 999 Silver Coin on orders above ₹15,000
              </span>
              <span className="hidden md:inline text-stone-400">·</span>
              <span className="hidden md:inline text-stone-300">
                Auspicious Muhurat: {LIVE_SILVER_RATES.muhurat.timeWindow}
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigateToSection('rate-calculator')}
                className="hidden sm:inline-block text-amber-300 hover:text-amber-200 underline underline-offset-2 transition-colors cursor-pointer"
              >
                Live Silver Rate: ₹{LIVE_SILVER_RATES.purity925}/g
              </button>
              <button
                onClick={() => setShowBanner(false)}
                className="text-stone-400 hover:text-stone-200 p-0.5"
                aria-label="Dismiss banner"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Top Bar (Conforming to Top Bar Contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:text-stone-900"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <a
              href="#"
              className="font-serif text-2xl sm:text-3xl font-semibold tracking-wider text-stone-900 whitespace-nowrap shrink-0 hover:text-amber-950 transition-colors"
            >
              Asha Silver
            </a>
          </div>

          {/* Zone 2: 4-5 concise single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-600">
            <button
              onClick={() => {
                onSelectCategory('all');
                onNavigateToSection('collection');
              }}
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-stone-900 font-semibold"
            >
              Akshay Tritiya
            </button>
            <button
              onClick={() => {
                onSelectCategory('pooja');
                onNavigateToSection('collection');
              }}
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Pooja Silverware
            </button>
            <button
              onClick={() => {
                onSelectCategory('jewellery');
                onNavigateToSection('collection');
              }}
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Temple Jewellery
            </button>
            <button
              onClick={() => {
                onSelectCategory('bullion');
                onNavigateToSection('collection');
              }}
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Coins & Bullion
            </button>
            <button
              onClick={() => onNavigateToSection('heritage')}
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Since 1989
            </button>
          </nav>

          {/* Zone 3: 1 primary action (Bag & secondary utility triggers) */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={onOpenSearch}
              className="p-2 text-stone-700 hover:text-stone-950 transition-colors cursor-pointer"
              title="Search silver collection"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-stone-700 hover:text-stone-950 transition-colors cursor-pointer"
              title="Saved items"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenCart}
              className="flex items-center gap-2.5 px-4 py-2.5 bg-stone-900 text-stone-50 rounded-lg hover:bg-stone-800 transition-colors shadow-sm whitespace-nowrap shrink-0 cursor-pointer group"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-4 h-4 text-amber-300 group-hover:scale-105 transition-transform" />
              <span className="text-xs font-medium tracking-wide">
                Bag {cartCount > 0 && `(${cartCount})`}
              </span>
              {cartTotal > 0 && (
                <span className="text-xs font-semibold text-stone-200 tabular-nums border-l border-stone-700 pl-2">
                  ₹{cartTotal.toLocaleString('en-IN')}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-[#FAF9F5] px-6 py-4 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium text-stone-800">
            <button
              onClick={() => {
                onSelectCategory('all');
                onNavigateToSection('collection');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-stone-100 flex items-center justify-between"
            >
              <span>Akshay Tritiya Special</span>
              <span className="text-xs text-amber-700">Auspicious</span>
            </button>
            <button
              onClick={() => {
                onSelectCategory('pooja');
                onNavigateToSection('collection');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-stone-100"
            >
              Pooja Silverware & Idols
            </button>
            <button
              onClick={() => {
                onSelectCategory('jewellery');
                onNavigateToSection('collection');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-stone-100"
            >
              Temple Jewellery
            </button>
            <button
              onClick={() => {
                onSelectCategory('dining');
                onNavigateToSection('collection');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-stone-100"
            >
              Royal Dining Sets
            </button>
            <button
              onClick={() => {
                onSelectCategory('bullion');
                onNavigateToSection('collection');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-stone-100"
            >
              999 Pure Silver Coins
            </button>
            <button
              onClick={() => {
                onNavigateToSection('rate-calculator');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-stone-100 text-amber-900 font-semibold"
            >
              Live Silver Rate Calculator
            </button>
            <button
              onClick={() => {
                onNavigateToSection('heritage');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2"
            >
              Our Heritage (Since 1989)
            </button>
          </div>
          <div className="pt-2 text-xs text-stone-500 flex items-center justify-between border-t border-stone-200">
            <span>BIS Hallmarked 925 & 999</span>
            <span>Est. 1989</span>
          </div>
        </div>
      )}
    </header>
  );
};
