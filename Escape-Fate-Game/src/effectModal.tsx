import React, { useState, useEffect } from 'react';
import './effectModal.css';

type CardType = {
  Name: string;
  Text: string;
  id: number;
  Quantity: number;
  Priority: number | null;
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
        {orderedCards.map((card, i) => (
          <li key={card.id}>
            <strong>{card.Name}</strong>: {card.Text}
            <div>
              <button onClick={() => moveCard(i, 'up')}>Up</button>
              <button onClick={() => moveCard(i, 'down')}>Down</button>
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
  cardLibrary, // ✅ NEW PROP
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
      ) : (
        <button onClick={() => onComplete()}>Done</button>
      )}
    </div>
  );
};

export default EffectModal;
