# ARGO Float Conversational Data System

An AI-powered conversational system for exploring and visualizing oceanographic ARGO float data using natural language queries.

## 🌊 Project Overview

This system enables users to:

- Query ARGO float data using natural language
- Visualize oceanographic profiles and trajectories
- Compare BGC parameters across different regions and time periods
- Interactive dashboard with geospatial visualizations
- Real-time chat interface powered by RAG and LLMs

## 🏗️ Architecture

```
Frontend (React)     Backend (Node.js)     ML Services (Python)
├── Dashboard        ├── API Routes        ├── NetCDF Processing
├── Chat Interface   ├── WebSocket         ├── Vector Database
├── Visualizations   ├── Authentication    ├── RAG Pipeline
└── Map Components   └── File Upload       └── LLM Integration
```

## 🛠️ Tech Stack

### Frontend

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Plotly.js** for data visualizations
- **React-Leaflet** for geospatial maps
- **Socket.io-client** for real-time communication

### Backend API

- **Node.js** with Express.js
- **TypeScript** for type safety
- **Socket.io** for WebSocket communication
- **JWT** authentication
- **Multer** for file uploads

### ML/Data Processing

- **FastAPI** for ML service endpoints
- **xarray** for NetCDF file processing
- **Pandas/NumPy** for data manipulation
- **FAISS/ChromaDB** for vector database
- **PostgreSQL** with SQLAlchemy
- **LangChain** for RAG implementation
- **OpenAI/Anthropic APIs** for LLM integration

### Databases

- **PostgreSQL** for structured ARGO data
- **FAISS/ChromaDB** for vector embeddings
- **Redis** for caching and sessions

## 📁 Project Structure

```
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API service layer
│   │   ├── utils/          # Utility functions
│   │   └── types/          # TypeScript definitions
│   ├── public/
│   └── package.json
│
├── backend/                  # Node.js API server
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── middleware/     # Express middleware
│   │   ├── services/       # Business logic
│   │   ├── models/         # Data models
│   │   ├── utils/          # Utility functions
│   │   └── types/          # TypeScript definitions
│   ├── uploads/            # File upload directory
│   └── package.json
│
├── ml-services/              # Python ML services
│   ├── app/
│   │   ├── services/       # ML service modules
│   │   ├── models/         # Data models
│   │   ├── utils/          # Utility functions
│   │   └── config/         # Configuration
│   ├── data/               # Sample data and schemas
│   ├── requirements.txt
│   └── main.py
│
├── docker-compose.yml        # Container orchestration
├── .env.example             # Environment variables template
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.9+
- PostgreSQL 14+
- Redis 6+

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd SIH-FloatChat/WebSite
   ```

2. **Setup Frontend**

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Setup Backend**

   ```bash
   cd backend
   npm install
   npm run dev
   ```

4. **Setup Python ML Services**

   ```bash
   cd ml-services
   python -m venv venv
   source venv/bin/activate  # or `venv\Scripts\activate` on Windows
   pip install -r requirements.txt
   python main.py
   ```

5. **Setup Databases**

   ```bash
   # PostgreSQL setup
   createdb argo_data

   # Redis (using Docker)
   docker run -d -p 6379:6379 redis:alpine
   ```

## 🔧 Configuration

Copy `.env.example` to `.env` and configure:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/argo_data
REDIS_URL=redis://localhost:6379

# API Keys
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key

# Services
PYTHON_ML_SERVICE_URL=http://localhost:8000
NODE_API_URL=http://localhost:3001
FRONTEND_URL=http://localhost:3000
```

## 📊 Features

### Data Processing

- NetCDF file ingestion and conversion
- Structured data storage in PostgreSQL
- Vector embeddings for semantic search
- Metadata extraction and indexing

### AI/ML Capabilities

- Natural language query understanding
- RAG-powered response generation
- SQL query generation from natural language
- Semantic similarity search

### Visualizations

- Interactive geospatial maps
- Depth-time profile plots
- Parameter comparison charts
- Trajectory visualization
- Statistical summaries

### User Interface

- Modern, responsive design
- Real-time chat interface
- Interactive dashboards
- File upload and management
- Export capabilities (ASCII, NetCDF)

## 🧪 Example Queries

- "Show me salinity profiles near the equator in March 2023"
- "Compare BGC parameters in the Arabian Sea for the last 6 months"
- "What are the nearest ARGO floats to latitude 15°N, longitude 68°E?"
- "Plot temperature vs depth for float ID 2901623"
- "Show drift trajectory for all floats deployed in 2022"

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
