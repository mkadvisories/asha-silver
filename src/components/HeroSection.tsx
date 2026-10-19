import React from 'react';
import { ShieldCheck, Award, RefreshCw, Truck, ArrowRight, Clock, Lock, Sparkles } from 'lucide-react';
import { LIVE_SILVER_RATES } from '../data/products';
import { ASSET_IMAGES } from '../assets/images';

interface HeroSectionProps {
  onExploreCollection: () => void;
  onOpenPriceLock: () => void;
  onOpenContact?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCollection,
  onOpenPriceLock,
  onOpenContact,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF9F5] via-[#F4EFE6]/60 to-[#FAF9F5] pt-4 pb-12 sm:pb-16 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Screen Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Brand Story & Call to Action */}
          <div className="lg:col-span-6 space-y-6 lg:py-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-900">
              <span className="bg-amber-100/90 px-2.5 py-1 rounded text-amber-950 font-bold">Asha Silver</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-950">A legacy of trust since 1989</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-stone-900 leading-[1.14] text-balance">
              Pure Silver Utensils, <br />
              <span className="italic font-medium text-amber-950">Deities &amp; Auspicious Gifts</span>
            </h1>

            <p className="text-stone-700 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              <strong>A legacy of trust since 1989</strong>: Founded by Mahesh Agarwal, Asha Silver brings you handcrafted pure silver utensils, consecrated silver items of god, and auspicious Dhanteras gift tokens built on decades of hard work, honest weight, and uncompromised quality.
            </p>

            {/* Live Rate Preview Card with direct Price Lock Callout */}
            <div className="bg-white/95 backdrop-blur-sm border border-stone-200 rounded-xl p-4 max-w-lg shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100 text-xs">
                <div className="flex items-center gap-1.5 text-stone-700 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>MCX Live Silver Benchmark (1 Kg)</span>
                </div>
                <button
                  onClick={onOpenPriceLock}
                  className="text-amber-800 hover:text-amber-950 font-semibold flex items-center gap-1 cursor-pointer text-xs"
                >
                  <Lock className="w-3 h-3" />
                  <span>Lock Rates (e.g. 200g) →</span>
                </button>
              </div>

              {/* MCX 1 Kg Headline */}
              <div className="flex items-baseline justify-between bg-stone-50/80 px-3 py-2 rounded-lg border border-stone-100">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">MCX Spot Rate</span>
                  <div className="text-xl font-bold font-mono text-stone-900 tabular-nums">
                    ₹{LIVE_SILVER_RATES.mcxPerKg.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    <span className="text-xs font-normal text-stone-500 ml-1">/ 1 kg</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    ▲ +₹{LIVE_SILVER_RATES.dayChange.toLocaleString('en-IN')} (+{LIVE_SILVER_RATES.dayChangePercent}%)
                  </span>
                  <div className="text-[10px] text-stone-400 mt-0.5">MCX Active Contract</div>
                </div>
              </div>

              {/* Per-Gram Breakdown */}
              <div className="grid grid-cols-2 gap-3 pt-0.5">
                <div className="bg-white p-2.5 rounded-lg border border-stone-100 shadow-2xs">
                  <div className="text-[10px] uppercase tracking-wider text-stone-500 font-medium">92.5 Utensils &amp; Thalis</div>
                  <div className="text-sm font-bold text-stone-900 mt-0.5">
                    Price on Request
                  </div>
                  <div className="text-[10px] text-amber-900 font-medium mt-0.5">Custom Weight Quote</div>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-stone-100 shadow-2xs">
                  <div className="text-[10px] uppercase tracking-wider text-stone-500 font-medium">999 Pure Silver (MCX + 3%)</div>
                  <div className="text-base font-bold text-stone-900 tabular-nums font-mono">
                    ₹{LIVE_SILVER_RATES.purity999.toFixed(2)} <span className="text-[11px] font-normal text-stone-500">/ g</span>
                  </div>
                  <div className="text-[10px] text-emerald-700 font-medium mt-0.5">MCX ₹212.45 + 3%</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreCollection}
                className="px-6 py-3.5 bg-stone-900 text-stone-50 text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors shadow-sm flex items-center gap-2 group cursor-pointer whitespace-nowrap"
              >
                <span>Explore Silverware</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform text-amber-300" />
              </button>

              <button
                onClick={onOpenPriceLock}
                className="px-5 py-3.5 bg-amber-100 border border-amber-300 text-amber-950 text-sm font-semibold rounded-lg hover:bg-amber-200 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5"
              >
                <Lock className="w-4 h-4 text-amber-800" />
                <span>Lock Silver Price (e.g. 200g)</span>
              </button>

              {onOpenContact && (
                <button
                  onClick={onOpenContact}
                  className="px-4 py-3.5 border border-stone-300 text-stone-800 text-sm font-medium rounded-lg hover:bg-stone-100 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Schedule Video Call
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Hero Visual Display */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[16/10] bg-stone-200 border border-stone-200">
              <img
                src={ASSET_IMAGES.heroBanner}
                alt="Asha Silver Royal Handcrafted Silver Utensils and Sacred Idols Collection"
                className="w-full h-full object-cover"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/25 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-300 font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Dhanteras Mahotsav Specialty</span>
                </div>
                <div className="font-serif text-xl sm:text-2xl font-light tracking-wide text-white">
                  Pure Silver Utensils, Sacred Deities &amp; Gift Coins
                </div>
                <div className="text-xs text-stone-300 mt-1 flex items-center gap-2">
                  <span>925 &amp; 999 Pure Silver</span>
                  <span aria-hidden="true">·</span>
                  <span>Handcrafted by Traditional Silversmiths</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Pillar Full-Width Trust Strip */}
        <div className="mt-12 pt-8 border-t border-stone-200 grid grid-cols-2 md:grid-cols-4 gap-6 text-stone-800">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-stone-100 text-stone-900 shrink-0">
              <ShieldCheck className="w-5 h-5 text-amber-800" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-stone-900">100% Tested Purity</h2>
              <p className="text-xs text-stone-500 mt-0.5">Every piece tested and guaranteed for pure silver weight.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-stone-100 text-stone-900 shrink-0">
              <Award className="w-5 h-5 text-amber-800" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-stone-900">A Legacy of Trust Since 1989</h2>
              <p className="text-xs text-stone-500 mt-0.5">Started by Mahesh Agarwal. Built on hard work and reliable quality.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-stone-100 text-stone-900 shrink-0">
              <RefreshCw className="w-5 h-5 text-amber-800" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-stone-900">Transparent Silver Value</h2>
              <p className="text-xs text-stone-500 mt-0.5">Gram-by-gram billing with clear live rates and 100% buyback.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-stone-100 text-stone-900 shrink-0">
              <Truck className="w-5 h-5 text-amber-800" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-stone-900">Safe Insured Delivery</h2>
              <p className="text-xs text-stone-500 mt-0.5">Tamper-evident velvet gift packaging with tracking.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
