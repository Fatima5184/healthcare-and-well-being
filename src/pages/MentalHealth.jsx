import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Smile, 
  Activity, 
  MessageCircle, 
  Send, 
  X, 
  Heart, 
  ShieldCheck, 
  Wind,
  Moon,
  Sun,
  Coffee
} from 'lucide-react';
import { useHealth } from '../context/HealthContext';
import { translations } from '../data/translations';

const MentalHealth = () => {
  const { state } = useHealth();
  const t = translations[state.language || 'en'];
  const [messages, setMessages] = useState([
    { text: t.botInitial, isBot: true }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);
  const [showEmergency, setShowEmergency] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    const newMsg = { text: userMsg, isBot: false };
    setMessages(prev => [...prev, newMsg]);
    setInput('');

    setTimeout(() => {
      let response = "I hear you. Taking a moment to reflect on your feelings is a great first step. Would you like to try a guided breathing exercise?";
      const lowerInput = userMsg.toLowerCase();

      if (lowerInput.includes('yes') || lowerInput.includes('ready') || lowerInput.includes('sure') || lowerInput.includes('ok')) {
        response = "Great! Let's start with a simple Box Breathing exercise. Inhale slowly for 4 seconds... I'll guide you. (Click 'Box Breathing' on the right to begin the visual guide)";
      } else if (lowerInput.includes('low') || lowerInput.includes('sad') || lowerInput.includes('depressed') || lowerInput.includes('bad')) {
        response = "I'm sorry to hear you're feeling low. It takes strength to acknowledge that. Remember, feelings are like clouds—they pass. Shall we try a quick 'Positive Affirmation' to shift the energy slightly?";
      } else if (lowerInput.includes('stress') || lowerInput.includes('anxious') || lowerInput.includes('panic')) {
        response = "I can feel that you're going through a lot. Let's try the 'Grounding 5-4-3-2-1' exercise. It's very effective for bringing your focus back to the present moment. Ready?";
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        response = "Hello! I'm here to support your mental well-being. How has your day been so far?";
      } else if (lowerInput.includes('thank')) {
        response = "You're very welcome. I'm glad I could be here for you. Is there anything else you'd like to explore or talk about?";
      }
      
      setMessages(prev => [...prev, { text: response, isBot: true }]);
    }, 1000);
  };

  const exercises = [
    { title: t.boxBreathing, desc: t.boxBreathingDesc, icon: <Wind className="text-blue-400" />, color: "bg-blue-500/10" },
    { title: t.grounding, desc: t.groundingDesc, icon: <Activity className="text-green-400" />, color: "bg-green-500/10" },
    { title: t.sleepMeditation, desc: t.sleepMeditationDesc, icon: <Moon className="text-purple-400" />, color: "bg-purple-500/10" },
    { title: t.affirmations, desc: t.affirmationsDesc, icon: <Sun className="text-yellow-400" />, color: "bg-yellow-500/10" }
  ];

  const hotlines = [
    { name: "Vandrevala Foundation", contact: "9999 666 555", info: "24/7 Helpline" },
    { name: "iCall (TISS)", contact: "9152987821", info: "Mon-Sat, 10am-8pm" },
    { name: "AASRA", contact: "9820466726", info: "24/7 Crisis Support" },
    { name: "KIRAN (Govt)", contact: "1800-599-0019", info: "24/7 Mental Health" }
  ];

  return (
    <div className="mental-health-page pt-32 pb-20 min-h-screen">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          
          {/* AI Chatbot Side */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass rounded-[3rem] overflow-hidden flex flex-col h-[700px] border border-white/10 shadow-2xl"
          >
            <div className="p-8 bg-primary/20 border-b border-white/10 flex items-center gap-4">
              <div className="p-3 bg-primary/20 rounded-2xl">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{t.mentalHealthTitle.split(' ').slice(0, -1).join(' ')} <span className="gradient-text">{t.mentalHealthTitle.split(' ').slice(-1)}</span></h2>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs font-bold text-muted uppercase tracking-wider">{t.listening}</span>
                </div>
              </div>
            </div>

            <div ref={scrollRef} className="flex-grow overflow-y-auto p-8 space-y-6">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[85%] p-5 rounded-[2rem] text-sm leading-relaxed shadow-xl ${
                    msg.isBot ? 'bg-white/5 border border-white/5 text-text' : 'bg-primary text-white'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-8 border-t border-white/10 bg-white/5">
              <div className="flex gap-4">
                <input 
                  type="text" 
                  placeholder={t.chatPlaceholder} 
                  className="contact-input py-4 px-6 text-lg"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button 
                  className="btn btn-primary px-8"
                  onClick={handleSend}
                >
                  <Send className="w-6 h-6" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Wellness Exercises Side */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass p-10 rounded-[3rem]"
            >
              <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Smile className="text-primary w-8 h-8" /> {t.wellnessExercises.split(' ')[0]} <span className="gradient-text">{t.wellnessExercises.split(' ')[1]}</span>
              </h3>
              <div className="grid gap-6">
                {exercises.map((ex, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className={`p-6 rounded-3xl border border-white/5 flex items-center gap-6 cursor-pointer hover:bg-white/5 transition-all`}
                    onClick={() => setMessages(prev => [...prev, { text: `Let's start ${ex.title}: ${ex.desc}`, isBot: true }])}
                  >
                    <div className={`p-4 rounded-2xl ${ex.color}`}>
                      {ex.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{ex.title}</h4>
                      <p className="text-sm text-muted">{ex.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-8 glass rounded-[3rem] border-l-4 border-primary"
            >
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" /> {t.professionalSupport}
              </h4>
              <p className="text-muted text-sm leading-relaxed mb-6">
                {t.crisisNotice}
              </p>
              <div className="flex gap-4">
                <button 
                  className="text-primary font-bold text-sm hover:underline"
                  onClick={() => navigate('/doctors', { state: { filter: 'Mental Health' } })}
                >
                  {t.findCounselors}
                </button>
                <span className="text-muted">|</span>
                <button 
                  className="text-red-400 font-bold text-sm hover:underline"
                  onClick={() => setShowEmergency(true)}
                >
                  {t.emergencyHotlines}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showEmergency && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="sos-overlay fixed inset-0 bg-black/60 backdrop-blur-md z-[200]"
              onClick={() => setShowEmergency(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, x: '-50%', y: '-50%' }}
              animate={{ scale: 1, opacity: 1, x: '-50%', y: '-50%' }}
              exit={{ scale: 0.9, opacity: 0, x: '-50%', y: '-50%' }}
              className="glass p-8 fixed top-1/2 left-1/2 w-[90%] max-w-md z-[201] rounded-[2.5rem]"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-red-500">{t.emergencyHotlines}</h2>
                <button onClick={() => setShowEmergency(false)} className="p-2 hover:bg-white/10 rounded-full"><X /></button>
              </div>
              <div className="space-y-4">
                {hotlines.map((h, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <p className="font-bold text-lg">{h.name}</p>
                    <div className="flex justify-between items-center mt-1">
                      <a href={`tel:${h.contact}`} className="text-primary font-black text-xl">{h.contact}</a>
                      <span className="text-[10px] uppercase font-bold text-muted">{h.info}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MentalHealth;
