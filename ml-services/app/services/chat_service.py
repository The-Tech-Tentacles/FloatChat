from typing import Dict, Any, Optional, List
import uuid
import logging
from .rag_service import RAGService

logger = logging.getLogger(__name__)

class ChatService:
    """Chat service for handling conversational interactions"""
    
    def __init__(self):
        self.rag_service = RAGService()
        self.conversations = {}  # In production, use persistent storage
    
    async def process_message(self, message: str, conversation_id: Optional[str] = None) -> Dict[str, Any]:
        """Process a chat message and return response"""
        try:
            # Create new conversation if needed
            if not conversation_id:
                conversation_id = str(uuid.uuid4())
                self.conversations[conversation_id] = {
                    "id": conversation_id,
                    "messages": [],
                    "created_at": None,
                    "updated_at": None
                }
            
            # Add user message to conversation
            user_message = {
                "role": "user",
                "content": message,
                "timestamp": None  # In production, use proper timestamp
            }
            
            if conversation_id in self.conversations:
                self.conversations[conversation_id]["messages"].append(user_message)
            
            # Process query using RAG
            rag_response = await self.rag_service.process_query(message)
            
            # Create assistant response
            assistant_message = {
                "role": "assistant",
                "content": rag_response["response"],
                "timestamp": None,
                "metadata": {
                    "context_documents": rag_response.get("context_documents", []),
                    "sql_query": rag_response.get("sql_query"),
                    "suggestions": rag_response.get("suggestions", [])
                }
            }
            
            # Add assistant response to conversation
            if conversation_id in self.conversations:
                self.conversations[conversation_id]["messages"].append(assistant_message)
            
            return {
                "conversation_id": conversation_id,
                "message": assistant_message,
                "suggestions": rag_response.get("suggestions", []),
                "context_data": rag_response.get("context_documents", []),
                "sql_query": rag_response.get("sql_query")
            }
            
        except Exception as e:
            logger.error(f"Error processing chat message: {str(e)}")
            return {
                "conversation_id": conversation_id or "error",
                "message": {
                    "role": "assistant",
                    "content": "I apologize, but I encountered an error processing your message. Please try again.",
                    "timestamp": None
                },
                "error": str(e)
            }
    
    def get_conversation(self, conversation_id: str) -> Optional[Dict[str, Any]]:
        """Get conversation by ID"""
        return self.conversations.get(conversation_id)
    
    def list_conversations(self, user_id: Optional[str] = None) -> List[Dict[str, Any]]:
        """List all conversations (filtered by user in production)"""
        return list(self.conversations.values())
    
    def delete_conversation(self, conversation_id: str) -> bool:
        """Delete a conversation"""
        if conversation_id in self.conversations:
            del self.conversations[conversation_id]
            return True
        return False