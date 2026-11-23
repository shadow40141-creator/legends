import React, { useState } from 'react';
import { ExternalLink, MessageCircle, X } from 'lucide-react';

const WHATSAPP_NUMBER = '15550194820';

const QUICK_TOPICS = [
  'Hi Land of Dawn! I would like to inquire about Hero Card stock and shipping.',
  'Hello! Can you help me with my Hero Card order or custom grading?',
  'Hi! Which foil Hero Cards are currently available in Mythic edition?',
];

export const WhatsAppButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(QUICK_TOPICS[0]);

  const encodedMessage = encodeURIComponent(message.trim() || QUICK_TOPICS[0]);
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {open && (
        <div
          role="dialog"
          aria-label="WhatsApp direct support"
          className="w-80 sm:w-96 rounded-xl border border-white/15 bg-[#111827] shadow-2xl p-4 space-y-3"
        >
          <div className="flex items-center justify-between gap-3 pb-2 border-b border-white/10">
            <div>
              <p className="text-sm font-semibold text-slate-50">WhatsApp Concierge</p>
              <p className="text-xs text-slate-400">Orders, card stock & build inquiries</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close WhatsApp chat widget"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-100 hover:bg-white/5 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs font-medium text-slate-300">Quick message</p>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: 'Card Stock', text: QUICK_TOPICS[0] },
                { label: 'Order Support', text: QUICK_TOPICS[1] },
                { label: 'Mythic Foil', text: QUICK_TOPICS[2] },
              ].map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setMessage(preset.text)}
                  className="px-2.5 py-1.5 rounded-md border border-white/10 bg-[#0D1320] hover:border-emerald-500/40 text-xs text-slate-200 transition-colors cursor-pointer"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-label="WhatsApp message"
            className="w-full rounded-lg border border-white/10 bg-[#090D16] px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#090D16] font-semibold text-sm transition-colors"
          >
            <span>Start WhatsApp Chat</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? 'Close WhatsApp support' : 'Chat with us on WhatsApp'}
        className="inline-flex items-center gap-2.5 px-4 min-h-[48px] rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#090D16] font-semibold text-sm shadow-lg shadow-black/40 transition-transform duration-150 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
      >
        <MessageCircle className="w-5 h-5 shrink-0" />
        <span className="hidden sm:inline whitespace-nowrap">WhatsApp</span>
      </button>
    </div>
  );
};
