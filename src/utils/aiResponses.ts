interface SymptomAnalysis {
  response: string;
  followUpQuestions: string[];
  urgencyLevel: 'low' | 'medium' | 'high';
  suggestedActions: string[];
}

export const analyzeSymptoms = (symptoms: string, language: string = 'en'): SymptomAnalysis => {
  const lowerSymptoms = symptoms.toLowerCase();
  
  // Emergency keywords
  const emergencyKeywords = [
    'chest pain', 'difficulty breathing', 'severe bleeding', 'unconscious', 
    'heart attack', 'stroke', 'severe allergic reaction', 'suicide', 'self harm'
  ];
  
  // High urgency keywords
  const highUrgencyKeywords = [
    'severe pain', 'high fever', 'vomiting blood', 'severe headache', 
    'vision loss', 'difficulty swallowing', 'severe abdominal pain'
  ];
  
  // Medium urgency keywords
  const mediumUrgencyKeywords = [
    'fever', 'headache', 'nausea', 'dizziness', 'fatigue', 'cough', 
    'sore throat', 'body ache', 'stomach pain'
  ];

  // Check for emergency conditions
  if (emergencyKeywords.some(keyword => lowerSymptoms.includes(keyword))) {
    return {
      response: getEmergencyResponse(language),
      followUpQuestions: [],
      urgencyLevel: 'high',
      suggestedActions: ['Call emergency services immediately', 'Go to nearest emergency room']
    };
  }

  // Check for high urgency
  if (highUrgencyKeywords.some(keyword => lowerSymptoms.includes(keyword))) {
    return {
      response: getHighUrgencyResponse(symptoms, language),
      followUpQuestions: getFollowUpQuestions('high', language),
      urgencyLevel: 'high',
      suggestedActions: ['Consult a doctor within 24 hours', 'Monitor symptoms closely']
    };
  }

  // Check for medium urgency
  if (mediumUrgencyKeywords.some(keyword => lowerSymptoms.includes(keyword))) {
    return {
      response: getMediumUrgencyResponse(symptoms, language),
      followUpQuestions: getFollowUpQuestions('medium', language),
      urgencyLevel: 'medium',
      suggestedActions: ['Rest and monitor symptoms', 'Consider seeing a doctor if symptoms persist']
    };
  }

  // Default low urgency response
  return {
    response: getLowUrgencyResponse(symptoms, language),
    followUpQuestions: getFollowUpQuestions('low', language),
    urgencyLevel: 'low',
    suggestedActions: ['Monitor symptoms', 'Maintain good health practices']
  };
};

const getEmergencyResponse = (language: string): string => {
  const responses = {
    en: "⚠️ EMERGENCY ALERT: Your symptoms suggest a serious medical emergency. Please call 108 immediately or go to the nearest emergency room. Do not delay seeking immediate medical attention.",
    hi: "⚠️ आपातकालीन चेतावनी: आपके लक्षण गंभीर चिकित्सा आपातकाल का संकेत देते हैं। कृपया तुरंत 108 पर कॉल करें या निकटतम आपातकालीन कक्ष में जाएं।",
    ta: "⚠️ அவசர எச்சரிக்கை: உங்கள் அறிகுறிகள் கடுமையான மருத்துவ அவசரநிலையைக் குறிக்கின்றன। உடனடியாக 108 ஐ அழைக்கவும் அல்லது அருகிலுள்ள அவசர அறைக்குச் செல்லவும்।"
  };
  return responses[language as keyof typeof responses] || responses.en;
};

const getHighUrgencyResponse = (symptoms: string, language: string): string => {
  const responses = {
    en: `I understand you're experiencing ${symptoms}. These symptoms require prompt medical attention. I recommend consulting with a healthcare provider within the next 24 hours. Let me ask you a few questions to better understand your condition.`,
    hi: `मैं समझता हूं कि आप ${symptoms} का अनुभव कर रहे हैं। इन लक्षणों के लिए तत्काल चिकित्सा ध्यान की आवश्यकता है। मैं अगले 24 घंटों के भीतर एक स्वास्थ्य सेवा प्रदाता से सलाह लेने की सलाह देता हूं।`,
    ta: `நீங்கள் ${symptoms} அனுபவித்து வருவதை நான் புரிந்துகொள்கிறேன். இந்த அறிகுறிகளுக்கு உடனடி மருத்துவ கவனம் தேவை। அடுத்த 24 மணி நேரத்திற்குள் ஒரு சுகாதார வழங்குநரை அணுக பரிந்துரைக்கிறேன்।`
  };
  return responses[language as keyof typeof responses] || responses.en;
};

const getMediumUrgencyResponse = (symptoms: string, language: string): string => {
  const responses = {
    en: `Thank you for sharing your symptoms: ${symptoms}. While these symptoms are concerning, they don't appear to be immediately life-threatening. Let me gather more information to provide you with the best guidance.`,
    hi: `आपके लक्षण साझा करने के लिए धन्यवाद: ${symptoms}। जबकि ये लक्षण चिंताजनक हैं, वे तुरंत जीवन-घातक नहीं लगते। आपको सबसे अच्छा मार्गदर्शन प्रदान करने के लिए मुझे और जानकारी एकत्र करने दें।`,
    ta: `உங்கள் அறிகுறிகளைப் பகிர்ந்ததற்கு நன்றி: ${symptoms}। இந்த அறிகுறிகள் கவலைக்குரியவை என்றாலும், அவை உடனடியாக உயிருக்கு ஆபத்தானவை அல்ல. உங்களுக்கு சிறந்த வழிகாட்டுதலை வழங்க மேலும் தகவல்களை சேகரிக்கிறேன்.`
  };
  return responses[language as keyof typeof responses] || responses.en;
};

const getLowUrgencyResponse = (symptoms: string, language: string): string => {
  const responses = {
    en: `I've noted your symptoms: ${symptoms}. These appear to be mild symptoms that can often be managed with self-care. Let me ask you some questions to provide personalized recommendations.`,
    hi: `मैंने आपके लक्षणों को नोट किया है: ${symptoms}। ये हल्के लक्षण प्रतीत होते हैं जिन्हें अक्सर स्व-देखभाल से प्रबंधित किया जा सकता है। व्यक्तिगत सिफारिशें प्रदान करने के लिए मुझे कुछ प्रश्न पूछने दें।`,
    ta: `உங்கள் அறிகுறிகளை நான் குறித்துக்கொண்டேன்: ${symptoms}। இவை பெரும்பாலும் சுய-பராமரிப்பால் நிர்வகிக்கப்படக்கூடிய லேசான அறிகுறிகளாகத் தோன்றுகின்றன. தனிப்பயனாக்கப்பட்ட பரிந்துரைகளை வழங்க சில கேள்விகளைக் கேட்கிறேன்.`
  };
  return responses[language as keyof typeof responses] || responses.en;
};

const getFollowUpQuestions = (urgency: string, language: string): string[] => {
  const questions = {
    en: {
      high: [
        "When did these symptoms first start?",
        "On a scale of 1-10, how would you rate your pain or discomfort?",
        "Have you taken any medications for these symptoms?",
        "Do you have any known allergies or medical conditions?"
      ],
      medium: [
        "How long have you been experiencing these symptoms?",
        "Have the symptoms gotten worse, better, or stayed the same?",
        "Are you currently taking any medications?",
        "Have you experienced anything like this before?"
      ],
      low: [
        "When did you first notice these symptoms?",
        "What seems to make the symptoms better or worse?",
        "Are you getting enough rest and staying hydrated?",
        "Have you been under any unusual stress lately?"
      ]
    },
    hi: {
      high: [
        "ये लक्षण पहली बार कब शुरू हुए?",
        "1-10 के पैमाने पर, आप अपने दर्द या परेशानी को कैसे रेट करेंगे?",
        "क्या आपने इन लक्षणों के लिए कोई दवा ली है?",
        "क्या आपको कोई ज्ञात एलर्जी या चिकित्सा स्थितियां हैं?"
      ],
      medium: [
        "आप कितने समय से इन लक्षणों का अनुभव कर रहे हैं?",
        "क्या लक्षण बदतर हुए हैं, बेहतर हुए हैं, या वही रहे हैं?",
        "क्या आप वर्तमान में कोई दवा ले रहे हैं?",
        "क्या आपने पहले कभी ऐसा कुछ अनुभव किया है?"
      ],
      low: [
        "आपने पहली बार इन लक्षणों को कब नोटिस किया?",
        "क्या लगता है कि लक्षणों को बेहतर या बदतर बनाता है?",
        "क्या आप पर्याप्त आराम कर रहे हैं और हाइड्रेटेड रह रहे हैं?",
        "क्या आप हाल ही में किसी असामान्य तनाव में रहे हैं?"
      ]
    }
  };
  
  const langQuestions = questions[language as keyof typeof questions] || questions.en;
  return langQuestions[urgency as keyof typeof langQuestions] || langQuestions.medium;
};

export const generateAIResponse = (userInput: string, context: string[], language: string = 'en'): string => {
  const responses = {
    en: [
      "Thank you for that information. Can you tell me more about when these symptoms typically occur?",
      "I understand. Have you noticed any specific triggers that make your symptoms worse?",
      "That's helpful to know. Are you currently taking any medications or supplements?",
      "Based on what you've shared, I'd like to know if you've experienced anything similar before?",
      "I see. How would you describe your overall energy levels and sleep patterns recently?",
      "Thank you for the details. Have you made any recent changes to your diet or lifestyle?",
      "That's important information. Do you have any family history of similar conditions?",
      "I appreciate you sharing that. How has this been affecting your daily activities?",
      "Based on our conversation, I'm getting a clearer picture. Let me provide you with some recommendations."
    ],
    hi: [
      "उस जानकारी के लिए धन्यवाद। क्या आप मुझे बता सकते हैं कि ये लक्षण आमतौर पर कब होते हैं?",
      "मैं समझता हूं। क्या आपने कोई विशिष्ट ट्रिगर देखे हैं जो आपके लक्षणों को बदतर बनाते हैं?",
      "यह जानना उपयोगी है। क्या आप वर्तमान में कोई दवा या सप्लीमेंट ले रहे हैं?",
      "आपने जो साझा किया है उसके आधार पर, मैं जानना चाहूंगा कि क्या आपने पहले कभी ऐसा कुछ अनुभव किया है?",
      "मैं देख रहा हूं। आप हाल ही में अपने समग्र ऊर्जा स्तर और नींद के पैटर्न का वर्णन कैसे करेंगे?"
    ],
    ta: [
      "அந்த தகவலுக்கு நன்றி। இந்த அறிகுறிகள் பொதுவாக எப்போது ஏற்படுகின்றன என்பதை மேலும் சொல்ல முடியுமா?",
      "நான் புரிந்துகொள்கிறேன். உங்கள் அறிகுறிகளை மோசமாக்கும் குறிப்பிட்ட தூண்டுதல்களை நீங்கள் கவனித்திருக்கிறீர்களா?",
      "அது தெரிந்துகொள்ள உதவியாக இருக்கிறது। நீங்கள் தற்போது ஏதேனும் மருந்துகள் அல்லது சப்ளிமெண்ட்ஸ் எடுத்துக்கொண்டிருக்கிறீர்களா?",
      "நீங்கள் பகிர்ந்ததின் அடிப்படையில், இதுபோன்ற ஏதாவது முன்பு அனுபவித்திருக்கிறீர்களா என்பதை அறிய விரும்புகிறேன்?"
    ]
  };
  
  const langResponses = responses[language as keyof typeof responses] || responses.en;
  const responseIndex = Math.min(context.length, langResponses.length - 1);
  return langResponses[responseIndex];
};