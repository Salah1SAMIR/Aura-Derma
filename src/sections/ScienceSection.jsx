import React, { useState } from 'react';
import { Star, ShieldCheck, Heart, Award, ArrowLeft, ArrowRight } from 'lucide-react';
import testimonialsData from '../data/testimonials.json';

export default function ScienceSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const handlePrev = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveTestimonial((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  const trialMetrics = [
    { label: 'Cellular Turnover Acceleration', percentage: 88, desc: 'Proven to speed skin cell regeneration in 14 days.' },
    { label: 'Deep Layer Moisture Retention', percentage: 94, desc: 'Increases dermal hydration levels after a single application.' },
    { label: 'Hyperpigmentation Reduction', percentage: 82, desc: 'Fades stubborn UV spots and post-inflammatory dark marks.' }
  ];

  return (
    <section id="science" className="py-20 bg-brand-cream-50 relative overflow-hidden">
      
      {/* Background ambient design */}
      <div className="absolute top-40 left-[-20%] w-[600px] h-[600px] rounded-full bg-brand-gold-100/10 blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center space-y-3 mb-16">
          <span className="font-outfit text-xs font-bold tracking-widest uppercase text-brand-gold-500">
            Formulation Integrity
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl text-brand-dark-900 font-light">
            The Science of <span className="italic font-bold text-brand-gold-500">Cellular Health</span>
          </h2>
          <p className="font-outfit text-sm text-brand-cream-500 max-w-xl mx-auto">
            Our lab formulations focus on biochemical pathways that restore the skin barrier, boost collagen production, and reduce inflammatory triggers.
          </p>
        </div>

        {/* Split Grid: Metrics on left, Advisor/Doctor on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Column: Visualizing Trial Metrics */}
          <div className="lg:col-span-6 space-y-8">
            <h3 className="font-playfair text-2xl text-brand-dark-900 font-normal">
              Clinical Trial Validation
            </h3>
            <p className="font-outfit text-xs sm:text-sm text-brand-cream-500 leading-relaxed font-light">
              We conduct double-blind clinical trials over a 6-week period on diverse skin types to observe the efficacy of our active ingredient percentages.
            </p>

            <div className="space-y-6">
              {trialMetrics.map((metric, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-outfit">
                    <span className="font-bold text-brand-dark-900 uppercase tracking-wider">{metric.label}</span>
                    <span className="font-bold text-brand-gold-500 text-sm">{metric.percentage}% Success</span>
                  </div>
                  
                  {/* Premium animated progress bar */}
                  <div className="w-full h-2 bg-brand-cream-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-gold-400 rounded-full"
                      style={{ width: `${metric.percentage}%` }}
                    ></div>
                  </div>
                  <p className="font-outfit text-[11px] text-brand-cream-500">
                    {metric.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Dermatologist Board Spotlights */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-cream-300 shadow-xl max-w-md relative">
              
              {/* Gold badge */}
              <div className="absolute -top-5 -right-5 bg-brand-gold-500 text-white p-3 rounded-full shadow-lg border border-white">
                <Award size={22} />
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border border-brand-cream-300">
                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&h=150&q=80"
                    alt="Dr. Evelyn Vance"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-playfair font-bold text-base text-brand-dark-900">Dr. Evelyn Vance, MD</h4>
                  <p className="font-outfit text-[11px] uppercase tracking-wider text-brand-gold-600 font-semibold">
                    Chief Dermatological Advisor
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="font-outfit text-xs sm:text-sm text-brand-cream-500 italic leading-relaxed">
                  "At Aura Derma, we strip away fillers and marketing gimmicks. Every serum contains precise percentages of clinically proven molecules (like Retinol or BHA) balanced with barrier lipids, ensuring maximum result and zero irritation."
                </p>
                
                <div className="flex items-center space-x-4 border-t border-brand-cream-200/50 pt-4 text-[11px] font-outfit text-brand-cream-500">
                  <div className="flex items-center space-x-1.5">
                    <ShieldCheck size={14} className="text-brand-gold-500" />
                    <span>Derm-Tested</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Heart size={14} className="text-brand-gold-500" />
                    <span>Sensitive Safe</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Testimonials Review Slider */}
        <div className="bg-brand-cream-100/50 rounded-3xl p-6 sm:p-10 border border-brand-cream-300/40 relative max-w-3xl mx-auto shadow-sm">
          
          <span className="font-outfit text-[9px] uppercase tracking-widest text-brand-gold-500 font-bold block text-center mb-6">
            Clinical Reviews & Endorsements
          </span>

          <div className="min-h-[140px] text-center space-y-4 flex flex-col justify-center items-center">
            
            {/* Stars */}
            <div className="flex space-x-1 justify-center">
              {[...Array(testimonialsData[activeTestimonial]?.rating || 5)].map((_, i) => (
                <Star key={i} size={14} className="text-brand-gold-500 fill-brand-gold-500" />
              ))}
            </div>

            {/* Testimonial Text */}
            <p className="font-outfit text-sm sm:text-base text-brand-dark-900 italic leading-relaxed max-w-2xl">
              "{testimonialsData[activeTestimonial]?.text}"
            </p>

            {/* User Meta */}
            <div className="pt-2">
              <span className="font-playfair font-bold text-sm text-brand-dark-900 block">
                {testimonialsData[activeTestimonial]?.name}
              </span>
              <span className="font-outfit text-[11px] tracking-wider text-brand-cream-500 uppercase block mt-0.5">
                {testimonialsData[activeTestimonial]?.role}
              </span>
            </div>

          </div>

          {/* Testimonial slider navigation buttons */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handlePrev}
              className="p-2 border border-brand-cream-300 hover:border-brand-dark-900/30 text-brand-cream-500 hover:text-brand-dark-900 rounded-full transition-colors bg-white shadow-sm"
              aria-label="Previous Testimonial"
            >
              <ArrowLeft size={14} />
            </button>
            
            <div className="flex space-x-1.5">
              {testimonialsData.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    activeTestimonial === idx ? 'w-5 bg-brand-gold-500' : 'bg-brand-cream-300'
                  }`}
                ></span>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2 border border-brand-cream-300 hover:border-brand-dark-900/30 text-brand-cream-500 hover:text-brand-dark-900 rounded-full transition-colors bg-white shadow-sm"
              aria-label="Next Testimonial"
            >
              <ArrowRight size={14} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
