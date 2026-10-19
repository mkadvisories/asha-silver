import React, { useState } from 'react';
import { Video, Calendar, Clock, Phone, Mail, User, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import { VideoCallBooking } from './ContactUsModal';

interface ContactUsSectionProps {
  onBookingSuccess?: (booking: VideoCallBooking) => void;
}

export const ContactUsSection: React.FC<ContactUsSectionProps> = ({ onBookingSuccess }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('11:00 AM - 01:00 PM (Morning Slot)');
  const [platform, setPlatform] = useState('WhatsApp Video Call');
  const [category, setCategory] = useState('Silver Utensils (Thali Sets, Glasses, Pitchers)');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<VideoCallBooking | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !date || !timeSlot) return;

    setIsSubmitting(true);
    const bookingId = 'AS-VID-' + Math.floor(100000 + Math.random() * 900000);
    const bookingData: VideoCallBooking = {
      id: bookingId,
      name,
      phone,
      email,
      date,
      timeSlot,
      platform,
      category,
      message,
      createdAt: new Date().toLocaleString(),
    };

    try {
      // 1. Server-side auto-mailer dispatch (/api/contact)
      const serverPromise = fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...bookingData,
          destination: 'mkadvisories@gmail.com',
          subject: `Video Call Booking Request: ${name} (${date} at ${timeSlot}) - Asha Silver`,
        }),
      }).catch((err) => {
        console.warn('[Contact Section] Server dispatch notice:', err);
      });

      // 2. Direct client-side auto-mailer fallback to FormSubmit gateway
      const directMailerPromise = fetch('https://formsubmit.co/ajax/mkadvisories@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          'Customer Name': name,
          'Mobile / WhatsApp': phone,
          'Customer Email': email,
          'Scheduled Date': date,
          'Preferred Time Slot': timeSlot,
          'Video Call Platform': platform,
          'Category of Interest': category,
          'Customer Message': message || 'Requested live video call consultation for silverware / idols.',
          'Booking Reference ID': bookingId,
          '_subject': `New Video Consultation Booking: ${name} (${date} at ${timeSlot})`,
          '_replyto': email,
          '_template': 'table',
          '_captcha': 'false',
        }),
      }).catch((err) => {
        console.warn('[Contact Section] Direct mailer gateway notice:', err);
      });

      // Await both dispatches
      await Promise.allSettled([serverPromise, directMailerPromise]);

      try {
        const history = JSON.parse(localStorage.getItem('asha_silver_video_calls') || '[]');
        history.unshift(bookingData);
        localStorage.setItem('asha_silver_video_calls', JSON.stringify(history));
      } catch (e) {
        console.error(e);
      }

      setSubmittedBooking(bookingData);
      if (onBookingSuccess) onBookingSuccess(bookingData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setSubmittedBooking(null);
  };

  return (
    <section id="contact-us" className="py-16 sm:py-24 bg-gradient-to-b from-[#FAF9F5] via-amber-50/20 to-[#FAF9F5] border-t border-stone-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Description & Perks */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-900">
              <Video className="w-4 h-4 text-amber-800" />
              <span>Personal Silver Concierge</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 leading-tight">
              Contact Us &amp; <br />
              <span className="italic font-medium text-amber-950">Schedule a Live Video Call</span>
            </h2>

            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              Experience the shine, weight, and detailed hand-engravings of our silver utensils, sacred Lakshmi-Ganesh idols, and Dhanteras gift items live from the comfort of your home.
            </p>

            <div className="space-y-4 pt-2 text-xs text-stone-600">
              <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-stone-200/90 shadow-sm">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-stone-900 text-sm">Real-time Gram &amp; Scale Verification</h4>
                  <p className="text-stone-500 mt-0.5">We place every chosen thali, tumbler, or idol on our precision balance live on camera.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-stone-200/90 shadow-sm">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-stone-900 text-sm">360° Nakshi &amp; Chasing Inspection</h4>
                  <p className="text-stone-500 mt-0.5">Inspect the fine peacock carvings, lotus chowkis, and polish finish under natural atelier lighting.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-stone-200/90 shadow-sm">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-stone-900 text-sm">Zero Obligation &amp; Direct Ateliers</h4>
                  <p className="text-stone-500 mt-0.5">Assistance directly with our silversmiths with doorstep insured delivery across India and abroad.</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-900 text-stone-300 rounded-xl space-y-2 border border-stone-800">
              <div className="text-amber-300 text-xs font-semibold uppercase tracking-wider">
                Direct Atelier Helpdesk
              </div>
              <div className="text-sm font-semibold text-white">
                Phone: +91 (022) 2640-1989 · WhatsApp: +91 98201 19890
              </div>
              <div className="text-xs text-stone-400">
                Asha Silver Ateliers · Mumbai · Delhi · Jaipur
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Booking Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-stone-200 shadow-xl p-6 sm:p-8">
              {submittedBooking ? (
                /* Success Screen - mkadvisories@gmail.com is strictly NOT displayed here */
                <div className="text-center py-8 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl sm:text-3xl text-stone-900">
                      Video Call Appointment Confirmed!
                    </h3>
                    <p className="text-stone-600 text-sm max-w-md mx-auto">
                      Thank you, <strong className="text-stone-900">{submittedBooking.name}</strong>. Our silver concierge will connect with you on {submittedBooking.platform} at your chosen appointment time.
                    </p>
                  </div>

                  <div className="bg-[#FAF9F5] border border-stone-200 rounded-xl p-5 text-left max-w-md mx-auto space-y-3 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                      <span className="text-stone-500 uppercase font-semibold text-[10px]">Reference Number</span>
                      <span className="font-mono font-bold text-amber-900">{submittedBooking.id}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500">Scheduled Date</span>
                      <span className="font-medium text-stone-900">{submittedBooking.date}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500">Scheduled Slot</span>
                      <span className="font-medium text-stone-900">{submittedBooking.timeSlot}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500">Contact Number</span>
                      <span className="font-medium text-stone-900">{submittedBooking.phone}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500">Category to View</span>
                      <span className="font-medium text-stone-900">{submittedBooking.category}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-center">
                    <button
                      onClick={handleReset}
                      className="px-6 py-2.5 bg-stone-900 text-stone-50 text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                    >
                      Book Another Consultation
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl text-stone-900">
                      Enter Details to Schedule Video Call
                    </h3>
                    <p className="text-xs text-stone-500">
                      Fill out your contact details and select your convenient slot for a private virtual viewing.
                    </p>
                  </div>

                  {/* Name, Phone, Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900"
                    />
                  </div>

                  {/* Date & Time Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Preferable Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Preferable Time Slot *
                      </label>
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 cursor-pointer"
                      >
                        <option value="10:00 AM - 12:00 PM (Morning Slot)">10:00 AM - 12:00 PM (Morning Slot)</option>
                        <option value="12:00 PM - 02:30 PM (Midday Slot)">12:00 PM - 02:30 PM (Midday Slot)</option>
                        <option value="02:30 PM - 05:00 PM (Afternoon Slot)">02:30 PM - 05:00 PM (Afternoon Slot)</option>
                        <option value="05:00 PM - 07:30 PM (Evening Slot)">05:00 PM - 07:30 PM (Evening Slot)</option>
                        <option value="07:30 PM - 09:00 PM (Night Slot)">07:30 PM - 09:00 PM (Night Slot)</option>
                      </select>
                    </div>
                  </div>

                  {/* Platform & Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Video Call Platform
                      </label>
                      <select
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 cursor-pointer"
                      >
                        <option value="WhatsApp Video Call">WhatsApp Video Call (Recommended)</option>
                        <option value="Google Meet">Google Meet</option>
                        <option value="Zoom Meeting">Zoom Meeting</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Items of Interest
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 cursor-pointer"
                      >
                        <option value="Silver Utensils (Thali Sets, Glasses, Pitchers)">Silver Utensils (Thali Sets, Glasses, Pitchers)</option>
                        <option value="Silver Items of God (Lakshmi-Ganesh Idols, Diyas)">Silver Items of God (Lakshmi-Ganesh Idols, Diyas)</option>
                        <option value="Silver Gift Items (999 Coins, Frames & Sets)">Silver Gift Items (999 Coins, Frames &amp; Sets)</option>
                        <option value="Silver Rate Lock / Advance Booking (200g+)">Silver Rate Lock / Bullion (200g+)</option>
                        <option value="Dhanteras Grand Festive Suite">Dhanteras Grand Festive Suite</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Notes or Specific Requirements (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Please show the 480g Rajwada thali set and pure silver Lakshmi idol..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs sm:text-sm font-semibold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Video className="w-4 h-4 text-amber-300" />
                    <span>{isSubmitting ? 'Scheduling Appointment...' : 'Submit & Schedule Video Call'}</span>
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>All inquiries handled with privacy · Personal appointment confirmation</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
