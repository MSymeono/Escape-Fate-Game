import React, { useState } from 'react';
import Card from './Card';
import './playBoard.css';


const EffectModal = ({
  card,
  owner,
  context,
  onComplete,
}: {
  card: CardType;
  owner: 'Player 1' | 'Player 2';
  context: any;
  onComplete: (newState?: any) => void;
}) => {
  return (
    <div className="effect-modal">
      <h2>{card.Name} — {owner}</h2>
      <p>{card.Text}</p>
      {/* Example: You can render more interaction UI here */}
      <button onClick={() => onComplete()}>Done</button>
    </div>
  );
};


type CardType = {
  Name: string;
  Text: string;
  id: number;
  Quantity: number;
  Priority: number | null;
};
type PlayedCard = { id: number; owner: 'Player 1' | 'Player 2' };

type PlayBoardProps = {
  player1Deck: number[];
  player2Deck: number[];
  playZone1: PlayedCard[];
  playZone2: PlayedCard[];
  cardLibrary: CardType[];
  nextCards: () => void;
  discardPile: number[];
  phase: string;
  playInteraction: {card:Card; owner: 'Player 1' | 'Player 2'; context:any;};
};

const PlayBoard = ({
  player1Deck,
  player2Deck,
  playZone1,
  playZone2,
  cardLibrary,
  nextCards,
  playInteraction,
  discardPile,
  phase,
}: PlayBoardProps) => {
  const [showStack, setShowStack] = useState(false);

  const getCard = (id: number) => cardLibrary.find((card) => card.id === id);

  const renderCardStack = (stack: PlayedCard[]) => (
    <div className='card-stack'>
      {stack.length > 0 &&
        (() => {
          const id = stack[stack.length - 1].id;
          
          const card = getCard(id);
          return card ? (
            <div className='stacked-card' style={{ top: '0px', zIndex: 99 }}>
              <Card card={card} phase='play' showText />
            </div>
          ) : null;
        })()}
    </div>
  );

  return (
    <div className='play-board'>
      <h1>Play Phase</h1>
      <button onClick={nextCards}>Play Next Cards</button>
      <button onClick={() => setShowStack(true)}>View Stack</button>

      <div className='in-play-row'>
        <div className='player-zone'>
          <h2>Player 1</h2>
          {renderCardStack(playZone1)}
        </div>

        <div className='player-zone'>
          <h2>Player 2</h2>
          {renderCardStack(playZone2)}
        </div>
      </div>

      {showStack && (
        <div className='stack-overlay'>
          <div className='stack-content'>
            <h2>Player 1 Stack</h2>
            <div className='horizontal-stack'>
              {playZone1.map((cardObj, i) => {
                const card = cardLibrary.find((c) => c.id === cardObj.id);
                return card ? (
                  <Card
                    key={`${cardObj.id}-${i}`}
                    card={card}
                    phase='play'
                    owner={cardObj.owner}
                  />
                ) : null;
              })}
            </div>

            <h2>Player 2 Stack</h2>
            <div className='horizontal-stack'>
              {playZone2.map((cardObj, i) => {
                const card = cardLibrary.find((c) => c.id === cardObj.id);
                return card ? (
                  <Card
                    key={`${cardObj.id}-${i}`}
                    card={card}
                    phase='play'
                    owner={cardObj.owner}
                  />
                ) : null;
              })}
            </div>

            <button onClick={() => setShowStack(false)}>Close</button>
          </div>
        </div>
      )}
      {playInteraction && (
  <EffectModal
    card={playInteraction.card}
    owner={playInteraction.owner}
    context={playInteraction.context}
    onComplete={() => setPlayInteraction(null)}
  />
)}

    </div>
  );
};

export default PlayBoard;
