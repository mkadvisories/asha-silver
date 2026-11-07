import React from 'react';
import { Heart, Eye, ShoppingBag, ShieldCheck, Video, Gift, Sparkles, PenTool } from 'lucide-react';
import { Product, isPriceOnRequest, isGiftingProduct } from '../data/products';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onRequestQuote?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onRequestQuote,
}) => {
  const priceRemoved = isPriceOnRequest(product);
  const isGifting = isGiftingProduct(product);

  return (
    <article className="group bg-white rounded-xl border border-stone-200/90 overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-stone-300">
      {/* Visual Image Container */}
      <div className="relative aspect-[4/3] bg-stone-100/70 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Purity & Craft Style Badges: Suppress purity badge for gifting products */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {!isGifting && (
            <span className="bg-stone-950/85 backdrop-blur-sm text-amber-200 text-[10px] font-semibold px-2.5 py-0.5 rounded shadow-sm">
              {product.purity}
            </span>
          )}
          {product.category === 'hampers' && (
            <span className="bg-amber-100/95 text-amber-950 text-[9px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider flex items-center gap-1">
              <Gift className="w-2.5 h-2.5 text-amber-900" />
              <span>Luxury Hamper</span>
            </span>
          )}
          {product.craftStyle && (
            <span className="bg-white/90 backdrop-blur-sm text-stone-800 text-[9px] font-medium px-2 py-0.5 rounded shadow-sm hidden sm:inline-block">
              {product.craftStyle}
            </span>
          )}
        </div>

        {/* Quick Wishlist Action */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
              isWishlisted
                ? 'bg-amber-800 text-white shadow-sm'
                : 'bg-white/90 text-stone-700 hover:text-stone-900 hover:bg-white shadow-sm'
            }`}
            title={isWishlisted ? 'Remove from saved' : 'Save item'}
            aria-label="Wishlist toggle"
          >
            <Heart className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 py-2 px-3 bg-white/95 backdrop-blur-md text-stone-900 text-xs font-medium rounded-lg hover:bg-white shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-stone-600" />
            <span>Examine Details</span>
          </button>
        </div>
      </div>

      {/* Card Content & Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Metadata: Suppress gram weight for gifting products */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium">
            <span className="text-amber-950 font-semibold uppercase tracking-wider text-[10px]">
              {product.categoryLabel}
            </span>
            {!isGifting && (
              <span className="font-mono text-stone-700 font-semibold">
                {product.id === 'asha-ganesh-lakshmi-consecrated-pair'
                  ? 'Combined: ~193 gm'
                  : `~${product.weightGrams}g Silver`}
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-serif text-base sm:text-lg font-medium text-stone-900 line-clamp-2 hover:text-amber-950 cursor-pointer transition-colors leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Key Value Proposition Feature Tags */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px]">
            {!isGifting && product.includesVelvetBox && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200/70 font-medium">
                <Gift className="w-2.5 h-2.5" />
                <span>Velvet Box</span>
              </span>
            )}
            {product.customEngravingAvailable && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-stone-100 text-stone-700 font-medium">
                <PenTool className="w-2.5 h-2.5 text-stone-500" />
                <span>Engraving Available</span>
              </span>
            )}
            {product.antiTarnishProtected && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 font-medium">
                <ShieldCheck className="w-2.5 h-2.5 text-emerald-600" />
                <span>Anti-Tarnish</span>
              </span>
            )}
          </div>

          {/* Brief auspicious context */}
          <p className="text-xs text-stone-500 line-clamp-1 pt-0.5">
            {product.auspiciousSignificance}
          </p>
        </div>

        {/* Pricing & Cart Action */}
        <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between gap-3">
          {priceRemoved ? (
            <div>
              <div className="text-sm font-semibold text-stone-900">
                Price on Request
              </div>
              <div className="text-[11px] text-amber-800 font-medium">
                Custom Weight Quote
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-base font-bold text-stone-900 tabular-nums">
                  {product.isApproximatePrice ? '~₹' : '₹'}{product.price?.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-stone-400 line-through tabular-nums">
                    {product.isApproximatePrice ? '~₹' : '₹'}{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <div className="text-[10px] text-stone-500">
                {product.isApproximatePrice ? 'Approx. based on ~193 gm weight' : isGifting ? 'Inclusive of 3% GST' : product.purityCode === '999' ? 'MCX + 3% Formula' : 'Inclusive of 3% GST'}
              </div>
            </div>
          )}

          {priceRemoved ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onRequestQuote) {
                  onRequestQuote(product);
                } else {
                  onQuickView(product);
                }
              }}
              className="py-2 px-3 bg-amber-950 text-amber-50 text-xs font-medium rounded-lg hover:bg-stone-900 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 shadow-sm"
              aria-label={`Inquire about ${product.name}`}
            >
              <Video className="w-3.5 h-3.5 text-amber-300" />
              <span>Inquire</span>
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="py-2 px-3.5 bg-stone-900 text-stone-50 text-xs font-medium rounded-lg hover:bg-stone-800 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 shadow-sm"
              aria-label={`Add ${product.name} to bag`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
              <span>Add to Bag</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
