import sys
import os
from dotenv import load_dotenv
from datetime import timedelta
from flask import Flask, request, jsonify, session
from flask_cors import CORS
import logging
import time

env_path = os.path.join(os.path.dirname(__file__), '.env')
print(f"Загрузка .env из: {env_path}")
print(f"Файл существует: {os.path.exists(env_path)}")

if os.path.exists(env_path):
    load_dotenv(env_path)
    print("✅ .env файл загружен")
else:
    print("❌ .env файл не найден")
    with open(env_path, 'w') as f:
        f.write("SECRET_KEY=temp-secret-key-for-development-only\n")
        f.write("MODEL_PATH=../saiga_llama3_8b.Q4_K_M.gguf\n")
    load_dotenv(env_path)
    print("✅ Создан временный .env файл")


print("MODEL_PATH:", os.getenv("MODEL_PATH"))
print("SECRET_KEY установлен:", bool(os.getenv("SECRET_KEY")))

try:
    from services.llm_service import llm_service
    from services.emotion_service import emotion_service
    from utils.text_cleaner import clean_text
    print("✅ Все сервисы успешно загружены")
except ImportError as e:
    print(f"❌ Ошибка импорта сервисов: {e}")
    sys.exit(1)

logging.basicConfig(
    level=logging.DEBUG,
    filename="app.log",
    format='%(asctime)s - %(levelname)s - %(message)s'
)

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY", "fallback-dev-key-for-debug-only")
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=30)
CORS(app)


MAX_HISTORY_LENGTH = 6  

def get_user_history():
    if "history" not in session:
        session["history"] = []
    return session["history"]

def format_history(history):
    if not history:
        return ""
    
    formatted_lines = []
    for msg in history:
        role = "Пользователь" if msg['role'] == 'user' else "Психолог"
        formatted_lines.append(f"{role}: {msg['content']}")
    
    return "\n".join(formatted_lines)

def update_history(user_message, bot_response):
    history = get_user_history()
    
    # Добавляем новые сообщения
    history.append({"role": "user", "content": user_message})
    history.append({"role": "bot", "content": bot_response})
    
    # Ограничиваем длину истории
    if len(history) > MAX_HISTORY_LENGTH:
        history = history[-MAX_HISTORY_LENGTH:]
    
    session["history"] = history
    return history

def generate_psychologist_response(question, history, emotion):
    """Генерация ответа психолога с улучшенной обработкой"""
    try:
        emotion_context = {
            "sad": "Пользователь испытывает грусть и печаль. Поддержи его, прояви сочувствие, предложи утешение.",
            "happy": "Пользователь счастлив. Раздели его радость, поздрави, прояви искренний интерес.",
            "angry": "Пользователь злится. Помоги успокоиться, прояви понимание, предложи конструктивные решения.",
            "love": "Пользователь испытывает любовь. Поддержи это прекрасное чувство, прояви теплоту.",
            "neutral": "Пользователь в нейтральном состоянии. Ответь профессионально и поддерживающе.",
            "curious": "Пользователь проявляет любопытство. Ответь информативно и поддерживающе.",
            "surprised": "Пользователь удивлен. Раздели его удивление, прояви интерес к причине, поддержи эмоцию."
        }
        
        emotion_guidance = emotion_context.get(emotion, "Ответь профессионально и поддерживающе.")
        
        formatted_history = format_history(history)
        
        prompt = (
            "Ты — опытный эмпатичный психолог. Твоя задача — поддерживать пользователя и помогать ему.\n"
            f"{emotion_guidance}\n\n"
            "Отвечай кратко (1-2 предложения), естественно, по-человечески.\n"
            "Избегай шаблонных фраз, будь искренним.\n\n"
        )
        
        if formatted_history:
            prompt += f"История диалога:\n{formatted_history}\n\n"
        
        prompt += (
            f"Новый вопрос пользователя: {question}\n\n"
            "Твой ответ психолога (только ответ, без обозначения роли):"
        )

        print(f"🔍 Промпт для модели:\n{prompt}\n")
        
        max_attempts = 3
        for attempt in range(max_attempts):
            try:
                answer = llm_service.generate_response(
                    prompt, 
                    max_tokens=150, 
                    temperature=0.7
                )
                
                if answer and len(answer.strip()) > 10 and not answer.startswith("Не получилось"):
                    return answer.strip()
                
                print(f"⚠️ Попытка {attempt + 1}: Получен пустой или некорректный ответ: '{answer}'")
                time.sleep(0.5) 
                
            except Exception as e:
                print(f"⚠️ Ошибка при генерации ответа (попытка {attempt + 1}): {e}")
                if attempt == max_attempts - 1:
                    raise
        
        # Если все попытки неудачны, возвращаем запасной ответ
        fallback_responses = {
            "sad": "Мне очень жаль, что вы переживаете такие трудности. Хотите рассказать подробнее?",
            "happy": "Это прекрасно! Рад разделить с вами эту радость!",
            "angry": "Понимаю ваше возмущение. Давайте вместе подумаем, как можно решить эту ситуацию.",
            "surprised": "Вау, это действительно неожиданно! Расскажите, что вас так удивило?",
            "default": "Понимаю ваши чувства. Расскажите, что происходит?"
        }
        
        return fallback_responses.get(emotion, fallback_responses["default"])
        
    except Exception as e:
        print(f"❌ Критическая ошибка в generate_psychologist_response: {e}")
        return "Понимаю ваши чувства. Как я могу помочь вам в этой ситуации?"

@app.errorhandler(400)
def bad_request(error):
    return jsonify({"error": "Неверный запрос", "details": str(error)}), 400

@app.errorhandler(500)
def server_error(error):
    logging.error(f"Server error: {str(error)}")
    return jsonify({"error": "Внутренняя ошибка сервера"}), 500

@app.route("/health", methods=["GET"])
def health_check():
    """Проверка работоспособности сервиса"""
    return jsonify({
        "status": "healthy",
        "services": {
            "llm": "available",
            "emotion": "available"
        }
    })

@app.route("/ask", methods=["POST"])
def ask():
    """Основной эндпоинт для общения с психологом"""
    try:
        if not request.is_json:
            return jsonify({"error": "Требуется JSON-запрос"}), 400
        
        data = request.get_json(force=True)
        input_value = data.get("question", "").strip()
        
        if not input_value:
            return jsonify({"error": "Вопрос не может быть пустым"}), 400
        
        question = clean_text(input_value)
        if not question:
            return jsonify({"error": "Недопустимый ввод"}), 400

        print(f"📩 Получен вопрос: '{question}'")
        
        emotion = emotion_service.detect_emotion(question)
        print(f"🎭 Определена эмоция: {emotion}")
        
        history = get_user_history()
        print(f"📚 Размер истории: {len(history)}")
        
        start_time = time.time()
        answer = generate_psychologist_response(question, history, emotion)
        response_time = time.time() - start_time
        
        print(f"✅ Сгенерирован ответ: '{answer}'")
        print(f"⏱ Время генерации: {response_time:.2f} сек")
        
        update_history(question, answer)

        return jsonify({
            "answer": answer,
            "emotion": emotion,
            "response_time": round(response_time, 2),
            "history_length": len(get_user_history())
        })

    except Exception as e:
        logging.error(f"Error in /ask: {str(e)}", exc_info=True)
        print(f"❌ Ошибка в /ask: {e}")
        return jsonify({
            "error": "Произошла ошибка при обработке запроса",
            "answer": "Извините, возникли технические трудности. Пожалуйста, попробуйте еще раз."
        }), 500

@app.route("/clear", methods=["POST"])
def clear_history():
    """Очистка истории диалога"""
    try:
        session["history"] = []
        return jsonify({
            "status": "success", 
            "message": "История диалога очищена"
        })
    except Exception as e:
        logging.error(f"Error in /clear: {str(e)}")
        return jsonify({"error": "Ошибка при очистке истории"}), 500

@app.route("/history", methods=["GET"])
def get_history():
    """Получение текущей истории диалога"""
    try:
        history = get_user_history()
        return jsonify({
            "history": history,
            "length": len(history)
        })
    except Exception as e:
        logging.error(f"Error in /history: {str(e)}")
        return jsonify({"error": "Ошибка при получении истории"}), 500

if __name__ == "__main__":
    print("🚀 Запуск Flask приложения...")
    print(f"📁 Рабочая директория: {os.getcwd()}")
    print(f"🔑 Секретный ключ: {'установлен' if app.secret_key else 'не установлен'}")
    
    app.run(
        debug=True,
        host='0.0.0.0',
        port=5000
    )