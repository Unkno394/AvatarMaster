'use client';

import { useState, useEffect } from 'react';
import { EMOTION_TYPES } from '@/entities/chat/model/types';

export const useAvatarEmotion = ({ emotion, onMouseEnter, onMouseLeave }) => {
  const [currentEmotion, setCurrentEmotion] = useState(emotion);
  const emotions = Object.values(EMOTION_TYPES).filter(e => e !== 'neutral');

  useEffect(() => {
    setCurrentEmotion(emotion);
  }, [emotion]);

  const handleMouseEnter = () => {
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    setCurrentEmotion(randomEmotion);
    onMouseEnter?.(randomEmotion);
  };

  const handleMouseLeave = () => {
    setCurrentEmotion(EMOTION_TYPES.NEUTRAL);
    onMouseLeave?.(EMOTION_TYPES.NEUTRAL);
  };

  return {
    emotion: currentEmotion,
    handleMouseEnter,
    handleMouseLeave
  };
};
