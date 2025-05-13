import { useState } from 'react';
import './App.css';
import Card from './Card';
import { useEffect } from 'react';
import DraftBoard from './draftBoard';
import PlayBoard from './playBoard';
import RulesOverlay from './rulesOverlay';
import CardList from './cardList';

type Card = {
  Name: string;
  Text: string;
  id: number;
  Quantity: number;
  Priority: number;
};

type PlayedCard = { id: number; owner: 'Player 1' | 'Player 2' };
type EffectHandler = (
  card: Card,
  owner: 'Player 1' | 'Player 2',
  negatedPlayers: Set<'Player 1' | 'Player 2'>
) => void;

function App() {
  // library of cards in the game. Shows Name, text, priority, quantity, and the ID for each card.
  const cardLibrary = [
    {
      Name: 'Chaotic',
      Text: `Your opponent's card is put on top of their deck. It has no effect this turn. Play the cards third from the bottom of each deck.`,
      id: 1,
      Quantity: 1,
      Priority: 2,
    },
    {
      Name: 'Covetous',
      Text: `Take the card your opponent played last turn and put it on top of your deck.`,
      id: 2,
      Quantity: 1,
      Priority: 13,
    },
    {
      Name: 'Deceitful',
      Text: `Swap the top card of each player's deck.`,
      id: 3,
      Quantity: 2,
      Priority: 12,
    },
    {
      Name: 'Impulsive',
      Text: 'Look at the top 2 cards of your deck. Play one of them and put the other on the top of your deck.',
      id: 4,
      Quantity: 1,
      Priority: 7,
    },
    {
      Name: 'Indecisive',
      Text: `Go through the discard pile and put a card from among them on top of your deck.`,
      id: 5,
      Quantity: 1,
      Priority: 15,
    },
    {
      Name: 'Irreverent',
      Text: `The card your opponent plays this turn does nothing.`,
      id: 6,
      Quantity: 1,
      Priority: 1,
    },
    {
      Name: 'Free',
      Text: `The next time you reveal a card, ignore its effect.`,
      id: 7,
      Quantity: 1,
      Priority: null,
    },
    {
      Name: 'Hasty',
      Text: `Discard the top card of each player's deck. They have no effect.`,
      id: 8,
      Quantity: 1,
      Priority: 10,
    },
    {
      Name: 'Nostalgic',
      Text: `Play this as any other card you have already played this game.`,
      id: 9,
      Quantity: 1,
      Priority: 4,
    },
    {
      Name: 'Patient',
      Text: `This card does nothing`,
      id: 10,
      Quantity: 4,
      Priority: null,
    },
    {
      Name: 'Plunderous',
      Text: `Play the top card of your opponent's deck twice. Then put it back.`,
      id: 11,
      Quantity: 1,
      Priority: 6,
    },
    {
      Name: 'Powerful',
      Text: `Play the top 2 cards of your deck.`,
      id: 12,
      Quantity: 1,
      Priority: 8,
    },
    {
      Name: 'Rapid',
      Text: `Your opponent skips their next turn.`,
      id: 13,
      Quantity: 1,
      Priority: null,
    },
    {
      Name: 'Reckless',
      Text: `Your opponent plays the top card of their deck.`,
      id: 14,
      Quantity: 2,
      Priority: 5,
    },
    {
      Name: 'Resourceful',
      Text: `Reveal this when you draft it. You get the third card this round. It is placed on top of this card this turn.`,
      id: 15,
      Quantity: 1,
      Priority: null,
    },
    {
      Name: 'Strategic',
      Text: `The next card you play after this is played twice.`,
      id: 16,
      Quantity: 1,
      Priority: null,
    },
    {
      Name: 'Tempered',
      Text: `Skip your next turn`,
      id: 17,
      Quantity: 1,
      Priority: null,
    },
    {
      Name: 'Tranquil',
      Text: `Put each Patient card you have in play back on top of your deck.`,
      id: 18,
      Quantity: 1,
      Priority: 14,
    },
    {
      Name: 'Wisened',
      Text: `If you have more cards in play than your opponent, discard the top card of their deck.`,
      id: 19,
      Quantity: 1,
      Priority: 11,
    },
    {
      Name: 'Weave',
      Text: `Look at the top 3 cards of your deck and put them back in any order.`,
      id: 20,
      Quantity: 2,
      Priority: 3,
    },
    {
      Name: 'Measure',
      Text: `Count the remaining cards in both decks. If your opponent has more, discard the top card of their deck. It has no effect.`,
      id: 21,
      Quantity: 2,
      Priority: 9,
    },
    {
      Name: 'Cut',
      Text: `You lose.`,
      id: 22,
      Quantity: 2,
      Priority: 16,
    },
  ];
  // Here come the useStates
  // the deckArray consists of the draftable cards in the game. These are tied to the ids of the cards in the cardLibrary above.
  const [deckArray, setDeckArray] = useState([
    1, 2, 3, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11, 12, 13, 14, 14, 15, 16,
    17, 18, 19,
  ]);
  // Active player is set to determine whose turn it is to draft. We'll use the S (snake) method, meaning player 1 drafts, then player 2 drafts twice, then player 1 drafts twice etc.
  const [activePlayer, setAP] = useState('Player 1');
  //discard pile is where the 3rd card goes when players pick their respective cards from a set of 3. Indecisive also pulls from it
  const [discardPile, discard] = useState<number[]>([]);
  // draftArray is each set of 3 cards that gets drafted during the draft portion.
  const [draftArray, setDraftArray] = useState<number[]>([]);
  // the two play zones represent each player's "in play" zones.
  const [playZone1, setplayZone1] = useState<PlayedCard[]>([]);
  const [playZone2, setplayZone2] = useState<PlayedCard[]>([]);
  // the two decks get filled during the draft portion and get emptied during the play portion. They start with the last card "cut", which, when drawn, makes the player lose the game
  const [player1Deck, setplayer1Deck] = useState<number[]>([22]);
  const [player2Deck, setplayer2Deck] = useState<number[]>([22]);
  // this controls which phase of the game we are in to help with rendering.
  const [phase, setPhase] = useState('draft');
  //rules and cardsList below are two overlays that respectively show the rules and the full list of cards.
  const [rules, setRules] = useState<'On' | 'Off'>('Off');
  const [cardsList, setCardList] = useState<'On' | 'Off'>('Off');

  const [negatedPlayers, setNegatedPlayers] = useState<
    Set<'Player 1' | 'Player 2'>
  >(new Set());
  const [playInteraction, setPlayInteraction] = useState<
    {
      card: Card;
      owner: 'Player 1' | 'Player 2';
      context: any;
    }[]
  >([]);

  function partition<T>(arr: T[], predicate: (item: T) => boolean): [T[], T[]] {
    const truthy: T[] = [];
    const falsy: T[] = [];

    for (const item of arr) {
      (predicate(item) ? truthy : falsy).push(item);
    }

    return [truthy, falsy];
  }

  //useEffect time!
  // When we move from draft to play, this tops off each player's deck with "weave" and "measure", the only consistent cards in each player's deck
  useEffect(() => {
    if (phase === 'play') {
      setplayer1Deck((prev) => [...prev, 21, 20]);
      setplayer2Deck((prev) => [...prev, 21, 20]);
    }
  }, [phase]);
  // Card 15 is "resourceful". When drafted, it lets the player that drafted it also draft the 3rd card of that round, rather than it being discarded. This useEffect is doing 2 things. First, it, under "normal" conditions, discards the third card and resets the draftArray. Because this is where we do that, we also have an if check to see if card 15 got drafted. If so, instead of moving the 3rd card to the discard pile, we give it to that player.
  useEffect(() => {
    if (phase === 'draft' && draftArray.length === 1) {
      const toDiscard = draftArray[0];

      // Determine who drafted card 15
      const p1Last = player1Deck[player1Deck.length - 1];
      const p2Last = player2Deck[player2Deck.length - 1];

      if (p1Last === 15) {
        setplayer1Deck((prev) => [...prev, toDiscard]);
      } else if (p2Last === 15) {
        setplayer2Deck((prev) => [...prev, toDiscard]);
      } else {
        discard((prev) => [...prev, toDiscard]);
      }

      setDraftArray([]);
    }
  }, [draftArray]);
  // This is our way of implementing the S/Snake draft style. Whenever the draftArray changes, we check if it has 2 cards in it and we swap the players if so. 3=>2 will always represent a change in player, while a 2=>3 jump should always retain the same player so whoever just picked can pick again.
  useEffect(() => {
    if (phase === 'draft' && draftArray.length === 2) {
      setAP((prev) => (prev === 'Player 1' ? 'Player 2' : 'Player 1'));
    }
  }, [draftArray]);

  useEffect(() => {
    console.log('Current playInteraction state:', playInteraction);
  }, [playInteraction]);

  const effectHandlers: {
    [key: number]: EffectHandler;
  } = {
    //chaotic
    1: (card, owner, negatedPlayers) => {
      const target = owner === 'Player 1' ? 'Player 2' : 'Player 1';
      setNegatedPlayers((prev) => new Set(prev).add(target));
    },
    // Covetous
    2: (card, owner, negatedPlayers) => {
      if (negatedPlayers.has(owner)) {
        setNegatedPlayers(new Set());
        return;
      }
    },
    //Deceitful
    3: (card, owner, negatedPlayers) => {
      if (negatedPlayers.has(owner)) {
        setNegatedPlayers(new Set());
        return;
      }
    },
    //Impulsive
    4: (card, owner, negatedPlayers) => {
      if (negatedPlayers.has(owner)) {
        setNegatedPlayers(new Set());
        return;
      }
    },
    //Indecisive
    5: (card, owner, negatedPlayers) => {
      if (negatedPlayers.has(owner)) {
        setNegatedPlayers(new Set());
        return;
      }
    },
    //Irreverant
    6: (card, owner, negatedPlayers) => {
      if (negatedPlayers.has(owner)) {
        setNegatedPlayers(new Set());
        return;
      }
      const target = owner === 'Player 1' ? 'Player 2' : 'Player 1';
      setNegatedPlayers((prev) => new Set(prev).add(target));
    },
    //Free
    7: (card, owner, negatedPlayers) => {
      if (negatedPlayers.has(owner)) return;
      setNegatedPlayers((prev) => new Set(prev).add(owner));
    },
    //Hasty
    8: (card, owner, negatedPlayers) => {
      if (negatedPlayers.has(owner)) {
        setNegatedPlayers(new Set());
        return;
      }
      setplayer1Deck((prev) => prev.slice(0, -1));
      setplayer2Deck((prev) => prev.slice(0, -1));
    },
    //Nostalgic
    9: (card, owner, negatedPlayers) => {
      if (negatedPlayers.has(owner)) {
        setNegatedPlayers(new Set());
        return;
      }
    },
    //Patient
    10: (card, owner, negatedPlayers) => {
      return;
    },
    //Plunderous
    11: (card, owner, negatedPlayers) => {
      if (negatedPlayers.has(owner)) {
        setNegatedPlayers(new Set());
        return;
      }
    },
    //Powerful
    12: (card, owner, negatedPlayers) => {
      if (negatedPlayers.has(owner)) {
        setNegatedPlayers(new Set());
        return;
      }
    },
    // Rapid
    13: (card, owner, negatedPlayers) => {
      if (negatedPlayers.has(owner)) {
        setNegatedPlayers(new Set());
        return;
      }
    },
    // Reckless
    14: (card, owner, negatedPlayers) => {
      if (negatedPlayers.has(owner)) {
        setNegatedPlayers(new Set());
        return;
      }
      if (owner === 'Player 1') {
        const top = player2Deck[player2Deck.length - 1];
        if (top !== undefined) {
          setplayZone2((prev) => [...prev, { id: top, owner: 'Player 2' }]);
          setplayer2Deck((prev) => prev.slice(0, -1));
        }
      }
      if (owner === 'Player 2') {
        const top = player1Deck[player1Deck.length - 1];
        if (top !== undefined) {
          setplayZone1((prev) => [...prev, { id: top, owner: 'Player 1' }]);
          setplayer1Deck((prev) => prev.slice(0, -1));
        }
      }
    },
    //Resourceful
    15: (card, owner, negatedPlayers) => {
      return;
    },
    //Strategic
    16: (card, owner, negatedPlayers) => {
      if (negatedPlayers.has(owner)) {
        setNegatedPlayers(new Set());
        return;
      }
    },
    //Tempered
    17: (card, owner, negatedPlayers) => {
      if (negatedPlayers.has(owner)) {
        setNegatedPlayers(new Set());
        return;
      }
    },
    //Tranquil
    18: (card, owner, negatedPlayers) => {
      if (negatedPlayers.has(owner)) {
        setNegatedPlayers(new Set());
        return;
      }

      if (owner === 'Player 1') {
        const [toReturn, remaining] = partition(playZone1, (c) => c.id === 10);
        setplayer1Deck((prev) => [...prev, ...toReturn.map((c) => c.id)]);
        setplayZone1(remaining);
      }

      if (owner === 'Player 2') {
        const [toReturn, remaining] = partition(playZone2, (c) => c.id === 10);
        setplayer2Deck((prev) => [...prev, ...toReturn.map((c) => c.id)]);
        setplayZone2(remaining);
      }
    },
    //Wisened
    19: (card, owner, negatedPlayers) => {
      if (negatedPlayers.has(owner)) {
        setNegatedPlayers(new Set());
        return;
      }
      if (owner === 'Player 1') {
        if (playZone1.length > playZone2.length) {
          discard((prev) => [...prev, player2Deck[player2Deck.length - 1]]);
          setplayer2Deck((prev) => prev.slice(0, -1));
        }
      }
      if (owner === 'Player 2') {
        if (playZone2.length > playZone1.length) {
          discard((prev) => [...prev, player1Deck[player1Deck.length - 1]]);
          setplayer1Deck((prev) => prev.slice(0, -1));
        }
      }
      return;
    },
    //Weave
    20: (card, owner, negatedPlayers) => {
      if (negatedPlayers.has(owner)) {
        setNegatedPlayers(new Set());
        return;
      }
      console.log(player1Deck.slice(-3), 'p1', owner)
      console.log(player2Deck.slice(-3), 'p2', owner)
      const topThreeIds = owner === 'Player 1' ? player1Deck.slice(-3) : player2Deck.slice(-3);
      
    
      setPlayInteraction((prev) => [
        ...prev,
        { card, owner, context: { topThreeIds } } 
      ]);
    },
    //Measure
    21: (card, owner, negatedPlayers) => {
      if (negatedPlayers.has(owner)) {
        setNegatedPlayers(new Set());
        return;
      }
      if (owner === 'Player 1') {
        if (player1Deck.length < player2Deck.length) {
          discard((prev) => [...prev, player2Deck[player2Deck.length - 1]]);
          setplayer2Deck((prev) => prev.slice(0, -1));
        }
      }
      if (owner === 'Player 2') {
        if (player2Deck.length < player1Deck.length) {
          discard((prev) => [...prev, player1Deck[player1Deck.length - 1]]);
          setplayer1Deck((prev) => prev.slice(0, -1));
        }
      }
    },
    //Cut
    22: (card, owner, negatedPlayers) => {
      if (negatedPlayers.has(owner)) {
        setNegatedPlayers(new Set());
        return;
      }
    },
  };
  useEffect(() => {
    // console.log(playZone2);
    if (phase !== 'play') return;
    const latestP1 = playZone1[playZone1.length - 1];
    const latestP2 = playZone2[playZone2.length - 1];

    const allPlayed = [latestP1, latestP2].filter(Boolean); // full PlayedCard objects

    const sorted = allPlayed
      .map(({ id, owner }) => {
        const card = cardLibrary.find((c) => c.id === id);
        return card ? { card, owner } : null;
      })
      .filter(Boolean) // remove nulls
      .sort((a, b) => (a.card.Priority ?? 99) - (b.card.Priority ?? 99));
    console.log(sorted, sorted[0]?.card);
    
    sorted.forEach(({ card, owner }) => {
      console.log("Triggering handler for:", card.Name, "by", owner);
      const handler = effectHandlers[card.id];
      if (handler) handler(card, owner, negatedPlayers); // use your current handler signature
    });
  }, [playZone1, playZone2]);

  // shuffling algorithm. Start at the end of the deckArray(drafting pool), pick a random number between 0 and 23 and swap our current position with it. Keep going backwards until we hit the first element in the array and we know that every element has been moved at least once.
  const shuffle = () => {
    if (deckArray.length < 24) {
      return;
    }
    const tempArray = [...deckArray];
    for (let i = tempArray.length - 1; i >= 0; i--) {
      const tempPlace: number = Math.floor(Math.random() * 24);
      [tempArray[i], tempArray[tempPlace]] = [
        tempArray[tempPlace],
        tempArray[i],
      ];
    }
    setDeckArray(tempArray);
    console.log(tempArray);
  };

  // pull the first 3 elements from the deckArray and put them into the draftArray.
  const deal = () => {
    if (deckArray.length === 0) {
      setPhase('play');
    } else {
      const tempdraftArray: number[] = [];
      const tempdeckArray = [...deckArray];
      while (tempdraftArray.length < 3) {
        tempdraftArray.push(tempdeckArray.shift()!);
      }
      setDraftArray(tempdraftArray);
      setDeckArray(tempdeckArray);
    }
  };
  // this actually allows the players to draft the cards being shown to them
  const cardClick = (card: Card) => {
    // only do this during the draft phase.
    if (phase === 'draft') {
      // if the player is 1, clicking on the card will push it to their deck.
      if (activePlayer === 'Player 1') {
        const p1Deck = [...player1Deck];
        p1Deck.push(card.id);
        setplayer1Deck(p1Deck);

        console.log(p1Deck, activePlayer, 'p1');
        // if the player is 2, clicking on the card will push it to their deck.
      } else if (activePlayer === 'Player 2') {
        const p2Deck = [...player2Deck];
        p2Deck.push(card.id);
        setplayer2Deck(p2Deck);

        console.log(p2Deck, activePlayer, 'p2');
      }
      // removes the card that just got drafted from the draftArray
      setDraftArray((prev) => {
        const index = prev.indexOf(card.id);
        if (index === -1) return prev;
        return [...prev.slice(0, index), ...prev.slice(index + 1)];
      });
    }
  };
  // go to the next one
  const nextCards = () => {
    const p1Top = player1Deck[player1Deck.length - 1];
    const p2Top = player2Deck[player2Deck.length - 1];
    if (p1Top !== undefined) {
      setplayZone1((prev) => [...prev, { id: p1Top, owner: 'Player 1' }]);
      setplayer1Deck((prev) => prev.slice(0, -1));
    }

    if (p2Top !== undefined) {
      setplayZone2((prev) => [...prev, { id: p2Top, owner: 'Player 2' }]);
      setplayer2Deck((prev) => prev.slice(0, -1));
    }
  };

  return (
    <div>
      {rules === 'Off' && <button onClick={() => setRules('On')}>Rules</button>}
      {rules === 'On' && <RulesOverlay onClose={() => setRules('Off')} />}

      {cardsList === 'Off' && (
        <button onClick={() => setCardList('On')}>Card List</button>
      )}
      {cardsList === 'On' && (
        <CardList
          cardLibrary={cardLibrary}
          onClose={() => setCardList('Off')}
        />
      )}
      <>
        {phase === 'draft' ? (
          <DraftBoard
            activePlayer={activePlayer}
            deckArray={deckArray}
            draftArray={draftArray}
            cardLibrary={cardLibrary}
            onCardClick={cardClick}
            onShuffle={shuffle}
            phase={phase}
            onDeal={deal}
          />
        ) : (
          <PlayBoard
            player1Deck={player1Deck}
            setplayer1Deck={setplayer1Deck}
            setplayer2Deck={setplayer2Deck}
            player2Deck={player2Deck}
            discardPile={discardPile}
            playZone1={playZone1}
            playZone2={playZone2}
            phase={phase}
            cardLibrary={cardLibrary}
            playInteraction={playInteraction}
            setPlayInteraction={setPlayInteraction}
            nextCards={() => nextCards()}
          />
        )}
      </>
    </div>
  );
}

export default App;
