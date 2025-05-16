import React, { useState, useEffect } from 'react';
import './effectModal.css';

type PlayedCard = { id: number; owner: 'Player 1' | 'Player 2' };

type Card = {
  Name: string;
  Text: string;
  id: number;
  Quantity: number;
  Priority: number;
};

type EffectHandler = (
  card: Card,
  owner: 'Player 1' | 'Player 2',
  negatedPlayers: Set<'Player 1' | 'Player 2'>
) => void;

type CardType = {
  Name: string;
  Text: string;
  id: number;
  Quantity: number;
  Priority: number | null;
};

const ImpulsiveEffect = ({
  topTwoIds,
  cardLibrary,
  onConfirm,
}: {
  topTwoIds: number[];
  cardLibrary: CardType[];
  onConfirm: (selectedCardIds: number[]) => void;
}) => {
  const topTwoCards = topTwoIds
    .map((id) => cardLibrary.find((c) => c.id === id))
    .filter(Boolean) as CardType[];

  const [selectedImpulsive, setSelectedImpulsive] = useState<CardType | null>(
    null
  );

  const handleConfirm = () => {
    if (!selectedImpulsive) return;
    onConfirm([selectedImpulsive.id]);
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
  playZone,
  cardLibrary,
  onConfirm,
  owner,
}: {
  playedCards: CardType[];
  cardLibrary: CardType[];
  playZone: PlayedCard[];
  effectHandlers: { [key: number]: EffectHandler };
  owner: 'Player 1' | 'Player 2';
  onConfirm: () => void;
}) => {
  const [selectedNostalgic, setSelectedNostalgic] = useState<CardType | null>(
    null
  );

  const handleConfirm = () => {
    if (!selectedNostalgic) return;
    onConfirm();
    setTimeout(() => {
      const handler = effectHandlers[selectedNostalgic.id];
      if (handler) {
        handler(selectedNostalgic as Card, owner, new Set());
      }
    }, 0);
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
  cardLibrary: CardType[];
  onConfirm: (selected: CardType) => void;
}) => {
  const discardCards = discardIds
    .map((id) => cardLibrary.find((c) => c.id === id))
    .filter(Boolean) as CardType[];

  const [selectedIndecisive, setSelectedIndecisive] = useState<CardType | null>(
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
  topThreeIds,
  cardLibrary,
  onConfirm,
}: {
  topThreeIds: number[];
  cardLibrary: CardType[];
  onConfirm: (newOrder: CardType[]) => void;
}) => {
  const [orderedCards, setOrderedCards] = useState<CardType[]>([]);

  useEffect(() => {
    const updatedCards = topThreeIds
      .map((id) => cardLibrary.find((c) => c.id === id))
      .filter(Boolean) as CardType[];
    setOrderedCards(updatedCards);
  }, [topThreeIds, cardLibrary]);

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
  card: CardType;
  owner: 'Player 1' | 'Player 2';
  context: any;
  cardLibrary: CardType[];
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
    Array.isArray(context?.topTwoIds);

  return (
    <div className='effect-modal'>
      <h2>
        {card.Name} — {owner}
      </h2>
      <p>{card.Text}</p>

      {isWeave ? (
        <WeaveEffect
          topThreeIds={context.topThreeIds}
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
          playZone={context.playZone}
          effectHandlers={effectHandlers}
          owner={owner}
          onConfirm={() => onComplete()}
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
