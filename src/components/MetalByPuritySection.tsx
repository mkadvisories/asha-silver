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
      badge: 'Sacred Purity',
      description:
        'Unalloyed, pristine bullion-grade silver. Extremely lustrous and radiant, traditionally reserved for consecrated temple idols, Lakshmi-Ganesha puja sculptures, and wealth-preservation Dhanteras coins.',
      bestFor: ['Sacred Mandir Idols (Lakshmi-Ganesh)', 'Dhanteras 999 Auspicious Coins', 'Charan Padukas & Sinhasan Thrones', 'Bullion Rate Lock & Savings'],
      standard: 'Pure 999 Grade Fine Silver',
      color: 'border-amber-400 bg-amber-50/40',
      tagColor: 'bg-amber-100 text-amber-900',
    },
    {
      code: '925' as const,
      title: '925 Sterling Silver',
      subtitle: '92.5% Silver + 7.5% Reinforcing Alloy',
      rate: LIVE_SILVER_RATES.purity925,
      icon: Utensils,
      badge: 'Silver Utensils Benchmark',
      description:
        'The premier standard for durable fine silver utensils, puja deepams, and gift items. Balances bright silver sheen with structural resilience, ensuring everyday use without denting or distortion.',
      bestFor: ['Rajwada Dining Thalis & Bowls', 'Handcrafted Water Jugs & Tumblers', 'Mayur Pooja Diyas & Deepams', 'Silver Gift Keepsakes & Photo Frames'],
      standard: 'Standard 925 Pure Silver Grade',
      color: 'border-stone-300 bg-white',
      tagColor: 'bg-stone-100 text-stone-900',
    },
    {
      code: '835' as const,
      title: '835 / 800 Traditional Silverware',
      subtitle: '83.5% Heritage Tableware Formulation',
      rate: LIVE_SILVER_RATES.purity835,
      icon: Utensils,
      badge: 'Heavy Banquet Tableware',
      description:
        'Engineered specifically for heavy royal dining and traditional Indian feast utensils. The reinforced alloy structure ensures lifelong durability while conferring ancient Ayurvedic wellness benefits.',
      bestFor: ['Heavy Dining Thali Platters', 'Engraved Drinking Glasses & Katoris', 'Aarti Deepams & Incense Holders', 'Traditional Baby Feeding Spoons'],
      standard: 'Traditional 835 Utensil Silver',
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
              At Asha Silver, we strictly categorize our silver utensils, god items, and coins by metal purity so you always know the exact fineness of your purchase.
            </p>
          </div>

          <button
            onClick={() => {
              onSelectPurityFilter('all');
              onNavigateToCollection();
            }}
            className="text-xs font-semibold text-amber-950 hover:text-amber-800 underline underline-offset-4 self-start md:self-auto cursor-pointer"
          >
            View Entire Silver Catalog →
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
                    <span className="font-medium">Purity Benchmark:</span>
                    <span className="font-mono text-stone-800 font-semibold">{item.standard}</span>
                  </div>

                  <button
                    onClick={() => {
                      onSelectPurityFilter(item.code);
                      onNavigateToCollection();
                    }}
                    className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Filter {item.code} Grade Pieces</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
