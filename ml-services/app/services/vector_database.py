import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
from typing import List, Dict, Any, Optional
import pickle
import os
import logging

logger = logging.getLogger(__name__)

class VectorDatabase:
    """Vector database service for semantic search of ARGO data"""
    
    def __init__(self, model_name: str = "all-MiniLM-L6-v2"):
        self.model = SentenceTransformer(model_name)
        self.index = None
        self.metadata = []
        self.dimension = 384  # Default for all-MiniLM-L6-v2
        self.index_path = "vector_index.faiss"
        self.metadata_path = "vector_metadata.pkl"
        
        # Load existing index if available
        self._load_index()
    
    def _load_index(self):
        """Load existing FAISS index and metadata"""
        try:
            if os.path.exists(self.index_path) and os.path.exists(self.metadata_path):
                self.index = faiss.read_index(self.index_path)
                with open(self.metadata_path, 'rb') as f:
                    self.metadata = pickle.load(f)
                logger.info(f"Loaded vector index with {len(self.metadata)} entries")
            else:
                self._initialize_index()
        except Exception as e:
            logger.error(f"Error loading vector index: {str(e)}")
            self._initialize_index()
    
    def _initialize_index(self):
        """Initialize a new FAISS index"""
        self.index = faiss.IndexFlatIP(self.dimension)  # Inner product for cosine similarity
        self.metadata = []
        logger.info("Initialized new vector index")
    
    def _save_index(self):
        """Save FAISS index and metadata to disk"""
        try:
            faiss.write_index(self.index, self.index_path)
            with open(self.metadata_path, 'wb') as f:
                pickle.dump(self.metadata, f)
            logger.info(f"Saved vector index with {len(self.metadata)} entries")
        except Exception as e:
            logger.error(f"Error saving vector index: {str(e)}")
    
    def add_documents(self, documents: List[Dict[str, Any]]):
        """Add documents to the vector database"""
        try:
            texts = []
            metadata_entries = []
            
            for doc in documents:
                # Create searchable text from document
                text = self._create_searchable_text(doc)
                texts.append(text)
                metadata_entries.append(doc)
            
            # Generate embeddings
            embeddings = self.model.encode(texts, normalize_embeddings=True)
            
            # Add to FAISS index
            self.index.add(embeddings.astype('float32'))
            self.metadata.extend(metadata_entries)
            
            # Save to disk
            self._save_index()
            
            logger.info(f"Added {len(documents)} documents to vector database")
            
        except Exception as e:
            logger.error(f"Error adding documents: {str(e)}")
            raise
    
    def _create_searchable_text(self, doc: Dict[str, Any]) -> str:
        """Create searchable text from ARGO document"""
        text_parts = []
        
        # Add basic metadata
        if 'float_id' in doc:
            text_parts.append(f"Float ID: {doc['float_id']}")
        
        if 'latitude' in doc and 'longitude' in doc:
            text_parts.append(f"Location: {doc['latitude']:.2f}°N, {doc['longitude']:.2f}°E")
        
        if 'date' in doc:
            text_parts.append(f"Date: {doc['date']}")
        
        # Add parameter information
        if 'measurements' in doc:
            params = list(doc['measurements'].keys())
            text_parts.append(f"Parameters: {', '.join(params)}")
            
            # Add parameter descriptions
            param_descriptions = {
                'TEMP': 'temperature',
                'PSAL': 'salinity',
                'PRES': 'pressure',
                'DOXY': 'dissolved oxygen',
                'CHLA': 'chlorophyll-a',
                'BBP700': 'backscattering',
                'PH_IN_SITU_TOTAL': 'pH',
                'NITRATE': 'nitrate'
            }
            
            for param in params:
                if param in param_descriptions:
                    text_parts.append(param_descriptions[param])
        
        # Add geographic regions (simple logic)
        if 'latitude' in doc and 'longitude' in doc:
            lat, lon = doc['latitude'], doc['longitude']
            
            # Ocean basin identification
            if -20 <= lat <= 30 and 30 <= lon <= 100:
                text_parts.append("Indian Ocean")
            elif -10 <= lat <= 25 and 50 <= lon <= 80:
                text_parts.append("Arabian Sea")
            elif lat >= 0:
                text_parts.append("Northern Hemisphere")
            else:
                text_parts.append("Southern Hemisphere")
            
            # Equatorial region
            if -5 <= lat <= 5:
                text_parts.append("equatorial region")
        
        return " ".join(text_parts)
    
    async def search(self, query: str, limit: int = 10) -> List[Dict[str, Any]]:
        """Search for similar documents using vector similarity"""
        try:
            if self.index.ntotal == 0:
                return []
            
            # Generate query embedding
            query_embedding = self.model.encode([query], normalize_embeddings=True)
            
            # Search in FAISS index
            scores, indices = self.index.search(query_embedding.astype('float32'), min(limit, self.index.ntotal))
            
            # Prepare results
            results = []
            for score, idx in zip(scores[0], indices[0]):
                if idx < len(self.metadata):
                    result = self.metadata[idx].copy()
                    result['similarity_score'] = float(score)
                    results.append(result)
            
            return results
            
        except Exception as e:
            logger.error(f"Error searching vector database: {str(e)}")
            return []
    
    def get_stats(self) -> Dict[str, Any]:
        """Get vector database statistics"""
        return {
            "total_documents": len(self.metadata),
            "index_size": self.index.ntotal if self.index else 0,
            "dimension": self.dimension,
            "model_name": str(self.model)
        }