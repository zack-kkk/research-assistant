import React, { useState } from 'react';
import ResearchForm from './components/ResearchForm';
import ResultsPanel from './components/ResultsPanel';
import Loader from './components/Loader';
import './index.css';

function App() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleResearch = async (searchQuery) => {
    setQuery(searchQuery);
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/research`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchQuery }),
      });

      if (!response.ok) {
        let errorMsg = `Server error: ${response.statusText}`;
        try {
          const errorData = await response.json();
          if (errorData && errorData.detail) {
            errorMsg = typeof errorData.detail === 'string' ? errorData.detail : JSON.stringify(errorData.detail);
          }
        } catch (e) {
          // Ignore JSON parse error if response is not JSON
        }
        throw new Error(errorMsg);
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error("Research error:", err);
      setError(err.message || 'An error occurred during research.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Agentic Research Assistant</h1>
        <p className="subtitle">Powered by LangChain, DuckDuckGo & Wikipedia</p>
      </header>
      
      <main>
        <ResearchForm onSubmit={handleResearch} disabled={loading} />
        
        {loading && <Loader />}
        
        {error && (
          <div className="glass-panel" style={{ borderLeft: '4px solid #ef4444' }}>
            <h3 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>Error</h3>
            <p>{error}</p>
          </div>
        )}
        
        {results && <ResultsPanel data={results} />}
      </main>
    </div>
  );
}

export default App;
