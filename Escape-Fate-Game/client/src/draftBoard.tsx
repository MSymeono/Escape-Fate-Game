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
  resourcefulDrafted: boolean;
  activePlayer: string;
  draftArray: number[];
  cardLibrary: CardType[];
  onCardClick: (card: CardType) => void;
  onShuffle: () => void;
  onDeal: () => void;
  phase: string;
  deckArray: number[];
};

const DraftBoard = ({
  resourcefulDrafted,
  activePlayer,
  deckArray,
  draftArray,
  cardLibrary,
  onCardClick,
  onShuffle,
  phase,
  onDeal,
}: DraftBoardProps) => {
  return (
    <>
      <h1>Draft Phase</h1>
        {resourcefulDrafted && <h2>Your opponent drafted Resourceful</h2>}
      <h2 className={activePlayer==='Player 1'? 'player1-turn': 'player2-turn'}>{activePlayer}'s turn to draft</h2>
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
    </>
  );
};

export default DraftBoard;
