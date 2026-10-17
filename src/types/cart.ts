import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  giftBoxRequested?: boolean;
  giftNote?: string;
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
