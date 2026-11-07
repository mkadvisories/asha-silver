import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Heart,
  Sparkles,
  X,
  Menu,
  Lock,
  Video,
  RefreshCw,
  Gift,
  Clock,
  Wine,
  Home,
  Briefcase,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { useSilverRates } from '../context/SilverRateContext';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenContact: () => void;
  onOpenConcierge?: () => void;
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
  onOpenConcierge,
  activeCategory,
  onSelectCategory,
  onNavigateToSection,
}) => {
  const [showBanner, setShowBanner] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);

  // Dynamic 1-hour MCX silver rate feed hook
  const { rates, isRefreshing, formattedCountdown, refreshRates } = useSilverRates();

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
                A legacy of trust since 1989 · Founded by Mahesh Agarwal
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigateToSection('price-lock')}
                className="hidden sm:inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 underline underline-offset-2 transition-colors cursor-pointer"
              >
                <Lock className="w-3 h-3" />
                <span>Initiate Rate Lock (e.g. 200g)</span>
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

      {/* Live MCX Silver Commodity Rate Ticker Bar (Refreshes automatically every 1 hr) */}
      <div className="bg-[#171412] text-amber-100/90 px-4 py-1.5 text-[11px] sm:text-xs border-b border-stone-800 shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto scrollbar-none whitespace-nowrap">
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Live Indicator & Direct Refresh Button */}
            <div className="inline-flex items-center shrink-0">
              <span className="inline-flex items-center gap-1.5 bg-emerald-950/90 text-emerald-400 px-2 py-0.5 rounded-l font-bold text-[10px] tracking-wider uppercase border border-emerald-800/80 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
                MCX SPOT
              </span>
              <button
                onClick={() => refreshRates()}
                disabled={isRefreshing}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-r bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 hover:text-white transition-all cursor-pointer border border-l-0 border-emerald-700/70 disabled:opacity-50 text-[10px] font-semibold active:scale-95 shadow-xs"
                title="Click to pull latest live rate directly from MCX"
                aria-label="Refresh MCX spot rate"
              >
                <RefreshCw className={`w-3 h-3 text-emerald-300 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>{isRefreshing ? 'Scraping...' : 'Refresh'}</span>
              </button>
            </div>

            {/* MCX 1KG Rate */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-stone-300 font-medium">Silver 1 KG:</span>
              <span className="font-mono font-bold text-white tracking-wide">
                ₹{rates.mcxPerKg.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
              <span
                className={`${
                  rates.dayChange < 0 ? 'text-rose-400 font-semibold' : 'text-emerald-400 font-medium'
                } text-[10px] sm:text-xs`}
              >
                {rates.dayChange < 0 ? '▼ -₹' : '▲ +₹'}
                {Math.abs(rates.dayChange).toLocaleString('en-IN')}{' '}
                ({rates.dayChange < 0 ? '' : '+'}{rates.dayChangePercent}%)
              </span>
            </div>

            <span className="text-stone-700 hidden sm:inline">|</span>

            {/* 999 Pure Silver (MCX + 3%) */}
            <div className="hidden sm:flex items-center gap-1.5 shrink-0">
              <span className="text-stone-300">
                999 Pure Silver <span className="text-amber-400 text-[10px]">(MCX + 3%)</span>:
              </span>
              <span className="font-mono font-semibold text-amber-200">
                ₹{rates.purity999.toFixed(2)}/g
              </span>
              <span className="text-stone-400 text-[10px]">
                (₹{rates.purity999Per10g.toFixed(2)} / 10g)
              </span>
            </div>

            <span className="text-stone-700 hidden md:inline">|</span>

            {/* Auto-Refresh Counter indicator (1 Hr Cycle) */}
            <div className="hidden md:flex items-center gap-1.5 text-[11px] text-stone-300 shrink-0">
              <Clock className="w-3 h-3 text-amber-400" />
              <span className="text-stone-400">Auto-refreshes in:</span>
              <span className="font-mono font-bold text-amber-300">{formattedCountdown}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-[11px]">
            <span className="hidden lg:inline text-stone-400 text-[10px]">
              High: ₹{rates.dayHigh.toLocaleString('en-IN')} · Low: ₹{rates.dayLow.toLocaleString('en-IN')}
            </span>

            <button
              onClick={() => onNavigateToSection('price-lock')}
              className="text-amber-300 hover:text-white font-medium flex items-center gap-1 cursor-pointer underline underline-offset-2"
            >
              <span>Initiate Lock</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-20">
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

          {/* Navigation Links with Competitive Benchmarking Categories */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs xl:text-sm font-medium text-stone-600">
            {/* Gifting & Hampers with Badge */}
            <button
              onClick={() => {
                onSelectCategory('hampers');
                onNavigateToSection('collection');
              }}
              className={`hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'hampers' ? 'text-stone-950 font-bold' : ''
              }`}
            >
              <Gift className="w-3.5 h-3.5 text-amber-700" />
              <span>Gifting &amp; Hampers</span>
              <span className="text-[9px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded uppercase">
                Curated
              </span>
            </button>

            {/* Home Decor & Frames */}
            <button
              onClick={() => {
                onSelectCategory('home-decor');
                onNavigateToSection('collection');
              }}
              className={`hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === 'home-decor' ? 'text-stone-950 font-bold' : ''
              }`}
            >
              Home &amp; Decor
            </button>

            {/* Barware & Dining */}
            <button
              onClick={() => {
                onSelectCategory('barware');
                onNavigateToSection('collection');
              }}
              className={`hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === 'barware' ? 'text-stone-950 font-bold' : ''
              }`}
            >
              Barware
            </button>

            {/* Sacred Mandir & Deities */}
            <button
              onClick={() => {
                onSelectCategory('god-items');
                onNavigateToSection('collection');
              }}
              className={`hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === 'god-items' ? 'text-stone-950 font-bold' : ''
              }`}
            >
              Mandir Idols
            </button>

            {/* Silver Utensils */}
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

            {/* Executive Desk */}
            <button
              onClick={() => {
                onSelectCategory('desk');
                onNavigateToSection('collection');
              }}
              className={`hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === 'desk' ? 'text-stone-950 font-bold' : ''
              }`}
            >
              Executive Desk
            </button>

            {/* Rate Lock */}
            <button
              onClick={() => onNavigateToSection('price-lock')}
              className="text-amber-900 hover:text-amber-950 font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1"
            >
              <Lock className="w-3.5 h-3.5 text-amber-700" />
              <span>Lock Rate</span>
            </button>

            {/* About us */}
            <button
              onClick={() => onNavigateToSection('about-us')}
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer font-medium"
            >
              About us
            </button>

            {/* Contact Us */}
            <button
              onClick={onOpenContact}
              className="px-3 py-1.5 rounded-lg bg-amber-100/80 hover:bg-amber-200/80 text-amber-950 font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 border border-amber-300/60"
            >
              <Video className="w-3.5 h-3.5 text-amber-800" />
              <span>Contact Us</span>
            </button>
          </nav>

          {/* Action triggers: Gifting Concierge, Search, Wishlist, Bag */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {onOpenConcierge && (
              <button
                onClick={onOpenConcierge}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                title="Open Bespoke Gifting & Hamper Studio"
              >
                <Gift className="w-3.5 h-3.5 text-amber-800" />
                <span>Gift Studio</span>
              </button>
            )}

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
          {onOpenConcierge && (
            <button
              onClick={() => {
                onOpenConcierge();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 bg-amber-100/90 text-amber-950 font-bold rounded-lg cursor-pointer flex items-center justify-between text-xs"
            >
              <span className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-amber-800" />
                <span>Bespoke Gifting &amp; Hamper Studio</span>
              </span>
              <span className="text-[10px] bg-amber-200 px-2 py-0.5 rounded font-bold">Featured</span>
            </button>
          )}

          <div className="flex flex-col space-y-1.5 text-sm font-medium text-stone-700">
            <button
              onClick={() => {
                onSelectCategory('all');
                onNavigateToSection('collection');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1.5 hover:text-stone-950 cursor-pointer"
            >
              All Fine Silverware
            </button>
            <button
              onClick={() => {
                onSelectCategory('hampers');
                onNavigateToSection('collection');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1.5 hover:text-stone-950 cursor-pointer font-semibold text-amber-950 flex items-center justify-between"
            >
              <span>Luxury Gifting &amp; Hampers</span>
              <span className="text-[10px] bg-amber-100 px-1.5 py-0.5 rounded">Wedding &amp; Festive</span>
            </button>
            <button
              onClick={() => {
                onSelectCategory('home-decor');
                onNavigateToSection('collection');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1.5 hover:text-stone-950 cursor-pointer"
            >
              Home Decor &amp; Pichwai Frames
            </button>
            <button
              onClick={() => {
                onSelectCategory('barware');
                onNavigateToSection('collection');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1.5 hover:text-stone-950 cursor-pointer"
            >
              Barware &amp; Fine Dining Goblets
            </button>
            <button
              onClick={() => {
                onSelectCategory('god-items');
                onNavigateToSection('collection');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1.5 hover:text-stone-950 cursor-pointer"
            >
              Sacred Mandir (Lakshmi-Ganesh Idols)
            </button>
            <button
              onClick={() => {
                onSelectCategory('utensils');
                onNavigateToSection('collection');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1.5 hover:text-stone-950 cursor-pointer"
            >
              Silver Utensils (Thalis &amp; Pitchers)
            </button>
            <button
              onClick={() => {
                onSelectCategory('desk');
                onNavigateToSection('collection');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1.5 hover:text-stone-950 cursor-pointer"
            >
              Executive Desk Accessories
            </button>
            <button
              onClick={() => {
                onNavigateToSection('metal-by-purity');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1.5 hover:text-stone-950 cursor-pointer"
            >
              Metal by Purity (999, 925, 880)
            </button>
            <button
              onClick={() => {
                onNavigateToSection('price-lock');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1.5 text-amber-900 font-semibold cursor-pointer"
            >
              Initiate Silver Rate Lock
            </button>
            <button
              onClick={() => {
                onNavigateToSection('about-us');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1.5 hover:text-stone-950 cursor-pointer font-semibold"
            >
              About us
            </button>
            <button
              onClick={() => {
                onOpenContact();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2.5 px-3 bg-amber-100 text-amber-950 font-bold rounded-lg cursor-pointer flex items-center gap-2 mt-2"
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
