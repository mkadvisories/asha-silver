import React, { useState } from 'react';
import { X, Trash2, ShieldCheck, Sparkles, Truck, CheckCircle2, ArrowRight, ArrowLeft, Printer, Gift } from 'lucide-react';
import { CartItem, CustomerOrder } from '../types/cart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onOrderSuccess: (order: CustomerOrder) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'upi' as 'upi' | 'cod' | 'card',
  });
  const [confirmedOrder, setConfirmedOrder] = useState<CustomerOrder | null>(null);

  if (!isOpen) return null;

  const FREE_COIN_THRESHOLD = 15000;
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const qualifiesForFreeCoin = subtotal >= FREE_COIN_THRESHOLD;
  const remainingForFreeCoin = Math.max(0, FREE_COIN_THRESHOLD - subtotal);
  const shipping = 0; // Free insured shipping across India
  const total = subtotal;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderNumber = 'ASH-' + Math.floor(100000 + Math.random() * 900000);
    const order: CustomerOrder = {
      orderId: orderNumber,
      items: [...items],
      subtotal,
      discount: qualifiesForFreeCoin ? 1200 : 0,
      tax: Math.round(subtotal * 0.03),
      shipping: 0,
      total,
      customerName: formData.name,
      customerPhone: formData.phone,
      customerEmail: formData.email,
      deliveryAddress: formData.address,
      city: formData.city,
      pincode: formData.pincode,
      paymentMethod: formData.paymentMethod,
      paymentStatus: formData.paymentMethod === 'cod' ? 'pending_cod' : 'paid',
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      freeSilverCoinAwarded: qualifiesForFreeCoin,
    };

    setConfirmedOrder(order);
    setStep('confirmed');
    onOrderSuccess(order);
    onClearCart();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag & Checkout"
      className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-sm flex justify-end"
    >
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-[#FAF9F5]">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-semibold text-stone-900">
              {step === 'cart' && 'Your Shopping Bag'}
              {step === 'checkout' && 'Secure Checkout'}
              {step === 'confirmed' && 'Order Confirmed'}
            </span>
            {step === 'cart' && (
              <span className="text-xs text-stone-500">
                ({items.reduce((sum, item) => sum + item.quantity, 0)} items)
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-md transition-colors cursor-pointer"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auspicious Silver Coin Offer Meter (When in cart or checkout) */}
        {step !== 'confirmed' && items.length > 0 && (
          <div className="bg-amber-50/80 px-6 py-2.5 border-b border-amber-200/60 text-xs">
            {qualifiesForFreeCoin ? (
              <div className="flex items-center gap-2 text-amber-900 font-medium">
                <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  🎉 You unlocked a <strong>Free 5g Pure 999 Silver Coin</strong> for Akshay Tritiya!
                </span>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex justify-between text-stone-700">
                  <span>Add ₹{remainingForFreeCoin.toLocaleString('en-IN')} more for Free 5g Silver Coin</span>
                  <span className="font-medium text-amber-900 tabular-nums">
                    {Math.round((subtotal / FREE_COIN_THRESHOLD) * 100)}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-amber-200/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-700 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / FREE_COIN_THRESHOLD) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* STEP 1: CART ITEMS */}
          {step === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                    <Gift className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-medium text-stone-800">Your bag is empty</h3>
                    <p className="text-xs text-stone-500 max-w-xs">
                      Explore our handcrafted 925 sterling silver temple jewellery and Akshay Tritiya pooja idols.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="mt-2 px-5 py-2.5 bg-stone-900 text-stone-50 text-xs font-medium rounded-lg hover:bg-stone-800 cursor-pointer"
                  >
                    Start Exploring
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 pb-4 border-b border-stone-100 items-start"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 rounded-lg object-cover bg-stone-100 border border-stone-200 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-sm font-medium text-stone-900 line-clamp-2">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-stone-400 hover:text-red-700 p-1 cursor-pointer transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-xs text-stone-500">
                          {item.product.purity} · {item.product.weightGrams}g
                        </div>
                        {item.giftBoxRequested && (
                          <div className="text-[11px] text-amber-900 flex items-center gap-1 font-medium">
                            <span>🎁 Complimentary Velvet Gift Box</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center border border-stone-200 rounded-md bg-stone-50">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                              className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-200 cursor-pointer"
                            >
                              -
                            </button>
                            <span className="px-2 py-0.5 text-xs font-semibold tabular-nums text-stone-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-200 cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-medium text-sm text-stone-900 tabular-nums">
                            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Free Silver Coin Item Card if qualified */}
                  {qualifiesForFreeCoin && (
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 shrink-0 font-serif font-bold text-sm">
                        999
                      </div>
                      <div className="flex-1 text-xs">
                        <div className="font-semibold text-amber-950 flex items-center gap-1">
                          <span>Akshay Tritiya 5g Silver Bullion Coin</span>
                          <span className="text-[10px] bg-amber-200/80 text-amber-900 px-1.5 py-0.2 rounded font-sans">
                            FREE
                          </span>
                        </div>
                        <div className="text-amber-800 text-[11px]">
                          Consecrated pure silver token of perpetual prosperity · BIS Hallmarked
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-stone-400 line-through">₹550</span>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* STEP 2: CHECKOUT FORM */}
          {step === 'checkout' && (
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Recipient &amp; Delivery Information
                </h4>
                <div>
                  <label htmlFor="customer-name-input" className="block text-xs font-medium text-stone-700 mb-1">Full Name *</label>
                  <input
                    id="customer-name-input"
                    type="text"
                    required
                    placeholder="e.g. Ramesh Chandra Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="customer-phone-input" className="block text-xs font-medium text-stone-700 mb-1">Phone Number (SMS updates) *</label>
                    <input
                      id="customer-phone-input"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="customer-email-input" className="block text-xs font-medium text-stone-700 mb-1">Email (Certificate &amp; Invoice) *</label>
                    <input
                      id="customer-email-input"
                      type="email"
                      required
                      placeholder="ramesh@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="delivery-address-input" className="block text-xs font-medium text-stone-700 mb-1">Detailed Street Address / Landmark *</label>
                  <input
                    id="delivery-address-input"
                    type="text"
                    required
                    placeholder="House/Flat No., Apartment, Street, Landmark"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="city-input" className="block text-xs font-medium text-stone-700 mb-1">City *</label>
                    <input
                      id="city-input"
                      type="text"
                      required
                      placeholder="e.g. Mumbai / Jaipur / Delhi"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="pincode-input" className="block text-xs font-medium text-stone-700 mb-1">PIN Code *</label>
                    <input
                      id="pincode-input"
                      type="text"
                      required
                      placeholder="e.g. 400001"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-2 pt-2 border-t border-stone-200">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Select Payment Method
                </label>
                <div className="space-y-2">
                  <label
                    className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer text-xs ${
                      formData.paymentMethod === 'upi' ? 'border-stone-900 bg-stone-50' : 'border-stone-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        value="upi"
                        checked={formData.paymentMethod === 'upi'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                        className="accent-stone-900"
                      />
                      <span className="font-medium text-stone-900">UPI / QR (Instant Akshay Tritiya Blessing)</span>
                    </div>
                    <span className="text-[11px] text-emerald-700 font-medium">Zero Surcharge</span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer text-xs ${
                      formData.paymentMethod === 'card' ? 'border-stone-900 bg-stone-50' : 'border-stone-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                        className="accent-stone-900"
                      />
                      <span className="font-medium text-stone-900">Credit / Debit Card / Net Banking</span>
                    </div>
                    <span className="text-[11px] text-stone-500">128-bit Encrypted</span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer text-xs ${
                      formData.paymentMethod === 'cod' ? 'border-stone-900 bg-stone-50' : 'border-stone-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                        className="accent-stone-900"
                      />
                      <span className="font-medium text-stone-900">Cash on Delivery (COD)</span>
                    </div>
                    <span className="text-[11px] text-stone-500">Verified Doorstep</span>
                  </label>
                </div>
              </div>
            </form>
          )}

          {/* STEP 3: ORDER CONFIRMED */}
          {step === 'confirmed' && confirmedOrder && (
            <div className="space-y-6 py-4">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-stone-900">
                  Dhanyavaad! Order Confirmed
                </h3>
                <p className="text-xs text-stone-500">
                  May Goddess Mahalakshmi bless your family with boundless health, joy, and prosperity.
                </p>
              </div>

              {/* Order Receipt Card */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                  <span className="text-stone-500">Order Reference</span>
                  <span className="font-mono font-bold text-stone-900">{confirmedOrder.orderId}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                  <span className="text-stone-500">Placed On</span>
                  <span className="text-stone-800">{confirmedOrder.createdAt}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                  <span className="text-stone-500">Recipient</span>
                  <span className="text-stone-800 font-medium">{confirmedOrder.customerName}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                  <span className="text-stone-500">Delivery Address</span>
                  <span className="text-stone-800 text-right max-w-[200px] truncate">
                    {confirmedOrder.deliveryAddress}, {confirmedOrder.city} - {confirmedOrder.pincode}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                  <span className="text-stone-500">Payment Status</span>
                  <span className="text-emerald-700 font-medium">
                    {confirmedOrder.paymentMethod === 'cod' ? 'Cash on Delivery (Pending)' : 'Paid Online'}
                  </span>
                </div>
                {confirmedOrder.freeSilverCoinAwarded && (
                  <div className="flex justify-between items-center pb-2 border-b border-stone-200 text-amber-900">
                    <span className="font-medium">Akshay Tritiya Gift</span>
                    <span>Free 5g 999 Pure Silver Coin Included</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-1 text-sm font-semibold text-stone-900">
                  <span>Total Amount</span>
                  <span className="tabular-nums">₹{confirmedOrder.total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Trust & Next Steps */}
              <div className="space-y-2 text-xs text-stone-600 bg-white p-3 border border-stone-200 rounded-lg">
                <div className="font-medium text-stone-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-800" />
                  <span>Insured Transit &amp; Certificate of Authenticity</span>
                </div>
                <p>
                  Your silver jewellery has been packed under dual-camera CCTV supervision in a sealed security vault. The BIS Hallmark certificate card is placed inside the velvet box.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 border border-stone-300 rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-50 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={() => {
                    setStep('cart');
                    onClose();
                  }}
                  className="flex-1 py-2.5 bg-stone-900 text-stone-50 rounded-lg text-xs font-medium hover:bg-stone-800 cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions (When in Cart or Checkout) */}
        {step !== 'confirmed' && items.length > 0 && (
          <div className="p-6 border-t border-stone-200 bg-[#FAF9F5] space-y-4">
            {/* Bill summary */}
            <div className="space-y-2 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-medium text-stone-900 tabular-nums">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Insured Nationwide Delivery</span>
                <span className="font-medium text-emerald-800">FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Applicable GST (3%)</span>
                <span className="text-stone-500">Included in price</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-stone-900 pt-2 border-t border-stone-200">
                <span>Net Payable Amount</span>
                <span className="font-serif text-lg tabular-nums">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Stepper Buttons */}
            {step === 'cart' ? (
              <button
                onClick={() => setStep('checkout')}
                className="w-full py-3.5 bg-stone-900 text-stone-50 font-medium text-xs sm:text-sm rounded-lg hover:bg-stone-800 transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Delivery &amp; Payment</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="py-3 px-4 border border-stone-300 rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-50 flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Bag</span>
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  className="flex-1 py-3 bg-stone-900 text-stone-50 font-medium text-xs sm:text-sm rounded-lg hover:bg-stone-800 transition-colors shadow-sm cursor-pointer"
                >
                  Confirm &amp; Place Order
                </button>
              </div>
            )}

            <div className="flex items-center justify-center gap-3 text-[11px] text-stone-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-700" />
                <span>100% Purity Guarantee</span>
              </span>
              <span>·</span>
              <span>Legacy Since 1989</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
