import React from 'react';
import { Calendar, Clock, CheckCircle } from 'lucide-react';
import { useAuraDerma } from '../context/AuraDermaContext';
import servicesData from '../data/services.json';

export default function TreatmentsSection() {
  const { openBooking } = useAuraDerma();

  return (
    <section id="treatments" className="py-20 bg-brand-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center space-y-3 mb-16">
          <span className="font-outfit text-xs font-bold tracking-widest uppercase text-brand-gold-500">
            Professional Medical Spa
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl text-brand-dark-900 font-light">
            In-Clinic <span className="italic font-bold text-brand-gold-500">Skin Treatments</span>
          </h2>
          <p className="font-outfit text-sm text-brand-cream-500 max-w-lg mx-auto">
            Book professional aesthetic dermatology treatments performed by board-certified practitioners at our Geneva clinic.
          </p>
        </div>

        {/* Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-3xl overflow-hidden border border-brand-cream-300 hover:shadow-xl hover:border-brand-cream-500 transition-all duration-500 flex flex-col sm:flex-row"
            >
              {/* Card Image */}
              <div className="w-full sm:w-[40%] aspect-video sm:aspect-auto bg-brand-cream-100 overflow-hidden relative shrink-0">
                <img
                  src={service.imageUrl}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Card Content Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-playfair text-lg sm:text-xl font-bold text-brand-dark-900 leading-tight">
                      {service.name}
                    </h3>
                  </div>

                  <p className="font-outfit text-xs text-brand-cream-500 leading-relaxed font-light">
                    {service.description}
                  </p>

                  {/* Benefits Checklist */}
                  <div className="space-y-1.5 pt-1.5">
                    {service.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-[11.5px] font-outfit text-brand-dark-900">
                        <CheckCircle size={12.5} className="text-brand-gold-500 shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Metadata and Booking Button */}
                <div className="flex items-center justify-between pt-4 border-t border-brand-cream-200/50">
                  <div className="space-y-0.5">
                    <span className="font-outfit text-[9px] uppercase tracking-widest text-brand-cream-500 block">
                      Treatment Fee
                    </span>
                    <span className="font-outfit font-bold text-brand-dark-900 text-lg">${service.price}</span>
                  </div>

                  <div className="flex items-center space-x-3.5">
                    <div className="flex items-center space-x-1 font-outfit text-[11px] text-brand-cream-500 bg-brand-cream-100/50 px-2 py-1 rounded">
                      <Clock size={11} className="text-brand-gold-500" />
                      <span>{service.duration}</span>
                    </div>

                    <button
                      onClick={() => openBooking(service)}
                      className="flex items-center space-x-1.5 px-4 py-2.5 bg-brand-dark-900 text-white font-outfit text-[10px] tracking-widest uppercase font-semibold rounded-sm hover:bg-brand-gold-500 transition-colors shadow-sm"
                    >
                      <Calendar size={12} />
                      <span>Book Slot</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
