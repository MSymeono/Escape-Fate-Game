// DraftBoard.tsx
import React from 'react';
import Card from './Card';
// import './DraftBoard.css'; // Optional styling

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
};

const DraftBoard = ({
  activePlayer,
  deckArray,
  draftArray,
  cardLibrary,
  onCardClick,
  onShuffle,
  onDeal,
}: DraftBoardProps) => {
  return (
    <>
      <h1>Draft Phase</h1>
      <h2>{activePlayer}'s turn to draft</h2>
      <div className="buttons">
       {deckArray.length===24 && ( <div className="indivButton">
          <button onClick={onShuffle}>Shuffle</button>
        </div>)}
        {draftArray.length === 0 && (<div className="indivButton">
          <button onClick={onDeal}>Deal</button>
        </div>)}
      </div>

      <div className="card-grid">
        {draftArray.map((id, index) => {
          const card = cardLibrary.find(card => card.id === id);
          if (!card) return null;
          return (
            <Card
              key={`${id}-${index}`}
              card={card}
              zone="draft"
              onClick={() => onCardClick(card)}
            />
          );
        })}
      </div>
    </>
  );
};

export default DraftBoard;
