import React from 'react';
import { Award, ShieldCheck, HeartHandshake, CheckCircle2, Star, Quote } from 'lucide-react';

export const HeritageSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Dr. Meenakshi Sundaram',
      city: 'Chennai & Bangalore',
      years: 'Patron for 18 Years',
      text: 'Every year for Akshay Tritiya and Diwali Dhanteras, our family has turned to Asha Silver. Their silver coins and Lakshmi idols have pure, radiant sanctity and the hallmarking certificate gives absolute peace of mind.',
      rating: 5,
    },
    {
      name: 'Rajesh & Sunita Singhania',
      city: 'Jaipur & Delhi NCR',
      years: 'Patron for 24 Years',
      text: 'When we bought our daughter’s bridal silver thali set and temple choker from Asha Silver, the craftsmanship was beyond anything available in commercial stores. When we upgraded pieces after 15 years, their buyback policy was 100% fair and transparent to the exact gram.',
      rating: 5,
    },
    {
      name: 'Ananya Deshmukh',
      city: 'Mumbai',
      years: 'Patron for 7 Years',
      text: 'The antique elephant kada pair is simply breathtaking. The detailing on the silver is royal, heavy, and timeless. Beautiful velvet packaging and arrived in 48 hours completely insured.',
      rating: 5,
    },
  ];

  return (
    <section id="heritage" className="py-16 sm:py-20 bg-[#F5F2EB]/60 border-t border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-900">
              <Award className="w-4 h-4 text-amber-800" />
              <span>Our Sacred Lineage · Since 1989</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 leading-tight">
              37 Years of Handcrafted Artistry, <br />
              <span className="italic font-normal text-amber-950">Built on Uncompromised Trust</span>
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Founded in 1989 by master silversmith Smt. Asha and her family, our atelier was born from a singular pledge: to bring back the royal reverence of fine Indian silverware with absolute transparency of metal purity.
            </p>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              While mass manufacturing flooded the market with base alloys and nickel mixes, Asha Silver remained steadfast to traditional fire assay testing, pure 925 sterling silver, and sacred 999 fine bullion. Today, our 3rd-generation karigars continue hand-chasing every floral relief, temple deity, and filigree motif with timeless devotion.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-300">
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">1989</div>
                <div className="text-xs text-stone-500 mt-0.5">Year Established</div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">75,000+</div>
                <div className="text-xs text-stone-500 mt-0.5">Cherished Families</div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">100%</div>
                <div className="text-xs text-stone-500 mt-0.5">BIS Hallmarked</div>
              </div>
            </div>
          </div>

          {/* Right: Hallmarking & Purity Assurance Visual Guide */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="space-y-1">
                <div className="text-xs font-semibold text-amber-900 tracking-wider uppercase">
                  Purity Anatomy &amp; Verification
                </div>
                <h3 className="font-serif text-2xl text-stone-900">
                  How to Decode Your BIS Hallmark Stamp
                </h3>
                <p className="text-xs text-stone-500">
                  Every authentic Asha Silver creation carries four government-mandated hallmarks:
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center font-bold text-xs text-stone-800 shrink-0">
                    ▲
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-stone-900">1. BIS Triangular Standard Mark</h4>
                    <p className="text-[11px] text-stone-500">Official Bureau of Indian Standards seal verifying purity audit.</p>
                  </div>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center font-bold text-xs text-stone-800 shrink-0">
                    925
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-stone-900">2. Purity Fineness Grade (925 or 999)</h4>
                    <p className="text-[11px] text-stone-500">Guarantees 92.5% pure silver for jewellery and 99.9% for sacred bullion.</p>
                  </div>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center font-bold text-xs text-stone-800 shrink-0">
                    AHC
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-stone-900">3. Assaying &amp; Hallmarking Centre Identifier</h4>
                    <p className="text-[11px] text-stone-500">Unique laboratory registration code ensuring independent verification.</p>
                  </div>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center font-bold text-xs text-stone-800 shrink-0">
                    HUID
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-stone-900">4. 6-Digit Alphanumeric HUID</h4>
                    <p className="text-[11px] text-stone-500">Traceable government database identification for lifetime proof of ownership.</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-center gap-2.5 text-xs text-amber-900 font-medium">
                <ShieldCheck className="w-4 h-4 text-amber-800 shrink-0" />
                <span>Zero Tolerance Policy: 100% Silver weight compensation in case of assay variance.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Claim-to-Proof Adjacency: Customer Testimonials */}
        <div className="space-y-6 pt-8 border-t border-stone-300">
          <div className="text-center space-y-1 max-w-xl mx-auto">
            <div className="text-xs uppercase tracking-widest text-amber-900 font-semibold">
              Generations of Trust
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-stone-900">
              Heirlooms Loved Across Decades
            </h3>
            <p className="text-xs text-stone-500">
              Verified patron stories from families who celebrate every milestone with Asha Silver.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-600">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-stone-300" />
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed italic">
                    "{t.text}"
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-stone-900">{t.name}</div>
                    <div className="text-stone-400 text-[11px]">{t.city}</div>
                  </div>
                  <span className="text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                    {t.years}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
