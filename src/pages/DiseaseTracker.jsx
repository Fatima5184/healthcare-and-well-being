import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Activity, AlertCircle, CheckCircle2, Thermometer, Brain, Wind, Save, X } from 'lucide-react';
import { useHealth } from '../context/HealthContext';
import { translations } from '../data/translations';

const DiseaseTracker = () => {
  const { state, dispatch } = useHealth();
  const t = translations[state.language || 'en'];
  const [symptoms, setSymptoms] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({ name: '', phone: '', email: '' });
  const [appointment, setAppointment] = useState(null);

  const handleAnalyze = () => {
    if (!symptoms) return;
    setIsAnalyzing(true);
    setIsSaved(false);
    setResult(null);
    setAppointment(null);
    
    // Mock AI Analysis Logic
    setTimeout(() => {
      setIsAnalyzing(false);
      const lowerSymptoms = symptoms.toLowerCase();
      
      let analysisResult = {
        condition: 'Seasonal Influenza (Suspected)',
        confidence: '85%',
        specialist: 'General Physician',
        hospital: 'KBN Hospital',
        solutions: [
          'Maintain high fluid intake (water, herbal teas)',
          'Complete rest for 48-72 hours',
          'Monitor body temperature every 4 hours'
        ],
        precautions: ['Isolate from others', 'Wear a mask', 'Sanitize surfaces']
      };

      if (lowerSymptoms.includes('chest') || lowerSymptoms.includes('heart') || lowerSymptoms.includes('cardiac')) {
        analysisResult = {
          condition: 'Acute Cardiac Distress',
          confidence: '78%',
          specialist: 'Cardiologist',
          hospital: 'Jeevan Jyothi Hospital',
          solutions: ['Loosen clothing', 'Sit upright', 'Chew aspirin if prescribed'],
          precautions: ['Seek immediate emergency help', 'Avoid physical exertion']
        };
      } else if (lowerSymptoms.includes('eye') || lowerSymptoms.includes('vision') || lowerSymptoms.includes('redness') || lowerSymptoms.includes('blind')) {
        analysisResult = {
          condition: 'Ocular Strain / Conjunctivitis',
          confidence: '92%',
          specialist: 'Ophthalmologist',
          hospital: 'Sri Sidrameshwar Eye Hospital',
          solutions: ['Apply cool compress', 'Avoid screen time', 'Use artificial tears'],
          precautions: ['Do not rub eyes', 'Wash hands frequently']
        };
      } else if (lowerSymptoms.includes('child') || lowerSymptoms.includes('baby') || lowerSymptoms.includes('kid') || lowerSymptoms.includes('pediatric')) {
        analysisResult = {
          condition: 'Pediatric Viral Fever',
          confidence: '89%',
          specialist: 'Pediatrician',
          hospital: 'Amruta Sparsh Hospital',
          solutions: ['Keep child hydrated', 'Lukewarm sponge bath', 'Monitor breathing'],
          precautions: ['Avoid crowded places', 'Sanitize toys']
        };
      } else if (lowerSymptoms.includes('dizzy') || lowerSymptoms.includes('headache') || lowerSymptoms.includes('faint') || lowerSymptoms.includes('vertigo') || lowerSymptoms.includes('sleepy')) {
        analysisResult = {
          condition: 'Neurological / Vertigo',
          confidence: '76%',
          specialist: 'Neurologist',
          hospital: 'United Hospital',
          solutions: ['Rest in a dark room', 'Avoid sudden movements', 'Stay hydrated'],
          precautions: ['Do not drive', 'Avoid operating heavy machinery']
        };
      } else if (lowerSymptoms.includes('stomach') || lowerSymptoms.includes('vomit') || lowerSymptoms.includes('gas') || lowerSymptoms.includes('acidity') || lowerSymptoms.includes('pain in stomach')) {
        analysisResult = {
          condition: 'Gastrointestinal Distress',
          confidence: '84%',
          specialist: 'Gastroenterologist',
          hospital: 'KBN Hospital',
          solutions: ['Drink ORS solution', 'Avoid spicy food', 'Small frequent meals'],
          precautions: ['Maintain hand hygiene', 'Avoid street food']
        };
      } else if (lowerSymptoms.includes('bone') || lowerSymptoms.includes('joint') || lowerSymptoms.includes('back') || lowerSymptoms.includes('knee') || lowerSymptoms.includes('fracture')) {
        analysisResult = {
          condition: 'Orthopedic / Joint Pain',
          confidence: '88%',
          specialist: 'Orthopedist',
          hospital: 'Basaveshwar Hospital',
          solutions: ['Apply ice pack', 'Keep affected limb elevated', 'Avoid weight bearing'],
          precautions: ['Avoid strenuous exercise', 'Use supportive gear']
        };
      } else if (lowerSymptoms.includes('stress') || lowerSymptoms.includes('anxiety') || lowerSymptoms.includes('depress') || lowerSymptoms.includes('insomnia')) {
        analysisResult = {
          condition: 'Mental Health / Anxiety',
          confidence: '82%',
          specialist: 'Psychiatrist',
          hospital: 'Mind Care Clinic',
          solutions: ['Deep breathing exercises', 'Talk to a trusted person', 'Maintain sleep hygiene'],
          precautions: ['Avoid caffeine late at night', 'Limit screen time before bed']
        };
      } else if (lowerSymptoms.includes('skin') || lowerSymptoms.includes('rash') || lowerSymptoms.includes('itch') || lowerSymptoms.includes('acne')) {
        analysisResult = {
          condition: 'Dermatitis / Skin Allergy',
          confidence: '81%',
          specialist: 'Dermatologist',
          hospital: 'Q. P Multi Speciality Hospital',
          solutions: ['Apply soothing lotion', 'Identify triggers', 'Avoid scratching'],
          precautions: ['Use mild soap', 'Wear cotton clothing']
        };
      } else if (lowerSymptoms.includes('cough') || lowerSymptoms.includes('breath') || lowerSymptoms.includes('throat') || lowerSymptoms.includes('lung')) {
        analysisResult = {
          condition: 'Respiratory Infection',
          confidence: '85%',
          specialist: 'Pulmonologist',
          hospital: 'ESIC Hospital',
          solutions: ['Warm saline gargles', 'Steam inhalation', 'Stay warm'],
          precautions: ['Use a handkerchief', 'Avoid cold drinks']
        };
      }

      setResult(analysisResult);

      // Auto-save to Health Records
      dispatch({
        type: 'ADD_RECORD',
        payload: {
          id: Date.now(),
          date: new Date().toISOString().split('T')[0],
          type: 'AI Diagnosis',
          status: 'Completed',
          doctor: analysisResult.specialist,
          report: `Symptoms: ${symptoms.substring(0, 50)}... | Result: ${analysisResult.condition} (${analysisResult.confidence})`
        }
      });
      setIsSaved(true);
    }, 2000);
  };

  const handleBooking = (e) => {
    e.preventDefault();
    const apptId = `VTL-${Math.floor(100000 + Math.random() * 900000)}`;
    const apptData = {
      ...bookingDetails,
      id: apptId,
      date: new Date().toLocaleDateString(),
      time: '10:30 AM',
      doctor: result.specialist,
      hospital: result.hospital,
      condition: result.condition
    };
    setAppointment(apptData);
    setShowBooking(false);
  };

  const downloadSlip = () => {
    const content = `
VITALIS HEALTHCARE APPOINTMENT SLIP
----------------------------------
Appointment ID: ${appointment.id}
Date: ${appointment.date}
Time: ${appointment.time}

PATIENT DETAILS:
Name: ${appointment.name}
Phone: ${appointment.phone}
Email: ${appointment.email}

DIAGNOSIS SUMMARY:
Suspected Condition: ${appointment.condition}
Recommended Specialist: ${appointment.doctor}
Hospital: ${appointment.hospital}

NOTE: Please arrive 15 minutes before your time slot.
----------------------------------
Vitalis - Your Digital Health Partner
    `;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Vitalis_Appointment_${appointment.id}.txt`;
    link.click();
  };

  return (
    <div className="tracker-page pt-24 min-height-screen pb-20">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              {t.trackerTitle.split(' ').slice(0, -2).join(' ')} <span className="gradient-text">{t.trackerTitle.split(' ').slice(-2).join(' ')}</span>
            </motion.h1>
            <p className="text-muted text-lg">{t.trackerSubtitle}</p>
          </div>

          <div className="glass p-8 md:p-12 rounded-[3rem] mb-12 relative overflow-hidden">
            <div className="flex flex-col gap-6 relative z-10">
              <div className="input-group">
                <label className="block text-xs font-bold mb-3 text-primary uppercase tracking-widest">{t.feelingLabel}</label>
                <textarea 
                  className="contact-input h-40 text-lg rounded-[2rem] p-8" 
                  placeholder={t.symptomsPlaceholder}
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                />
              </div>
              <button 
                className={`btn btn-primary py-5 text-xl justify-center rounded-3xl ${isAnalyzing ? 'opacity-70 cursor-not-allowed' : ''}`}
                onClick={handleAnalyze}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <><Activity className="w-6 h-6 mr-3 animate-spin" /> {t.analyzing}</>
                ) : (
                  <>{t.analyzeSymptoms} <Search className="w-6 h-6 ml-3" /></>
                )}
              </button>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32" />
          </div>

          <AnimatePresence>
            {result && !appointment && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="grid md-grid-cols-2 gap-8"
              >
                <div className="glass p-10 rounded-[3rem] border-t-8 border-primary">
                  <div className="flex items-center gap-5 mb-8">
                    <div className="p-4 bg-primary/20 rounded-3xl">
                      <AlertCircle className="text-primary w-10 h-10" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-3xl font-bold">{result.condition}</h3>
                        {isSaved && (
                          <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full border border-primary/20 flex items-center gap-1">
                            <Save className="w-3 h-3" /> {t.saved || 'SAVED'}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted">{t.diagnosisResult}: <span className="text-primary font-bold">{result.confidence}</span></p>
                    </div>
                  </div>

                  <h4 className="font-bold mb-6 flex items-center gap-2 text-xl">
                    <CheckCircle2 className="text-primary w-6 h-6" /> {t.recommendedCare}
                  </h4>
                  <ul className="space-y-4">
                    {result.solutions.map((s, i) => (
                      <li key={i} className="flex gap-4 text-muted text-lg">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2.5 shrink-0 shadow-[0_0_10px_var(--primary)]" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-8">
                  <div className="glass p-10 rounded-[3rem] border-t-8 border-secondary">
                    <h4 className="font-bold mb-6 text-xl">{t.preventativeProtocol}</h4>
                    <ul className="space-y-4">
                      {result.precautions.map((p, i) => (
                        <li key={i} className="flex gap-4 text-muted text-lg">
                          <CheckCircle2 className="text-secondary w-6 h-6 shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="glass p-10 rounded-[3rem] bg-secondary/10 border border-secondary/20 shadow-2xl shadow-secondary/10">
                    <div className="mb-8">
                      <p className="text-xs text-muted uppercase font-bold tracking-[0.2em] mb-2">{t.primaryRecommendation}</p>
                      <h4 className="text-2xl font-bold mb-1">{result.specialist}</h4>
                      <p className="text-primary font-bold text-lg">@ {result.hospital}, Kalaburagi</p>
                    </div>
                    <button 
                      className="btn btn-secondary w-full justify-center py-5 rounded-3xl text-lg font-bold shadow-xl shadow-secondary/20 hover:scale-[1.02]"
                      onClick={() => setShowBooking(true)}
                    >
                      {t.bookNow}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {appointment && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-12 rounded-[4rem] text-center max-w-2xl mx-auto border-t-8 border-primary relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="text-primary w-12 h-12" />
                </div>
                <h2 className="text-4xl font-bold mb-2">{t.bookingConfirmed}</h2>
                <p className="text-muted text-lg mb-8">{t.appointmentHospital.replace('{hospital}', appointment.hospital)}</p>
                
                <div className="bg-white/5 rounded-3xl p-8 mb-10 text-left border border-white/10">
                  <div className="flex justify-between mb-6 border-b border-white/10 pb-4">
                    <span className="text-muted">{t.appointmentId}</span>
                    <span className="font-bold text-primary text-xl">{appointment.id}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs text-muted uppercase font-bold tracking-widest mb-1">{t.patient}</p>
                      <p className="font-bold text-lg">{appointment.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted uppercase font-bold tracking-widest mb-1">{t.specialist}</p>
                      <p className="font-bold text-lg">{appointment.doctor}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted uppercase font-bold tracking-widest mb-1">{t.date}</p>
                      <p className="font-bold text-lg">{appointment.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted uppercase font-bold tracking-widest mb-1">{t.time}</p>
                      <p className="font-bold text-lg">{appointment.time}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="btn btn-primary flex-1 justify-center py-4 rounded-2xl" onClick={downloadSlip}>
                    {t.downloadSlip} <Save className="w-5 h-5 ml-2" />
                  </button>
                  <button className="btn btn-outline flex-1 justify-center py-4 rounded-2xl" onClick={() => setAppointment(null)}>
                    {t.newAnalysis}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Stats Grid */}
          {!appointment && (
            <div className="grid md:grid-cols-3 gap-8 mt-20">
              <div className="glass p-8 rounded-3xl flex items-center gap-5">
                <div className="p-4 bg-red-500/20 rounded-2xl">
                  <Thermometer className="text-red-500 w-8 h-8" />
                </div>
                <div>
                  <p className="text-xs text-muted uppercase font-bold tracking-widest">Regional Fever</p>
                  <p className="font-bold text-xl">Rising Trend</p>
                </div>
              </div>
              <div className="glass p-8 rounded-3xl flex items-center gap-5">
                <div className="p-4 bg-accent/20 rounded-2xl">
                  <Brain className="text-accent w-8 h-8" />
                </div>
                <div>
                  <p className="text-xs text-muted uppercase font-bold tracking-widest">AI Accuracy</p>
                  <p className="font-bold text-xl">98.4% Optimized</p>
                </div>
              </div>
              <div className="glass p-8 rounded-3xl flex items-center gap-5">
                <div className="p-4 bg-blue-400/20 rounded-2xl">
                  <Wind className="text-blue-400 w-8 h-8" />
                </div>
                <div>
                  <p className="text-xs text-muted uppercase font-bold tracking-widest">Air Quality</p>
                  <p className="font-bold text-xl">Moderate (142)</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBooking && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="glass max-w-lg w-full rounded-[3rem] p-10 border border-white/10"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold">Complete Booking</h3>
                <button onClick={() => setShowBooking(false)} className="text-muted hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-muted mb-8">Confirming appointment with <span className="text-white font-bold">{result.specialist}</span> at {result.hospital}.</p>
              
              <form onSubmit={handleBooking} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-primary uppercase tracking-widest mb-2">Full Name</label>
                  <input 
                    required
                    type="text" 
                    className="contact-input w-full rounded-2xl" 
                    placeholder="Enter your name"
                    value={bookingDetails.name}
                    onChange={(e) => setBookingDetails({...bookingDetails, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-primary uppercase tracking-widest mb-2">Phone Number</label>
                  <input 
                    required
                    type="tel" 
                    className="contact-input w-full rounded-2xl" 
                    placeholder="+91 XXXXX XXXXX"
                    value={bookingDetails.phone}
                    onChange={(e) => setBookingDetails({...bookingDetails, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-primary uppercase tracking-widest mb-2">Email Address</label>
                  <input 
                    type="email" 
                    className="contact-input w-full rounded-2xl" 
                    placeholder="name@example.com"
                    value={bookingDetails.email}
                    onChange={(e) => setBookingDetails({...bookingDetails, email: e.target.value})}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-full justify-center py-4 rounded-2xl text-lg mt-8 shadow-2xl shadow-primary/30">
                  Confirm Appointment
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DiseaseTracker;
