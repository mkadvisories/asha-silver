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
              <span>Our Founder &amp; Origin Story · Est. 1989</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 leading-tight">
              Crafting Purity with Relentless Integrity: <br />
              <span className="italic font-medium text-amber-950">The Vision of Mahesh Agarwal</span>
            </h2>

            <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
              <p>
                In the autumn of <strong>1989</strong>, <strong>Shri Mahesh Agarwal</strong> set out with a humble workbench, a traditional weighing scale, and an unwavering moral conviction: Indian families deserved silver whose purity was beyond question.
              </p>
              <p>
                At a time when the market was fraught with unhallmarked base alloys, concealed weight losses, and unpredictable melted purities, Mahesh Agarwal chose the harder road. Through relentless hard work, long days personally verifying fire-assays, and insisting on transparent, gram-by-gram billing, he built Asha Silver piece by handcrafted piece.
              </p>
              <p>
                He believed that silver in an Indian home is never merely a metal—it is the blessed Lakshmi at the altar, the baby's first silver bowl, the bride's sacred anklet, and the hard-earned savings of a lifetime. By refusing to compromise on quality and standing by a 100% buyback promise, Mahesh Agarwal transformed Asha Silver into a household synonym for <em>purity, trust, and dependability</em>.
              </p>
            </div>

            {/* Quote Callout */}
            <div className="p-5 rounded-xl bg-white border border-stone-200/90 shadow-sm relative">
              <div className="font-serif italic text-base sm:text-lg text-stone-800 leading-snug">
                "Trust is not claimed on a billboard; it is weighed on the jeweler's balance every single day."
              </div>
              <div className="mt-2 text-xs font-semibold text-amber-900 uppercase tracking-wider">
                — Mahesh Agarwal, Founder, Asha Silver (1989)
              </div>
            </div>
          </div>

          {/* Right Column: 4 Pillars of Mahesh Agarwal's Legacy */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl border border-stone-800">
              <div className="space-y-1">
                <div className="text-amber-300 text-xs font-semibold tracking-wider uppercase flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>The Mahesh Agarwal Principles</span>
                </div>
                <h3 className="font-serif text-2xl text-stone-100">
                  How a Reliable Brand Name Was Built
                </h3>
              </div>

              <div className="space-y-4 text-xs text-stone-300">
                <div className="flex items-start gap-3 pb-3 border-b border-stone-800">
                  <div className="w-6 h-6 rounded-full bg-amber-900/60 text-amber-300 flex items-center justify-center font-bold shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">Uncompromising Metal Purity</h4>
                    <p className="text-stone-400 mt-0.5">
                      Pioneered 100% fire assay testing and adopted certified BIS hallmarking decades before it became a government mandate.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-3 border-b border-stone-800">
                  <div className="w-6 h-6 rounded-full bg-amber-900/60 text-amber-300 flex items-center justify-center font-bold shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">Empowering Generational Karigars</h4>
                    <p className="text-stone-400 mt-0.5">
                      Directly supported hereditary silversmiths from Jaipur, Rajkot, and Cuttack, eliminating middlemen to preserve ancient Nakshi and filigree arts.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-3 border-b border-stone-800">
                  <div className="w-6 h-6 rounded-full bg-amber-900/60 text-amber-300 flex items-center justify-center font-bold shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">Transparent Gram-by-Gram Billing</h4>
                    <p className="text-stone-400 mt-0.5">
                      Clear itemization of pure silver weight, live daily benchmark rates, and explicit making charges with zero hidden deductions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-900/60 text-amber-300 flex items-center justify-center font-bold shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">100% Lifetime Buyback Guarantee</h4>
                    <p className="text-stone-400 mt-0.5">
                      Every ounce of silver sold is honored for exchange or return at prevailing bullion rates across all Asha Silver ateliers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Milestone Metrics */}
              <div className="pt-4 border-t border-stone-800 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-amber-200">1989</div>
                  <div className="text-[10px] text-stone-400 uppercase">Founded</div>
                </div>
                <div>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-amber-200">75,000+</div>
                  <div className="text-[10px] text-stone-400 uppercase">Patron Families</div>
                </div>
                <div>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-amber-200">37 Years</div>
                  <div className="text-[10px] text-stone-400 uppercase">Legacy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
