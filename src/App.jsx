import React, { useState, useEffect } from 'react';
import { AuraDermaProvider } from './context/AuraDermaContext';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import ProductCatalog from './sections/ProductCatalog';
import TreatmentsSection from './sections/TreatmentsSection';
import BeforeAfterSlider from './sections/BeforeAfterSlider';
import ScienceSection from './sections/ScienceSection';
import Footer from './sections/Footer';

// Modals/Drawers
import SkinAnalyzer from './sections/SkinAnalyzer';
import BookingSystem from './sections/BookingSystem';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';

import './App.css'; // Add App.css import back if it was used

function AppContent() {
  const [initLoading, setInitLoading] = useState(true);

  useEffect(() => {
    // Premium initial page load skeleton/spinner delay
    const timer = setTimeout(() => {
      setInitLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (initLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-brand-cream-50 flex flex-col items-center justify-center space-y-4">
        <div className="flex flex-col items-center group">
          <span className="font-playfair text-3xl tracking-[0.25em] uppercase font-light text-brand-dark-900 animate-pulse">
            Aura <span className="font-semibold text-brand-gold-400">Derma</span>
          </span>
          <span className="text-[9px] tracking-[0.45em] uppercase font-outfit text-brand-cream-500 mt-1 animate-pulse">
            Clinical Skincare
          </span>
        </div>
        <div className="w-40 h-0.5 bg-brand-cream-200 rounded-full overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full bg-brand-gold-400 w-1/2 rounded-full animate-[goldShimmer_2s_infinite]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream-50">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ProductCatalog />
        <TreatmentsSection />
        <BeforeAfterSlider />
        <ScienceSection />
      </main>
      <Footer />

      {/* Global Dialog Overlays */}
      <SkinAnalyzer />
      <BookingSystem />
      <ProductDetailModal />
      <CartDrawer />
    </div>
  );
}

export default function App() {
  return (
    <AuraDermaProvider>
      <AppContent />
    </AuraDermaProvider>
  );
}
