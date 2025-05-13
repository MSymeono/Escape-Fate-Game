import React, { useState } from 'react';
import Card from './Card';
import EffectModal from './effectModal';
import './playBoard.css';

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
  setplayer1Deck: React.Dispatch<React.SetStateAction<number[]>>;
  player2Deck: number[];
  setplayer2Deck: React.Dispatch<React.SetStateAction<number[]>>;
  playZone1: PlayedCard[];
  playZone2: PlayedCard[];
  cardLibrary: CardType[];
  nextCards: () => void;
  discardPile: number[];
  phase: string;
  playInteraction: {
    card: CardType;
    owner: 'Player 1' | 'Player 2';
    context: any;
  }[];
  setPlayInteraction: React.Dispatch<
    React.SetStateAction<
      {
        card: CardType;
        owner: 'Player 1' | 'Player 2';
        context: any;
      }[]
    >
  >;
};

const PlayBoard = ({
  player1Deck,
  player2Deck,
  setplayer1Deck,
  setplayer2Deck,
  playZone1,
  playZone2,
  cardLibrary,
  nextCards,
  discardPile,
  phase,
  playInteraction,
  setPlayInteraction,
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
                const card = getCard(cardObj.id);
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
                const card = getCard(cardObj.id);
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

      {playInteraction.length > 0 &&
        (console.log('Active interaction:', playInteraction[0]),
        (
          <EffectModal
            card={playInteraction[0].card}
            owner={playInteraction[0].owner}
            context={playInteraction[0].context}
            cardLibrary={cardLibrary}
            onComplete={(newOrder) => {
              setPlayInteraction((prev) => {
                const current = prev[0]; 
                const reorderedIds = newOrder?.map((c) => c.id) || [];

                if (reorderedIds.length > 0) {
                  if (current.owner === 'Player 1') {
                    setplayer1Deck((prev) => {
                      const rest = prev.slice(
                        0,
                        prev.length - reorderedIds.length
                      );
                      return [...rest, ...reorderedIds];
                    });
                  } else {
                    setplayer2Deck((prev) => {
                      const rest = prev.slice(
                        0,
                        prev.length - reorderedIds.length
                      );
                      return [...rest, ...reorderedIds];
                    });
                  }
                }

                console.log('Removing interaction for:', current.owner);
                return prev.slice(1);
              });
            }}
          />
        ))}
    </div>
  );
};

export default PlayBoard;
