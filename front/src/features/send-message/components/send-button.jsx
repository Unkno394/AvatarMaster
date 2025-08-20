// src/features/send-message/components/send-button.jsx
'use client';

import { SendIcon } from '@/shared/ui/icons/send-icon';

export const SendButton = ({ onClick, disabled = false, isActive = false }) => {
  return (
    <button
      className={`send-button flex items-center justify-center rounded-full p-2 flex-shrink-0
                  transition-[box-shadow] duration-700 ease-in-out
                  max-[425px]:w-[40px] max-[425px]:h-[40px]
                  ${isActive ? "ring-2 ring-blue-300" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      <SendIcon disabled={disabled} />
    </button>
  );
};

