import React from 'react';
import { ShieldCheck, Award, RefreshCw, Truck, ArrowRight, Clock, Lock, Sparkles, Gift } from 'lucide-react';
import { useSilverRates } from '../context/SilverRateContext';
import { ASSET_IMAGES } from '../assets/images';

interface HeroSectionProps {
  onExploreCollection: () => void;
  onOpenPriceLock: () => void;
  onOpenContact?: () => void;
  onOpenConcierge?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCollection,
  onOpenPriceLock,
  onOpenContact,
  onOpenConcierge,
}) => {
  const { rates, formattedCountdown, isRefreshing, refreshRates } = useSilverRates();

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
              <span className="italic font-medium text-amber-950">Luxury Hampers &amp; Sacred Deities</span>
            </h1>

            <p className="text-stone-700 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              <strong>A legacy of trust since 1989</strong>: Founded by Mahesh Agarwal, Asha Silver crafts heirloom pure silver utensils, bespoke luxury gifting hampers, home decor artifacts, and consecrated temple idols built on honest gram-by-gram billing and uncompromised purity.
            </p>

            {/* Live Rate Preview Card with direct Price Lock Callout & 1-Hr Refresh status */}
            <div className="bg-white/95 backdrop-blur-sm border border-stone-200 rounded-xl p-4 max-w-lg shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100 text-xs">
                <div className="flex items-center gap-1.5 text-stone-700 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>MCX Live Silver Benchmark (1 Kg)</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => refreshRates()}
                    disabled={isRefreshing}
                    className="text-[10px] text-stone-500 hover:text-stone-900 flex items-center gap-1 cursor-pointer"
                    title="Refresh MCX silver rate now"
                  >
                    <RefreshCw className={`w-3 h-3 text-amber-600 ${isRefreshing ? 'animate-spin' : ''}`} />
                    <span>Auto-refresh in {formattedCountdown}</span>
                  </button>
                  <button
                    onClick={onOpenPriceLock}
                    className="text-amber-800 hover:text-amber-950 font-semibold flex items-center gap-0.5 cursor-pointer text-xs"
                  >
                    <Lock className="w-3 h-3 text-amber-700" />
                    <span>Initiate Lock →</span>
                  </button>
                </div>
              </div>

              {/* MCX 1 Kg Headline */}
              <div className="flex items-baseline justify-between bg-stone-50/80 px-3 py-2 rounded-lg border border-stone-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">MCX Spot Rate</span>
                    <button
                      onClick={() => refreshRates()}
                      disabled={isRefreshing}
                      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-stone-200/80 hover:bg-stone-300 text-stone-800 transition-all cursor-pointer text-[10px] font-semibold disabled:opacity-50 active:scale-95 shadow-2xs"
                      title="Pull latest live rate directly from MCX"
                      aria-label="Refresh MCX spot rate"
                    >
                      <RefreshCw className={`w-2.5 h-2.5 text-amber-800 ${isRefreshing ? 'animate-spin' : ''}`} />
                      <span>{isRefreshing ? 'Scraping...' : 'Refresh'}</span>
                    </button>
                  </div>
                  <div className="text-xl font-bold font-mono text-stone-900 tabular-nums mt-0.5">
                    ₹{rates.mcxPerKg.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    <span className="text-xs font-normal text-stone-500 ml-1">/ 1 kg</span>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${
                      rates.dayChange < 0
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}
                  >
                    {rates.dayChange < 0 ? '▼ -₹' : '▲ +₹'}
                    {Math.abs(rates.dayChange).toLocaleString('en-IN')}{' '}
                    ({rates.dayChange < 0 ? '' : '+'}{rates.dayChangePercent}%)
                  </span>
                  <div className="text-[10px] text-stone-400 mt-0.5">
                    {rates.marketTime ? `MCX Live: ${rates.marketTime}` : 'MCX Active Feed (1 Hr Auto-Refresh)'}
                  </div>
                </div>
              </div>

              {/* Per-Gram Breakdown */}
              <div className="grid grid-cols-2 gap-3 pt-0.5">
                <div className="bg-white p-2.5 rounded-lg border border-stone-100 shadow-2xs">
                  <div className="text-[10px] uppercase tracking-wider text-stone-500 font-medium">92.5 &amp; 880 Utensils</div>
                  <div className="text-sm font-bold text-stone-900 mt-0.5">
                    Price on Request
                  </div>
                  <div className="text-[10px] text-amber-900 font-medium mt-0.5">Custom Karigari Consultation</div>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-stone-100 shadow-2xs">
                  <div className="text-[10px] uppercase tracking-wider text-stone-500 font-medium">999 Pure Silver (MCX + 3%)</div>
                  <div className="text-base font-bold text-stone-900 tabular-nums font-mono">
                    ₹{rates.purity999.toFixed(2)} <span className="text-[11px] font-normal text-stone-500">/ g</span>
                  </div>
                  <div className="text-[10px] text-emerald-700 font-medium mt-0.5">MCX ₹{rates.mcxPerGram.toFixed(2)} + 3%</div>
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

              {onOpenConcierge && (
                <button
                  onClick={onOpenConcierge}
                  className="px-5 py-3.5 bg-amber-50 border border-amber-300 text-amber-950 text-sm font-semibold rounded-lg hover:bg-amber-100 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5"
                >
                  <Gift className="w-4 h-4 text-amber-800" />
                  <span>Bespoke Gifting Studio</span>
                </button>
              )}

              <button
                onClick={onOpenPriceLock}
                className="px-4 py-3.5 bg-stone-100 border border-stone-300 text-stone-800 text-sm font-medium rounded-lg hover:bg-stone-200 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-stone-700" />
                <span>Initiate Rate Lock</span>
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
                  <span>Curated Silver Luxury &amp; Utensils</span>
                </div>
                <div className="font-serif text-xl sm:text-2xl font-light tracking-wide text-white">
                  Pure Silver Utensils, Wedding Hampers &amp; Sacred Deities
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
              <p className="text-xs text-stone-500 mt-0.5">Founded by Mahesh Agarwal. Built on hard work and reliable quality.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-stone-100 text-stone-900 shrink-0">
              <RefreshCw className="w-5 h-5 text-amber-800" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-stone-900">Hourly Refreshed Rates</h2>
              <p className="text-xs text-stone-500 mt-0.5">MCX benchmark refreshed every 1 hour with transparent billing.</p>
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
