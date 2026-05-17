import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Ambulance, Phone, Star, Clock, AlertTriangle, Activity, Search } from 'lucide-react';
import { useHealth } from '../context/HealthContext';
import { translations } from '../data/translations';

const hospitals = [
  { 
    id: 1, 
    name: 'K B N Hospital', 
    address: 'Aland Road, Kalaburagi',
    distance: '0.8 km', 
    time: '4 mins', 
    rating: 4.7, 
    specialist: 'General Surgery',
    phone: '+91 84722 56789',
    ambulance: '108',
    ambulanceAvailable: true,
    location: { x: 35, y: 45 } 
  },
  { 
    id: 2, 
    name: 'Q. P Multi Speciality Hospital', 
    address: 'Misbaha Colony, Kalaburagi',
    distance: '2.1 km', 
    time: '8 mins', 
    rating: 4.9, 
    specialist: 'Multi-Speciality',
    phone: '+91 84722 12345',
    ambulance: '+91 94481 23456',
    ambulanceAvailable: true,
    location: { x: 65, y: 25 } 
  },
  { 
    id: 3, 
    name: 'Amruta Sparsh Hospital', 
    address: 'Chamarajanagar Road, Kalaburagi',
    distance: '3.4 km', 
    time: '12 mins', 
    rating: 4.6, 
    specialist: 'Pediatrics',
    phone: '+91 84722 78901',
    ambulance: '+91 99000 11122',
    ambulanceAvailable: true,
    location: { x: 45, y: 75 } 
  },
  { 
    id: 4, 
    name: 'Jeevan Jyothi Hospital', 
    address: 'Shanti Nagar, Kalaburagi',
    distance: '4.2 km', 
    time: '15 mins', 
    rating: 4.8, 
    specialist: 'Critical Care',
    phone: '+91 84722 34567',
    ambulance: '+91 88888 77777',
    ambulanceAvailable: true,
    location: { x: 25, y: 35 } 
  },
  { 
    id: 5, 
    name: 'Sri Sidrameshwar Eye Hospital', 
    address: 'Shanti Nagar, Kalaburagi',
    distance: '4.5 km', 
    time: '18 mins', 
    rating: 4.9, 
    specialist: 'Ophthalmology',
    phone: '+91 84722 99999',
    ambulance: '108',
    ambulanceAvailable: false,
    location: { x: 85, y: 65 } 
  }
];

const HospitalFinder = () => {
  const { state } = useHealth();
  const t = translations[state.language || 'en'];
  const [selectedHospital, setSelectedHospital] = useState(hospitals[0]);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [patientCondition, setPatientCondition] = useState('');
  const [currentLocation, setCurrentLocation] = useState('Kalaburagi City Center');
  const [suggestedHospital, setSuggestedHospital] = useState(null);

  const handleConditionSubmit = (e) => {
    e.preventDefault();
    if (!patientCondition) return;
    
    const lowerCond = patientCondition.toLowerCase();
    let found = null;
    
    if (lowerCond.includes('eye') || lowerCond.includes('vision') || lowerCond.includes('blind') || lowerCond.includes('cataract')) {
      found = hospitals.find(h => h.id === 5);
    } else if (lowerCond.includes('child') || lowerCond.includes('baby') || lowerCond.includes('kid') || lowerCond.includes('pediatric')) {
      found = hospitals.find(h => h.id === 3);
    } else if (lowerCond.includes('chest') || lowerCond.includes('heart') || lowerCond.includes('cardiac') || lowerCond.includes('breath')) {
      found = hospitals.find(h => h.id === 4);
    } else if (lowerCond.includes('migraine') || lowerCond.includes('headache') || lowerCond.includes('brain') || lowerCond.includes('neuro')) {
      found = hospitals.find(h => h.id === 2);
    } else if (lowerCond.includes('surgery') || lowerCond.includes('fracture') || lowerCond.includes('bone')) {
      found = hospitals.find(h => h.id === 1);
    } else {
      found = hospitals.find(h => h.id === 2);
    }
    
    setSuggestedHospital(found);
    setSelectedHospital(found);
  };

  return (
    <div className="hospital-finder-page pt-32 pb-24 min-height-screen bg-[#050505]">
      <div className="container max-w-7xl px-8">
        
        {/* Very Spacious Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-12">
          <div className="max-w-3xl">
            <h1 className="text-7xl font-black mb-8 tracking-tighter leading-tight">
              {t.hospitalTitle.split(' ')[0]} <span className="gradient-text">{t.hospitalTitle.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-2xl text-muted font-light leading-relaxed">
              {t.hospitalSubtitle}
            </p>
          </div>
          <button 
            className={`btn py-8 px-12 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all flex items-center gap-6 ${emergencyMode ? 'bg-red-500 animate-pulse' : 'glass border-primary/20 text-primary hover:bg-primary/10'}`}
            onClick={() => setEmergencyMode(!emergencyMode)}
          >
            <Ambulance className="w-12 h-12" />
            <div className="text-left">
              <p className="text-xs font-black uppercase tracking-[0.3em] opacity-70 mb-1">{t.emergencyDispatch}</p>
              <p className="text-2xl font-black">{t.callAmbulance}</p>
            </div>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Information Side */}
          <div className="lg:w-2/5 space-y-12">
            {/* AI Search Box - Very Spacious */}
            <div className="glass p-12 rounded-[4rem] border-white/5 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 blur-[80px] group-hover:bg-primary/20 transition-all"></div>
              <h3 className="text-3xl font-bold mb-4">{t.discoveryAi}</h3>
              
              <div className="space-y-6 mb-10">
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-[0.3em] mb-3 block">{t.currentLocation}</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder={t.liveLocationPlaceholder} 
                      className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-5 text-lg focus:border-primary outline-none transition-all pr-16"
                      value={currentLocation}
                      onChange={(e) => setCurrentLocation(e.target.value)}
                    />
                    <MapPin className="absolute right-6 top-1/2 -translate-y-1/2 text-primary w-6 h-6" />
                  </div>
                </div>

                <form onSubmit={handleConditionSubmit}>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-[0.3em] mb-3 block">{t.trackerTitle}</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder={t.conditionPlaceholder} 
                      className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-5 text-lg focus:border-primary outline-none transition-all pr-16"
                      value={patientCondition}
                      onChange={(e) => setPatientCondition(e.target.value)}
                    />
                    <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-primary rounded-xl text-black">
                      <Search className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </div>

              <AnimatePresence>
                {suggestedHospital && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 bg-primary/10 rounded-[3rem] border-2 border-primary/30 shadow-[0_0_40px_rgba(16,185,129,0.1)]"
                  >
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">{t.recommendedCondition}</p>
                    <h4 className="text-3xl font-black mb-6">{suggestedHospital.name}</h4>
                    <div className="flex items-center gap-8">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted font-bold uppercase mb-1">Ambulance</span>
                        <a href={`tel:${suggestedHospital.ambulance}`} className="text-2xl font-black text-red-500 hover:scale-105 transition-transform inline-block">{suggestedHospital.ambulance}</a>
                      </div>
                      <div className="w-[1px] h-10 bg-white/10"></div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted font-bold uppercase mb-1">{t.hospitalCare}</span>
                        <a href={`tel:${suggestedHospital.phone}`} className="text-2xl font-black text-primary hover:scale-105 transition-transform inline-block">{suggestedHospital.phone}</a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Comprehensive Hospital List */}
            <div className="space-y-8 max-h-[700px] overflow-y-auto pr-6 custom-scrollbar">
              {hospitals.map(h => (
                <motion.div 
                  key={h.id}
                  whileHover={{ x: 15 }}
                  className={`p-10 rounded-[3.5rem] cursor-pointer transition-all border-2 ${selectedHospital.id === h.id ? 'bg-primary/5 border-primary shadow-[0_0_60px_rgba(16,185,129,0.15)]' : 'bg-white/[0.03] border-white/5 hover:border-white/10'}`}
                  onClick={() => setSelectedHospital(h)}
                >
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h4 className="font-bold text-3xl mb-2">{h.name}</h4>
                      <p className="text-muted flex items-center gap-2"><MapPin className="w-4 h-4" /> {h.address}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-black text-primary block">{h.distance}</span>
                      <span className="text-[10px] uppercase font-bold text-muted tracking-widest">{h.time} away</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-2 gap-6 pt-8 border-t border-white/5">
                    <div className="p-4 bg-white/5 rounded-3xl border border-white/5">
                      <p className="text-[10px] text-muted font-black uppercase tracking-widest mb-1">{t.hospitalCare}</p>
                      <a href={`tel:${h.phone}`} className="text-lg font-bold text-primary hover:text-primary/80 transition-colors flex items-center gap-2">
                        <Phone className="w-4 h-4" /> {h.phone}
                      </a>
                    </div>
                    <div className="p-4 bg-red-500/5 rounded-3xl border border-red-500/10">
                      <p className="text-[10px] text-red-400 font-black uppercase tracking-widest mb-1">{t.ambulanceSOS}</p>
                      <a href={`tel:${h.ambulance}`} className="text-lg font-bold text-red-500 hover:text-red-400 transition-colors flex items-center gap-2">
                        <Ambulance className="w-4 h-4" /> {h.ambulance}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Visualization Side */}
          <div className="lg:w-3/5">
            <div className="glass h-[950px] rounded-[5rem] relative overflow-hidden border-2 border-white/5 bg-slate-950 shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
              {/* Real Map Visuals - High Contrast */}
              <div className="absolute inset-0 opacity-[0.25] bg-[url('https://api.maptiler.com/maps/streets/static/auto/1200x950.png?key=get_your_own_key')] bg-cover bg-center">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950"></div>
              </div>
              
              {/* GPS Route Animation */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                <motion.path
                  id="gpsPath"
                  d={`M 150,700 C 300,600 400,500 ${selectedHospital.location.x * 10},${selectedHospital.location.y * 10}`}
                  stroke="#ef4444"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5 }}
                  className="drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]"
                />
                <motion.path
                  d={`M 150,700 C 300,600 400,500 ${selectedHospital.location.x * 10},${selectedHospital.location.y * 10}`}
                  stroke="#ffffff"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="12,20"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5 }}
                />

                {/* Moving Car Icon (GPS Style) */}
                <motion.g
                  initial={{ offsetDistance: "0%" }}
                  animate={{ offsetDistance: "100%" }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  style={{ offsetPath: `path('M 150,700 C 300,600 400,500 ${selectedHospital.location.x * 10},${selectedHospital.location.y * 10}')` }}
                >
                  <circle r="15" fill="#fff" className="shadow-2xl" />
                  <foreignObject x="-10" y="-10" width="20" height="20">
                    <Navigation className="text-primary w-5 h-5 rotate-45" fill="currentColor" />
                  </foreignObject>
                </motion.g>
              </svg>

              {/* Live Location Marker (GPS Blue Pulse) */}
              <div className="absolute left-[130px] bottom-[230px] z-20">
                <div className="relative">
                  <div className="absolute -inset-8 bg-blue-500/20 rounded-full animate-ping"></div>
                  <div className="absolute -inset-4 bg-blue-500/40 rounded-full animate-pulse"></div>
                  <div className="w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-[0_0_30px_rgba(59,130,246,1)] flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="absolute top-12 left-1/2 -translate-x-1/2 bg-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black text-white uppercase whitespace-nowrap border-2 border-white shadow-xl">{t.yourLocation}</span>
                </div>
              </div>

              {/* Destination Markers with Floating Labels */}
              {hospitals.map(h => (
                <motion.div
                  key={h.id}
                  className={`absolute cursor-pointer z-20 transition-all duration-500 ${selectedHospital.id === h.id ? 'scale-110' : 'opacity-40 hover:opacity-100'}`}
                  style={{ left: `${h.location.x}%`, top: `${h.location.y}%` }}
                  onClick={() => setSelectedHospital(h)}
                >
                  <div className="flex flex-col items-center">
                    <motion.div 
                      animate={selectedHospital.id === h.id ? { y: [0, -10, 0] } : {}}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className={`${selectedHospital.id === h.id ? 'bg-green-500 shadow-[0_0_30px_rgba(34,197,94,0.6)]' : 'bg-red-500'} p-4 rounded-full border-4 border-white`}
                    >
                      <MapPin className="w-8 h-8 text-white" fill="currentColor" />
                    </motion.div>
                    
                    {selectedHospital.id === h.id && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-4 glass-dark p-4 rounded-2xl border border-primary/30 shadow-2xl min-w-[180px] text-center"
                      >
                        <p className="font-black text-white text-lg">{h.name}</p>
                        <p className="text-primary font-bold text-sm tracking-widest">{h.distance} • {h.time}</p>
                        <div className="flex justify-center gap-2 mt-2">
                           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                           <span className="text-[10px] font-black uppercase text-green-500 tracking-tighter">{t.liveRouteActive}</span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Bottom Tracking Dashboard */}
              <div className="absolute bottom-12 left-12 right-12 z-30">
                <div className="glass-dark p-10 rounded-[4rem] border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-8">
                      <div className="p-6 bg-primary rounded-3xl shadow-xl shadow-primary/20">
                        <Navigation className="text-black w-10 h-10" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="flex h-3 w-3 rounded-full bg-red-500 animate-pulse"></span>
                          <p className="text-xs font-black text-muted uppercase tracking-[0.3em]">{t.gpsNavigation}</p>
                        </div>
                        <h3 className="text-5xl font-black tracking-tighter text-white">{selectedHospital.name}</h3>
                      </div>
                    </div>
                    
                    <div className="flex gap-12 bg-white/5 p-8 rounded-[3rem] border border-white/10">
                      <div className="text-center px-6 border-r border-white/10">
                        <p className="text-xs text-muted mb-2 font-black uppercase tracking-widest">{t.distance}</p>
                        <p className="text-5xl font-black text-primary">{selectedHospital.distance}</p>
                      </div>
                      <div className="text-center px-6">
                        <p className="text-xs text-muted mb-2 font-black uppercase tracking-widest">{t.eta}</p>
                        <p className="text-5xl font-black text-white">{selectedHospital.time}</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedHospital.name}+Kalaburagi`, '_blank')}
                      className="btn btn-primary py-8 px-12 rounded-[2.5rem] text-xl font-black shadow-2xl shadow-primary/20 flex items-center gap-4 hover:scale-105 transition-transform"
                    >
                      {t.startDrive} <Navigation className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

              {emergencyMode && (
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute top-12 right-12 glass p-10 rounded-[3.5rem] border-2 border-red-500 bg-red-500/10 max-w-sm shadow-[0_20px_50px_rgba(239,68,68,0.3)]"
                >
                  <div className="flex items-center gap-5 mb-6">
                    <AlertTriangle className="text-red-500 w-12 h-12 animate-pulse" />
                    <h3 className="text-2xl font-black text-red-500 tracking-tighter italic">{t.sosActive}</h3>
                  </div>
                  <p className="text-muted text-sm leading-relaxed mb-6 font-medium">{t.sosDesc}</p>
                  <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,1)]"
                      animate={{ width: '100%' }}
                      transition={{ duration: 180 }}
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
  );
};

export default HospitalFinder;
