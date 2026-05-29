import React, { useState } from 'react';
import { X, Star, ShoppingBag, Plus, Minus, CheckCircle, ShieldCheck } from 'lucide-react';
import { useAuraDerma } from '../context/AuraDermaContext';

export default function ProductDetailModal() {
  const { selectedProduct, setSelectedProduct, addToCart } = useAuraDerma();
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAdd = () => {
    addToCart(selectedProduct, quantity);
    setSelectedProduct(null); // Close modal
    setQuantity(1); // Reset qty
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      
      {/* Backdrop */}
      <div
        onClick={() => setSelectedProduct(null)}
        className="fixed inset-0 bg-brand-dark-950/60 backdrop-blur-sm transition-opacity"
      ></div>

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-brand-cream-50 rounded-2xl shadow-2xl border border-brand-cream-300/60 overflow-hidden z-10 animate-scale-up">
        
        {/* Close Button absolute */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute right-4 top-4 z-20 bg-white/80 hover:bg-white text-brand-dark-900 border border-brand-cream-200 p-2 rounded-full transition-colors"
          aria-label="Close Modal"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Image Frame */}
          <div className="md:col-span-5 bg-brand-cream-100 relative min-h-[300px] md:min-h-full">
            <img
              src={selectedProduct.imageUrl}
              alt={selectedProduct.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Column: Scrollable Content */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            
            {/* Core Info */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-outfit text-xs font-semibold tracking-widest uppercase text-brand-gold-500 bg-brand-gold-50 px-3 py-1 rounded-full">
                  {selectedProduct.category}
                </span>
                
                {/* Rating Display */}
                <div className="flex items-center space-x-1.5">
                  <Star size={14} className="text-brand-gold-500 fill-brand-gold-500" />
                  <span className="font-outfit font-bold text-xs text-brand-dark-900">{selectedProduct.rating}</span>
                  <span className="font-outfit text-[11px] text-brand-cream-500">({selectedProduct.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-1">
                <h3 className="font-playfair text-2xl sm:text-3xl text-brand-dark-900 font-medium">
                  {selectedProduct.name}
                </h3>
                <p className="font-outfit text-xs font-semibold tracking-wider text-brand-gold-600">
                  {selectedProduct.tagline}
                </p>
              </div>

              {/* Description */}
              <p className="font-outfit text-xs sm:text-sm text-brand-cream-500 leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Active ingredients checklist */}
              <div className="space-y-2 pt-2">
                <h4 className="font-playfair text-xs uppercase tracking-widest font-bold text-brand-dark-900">
                  Key Active Ingredients
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedProduct.keyIngredients.map((ing, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-brand-dark-900 font-outfit">
                      <CheckCircle size={13} className="text-brand-gold-500 shrink-0" />
                      <span>{ing}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Usage Guide */}
              <div className="space-y-1.5 pt-2">
                <h4 className="font-playfair text-xs uppercase tracking-widest font-bold text-brand-dark-900">
                  Clinical Application
                </h4>
                <p className="font-outfit text-xs text-brand-cream-500 leading-relaxed">
                  {selectedProduct.usage}
                </p>
              </div>

              {/* Clinical Trial Statistics */}
              <div className="bg-white/80 p-4 rounded-xl border border-brand-cream-300/40 space-y-3">
                <div className="flex justify-between items-center text-xs font-outfit">
                  <span className="font-bold text-brand-dark-900 uppercase tracking-wider flex items-center space-x-1.5">
                    <ShieldCheck size={14} className="text-brand-gold-500" />
                    <span>Clinical Study Findings</span>
                  </span>
                  <span className="text-brand-cream-500">Trial Period: {selectedProduct.clinicalTrials.trialPeriod}</span>
                </div>
                
                <div className="space-y-2">
                  {selectedProduct.clinicalTrials.results.map((res, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-[11.5px] font-outfit text-brand-cream-500">
                      <span className="font-bold text-brand-gold-500 shrink-0">•</span>
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Price & Action Footer */}
            <div className="pt-6 border-t border-brand-cream-200/50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              
              {/* Product Price */}
              <div>
                <span className="font-outfit text-[10px] uppercase tracking-widest text-brand-cream-500 block mb-1">
                  Unit Price
                </span>
                <span className="font-outfit text-2xl font-bold text-brand-dark-900">${selectedProduct.price}</span>
              </div>

              {/* Quantity Changer & Add Trigger */}
              <div className="flex items-center gap-3">
                
                {/* Quantity Toggle */}
                <div className="flex items-center border border-brand-cream-300 rounded bg-white">
                  <button
                    onClick={handleDecrease}
                    className="p-2.5 text-brand-cream-500 hover:text-brand-dark-900 transition-colors"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="px-4 font-outfit text-sm font-bold text-brand-dark-900 min-w-[30px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrease}
                    className="p-2.5 text-brand-cream-500 hover:text-brand-dark-900 transition-colors"
                  >
                    <Plus size={13} />
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={handleAdd}
                  className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-6 py-3.5 bg-brand-dark-900 hover:bg-brand-gold-500 text-white font-outfit text-xs tracking-widest uppercase font-semibold rounded-sm transition-all duration-300"
                >
                  <ShoppingBag size={14} />
                  <span>Add To Bag — ${(selectedProduct.price * quantity).toFixed(2)}</span>
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
