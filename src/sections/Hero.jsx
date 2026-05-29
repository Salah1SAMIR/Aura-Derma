import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Award } from 'lucide-react';
import { useAuraDerma } from '../context/AuraDermaContext';

export default function Hero() {
  const { setIsQuizOpen } = useAuraDerma();

  return (
    <section className="relative pt-28 pb-16 md:py-40 bg-gradient-to-b from-brand-cream-100 via-brand-cream-50 to-white overflow-hidden">
      
      {/* Absolute Ambient Background Elements */}
      <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-gold-100/30 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-[-10%] w-[400px] h-[400px] rounded-full bg-brand-sage-100/40 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6 md:space-y-8 animate-fade-in-up">
            
            {/* Medically Endorsed Tag */}
            <div className="inline-flex items-center space-x-2 bg-brand-cream-200/60 border border-brand-cream-300 px-3.5 py-1.5 rounded-full shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold-500"></span>
              </span>
              <span className="font-outfit text-xs font-semibold tracking-widest uppercase text-brand-gold-700">
                Dermatologist Recommended & Proven
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl text-brand-dark-900 leading-[1.15] font-light">
              Science-Backed <br />
              <span className="font-bold text-brand-gold-500 italic">Clinical Formulations</span> <br />
              for Exquisite Radiance.
            </h1>

            {/* Description */}
            <p className="font-outfit text-base md:text-lg text-brand-cream-500 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              Welcome to the intersection of medical dermatology and clean beauty luxury. 
              Our formulas are crafted with medical-grade active ingredients to rejuvenate, 
              nourish, and restore skin health at a cellular level.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-2">
              <a
                href="#shop"
                className="w-full sm:w-auto text-center px-8 py-4 bg-brand-dark-900 text-white font-outfit text-xs tracking-widest uppercase font-semibold rounded-sm hover:bg-brand-gold-500 hover:shadow-lg transition-all duration-300"
              >
                Shop Formulations
              </a>
              <button
                onClick={() => setIsQuizOpen(true)}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 border border-brand-dark-900/10 bg-white/40 backdrop-blur-sm text-brand-dark-900 font-outfit text-xs tracking-widest uppercase font-semibold rounded-sm hover:border-brand-gold-500 hover:bg-brand-gold-50/50 hover:text-brand-gold-600 transition-all duration-300"
              >
                <Sparkles size={14} className="text-brand-gold-500" />
                <span>Find Your Skin Routine</span>
              </button>
            </div>

            {/* Luxury Micro Details */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-brand-cream-300/60 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start space-y-1">
                <ShieldCheck size={20} className="text-brand-gold-500" />
                <span className="font-playfair font-bold text-lg text-brand-dark-900">100%</span>
                <span className="font-outfit text-[11px] tracking-wider uppercase text-brand-cream-500">Cruelty-Free</span>
              </div>
              <div className="flex flex-col items-center lg:items-start space-y-1">
                <Heart size={20} className="text-brand-gold-500" />
                <span className="font-playfair font-bold text-lg text-brand-dark-900">Clinically</span>
                <span className="font-outfit text-[11px] tracking-wider uppercase text-brand-cream-500">Tested & Clean</span>
              </div>
              <div className="flex flex-col items-center lg:items-start space-y-1">
                <Award size={20} className="text-brand-gold-500" />
                <span className="font-playfair font-bold text-lg text-brand-dark-900">Dermatologist</span>
                <span className="font-outfit text-[11px] tracking-wider uppercase text-brand-cream-500">Developed</span>
              </div>
            </div>

          </div>

          {/* Hero Right Images / Creative Banner */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center lg:justify-end animate-slide-in-right">
            
            {/* Main Luxury Product Image Frame */}
            <div className="relative w-72 sm:w-80 md:w-96 lg:w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/60">
              <img
                src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80"
                alt="Aura Derma Premium Flasks"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
              
              {/* Luxury Text Frame overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-950/40 via-transparent to-transparent"></div>
            </div>

            {/* Float Highlight Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-sm p-4 sm:p-5 rounded-2xl shadow-xl border border-brand-cream-200 max-w-[210px] animate-float">
              <div className="flex items-center space-x-2 mb-1.5">
                <div className="bg-brand-gold-50 p-1.5 rounded-full text-brand-gold-500">
                  <Sparkles size={14} />
                </div>
                <span className="font-outfit text-xs font-semibold text-brand-dark-900 tracking-wider">Aura Glow Complex</span>
              </div>
              <p className="font-outfit text-[11px] text-brand-cream-500 leading-relaxed">
                92% of clinic trial participants reported visible luminosity within 7 days.
              </p>
            </div>

          </div>

        </div>
      </div>
      
      {/* Bottom Scroll Indicator Anchor */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden md:block">
        <a href="#shop" className="flex flex-col items-center space-y-1.5 text-brand-cream-500 hover:text-brand-gold-500 transition-colors">
          <span className="font-outfit text-[10px] uppercase tracking-widest">Scroll Down</span>
          <span className="w-1.5 h-6 border border-brand-cream-300 rounded-full flex justify-center pt-0.5">
            <span className="w-0.5 h-1.5 bg-brand-cream-500 rounded-full animate-bounce"></span>
          </span>
        </a>
      </div>

    </section>
  );
}
