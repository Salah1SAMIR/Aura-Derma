import React from 'react';
import { X, Sparkles, ShoppingBag, ArrowLeft, ArrowRight, RefreshCw, Check } from 'lucide-react';
import { useAuraDerma } from '../context/AuraDermaContext';

export default function SkinAnalyzer() {
  const {
    isQuizOpen,
    setIsQuizOpen,
    quizStep,
    setQuizStep,
    quizAnswers,
    setQuizAnswers,
    quizRecommendations,
    processQuizRecommendations,
    resetQuiz,
    addToCart
  } = useAuraDerma();

  if (!isQuizOpen) return null;

  const stepsCount = 4; // Intro (0) + 3 selection steps + Results (handled separately)

  const handleSelectOption = (key, value) => {
    setQuizAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (quizStep < 3) {
      setQuizStep((prev) => prev + 1);
    } else if (quizStep === 3) {
      // Calculate recommendations and move to results
      processQuizRecommendations(quizAnswers);
      setQuizStep(4);
    }
  };

  const handleBack = () => {
    if (quizStep > 0) {
      setQuizStep((prev) => prev - 1);
    }
  };

  const isStepValid = () => {
    if (quizStep === 1) return !!quizAnswers.skinType;
    if (quizStep === 2) return !!quizAnswers.skinConcern;
    if (quizStep === 3) return !!quizAnswers.sensitivity;
    return true; // Intro screen is always valid to proceed
  };

  const skinTypes = [
    { id: 'dry', label: 'Dry Skin', desc: 'Feels tight, rough, or occasionally flaky' },
    { id: 'oily', label: 'Oily Skin', desc: 'Prone to shiny spots, grease, and visible pores' },
    { id: 'combination', label: 'Combination', desc: 'Oily T-zone (forehead/nose) but dry cheeks' },
    { id: 'sensitive', label: 'Sensitive Skin', desc: 'Prone to redness, burning, or itchiness' }
  ];

  const skinConcerns = [
    { id: 'hydration', label: 'Dehydration & Dullness', desc: 'Lacks radiance, feels depleted or dull' },
    { id: 'aging', label: 'Aging & Fine Lines', desc: 'Loss of firmness, wrinkles, sagging skin' },
    { id: 'pigmentation', label: 'Dark Spots & Pigmentation', desc: 'Uneven tone, sun spots, post-acne marks' },
    { id: 'acne', label: 'Acne & Breakouts', desc: 'Clogged pores, pimples, inflammation' }
  ];

  const sensitivityLevels = [
    { id: 'high', label: 'Highly Reactive', desc: 'Reacts easily to fragrances, temperature, and chemicals' },
    { id: 'moderate', label: 'Moderately Sensitive', desc: 'Occasionally gets red or irritated with active treatments' },
    { id: 'low', label: 'Resilient / Low Sensitivity', desc: 'Rarely reacts to cosmetic formulations or strong active acids' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      
      {/* Backdrop */}
      <div
        onClick={() => setIsQuizOpen(false)}
        className="fixed inset-0 bg-brand-dark-950/60 backdrop-blur-sm transition-opacity"
      ></div>

      {/* Modal Dialog Box */}
      <div className="relative w-full max-w-2xl bg-brand-cream-50 rounded-2xl shadow-2xl border border-brand-cream-300/60 overflow-hidden z-10 animate-scale-up">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-brand-cream-200/50">
          <div className="flex items-center space-x-2 text-brand-gold-500">
            <Sparkles size={18} />
            <span className="font-outfit text-xs font-bold tracking-widest uppercase">Derma Skin Analyzer</span>
          </div>
          <button
            onClick={() => setIsQuizOpen(false)}
            className="text-brand-cream-500 hover:text-brand-dark-900 transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quiz Body */}
        <div className="px-6 py-8 min-h-[320px] max-h-[70vh] overflow-y-auto">
          
          {/* Step 0: Welcome Screen */}
          {quizStep === 0 && (
            <div className="text-center space-y-5 py-4 animate-fade-in">
              <div className="w-16 h-16 bg-brand-gold-50 text-brand-gold-500 rounded-full flex items-center justify-center mx-auto shadow-inner border border-brand-gold-200/30">
                <Sparkles size={28} />
              </div>
              <div className="space-y-2">
                <h3 className="font-playfair text-2xl sm:text-3xl text-brand-dark-900 font-normal">
                  Find Your Perfect Formulation
                </h3>
                <p className="font-outfit text-sm text-brand-cream-500 max-w-md mx-auto leading-relaxed">
                  Our algorithm analyzes your skin type, primary concerns, and sensitivity level 
                  to curate a personalized medical-grade clinical routine.
                </p>
              </div>
              <div className="pt-4">
                <button
                  onClick={handleNext}
                  className="px-8 py-3.5 bg-brand-dark-900 text-white font-outfit text-xs tracking-widest uppercase font-semibold rounded-sm hover:bg-brand-gold-500 transition-colors shadow-md"
                >
                  Start Analysis
                </button>
              </div>
            </div>
          )}

          {/* Stepper Progress Bar (Step 1-3) */}
          {quizStep > 0 && quizStep < 4 && (
            <div className="mb-8">
              <div className="flex justify-between text-[10px] uppercase font-outfit tracking-widest text-brand-cream-500 mb-2.5">
                <span>Step {quizStep} of 3</span>
                <span className="font-bold text-brand-gold-500">
                  {quizStep === 1 && 'Skin Profile'}
                  {quizStep === 2 && 'Primary Concern'}
                  {quizStep === 3 && 'Sensitivity Assessment'}
                </span>
              </div>
              <div className="w-full h-1 bg-brand-cream-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-gold-400 transition-all duration-300"
                  style={{ width: `${(quizStep / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Step 1: Skin Type */}
          {quizStep === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h4 className="font-playfair text-xl text-brand-dark-900 text-center mb-6">
                How does your skin feel during the day?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {skinTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleSelectOption('skinType', type.id)}
                    className={`text-left p-5 rounded-xl border transition-all duration-300 ${
                      quizAnswers.skinType === type.id
                        ? 'border-brand-gold-500 bg-brand-gold-50/20 shadow-md ring-1 ring-brand-gold-400/50'
                        : 'border-brand-cream-300 hover:border-brand-cream-500 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-outfit text-sm font-semibold text-brand-dark-900">{type.label}</span>
                      {quizAnswers.skinType === type.id && (
                        <span className="bg-brand-gold-500 text-white rounded-full p-0.5">
                          <Check size={12} />
                        </span>
                      )}
                    </div>
                    <p className="font-outfit text-xs text-brand-cream-500 leading-relaxed">{type.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Primary Concern */}
          {quizStep === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h4 className="font-playfair text-xl text-brand-dark-900 text-center mb-6">
                What is your primary skin concern?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {skinConcerns.map((concern) => (
                  <button
                    key={concern.id}
                    onClick={() => handleSelectOption('skinConcern', concern.id)}
                    className={`text-left p-5 rounded-xl border transition-all duration-300 ${
                      quizAnswers.skinConcern === concern.id
                        ? 'border-brand-gold-500 bg-brand-gold-50/20 shadow-md ring-1 ring-brand-gold-400/50'
                        : 'border-brand-cream-300 hover:border-brand-cream-500 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-outfit text-sm font-semibold text-brand-dark-900">{concern.label}</span>
                      {quizAnswers.skinConcern === concern.id && (
                        <span className="bg-brand-gold-500 text-white rounded-full p-0.5">
                          <Check size={12} />
                        </span>
                      )}
                    </div>
                    <p className="font-outfit text-xs text-brand-cream-500 leading-relaxed">{concern.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Sensitivity */}
          {quizStep === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h4 className="font-playfair text-xl text-brand-dark-900 text-center mb-6">
                How does your skin react to new products?
              </h4>
              <div className="grid grid-cols-1 gap-3.5">
                {sensitivityLevels.map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => handleSelectOption('sensitivity', lvl.id)}
                    className={`text-left p-5 rounded-xl border transition-all duration-300 ${
                      quizAnswers.sensitivity === lvl.id
                        ? 'border-brand-gold-500 bg-brand-gold-50/20 shadow-md ring-1 ring-brand-gold-400/50'
                        : 'border-brand-cream-300 hover:border-brand-cream-500 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-outfit text-sm font-semibold text-brand-dark-900">{lvl.label}</span>
                      {quizAnswers.sensitivity === lvl.id && (
                        <span className="bg-brand-gold-500 text-white rounded-full p-0.5">
                          <Check size={12} />
                        </span>
                      )}
                    </div>
                    <p className="font-outfit text-xs text-brand-cream-500 leading-relaxed">{lvl.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Recommendations (Results) */}
          {quizStep === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center space-y-2 mb-6">
                <div className="inline-flex bg-brand-gold-50 text-brand-gold-500 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-1">
                  Analysis Complete
                </div>
                <h4 className="font-playfair text-2xl text-brand-dark-900 font-light">
                  Your Recommended Prescribed Regimen
                </h4>
                <p className="font-outfit text-xs text-brand-cream-500">
                  Formulations matching: <span className="font-bold text-brand-dark-900 capitalize">{quizAnswers.skinType} Skin</span> & <span className="font-bold text-brand-dark-900 capitalize">{quizAnswers.skinConcern} Concern</span>
                </p>
              </div>

              {/* Recommended Product List */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {quizRecommendations.map((prod) => (
                  <div
                    key={prod.id}
                    className="flex flex-col bg-white rounded-xl overflow-hidden border border-brand-cream-300 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="aspect-[4/3] bg-brand-cream-100 overflow-hidden relative">
                      <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 bg-brand-gold-400 text-white font-outfit text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-sm">
                        Recommended
                      </span>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h5 className="font-playfair font-bold text-sm text-brand-dark-900 line-clamp-1">{prod.name}</h5>
                        <p className="font-outfit text-[11px] text-brand-cream-500 line-clamp-2 mt-1">
                          {prod.tagline}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-brand-cream-200/50">
                        <span className="font-outfit font-bold text-brand-dark-900">${prod.price}</span>
                        <button
                          onClick={() => addToCart(prod, 1)}
                          className="flex items-center space-x-1.5 px-3 py-1.5 bg-brand-dark-900 text-white font-outfit text-[10px] tracking-widest uppercase font-semibold rounded-sm hover:bg-brand-gold-500 transition-colors"
                        >
                          <ShoppingBag size={11} />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Re-take Button */}
              <div className="text-center pt-4">
                <button
                  onClick={resetQuiz}
                  className="inline-flex items-center space-x-2 px-6 py-2.5 border border-brand-cream-300 hover:border-brand-dark-900/40 text-brand-cream-500 hover:text-brand-dark-900 text-[11.5px] uppercase tracking-widest font-semibold font-outfit transition-colors"
                >
                  <RefreshCw size={13} />
                  <span>Retake Analysis</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation Buttons */}
        {quizStep > 0 && quizStep < 4 && (
          <div className="flex justify-between items-center px-6 py-5 border-t border-brand-cream-200/50 bg-brand-cream-100/50">
            <button
              onClick={handleBack}
              className="flex items-center space-x-1 px-4 py-2 border border-brand-cream-300 text-brand-cream-500 hover:text-brand-dark-900 transition-colors rounded-sm text-xs font-semibold"
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`flex items-center space-x-1 px-5 py-2.5 text-white transition-all rounded-sm text-xs font-semibold ${
                isStepValid()
                  ? 'bg-brand-dark-900 hover:bg-brand-gold-500'
                  : 'bg-brand-cream-300 cursor-not-allowed opacity-50'
              }`}
            >
              <span>{quizStep === 3 ? 'Analyze Skin' : 'Next'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
