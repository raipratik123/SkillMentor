import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Learn from './pages/Learn';
import Practice from './pages/Practice';
import VideoSummary from './pages/VideoSummary';
import Profile from './pages/Profile';
import MentorSession from './pages/MentorSession';

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/video-summary" element={<VideoSummary />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/mentor-session" element={<MentorSession />} />
      </Routes>
    </div>
  );
}

export default App;