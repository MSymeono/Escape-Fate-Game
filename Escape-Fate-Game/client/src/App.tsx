import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import GamePage from './GamePage';

const LandingPage: React.FC = () => {
  const [name, setName] = useState('');
  const [lobbyCode, setLobbyCode] = useState('');
  const navigate = useNavigate();

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && lobbyCode) {
      navigate(`/game/${lobbyCode}`, { state: { name } });
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (name) {
      const newLobby = Math.random().toString(36).substring(2, 8).toUpperCase();
      navigate(`/game/${newLobby}`, { state: { name } });
    }
  };

  return (
    <div>
      <h1>Escape Fate</h1>
      <form onSubmit={handleJoin}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Lobby Code"
          value={lobbyCode}
          onChange={e => setLobbyCode(e.target.value.toUpperCase())}
        />
        <button type="submit" disabled={!name || !lobbyCode}>Join Lobby</button>
      </form>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button type="submit" disabled={!name}>Create Lobby</button>
      </form>
    </div>
  );
};

const GamePageWrapper: React.FC = () => {
  const { lobbyId } = useParams<{ lobbyId: string }>();
  const location = useLocation();
  const name = location.state?.name || '';
  
  if (!name) {
    return (
      <div>
        <h2>No name provided</h2>
        <button onClick={() => window.location.href = '/'}>Return to Home</button>
      </div>
    );
  }
  
  return <GamePage name={name} />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/game/:lobbyId" element={<GamePageWrapper />} />
      </Routes>
    </Router>
  );
};

export default App;
