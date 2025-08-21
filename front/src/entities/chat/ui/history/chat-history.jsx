'use client';

import { Message } from '../message/message';

export const ChatHistory = ({ messages, containerRef, endRef }) => {
  return (
    <div
      className="flex flex-col flex-grow h-0 rounded-[15px] bg-white/10 p-3 overflow-y-auto
                 max-[425px]:rounded-[12px] max-[425px]:p-2"
      ref={containerRef}
    >
      <div className="flex flex-col gap-2 min-h-min max-[425px]:gap-1">
        {messages.map((msg, index) => (
          <Message
            key={index}
            text={msg.text}
            sender={msg.sender}
            loading={msg.loading}
          />
        ))}
        <div ref={endRef} />
      </div>
    </div>
  );
};