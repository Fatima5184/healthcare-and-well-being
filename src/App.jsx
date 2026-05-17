import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HealthProvider } from './context/HealthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Pharmacy from './pages/Pharmacy';
import HealthRecords from './pages/HealthRecords';
import DiseaseTracker from './pages/DiseaseTracker';
import HospitalFinder from './pages/HospitalFinder';
import AwarenessHub from './pages/AwarenessHub';
import WellnessAI from './pages/WellnessAI';
import Doctors from './pages/Doctors';
import MentalHealth from './pages/MentalHealth';
import MentalHealthBot from './components/MentalHealthBot';
import InstallPrompt from './components/InstallPrompt';

function App() {
  return (
    <HealthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pharmacy" element={<Pharmacy />} />
              <Route path="/records" element={<HealthRecords />} />
              <Route path="/tracker" element={<DiseaseTracker />} />
              <Route path="/hospitals" element={<HospitalFinder />} />
              <Route path="/awareness" element={<AwarenessHub />} />
              <Route path="/wellness-ai" element={<WellnessAI />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/mental-health" element={<MentalHealth />} />
            </Routes>
          </main>
          <MentalHealthBot />
          <InstallPrompt />
        </div>
      </Router>
    </HealthProvider>
  );
}

export default App;
