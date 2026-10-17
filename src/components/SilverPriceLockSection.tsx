import React, { useState } from 'react';
import { Lock, ShieldCheck, TrendingUp, Sparkles, CheckCircle2, Calendar, FileText, ArrowRight, Printer, RefreshCw } from 'lucide-react';
import { LIVE_SILVER_RATES } from '../data/products';
import { SilverPriceLock } from '../types/cart';

interface SilverPriceLockSectionProps {
  onAddLockToCart: (lockData: {
    grams: number;
    purity: '925' | '999';
    ratePerGram: number;
    totalAmount: number;
    durationDays: number;
  }) => void;
  onCertificateGenerated: (cert: SilverPriceLock) => void;
}

export const SilverPriceLockSection: React.FC<SilverPriceLockSectionProps> = ({
  onAddLockToCart,
  onCertificateGenerated,
}) => {
  const [purity, setPurity] = useState<'925' | '999'>('925');
  const [grams, setGrams] = useState<number>(200); // 200g default as requested
  const [durationDays, setDurationDays] = useState<number>(60);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [generatedCertificate, setGeneratedCertificate] = useState<SilverPriceLock | null>(null);

  const ratePerGram = purity === '999' ? LIVE_SILVER_RATES.purity999 : LIVE_SILVER_RATES.purity925;
  const silverBaseValue = grams * ratePerGram;
  const gst = Math.round(silverBaseValue * 0.03);
  const totalLockedAmount = silverBaseValue + gst;

  const handleCreateLock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    const certId = 'ASL-LOCK-' + Math.floor(100000 + Math.random() * 900000);
    const today = new Date();
    const expiry = new Date();
    expiry.setDate(today.getDate() + durationDays);

    const lockObj: SilverPriceLock = {
      id: certId,
      certificateNumber: certId,
      customerName,
      customerPhone,
      customerEmail: customerEmail || 'patron@ashasilver.com',
      purity,
      ratePerGram,
      grams,
      totalAmount: totalLockedAmount,
      advanceAmountPaid: totalLockedAmount,
      lockDurationDays: durationDays,
      bookingDate: today.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      expiryDate: expiry.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'active',
    };

    setGeneratedCertificate(lockObj);
    onCertificateGenerated(lockObj);
  };

  return (
    <section id="price-lock" className="py-16 sm:py-20 bg-stone-900 text-stone-100 scroll-mt-20 relative overflow-hidden">
      {/* Background motif */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-950/70 border border-amber-800/50 rounded-full text-xs text-amber-300 font-medium">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>Suraksha Silver Rate Lock Guarantee</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-tight">
            Lock In Today's Silver Rate. <br />
            <span className="italic text-amber-200">Shield Your Future Purchases from Inflation.</span>
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Planning a wedding trousseau, festival pooja, or bullion savings? Lock in current silver rates (e.g. 200g of pure silver) today. If prices climb, you pay the lower locked price. If prices fall at redemption, you get the lower market rate benefit!
          </p>
        </div>

        {/* Interactive Lock-In Calculator & Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Controls */}
          <div className="lg:col-span-7 bg-stone-800/90 rounded-2xl border border-stone-700 p-6 sm:p-8 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-700">
                <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">
                  Step 1: Choose Purity &amp; Live Rate
                </span>
                <span className="text-xs text-amber-300 font-medium">
                  Live MCX Benchmark
                </span>
              </div>

              {/* Purity selector */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPurity('925')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    purity === '925'
                      ? 'border-amber-400 bg-amber-950/40 ring-1 ring-amber-400'
                      : 'border-stone-700 bg-stone-900/60 hover:border-stone-600'
                  }`}
                >
                  <div className="font-semibold text-white text-sm">925 Sterling Silver</div>
                  <div className="text-xs text-stone-400 mt-1">
                    Utensils, Tableware &amp; Gifting
                  </div>
                  <div className="text-amber-300 font-mono font-bold text-sm mt-1">
                    ₹{LIVE_SILVER_RATES.purity925.toFixed(2)} / g
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPurity('999')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    purity === '999'
                      ? 'border-amber-400 bg-amber-950/40 ring-1 ring-amber-400'
                      : 'border-stone-700 bg-stone-900/60 hover:border-stone-600'
                  }`}
                >
                  <div className="font-semibold text-white text-sm">999 Fine Pure Bullion</div>
                  <div className="text-xs text-stone-400 mt-1">
                    Sacred Idols &amp; Bullion Bars
                  </div>
                  <div className="text-amber-300 font-mono font-bold text-sm mt-1">
                    ₹{LIVE_SILVER_RATES.purity999.toFixed(2)} / g
                  </div>
                </button>
              </div>

              {/* Step 2: Weight Selection with 200g prominent button */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="lock-grams-input" className="text-xs uppercase tracking-wider text-stone-400 font-medium">
                    Step 2: Silver Weight to Lock In
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      id="lock-grams-input"
                      type="number"
                      min={10}
                      max={5000}
                      value={grams}
                      onChange={(e) => setGrams(Math.max(10, Number(e.target.value) || 10))}
                      className="w-24 px-2.5 py-1 text-sm font-semibold bg-stone-900 border border-stone-600 rounded-md text-white text-right tabular-nums focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                    <span className="text-xs text-stone-400">grams</span>
                  </div>
                </div>

                {/* Popular Presets with 200g highlighted */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: '100g', value: 100 },
                    { label: '200g (Recommended)', value: 200 },
                    { label: '500g', value: 500 },
                    { label: '1000g (1 kg)', value: 1000 },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setGrams(preset.value)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                        grams === preset.value
                          ? 'bg-amber-400 text-stone-950 font-semibold'
                          : 'bg-stone-700/80 hover:bg-stone-700 text-stone-200'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <input
                  type="range"
                  min={20}
                  max={1000}
                  step={10}
                  value={grams}
                  onChange={(e) => setGrams(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                  aria-label="Silver grams slider"
                />
              </div>

              {/* Step 3: Validity Period */}
              <div className="space-y-2 pt-2">
                <label className="text-xs uppercase tracking-wider text-stone-400 font-medium">
                  Step 3: Lock-In Duration
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { days: 30, label: '30 Days' },
                    { days: 60, label: '60 Days' },
                    { days: 90, label: '90 Days' },
                  ].map((item) => (
                    <button
                      key={item.days}
                      type="button"
                      onClick={() => setDurationDays(item.days)}
                      className={`py-2 text-xs font-medium rounded-lg border text-center transition-all cursor-pointer ${
                        durationDays === item.days
                          ? 'border-amber-400 bg-amber-950/40 text-amber-200 font-semibold'
                          : 'border-stone-700 bg-stone-900/40 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Patron Booking Form */}
            <form onSubmit={handleCreateLock} className="pt-4 border-t border-stone-700 space-y-4">
              <div className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
                Generate Official Rate-Lock Certificate
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="patron-name-input" className="block text-[11px] text-stone-400 mb-1">Full Name *</label>
                  <input
                    id="patron-name-input"
                    type="text"
                    required
                    placeholder="e.g. Mahesh Agrawal / Priya Sharma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label htmlFor="patron-phone-input" className="block text-[11px] text-stone-400 mb-1">Mobile Number (SMS verification) *</label>
                  <input
                    id="patron-phone-input"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-amber-200 hover:bg-amber-100 text-stone-950 font-semibold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Lock className="w-4 h-4" />
                  <span>Lock In {grams}g Silver Now</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onAddLockToCart({
                      grams,
                      purity,
                      ratePerGram,
                      totalAmount: totalLockedAmount,
                      durationDays,
                    });
                  }}
                  className="py-3 px-4 bg-stone-700 hover:bg-stone-600 text-stone-100 font-medium text-xs sm:text-sm rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  Add Lock-In to Shopping Bag
                </button>
              </div>
            </form>
          </div>

          {/* Right: Live Calculation & Digital Certificate Preview */}
          <div className="lg:col-span-5 space-y-4">
            {/* Calculation summary card */}
            <div className="bg-stone-800 rounded-2xl border border-stone-700 p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-700">
                <span className="text-xs uppercase tracking-wider text-stone-400">Lock-In Valuation</span>
                <span className="text-xs font-mono text-amber-300">
                  {grams}g × ₹{ratePerGram.toFixed(2)}/g
                </span>
              </div>

              <div className="space-y-2 text-xs text-stone-300">
                <div className="flex justify-between">
                  <span>Pure Silver Bullion Value ({grams}g)</span>
                  <span className="font-semibold text-white tabular-nums">
                    ₹{silverBaseValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Applicable GST (3%)</span>
                  <span className="text-stone-400 tabular-nums">₹{gst.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Lock-in Protection Fee</span>
                  <span className="text-emerald-400 font-semibold">100% WAIVED</span>
                </div>
                <div className="flex justify-between border-t border-stone-700 pt-3 text-sm font-semibold text-white">
                  <span>Total Lock-In Payable</span>
                  <span className="font-serif text-2xl text-amber-200 tabular-nums">
                    ₹{totalLockedAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Guarantees */}
              <div className="p-3.5 bg-stone-900 rounded-xl border border-stone-700 space-y-2 text-xs">
                <div className="text-amber-300 font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Asha Silver Dual Protection Rule</span>
                </div>
                <p className="text-stone-400 text-[11px] leading-relaxed">
                  ✓ If market rate jumps to ₹120/g, you still redeem at your locked ₹{ratePerGram.toFixed(2)}/g. <br />
                  ✓ If market rate drops to ₹80/g, we honor the lower rate or give bonus silver weight!
                </p>
              </div>
            </div>

            {/* Generated Certificate Display (If generated) */}
            {generatedCertificate && (
              <div className="bg-[#FAF9F5] text-stone-900 rounded-2xl p-6 border-2 border-amber-300 shadow-2xl space-y-4 animate-fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                  <div>
                    <div className="font-serif text-lg font-bold text-stone-900">Asha Silver</div>
                    <div className="text-[10px] text-amber-900 uppercase font-semibold">
                      Suraksha Rate Lock Certificate
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                      {generatedCertificate.certificateNumber}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-stone-500 block text-[10px]">Patron Name</span>
                    <span className="font-semibold">{generatedCertificate.customerName}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">Locked Weight</span>
                    <span className="font-semibold text-amber-950">{generatedCertificate.grams} grams ({generatedCertificate.purity} Grade)</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">Locked Rate</span>
                    <span className="font-semibold">₹{generatedCertificate.ratePerGram.toFixed(2)} / g</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">Valid Until</span>
                    <span className="font-semibold text-emerald-800">{generatedCertificate.expiryDate}</span>
                  </div>
                </div>

                <div className="text-[11px] text-stone-600 bg-white p-2.5 rounded border border-stone-200">
                  Redeemable against any Asha Silver showroom purchase or online order. 100% buyback guarantee backed by Mahesh Agarwal since 1989.
                </div>

                <button
                  onClick={() => window.print()}
                  className="w-full py-2 bg-stone-900 text-stone-50 text-xs font-medium rounded-lg hover:bg-stone-800 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Official Certificate</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
