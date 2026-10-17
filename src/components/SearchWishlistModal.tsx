import React, { useState } from 'react';
import { X, Search, Heart, ShoppingBag, Eye, Trash2 } from 'lucide-react';
import { Product } from '../data/products';

interface SearchWishlistModalProps {
  isOpen: boolean;
  mode: 'search' | 'wishlist';
  onClose: () => void;
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const SearchWishlistModal: React.FC<SearchWishlistModalProps> = ({
  isOpen,
  mode,
  onClose,
  products,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredProducts = mode === 'search'
    ? products.filter((p) => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return true;
        return (
          p.name.toLowerCase().includes(query) ||
          p.categoryLabel.toLowerCase().includes(query) ||
          p.purity.toLowerCase().includes(query) ||
          (p.hindiName && p.hindiName.toLowerCase().includes(query)) ||
          p.description.toLowerCase().includes(query)
        );
      })
    : products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={mode === 'search' ? 'Search Collection' : 'Your Wishlist'}
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-20"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 bg-[#FAF9F5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            {mode === 'search' ? (
              <Search className="w-5 h-5 text-stone-700" />
            ) : (
              <Heart className="w-5 h-5 text-amber-800 fill-current" />
            )}
            <h3 className="font-serif text-lg font-semibold text-stone-900">
              {mode === 'search' ? 'Search Precious Silver Collection' : 'Your Saved Creations'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-md transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input in search mode */}
        {mode === 'search' && (
          <div className="p-4 border-b border-stone-100 bg-white">
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                autoFocus
                placeholder="Search by deity, ornament, choker, thali, diya, coin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Popular quick searches */}
            <div className="flex items-center gap-2 mt-2.5 text-xs text-stone-500 overflow-x-auto pb-1">
              <span className="shrink-0 text-stone-400">Popular:</span>
              {['Lakshmi Ganesh', '999 Silver Coin', 'Temple Choker', 'Silver Thali', 'Diya', 'Elephant Kada'].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 hover:bg-stone-200 whitespace-nowrap cursor-pointer transition-colors"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 divide-y divide-stone-100">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-stone-500 space-y-2">
              <p className="text-sm">
                {mode === 'search'
                  ? `No silver items found matching "${searchQuery}"`
                  : 'You have not saved any items to your wishlist yet.'}
              </p>
              <p className="text-xs text-stone-400">
                {mode === 'search'
                  ? 'Try searching for "Lakshmi", "Coins", "Thali", or "Jewellery"'
                  : 'Click the heart icon on any piece to save it for later.'}
              </p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="py-3 sm:py-4 flex items-center justify-between gap-4 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover bg-stone-100 border border-stone-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <div className="text-[11px] text-stone-500 uppercase font-medium">
                      {product.purity} · {product.weightGrams}g
                    </div>
                    <h4
                      onClick={() => {
                        onQuickView(product);
                        onClose();
                      }}
                      className="font-serif text-sm font-medium text-stone-900 truncate hover:text-amber-950 cursor-pointer"
                    >
                      {product.name}
                    </h4>
                    <div className="text-xs font-semibold text-stone-900 mt-0.5 tabular-nums">
                      ₹{product.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {mode === 'wishlist' && (
                    <button
                      onClick={() => onToggleWishlist(product)}
                      className="p-2 text-stone-400 hover:text-red-700 cursor-pointer"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      onQuickView(product);
                      onClose();
                    }}
                    className="p-2 text-stone-600 hover:text-stone-900 border border-stone-200 rounded-lg cursor-pointer"
                    title="Examine piece"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      onAddToCart(product);
                      onClose();
                    }}
                    className="px-3 py-2 bg-stone-900 text-stone-50 text-xs font-medium rounded-lg hover:bg-stone-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
