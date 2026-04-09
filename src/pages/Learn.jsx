import { useState } from "react";

export default function Learn() {
  const [topic, setTopic] = useState("");
  const [mode, setMode] = useState("friendly");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleExplain = async (e) => {
    e.preventDefault();

    if (!topic.trim()) {
      setError("Please enter a topic");
      return;
    }

    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const response = await fetch("http://localhost:5001/api/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: topic.trim(), mode }),
      });

      if (!response.ok) {
        throw new Error("Failed to get explanation");
      }

      const data = await response.json();
      setAnswer(data.answer);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
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
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="mode">Explanation Mode</label>
              <select
                id="mode"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                disabled={loading}
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
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Generating Explanation...
                </>
              ) : (
                "✨ Explain Now"
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
              Enter a topic and click "Explain Now" to get started!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}