import React, { useState } from 'react';
import { ShieldCheck, Phone, MapPin, Mail, Award, Clock, Check, MessageCircle, Video } from 'lucide-react';

interface FooterProps {
  onNavigateToSection: (sectionId: string) => void;
  onSelectCategory: (category: string) => void;
  onOpenContact?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateToSection,
  onSelectCategory,
  onOpenContact,
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
                A legacy of trust since 1989 · Started by Mahesh Agarwal
              </div>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Started in 1989 by Shri Mahesh Agarwal, crafting genuine silver utensils, sacred silver items of god, and auspicious silver gift items through decades of hard work and uncompromised quality.
            </p>
            <div className="flex items-center gap-3 pt-1 text-xs text-stone-400">
              <span className="flex items-center gap-1 text-stone-300">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>100% Tested Pure Silver</span>
              </span>
              <span>·</span>
              <span>Generational Silversmiths</span>
            </div>
          </div>

          {/* Quick Collection Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-stone-100 uppercase tracking-wider">
              Silver Specialties
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
                  Dhanteras Auspicious Silverware &amp; Utensils
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('utensils');
                    onNavigateToSection('collection');
                  }}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Silver Utensils (Thali Sets, Glasses, Pitchers)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('god-items');
                    onNavigateToSection('collection');
                  }}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Silver Items of God (Lakshmi-Ganesh Idols, Diyas)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('gifts');
                    onNavigateToSection('collection');
                  }}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Silver Gift Items (999 Coins, Frames &amp; Keepsakes)
                </button>
              </li>
            </ul>
          </div>

          {/* Trust Policies & Video Call Assistance */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold text-stone-100 uppercase tracking-wider">
              Assistance &amp; About
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={onOpenContact}
                  className="text-amber-300 hover:text-amber-200 transition-colors cursor-pointer text-left font-medium flex items-center gap-1.5"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Contact Us (Schedule Video Call)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('about-us')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  About Us (Mahesh Agarwal Legacy)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('price-lock')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Lock Silver Price (e.g. 200g)
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
                  onClick={() => onNavigateToSection('rate-calculator')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Live Silver Rate Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Showroom & VIP Concierge */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-stone-100 uppercase tracking-wider">
              Flagship Atelier &amp; Video Call
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Asha Silver Flagship Atelier · Silversmith Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Mon – Sun: 10:30 AM to 8:30 PM IST</span>
              </div>
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={onOpenContact}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-md text-xs font-medium transition-colors cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Book Live Video Shopping Call</span>
                </button>
                <button
                  onClick={onOpenContact}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-md text-xs font-medium transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Request Atelier Concierge</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter & Privilege Circle */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-6 px-6 bg-stone-900 rounded-xl border border-stone-800">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-sm font-serif text-white">Join the Asha Silver Heirloom Circle</h4>
            <p className="text-xs text-stone-400">
              Receive auspicious Dhanteras muhurat updates, new silver utensil arrivals, and private festive previews.
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

        {/* Bottom Bar: Clean Copyright - Appendix 1 Removed */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 pt-4">
          <div>
            © 1989–2026 Asha Silver Jewellers. All rights reserved.
          </div>
          <div className="text-[11px] text-stone-400">
            A legacy of trust since 1989 · Built on hard work &amp; quality products
          </div>
        </div>
      </div>
    </footer>
  );
};
