import React, { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { PageRoute } from '../types';

interface NavbarProps {
  activeRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  cartCount: number;
  onOpenCart: () => void;
}

const NAV_LINKS: { id: PageRoute; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'shop', label: 'Card Shop' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeRoute,
  onNavigate,
  cartCount,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#090D16]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element Brand Wordmark */}
        <motion.button
          type="button"
          onClick={() => handleLinkClick('home')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15 }}
          className="font-display text-xl font-bold tracking-tight text-slate-50 hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded"
        >
          Land of Dawn
        </motion.button>

        {/* Zone 2: Clean single-line navigation links with animated active indicator */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((item) => {
            const isActive = activeRoute === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleLinkClick(item.id)}
                className={`relative py-2 text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded ${
                  isActive
                    ? 'text-amber-400'
                    : 'text-slate-300 hover:text-slate-50'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-underline"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    className="absolute left-0 right-0 bottom-0 h-0.5 bg-amber-400 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action + Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <motion.button
            type="button"
            onClick={onOpenCart}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] rounded-lg bg-amber-500 hover:bg-amber-400 text-[#090D16] text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            <ShoppingBag className="w-4 h-4 shrink-0" />
            <span>Bag</span>
            <motion.span
              key={cartCount}
              initial={{ scale: 0.85, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.18 }}
              className="tabular-nums font-mono text-xs px-1.5 py-0.5 rounded bg-[#090D16]/15 text-[#090D16] font-semibold"
            >
              {cartCount}
            </motion.span>
          </motion.button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-white/10 bg-[#111827] text-slate-200 hover:text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Animated Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-white/10 bg-[#0D1320] px-4 py-3 space-y-1"
          >
            {NAV_LINKS.map((item) => {
              const isActive = activeRoute === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleLinkClick(item.id)}
                  className={`w-full text-left px-3 min-h-[44px] rounded-lg text-sm font-medium transition-colors flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-400'
                      : 'text-slate-300 hover:bg-white/5 hover:text-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
