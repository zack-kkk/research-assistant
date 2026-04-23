import React, { useState } from 'react';

function ResearchForm({ onSubmit, disabled }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input);
    }
  };

  return (
    <div className="glass-panel form-container">
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What would you like to research today?"
          disabled={disabled}
          style={styles.input}
          required
        />
        <button type="submit" disabled={disabled || !input.trim()} style={styles.button}>
          {disabled ? 'Researching...' : 'Start Research'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  form: {
    display: 'flex',
    gap: '1rem',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    padding: '1rem',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    background: 'rgba(255, 255, 255, 0.05)',
    color: 'var(--text-primary)',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  button: {
    minWidth: '150px',
  }
};

export default ResearchForm;
