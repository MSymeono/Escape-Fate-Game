// DraftBoard.tsx
import React from 'react';
import Card from './Card';
import './draftBoard.css';

type CardType = {
  Name: string;
  Text: string;
  id: number;
  Quantity: number;
  Priority: number | null;
};

type DraftBoardProps = {
  activePlayer: string;
  draftArray: number[];
  cardLibrary: CardType[];
  onCardClick: (card: CardType) => void;
  onShuffle: () => void;
  onDeal: () => void;
  phase: string;
  deckArray: number[];
  myPlayerId: string | null;
  resourcefulDrafted: null | 'Player 1' | 'Player 2';
};

const DraftBoard = ({
  activePlayer,
  deckArray,
  draftArray,
  cardLibrary,
  onCardClick,
  onShuffle,
  phase,
  onDeal,
  myPlayerId,
  resourcefulDrafted,
}: DraftBoardProps) => {
  return (
    <>
      <h1>Draft Phase</h1>
      {resourcefulDrafted && (
        <div className="resourceful-indicator">
          {resourcefulDrafted} drafted Resourceful!
        </div>
      )}
      <h2 className={activePlayer === 'Player 1' ? 'player1-turn' : 'player2-turn'}>{activePlayer}'s turn to draft</h2>
      <div className='buttons'>
        {deckArray.length === 24 && (
          <div className='indivButton'>
            <button onClick={onShuffle}>Shuffle</button>
          </div>
        )}
        {draftArray.length === 0 && (
          <div className='indivButton'>
            <button onClick={onDeal}>Deal</button>
          </div>
        )}
      </div>
      {myPlayerId === activePlayer ? (
        <div className='card-grid'>
          {draftArray.map((id, index) => {
            const card = cardLibrary.find((card) => card.id === id);
            if (!card) return null;
            return (
              <Card
                key={`${id}-${index}`}
                card={card}
                phase={phase}
                onClick={() => onCardClick(card)}
              />
            );
          })}
        </div>
      ) : (
        <div className='card-grid'>
          <p>Waiting for the other player to draft...</p>
        </div>
      )}
    </>
  );
};

export default DraftBoard;
