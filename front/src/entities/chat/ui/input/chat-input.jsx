// src/entities/chat/ui/input/chat-input.jsx
'use client';

export const ChatInput = ({ 
  value, 
  onChange, 
  onKeyPress, 
  placeholder = "Введите текст",
  disabled = false
}) => {
  const isActiveGlow = value.trim() && !disabled;
  
  return (
    <input
      className={`flex-1 min-w-0 h-[44px] rounded-[18px] 
                  bg-[#6F8BD2] px-3 font-['Russo_One'] text-white 
                  placeholder:text-white placeholder:opacity-70 
                  outline-none border-none text-[14px]
                  transition-[box-shadow] duration-700 ease-in-out
                  max-[425px]:h-[40px] max-[425px]:rounded-[15px] max-[425px]:text-[13px]
                  ${isActiveGlow ? "ring-2 ring-blue-300" : ""}`}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      disabled={disabled}
    />
  );
};


