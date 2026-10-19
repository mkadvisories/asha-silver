import React, { useState } from 'react';
import { X, Trash2, ShieldCheck, Sparkles, Truck, CheckCircle2, ArrowRight, ArrowLeft, Printer, Gift, Lock, Banknote, MailCheck } from 'lucide-react';
import { CartItem, CustomerOrder } from '../types/cart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onOrderSuccess: (order: CustomerOrder) => void;
  onBrowseMore: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderSuccess,
  onBrowseMore,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'cod' as const, // Only Cash on Delivery supported
  });
  const [confirmedOrder, setConfirmedOrder] = useState<CustomerOrder | null>(null);

  if (!isOpen) return null;

  const FREE_COIN_THRESHOLD = 15000;
  const subtotal = items.reduce((acc, item) => acc + (item.product.price || 0) * item.quantity, 0);
  const qualifiesForFreeCoin = subtotal >= FREE_COIN_THRESHOLD;
  const remainingForFreeCoin = Math.max(0, FREE_COIN_THRESHOLD - subtotal);
  const total = subtotal;

  const handleClose = () => {
    if (step === 'confirmed') {
      setStep('cart');
    }
    onClose();
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) return;

    setIsSubmitting(true);
    const orderNumber = 'ASH-' + Math.floor(100000 + Math.random() * 900000);
    const orderDate = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

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
      customerEmail: formData.email || 'customer@ashasilver.com',
      deliveryAddress: formData.address,
      city: formData.city || 'Mumbai',
      pincode: formData.pincode || '400001',
      paymentMethod: 'cod',
      paymentStatus: 'pending_cod',
      createdAt: orderDate,
      freeSilverCoinAwarded: qualifiesForFreeCoin,
    };

    // Prepare human-readable item summary
    const itemsFormattedText = items
      .map(
        (it, idx) =>
          `${idx + 1}. ${it.product.name} (Qty: ${it.quantity}, Purity: ${it.product.purity}, Weight: ${it.product.weightGrams}g) — ₹${((it.product.price || 0) * it.quantity).toLocaleString('en-IN')}`
      )
      .join('\n');

    // 1. Dispatch order automailer to mkadvisories@gmail.com via server endpoint
    try {
      fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...order,
          destination: 'mkadvisories@gmail.com',
        }),
      }).catch((err) => {
        console.warn('[Order Dispatch] Server API notice:', err);
      });
    } catch (e) {
      console.warn('[Order Dispatch] Local notice:', e);
    }

    // 2. Dispatch directly to FormSubmit auto-mailer gateway to guarantee delivery to mkadvisories@gmail.com
    try {
      fetch('https://formsubmit.co/ajax/mkadvisories@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          'Order ID': orderNumber,
          'Payment Option': 'Cash on Delivery (COD) - Verified Doorstep Payment',
          'Customer Name': formData.name,
          'Mobile / WhatsApp Number': formData.phone,
          'Customer Email ID': formData.email || 'Not provided',
          'Full Delivery Address': `${formData.address}, ${formData.city || ''} - ${formData.pincode || ''}`,
          'Items Ordered': itemsFormattedText,
          'Free 5g Silver Coin': qualifiesForFreeCoin ? 'Awarded (Festive Offer)' : 'None',
          'Order Subtotal': `₹${subtotal.toLocaleString('en-IN')}`,
          'Total Amount Payable (COD)': `₹${total.toLocaleString('en-IN')}`,
          'Order Confirmation Time': orderDate,
          '_subject': `New Order Confirmed: #${orderNumber} - ${formData.name} (₹${total.toLocaleString('en-IN')}) [Cash on Delivery]`,
          '_replyto': formData.email || '',
          '_template': 'table',
          '_captcha': 'false',
        }),
      }).catch((err) => {
        console.warn('[Order Dispatch] Gateway notice:', err);
      });
    } catch (e) {
      console.warn('[Order Dispatch] Gateway fetch notice:', e);
    }

    setIsSubmitting(false);
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
      className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-sm flex justify-end animate-fade-in"
    >
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-[#FAF9F5]">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-semibold text-stone-900">
              {step === 'cart' && 'Your Shopping Bag'}
              {step === 'checkout' && 'Secure Checkout · Cash on Delivery'}
              {step === 'confirmed' && 'Order Confirmed'}
            </span>
            {step === 'cart' && (
              <span className="text-xs text-stone-500 font-medium">
                ({items.reduce((sum, item) => sum + item.quantity, 0)} {items.length === 1 ? 'item' : 'items'})
              </span>
            )}
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-md transition-colors cursor-pointer"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auspicious Silver Coin Offer Meter (When in cart or checkout) */}
        {step !== 'confirmed' && items.length > 0 && (
          <div className="bg-amber-50/90 px-6 py-2.5 border-b border-amber-200/60 text-xs">
            {qualifiesForFreeCoin ? (
              <div className="flex items-center gap-2 text-amber-950 font-medium">
                <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  🎉 You unlocked a <strong>Complimentary 5g Pure 999 Silver Coin</strong>!
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
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / FREE_COIN_THRESHOLD) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* STEP 1: CART ITEMS LIST */}
          {step === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
                    <Truck className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-medium text-stone-900">Your Shopping Bag is Empty</h3>
                    <p className="text-xs text-stone-500 max-w-xs mx-auto">
                      Explore our handcrafted pure silver deities, auspicious Dhanteras coins, and rate lock options.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onBrowseMore();
                    }}
                    className="px-5 py-2.5 bg-stone-900 text-stone-50 rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors cursor-pointer"
                  >
                    Explore Silver Catalog
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 p-4 border border-stone-200 rounded-xl bg-white shadow-2xs transition-all hover:border-stone-300"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg border border-stone-200 bg-stone-50 shrink-0"
                      />
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif text-sm font-semibold text-stone-900 truncate">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-stone-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-stone-500">
                          <span className="font-medium text-amber-900">{item.product.purity}</span>
                          <span>·</span>
                          <span>{item.product.weightGrams}g Weight</span>
                        </div>

                        {item.isPriceLockItem && item.lockDetails && (
                          <div className="text-[10px] text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block font-mono">
                            Rate Lock: {item.lockDetails.lockedGrams}g @ ₹{item.lockDetails.lockedRatePerGram.toFixed(2)}/g
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2">
                          {/* Quantity control */}
                          <div className="flex items-center border border-stone-200 rounded-md bg-stone-50 overflow-hidden text-xs">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                              className="px-2 py-0.5 hover:bg-stone-200 cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="px-2.5 font-medium tabular-nums text-stone-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="px-2 py-0.5 hover:bg-stone-200 cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <div className="font-semibold text-stone-900 text-sm tabular-nums">
                            ₹{((item.product.price || 0) * item.quantity).toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Free Silver Coin Item Row */}
                  {qualifiesForFreeCoin && (
                    <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center text-amber-900 shrink-0 font-serif font-bold text-sm border border-amber-300">
                        999
                      </div>
                      <div className="flex-1 text-xs">
                        <div className="font-semibold text-amber-950 flex items-center gap-1.5">
                          <span>Auspicious 5g Pure 999 Bullion Coin</span>
                          <span className="text-[10px] bg-amber-200 text-amber-950 px-1.5 py-0.2 rounded font-sans font-bold">
                            FREE
                          </span>
                        </div>
                        <div className="text-amber-800 text-[11px] mt-0.5">
                          Consecrated pure silver token · 100% Genuine 999 Pure Silver
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
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-5">
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Delivery Address &amp; Patron Details
                </h4>

                <div>
                  <label htmlFor="checkout-name" className="block text-xs font-medium text-stone-700 mb-1">Full Name *</label>
                  <input
                    id="checkout-name"
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
                    <label htmlFor="checkout-phone" className="block text-xs font-medium text-stone-700 mb-1">Phone (SMS updates) *</label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="checkout-email" className="block text-xs font-medium text-stone-700 mb-1">Email (Order Updates &amp; Invoice)</label>
                    <input
                      id="checkout-email"
                      type="email"
                      placeholder="ramesh@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="checkout-address" className="block text-xs font-medium text-stone-700 mb-1">Street Address / Landmark *</label>
                  <input
                    id="checkout-address"
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
                    <label htmlFor="checkout-city" className="block text-xs font-medium text-stone-700 mb-1">City *</label>
                    <input
                      id="checkout-city"
                      type="text"
                      required
                      placeholder="e.g. Mumbai / Jaipur / Delhi"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="checkout-pincode" className="block text-xs font-medium text-stone-700 mb-1">PIN Code *</label>
                    <input
                      id="checkout-pincode"
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

              {/* Payment Method - EXCLUSIVELY CASH ON DELIVERY */}
              <div className="space-y-2 pt-2 border-t border-stone-200">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Payment Method
                </label>

                {/* Only Cash on Delivery */}
                <div className="p-4 border-2 border-stone-900 bg-stone-50 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                        <Banknote className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-stone-900 text-xs sm:text-sm flex items-center gap-2">
                          <span>Cash on Delivery (COD)</span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">
                            Only Payment Option
                          </span>
                        </div>
                        <div className="text-[11px] text-stone-500">
                          Pay directly upon doorstep delivery. No online advance payment required.
                        </div>
                      </div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                  </div>

                  <div className="text-[11px] text-stone-600 bg-white p-2.5 rounded-lg border border-stone-200 leading-relaxed">
                    ✓ Full payment is collected at your doorstep in cash or via courier delivery partner.<br />
                    ✓ Package is securely sealed and tamper-proof.<br />
                    ✓ Confirmation email with complete order breakdown will be sent automatically.
                  </div>
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
                  Thank you for placing your faith in Asha Silver. May peace and everlasting abundance grace your home.
                </p>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Order Received · Cash on Delivery</span>
                </div>
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
                  <span className="text-stone-500">Contact Number</span>
                  <span className="text-stone-800 font-mono">{confirmedOrder.customerPhone}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                  <span className="text-stone-500">Delivery Address</span>
                  <span className="text-stone-800 text-right max-w-[200px] truncate">
                    {confirmedOrder.deliveryAddress}, {confirmedOrder.city} - {confirmedOrder.pincode}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                  <span className="text-stone-500">Payment Option</span>
                  <span className="text-emerald-800 font-semibold flex items-center gap-1">
                    <Banknote className="w-3.5 h-3.5" />
                    <span>Cash on Delivery (Pay at Doorstep)</span>
                  </span>
                </div>
                {confirmedOrder.freeSilverCoinAwarded && (
                  <div className="flex justify-between items-center pb-2 border-b border-stone-200 text-amber-900">
                    <span className="font-medium">Festive Gift</span>
                    <span>Free 5g 999 Pure Silver Coin Included</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-1 text-sm font-semibold text-stone-900">
                  <span>Total Amount Payable</span>
                  <span className="tabular-nums">₹{confirmedOrder.total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Items in order */}
              <div className="space-y-2 text-xs">
                <div className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold">
                  Items Ordered:
                </div>
                <div className="space-y-1.5 bg-white p-3 rounded-lg border border-stone-200">
                  {confirmedOrder.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between items-center text-stone-700 text-[11px] pb-1 border-b border-stone-100 last:border-0 last:pb-0">
                      <div>
                        <span className="font-medium text-stone-900">{it.product.name}</span>
                        <span className="text-stone-500 ml-1">× {it.quantity}</span>
                        <span className="text-[10px] text-amber-900 block">{it.product.purity} · {it.product.weightGrams}g</span>
                      </div>
                      <span className="font-mono font-medium">₹{((it.product.price || 0) * it.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust & Next Steps */}
              <div className="space-y-2 text-xs text-stone-600 bg-white p-3 border border-stone-200 rounded-lg">
                <div className="font-medium text-stone-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-800" />
                  <span>Insured Transit &amp; Velvet Box Packaging</span>
                </div>
                <p>
                  Your silverware has been packaged in a sealed tamper-proof security box. All pieces are inspected and packaged in an authentic Asha Silver velvet presentation box.
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
                    handleClose();
                    onBrowseMore();
                  }}
                  className="flex-1 py-2.5 bg-stone-900 text-stone-50 rounded-lg text-xs font-medium hover:bg-stone-800 cursor-pointer"
                >
                  Continue Browsing
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
                <span>Payment Mode</span>
                <span className="font-medium text-stone-800">Cash on Delivery (COD)</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-stone-900 pt-2 border-t border-stone-200">
                <span>Total Payable on Delivery</span>
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
                <span>Proceed to Cash on Delivery Checkout</span>
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
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-stone-900 text-stone-50 font-medium text-xs sm:text-sm rounded-lg hover:bg-stone-800 transition-colors shadow-sm cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Banknote className="w-4 h-4 text-amber-300" />
                  <span>{isSubmitting ? 'Confirming Order...' : 'Confirm Cash on Delivery Order'}</span>
                </button>
              </div>
            )}

            <div className="flex items-center justify-center gap-3 text-[11px] text-stone-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-700" />
                <span>100% Purity Guarantee</span>
              </span>
              <span>·</span>
              <span>Founded by Mahesh Agarwal in 1989</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
