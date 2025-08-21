'use client';

import { useState } from 'react';
import { useChatStore } from '@/entities/chat/model/store';
import { chatApi } from '@/shared/api/chat-api';
import { ERROR_TYPES } from '@/entities/chat/model/types';

export const useSendMessage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { addMessage, updateLastAiMessage, setEmotion } = useChatStore();

  const sendMessage = async (messageText) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = { text: messageText, sender: 'user' };
    const aiMessage = { text: '', sender: 'ai', loading: true };
    
    addMessage(userMessage);
    addMessage(aiMessage);
    setIsLoading(true);

    try {
      const response = await chatApi.sendMessage(messageText);
      setEmotion(response.emotion || 'neutral');
      updateLastAiMessage(response.answer);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      updateLastAiMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorMessage = (error) => {
    const errorMessages = {
      [ERROR_TYPES.NETWORK_ERROR]: "Сервер недоступен",
      [ERROR_TYPES.SERVER_ERROR]: "Ошибка на сервере",
      [ERROR_TYPES.EMPTY_ANSWER]: "Не получилось получить ответ",
      [ERROR_TYPES.DEFAULT]: "Ой, что-то пошло не так..."
    };

    return errorMessages[error.message] || errorMessages.default;
  };

  return { sendMessage, isLoading };
};