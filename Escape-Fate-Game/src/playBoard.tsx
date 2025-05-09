// PlayBoard.tsx
import React from 'react';
import Card from './Card';
// import './PlayBoard.css'; // Optional styling

type CardType = {
  Name: string;
  Text: string;
  id: number;
  Quantity: number;
  Priority: number | null;
};

type PlayBoardProps = {
  player1Deck: number[];
  player2Deck: number[];
  playZone1: number[];
  playZone2: number[];
  cardLibrary: CardType[];
  resolvePlayEffects: () => void;
};

const PlayBoard = ({
  player1Deck,
  player2Deck,
  playZone1,
  discardPile,
  playZone2,
  cardLibrary,
  resolvePlayEffects,
}: PlayBoardProps) => {
  const topCard = (id: number | undefined) =>
    cardLibrary.find(card => card.id === id);

  return (
    <div className="play-board">
      <h1>Play Phase</h1>
      <button onClick={resolvePlayEffects}>Resolve Effects</button>

      <div className="in-play-row">
        <div className="player-zone">
          <h3>Player 1</h3>
          {topCard(playZone1[playZone1.length - 1]) && (
            <Card card={topCard(playZone1[playZone1.length - 1])!} zone="play" />
          )}
        </div>

        <div className="player-zone">
          <h3>Player 2</h3>
          {topCard(playZone2[playZone2.length - 1]) && (
            <Card card={topCard(playZone2[playZone2.length - 1])!} zone="play" />
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayBoard;
