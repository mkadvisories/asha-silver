import React from 'react';
import { Sparkles, Calendar, Clock, Gift, Sun, ChevronRight, UtensilsCrossed } from 'lucide-react';
import { LIVE_SILVER_RATES } from '../data/products';

interface DhanterasBannerProps {
  onExploreAuspicious: () => void;
  onSelectUtensils: () => void;
}

export const DhanterasBanner: React.FC<DhanterasBannerProps> = ({
  onExploreAuspicious,
  onSelectUtensils,
}) => {
  return (
    <section className="py-12 bg-stone-900 text-stone-100 relative overflow-hidden">
      {/* Subtle background ambient motif */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e5d5be_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Story */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-950/70 border border-amber-800/40 rounded-full text-xs text-amber-300 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Auspicious Shubh Dhanteras Mahotsav</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-tight">
              Welcome Mahalakshmi with Pure Silver. <br />
              <span className="italic text-amber-200">The Timeless Tradition of Dhanteras.</span>
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl">
              On the sacred day of Dhanteras (Dhantrayodashi), purchasing pure silver utensils, consecrated Lakshmi and Ganesha deities, and silver gift coins invokes divine health, perpetual prosperity, and the boundless grace of Lord Dhanvantari and Goddess Mahalakshmi.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={onExploreAuspicious}
                className="px-5 py-3 bg-amber-200 text-stone-950 font-medium text-xs sm:text-sm rounded-lg hover:bg-amber-100 transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>View Dhanteras Specials</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={onSelectUtensils}
                className="px-5 py-3 bg-stone-800/90 text-stone-200 border border-stone-700 font-medium text-xs sm:text-sm rounded-lg hover:bg-stone-800 transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>Silver Utensils Collection</span>
              </button>
            </div>
          </div>

          {/* Right Card: Dhanteras Muhurat Timings Card */}
          <div className="lg:col-span-5">
            <div className="bg-stone-800/85 backdrop-blur-md rounded-2xl border border-stone-700/80 p-6 sm:p-7 space-y-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-stone-700">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold tracking-wider uppercase">
                  <Calendar className="w-4 h-4" />
                  <span>Dhanteras Shubh Muhurat</span>
                </div>
                <span className="text-xs text-stone-400 font-medium">{LIVE_SILVER_RATES.muhurat.date}</span>
              </div>

              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-700/60">
                  <div className="flex items-center gap-2 text-xs text-stone-400">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Best Auspicious Time for Silver &amp; Utensils Buying</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-serif font-bold text-amber-200 mt-1">
                    {LIVE_SILVER_RATES.muhurat.timeWindow}
                  </div>
                  <div className="text-[11px] text-stone-400 mt-1">
                    Pradosh Kaal &amp; Vrishabha Lagna · {LIVE_SILVER_RATES.muhurat.tithi}
                  </div>
                </div>

                <div className="space-y-2 text-xs text-stone-300">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Complimentary sacred Roli-Chawal &amp; Gangajal with every order</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gift className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Free 5g Pure 999 Silver Coin on orders above ₹15,000</span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-stone-400 border-t border-stone-700/80 flex items-center justify-between">
                  <span>Guaranteed Safe Delivery for Dhanteras</span>
                  <span className="text-amber-300 font-medium">100% Tested Silver</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
