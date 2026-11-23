import React, { useMemo, useState } from 'react';
import { Check, Search, ShoppingBag } from 'lucide-react';
import { HERO_CARDS } from '../data/mlbbData';
import { CardEdition, CardVariant, HeroCardProduct } from '../types';
import { MediaFrame } from './MediaFrame';

interface ShopViewProps {
  onSelectCard: (card: HeroCardProduct) => void;
  onAddToCart: (card: HeroCardProduct, variant?: CardVariant) => void;
  recentlyAddedId: string | null;
}

const EDITIONS: ('All' | CardEdition)[] = [
  'All',
  'Mythic Foil',
  'Collector',
  'Legend',
  'Epic',
];

export const ShopView: React.FC<ShopViewProps> = ({
  onSelectCard,
  onAddToCart,
  recentlyAddedId,
}) => {
  const [selectedEdition, setSelectedEdition] = useState<'All' | CardEdition>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCards = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = HERO_CARDS.filter((card) => {
      const matchesEdition = selectedEdition === 'All' || card.edition === selectedEdition;
      const matchesQuery =
        !q ||
        card.name.toLowerCase().includes(q) ||
        card.role.toLowerCase().includes(q) ||
        card.edition.toLowerCase().includes(q);
      return matchesEdition && matchesQuery;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [selectedEdition, sortBy, searchQuery]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div className="space-y-2 max-w-2xl">
          <p className="text-xs font-medium text-amber-400">Hero Card Shop</p>
          <h1
            className="font-display font-bold tracking-tight text-slate-50"
            style={{ fontSize: 'clamp(1.85rem, 3.2vw, 2.75rem)', textWrap: 'balance' }}
          >
            Serialized Collector Hero Cards
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Archival 350gsm foil cards crafted with cold-stamped borders and optional 35pt magnetic UV display slabs. Free tracked shipping over $60.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative w-full sm:w-64">
            <label htmlFor="card-search" className="sr-only">
              Search hero cards
            </label>
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="card-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hero cards..."
              className="w-full pl-10 pr-4 py-2.5 min-h-[42px] rounded-lg border border-white/10 bg-[#111827] text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <label htmlFor="card-sort" className="sr-only">
            Sort cards
          </label>
          <select
            id="card-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-3.5 py-2.5 min-h-[42px] rounded-lg border border-white/10 bg-[#111827] text-sm text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Edition Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          role="tablist"
          aria-label="Filter hero cards by edition"
          className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl border border-white/10 bg-[#111827]"
        >
          {EDITIONS.map((edition) => {
            const active = selectedEdition === edition;
            return (
              <button
                key={edition}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedEdition(edition)}
                className={`px-3.5 py-2 min-h-[36px] rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-amber-500 text-[#090D16]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {edition}
              </button>
            );
          })}
        </div>

        <span className="text-xs font-mono tabular-nums text-slate-400">
          Use code <span className="text-amber-400 font-semibold">DAWN10</span> for 10% off at checkout
        </span>
      </div>

      {/* Product Grid */}
      {filteredCards.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[#111827] p-12 text-center space-y-3">
          <p className="font-display text-lg font-semibold text-slate-100">
            No hero cards match your filter
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedEdition('All');
              setSearchQuery('');
            }}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-amber-500 text-[#090D16] text-xs font-semibold cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card) => {
            const isAdded = recentlyAddedId === card.id;
            return (
              <article
                key={card.id}
                className="group rounded-xl border border-white/10 bg-[#111827] overflow-hidden flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5 hover:border-white/20"
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
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <span className="text-amber-400 font-medium">{card.edition}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">{card.serialCode}</span>
                      </div>
                      <span>{card.stock <= 10 ? `${card.stock} left` : 'In Stock'}</span>
                    </div>
                    <h2 className="font-display text-lg font-semibold text-slate-50 group-hover:text-amber-300 transition-colors">
                      {card.name}
                    </h2>
                    <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </button>

                <div className="px-5 pb-5 pt-2 flex items-center justify-between gap-3">
                  <div>
                    <span className="font-mono tabular-nums text-lg font-semibold text-slate-50">
                      ${card.price.toFixed(2)}
                    </span>
                    <span className="block text-[11px] text-slate-400">
                      {card.variants[0].label}
                    </span>
                  </div>
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
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
