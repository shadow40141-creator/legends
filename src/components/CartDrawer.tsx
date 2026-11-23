import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, ExternalLink, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { CartItem, OrderReceipt } from '../types';
import { MediaFrame } from './MediaFrame';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, variantId: string, delta: number) => void;
  onRemoveItem: (productId: string, variantId: string) => void;
  onClearCart: () => void;
}

type DrawerStep = 'cart' | 'checkout' | 'receipt';

const FREE_SHIPPING_THRESHOLD = 60;
const SHIPPING_FEE = 6.5;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  open,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [step, setStep] = useState<DrawerStep>('cart');
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');

  // Checkout Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Card Payment' | 'Cash on Delivery' | 'Digital Wallet'>('Card Payment');
  const [formError, setFormError] = useState('');
  const [receipt, setReceipt] = useState<OrderReceipt | null>(null);

  if (!open) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + (item.product.price + item.variant.priceModifier) * item.quantity,
    0
  );
  const discount = appliedPromo === 'DAWN10' ? subtotal * 0.1 : 0;
  const discountedSubtotal = subtotal - discount;
  const shipping = items.length === 0 || discountedSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = discountedSubtotal + shipping;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - discountedSubtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (code === 'DAWN10') {
      setAppliedPromo('DAWN10');
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try DAWN10 for 10% off.');
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim() || !address.trim() || !city.trim() || !postalCode.trim()) {
      setFormError('Please fill in all required shipping and contact fields.');
      return;
    }
    if (!email.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }
    setFormError('');

    const orderNum = `DV-${Math.floor(1000 + Math.random() * 9000)}`;
    const generatedReceipt: OrderReceipt = {
      orderId: orderNum,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      customerName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: `${address.trim()}, ${city.trim()} ${postalCode.trim()}`,
      paymentMethod,
      items: [...items],
      subtotal,
      discount,
      shipping,
      total,
    };

    setReceipt(generatedReceipt);
    onClearCart();
    setStep('receipt');
  };

  const handleCloseDrawer = () => {
    if (step === 'receipt') {
      setStep('cart');
      setReceipt(null);
    }
    onClose();
  };

  const whatsappReceiptLink = receipt
    ? `https://wa.me/15550194820?text=${encodeURIComponent(
        `Hello Land of Dawn! Confirming my Order #${receipt.orderId} (${receipt.items.length} item types, Total $${receipt.total.toFixed(2)}) for ${receipt.customerName}.`
      )}`
    : '#';

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag and Checkout"
      onClick={handleCloseDrawer}
    >
      <div
        className="w-full max-w-lg h-full bg-[#0F1624] border-l border-white/15 shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {step === 'checkout' && (
              <button
                type="button"
                onClick={() => setStep('cart')}
                aria-label="Back to shopping bag"
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h2 className="font-display text-lg font-bold text-slate-50">
              {step === 'cart' && `Shopping Bag (${items.reduce((s, i) => s + i.quantity, 0)})`}
              {step === 'checkout' && 'Shipping & Payment'}
              {step === 'receipt' && 'Order Confirmed'}
            </h2>
          </div>

          <button
            type="button"
            onClick={handleCloseDrawer}
            aria-label="Close shopping bag"
            className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {step === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-12 h-12 rounded-xl border border-white/10 bg-[#111827] flex items-center justify-center mx-auto text-slate-400">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-display text-lg font-semibold text-slate-100">
                      Your bag is empty
                    </p>
                    <p className="text-sm text-slate-400">
                      Browse serialized Mythic Foil and Collector hero cards to add items.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCloseDrawer}
                    className="inline-flex items-center px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-[#090D16] text-xs font-semibold cursor-pointer"
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : (
                <>
                  {/* Free Shipping Progress */}
                  <div className="rounded-lg border border-white/10 bg-[#090D16] p-3.5 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300">
                        {remainingForFreeShipping === 0
                          ? 'Unlocked free tracked worldwide shipping'
                          : `Add $${remainingForFreeShipping.toFixed(2)} more for free shipping`}
                      </span>
                      <span className="font-mono tabular-nums text-amber-400">
                        ${FREE_SHIPPING_THRESHOLD}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full transition-all duration-200"
                        style={{
                          width: `${Math.min(100, (discountedSubtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Cart Items */}
                  <div className="divide-y divide-white/10">
                    {items.map((item) => {
                      const unit = item.product.price + item.variant.priceModifier;
                      return (
                        <div
                          key={`${item.product.id}-${item.variant.id}`}
                          className="py-4 flex gap-4"
                        >
                          <div className="w-20 h-24 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-[#090D16]">
                            <MediaFrame
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full"
                              imgClassName="w-full h-full object-cover object-top"
                            />
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <h3 className="text-sm font-semibold text-slate-100 truncate">
                                  {item.product.name}
                                </h3>
                                <p className="text-xs text-slate-400">
                                  {item.variant.label} · {item.product.edition}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => onRemoveItem(item.product.id, item.variant.id)}
                                aria-label={`Remove ${item.product.name}`}
                                className="text-slate-400 hover:text-rose-400 p-1 cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="flex items-center justify-between gap-2 pt-2">
                              <div className="inline-flex items-center rounded-lg border border-white/10 bg-[#090D16]">
                                <button
                                  type="button"
                                  aria-label="Decrease item quantity"
                                  onClick={() =>
                                    onUpdateQuantity(item.product.id, item.variant.id, -1)
                                  }
                                  className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="w-7 text-center font-mono tabular-nums text-xs font-semibold text-slate-100">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  aria-label="Increase item quantity"
                                  onClick={() =>
                                    onUpdateQuantity(item.product.id, item.variant.id, 1)
                                  }
                                  className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <span className="font-mono tabular-nums text-sm font-semibold text-slate-100">
                                ${(unit * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Promo Code */}
                  <form onSubmit={handleApplyPromo} className="space-y-1.5 pt-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Promo code (e.g. DAWN10)"
                        aria-label="Promo code"
                        className="flex-1 px-3.5 py-2 min-h-[40px] rounded-lg border border-white/10 bg-[#090D16] text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 min-h-[40px] rounded-lg border border-white/15 bg-[#161F33] hover:bg-[#1E2942] text-xs font-semibold text-slate-100 cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && <p className="text-xs text-rose-400">{promoError}</p>}
                    {appliedPromo && (
                      <p className="text-xs text-emerald-400">
                        Code {appliedPromo} applied — 10% collector discount active.
                      </p>
                    )}
                  </form>
                </>
              )}
            </>
          )}

          {step === 'checkout' && (
            <form id="checkout-form" onSubmit={handleSubmitOrder} className="space-y-4">
              {formError && (
                <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 p-3 text-xs text-rose-300">
                  {formError}
                </div>
              )}

              <div className="space-y-3">
                <p className="text-xs font-semibold text-amber-400">Customer & Delivery Details</p>
                <div>
                  <label htmlFor="chk-name" className="block text-xs text-slate-300 mb-1">
                    Full Name
                  </label>
                  <input
                    id="chk-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Alex Mercer"
                    className="w-full px-3.5 py-2.5 min-h-[42px] rounded-lg border border-white/10 bg-[#090D16] text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="chk-email" className="block text-xs text-slate-300 mb-1">
                      Email Address
                    </label>
                    <input
                      id="chk-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 min-h-[42px] rounded-lg border border-white/10 bg-[#090D16] text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="chk-phone" className="block text-xs text-slate-300 mb-1">
                      Phone / WhatsApp
                    </label>
                    <input
                      id="chk-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 555 019 4820"
                      className="w-full px-3.5 py-2.5 min-h-[42px] rounded-lg border border-white/10 bg-[#090D16] text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="chk-address" className="block text-xs text-slate-300 mb-1">
                    Street Address
                  </label>
                  <input
                    id="chk-address"
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="742 Citadel Avenue, Apt 4B"
                    className="w-full px-3.5 py-2.5 min-h-[42px] rounded-lg border border-white/10 bg-[#090D16] text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="chk-city" className="block text-xs text-slate-300 mb-1">
                      City
                    </label>
                    <input
                      id="chk-city"
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Singapore"
                      className="w-full px-3.5 py-2.5 min-h-[42px] rounded-lg border border-white/10 bg-[#090D16] text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="chk-zip" className="block text-xs text-slate-300 mb-1">
                      Postal Code
                    </label>
                    <input
                      id="chk-zip"
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="018956"
                      className="w-full px-3.5 py-2.5 min-h-[42px] rounded-lg border border-white/10 bg-[#090D16] text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/10">
                <p className="text-xs font-semibold text-amber-400">Payment Method</p>
                <div className="grid grid-cols-1 gap-2">
                  {(['Card Payment', 'Cash on Delivery', 'Digital Wallet'] as const).map((method) => {
                    const active = paymentMethod === method;
                    return (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPaymentMethod(method)}
                        className={`w-full text-left px-3.5 py-2.5 min-h-[42px] rounded-lg border text-xs font-medium flex items-center justify-between cursor-pointer ${
                          active
                            ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                            : 'border-white/10 bg-[#090D16] text-slate-300'
                        }`}
                      >
                        <span>{method}</span>
                        <span>{active ? 'Selected' : ''}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </form>
          )}

          {step === 'receipt' && receipt && (
            <div className="space-y-5 py-2">
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-sm font-semibold">
                    Order #{receipt.orderId} Confirmed — Preparing Shipment
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Thank you, {receipt.customerName}. A copy of your receipt has been prepared for {receipt.email}.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#090D16] p-4 space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Order Date</span>
                  <span className="text-slate-100">{receipt.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Payment</span>
                  <span className="text-slate-100">{receipt.paymentMethod}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-400 shrink-0">Ship To</span>
                  <span className="text-slate-100 text-right">{receipt.address}</span>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#090D16] p-4 space-y-3">
                <p className="text-xs font-semibold text-slate-200">Items Purchased</p>
                <div className="divide-y divide-white/10">
                  {receipt.items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.variant.id}`}
                      className="py-2 flex items-center justify-between gap-3 text-xs"
                    >
                      <span className="text-slate-300">
                        {item.quantity}× {item.product.name} ({item.variant.label})
                      </span>
                      <span className="font-mono tabular-nums text-slate-100">
                        ${((item.product.price + item.variant.priceModifier) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-sm font-semibold text-amber-400">
                  <span>Total Paid</span>
                  <span className="font-mono tabular-nums">${receipt.total.toFixed(2)}</span>
                </div>
              </div>

              <a
                href={whatsappReceiptLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#090D16] font-semibold text-sm transition-colors"
              >
                <span>Send Order Confirmation via WhatsApp</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>

        {/* Footer Summary */}
        {step !== 'receipt' && items.length > 0 && (
          <div className="px-6 py-5 border-t border-white/10 bg-[#090D16] space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-slate-200">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Promo ({appliedPromo})</span>
                  <span className="font-mono tabular-nums">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>Tracked Shipping</span>
                <span className="font-mono tabular-nums text-slate-200">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-slate-50 pt-2 border-t border-white/10">
                <span>Total</span>
                <span className="font-mono tabular-nums text-amber-400">${total.toFixed(2)}</span>
              </div>
            </div>

            {step === 'cart' ? (
              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="w-full py-3 min-h-[44px] rounded-lg bg-amber-500 hover:bg-amber-400 text-[#090D16] font-semibold text-sm transition-colors cursor-pointer"
              >
                Proceed to Checkout
              </button>
            ) : (
              <button
                type="submit"
                form="checkout-form"
                className="w-full py-3 min-h-[44px] rounded-lg bg-amber-500 hover:bg-amber-400 text-[#090D16] font-semibold text-sm transition-colors cursor-pointer"
              >
                Place Order — ${total.toFixed(2)}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
