# Agentic Research Assistant

A full-stack web application that uses a LangChain agent to autonomously research user queries using DuckDuckGo and Wikipedia, then returns a structured JSON summary.

## Prerequisites

- Node.js (v18+)
- Python (3.9+)
- OpenAI API Key

## Setup Instructions

### Quick Start (Recommended)

To run both the frontend and backend with a single command from the root directory:

1. Install dependencies for both frontend and backend:
   ```bash
   npm run install:all
   ```
2. Set up your backend `.env` file (see Backend Setup below).
3. Start the application:
   ```bash
   npm start
   ```

### Manual Setup

#### 1. Backend Setup

1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Setup environment variables:
   - Copy `.env.example` to a new file named `.env`
   - Edit `.env` and add your `OPENAI_API_KEY`:
     ```
     OPENAI_API_KEY="sk-..."
     ```
5. Run the FastAPI server:
   ```bash
   python main.py
   ```
   The backend will start at `http://localhost:8000`.

#### 2. Frontend Setup

1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open the frontend in your browser, typically at `http://localhost:5173`.

## Usage

1. Go to the web app in your browser.
2. Enter a query in the search box (e.g., "What are the key events of the Space Race?").
3. Wait for the agent to autonomously query its tools and compile the research.
4. View the structured results including a summary, key points, and sources.
