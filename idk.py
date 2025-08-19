from flask import Flask, request, jsonify
from llama_cpp import Llama
from collections import deque
from transformers import pipeline, AutoModelForSequenceClassification, AutoTokenizer
import torch
import re
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Модель для генерации ответов
llm = Llama(
    model_path=r"C:\Users\User\Desktop\ыыыы\AvatarMaster\saiga_llama3_8b.Q4_K_M.gguf",
    n_ctx=2048,
    n_threads=4
)

# Модель для эмоций
MODELS = [
    "seara/rubert-tiny2-russian-emotion-detection",
      "cointegrated/rubert-tiny2-emotion",
    "blanchefort/rubert-base-cased-sentiment"
]


history = deque(maxlen=4)

def clean_text(text):
    text = re.sub(r'[^\w\s.,!?]', '', text)  # Удаляет спецсимволы
    text = text.strip()
    return text if len(text) >= 2 else None  # Отсекает короткий мусор

def load_emotion_model():
    for model_name in MODELS:
        try:
            print(f"Пробуем загрузить модель: {model_name}")
            tokenizer = AutoTokenizer.from_pretrained(model_name)
            model = AutoModelForSequenceClassification.from_pretrained(model_name)
            return pipeline("text-classification", model=model, tokenizer=tokenizer)
        except Exception as e:
            print(f"Не удалось загрузить {model_name}: {str(e)}")
    
    print("Не удалось загрузить ни одну модель, используем ключевые слова")
    return None

emotion_classifier = load_emotion_model()

def detect_emotion(text: str) -> str:
    text_lower = text.lower()

    # --- 1. Попытка использовать модель ---
    if emotion_classifier:
        try:
            result = emotion_classifier(text)[0]
            label = result["label"].lower()
            print(f"Результат модели: {result}")

            label_map = {
                "joy": "happy",
                "positive": "happy",
                "sadness": "sad",
                "negative": "sad",
                "anger": "angry",
                "neutral": "neutral"
            }

            if label in label_map:
                return label_map[label]
        except Exception as e:
            print(f"Ошибка модели: {e}")

    # --- 2. Если модель не сработала — эвристика ---
    if any(word in text_lower for word in ["болезнь", "умер", "потерял", "операц", "больн", "груст", "плохо", "забол"]):
        return "sad"
    if any(word in text_lower for word in ["зл", "бесит", "ненавижу", "разоз", "ярост", "злюсь", "сердит"]):
        return "angry"
    if any(word in text_lower for word in ["рад", "счаст", "весел", "ура", "класс", "круто", "хорошо"]):
        return "happy"
    if any(word in text_lower for word in ["любл", "обожаю", "дорог", "мил", "сердечк"]):
        return "love"
    if any(word in text_lower for word in ["интерес", "удивит", "любопыт", "хочу знать", "почему"]):
        return "curious"

    return "neutral"


@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json(force=True)
    input_value = data.get("question", "").strip()
    
    # Очистка входных данных
    question = clean_text(input_value)
    if not question:
        return jsonify({"error": "Invalid input"}), 400

    try:
        emotion = detect_emotion(question)
        history.append({"role": "user", "content": question})

        formatted_history = "\n".join(
            f"{'Пользователь' if msg['role']=='user' else 'Бот'}: {msg['content']}"
            for msg in history
        )

        prompt = (
            "Ты — психолог. Ответь на вопрос кратко и по делу.\n"
            "История:\n"
            f"{formatted_history}\n"
            "Ответ:"
        )

        output = llm(prompt, max_tokens=200, temperature=0.5)
        answer = output["choices"][0]["text"].strip()

        history.append({"role": "bot", "content": answer})

        return jsonify({
            "answer": answer,
            "emotion": emotion
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)