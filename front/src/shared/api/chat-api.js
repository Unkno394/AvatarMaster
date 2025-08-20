// src/shared/api/chat-api.js
import { ERROR_TYPES } from '@/entities/chat/model/types';

const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  ENDPOINT: "/ask"
};

export const chatApi = {
  sendMessage: async (question) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINT}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    if (!response.ok) {
      throw new Error(response.status === 500 ? ERROR_TYPES.SERVER_ERROR : ERROR_TYPES.NETWORK_ERROR);
    }

    const data = await response.json();
    
    if (!data?.answer) {
      throw new Error(ERROR_TYPES.EMPTY_ANSWER);
    }

    return data;
  }
};

