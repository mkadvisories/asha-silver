import React from 'react';
import { Sparkles, Calendar, Clock, Gift, Sun, ChevronRight } from 'lucide-react';
import { LIVE_SILVER_RATES } from '../data/products';

interface AkshayTritiyaBannerProps {
  onExploreAuspicious: () => void;
  onSelectCoin: () => void;
}

export const AkshayTritiyaBanner: React.FC<AkshayTritiyaBannerProps> = ({
  onExploreAuspicious,
  onSelectCoin,
}) => {
  return (
    <section className="py-12 bg-stone-900 text-stone-100 relative overflow-hidden">
      {/* Subtle background ambient motif */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e5d5be_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Story */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-950/60 border border-amber-800/40 rounded-full text-xs text-amber-300 font-medium">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Auspicious Akshaya Tritiya Mahotsav 2026</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-tight">
              An Investment in Eternity. <br />
              <span className="italic text-amber-200">A Blessing that Never Fades.</span>
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl">
              "Akshaya" in Sanskrit signifies that which never diminishes. Bringing pure 999 silver coins, consecrated Lakshmi idols, and royal silverware into your home on this celestial day invites unending abundance and peace.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={onExploreAuspicious}
                className="px-5 py-3 bg-amber-200 text-stone-950 font-medium text-xs sm:text-sm rounded-lg hover:bg-amber-100 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>View Akshay Tritiya Specials</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={onSelectCoin}
                className="px-5 py-3 bg-stone-800/90 text-stone-200 border border-stone-700 font-medium text-xs sm:text-sm rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Pure 999 Silver Bullion Coins
              </button>
            </div>
          </div>

          {/* Right Card: Auspicious Muhurat Timings Card */}
          <div className="lg:col-span-5">
            <div className="bg-stone-800/80 backdrop-blur-md rounded-2xl border border-stone-700/80 p-6 sm:p-7 space-y-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-stone-700">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold tracking-wider uppercase">
                  <Calendar className="w-4 h-4" />
                  <span>Auspicious Puja Timings</span>
                </div>
                <span className="text-xs text-stone-400">{LIVE_SILVER_RATES.muhurat.date}</span>
              </div>

              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-700/60">
                  <div className="flex items-center gap-2 text-xs text-stone-400">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Best Time for Silver Buying (Shubh Muhurat)</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-serif font-bold text-amber-200 mt-1">
                    {LIVE_SILVER_RATES.muhurat.timeWindow}
                  </div>
                  <div className="text-[11px] text-stone-400 mt-1">
                    Duration: 6 Hours 35 Minutes · {LIVE_SILVER_RATES.muhurat.tithi}
                  </div>
                </div>

                <div className="space-y-2 text-xs text-stone-300">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Complimentary sacred Gangajal &amp; Roli-Chawal with every order</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gift className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Free 5g BIS Hallmarked Silver Coin on orders above ₹15,000</span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-stone-400 border-t border-stone-700/80 flex items-center justify-between">
                  <span>Guaranteed Dispatch Before Muhurat</span>
                  <span className="text-amber-300 font-medium">100% Insured Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
