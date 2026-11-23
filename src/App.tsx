/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { MotionConfig, motion } from 'motion/react';
import { CartDrawer } from './components/CartDrawer';
import { ContactView } from './components/ContactView';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { Navbar } from './components/Navbar';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ShopView } from './components/ShopView';
import { WhatsAppButton } from './components/WhatsAppButton';
import { CardVariant, CartItem, HeroCardProduct, PageRoute } from './types';

const CART_STORAGE_KEY = 'land_of_dawn_cart_v1';

export default function App() {
  const [activeRoute, setActiveRoute] = useState<PageRoute>('home');
  const [selectedCard, setSelectedCard] = useState<HeroCardProduct | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore storage errors
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore storage errors
    }
  }, [cartItems]);

  const handleNavigate = (route: PageRoute) => {
    setActiveRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (
    product: HeroCardProduct,
    variant: CardVariant = product.variants[0],
    quantity = 1
  ) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.variant.id === variant.id
      );
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Math.min(product.stock, updated[existingIndex].quantity + quantity),
        };
        return updated;
      }
      return [...prev, { product, variant, quantity }];
    });

    setRecentlyAddedId(product.id);
    window.setTimeout(() => {
      setRecentlyAddedId((curr) => (curr === product.id ? null : curr));
    }, 1400);
  };

  const handleUpdateQuantity = (productId: string, variantId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.variant.id === variantId) {
            const nextQty = item.quantity + delta;
            if (nextQty <= 0) return null;
            return { ...item, quantity: Math.min(item.product.stock, nextQty) };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (productId: string, variantId: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.variant.id === variantId))
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#090D16] text-slate-100">
        <Navbar
          activeRoute={activeRoute}
          onNavigate={handleNavigate}
          cartCount={totalCartCount}
          onOpenCart={() => setCartOpen(true)}
        />

        <main className="flex-1">
          <motion.div
            key={activeRoute}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeRoute === 'home' && (
              <HomeView
                onNavigate={handleNavigate}
                onSelectCard={setSelectedCard}
                onAddToCart={handleAddToCart}
                recentlyAddedId={recentlyAddedId}
              />
            )}
            {activeRoute === 'shop' && (
              <ShopView
                onSelectCard={setSelectedCard}
                onAddToCart={handleAddToCart}
                recentlyAddedId={recentlyAddedId}
              />
            )}
            {activeRoute === 'contact' && <ContactView />}
          </motion.div>
        </main>

        <Footer onNavigate={handleNavigate} />

        {/* Interactive Modals & Drawers */}
        <ProductDetailModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          onAddToCart={(card, variant, qty) => {
            handleAddToCart(card, variant, qty);
            setCartOpen(true);
          }}
        />

        <CartDrawer
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
        />

        {/* Floating Bottom-Right WhatsApp Integration on Every Page */}
        <WhatsAppButton />
      </div>
    </MotionConfig>
  );
}
