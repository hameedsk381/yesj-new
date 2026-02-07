from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from app.core.rag_service import query_rag

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

@router.post("/", response_model=ChatResponse)
def chat(
    chat_request: ChatRequest,
) -> Any:
    """
    Chat with the specialized RAG bot about YESJ.
    """
    print(f"Incoming Chat Request: {chat_request.message}")
    if not chat_request.message:
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    
    answer = query_rag(chat_request.message)
    return {"response": answer}
