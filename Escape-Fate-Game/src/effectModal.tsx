import React, { useState, useEffect } from 'react';
import './effectModal.css';

type CardType = {
  Name: string;
  Text: string;
  id: number;
  Quantity: number;
  Priority: number | null;
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

  const [selected, setSelected] = useState<CardType | null>(null);

  return (
    <div className='indecisive-effect'>
      <h4>Select a card from the discard pile:</h4>
      <div>
        {' '}
        Selected card:{' '}
        {selected ? <strong>{selected.Name}</strong> : <em>None</em>}
      </div>
      <ul>
        {discardCards.map((card, index) => (
          <li
            key={`${card.id}-${index}`}
            onClick={() => setSelected(card)}
            className={selected?.id === card.id ? 'selected' : ''}
            style={{ cursor: 'pointer' }}
          >
            <strong>{card.Name}</strong>: {card.Text}
          </li>
        ))}
      </ul>
      <button
        onClick={() => selected && onConfirm(selected)}
        disabled={!selected}
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
  onComplete,
}: {
  card: CardType;
  owner: 'Player 1' | 'Player 2';
  context: any;
  cardLibrary: CardType[];
  onComplete: (newState?: CardType[] | null) => void;
}) => {
  console.log('Rendering modal for', owner, 'with', context?.topThreeIds);
  const isWeave =
    card.Name?.toLowerCase() === 'weave' && Array.isArray(context?.topThreeIds);

  const isIndecisive =
    card.Name?.toLowerCase() === 'indecisive' &&
    Array.isArray(context?.discardIds);

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
      ) : (
        <button onClick={() => onComplete()}>Done</button>
      )}
    </div>
  );
};

export default EffectModal;
