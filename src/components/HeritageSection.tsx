import React from 'react';
import { Award, ShieldCheck, HeartHandshake, CheckCircle2, Star, Quote, Sparkles } from 'lucide-react';

export const HeritageSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Dr. Meenakshi Sundaram',
      city: 'Chennai & Bangalore',
      years: 'Patron for 18 Years',
      text: 'Every year for Dhanteras, our family purchases our silver coins and Lakshmi Ganesh idols from Asha Silver. The craftsmanship and purity bring such divine sanctity to our mandir, and their transparent billing has earned our lifelong trust.',
      rating: 5,
    },
    {
      name: 'Rajesh & Sunita Singhania',
      city: 'Jaipur & Delhi NCR',
      years: 'Patron for 24 Years',
      text: 'We bought our family’s royal silver dining thali set and silver water pitchers from Shri Mahesh Agarwal over twenty years ago. The weight, finish, and silver quality are still as brilliant as the first day. A truly reliable brand name.',
      rating: 5,
    },
    {
      name: 'Ananya Deshmukh',
      city: 'Mumbai',
      years: 'Patron for 7 Years',
      text: 'For our housewarming and Dhanteras, we ordered the pure silver pooja deepam and silver gift coin boxes. Everything arrived impeccably packed in velvet presentation cases with prompt customer care.',
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
              <span>A Legacy of Trust · Since 1989</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 leading-tight">
              Generations of Dedicated Craftsmanship, <br />
              <span className="italic font-normal text-amber-950">Specializing in Silver Utensils &amp; Sacred Deities</span>
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Started in 1989 by Shri Mahesh Agarwal, Asha Silver was founded with a singular commitment: to provide genuine, pure silver utensils, sacred idols of god, and auspicious silver gifts with absolute purity and honesty.
            </p>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Through hard work and an uncompromising focus on quality products, Mahesh Agarwal built a reliable brand name that thousands of families trust year after year, especially on auspicious occasions like Dhanteras and Diwali.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-300">
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">1989</div>
                <div className="text-xs text-stone-500 mt-0.5">Year Established</div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">75,000+</div>
                <div className="text-xs text-stone-500 mt-0.5">Patron Families</div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">100%</div>
                <div className="text-xs text-stone-500 mt-0.5">Pure Quality Silver</div>
              </div>
            </div>
          </div>

          {/* Right: Pure Silver Assurances & Specialty Focus */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="space-y-1">
                <div className="text-xs font-semibold text-amber-900 tracking-wider uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>Our Silver Specialties</span>
                </div>
                <h3 className="font-serif text-2xl text-stone-900">
                  Pure Craftsmanship in Every Piece
                </h3>
                <p className="text-xs text-stone-500">
                  Handcrafted with utmost care for your home mandir, dining table, and sacred occasions:
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs shrink-0">
                    🍽️
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-stone-900">Silver Utensils &amp; Tableware</h4>
                    <p className="text-[11px] text-stone-500">Heirloom dining thalis, embossed water tumblers, katori bowls, and silver pitchers designed for healthy living and royal hospitality.</p>
                  </div>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs shrink-0">
                    🪔
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-stone-900">Silver Items of God &amp; Mandir Sanctity</h4>
                    <p className="text-[11px] text-stone-500">Consecrated 999 pure silver Lakshmi and Ganesha idols, Nakshi sinhasan thrones, sculpted Mayur deepams, and mandir bells.</p>
                  </div>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs shrink-0">
                    🎁
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-stone-900">Auspicious Silver Gift Items</h4>
                    <p className="text-[11px] text-stone-500">Pure 999 Dhanteras coins, ornate deity photo frames, silver gift boxes, and memorable wedding tokens in luxury packaging.</p>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-center gap-2.5 text-xs text-amber-900 font-medium">
                <ShieldCheck className="w-4 h-4 text-amber-800 shrink-0" />
                <span>Purity Guarantee: Gram-by-gram transparency and 100% genuine silver assurance.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Testimonials */}
        <div className="space-y-6 pt-8 border-t border-stone-300">
          <div className="text-center space-y-1 max-w-xl mx-auto">
            <div className="text-xs uppercase tracking-widest text-amber-900 font-semibold">
              Generations of Trust
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-stone-900">
              Heirlooms Treasured Across Decades
            </h3>
            <p className="text-xs text-stone-500">
              Stories from patron families who celebrate Dhanteras and family milestones with Asha Silver.
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
                  <p className="text-xs text-stone-700 leading-relaxed italic">
                    "{t.text}"
                  </p>
                </div>
                <div className="pt-3 border-t border-stone-100">
                  <div className="text-xs font-semibold text-stone-900">{t.name}</div>
                  <div className="text-[11px] text-stone-500">{t.city} · <span className="text-amber-800 font-medium">{t.years}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
