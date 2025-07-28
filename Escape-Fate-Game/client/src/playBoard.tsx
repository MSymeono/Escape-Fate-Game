import { useState } from 'react';
import Card from './Card';
import EffectModal from './effectModal';
import './playBoard.css';
import type { EffectHandler } from './App';

type PlayBoardProps = {
  player1Deck: Card[];
  setplayer1Deck: React.Dispatch<React.SetStateAction<Card[]>>;
  player2Deck: Card[];
  setplayer2Deck: React.Dispatch<React.SetStateAction<Card[]>>;
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
    Owner: 'Player 1' | 'Player 2';
    context: any;
  }[];
  setPlayInteraction: React.Dispatch<
    React.SetStateAction<
      {
        card: Card;
        Owner: 'Player 1' | 'Player 2';
        context: any;
      }[]
    >
  >;
  onComplete: (result: any, otherCard: Card, playerDeck: string) => void;
};

const PlayBoard = ({
  player1Deck: _player1Deck,
  setplayer1Deck: _setplayer1Deck,
  player2Deck: _player2Deck,
  setplayer2Deck: _setplayer2Deck,
  playZone1,
  playZone2,
  cardLibrary,
  negatedPlayers: _negatedPlayers,
  effectHandlers: _effectHandlers,
  nextCards,
  discardPile: _discardPile,
  phase: _phase,
  playInteraction,
  setPlayInteraction: _setPlayInteraction,
  onComplete,
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
      <h2>Play Phase</h2>
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
                  />
                ) : null;
              })}
            </div>

            <button onClick={() => setShowStack(false)}>Close</button>
          </div>
        </div>
      )}

      {/* {playInteraction.length > 0 && (
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
      )} */}
      {playInteraction.length > 0 &&
  (() => {
    const interaction = playInteraction[0];

    //    if (playInteraction) {
    //   console.log('✅ playerDecks before EffectModal:', playInteraction[0].playerDecks!);
    // } else {
    //   console.log('❌ playerDecks missing in interaction.context', playInteraction);
    // }

    return (
      <EffectModal
        card={interaction.card}
        context={interaction.context}
        cardLibrary={cardLibrary}
        onComplete={onComplete}
        playInteraction={playInteraction}
      />
    );
  })()}
    </div>
  );
};

export default PlayBoard;
