import React, { useState } from 'react';
import { Calculator, Sparkles, CheckCircle2, Info, ArrowUpRight } from 'lucide-react';
import { LIVE_SILVER_RATES } from '../data/products';

interface LiveRateCalculatorProps {
  onSelectPoojaCategory: () => void;
}

export const LiveRateCalculator: React.FC<LiveRateCalculatorProps> = ({
  onSelectPoojaCategory,
}) => {
  const [purity, setPurity] = useState<'925' | '999'>('925');
  const [weight, setWeight] = useState<number>(50);
  const [makingChargeRate, setMakingChargeRate] = useState<number>(20); // Rs per gram

  const currentRatePerGram = purity === '999' ? LIVE_SILVER_RATES.purity999 : LIVE_SILVER_RATES.purity925;
  const silverBaseValue = weight * currentRatePerGram;
  const makingChargesTotal = weight * makingChargeRate;
  const hallmarkFee = 45; // Government BIS hallmarking charge
  const subtotalBeforeGst = silverBaseValue + makingChargesTotal + hallmarkFee;
  const gstAmount = subtotalBeforeGst * 0.03; // 3% standard bullion & jewellery GST
  const estimatedTotalPrice = Math.round(subtotalBeforeGst + gstAmount);

  const presets = [
    { label: '10g Coin', weight: 10, purity: '999' as const, making: 10 },
    { label: '50g Diya', weight: 50, purity: '925' as const, making: 24 },
    { label: '100g Lakshmi Idol', weight: 100, purity: '999' as const, making: 20 },
    { label: '250g Thali', weight: 250, purity: '925' as const, making: 22 },
  ];

  return (
    <section id="rate-calculator" className="py-12 bg-[#FAF9F5] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-stone-200">
            {/* Calculator Controls */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-900 uppercase">
                  <Calculator className="w-4 h-4 text-amber-700" />
                  <span>Transparent Purity &amp; Value Engine</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-stone-900">
                  Live Silver Price Calculator
                </h2>
                <p className="text-stone-600 text-sm">
                  We believe in 100% price transparency with zero hidden markups. Calculate exact silver value based on today's official benchmark rate.
                </p>
              </div>

              {/* Quick Presets */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-stone-600">Quick Popular Presets</label>
                <div className="flex flex-wrap gap-2">
                  {presets.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => {
                        setWeight(preset.weight);
                        setPurity(preset.purity);
                        setMakingChargeRate(preset.making);
                      }}
                      className="px-3 py-1.5 text-xs font-medium bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200 rounded-md transition-colors cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Purity Selection */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-stone-700">Select Silver Purity Grade</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPurity('925')}
                    className={`p-3 text-left rounded-lg border transition-all cursor-pointer ${
                      purity === '925'
                        ? 'border-stone-900 bg-stone-50/80 ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="font-semibold text-stone-900 text-sm">925 Sterling Silver</div>
                    <div className="text-xs text-stone-500 mt-0.5">
                      ₹{LIVE_SILVER_RATES.purity925.toFixed(2)}/g · Jewellery &amp; Utensils
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPurity('999')}
                    className={`p-3 text-left rounded-lg border transition-all cursor-pointer ${
                      purity === '999'
                        ? 'border-stone-900 bg-stone-50/80 ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="font-semibold text-stone-900 text-sm">999 Fine Pure Silver</div>
                    <div className="text-xs text-stone-500 mt-0.5">
                      ₹{LIVE_SILVER_RATES.purity999.toFixed(2)}/g · Coins &amp; Sacred Idols
                    </div>
                  </button>
                </div>
              </div>

              {/* Weight Slider & Input */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="silver-weight-input" className="text-xs font-medium text-stone-700">Gross Weight in Grams</label>
                  <div className="flex items-center gap-2">
                    <input
                      id="silver-weight-input"
                      type="number"
                      min={1}
                      max={1000}
                      value={weight}
                      onChange={(e) => setWeight(Math.max(1, Math.min(2000, Number(e.target.value) || 1)))}
                      className="w-24 px-2.5 py-1 text-sm font-semibold text-stone-900 border border-stone-300 rounded-md text-right tabular-nums focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                    <span className="text-xs text-stone-500">grams</span>
                  </div>
                </div>

                <input
                  type="range"
                  min={5}
                  max={500}
                  step={5}
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full accent-stone-900 cursor-pointer"
                  aria-label="Gross weight in grams slider"
                />
                <div className="flex justify-between text-[11px] text-stone-400">
                  <span>5g (Coin/Ring)</span>
                  <span>100g (Idol/Diya)</span>
                  <span>500g (Full Dinner Thali)</span>
                </div>
              </div>

              {/* Making Charges Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-stone-700 flex items-center gap-1.5">
                    <span>Artisan Handcrafting Charges</span>
                    <span className="text-[11px] text-stone-400 font-normal">(varies by intricacy)</span>
                  </span>
                  <span className="text-xs font-semibold text-stone-900 tabular-nums">
                    ₹{makingChargeRate} / g
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={45}
                  step={1}
                  value={makingChargeRate}
                  onChange={(e) => setMakingChargeRate(Number(e.target.value))}
                  className="w-full accent-stone-900 cursor-pointer"
                  aria-label="Artisan handcrafting charges per gram"
                />
              </div>
            </div>

            {/* Price Breakdown & Assurance */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-stone-50/60 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="text-xs uppercase tracking-wider text-stone-500 font-medium">
                  Itemized Cost Breakdown
                </div>

                <div className="space-y-3 text-sm text-stone-700">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200/80">
                    <span>Pure Silver Value ({weight}g × ₹{currentRatePerGram.toFixed(2)})</span>
                    <span className="font-medium text-stone-900 tabular-nums">
                      ₹{silverBaseValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b border-stone-200/80">
                    <span>Artisan Karigari ({weight}g × ₹{makingChargeRate})</span>
                    <span className="font-medium text-stone-900 tabular-nums">
                      ₹{makingChargesTotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b border-stone-200/80">
                    <span className="flex items-center gap-1">
                      <span>Govt. BIS Hallmarking &amp; HUID</span>
                      <Info className="w-3.5 h-3.5 text-stone-400" />
                    </span>
                    <span className="font-medium text-stone-900 tabular-nums">₹{hallmarkFee}</span>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b border-stone-200/80">
                    <span>Applicable GST (3% Standard Bullion)</span>
                    <span className="font-medium text-stone-900 tabular-nums">
                      ₹{Math.round(gstAmount).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Final Estimated Price */}
                <div className="pt-2 bg-white p-4 rounded-xl border border-stone-200">
                  <div className="text-xs text-stone-500 font-medium">Net Estimated Transparent Price</div>
                  <div className="font-serif text-3xl font-semibold text-stone-900 mt-1 tabular-nums">
                    ₹{estimatedTotalPrice.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-emerald-800 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Includes 100% Lifetime Buyback at prevailing silver rate</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={onSelectPoojaCategory}
                  className="w-full py-3 bg-stone-900 text-stone-50 font-medium text-sm rounded-lg hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Browse Ready Hallmarked Ornaments</span>
                  <ArrowUpRight className="w-4 h-4 text-amber-300" />
                </button>
                <div className="text-center text-[11px] text-stone-400">
                  Want custom weight or consecrated pooja engraving? Contact our silversmiths directly.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
