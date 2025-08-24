import os
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline

class EmotionService:
    def __init__(self):
        self.classifier = self._load_model()
    
    def _load_model(self):
        model_path = os.path.join(
            os.path.dirname(__file__), "models", "big_Emotions_model"
        )
        try:
            print(f"🔍 Загружаем кастомную модель эмоций из: {model_path}")
            tokenizer = AutoTokenizer.from_pretrained(model_path)
            model = AutoModelForSequenceClassification.from_pretrained(model_path)
            return pipeline("text-classification", model=model, tokenizer=tokenizer)
        except Exception as e:
            print(f"❌ Ошибка загрузки модели эмоций: {e}")
            return None
    
    def detect_emotion(self, text: str) -> str:
        if not text:
            return "neutral"
        
        text_lower = text.lower()

        if self.classifier:
            try:
                result = self.classifier(text)[0]
                raw_label = result["label"].lower()

                label_map = {
                    "surprise": "surprised",    
                    "laugh": "laughing",        
                    "curiosity": "curious",     
                    "angry": "angry",
                    "happy": "happy",
                    "sad": "sad", 
                    "love": "love",
                    "neutral": "neutral"
                }
                emotion = label_map.get(raw_label, raw_label)
                return emotion
            except Exception as e:
                print(f"⚠️ Ошибка при предсказании эмоции: {e}")

        # Резервная эвристика с синхронизированными названиями
        emotion_keywords = {
            "sad": ["болезнь", "умер", "потерял", "груст", "плохо", "забол", "больн", "операц"],
            "angry": ["зл", "бесит", "ненавижу", "разоз", "ярост", "злюсь", "сердит", "раздраж"],
            "happy": ["рад", "счаст", "весел", "ура", "класс", "круто", "хорошо", "отлич"],
            "love": ["любл", "обожаю", "дорог", "мил", "сердечк", "нежн"],
            "curious": ["интерес", "удивит", "любопыт", "хочу знать", "почему", "как"],
            "surprised": ["вау", "ого", "невероят", "удивитель", "сюрприз", "не ожидал", "вот это да", "ничего себе"],
            "laughing": ["смеюсь", "смешно", "ахах", "лол", "ржу"]
        }
        
        for emotion, keywords in emotion_keywords.items():
            if any(keyword in text_lower for keyword in keywords):
                return emotion
                
        return "neutral"

emotion_service = EmotionService()