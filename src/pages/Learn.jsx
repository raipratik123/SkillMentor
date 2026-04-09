import { useState } from "react";

export default function Learn() {
  const [topic, setTopic] = useState("");
  const [mode, setMode] = useState("friendly");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  const handleExplain = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch("http://localhost:5001/api/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic, mode }),
      });

      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      setAnswer("Server se connect nahi ho paya.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="learn-page">
      <section className="learn-header">
        <p className="dashboard-tag">AI Learning Tool</p>
        <h1>AI Topic Explainer</h1>
        <p className="learn-subtext">
          Enter any topic and choose how you want the AI to explain it.
        </p>
      </section>

      <section className="learn-panel">
        <div className="learn-controls">
          <input
            type="text"
            placeholder="Enter topic like Photosynthesis, Binary Search..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />

          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="friendly">Friendly Mode</option>
            <option value="strict">Strict Mode</option>
            <option value="exam">Exam Mode</option>
            <option value="beginner">Beginner Mode</option>
          </select>

          <button className="primary-btn" onClick={handleExplain}>
            {loading ? "Explaining..." : "Explain"}
          </button>
        </div>

        <div className="learn-output-card">
          <h3>Explanation</h3>

          {loading ? (
            <p className="learn-placeholder">Generating explanation...</p>
          ) : answer ? (
            <p className="learn-answer">{answer}</p>
          ) : (
            <p className="learn-placeholder">
              Your AI explanation will appear here.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}