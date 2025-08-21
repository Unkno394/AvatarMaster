# AvatarMaster 

## Frontend

<div align="center">

![AvatarMaster Logo](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTU5IiBoZWlnaHQ9IjE2NCIgdmlld0JveD0iMCAwIDE1OSAxNjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxlbGxpcHNlIGN4PSI3OS40NTc4IiBjeT0iODEuNzgyNyIgcng9Ijc5LjQ1NzgiIHJ5PSI4MS43ODI3IiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfMTY1Xzg5KSIvPgo8cGF0aCBkPSJNNTcuMDY3NiA0M0g0Ni45NzNDNDQuNTkzMiA0MyA0Mi4zMTA5IDQzLjg3NyA0MC42MjgxIDQ1LjQzODFDMzguOTQ1NCA0Ni45OTkzIDM4IDQ5LjExNjYgMzggNTEuMzI0M1Y2MC42ODkyTTEyMSA2MC42ODkyVjUxLjMyNDNDMTIxIDQ5LjExNjYgMTIwLjA1NSA0Ni45OTkzIDExOC4zNzIgNDUuNDM4MUMxMTYuNjg5IDQzLjg3NyAxMTQuNDA3IDQzIDExMi4wMjcgNDNIMTAxLjkzMk0xMDEuOTMyIDEyMEgxMTIuMDI3QzExNC40MDcgMTIwIDExNi42ODkgMTE5LjEyMyAxMTguMzcyIDExNy41NjJDMTIwLjA1NSAxMTYuMDAxIDEyMSAxMTMuODgzIDEyMSAxMTEuNjc2VjEwMi4zMTFNMzggMTAyLjMxMVYxMTEuNjc2QzM4IDExMy44ODMgMzguOTQ1NCAxMTYuMDAxIDQwLjYyODEgMTE3LjU2MkM0Mi4zMTA5IDExOS4xMjMgNDQuNTkzMiAxMjAgNDYuOTczIDEyMEg1Ny4wNjc2TTYyLjE4NDQgNzMuMzA2OFY2NS44OTE5TTk2LjgxNTYgNzMuMzA2OFY2NS44OTE5TTc0LjE3MjMgOTAuNjA0N0g3Ni44MzczQzc4LjI1MDMgOTAuNjA0NyA3OS42MDU0IDkwLjA4NCA4MC42MDQ1IDg5LjE1NzFDODEuNjAzNyA4OC4yMzAyIDgyLjE2NSA4Ni45NzMgODIuMTY1IDg1LjY2MjJWNjUuODkxOU05NS40ODMxIDk4LjcxNjhDOTEuMTQwMiAxMDQuMDU3IDg0LjUwOTIgMTA1LjQzMiA3OS41IDEwNS40MzJDNzQuNDkwOCAxMDUuNDMyIDY3Ljg1OTggMTA0LjA1OSA2My41MTY5IDk4LjcxNjgiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMTY1Xzg5IiB4MT0iMzMiIHkxPSI1IiB4Mj0iMTE4LjEyMiIgeTI9IjE3NS4zODIiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzU4NzlDQSIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IndoaXRlIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==)

**Интерактивный чат-бот с эмоциональным котом-аватаром**

[🌐 Посмотреть рабочую версию (демо с UI-заглушками)](https://avatar-master-iwgmw58z8-xovanskis-projects.vercel.app/)

[![Next.js](https://img.shields.io/badge/Next.js-15.0.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-06B6D4?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

</div>

## 🚀 О проекте

AvatarMaster — это интерактивный веб-чат, где пользователь может общаться с AI, представленным в виде очаровательного кота-аватара. Уникальность проекта в том, что аватар реагирует на сообщения пользователя и контекст беседы меняющимися эмоциями (радость, грусть, удивление, злость, влюбленность и другие), создавая живой и immersive опыт общения.

Основной стек: **Next.js 15 (App Router), Tailwind CSS**.

## ✨ Ключевые возможности

- **Динамический аватар**: Кот анимированно реагирует на действия пользователя (печать, отправка сообщения, наведение)
- **Широкий спектр эмоций**: Реализованы состояния `neutral`, `happy`, `sad`, `angry`, `love`, `laughing`, `curious`, `blink`
- **Адаптивный интерфейс**: Полностью адаптирован под мобильные устройства и desktop
- **Локальное хранение**: История чата сохраняется в `localStorage`
- **Интуитивный UI**: Чистый и современный дизайн с плавными анимациями
- **Страница 404**: Кастомная страница с грустным котом

## 🗂 Структура проекта (Архитектура FSD)

Проект следует методологии Feature-Sliced Design (FSD), что обеспечивает его исключительную масштабируемость, поддерживаемость и чистоту кода. Архитектура четко разделяет ответственность между слоями

```bash
src/
├── app/ # Роутинг, layout и страницы Next.js (Слой Pages)
│ ├── layout.js # Корневой layout с провайдерами шрифтов
│ ├── page.js # Главная страница чата
│ ├── not-found.js # Кастомная страница 404
│ └── globals.css # Глобальные стили и анимации
├── entities/ # Бизнес-сущности (Слой Entities)
│ └── chat/
│ ├── model/ # Логика чата: хуки, API, типы
│ │ ├── useChat.js
│ │ └── api.js
│ └── ui/ # UI компоненты, специфичные для сущности Chat
│ ├── Message.js
│ └── Chat.js
├── features/ # Функциональности пользователя (Слой Features)
│ ├── send-message/ # Фича "Отправка сообщения"
│ │ ├── components/
│ │ │ └── SendMessageForm.js
│ │ └── index.js
│ └── avatar-control/ # Фича "Управление аватаром"
│ ├── components/
│ │ └── Avatar.js
│ └── hooks/
│ └── useAvatar.js
├── widgets/ # Композитные компоненты (Слой Widgets)
│ ├── chat-window/ # Виджет окна чата
│ │ └── ChatWindow.js
│ └── avatar-display/ # Виджет отображения аватара
│ └── AvatarDisplay.js
├── shared/ # Переиспользуемый код (Слой Shared)
│ ├── api/ # Инфраструктура API
│ │ └── client.js
│ ├── ui/ # Базовые UI-компоненты (кнопки, инпуты)
│ │ ├── Button.js
│ │ └── Input.js
│ ├── lib/ # Вспомогательные функции (хелперы)
│ │ └── helpers.js
│ └── types
│ └── index.js
└── styles/ # Глобальные стили (альтернатива app/globals.css)
└── globals.css
```

## 🛠 Установка и запуск

1. **Клонируйте репозиторий** (если он есть) или создайте папку для файлов.
```bash
git clone <your-repository-url>
cd avatar-master-frontend
```
2. **Установите зависимости** (убедитесь, что у вас есть package.json с зависимостями).
```bash
npm install
# или
yarn install
# или
pnpm install
```

3. **Настройте переменные окружения:**
Создайте файл .env.local в корне проекта и укажите URL вашего бэкенд-API:
```bash
NEXT_PUBLIC_API_URL="http://localhost:5000" # или URL вашего деплоя
```

4. **Запустите сервер для разработки.**
```bash
npm run dev
# или
yarn dev
# или
pnpm dev
```

5. **Откройте http://localhost:3000 в браузере.**

## 🎨 Эмоции аватара

Аватар реализован как интерактивный SVG, где ключевые элементы (глаза, брови, рот) анимируются через CSS-классы. Каждая эмоция — это комплексная анимация, создающая живой и выразительный образ.

| Эмоция | CSS Класс | Визуальные эффекты | Анимации |
| :--- | :--- | :--- | :--- |
| **Нейтральный** | `neutral` | Стандартное выражение, расслабленные черты | Плавное моргание, легкое дыхание |
| **Счастливый** | `happy` | Широкая улыбка, приподнятые брови | Радостное подпрыгивание, сияние |
| **Грустный** | `sad` | Опущенные уголки рта, печальные брови | Капающие слезы, медленное покачивание головой |
| **Злой** | `angry` | Нахмуренные брови, острые черты лица | Дрожание от ярости, резкие движения |
| **Влюбленный** | `love` | Поднятые бровки, глаза-сердечки | Всплывающие сердечки, пульсирующее свечение |
| **Смеющийся** | `laughing` | Широкая улыбка до ушей, прищуренные глаза | Вибрация от смеха, довольное подрагивание |
| **Любопытный** | `curious` | Широко открытые глаза, наклон головы | Исследующий наклон, внимательный взгляд |
| **Моргание** | `blink` | Быстрое закрытие глаз | Естественная анимация моргания в режиме ожидания |

## 📱 Адаптивность

Проект разработан с использованием **mobile-first подхода** и обеспечивает безупречное отображение на всех типах устройств. Адаптивность реализована через комбинацию Tailwind CSS утилит и кастомных медиа-запросов.

### 🖥️ Брейкпоинты и стратегия адаптации

| Разрешение | Класс устройства | Особенности реализации |
| :--- | :--- | :--- |
| **< 425px** | Mobile S | Компактные интерфейсы, увеличенные тач-зоны, оптимизированные шрифты |
| **425px - 767px** | Mobile L | Улучшенное использование пространства, адаптивные изображения |
| **768px - 1023px** | Tablet | Горизонтальные layout'ы, активация ховер-эффектов |
| **1024px - 1439px** | Laptop | Полноценная desktop-версия, расширенные возможности |
| **1440px+** | Desktop/4K | Максимальное использование пространства, улучшенная графика |

### 🔧 Ключевые адаптивные техники

- **Гибкая сетка:** Проценты и `fr` единицы вместо фиксированных пикселей
- **Респонсивные изображения:** `srcset` и `sizes` для оптимальной загрузки
- **Адаптивная типографика:** `clamp()` функция и относительные единицы (rem, em)
- **Conditional Loading:** Загрузка контента в зависимости от возможностей устройства
- **Touch-friendly UI:** Увеличенные кнопки и адекватные отступы для мобильных устройств

*Интерфейс плавно адаптируется к любому экрану — от компактного смартфона до широкоформатного монитора.*

## Backend