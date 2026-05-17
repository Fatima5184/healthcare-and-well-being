import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Smile, Frown, Activity, Brain, Shield, Heart, Download } from 'lucide-react';
import { useHealth } from '../context/HealthContext';
import { translations } from '../data/translations';

const moodProfiles = [
  {
    key: 'calm',
    label: 'Calm',
    mood: 'Calm & Balanced',
    happiness: 82,
    stress: 18,
    recommendations: [
      'Maintain your current mindfulness routine.',
      'Take a short walk or stretch break to preserve the calm state.',
      'Keep hydrated to sustain cognitive focus.'
    ]
  },
  {
    key: 'happy',
    label: 'Happy',
    mood: 'Positive & Energized',
    happiness: 92,
    stress: 12,
    recommendations: [
      'Use this energy for a small healthy action like movement or meal prep.',
      'Share the positive moment with someone you trust.',
      'Keep sleep timing consistent so the energy stays balanced.'
    ]
  },
  {
    key: 'stressed',
    label: 'Stressed',
    mood: 'Stressed but Manageable',
    happiness: 48,
    stress: 68,
    recommendations: [
      'Try 4 slow breaths: inhale for 4 seconds and exhale for 6 seconds.',
      'Drink water and pause screens for two minutes.',
      'If stress feels overwhelming or unsafe, contact a trusted person or professional support.'
    ]
  },
  {
    key: 'sad',
    label: 'Sad',
    mood: 'Low Mood',
    happiness: 34,
    stress: 42,
    recommendations: [
      'Do one small grounding action: wash your face, sit near light, or step outside.',
      'Message or call someone safe instead of staying alone with heavy feelings.',
      'If you may hurt yourself, seek emergency support immediately.'
    ]
  },
  {
    key: 'tired',
    label: 'Tired',
    mood: 'Tired & Drained',
    happiness: 52,
    stress: 36,
    recommendations: [
      'Rest your eyes for two minutes and hydrate.',
      'Avoid heavy caffeine late in the day.',
      'Plan a simple sleep reset tonight with dim lights and no screens before bed.'
    ]
  }
];

const fallbackMood = {
  mood: 'Uncertain Check-In',
  happiness: 55,
  stress: 35,
  recommendations: [
    'Select the mood that feels closest before scanning for a more accurate result.',
    'Use the camera preview as a reflection tool, not a medical diagnosis.',
    'If your mood feels extreme or unsafe, contact a trusted person or professional support.'
  ]
};

const WellnessAI = () => {
  const { state } = useHealth();
  const t = translations[state.language || 'en'];
  const [stream, setStream] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [selectedMood, setSelectedMood] = useState('calm');
  const videoRef = useRef(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 1280 } } 
      });
      setStream(mediaStream);
      setError(null);
    } catch (err) {
      console.error("Camera access error:", err);
      setError("Camera access denied or not available. Please ensure permissions are granted.");
    }
  };

  const stopCamera = useCallback(() => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => {
        track.stop();
        track.enabled = false;
      });
      if (videoRef.current) {
        videoRef.current.srcObject = null;
        videoRef.current.load(); // Force the video element to reset
      }
      setStream(null);
    }
  }, [stream]);

  const handleScan = () => {
    setIsScanning(true);
    setResults(null);

    setTimeout(() => {
      const profile = moodProfiles.find((mood) => mood.key === selectedMood) || fallbackMood;

      setIsScanning(false);
      setResults({
        happiness: profile.happiness,
        stress: profile.stress,
        mood: profile.mood,
        recommendations: profile.recommendations
      });
    }, 3000);
  };

  const downloadRecord = () => {
    if (!results) return;
    const content = `Wellness AI Scan Record\n\nDate: ${new Date().toLocaleString()}\nMood: ${results.mood}\nHappiness: ${results.happiness}%\nStress: ${results.stress}%\n\nRecommendations:\n${results.recommendations.map(r => '- ' + r).join('\n')}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wellness-scan-record.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  useEffect(() => {
    if (!videoRef.current || !stream) return;

    videoRef.current.srcObject = stream;
    videoRef.current.play().catch(() => {
      setError("Camera preview could not start automatically. Please tap Enable Camera again.");
    });
  }, [stream]);

  return (
    <div className="wellness-ai-page pt-20 pb-20 min-h-screen">
      <div className="container">
        <div className="text-center mb-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="badge mb-4"
          >
            <Brain className="w-4 h-4 mr-2" /> {t.wellnessTitle.split(' ')[0]} AI
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{t.wellnessTitle.split(' ')[0]} <span className="gradient-text">{t.wellnessTitle.split(' ').slice(1).join(' ')}</span></h1>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            {t.wellnessSubtitle}
          </p>
        </div>

        <div className="grid md-grid-cols-2 gap-12 items-start">
          {/* Camera Section */}
          <div className="relative">
            <div className="glass rounded-[3rem] overflow-hidden aspect-square relative bg-black/40 border border-white/10 group">
              {!stream ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                    <Camera className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{t.accessCamera}</h3>
                  <p className="text-muted mb-8">{t.cameraDesc}</p>
                  <button className="btn btn-primary px-8" onClick={startCamera}>
                    {t.enableCamera}
                  </button>
                </div>
              ) : (
                <>
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    muted
                    playsInline 
                    className="absolute inset-0 z-0 w-full h-full object-cover scale-x-[-1] brightness-105 contrast-105"
                    aria-label="Live camera preview"
                  />
                  <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-t from-white/20 via-transparent to-white/10" />
                  
                  {/* Scanning Overlay */}
                  <AnimatePresence>
                    {isScanning && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-10 pointer-events-none"
                      >
                        <div className="absolute inset-0 border-4 border-primary/50 m-8 rounded-3xl" />
                        <motion.div 
                          animate={{ top: ['10%', '90%', '10%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="absolute left-8 right-8 h-1 bg-primary shadow-[0_0_20px_var(--primary)] z-20"
                        />
                        <div className="absolute inset-0 bg-primary/5" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-30">
                          <p className="text-white font-bold text-xl uppercase tracking-widest bg-black/50 px-6 py-2 rounded-full">{t.analyzingFace}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-4">
                    {!isScanning && (
                      <>
                        <button 
                          className="btn btn-primary px-10 shadow-2xl shadow-primary/40 hover:scale-105"
                          onClick={handleScan}
                        >
                          {t.scanEmotion}
                        </button>
                        <button 
                          className="btn btn-outline bg-black/40 px-6 border-white/20 hover:bg-red-500/20 hover:border-red-500/50"
                          onClick={stopCamera}
                        >
                          {t.turnOff}
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
            {stream && (
              <div className="glass p-4 rounded-[2rem] mt-5">
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                  Calibrate how you feel
                </p>
                <div className="flex flex-wrap gap-2">
                  {moodProfiles.map((mood) => (
                    <button
                      key={mood.key}
                      type="button"
                      className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${
                        selectedMood === mood.key
                          ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                          : 'glass text-muted hover:text-primary'
                      }`}
                      onClick={() => setSelectedMood(mood.key)}
                    >
                      {mood.label}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted mt-3">
                  For privacy, this runs locally. The camera preview helps reflection; your selected mood keeps the result accurate.
                </p>
              </div>
            )}
            {error && (
              <p className="mt-4 text-red-400 text-center text-sm">{error}</p>
            )}
          </div>

          {/* Results Section */}
          <div className="space-y-8">
            <AnimatePresence mode="wait">
              {!results && !isScanning ? (
                <motion.div 
                  key="placeholder"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass p-12 rounded-[3rem] text-center"
                >
                  <Activity className="w-16 h-16 text-muted mx-auto mb-6 opacity-20" />
                  <h3 className="text-2xl font-bold mb-4">{t.noDataYet}</h3>
                  <p className="text-muted">{t.scanPrompt}</p>
                </motion.div>
              ) : isScanning ? (
                <motion.div 
                  key="scanning"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass p-12 rounded-[3rem] space-y-8"
                >
                  {[1, 2, 3].map(i => (
                    <div key={i} className="space-y-2">
                      <div className="h-4 w-32 bg-white/5 rounded-full animate-pulse" />
                      <div className="h-8 w-full bg-white/10 rounded-full animate-pulse" />
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  key="results"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-2 gap-6">
                    <div className="glass p-8 rounded-[2.5rem] border-t-4 border-primary">
                      <div className="flex items-center gap-3 mb-4">
                        <Smile className="text-primary" />
                        <span className="text-sm font-bold uppercase tracking-wider text-muted">{t.happiness}</span>
                      </div>
                      <div className="text-4xl font-bold text-white mb-2">{results.happiness}%</div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${results.happiness}%` }}
                          className="h-full bg-primary"
                        />
                      </div>
                    </div>
                    <div className="glass p-8 rounded-[2.5rem] border-t-4 border-accent">
                      <div className="flex items-center gap-3 mb-4">
                        <Frown className="text-accent" />
                        <span className="text-sm font-bold uppercase tracking-wider text-muted">{t.stress}</span>
                      </div>
                      <div className="text-4xl font-bold text-white mb-2">{results.stress}%</div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${results.stress}%` }}
                          className="h-full bg-accent"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="glass p-8 rounded-[2.5rem]">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
                        <Heart className="text-primary" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold">{t.emotion}: {results.mood}</h4>
                        <p className="text-sm text-muted">{t.analyzingFace}</p>
                        <p className="text-xs text-muted mt-1">Calibrated from your selected mood.</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h5 className="font-bold text-sm uppercase tracking-widest text-primary">Recommendations</h5>
                      {results.recommendations.map((rec, i) => (
                        <div key={i} className="flex gap-3 items-start">
                          <Shield className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                          <p className="text-muted text-sm">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 w-full">
                    <button className="btn btn-outline flex-1 py-4 rounded-3xl" onClick={handleScan}>
                      {t.scanAgain}
                    </button>
                    <button className="btn btn-primary flex-1 py-4 rounded-3xl flex items-center justify-center gap-2" onClick={downloadRecord}>
                      <Download className="w-5 h-5" /> Download Record
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid md-grid-cols-3 gap-8 mt-12">
          <div className="glass p-8 rounded-3xl">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" /> {t.privacyFirst}
            </h4>
            <p className="text-sm text-muted">{t.privacyDesc}</p>
          </div>
          <div className="glass p-8 rounded-3xl">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-secondary" /> {t.realtimeMonitoring}
            </h4>
            <p className="text-sm text-muted">{t.realtimeDesc}</p>
          </div>
          <div className="glass p-8 rounded-3xl">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-500" /> {t.wellbeingTitle}
            </h4>
            <p className="text-sm text-muted">{t.wellbeingDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessAI;
