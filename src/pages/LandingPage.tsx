import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Shield, 
  Zap, 
  Users, 
  Star, 
  ArrowRight, 
  Play,
  CheckCircle,
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  Brain,
  Stethoscope,
  Pill,
  UserCheck,
  Globe,
  Award,
  Code,
  Search,
  BarChart3
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "AI Medical Consultation",
      description: "Instant medical advice powered by advanced AI in 7+ Indian languages with voice and text support"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Voice & Text Input",
      description: "Describe symptoms using voice or text in your preferred language with real-time transcription"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Find Nearby Doctors",
      description: "Locate the best doctors and pharmacies near you with ratings, availability, and directions"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "WhatsApp Prescription",
      description: "Receive prescriptions, medical advice, and follow-up reminders directly on WhatsApp"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Mental Health Support",
      description: "Comprehensive mental health assessments with personalized coping strategies and therapist referrals"
    },
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: "Health Vitals Tracking",
      description: "Monitor blood pressure, heart rate, blood sugar with device integration and trend analysis"
    },
    {
      icon: <Pill className="w-8 h-8" />,
      title: "Medicine Recommendations",
      description: "Get personalized medicine suggestions with dosage, side effects, and pharmacy availability"
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "Teleconsultation",
      description: "Video consultations with verified doctors in multiple languages with instant booking"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Working Mother, Mumbai",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
      content: "ArogyaX.ai helped me understand my child's fever symptoms at 2 AM. The AI consultation was accurate and gave me peace of mind.",
      rating: 5
    },
    {
      name: "Rajesh Kumar",
      role: "Senior Citizen, Delhi",
      avatar: "https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150",
      content: "Being able to consult in Hindi made all the difference. The platform found me the right doctor for my diabetes management.",
      rating: 5
    },
    {
      name: "Dr. Anita Patel",
      role: "General Physician, Ahmedabad",
      avatar: "https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=150",
      content: "I recommend ArogyaX.ai to my patients for initial consultations. The AI provides surprisingly accurate preliminary assessments.",
      rating: 5
    }
  ];

  const stats = [
    { number: "1M+", label: "Consultations Completed" },
    { number: "50K+", label: "Doctors Connected" },
    { number: "7", label: "Indian Languages" },
    { number: "99.9%", label: "Uptime Guarantee" }
  ];

  const teamMembers = [
    {
      name: "Rupam Karmakar",
      role: "Tech Lead",
      icon: <Code className="w-6 h-6" />,
      gradient: "from-cyan-400 via-blue-500 to-pink-500"
    },
    {
      name: "Aritra Das",
      role: "Research Analyst",
      icon: <Search className="w-6 h-6" />,
      gradient: "from-blue-500 via-purple-500 to-pink-500"
    },
    {
      name: "Bristi Samanta",
      role: "Web Design & Testing",
      icon: <BarChart3 className="w-6 h-6" />,
      gradient: "from-pink-500 via-red-500 to-orange-500"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Modern Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Enhanced Background with Logo Colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900" />
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-600/20 via-blue-600/30 to-pink-600/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-400/10 via-transparent to-transparent" />
        
        {/* Floating Logo Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              y: [0, -30, 0],
              x: [0, 20, 0],
              rotate: [0, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              y: [0, 40, 0],
              x: [0, -25, 0],
              rotate: [0, -15, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-pink-400/30 to-purple-500/30 rounded-full blur-2xl"
          />
          <motion.div
            animate={{ 
              y: [0, -25, 0],
              x: [0, 30, 0],
              scale: [1, 1.15, 1]
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-40 left-1/4 w-28 h-28 bg-gradient-to-r from-blue-400/25 to-cyan-500/25 rounded-full blur-xl"
          />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            {/* Logo Integration in Hero */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center mb-8"
            >
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-400 via-blue-500 to-pink-500 p-1 shadow-2xl">
                <div className="w-full h-full rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <img
                    src="/ArogyaX.ai Logo.png"
                    alt="ArogyaX.ai"
                    className="w-16 h-16 object-contain filter drop-shadow-2xl"
                  />
                </div>
              </div>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              India's Most Advanced
              <br />
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-pink-300 bg-clip-text text-transparent">
                AI Healthcare Platform
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Get instant medical consultations in your language, find the best doctors, 
              receive prescriptions on WhatsApp, and track your health vitals. Complete healthcare ecosystem powered by AI.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <Link
                to="/auth"
                className="group bg-gradient-to-r from-white via-gray-50 to-white text-gray-900 px-10 py-5 rounded-2xl font-semibold text-lg hover:from-gray-50 hover:via-white hover:to-gray-50 transition-all duration-300 hover:scale-105 shadow-2xl flex items-center space-x-3 hover:shadow-white/20"
              >
                <span>Start Free Consultation</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="group flex items-center space-x-3 text-white/90 hover:text-white transition-colors duration-200">
                <div className="w-14 h-14 bg-gradient-to-r from-white/10 via-white/20 to-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:from-white/20 group-hover:via-white/30 group-hover:to-white/20 transition-all duration-300">
                  <Play className="w-6 h-6 ml-1" />
                </div>
                <span className="font-medium">Watch Demo</span>
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex flex-wrap justify-center items-center gap-8 text-white/80"
            >
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span className="text-sm font-medium">1M+ Users Trust Us</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span className="text-sm font-medium">Instant AI Response</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Modern Stats Section */}
      <section className="py-24 bg-gradient-to-r from-white via-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-200">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Features Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 bg-clip-text text-transparent mb-6">
              Complete Healthcare Ecosystem
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From symptoms to prescription delivery, we've built everything you need for comprehensive healthcare management with AI-powered insights.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-200">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-br from-cyan-50 via-blue-50 to-pink-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 bg-clip-text text-transparent mb-6">
              How ArogyaX.ai Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get medical help in just 3 simple steps. No appointments, no waiting, just instant healthcare with comprehensive support.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Describe Symptoms",
                description: "Tell us about your health concerns using voice or text in your preferred language with health vitals tracking",
                icon: <MessageCircle className="w-8 h-8" />
              },
              {
                step: "02",
                title: "AI Analysis",
                description: "Our advanced AI analyzes your symptoms, vitals, and medical history to provide personalized medical guidance",
                icon: <Zap className="w-8 h-8" />
              },
              {
                step: "03",
                title: "Get Complete Care",
                description: "Receive prescriptions on WhatsApp, find nearby doctors, book teleconsultations, and get medicine recommendations",
                icon: <CheckCircle className="w-8 h-8" />
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative text-center group"
              >
                <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 bg-clip-text text-transparent mb-6">
                    {item.step}
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 rounded-2xl flex items-center justify-center text-white mb-6 mx-auto group-hover:scale-110 transition-transform duration-200">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                
                {/* Connector Line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-12 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 transform -translate-y-1/2 z-10" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 bg-clip-text text-transparent mb-6">
              Meet the Byte Forge Titans
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The innovative team behind ArogyaX.ai, dedicated to revolutionizing healthcare through cutting-edge AI technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105 text-center">
                  <div className={`w-20 h-20 bg-gradient-to-r ${member.gradient} rounded-2xl flex items-center justify-center text-white mb-6 mx-auto group-hover:scale-110 transition-transform duration-200 shadow-lg`}>
                    {member.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className={`font-semibold bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent`}>
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 rounded-3xl p-10 text-white shadow-2xl max-w-2xl mx-auto">
              <Award className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Byte Forge Titans</h3>
              <p className="text-cyan-100 leading-relaxed">
                Forging the future of healthcare technology with innovation, dedication, and expertise. 
                Together, we're making quality healthcare accessible to everyone.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 bg-clip-text text-transparent mb-6">
              Trusted by Millions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from real people who've experienced the power of AI-driven healthcare with comprehensive support.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center space-x-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-8 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 p-0.5">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-600/20 via-blue-600/30 to-pink-600/20" />
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.6, 0.3],
              rotate: [360, 180, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-r from-pink-400/40 to-purple-500/40 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            {/* Logo in CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center mb-8"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-pink-500 p-0.5 shadow-2xl">
                <div className="w-full h-full rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <img
                    src="/ArogyaX.ai Logo.png"
                    alt="ArogyaX.ai"
                    className="w-12 h-12 object-contain filter drop-shadow-lg"
                  />
                </div>
              </div>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              Ready to Transform Your Healthcare Experience?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join millions of Indians who trust ArogyaX.ai for their complete healthcare needs. 
              Get started with your free consultation and experience the future of healthcare today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/auth"
                className="group bg-gradient-to-r from-white via-gray-50 to-white text-gray-900 px-10 py-5 rounded-2xl font-semibold text-lg hover:from-gray-50 hover:via-white hover:to-gray-50 transition-all duration-300 hover:scale-105 shadow-2xl flex items-center space-x-3 hover:shadow-white/20"
              >
                <Heart className="w-5 h-5 text-red-500" />
                <span>Start Your Health Journey</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <div className="text-white/80 text-sm">
                <span className="font-medium">✓ Free consultation</span>
                <span className="mx-2">•</span>
                <span className="font-medium">✓ No credit card required</span>
                <span className="mx-2">•</span>
                <span className="font-medium">✓ Complete healthcare ecosystem</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;