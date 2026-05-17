import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import ServiceGrid from '../components/ServiceGrid';
import ImpactSectors from '../components/ImpactSectors';
import { useHealth } from '../context/HealthContext';
import { translations } from '../data/translations';

const Home = () => {
  const location = useLocation();
  const { state } = useHealth();
  const t = translations[state.language || 'en'];

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-page">
      <Hero />
      <div id="about">
        <ServiceGrid />
        <ImpactSectors />
      </div>
      
      <section className="cta-section">
        <div className="container">
          <div className="cta-card glass">
            <h2>{t.readyTitle.split(' ').slice(0, -1).join(' ')} <span className="gradient-text">{t.readyTitle.split(' ').slice(-1)}</span></h2>
            <p>{t.readySubtitle}</p>
            <div className="flex gap-4 mt-8 justify-center">
              <button 
                className="btn btn-primary" 
                onClick={() => scrollTo('about')}
              >
                {t.partnerWithUs}
              </button>
              <button className="btn btn-outline">{t.contactSales}</button>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t.getInTouch.split(' ').slice(0, -1).join(' ')} <span className="gradient-text">{t.getInTouch.split(' ').slice(-1)}</span></h2>
            <p className="section-subtitle">{t.questions}</p>
          </div>
          
          <div className="contact-grid glass p-8 rounded-3xl">
            <div className="flex flex-col gap-6">
              <input type="text" placeholder={t.yourName} className="contact-input" />
              <input type="email" placeholder={t.yourEmail} className="contact-input" />
              <textarea placeholder={t.yourMessage} className="contact-input h-32"></textarea>
              <button className="btn btn-primary w-full justify-center">{t.sendMessage}</button>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="grid grid-3">
            <div>
              <h3 className="mb-4">Vitalis</h3>
              <p className="text-muted">{t.heroBadge}</p>
            </div>
            <div>
              <h4 className="mb-4">{t.quickLinks}</h4>
              <ul className="footer-links">
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>{t.trackerTitle}</a></li>
                <li><a href="#impact" onClick={(e) => { e.preventDefault(); scrollTo('impact'); }}>{t.sectorEdu}</a></li>
                <li><a href="#impact" onClick={(e) => { e.preventDefault(); scrollTo('impact'); }}>{t.sectorGov}</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>{t.getInTouch}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">{t.followUs}</h4>
              <div className="flex gap-4">
                <a href="#" className="nav-link">Twitter</a>
                <a href="#" className="nav-link">LinkedIn</a>
                <a href="#" className="nav-link">Instagram</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Vitalis Ecosystem. {t.allRights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
