import React, { useState } from 'react';
import { ShieldCheck, Phone, MapPin, Mail, Award, Clock, Check, MessageCircle } from 'lucide-react';

interface FooterProps {
  onNavigateToSection: (sectionId: string) => void;
  onSelectCategory: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateToSection,
  onSelectCategory,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-[#18181B] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Tier: Brand Essence & Festive Concierge */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-stone-800">
          <div className="lg:col-span-4 space-y-4">
            <div className="space-y-1">
              <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-wider text-[#FAF9F5]">
                Asha Silver
              </span>
              <div className="text-xs text-amber-400 font-medium tracking-widest uppercase">
                Founded by Mahesh Agarwal in 1989
              </div>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Founded in 1989 by Shri Mahesh Agarwal, crafting certified 925 sterling silver jewelry, royal silverware, and sacred pooja tokens for over 37 years with steadfast dedication to authentic metallurgical purity and generational trust.
            </p>
            <div className="flex items-center gap-3 pt-1 text-xs text-stone-400">
              <span className="flex items-center gap-1 text-stone-300">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>BIS Govt. Hallmarked</span>
              </span>
              <span>·</span>
              <span>IBJA Registered</span>
            </div>
          </div>

          {/* Quick Collection Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-stone-100 uppercase tracking-wider">
              Festive Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('all');
                    onNavigateToSection('collection');
                  }}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Akshay Tritiya Auspicious Specials
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('pooja');
                    onNavigateToSection('collection');
                  }}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Consecrated Pooja Idols &amp; Diyas
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('jewellery');
                    onNavigateToSection('collection');
                  }}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Antique Temple Chokers &amp; Jhumkas
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('dining');
                    onNavigateToSection('collection');
                  }}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Rajwada Silver Dining Thali Sets
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('bullion');
                    onNavigateToSection('collection');
                  }}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  999 Fine Pure Silver Bullion Coins
                </button>
              </li>
            </ul>
          </div>

          {/* Trust Policies & Atelier Contacts */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold text-stone-100 uppercase tracking-wider">
              Assurance &amp; Care
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigateToSection('price-lock')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Suraksha Silver Rate Lock
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('metal-by-purity')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Metal by Purity (999 &amp; 925)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('about-us')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Mahesh Agarwal Heritage
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('rate-calculator')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Live Bullion Rate Engine
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('heritage')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Decode Your BIS Hallmark
                </button>
              </li>
            </ul>
          </div>

          {/* Showroom & VIP Concierge */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-stone-100 uppercase tracking-wider">
              Flagship Atelier
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Asha Silver Heritage Mansion, Johari Bazaar &amp; Bandra West, Mumbai 400050</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Mon – Sun: 10:30 AM to 8:30 PM IST</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>+91 (022) 2640-1989 / +91 98201 19890</span>
              </div>
              <div className="pt-2">
                <a
                  href="https://wa.me/919820119890?text=Namaste%20Asha%20Silver%2C%20I%20would%20like%20to%20inquire%20about%20Akshay%20Tritiya%20silverware"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-900/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-700/60 rounded-md text-xs font-medium transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp VIP Concierge</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter & Privilege Circle */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-6 px-6 bg-stone-900 rounded-xl border border-stone-800">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-sm font-serif text-white">Join the Asha Silver Heirloom Circle</h4>
            <p className="text-xs text-stone-400">
              Receive auspicious muhurat alerts, annual festival silver coins, and private preview access.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="text-xs px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-400 w-full sm:w-64"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-amber-200 text-stone-950 font-medium text-xs rounded-lg hover:bg-amber-100 transition-colors whitespace-nowrap cursor-pointer"
            >
              {subscribed ? 'Subscribed ✓' : 'Subscribe'}
            </button>
          </form>
        </div>

        {/* Bottom Bar: Copyright & Purity Seal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 pt-4">
          <div>
            © 1989–2026 Asha Silver Jewellers Private Limited. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>BIS Registration: CM/L-7892104</span>
            <span>·</span>
            <span>Hallmarking Assayer License: AHC-MUM-89</span>
            <span>·</span>
            <span>100% Insured Bullion Logistics</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
