import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  giftBoxRequested?: boolean;
  giftNote?: string;
  isPriceLockItem?: boolean;
  lockDetails?: {
    certificateId: string;
    lockedGrams: number;
    lockedRatePerGram: number;
    purity: '925' | '999';
    validityDays: number;
  };
}

export interface CustomerOrder {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryAddress: string;
  city: string;
  pincode: string;
  paymentMethod: 'cod' | 'upi' | 'card';
  paymentStatus: 'paid' | 'pending_cod';
  createdAt: string;
  freeSilverCoinAwarded: boolean;
}

export interface SilverPriceLock {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  purity: '925' | '999';
  ratePerGram: number;
  grams: number;
  totalAmount: number;
  advanceAmountPaid: number;
  lockDurationDays: number;
  expiryDate: string;
  bookingDate: string;
  status: 'active' | 'redeemed';
  certificateNumber: string;
}
