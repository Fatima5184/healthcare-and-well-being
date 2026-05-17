import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { User, Phone, MapPin, Star, ShieldCheck, Clock, Search, Heart, Activity, Eye, Brain } from 'lucide-react';
import { useHealth } from '../context/HealthContext';
import { translations } from '../data/translations';

const doctorsData = [
  {
    name: "Dr. Arif Chest And Allergy Clinic",
    specialty: "General Physician",
    phone: "07383475242",
    rating: 4.8,
    experience: "15+ Years",
    location: "Gulbarga",
    type: "General Physician"
  },
  {
    name: "Dr Vinod Ban",
    specialty: "General Physician",
    phone: "08128909699",
    rating: 4.9,
    experience: "12+ Years",
    location: "Gulbarga",
    type: "General Physician"
  },
  {
    name: "Sajjanshetty Heart & Diabetes Centre",
    specialty: "General Physician",
    phone: "08460528135",
    rating: 4.7,
    experience: "20+ Years",
    location: "Gulbarga",
    type: "General Physician"
  },
  {
    name: "Mohanraj Multispeciality Hospital",
    specialty: "General Physician",
    phone: "08123751006",
    rating: 4.6,
    experience: "18+ Years",
    location: "Gulbarga",
    type: "General Physician"
  },
  {
    name: "Dr M S Upase Memorial Hospital",
    specialty: "General Physician",
    phone: "08460305669",
    rating: 4.8,
    experience: "25+ Years",
    location: "Gulbarga",
    type: "General Physician"
  },
  {
    name: "Axon Hospital",
    specialty: "General Physician",
    phone: "07795654237",
    rating: 4.5,
    experience: "10+ Years",
    location: "Gulbarga",
    type: "General Physician"
  },
  {
    name: "Sharan Hospital",
    specialty: "General Physician",
    phone: "09972934689",
    rating: 4.7,
    experience: "14+ Years",
    location: "Gulbarga",
    type: "General Physician"
  },
  {
    name: "Basava Hospital",
    specialty: "General Physician",
    phone: "08147468309",
    rating: 4.6,
    experience: "16+ Years",
    location: "Gulbarga",
    type: "General Physician"
  },
  {
    name: "Ustad Kidney Care and Multi Speciality Hospital",
    specialty: "General Physician",
    phone: "08460437495",
    rating: 4.9,
    experience: "22+ Years",
    location: "Gulbarga",
    type: "General Physician"
  },
  {
    name: "Dr. Khadeera Quazi",
    specialty: "General Physician",
    phone: "09724366172",
    rating: 4.8,
    experience: "13+ Years",
    location: "Gulbarga",
    type: "General Physician"
  },
  {
    name: "Dr. Akshay Chincholli",
    specialty: "Cardiologist",
    phone: "07942676633",
    rating: 4.9,
    experience: "14+ Years",
    location: "Gulbarga",
    type: "Heart Specialist"
  },
  {
    name: "Mind Care Clinic",
    specialty: "Psychiatrist",
    phone: "08472251000",
    rating: 4.8,
    experience: "15+ Years",
    location: "Gulbarga",
    type: "Mental Health"
  },
  {
    name: "Dr. Prashanth Mental Health Centre",
    specialty: "Psychologist",
    phone: "08472223456",
    rating: 4.7,
    experience: "10+ Years",
    location: "Gulbarga",
    type: "Mental Health"
  },
  {
    name: "Dr. Jagadish Patil",
    specialty: "Cardiologist",
    phone: "07942676633",
    rating: 4.8,
    experience: "15+ Years",
    location: "Manur Multispeciality Hospital",
    type: "Heart Specialist"
  },
  {
    name: "Haridas Heart Hospital",
    specialty: "Cardiac Care Center",
    phone: "08123810870",
    rating: 4.7,
    experience: "20+ Years",
    location: "Super Market Road",
    type: "Heart Specialist"
  },
  {
    name: "Sharan Heart Care",
    specialty: "Cardiologist",
    phone: "09972934689",
    rating: 4.6,
    experience: "18+ Years",
    location: "Station Road",
    type: "Heart Specialist"
  },
  {
    name: "Mohanraj Cardiac Unit",
    specialty: "Cardiologist",
    phone: "08123751006",
    rating: 4.5,
    experience: "14+ Years",
    location: "Brahmapura",
    type: "Heart Specialist"
  },
  {
    name: "Vedanta Heart Care",
    specialty: "Cardiologist",
    phone: "09724366172",
    rating: 4.7,
    experience: "10+ Years",
    location: "Msk Mill",
    type: "Heart Specialist"
  },
  {
    name: "AL Furqan Cardiac Center",
    specialty: "Cardiologist",
    phone: "08128855952",
    rating: 4.4,
    experience: "12+ Years",
    location: "Gulbarga Market",
    type: "Heart Specialist"
  },
  {
    name: "Star Care Cardiac Wing",
    specialty: "Cardiologist",
    phone: "07947126993",
    rating: 4.8,
    experience: "16+ Years",
    location: "Sedam Road",
    type: "Heart Specialist"
  },
  {
    name: "Sunrise Heart Hospital",
    specialty: "Cardiologist",
    phone: "07947104306",
    rating: 4.6,
    experience: "15+ Years",
    location: "Vasant Nagar",
    type: "Heart Specialist"
  },
  {
    name: "Ved Multispeciality Heart Care",
    specialty: "Cardiologist",
    phone: "08511683237",
    rating: 4.5,
    experience: "13+ Years",
    location: "Sedam Road",
    type: "Heart Specialist"
  },
  {
    name: "Pastapur Heart Clinic",
    specialty: "Cardiologist",
    phone: "07411845995",
    rating: 4.7,
    experience: "11+ Years",
    location: "Jewargi Cross",
    type: "Heart Specialist"
  },
  {
    name: "Dr. Anugraha",
    specialty: "Ophthalmologist",
    phone: "08147200600",
    rating: 4.9,
    experience: "18+ Years",
    location: "Anugraha Eye Hospital",
    type: "Eye Surgeon"
  },
  {
    name: "Dr. Moizuddin",
    specialty: "Ophthalmologist",
    phone: "08472200026",
    rating: 4.8,
    experience: "15+ Years",
    location: "MM Eye Hospital",
    type: "Eye Surgeon"
  },
  {
    name: "Dr. Kothari",
    specialty: "Ophthalmologist",
    phone: "08472266491",
    rating: 4.7,
    experience: "22+ Years",
    location: "Kothari Eye Care Centre",
    type: "Eye Surgeon"
  },
  {
    name: "Dr. Netrajyothi",
    specialty: "Ophthalmologist",
    phone: "09448326356",
    rating: 4.8,
    experience: "14+ Years",
    location: "Netrajyothi Eye Hospital",
    type: "Eye Surgeon"
  },
  {
    name: "Dr. Shivshankrappa Nandyal",
    specialty: "Ophthalmologist",
    phone: "08472272816",
    rating: 4.9,
    experience: "25+ Years",
    location: "Sri Shivshankrappa Nandyal Eye Care",
    type: "Eye Surgeon"
  },
  {
    name: "Dr. Drishti",
    specialty: "Ophthalmologist",
    phone: "07899328915",
    rating: 4.6,
    experience: "10+ Years",
    location: "Drishti Eye Hospital",
    type: "Eye Surgeon"
  },
  {
    name: "Dr. Sourabh Shah",
    specialty: "Ophthalmologist",
    phone: "09632602090",
    rating: 4.7,
    experience: "12+ Years",
    location: "Kamal Eye Hospital",
    type: "Eye Surgeon"
  },
  {
    name: "Dr. Sajjanshetty",
    specialty: "Ophthalmologist",
    phone: "08660709092",
    rating: 4.8,
    experience: "20+ Years",
    location: "Sajjanshetty Super Speciality Eye Care",
    type: "Eye Surgeon"
  },
  {
    name: "Dr. Chincholi",
    specialty: "Ophthalmologist",
    phone: "08472229568",
    rating: 4.7,
    experience: "28+ Years",
    location: "Chincholi Eye Hospital",
    type: "Eye Surgeon"
  },
  {
    name: "Dr. Sidrameshwar",
    specialty: "Ophthalmologist",
    phone: "07209626262",
    rating: 4.9,
    experience: "16+ Years",
    location: "Sri Sidrameshwar Eye Hospital",
    type: "Eye Surgeon"
  }
];

const Doctors = () => {
  const { state } = useHealth();
  const t = translations[state.language || 'en'];
  const [filter, setFilter] = useState('All');
  const location = useLocation();

  useEffect(() => {
    if (location.state?.filter) {
      setFilter(location.state.filter);
    }
  }, [location.state]);

  const filteredDoctors = filter === 'All' 
    ? doctorsData 
    : doctorsData.filter(d => d.type === filter);

  return (
    <div className="doctors-page pt-32 pb-20 min-h-screen">
      <div className="container">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="badge mx-auto mb-4"
          >
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>{t.verifiedPros}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            {t.doctorsTitle.split(' ').slice(0, -2).join(' ')} <span className="gradient-text">{t.doctorsTitle.split(' ').slice(-2).join(' ')}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted text-lg max-w-2xl mx-auto mb-10"
          >
            {t.doctorsSubtitle}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {[
              { id: 'All', label: t.filterAll },
              { id: 'General Physician', label: t.filterGP },
              { id: 'Heart Specialist', label: t.filterHeart },
              { id: 'Eye Surgeon', label: t.filterEye },
              { id: 'Mental Health', label: t.filterMental }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setFilter(type.id)}
                className={`px-8 py-3 rounded-full font-bold transition-all duration-300 ${
                  filter === type.id 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' 
                  : 'glass text-muted hover:text-white'
                }`}
              >
                {type.id === 'Heart Specialist' && <Heart className="w-4 h-4 inline-block mr-2" />}
                {type.id === 'General Physician' && <Activity className="w-4 h-4 inline-block mr-2" />}
                {type.id === 'Eye Surgeon' && <Eye className="w-4 h-4 inline-block mr-2" />}
                {type.id === 'Mental Health' && <Brain className="w-4 h-4 inline-block mr-2" />}
                {type.label}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div 
          layout
          className="doctors-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredDoctors.map((doctor, index) => (
              <motion.div
                key={doctor.name + index}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="glass p-8 rounded-[2.5rem] relative group hover:border-primary/50 transition-all duration-500"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors">
                    {doctor.type === 'Heart Specialist' ? (
                      <Heart className="w-8 h-8 text-primary" />
                    ) : doctor.type === 'Eye Surgeon' ? (
                      <Eye className="w-8 h-8 text-primary" />
                    ) : (
                      <User className="w-8 h-8 text-primary" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    <span className="text-sm font-bold">{doctor.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{doctor.name}</h3>
                <div className="flex items-center gap-2 mb-6">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full border border-primary/20 uppercase tracking-widest">
                    {doctor.type}
                  </span>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-muted">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{doctor.experience} {t.experience}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{doctor.location}</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-muted">{t.contactInfo}</span>
                    <a href={`tel:${doctor.phone}`} className="text-lg font-bold flex items-center gap-2 text-white hover:text-primary transition-colors">
                      <Phone className="w-4 h-4" />
                      {doctor.phone}
                    </a>
                  </div>
                  <button className="p-3 bg-white/5 rounded-xl hover:bg-primary hover:text-white transition-all group-hover:translate-x-1">
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Doctors;
