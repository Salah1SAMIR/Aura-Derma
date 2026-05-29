import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Menu, X, Calendar } from 'lucide-react';
import { useAuraDerma } from '../context/AuraDermaContext';

export default function Navbar() {
  const { cart, setIsCartOpen, setIsQuizOpen, openBooking } = useAuraDerma();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: 'Shop', href: '#shop' },
    { name: 'Treatments', href: '#treatments' },
    { name: 'Before & After', href: '#results' },
    { name: 'Scientific Trials', href: '#science' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-brand-cream-50/80 backdrop-blur-lg border-b border-brand-cream-200/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Mobile menu toggle */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-brand-dark-800 hover:text-brand-gold-500 transition-colors p-2"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-1 flex justify-center md:justify-start items-center">
            <a href="#" className="flex flex-col items-center md:items-start group">
              <span className="font-playfair text-2xl sm:text-3xl tracking-[0.2em] uppercase font-light text-brand-dark-900 group-hover:text-brand-gold-500 transition-colors duration-300">
                Aura <span className="font-semibold text-brand-gold-400">Derma</span>
              </span>
              <span className="text-[9px] tracking-[0.4em] uppercase font-outfit text-brand-cream-500 -mt-1 group-hover:text-brand-dark-900 transition-colors duration-300">
                Clinical Skincare
              </span>
            </a>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 lg:space-x-12 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-outfit text-[13px] tracking-[0.15em] uppercase text-brand-dark-800 hover:text-brand-gold-500 font-medium transition-colors relative py-2 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-gold-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Interactive Utility Buttons */}
          <div className="flex items-center space-x-3 sm:space-x-6">
            
            {/* Skin Analyzer CTA in Nav */}
            <button
              onClick={() => setIsQuizOpen(true)}
              className="hidden lg:flex items-center space-x-2 text-[12px] uppercase font-outfit tracking-widest font-semibold px-4 py-2.5 rounded-full border border-brand-gold-300/40 text-brand-gold-600 bg-brand-gold-50/50 hover:bg-brand-gold-500 hover:text-white hover:border-brand-gold-500 transition-all duration-300 shadow-sm"
            >
              <Sparkles size={13} className="animate-pulse" />
              <span>Skin Analyzer</span>
            </button>

            {/* Quick Booking CTA */}
            <button
              onClick={() => openBooking()}
              className="flex items-center space-x-1.5 text-[12px] uppercase font-outfit tracking-widest font-semibold text-brand-dark-900 hover:text-brand-gold-500 transition-all duration-300 p-2"
              title="Book Treatment"
            >
              <Calendar size={18} />
              <span className="hidden sm:inline">Book</span>
            </button>

            {/* Cart Icon Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full border border-brand-cream-300 bg-white text-brand-dark-900 hover:bg-brand-dark-950 hover:text-white hover:border-brand-dark-950 transition-all duration-300 shadow-sm"
              aria-label="Open Cart"
            >
              <ShoppingBag size={18} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-gold-400 text-white font-outfit font-bold text-[9px] w-5 h-5 rounded-full flex items-center justify-center border border-white animate-scale-up">
                  {cartItemsCount}
                </span>
              )}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`md:hidden absolute top-20 left-0 w-full bg-brand-cream-100 border-b border-brand-cream-300 transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-96 opacity-100 py-6' : 'max-h-0 opacity-0 overflow-hidden py-0'
        }`}
      >
        <div className="flex flex-col px-4 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-outfit text-sm tracking-wider uppercase text-brand-dark-800 hover:text-brand-gold-500 font-medium py-1 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsQuizOpen(true);
            }}
            className="flex items-center justify-center space-x-2 text-xs uppercase font-outfit tracking-widest font-bold px-4 py-3 rounded-full border border-brand-gold-300 text-brand-gold-600 bg-brand-gold-50 hover:bg-brand-gold-500 hover:text-white transition-colors"
          >
            <Sparkles size={14} />
            <span>Skin Analyzer</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
