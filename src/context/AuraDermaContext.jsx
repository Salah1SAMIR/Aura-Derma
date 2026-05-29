import React, { createContext, useContext, useState, useEffect } from 'react';
import productsData from '../data/products.json';

const AuraDermaContext = createContext();

export const useAuraDerma = () => {
  const context = useContext(AuraDermaContext);
  if (!context) {
    throw new Error('useAuraDerma must be used within an AuraDermaProvider');
  }
  return context;
};

export const AuraDermaProvider = ({ children }) => {
  // Cart State
  const [cart, setCart] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0); // decimal e.g. 0.15 for 15%

  // Dialog States
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Booking State
  const [selectedBookingTreatment, setSelectedBookingTreatment] = useState(null);

  // Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({
    skinType: '',
    skinConcern: '',
    sensitivity: '',
    lifestyle: ''
  });
  const [quizRecommendations, setQuizRecommendations] = useState([]);

  // Calculate cart subtotal
  const cartSubtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const cartTotal = cartSubtotal * (1 - discount);

  // Cart operations
  const addToCart = (product, qty = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prevCart, { product, quantity: qty }];
    });
    // Visual cue - open cart drawer
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  const applyCoupon = (code) => {
    setCouponCode(code);
    if (code.toUpperCase() === 'GLOW15') {
      setDiscount(0.15);
      return { success: true, message: '15% discount applied successfully!' };
    } else if (code.toUpperCase() === 'DERMA30') {
      setDiscount(0.30);
      return { success: true, message: '30% professional discount applied!' };
    }
    setDiscount(0);
    return { success: false, message: 'Invalid or expired coupon code.' };
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setDiscount(0);
  };

  // Quiz Recommendation Logic
  const processQuizRecommendations = (answers) => {
    const { skinType, skinConcern } = answers;
    // Filter products based on skin type compatibility or target concern
    const recommendations = productsData.filter(prod => {
      const matchType = prod.skinTypes.includes(skinType) || skinType === 'all';
      const matchConcern = prod.concerns.includes(skinConcern);
      return matchType && matchConcern;
    });

    // Fallback if no exact match
    if (recommendations.length === 0) {
      setQuizRecommendations(productsData.slice(0, 3));
    } else {
      setQuizRecommendations(recommendations.slice(0, 3));
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers({
      skinType: '',
      skinConcern: '',
      sensitivity: '',
      lifestyle: ''
    });
    setQuizRecommendations([]);
  };

  const openBooking = (treatment = null) => {
    setSelectedBookingTreatment(treatment);
    setIsBookingOpen(true);
  };

  return (
    <AuraDermaContext.Provider
      value={{
        cart,
        cartSubtotal,
        cartTotal,
        discount,
        couponCode,
        isQuizOpen,
        isBookingOpen,
        selectedProduct,
        isCartOpen,
        selectedBookingTreatment,
        quizStep,
        quizAnswers,
        quizRecommendations,
        setIsQuizOpen,
        setIsBookingOpen,
        setSelectedProduct,
        setIsCartOpen,
        setSelectedBookingTreatment,
        setQuizStep,
        setQuizAnswers,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        applyCoupon,
        clearCart,
        processQuizRecommendations,
        resetQuiz,
        openBooking
      }}
    >
      {children}
    </AuraDermaContext.Provider>
  );
};
