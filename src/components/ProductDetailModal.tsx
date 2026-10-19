import React, { useState } from 'react';
import { X, ShieldCheck, Heart, ShoppingBag, Sparkles, Truck, Check, Share2, Layers, Video } from 'lucide-react';
import { Product, isPriceOnRequest, LIVE_SILVER_RATES } from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, giftBox: boolean, giftNote: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onRequestQuote?: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onRequestQuote,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [giftBox, setGiftBox] = useState(true);
  const [giftNote, setGiftNote] = useState('');
  const [activeTab, setActiveTab] = useState<'details' | 'breakdown' | 'care'>('details');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!product) return null;

  const priceRemoved = isPriceOnRequest(product);

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const currentRate = product.purityCode === '999' ? LIVE_SILVER_RATES.purity999 : LIVE_SILVER_RATES.purity925;
  const silverMetalValue = product.weightGrams * currentRate;
  const totalMaking = product.weightGrams * product.makingChargesPerGram;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in"
    >
      <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col border border-stone-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-[#FAF9F5]">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
            <span>Asha Silver</span>
            <span aria-hidden="true">/</span>
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">/</span>
            <span className="text-stone-900 font-semibold">{product.purity}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 text-stone-500 hover:text-stone-800 rounded-md transition-colors cursor-pointer"
              title="Copy product link"
              aria-label="Share product"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-md transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Split 2-Column Gallery + Purchase Module */}
        <div className="overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-stone-200">
          {/* Left: Product Image & Purity Assurance */}
          <div className="p-6 sm:p-8 bg-stone-50/50 flex flex-col justify-between space-y-6">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-200 border border-stone-200 shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] font-semibold text-stone-800 shadow-sm flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-800" />
                <span>{product.purity} Guarantee</span>
              </div>
            </div>

            {/* Purity & Craftsmanship Box */}
            <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2 text-xs">
              <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Asha Silver Purity Seal · Since 1989</span>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Started by Mahesh Agarwal in 1989. Handcrafted by master silversmiths with pure metal weight and honest gram-by-gram billing.
              </p>
              <div className="flex items-center gap-4 pt-1 text-[11px] text-stone-500 font-medium">
                <span>· 100% Pure Silver Weight</span>
                <span>· Lifetime Exchange</span>
                <span>· Zero Deduction Buyback</span>
              </div>
            </div>
          </div>

          {/* Right: Contiguous Purchase Module */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Product Title & Hindi Subtitle */}
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-900 tracking-wider uppercase mb-1">
                  <span>{product.purity}</span>
                  <span aria-hidden="true">·</span>
                  <span>{product.weightGrams}g Weight</span>
                </div>
                <h2 className="font-serif text-2xl font-semibold text-stone-900 leading-tight">
                  {product.name}
                </h2>
                {product.hindiName && (
                  <div className="text-xs text-stone-500 font-serif italic mt-0.5">
                    {product.hindiName}
                  </div>
                )}
              </div>

              {/* Price */}
              {priceRemoved ? (
                <div className="pb-3 border-b border-stone-200 space-y-1.5">
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900">
                      Price on Request
                    </span>
                    <span className="text-xs font-medium text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Bespoke Utensil / Thali
                    </span>
                  </div>
                  <p className="text-xs text-stone-500">
                    Prices for pure silver utensils and thali sets are customized based on desired piece count, individual item weights, and master silversmith karigari. Direct prices are removed — schedule a live video call to view the pieces and receive a personalized quote.
                  </p>
                </div>
              ) : (
                <div className="flex items-baseline gap-3 pb-3 border-b border-stone-200">
                  <span className="font-serif text-3xl font-semibold text-stone-900 tabular-nums">
                    ₹{product.price?.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-stone-400 line-through tabular-nums">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-xs font-medium text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {product.purityCode === '999' ? '999 Pure Silver (MCX + 3%)' : 'Dhanteras Auspicious Offer'}
                  </span>
                </div>
              )}

              {/* Tabs for Details, Breakdown, Care */}
              <div className="space-y-3">
                <div className="flex gap-2 border-b border-stone-200 pb-1 text-xs font-medium">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'details'
                        ? 'border-stone-900 text-stone-900 font-semibold'
                        : 'border-transparent text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab('breakdown')}
                    className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'breakdown'
                        ? 'border-stone-900 text-stone-900 font-semibold'
                        : 'border-transparent text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Transparent Pricing
                  </button>
                  <button
                    onClick={() => setActiveTab('care')}
                    className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'care'
                        ? 'border-stone-900 text-stone-900 font-semibold'
                        : 'border-transparent text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Care &amp; Storage
                  </button>
                </div>

                {activeTab === 'details' && (
                  <div className="space-y-2.5 text-xs text-stone-600">
                    <p className="leading-relaxed">{product.description}</p>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100">
                      <div>
                        <span className="text-stone-400 block">Gross Weight</span>
                        <span className="font-medium text-stone-800">{product.weightGrams} grams</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block">Dimensions</span>
                        <span className="font-medium text-stone-800">{product.dimensions}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block">Occasion</span>
                        <span className="font-medium text-stone-800">{product.occasion || 'Dhanteras & Daily Sacred Use'}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block">Availability</span>
                        <span className="font-medium text-emerald-800">In Stock · Ready to Dispatch</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'breakdown' && (
                  <div className="space-y-2 text-xs text-stone-600 bg-stone-50 p-3 rounded-lg border border-stone-200">
                    {priceRemoved ? (
                      <>
                        <div className="font-semibold text-stone-900 pb-1 border-b border-stone-200">
                          Bespoke Silverware Pricing Philosophy
                        </div>
                        <p className="leading-relaxed">
                          For pure 92.5 silver utensils, thali sets, and pitchers, prices are calculated transparently during live consultation:
                        </p>
                        <div className="pt-1 space-y-1 text-stone-700">
                          <div>· <strong>Base Weight:</strong> ~{product.weightGrams}g certified sterling silver</div>
                          <div>· <strong>Karigari:</strong> Traditional hand-hammering &amp; royal nakshi engraving</div>
                          <div>· <strong>Custom Quote:</strong> Fixed prices removed — quote tailored to your required pieces &amp; today's MCX rate via Video Call</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <span>
                            {product.purityCode === '999'
                              ? `999 Pure Silver (${product.weightGrams}g @ MCX+3% ₹${LIVE_SILVER_RATES.purity999.toFixed(2)}/g):`
                              : `Pure Silver (${product.weightGrams}g):`}
                          </span>
                          <span className="font-semibold text-stone-800">
                            ₹{Math.round(silverMetalValue).toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Handcrafting / Karigari:</span>
                          <span className="font-semibold text-stone-800">
                            ₹{Math.round(totalMaking).toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-stone-200 pt-1 font-semibold text-stone-900">
                          <span>Net Inclusive of GST:</span>
                          <span>₹{product.price?.toLocaleString('en-IN')}</span>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {activeTab === 'care' && (
                  <div className="space-y-2 text-xs text-stone-600">
                    <p>
                      Asha Silver utensils, idols, and gift items are crafted from genuine precious silver. To maintain lasting shine:
                    </p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Store in the provided anti-tarnish velvet gift box when not in use.</li>
                      <li>For silver utensils, wash with gentle warm water and mild liquid soap.</li>
                      <li>Wipe dry with a soft lint-free cotton cloth to preserve specular gleam.</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Complimentary Gifting Option */}
              <div className="pt-2 border-t border-stone-100 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-700 font-medium">
                  <input
                    type="checkbox"
                    checked={giftBox}
                    onChange={(e) => setGiftBox(e.target.checked)}
                    className="accent-stone-900 rounded cursor-pointer"
                  />
                  <span>Include Complimentary Red Velvet Box &amp; Dhanteras Sacred Roli-Chawal</span>
                </label>

                {giftBox && (
                  <input
                    type="text"
                    placeholder="Add personalized Dhanteras blessings or gift note (optional)"
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                    maxLength={100}
                  />
                )}
              </div>
            </div>

            {/* Contiguous Sticky Buy Action Module */}
            <div className="pt-4 border-t border-stone-200 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper (only for priced products) */}
                {!priceRemoved && (
                  <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-stone-50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-stone-700 hover:bg-stone-200 transition-colors font-medium text-sm cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-3 py-2 text-xs font-semibold text-stone-900 tabular-nums min-w-[32px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-stone-700 hover:bg-stone-200 transition-colors font-medium text-sm cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                )}

                {/* Primary CTA: Schedule Video Call if price removed, else Add to Bag */}
                {priceRemoved ? (
                  <button
                    onClick={() => {
                      if (onRequestQuote) {
                        onRequestQuote(product);
                      }
                      onClose();
                    }}
                    className="flex-1 py-3 px-4 bg-amber-950 text-amber-50 font-medium text-xs sm:text-sm rounded-lg hover:bg-stone-900 transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Video className="w-4 h-4 text-amber-300" />
                    <span>Schedule Video Call for Custom Quote</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      onAddToCart(product, quantity, giftBox, giftNote);
                      onClose();
                    }}
                    className="flex-1 py-3 px-4 bg-stone-900 text-stone-50 font-medium text-xs sm:text-sm rounded-lg hover:bg-stone-800 transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-amber-300" />
                    <span>Add to Bag · ₹{((product.price || 0) * quantity).toLocaleString('en-IN')}</span>
                  </button>
                )}

                {/* Wishlist Button */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                    isWishlisted
                      ? 'border-amber-800 text-amber-800 bg-amber-50'
                      : 'border-stone-300 text-stone-700 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-stone-400" />
                  <span>Free express delivery across India</span>
                </span>
                <span>Dispatch within 24 Hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
