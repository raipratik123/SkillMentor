import { useState } from 'react';

function VideoSummary() {
  const [videoLink, setVideoLink] = useState('');
  const [summaryType, setSummaryType] = useState('Short');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!videoLink.trim()) {
      setError('Please paste a valid YouTube video link.');
      setSummary('');
      return;
    }

    setError('');
    setSummary('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5001/api/video-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoLink: videoLink.trim(), summaryType })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || data?.error || 'Unable to generate summary');
      setSummary(data.summary || data.result || 'Summary generated successfully.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="video-summary-page">
      <section className="video-summary-header">
        <span className="section-tag">AI Video Summary</span>
        <h1>AI Video Summary</h1>
        <p>
          Paste a YouTube link and choose how you want the summary.
          Get a quick digest, detailed breakdown, key points, or exam-ready notes.
        </p>
      </section>

      <div className="video-summary-card">
        <form className="video-summary-form" onSubmit={handleGenerate}>
          <div className="form-group">
            <label htmlFor="videoLink">YouTube Video URL</label>
            <input
              id="videoLink"
              type="url"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="video-summary-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="summaryType">Summary Type</label>
            <select
              id="summaryType"
              value={summaryType}
              onChange={(e) => setSummaryType(e.target.value)}
              className="video-summary-select"
            >
              <option>Short</option>
              <option>Detailed</option>
              <option>Key Points</option>
              <option>Exam</option>
            </select>
          </div>

          <button type="submit" className="video-summary-btn" disabled={loading}>
            {loading ? 'Generating summary...' : 'Generate Summary'}
          </button>

          {error && <p className="video-summary-error">{error}</p>}
        </form>

        <div className="video-summary-result-card">
          <h2>Summary Result</h2>

          {loading && (
            <div className="video-summary-loading">
              <div className="loading-spinner-large" />
              <p>Processing your video. Please wait...</p>
            </div>
          )}

          {!loading && !summary && !error && (
            <p className="video-summary-placeholder">
              Your summary will appear here after generation.
            </p>
          )}

          {!loading && summary && (
            <div className="video-summary-result">
              <p>{summary}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default VideoSummary;