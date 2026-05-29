import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';

export default function Footer() {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    setEmailInput('');
  };

  return (
    <footer className="bg-brand-dark-950 text-brand-cream-300 pt-16 pb-8 border-t border-brand-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-brand-dark-800">
          
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <a href="#" className="flex flex-col">
              <span className="font-playfair text-2xl tracking-[0.2em] uppercase font-light text-white">
                Aura <span className="font-semibold text-brand-gold-400">Derma</span>
              </span>
              <span className="text-[9px] tracking-[0.4em] uppercase font-outfit text-brand-cream-500 -mt-1">
                Clinical Skincare
              </span>
            </a>
            <p className="font-outfit text-xs text-brand-cream-400 max-w-sm leading-relaxed font-light">
              Pioneering custom cellular rejuvenation at the intersection of medical science and organic purity.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="#" className="p-2 border border-brand-dark-800 hover:border-brand-gold-500 rounded-full hover:text-white transition-colors flex items-center justify-center" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61590324872831" target="_blank" rel="noopener noreferrer" className="p-2 border border-brand-dark-800 hover:border-brand-gold-500 rounded-full hover:text-white transition-colors flex items-center justify-center" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div className="md:col-span-3 space-y-3 font-outfit text-xs text-brand-cream-400">
            <h4 className="font-playfair text-xs uppercase tracking-widest font-semibold text-white">
              Direct Links
            </h4>
            <ul className="space-y-2">
              <li><a href="#shop" className="hover:text-brand-gold-400 transition-colors">Shop Formulations</a></li>
              <li><a href="#treatments" className="hover:text-brand-gold-400 transition-colors">Clinic Services</a></li>
              <li><a href="#results" className="hover:text-brand-gold-400 transition-colors">Clinical Studies</a></li>
              <li><a href="#science" className="hover:text-brand-gold-400 transition-colors">Scientific Board</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-5 space-y-4 font-outfit text-xs text-brand-cream-400">
            <h4 className="font-playfair text-xs uppercase tracking-widest font-semibold text-white">
              Interactive Newsletter
            </h4>
            <p className="leading-relaxed font-light">
              Subscribe to receive research alerts on clinical studies, formulations release, and get **15% off** on your first purchase.
            </p>

            {subscribed ? (
              // Subscribed State
              <div className="flex items-center space-x-2 text-green-400 font-semibold bg-green-950/20 border border-green-800/40 p-3 rounded-lg animate-fade-in">
                <Check size={16} />
                <span>Thank you! Check email for your coupon code: <span className="text-white font-bold bg-green-900/60 px-2 py-0.5 rounded ml-1">GLOW15</span></span>
              </div>
            ) : (
              // Subscription Form
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-sm border border-brand-dark-800 bg-brand-dark-900 font-outfit text-xs text-white focus:outline-none focus:border-brand-gold-500 transition-colors placeholder:text-brand-cream-500"
                    required
                  />
                  <Mail size={13} className="absolute left-3 top-3.5 text-brand-cream-500" />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-brand-gold-500 hover:bg-brand-gold-600 text-white font-outfit text-[11px] uppercase tracking-wider font-semibold rounded-sm transition-colors flex items-center justify-center"
                >
                  <Send size={12} className="mr-1.5" />
                  <span>Subscribe</span>
                </button>
              </form>
            )}

            <div className="space-y-2 pt-2 border-t border-brand-dark-800/50">
              <p className="flex items-center space-x-2">
                <MapPin size={13} className="text-brand-gold-500 shrink-0" />
                <span>451 Léman Boulevard, Medical Wing — Geneva, CH</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone size={13} className="text-brand-gold-500 shrink-0" />
                <a href="tel:01001914083" className="hover:text-brand-gold-400 transition-colors">Bookings: 01001914083</a>
              </p>
              <p className="flex items-center space-x-2">
                <Mail size={13} className="text-brand-gold-500 shrink-0" />
                <a href="mailto:sniparsalah@gmail.com" className="hover:text-brand-gold-400 transition-colors">sniparsalah@gmail.com</a>
              </p>
            </div>

          </div>

        </div>

        {/* Footer Meta Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-outfit text-[10px] text-brand-cream-500 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Aura Derma Clinic SA. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-brand-gold-400">Terms of Care</a>
            <a href="#" className="hover:text-brand-gold-400">Privacy Protocol</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
