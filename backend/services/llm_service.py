import os
from llama_cpp import Llama

class LLMService:
    def __init__(self, model_path=None, n_ctx=2048, n_threads=4):
        model_path = model_path or os.getenv("MODEL_PATH")
        
        print(f"🔍 Запрошенный путь: {model_path}")
        
        if not model_path:
            raise ValueError("MODEL_PATH environment variable is required")
        
        if not os.path.isabs(model_path):
            base_dir = os.path.dirname(os.path.abspath(__file__))
            model_path = os.path.join(base_dir, model_path)
        
        print(f"🔍 Абсолютный путь: {model_path}")
        print(f"🔍 Файл существует: {os.path.exists(model_path)}")
        
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file not found: {model_path}")
        
        print(f"Загружаем модель из: {model_path}")
        
        self.llm = Llama(
            model_path=model_path,
            n_ctx=n_ctx,
            n_threads=n_threads
        )
    
    def generate_response(self, prompt, max_tokens=200, temperature=0.5):
        output = self.llm(prompt, max_tokens=max_tokens, temperature=temperature)
        return output["choices"][0]["text"].strip()

llm_service = LLMService()