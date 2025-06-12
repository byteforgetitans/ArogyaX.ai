import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Activity, 
  Droplets, 
  Weight, 
  Ruler, 
  ArrowRight, 
  Smartphone,
  RefreshCw,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { useHealth } from '../contexts/HealthContext';

const HealthVitalsPage: React.FC = () => {
  const navigate = useNavigate();
  const { setVitals } = useHealth();
  
  const [vitalsData, setVitalsData] = useState({
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    bloodSugar: '',
    heartRate: '',
    weight: '',
    height: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showDeviceOptions, setShowDeviceOptions] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVitalsData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const calculateBMI = (weight: number, height: number) => {
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
    if (bmi < 25) return { category: 'Normal', color: 'text-green-600' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600' };
    return { category: 'Obese', color: 'text-red-600' };
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    const systolic = parseFloat(vitalsData.bloodPressureSystolic);
    const diastolic = parseFloat(vitalsData.bloodPressureDiastolic);
    const bloodSugar = parseFloat(vitalsData.bloodSugar);
    const heartRate = parseFloat(vitalsData.heartRate);
    const weight = parseFloat(vitalsData.weight);
    const height = parseFloat(vitalsData.height);

    // Blood Pressure validation
    if (!vitalsData.bloodPressureSystolic || systolic < 70 || systolic > 200) {
      newErrors.bloodPressureSystolic = 'Please enter a valid systolic pressure (70-200 mmHg)';
    }
    if (!vitalsData.bloodPressureDiastolic || diastolic < 40 || diastolic > 120) {
      newErrors.bloodPressureDiastolic = 'Please enter a valid diastolic pressure (40-120 mmHg)';
    }

    // Blood Sugar validation
    if (!vitalsData.bloodSugar || bloodSugar < 50 || bloodSugar > 400) {
      newErrors.bloodSugar = 'Please enter a valid blood sugar level (50-400 mg/dL)';
    }

    // Heart Rate validation
    if (!vitalsData.heartRate || heartRate < 40 || heartRate > 200) {
      newErrors.heartRate = 'Please enter a valid heart rate (40-200 bpm)';
    }

    // Weight validation
    if (!vitalsData.weight || weight < 20 || weight > 300) {
      newErrors.weight = 'Please enter a valid weight (20-300 kg)';
    }

    // Height validation
    if (!vitalsData.height || height < 100 || height > 250) {
      newErrors.height = 'Please enter a valid height (100-250 cm)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const weight = parseFloat(vitalsData.weight);
    const height = parseFloat(vitalsData.height);
    const bmi = calculateBMI(weight, height);

    const healthVitals = {
      bloodPressureSystolic: parseFloat(vitalsData.bloodPressureSystolic),
      bloodPressureDiastolic: parseFloat(vitalsData.bloodPressureDiastolic),
      bloodSugar: parseFloat(vitalsData.bloodSugar),
      heartRate: parseFloat(vitalsData.heartRate),
      weight,
      height,
      bmi
    };

    setVitals(healthVitals);
    navigate('/health-type');
  };

  const connectDevice = (deviceType: string) => {
    // Mock device connection - in production, this would integrate with actual health devices
    console.log('Connecting to', deviceType);
    setShowDeviceOptions(false);
    
    // Simulate loading data from device
    setTimeout(() => {
      setVitalsData({
        bloodPressureSystolic: '120',
        bloodPressureDiastolic: '80',
        bloodSugar: '95',
        heartRate: '72',
        weight: '70',
        height: '170'
      });
    }, 2000);
  };

  const currentBMI = vitalsData.weight && vitalsData.height 
    ? calculateBMI(parseFloat(vitalsData.weight), parseFloat(vitalsData.height))
    : null;

  const bmiInfo = currentBMI ? getBMICategory(currentBMI) : null;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Health Vitals Input
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter your current health vitals to get personalized AI medical consultation. 
            All measurements are securely stored and used only for your health assessment.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8"
            >
              {/* Device Integration Option */}
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-6 h-6 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Connect Health Device</h3>
                      <p className="text-sm text-gray-600">Import data from your health monitoring devices</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDeviceOptions(!showDeviceOptions)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Connect
                  </button>
                </div>
                
                {showDeviceOptions && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 pt-4 border-t border-blue-200"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      {['Google Fit', 'Apple Health', 'Fitbit', 'Samsung Health'].map((device) => (
                        <button
                          key={device}
                          onClick={() => connectDevice(device)}
                          className="p-3 text-left bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                        >
                          <div className="font-medium text-gray-900">{device}</div>
                          <div className="text-xs text-gray-500">Connect & sync data</div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Blood Pressure */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Heart className="w-4 h-4 inline mr-2 text-red-500" />
                      Systolic BP (mmHg)
                    </label>
                    <input
                      type="number"
                      name="bloodPressureSystolic"
                      value={vitalsData.bloodPressureSystolic}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.bloodPressureSystolic ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="120"
                    />
                    {errors.bloodPressureSystolic && (
                      <p className="mt-1 text-sm text-red-600">{errors.bloodPressureSystolic}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Heart className="w-4 h-4 inline mr-2 text-red-500" />
                      Diastolic BP (mmHg)
                    </label>
                    <input
                      type="number"
                      name="bloodPressureDiastolic"
                      value={vitalsData.bloodPressureDiastolic}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.bloodPressureDiastolic ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="80"
                    />
                    {errors.bloodPressureDiastolic && (
                      <p className="mt-1 text-sm text-red-600">{errors.bloodPressureDiastolic}</p>
                    )}
                  </div>
                </div>

                {/* Blood Sugar and Heart Rate */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Droplets className="w-4 h-4 inline mr-2 text-blue-500" />
                      Blood Sugar (mg/dL)
                    </label>
                    <input
                      type="number"
                      name="bloodSugar"
                      value={vitalsData.bloodSugar}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.bloodSugar ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="95"
                    />
                    {errors.bloodSugar && (
                      <p className="mt-1 text-sm text-red-600">{errors.bloodSugar}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Activity className="w-4 h-4 inline mr-2 text-green-500" />
                      Heart Rate (bpm)
                    </label>
                    <input
                      type="number"
                      name="heartRate"
                      value={vitalsData.heartRate}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.heartRate ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="72"
                    />
                    {errors.heartRate && (
                      <p className="mt-1 text-sm text-red-600">{errors.heartRate}</p>
                    )}
                  </div>
                </div>

                {/* Weight and Height */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Weight className="w-4 h-4 inline mr-2 text-purple-500" />
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={vitalsData.weight}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.weight ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="70"
                    />
                    {errors.weight && (
                      <p className="mt-1 text-sm text-red-600">{errors.weight}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Ruler className="w-4 h-4 inline mr-2 text-indigo-500" />
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      name="height"
                      value={vitalsData.height}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.height ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="170"
                    />
                    {errors.height && (
                      <p className="mt-1 text-sm text-red-600">{errors.height}</p>
                    )}
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Continue to Health Assessment</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Sidebar - BMI Calculator & Health Tips */}
          <div className="space-y-6">
            {/* BMI Calculator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                BMI Calculator
              </h3>
              
              {currentBMI ? (
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {currentBMI.toFixed(1)}
                  </div>
                  <div className={`text-lg font-semibold mb-4 ${bmiInfo?.color}`}>
                    {bmiInfo?.category}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        currentBMI < 18.5 ? 'bg-blue-500' :
                        currentBMI < 25 ? 'bg-green-500' :
                        currentBMI < 30 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(currentBMI / 40 * 100, 100)}%` }}
                    />
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>Underweight: &lt; 18.5</div>
                    <div>Normal: 18.5 - 24.9</div>
                    <div>Overweight: 25 - 29.9</div>
                    <div>Obese: ≥ 30</div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <div className="text-lg mb-2">Enter weight and height</div>
                  <div className="text-sm">to calculate your BMI</div>
                </div>
              )}
            </motion.div>

            {/* Health Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-xl border border-white/20 p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-green-500" />
                Health Tips
              </h3>
              
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <div>Measure blood pressure at rest, preferably in the morning</div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <div>Check blood sugar levels 2 hours after meals for accurate readings</div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                  <div>Take measurements at the same time daily for consistent tracking</div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                  <div>Always consult a doctor for concerning vital signs</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthVitalsPage;