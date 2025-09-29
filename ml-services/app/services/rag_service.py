from typing import Dict, Any, List, Optional
import openai
import logging
from .vector_database import VectorDatabase

logger = logging.getLogger(__name__)

class RAGService:
    """Retrieval-Augmented Generation service for ARGO data queries"""
    
    def __init__(self):
        self.vector_db = VectorDatabase()
        self.system_prompt = self._get_system_prompt()
    
    def _get_system_prompt(self) -> str:
        """Get the system prompt for the RAG model"""
        return """
        You are an expert oceanographer and data analyst specializing in ARGO float data. 
        You help users explore and understand oceanographic data through natural language queries.
        
        ARGO floats are autonomous profiling floats that measure ocean properties like:
        - Temperature (TEMP)
        - Salinity (PSAL) 
        - Pressure (PRES)
        - Dissolved Oxygen (DOXY)
        - Chlorophyll-a (CHLA)
        - pH levels
        - Nitrate concentrations
        - Backscattering (BBP700)
        
        When answering queries:
        1. Use the provided context from the ARGO database
        2. Provide specific, data-driven responses
        3. Explain oceanographic concepts when relevant
        4. Suggest visualizations when appropriate
        5. Be precise about geographic locations and time periods
        6. Acknowledge limitations if data is insufficient
        
        Always maintain scientific accuracy and explain your reasoning.
        """
    
    async def process_query(self, query: str, context_limit: int = 5) -> Dict[str, Any]:
        """Process a natural language query using RAG"""
        try:
            # Step 1: Retrieve relevant context from vector database
            context_docs = await self.vector_db.search(query, limit=context_limit)
            
            # Step 2: Format context for the LLM
            context_text = self._format_context(context_docs)
            
            # Step 3: Generate SQL query if needed
            sql_query = self._generate_sql_query(query, context_docs)
            
            # Step 4: Generate response using LLM
            response = await self._generate_response(query, context_text)
            
            return {
                "query": query,
                "response": response,
                "context_documents": context_docs,
                "sql_query": sql_query,
                "suggestions": self._generate_suggestions(query)
            }
            
        except Exception as e:
            logger.error(f"Error processing RAG query: {str(e)}")
            return {
                "query": query,
                "response": "I apologize, but I encountered an error processing your query. Please try rephrasing your question.",
                "error": str(e)
            }
    
    def _format_context(self, context_docs: List[Dict[str, Any]]) -> str:
        """Format retrieved documents as context for the LLM"""
        if not context_docs:
            return "No relevant data found in the database."
        
        context_parts = ["RELEVANT ARGO DATA:"]
        
        for i, doc in enumerate(context_docs, 1):
            context_parts.append(f"\n{i}. Float Data:")
            
            if 'float_id' in doc:
                context_parts.append(f"   Float ID: {doc['float_id']}")
            
            if 'latitude' in doc and 'longitude' in doc:
                context_parts.append(f"   Location: {doc['latitude']:.2f}°N, {doc['longitude']:.2f}°E")
            
            if 'date' in doc:
                context_parts.append(f"   Date: {doc['date']}")
            
            if 'measurements' in doc:
                params = list(doc['measurements'].keys())
                context_parts.append(f"   Available parameters: {', '.join(params)}")
                
                # Add sample values for key parameters
                for param in ['TEMP', 'PSAL', 'DOXY']:
                    if param in doc['measurements']:
                        values = doc['measurements'][param].get('values', [])
                        if values:
                            context_parts.append(f"   {param}: {values[0]:.2f} (surface) to {values[-1]:.2f} (deep)")
            
            if 'similarity_score' in doc:
                context_parts.append(f"   Relevance: {doc['similarity_score']:.2f}")
        
        return "\n".join(context_parts)
    
    def _generate_sql_query(self, query: str, context_docs: List[Dict[str, Any]]) -> Optional[str]:
        """Generate SQL query based on natural language query"""
        # Simple heuristics for common query patterns
        query_lower = query.lower()
        
        # Basic templates for common queries
        if "near" in query_lower and "latitude" in query_lower:
            return "SELECT * FROM argo_profiles WHERE latitude BETWEEN ? AND ? AND longitude BETWEEN ? AND ?"
        
        elif "salinity" in query_lower:
            return "SELECT * FROM argo_profiles WHERE measurements ? 'PSAL'"
        
        elif "temperature" in query_lower:
            return "SELECT * FROM argo_profiles WHERE measurements ? 'TEMP'"
        
        elif "oxygen" in query_lower or "doxy" in query_lower:
            return "SELECT * FROM argo_profiles WHERE measurements ? 'DOXY'"
        
        # Default query
        return "SELECT * FROM argo_profiles ORDER BY date DESC LIMIT 100"
    
    async def _generate_response(self, query: str, context: str) -> str:
        """Generate response using OpenAI GPT"""
        try:
            # For now, return a structured response based on the query
            # In production, this would call OpenAI API
            
            response_parts = []
            
            if "salinity" in query.lower():
                response_parts.append("Based on the ARGO float data, here's what I found about salinity:")
                
            elif "temperature" in query.lower():
                response_parts.append("Based on the ARGO float data, here's what I found about temperature:")
                
            elif "oxygen" in query.lower() or "doxy" in query.lower():
                response_parts.append("Based on the ARGO float data, here's what I found about dissolved oxygen:")
                
            else:
                response_parts.append("Based on the available ARGO float data:")
            
            # Add context summary
            if "No relevant data found" not in context:
                response_parts.append("\n- Multiple float profiles were found matching your query")
                response_parts.append("- Data includes measurements from various locations and time periods")
                response_parts.append("- You can visualize this data using the dashboard charts")
            else:
                response_parts.append("\n- No specific data found matching your exact criteria")
                response_parts.append("- Try broadening your search parameters or check different time periods")
            
            return "\n".join(response_parts)
            
        except Exception as e:
            logger.error(f"Error generating response: {str(e)}")
            return "I apologize, but I couldn't generate a proper response to your query. Please try again."
    
    def _generate_suggestions(self, query: str) -> List[str]:
        """Generate follow-up suggestions based on the query"""
        suggestions = []
        
        if "salinity" in query.lower():
            suggestions.extend([
                "Show temperature vs salinity plot",
                "Compare salinity with other regions",
                "View salinity trends over time"
            ])
        
        elif "temperature" in query.lower():
            suggestions.extend([
                "Plot temperature depth profiles",
                "Compare with historical data",
                "Show temperature anomalies"
            ])
        
        elif "oxygen" in query.lower():
            suggestions.extend([
                "Oxygen minimum zones",
                "Oxygen saturation levels",
                "Biogeochemical relationships"
            ])
        
        else:
            suggestions.extend([
                "Show all parameters for this float",
                "View geographic distribution",
                "Compare with nearby floats",
                "Download data as NetCDF"
            ])
        
        return suggestions[:3]  # Return top 3 suggestions