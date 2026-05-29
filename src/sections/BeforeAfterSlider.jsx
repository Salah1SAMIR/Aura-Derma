import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { HelpCircle, MoveHorizontal } from 'lucide-react';

export default function BeforeAfterSlider() {
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  
  // Framer motion values for butter-smooth spring physics
  const progress = useMotionValue(50); // 0 to 100 percentage
  const smoothProgress = useSpring(progress, { stiffness: 300, damping: 30, mass: 0.8 });

  // Transform values for styling
  const clipPath = useTransform(smoothProgress, (val) => `inset(0 ${100 - val}% 0 0)`);
  const leftPercentage = useTransform(smoothProgress, (val) => `${val}%`);

  const beforeImageUrl = import.meta.env.BASE_URL + 'images/skincare_before.png';
  const afterImageUrl = import.meta.env.BASE_URL + 'images/skincare_after.png';
  // Cross-device pointer handling for exact 1:1 mapped drag
  const handlePointerDown = (e) => {
    isDragging.current = true;
    updateProgress(e.clientX ?? e.touches?.[0]?.clientX);
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    updateProgress(e.clientX ?? e.touches?.[0]?.clientX);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const updateProgress = (clientX) => {
    if (!containerRef.current || clientX === undefined) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    progress.set(percentage);
  };

  useEffect(() => {
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchend', handlePointerUp);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: false });
    
    return () => {
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchend', handlePointerUp);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, []);

  return (
    <section id="results" className="py-24 bg-gradient-to-b from-brand-cream-50 to-white border-y border-brand-cream-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Slider Left Details */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 space-y-8 text-center lg:text-left"
          >
            <div className="space-y-4">
              <span className="font-outfit text-xs font-bold tracking-widest uppercase text-brand-gold-500">
                Clinical Efficacy
              </span>
              <h2 className="font-playfair text-4xl sm:text-5xl text-brand-dark-900 font-light leading-tight">
                Visualizing the <span className="italic font-bold text-brand-gold-500">Difference</span>
              </h2>
              <p className="font-outfit text-base text-brand-cream-500 leading-relaxed font-light">
                Drag the interactive slider to compare clinical patient skins before and after our 4-week 
                <strong className="text-brand-dark-800 font-medium"> Aura Glow HydraFacial </strong> 
                treatment regimen combined with daily 
                <strong className="text-brand-dark-800 font-medium"> Hyaluronic Hydration Serum </strong> 
                application.
              </p>
            </div>

            {/* Trial statistics summary cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-brand-cream-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-transform hover:-translate-y-1 duration-300">
                <span className="font-playfair text-4xl font-bold text-brand-gold-500">-85%</span>
                <p className="font-outfit text-xs uppercase tracking-wider text-brand-cream-500 mt-2 font-medium">
                  Redness & Spots
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-brand-cream-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-transform hover:-translate-y-1 duration-300">
                <span className="font-playfair text-4xl font-bold text-brand-gold-500">+140%</span>
                <p className="font-outfit text-xs uppercase tracking-wider text-brand-cream-500 mt-2 font-medium">
                  Hydration Index
                </p>
              </div>
            </div>

            <div className="pt-2 text-xs font-outfit text-brand-cream-400 flex items-center justify-center lg:justify-start space-x-2">
              <HelpCircle size={15} className="text-brand-gold-400" />
              <span>Tested on 124 patients under strict clinical control.</span>
            </div>
          </motion.div>

          {/* Interactive Drag Frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-7 flex justify-center w-full"
          >
            <div
              ref={containerRef}
              onMouseDown={handlePointerDown}
              onTouchStart={handlePointerDown}
              className="relative w-full max-w-[900px] aspect-[4/3] sm:aspect-[16/10] rounded-[28px] overflow-hidden shadow-[0_20px_50px_rgb(0,0,0,0.15)] cursor-ew-resize select-none touch-none bg-brand-dark-900 group"
            >
              
              {/* BASE LAYER: AFTER (Right Side) */}
              <div className="absolute inset-0">
                <img
                  src={afterImageUrl}
                  alt="After skin comparison"
                  className="w-full h-full object-cover object-center"
                  draggable="false"
                />
                <span className="absolute bottom-5 right-5 bg-brand-gold-500 text-white font-outfit text-[10px] sm:text-xs uppercase tracking-widest font-bold px-4 py-2 rounded-md shadow-lg pointer-events-none transition-opacity duration-300">
                  Week 4 — Radiant After
                </span>
              </div>

              {/* CLIPPED LAYER: BEFORE (Left Side) */}
              <motion.div
                className="absolute inset-0 z-10"
                style={{ clipPath }}
              >
                <img
                  src={beforeImageUrl}
                  alt="Before skin comparison"
                  className="w-full h-full object-cover object-center"
                  draggable="false"
                />
                <span className="absolute bottom-5 left-5 bg-brand-dark-950/80 backdrop-blur-md text-white font-outfit text-[10px] sm:text-xs uppercase tracking-widest font-bold px-4 py-2 rounded-md shadow-lg pointer-events-none whitespace-nowrap">
                  Week 0 — Before
                </span>
              </motion.div>

              {/* DRAG DIVIDER & HANDLE */}
              <motion.div
                className="absolute inset-y-0 w-[2px] bg-white/60 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.6)] z-20"
                style={{ left: leftPercentage }}
              >
                {/* Premium Glassmorphism Handle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 backdrop-blur-md border-[1.5px] border-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.2),0_0_20px_rgba(255,215,0,0.2)] flex items-center justify-center text-brand-gold-500 transition-transform duration-300 ease-out group-hover:scale-105 group-active:scale-95">
                  <MoveHorizontal size={24} strokeWidth={1.5} className="opacity-80" />
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
