// src/entities/chat/ui/message/message.jsx
'use client';

export const Message = ({ text, sender, loading = false }) => {
  if (loading) {
    return (
      <div className={`message ${sender} loading-message`}>
        <div className="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  return (
    <div className={`message ${sender}`}>
      {text}
    </div>
  );
};


