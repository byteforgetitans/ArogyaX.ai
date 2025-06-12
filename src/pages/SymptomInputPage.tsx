import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Type, 
  Send, 
  ArrowRight, 
  Volume2,
  AlertCircle,
  Languages,
  Bot,
  User,
  Loader,
  CheckCircle,
  Mic
} from 'lucide-react';
import { useHealth } from '../contexts/HealthContext';
import VoiceAssistant from '../components/VoiceAssistant';
import { analyzeSymptoms, generateAIResponse } from '../utils/aiResponses';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const SymptomInputPage: React.FC = () => {
  const navigate = useNavigate();
  const { healthType, setSymptoms } = useHealth();
  
  const [inputMethod, setInputMethod] = useState<'voice' | 'text'>('text');
  const [textInput, setTextInput] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAIResponding, setIsAIResponding] = useState(false);
  const [conversationStep, setConversationStep] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false); // User preference for auto-speaking

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
  ];

  // Initialize conversation with AI greeting (NO AUTO-SPEAK)
  useEffect(() => {
    if (messages.length === 0) {
      const greeting = {
        id: '1',
        role: 'ai' as const,
        content: `Hello! I'm your AI health assistant. I understand you're experiencing ${healthType} health concerns. Please describe your symptoms in detail, and I'll help analyze them and provide guidance. You can speak or type in your preferred language.`,
        timestamp: new Date()
      };
      setMessages([greeting]);
      // REMOVED AUTO-SPEAK - AI only speaks when user requests it
    }
  }, [healthType, messages.length]);

  const handleVoiceInput = (text: string) => {
    setTextInput(text);
    // Auto-send voice input after a short delay
    setTimeout(() => {
      if (text.trim()) {
        handleSendMessage(text);
      }
    }, 500);
  };

  const speakText = (text: string) => {
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLanguage === 'en' ? 'en-US' : 
                    selectedLanguage === 'hi' ? 'hi-IN' : 
                    selectedLanguage === 'ta' ? 'ta-IN' : 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;
    
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (messageText?: string) => {
    const content = messageText || textInput;
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsAIResponding(true);

    // Analyze symptoms if this is the first user message
    if (conversationStep === 0) {
      const analysis = analyzeSymptoms(content, selectedLanguage);
      
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: 'ai',
          content: analysis.response,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, aiResponse]);
        setIsAIResponding(false);
        setConversationStep(1);

        // ONLY speak if user has enabled auto-speak
        if (autoSpeak) {
          speakText(analysis.response);
        }

        // If it's an emergency, don't continue the conversation
        if (analysis.urgencyLevel === 'high' && analysis.suggestedActions.includes('Call emergency services immediately')) {
          return;
        }

        // Ask follow-up questions
        if (analysis.followUpQuestions.length > 0) {
          setTimeout(() => {
            const followUpMessage: Message = {
              id: (Date.now() + 2).toString(),
              role: 'ai',
              content: analysis.followUpQuestions[0],
              timestamp: new Date()
            };
            setMessages(prev => [...prev, followUpMessage]);
            
            // ONLY speak if user has enabled auto-speak
            if (autoSpeak) {
              speakText(analysis.followUpQuestions[0]);
            }
          }, 2000);
        }
      }, 2000);
    } else {
      // Generate contextual AI response
      const contextMessages = messages.filter(m => m.role === 'user').map(m => m.content);
      const aiResponseText = generateAIResponse(content, contextMessages, selectedLanguage);
      
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: 'ai',
          content: aiResponseText,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, aiResponse]);
        setIsAIResponding(false);
        setConversationStep(prev => prev + 1);

        // ONLY speak if user has enabled auto-speak
        if (autoSpeak) {
          speakText(aiResponseText);
        }

        // After 5 exchanges, offer to proceed to consultation
        if (conversationStep >= 4) {
          setTimeout(() => {
            const finalMessage: Message = {
              id: (Date.now() + 2).toString(),
              role: 'ai',
              content: "Thank you for providing all this information. I have enough details to provide you with a comprehensive assessment and recommendations. Would you like to proceed to get your results?",
              timestamp: new Date()
            };
            setMessages(prev => [...prev, finalMessage]);
            
            // ONLY speak if user has enabled auto-speak
            if (autoSpeak) {
              speakText(finalMessage.content);
            }
          }, 3000);
        }
      }, 1500);
    }

    setTextInput('');
  };

  const handleSubmit = () => {
    if (messages.filter(m => m.role === 'user').length === 0) {
      alert('Please describe your symptoms first.');
      return;
    }

    const userMessages = messages.filter(m => m.role === 'user');
    const combinedSymptoms = userMessages.map(m => m.content).join(' ');

    const symptomData = {
      text: combinedSymptoms,
      audioUrl: undefined,
      language: selectedLanguage,
      inputMethod
    };

    setSymptoms(symptomData);
    navigate('/consultation');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 bg-clip-text text-transparent mb-4">
            AI Health Assistant - {healthType === 'physical' ? 'Physical' : 'Mental'} Health
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Describe your symptoms using voice or text. Our AI will analyze your concerns and provide personalized medical guidance through an interactive conversation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
            >
              {/* Chat Header with 3D Effects */}
              <div className="bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 p-6 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-pink-600/20 backdrop-blur-sm"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/30"
                      whileHover={{ scale: 1.1, rotateY: 15 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Bot className="w-6 h-6" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-semibold">AI Health Assistant</h3>
                      <p className="text-cyan-100 text-sm">
                        {isAIResponding ? 'Analyzing your response...' : 
                         isSpeaking ? 'Speaking...' : 
                         isListening ? 'Listening...' : 
                         'Ready to help'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {/* Auto-speak toggle */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setAutoSpeak(!autoSpeak)}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          autoSpeak 
                            ? 'bg-white/20 text-white' 
                            : 'bg-white/10 text-white/60 hover:bg-white/15'
                        }`}
                        title={autoSpeak ? 'Auto-speak enabled' : 'Auto-speak disabled'}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <span className="text-xs">Auto-speak</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-red-400 animate-pulse' : 'bg-green-400'} shadow-lg`}></div>
                      <span className="text-sm font-medium">Voice {isListening ? 'Recording' : 'Ready'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages Container */}
              <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-br from-gray-50/50 to-white/50">
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
                          <motion.div 
                            className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                              message.role === 'user' 
                                ? 'bg-gradient-to-br from-cyan-400 via-blue-500 to-pink-500 text-white' 
                                : 'bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white'
                            }`}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          >
                            {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                          </motion.div>
                          <div className={`rounded-2xl p-4 shadow-lg backdrop-blur-sm border border-white/20 ${
                            message.role === 'user'
                              ? 'bg-gradient-to-br from-cyan-400 via-blue-500 to-pink-500 text-white'
                              : 'bg-white/80 text-gray-900'
                          }`}>
                            <p className="text-sm leading-relaxed">{message.content}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className={`text-xs ${
                                message.role === 'user' ? 'text-cyan-100' : 'text-gray-500'
                              }`}>
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                              {message.role === 'ai' && (
                                <button
                                  onClick={() => speakText(message.content)}
                                  className="p-1 rounded hover:bg-black/10 transition-colors text-gray-500 hover:text-gray-700"
                                  disabled={isSpeaking}
                                  title="Click to hear this message"
                                >
                                  <Volume2 className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* AI Typing Indicator */}
                {isAIResponding && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-6 bg-gradient-to-r from-gray-50/50 to-white/50">
                {/* Language Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Languages className="w-4 h-4 inline mr-2" />
                    Language
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((lang) => (
                      <motion.button
                        key={lang.code}
                        onClick={() => setSelectedLanguage(lang.code)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-3 py-1 rounded-lg border text-sm transition-all duration-200 ${
                          selectedLanguage === lang.code
                            ? 'border-blue-500 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-pink-500/20 text-blue-700 shadow-lg'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        {lang.flag} {lang.name}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Input Method Selection */}
                <div className="flex mb-4 p-1 bg-gray-100 rounded-xl">
                  <button
                    onClick={() => setInputMethod('text')}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                      inputMethod === 'text'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <Type className="w-4 h-4" />
                    <span>Type</span>
                  </button>
                  <button
                    onClick={() => setInputMethod('voice')}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                      inputMethod === 'voice'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <Mic className="w-4 h-4" />
                    <span>Voice</span>
                  </button>
                </div>

                {/* Voice Assistant */}
                {inputMethod === 'voice' && (
                  <div className="mb-4 p-4 bg-gradient-to-br from-cyan-50/50 via-blue-50/50 to-pink-50/50 rounded-xl border border-white/20">
                    <VoiceAssistant
                      onVoiceInput={handleVoiceInput}
                      onSpeak={speakText}
                      isListening={isListening}
                      isSpeaking={isSpeaking}
                      language={selectedLanguage === 'en' ? 'en-US' : 
                               selectedLanguage === 'hi' ? 'hi-IN' : 
                               selectedLanguage === 'ta' ? 'ta-IN' : 'en-US'}
                    />
                  </div>
                )}

                {/* Text Input */}
                <div className="flex items-end space-x-4">
                  <div className="flex-1">
                    <textarea
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={
                        inputMethod === 'voice' 
                          ? "Voice input will appear here... You can also edit it manually."
                          : "Type your message here..."
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none bg-white/80 backdrop-blur-sm"
                      rows={2}
                    />
                  </div>
                  <div className="flex space-x-2">
                    {textInput && (
                      <motion.button
                        onClick={() => speakText(textInput)}
                        disabled={isSpeaking}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200 disabled:opacity-50"
                        title="Click to hear your text"
                      >
                        <Volume2 className="w-5 h-5" />
                      </motion.button>
                    )}
                    <motion.button
                      onClick={() => handleSendMessage()}
                      disabled={!textInput.trim() || isAIResponding}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 text-white p-3 rounded-xl hover:from-cyan-500 hover:via-blue-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Proceed Button */}
                {conversationStep >= 2 && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={handleSubmit}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-4 bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <span>Proceed to AI Analysis</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Voice Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Volume2 className="w-5 h-5 mr-2 text-blue-500" />
                Voice Settings
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Auto-speak AI responses:</span>
                  <button
                    onClick={() => setAutoSpeak(!autoSpeak)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      autoSpeak ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        autoSpeak ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  {autoSpeak 
                    ? 'AI responses will be spoken automatically' 
                    : 'Click the speaker icon to hear AI responses'
                  }
                </p>
              </div>
            </motion.div>

            {/* Conversation Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Conversation Progress
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">AI Assistant initialized</span>
                </div>
                <div className="flex items-center space-x-3">
                  {messages.filter(m => m.role === 'user').length > 0 ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                  )}
                  <span className="text-sm text-gray-700">Symptoms described</span>
                </div>
                <div className="flex items-center space-x-3">
                  {conversationStep >= 2 ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : conversationStep >= 1 ? (
                    <Loader className="w-5 h-5 text-blue-500 animate-spin" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                  )}
                  <span className="text-sm text-gray-700">Follow-up questions</span>
                </div>
                <div className="flex items-center space-x-3">
                  {conversationStep >= 4 ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                  )}
                  <span className="text-sm text-gray-700">Ready for analysis</span>
                </div>
              </div>
            </motion.div>

            {/* Voice Assistant Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-br from-cyan-50/50 via-blue-50/50 to-pink-50/50 rounded-2xl shadow-xl border border-white/20 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Mic className="w-5 h-5 mr-2 text-blue-500" />
                Voice Assistant Tips
              </h3>
              
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <div>Click the microphone to start speaking</div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full mt-2 flex-shrink-0" />
                  <div>Use the speaker button to hear any message</div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full mt-2 flex-shrink-0" />
                  <div>Toggle auto-speak for automatic AI responses</div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full mt-2 flex-shrink-0" />
                  <div>You can edit voice transcriptions manually</div>
                </div>
              </div>
            </motion.div>

            {/* Emergency Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-red-50 border border-red-200 rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-red-800 mb-3 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                Emergency?
              </h3>
              
              <div className="text-sm text-red-700 space-y-2">
                <p>If you're experiencing a medical emergency:</p>
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

export default SymptomInputPage;