'use client';

import { useState, useEffect, useCallback } from 'react';
import { EMOTION_TYPES } from '@/entities/chat/model/types';

export const useAvatarEmotion = ({ emotion, onMouseEnter, onMouseLeave }) => {
  const [currentEmotion, setCurrentEmotion] = useState(EMOTION_TYPES.NEUTRAL);
  const [emotionSource, setEmotionSource] = useState(null); // 'server' | 'mouse' | null

  const setEmotionWithTimeout = useCallback((newEmotion, source) => {
    setCurrentEmotion(newEmotion);
    setEmotionSource(source);

    // Очищаем предыдущий таймер
    const timer = setTimeout(() => {
      setCurrentEmotion(EMOTION_TYPES.NEUTRAL);
      setEmotionSource(null);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  // Обработка эмоции от сервера
  useEffect(() => {
    if (emotion && emotion !== EMOTION_TYPES.NEUTRAL) {
      console.log('Emotion from server:', emotion);
      setEmotionWithTimeout(emotion, 'server');
    }
  }, [emotion, setEmotionWithTimeout]);

  // Обработка наведения мыши
  const handleMouseEnter = useCallback(() => {
    if (emotionSource === 'server') return; // Игнорируем если эмоция от сервера
    
    if (currentEmotion === EMOTION_TYPES.NEUTRAL) {
      const emotions = Object.values(EMOTION_TYPES).filter(e => e !== EMOTION_TYPES.NEUTRAL);
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      console.log('Emotion from mouse:', randomEmotion);
      setEmotionWithTimeout(randomEmotion, 'mouse');
      onMouseEnter?.(randomEmotion);
    }
  }, [currentEmotion, emotionSource, setEmotionWithTimeout, onMouseEnter]);

  const handleMouseLeave = useCallback(() => {
    // Не делаем ничего - эмоция сама сбросится через 10 секунд
  }, []);

  return {
    emotion: currentEmotion,
    handleMouseEnter,
    handleMouseLeave,
    emotionSource
  };
};