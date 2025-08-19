'use client';

import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [emotion, setEmotion] = useState('neutral');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const isActiveGlow = inputValue.trim() && !isLoading;
  const emotions = ['happy', 'sad', 'angry', 'love', 'laughing', 'curious'];

  // Конфигурация API
  const API_CONFIG = {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
    ENDPOINT: "/ask"
  };

  useEffect(() => {
    const saved = localStorage.getItem('chatHistory');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error("Ошибка чтения истории:", e);
      }
    }
  }, []);
  
  // Сохраняем историю при каждом изменении
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    } else {
      localStorage.removeItem('chatHistory'); // если сообщений нет — чистим
    }
  }, [messages]);
  
  // Очистка истории
  const clearHistory = () => {
    localStorage.removeItem('chatHistory');
    setMessages([]);
  };

  useEffect(() => {
    if (inputValue.length === 0) {
      setEmotion('neutral'); // очищено → сразу нейтральный
      return;
    }
  
    setEmotion('curious'); // печатаем → любопытный
    const timer = setTimeout(() => setEmotion('neutral'), 2000);
    return () => clearTimeout(timer);
  }, [inputValue]);
  

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  // Обработка отправки сообщения
  const sendMessage = async () => {
    if (!validateInput()) return;
  
    const userMessage = createMessage('user', inputValue);
    const aiMessage = createMessage('ai', '', true);
    
    updateChat([userMessage, aiMessage]);
    setInputValue('');
    setEmotion('neutral'); // <<< после отправки возвращаем котика в neutral
    setIsLoading(true);
  
    try {
      const response = await fetchAPI(userMessage.text);
      const data = await processResponse(response);
      
      handleSuccessResponse(data);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMouseEnter = () => {
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    setEmotion(randomEmotion);
  };
  
  const handleMouseLeave = () => {
    setEmotion("neutral"); // возвращаем спокойное лицо
  };

  // Валидация ввода
  const validateInput = () => {
    if (!inputValue.trim() || isLoading) return false;
    
    if (inputValue.length > 500) {
      alert("Сообщение слишком длинное (максимум 500 символов)");
      return false;
    }
    
    return true;
  };

  // Создание объекта сообщения
  const createMessage = (sender, text, loading = false) => ({
    text,
    sender,
    ...(loading && { loading })
  });

  // Обновление списка сообщений
  const updateChat = (newMessages) => {
    setMessages(prev => [...prev, ...newMessages]);
  };

  // Запрос к API
  const fetchAPI = async (question) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINT}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    if (!response.ok) {
      throw new Error(response.status === 500 ? "server-error" : "network-error");
    }

    return response;
  };

  // Обработка ответа от сервера
  const processResponse = async (response) => {
    const data = await response.json();
    
    if (!data?.answer) {
      throw new Error("empty-answer");
    }

    return data;
  };

  // Успешный ответ от сервера
  const handleSuccessResponse = (data) => {
    setEmotion(data.emotion || 'neutral');
    
    setMessages(prev => {
      const updated = [...prev];
      const lastAiMessageIndex = updated.findLastIndex(m => m.sender === 'ai' && m.loading);
      
      if (lastAiMessageIndex !== -1) {
        updated[lastAiMessageIndex] = createMessage('ai', data.answer);
      }
      
      return updated;
    });
  };

  // Обработка ошибок
  const handleError = (error) => {
    console.error("Ошибка:", error);
    const errorMessage = getErrorMessage(error);
    
    setMessages(prev => {
      const updated = [...prev];
      const lastAiMessageIndex = updated.findLastIndex(m => m.sender === 'ai' && m.loading);
      
      if (lastAiMessageIndex !== -1) {
        updated[lastAiMessageIndex] = createMessage('ai', errorMessage);
      }
      
      return updated;
    });
  };

  // Получение текста ошибки
  const getErrorMessage = (error) => {
    const errorMessages = {
      "network-error": "Сервер недоступен",
      "server-error": "Ошибка на сервере",
      "empty-answer": "Не получилось получить ответ",
      "default": "Ой, что-то пошло не так..."
    };

    return errorMessages[error.message] || errorMessages.default;
  };

  // Обработка нажатия Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <>
    <div className="flex gap-5 md:gap-[70px] fade-in-simultaneous">
    <img className="mt-5 w-[70px] p-[10px_0px_15px_10px] sm:w-[80px] sm:mt-[19px] md:w-[160px] md:p-[0px_0px_15px_50px]"  src="/Group 195.svg" alt="AvatarMaster logo"  />
    <h1 className="mt-5 font-[var(--font-jersey)] text-white text-[38px] sm:text-[50px] md:text-[90px] 2xl:text-[110px] leading-[110px] AvatarMast">AvatarMaster</h1>
    </div>
    <main className="relative z-10 pt-[150px] text-center fade-in-simultaneous">
      <hr className="h-[35px] bg-[#F6F3FF] -mt-[108px] border-0"></hr>
      <p className="pt-10 pb-20 font-['Russo One'] font-normal text-white tracking-[0.06em] text-[20px] sm:text-[24px] lg:text-[32px] 2xl:text-[48px]">Добро пожаловать на AvatarMaster — вашего пушистого собеседника, реагирующего на ваши слова эмоциями!</p>
      <div className="font-['Russo One'] text-white leading-normal tracking-[0.06em] text-[16px] lg:text-[22px] 2xl:text-[35px]">
      <hr className="w-2/5 h-3 bg-white rounded-[40px] ml-0 mr-auto border-0" ></hr>
      <p className="pt-2 pl-[30px] text-left">
        Поговорите с котиком! Он улыбается, грустит или удивляется в зависимости от того, что вы ему скажете. <br></br> Всё работает прямо в браузере.
      </p>
      <hr className="w-2/5 h-3 bg-white rounded-[40px] mt-20 ml-auto mr-0 border-0"/>
      <p className="pt-2 pr-[30px] text-right">
        Это прототип — идеален для теста эмоций и UI. Здесь не нужен сервер, только ваши фразы и котик 🐾
      </p>
      </div>

      {/* Аватар */}
      <div className="flex flex-col items-center justify-center gap-5 p-20 
                md:flex-row md:gap-[60px] md:p-[150px_40px] 
                lg:gap-[100px] lg:p-[200px_60px]">
                  
      <div className='flex items-center justify-center rounded-full bg-white 
                shadow-[0_0_20px_rgba(0,0,0,0.1)] overflow-hidden 
                w-[150px] h-[150px] 
                sm:w-[200px] sm:h-[200px] 
                md:w-[250px] md:h-[250px] 
                lg:w-[500px] lg:h-[500px] 
                2xl:w-[600px] 2xl:h-[600px]'>

  <div className="avatar-glow"></div>

  <div 
    className={`cat-avatar ${emotion}`} 
    onMouseEnter={handleMouseEnter} 
    onMouseLeave={handleMouseLeave}
  >
        <svg width="500" height="300" viewBox="0 0 71 62" fill="none" xmlns="http://www.w3.org/2000/svg">
  {/* Левые уши */}
  <path d="M7.597 8.13483C9.76357 4.81074 34.1349 13.752 26.3294 16.0585C18.5238 18.365 17.1843 20.0099 13.2675 25.9394C9.35072 31.869 5.43043 11.4589 7.597 8.13483Z" fill="#BFA72E"/>
  <path d="M9.36364 9.97657C11.1524 7.16625 32.2833 15.3831 25.6282 17.1959C18.9731 19.0087 17.8582 20.3935 14.6226 25.4055C11.387 30.4174 7.57483 12.7869 9.36364 9.97657Z" fill="#F3D646"/>
  
  {/* Правые уши */}
  <path d="M62.7155 7.13483C60.5489 3.81074 36.1776 12.752 43.9831 15.0585C51.7887 17.365 53.1282 19.0099 57.045 24.9394C60.9618 30.869 64.8821 10.4589 62.7155 7.13483Z" fill="#BFA72E"/>
  <path d="M60.9385 8.97657C59.1497 6.16625 38.0189 14.3831 44.674 16.1959C51.3291 18.0087 52.4439 19.3935 55.6795 24.4055C58.9151 29.4174 62.7273 11.7869 60.9385 8.97657Z" fill="#F3D646"/>
  
  {/* Голова */}
  <g filter="url(#filter0_i_0_1)">
    <path d="M62 40.5C56.5 58 50.5 57 35.54 62C21 58.5 12.46 54 9 40.5C9 25.036 20.0761 12.5 35.54 12.5C51.004 12.5 62 25.036 62 40.5Z" fill="#FFD712"/>
  </g>
  
  {/* Левые усы */}
  <path d="M23.0264 41.0013C23.0264 41.0013 16.9509 39.9582 13.0264 40.0013C9.49023 40.0402 4.02637 41.0013 4.02637 41.0013" stroke="black" strokeLinecap="round"/>
  <path d="M23.0264 43C23.0264 43 16.905 42.2733 12.988 42.5198C9.45864 42.742 4.05196 43.9851 4.05196 43.9851" stroke="black" strokeLinecap="round"/>
  <path d="M23.02 44.6438C23.02 44.6438 16.8756 44.1468 12.9706 44.5398C9.45207 44.8939 4.09571 46.3386 4.09571 46.3386" stroke="black" strokeLinecap="round"/>
  
  {/* Правые усы */}
  <path d="M47 41.0013C47 41.0013 53.0755 39.9582 57 40.0013C60.5361 40.0402 66 41.0013 66 41.0013" stroke="black" strokeLinecap="round"/>
  <path d="M47 43C47 43 53.1214 42.2733 57.0384 42.5198C60.5677 42.742 65.9744 43.9851 65.9744 43.9851" stroke="black" strokeLinecap="round"/>
  <path d="M47.0064 44.6438C47.0064 44.6438 53.1507 44.1468 57.0557 44.5398C60.5743 44.8939 65.9307 46.3386 65.9307 46.3386" stroke="black" strokeLinecap="round"/>
  
  <g className="eyes">
  {emotion === 'love' ? (
    <>
      <path 
        d="M22 30 Q24.5 25 27 30" 
        stroke="black" 
        strokeWidth="2" 
        fill="none" 
        className="eye"
      />
      <path 
        d="M43 30 Q45.5 25 48 30" 
        stroke="black" 
        strokeWidth="2" 
        fill="none" 
        className="eye"
      />
    </>
  ) : (
    <>
      <ellipse 
        cx="24.5" 
        cy="31" 
        rx="3.5" 
        ry={emotion === 'blink' ? "0.5" : emotion === 'laughing' ? "2" : "5"} 
        fill="black" 
        className="eye"
      />
      <ellipse 
        cx="45.5" 
        cy="31" 
        rx="3.5" 
        ry={emotion === 'blink' ? "0.5" : emotion === 'laughing' ? "2" : "5"} 
        fill="black" 
        className="eye"
      />
    </>
  )}
</g>

  
 {/* Брови (всегда) */}
 <g className="eyebrows">
  {emotion === 'angry' ? (
    <>
      <path 
        d="M29 24L20 22" 
        stroke="black" 
        strokeWidth="2" 
        strokeLinecap="round" 
        className="brow angry"
      />
      <path 
        d="M50 22L41 24" 
        stroke="black" 
        strokeWidth="2" 
        strokeLinecap="round" 
        className="brow angry"
      />
    </>
  ) : emotion === 'sad' ? (
    <>
      <path 
        d="M20 24L29 22" 
        stroke="black" 
        strokeWidth="2" 
        strokeLinecap="round" 
        className="brow sad"
      />
      <path 
        d="M41 22L50 24" 
        stroke="black" 
        strokeWidth="2" 
        strokeLinecap="round" 
        className="brow sad"
      />
    </>
  ) : emotion === 'happy' ? (
    <>
      <path 
        d="M20 25C22 22 27 22 29 25" 
        stroke="black" 
        strokeWidth="2" 
        strokeLinecap="round"
        className="brow happy"
      />
      <path 
        d="M41 25C43 22 48 22 50 25" 
        stroke="black" 
        strokeWidth="2" 
        strokeLinecap="round"
        className="brow happy"
      />
    </>
  ) : (
    <>
      <path 
        d="M20 25C22 22 27 22 29 25" 
        stroke="black" 
        strokeWidth="2" 
        strokeLinecap="round"
        className="brow neutral"
      />
      <path 
        d="M41 25C43 22 48 22 50 25" 
        stroke="black" 
        strokeWidth="2" 
        strokeLinecap="round"
        className="brow neutral"
      />
    </>
  )}
</g>
  
  {/* Нос */}
  <path 
    d="M40 38.5C40 39.8807 37.6569 42.5 36 42.5C34.3431 42.5 32 39.8807 32 38.5C32 37.1193 34.3431 36 36 36C37.6569 36 40 37.1193 40 38.5Z" 
    fill="black"
  />
  
  {/* Рот с разными выражениями */}
  {(!['sad', 'angry'].includes(emotion)) && (
  <path 
    d="M27 50.5C27 50.5 32.4637 51.5 36 51.5C39.5363 51.5 45 50.5 45 50.5" 
    stroke="black" 
    strokeWidth="2" 
    className="mouth neutral"
  />
  
)}

  
  {emotion === 'sad' && (
    <>
      <path 
        d="M27 50.5C27 50.5 32.4637 47.5 36 47.5C39.5363 47.5 45 50.5 45 50.5" 
        stroke="black" 
        strokeWidth="2" 
        className="mouth sad"
      />
      {/* Слёзы-капельки (анимированные) */}
<circle cx="24.5" cy="35" r="1.5" fill="#48DBFB" className="tear-drop left" />
<circle cx="45.5" cy="35" r="1.5" fill="#48DBFB" className="tear-drop right" />
    </>
  )}
  {emotion === 'angry' && (
    <path 
      d="M27 52.5C27 52.5 32.4637 49.5 36 49.5C39.5363 49.5 45 52.5 45 52.5" 
      stroke="black" 
      strokeWidth="2" 
      className="mouth angry"
    />
  )}
  
  {(emotion === 'neutral' || emotion === 'blink' || emotion === 'curious') && (
    <path 
      d="M27 50.5C27 50.5 32.4637 51.5 36 51.5C39.5363 51.5 45 50.5 45 50.5" 
      stroke="black" 
      strokeWidth="2" 
      className="mouth neutral"
    />
    
  )}
  
  {/* Фильтр для тени головы */}
  <defs>
    <filter id="filter0_i_0_1" x="9" y="9.5" width="54" height="52.5" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dx="1" dy="-3"/>
      <feGaussianBlur stdDeviation="9.25"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_0_1"/>
    </filter>
  </defs>
</svg>
{emotion === 'love' && (
      <div className="hearts-container">
        <div className="heart heart-mouth">❤</div>
        <div className="heart heart-nose">❤</div>
        <div className="heart heart-eyes">❤</div>
      </div>
    )}
        </div>
      </div>

      <div
  className="flex flex-col rounded-[20px] bg-white p-4
             w-[200px] h-[200px] 
             sm:w-[300px] sm:h-[300px] 
             md:w-[400px] md:h-[400px] 
             lg:w-[600px] lg:h-[600px] 
             2xl:w-[900px] 2xl:h-[900px]"
>
  {/* Обёртка сообщений занимает всё доступное место */}
  <div
    className="flex flex-col flex-grow h-0 rounded-[20px] bg-white/10 p-4 overflow-y-auto"
    ref={messagesContainerRef}
  >
    <div className="flex flex-col gap-2 min-h-min">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.sender}`}>
          {msg.loading ? (
            <span className="dots">
              <span></span>
              <span></span>
              <span></span>
            </span>
          ) : (
            msg.text
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  </div>

  <div className="flex flex-col gap-2 mt-4 max-w-full">
    <div className="flex gap-2 max-w-full">
      <input
        className={`flex-1 min-w-0 h-[49px] rounded-[20px] 
                    bg-[#6F8BD2] px-4 font-['Russo_One'] text-white 
                    placeholder:text-white placeholder:opacity-70 
                    outline-none border-none 
                    transition-[box-shadow] duration-700 ease-in-out
                    ${isActiveGlow ? "ring-2 ring-blue-300" : ""}`}
        type="text"
        placeholder="Введите текст"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button
        className={`send-button flex items-center justify-center rounded-full p-3 flex-shrink-0
                    transition-[box-shadow] duration-700 ease-in-out
                    ${isActiveGlow ? "ring-2 ring-blue-300" : ""}`}
        onClick={sendMessage}
        disabled={!inputValue.trim() || isLoading}
      >
        <svg
          className="send-icon w-5 h-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 14 16"
          style={{ opacity: !inputValue.trim() || isLoading ? 0.5 : 1 }}
        >
          <path fillRule="evenodd" clipRule="evenodd" d="M7 16c-.595 0-1.077-.462-1.077-1.032V1.032C5.923.462 6.405 0 7 0s1.077.462 1.077 1.032v13.936C8.077 15.538 7.595 16 7 16z" fill="currentColor" />
          <path fillRule="evenodd" clipRule="evenodd" d="M.315 7.44a1.002 1.002 0 0 1 0-1.46L6.238.302a1.11 1.11 0 0 1 1.523 0c.421.403.421 1.057 0 1.46L1.838 7.44a1.11 1.11 0 0 1-1.523 0z" fill="currentColor" />
          <path fillRule="evenodd" clipRule="evenodd" d="M13.685 7.44a1.11 1.11 0 0 1-1.523 0L6.238 1.762a1.002 1.002 0 0 1 0-1.46 1.11 1.11 0 0 1 1.523 0l5.924 5.678c.42.403.42 1.056 0 1.46z" fill="currentColor" />
        </svg>
      </button>
    </div>

    <button
      onClick={clearHistory}
      className="w-full rounded-[20px] bg-red-500 text-white py-2 text-sm font-semibold hover:bg-red-600 transition"
    >
      Очистить историю
    </button>
  </div>
</div>

    
  </div>


        <footer className="footer">
          <div className="flex items-center gap-[15px] mb-[30px]">
            <img className="w-[60px] h-auto" src="/Group 195.svg" alt="AvatarMaster logo" />
            <p className="m-0 font-['Jersey 15'] text-[50px] max-[425px]:text-[32px]">AvatarMaster</p>
          </div>
          <div className="flex justify-end mt-[30px]">
            <div className="grid grid-cols-[auto_1fr_10px_1fr] items-center w-1/2 max-[768px]:flex max-[768px]:flex-col max-[768px]:w-full max-[768px]:gap-[15px]">
              <p className="m-0 font-['Russo One'] text-[20px] whitespace-nowrap max-[768px]:self-end">Контакты</p>
              <div className="phones">
                <p>+7 952 604 24 24</p>
                <p>+7 918 531 81 46</p>
                <p>+7 951 502 93 22</p>
                <p>+7 904 448 00 08</p>
                
              </div>
              
            </div>
          </div>
          <hr className='mt-[43px] w-[90%] h-[30px] bg-white mx-auto border-0'></hr>
        </footer>
      </main>
    </>
  );
}
