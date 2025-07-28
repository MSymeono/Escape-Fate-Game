// Basic Express + WebSocket backend for managing lobbies
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
// Remove in-memory lobbies object
// const lobbies: Record<string, Lobby> = {}; 
// { lobbyId: { players: [socketId1, socketId2], state: {} } }
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);
    socket.on('createLobby', async (callback) => {
        const lobbyId = generateLobbyId();
        // Create lobby in DB
        const lobby = await prisma.lobby.create({
            data: {
                id: lobbyId,
                players: {
                    create: [{ name: `Player-${socket.id.substring(0, 5)}`, socketId: socket.id }],
                },
            },
            include: { players: true },
        });
        socket.join(lobbyId);
        callback({ lobbyId });
    });
    socket.on('joinLobby', async ({ lobbyId }, callback) => {
        const lobby = await prisma.lobby.findUnique({
            where: { id: lobbyId },
            include: { players: true },
        });
        if (lobby && lobby.players.length < 2) {
            // Add player to lobby
            await prisma.player.create({
                data: {
                    name: `Player-${socket.id.substring(0, 5)}`,
                    socketId: socket.id,
                    lobbyId: lobbyId,
                },
            });
            socket.join(lobbyId);
            const updatedLobby = await prisma.lobby.findUnique({
                where: { id: lobbyId },
                include: { players: true },
            });
            callback({ success: true });
            io.to(lobbyId).emit('playersUpdate', updatedLobby?.players.map((p) => p.name));
        }
        else {
            callback({ success: false, message: 'Lobby full or does not exist' });
        }
    });
    socket.on('sendGameState', ({ lobbyId, gameState }) => {
        if (lobbies[lobbyId]) {
            lobbies[lobbyId].state = gameState;
            socket.to(lobbyId).emit('receiveGameState', gameState);
        }
    });
    socket.on('disconnect', async () => {
        // Remove player from DB and clean up empty lobbies
        const player = await prisma.player.findUnique({ where: { socketId: socket.id } });
        if (player) {
            const lobbyId = player.lobbyId;
            await prisma.player.delete({ where: { socketId: socket.id } });
            const remainingPlayers = await prisma.player.findMany({ where: { lobbyId } });
            io.to(lobbyId).emit('playerDisconnected', socket.id);
            if (remainingPlayers.length === 0) {
                await prisma.lobby.delete({ where: { id: lobbyId } });
                await prisma.gameState.deleteMany({ where: { lobbyId } });
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
