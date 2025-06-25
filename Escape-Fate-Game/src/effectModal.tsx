import React, { useState, useEffect } from 'react';
import './effectModal.css';

type Card = {
  Name: string;
  Text: string;
  id: number;
  Owner?: 'Player 1' | 'Player 2';
  Quantity?: number;
  Priority: number | null;
  Multiplier?: number;
};

type EffectHandler = (
  card: Card,
  owner: 'Player 1' | 'Player 2',
  negatedPlayers: Set<'Player 1' | 'Player 2'>,
  otherCard?: Card
) => void;

const ImpulsiveEffect = ({
  topTwoIds,
  cardLibrary,
  onConfirm,
}: {
  topTwoIds: Card[];
  cardLibrary: Card[];
  onConfirm: (selectedCardIds: Card[]) => void;
}) => {
  const topTwoCards = topTwoIds.filter(Boolean) as Card[];

  const [selectedImpulsive, setSelectedImpulsive] = useState<Card | null>(null);

  const handleConfirm = () => {
    if (!selectedImpulsive) return;
    // console.log(
    //   'Confirming Impulsive with',
    //   selectedImpulsive,
    //   selectedImpulsive.type
    // );
    onConfirm([selectedImpulsive]);
  };

  return (
    <div className='impulsive-effect'>
      <h4>Select a Card from the Top Two</h4>
      <div>
        Selected card:{' '}
        {selectedImpulsive ? (
          <strong>{selectedImpulsive.Name}</strong>
        ) : (
          <em>None</em>
        )}
      </div>
      <ul>
        {topTwoCards.map((card, index) => (
          <li
            key={`${card.id}-${index}`}
            onClick={() => setSelectedImpulsive(card)}
            className={selectedImpulsive?.id === card.id ? 'selected' : ''}
            style={{ cursor: 'pointer' }}
          >
            <strong>{card.Name}</strong>: {card.Text}
          </li>
        ))}
      </ul>
      <button onClick={handleConfirm} disabled={!selectedImpulsive}>
        Confirm
      </button>
    </div>
  );
};

const NostalgicEffect = ({
  playedCards,
  effectHandlers,
  cardLibrary,
  onConfirm,
  otherCard,
  negatedPlayers,
}: {
  playedCards: Card[];
  cardLibrary: Card[];
  effectHandlers: { [key: number]: EffectHandler };
  negatedPlayers: Set<'Player 1' | 'Player 2'>;
  onConfirm: (selectedNostalgic: Card[]) => void;
  otherCard: Card;
}) => {
  const [selectedNostalgic, setSelectedNostalgic] = useState<Card | null>(null);

  const handleConfirm = () => {
    if (!selectedNostalgic) return;
    if (otherCard) {
      onConfirm([selectedNostalgic, otherCard]);
    } else {
      onConfirm([selectedNostalgic]);
    }
  };

  return (
    <div className='nostalgic-effect'>
      <h4>Select a Card you have already played</h4>
      <div>
        Selected card:{' '}
        {selectedNostalgic ? (
          <strong>{selectedNostalgic.Name}</strong>
        ) : (
          <em>None</em>
        )}
      </div>
      <ul>
        {playedCards.map((card, index) => (
          <li
            key={`${card.id}-${index}`}
            onClick={() => setSelectedNostalgic(card)}
            className={selectedNostalgic?.id === card.id ? 'selected' : ''}
            style={{ cursor: 'pointer' }}
          >
            <strong>{card.Name}</strong>: {card.Text}
          </li>
        ))}
      </ul>
      <button onClick={handleConfirm} disabled={!selectedNostalgic}>
        Confirm
      </button>
    </div>
  );
};

const IndecisiveEffect = ({
  discardIds,
  cardLibrary,
  onConfirm,
}: {
  discardIds: number[];
  cardLibrary: Card[];
  onConfirm: (selected: Card) => void;
}) => {
  const discardCards = discardIds
    .map((id) => cardLibrary.find((c) => c.id === id))
    .filter(Boolean) as Card[];

  const [selectedIndecisive, setSelectedIndecisive] = useState<Card | null>(
    null
  );

  return (
    <div className='indecisive-effect'>
      <h4>Select a card from the discard pile:</h4>
      <div>
        Selected card:{' '}
        {selectedIndecisive ? (
          <strong>{selectedIndecisive.Name}</strong>
        ) : (
          <em>None</em>
        )}
      </div>
      <ul>
        {discardCards.map((card, index) => (
          <li
            key={`${card.id}-${index}`}
            onClick={() => setSelectedIndecisive(card)}
            className={selectedIndecisive?.id === card.id ? 'selected' : ''}
            style={{ cursor: 'pointer' }}
          >
            <strong>{card.Name}</strong>: {card.Text}
          </li>
        ))}
      </ul>
      <button
        onClick={() => selectedIndecisive && onConfirm(selectedIndecisive)}
        disabled={!selectedIndecisive}
      >
        Confirm
      </button>
    </div>
  );
};

const WeaveEffect = ({
  topThree,
  cardLibrary,
  onConfirm,
}: {
  topThree: Card[];
  cardLibrary: Card[];
  onConfirm: (newOrder: Card[]) => void;
}) => {
  const [orderedCards, setOrderedCards] = useState<Card[]>([]);

  useEffect(() => {
    const updatedCards = topThree.filter(Boolean) as Card[];
    setOrderedCards(updatedCards);
  }, [topThree, cardLibrary]);

  const moveCard = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...orderedCards];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newOrder.length) return;
    [newOrder[index], newOrder[swapIndex]] = [
      newOrder[swapIndex],
      newOrder[index],
    ];
    setOrderedCards(newOrder);
  };

  return (
    <div className='top-three'>
      <h4>Reorder the top 3 cards:</h4>
      <ul>
        {[...orderedCards].reverse().map((card, i) => (
          <li key={`${card.id}-${i}`}>
            <strong>{card.Name}</strong>: {card.Text}
            <div>
              <button
                onClick={() => moveCard(orderedCards.length - 1 - i, 'down')}
              >
                Up
              </button>
              <button
                onClick={() => moveCard(orderedCards.length - 1 - i, 'up')}
              >
                Down
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={() => onConfirm(orderedCards)}>Confirm</button>
    </div>
  );
};

const EffectModal = ({
  card,
  owner,
  context,
  cardLibrary,
  effectHandlers,
  onComplete,
}: {
  card: Card;
  owner: 'Player 1' | 'Player 2';
  context: any;
  cardLibrary: Card[];
  effectHandlers: { [key: number]: EffectHandler };
  onComplete: (result?: any) => void;
}) => {
  const isWeave =
    card.Name?.toLowerCase() === 'weave' && Array.isArray(context?.topThreeIds);
  const isIndecisive =
    card.Name?.toLowerCase() === 'indecisive' &&
    Array.isArray(context?.discardIds);
  const isNostalgic =
    card.Name?.toLowerCase() === 'nostalgic' &&
    Array.isArray(context?.playedCards);
  const isImpulsive =
    card.Name?.toLowerCase() === 'impulsive' &&
    Array.isArray(context?.topTwoIds) &&
    context?.topTwoIds[0]?.id !== undefined;

  return (
    <div className='effect-modal'>
      <h2>
        {card.Name} — {owner}
      </h2>
      <p>{card.Text}</p>

      {isWeave ? (
        <WeaveEffect
          topThree={context.topThreeIds}
          cardLibrary={cardLibrary}
          onConfirm={onComplete}
        />
      ) : isIndecisive ? (
        <IndecisiveEffect
          discardIds={context.discardIds}
          cardLibrary={cardLibrary}
          onConfirm={(selectedCard) => onComplete([selectedCard])}
        />
      ) : isNostalgic ? (
        <NostalgicEffect
          playedCards={context.playedCards}
          cardLibrary={cardLibrary}
          effectHandlers={effectHandlers}
          owner={owner}
          onConfirm={(selectedCard) => onComplete(selectedCard)}
        />
      ) : isImpulsive ? (
        <ImpulsiveEffect
          topTwoIds={context.topTwoIds}
          cardLibrary={cardLibrary}
          onConfirm={(selectedCardIds) => onComplete(selectedCardIds)}
        />
      ) : (
        <button onClick={() => onComplete()}>Done</button>
      )}
    </div>
  );
};

export default EffectModal;
