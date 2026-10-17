import React from 'react';
import { Layers, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, Utensils, Coins, Gem } from 'lucide-react';
import { LIVE_SILVER_RATES } from '../data/products';

interface MetalByPuritySectionProps {
  onSelectPurityFilter: (purityCode: 'all' | '925' | '999' | '835') => void;
  onNavigateToCollection: () => void;
}

export const MetalByPuritySection: React.FC<MetalByPuritySectionProps> = ({
  onSelectPurityFilter,
  onNavigateToCollection,
}) => {
  const purities = [
    {
      code: '999' as const,
      title: '999 Fine Pure Silver',
      subtitle: '99.9% Metallurgical Fineness',
      rate: LIVE_SILVER_RATES.purity999,
      icon: Coins,
      badge: 'Maximum Purity',
      description:
        'Unalloyed, pristine bullion-grade silver. Extremely lustrous and ductile, traditionally reserved for consecrated temple idols, Lakshmi-Ganesha puja sculptures, and wealth-preservation bullion coins.',
      bestFor: ['Sacred Mandir Idols & Murtis', '999 Auspicious Bullion Coins', 'Charan Padukas & Shree Yantras', 'Long-term Bullion Savings'],
      hallmark: 'BIS Triangle + 999 Stamp',
      color: 'border-amber-400 bg-amber-50/40',
      tagColor: 'bg-amber-100 text-amber-900',
    },
    {
      code: '925' as const,
      title: '925 Sterling Silver',
      subtitle: '92.5% Silver + 7.5% Reinforcing Alloy',
      rate: LIVE_SILVER_RATES.purity925,
      icon: Gem,
      badge: 'Fine Jewellery Benchmark',
      description:
        'The global gold standard for precious silver jewellery. Balancing divine luster with exceptional tensile strength, allowing master silversmiths to execute intricate filigree, gem-setting, and antique Nakshi carvings.',
      bestFor: ['Antique Temple Chokers & Necklaces', 'Filigree Jhumkas & Chandbalis', 'Elephant Head Kadas & Bangles', 'Traditional Payals & Anklets'],
      hallmark: 'BIS Triangle + 925 Hallmark',
      color: 'border-stone-300 bg-white',
      tagColor: 'bg-stone-100 text-stone-900',
    },
    {
      code: '835' as const,
      title: '835 / 800 Silverware Grade',
      subtitle: '83.5% Traditional Dining Formulation',
      rate: LIVE_SILVER_RATES.purity835,
      icon: Utensils,
      badge: 'Heirloom Tableware',
      description:
        'Engineered specifically for heavy royal dining and pooja utensils. The specialized alloy structure ensures resistance to dents, scratches, and daily dining wear while conferring Ayurvedic cooling health benefits.',
      bestFor: ['Rajwada Dining Thali Platters', 'Engraved Water Tumblers & Jugs', 'Aarti Deepams & Incense Stands', 'Newborn Baby Silver Feeding Sets'],
      hallmark: 'Assay Certified 835 Stamping',
      color: 'border-stone-300 bg-white',
      tagColor: 'bg-stone-100 text-stone-900',
    },
  ];

  return (
    <section id="metal-by-purity" className="py-16 sm:py-20 bg-[#FAF9F5] border-t border-stone-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-900">
              <Layers className="w-4 h-4 text-amber-800" />
              <span>Metallurgical Transparency</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight">
              Metal by Purity Guide
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl">
              At Asha Silver, we strictly classify and hallmark our metal by fineness so you always know exactly what you are investing in.
            </p>
          </div>

          <button
            onClick={() => {
              onSelectPurityFilter('all');
              onNavigateToCollection();
            }}
            className="text-xs font-semibold text-amber-950 hover:text-amber-800 underline underline-offset-4 self-start md:self-auto cursor-pointer"
          >
            View Entire Hallmarked Catalog →
          </button>
        </div>

        {/* 3 Purity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {purities.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.code}
                className={`rounded-2xl border p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md ${item.color}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-stone-900 text-amber-300 flex items-center justify-center shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider ${item.tagColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900">
                      {item.title}
                    </h3>
                    <div className="text-xs text-stone-500 mt-0.5">{item.subtitle}</div>
                    <div className="text-sm font-semibold text-amber-950 mt-1 tabular-nums">
                      Live Rate: ₹{item.rate.toFixed(2)} / gram
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Best Used For List */}
                  <div className="space-y-2 pt-2 border-t border-stone-200">
                    <div className="text-[11px] uppercase tracking-wider text-stone-400 font-medium">
                      Ideal Applications:
                    </div>
                    <ul className="space-y-1.5 text-xs text-stone-700">
                      {item.bestFor.map((bf) => (
                        <li key={bf} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          <span>{bf}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-stone-500">
                    <span className="font-medium">Govt. Hallmark:</span>
                    <span className="font-mono text-stone-800">{item.hallmark}</span>
                  </div>

                  <button
                    onClick={() => {
                      onSelectPurityFilter(item.code);
                      onNavigateToCollection();
                    }}
                    className="w-full py-2.5 px-3 bg-stone-900 text-stone-50 text-xs font-medium rounded-lg hover:bg-stone-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>Browse {item.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparative Metallurgy Matrix */}
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
          <div className="p-4 sm:p-5 bg-stone-50 border-b border-stone-200">
            <h4 className="font-serif text-lg font-semibold text-stone-900">
              Technical Fineness &amp; Buyback Comparison Matrix
            </h4>
            <p className="text-xs text-stone-500">
              All Asha Silver purchases are backed by 100% lifetime buyback on fine metal weight.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-700">
              <thead className="bg-stone-100/70 text-stone-800 uppercase font-semibold text-[11px] tracking-wider border-b border-stone-200">
                <tr>
                  <th className="py-3 px-4">Purity Grade</th>
                  <th className="py-3 px-4">Silver Content</th>
                  <th className="py-3 px-4">Hardness / Texture</th>
                  <th className="py-3 px-4">Mandatory Stamping</th>
                  <th className="py-3 px-4">Lifetime Buyback Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr className="hover:bg-stone-50/50">
                  <td className="py-3 px-4 font-semibold text-stone-900">999 Fine Silver</td>
                  <td className="py-3 px-4 tabular-nums">99.9%</td>
                  <td className="py-3 px-4">Lustrous &amp; Ductile</td>
                  <td className="py-3 px-4 font-mono">BIS Logo + 999</td>
                  <td className="py-3 px-4 text-emerald-800 font-medium">100% of live 999 rate with zero melting loss</td>
                </tr>
                <tr className="hover:bg-stone-50/50">
                  <td className="py-3 px-4 font-semibold text-stone-900">925 Sterling Silver</td>
                  <td className="py-3 px-4 tabular-nums">92.5%</td>
                  <td className="py-3 px-4">Resilient &amp; Wearable</td>
                  <td className="py-3 px-4 font-mono">BIS Logo + 925</td>
                  <td className="py-3 px-4 text-emerald-800 font-medium">100% value of 92.5% net silver content</td>
                </tr>
                <tr className="hover:bg-stone-50/50">
                  <td className="py-3 px-4 font-semibold text-stone-900">835 Silverware</td>
                  <td className="py-3 px-4 tabular-nums">83.5%</td>
                  <td className="py-3 px-4">Dent-Resistant &amp; Heavy</td>
                  <td className="py-3 px-4 font-mono">Assayed 835</td>
                  <td className="py-3 px-4 text-emerald-800 font-medium">100% value of 83.5% net silver content</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
