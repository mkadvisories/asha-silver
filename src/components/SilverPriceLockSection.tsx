import React, { useState } from 'react';
import { Lock, ShieldCheck, PhoneCall, Sparkles, CheckCircle2, Calendar, FileText, ArrowRight, Printer, RefreshCw, Clock } from 'lucide-react';
import { LIVE_SILVER_RATES } from '../data/products';
import { SilverPriceLock } from '../types/cart';

interface SilverPriceLockSectionProps {
  onAddLockToCart?: (lockData: {
    grams: number;
    purity: '999' | '880';
    ratePerGram: number;
    totalAmount: number;
    durationDays: number;
  }) => void;
  onLockGenerated?: (lock: SilverPriceLock) => void;
}

export const SilverPriceLockSection: React.FC<SilverPriceLockSectionProps> = ({
  onAddLockToCart,
  onLockGenerated,
}) => {
  const purity: '999' = '999';
  const [grams, setGrams] = useState<number>(200); // 200g default
  const [durationDays, setDurationDays] = useState<number>(60);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [requirementNotes, setRequirementNotes] = useState('Wedding dining thali set & puja utensils');
  const [preferredCallTime, setPreferredCallTime] = useState('Immediate / Any time');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initiatedLock, setInitiatedLock] = useState<SilverPriceLock | null>(null);

  const ratePerGram = LIVE_SILVER_RATES.purity999;
  const silverBaseValue = grams * ratePerGram;
  const gst = Math.round(silverBaseValue * 0.03);
  const totalEstimatedAmount = silverBaseValue + gst;

  const handleInitiateLock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    setIsSubmitting(true);
    const initiationId = 'ASL-INIT-' + Math.floor(100000 + Math.random() * 900000);
    const today = new Date();
    const expiry = new Date();
    expiry.setDate(today.getDate() + durationDays);

    const lockObj: SilverPriceLock = {
      id: initiationId,
      confirmationNumber: initiationId,
      customerName,
      customerPhone,
      customerEmail: customerEmail || 'patron@ashasilver.com',
      purity,
      ratePerGram,
      grams,
      totalAmount: totalEstimatedAmount,
      advanceAmountPaid: 0, // Advance to be collected separately after consultation
      lockDurationDays: durationDays,
      bookingDate: today.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      expiryDate: expiry.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'initiated',
      requirementNotes,
    };

    // Prepare dispatch to management
    const payload = {
      _subject: `[Asha Silver] Rate Lock Initiated - ${customerName} (${grams}g 999 Silver)`,
      "Request Type": "Rate Lock Initiation",
      "Initiation Reference": initiationId,
      "Customer Name": customerName,
      "Phone Number": customerPhone,
      "Email": customerEmail || 'Not provided',
      "Requirement": requirementNotes,
      "Preferred Call Time": preferredCallTime,
      "Requested Silver Weight": `${grams} grams (~${(grams / 1000).toFixed(3)} kg)`,
      "Purity Benchmark": "999 Pure Silver (MCX + 3%)",
      "Benchmark Rate": `₹${ratePerGram.toFixed(2)} / gram`,
      "Estimated Metal Valuation": `₹${totalEstimatedAmount.toLocaleString('en-IN')}`,
      "Proposed Validity Window": `${durationDays} Days`,
      "Action Required": "Call customer to understand requirement, collect advance payment separately, and formally lock rate.",
      _template: "table",
      _captcha: "false",
    };

    try {
      // 1. Dispatch to server order/inquiry store
      fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...lockObj,
          payload,
          destination: 'mkadvisories@gmail.com',
        }),
      }).catch(() => {});

      // 2. Dispatch to FormSubmit direct mailer
      fetch('https://formsubmit.co/ajax/mkadvisories@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      }).catch(() => {});
    } catch (err) {
      console.error(err);
    }

    setInitiatedLock(lockObj);
    if (onLockGenerated) {
      onLockGenerated(lockObj);
    }
    setIsSubmitting(false);
  };

  return (
    <section id="price-lock" className="py-16 sm:py-20 bg-stone-900 text-stone-100 scroll-mt-20 relative overflow-hidden">
      {/* Background motif */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-950/70 border border-amber-800/40 rounded-full text-xs text-amber-300 font-medium">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>Asha Silver Rate Protection · Zero Speculation</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-tight">
            Silver Rate Lock Initiation
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Silver rates fluctuate daily on the commodity exchanges. With Asha Silver’s Rate Lock feature, you can initiate a rate protection request for your upcoming family weddings, sacred puja rituals, or Dhanteras.
          </p>

          {/* How It Works Flow Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="bg-stone-800/80 p-3 rounded-xl border border-stone-700/80 space-y-1">
              <div className="text-amber-400 font-semibold flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-[11px] font-bold">1</span>
                <span>Initiate Request</span>
              </div>
              <p className="text-stone-400 text-[11px]">Choose target silver weight and benchmark purity grade.</p>
            </div>
            <div className="bg-stone-800/80 p-3 rounded-xl border border-stone-700/80 space-y-1">
              <div className="text-amber-400 font-semibold flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-[11px] font-bold">2</span>
                <span>Specialist Consultation</span>
              </div>
              <p className="text-stone-400 text-[11px]">We call you directly to understand your specific requirement and custom pieces.</p>
            </div>
            <div className="bg-stone-800/80 p-3 rounded-xl border border-stone-700/80 space-y-1">
              <div className="text-amber-400 font-semibold flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-[11px] font-bold">3</span>
                <span>Advance &amp; Lock</span>
              </div>
              <p className="text-stone-400 text-[11px]">Advance is collected separately, after which your live silver rate is formally locked!</p>
            </div>
          </div>
        </div>

        {/* Interactive Rate-Lock Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Input Form Controls */}
          <div className="lg:col-span-7 bg-stone-800/90 rounded-2xl border border-stone-700/80 p-6 sm:p-8 space-y-6 shadow-xl">
            {/* Step 1: Purity Choice */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                  Step 1: Benchmark Silver Grade
                </label>
                <span className="text-[11px] text-stone-400">
                  Live Commodity Benchmark
                </span>
              </div>

              {/* Primary 999 Bullion Rate Lock Card */}
              <div className="p-4 rounded-xl border border-amber-400 bg-amber-950/40 ring-1 ring-amber-400">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="font-semibold text-white text-base">999 Pure Silver Bullion (MCX + 3%)</div>
                    <div className="text-xs text-stone-300 mt-0.5">
                      Fine Bullion Standard · Consecrated Mandir Idols, Coins &amp; Silver Bars
                    </div>
                  </div>
                  <div className="sm:text-right">
                    <div className="text-amber-300 font-mono font-bold text-lg">
                      ₹{LIVE_SILVER_RATES.purity999.toFixed(2)} / g
                    </div>
                    <div className="text-[10px] text-stone-400">MCX + 3% Benchmark</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Weight Selection with 200g prominent button */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                  Step 2: Enter Estimated Silver Weight (Grams)
                </label>
                <span className="text-xs text-stone-400 font-mono">
                  {grams}g (~{(grams / 1000).toFixed(3)} kg)
                </span>
              </div>

              {/* Quick Preset Buttons */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: 50, label: '50g' },
                  { value: 100, label: '100g' },
                  { value: 200, label: '200g (Featured)' },
                  { value: 500, label: '500g' },
                ].map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => setGrams(preset.value)}
                    className={`py-2 px-1 text-xs font-medium rounded-lg border text-center transition-all cursor-pointer ${
                      grams === preset.value
                        ? 'border-amber-400 bg-amber-400 text-stone-950 font-bold shadow-sm'
                        : 'border-stone-700 bg-stone-900/50 text-stone-300 hover:border-stone-600'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* Slider for custom weight */}
              <div className="space-y-1 pt-1">
                <input
                  type="range"
                  min="10"
                  max="2000"
                  step="10"
                  value={grams}
                  onChange={(e) => setGrams(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-stone-500 font-mono">
                  <span>10g</span>
                  <span className="text-amber-300 font-bold">Selected: {grams} Grams</span>
                  <span>2,000g (2 kg)</span>
                </div>
              </div>
            </div>

            {/* Step 3: Duration Selection */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                Step 3: Select Lock-In Validity Window
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

            {/* Patron Initiation Form */}
            <form onSubmit={handleInitiateLock} className="pt-4 border-t border-stone-700 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-wider text-amber-300 font-semibold flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Initiate Rate Lock &amp; Consultation Request</span>
                </div>
                <span className="text-[10px] text-stone-400">Advance collected separately</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="patron-name-input" className="block text-[11px] text-stone-400 mb-1">Full Name *</label>
                  <input
                    id="patron-name-input"
                    type="text"
                    required
                    placeholder="e.g. Ramesh Agrawal / Priya Sharma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label htmlFor="patron-phone-input" className="block text-[11px] text-stone-400 mb-1">Mobile Number (We will call you) *</label>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="patron-req-input" className="block text-[11px] text-stone-400 mb-1">Your Requirement / Occasion</label>
                  <input
                    id="patron-req-input"
                    type="text"
                    placeholder="e.g. Wedding Feast Thali, Mandir Idols, Coins"
                    value={requirementNotes}
                    onChange={(e) => setRequirementNotes(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label htmlFor="patron-time-input" className="block text-[11px] text-stone-400 mb-1">Preferred Time for Specialist Call</label>
                  <select
                    id="patron-time-input"
                    value={preferredCallTime}
                    onChange={(e) => setPreferredCallTime(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  >
                    <option value="Immediate / Any time">Immediate / Any time</option>
                    <option value="Morning (10:00 AM – 1:00 PM)">Morning (10:00 AM – 1:00 PM)</option>
                    <option value="Afternoon (1:00 PM – 5:00 PM)">Afternoon (1:00 PM – 5:00 PM)</option>
                    <option value="Evening (5:00 PM – 8:30 PM)">Evening (5:00 PM – 8:30 PM)</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-stone-900/80 rounded-xl border border-stone-700/80 text-[11px] text-stone-400 space-y-1">
                <div className="font-semibold text-amber-200">What happens after you submit?</div>
                <div>
                  Our silverware specialist will call you directly to understand your pieces and finish. We will take the advance payment separately via secure transfer, and then only lock in your silver rate.
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-amber-200 hover:bg-amber-100 disabled:opacity-50 text-stone-950 font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Lock className="w-4 h-4 text-stone-950" />
                <span>{isSubmitting ? 'Submitting...' : `Initiate Rate Lock for ${grams}g Silver`}</span>
              </button>
            </form>
          </div>

          {/* Right: Valuation & Rate-Lock Initiated Status Display */}
          <div className="lg:col-span-5 space-y-4">
            {/* Calculation summary card */}
            <div className="bg-stone-800 rounded-2xl border border-stone-700 p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-700">
                <span className="text-xs uppercase tracking-wider text-stone-400">Lock-In Valuation Benchmark</span>
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
                  <span>Consultation &amp; Locking Service Fee</span>
                  <span className="text-emerald-400 font-semibold">100% WAIVED</span>
                </div>
                <div className="flex justify-between border-t border-stone-700 pt-3 text-sm font-semibold text-white">
                  <span>Estimated Total Bullion Value</span>
                  <span className="font-serif text-2xl text-amber-200 tabular-nums">
                    ₹{totalEstimatedAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Protection Assurance */}
              <div className="p-3.5 bg-stone-900 rounded-xl border border-stone-700 space-y-2 text-xs">
                <div className="text-amber-300 font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Asha Silver Protection Assurance</span>
                </div>
                <p className="text-stone-400 text-[11px] leading-relaxed">
                  ✓ Protects against price hikes for all your festive and wedding silverware requirements.<br />
                  ✓ Advance collected separately upon phone consultation before lock finalization.
                </p>
              </div>
            </div>

            {/* Rate Lock Initiated Confirmation Card */}
            {initiatedLock && (
              <div className="bg-[#FAF9F5] text-stone-900 rounded-2xl p-6 border-2 border-emerald-500 shadow-2xl space-y-4 animate-fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                  <div>
                    <div className="font-serif text-lg font-bold text-stone-900">Asha Silver</div>
                    <div className="text-[10px] text-emerald-800 uppercase font-bold flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Rate Lock Request Initiated</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded border border-emerald-300">
                      {initiatedLock.confirmationNumber}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
                  <div className="font-semibold flex items-center gap-1.5 text-emerald-900">
                    <PhoneCall className="w-4 h-4 text-emerald-700" />
                    <span>Next Step: Our Specialist Will Call You</span>
                  </div>
                  <p className="text-[11px] text-emerald-900 leading-relaxed">
                    We will call you at <strong>{initiatedLock.customerPhone}</strong> to understand your requirements, explain the pieces and weights, take the advance payment separately, and then formally lock in your rate.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-stone-500 block text-[10px]">Patron Name</span>
                    <span className="font-semibold text-stone-900">{initiatedLock.customerName}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">Requested Weight</span>
                    <span className="font-semibold text-amber-950">{initiatedLock.grams} grams (999 Pure)</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">Current Benchmark</span>
                    <span className="font-semibold text-stone-900">₹{initiatedLock.ratePerGram.toFixed(2)} / g</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">Validity Window</span>
                    <span className="font-semibold text-stone-900">{initiatedLock.lockDurationDays} Days</span>
                  </div>
                </div>

                {initiatedLock.requirementNotes && (
                  <div className="text-[11px] text-stone-600 bg-white p-2.5 rounded border border-stone-200">
                    <span className="font-medium text-stone-800">Requirement: </span>
                    {initiatedLock.requirementNotes}
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-2 bg-stone-900 text-stone-50 text-xs font-medium rounded-lg hover:bg-stone-800 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Initiation Slip</span>
                  </button>
                  <button
                    onClick={() => {
                      setInitiatedLock(null);
                      setCustomerName('');
                      setCustomerPhone('');
                    }}
                    className="py-2 px-3 border border-stone-300 text-stone-700 text-xs font-medium rounded-lg hover:bg-stone-100 cursor-pointer"
                  >
                    Initiate Another
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
