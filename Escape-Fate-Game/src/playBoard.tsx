import React, { useState } from 'react';
import Card from './Card';
import EffectModal from './effectModal';
import './playBoard.css';

type EffectHandler = (
  card: Card,
  owner: 'Player 1' | 'Player 2',
  negatedPlayers: Set<'Player 1' | 'Player 2'>
) => void;

type Card = {
  Name: string;
  Text: string;
  id: number;
  Owner?: 'Player 1' | 'Player 2';
  Quantity?: number;
  Priority: number | null;
  Multiplier?: number;
};

type PlayBoardProps = {
  player1Deck: number[];
  setplayer1Deck: React.Dispatch<React.SetStateAction<number[]>>;
  player2Deck: number[];
  setplayer2Deck: React.Dispatch<React.SetStateAction<number[]>>;
  playZone1: Card[];
  playZone2: Card[];
  cardLibrary: Card[];
  negatedPlayers: Set<'Player 1' | 'Player 2'>;
  effectHandlers: {
    [key: number]: EffectHandler;
  };
  nextCards: () => void;
  discardPile: number[];
  phase: string;
  playInteraction: {
    card: Card;
    owner: 'Player 1' | 'Player 2';
    context: any;
  }[];
  setPlayInteraction: React.Dispatch<
    React.SetStateAction<
      {
        card: Card;
        owner: 'Player 1' | 'Player 2';
        context: any;
      }[]
    >
  >;
  onComplete: (result?: any) => void;
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
  effectHandlers,
  playInteraction,
  onComplete,
  negatedPlayers,
  setPlayInteraction,
}: PlayBoardProps) => {
  const [showStack, setShowStack] = useState(false);

  const getCard = (id: number) => cardLibrary.find((card) => card.id === id);

  const renderCardStack = (stack: Card[]) => (
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
                    owner={cardObj.Owner}
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
                    owner={cardObj.Owner}
                  />
                ) : null;
              })}
            </div>

            <button onClick={() => setShowStack(false)}>Close</button>
          </div>
        </div>
      )}

      {playInteraction.length > 0 && (
        <EffectModal
          card={playInteraction[0].card}
          owner={playInteraction[0].owner}
          context={playInteraction[0].context}
          negatedPlayers = {negatedPlayers}
          effectHandlers={effectHandlers}
          cardLibrary={cardLibrary}
          setplayer1Deck={setplayer1Deck}
          setplayer2Deck={setplayer2Deck}
          onComplete={onComplete}
        />
      )}
    </div>
  );
};

export default PlayBoard;
