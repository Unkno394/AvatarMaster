'use client';

export const SendIcon = ({ disabled = false, className = "" }) => {
  return (
    <svg
      className={`send-icon w-4 h-4 text-white max-[425px]:w-3 max-[425px]:h-3 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 16"
      style={{ opacity: disabled ? 0.5 : 1 }}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M7 16c-.595 0-1.077-.462-1.077-1.032V1.032C5.923.462 6.405 0 7 0s1.077.462 1.077 1.032v13.936C8.077 15.538 7.595 16 7 16z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M.315 7.44a1.002 1.002 0 0 1 0-1.46L6.238.302a1.11 1.11 0 0 1 1.523 0c.421.403.421 1.057 0 1.46L1.838 7.44a1.11 1.11 0 0 1-1.523 0z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M13.685 7.44a1.11 1.11 0 0 1-1.523 0L6.238 1.762a1.002 1.002 0 0 1 0-1.46 1.11 1.11 0 0 1 1.523 0l5.924 5.678c.42.403.420 1.056 0 1.46z" fill="currentColor" />
    </svg>
  );
};


