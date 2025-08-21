export const validateMessage = (message) => {
  if (!message.trim()) {
    return { isValid: false, error: "Сообщение не может быть пустым" };
  }
  
  if (message.length > 500) {
    return { isValid: false, error: "Сообщение слишком длинное (максимум 500 символов)" };
  }
  
  return { isValid: true };
};

export const scrollToBottom = (element) => {
  if (element) {
    element.scrollTo({
      top: element.scrollHeight,
      behavior: 'smooth'
    });
  }
};

export const getRandomEmotion = (exclude = []) => {
  const emotions = ['happy', 'sad', 'angry', 'love', 'laughing', 'curious'];
  const availableEmotions = emotions.filter(e => !exclude.includes(e));
  return availableEmotions[Math.floor(Math.random() * availableEmotions.length)];
};

