import React, { createContext, useContext, useState } from 'react';

interface HealthVitals {
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  bloodSugar: number;
  heartRate: number;
  weight: number;
  height: number;
  bmi: number;
}

interface SymptomData {
  text: string;
  audioUrl?: string;
  language: string;
  inputMethod: 'voice' | 'text';
}

interface HealthContextType {
  healthType: 'physical' | 'mental' | null;
  vitals: HealthVitals | null;
  symptoms: SymptomData | null;
  conversationHistory: Array<{ role: 'user' | 'ai'; content: string; timestamp: Date }>;
  setHealthType: (type: 'physical' | 'mental') => void;
  setVitals: (vitals: HealthVitals) => void;
  setSymptoms: (symptoms: SymptomData) => void;
  addMessage: (role: 'user' | 'ai', content: string) => void;
  clearConversation: () => void;
}

const HealthContext = createContext<HealthContextType | undefined>(undefined);

export const useHealth = () => {
  const context = useContext(HealthContext);
  if (context === undefined) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
};

export const HealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [healthType, setHealthType] = useState<'physical' | 'mental' | null>(null);
  const [vitals, setVitals] = useState<HealthVitals | null>(null);
  const [symptoms, setSymptoms] = useState<SymptomData | null>(null);
  const [conversationHistory, setConversationHistory] = useState<Array<{ role: 'user' | 'ai'; content: string; timestamp: Date }>>([]);

  const addMessage = (role: 'user' | 'ai', content: string) => {
    const newMessage = {
      role,
      content,
      timestamp: new Date()
    };
    setConversationHistory(prev => [...prev, newMessage]);
  };

  const clearConversation = () => {
    setConversationHistory([]);
  };

  const value = {
    healthType,
    vitals,
    symptoms,
    conversationHistory,
    setHealthType,
    setVitals,
    setSymptoms,
    addMessage,
    clearConversation
  };

  return (
    <HealthContext.Provider value={value}>
      {children}
    </HealthContext.Provider>
  );
};