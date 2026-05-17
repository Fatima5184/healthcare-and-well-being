import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI notify the user they can add to home screen
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Show the prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    
    // We've used the prompt, and can't use it again, discard it
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-8 left-8 z-[200] max-w-sm"
        >
          <div className="glass p-6 rounded-[2rem] shadow-2xl border border-primary/20 relative overflow-hidden">
            <button 
              onClick={() => setShowPrompt(false)}
              className="absolute top-4 right-4 text-muted hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/20 rounded-2xl">
                <Download className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-white">Save to Desktop</h4>
                <p className="text-xs text-muted">Install Vitalis as a desktop app for quick access.</p>
              </div>
            </div>
            
            <button 
              className="btn btn-primary w-full justify-center"
              onClick={handleInstallClick}
            >
              Install Now
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InstallPrompt;
