import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import HealthVitalsPage from './pages/HealthVitalsPage';
import HealthTypeSelection from './pages/HealthTypeSelection';
import SymptomInputPage from './pages/SymptomInputPage';
import AIConsultationPage from './pages/AIConsultationPage';
import ResultsPage from './pages/ResultsPage';
import { AuthProvider } from './contexts/AuthContext';
import { HealthProvider } from './contexts/HealthContext';

function App() {
  return (
    <AuthProvider>
      <HealthProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <Header />
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/health-vitals" element={<HealthVitalsPage />} />
                <Route path="/health-type" element={<HealthTypeSelection />} />
                <Route path="/symptoms" element={<SymptomInputPage />} />
                <Route path="/consultation" element={<AIConsultationPage />} />
                <Route path="/results" element={<ResultsPage />} />
              </Routes>
            </motion.main>
          </div>
        </Router>
      </HealthProvider>
    </AuthProvider>
  );
}

export default App;