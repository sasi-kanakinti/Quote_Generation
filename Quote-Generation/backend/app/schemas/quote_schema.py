from pydantic import BaseModel

class QuoteCreate(BaseModel):
    content: str
    author: str
    user_id: int