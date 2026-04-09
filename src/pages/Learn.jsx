import { useState, useEffect } from 'react';

export default function Learn() {
  const [topic, setTopic] = useState('');
  const [mode, setMode] = useState('friendly');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [serverStatus, setServerStatus] = useState('checking');

  // Check server health on component mount
  useEffect(() => {
    const checkServer = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/health');
        if (response.ok) {
          setServerStatus('connected');
        } else {
          setServerStatus('error');
        }
      } catch (err) {
        setServerStatus('offline');
      }
    };
    checkServer();
  }, []);

  const handleExplain = async (e) => {
    e.preventDefault();
    
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    if (serverStatus === 'offline') {
      setError('❌ Server is offline. Start Node.js server first!');
      return;
    }

    setLoading(true);
    setError('');
    setAnswer('');

    try {
      const response = await fetch('http://localhost:5001/api/explain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          topic: topic.trim(), 
          mode 
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
      } else {
        setAnswer(data.answer);
      }
    } catch (err) {
      setError(`❌ ${err.message}. Make sure backend server is running on port 5001`);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getServerStatusColor = () => {
    switch(serverStatus) {
      case 'connected': return '#10b981';
      case 'offline': return '#ef4444';
      case 'checking': return '#f59e0b';
      default: return '#ef4444';
    }
  };

  const getServerStatusText = () => {
    switch(serverStatus) {
      case 'connected': return '✓ Server Connected';
      case 'offline': return '✗ Server Offline';
      case 'checking': return '⏳ Checking...';
      default: return '✗ Server Error';
    }
  };

  return (
    <div className="learn-page">
      <div className="learn-header">
        <div className="dashboard-tag">🤖 AI Powered Learning</div>
        <h1>AI Topic Explainer</h1>
        <p className="learn-subtext">
          Enter any topic and choose your preferred explanation style. Our AI will break it down in a way that's perfect for you!
        </p>
        <div 
          style={{
            marginTop: '20px',
            display: 'inline-block',
            padding: '8px 16px',
            borderRadius: '8px',
            backgroundColor: `${getServerStatusColor()}20`,
            border: `2px solid ${getServerStatusColor()}`,
            color: getServerStatusColor(),
            fontSize: '14px',
            fontWeight: '600'
          }}
        >
          {getServerStatusText()}
        </div>
      </div>

      <div className="learn-panel">
        <div className="learn-controls">
          <form onSubmit={handleExplain} className="learn-form">
            <div className="form-group">
              <label htmlFor="topic">Topic Name</label>
              <input
                id="topic"
                type="text"
                placeholder="e.g., Photosynthesis, JavaScript Promises, Quantum Computing"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                disabled={loading || serverStatus === 'offline'}
              />
            </div>

            <div className="form-group">
              <label htmlFor="mode">Explanation Mode</label>
              <select
                id="mode"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                disabled={loading || serverStatus === 'offline'}
              >
                <option value="friendly">👋 Friendly (Easy & Fun)</option>
                <option value="beginner">📚 Beginner (Simple Terms)</option>
                <option value="strict">🎯 Strict (Technical & Formal)</option>
                <option value="exam">📝 Exam (Study Guide Format)</option>
              </select>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button
              type="submit"
              className="primary-btn full-width"
              disabled={loading || serverStatus === 'offline'}
            >
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Generating Explanation...
                </>
              ) : (
                '✨ Explain Now'
              )}
            </button>
          </form>

          <div className="mode-info">
            <p className="mode-info-title">💡 About Modes:</p>
            <ul className="mode-list">
              <li><strong>Friendly:</strong> Casual, fun, with examples</li>
              <li><strong>Beginner:</strong> Simple language, basics only</li>
              <li><strong>Strict:</strong> Technical, detailed, professional</li>
              <li><strong>Exam:</strong> Key points, definitions, review format</li>
            </ul>
          </div>
        </div>

        <div className="learn-output-card">
          <h3>📖 Explanation</h3>
          {loading ? (
            <div className="learn-placeholder">
              <div className="loading-container">
                <div className="loading-spinner-large"></div>
                <p>AI is thinking...</p>
              </div>
            </div>
          ) : answer ? (
            <div className="learn-answer">{answer}</div>
          ) : (
            <div className="learn-placeholder">
              {serverStatus === 'offline' 
                ? '❌ Backend server is offline. Start the Node.js server first!'
                : 'Enter a topic and click "Explain Now" to get started!'
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
}