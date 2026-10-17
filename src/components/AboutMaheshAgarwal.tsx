import React from 'react';
import { Award, ShieldCheck, HeartHandshake, CheckCircle2, Sparkles, Clock, Compass } from 'lucide-react';

export const AboutMaheshAgarwal: React.FC = () => {
  return (
    <section id="about-us" className="py-16 sm:py-24 bg-[#FBF9F5] border-t border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header & Founder Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Founder Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-900">
              <Compass className="w-4 h-4 text-amber-800" />
              <span>About Us · A legacy of trust since 1989</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 leading-tight">
              Crafting Purity with Relentless Integrity: <br />
              <span className="italic font-medium text-amber-950">The Journey of Mahesh Agarwal</span>
            </h2>

            <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
              <p>
                In <strong>1989</strong>, <strong>Shri Mahesh Agarwal</strong> started Asha Silver with a modest workbench, a traditional balance scale, and an uncompromising commitment to honest craftsmanship.
              </p>
              <p>
                At that time, customers frequently faced mixed alloys, uncertain purities, and non-transparent pricing in the market. Mahesh Agarwal chose to forge a different path. Through persistent hard work, tireless dedication, and an uncompromising focus on quality products, he personally inspected every piece of silver that left the workshop.
              </p>
              <p>
                He understood deeply that silver in an Indian home carries sacred meaning—whether it is the Lakshmi and Ganesh idols worshipped during Dhanteras, the silver thali used for family festivals, or cherished silver gifts given to celebrate milestones. By delivering pure, flawless silver items and transparent gram-by-gram value, Mahesh Agarwal built a reliable brand name trusted by thousands of families for generations.
              </p>
            </div>

            {/* Quote Callout */}
            <div className="p-5 rounded-xl bg-white border border-stone-200/90 shadow-sm relative">
              <div className="font-serif italic text-base sm:text-lg text-stone-800 leading-snug">
                "Trust is not claimed through words; it is earned through genuine quality, honest weight, and lasting relationships."
              </div>
              <div className="mt-2 text-xs font-semibold text-amber-900 uppercase tracking-wider">
                — Mahesh Agarwal, Founder, Asha Silver (1989)
              </div>
            </div>
          </div>

          {/* Right Column: Building a Reliable Brand Name */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl border border-stone-800">
              <div className="space-y-1">
                <div className="text-amber-300 text-xs font-semibold tracking-wider uppercase flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>A Legacy of Trust</span>
                </div>
                <h3 className="font-serif text-2xl text-stone-100">
                  How a Reliable Brand Name Was Built
                </h3>
              </div>

              <div className="space-y-4 text-xs text-stone-300">
                <div className="flex items-start gap-3 pb-3 border-b border-stone-800">
                  <div className="w-6 h-6 rounded-full bg-amber-900/60 text-amber-300 flex items-center justify-center font-bold shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">Honest &amp; Pure Craftsmanship</h4>
                    <p className="text-stone-400 mt-0.5">
                      Upholding verified metal purity across pure silver utensils, god idols, and gifting collections with zero adulteration.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-3 border-b border-stone-800">
                  <div className="w-6 h-6 rounded-full bg-amber-900/60 text-amber-300 flex items-center justify-center font-bold shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">Empowering Traditional Karigars</h4>
                    <p className="text-stone-400 mt-0.5">
                      Partnering directly with hereditary silversmiths to preserve timeless hand-embossing and Nakshi artwork without middleman markups.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-3 border-b border-stone-800">
                  <div className="w-6 h-6 rounded-full bg-amber-900/60 text-amber-300 flex items-center justify-center font-bold shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">Transparent Gram-by-Gram Billing</h4>
                    <p className="text-stone-400 mt-0.5">
                      Clear itemization of pure silver weight, live daily benchmark rates, and honest making charges with zero hidden deductions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-900/60 text-amber-300 flex items-center justify-center font-bold shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">Customer-First Fair Policy</h4>
                    <p className="text-stone-400 mt-0.5">
                      Standing by every piece sold with transparent buyback and exchange at prevailing silver rates.
                    </p>
                  </div>
                </div>
              </div>

              {/* Milestone Metrics */}
              <div className="pt-4 border-t border-stone-800 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-amber-200">1989</div>
                  <div className="text-[10px] text-stone-400 uppercase">Founded by Mahesh Agarwal</div>
                </div>
                <div>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-amber-200">75,000+</div>
                  <div className="text-[10px] text-stone-400 uppercase">Patron Families</div>
                </div>
                <div>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-amber-200">Over 35 Yrs</div>
                  <div className="text-[10px] text-stone-400 uppercase">Legacy of Trust</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
