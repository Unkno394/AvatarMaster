from transformers import pipeline, AutoModelForSequenceClassification, AutoTokenizer

class EmotionService:
    def __init__(self):
        self.classifier = self._load_model()
    
    def _load_model(self):
        model_name = "blanchefort/rubert-base-cased-sentiment"
        try:
            print(f"Загружаем модель: {model_name}")
            tokenizer = AutoTokenizer.from_pretrained(model_name)
            model = AutoModelForSequenceClassification.from_pretrained(model_name)
            return pipeline("text-classification", model=model, tokenizer=tokenizer)
        except Exception as e:
            print(f"Ошибка загрузки {model_name}: {str(e)}")
            return None
    
    def detect_emotion(self, text: str) -> str:
        if not text:
            return "neutral"
            
        text_lower = text.lower()

        if self.classifier:
            try:
                result = self.classifier(text)[0]
                label = result["label"].lower()
                
                label_map = {
                    "positive": "happy",
                    "negative": "sad", 
                    "neutral": "neutral"
                }
                
                if label in label_map:
                    return label_map[label]
            except Exception as e:
                print(f"Ошибка модели эмоций: {e}")

        # Если модель не сработала - эвристика
        emotion_keywords = {
            "sad": ["болезнь", "умер", "потерял", "груст", "плохо", "забол", "больн", "операц"],
            "angry": ["зл", "бесит", "ненавижу", "разоз", "ярост", "злюсь", "сердит", "раздраж"],
            "happy": ["рад", "счаст", "весел", "ура", "класс", "круто", "хорошо", "отлич"],
            "love": ["любл", "обожаю", "дорог", "мил", "сердечк", "нежн"],
            "curious": ["интерес", "удивит", "любопыт", "хочу знать", "почему", "как"]
        }
        
        for emotion, keywords in emotion_keywords.items():
            if any(keyword in text_lower for keyword in keywords):
                return emotion
                
        return "neutral"

emotion_service = EmotionService()