import React from 'react';
import { Heart, Eye, ShoppingBag, ShieldCheck } from 'lucide-react';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}) => {
  return (
    <article className="group bg-white rounded-xl border border-stone-200/90 overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-stone-300">
      {/* Visual Image Container (65-75% visual prominence) */}
      <div className="relative aspect-[4/3] bg-stone-100/70 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Quick actions overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
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

      {/* Card Content & Details (Zero-Pill Typography) */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Quiet Unboxed Metadata */}
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
            <span>{product.purity}</span>
            <span aria-hidden="true">·</span>
            <span>{product.weightGrams}g Gross</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-0.5 text-amber-900">
              <ShieldCheck className="w-3 h-3" />
              <span>100% Pure Silver</span>
            </span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-serif text-base sm:text-lg font-medium text-stone-900 line-clamp-2 hover:text-amber-950 cursor-pointer transition-colors"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Brief auspicious context */}
          <p className="text-xs text-stone-500 line-clamp-1">
            {product.auspiciousSignificance}
          </p>
        </div>

        {/* Pricing & Cart Action */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-semibold text-stone-900 tabular-nums">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through tabular-nums">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <div className="text-[11px] text-stone-400">
              Inclusive of GST
            </div>
          </div>

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
        </div>
      </div>
    </article>
  );
};
