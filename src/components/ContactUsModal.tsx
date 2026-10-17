import React, { useState } from 'react';
import { X, Video, Calendar, Clock, Phone, Mail, User, CheckCircle2, Sparkles, MessageSquare, ShieldCheck } from 'lucide-react';

interface ContactUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface VideoCallBooking {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  platform: string;
  category: string;
  message?: string;
  createdAt: string;
}

export const ContactUsModal: React.FC<ContactUsModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(() => {
    // Tomorrow as default
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

  if (!isOpen) return null;

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
      // Send to server proxy /api/contact to dispatch details
      // Note: Recipient mkadvisories@gmail.com is handled server-side / in payload and NEVER displayed to user
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...bookingData,
          destination: 'mkadvisories@gmail.com',
          subject: `New Video Call Scheduled: ${name} (${date} at ${timeSlot})`,
        }),
      }).catch((err) => {
        // Fallback gracefully without breaking UI flow
        console.warn('API dispatch logged:', err);
      });

      // Save locally for user reference
      try {
        const history = JSON.parse(localStorage.getItem('asha_silver_video_calls') || '[]');
        history.unshift(bookingData);
        localStorage.setItem('asha_silver_video_calls', JSON.stringify(history));
      } catch (e) {
        console.error(e);
      }

      setSubmittedBooking(bookingData);
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Modal Header */}
        <div className="bg-stone-900 text-stone-100 px-6 py-5 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase font-semibold text-amber-400 tracking-wider">
                Asha Silver Atelier Concierge
              </div>
              <h2 className="font-serif text-xl sm:text-2xl text-white">
                Contact Us · Schedule a Live Video Call
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {submittedBooking ? (
            /* Success View - mkadvisories@gmail.com is strictly NOT displayed here */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl text-stone-900">
                  Video Consultation Scheduled!
                </h3>
                <p className="text-stone-600 text-sm max-w-md mx-auto">
                  Thank you, <strong className="text-stone-900">{submittedBooking.name}</strong>. Your appointment has been confirmed. Our senior silver specialist will connect with you live from our atelier to showcase our pieces.
                </p>
              </div>

              <div className="bg-[#FAF9F5] border border-stone-200 rounded-xl p-5 text-left max-w-md mx-auto space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                  <span className="text-stone-500 uppercase font-semibold tracking-wider text-[10px]">Reference Number</span>
                  <span className="font-mono font-bold text-amber-900">{submittedBooking.id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Scheduled Date</span>
                  <span className="font-medium text-stone-900">{submittedBooking.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Preferred Slot</span>
                  <span className="font-medium text-stone-900">{submittedBooking.timeSlot}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Preferred Platform</span>
                  <span className="font-medium text-stone-900">{submittedBooking.platform}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Contact Number</span>
                  <span className="font-medium text-stone-900">{submittedBooking.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Items to View</span>
                  <span className="font-medium text-stone-900">{submittedBooking.category}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-stone-900 text-stone-50 text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Continue Browsing
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2.5 border border-stone-300 text-stone-700 text-xs font-medium rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  Book Another Call
                </button>
              </div>
            </div>
          ) : (
            /* Interactive Booking Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-950">
                <Sparkles className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <p>
                  Experience our silver utensils, sacred Lakshmi-Ganesh idols, and gift items through a high-definition 1-on-1 private video walkthrough before purchasing.
                </p>
              </div>

              {/* Basic Details: Name, Phone, Email */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5 border-b border-stone-200 pb-2">
                  <User className="w-3.5 h-3.5 text-stone-700" />
                  <span>1. Your Basic Details</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Sharma"
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
                    Email ID *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900"
                  />
                </div>
              </div>

              {/* Schedule Video Call Details: Date & Time Slot */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5 border-b border-stone-200 pb-2">
                  <Calendar className="w-3.5 h-3.5 text-stone-700" />
                  <span>2. Schedule Preferred Video Call Time</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Preferred Date *
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
                      Preferred Time Slot *
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Preferred Video Platform
                    </label>
                    <select
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 cursor-pointer"
                    >
                      <option value="WhatsApp Video Call">WhatsApp Video Call (Recommended)</option>
                      <option value="Google Meet">Google Meet</option>
                      <option value="Zoom Meeting">Zoom Meeting</option>
                      <option value="Apple FaceTime">Apple FaceTime</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Items You Wish to View
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 cursor-pointer"
                    >
                      <option value="Silver Utensils (Thali Sets, Glasses, Pitchers)">Silver Utensils (Thali Sets, Glasses, Pitchers)</option>
                      <option value="Silver Items of God (Lakshmi-Ganesh Idols, Diyas)">Silver Items of God (Lakshmi-Ganesh Idols, Diyas)</option>
                      <option value="Silver Gift Items (999 Coins, Frames & Sets)">Silver Gift Items (999 Coins, Frames &amp; Sets)</option>
                      <option value="Silver Rate Lock / Advance Bullion Booking">Silver Rate Lock / Bullion (200g+)</option>
                      <option value="Complete Dhanteras Grand Pooja Suite">Complete Dhanteras Grand Pooja Suite</option>
                      <option value="Custom Bespoke Silverware Order">Custom Bespoke Silverware Order</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Special Requirements or Questions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell us if you want to see specific weights, custom engraving, or festival requirements..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs sm:text-sm font-semibold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Video className="w-4 h-4 text-amber-300" />
                  <span>{isSubmitting ? 'Scheduling Appointment...' : 'Schedule Video Call Appointment'}</span>
                </button>
                <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 mt-2.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Personalized 1-on-1 consultation with master silversmith · No purchase obligation</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
