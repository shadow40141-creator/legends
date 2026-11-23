export type PageRoute = 'home' | 'shop' | 'contact';

export type HeroRole = 'Fighter' | 'Assassin' | 'Mage' | 'Marksman' | 'Tank' | 'Support';

export type CardEdition = 'Mythic Foil' | 'Collector' | 'Legend' | 'Epic';

export interface CardVariant {
  id: string;
  label: string;
  priceModifier: number;
  spec: string;
}

export interface HeroCardProduct {
  id: string;
  heroId: string;
  name: string;
  edition: CardEdition;
  serialCode: string;
  role: HeroRole;
  price: number;
  stock: number;
  image: string;
  description: string;
  dimensions: string;
  finish: string;
  powerRating: number;
  variants: CardVariant[];
}

export interface CartItem {
  product: HeroCardProduct;
  variant: CardVariant;
  quantity: number;
}

export interface PatchNote {
  id: string;
  index: string;
  version: string;
  date: string;
  title: string;
  summary: string;
  impactTag: string;
}

export interface OrderReceipt {
  orderId: string;
  date: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}
