import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  Bot,
  HeartPulse,
  MessageCircle,
  PhoneCall,
  Send,
  ShieldAlert,
  Sparkles,
  X,
  Mic,
  MicOff,
  Volume2,
  VolumeX
} from 'lucide-react';
import { useHealth } from '../context/HealthContext';
import { translations } from '../data/translations';

const emergencyWords = [
  'emergency',
  'urgent',
  'sos',
  'chest pain',
  'chest tightness',
  'heart attack',
  'stroke',
  'face drooping',
  'arm weakness',
  'slurred speech',
  'cannot breathe',
  'can not breathe',
  'shortness of breath',
  'choking',
  'seizure',
  'fits',
  'unconscious',
  'not waking',
  'fainting',
  'fainted',
  'heavy bleeding',
  'poison',
  'overdose',
  'accident',
  'electric shock',
  'suicide',
  'self harm',
  'self-harm',
  'collapse',
  'severe burn',
  'severe allergy',
  'anaphylaxis',
  'snake bite',
  'snakebite',
  'drowning'
];

const knowledgeBase = [
  {
    title: 'Fever, cold, and flu',
    tags: ['fever', 'temperature', 'cold', 'flu', 'chills', 'body ache', 'body pain', 'runny nose', 'sneezing', 'viral'],
    reply:
      'Fever can be your body fighting an infection. Sip fluids, rest, use a light blanket, and monitor temperature. Please seek medical care urgently if fever is very high, lasts more than 3 days, or comes with chest pain, confusion, stiff neck, severe weakness, or breathing trouble.'
  },
  {
    title: 'Headache and migraine',
    tags: ['headache', 'migraine', 'head pain', 'forehead pain', 'one side headache', 'light sensitivity'],
    reply:
      'For a headache, try water, a quiet dim room, a cool cloth, and avoid skipping meals. Get urgent help if it is sudden and severe, follows an injury, or comes with weakness, vision changes, fever, confusion, or repeated vomiting.'
  },
  {
    title: 'Cough and throat symptoms',
    tags: ['cough', 'throat', 'sore throat', 'dry cough', 'wet cough', 'phlegm', 'congestion', 'blocked nose', 'sinus'],
    reply:
      'For cough or sore throat, warm fluids, steam, honey if age is above 1 year, and rest may help. Watch for breathing trouble, chest pain, bluish lips, blood in cough, or symptoms lasting more than a week.'
  },
  {
    title: 'Stomach upset',
    tags: ['stomach', 'vomit', 'vomiting', 'diarrhea', 'loose motion', 'nausea', 'food poisoning', 'gastric', 'indigestion', 'acidity', 'heartburn'],
    reply:
      'Small sips of ORS or water can help prevent dehydration. Eat light food when ready. Please seek care if there is blood, severe belly pain, persistent vomiting, signs of dehydration, or symptoms in a baby, elderly person, or pregnant person.'
  },
  {
    title: 'Stress, anxiety, and mood',
    tags: ['stress', 'anxiety', 'panic', 'sad', 'depressed', 'low', 'overthinking', 'crying', 'lonely', 'fear', 'mental health', 'mood'],
    reply:
      'I am here with you. Try this for one minute: breathe in for 4, hold for 4, breathe out for 6. Then name 5 things you see and 4 things you can feel. If you may hurt yourself or someone else, call emergency support now and stay near a trusted person.'
  },
  {
    title: 'Sleep and tiredness',
    tags: ['sleep', 'insomnia', 'sleepless', 'tired', 'fatigue', 'weakness', 'low energy', 'exhausted', 'dizzy after standing'],
    reply:
      'A gentle sleep reset: dim screens, drink water, keep the room cool, and do 5 slow breaths before bed. If tiredness is extreme, sudden, or comes with chest pain, fainting, fever, or weight loss, a doctor should check it.'
  },
  {
    title: 'Blood pressure',
    tags: ['bp', 'blood pressure', 'hypertension', 'high bp', 'low bp', 'pressure high', 'pressure low'],
    reply:
      'For blood pressure concerns, sit calmly, avoid caffeine or exertion, and recheck after 5 minutes if you have a monitor. If BP is very high with chest pain, severe headache, weakness, breathlessness, or vision changes, treat it as urgent.'
  },
  {
    title: 'Blood sugar and diabetes',
    tags: ['sugar', 'diabetes', 'glucose', 'high sugar', 'low sugar', 'hypoglycemia', 'hyperglycemia', 'thirsty', 'frequent urination'],
    reply:
      'For diabetes care, note your reading, hydration, recent food, and medicine timing. Seek urgent help for confusion, fainting, repeated vomiting, very high sugar with weakness, or low sugar symptoms that do not improve after quick sugar.'
  },
  {
    title: 'Cuts and wounds',
    tags: ['cut', 'wound', 'first aid', 'injury', 'scratch', 'bleed', 'bleeding', 'glass cut'],
    reply:
      'For a small cut, wash your hands, rinse the wound, apply gentle pressure with clean cloth, use antiseptic, and cover it. If bleeding will not stop, the cut is deep, or it was caused by a bite or dirty object, get medical care.'
  },
  {
    title: 'Burns',
    tags: ['burn', 'scald', 'hot water burn', 'fire burn', 'chemical burn', 'electric burn'],
    reply:
      'Cool a burn under clean running water for 20 minutes. Do not apply ice, butter, or toothpaste. Cover loosely with a clean cloth. Get urgent help for large, deep, chemical, electrical, face, hand, chest, or genital burns.'
  },
  {
    title: 'Chest discomfort',
    tags: ['chest', 'chest discomfort', 'chest pressure', 'left arm pain', 'jaw pain', 'palpitation', 'palpitations', 'fast heartbeat'],
    reply:
      'Chest discomfort should be taken seriously. Rest, avoid walking around, and do not drive yourself. If it is heavy, spreading to the arm, jaw, back, comes with sweating, nausea, fainting, or breathlessness, call 108 immediately.'
  },
  {
    title: 'Breathing symptoms',
    tags: ['breath', 'breathing', 'wheezing', 'asthma', 'short breath', 'breathless', 'tight chest', 'inhaler'],
    reply:
      'For mild breathing discomfort, sit upright, loosen tight clothing, and use prescribed inhalers if you have them. Call emergency help now if breathing is severe, lips look blue, the person cannot speak full sentences, or symptoms follow an allergy or choking.'
  },
  {
    title: 'Dizziness and faint feeling',
    tags: ['dizzy', 'dizziness', 'vertigo', 'lightheaded', 'faint', 'blackout', 'spinning', 'balance'],
    reply:
      'Sit or lie down, sip water, and avoid sudden standing. Dizziness needs urgent care if it comes with chest pain, weakness on one side, slurred speech, severe headache, fainting, injury, pregnancy, or repeated vomiting.'
  },
  {
    title: 'Abdominal pain',
    tags: ['abdominal pain', 'belly pain', 'stomach pain', 'cramps', 'appendix', 'appendicitis', 'right side pain', 'left side pain'],
    reply:
      'For mild belly pain, rest, hydrate, and avoid heavy or spicy food. Get medical care quickly for severe or worsening pain, hard swollen belly, pain with fever, blood in stool, pregnancy, repeated vomiting, or pain in the right lower abdomen.'
  },
  {
    title: 'Urinary symptoms',
    tags: ['urine', 'urination', 'burning urine', 'uti', 'pee', 'painful urination', 'frequent urine', 'blood in urine', 'kidney pain'],
    reply:
      'Burning or frequent urination may happen with a UTI. Drink water and do not hold urine. Please see a doctor if there is fever, back pain, blood in urine, pregnancy, diabetes, vomiting, or symptoms lasting more than a day.'
  },
  {
    title: 'Skin rash and itching',
    tags: ['rash', 'itch', 'itching', 'hives', 'red spots', 'skin allergy', 'eczema', 'dry skin', 'swelling skin'],
    reply:
      'For mild rash or itching, avoid scratching, use a cool compress, and avoid the suspected trigger. Urgent help is needed if rash comes with face or lip swelling, breathing trouble, fever, purple spots, severe pain, or spreads very fast.'
  },
  {
    title: 'Allergic reaction',
    tags: ['allergy', 'allergic', 'swelling lips', 'swollen face', 'hives', 'reaction', 'anaphylaxis'],
    reply:
      'Stop exposure to the trigger if possible. Mild itching can be monitored, but face, tongue, or throat swelling, wheezing, faintness, or breathing trouble can be anaphylaxis. Call 108 immediately and use prescribed epinephrine if available.'
  },
  {
    title: 'Eye symptoms',
    tags: ['eye', 'red eye', 'eye pain', 'vision', 'blurred vision', 'itchy eyes', 'watery eyes', 'conjunctivitis', 'foreign body eye'],
    reply:
      'For mild eye irritation, avoid rubbing and rinse with clean water. Urgent eye care is needed for injury, chemical exposure, sudden vision loss, severe pain, light sensitivity, new unequal pupils, or something stuck in the eye.'
  },
  {
    title: 'Ear symptoms',
    tags: ['ear', 'ear pain', 'earache', 'hearing loss', 'ringing', 'tinnitus', 'ear discharge', 'blocked ear'],
    reply:
      'Keep the ear dry and avoid putting objects or oil inside unless a clinician advised it. See a doctor for severe pain, fever, discharge, sudden hearing loss, dizziness, injury, or symptoms in a young child.'
  },
  {
    title: 'Tooth and mouth symptoms',
    tags: ['tooth', 'toothache', 'gum', 'mouth ulcer', 'jaw pain', 'dental', 'bleeding gums', 'bad breath'],
    reply:
      'Rinse with warm salt water and avoid very hot, cold, or sweet foods. Dental care is needed for swelling, fever, pus, injury, severe pain, trouble opening the mouth, or pain that lasts more than 1 to 2 days.'
  },
  {
    title: 'Back, neck, and joint pain',
    tags: ['back pain', 'neck pain', 'shoulder pain', 'knee pain', 'joint pain', 'sprain', 'strain', 'muscle pain', 'leg pain'],
    reply:
      'Rest the area, avoid heavy lifting, and use gentle movement as tolerated. Seek urgent care after injury, with numbness or weakness, loss of bladder or bowel control, fever, severe swelling, or pain that travels with chest symptoms.'
  },
  {
    title: 'Numbness and nerve symptoms',
    tags: ['numb', 'numbness', 'tingling', 'pins and needles', 'weakness one side', 'paralysis', 'facial droop'],
    reply:
      'New numbness, weakness on one side, face drooping, confusion, or speech trouble can be stroke signs. Call emergency help immediately. For mild tingling that repeats, note timing, posture, diabetes status, and see a doctor.'
  },
  {
    title: 'Periods and pelvic symptoms',
    tags: ['period', 'period pain', 'menstrual', 'cramps', 'heavy bleeding period', 'irregular period', 'pelvic pain', 'vaginal bleeding'],
    reply:
      'For period cramps, warmth, hydration, and rest may help. Please seek care for very heavy bleeding, fainting, severe one-sided pelvic pain, fever, pregnancy possibility, bad-smelling discharge, or bleeding after menopause.'
  },
  {
    title: 'Pregnancy symptoms',
    tags: ['pregnant', 'pregnancy', 'morning sickness', 'baby movement', 'labor pain', 'contractions', 'water broke'],
    reply:
      'During pregnancy, it is safer to check early. Contact a doctor urgently for bleeding, severe abdominal pain, severe headache, blurred vision, swelling of face or hands, fever, reduced baby movement, fluid leakage, or regular contractions before term.'
  },
  {
    title: 'Child health symptoms',
    tags: ['baby', 'infant', 'child', 'toddler', 'newborn', 'child fever', 'baby fever', 'not feeding', 'crying baby'],
    reply:
      'Children can worsen quickly. Seek care urgently for fever in a baby under 3 months, breathing trouble, dehydration, unusual sleepiness, seizure, stiff neck, blue lips, rash with fever, or if the child is not feeding.'
  },
  {
    title: 'Dehydration and heat illness',
    tags: ['dehydration', 'heat stroke', 'heat exhaustion', 'sun stroke', 'too hot', 'no urine', 'dry mouth'],
    reply:
      'Move to a cool place, loosen clothing, and sip ORS or water. Emergency care is needed for confusion, fainting, very hot skin, no sweating with high heat, seizure, repeated vomiting, or no urine for many hours.'
  },
  {
    title: 'Insect, animal, and snake bites',
    tags: ['bite', 'dog bite', 'cat bite', 'monkey bite', 'insect bite', 'bee sting', 'snake bite', 'snakebite', 'scorpion'],
    reply:
      'Wash bites with soap and running water for 15 minutes. Remove tight jewelry near swelling. Get medical care for animal bites, snake or scorpion bites, spreading swelling, fever, pus, severe pain, or allergy symptoms.'
  },
  {
    title: 'Medicine safety',
    tags: ['medicine', 'tablet', 'dose', 'dosage', 'side effect', 'missed dose', 'antibiotic', 'painkiller', 'paracetamol', 'ibuprofen'],
    reply:
      'Use medicines only as directed on the label or by a doctor. Do not double a missed dose unless advised. Seek help for overdose, allergy, severe dizziness, breathing trouble, black stools, repeated vomiting, or confusion after medicine.'
  },
  {
    title: 'COVID and infection symptoms',
    tags: ['covid', 'corona', 'loss of smell', 'loss of taste', 'infection', 'viral infection', 'positive test'],
    reply:
      'For possible COVID or viral infection, rest, hydrate, mask around others, and monitor fever and breathing. Seek care for breathlessness, chest pain, low oxygen, confusion, dehydration, or high-risk conditions like pregnancy, diabetes, or heart disease.'
  },
  {
    title: 'Weight and appetite changes',
    tags: ['weight loss', 'weight gain', 'no appetite', 'loss of appetite', 'always hungry', 'night sweats'],
    reply:
      'Track weight, appetite, sleep, mood, fever, bowel habits, and medicines. Please see a doctor for unexplained weight loss, night sweats, persistent fever, blood in stool, severe fatigue, or appetite change lasting more than 2 weeks.'
  },
  {
    title: 'Swelling and fluid retention',
    tags: ['swelling', 'swollen feet', 'swollen leg', 'edema', 'puffy face', 'ankle swelling'],
    reply:
      'Elevate the swollen area and avoid tight clothing. Urgent care is needed for one-sided leg swelling with pain, chest pain, breathlessness, face or throat swelling, pregnancy with headache, or sudden swelling.'
  },
  {
    title: 'Jaundice and liver warning signs',
    tags: ['yellow eyes', 'jaundice', 'yellow skin', 'dark urine', 'pale stool', 'liver'],
    reply:
      'Yellow eyes or skin should be checked by a doctor. Avoid alcohol and unnecessary medicines. Seek urgent care if jaundice comes with confusion, severe belly pain, fever, vomiting blood, pregnancy, or extreme weakness.'
  },
  {
    title: 'Stool and rectal symptoms',
    tags: ['constipation', 'stool', 'blood in stool', 'black stool', 'piles', 'hemorrhoids', 'rectal bleeding'],
    reply:
      'For mild constipation, fluids, fiber, and movement may help. See a doctor for blood or black stool, severe pain, vomiting, swollen belly, unexplained weight loss, or constipation lasting more than a week.'
  },
  {
    title: 'General wellness',
    tags: ['wellness', 'healthy', 'diet', 'exercise', 'hydration', 'fitness', 'nutrition', 'immunity'],
    reply:
      'A steady wellness base is simple: drink water, eat balanced meals, move daily, sleep regularly, reduce tobacco or alcohol, and keep vaccines and checkups current. Tell me your goal and I can suggest a small next step.'
  }
];

const quickPrompts = [
  { label: 'Emergency help', text: 'This is an emergency' },
  { label: 'First aid', text: 'I need first aid guidance for a cut wound' },
  { label: 'Symptoms', text: 'I have fever, cough, and body pain' },
  { label: 'Stomach', text: 'I have stomach pain and vomiting' },
  { label: 'Stress', text: 'I feel anxious and stressed' }
];

const makeBotMessage = (text, tone = 'normal') => ({ text, tone, isBot: true });

const hasWholeWord = (message, word) => new RegExp(`\\b${word}\\b`).test(message);

const getMatchingTopics = (lowerMessage) =>
  knowledgeBase
    .map((topic) => ({
      ...topic,
      score: topic.tags.reduce((total, tag) => total + (lowerMessage.includes(tag) ? 1 : 0), 0)
    }))
    .filter((topic) => topic.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

const getAssistantReply = (message) => {
  const lowerMessage = message.toLowerCase();
  const isEmergency = emergencyWords.some((word) => lowerMessage.includes(word));

  if (isEmergency) {
    return {
      emergency: true,
      text:
        'This may be an emergency. Please call 108 now or ask someone nearby to call. If the person is unconscious, not breathing normally, having chest pain, stroke signs, severe bleeding, seizure, poisoning, or suicidal thoughts, do not wait. Keep them still, loosen tight clothing, and stay with them until help arrives.'
    };
  }

  if (
    hasWholeWord(lowerMessage, 'hello') ||
    hasWholeWord(lowerMessage, 'hi') ||
    hasWholeWord(lowerMessage, 'hey')
  ) {
    return {
      text:
        'Hi, I am Vitalis. Tell me what is happening in simple words, like "fever since morning" or "feeling anxious". I will guide you calmly and tell you when it needs a doctor.'
    };
  }

  if (lowerMessage.includes('thank')) {
    return {
      text:
        'You are welcome. I am glad you checked in. Keep monitoring how you feel, and reach out to a doctor if symptoms worsen or feel unusual for you.'
    };
  }

  const matchedTopics = getMatchingTopics(lowerMessage);

  if (matchedTopics.length === 1) {
    return { text: matchedTopics[0].reply };
  }

  if (matchedTopics.length > 1) {
    return {
      text: `I noticed a few possible areas: ${matchedTopics.map((topic) => topic.title).join(', ')}. ${matchedTopics
        .map((topic) => topic.reply)
        .join(' ')}`
    };
  }

  return {
    text:
      'I can help with many symptoms: fever, cough, headache, breathing, chest discomfort, stomach pain, vomiting, diarrhea, urinary issues, rash, allergy, eye or ear pain, tooth pain, back or joint pain, periods, pregnancy concerns, child fever, bites, medicine safety, stress, sleep, and general wellness. Tell me your main symptom, how long it has been happening, age, and any severe signs.'
  };
};

const MentalHealthBot = () => {
  const { state, dispatch } = useHealth();
  const t = translations[state.language || 'en'] || translations.en;
  const [messages, setMessages] = useState([
    makeBotMessage(
      t.assistantInitial ||
        "Hello! I'm Vitalis, your health and wellbeing assistant. I work without an API and can guide you through symptoms, first aid, wellness, and emergency alerts."
    )
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const scrollRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      const langMap = { en: 'en-US', hi: 'hi-IN', kn: 'kn-IN' };
      recognitionRef.current.lang = langMap[state.language] || 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, [state.language]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setInput('');
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const speak = (text) => {
    if (!isVoiceEnabled) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const langMap = { en: 'en-US', hi: 'hi-IN', kn: 'kn-IN' };
    utterance.lang = langMap[state.language] || 'en-US';
    window.speechSynthesis.speak(utterance);
  };
  const isOpen = state.isChatOpen;

  const statusLabel = useMemo(
    () => (state.isEmergency ? 'SOS alert active' : t.listening || 'Online and listening'),
    [state.isEmergency, t.listening]
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const setIsOpen = (isChatOpen) => {
    dispatch({ type: 'TOGGLE_CHAT', payload: isChatOpen });
  };

  const sendMessage = (message = input) => {
    const userMessage = message.trim();
    if (!userMessage) return;

    setMessages((prev) => [...prev, { text: userMessage, isBot: false }]);
    setInput('');
    setIsTyping(true);

    window.setTimeout(() => {
      const reply = getAssistantReply(userMessage);

      if (reply.emergency && !state.isEmergency) {
        dispatch({ type: 'TOGGLE_EMERGENCY' });
      }

      setMessages((prev) => [
        ...prev,
        makeBotMessage(reply.text, reply.emergency ? 'emergency' : 'normal')
      ]);
      setIsTyping(false);
      speak(reply.text);
    }, 550);
  };

  const startEmergency = () => {
    if (!state.isEmergency) {
      dispatch({ type: 'TOGGLE_EMERGENCY' });
    }

    setMessages((prev) => [
      ...prev,
      makeBotMessage(
        'SOS alert is active on this website. Call 108 immediately for ambulance support. Share your location, main problem, age, and whether the person is conscious and breathing.',
        'emergency'
      )
    ]);
    setIsOpen(true);
  };

  return (
    <div className="health-assistant">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            className="assistant-panel glass"
          >
            <header className="assistant-header">
              <div className="assistant-avatar">
                <Bot size={22} />
              </div>
              <div className="assistant-title">
                <h4>Health AI Chatbot</h4>
                <span className={state.isEmergency ? 'assistant-status alert' : 'assistant-status'}>
                  {statusLabel}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  className={`assistant-icon-btn ${isVoiceEnabled ? 'text-primary' : 'text-muted'}`}
                  type="button"
                  onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                  title={isVoiceEnabled ? "Mute" : "Unmute"}
                >
                  {isVoiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                </button>
                <button
                  className="assistant-icon-btn"
                  type="button"
                  aria-label="Close assistant"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>
            </header>

            <div className="assistant-emergency-card">
              <ShieldAlert size={18} />
              <p>{t.emergencyWarning || 'For life-threatening emergencies, call 108 immediately.'}</p>
              <button type="button" onClick={startEmergency}>
                <PhoneCall size={15} />
                SOS
              </button>
            </div>

            <div ref={scrollRef} className="assistant-messages" aria-live="polite">
              {messages.map((message, index) => (
                <motion.div
                  key={`${message.text}-${index}`}
                  initial={{ opacity: 0, x: message.isBot ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={message.isBot ? 'assistant-row bot' : 'assistant-row user'}
                >
                  <div className={`assistant-bubble ${message.tone === 'emergency' ? 'emergency' : ''}`}>
                    {message.tone === 'emergency' && <AlertTriangle size={16} />}
                    <span>{message.text}</span>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="assistant-row bot">
                  <div className="assistant-bubble typing">
                    <Sparkles size={15} />
                    <span>{t.botTyping || 'Vitalis is thinking...'}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="assistant-quick-actions">
              {quickPrompts.map((prompt) => (
                <button key={prompt.label} type="button" onClick={() => sendMessage(prompt.text)}>
                  {prompt.label}
                </button>
              ))}
            </div>

            <footer className="assistant-input-bar">
              <input
                type="text"
                value={input}
                placeholder={t.healthChatPlaceholder || 'Ask about symptoms, first aid, or wellbeing...'}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    sendMessage();
                  }
                }}
              />
              <button 
                type="button" 
                className={`assistant-icon-btn ${isListening ? 'text-red-500 animate-pulse' : 'text-muted'}`}
                onClick={toggleListening}
              >
                {isListening ? <MicOff size={19} /> : <Mic size={19} />}
              </button>
              <button type="button" aria-label="Send message" onClick={() => sendMessage()}>
                <Send size={19} />
              </button>
            </footer>

            <p className="assistant-disclaimer">
              {t.disclaimer ||
                'This assistant gives general information only and cannot replace a doctor.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="assistant-launch-row">
        <button className="assistant-sos" type="button" onClick={startEmergency}>
          <HeartPulse size={20} />
          SOS
        </button>
        <button
          className="assistant-launch"
          type="button"
          aria-label={isOpen ? 'Close health assistant' : 'Open health assistant'}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <MessageCircle size={28} />}
          {!isOpen && <span className="assistant-launch-pulse" />}
        </button>
      </div>

      {!isOpen && (
        <div className="assistant-nudge glass">
          <Activity size={15} />
          <span>Ask the health chatbot</span>
        </div>
      )}
    </div>
  );
};

export default MentalHealthBot;
