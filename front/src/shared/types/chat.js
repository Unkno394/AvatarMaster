// src/shared/types/chat.js
export const MessageType = {
    USER: 'user',
    AI: 'ai'
  };
  
  export const EmotionType = {
    NEUTRAL: 'neutral',
    HAPPY: 'happy',
    SAD: 'sad',
    ANGRY: 'angry',
    LOVE: 'love',
    LAUGHING: 'laughing',
    CURIOUS: 'curious',
    BLINK: 'blink'
  };
  
  export const ErrorType = {
    NETWORK_ERROR: 'network-error',
    SERVER_ERROR: 'server-error',
    EMPTY_ANSWER: 'empty-answer',
    DEFAULT: 'default'
  };
  
  // Типы для сообщений
  export const createMessage = (sender, text, loading = false) => ({
    text,
    sender,
    ...(loading && { loading })
  });
  
  // Валидация сообщения
  export const validateMessage = (message) => {
    if (!message.trim()) {
      return { isValid: false, error: "Сообщение не может быть пустым" };
    }
    
    if (message.length > 500) {
      return { isValid: false, error: "Сообщение слишком длинное (максимум 500 символов)" };
    }
    
    return { isValid: true };
  };