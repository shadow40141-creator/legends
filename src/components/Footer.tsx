import React from 'react';
import { PageRoute } from '../types';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-white/10 bg-[#070A11] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2 max-w-sm">
            <span className="font-display text-lg font-bold text-slate-100">Land of Dawn</span>
            <p className="text-sm text-slate-400 leading-relaxed">
              Serialized MLBB collector hero cards crafted in archival foil and UV display slabs.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="hover:text-slate-100 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => onNavigate('shop')}
              className="hover:text-slate-100 transition-colors cursor-pointer"
            >
              Card Shop
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="hover:text-slate-100 transition-colors cursor-pointer"
            >
              Contact Us
            </button>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 Land of Dawn. Fan-crafted MLBB archive & collectible card storefront.</p>
          <p>Worldwide tracked shipping · Support via WhatsApp & Email</p>
        </div>
      </div>
    </footer>
  );
};
