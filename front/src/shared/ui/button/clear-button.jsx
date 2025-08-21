'use client';

export const ClearButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-[18px] bg-red-500 text-white py-2 text-sm font-semibold hover:bg-red-600 transition
                 max-[425px]:py-1 max-[425px]:text-xs max-[425px]:rounded-[15px]"
    >
      Очистить историю
    </button>
  );
};
