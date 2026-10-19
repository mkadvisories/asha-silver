import React, { useState } from 'react';
import { ShoppingBag, Search, Heart, Sparkles, X, Menu, Lock, Video } from 'lucide-react';
import { LIVE_SILVER_RATES } from '../data/products';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenContact: () => void;
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
  onOpenContact,
  activeCategory,
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
                Dhanteras Mahotsav: Free 5g Pure 999 Silver Coin on orders &gt; ₹15,000
              </span>
              <span className="hidden md:inline text-stone-400">·</span>
              <span className="hidden md:inline text-amber-300 font-normal">
                A legacy of trust since 1989 · Started by Mahesh Agarwal
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

      {/* Live MCX Silver Commodity Rate Ticker Bar */}
      <div className="bg-[#171412] text-amber-100/90 px-4 py-1.5 text-[11px] sm:text-xs border-b border-stone-800 shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto scrollbar-none whitespace-nowrap">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-emerald-950/80 text-emerald-400 px-2 py-0.5 rounded font-bold text-[10px] tracking-wider uppercase border border-emerald-800/60 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
              MCX LIVE SPOT
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-stone-300 font-medium">Silver 1 KG:</span>
              <span className="font-mono font-bold text-white tracking-wide">
                ₹{LIVE_SILVER_RATES.mcxPerKg.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-emerald-400 font-medium text-[10px] sm:text-xs">
                ▲ +₹{LIVE_SILVER_RATES.dayChange} (+{LIVE_SILVER_RATES.dayChangePercent}%)
              </span>
            </div>
            <span className="text-stone-700 hidden sm:inline">|</span>
            <div className="hidden sm:flex items-center gap-1.5 shrink-0">
              <span className="text-stone-300">999 Pure Silver <span className="text-amber-400 text-[10px]">(MCX + 3%)</span>:</span>
              <span className="font-mono font-semibold text-amber-200">
                ₹{LIVE_SILVER_RATES.purity999.toFixed(2)}/g
              </span>
              <span className="text-stone-400 text-[10px]">(₹{LIVE_SILVER_RATES.purity999Per10g.toFixed(2)} / 10g)</span>
            </div>
            <span className="text-stone-700 hidden md:inline">|</span>
            <div className="hidden md:flex items-center gap-1.5 shrink-0">
              <span className="text-stone-300">92.5 Utensils &amp; Thalis:</span>
              <span className="font-sans font-medium text-amber-200 text-xs">
                Price on Request
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-[11px]">
            <span className="hidden lg:inline text-stone-400">
              Day High: ₹{LIVE_SILVER_RATES.dayHigh.toLocaleString('en-IN')} · Low: ₹{LIVE_SILVER_RATES.dayLow.toLocaleString('en-IN')}
            </span>
            <button
              onClick={() => onNavigateToSection('price-lock')}
              className="text-amber-300 hover:text-white font-medium flex items-center gap-1 cursor-pointer underline underline-offset-2"
            >
              <span>Lock Rate</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-20">
          {/* Brand Wordmark & Tagline */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:text-stone-900 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex flex-col">
              <a
                href="#"
                className="font-serif text-2xl sm:text-3xl font-semibold tracking-wider text-stone-900 whitespace-nowrap shrink-0 hover:text-amber-950 transition-colors"
              >
                Asha Silver
              </a>
              <span className="text-[10px] text-amber-900 font-medium tracking-wider uppercase -mt-0.5">
                A legacy of trust since 1989
              </span>
            </div>
          </div>

          {/* Navigation Links including tab name "About us" */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-xs xl:text-sm font-medium text-stone-600">
            <button
              onClick={() => {
                onSelectCategory('utensils');
                onNavigateToSection('collection');
              }}
              className={`hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === 'utensils' ? 'text-stone-950 font-bold' : ''
              }`}
            >
              Silver Utensils
            </button>
            <button
              onClick={() => {
                onSelectCategory('god-items');
                onNavigateToSection('collection');
              }}
              className={`hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === 'god-items' ? 'text-stone-950 font-bold' : ''
              }`}
            >
              Items of God
            </button>
            <button
              onClick={() => {
                onSelectCategory('gifts');
                onNavigateToSection('collection');
              }}
              className={`hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === 'gifts' ? 'text-stone-950 font-bold' : ''
              }`}
            >
              Silver Gifts
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
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer font-medium"
            >
              About us
            </button>
            <button
              onClick={onOpenContact}
              className="px-3 py-1.5 rounded-lg bg-amber-100/80 hover:bg-amber-200/80 text-amber-950 font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 border border-amber-300/60"
            >
              <Video className="w-3.5 h-3.5 text-amber-800" />
              <span>Contact Us</span>
            </button>
          </nav>

          {/* Action triggers: Search, Wishlist, Bag */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
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
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2.5 bg-stone-900 text-stone-50 rounded-lg hover:bg-stone-800 transition-colors shadow-sm whitespace-nowrap shrink-0 cursor-pointer group"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-4 h-4 text-amber-300 group-hover:scale-105 transition-transform" />
              <span className="text-xs font-medium tracking-wide">
                Bag {cartCount > 0 && `(${cartCount})`}
              </span>
              {cartTotal > 0 && (
                <span className="hidden sm:inline text-xs text-stone-400 font-mono">
                  · ₹{cartTotal.toLocaleString()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-[#FAF9F5] px-4 py-4 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium text-stone-700">
            <button
              onClick={() => {
                onSelectCategory('all');
                onNavigateToSection('collection');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-stone-950 cursor-pointer"
            >
              All Silverware
            </button>
            <button
              onClick={() => {
                onSelectCategory('utensils');
                onNavigateToSection('collection');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-stone-950 cursor-pointer font-medium"
            >
              Silver Utensils (Thali Sets &amp; Tableware)
            </button>
            <button
              onClick={() => {
                onSelectCategory('god-items');
                onNavigateToSection('collection');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-stone-950 cursor-pointer font-medium"
            >
              Silver Items of God (Lakshmi-Ganesh Idols)
            </button>
            <button
              onClick={() => {
                onSelectCategory('gifts');
                onNavigateToSection('collection');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-stone-950 cursor-pointer font-medium"
            >
              Silver Gift Items &amp; 999 Coins
            </button>
            <button
              onClick={() => {
                onNavigateToSection('metal-by-purity');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-stone-950 cursor-pointer"
            >
              Metal by Purity (999, 925, 880)
            </button>
            <button
              onClick={() => {
                onNavigateToSection('price-lock');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-amber-900 font-semibold cursor-pointer"
            >
              Lock Silver Price (e.g. 200g)
            </button>
            <button
              onClick={() => {
                onNavigateToSection('about-us');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-stone-950 cursor-pointer font-semibold"
            >
              About us
            </button>
            <button
              onClick={() => {
                onOpenContact();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2.5 px-3 bg-amber-100 text-amber-950 font-bold rounded-lg cursor-pointer flex items-center gap-2"
            >
              <Video className="w-4 h-4 text-amber-800" />
              <span>Contact Us (Schedule Video Call)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
