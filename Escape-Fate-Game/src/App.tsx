import { useRef, useState, useEffect } from 'react';
import './App.css';
import Card from './Card';
import DraftBoard from './draftBoard';
import PlayBoard from './playBoard';
import RulesOverlay from './rulesOverlay';
import CardList from './cardList';
import GameLog from './gameLog';

type Card = {
  Name: string;
  Text: string;
  id: number;
  Owner?: 'Player 1' | 'Player 2';
  Quantity?: number;
  Priority: number | null;
  Multiplier?: number;
};

// type PlayedCard = {
//   id: number;
//   Owner: 'Player 1' | 'Player 2'|null;
//   Name: string;
//   Priority: number | null;
//   Multiplier?: number;
// };
type EffectHandler = (
  card: Card,
  Owner: 'Player 1' | 'Player 2',
  negatedPlayers: Set<'Player 1' | 'Player 2'>
) => void;

function App() {
  // library of cards in the game. Shows Name, Text, Priority, Quantity, and the ID for each card.
  const cardLibrary = [
    {
      Name: 'Chaotic',
      Text: `Your opponent's card is put on top of their deck. It has no effect this turn. Play the cards third from the bottom of each deck.`,
      id: 1,
      Quantity: 1,
      Priority: 2,
      Modal: false,
    },
    {
      Name: 'Covetous',
      Text: `Take the card your opponent played last turn and put it on top of your deck.`,
      id: 2,
      Quantity: 1,
      Priority: 13,
      Modal: false,
    },
    {
      Name: 'Deceitful',
      Text: `Swap the top card of each player's deck.`,
      id: 3,
      Quantity: 2,
      Priority: 12,
      Modal: false,
    },
    {
      Name: 'Impulsive',
      Text: 'Look at the top 2 cards of your deck. Play one of them and put the other on the top of your deck.',
      id: 4,
      Quantity: 1,
      Priority: 7,
      Modal: true,
    },
    {
      Name: 'Indecisive',
      Text: `Go through the discard pile and put a card from among them on top of your deck.`,
      id: 5,
      Quantity: 1,
      Priority: 15,
      Modal: true,
    },
    {
      Name: 'Irreverent',
      Text: `The card your opponent plays this turn does nothing.`,
      id: 6,
      Quantity: 1,
      Priority: 1,
      Modal: false,
    },
    {
      Name: 'Free',
      Text: `The next time you reveal a card, ignore its effect.`,
      id: 7,
      Quantity: 1,
      Priority: null,
      Modal: false,
    },
    {
      Name: 'Hasty',
      Text: `Discard the top card of each player's deck. They have no effect.`,
      id: 8,
      Quantity: 1,
      Priority: 10,
      Modal: false,
    },
    {
      Name: 'Nostalgic',
      Text: `Play this as any other card you have already played this game.`,
      id: 9,
      Quantity: 1,
      Priority: 3,
      Modal: true,
    },
    {
      Name: 'Patient',
      Text: `This card does nothing`,
      id: 10,
      Quantity: 4,
      Priority: null,
      Modal: false,
    },
    {
      Name: 'Plunderous',
      Text: `Play the top card of your opponent's deck.`,
      id: 11,
      Quantity: 1,
      Priority: 6,
      Modal: false,
    },
    {
      Name: 'Powerful',
      Text: `Play the top 2 cards of your deck.`,
      id: 12,
      Quantity: 1,
      Priority: 8,
      Modal: false,
    },
    {
      Name: 'Rapid',
      Text: `Your opponent skips their next turn.`,
      id: 13,
      Quantity: 1,
      Priority: null,
      Modal: false,
    },
    {
      Name: 'Reckless',
      Text: `Your opponent plays the top card of their deck.`,
      id: 14,
      Quantity: 2,
      Priority: 5,
      Modal: false,
    },
    {
      Name: 'Resourceful',
      Text: `Reveal this when you draft it. You get the third card this round. It is placed on top of this card this turn.`,
      id: 15,
      Quantity: 1,
      Priority: null,
      Modal: false,
    },
    {
      Name: 'Strategic',
      Text: `The card you play next turn is played twice.`,
      id: 16,
      Quantity: 1,
      Priority: null,
      Modal: false,
    },
    {
      Name: 'Tempered',
      Text: `Skip your next turn`,
      id: 17,
      Quantity: 1,
      Priority: null,
      Modal: false,
    },
    {
      Name: 'Tranquil',
      Text: `Put each Patient card you have in play back on top of your deck.`,
      id: 18,
      Quantity: 1,
      Priority: 14,
      Modal: false,
    },
    {
      Name: 'Wisened',
      Text: `If you have more cards in play than your opponent, discard the top card of their deck.`,
      id: 19,
      Quantity: 1,
      Priority: 11,
      Modal: false,
    },
    {
      Name: 'Weave',
      Text: `Look at the top 3 cards of your deck and put them back in any order.`,
      id: 20,
      Quantity: 2,
      Priority: 4,
      Modal: true,
    },
    {
      Name: 'Measure',
      Text: `Count the remaining cards in both decks. If your opponent has more, discard the top card of their deck. It has no effect.`,
      id: 21,
      Quantity: 2,
      Priority: 9,
      Modal: false,
    },
    {
      Name: 'Cut',
      Text: `You lose.`,
      id: 22,
      Quantity: 2,
      Priority: 16,
      Modal: false,
    },
  ];
  // Here come the useStates
  // the deckArray consists of the draftable cards in the game. These are tied to the ids of the cards in the cardLibrary above.
  const [deckArray, setDeckArray] = useState([
    1, 3, 3, 5, 7, 8, 10, 10, 10, 10, 11, 12, 13, 14, 14, 15, 16, 17, 18, 2, 6,
    19, 9, 4,
  ]);
  // Active player is set to determine whose turn it is to draft. We'll use the S (snake) method, meaning player 1 drafts, then player 2 drafts twice, then player 1 drafts twice etc.
  const [activePlayer, setAP] = useState('Player 1');
  //discard pile is where the 3rd card goes when players pick their respective cards from a set of 3. Indecisive also pulls from it
  const [discardPile, discard] = useState<number[]>([]);
  // draftArray is each set of 3 cards that gets drafted during the draft portion.
  const [draftArray, setDraftArray] = useState<number[]>([]);
  // the two play zones represent each player's "in play" zones.
  const [playZone1, setplayZone1] = useState<Card[]>([]);
  const [playZone2, setplayZone2] = useState<Card[]>([]);
  // the two decks get filled during the draft portion and get emptied during the play portion. They start with the last card "cut", which, when drawn, makes the player lose the game
  const [player1Deck, setplayer1Deck] = useState<Card[]>([
    { id: 22, Owner: 'Player 1', Name: 'Cut', Priority: 16, Multiplier: 1 },
  ]);
  const [player2Deck, setplayer2Deck] = useState<Card[]>([
    { id: 22, Owner: 'Player 2', Name: 'Cut', Priority: 16, Multiplier: 1 },
  ]);
  // this controls which phase of the game we are in to help with rendering.
  const [phase, setPhase] = useState('draft');
  //rules and cardsList below are two overlays that respectively show the rules and the full list of cards.
  const [rules, setRules] = useState<'On' | 'Off'>('Off');
  const [cardsList, setCardList] = useState<'On' | 'Off'>('Off');
  const [gameLogOverlay, setGameLogOverlay] = useState<'On' | 'Off'>('Off');
  const [gameLog, setGameLog] = useState<string[]>([]);
  const [resourcefulDrafted, setResourcefulDrafted] = useState<boolean>(false);

  const [turn, setTurn] = useState<number>(1);

  const [negatedPlayers, setNegatedPlayers] = useState<
    Set<'Player 1' | 'Player 2'>
  >(new Set());
  const [doubledPlayers, setDoubledPlayers] = useState<
    Set<'Player 1' | 'Player 2'>
  >(new Set());
  const [skippedPlayers, setSkippedPlayers] = useState<
    Set<'Player 1' | 'Player 2'>
  >(new Set());

  const [playInteraction, setPlayInteraction] = useState<
    {
      card: Card;
      Owner: 'Player 1' | 'Player 2';
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
      setplayer1Deck((prev) => [
        ...prev,
        {
          id: 21,
          Owner: 'Player 1',
          Name: 'Measure',
          Priority: 9,
          Multiplier: 1,
          Text: `Count the remaining cards in both decks. If your opponent has more, discard the top card of their deck. It has no effect.`,
        },
        {
          id: 20,
          Owner: 'Player 1',
          Name: 'Weave',
          Priority: 3,
          Multiplier: 1,
          Text: `Look at the top 3 cards of your deck and put them back in any order.`,
        },
      ]);
      setplayer2Deck((prev) => [
        ...prev,
        {
          id: 21,
          Owner: 'Player 2',
          Name: 'Measure',
          Priority: 9,
          Multiplier: 1,
          Text: `Count the remaining cards in both decks. If your opponent has more, discard the top card of their deck. It has no effect.`,
        },
        {
          id: 20,
          Owner: 'Player 2',
          Name: 'Weave',
          Priority: 3,
          Multiplier: 1,
          Text: `Look at the top 3 cards of your deck and put them back in any order.`,
        },
      ]);
    }
  }, [phase]);

  useEffect(() => {
    console.log('we are in skipped players', skippedPlayers);
  }, [skippedPlayers]);

  useEffect(() => {
    console.log('skippedPlayers', skippedPlayers);
    console.log('p1top', player1Deck[player1Deck.length - 1]);
    console.log('p2top', player2Deck[player2Deck.length - 1]);
  }, [playZone1, playZone2]);

  // Card 15 is "resourceful". When drafted, it lets the player that drafted it also draft the 3rd card of that round, rather than it being discarded. This useEffect is doing 2 things. First, it, under "normal" conditions, discards the third card and resets the draftArray. Because this is where we do that, we also have an if check to see if card 15 got drafted. If so, instead of moving the 3rd card to the discard pile, we give it to that player.
  useEffect(() => {
    if (phase === 'draft' && draftArray.length === 1) {
      const toDiscard = draftArray[0];
      const fullCard = cardLibrary.find((c) => c.id === toDiscard);
      const toTop: Card = {
        Name: fullCard!.Name,
        id: toDiscard,
        Text: fullCard!.Text,
        Priority: fullCard!.Priority,
        Multiplier: 1,
      };
      // Determine who drafted card 15
      const p1Last = player1Deck[player1Deck.length - 1];
      const p2Last = player2Deck[player2Deck.length - 1];

      if (p1Last.id === 15) {
        toTop.Owner = 'Player 1';
        setplayer1Deck((prev) => [...prev, toTop]);
      } else if (p2Last.id === 15) {
        toTop.Owner = 'Player 2';
        setplayer2Deck((prev) => [...prev, toTop]);
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

  // useEffect(() => {
  //   console.log('Current playInteraction state:', playInteraction);
  // }, [playInteraction]);

  const effectHandlers: {
    [key: number]: EffectHandler;
  } = {
    //chaotic
    1: (card, Owner, localNegated) => {
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }
      const target = Owner === 'Player 1' ? 'Player 2' : 'Player 1';
      localNegated.add(target);
      const p1Zone = [...playZone1];
      const p2Zone = [...playZone2];
      const p1Deck = [...player1Deck];
      const p2Deck = [...player2Deck];
      if (target === 'Player 1') {
        const lastPlayed = p1Zone[p1Zone.length - 1];
        if (lastPlayed) {
          setplayer1Deck((prev) => [...prev, lastPlayed]);
        }
      }
      if (target === 'Player 2') {
        const lastPlayed = p2Zone[p2Zone.length - 1];
        if (lastPlayed) {
          setplayer2Deck((prev) => [...prev, lastPlayed]);
        }
      }
      {
        const chaotic1 = p1Deck[3] ?? p1Deck[p1Deck.length - 1];
        const chaotic2 = p2Deck[3] ?? p2Deck[p2Deck.length - 1];

        if (chaotic1 !== undefined) {
          setplayZone1((prev) => [...prev, chaotic1]);
          setplayer1Deck((prev) =>
            prev.filter((_, i) => i !== p1Deck.length - 1)
          );
        }

        if (chaotic2 !== undefined) {
          setplayZone2((prev) => [...prev, chaotic2]);
          setplayer2Deck((prev) =>
            prev.filter((_, i) => i !== p2Deck.length - 1)
          );
        }
      }
    },
    // Covetous
    2: (card, Owner, localNegated) => {
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }
      const target = Owner === 'Player 1' ? 'Player2' : 'Player 1';
      if (Owner === 'Player 1') {
        const targetZone = [...playZone2];
        const index = targetZone.length - 2;
        if (index < 0) return;

        const stolen = targetZone[index];
        setGameLog((prev) => [
          ...prev,
          `${Owner} stole ${target}'s ${stolen.Name} using Covetous.`,
        ]);
        setplayer1Deck((deck) => [...deck, stolen]);
        setplayZone2((prev) => prev.filter((_, i) => i !== index));
        setNegatedPlayers((neg) => new Set(neg).add('Player 1'));
      }

      if (Owner === 'Player 2') {
        const targetZone = [...playZone1];
        const index = targetZone.length - 2;
        if (index < 0) return;

        const stolen = targetZone[index];
        setGameLog((prev) => [
          ...prev,
          `${Owner} stole ${target}'s ${stolen.Name} using Covetous.`,
        ]);
        setplayer2Deck((deck) => [...deck, stolen]);
        setplayZone1((prev) => prev.filter((_, i) => i !== index));
        setNegatedPlayers((neg) => new Set(neg).add('Player 2'));
      }
    },
    //Deceitful
    3: (card, Owner, localNegated) => {
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }
      const top1 = player1Deck[player1Deck.length - 1];
      const top2 = player2Deck[player2Deck.length - 1];
      if (!top1 && !top2) return;
      if (!top2 && top1) {
        setplayer2Deck((prev) => [...prev, top1]);
        setplayer1Deck((prev) => prev.slice(0, -1));
      }
      if (!top1 && top2) {
        setplayer1Deck((prev) => [...prev, top2]);
        setplayer2Deck((prev) => prev.slice(0, -1));
      }
      if (top1 && top2) {
        setplayer1Deck((prev) => [...prev.slice(0, -1), top2!]);
        setplayer2Deck((prev) => [...prev.slice(0, -1), top1!]);
      }
      setGameLog((prev) => [
        ...prev,
        `${Owner}'s deceitful swapped the top cards of each player's deck`,
      ]);
    },
    //Impulsive
    4: (card, Owner, localNegated) => {
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }
      const topTwoIds =
        Owner === 'Player 1' ? player1Deck.slice(-2) : player2Deck.slice(-2);

      setPlayInteraction((prev) => [
        ...prev,
        {
          card,
          Owner,
          context: {
            topTwoIds,
          },
        },
      ]);
    },
    //Indecisive
    5: (card, Owner, localNegated) => {
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }
      setPlayInteraction((prev) => [
        ...prev,
        { card, Owner, context: { discardIds: discardPile } },
      ]);
    },
    //Irreverent
    6: (card, Owner, localNegated) => {
      if (localNegated.has(Owner)) return;
      const target = Owner === 'Player 1' ? 'Player 2' : 'Player 1';
      localNegated.add(target);
      const playZone = Owner === 'Player 1' ? playZone2 : playZone1;
      const cardName = playZone[playZone.length - 1].Name;
      setGameLog((prev) => [...prev, `Irreverent negated ${cardName}.`]);
    },
    //Free
    7: (card, Owner, localNegated) => {
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }
      setNegatedPlayers((prev) => new Set(prev).add(Owner));
      setGameLog((prev) => [
        ...prev,
        `${Owner}'s next card will have no effect.`,
      ]);
    },
    //Hasty
    8: (card, Owner, localNegated) => {
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }
      const top1 = player1Deck[player1Deck.length - 1];
      const top2 = player2Deck[player2Deck.length - 1];
      if (top1) {
        discard((prev) => [...prev, top1.id]);
        setplayer1Deck((prev) => prev.slice(0, -1));
      }
      if (top2) {
        discard((prev) => [...prev, top2.id]);
        setplayer2Deck((prev) => prev.slice(0, -1));
      }
      setGameLog((prev) => [
        ...prev,
        `Hasty discarded the top card of each player's deck.`,
      ]);
    },
    //Nostalgic
    9: (card, Owner, localNegated) => {
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }
      const playZone = Owner === 'Player 1' ? playZone1 : playZone2;
      const playedCards = playZone.filter((c) => c.id !== card.id);
      setPlayInteraction((prev) => [
        ...prev,
        { card, Owner, context: { playedCards } },
      ]);
    },
    //Patient
    10: (card, Owner, localNegated) => {
      return;
    },
    //Plunderous
    11: (card, Owner, localNegated) => {
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }

      const target = Owner === 'Player 1' ? 'Player 2' : 'Player 1';
      const targetDeck = target === 'Player 1' ? player1Deck : player2Deck;
      const targetZone = target === 'Player 1' ? playZone1 : playZone2;
      const top = targetDeck[targetDeck.length - 1];

      if (top) {
        const handler = effectHandlers[top.id];
        console.log(top, 'top1');
        handler(top, target, new Set());
        setGameLog((prev) => [
          ...prev,
          `${Owner} plundered ${target}'s ${top.Name}`,
        ]);
        console.log(top, 'top2');
        if (targetZone === playZone1) {
          setplayZone1((prev) => [...prev, top]);
        } else if (targetZone === playZone2) {
          setplayZone2((prev) => [...prev, top]);
        }
        console.log(top, 'top3');
      }
    },
    //Powerful
    12: (card, Owner, localNegated) => {
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }
      const deck = Owner === 'Player 1' ? player1Deck : player2Deck;
      const topTwo = [...deck].slice(-2);
      topTwo.reverse().forEach((card) => {
        setGameLog((prev) => [
          ...prev,
          `${Owner} played ${card.Name} using Powerful.`,
        ]);
        const handler = effectHandlers[card.id];
        handler(card, Owner, negatedPlayers);
      });
    },
    // Rapid
    13: (card, Owner, localNegated) => {
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }
      const target = Owner === 'Player 1' ? 'Player 2' : 'Player 1';
      setSkippedPlayers((prev) => new Set(prev).add(target));
      setGameLog((prev) => [
        ...prev,
        `${Owner} skipped ${target}'s next turn.`,
      ]);
    },
    // Reckless
    14: (card, Owner, localNegated) => {
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }

      setNegatedPlayers((prev) => new Set(prev).add(Owner));

      const target: 'Player 1' | 'Player 2' =
        Owner === 'Player 1' ? 'Player 2' : 'Player 1';
      const targetDeck = target === 'Player 1' ? player1Deck : player2Deck;
      const topCard = targetDeck[targetDeck.length - 1];
      const handler = effectHandlers[topCard.id];
      handler(topCard, target, negatedPlayers);

      if (!card) return;
      setGameLog((prev) => [
        ...prev,
        `${Owner} forced ${target} to play ${topCard.Name} using Reckless.`,
      ]);

      if (target === 'Player 1') {
        setplayZone1((prev) => [...prev, topCard]);
        setplayer1Deck((prev) => prev.slice(0, -1));
      } else {
        setplayZone2((prev) => [...prev, topCard]);
        setplayer2Deck((prev) => prev.slice(0, -1));
      }
    },
    //Resourceful
    15: (card, Owner, localNegated) => {
      return;
    },
    //Strategic
    16: (card, Owner, localNegated) => {
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }
      setDoubledPlayers((prev) => new Set(prev).add(Owner));
      setGameLog((prev) => [
        ...prev,
        `${Owner}'s next card will be played twice.`,
      ]);
    },
    //Tempered
    17: (card, Owner, localNegated) => {
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }
      setSkippedPlayers((prev) => new Set(prev).add(Owner));
      setGameLog((prev) => [...prev, `${Owner} skipped their next turn.`]);
    },
    //Tranquil
    18: (card, Owner, localNegated) => {
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }

      if (Owner === 'Player 1') {
        const [toReturn, remaining] = partition(playZone1, (c) => c.id === 10);
        setplayer1Deck((prev) => [...prev, ...toReturn]);
        setplayZone1(remaining);
        const playCount = toReturn.length;
        setNegatedPlayers((neg) => new Set(neg).add('Player 1'));
        setGameLog((prev) => [
          ...prev,
          `${Owner} put ${playCount} Patient cards on top of their deck.`,
        ]);
      }

      if (Owner === 'Player 2') {
        const [toReturn, remaining] = partition(playZone2, (c) => c.id === 10);
        setplayer2Deck((prev) => [...prev, ...toReturn]);
        setplayZone2(remaining);
        const playCount = toReturn.length;
        setNegatedPlayers((neg) => new Set(neg).add('Player 2'));
        setGameLog((prev) => [
          ...prev,
          `${Owner} put ${playCount} Patient cards on top of their deck.`,
        ]);
      }
    },
    //Wisened
    19: (card, Owner, localNegated) => {
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }
      if (Owner === 'Player 1') {
        if (playZone1.length > playZone2.length) {
          discard((prev) => [...prev, player2Deck[player2Deck.length - 1].id]);
          setplayer2Deck((prev) => prev.slice(0, -1));
          setGameLog((prev) => [
            ...prev,
            `Player 1 discarded the top card of Player 2's deck using Wisened.`,
          ]);
        }
      }
      if (Owner === 'Player 2') {
        if (playZone2.length > playZone1.length) {
          discard((prev) => [...prev, player1Deck[player1Deck.length - 1].id]);
          setplayer1Deck((prev) => prev.slice(0, -1));
          setGameLog((prev) => [
            ...prev,
            `Player 2 discarded the top card of Player 1's deck.`,
          ]);
        }
      }
      return;
    },
    //Weave
    20: (card, Owner, localNegated) => {
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }
      const topThreeIds =
        Owner === 'Player 1' ? player1Deck.slice(-3) : player2Deck.slice(-3);

      setPlayInteraction((prev) => [
        ...prev,
        { card, Owner, context: { topThreeIds } },
      ]);
    },
    //Measure
    21: (card, Owner, localNegated) => {
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }
      if (Owner === 'Player 1') {
        if (player1Deck.length < player2Deck.length) {
          discard((prev) => [...prev, player2Deck[player2Deck.length - 1].id]);
          setplayer2Deck((prev) => prev.slice(0, -1));
          setGameLog((prev) => [
            ...prev,
            `Player 1 discarded the top card of Player 2's deck.`,
          ]);
        }
      }
      if (Owner === 'Player 2') {
        if (player2Deck.length < player1Deck.length) {
          discard((prev) => [...prev, player1Deck[player1Deck.length - 1].id]);
          setplayer1Deck((prev) => prev.slice(0, -1));
          setGameLog((prev) => [
            ...prev,
            `Player 2 discarded the top card of Player 1's deck.`,
          ]);
        }
      }
    },
    //Cut Not Done
    22: (card, Owner, localNegated) => {
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }
      setGameLog((prev) => [...prev, `${Owner} has lost the game.`]);
    },
  };
  const modalResolvers = useRef<(() => void)[]>([]);

  useEffect(() => {
    if (phase !== 'play') return;

    const latestP1 = playZone1[playZone1.length - 1];
    const latestP2 = playZone2[playZone2.length - 1];
    const allPlayed = [latestP1, latestP2].filter(Boolean);

    const sorted = allPlayed
      .map(({ id, Owner }) => {
        const card = cardLibrary.find((c) => c.id === id);
        return card ? { card, Owner } : null;
      })
      .filter(Boolean)
      .sort((a, b) => (a!.card.Priority ?? 99) - (b!.card.Priority ?? 99));

    const localNegated = new Set(negatedPlayers);
    const modalPromises: Promise<void>[] = [];

    sorted.forEach(({ card, Owner }) => {
      const handler = effectHandlers[card.id];
      if (!handler) return;

      const timesToRun = doubledPlayers.has(Owner) ? 2 : 1;

      if (doubledPlayers.has(Owner)) {
        setDoubledPlayers((prev) => {
          const next = new Set(prev);
          next.delete(Owner);
          return next;
        });
      }

      for (let i = 0; i < timesToRun; i++) {
        if (card.Modal) {
          modalPromises.push(
            new Promise((resolve) => {
              modalResolvers.current.push(resolve);
              handler(card, Owner, localNegated);
            })
          );
        } else {
          handler(card, Owner, localNegated);
        }
      }
    });
  }, [turn]);

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
    setGameLog((prev) => [...prev, 'shuffled deck']);
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
  // this allows the players to draft the cards being shown to them
  const cardClick = (card: Card) => {
    // only do this during the draft phase.
    if (phase === 'draft') {
      const fullCard = cardLibrary.find((c) => c.id === card.id);
      if (!fullCard) return;
      // if the player is 1, clicking on the card will push it to their deck.
      if (activePlayer === 'Player 1') {
        const p1Deck = [...player1Deck];
        const toDeckTop: Card = {
          Name: card.Name,
          id: card.id,
          Owner: 'Player 1',
          Priority: card.Priority,
          Multiplier: 1,
          Text: fullCard.Text,
        };
        p1Deck.push(toDeckTop);
        setplayer1Deck(p1Deck);

        console.log(p1Deck, activePlayer, 'p1');
        // if the player is 2, clicking on the card will push it to their deck.
      } else if (activePlayer === 'Player 2') {
        const p2Deck = [...player2Deck];
        const toDeckTop: Card = {
          Name: card.Name,
          id: card.id,
          Owner: 'Player 2',
          Priority: card.Priority,
          Multiplier: 1,
          Text: fullCard.Text,
        };
        p2Deck.push(toDeckTop);
        setplayer2Deck(p2Deck);

        console.log(p2Deck, activePlayer, 'p2');
      }

      // removes the card that just got drafted from the draftArray
      if (card.id === 15) {
        setResourcefulDrafted(true);
        setGameLog((prev) => [
          ...prev,
          `${activePlayer} drafted Resourceful. The last card will be added to their deck, not discarded.`,
        ]);
      } else {
        setResourcefulDrafted(false);
      }
      setDraftArray((prev) => {
        const index = prev.indexOf(card.id);
        if (index === -1) return prev;
        return [...prev.slice(0, index), ...prev.slice(index + 1)];
      });
    }
  };
  // go to the next one
  const nextCards = () => {
    console.log(skippedPlayers instanceof Set);
    if (skippedPlayers.has('Player 1')) {
      console.log('removing negation from p1');
      setSkippedPlayers((prev) => {
        const next = new Set(prev);
        next.delete('Player 1');
        return next;
      });
    } else {
      const p1Top = player1Deck[player1Deck.length - 1];
      if (p1Top) {
        setplayZone1((prev) => [...prev, p1Top]);
        setplayer1Deck((prev) => prev.slice(0, -1));
      }
    

    if (skippedPlayers.has('Player 2')) {
      setSkippedPlayers((prev) => {
        console.log('removing negation from p2');
        const next = new Set(prev);
        next.delete('Player 2');
        console.log(next);
        return next;
      });
    } else {
      const p2Top = player2Deck[player2Deck.length - 1];
      if (p2Top) {
        setplayZone2((prev) => [...prev, p2Top]);
        setplayer2Deck((prev) => prev.slice(0, -1));
      }
    }

    setTurn((t) => t + 1);
  };

  const clearNegation = (Owner: 'Player 1' | 'Player 2') => {
    setNegatedPlayers((prev) => {
      const updated = new Set(prev);
      updated.delete(Owner);
      return updated;
    });
  };
  const handleInteractionComplete = (result: any) => {
    const { card, Owner, context } = playInteraction[0];

    if (card.Name === 'Impulsive') {
      const selectedCard = result?.[0];
      const unselected = context.topTwoIds.find(
        (c: Card) => c.id !== selectedCard.id
      );
      if (selectedCard) {
        if (Owner === 'Player 1') {
          setplayer1Deck((prev) => [
            ...prev.slice(0, -2),
            ...(unselected ? [unselected] : []),
          ]);
          setplayZone1((prev) => [...prev, selectedCard]);
        } else {
          setplayer2Deck((prev) => [
            ...prev.slice(0, -2),
            ...(unselected ? [unselected] : []),
          ]);
          setplayZone2((prev) => [...prev, selectedCard]);
        }

        setGameLog((prev) => [
          ...prev,
          `${Owner} played ${selectedCard.Name} using Impulsive.`,
        ]);
      }
    } else if (
      card.Name === 'Weave' &&
      Array.isArray(result) &&
      result.every((r: any) => typeof r.id === 'number')
    ) {
      const reorderedCards = result as Card[];
      const sliceSize = reorderedCards.length;

      if (Owner === 'Player 1') {
        setplayer1Deck((prev) => {
          const rest = prev.slice(0, prev.length - sliceSize);
          return [...rest, ...reorderedCards];
        });
      } else {
        setplayer2Deck((prev) => {
          const rest = prev.slice(0, prev.length - sliceSize);
          return [...rest, ...reorderedCards];
        });
      }

      setGameLog((prev) => [
        ...prev,
        `${Owner} wove the top ${sliceSize} cards of their deck.`,
      ]);
    } else if (
      card.Name === 'Indecisive' &&
      Array.isArray(result) &&
      result.length === 1
    ) {
      const selectedCard = result[0] as Card;

      if (Owner === 'Player 1') {
        setplayer1Deck((prev) => [...prev, selectedCard]);
      } else {
        setplayer2Deck((prev) => [...prev, selectedCard]);
      }

      setGameLog((prev) => [
        ...prev,
        `Indecisive added ${selectedCard.Name} to ${Owner}'s deck.`,
      ]);
    } else if (
      card.Name === 'Nostalgic' &&
      Array.isArray(result) &&
      result.length === 1
    ) {
      const selectedCard = result[0] as Card;

      setGameLog((prev) => [
        ...prev,
        `${Owner} replayed ${selectedCard.Name} using Nostalgic.`,
      ]);
    }

    setPlayInteraction((prev) => prev.slice(1));
    const resolver = modalResolvers.current.pop();
    if (resolver) resolver();
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
      {gameLogOverlay === 'Off' && (
        <button onClick={() => setGameLogOverlay('On')}>Game Log</button>
      )}
      {gameLogOverlay === 'On' && (
        <GameLog gameLog={gameLog} onClose={() => setGameLogOverlay('Off')} />
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
            resourcefulDrafted={resourcefulDrafted}
          />
        ) : (
          <PlayBoard
            onComplete={handleInteractionComplete}
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
            effectHandlers={effectHandlers}
            nextCards={() => nextCards()}
          />
        )}
      </>
    </div>
  );
}

export default App;
