import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from './socket';

interface Lobby {
  code: string;
  players: number;
}

interface LobbyPageProps {
  name: string;
  setName: (name: string) => void;
}

const LobbyPage: React.FC<LobbyPageProps> = ({ name, setName }) => {
  const [lobbies, setLobbies] = useState<Lobby[]>([]);
  const [joinCode, setJoinCode] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit('listLobbies');
    socket.on('lobbyList', (lobbies: Lobby[]) => setLobbies(lobbies));
    return () => {
      socket.off('lobbyList');
    };
  }, []);

  const handleCreate = () => {
    if (!name) return;
    socket.emit('createLobby', { name }, ({ lobbyId }: { lobbyId: string }) => {
      navigate(`/game/${lobbyId}`);
    });
  };

  const handleJoin = (code: string) => {
    if (!name) return;
    socket.emit('joinLobby', { lobbyId: code, name }, ({ success, lobbyId }: { success: boolean; lobbyId: string }) => {
      if (success) navigate(`/game/${lobbyId}`);
      // else show error
    });
  };

  return (
    <div>
      <h1>Escape Fate: Lobby</h1>
      <input
        placeholder="Enter your name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={handleCreate} disabled={!name}>Create Game</button>
      <div>
        <input
          placeholder="Enter lobby code"
          value={joinCode}
          onChange={e => setJoinCode(e.target.value)}
        />
        <button onClick={() => handleJoin(joinCode)} disabled={!name || !joinCode}>Join Game</button>
      </div>
      <h2>Open Lobbies</h2>
      <ul>
        {lobbies.map(lobby => (
          <li key={lobby.code}>
            {lobby.code} ({lobby.players} players)
            <button onClick={() => handleJoin(lobby.code)} disabled={!name}>Join</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LobbyPage; 