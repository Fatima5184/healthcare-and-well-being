import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Shield, Heart, Zap, Play, ArrowRight, X, Clock, User, Share2 } from 'lucide-react';
import { useHealth } from '../context/HealthContext';
import { translations } from '../data/translations';

const articles = [
  {
    id: 1,
    title: 'Understanding Modern Preventive Healthcare',
    category: 'Guide',
    time: '5 min read',
    author: 'Dr. Sarah Wilson',
    icon: <Shield className="text-primary" />,
    image: 'https://images.unsplash.com/photo-1505751172107-573225a912b7?q=80&w=2070&auto=format&fit=crop',
    content: `
      Preventive healthcare consists of measures taken for disease prevention, as opposed to disease treatment. Just as health encompasses a variety of physical and mental states, so do disease and disability, which are affected by environmental factors, genetic predisposition, disease agents, and lifestyle choices.
      
      Health, disease, and disability are dynamic processes which begin before individuals realize they are affected. Disease prevention relies on anticipatory actions that can be categorized as primal, primary, secondary, and tertiary prevention.
      
      Key areas of focus include:
      - Regular check-ups and screenings
      - Healthy lifestyle choices (diet and exercise)
      - Immunizations and vaccinations
      - Stress management and mental well-being
    `
  },
  {
    id: 2,
    title: 'Mental Wellness in the Digital Age',
    category: 'Awareness',
    time: '8 min read',
    author: 'Marcus Chen',
    icon: <Heart className="text-pink-500" />,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2040&auto=format&fit=crop',
    content: `
      In an era dominated by screens and constant connectivity, maintaining mental wellness has become both more challenging and more critical than ever. The digital age brings with it unique stressors, from the "fear of missing out" (FOMO) to the pressures of social media comparison.
      
      Practical strategies for digital wellness:
      - Set boundaries for social media use
      - Practice "digital detox" periods
      - Use apps for mindfulness and meditation
      - Prioritize face-to-face interactions
      
      Remember that your digital life should complement, not replace, your physical and emotional experiences.
    `
  },
  {
    id: 3,
    title: 'First Aid Essentials for Emergencies',
    category: 'Skill',
    time: '12 min read',
    author: 'Elena Rodriguez',
    icon: <Zap className="text-yellow-400" />,
    image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=2070&auto=format&fit=crop',
    content: `
      Knowing basic first aid can be the difference between life and death in an emergency situation. This guide covers the essential skills everyone should know before professional medical help arrives.
      
      The ABCs of First Aid:
      1. Airway: Ensure the person's airway is clear.
      2. Breathing: Check if the person is breathing normally.
      3. Circulation: Check for signs of circulation (pulse) and control any major bleeding.
      
      Common emergencies addressed:
      - CPR techniques
      - Handling burns and wounds
      - Identifying signs of a heart attack or stroke
      - Choking response (Heimlich maneuver)
    `
  }
];

const videos = [
  {
    id: 1,
    title: 'Daily Yoga for Immunity',
    duration: '15:20',
    views: '12k',
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2040&auto=format&fit=crop',
    category: 'Wellness',
    embedUrl: 'https://www.youtube.com/embed/v7AYKMP6rOE'
  },
  {
    id: 2,
    title: 'Understanding Diabetes',
    duration: '08:45',
    views: '8.5k',
    thumbnail: 'https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=2070&auto=format&fit=crop',
    category: 'Education',
    embedUrl: 'https://www.youtube.com/embed/wZAjVQWbMlE'
  },
  {
    id: 3,
    title: 'Nutrition for Busy People',
    duration: '12:10',
    views: '20k',
    thumbnail: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070&auto=format&fit=crop',
    category: 'Diet',
    embedUrl: 'https://www.youtube.com/embed/c06dTj0v0sM'
  }
];

const ArticleModal = ({ article, onClose }) => {
  const { state } = useHealth();
  const t = translations[state.language || 'en'];
  if (!article) return null;
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="glass w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[2.5rem] relative"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 glass rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="overflow-y-auto max-h-[90vh]">
          <div className="h-[400px] relative">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <span className="px-4 py-1 glass rounded-full text-xs font-bold uppercase tracking-widest text-primary mb-4 inline-block">
                {article.category}
              </span>
              <h2 className="text-4xl font-bold">{article.title}</h2>
            </div>
          </div>

          <div className="p-12">
            <div className="flex flex-wrap gap-8 mb-8 border-b border-border pb-8">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{article.time}</span>
              </div>
              <button className="flex items-center gap-2 text-muted hover:text-primary transition-colors ml-auto">
                <Share2 className="w-5 h-5" />
                <span className="text-sm font-medium">{t.share}</span>
              </button>
            </div>

            <div className="prose prose-invert max-w-none">
              {article.content.split('\n').map((para, i) => (
                <p key={i} className="text-lg text-muted mb-6 leading-relaxed">
                  {para.trim()}
                </p>
              ))}
            </div>

            <div className="mt-12 p-8 glass rounded-3xl border border-primary/20 bg-primary/5">
              <h4 className="text-xl font-bold mb-4">{t.takeAction}</h4>
              <p className="text-muted mb-6">{t.takeActionDesc}</p>
              <button className="btn btn-primary" onClick={onClose}>{t.exploreResources}</button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const VideoModal = ({ video, onClose }) => {
  if (!video) return null;
  const embedUrl = video.embedUrl || 'https://www.youtube.com/embed/v7AYKMP6rOE';
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="w-full max-w-5xl aspect-video glass rounded-[2rem] overflow-hidden relative shadow-2xl shadow-primary/20 border border-white/10"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-[110] p-2 glass rounded-full hover:bg-white/10 transition-colors shadow-xl"
        >
          <X className="w-6 h-6 text-white" />
        </button>
        
        <iframe 
          width="100%" 
          height="100%" 
          src={`${embedUrl}?autoplay=1&modestbranding=1&rel=0`}
          title={video.title} 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </motion.div>
    </motion.div>
  );
};

const AwarenessHub = () => {
  const { state } = useHealth();
  const t = translations[state.language || 'en'];
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="awareness-page pt-24 min-height-screen pb-20">
      <div className="container">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            {t.awarenessTitle.split(' ').slice(0, -2).join(' ')} <span className="gradient-text">{t.awarenessTitle.split(' ').slice(-2).join(' ')}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted max-w-2xl mx-auto text-lg"
          >
            {t.awarenessSubtitle}
          </motion.p>
        </div>

        {/* Featured Guide Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="glass rounded-[3rem] p-8 md:p-12 mb-20 relative overflow-hidden group"
        >
          <div className="grid md-grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="p-2 bg-primary/20 rounded-xl"><BookOpen className="w-5 h-5 text-primary" /></span>
                <span className="text-sm font-bold uppercase tracking-widest text-primary">{t.masterclass}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.aiGuideTitle}</h2>
              <p className="text-muted text-lg mb-8 leading-relaxed">{t.aiGuideDesc}</p>
              <button 
                className="btn btn-primary"
                onClick={() => setSelectedVideo({ title: t.aiGuideTitle, embedUrl: 'https://www.youtube.com/embed/aircAruvnKk', thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop' })}
              >
                {t.watchFullGuide} <Play className="w-4 h-4 ml-2 fill-white" />
              </button>
            </div>
            <div 
              className="relative rounded-3xl overflow-hidden cursor-pointer aspect-video"
              onClick={() => setSelectedVideo({ title: 'Vitalis AI Guide', embedUrl: 'https://www.youtube.com/embed/aircAruvnKk', thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop' })}
            >
              <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop" alt="Guide" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl shadow-primary/40">
                  <Play className="w-8 h-8 fill-white" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Video Gallery Section */}
        <div className="mb-24">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h3 className="text-3xl font-bold mb-2">{t.healthVideos}</h3>
              <p className="text-muted">{t.expertAdvice}</p>
            </div>
            <button className="btn btn-outline btn-sm">{t.viewMore}</button>
          </div>
          <div className="grid grid-3">
            {videos.map((vid, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass rounded-3xl overflow-hidden cursor-pointer group"
                onClick={() => setSelectedVideo(vid)}
              >
                <div className="relative aspect-video">
                  <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 fill-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-1 glass text-[10px] font-bold rounded-lg">
                    {vid.duration}
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-2">{vid.category}</span>
                  <h4 className="text-lg font-bold mb-4">{vid.title}</h4>
                  <div className="flex items-center gap-4 text-xs text-muted">
                    <span className="flex items-center gap-1"><Play className="w-3 h-3" /> {vid.views} views</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Article Grid */}
        <div className="mb-24">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h3 className="text-3xl font-bold mb-2">{t.educationalResources}</h3>
              <p className="text-muted">{t.deepDives}</p>
            </div>
            <button className="btn btn-outline btn-sm">{t.viewAllLibrary}</button>
          </div>
          <div className="grid grid-3">
            {articles.map((art, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="article-card glass rounded-3xl overflow-hidden cursor-pointer group"
                onClick={() => setSelectedArticle(art)}
              >
                <div className="h-56 relative">
                  <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 p-3 glass rounded-2xl">
                    {art.icon}
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">{art.category}</span>
                    <span className="text-xs text-muted flex items-center gap-1"><Clock className="w-3 h-3" /> {art.time}</span>
                  </div>
                  <h4 className="text-xl font-bold mb-8 group-hover:text-primary transition-colors">{art.title}</h4>
                  <div className="flex items-center text-primary font-bold text-sm">
                    {t.readArticle} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Global Health Updates */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="glass p-12 rounded-[3rem] border-t-4 border-accent bg-accent/5 relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
            <div className="max-w-xl text-center md:text-left">
              <h3 className="text-3xl font-bold mb-4">{t.weeklyInsights}</h3>
              <p className="text-muted text-lg">{t.weeklyDesc}</p>
            </div>
            <div className="flex gap-4">
              <button className="btn btn-primary px-10">{t.subscribe}</button>
              <button className="btn btn-outline px-10">{t.pastInsights}</button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px] -mr-32 -mt-32" />
        </motion.div>

      </div>

      <AnimatePresence>
        {selectedArticle && (
          <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
        )}
        {selectedVideo && (
          <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AwarenessHub;
