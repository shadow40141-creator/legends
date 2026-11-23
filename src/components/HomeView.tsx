import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { ASSETS, HERO_CARDS, PATCH_NOTES } from '../data/mlbbData';
import { CardVariant, HeroCardProduct, PageRoute } from '../types';
import { MediaFrame } from './MediaFrame';

interface HomeViewProps {
  onNavigate: (route: PageRoute) => void;
  onSelectCard: (card: HeroCardProduct) => void;
  onAddToCart: (card: HeroCardProduct, variant?: CardVariant) => void;
  recentlyAddedId: string | null;
}

const COVER_SLIDES = [
  {
    id: 'minotaur',
    kicker: 'Minotaur · Nether Overseer (Epic Skin)',
    headline: 'Enter the Land of Dawn. Collect Every Legend.',
    subtitle:
      'Serialized 350gsm holographic foil collector cards featuring official Mobile Legends artwork, shipped worldwide in 35pt UV-protected slabs.',
    image: ASSETS.minotaurEpicCover,
    alt: 'Minotaur Nether Overseer Epic Skin official splash art',
  },
  {
    id: 'vexana',
    kicker: 'Vexana · Sanguine Rose (Collector Edition)',
    headline: 'Crimson Starlight Foil. Archival Craftsmanship.',
    subtitle:
      'Embossed collector editions finished with cold-stamped borders, velvet obsidian backing, and numbered authenticity plates.',
    image: ASSETS.vexanaEpic,
    alt: 'Vexana Sanguine Rose official splash art',
  },
  {
    id: 'yu-zhong',
    kicker: 'Yu Zhong · Black Dragon (Legend Edition)',
    headline: 'Built for Collectors. Graded to Last.',
    subtitle:
      'Choose Standard Mint archival sleeves, Magnetic UV Slabs, or sealed Numbered Gold Frames for display.',
    image: ASSETS.yuZhong,
    alt: 'Yu Zhong Black Dragon official splash art',
  },
  {
    id: 'granger',
    kicker: 'Granger · Exorcist (Collector Series)',
    headline: 'Wave IV Foil Cards Now Shipping.',
    subtitle:
      'Free tracked international delivery on orders over $60, with instant order confirmation and WhatsApp concierge support.',
    image: ASSETS.grangerExorcist,
    alt: 'Granger Exorcist official splash art',
  },
];

const AMBIENT_PARTICLES = [
  { left: '12%', top: '28%', delay: 0, duration: 5.2 },
  { left: '26%', top: '62%', delay: 0.9, duration: 6.1 },
  { left: '44%', top: '22%', delay: 1.4, duration: 5.6 },
  { left: '63%', top: '54%', delay: 0.4, duration: 6.4 },
  { left: '78%', top: '34%', delay: 1.8, duration: 5.0 },
  { left: '88%', top: '68%', delay: 1.1, duration: 5.9 },
];

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectCard,
  onAddToCart,
  recentlyAddedId,
}) => {
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % COVER_SLIDES.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  const currentSlide = COVER_SLIDES[slideIdx];
  const featuredCards = HERO_CARDS.slice(0, 3);
  const taurusCard = HERO_CARDS.find((c) => c.id === 'card-minotaur-taurus') || HERO_CARDS[0];
  const vexanaCard = HERO_CARDS.find((c) => c.id === 'card-vexana-sanguine') || HERO_CARDS[1];

  const handlePrevSlide = () => {
    setSlideIdx((prev) => (prev - 1 + COVER_SLIDES.length) % COVER_SLIDES.length);
  };

  const handleNextSlide = () => {
    setSlideIdx((prev) => (prev + 1) % COVER_SLIDES.length);
  };

  return (
    <div className="space-y-20 pb-20">
      {/* Section 1: Animated Main Menu Cover Banner */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="relative min-h-[540px] lg:min-h-[600px] flex items-end">
          <div className="absolute inset-0 overflow-hidden bg-[#090D16]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.05 }}
                  transition={{ duration: 6.5, ease: 'linear' }}
                  className="w-full h-full"
                >
                  <MediaFrame
                    src={currentSlide.image}
                    alt={currentSlide.alt}
                    className="w-full h-full"
                    imgClassName="w-full h-full object-cover object-top"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-[#090D16]/65 to-[#090D16]/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#090D16]/90 via-[#090D16]/50 to-transparent" />

            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
              {AMBIENT_PARTICLES.map((p, i) => (
                <motion.span
                  key={i}
                  style={{ left: p.left, top: p.top }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{
                    opacity: [0, 0.55, 0],
                    y: [-8, -36, -64],
                  }}
                  transition={{
                    duration: p.duration,
                    delay: p.delay,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute w-1.5 h-1.5 rounded-full bg-amber-400/70 blur-[0.5px]"
                />
              ))}
            </div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-2xl space-y-5"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-amber-400 tracking-wide">
                    <span>Land of Dawn</span>
                    <span aria-hidden="true">·</span>
                    <span>{currentSlide.kicker}</span>
                  </div>

                  <h1
                    className="font-display font-bold tracking-tight text-slate-50 leading-[1.08]"
                    style={{ fontSize: 'clamp(2.25rem, 4.2vw, 3.75rem)', textWrap: 'balance' }}
                  >
                    {currentSlide.headline}
                  </h1>

                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                    {currentSlide.subtitle}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onNavigate('shop')}
                      className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-lg bg-amber-500 hover:bg-amber-400 text-[#090D16] font-semibold text-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                    >
                      <span>Browse Card Shop</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onNavigate('contact')}
                      className="inline-flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-lg border border-white/15 bg-[#111827]/85 hover:bg-[#1A2438] text-slate-100 font-medium text-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                    >
                      <span>Contact Concierge</span>
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Cover Slide Controls */}
              <div className="flex items-center gap-3 self-start lg:self-end">
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  aria-label="Previous cover slide"
                  className="w-10 h-10 rounded-lg border border-white/15 bg-[#090D16]/75 hover:bg-[#111827] text-slate-200 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1.5">
                  {COVER_SLIDES.map((slide, idx) => {
                    const active = idx === slideIdx;
                    return (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => setSlideIdx(idx)}
                        aria-label={`Show ${slide.kicker}`}
                        className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                          active ? 'w-7 bg-amber-400' : 'w-2 bg-white/30 hover:bg-white/50'
                        }`}
                      />
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={handleNextSlide}
                  aria-label="Next cover slide"
                  className="w-10 h-10 rounded-lg border border-white/15 bg-[#090D16]/75 hover:bg-[#111827] text-slate-200 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Collector Card Shop Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-amber-400">Collector Card Shop</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight">
              Limited Foil Hero Cards
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Browse all cards</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCards.map((card) => {
            const isAdded = recentlyAddedId === card.id;
            return (
              <motion.div
                key={card.id}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.16 }}
                className="group rounded-xl border border-white/10 bg-[#111827] overflow-hidden flex flex-col justify-between hover:border-white/20 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => onSelectCard(card)}
                  className="text-left block w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  <div className="relative overflow-hidden bg-[#0D1320]" style={{ aspectRatio: '16 / 10' }}>
                    <MediaFrame
                      src={card.image}
                      alt={card.name}
                      title={card.name}
                      className="w-full h-full"
                      imgClassName="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-5 pb-3 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="text-amber-400 font-medium">{card.edition}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{card.serialCode}</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-slate-50 group-hover:text-amber-300 transition-colors">
                      {card.name}
                    </h3>
                    <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </button>

                <div className="px-5 pb-5 pt-2 flex items-center justify-between gap-3">
                  <span className="font-mono tabular-nums text-lg font-semibold text-slate-50">
                    ${card.price.toFixed(2)}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectCard(card)}
                      className="px-3 py-2 min-h-[40px] rounded-lg border border-white/10 text-xs font-medium text-slate-200 hover:bg-white/5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Details
                    </button>
                    <button
                      type="button"
                      onClick={() => onAddToCart(card, card.variants[0])}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-500 text-[#090D16]'
                          : 'bg-amber-500 hover:bg-amber-400 text-[#090D16]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Bag</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Section 3: Collector Drops & Featured Editions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 rounded-xl border border-white/10 bg-[#111827] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 pb-5 border-b border-white/10">
                <div>
                  <p className="text-xs font-medium text-amber-400">Latest Updates</p>
                  <h2 className="font-display text-2xl font-bold text-slate-50 mt-1">
                    Wave IV Drops & Store Perks
                  </h2>
                </div>
              </div>

              <div className="divide-y divide-white/10">
                {PATCH_NOTES.map((note) => (
                  <article key={note.id} className="py-5 first:pt-6 last:pb-2 space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      <span className="font-mono text-amber-400">{note.version}</span>
                      <span aria-hidden="true">·</span>
                      <span>{note.date}</span>
                      <span aria-hidden="true">·</span>
                      <span>{note.impactTag}</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-slate-100">
                      {note.index} {note.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {note.summary}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-xl border border-white/10 bg-[#111827] p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-blue-400">Signature Foil Editions</p>
                  <h2 className="font-display text-2xl font-bold text-slate-50 mt-1">
                    Minotaur & Vexana Slabs
                  </h2>
                </div>
                <span className="font-mono tabular-nums text-xs font-semibold text-amber-400 whitespace-nowrap">
                  35pt UV Case
                </span>
              </div>

              <p className="text-sm text-slate-400 leading-relaxed">
                Every serialized card is printed on 350gsm black-core stock with optional magnetic UV slabs and COA framing.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => onSelectCard(taurusCard)}
                  className="group text-left rounded-lg border border-white/10 bg-[#0D1320] overflow-hidden hover:border-amber-500/40 transition-colors cursor-pointer"
                >
                  <div className="relative" style={{ aspectRatio: '16 / 10' }}>
                    <MediaFrame
                      src={taurusCard.image}
                      alt={taurusCard.name}
                      className="w-full h-full"
                      imgClassName="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-200"
                    />
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs font-semibold text-slate-100 truncate">{taurusCard.name}</p>
                    <p className="text-[11px] font-mono tabular-nums text-amber-400">
                      ${taurusCard.price.toFixed(2)}
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectCard(vexanaCard)}
                  className="group text-left rounded-lg border border-white/10 bg-[#0D1320] overflow-hidden hover:border-amber-500/40 transition-colors cursor-pointer"
                >
                  <div className="relative" style={{ aspectRatio: '16 / 10' }}>
                    <MediaFrame
                      src={vexanaCard.image}
                      alt={vexanaCard.name}
                      className="w-full h-full"
                      imgClassName="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-200"
                    />
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs font-semibold text-slate-100 truncate">{vexanaCard.name}</p>
                    <p className="text-[11px] font-mono tabular-nums text-amber-400">
                      ${vexanaCard.price.toFixed(2)}
                    </p>
                  </div>
                </button>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-4">
              <span className="text-xs text-slate-400 truncate">
                Use code DAWN10 for 10% off
              </span>
              <button
                type="button"
                onClick={() => onNavigate('shop')}
                className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[40px] rounded-lg bg-[#1B2538] hover:bg-[#24314A] text-slate-100 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Open Card Shop</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
