import React from 'react';

function ResultsPanel({ data }) {
  if (!data) return null;

  const { query, summary, key_points, sources, research_papers, books } = data;

  return (
    <div className="glass-panel results-container" style={styles.container}>
      <h2 style={styles.queryTitle}>Results for: "{query}"</h2>
      
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Summary</h3>
        <p style={styles.summaryText}>{summary}</p>
      </div>
      
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Key Points</h3>
        <ul style={styles.list}>
          {key_points && key_points.map((point, index) => (
            <li key={index} style={styles.listItem}>{point}</li>
          ))}
        </ul>
      </div>

      {research_papers && research_papers.length > 0 && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>📄 Research Papers (arXiv)</h3>
          <div style={styles.resourceList}>
            {research_papers.map((paper, index) => (
              <a 
                key={index} 
                href={paper.url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.resourceLink}
              >
                <span style={styles.icon}>🔗</span> {paper.title}
              </a>
            ))}
          </div>
        </div>
      )}

      {books && books.length > 0 && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>📚 Book Recommendations</h3>
          <div style={styles.resourceList}>
            {books.map((book, index) => (
              <a 
                key={index} 
                href={book.url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.resourceLink}
              >
                <span style={styles.icon}>📖</span> {book.title}
              </a>
            ))}
          </div>
        </div>
      )}
      
      {sources && sources.length > 0 && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Sources</h3>
          <div style={styles.sourcesGrid}>
            {sources.map((source, index) => {
              // Create a clickable link if it looks like a URL
              const isUrl = source.startsWith('http://') || source.startsWith('https://');
              return isUrl ? (
                <a 
                  key={index} 
                  href={source} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={styles.sourceTag}
                >
                  {new URL(source).hostname}
                </a>
              ) : (
                <span key={index} style={styles.sourceTag}>{source}</span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    animation: 'fadeIn 0.5s ease',
  },
  queryTitle: {
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '0.5rem',
    color: '#a5b4fc'
  },
  section: {
    marginBottom: '1.5rem',
  },
  sectionTitle: {
    fontSize: '1.2rem',
    color: 'var(--text-primary)',
    marginBottom: '0.75rem',
    fontWeight: '600',
  },
  summaryText: {
    color: 'var(--text-secondary)',
    lineHeight: '1.7',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    position: 'relative',
    paddingLeft: '1.5rem',
    marginBottom: '0.5rem',
    color: 'var(--text-secondary)',
  },
  sourcesGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  resourceList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  resourceLink: {
    display: 'block',
    padding: '0.75rem',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#a5b4fc',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'all 0.2s',
  },
  icon: {
    marginRight: '0.5rem',
  },
  sourceTag: {
    background: 'rgba(99, 102, 241, 0.1)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    color: '#a5b4fc',
    padding: '0.4rem 0.8rem',
    borderRadius: '20px',
    fontSize: '0.875rem',
    textDecoration: 'none',
    transition: 'all 0.2s',
  }
};

// Add a quick animation via global css injection for the results component
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .results-container li::before {
      content: '→';
      position: absolute;
      left: 0;
      color: var(--primary-color);
      font-weight: bold;
    }
    .results-container a:hover {
      background: rgba(99, 102, 241, 0.2) !important;
    }
  `;
  document.head.appendChild(style);
}

export default ResultsPanel;
