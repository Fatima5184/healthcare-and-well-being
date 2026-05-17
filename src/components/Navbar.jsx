import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Menu, X, ShoppingCart, Activity, FileText, MapPin, BookOpen, User, AlertCircle, Globe, Bell, ChevronDown, Smile, Bot } from 'lucide-react';
import { useHealth } from '../context/HealthContext';
import { translations } from '../data/translations';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const location = useLocation();
  const { state, dispatch } = useHealth();
  const t = translations[state.language || 'en'];

  const languages = [
    { code: 'en', name: 'English', flag: 'EN' },
    { code: 'hi', name: 'हिन्दी', flag: 'HI' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: 'KN' }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const handleClickOutside = (e) => {
      if (!e.target.closest('.nav-container') && !e.target.closest('.glass')) {
        setShowNotifications(false);
        setShowLanguageDropdown(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinks = [
    { name: t.pharmacy, path: '/pharmacy', icon: <ShoppingCart className="w-4 h-4" /> },
    { name: t.records, path: '/records', icon: <FileText className="w-4 h-4" /> },
    { name: t.tracker, path: '/tracker', icon: <Activity className="w-4 h-4" /> },
    { name: t.hospitals, path: '/hospitals', icon: <MapPin className="w-4 h-4" /> },
    { name: t.awareness, path: '/awareness', icon: <BookOpen className="w-4 h-4" /> },
    { name: t.wellnessAi, path: '/wellness-ai', icon: <Smile className="w-4 h-4" /> },
    { name: t.doctors, path: '/doctors', icon: <User className="w-4 h-4" /> }
  ];

  return (
    <>
    {state.isEmergency && (
      <div className="emergency-banner no-print">
        <div className="container flex justify-between items-center h-12">
          <p className="flex items-center gap-2 font-bold animate-pulse text-sm">
            <AlertCircle className="w-4 h-4" /> {t.emergencyMode}
          </p>
          <button className="text-[10px] uppercase tracking-widest font-black bg-white text-red-600 px-3 py-1 rounded-full" onClick={() => dispatch({ type: 'TOGGLE_EMERGENCY' })}>
            {t.deactivate}
          </button>
        </div>
      </div>
    )}
    <nav className={`nav-fixed ${state.isEmergency ? 'emergency-nav' : ''} ${isScrolled || location.pathname !== '/' ? 'nav-scrolled' : 'nav-transparent'}`}>
      <div className="container nav-container px-4 md:px-8">
        <Link to="/" className="nav-logo shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
          <div className={`p-1.5 md:p-2 bg-primary rounded-xl flex items-center justify-center ${state.isEmergency ? 'bg-red-500' : 'pulse-animation'}`}>
            <Heart className="text-white w-5 h-5 md:w-6 md:h-6" />
          </div>
          <span className="text-xl md:text-2xl font-bold tracking-tight">Vitalis</span>
        </Link>

        {/* Desktop Menu */}
        <div className="flex items-center gap-6">
          <div className="nav-links">
            {navLinks.map(link => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`nav-link px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:bg-white/5 ${location.pathname === link.path ? 'text-primary bg-primary/10' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-1 border-l border-white/10 pl-6 ml-2">
            <Link to="/pharmacy" className="relative p-2 hover:bg-white/5 rounded-full transition-colors group">
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {state.cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                  {state.cart.length}
                </span>
              )}
            </Link>

            <div className="relative">
              <button 
                className="p-2 hover:bg-white/5 rounded-full transition-colors relative group"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-bg"></span>
              </button>
              
              <AnimatePresence>
                {showNotifications && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-4 w-72 glass rounded-3xl p-5 shadow-2xl border border-white/10 z-[200]"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-sm">{t.notifications}</h4>
                      <span className="text-[9px] text-primary font-bold uppercase tracking-wider">{t.new}</span>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                        <p className="text-[11px] font-bold mb-1">{t.healthUpdate}</p>
                        <p className="text-[10px] text-muted leading-relaxed">{t.heartRateAnalysis}</p>
                      </div>
                      <div className="p-3 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                        <p className="text-[11px] font-bold mb-1">{t.pharmacy}</p>
                        <p className="text-[10px] text-muted leading-relaxed">{t.orderProcessed}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <button 
                className="hidden xl:flex p-2 hover:bg-white/5 rounded-full transition-colors text-muted hover:text-white items-center gap-1.5"
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              >
                <Globe className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase">{state.language || 'en'}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showLanguageDropdown && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-4 w-36 glass rounded-2xl p-2 shadow-2xl border border-white/10 z-[200]"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${state.language === lang.code ? 'bg-primary text-white' : 'hover:bg-white/5 text-muted hover:text-white'}`}
                        onClick={() => {
                          dispatch({ type: 'SET_LANGUAGE', payload: lang.code });
                          setShowLanguageDropdown(false);
                        }}
                      >
                        <span>{lang.name}</span>
                        <span className="text-[9px] opacity-50 font-bold">{lang.flag}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/tracker" className="btn btn-primary px-5 py-2 text-xs ml-3 hidden lg:flex rounded-full">
              {t.getStarted}
            </Link>
          </div>
        </div>
        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <Link to="/pharmacy" className="relative p-2">
            <ShoppingCart className="w-5 h-5" />
            {state.cart.length > 0 && <span className="absolute top-0 right-0 bg-primary w-2 h-2 rounded-full"></span>}
          </Link>
          <button className="nav-mobile-toggle text-text" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-menu glass-dark overflow-hidden lg:hidden"
          >
            <div className="flex flex-col gap-1 p-2">
              {navLinks.map(link => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={`flex items-center gap-4 p-4 rounded-2xl text-sm font-semibold transition-all ${location.pathname === link.path ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted hover:bg-white/5 hover:text-white'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className={`p-2 rounded-xl ${location.pathname === link.path ? 'bg-white/20' : 'bg-primary/10 text-primary'}`}>
                    {link.icon}
                  </div>
                  {link.name}
                </Link>
              ))}
              
              <div className="h-px bg-white/10 my-4 mx-4"></div>
              
              <div className="px-4 pb-4">
                <p className="text-[10px] uppercase font-black tracking-widest text-muted mb-4 px-2">{t.selectLanguage}</p>
                <div className="grid grid-cols-3 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all ${state.language === lang.code ? 'bg-primary text-white' : 'bg-white/5 text-muted hover:text-white'}`}
                      onClick={() => {
                        dispatch({ type: 'SET_LANGUAGE', payload: lang.code });
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <span className="text-xs font-bold">{lang.flag}</span>
                      <span className="text-[9px] font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Link 
                to="/tracker" 
                className="btn btn-primary w-full justify-center py-4 rounded-2xl text-sm mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.getStarted}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    </>
  );
};

export default Navbar;
