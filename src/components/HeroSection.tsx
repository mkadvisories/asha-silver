import React from 'react';
import { ShieldCheck, Award, RefreshCw, Truck, ArrowRight, Clock } from 'lucide-react';
import { LIVE_SILVER_RATES } from '../data/products';

interface HeroSectionProps {
  onExploreCollection: () => void;
  onOpenCalculator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCollection,
  onOpenCalculator,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF9F5] via-[#F5F2EB] to-[#FAF9F5] pt-4 pb-12 sm:pb-16 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Screen Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Brand Story & Call to Action */}
          <div className="lg:col-span-6 space-y-6 lg:py-6">
            <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-amber-900/80">
              <span>Akshay Tritiya Mahotsav</span>
              <span aria-hidden="true">·</span>
              <span>Legacy of Trust Since 1989</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-stone-900 leading-[1.12] text-balance">
              Where Pure Silver Meets <span className="italic font-medium text-amber-950">Eternal Prosperity</span>
            </h1>

            <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              For 37 years, Asha Silver has been the trusted destination for authentic 925 sterling silver jewelry, consecrated pooja silverware, and auspicious Akshay Tritiya tokens of enduring abundance.
            </p>

            {/* Live Rate Preview Card */}
            <div className="bg-white/80 backdrop-blur-sm border border-stone-200/90 rounded-xl p-4 max-w-lg shadow-sm">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100 text-xs">
                <div className="flex items-center gap-1.5 text-stone-600">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  <span>Bullion Benchmark · {LIVE_SILVER_RATES.lastUpdated}</span>
                </div>
                <span className="text-stone-500 font-medium">{LIVE_SILVER_RATES.city}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-stone-500">925 Sterling Silver</div>
                  <div className="text-lg font-semibold text-stone-900 tabular-nums">
                    ₹{LIVE_SILVER_RATES.purity925.toFixed(2)} <span className="text-xs font-normal text-stone-500">/ gram</span>
                  </div>
                </div>
                <div className="border-l border-stone-100 pl-4">
                  <div className="text-[11px] uppercase tracking-wider text-stone-500">999 Fine Pure Bullion</div>
                  <div className="text-lg font-semibold text-stone-900 tabular-nums">
                    ₹{LIVE_SILVER_RATES.purity999.toFixed(2)} <span className="text-xs font-normal text-stone-500">/ gram</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreCollection}
                className="px-6 py-3.5 bg-stone-900 text-stone-50 text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors shadow-sm flex items-center gap-2 group cursor-pointer whitespace-nowrap"
              >
                <span>Shop Akshay Tritiya Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform text-amber-300" />
              </button>

              <button
                onClick={onOpenCalculator}
                className="px-5 py-3.5 bg-white border border-stone-300 text-stone-800 text-sm font-medium rounded-lg hover:bg-stone-50 hover:border-stone-400 transition-colors cursor-pointer whitespace-nowrap"
              >
                Live Price Calculator
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Display */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[16/10] bg-stone-200 border border-stone-200">
              <img
                src="/src/assets/images/hero_asha_silver_banner_1792246702916.jpg"
                alt="Asha Silver Royal Handcrafted Jewellery Collection"
                className="w-full h-full object-cover"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="text-xs uppercase tracking-widest text-amber-200 font-medium">
                  Exclusive Festive Showcase
                </div>
                <div className="font-serif text-xl sm:text-2xl font-light tracking-wide text-white">
                  The Royal Antique Maharani Suite
                </div>
                <div className="text-xs text-stone-300 mt-1 flex items-center gap-2">
                  <span>BIS Hallmarked 925 Pure Silver</span>
                  <span aria-hidden="true">·</span>
                  <span>Handcrafted by Rajasthani Karigars</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Pillar Full-Width Trust Strip (Directly below hero split) */}
        <div className="mt-12 pt-8 border-t border-stone-200 grid grid-cols-2 md:grid-cols-4 gap-6 text-stone-800">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-stone-100 text-stone-900 shrink-0">
              <ShieldCheck className="w-5 h-5 text-amber-800" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-stone-900">100% BIS Hallmarked</h2>
              <p className="text-xs text-stone-500 mt-0.5">Every piece certified with government HUID stamp.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-stone-100 text-stone-900 shrink-0">
              <Award className="w-5 h-5 text-amber-800" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-stone-900">Legacy Since 1989</h2>
              <p className="text-xs text-stone-500 mt-0.5">37 years of authentic family trust & purity guarantee.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-stone-100 text-stone-900 shrink-0">
              <RefreshCw className="w-5 h-5 text-amber-800" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-stone-900">Lifetime Buyback</h2>
              <p className="text-xs text-stone-500 mt-0.5">100% transparent silver weight value exchange.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-stone-100 text-stone-900 shrink-0">
              <Truck className="w-5 h-5 text-amber-800" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-stone-900">Insured Delivery</h2>
              <p className="text-xs text-stone-500 mt-0.5">Tamper-evident luxury packaging nationwide.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
