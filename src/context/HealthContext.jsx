import React, { createContext, useContext, useReducer, useEffect } from 'react';

const HealthContext = createContext();

const STORAGE_KEY = 'vitalis_health_data';

const defaultState = {
  language: 'en',
  cart: [],
  userRecords: [
    { date: '2026-05-10', type: 'Blood Test', status: 'Completed', doctor: 'Dr. Sarah Wilson', report: 'Hemoglobin: 14.2 g/dL' },
    { date: '2026-04-15', type: 'X-Ray', status: 'Archived', doctor: 'Dr. James Miller', report: 'Chest X-ray clear' },
    { date: '2026-03-20', type: 'Vaccination', status: 'Completed', doctor: 'Vitalis Clinic', report: 'Annual Flu Shot' }
  ],
  vitals: {
    heartRate: { value: 105, unit: 'bpm', label: 'Heart Rate' },
    bloodPressure: { systolic: 145, diastolic: 95, unit: 'mmHg', label: 'Blood Pressure' },
    bloodGlucose: { value: 180, unit: 'mg/dL', label: 'Blood Glucose' },
    oxygen: { value: 94, unit: '%', label: 'Oxygen (SpO2)' }
  },
  accessPassword: '1234', // Default demo password
  symptoms: null,
  diagnosis: null,
  isEmergency: false,
  isChatOpen: false
};

// Load initial state from localStorage
const getInitialState = () => {
  const savedState = localStorage.getItem(STORAGE_KEY);
  return savedState ? JSON.parse(savedState) : defaultState;
};

function healthReducer(state, action) {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'ADD_RECORD':
      return { ...state, userRecords: [action.payload, ...state.userRecords] };
    case 'DELETE_RECORD':
      return { ...state, userRecords: state.userRecords.filter((_, i) => i !== action.payload) };
    case 'ADD_TO_CART':
      const existing = state.cart.find(item => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map(item => 
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
      }
      return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'SET_SYMPTOMS':
      return { ...state, symptoms: action.payload, diagnosis: action.diagnosis };
    case 'TOGGLE_EMERGENCY':
      return { ...state, isEmergency: !state.isEmergency };
    case 'TOGGLE_CHAT':
      return { ...state, isChatOpen: action.payload !== undefined ? action.payload : !state.isChatOpen };
    default:
      return state;
  }
}

export const HealthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(healthReducer, getInitialState());

  // Persist state changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <HealthContext.Provider value={{ state, dispatch }}>
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => useContext(HealthContext);
