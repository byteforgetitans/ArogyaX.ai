import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Send, 
  Mic, 
  MicOff, 
  Bot, 
  User, 
  ArrowRight, 
  AlertTriangle,
  Clock,
  CheckCircle,
  Loader,
  Volume2,
  Copy,
  Download
} from 'lucide-react';
import { useHealth } from '../contexts/HealthContext';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

const AIConsultationPage: React.FC = () => {
  const navigate = useNavigate();
  const { symptoms, healthType, vitals, addMessage, conversationHistory } = useHealth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isAITyping, setIsAITyping] = useState(false);
  const [consultationComplete, setConsultationComplete] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize conversation with AI greeting
    if (symptoms && messages.length === 0) {
      const initialMessage: Message = {
        id: '1',
        role: 'ai',
        content: `Hello! I'm your AI medical assistant. I understand you're experiencing ${healthType} health concerns. Based on your symptoms: "${symptoms.text}", I'd like to ask you a few follow-up questions to provide the best possible guidance. 

Let's start: When did these symptoms first begin, and have they gotten worse, better, or stayed the same?`,
        timestamp: new Date()
      };
      setMessages([initialMessage]);
      addMessage('ai', initialMessage.content);
    }
  }, [symptoms, healthType, messages.length, addMessage]);

  const generateAIResponse = (userMessage: string): string => {
    // Mock AI responses - in production, this would call actual AI API
    const responses = [
      "Thank you for that information. Can you tell me more about the intensity of your symptoms on a scale of 1-10?",
      "I see. Have you noticed any specific triggers that make your symptoms worse or better?",
      "That's helpful to know. Are you currently taking any medications or have any known allergies?",
      "Based on what you've shared, I have a few recommendations. Have you experienced anything like this before?",
      "Thank you for providing all this information. Let me analyze your symptoms and provide you with a comprehensive assessment and recommendations."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    addMessage('user', currentMessage);
    setCurrentMessage('');
    setIsAITyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse = generateAIResponse(currentMessage);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      addMessage('ai', aiResponse);
      setIsAITyping(false);

      // Check if consultation should be completed
      if (messages.length >= 8) {
        setTimeout(() => {
          setConsultationComplete(true);
        }, 2000);
      }
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    // Mock voice input - in production, this would use Web Speech API
    if (!isRecording) {
      setTimeout(() => {
        setCurrentMessage("I've been feeling much better since yesterday, but the headache is still there.");
        setIsRecording(false);
      }, 3000);
    }
  };

  const handleCompleteConsultation = () => {
    navigate('/results');
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const speakMessage = (content: string) => {
    // Mock text-to-speech - in production, this would use Web Speech API
    console.log('Speaking:', content);
  };

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
            AI Medical Consultation
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI is analyzing your {healthType} health concerns. Please answer the follow-up questions for a comprehensive assessment.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden"
            >
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">AI Medical Assistant</h3>
                      <p className="text-blue-100 text-sm">
                        {isAITyping ? 'Analyzing your response...' : 'Online and ready to help'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm">Secure Connection</span>
                  </div>
                </div>
              </div>

              {/* Messages Container */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${
                        message.role === 'user' ? 'order-2' : 'order-1'
                      }`}>
                        <div className={`flex items-start space-x-2 ${
                          message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                        }`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.role === 'user' 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-purple-500 text-white'
                          }`}>
                            {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                          </div>
                          <div className={`rounded-2xl p-4 ${
                            message.role === 'user'
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}>
                            <p className="text-sm leading-relaxed">{message.content}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className={`text-xs ${
                                message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                              }`}>
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                              <div className="flex items-center space-x-1">
                                <button
                                  onClick={() => copyMessage(message.content)}
                                  className={`p-1 rounded hover:bg-black/10 transition-colors ${
                                    message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                                  }`}
                                >
                                  <Copy className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => speakMessage(message.content)}
                                  className={`p-1 rounded hover:bg-black/10 transition-colors ${
                                    message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                                  }`}
                                >
                                  <Volume2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* AI Typing Indicator */}
                {isAITyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-gray-100 rounded-2xl p-4">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              {!consultationComplete && (
                <div className="border-t border-gray-200 p-6">
                  <div className="flex items-end space-x-4">
                    <div className="flex-1">
                      <textarea
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your response here..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                        rows={2}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleVoiceInput}
                        className={`p-3 rounded-xl transition-all duration-200 ${
                          isRecording
                            ? 'bg-red-500 text-white animate-pulse'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                      </button>
                      <button
                        onClick={handleSendMessage}
                        disabled={!currentMessage.trim() || isAITyping}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Consultation Complete */}
              {consultationComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-t border-gray-200 p-6 bg-green-50"
                >
                  <div className="text-center">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Consultation Complete!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      I have enough information to provide you with comprehensive recommendations.
                    </p>
                    <button
                      onClick={handleCompleteConsultation}
                      className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-200 flex items-center space-x-2 mx-auto"
                    >
                      <span>View Results & Recommendations</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Consultation Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-500" />
                Consultation Progress
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">Initial symptoms recorded</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">Health vitals captured</span>
                </div>
                <div className="flex items-center space-x-3">
                  {messages.length > 2 ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Loader className="w-5 h-5 text-blue-500 animate-spin" />
                  )}
                  <span className="text-sm text-gray-700">Follow-up questions</span>
                </div>
                <div className="flex items-center space-x-3">
                  {consultationComplete ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                  )}
                  <span className="text-sm text-gray-700">Analysis complete</span>
                </div>
              </div>
            </motion.div>

            {/* Your Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Your Information
              </h3>
              
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Health Type:</span>
                  <span className="ml-2 text-gray-600 capitalize">{healthType}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Primary Symptoms:</span>
                  <p className="text-gray-600 mt-1 text-xs leading-relaxed">
                    {symptoms?.text.substring(0, 100)}...
                  </p>
                </div>
                {vitals && (
                  <div>
                    <span className="font-medium text-gray-700">Vitals:</span>
                    <div className="text-gray-600 mt-1 space-y-1">
                      <div>BP: {vitals.bloodPressureSystolic}/{vitals.bloodPressureDiastolic}</div>
                      <div>Heart Rate: {vitals.heartRate} bpm</div>
                      <div>BMI: {vitals.bmi.toFixed(1)}</div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Emergency Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-red-50 border border-red-200 rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-red-800 mb-3 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Emergency?
              </h3>
              
              <div className="text-sm text-red-700 space-y-2">
                <p>If you're experiencing a medical emergency, please:</p>
                <div className="bg-red-100 p-3 rounded-lg">
                  <p className="font-medium">📞 Call 108 immediately</p>
                  <p className="text-xs mt-1">This AI consultation is not for emergencies</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIConsultationPage;