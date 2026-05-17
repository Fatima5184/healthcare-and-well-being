import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Landmark, ArrowUpRight } from 'lucide-react';
import { useHealth } from '../context/HealthContext';
import { translations } from '../data/translations';

const ImpactSectors = () => {
  const { state } = useHealth();
  const t = translations[state.language || 'en'];

  const sectors = [
    {
      title: t.sectorEdu,
      subtitle: t.sectorEduSubtitle,
      description: t.sectorEduDesc,
      icon: <GraduationCap className="w-12 h-12" />,
      opportunities: state.language === 'en' ? ["E-learning Platforms", "Skill Portals", "Mentorship Networks"] : (state.language === 'hi' ? ["ई-लर्निंग प्लेटफॉर्म", "कौशल पोर्टल", "मेंटरशिप नेटवर्क"] : ["ಇ-ಲರ್ನಿಂಗ್ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ಗಳು", "ಕೌಶಲ್ಯ ಪೋರ್ಟಲ್‌ಗಳು", "ಮಾರ್ಗದರ್ಶನ ನೆಟ್‌ವರ್ಕ್‌ಗಳು"]),
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: t.sectorGov,
      subtitle: t.sectorGovSubtitle,
      description: t.sectorGovDesc,
      icon: <Landmark className="w-12 h-12" />,
      opportunities: state.language === 'en' ? ["Grievance Platforms", "Service Tracking", "Citizen Feedback"] : (state.language === 'hi' ? ["शिकायत प्लेटफॉर्म", "सेवा ट्रैकिंग", "नागरिक प्रतिक्रिया"] : ["ದೂರು ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ಗಳು", "ಸೇವಾ ಟ್ರ್ಯಾಕಿಂಗ್", "ನಾಗರಿಕ ಪ್ರತಿಕ್ರಿಯೆ"]),
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
    }
  ];
  return (
    <section id="impact" className="impact-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t.beyondHealth.split(' ')[0]} <span className="gradient-text">{t.beyondHealth.split(' ')[1]}</span></h2>
          <p className="section-subtitle">{t.beyondHealthSubtitle}</p>
        </div>

        <div className="flex flex-col gap-12">
          {sectors.map((sector, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`sector-card glass ${index % 2 === 1 ? 'reverse' : ''}`}
            >
              <div className="sector-info">
                <div className="sector-icon">{sector.icon}</div>
                <h4 className="sector-subtitle">{sector.subtitle}</h4>
                <h3 className="sector-title">{sector.title}</h3>
                <p className="sector-desc">{sector.description}</p>
                
                <div className="opportunities-list">
                  {sector.opportunities.map((opp, i) => (
                    <span key={i} className="opp-tag">{opp}</span>
                  ))}
                </div>
                
                <button 
                  className="btn btn-outline mt-6"
                  onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                >
                  {t.exploreSector} <ArrowUpRight className="w-4 h-4 ml-2" />
                </button>
              </div>
              
              <div className="sector-image">
                <img src={sector.image} alt={sector.title} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSectors;
