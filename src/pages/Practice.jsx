import { useState } from 'react';

export default function Practice() {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStartQuiz = async (e) => {
    e.preventDefault();

    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5001/api/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: topic.trim(),
          difficulty,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch quiz');
      }

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setQuestions(data.questions || []);
        setQuizStarted(true);
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setScore(0);
        setShowScore(false);
      }
    } catch (err) {
      setError(`Error: ${err.message}. Make sure backend is running on port 5001`);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerClick = (index) => {
    setSelectedAnswer(index);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      setError('Please select an answer');
      return;
    }

    // Check if answer is correct
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
      setError('');
    } else {
      setShowScore(true);
    }
  };

  const handleTryAgain = () => {
    setQuizStarted(false);
    setTopic('');
    setDifficulty('easy');
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowScore(false);
    setQuestions([]);
    setError('');
  };

  // Loading State
  if (loading) {
    return (
      <div className="practice-page">
        <div className="practice-header">
          <div className="dashboard-tag">📝 Practice Quiz</div>
          <h1>Practice Quiz</h1>
        </div>
        <div className="quiz-loading">
          <div className="loading-container">
            <div className="loading-spinner-large"></div>
            <p>Generating your quiz...</p>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Setup Screen
  if (!quizStarted) {
    return (
      <div className="practice-page">
        <div className="practice-header">
          <div className="dashboard-tag">📝 Practice Quiz</div>
          <h1>Practice Quiz</h1>
          <p className="practice-subtext">
            Enter any topic and choose your difficulty level. Get instant questions to test your knowledge!
          </p>
        </div>

        <div className="quiz-setup-card">
          <form onSubmit={handleStartQuiz} className="quiz-form">
            <div className="form-group">
              <label htmlFor="topic">Topic Name</label>
              <input
                id="topic"
                type="text"
                placeholder="e.g., Biology, Python, History"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="difficulty">Difficulty Level</label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                disabled={loading}
              >
                <option value="easy">🟢 Easy</option>
                <option value="medium">🟡 Medium</option>
                <option value="hard">🔴 Hard</option>
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
                  Starting Quiz...
                </>
              ) : (
                '🚀 Start Quiz'
              )}
            </button>
          </form>

          <div className="quiz-info">
            <h3>💡 How it works:</h3>
            <ul className="quiz-info-list">
              <li>Choose your topic and difficulty level</li>
              <li>Answer multiple choice questions one by one</li>
              <li>Get instant feedback on your performance</li>
              <li>Try different topics to improve your knowledge</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Complete Screen
  if (showScore) {
    return (
      <div className="practice-page">
        <div className="practice-header">
          <div className="dashboard-tag">📝 Practice Quiz</div>
          <h1>Quiz Complete!</h1>
        </div>

        <div className="score-card">
          <div className="score-circle">
            <span className="score-number">{score}</span>
            <span className="score-total">/{questions.length}</span>
          </div>

          <h2>Great Job! 🎉</h2>
          <p className="score-percentage">
            You scored {Math.round((score / questions.length) * 100)}%
          </p>

          <div className="score-details">
            <div className="detail-item">
              <span className="detail-label">Topic:</span>
              <span className="detail-value">{topic}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Difficulty:</span>
              <span className="detail-value capitalize">{difficulty}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Correct Answers:</span>
              <span className="detail-value">{score} out of {questions.length}</span>
            </div>
          </div>

          <button onClick={handleTryAgain} className="primary-btn full-width">
            🔄 Try Another Quiz
          </button>
        </div>
      </div>
    );
  }

  // Active Quiz Screen
  const currentQuizQuestion = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <div className="practice-page">
      <div className="quiz-progress">
        <div className="progress-info">
          <span className="progress-text">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="progress-score">Score: {score}</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      <div className="quiz-container">
        <div className="question-card">
          <h2 className="question-text">{currentQuizQuestion.question}</h2>

          <div className="options-container">
            {currentQuizQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${selectedAnswer === index ? 'selected' : ''}`}
                onClick={() => handleAnswerClick(index)}
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="option-text">{option}</span>
              </button>
            ))}
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="quiz-actions">
            <button
              onClick={handleNextQuestion}
              className="primary-btn"
            >
              {isLastQuestion ? '✓ Finish Quiz' : 'Next Question →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}