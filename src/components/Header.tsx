import React, { useState } from 'react';
import { ShoppingBag, Search, Heart, Sparkles, X, Menu, Lock } from 'lucide-react';
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
                Akshay Tritiya Mahotsav: Free 5g Pure 999 Silver Coin on orders &gt; ₹15,000
              </span>
              <span className="hidden md:inline text-stone-400">·</span>
              <span className="hidden md:inline text-stone-300">
                Purity Guaranteed Since 1989 by Mahesh Agarwal
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigateToSection('price-lock')}
                className="hidden sm:inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 underline underline-offset-2 transition-colors cursor-pointer"
              >
                <Lock className="w-3 h-3" />
                <span>Lock In Silver Rate (e.g. 200g)</span>
              </button>
              <button
                onClick={() => setShowBanner(false)}
                className="text-stone-400 hover:text-stone-200 p-0.5 cursor-pointer"
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
              className="lg:hidden p-2 text-stone-700 hover:text-stone-900 cursor-pointer"
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
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
            <button
              onClick={() => {
                onSelectCategory('all');
                onNavigateToSection('collection');
              }}
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-stone-900 font-semibold"
            >
              Silver Jewellery
            </button>
            <button
              onClick={() => {
                onSelectCategory('pooja');
                onNavigateToSection('collection');
              }}
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Pooja &amp; Silverware
            </button>
            <button
              onClick={() => onNavigateToSection('metal-by-purity')}
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Metal by Purity
            </button>
            <button
              onClick={() => onNavigateToSection('price-lock')}
              className="text-amber-900 hover:text-amber-950 font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1"
            >
              <Lock className="w-3.5 h-3.5 text-amber-700" />
              <span>Lock Silver Price</span>
            </button>
            <button
              onClick={() => onNavigateToSection('about-us')}
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              About Mahesh Agarwal
            </button>
          </nav>

          {/* Zone 3: 1 primary action (Bag & secondary utility triggers) */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
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
                onSelectCategory('jewellery');
                onNavigateToSection('collection');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-stone-100 flex items-center justify-between"
            >
              <span>Fine Silver Jewellery</span>
              <span className="text-xs text-stone-400">925 Hallmarked</span>
            </button>
            <button
              onClick={() => {
                onSelectCategory('pooja');
                onNavigateToSection('collection');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-stone-100"
            >
              Pooja Silverware &amp; Sacred Idols
            </button>
            <button
              onClick={() => {
                onSelectCategory('dining');
                onNavigateToSection('collection');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-stone-100"
            >
              Rajwada Silver Dining Thalis
            </button>
            <button
              onClick={() => {
                onSelectCategory('bullion');
                onNavigateToSection('collection');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-stone-100"
            >
              999 Pure Silver Bullion Coins
            </button>
            <button
              onClick={() => {
                onNavigateToSection('metal-by-purity');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-stone-100"
            >
              Metal by Purity Guide
            </button>
            <button
              onClick={() => {
                onNavigateToSection('price-lock');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-stone-100 text-amber-900 font-semibold flex items-center justify-between"
            >
              <span>Lock Silver Rate (200g etc.)</span>
              <span className="text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded">Suraksha</span>
            </button>
            <button
              onClick={() => {
                onNavigateToSection('about-us');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-stone-900 font-medium"
            >
              About Founder Mahesh Agarwal (1989)
            </button>
          </div>
          <div className="pt-2 text-xs text-stone-500 flex items-center justify-between border-t border-stone-200">
            <span>BIS Hallmarked 925 &amp; 999</span>
            <span>Est. 1989 by Mahesh Agarwal</span>
          </div>
        </div>
      )}
    </header>
  );
};
