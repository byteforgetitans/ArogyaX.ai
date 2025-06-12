import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Star, 
  Clock, 
  Calendar,
  Pill,
  ShoppingCart,
  MessageCircle,
  Download,
  Share2,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Video,
  Navigation,
  Heart,
  Shield
} from 'lucide-react';
import { useHealth } from '../contexts/HealthContext';

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { symptoms, healthType, vitals } = useHealth();
  const [activeTab, setActiveTab] = useState<'doctors' | 'teleconsult' | 'medicines' | 'pharmacies'>('doctors');

  // Mock data - in production, this would come from APIs
  const aiDiagnosis = {
    condition: healthType === 'physical' ? 'Tension Headache with Mild Fever' : 'Mild Anxiety with Sleep Disturbance',
    confidence: 85,
    severity: 'Mild to Moderate',
    recommendations: [
      'Rest and adequate hydration',
      'Over-the-counter pain relief if needed',
      'Monitor symptoms for 24-48 hours',
      'Consult a doctor if symptoms worsen'
    ],
    redFlags: [
      'Severe or worsening headache',
      'High fever (>101°F)',
      'Neck stiffness',
      'Vision changes'
    ]
  };

  const nearbyDoctors = [
    {
      id: 1,
      name: 'Dr. Priya Sharma',
      specialization: 'General Physician',
      rating: 4.8,
      reviews: 245,
      distance: '0.8 km',
      availability: 'Available Now',
      consultationFee: 500,
      hospital: 'Apollo Clinic',
      address: 'Sector 15, Gurgaon',
      phone: '+91 98765 43210'
    },
    {
      id: 2,
      name: 'Dr. Rajesh Kumar',
      specialization: 'Internal Medicine',
      rating: 4.6,
      reviews: 189,
      distance: '1.2 km',
      availability: 'Next Available: 2:30 PM',
      consultationFee: 600,
      hospital: 'Max Healthcare',
      address: 'DLF Phase 2, Gurgaon',
      phone: '+91 98765 43211'
    },
    {
      id: 3,
      name: 'Dr. Anita Patel',
      specialization: 'Family Medicine',
      rating: 4.9,
      reviews: 312,
      distance: '1.5 km',
      availability: 'Available Today',
      consultationFee: 450,
      hospital: 'Fortis Hospital',
      address: 'Sector 44, Gurgaon',
      phone: '+91 98765 43212'
    }
  ];

  const teleconsultDoctors = [
    {
      id: 1,
      name: 'Dr. Amit Singh',
      specialization: 'General Physician',
      rating: 4.7,
      reviews: 156,
      availability: 'Available Now',
      consultationFee: 300,
      languages: ['English', 'Hindi'],
      experience: '8 years'
    },
    {
      id: 2,
      name: 'Dr. Meera Joshi',
      specialization: 'Internal Medicine',
      rating: 4.8,
      reviews: 203,
      availability: 'Next Available: 1:00 PM',
      consultationFee: 400,
      languages: ['English', 'Hindi', 'Marathi'],
      experience: '12 years'
    }
  ];

  const recommendedMedicines = [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      genericName: 'Acetaminophen',
      dosage: '1 tablet every 6 hours',
      duration: '3-5 days',
      price: '₹25',
      prescription: false,
      sideEffects: ['Nausea', 'Stomach upset'],
      contraindications: ['Liver disease']
    },
    {
      id: 2,
      name: 'Ibuprofen 400mg',
      genericName: 'Ibuprofen',
      dosage: '1 tablet every 8 hours',
      duration: '3-5 days',
      price: '₹35',
      prescription: false,
      sideEffects: ['Stomach irritation', 'Dizziness'],
      contraindications: ['Kidney disease', 'Heart conditions']
    }
  ];

  const nearbyPharmacies = [
    {
      id: 1,
      name: 'Apollo Pharmacy',
      distance: '0.5 km',
      rating: 4.5,
      address: 'Sector 14, Gurgaon',
      phone: '+91 98765 43220',
      hours: '24/7',
      delivery: true,
      inStock: true
    },
    {
      id: 2,
      name: 'MedPlus',
      distance: '0.7 km',
      rating: 4.3,
      address: 'DLF Phase 1, Gurgaon',
      phone: '+91 98765 43221',
      hours: '8 AM - 10 PM',
      delivery: true,
      inStock: true
    },
    {
      id: 3,
      name: '1mg Store',
      distance: '1.1 km',
      rating: 4.6,
      address: 'Sector 29, Gurgaon',
      phone: '+91 98765 43222',
      hours: '9 AM - 9 PM',
      delivery: false,
      inStock: false
    }
  ];

  const handleWhatsAppPrescription = () => {
    // Mock WhatsApp integration
    alert('Prescription sent to your WhatsApp! Check your messages.');
  };

  const handleDownloadReport = () => {
    // Mock download functionality
    alert('Medical report downloaded successfully!');
  };

  const handleBookAppointment = (doctorId: number) => {
    alert(`Booking appointment with doctor ID: ${doctorId}`);
  };

  const handleStartTeleconsult = (doctorId: number) => {
    alert(`Starting teleconsultation with doctor ID: ${doctorId}`);
  };

  const handleOrderMedicine = (medicineId: number) => {
    alert(`Ordering medicine ID: ${medicineId}`);
  };

  const handleNavigateToPharmacy = (pharmacyId: number) => {
    alert(`Opening navigation to pharmacy ID: ${pharmacyId}`);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Your Health Assessment Results
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Based on your symptoms and health information, here's your comprehensive medical guidance and recommendations.
          </p>
        </motion.div>

        {/* AI Diagnosis Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-xl border border-white/20 p-8 mb-8"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Heart className="w-6 h-6 mr-2 text-red-500" />
                AI Assessment
              </h2>
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-600">Likely Condition:</span>
                  <p className="text-lg font-semibold text-gray-900">{aiDiagnosis.condition}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Confidence:</span>
                    <p className="text-lg font-semibold text-green-600">{aiDiagnosis.confidence}%</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Severity:</span>
                    <p className="text-lg font-semibold text-yellow-600">{aiDiagnosis.severity}</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Immediate Recommendations:</h3>
              <ul className="space-y-2">
                {aiDiagnosis.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleWhatsAppPrescription}
              className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-all duration-200 flex items-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Send to WhatsApp</span>
            </button>
            <button
              onClick={handleDownloadReport}
              className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-all duration-200 flex items-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Download Report</span>
            </button>
            <button className="bg-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-600 transition-all duration-200 flex items-center space-x-2">
              <Share2 className="w-5 h-5" />
              <span>Share Results</span>
            </button>
          </div>
        </motion.div>

        {/* Warning Signs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-red-800 mb-3 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            Seek Immediate Medical Attention If You Experience:
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {aiDiagnosis.redFlags.map((flag, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <span className="text-red-700">{flag}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden"
        >
          <div className="flex border-b border-gray-200">
            {[
              { id: 'doctors', label: 'Nearby Doctors', icon: MapPin },
              { id: 'teleconsult', label: 'Teleconsultation', icon: Video },
              { id: 'medicines', label: 'Medicines', icon: Pill },
              { id: 'pharmacies', label: 'Pharmacies', icon: ShoppingCart }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Nearby Doctors Tab */}
            {activeTab === 'doctors' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommended Doctors Near You</h3>
                {nearbyDoctors.map((doctor) => (
                  <div key={doctor.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{doctor.name}</h4>
                        <p className="text-blue-600 font-medium">{doctor.specialization}</p>
                        <p className="text-gray-600">{doctor.hospital}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{doctor.rating}</span>
                          <span className="text-gray-500">({doctor.reviews})</span>
                        </div>
                        <p className="text-sm text-gray-600">{doctor.distance} away</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">{doctor.availability}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-700">{doctor.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-gray-700">{doctor.address}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-lg font-semibold text-gray-900">₹{doctor.consultationFee}</span>
                        <span className="text-gray-600 ml-1">consultation fee</span>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleBookAppointment(doctor.id)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2"
                        >
                          <Calendar className="w-4 h-4" />
                          <span>Book Appointment</span>
                        </button>
                        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>Call Now</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Teleconsultation Tab */}
            {activeTab === 'teleconsult' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Online Consultation Available</h3>
                {teleconsultDoctors.map((doctor) => (
                  <div key={doctor.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{doctor.name}</h4>
                        <p className="text-blue-600 font-medium">{doctor.specialization}</p>
                        <p className="text-gray-600">{doctor.experience} experience</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{doctor.rating}</span>
                          <span className="text-gray-500">({doctor.reviews})</span>
                        </div>
                        <p className="text-sm text-green-600 font-medium">{doctor.availability}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <span className="text-sm text-gray-600">Languages: </span>
                      <span className="text-sm text-gray-900">{doctor.languages.join(', ')}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-lg font-semibold text-gray-900">₹{doctor.consultationFee}</span>
                        <span className="text-gray-600 ml-1">for 15 minutes</span>
                      </div>
                      <button
                        onClick={() => handleStartTeleconsult(doctor.id)}
                        className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <Video className="w-4 h-4" />
                        <span>Start Video Call</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Medicines Tab */}
            {activeTab === 'medicines' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommended Medicines</h3>
                {recommendedMedicines.map((medicine) => (
                  <div key={medicine.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{medicine.name}</h4>
                        <p className="text-gray-600">{medicine.genericName}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          {!medicine.prescription && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                              No Prescription Required
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">{medicine.price}</p>
                        <p className="text-sm text-gray-600">per strip</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-sm font-medium text-gray-700">Dosage:</span>
                        <p className="text-sm text-gray-600">{medicine.dosage}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Duration:</span>
                        <p className="text-sm text-gray-600">{medicine.duration}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-sm font-medium text-gray-700">Side Effects:</span>
                      <p className="text-sm text-gray-600">{medicine.sideEffects.join(', ')}</p>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm font-medium text-red-700">Avoid if:</span>
                        <span className="text-sm text-red-600 ml-1">{medicine.contraindications.join(', ')}</span>
                      </div>
                      <button
                        onClick={() => handleOrderMedicine(medicine.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Order Now</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pharmacies Tab */}
            {activeTab === 'pharmacies' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Nearby Pharmacies</h3>
                {nearbyPharmacies.map((pharmacy) => (
                  <div key={pharmacy.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{pharmacy.name}</h4>
                        <p className="text-gray-600">{pharmacy.address}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{pharmacy.rating}</span>
                          </div>
                          <span className="text-sm text-gray-600">{pharmacy.distance} away</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-2">
                          {pharmacy.inStock ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-red-500" />
                          )}
                          <span className={`text-sm font-medium ${
                            pharmacy.inStock ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {pharmacy.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{pharmacy.hours}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-blue-500" />
                          <span className="text-sm text-gray-700">{pharmacy.phone}</span>
                        </div>
                        {pharmacy.delivery && (
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                            Home Delivery
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleNavigateToPharmacy(pharmacy.id)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2"
                        >
                          <Navigation className="w-4 h-4" />
                          <span>Navigate</span>
                        </button>
                        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>Call</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl"
        >
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-2">Medical Disclaimer</p>
              <p className="leading-relaxed">
                This AI assessment is for informational purposes only and should not replace professional medical advice, 
                diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with 
                any questions you may have regarding a medical condition. Never disregard professional medical advice or 
                delay in seeking it because of something you have read on this platform.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsPage;