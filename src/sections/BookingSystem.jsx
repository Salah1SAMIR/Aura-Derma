import React, { useState, useEffect } from 'react';
import { X, Calendar as CalendarIcon, Clock, User, Mail, Phone, FileText, CheckCircle, Sparkles } from 'lucide-react';
import { useAuraDerma } from '../context/AuraDermaContext';
import servicesData from '../data/services.json';

export default function BookingSystem() {
  const { isBookingOpen, setIsBookingOpen, selectedBookingTreatment, setSelectedBookingTreatment } = useAuraDerma();
  
  const [step, setStep] = useState(1);
  const [services, setServices] = useState([]);
  
  // Form fields
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const [bookingCode, setBookingCode] = useState('');

  useEffect(() => {
    setServices(servicesData);
  }, []);

  // Pre-fill service if opened with a specific treatment
  useEffect(() => {
    if (selectedBookingTreatment) {
      const match = servicesData.find(s => s.name === selectedBookingTreatment.name || s.id === selectedBookingTreatment.id);
      if (match) {
        setSelectedService(match);
        setStep(2); // Skip step 1 if product/treatment is preselected
      }
    }
  }, [selectedBookingTreatment]);

  if (!isBookingOpen) return null;

  // Generate next 7 days for the calendar selector
  const getNext7Days = () => {
    const days = [];
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    for (let i = 1; i <= 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      days.push({
        isoString: d.toISOString().split('T')[0],
        formatted: d.toLocaleDateString('en-US', options)
      });
    }
    return days;
  };

  const nextDays = getNext7Days();

  const timeSlots = [
    '09:00 AM',
    '10:30 AM',
    '12:00 PM',
    '01:30 PM',
    '03:00 PM',
    '04:30 PM',
    '06:00 PM'
  ];

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setStep(2);
  };

  const handleNextStep = () => {
    if (step === 2 && selectedDate && selectedTimeSlot) {
      setStep(3);
    } else if (step === 3 && userInfo.name && userInfo.email && userInfo.phone) {
      // Simulate booking reservation
      const code = `AUR-${Math.floor(1000 + Math.random() * 9000)}-${selectedService.id.toUpperCase()}`;
      setBookingCode(code);
      setStep(4);
    }
  };

  const handleClose = () => {
    setIsBookingOpen(false);
    setSelectedBookingTreatment(null);
    setSelectedService(null);
    setSelectedDate('');
    setSelectedTimeSlot('');
    setUserInfo({ name: '', email: '', phone: '', notes: '' });
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-brand-dark-950/60 backdrop-blur-sm transition-opacity"
      ></div>

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-brand-cream-50 rounded-2xl shadow-2xl border border-brand-cream-300/60 overflow-hidden z-10 animate-scale-up">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-brand-cream-200/50">
          <div className="flex items-center space-x-2 text-brand-dark-900">
            <CalendarIcon size={18} className="text-brand-gold-500" />
            <span className="font-outfit text-xs font-bold tracking-widest uppercase">
              {step === 4 ? 'Booking Confirmed' : 'Book Clinical Treatment'}
            </span>
          </div>
          <button
            onClick={handleClose}
            className="text-brand-cream-500 hover:text-brand-dark-900 transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Stepper Progress bar */}
        {step < 4 && (
          <div className="px-6 pt-6">
            <div className="flex justify-between text-[10px] uppercase font-outfit tracking-widest text-brand-cream-500 mb-2">
              <span>Step {step} of 3</span>
              <span className="font-bold text-brand-gold-500">
                {step === 1 && 'Select Clinical Service'}
                {step === 2 && 'Reserve Date & Time'}
                {step === 3 && 'Patient Information'}
              </span>
            </div>
            <div className="w-full h-1 bg-brand-cream-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-gold-400 transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Body content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          
          {/* Step 1: Select Service */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="font-playfair text-xl text-brand-dark-900 text-center mb-4">
                Choose a clinical skin treatment
              </h3>
              
              <div className="space-y-3">
                {services.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => handleServiceSelect(service)}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white border border-brand-cream-300 rounded-xl hover:border-brand-gold-400 hover:shadow-md cursor-pointer transition-all duration-300"
                  >
                    <div className="space-y-1.5 flex-1 pr-4">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-playfair font-bold text-sm text-brand-dark-900">{service.name}</h4>
                        <span className="text-[10px] font-outfit text-brand-cream-500 bg-brand-cream-100 px-2 py-0.5 rounded">
                          {service.duration}
                        </span>
                      </div>
                      <p className="font-outfit text-xs text-brand-cream-500 leading-relaxed line-clamp-2">
                        {service.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 mt-3 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-brand-cream-200/50 w-full sm:w-auto justify-between">
                      <span className="font-outfit font-bold text-brand-dark-900">${service.price}</span>
                      <button
                        className="px-4 py-2 bg-brand-dark-900 text-white hover:bg-brand-gold-500 text-[10px] tracking-widest uppercase font-semibold font-outfit transition-colors rounded-sm"
                      >
                        Book
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Date & Time Select */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Back to service link */}
              {selectedService && !selectedBookingTreatment && (
                <button
                  onClick={() => setStep(1)}
                  className="text-xs font-outfit text-brand-gold-500 hover:underline flex items-center space-x-1"
                >
                  <span>← Back to treatments</span>
                </button>
              )}

              {/* Service selected summary */}
              <div className="bg-brand-cream-100/50 p-4 rounded-xl border border-brand-cream-300/40">
                <span className="font-outfit text-[9px] uppercase tracking-widest text-brand-cream-500">Selected Treatment</span>
                <div className="flex justify-between items-center mt-1">
                  <h4 className="font-playfair font-bold text-base text-brand-dark-900">{selectedService?.name}</h4>
                  <span className="font-outfit text-sm font-bold text-brand-dark-900">${selectedService?.price}</span>
                </div>
              </div>

              {/* Calendar Days Selection */}
              <div className="space-y-2">
                <h4 className="font-playfair text-xs uppercase tracking-widest font-bold text-brand-dark-900">
                  1. Choose Date
                </h4>
                <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
                  {nextDays.map((day) => (
                    <button
                      key={day.isoString}
                      onClick={() => setSelectedDate(day.isoString)}
                      className={`p-3 rounded-lg border flex flex-col items-center justify-center transition-all ${
                        selectedDate === day.isoString
                          ? 'border-brand-gold-500 bg-brand-gold-50/20 text-brand-dark-900 font-bold ring-1 ring-brand-gold-400'
                          : 'border-brand-cream-300 bg-white text-brand-cream-500 hover:border-brand-cream-500'
                      }`}
                    >
                      <span className="text-[10px] font-outfit uppercase tracking-wider block">
                        {day.formatted.split(',')[0]}
                      </span>
                      <span className="text-sm font-outfit block mt-1">
                        {day.formatted.split(',')[1].trim().split(' ')[1]}
                      </span>
                      <span className="text-[9px] font-outfit block text-brand-gold-600 font-semibold">
                        {day.formatted.split(',')[1].trim().split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time slots selection */}
              <div className="space-y-2">
                <h4 className="font-playfair text-xs uppercase tracking-widest font-bold text-brand-dark-900">
                  2. Choose Available Time
                </h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`p-2.5 rounded border text-xs font-outfit transition-all ${
                        selectedTimeSlot === slot
                          ? 'border-brand-gold-500 bg-brand-gold-50/20 text-brand-dark-900 font-bold ring-1 ring-brand-gold-400'
                          : 'border-brand-cream-300 bg-white text-brand-cream-500 hover:border-brand-cream-500'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Next Button */}
              <div className="pt-4 border-t border-brand-cream-200/50 flex justify-end">
                <button
                  onClick={handleNextStep}
                  disabled={!selectedDate || !selectedTimeSlot}
                  className={`px-6 py-3 text-white font-outfit text-xs tracking-widest uppercase font-semibold transition-all rounded-sm ${
                    selectedDate && selectedTimeSlot
                      ? 'bg-brand-dark-900 hover:bg-brand-gold-500'
                      : 'bg-brand-cream-300 cursor-not-allowed opacity-50'
                  }`}
                >
                  Continue
                </button>
              </div>

            </div>
          )}

          {/* Step 3: Contact Info */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <button
                onClick={() => setStep(2)}
                className="text-xs font-outfit text-brand-gold-500 hover:underline"
              >
                ← Back to scheduling
              </button>

              <h3 className="font-playfair text-lg text-brand-dark-900">
                Patient Contact Information
              </h3>

              <div className="space-y-4">
                
                {/* Full Name */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-sm border border-brand-cream-300 bg-white font-outfit text-xs text-brand-dark-900 focus:outline-none focus:border-brand-gold-500 transition-colors"
                    required
                  />
                  <User size={14} className="absolute left-3.5 top-4 text-brand-cream-500" />
                </div>

                {/* Email Address */}
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-sm border border-brand-cream-300 bg-white font-outfit text-xs text-brand-dark-900 focus:outline-none focus:border-brand-gold-500 transition-colors"
                    required
                  />
                  <Mail size={14} className="absolute left-3.5 top-4 text-brand-cream-500" />
                </div>

                {/* Phone Number */}
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="Phone Number (e.g. +20...)"
                    value={userInfo.phone}
                    onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-sm border border-brand-cream-300 bg-white font-outfit text-xs text-brand-dark-900 focus:outline-none focus:border-brand-gold-500 transition-colors"
                    required
                  />
                  <Phone size={14} className="absolute left-3.5 top-4 text-brand-cream-500" />
                </div>

                {/* Special concerns / notes */}
                <div className="relative">
                  <textarea
                    placeholder="Any skin allergies, conditions, or special requirements we should know?"
                    rows="3"
                    value={userInfo.notes}
                    onChange={(e) => setUserInfo({ ...userInfo, notes: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-sm border border-brand-cream-300 bg-white font-outfit text-xs text-brand-dark-900 focus:outline-none focus:border-brand-gold-500 transition-colors resize-none"
                  ></textarea>
                  <FileText size={14} className="absolute left-3.5 top-4 text-brand-cream-500" />
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-brand-cream-200/50 flex justify-end">
                <button
                  onClick={handleNextStep}
                  disabled={!userInfo.name || !userInfo.email || !userInfo.phone}
                  className={`px-8 py-3.5 text-white font-outfit text-xs tracking-widest uppercase font-semibold transition-all rounded-sm ${
                    userInfo.name && userInfo.email && userInfo.phone
                      ? 'bg-brand-dark-900 hover:bg-brand-gold-500'
                      : 'bg-brand-cream-300 cursor-not-allowed opacity-50'
                  }`}
                >
                  Confirm Appointment
                </button>
              </div>

            </div>
          )}

          {/* Step 4: Confirmation screen */}
          {step === 4 && (
            <div className="text-center space-y-6 py-6 animate-fade-in">
              <div className="w-16 h-16 bg-brand-gold-50 text-brand-gold-500 rounded-full flex items-center justify-center mx-auto shadow-inner border border-brand-gold-200/30">
                <CheckCircle size={32} />
              </div>

              <div className="space-y-2">
                <h3 className="font-playfair text-2xl text-brand-dark-900 font-normal">
                  Your Appointment is Secured!
                </h3>
                <p className="font-outfit text-xs text-brand-cream-500">
                  Confirmation receipt has been sent to <span className="font-bold text-brand-dark-900">{userInfo.email}</span>.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="bg-white/80 p-5 rounded-2xl border border-brand-cream-300/60 max-w-md mx-auto text-left space-y-3.5 shadow-sm">
                <div className="flex justify-between border-b border-brand-cream-200 pb-2">
                  <span className="font-outfit text-[10px] uppercase tracking-widest text-brand-cream-500">Reservation Code</span>
                  <span className="font-outfit text-[11px] font-bold text-brand-dark-900 tracking-wider bg-brand-gold-50 px-2 py-0.5 rounded">
                    {bookingCode}
                  </span>
                </div>
                
                <div className="space-y-1.5 font-outfit text-xs">
                  <p className="flex justify-between">
                    <span className="text-brand-cream-500">Patient Name:</span>
                    <span className="font-bold text-brand-dark-900">{userInfo.name}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-brand-cream-500">Clinical Treatment:</span>
                    <span className="font-semibold text-brand-dark-900">{selectedService?.name}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-brand-cream-500">Reservation Date:</span>
                    <span className="font-bold text-brand-dark-900 capitalize">{selectedDate}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-brand-cream-500">Reserved Time:</span>
                    <span className="font-bold text-brand-dark-900">{selectedTimeSlot}</span>
                  </p>
                  <p className="flex justify-between border-t border-brand-cream-200/50 pt-2 text-sm">
                    <span className="text-brand-cream-500 font-medium">Fee (Pay at Clinic):</span>
                    <span className="font-bold text-brand-gold-500">${selectedService?.price}</span>
                  </p>
                </div>
              </div>

              <p className="font-outfit text-[10.5px] text-brand-cream-500 max-w-sm mx-auto leading-relaxed">
                Please arrive 10 minutes prior to your treatment slot. If you need to reschedule or cancel, please email us or call at least 24 hours in advance.
              </p>

              <div className="pt-2">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 bg-brand-dark-900 text-white font-outfit text-xs tracking-widest uppercase font-semibold rounded-sm hover:bg-brand-gold-500 transition-colors"
                >
                  Done
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
