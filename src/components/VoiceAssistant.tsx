import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX, Loader, AlertCircle } from 'lucide-react';

interface VoiceAssistantProps {
  onVoiceInput: (text: string) => void;
  onSpeak: (text: string) => void;
  isListening?: boolean;
  isSpeaking?: boolean;
  language?: string;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({
  onVoiceInput,
  onSpeak,
  isListening = false,
  isSpeaking = false,
  language = 'en-US'
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    // Check for speech recognition support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);
    
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = language;

      recognitionRef.current.onstart = () => {
        setIsRecording(true);
        setError(null);
        startAudioVisualization();
      };

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
            setConfidence(result[0].confidence);
          } else {
            interimTranscript += result[0].transcript;
          }
        }

        const currentTranscript = finalTranscript || interimTranscript;
        setTranscript(currentTranscript);
        
        if (finalTranscript) {
          onVoiceInput(finalTranscript);
          setTranscript('');
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        setError(`Speech recognition error: ${event.error}`);
        setIsRecording(false);
        stopAudioVisualization();
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
        stopAudioVisualization();
      };
    }

    // Initialize speech synthesis
    synthRef.current = window.speechSynthesis;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      stopAudioVisualization();
    };
  }, [language, onVoiceInput]);

  const startAudioVisualization = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
      
      microphoneRef.current.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;
      
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      const updateAudioLevel = () => {
        if (analyserRef.current && isRecording) {
          analyserRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / bufferLength;
          setAudioLevel(average / 255);
          animationRef.current = requestAnimationFrame(updateAudioLevel);
        }
      };
      
      updateAudioLevel();
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setError('Microphone access denied');
    }
  };

  const stopAudioVisualization = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setAudioLevel(0);
  };

  const startListening = () => {
    if (!isSupported) {
      setError('Speech recognition not supported in this browser');
      return;
    }

    if (recognitionRef.current && !isRecording) {
      setTranscript('');
      setError(null);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
    }
  };

  const speak = (text: string) => {
    if (!synthRef.current) return;

    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    onSpeak(text);
    synthRef.current.speak(utterance);
  };

  const toggleListening = () => {
    if (isRecording) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Main Microphone Button with 3D Effects */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          onClick={toggleListening}
          disabled={!isSupported}
          className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl ${
            isRecording
              ? 'bg-gradient-to-br from-red-400 via-red-500 to-red-600 animate-pulse'
              : 'bg-gradient-to-br from-cyan-400 via-blue-500 to-pink-500 hover:from-cyan-500 hover:via-blue-600 hover:to-pink-600'
          } ${!isSupported ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {/* 3D Shadow Effect */}
          <div className={`absolute inset-0 w-20 h-20 rounded-full blur-xl -z-10 transition-all duration-300 ${
            isRecording 
              ? 'bg-gradient-to-br from-red-400/40 via-red-500/40 to-red-600/40' 
              : 'bg-gradient-to-br from-cyan-400/30 via-blue-500/30 to-pink-500/30'
          }`}></div>
          
          {/* Audio Level Visualization */}
          {isRecording && (
            <div 
              className="absolute inset-0 rounded-full border-4 border-white/30"
              style={{
                transform: `scale(${1 + audioLevel * 0.3})`,
                transition: 'transform 0.1s ease-out'
              }}
            />
          )}
          
          {isRecording ? (
            <MicOff className="w-8 h-8 text-white" />
          ) : (
            <Mic className="w-8 h-8 text-white" />
          )}
          
          {/* Pulse Animation for Recording */}
          {isRecording && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/50"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </button>
      </motion.div>

      {/* Status Display */}
      <AnimatePresence>
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center"
          >
            <div className="flex items-center space-x-2 text-red-600 font-medium">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span>Listening...</span>
            </div>
            {confidence > 0 && (
              <div className="text-sm text-gray-600 mt-1">
                Confidence: {Math.round(confidence * 100)}%
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transcript Display */}
      <AnimatePresence>
        {transcript && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg max-w-md"
          >
            <p className="text-gray-800 text-sm">{transcript}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center space-x-2 max-w-md"
          >
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audio Visualization */}
      {isRecording && (
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-gradient-to-t from-cyan-400 to-pink-500 rounded-full"
              animate={{
                height: [4, 8 + audioLevel * 20, 4],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Instructions */}
      {!isSupported && (
        <div className="text-center text-gray-600 text-sm max-w-md">
          <p>Voice input is not supported in this browser.</p>
          <p>Please use Chrome, Firefox, or Safari for voice features.</p>
        </div>
      )}

      {isSupported && !isRecording && (
        <div className="text-center text-gray-600 text-sm">
          <p>Click the microphone to start speaking</p>
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;