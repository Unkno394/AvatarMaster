export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  ENDPOINT: "/ask"
};

export const MAX_MESSAGE_LENGTH = 500;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Сервер недоступен",
  SERVER_ERROR: "Ошибка на сервере",
  EMPTY_ANSWER: "Не получилось получить ответ",
  DEFAULT: "Ой, что-то пошло не так...",
  MESSAGE_TOO_LONG: "Сообщение слишком длинное (максимум 500 символов)"
};
