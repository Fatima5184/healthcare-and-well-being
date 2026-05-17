export const medicines = [
  // Pain & Fever
  { id: 1, name: 'Dolo 650mg', price: 30, category: 'Pain & Fever', description: 'Most trusted paracetamol for fever and body ache.', image: '/medicines/dolo.png', requiresPrescription: false },
  { id: 2, name: 'Combiflam', price: 45, category: 'Pain & Fever', description: 'Combination of Ibuprofen and Paracetamol for muscular pain.', image: '/medicines/combiflam.png', requiresPrescription: false },
  { id: 3, name: 'Saridon', price: 10, category: 'Pain & Fever', description: 'Effective relief from severe headache and migraine pain.', image: '/medicines/paracetamol.png', requiresPrescription: false },
  
  // Gastrointestinal
  { id: 4, name: 'Digene Gel 200ml', price: 150, category: 'Gastro', description: 'Pink antacid for quick relief from acidity, gas, and indigestion.', image: '/medicines/digene.png', requiresPrescription: false },
  { id: 5, name: 'Pan-D Capsule', price: 195, category: 'Gastro', description: 'Pantoprazole and Domperidone for severe gastric acid reflux and bloating.', image: '/medicines/pantoprazole.png', requiresPrescription: true },
  { id: 6, name: 'Omez Capsule', price: 60, category: 'Gastro', description: 'Omeprazole for acid reflux, stomach ulcers, and GERD symptoms.', image: '/medicines/pantoprazole.png', requiresPrescription: true },
  { id: 7, name: 'Eno Sachet', price: 54, category: 'Gastro', description: 'Fast acting effervescent powder for relief from acidity in 6 seconds.', image: '/medicines/antiseptic.png', requiresPrescription: false },
  
  // Diabetes
  { id: 8, name: 'Glycomet 500mg', price: 85, category: 'Diabetes', description: 'Metformin tablets for blood sugar control in Type 2 Diabetes.', image: '/medicines/metformin.png', requiresPrescription: true },
  { id: 9, name: 'Janumet 50/500', price: 450, category: 'Diabetes', description: 'Sitagliptin and Metformin combination for advanced blood sugar control.', image: '/medicines/metformin.png', requiresPrescription: true },
  
  // Cardiac & BP
  { id: 10, name: 'Telma 40mg', price: 210, category: 'Cardiac', description: 'Telmisartan for hypertension (high blood pressure) and heart protection.', image: '/medicines/telma.png', requiresPrescription: true },
  { id: 11, name: 'Amlokind-5', price: 25, category: 'Cardiac', description: 'Amlodipine for treatment of high blood pressure and chest pain.', image: '/medicines/telma.png', requiresPrescription: true },
  { id: 12, name: 'Atorva 10mg', price: 180, category: 'Cardiac', description: 'Atorvastatin for lowering bad cholesterol and triglycerides.', image: '/medicines/atorvastatin.png', requiresPrescription: true },
  
  // Vitamins & Wellness
  { id: 13, name: 'Zincovit Tablet', price: 110, category: 'Wellness', description: 'Multivitamin and multimineral with grape seed extract for immunity.', image: '/medicines/zincovit.png', requiresPrescription: false },
  { id: 14, name: 'Revital H', price: 350, category: 'Wellness', description: 'Daily health supplement with ginseng and 10 vitamins for energy.', image: '/medicines/multivitamins.png', requiresPrescription: false },
  { id: 15, name: 'Shelcal 500', price: 120, category: 'Wellness', description: 'Calcium and Vitamin D3 (Cholecalciferol) for strong bones and teeth.', image: '/medicines/multivitamins.png', requiresPrescription: false },
  { id: 16, name: 'Evion 400', price: 35, category: 'Wellness', description: 'Vitamin E capsules for antioxidant support, skin and hair health.', image: '/medicines/omega3.png', requiresPrescription: false },
  
  // Antibiotics
  { id: 17, name: 'Taxim-O 200', price: 145, category: 'Antibiotics', description: 'Cefixime antibiotic for bacterial infections of throat and ears.', image: '/medicines/amoxicillin.png', requiresPrescription: true },
  { id: 18, name: 'Azithral 500', price: 120, category: 'Antibiotics', description: 'Azithromycin for bacterial throat, sinus and respiratory infections.', image: '/medicines/amoxicillin.png', requiresPrescription: true },
  { id: 19, name: 'Augmentin 625 Duo', price: 220, category: 'Antibiotics', description: 'Amoxicillin and Clavulanic acid for tough bacterial infections.', image: '/medicines/amoxicillin.png', requiresPrescription: true },
  
  // Allergy & Cough
  { id: 20, name: 'Allegra 120mg', price: 215, category: 'Allergy', description: 'Fexofenadine for 24-hour non-drowsy allergy and hay fever relief.', image: '/medicines/cetirizine.png', requiresPrescription: false },
  { id: 21, name: 'Cetzine Tablet', price: 20, category: 'Allergy', description: 'Cetirizine for seasonal allergies, cold and sneezing relief.', image: '/medicines/cetirizine.png', requiresPrescription: false },
  { id: 22, name: 'Ascoril LS Syrup', price: 118, category: 'Cough', description: 'Levosalbutamol and Ambroxol for productive wet cough and asthma.', image: '/medicines/cough_syrup.png', requiresPrescription: true },
  { id: 23, name: 'Benadryl DR', price: 125, category: 'Cough', description: 'Antitussive relief from dry cough and throat irritation.', image: '/medicines/cough_syrup.png', requiresPrescription: false },
  
  // First Aid & Skin
  { id: 24, name: 'Dettol Antiseptic', price: 95, category: 'First Aid', description: 'Concentrated antiseptic liquid for first aid and surface hygiene.', image: '/medicines/antiseptic.png', requiresPrescription: false },
  { id: 25, name: 'Betadine Ointment', price: 110, category: 'First Aid', description: 'Povidone-iodine water-soluble ointment for fast wound healing.', image: '/medicines/antiseptic.png', requiresPrescription: false },
  { id: 26, name: 'Volini Spray', price: 160, category: 'First Aid', description: 'Diclofenac pain relief spray for sprains, joints and muscle aches.', image: '/medicines/antiseptic.png', requiresPrescription: false },
  
  // Baby Care
  { id: 27, name: 'Calpol T suspension', price: 40, category: 'Baby Care', description: 'Paracetamol syrup for effective pain and fever relief in children.', image: '/medicines/paracetamol.png', requiresPrescription: false },
  { id: 28, name: 'Himalaya Baby Powder', price: 145, category: 'Baby Care', description: 'Herbal baby powder with olive oil and poppy seeds for soft skin.', image: '/medicines/vitaminc.png', requiresPrescription: false }
];
