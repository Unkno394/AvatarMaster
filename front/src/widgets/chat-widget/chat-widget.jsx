'use client';

import { useState, useRef, useEffect } from 'react';
import { useChatStore } from '@/entities/chat/model/store';
import { ChatInput } from '@/entities/chat/ui/input/chat-input';
import { ChatHistory } from '@/entities/chat/ui/history/chat-history';
import { SendButton, useSendMessage } from '@/features/send-message';
import { Avatar } from '@/features/avatar-control';
import { ClearButton } from '@/shared/ui/button/clear-button';

const ChatWidget = () => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const { messages, emotion, setEmotion, clearMessages } = useChatStore();
  const { sendMessage, isLoading } = useSendMessage();
  const isActiveGlow = inputValue.trim() && !isLoading;

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  useEffect(() => {
    if (inputValue.length === 0) {
      setEmotion('neutral');
      return;
    }
  
    setEmotion('curious');
    const timer = setTimeout(() => setEmotion('neutral'), 2000);
    return () => clearTimeout(timer);
  }, [inputValue, setEmotion]);

  const handleSendMessage = () => {
    if (!inputValue.trim() || isLoading) return;
    
    if (inputValue.length > 500) {
      alert("Сообщение слишком длинное (максимум 500 символов)");
      return;
    }
    
    sendMessage(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  const handleMouseEnter = () => {
    const emotions = ['happy', 'sad', 'angry', 'love', 'laughing', 'curious'];
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    setEmotion(randomEmotion);
  };
  
  const handleMouseLeave = () => {
    setEmotion("neutral");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 p-20 
                    md:flex-row md:gap-[60px] md:p-[150px_40px] 
                    lg:gap-[100px] lg:p-[200px_60px]">
      
      <Avatar 
        emotion={emotion}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />

      <div
        className="flex flex-col rounded-[20px] bg-white p-3
                   w-[95vw] h-[350px] 
                   sm:w-[300px] sm:h-[300px] 
                   md:w-[400px] md:h-[400px] 
                   lg:w-[600px] lg:h-[600px] 
                   2xl:w-[900px] 2xl:h-[900px]
                   max-[425px]:h-[300px] max-[425px]:w-[92vw]"
      >
        <ChatHistory 
          messages={messages}
          containerRef={messagesContainerRef}
          endRef={messagesEndRef}
        />

        <div className="flex flex-col gap-2 mt-3 max-w-full max-[425px]:mt-2">
          <div className="flex gap-2 max-w-full max-[425px]:gap-1">
            <ChatInput
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <SendButton
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              isActive={isActiveGlow}
            />
          </div>

          <ClearButton onClick={clearMessages} />
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;

