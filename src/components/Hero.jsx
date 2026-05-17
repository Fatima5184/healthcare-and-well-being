import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Shield, Users } from 'lucide-react';
import { useHealth } from '../context/HealthContext';
import { translations } from '../data/translations';
import heroBg from '../assets/hero-bg.png';

const Hero = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useHealth();
  const t = translations[state.language || 'en'];

  const scrollTo = (id) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-bg" style={{ backgroundImage: `url(${heroBg})` }}></div>
      <div className="hero-overlay"></div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="badge"
          >
            <Activity className="w-4 h-4 text-primary" />
            <span>{t.heroBadge}</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-title"
          >
            {t.heroTitle.split(t.heroTitleSpan)[0]} <span className="gradient-text">{t.heroTitleSpan}</span> {t.heroTitle.split(t.heroTitleSpan)[1]}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hero-description"
          >
            {t.heroDescription}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="hero-actions"
          >
            <button 
              className="btn btn-primary" 
              onClick={() => scrollTo('services')}
            >
              {t.exploreSolutions} <ArrowRight className="w-4 h-4 ml-2" />
            </button>
            <button 
              className="btn btn-outline" 
              onClick={() => scrollTo('impact')}
            >
              {t.learnMore}
            </button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="hero-stats"
          >
            <div className="stat-item">
              <Shield className="w-5 h-5 text-secondary" />
              <span>{t.secureRecords}</span>
            </div>
            <Link to="/doctors" className="stat-item hover:scale-105 transition-transform cursor-pointer">
              <Users className="w-5 h-5 text-accent" />
              <span>{t.expertDoctors}</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
