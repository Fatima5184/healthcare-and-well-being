import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useHealth } from '../context/HealthContext';
import { 
  Phone, 
  FileText, 
  BarChart3, 
  Search, 
  Brain, 
  Megaphone,
  ArrowRight 
} from 'lucide-react';
import { translations } from '../data/translations';

const ServiceGrid = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useHealth();
  const t = translations[state.language || 'en'];

  const services = [
    {
      title: t.serviceTele,
      description: t.serviceTeleDesc,
      icon: <Phone className="w-6 h-6" />,
      color: "#10b981",
      path: "/pharmacy"
    },
    {
      title: t.serviceRecords,
      description: t.serviceRecordsDesc,
      icon: <FileText className="w-6 h-6" />,
      color: "#3b82f6",
      path: "/records"
    },
    {
      title: t.serviceTracker,
      description: t.serviceTrackerDesc,
      icon: <BarChart3 className="w-6 h-6" />,
      color: "#8b5cf6",
      path: "/tracker"
    },
    {
      title: t.serviceHospitals,
      description: t.serviceHospitalsDesc,
      icon: <Search className="w-6 h-6" />,
      color: "#f59e0b",
      path: "/hospitals"
    },
    {
      title: t.serviceMental,
      description: t.serviceMentalDesc,
      icon: <Brain className="w-6 h-6" />,
      color: "#ec4899",
      path: "/mental-health"
    },
    {
      title: t.serviceAwareness,
      description: t.serviceAwarenessDesc,
      icon: <Megaphone className="w-6 h-6" />,
      color: "#14b8a6",
      path: "/awareness"
    }
  ];

  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t.ecosystemTitle.split(' ')[0]} <span className="gradient-text">{t.ecosystemTitle.split(' ')[1]}</span></h2>
          <p className="section-subtitle">{t.ecosystemSubtitle}</p>
        </div>

        <div className="grid grid-3">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`service-card glass ${service.title === "Mental Health Support" ? 'mental-health' : ''}`}
              onClick={() => navigate(service.path)}
            >
              <div 
                className="icon-wrapper" 
                style={{ backgroundColor: `${service.color}20`, color: service.color }}
              >
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <button className="learn-more-link">
                {t.exploreModule} <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceGrid;
