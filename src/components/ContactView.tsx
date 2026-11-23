import React, { useState } from 'react';
import { CheckCircle2, ExternalLink, Mail, MapPin, MessageCircle } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Hero Card Orders & Shipping');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please complete your name, email, and message before sending.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      <div className="space-y-2 max-w-2xl border-b border-white/10 pb-8">
        <p className="text-xs font-medium text-amber-400">Contact Us</p>
        <h1
          className="font-display font-bold tracking-tight text-slate-50"
          style={{ fontSize: 'clamp(1.85rem, 3.2vw, 2.75rem)', textWrap: 'balance' }}
        >
          Collector Support & Direct Inquiries
        </h1>
        <p className="text-sm sm:text-base text-slate-400">
          Questions about serialized foil hero cards, international shipping, UV slab grading, or tournament squad orders? Reach our team directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Form */}
        <div className="lg:col-span-7 rounded-xl border border-white/10 bg-[#111827] p-6 sm:p-8">
          {submitted ? (
            <div className="py-10 space-y-4">
              <div className="inline-flex items-center gap-2 text-emerald-400 font-semibold text-base">
                <CheckCircle2 className="w-5 h-5" />
                <span>Inquiry Received</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed max-w-md">
                Thanks, {name}. Your message regarding <span className="text-slate-100 font-medium">{topic}</span> has been logged. Our support team replies to <span className="text-slate-100">{email}</span> within one business day.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="px-4 py-2.5 min-h-[40px] rounded-lg border border-white/15 text-xs font-semibold text-slate-200 hover:bg-white/5 cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 p-3 text-xs text-rose-300">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-medium text-slate-300 mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jordan Reyes"
                    className="w-full px-3.5 py-2.5 min-h-[42px] rounded-lg border border-white/10 bg-[#090D16] text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-medium text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jordan@example.com"
                    className="w-full px-3.5 py-2.5 min-h-[42px] rounded-lg border border-white/10 bg-[#090D16] text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-topic" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Inquiry Topic
                </label>
                <select
                  id="contact-topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 min-h-[42px] rounded-lg border border-white/10 bg-[#090D16] text-sm text-slate-100 focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option>Hero Card Orders & Shipping</option>
                  <option>Slab Grading & Foil Availability</option>
                  <option>Esports Squad Bulk Orders</option>
                  <option>General Store Feedback</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-msg" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Message
                </label>
                <textarea
                  id="contact-msg"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your order number, hero card edition, or inquiry details..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-white/10 bg-[#090D16] text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 min-h-[44px] rounded-lg bg-amber-500 hover:bg-amber-400 text-[#090D16] font-semibold text-sm transition-colors cursor-pointer"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Right: Direct Channels */}
        <div className="lg:col-span-5 space-y-5">
          <div className="rounded-xl border border-white/10 bg-[#111827] p-6 space-y-4">
            <h2 className="font-display text-lg font-semibold text-slate-50">
              Instant WhatsApp Support
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Need fast stock verification on numbered Mythic Foil cards or live order tracking? Chat directly with our collector desk on WhatsApp.
            </p>
            <a
              href="https://wa.me/15550194820?text=Hi%20Land%20of%20Dawn!%20I%20have%20an%20inquiry%20about%20hero%20cards."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#090D16] font-semibold text-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#111827] p-6 space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-slate-100">Collector Desk Email</p>
                <p className="text-slate-400">support@landofdawn.gg</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-slate-100">Fulfillment Hub</p>
                <p className="text-slate-400">88 Anson Road, Suite 14-02, Singapore · Mon–Sat 09:00–19:00 SGT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
