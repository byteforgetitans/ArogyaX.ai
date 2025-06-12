import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Brain, ArrowRight, Shield, Zap } from 'lucide-react';
import { useHealth } from '../contexts/HealthContext';

const HealthTypeSelection: React.FC = () => {
  const navigate = useNavigate();
  const { setHealthType } = useHealth();

  const handleHealthTypeSelect = (type: 'physical' | 'mental') => {
    setHealthType(type);
    navigate('/symptoms');
  };

  const healthTypes = [
    {
      id: 'physical',
      title: 'Physical Health',
      subtitle: 'Medical symptoms & conditions',
      description: 'Get AI-powered medical consultation for physical symptoms, pain, injuries, and general health concerns.',
      icon: <Heart className="w-12 h-12" />,
      gradient: 'from-red-500 to-pink-500',
      bgGradient: 'from-red-50 to-pink-50',
      features: [
        'Symptom analysis & diagnosis',
        'Medication recommendations',
        'Doctor referrals',
        'Treatment guidance'
      ]
    },
    {
      id: 'mental',
      title: 'Mental Health',
      subtitle: 'Psychological & emotional wellness',
      description: 'Receive compassionate AI support for mental health concerns, stress, anxiety, and emotional well-being.',
      icon: <Brain className="w-12 h-12" />,
      gradient: 'from-blue-500 to-purple-500',
      bgGradient: 'from-blue-50 to-purple-50',
      features: [
        'Emotional assessment',
        'Coping strategies',
        'Therapist referrals',
        'Wellness resources'
      ]
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Choose Your Health Focus
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select the type of health concern you'd like to discuss with our AI healthcare assistant. 
            Both options provide personalized, confidential consultations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {healthTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => handleHealthTypeSelect(type.id as 'physical' | 'mental')}
            >
              <div className={`bg-gradient-to-br ${type.bgGradient} rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 group-hover:border-opacity-50`}>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-r ${type.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                    {type.icon}
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ArrowRight className="w-6 h-6 text-gray-600" />
                  </div>
                </div>

                {/* Content */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {type.title}
                  </h3>
                  <p className="text-sm font-medium text-gray-600 mb-3">
                    {type.subtitle}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {type.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 text-sm">What you'll get:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {type.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className={`w-2 h-2 bg-gradient-to-r ${type.gradient} rounded-full`} />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full mt-6 bg-gradient-to-r ${type.gradient} text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2`}
                >
                  <span>Select {type.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6"
        >
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-center md:text-left">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700">100% Confidential</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">Instant AI Response</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium text-gray-700">Medically Validated</span>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl"
        >
          <div className="flex items-start space-x-2">
            <Shield className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-1">Medical Disclaimer</p>
              <p>
                This AI consultation is for informational purposes only and should not replace professional medical advice. 
                For emergencies, please contact your local emergency services immediately.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HealthTypeSelection;