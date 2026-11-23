import React, { useEffect, useState } from 'react';
import { ExternalLink, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { CardVariant, HeroCardProduct } from '../types';
import { MediaFrame } from './MediaFrame';

interface ProductDetailModalProps {
  card: HeroCardProduct | null;
  onClose: () => void;
  onAddToCart: (card: HeroCardProduct, variant: CardVariant, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  card,
  onClose,
  onAddToCart,
}) => {
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (card) {
      setSelectedVariantId(card.variants[0]?.id || '');
      setQuantity(1);
    }
  }, [card]);

  if (!card) return null;

  const activeVariant =
    card.variants.find((v) => v.id === selectedVariantId) || card.variants[0];
  const unitPrice = card.price + activeVariant.priceModifier;
  const lineTotal = unitPrice * quantity;
  const whatsappUrl = `https://wa.me/15550194820?text=${encodeURIComponent(
    `Hi Land of Dawn! I want to inquire about "${card.name}" (${activeVariant.label}, Qty ${quantity}).`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${card.name} details`}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/15 bg-[#0F1624] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-lg border border-white/10 bg-[#090D16]/85 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
          {/* Left Sticky Artwork */}
          <div className="md:col-span-5 bg-[#090D16] flex items-center justify-center p-4 sm:p-6">
            <div className="w-full rounded-xl overflow-hidden border border-white/10" style={{ aspectRatio: '16 / 10' }}>
              <MediaFrame
                src={card.image}
                alt={card.name}
                title={card.name}
                className="w-full h-full"
                imgClassName="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Right Purchase Module */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-amber-400 font-medium pr-8">
                <span>{card.edition}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums text-slate-300">{card.serialCode}</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-400">{card.role}</span>
              </div>

              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-50">
                  {card.name}
                </h2>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="font-mono tabular-nums text-2xl font-bold text-amber-400">
                    ${unitPrice.toFixed(2)}
                  </span>
                  <span className="text-xs text-emerald-400 font-medium">
                    In Stock ({card.stock} units available)
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">{card.description}</p>

              {/* Card Specifications */}
              <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/10 text-xs">
                <div>
                  <span className="text-slate-400 block">Dimensions</span>
                  <span className="text-slate-100 font-medium">{card.dimensions}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Print Finish</span>
                  <span className="text-slate-100 font-medium">{card.finish}</span>
                </div>
              </div>

              {/* Variant Selector */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-200">Select Protection & Case</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {card.variants.map((variant) => {
                    const selected = variant.id === activeVariant.id;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariantId(variant.id)}
                        className={`text-left p-3 rounded-lg border transition-colors cursor-pointer ${
                          selected
                            ? 'border-amber-500 bg-amber-500/10'
                            : 'border-white/10 bg-[#090D16]/60 hover:border-white/25'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 text-xs font-semibold">
                          <span className={selected ? 'text-amber-300' : 'text-slate-100'}>
                            {variant.label}
                          </span>
                          <span className="font-mono tabular-nums text-slate-300">
                            {variant.priceModifier > 0 ? `+$${variant.priceModifier}` : 'Included'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">{variant.spec}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quantity & Primary Purchase CTA */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center rounded-lg border border-white/10 bg-[#090D16]">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-11 h-11 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-mono tabular-nums text-sm font-semibold text-slate-100">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((q) => Math.min(card.stock, q + 1))}
                    className="w-11 h-11 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(card, activeVariant, quantity);
                    onClose();
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-lg bg-amber-500 hover:bg-amber-400 text-[#090D16] font-semibold text-sm transition-colors whitespace-nowrap cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag — ${lineTotal.toFixed(2)}</span>
                </button>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[40px] rounded-lg border border-white/10 text-xs font-medium text-slate-300 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors"
              >
                <span>Inquire about this card on WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
