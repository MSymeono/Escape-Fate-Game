// Basic Express + WebSocket backend for managing lobbies
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
type Lobby = {
  players: string[];
  state: any;
};

const lobbies: Record<string, Lobby> = {}; 

 // { lobbyId: { players: [socketId1, socketId2], state: {} } }

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('createLobby', (callback) => {
    const lobbyId = generateLobbyId();
    lobbies[lobbyId] = { players: [socket.id], state: {} };
    socket.join(lobbyId);
    callback({ lobbyId });
  });

  socket.on('joinLobby', ({ lobbyId }, callback) => {
    if (lobbies[lobbyId] && lobbies[lobbyId].players.length < 2) {
      lobbies[lobbyId].players.push(socket.id);
      socket.join(lobbyId);
      callback({ success: true });
      io.to(lobbyId).emit('playersUpdate', lobbies[lobbyId].players);
    } else {
      callback({ success: false, message: 'Lobby full or does not exist' });
    }
  });

  socket.on('sendGameState', ({ lobbyId, gameState }) => {
    if (lobbies[lobbyId]) {
      lobbies[lobbyId].state = gameState;
      socket.to(lobbyId).emit('receiveGameState', gameState);
    }
  });

  socket.on('disconnect', () => {
    for (const [lobbyId, lobby] of Object.entries(lobbies)) {
      if (lobby.players.includes(socket.id)) {
        lobby.players = lobby.players.filter((id) => id !== socket.id);
        io.to(lobbyId).emit('playerDisconnected', socket.id);
        if (lobby.players.length === 0) delete lobbies[lobbyId];
      }
    }
    console.log('Client disconnected:', socket.id);
  });
});

function generateLobbyId() {
  return Math.random().toString(36).substr(2, 6);
}

server.listen(3001, () => {
  console.log('Server listening on port 3001');
});
