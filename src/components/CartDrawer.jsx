import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, Tag, Check, CreditCard, Sparkles } from 'lucide-react';
import { useAuraDerma } from '../context/AuraDermaContext';

export default function CartDrawer() {
  const {
    cart,
    cartSubtotal,
    cartTotal,
    discount,
    couponCode,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    applyCoupon,
    clearCart
  } = useAuraDerma();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState({ type: '', message: '' });
  const [checkoutStep, setCheckoutStep] = useState(1); // 1 = cart, 2 = success
  const [placedOrderCode, setPlacedOrderCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponFeedback({ type: 'success', message: res.message });
    } else {
      setCouponFeedback({ type: 'error', message: res.message });
    }
  };

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulate luxury processing delay
    setTimeout(() => {
      setIsProcessing(false);
      const code = `AUR-ORDER-${Math.floor(100000 + Math.random() * 900000)}`;
      setPlacedOrderCode(code);
      setCheckoutStep(2);
    }, 1500);
  };

  const handleClose = () => {
    setIsCartOpen(false);
    // Reset checkout state if they close on success
    if (checkoutStep === 2) {
      clearCart();
      setCheckoutStep(1);
      setCouponInput('');
      setCouponFeedback({ type: '', message: '' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      
      {/* Backdrop overlay */}
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-brand-dark-950/60 backdrop-blur-sm transition-opacity"
      ></div>

      {/* Drawer Container Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        
        <div className="w-screen max-w-md bg-brand-cream-50 shadow-2xl border-l border-brand-cream-300/60 flex flex-col justify-between z-10 animate-slide-in-right">
          
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-5 border-b border-brand-cream-200/50">
            <div className="flex items-center space-x-2 text-brand-dark-900">
              <ShoppingBag size={18} className="text-brand-gold-500" />
              <span className="font-outfit text-xs font-bold tracking-widest uppercase">
                {checkoutStep === 2 ? 'Purchase Completed' : 'Your Shopping Bag'}
              </span>
            </div>
            <button
              onClick={handleClose}
              className="text-brand-cream-500 hover:text-brand-dark-900 transition-colors p-1"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6">
            
            {/* Step 1: Cart Items List */}
            {checkoutStep === 1 && (
              <>
                {cart.length === 0 ? (
                  // Empty State
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-brand-cream-100/50 text-brand-cream-400 flex items-center justify-center">
                      <ShoppingBag size={20} />
                    </div>
                    <div>
                      <p className="font-playfair text-base text-brand-dark-900 font-medium">Your bag is empty</p>
                      <p className="font-outfit text-xs text-brand-cream-500 mt-1 max-w-[200px]">
                        Add clinical formulations to begin your skin journey.
                      </p>
                    </div>
                    <button
                      onClick={handleClose}
                      className="px-6 py-2.5 bg-brand-dark-900 text-white font-outfit text-[11px] tracking-widest uppercase font-semibold hover:bg-brand-gold-500 transition-colors"
                    >
                      Browse Shop
                    </button>
                  </div>
                ) : (
                  // Cart item Cards
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center space-x-4 p-3 bg-white border border-brand-cream-300 rounded-xl"
                      >
                        <div className="w-16 h-20 bg-brand-cream-100 rounded-lg overflow-hidden shrink-0">
                          <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        
                        <div className="flex-1 space-y-1.5">
                          <div className="flex justify-between items-start">
                            <h4 className="font-playfair font-bold text-xs sm:text-sm text-brand-dark-900 line-clamp-1">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-brand-cream-400 hover:text-red-500 transition-colors p-0.5"
                              title="Delete Item"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>

                          <span className="font-outfit text-[10px] uppercase text-brand-gold-600 tracking-wider block">
                            {item.product.category}
                          </span>

                          <div className="flex items-center justify-between">
                            {/* Quantity buttons */}
                            <div className="flex items-center border border-brand-cream-200 rounded">
                              <button
                                onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                                className="p-1 text-brand-cream-500 hover:text-brand-dark-900"
                              >
                                <Minus size={11} />
                              </button>
                              <span className="px-2.5 font-outfit text-xs font-bold text-brand-dark-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                                className="p-1 text-brand-cream-500 hover:text-brand-dark-900"
                              >
                                <Plus size={11} />
                              </button>
                            </div>
                            
                            {/* Price */}
                            <span className="font-outfit font-bold text-xs text-brand-dark-900">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Step 2: Checkout Success Receipt */}
            {checkoutStep === 2 && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-5 animate-fade-in py-6">
                <div className="w-14 h-14 bg-brand-gold-50 text-brand-gold-500 rounded-full flex items-center justify-center shadow-inner border border-brand-gold-200/30">
                  <Check size={26} />
                </div>
                
                <div className="space-y-1.5">
                  <h3 className="font-playfair text-xl text-brand-dark-900 font-medium">Order Placed Successfully!</h3>
                  <p className="font-outfit text-xs text-brand-cream-500">
                    A clinical order confirmation receipt has been sent to your registered email address.
                  </p>
                </div>

                <div className="bg-white/80 p-5 rounded-2xl border border-brand-cream-300/50 w-full text-left space-y-3.5 shadow-sm">
                  <div className="flex justify-between border-b border-brand-cream-200 pb-2">
                    <span className="font-outfit text-[9px] uppercase tracking-widest text-brand-cream-500">Order ID</span>
                    <span className="font-outfit text-[11px] font-bold text-brand-dark-900 tracking-wider">
                      {placedOrderCode}
                    </span>
                  </div>
                  
                  <div className="space-y-1 font-outfit text-xs text-brand-cream-500">
                    <p className="flex justify-between">
                      <span>Status:</span>
                      <span className="text-brand-gold-500 font-bold uppercase tracking-wider text-[10px]">Processing</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Courier Delivery:</span>
                      <span className="text-brand-dark-900 font-medium">Express (2-3 Business Days)</span>
                    </p>
                    <p className="flex justify-between border-t border-brand-cream-200/50 pt-2 text-sm">
                      <span className="font-bold text-brand-dark-900">Total Paid:</span>
                      <span className="font-bold text-brand-dark-950">${cartTotal.toFixed(2)}</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="w-full py-3.5 bg-brand-dark-900 text-white font-outfit text-xs tracking-widest uppercase font-semibold rounded-sm hover:bg-brand-gold-500 transition-colors shadow-md"
                >
                  Continue Shopping
                </button>
              </div>
            )}

          </div>

          {/* Footer Area (Totals & Coupons) */}
          {checkoutStep === 1 && cart.length > 0 && (
            <div className="border-t border-brand-cream-300 bg-brand-cream-100/50 p-6 space-y-4 shrink-0">
              
              {/* Coupon input form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Coupon (e.g. GLOW15)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-sm border border-brand-cream-300 bg-white font-outfit text-xs text-brand-dark-900 focus:outline-none focus:border-brand-gold-500 transition-colors"
                  />
                  <Tag size={13} className="absolute left-3 top-3 text-brand-cream-500" />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 border border-brand-dark-900 hover:bg-brand-dark-900 hover:text-white transition-colors font-outfit text-[11px] uppercase tracking-wider font-semibold rounded-sm shrink-0"
                >
                  Apply
                </button>
              </form>

              {/* Coupon Feedback */}
              {couponFeedback.message && (
                <p className={`font-outfit text-[11px] ${
                  couponFeedback.type === 'success' ? 'text-green-600 font-semibold' : 'text-red-500'
                }`}>
                  {couponFeedback.message}
                </p>
              )}

              {/* Pricing breakdown */}
              <div className="space-y-1.5 border-t border-brand-cream-300/40 pt-3 font-outfit text-xs">
                
                <div className="flex justify-between text-brand-cream-500">
                  <span>Subtotal:</span>
                  <span className="font-bold text-brand-dark-900">${cartSubtotal.toFixed(2)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Discount ({(discount * 100)}%):</span>
                    <span>-${(cartSubtotal * discount).toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-brand-cream-500">
                  <span>Delivery Courier:</span>
                  <span className="text-brand-dark-900">Complimentary</span>
                </div>

                <div className="flex justify-between text-brand-dark-900 text-sm border-t border-brand-cream-300/50 pt-2.5">
                  <span className="font-semibold">Est. Total:</span>
                  <span className="font-bold text-base text-brand-dark-950">${cartTotal.toFixed(2)}</span>
                </div>

              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full flex items-center justify-center space-x-2 py-4 bg-brand-dark-900 hover:bg-brand-gold-500 text-white font-outfit text-xs tracking-widest uppercase font-semibold rounded-sm transition-all duration-300 shadow-md"
              >
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <CreditCard size={14} />
                    <span>Secure Checkout</span>
                  </>
                )}
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
