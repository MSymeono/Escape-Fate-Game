import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { Sequelize, DataTypes, Model } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './prisma/dev.db',
  logging: false,
});

class Lobby extends Model {}
Lobby.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, { sequelize, modelName: 'Lobby' });

class Player extends Model {}
Player.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  socketId: {
    type: DataTypes.STRING,
    unique: true,
  },
  lobbyId: DataTypes.STRING,
}, { sequelize, modelName: 'Player' });

class GameState extends Model {}
GameState.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  state: DataTypes.JSON,
  lobbyId: {
    type: DataTypes.STRING,
    unique: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  gameLog: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
}, { sequelize, modelName: 'GameState' });

Lobby.hasMany(Player, { foreignKey: 'lobbyId' });
Player.belongsTo(Lobby, { foreignKey: 'lobbyId' });
Lobby.hasOne(GameState, { foreignKey: 'lobbyId' });
GameState.belongsTo(Lobby, { foreignKey: 'lobbyId' });

await sequelize.sync();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const draftStates = {};

io.on('connection', (socket) => {
  socket.on('createLobby', async ({ name }, callback) => {
    const lobbyId = generateLobbyId();
    await Lobby.create({ id: lobbyId });
    await Player.create({ name, socketId: socket.id, lobbyId });
    socket.join(lobbyId);
    socket.emit('assignPlayer', 'Player 1');
    if (typeof callback === 'function') callback({ lobbyId });
    const players = await Player.findAll({ where: { lobbyId } });
    const uniquePlayerNames = [...new Set(players.map((p) => p.name))];
    io.to(lobbyId).emit('playersUpdate', uniquePlayerNames);
  });

  socket.on('joinLobby', async ({ lobbyId, name }, callback) => {
    let lobby = await Lobby.findByPk(lobbyId);
    let players = await Player.findAll({ where: { lobbyId } });
    if (!lobby) {
      try {
        lobby = await Lobby.create({ id: lobbyId });
      } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
          lobby = await Lobby.findByPk(lobbyId);
        } else {
          throw error;
        }
      }
    }
    const existingPlayer = players.find(p => p.socketId === socket.id);
    const existingPlayerByName = players.find(p => p.name === name);
    if (existingPlayer) {
      socket.join(lobbyId);
      socket.emit('assignPlayer', existingPlayer.name === players[0].name ? 'Player 1' : 'Player 2');
      if (typeof callback === 'function') callback({ success: true });
      return;
    }
    if (existingPlayerByName) {
      socket.join(lobbyId);
      socket.emit('assignPlayer', existingPlayerByName.name === players[0].name ? 'Player 1' : 'Player 2');
      if (typeof callback === 'function') callback({ success: true });
      return;
    }
    if (players.length < 2) {
      try {
        await Player.destroy({ where: { lobbyId, name } });
        await Player.create({ name, socketId: socket.id, lobbyId });
        socket.join(lobbyId);
        const playerNumber = players.length === 0 ? 'Player 1' : 'Player 2';
        socket.emit('assignPlayer', playerNumber);
        if (typeof callback === 'function') callback({ success: true });
        const updatedPlayers = await Player.findAll({ where: { lobbyId } });
        const uniquePlayerNames = [...new Set(updatedPlayers.map((p) => p.name))];
        io.to(lobbyId).emit('playersUpdate', uniquePlayerNames);
      } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
          if (typeof callback === 'function') callback({ success: true });
        } else {
          if (typeof callback === 'function') callback({ success: false, message: 'Error joining lobby' });
        }
      }
    } else {
      if (typeof callback === 'function') callback({ success: false, message: 'Lobby full' });
    }
  });

  socket.on('sendGameState', async ({ lobbyId, gameState }) => {
    await GameState.upsert({ id: socket.id, state: gameState, lobbyId });
    socket.to(lobbyId).emit('receiveGameState', gameState);
  });

  socket.on('draftStateUpdate', ({ lobbyId, draftState }) => {
    draftStates[lobbyId] = draftState;
    io.to(lobbyId).emit('draftStateSync', draftState);
  });

  socket.on('requestDraftState', ({ lobbyId }) => {
    if (draftStates[lobbyId]) {
      socket.emit('draftStateSync', draftStates[lobbyId]);
    }
  });

  socket.on('gameLogUpdate', async ({ lobbyId, gameLog }) => {
    let gameState = await GameState.findOne({ where: { lobbyId } });
    if (gameState) {
      gameState.gameLog = gameLog;
      await gameState.save();
    } else {
      await GameState.create({ id: socket.id, lobbyId, gameLog });
    }
    io.to(lobbyId).emit('gameLogSync', gameLog);
  });

  socket.on('playStateUpdate', async ({ lobbyId, playState }) => {
    let gameState = await GameState.findOne({ where: { lobbyId } });
    if (gameState) {
      const state = gameState.state || {};
      state.playState = playState;
      gameState.state = state;
      await gameState.save();
    } else {
      await GameState.create({ id: socket.id, lobbyId, state: { playState } });
    }
    io.to(lobbyId).emit('playStateSync', playState);
  });

  socket.on('requestPlayState', async ({ lobbyId }) => {
    let gameState = await GameState.findOne({ where: { lobbyId } });
    if (gameState && gameState.state && gameState.state.playState) {
      const playState = gameState.state.playState;
      socket.emit('playStateSync', playState);
    }
  });

  socket.on('phaseUpdate', async ({ lobbyId, phase }) => {
    let gameState = await GameState.findOne({ where: { lobbyId } });
    if (gameState) {
      const state = gameState.state || {};
      state.phase = phase;
      gameState.state = state;
      await gameState.save();
    } else {
      await GameState.create({ id: socket.id, lobbyId, state: { phase } });
    }
    io.to(lobbyId).emit('phaseSync', phase);
  });

  socket.on('playAction', async ({ lobbyId, action }) => {
    let gameState = await GameState.findOne({ where: { lobbyId } });
    let playState = (gameState && gameState.state && gameState.state.playState) ? gameState.state.playState : {};
    playState = { ...playState, ...action };
    if (gameState) {
      const state = gameState.state || {};
      state.playState = playState;
      gameState.state = state;
      await gameState.save();
    } else {
      const lobby = await Lobby.findByPk(lobbyId);
      if (lobby) {
        await GameState.create({ id: socket.id, lobbyId, state: { playState } });
      }
    }
    io.to(lobbyId).emit('playStateSync', playState);
  });

  socket.on('gameAction', async ({ lobbyId, action, payload }) => {
    let gameState = await GameState.findOne({ where: { lobbyId } });
    if (!gameState) return;
    const state = gameState.state || {};
    if (action === 'startPhase') {
      state.phase = payload.phase;
      if (payload.phase === 'play') {
        if (!state.playState) state.playState = {};
        if (!Array.isArray(state.playState.player1Deck)) state.playState.player1Deck = [];
        if (!Array.isArray(state.playState.player2Deck)) state.playState.player2Deck = [];
        const hasWeave1 = state.playState.player1Deck.some(card => card.id === 20);
        const hasMeasure1 = state.playState.player1Deck.some(card => card.id === 21);
        if (!hasWeave1) {
          state.playState.player1Deck.push({
            id: 20,
            Owner: 'Player 1',
            Name: 'Weave',
            Priority: 2,
            Multiplier: 1,
            Text: 'Look at the top 3 cards of your deck and put them back in any order.'
          });
        }
        if (!hasMeasure1) {
          state.playState.player1Deck.push({
            id: 21,
            Owner: 'Player 1',
            Name: 'Measure',
            Priority: 8,
            Multiplier: 1,
            Text: 'Count the remaining cards in both decks. If your opponent has more, discard the top card of their deck. It has no effect.'
          });
        }
        const hasWeave2 = state.playState.player2Deck.some(card => card.id === 20);
        const hasMeasure2 = state.playState.player2Deck.some(card => card.id === 21);
        if (!hasWeave2) {
          state.playState.player2Deck.push({
            id: 20,
            Owner: 'Player 2',
            Name: 'Weave',
            Priority: 2,
            Multiplier: 1,
            Text: 'Look at the top 3 cards of your deck and put them back in any order.'
          });
        }
        if (!hasMeasure2) {
          state.playState.player2Deck.push({
            id: 21,
            Owner: 'Player 2',
            Name: 'Measure',
            Priority: 8,
            Multiplier: 1,
            Text: 'Count the remaining cards in both decks. If your opponent has more, discard the top card of their deck. It has no effect.'
          });
        }
      }
    }
    if (action === 'draftCard') {
      if (!state.draftState) state.draftState = {};
      if (!Array.isArray(state.draftState.draftArray)) state.draftState.draftArray = [];
      if (!Array.isArray(state.playState.player1Deck)) state.playState.player1Deck = [];
      if (!Array.isArray(state.playState.player2Deck)) state.playState.player2Deck = [];
      const cardId = payload.cardId;
      const player = payload.player;
      const idx = state.draftState.draftArray.indexOf(cardId);
      if (idx !== -1) state.draftState.draftArray.splice(idx, 1);
      if (player === 'Player 1') {
        state.playState.player1Deck.push(payload.card);
      } else if (player === 'Player 2') {
        state.playState.player2Deck.push(payload.card);
      }
    }
    if (action === 'playCard') {
      if (!state.playState) state.playState = {};
      if (!Array.isArray(state.playState.player1Deck)) state.playState.player1Deck = [];
      if (!Array.isArray(state.playState.player2Deck)) state.playState.player2Deck = [];
      if (!Array.isArray(state.playState.playZone1)) state.playState.playZone1 = [];
      if (!Array.isArray(state.playState.playZone2)) state.playState.playZone2 = [];
      if (payload.player === 'Player 1') {
        const card = state.playState.player1Deck.pop();
        if (card) state.playState.playZone1.push(card);
      } else if (payload.player === 'Player 2') {
        const card = state.playState.player2Deck.pop();
        if (card) state.playState.playZone2.push(card);
      }
      const p1 = state.playState.playZone1[state.playState.playZone1.length - 1];
      const p2 = state.playState.playZone2[state.playState.playZone2.length - 1];
      if (p1 && p2) {
        const cards = [p1, p2];
        cards.sort((a, b) => (a.Priority ?? 99) - (b.Priority ?? 99));
        const first = cards[0];
        const second = cards[1];
        if (first.id === 20 || first.id === 5) {
          state.modalPending = { card: first, player: first.Owner, context: {} };
          io.to(lobbyId).emit('playStateSync', state.playState || {});
          return;
        }
        state.modalPending = null;
        first.resolved = true;
        second.resolved = true;
      }
    }
    if (action === 'resolveModal') {
      if (!state.modalPending) return;
      const { card, player } = state.modalPending;
      if (card.id === 20) {
        if (player === 'Player 1') {
          state.playState.player1Deck = payload.newDeck;
          state.gameLog = (state.gameLog || []).concat([`${player} wove the top ${payload.newDeck.length} cards of their deck.`]);
        } else {
          state.playState.player2Deck = payload.newDeck;
          state.gameLog = (state.gameLog || []).concat([`${player} wove the top ${payload.newDeck.length} cards of their deck.`]);
        }
      }
      if (card.id === 5) {
        if (player === 'Player 1') {
          state.playState.player1Deck.push(payload.selectedCard);
          state.gameLog = (state.gameLog || []).concat([`Indecisive put a card on top of ${player}'s deck.`]);
        } else {
          state.playState.player2Deck.push(payload.selectedCard);
          state.gameLog = (state.gameLog || []).concat([`Indecisive put a card on top of ${player}'s deck.`]);
        }
        state.discardPile = (state.discardPile || []).filter(id => id !== payload.selectedCard.id);
      }
      state.modalPending = null;
      const p1 = state.playState.playZone1[state.playState.playZone1.length - 1];
      const p2 = state.playState.playZone2[state.playState.playZone2.length - 1];
      if (p1 && p2) {
        const cards = [p1, p2];
        cards.sort((a, b) => (a.Priority ?? 99) - (b.Priority ?? 99));
        const first = cards[0];
        const second = cards[1];
        if (second.id === 20 || second.id === 5) {
          state.modalPending = { card: second, player: second.Owner, context: {} };
          io.to(lobbyId).emit('playStateSync', state.playState || {});
          return;
        } else if (effectHandlers[second.id]) {
          effectHandlers[second.id](second, second.Owner, state);
        }
      }
    }
    if (action === 'playNextCards') {
      if (!Array.isArray(state.playState.player1Deck) && state.playState.player1Deck) {
        state.playState.player1Deck = state.playState.player1Deck;
      } else if (!Array.isArray(state.playState.player1Deck)) {
        state.playState.player1Deck = [];
      }
      if (!Array.isArray(state.playState.player2Deck) && state.playState.player2Deck) {
        state.playState.player2Deck = state.playState.player2Deck;
      } else if (!Array.isArray(state.playState.player2Deck)) {
        state.playState.player2Deck = [];
      }
      if (!Array.isArray(state.playState.playZone1) && state.playState.playZone1) {
        state.playState.playZone1 = state.playState.playZone1;
      } else if (!Array.isArray(state.playState.playZone1)) {
        state.playState.playZone1 = [];
      }
      if (!Array.isArray(state.playState.playZone2) && state.playState.playZone2) {
        state.playState.playZone2 = state.playState.playZone2;
      } else if (!Array.isArray(state.playState.playZone2)) {
        state.playState.playZone2 = [];
      }
      if (!state.skippedPlayers) state.skippedPlayers = [];
      if (!state.doubledPlayers) state.doubledPlayers = [];
      if (!state.quadrupledPlayers) state.quadrupledPlayers = [];
      let played = [];
      let p1Card = null;
      let p2Card = null;
      if (!state.skippedPlayers.includes('Player 1')) {
        p1Card = state.playState.player1Deck.pop();
        if (p1Card) {
          state.playState.playZone1.push(p1Card);
          played.push({ card: p1Card, Owner: 'Player 1' });
        }
      }
      if (!state.skippedPlayers.includes('Player 2')) {
        p2Card = state.playState.player2Deck.pop();
        if (p2Card) {
          state.playState.playZone2.push(p2Card);
          played.push({ card: p2Card, Owner: 'Player 2' });
        }
      }
      if (played.length === 0) {
        io.to(lobbyId).emit('playStateSync', state.playState || {});
        return;
      }
      let sorted = played
        .map(({ card, Owner }) => ({ card, Owner }))
        .sort((a, b) => (a.card.Priority ?? 99) - (b.card.Priority ?? 99));
      for (let i = 0; i < sorted.length; i++) {
        const { card, Owner } = sorted[i];
        let timesToRun = 1;
        if (state.doubledPlayers.includes(Owner)) timesToRun = 2;
        if (state.quadrupledPlayers.includes(Owner)) timesToRun = 4;
        for (let t = 0; t < timesToRun; t++) {
          if (card.id === 20 || card.id === 5) {
            state.modalPending = { card: card, player: Owner, context: {} };
            io.to(lobbyId).emit('playStateSync', state.playState || {});
            return;
          }
          card.resolved = true;
          if (effectHandlers[card.id]) effectHandlers[card.id](card, Owner, state);
          if (card.id === 22) {
            state.gameLog = (state.gameLog || []).concat([`${Owner} has lost the game.`]);
            state.loser = Owner;
            io.to(lobbyId).emit('playStateSync', state.playState || {});
            return;
          }
          if (card.id === 12) {
            for (let j = 0; j < 2; j++) {
              if (Owner === 'Player 1') {
                const extra = state.playState.player1Deck.pop();
                if (extra) {
                  state.playState.playZone1.push(extra);
                  extra.resolved = true;
                }
              } else if (Owner === 'Player 2') {
                const extra = state.playState.player2Deck.pop();
                if (extra) {
                  state.playState.playZone2.push(extra);
                  extra.resolved = true;
                }
              }
            }
          }
        }
        if (state.doubledPlayers.includes(Owner)) {
          state.doubledPlayers = state.doubledPlayers.filter((p) => p !== Owner);
        }
        if (state.quadrupledPlayers.includes(Owner)) {
          state.quadrupledPlayers = state.quadrupledPlayers.filter((p) => p !== Owner);
        }
        if (state.skippedPlayers.includes(Owner)) {
          state.skippedPlayers = state.skippedPlayers.filter((p) => p !== Owner);
        }
        io.to(lobbyId).emit('playStateSync', state.playState || {});
      }
    }
    gameState.state = state;
    await gameState.save();
    io.to(lobbyId).emit('playStateSync', state.playState || {});
  });

  socket.on('disconnect', async () => {
    const player = await Player.findOne({ where: { socketId: socket.id } });
    if (player) {
      const lobbyId = player.lobbyId;
      await Player.destroy({ where: { socketId: socket.id } });
      const remainingPlayers = await Player.findAll({ where: { lobbyId } });
      const uniquePlayerNames = [...new Set(remainingPlayers.map((p) => p.name))];
      io.to(lobbyId).emit('playersUpdate', uniquePlayerNames);
      if (remainingPlayers.length === 0) {
        await Lobby.destroy({ where: { id: lobbyId } });
        await GameState.destroy({ where: { lobbyId } });
      }
    }
  });
});

function generateLobbyId() {
  return Math.random().toString(36).substr(2, 6);
}

const effectHandlers = {
  1: (card, Owner, state) => {
    if (state.negatedPlayers && state.negatedPlayers.includes(Owner)) {
      state.negatedPlayers = state.negatedPlayers.filter(p => p !== Owner);
      return;
    }
    if (!state.playState) return;
    const p1Deck = [...state.playState.player1Deck];
    const p2Deck = [...state.playState.player2Deck];
    const p1Second = p1Deck[1];
    const p2Second = p2Deck[1];
    let message = 'Chaotic moved a card to the top of the deck for ';
    if (p1Second) {
      p1Deck.splice(1, 1);
      p1Deck.push(p1Second);
      message += 'Player 1';
    }
    if (p2Second) {
      p2Deck.splice(1, 1);
      p2Deck.push(p2Second);
      if (p1Second) {
        message += ' and Player 2';
      } else {
        message += 'Player 2';
      }
      message += '.';
    }
    state.playState.player1Deck = p1Deck;
    state.playState.player2Deck = p2Deck;
    if (p1Second || p2Second) {
      state.gameLog = (state.gameLog || []).concat([message]);
    }
  },
  2: (card, Owner, state) => {
    if (state.negatedPlayers && state.negatedPlayers.includes(Owner)) {
      state.negatedPlayers = state.negatedPlayers.filter(p => p !== Owner);
      return;
    }
    if (!state.playState) return;
    const playZone1 = [...state.playState.playZone1];
    const playZone2 = [...state.playState.playZone2];
    if (Owner === 'Player 1') {
      let index = playZone2.length - 2;
      for (let i = 0; i < playZone2.length - 1; i++) {
        if (playZone2[i].Name === state.cardsPlayedLastTurn?.[1]?.Name) {
          index = i;
          break;
        }
      }
      if (index < 0) return;
      const stolen = playZone2[index];
      stolen.Owner = Owner;
      state.playState.player1Deck.push(stolen);
      state.playState.playZone2 = playZone2.filter((_, i) => i !== index);
      state.gameLog = (state.gameLog || []).concat([`${Owner} stole Player 2's ${stolen.Name} using Covetous.`]);
    }
    if (Owner === 'Player 2') {
      let index = playZone1.length - 2;
      for (let i = 0; i < playZone1.length - 1; i++) {
        if (playZone1[i].Name === state.cardsPlayedLastTurn?.[0]?.Name) {
          index = i;
          break;
        }
      }
      if (index < 0) return;
      const stolen = playZone1[index];
      stolen.Owner = Owner;
      state.playState.player2Deck.push(stolen);
      state.playState.playZone1 = playZone1.filter((_, i) => i !== index);
      state.gameLog = (state.gameLog || []).concat([`${Owner} stole Player 1's ${stolen.Name} using Covetous.`]);
    }
  },
  3: (card, Owner, state) => {
    if (state.negatedPlayers && state.negatedPlayers.includes(Owner)) {
      state.negatedPlayers = state.negatedPlayers.filter(p => p !== Owner);
      return;
    }
    if (!state.playState) return;
    const p1Deck = [...state.playState.player1Deck];
    const p2Deck = [...state.playState.player2Deck];
    const top1 = p1Deck[p1Deck.length - 1];
    const top2 = p2Deck[p2Deck.length - 1];
    if (!top1 && !top2) return;
    if (!top2 && top1) {
      top1.Owner = 'Player 2';
      p2Deck.push(top1);
      p1Deck.pop();
      state.gameLog = (state.gameLog || []).concat([`${Owner}'s deceitful moved Player 1's top card to the top of Player 2's deck.`]);
    } else if (!top1 && top2) {
      top2.Owner = 'Player 1';
      p1Deck.push(top2);
      p2Deck.pop();
      state.gameLog = (state.gameLog || []).concat([`${Owner}'s deceitful moved Player 2's top card to the top of Player 1's deck.`]);
    } else {
      top1.Owner = 'Player 2';
      top2.Owner = 'Player 1';
      p2Deck[p2Deck.length - 1] = top1;
      p1Deck[p1Deck.length - 1] = top2;
      state.gameLog = (state.gameLog || []).concat([`${Owner}'s deceitful swapped the top cards of each player's deck`]);
    }
    state.playState.player1Deck = p1Deck;
    state.playState.player2Deck = p2Deck;
  },
  4: (card, Owner, state) => {
    if (state.negatedPlayers && state.negatedPlayers.includes(Owner)) {
      state.negatedPlayers = state.negatedPlayers.filter(p => p !== Owner);
      return;
    }
    if (!state.playState) return;
    const deck = Owner === 'Player 1' ? [...state.playState.player1Deck] : [...state.playState.player2Deck];
    const random = Math.ceil(Math.random() * 2);
    const index = random === 2 && deck.length >= 2 ? deck.length - 2 : deck.length - 1;
    const cardToPlay = deck[index];
    if (Owner === 'Player 1') {
      deck.splice(index, 1);
      state.playState.player1Deck = deck;
      state.playState.playZone1.push(cardToPlay);
    } else {
      deck.splice(index, 1);
      state.playState.player2Deck = deck;
      state.playState.playZone2.push(cardToPlay);
    }
    state.gameLog = (state.gameLog || []).concat([`${Owner} played ${cardToPlay.Name} at random from the top 2 cards of their deck.`]);
  },
  5: (card, Owner, state) => {
    if (state.negatedPlayers && state.negatedPlayers.includes(Owner)) {
      state.negatedPlayers = state.negatedPlayers.filter(p => p !== Owner);
      return;
    }
    state.modalPending = { card, player: Owner, context: { discardIds: state.discardPile } };
  },
  6: (card, Owner, state) => {
    if (state.negatedPlayers && state.negatedPlayers.includes(Owner)) {
      state.negatedPlayers = state.negatedPlayers.filter(p => p !== Owner);
      return;
    }
    const target = Owner === 'Player 1' ? 'Player 2' : 'Player 1';
    if (!state.negatedPlayers) state.negatedPlayers = [];
    if (!state.negatedPlayers.includes(target)) state.negatedPlayers.push(target);
    state.gameLog = (state.gameLog || []).concat([` ${Owner}'s Irreverent negated ${target}'s ${card.Name}.`]);
  },
  7: (card, Owner, state) => {
    if (state.negatedPlayers && state.negatedPlayers.includes(Owner)) {
      state.negatedPlayers = state.negatedPlayers.filter(p => p !== Owner);
      return;
    }
    if (!state.negatedPlayers) state.negatedPlayers = [];
    if (!state.negatedPlayers.includes(Owner)) state.negatedPlayers.push(Owner);
    state.gameLog = (state.gameLog || []).concat([`${Owner}'s next card will have no effect.`]);
  },
  8: (card, Owner, state) => {
    if (state.negatedPlayers && state.negatedPlayers.includes(Owner)) {
      state.negatedPlayers = state.negatedPlayers.filter(p => p !== Owner);
      return;
    }
    const p1Deck = [...state.playState.player1Deck];
    const p2Deck = [...state.playState.player2Deck];
    if (p1Deck.length > 0) {
      state.discardPile = state.discardPile || [];
      state.discardPile.push(p1Deck[p1Deck.length - 1].id);
      p1Deck.pop();
    }
    if (p2Deck.length > 0) {
      state.discardPile = state.discardPile || [];
      state.discardPile.push(p2Deck[p2Deck.length - 1].id);
      p2Deck.pop();
    }
    state.playState.player1Deck = p1Deck;
    state.playState.player2Deck = p2Deck;
    state.gameLog = (state.gameLog || []).concat([`Hasty discarded the top card of each player's deck.`]);
  },
  9: (card, Owner, state) => {
    if (state.negatedPlayers && state.negatedPlayers.includes(Owner)) {
      state.negatedPlayers = state.negatedPlayers.filter(p => p !== Owner);
      return;
    }
    const playZone = Owner === 'Player 1' ? state.playState.playZone1 : state.playState.playZone2;
    let cardToTrigger;
    for (let i = playZone.length - 1; i >= 0; i--) {
      if (playZone[i].Name === 'Nostalgic') {
        cardToTrigger = playZone[i - 1];
        break;
      }
    }
    if (!cardToTrigger) return;
    if (cardToTrigger.id === 16) {
      if (!state.quadrupledPlayers) state.quadrupledPlayers = [];
      if (!state.quadrupledPlayers.includes(Owner)) state.quadrupledPlayers.push(Owner);
    }
    if (effectHandlers[cardToTrigger.id]) effectHandlers[cardToTrigger.id](cardToTrigger, Owner, state);
    state.gameLog = (state.gameLog || []).concat([`${Owner} replayed ${cardToTrigger.Name} using Nostalgic.`]);
  },
  10: (card, Owner, state) => {
    if (state.negatedPlayers && state.negatedPlayers.includes(Owner)) {
      state.negatedPlayers = state.negatedPlayers.filter(p => p !== Owner);
      return;
    }
  },
  11: (card, Owner, state) => {
    if (state.negatedPlayers && state.negatedPlayers.includes(Owner)) {
      state.negatedPlayers = state.negatedPlayers.filter(p => p !== Owner);
      return;
    }
    const target = Owner === 'Player 1' ? 'Player 2' : 'Player 1';
    const targetDeck = target === 'Player 1' ? state.playState.player1Deck : state.playState.player2Deck;
    const targetZone = target === 'Player 1' ? state.playState.playZone1 : state.playState.playZone2;
    const top = targetDeck[targetDeck.length - 1];
    if (top) {
      top.Owner = Owner;
      targetZone.push(top);
      targetDeck.pop();
      state.gameLog = (state.gameLog || []).concat([`${Owner} plundered ${target}'s ${top.Name}`]);
    }
  },
  12: (card, Owner, state) => {
    if (state.negatedPlayers && state.negatedPlayers.includes(Owner)) {
      state.negatedPlayers = state.negatedPlayers.filter(p => p !== Owner);
      return;
    }
    const deck = Owner === 'Player 1' ? state.playState.player1Deck : state.playState.player2Deck;
    const playZone = Owner === 'Player 1' ? state.playState.playZone1 : state.playState.playZone2;
    const topTwo = [...deck].slice(-2);
    topTwo.reverse().forEach((c) => {
      playZone.push(c);
      deck.pop();
      if (effectHandlers[c.id]) effectHandlers[c.id](c, Owner, state);
      state.gameLog = (state.gameLog || []).concat([`${Owner} played ${c.Name} using Powerful.`]);
    });
  },
  13: (card, Owner, state) => {
    if (state.negatedPlayers && state.negatedPlayers.includes(Owner)) {
      state.negatedPlayers = state.negatedPlayers.filter(p => p !== Owner);
      return;
    }
    const target = Owner === 'Player 1' ? 'Player 2' : 'Player 1';
    if (!state.skippedPlayers) state.skippedPlayers = [];
    if (!state.skippedPlayers.includes(target)) state.skippedPlayers.push(target);
    state.gameLog = (state.gameLog || []).concat([`${Owner} skipped ${target}'s next turn.`]);
  },
  14: (card, Owner, state) => {
    if (state.negatedPlayers && state.negatedPlayers.includes(Owner)) {
      state.negatedPlayers = state.negatedPlayers.filter(p => p !== Owner);
      return;
    }
    const target = Owner === 'Player 1' ? 'Player 2' : 'Player 1';
    const targetDeck = target === 'Player 1' ? state.playState.player1Deck : state.playState.player2Deck;
    const topCard = targetDeck[targetDeck.length - 1];
    if (topCard) {
      if (target === 'Player 1') {
        state.playState.playZone1.push(topCard);
        targetDeck.pop();
      } else {
        state.playState.playZone2.push(topCard);
        targetDeck.pop();
      }
      state.gameLog = (state.gameLog || []).concat([`${Owner} forced ${target} to play ${topCard.Name} using Reckless.`]);
    }
  },
  15: (card, Owner, state) => {
    if (state.negatedPlayers && state.negatedPlayers.includes(Owner)) {
      state.negatedPlayers = state.negatedPlayers.filter(p => p !== Owner);
      return;
    }
  },
  16: (card, Owner, state) => {
    if (state.negatedPlayers && state.negatedPlayers.includes(Owner)) {
      state.negatedPlayers = state.negatedPlayers.filter(p => p !== Owner);
      return;
    }
    if (!state.doubledPlayers) state.doubledPlayers = [];
    if (!state.doubledPlayers.includes(Owner)) state.doubledPlayers.push(Owner);
    state.gameLog = (state.gameLog || []).concat([`${Owner}'s next card will be played twice.`]);
  },
  17: (card, Owner, state) => {
    if (state.negatedPlayers && state.negatedPlayers.includes(Owner)) {
      state.negatedPlayers = state.negatedPlayers.filter(p => p !== Owner);
      return;
    }
    if (!state.skippedPlayers) state.skippedPlayers = [];
    if (!state.skippedPlayers.includes(Owner)) state.skippedPlayers.push(Owner);
    state.gameLog = (state.gameLog || []).concat([`${Owner} skipped their next turn.`]);
  },
  18: (card, Owner, state) => {
    if (state.negatedPlayers && state.negatedPlayers.includes(Owner)) {
      state.negatedPlayers = state.negatedPlayers.filter(p => p !== Owner);
      return;
    }
    if (Owner === 'Player 1') {
      const toReturn = state.playState.playZone1.filter((c) => c.id === 10);
      state.playState.player1Deck.push(...toReturn);
      state.playState.playZone1 = state.playState.playZone1.filter((c) => c.id !== 10);
      state.gameLog = (state.gameLog || []).concat([`${Owner} put ${toReturn.length} Patient cards on top of their deck.`]);
    }
    if (Owner === 'Player 2') {
      const toReturn = state.playState.playZone2.filter((c) => c.id === 10);
      state.playState.player2Deck.push(...toReturn);
      state.playState.playZone2 = state.playState.playZone2.filter((c) => c.id !== 10);
      state.gameLog = (state.gameLog || []).concat([`${Owner} put ${toReturn.length} Patient cards on top of their deck.`]);
    }
  },
  19: (card, Owner, state) => {
    if (state.negatedPlayers && state.negatedPlayers.includes(Owner)) {
      state.negatedPlayers = state.negatedPlayers.filter(p => p !== Owner);
      return;
    }
    if (Owner === 'Player 1') {
      if (state.playState.playZone1.length > state.playState.playZone2.length) {
        state.discardPile = state.discardPile || [];
        state.discardPile.push(state.playState.player2Deck[state.playState.player2Deck.length - 1].id);
        state.playState.player2Deck.pop();
        state.gameLog = (state.gameLog || []).concat([`Player 1 discarded the top card of Player 2's deck using Wisened.`]);
      }
    }
    if (Owner === 'Player 2') {
      if (state.playState.playZone2.length > state.playState.playZone1.length) {
        state.discardPile = state.discardPile || [];
        state.discardPile.push(state.playState.player1Deck[state.playState.player1Deck.length - 1].id);
        state.playState.player1Deck.pop();
        state.gameLog = (state.gameLog || []).concat([`Player 2 discarded the top card of Player 1's deck using Wisened.`]);
      }
    }
  },
  20: (card, Owner, state) => {
    if (state.negatedPlayers && state.negatedPlayers.includes(Owner)) {
      state.negatedPlayers = state.negatedPlayers.filter(p => p !== Owner);
      return;
    }
    state.modalPending = { card, player: Owner, context: { topThreeIds: Owner === 'Player 1' ? state.playState.player1Deck.slice(-3) : state.playState.player2Deck.slice(-3) } };
  },
  21: (card, Owner, state) => {
    if (state.negatedPlayers && state.negatedPlayers.includes(Owner)) {
      state.negatedPlayers = state.negatedPlayers.filter(p => p !== Owner);
      return;
    }
    if (Owner === 'Player 1') {
      if (state.playState.player1Deck.length < state.playState.player2Deck.length) {
        state.discardPile = state.discardPile || [];
        state.discardPile.push(state.playState.player2Deck[state.playState.player2Deck.length - 1].id);
        state.playState.player2Deck.pop();
        state.gameLog = (state.gameLog || []).concat([`Player 1 discarded the top card of Player 2's deck.`]);
      }
    }
    if (Owner === 'Player 2') {
      if (state.playState.player2Deck.length < state.playState.player1Deck.length) {
        state.discardPile = state.discardPile || [];
        state.discardPile.push(state.playState.player1Deck[state.playState.player1Deck.length - 1].id);
        state.playState.player1Deck.pop();
        state.gameLog = (state.gameLog || []).concat([`Player 2 discarded the top card of Player 1's deck.`]);
      }
    }
  },
  22: (card, Owner, state) => {
    if (state.negatedPlayers && state.negatedPlayers.includes(Owner)) {
      state.negatedPlayers = state.negatedPlayers.filter(p => p !== Owner);
      return;
    }
    state.gameLog = (state.gameLog || []).concat([`${Owner} has lost the game.`]);
  }
};

server.listen(3001, () => {
  console.log('Server listening on port 3001');
});
