import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Activity, 
  Zap, 
  Droplets, 
  ShieldCheck, 
  Plus, 
  AlertCircle, 
  FileText, 
  Calendar, 
  Download, 
  QrCode, 
  Trash2,
  Lock,
  Unlock,
  X,
  Stethoscope
} from 'lucide-react';
import { useHealth } from '../context/HealthContext';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { translations } from '../data/translations';
import { jsPDF } from 'jspdf';

const trendData = [
  { time: '08:00', heartRate: 72, oxygen: 98, bp: 120 },
  { time: '10:00', heartRate: 75, oxygen: 99, bp: 122 },
  { time: '12:00', heartRate: 85, oxygen: 97, bp: 128 },
  { time: '14:00', heartRate: 78, oxygen: 98, bp: 124 },
  { time: '16:00', heartRate: 82, oxygen: 99, bp: 126 },
  { time: '18:00', heartRate: 74, oxygen: 98, bp: 121 },
  { time: '20:00', heartRate: 70, oxygen: 99, bp: 118 },
];

const HealthRecords = () => {
  const { state, dispatch } = useHealth();
  const t = translations[state.language || 'en'];
  const [showSOS, setShowSOS] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [newRecord, setNewRecord] = useState({
    type: '',
    date: new Date().toISOString().split('T')[0],
    doctor: '',
    report: '',
    status: 'Completed'
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === state.accessPassword) {
      setIsAuthenticated(true);
    } else {
      alert(t.invalidPin);
    }
  };

  const handleAddRecord = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD_RECORD', payload: newRecord });
    setShowAddModal(false);
    setNewRecord({
      type: '',
      date: new Date().toISOString().split('T')[0],
      doctor: '',
      report: '',
      status: 'Completed'
    });
  };

  const handleDownloadAll = () => {
    if (state.userRecords.length === 0) return;
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Vitalis Health Records", 20, 20);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    let yPos = 40;
    
    state.userRecords.forEach((record, index) => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      doc.setFont("helvetica", "bold");
      doc.text(`Record ${index + 1}: ${record.type}`, 20, yPos);
      yPos += 8;
      
      doc.setFont("helvetica", "normal");
      doc.text(`Date: ${record.date}`, 20, yPos);
      yPos += 6;
      doc.text(`Doctor: Dr. ${record.doctor}`, 20, yPos);
      yPos += 6;
      doc.text(`Status: ${record.status}`, 20, yPos);
      yPos += 8;
      
      const splitReport = doc.splitTextToSize(`Report: ${record.report}`, 170);
      doc.text(splitReport, 20, yPos);
      yPos += (splitReport.length * 6) + 10;
    });
    
    doc.save("Vitalis_All_Records.pdf");
  };

  const handleDownloadSinglePdf = () => {
    if (!selectedRecord) return;
    const doc = new jsPDF();
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Vitalis Medical Record", 20, 25);
    
    doc.setFontSize(16);
    doc.text(selectedRecord.type, 20, 45);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Date: ${selectedRecord.date} | Doctor: Dr. ${selectedRecord.doctor}`, 20, 55);
    
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text(`Status: ${selectedRecord.status}`, 20, 65);
    
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 72, 190, 72);
    
    doc.setFont("helvetica", "normal");
    const splitReport = doc.splitTextToSize(selectedRecord.report, 170);
    doc.text(splitReport, 20, 85);
    
    doc.save(`Vitalis_Record_${selectedRecord.type.replace(/\s+/g, '_')}.pdf`);
  };

  const getStatus = (type, value) => {
    if (type === 'heartRate') {
      return value > 100 || value < 60 
        ? { label: t.high, color: 'text-red-500', bg: 'bg-red-500/10' }
        : { label: t.normal, color: 'text-green-500', bg: 'bg-green-500/10' };
    }
    if (type === 'bloodPressure') {
      return value.systolic > 140 
        ? { label: t.hypertension, color: 'text-red-500', bg: 'bg-red-500/10' }
        : { label: t.normal, color: 'text-green-500', bg: 'bg-green-500/10' };
    }
    return { label: t.normal, color: 'text-green-500', bg: 'bg-green-500/10' };
  };

  const vitals = [
    { 
      id: 'heartRate',
      name: t.heartRate, 
      display: `${state.vitals.heartRate.value} bpm`, 
      icon: <Heart className="text-red-500" />,
      status: getStatus('heartRate', state.vitals.heartRate.value)
    },
    { 
      id: 'bloodPressure',
      name: t.bloodPressure, 
      display: `${state.vitals.bloodPressure.systolic}/${state.vitals.bloodPressure.diastolic}`, 
      icon: <Activity className="text-blue-500" />,
      status: getStatus('bloodPressure', state.vitals.bloodPressure)
    },
    { 
      id: 'bloodGlucose',
      name: t.bloodGlucose, 
      display: `${state.vitals.bloodGlucose.value} mg/dL`, 
      icon: <Droplets className="text-orange-500" />,
      status: getStatus('bloodGlucose', state.vitals.bloodGlucose.value)
    },
    { 
      id: 'oxygen',
      name: t.oxygenSpO2, 
      display: `${state.vitals.oxygen.value}%`, 
      icon: <Zap className="text-yellow-500" />,
      status: getStatus('oxygen', state.vitals.oxygen.value)
    }
  ];

  return (
    <div className="records-page pt-24 min-h-screen">
      <div className="container">
        {!isAuthenticated ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto mt-20 p-12 glass rounded-3xl text-center"
          >
            <div className="p-6 bg-primary/10 rounded-full inline-block mb-6">
              <Lock className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">{t.securePinTitle}</h2>
            <p className="text-muted mb-8">{t.pinPrompt}</p>
            <form onSubmit={handleLogin} className="space-y-4">
              <input 
                type="password" 
                maxLength="4"
                placeholder="••••"
                className="pin-input"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              />
              <button type="submit" className="btn btn-primary w-full justify-center py-4">
                <Unlock className="w-5 h-5 mr-2" /> {t.unlockRecords}
              </button>
            </form>
          </motion.div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
              <div>
                <h1 className="text-6xl font-bold mb-4">{t.digitalRecords.split(' ')[0]} <span className="gradient-text">{t.digitalRecords.split(' ').slice(1).join(' ')}</span></h1>
                <p className="text-xl text-muted max-w-2xl">{t.recordsSubtitle}</p>
              </div>
              <button 
                className="btn btn-primary px-8 py-4 text-lg"
                onClick={() => setShowAddModal(true)}
              >
                <Plus className="w-6 h-6 mr-2" /> {t.addNewRecord}
              </button>
            </div>

            {/* Health Trends Section */}
            <div className="grid md-grid-cols-3 gap-12 mb-20">
              <div className="md-col-span-2 glass p-10 rounded-[3.5rem] h-500">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold">{t.healthAnalytics}</h3>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <span className="text-xs text-muted">{t.heartRate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-secondary" />
                      <span className="text-xs text-muted">BP</span>
                    </div>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis 
                      dataKey="time" 
                      stroke="#94a3b8" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="#94a3b8" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      domain={['dataMin - 10', 'dataMax + 10']}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="heartRate" stroke="var(--primary)" fillOpacity={1} fill="url(#colorHr)" strokeWidth={3} />
                    <Area type="monotone" dataKey="bp" stroke="var(--secondary)" fillOpacity={0} strokeWidth={3} strokeDasharray="5 5" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="glass p-10 rounded-[3.5rem] flex flex-col justify-between border border-white/10 shadow-2xl">
                <div>
                  <h3 className="text-xl font-bold mb-2">{t.vitalsTitle}</h3>
                  <p className="text-sm text-muted mb-6">{t.vitalsDesc}</p>
                  <div className="p-8 bg-primary/10 rounded-3xl border border-primary/20 mb-8">
                    <p className="text-primary font-bold mb-3 flex items-center gap-3 text-lg">
                      <ShieldCheck className="w-6 h-6" /> {t.stabilityAlert}
                    </p>
                    <p className="text-base text-muted leading-relaxed">{t.stabilityDesc}</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted">{t.sleepQuality}</span>
                      <span className="font-bold">8.4/10</span>
                    </div>
                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-full w-[84%]" />
                    </div>
                  </div>
                </div>
                <button className="btn btn-outline w-full justify-center mt-12 py-5 text-lg font-bold">{t.viewFullAnalysis}</button>
              </div>
            </div>

            {/* Vitals Dashboard */}
            <div className="grid grid-cols-1 md-grid-cols-2 lg-grid-cols-4 mb-32 gap-10">
              {vitals.map((vital, index) => (
                <motion.div
                  key={vital.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="vital-card glass p-10 border-b-4 transition-all hover:-translate-y-2"
                  style={{ borderBottomColor: vital.status.label === 'Normal' ? 'rgba(34, 197, 94, 0.4)' : 'rgba(239, 68, 68, 0.4)' }}
                >
                  <div className="flex justify-between items-start mb-8">
                    <div className="p-5 bg-white/5 rounded-3xl">{vital.icon}</div>
                    <span className={`text-sm font-bold ${vital.status.color} ${vital.status.bg} px-5 py-2.5 rounded-full`}>
                      {vital.status.label}
                    </span>
                  </div>
                  <p className="text-muted text-sm font-bold uppercase tracking-widest mb-2">{vital.name}</p>
                  <h3 className="text-5xl font-bold">{vital.display}</h3>
                </motion.div>
              ))}
            </div>

            {/* Records List */}
            <div className="records-container glass rounded-[3rem] overflow-hidden mb-24">
              <div className="p-10 border-b border-white/10 flex flex-col md:flex-row justify-between items-center bg-white/5 gap-6">
                <h2 className="text-3xl font-bold">{t.recentReports}</h2>
                <button 
                  className="btn btn-outline px-6 py-3"
                  onClick={handleDownloadAll}
                >
                  <Download className="w-5 h-5 mr-2" /> {t.downloadAll}
                </button>
              </div>
              
              <div className="records-list p-8">
                {state.userRecords.length === 0 ? (
                  <div className="text-center py-20">
                    <FileText className="w-16 h-16 text-muted mx-auto mb-4 opacity-20" />
                    <p className="text-muted text-lg">{t.noRecordsFound}</p>
                  </div>
                ) : (
                  state.userRecords.map((record, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (index * 0.1) }}
                      className="record-item flex items-center justify-between p-6 hover:bg-white/5 rounded-[2rem] transition-all cursor-pointer mb-4 border border-white/5"
                      onClick={() => setSelectedRecord(record)}
                    >
                      <div className="flex items-center gap-6">
                        <div className="p-5 bg-primary/10 rounded-2xl">
                          <FileText className="text-primary w-8 h-8" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xl mb-1">{record.type}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted">
                            <span className="flex items-center gap-1 font-medium"><Calendar className="w-4 h-4" /> {record.date}</span>
                            <span>•</span>
                            <span className="font-medium">Dr. {record.doctor}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="hidden md:block text-right mr-10">
                          <p className="text-sm font-bold text-muted mb-1 line-clamp-1 max-w-[200px]">{record.report}</p>
                          <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-bold">{record.status}</span>
                        </div>
                        <div className="flex gap-3 no-print">
                          <button 
                            className="p-3 hover:bg-primary/20 rounded-full transition-colors text-primary" 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRecord(record);
                            }}
                          >
                            <QrCode className="w-6 h-6" />
                          </button>
                          <button 
                            className="p-3 hover:bg-red-500/20 rounded-full transition-colors text-red-500" 
                            onClick={(e) => {
                              e.stopPropagation();
                              if(confirm('Are you sure you want to delete this record?')) {
                                dispatch({ type: 'DELETE_RECORD', payload: index });
                              }
                            }}
                          >
                            <Trash2 className="w-6 h-6" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* Emergency Card */}
            <div className="mt-16 p-12 glass rounded-[3rem] border-l-8 border-red-500 bg-red-500/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform">
                <Activity className="w-32 h-32 text-red-500" />
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center gap-10 relative z-10">
                <div>
                  <h3 className="text-3xl font-bold mb-3">{t.emergencySos}</h3>
                  <p className="text-xl text-muted">{t.bloodType}: <span className="text-red-500 font-bold">O+</span> | {t.allergies}: <span className="font-bold">Penicillin, Peanuts</span> | Contact: <span className="font-bold">+91 98765 43210</span></p>
                </div>
                <button 
                  className="btn btn-primary bg-red-500 hover:bg-red-600 shadow-xl shadow-red-500/40 px-10 py-5 text-xl font-bold"
                  onClick={() => setShowSOS(true)}
                >
                  {t.viewSosQr}
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {selectedRecord && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="sos-overlay no-print"
              onClick={() => setSelectedRecord(null)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%" }}
              animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
              exit={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%" }}
              className="sos-modal glass"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold">{t.recordDetail.split(' ')[0]} <span className="gradient-text">{t.recordDetail.split(' ')[1]}</span></h2>
                  <button onClick={() => setSelectedRecord(null)} className="p-2 hover:bg-white/10 rounded-full"><X /></button>
                </div>
                
                <div className="flex flex-col items-center gap-10 mb-10 text-center">
                  <div className="qr-container bg-white p-6 rounded-[2rem] inline-block">
                    <img 
                      src={`https://quickchart.io/qr?text=${encodeURIComponent(`Vitalis: ${selectedRecord.type} | ${selectedRecord.report}`)}&size=200`}
                      alt="Medical QR Code"
                      className="w-48 h-48 mx-auto"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{selectedRecord.type}</h3>
                    <p className="text-muted">{selectedRecord.date} • Dr. {selectedRecord.doctor}</p>
                  </div>
                </div>

                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 mb-8">
                  <p className="text-lg leading-relaxed">{selectedRecord.report}</p>
                </div>

                <button className="btn btn-primary w-full justify-center py-4" onClick={handleDownloadSinglePdf}>
                  <Download className="w-5 h-5 mr-2" /> {t.downloadPdf}
                </button>
              </div>
            </motion.div>
          </>
        )}

        {showSOS && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="sos-overlay no-print"
              onClick={() => setShowSOS(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%" }}
              animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
              exit={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%" }}
              className="sos-modal glass"
            >
              <div className="p-8 text-center">
                <div className="flex justify-between items-center mb-6 no-print">
                  <h2 className="text-2xl font-bold text-red-500">Emergency SOS</h2>
                  <button onClick={() => setShowSOS(false)} className="p-2 hover:bg-white/10 rounded-full"><X /></button>
                </div>
                
                <div className="qr-container bg-white p-6 rounded-[2rem] inline-block mb-8">
                  <img 
                    src="https://quickchart.io/qr?text=SOS-John-Doe-O-plus&size=200"
                    alt="SOS QR Code"
                    className="w-48 h-48"
                  />
                </div>
                
                <div className="text-left space-y-4">
                  <div className="p-4 bg-white/5 rounded-2xl">
                    <p className="text-sm text-muted mb-1">Blood Type</p>
                    <p className="font-bold text-lg text-red-500">O+</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl">
                    <p className="text-sm text-muted mb-1">Critical Allergies</p>
                    <p className="font-bold">Penicillin, Peanuts</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {showAddModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="sos-overlay"
              onClick={() => setShowAddModal(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%" }}
              animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
              exit={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%" }}
              className="sos-modal glass"
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">Add <span className="gradient-text">Health Record</span></h2>
                <form onSubmit={handleAddRecord} className="space-y-4">
                  <input 
                    type="text" required placeholder={t.diseaseName}
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none"
                    value={newRecord.type}
                    onChange={(e) => setNewRecord({...newRecord, type: e.target.value})}
                  />
                  <textarea 
                    required placeholder={t.description}
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl h-32 outline-none"
                    value={newRecord.report}
                    onChange={(e) => setNewRecord({...newRecord, report: e.target.value})}
                  />
                  <input 
                    type="text" required placeholder={t.doctorName}
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none"
                    value={newRecord.doctor}
                    onChange={(e) => setNewRecord({...newRecord, doctor: e.target.value})}
                  />
                  <button type="submit" className="btn btn-primary w-full justify-center py-4">{t.saveRecord}</button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .pin-input {
          width: 100%;
          text-align: center;
          font-size: 2.5rem;
          letter-spacing: 1rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border);
          border-radius: 1.5rem;
          color: var(--primary);
          font-weight: 700;
          outline: none;
        }
        .sos-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(10px);
          z-index: 1000;
        }
        .sos-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90%;
          max-width: 500px;
          z-index: 1001;
          border-radius: 2rem;
        }
        @media print {
          .no-print, nav, footer { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default HealthRecords;
