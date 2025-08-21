import re

def clean_text(text):
    if not text or not isinstance(text, str):
        return None
    text = re.sub(r'[^\w\sа-яА-ЯёЁ.,!?;:()-]', '', text, flags=re.UNICODE)
    text = re.sub(r'\s+', ' ', text)
    text = text.strip()
    if len(text) < 2:
        return None
    
    return text