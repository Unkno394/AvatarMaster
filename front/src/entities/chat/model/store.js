import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useChatStore = create(
  persist(
    (set, get) => ({
      messages: [],
      emotion: 'neutral',
      isLoading: false,
      
      addMessage: (message) => set((state) => ({ 
        messages: [...state.messages, message] 
      })),
      
      updateLastAiMessage: (text) => set((state) => {
        const messages = [...state.messages];
        const lastAiMessageIndex = messages.findLastIndex(m => m.sender === 'ai' && m.loading);
        
        if (lastAiMessageIndex !== -1) {
          messages[lastAiMessageIndex] = { 
            ...messages[lastAiMessageIndex], 
            text, 
            loading: false 
          };
        }
        
        return { messages };
      }),
      
      clearMessages: () => set({ messages: [] }),
      
      setEmotion: (emotion) => set({ emotion }),
      
      setIsLoading: (loading) => set({ isLoading: loading })
    }),
    {
      name: 'chat-storage',
      partialize: (state) => ({ 
        messages: state.messages,
        emotion: state.emotion
      })
    }
  )
);
