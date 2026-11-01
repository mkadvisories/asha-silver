import React, { useState } from 'react';
import { Gift, Sparkles, X, Check, Heart, ShieldCheck, ChevronRight, Package, PenTool } from 'lucide-react';
import { Product, PRODUCTS, isGiftingProduct } from '../data/products';

interface GiftingConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity?: number, giftBox?: boolean, giftNote?: string) => void;
  onSelectProductForDetail: (product: Product) => void;
}

export const GiftingConciergeModal: React.FC<GiftingConciergeModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  onSelectProductForDetail,
}) => {
  const [selectedOccasion, setSelectedOccasion] = useState<string>('wedding');
  const [selectedBudget, setSelectedBudget] = useState<string>('all');
  const [engravingText, setEngravingText] = useState<string>('');
  const [recipientNote, setRecipientNote] = useState<string>('Wishing you eternal prosperity, joy, and sacred abundance.');

  if (!isOpen) return null;

  const occasions = [
    { id: 'baby', label: 'New Born & Baby Shower', icon: '👶', desc: 'Silver feeding spoons, bowls, rattles & nazariya kadas' },
    { id: 'wedding', label: 'Wedding & Anniversary', icon: '💍', desc: 'Prestige return favors & couple blessing hampers' },
    { id: 'housewarming', label: 'Graha Pravesh', icon: '🏡', desc: 'Vastu silver turtles, kalash & sanctification sets' },
    { id: 'corporate', label: 'Executive & Corporate', icon: '💼', desc: 'Handcrafted desk accessories, bookmarks & cardholders' },
    { id: 'festive', label: 'Diwali & Dhanteras', icon: '🪔', desc: 'Artisan lotus tealights, deepams & keepsake boxes' },
  ];

  const budgetTiers = [
    { id: 'all', label: 'All Budgets' },
    { id: 'under-2500', label: 'Under ₹2,500' },
    { id: '2500-5000', label: '₹2,500 – ₹5,000' },
    { id: '5000-15000', label: '₹5,000 – ₹15,000' },
    { id: 'above-15000', label: '₹15,000+' },
  ];

  // Filter recommendations: prioritize gifting studio products
  const recommendedProducts = PRODUCTS.filter((p) => {
    // Only items suitable for gifting studio
    const isGift = isGiftingProduct(p) || p.giftingOccasion !== undefined;
    if (!isGift) return false;

    // Occasion match
    const matchOccasion =
      !selectedOccasion ||
      p.giftingOccasion === selectedOccasion ||
      p.category === 'hampers' ||
      p.category === 'gifts';

    // Budget match
    const matchBudget =
      selectedBudget === 'all' ||
      (selectedBudget === 'under-2500' && (p.price || 0) <= 2500 && !p.priceOnRequest) ||
      (selectedBudget === '2500-5000' && (p.price || 0) > 2500 && (p.price || 0) <= 5000) ||
      (selectedBudget === '5000-15000' && (p.price || 0) > 5000 && (p.price || 0) <= 15000) ||
      (selectedBudget === 'above-15000' && ((p.price || 0) > 15000 || p.priceOnRequest));

    return matchOccasion && matchBudget;
  }).slice(0, 8);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#FAF9F5] rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950 text-white px-6 py-5 flex items-center justify-between border-b border-amber-900/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/30">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
                Asha Silver Bespoke Concierge
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold">
                Luxury Silver Gifting &amp; Hamper Studio
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800/60 transition-colors cursor-pointer"
            aria-label="Close concierge"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
          {/* Step 1: Select Occasion */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-200 text-stone-900 flex items-center justify-center text-[10px] font-bold">1</span>
                <span>Select Gifting Occasion</span>
              </label>
              <span className="text-[11px] text-stone-500">Curated specifically for memorable celebrations</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {occasions.map((occ) => (
                <button
                  key={occ.id}
                  onClick={() => setSelectedOccasion(occ.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    selectedOccasion === occ.id
                      ? 'border-amber-600 bg-amber-50/80 ring-2 ring-amber-500/30 shadow-sm'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="text-2xl mb-1.5">{occ.icon}</div>
                  <div className="font-semibold text-stone-900 text-xs sm:text-sm">{occ.label}</div>
                  <div className="text-[10px] text-stone-500 mt-1 line-clamp-2 leading-relaxed">{occ.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Budget Filter */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-200 text-stone-900 flex items-center justify-center text-[10px] font-bold">2</span>
                <span>Filter by Budget Benchmark</span>
              </label>
              <span className="text-[11px] text-stone-500">Transparent lifestyle gifting price benchmarks</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {budgetTiers.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setSelectedBudget(tier.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                    selectedBudget === tier.id
                      ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {tier.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Complimentary Customization & Blessings Note */}
          <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-amber-800" />
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                  Step 3: Complimentary Customization &amp; Blessings Note
                </span>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                100% Complimentary
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Free Custom Engraving */}
              <div className="space-y-1.5">
                <label htmlFor="concierge-engraving" className="block text-[11px] font-medium text-stone-700 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <PenTool className="w-3 h-3 text-amber-700" />
                    <span>Free Custom Name / Monogram Laser Engraving</span>
                  </span>
                  <span className="text-stone-400 text-[10px]">Optional</span>
                </label>
                <input
                  id="concierge-engraving"
                  type="text"
                  maxLength={35}
                  placeholder="e.g. Ramesh &amp; Priya · 24.10.2026"
                  value={engravingText}
                  onChange={(e) => setEngravingText(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              {/* Recipient Blessings Note */}
              <div className="space-y-1.5">
                <label htmlFor="concierge-note" className="block text-[11px] font-medium text-stone-700">
                  Personalized Gold-Foil Greeting Note (Included with Gift):
                </label>
                <textarea
                  id="concierge-note"
                  rows={2}
                  value={recipientNote}
                  onChange={(e) => setRecipientNote(e.target.value)}
                  className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>
            </div>
          </div>

          {/* Curated Recommendations Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Recommended Curations for You ({recommendedProducts.length})</span>
              </div>
              <span className="text-[11px] text-stone-500">Premium presentation · Insured doorstep dispatch</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommendedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-square overflow-hidden bg-stone-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      {product.craftStyle && (
                        <span className="absolute top-2 left-2 bg-stone-900/85 backdrop-blur-sm text-stone-200 text-[10px] font-medium px-2 py-0.5 rounded shadow-sm">
                          {product.craftStyle}
                        </span>
                      )}
                    </div>

                    <div className="p-3.5 space-y-1">
                      <div className="text-[10px] text-amber-900 uppercase font-semibold">
                        {product.categoryLabel}
                      </div>
                      <h4 className="font-serif text-sm font-semibold text-stone-900 line-clamp-2 leading-snug">
                        {product.name}
                      </h4>
                      {product.dimensions && (
                        <div className="text-[11px] text-stone-500 line-clamp-1">{product.dimensions}</div>
                      )}
                    </div>
                  </div>

                  <div className="p-3.5 pt-0 space-y-2">
                    <div className="flex items-baseline justify-between border-t border-stone-100 pt-2">
                      {product.priceOnRequest ? (
                        <span className="text-xs font-bold text-amber-900">Price on Request</span>
                      ) : (
                        <span className="text-sm font-bold text-stone-900">
                          ₹{product.price?.toLocaleString('en-IN')}
                        </span>
                      )}
                      {product.originalPrice && (
                        <span className="text-[10px] text-stone-400 line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          onClose();
                          onSelectProductForDetail(product);
                        }}
                        className="flex-1 py-1.5 text-[11px] font-medium border border-stone-300 rounded text-stone-700 hover:bg-stone-50 cursor-pointer"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => {
                          const note = `${recipientNote}${engravingText ? ` [Engraving: "${engravingText}"]` : ''}`.trim();
                          onAddToCart(product, 1, true, note);
                          onClose();
                        }}
                        className="flex-1 py-1.5 text-[11px] font-medium bg-stone-900 text-stone-50 rounded hover:bg-stone-800 transition-colors cursor-pointer"
                      >
                        Add to Bag
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-stone-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-stone-200 text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-800 shrink-0" />
            <span>Artisanal handcrafted silver gifting with bespoke presentation packaging and insured doorstep dispatch.</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-900 text-stone-50 font-semibold rounded-lg hover:bg-stone-800 cursor-pointer whitespace-nowrap"
          >
            Done Browsing
          </button>
        </div>
      </div>
    </div>
  );
};

