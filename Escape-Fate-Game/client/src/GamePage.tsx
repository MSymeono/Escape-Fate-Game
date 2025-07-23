import { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// @ts-ignore: If GamePage.css does not exist, ignore this import error
import './GamePage.css';
import Card from './Card';
import DraftBoard from './draftBoard';
import PlayBoard from './playBoard';
import RulesOverlay from './rulesOverlay';
import CardList from './cardList';
import GameLog from './gameLog';
import socket from './socket';

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
  Owner: 'Player 1' | 'Player 2',
  negatedPlayers: Set<'Player 1' | 'Player 2'>,
  playerDecks: { Deck1: Card[]; Deck2: Card[] },
  otherCard?: Card
) => void;

interface GamePageProps {
  name: string;
}

const initialDraftState: {
  deckArray: number[];
  draftArray: number[];
  activePlayer: 'Player 1' | 'Player 2';
  resourcefulDrafted: null | 'Player 1' | 'Player 2';
} = {
  deckArray: [3, 3, 12, 14, 8, 10, 10, 10, 10, 11, 14, 15, 16, 18, 2, 1, 19, 17, 13, 9, 7, 4, 6, 5],
  draftArray: [],
  activePlayer: 'Player 1',
  resourcefulDrafted: null,
};

const GamePage: React.FC<GamePageProps> = ({ name }) => {
  const { lobbyId } = useParams<{ lobbyId: string }>();
  const navigate = useNavigate();

  // library of cards in the game. Shows Name, Text, Priority, Quantity, and the ID for each card.
  const cardLibrary = [
    {
      Name: 'Chaotic',
      Text: `Take the cards first from the bottom of each player's deck and put them on top.`,
      id: 1,
      Quantity: 1,
      Priority: 11,
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
      Text: 'Play a card at random from the top 2 of your deck. Put the other back.',
      id: 4,
      Quantity: 1,
      Priority: 6,
      Modal: true,
    },
    {
      Name: 'Indecisive',
      Text: `Go through the discard pile and put a card from among them on top of your deck.`,
      id: 5,
      Quantity: 1,
      Priority: 3,
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
      Priority: 9,
      Modal: false,
    },
    {
      Name: 'Nostalgic',
      Text: `Retrigger the effect of the last card you played (use its priority).`,
      id: 9,
      Quantity: 1,
      Priority: null,
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
      Priority: 5,
      Modal: false,
    },
    {
      Name: 'Powerful',
      Text: `Play the top 2 cards of your deck.`,
      id: 12,
      Quantity: 1,
      Priority: 7,
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
      Priority: 4,
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
      Priority: 15,
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
      Priority: 10,
      Modal: false,
    },
    {
      Name: 'Weave',
      Text: `Look at the top 3 cards of your deck and put them back in any order.`,
      id: 20,
      Quantity: 2,
      Priority: 2,
      Modal: true,
    },
    {
      Name: 'Measure',
      Text: `Count the remaining cards in both decks. If your opponent has more, discard the top card of their deck. It has no effect.`,
      id: 21,
      Quantity: 2,
      Priority: 8,
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
    3, 3, 12, 14, 8, 10, 10, 10, 10, 11, 14, 15, 16, 18, 2, 1, 19, 17, 13, 9, 7,
    4, 6, 5,
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
    {
      Name: 'Cut',
      id: 22,
      Owner: 'Player 1',
      Priority: 16,
      Multiplier: 1,
      Text: 'You Lose.',
    },
  ]);
  const [player2Deck, setplayer2Deck] = useState<Card[]>([
    {
      Name: 'Cut',
      id: 22,
      Owner: 'Player 2',
      Priority: 16,
      Multiplier: 1,
      Text: 'You Lose.',
    },
  ]);
  const [cardsPlayedLastTurn, setCardsPlayedLastTurn] = useState<Card[]>([]);
  // this controls which phase of the game we are in to help with rendering.
  const [phase, setPhase] = useState('draft');
  //rules and cardsList below are two overlays that respectively show the rules and the full list of cards.
  const [rules, setRules] = useState<'On' | 'Off'>('Off');
  const [cardsList, setCardList] = useState<'On' | 'Off'>('Off');
  const [gameLogOverlay, setGameLogOverlay] = useState<'On' | 'Off'>('Off');
  const [gameLog, setGameLog] = useState<string[]>([]);
  const [resourcefulDrafted, setResourcefulDrafted] = useState<null | 'Player 1' | 'Player 2'>(null);

  const [turn, setTurn] = useState<number>(1);

  const [negatedPlayers, setNegatedPlayers] = useState<
    Set<'Player 1' | 'Player 2'>
  >(new Set());
  const [doubledPlayers, setDoubledPlayers] = useState<
    Set<'Player 1' | 'Player 2'>
  >(new Set());
  const [quadrupledPlayers, setQuadrupledPlayers] = useState<
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
          Priority: 8,
          Multiplier: 1,
          Text: `Count the remaining cards in both decks. If your opponent has more, discard the top card of their deck. It has no effect.`,
        },
        {
          id: 20,
          Owner: 'Player 1',
          Name: 'Weave',
          Priority: 2,
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
          Priority: 8,
          Multiplier: 1,
          Text: `Count the remaining cards in both decks. If your opponent has more, discard the top card of their deck. It has no effect.`,
        },
        {
          id: 20,
          Owner: 'Player 2',
          Name: 'Weave',
          Priority: 2,
          Multiplier: 1,
          Text: `Look at the top 3 cards of your deck and put them back in any order.`,
        },
      ]);
    }
  }, [phase]);

  // useEffect(() => {
  //   console.log('we are in skipped players', skippedPlayers);
  // }, [skippedPlayers]);

  useEffect(() => {
    // console.log('skippedPlayers', skippedPlayers);
    // console.log('p1top', player1Deck[player1Deck.length - 1]);
    // console.log('p2top', player2Deck[player2Deck.length - 1]);
    if (playZone1[playZone1.length - 1]) {
      // console.log('Pz1 Owner', playZone1[playZone1.length - 1].Owner);
    }
    if (playZone2[playZone2.length - 1]) {
      // console.log('Pz2 Owner', playZone2[playZone2.length - 1].Owner);
    }
  }, [playZone1, playZone2]);

 

  // useEffect(() => {
  //   console.log('Current playInteraction state:', playInteraction);
  // }, [playInteraction]);

  const clearNegation = (Owner: 'Player 1' | 'Player 2') => {
    setNegatedPlayers((prev) => {
      const updated = new Set(prev);
      updated.delete(Owner);
      return updated;
    });
  };
  const effectHandlers: {
    [key: number]: EffectHandler;
  } = {
    //chaotic
    1: (card, Owner, localNegated, playerDecks) => {
      // testing Return so we can isolate issues
      // return;
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }
      const p1Deck = [...playerDecks.Deck1];
      const p2Deck = [...playerDecks.Deck2];
      // console.log(
      //   1,
      //   player1Deck[player1Deck.length - 1],
      //   'p1',
      //   player2Deck[player2Deck.length - 1],
      //   'p2'
      // );
      const p1Second = p1Deck[1];
      const p2Second = p2Deck[1];
      let message = 'Chaotic moved a card to the top of the deck for ';
      if (p1Second) {
        p1Deck.splice(1, 1);
        p1Deck.push(p1Second);
        message += 'Player 1';
      }

      if (p2Second) {
        p2Deck.splice(1, 1);
        p2Deck.push(p2Second);
        if (p1Second) {
          message += ' and Player 2';
        } else {
          message += 'Player 2';
        }
        message += '.';
      }
      playerDecks.Deck1 = p1Deck;
      playerDecks.Deck2 = p2Deck;
      // console.log(
      //   2,
      //   player1Deck[player1Deck.length - 1],
      //   'p1',
      //   player2Deck[player2Deck.length - 1],
      //   'p2'
      // );
      if (p1Second || p2Second) {
        syncGameLog([...gameLog, message]);
      }
    },
    // Covetous
    2: (card, Owner, localNegated, playerDecks) => {
      // testing Return so we can isolate issues
      // return;
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }
      const target = Owner === 'Player 1' ? 'Player2' : 'Player 1';
      if (Owner === 'Player 1') {
        const targetZone = [...playZone2];
        let index = targetZone.length - 2;
        for (let i = 0; i < targetZone.length - 1; i++) {
          if (targetZone[i].Name === cardsPlayedLastTurn[1].Name) {
            index = i;
            break;
          }
        }
        if (index < 0) return;

        const stolen = targetZone[index];
        stolen.Owner = Owner;
        syncGameLog([
          ...gameLog,
          `${Owner} stole ${target}'s ${stolen.Name} using Covetous.`,
        ]);
        playerDecks.Deck1.push(stolen);
        // setplayer1Deck((deck) => [...deck, stolen]);
        setplayZone2((prev) => prev.filter((_, i) => i !== index));
        // setNegatedPlayers((neg) => new Set(neg).add('Player 1'));
      }

      if (Owner === 'Player 2') {
        const targetZone = [...playZone1];
        let index = targetZone.length - 2;
        for (let i = 0; i < targetZone.length - 1; i++) {
          if (targetZone[i].Name === cardsPlayedLastTurn[0].Name) {
            index = i;
            break;
          }
        }
        if (index < 0) return;

        const stolen = targetZone[index];
        stolen.Owner = Owner;
        syncGameLog([
          ...gameLog,
          `${Owner} stole ${target}'s ${stolen.Name} using Covetous.`,
        ]);
        playerDecks.Deck2.push(stolen);
        // setplayer2Deck((deck) => [...deck, stolen]);
        setplayZone1((prev) => prev.filter((_, i) => i !== index));
        // setNegatedPlayers((neg) => new Set(neg).add('Player 2'));
      }
    },
    //Deceitful
    3: (card, Owner, localNegated, playerDecks) => {
      // testing Return so we can isolate issues
      // return;
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }

      const top1 = playerDecks.Deck1[playerDecks.Deck1.length - 1];

      const top2 = playerDecks.Deck2[playerDecks.Deck2.length - 1];
      // console.log(top1, 'top1', top2, 'top2');
      if (!top1 && !top2) return;
      if (!top2 && top1) {
        top1.Owner = 'Player 2';
        playerDecks.Deck2.push(top1);
        playerDecks.Deck1.pop();
        // setplayer2Deck((prev) => [...prev, top1]);
        // setplayer1Deck((prev) => prev.slice(0, -1));
        syncGameLog([
          ...gameLog,
          `${Owner}'s deceitful moved Player 1's top card to the top of Player 2's deck.`,
        ]);
      } else if (!top1 && top2) {
        top2.Owner = 'Player 1';
        playerDecks.Deck1.push(top2);
        playerDecks.Deck2.pop();
        // setplayer1Deck((prev) => [...prev, top2]);
        // setplayer2Deck((prev) => prev.slice(0, -1));
        syncGameLog([
          ...gameLog,
          `${Owner}'s deceitful moved Player 2's top card to the top of Player 1's deck.`,
        ]);
      } else {
        top1.Owner = 'Player 2';
        top2.Owner = 'Player 1';
        playerDecks.Deck2[playerDecks.Deck2.length - 1] = top1;
        playerDecks.Deck1[playerDecks.Deck1.length - 1] = top2;

        // playerDecks.Deck1.slice(0, -1).push(top2);
        // playerDecks.Deck2.slice(0, -1).push(top1);
        // console.log(playerDecks.Deck1[playerDecks.Deck1.length - 1], 'p1top');
        // console.log(playerDecks.Deck2[playerDecks.Deck2.length - 1], 'p2top');
        // setplayer1Deck((prev) => [...prev.slice(0, -1), top2!]);
        // setplayer2Deck((prev) => [...prev.slice(0, -1), top1!]);
        syncGameLog([
          ...gameLog,
          `${Owner}'s deceitful swapped the top cards of each player's deck`,
        ]);
      }
    },
    //Impulsive
    4: (card, Owner, localNegated, playerDecks) => {
      // testing Return so we can isolate issues
      // return;
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }
      const p1Deck = [...playerDecks.Deck1];
      const p2Deck = [...playerDecks.Deck2];
      const targetDeck = Owner === 'Player 1' ? p1Deck : p2Deck;
      const random = Math.ceil(Math.random() * 2);

      const index =
        random === 2 && targetDeck.length >= 2
          ? targetDeck.length - 2
          : targetDeck.length - 1;
      const cardToPlay = targetDeck[index];
      // console.log(cardToPlay, random);

      if (Owner === 'Player 1') {
        p1Deck.splice(index, 1);
        // setplayer1Deck((prev) => prev.filter((_, i) => i !== index));
        setplayZone1((prev) => [...prev, cardToPlay]);
      } else {
        p2Deck.splice(index, 1);
        // setplayer2Deck((prev) => prev.filter((_, i) => i !== index));
        setplayZone2((prev) => [...prev, cardToPlay]);
      }
      // console.log('p1', p1Deck, playerDecks.Deck1);
      // console.log('p2', p2Deck, playerDecks.Deck2);
      playerDecks.Deck1 = p1Deck;
      playerDecks.Deck2 = p2Deck;
      const handler = effectHandlers[cardToPlay.id];
      if (handler) {
        syncGameLog([
          ...gameLog,
          `${Owner} played ${cardToPlay.Name} at random from the top 2 cards of their deck.`,
        ]);
        handler(cardToPlay, Owner, localNegated, playerDecks);
      }

      // keeping an old version of Impulsive here, but commented out.
      // const topTwoIds =
      //   Owner === 'Player 1' ? player1Deck.slice(-2) : player2Deck.slice(-2);

      // setPlayInteraction((prev) => [
      //   ...prev,
      //   {
      //     card,
      //     Owner,
      //     context: {
      //       topTwoIds,
      //     },
      //   },
      // ]);
    },
    //Indecisive
    5: (card, Owner, localNegated, playerDecks, otherCard) => {
      // testing Return so we can isolate issues
      // return;
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }
      setPlayInteraction((prev) => [
        ...prev,
        {
          card,
          Owner,
          context: { discardIds: discardPile },
          playerDecks: playerDecks,
          otherCard: otherCard,
        },
      ]);
    },
    //Irreverent
    6: (card, Owner, localNegated, playerDecks) => {
      // testing Return so we can isolate issues
      // return;
      if (localNegated.has(Owner)) return;
      const target = Owner === 'Player 1' ? 'Player 2' : 'Player 1';
      localNegated.add(target);
      const playZone = Owner === 'Player 1' ? playZone2 : playZone1;
      const cardName = playZone[playZone.length - 1].Name;
      syncGameLog([
        ...gameLog,
        ` ${Owner}'s Irreverent negated ${target}'s ${cardName}.`,
      ]);
    },
    //Free
    7: (card, Owner, localNegated, playerDecks) => {
      // testing Return so we can isolate issues
      // return;
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }
      setNegatedPlayers((prev) => new Set(prev).add(Owner));
      syncGameLog([
        ...gameLog,
        `${Owner}'s next card will have no effect.`,
      ]);
    },
    //Hasty
    8: (card, Owner, localNegated, playerDecks) => {
      // testing Return so we can isolate issues
      // return;
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }
      const top1 = playerDecks.Deck1[playerDecks.Deck1.length - 1];
      const top2 = playerDecks.Deck2[playerDecks.Deck2.length - 1];
      if (top1) {
        discard((prev) => [...prev, top1.id]);
        playerDecks.Deck1.pop();
        // setplayer1Deck((prev) => prev.slice(0, -1));
      }
      if (top2) {
        discard((prev) => [...prev, top2.id]);
        playerDecks.Deck2.pop();
        // setplayer2Deck((prev) => prev.slice(0, -1));
      }
      syncGameLog([
        ...gameLog,
        `Hasty discarded the top card of each player's deck.`,
      ]);
    },
    //Nostalgic
    9: (card, Owner, localNegated, playerDecks) => {
      //TODO: move this effect to the [turn] useEffect and just trigger that card. Nostalgic has no handler.
      // testing Return so we can isolate issues
      // return;
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }
      const playZone = Owner === 'Player 1' ? playZone1 : playZone2;
      let cardToTrigger: Card | undefined;

      for (let i = playZone.length - 1; i >= 0; i--) {
        if (playZone[i].Name === 'Nostalgic') {
          cardToTrigger = playZone[i - 1];
          break;
        }
      }
      if (!cardToTrigger) return;
      if (cardToTrigger.Name === 'Strategic') {
        setQuadrupledPlayers((prev) => new Set(prev).add(Owner));
      }

      const handler = effectHandlers[cardToTrigger.id];
      if (handler) {
        syncGameLog([
          ...gameLog,
          `${Owner} replayed ${cardToTrigger.Name} using Nostalgic.`,
        ]);
        handler(cardToTrigger, Owner, localNegated, playerDecks);
      }

      // commenting out a previous version of Nostalgic
      // const playZone = Owner === 'Player 1' ? playZone1 : playZone2;
      // const playedCards = playZone.filter((c) => c.id !== card.id);
      // setPlayInteraction((prev) => [
      //   ...prev,
      //   { card, Owner, context: { playedCards, otherCard } },
      // ]);
    },
    //Patient
    10: (card, Owner, localNegated, playerDecks) => {
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }
      return;
    },
    //Plunderous
    11: (card, Owner, localNegated, playerDecks) => {
      // testing Return so we can isolate issues
      // return;
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }

      const target = Owner === 'Player 1' ? 'Player 2' : 'Player 1';
      const targetDeck =
        target === 'Player 1' ? playerDecks.Deck1 : playerDecks.Deck2;
      const targetZone = target === 'Player 1' ? playZone2 : playZone1;
      const top = targetDeck[targetDeck.length - 1];

      if (top) {
        top.Owner = Owner;
        const handler = effectHandlers[top.id];
        // console.log(top, 'top1');
        syncGameLog([
          ...gameLog,
          `${Owner} plundered ${target}'s ${top.Name}`,
        ]);
        // console.log(top, 'top2');
        if (targetZone === playZone1) {
          setplayZone1((prev) => [...prev, top]);
          targetDeck.pop();
          // setplayer1Deck((prev) => prev.slice(0, -1));
        } else if (targetZone === playZone2) {
          setplayZone2((prev) => [...prev, top]);
          targetDeck.pop();
          // setplayer2Deck((prev) => prev.slice(0, -1));
        }
        handler(top, Owner, negatedPlayers, playerDecks);
        // console.log(top, 'top3');
      }
    },
    //Powerful
    12: (card, Owner, localNegated, playerDecks) => {
      // testing Return so we can isolate issues
      // return;
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }
      const deck = Owner === 'Player 1' ? playerDecks.Deck1 : playerDecks.Deck2;

      const topTwo = [...deck].slice(-2);
      // console.log(topTwo);
      topTwo.reverse().forEach((card) => {
        syncGameLog([
          ...gameLog,
          `${Owner} played ${card.Name} using Powerful.`,
        ]);
        const handler = effectHandlers[card.id];
        if (Owner === 'Player 1') {
          setplayZone1((prev) => [...prev, card]);
          playerDecks.Deck1.pop();
          // setplayer1Deck((prev) => prev.slice(0, -1));
        } else if (Owner === 'Player 2') {
          setplayZone2((prev) => [...prev, card]);
          playerDecks.Deck2.pop();
          // setplayer2Deck((prev) => prev.slice(0, -1));
        }
        handler(card, Owner, negatedPlayers, playerDecks);
      });
    },
    // Rapid
    13: (card, Owner, localNegated, playerDecks) => {
      // testing Return so we can isolate issues
      // return;
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }
      const target = Owner === 'Player 1' ? 'Player 2' : 'Player 1';
      setSkippedPlayers((prev) => new Set(prev).add(target));
      syncGameLog([
        ...gameLog,
        `${Owner} skipped ${target}'s next turn.`,
      ]);
    },
    // Reckless
    14: (card, Owner, localNegated, playerDecks) => {
      // testing Return so we can isolate issues
      // return;
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }

      const target: 'Player 1' | 'Player 2' =
        Owner === 'Player 1' ? 'Player 2' : 'Player 1';
      const targetDeck =
        target === 'Player 1' ? playerDecks.Deck1 : playerDecks.Deck2;
      const topCard = targetDeck[targetDeck.length - 1];
      const handler = effectHandlers[topCard.id];
      if (!topCard) return;
      syncGameLog([
        ...gameLog,
        `${Owner} forced ${target} to play ${topCard.Name} using Reckless.`,
      ]);
      handler(topCard, target, negatedPlayers, playerDecks);

      if (target === 'Player 1') {
        setplayZone1((prev) => [...prev, topCard]);
        playerDecks.Deck1.pop();
        // setplayer1Deck((prev) => prev.slice(0, -1));
      } else {
        setplayZone2((prev) => [...prev, topCard]);
        playerDecks.Deck2.pop();
        // setplayer2Deck((prev) => prev.slice(0, -1));
      }
    },
    //Resourceful
    15: (card, Owner, localNegated, playerDecks) => {
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }
      return;
    },
    //Strategic
    16: (card, Owner, localNegated, playerDecks) => {
      // testing Return so we can isolate issues
      // return;
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }
      setDoubledPlayers((prev) => new Set(prev).add(Owner));
      syncGameLog([
        ...gameLog,
        `${Owner}'s next card will be played twice.`,
      ]);
    },
    //Tempered
    17: (card, Owner, localNegated, playerDecks) => {
      // testing Return so we can isolate issues
      // return;
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }
      setSkippedPlayers((prev) => new Set(prev).add(Owner));
      syncGameLog([...gameLog, `${Owner} skipped their next turn.`]);
    },
    //Tranquil
    18: (card, Owner, localNegated, playerDecks) => {
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }

      if (Owner === 'Player 1') {
        const [toReturn, remaining] = partition(playZone1, (c) => c.id === 10);
        playerDecks.Deck1.push(...toReturn);
        // setplayer1Deck((prev) => [...prev, ...toReturn]);
        setplayZone1(remaining);
        const playCount = toReturn.length;
        // setNegatedPlayers((neg) => new Set(neg).add('Player 1'));
        syncGameLog([
          ...gameLog,
          `${Owner} put ${playCount} Patient cards on top of their deck.`,
        ]);
      }

      if (Owner === 'Player 2') {
        const [toReturn, remaining] = partition(playZone2, (c) => c.id === 10);
        playerDecks.Deck2.push(...toReturn);
        // setplayer2Deck((prev) => [...prev, ...toReturn]);
        setplayZone2(remaining);
        const playCount = toReturn.length;
        // setNegatedPlayers((neg) => new Set(neg).add('Player 2'));
        syncGameLog([
          ...gameLog,
          `${Owner} put ${playCount} Patient cards on top of their deck.`,
        ]);
      }
    },
    //Wisened
    19: (card, Owner, localNegated, playerDecks) => {
      // testing Return so we can isolate issues
      // return;
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }
      if (Owner === 'Player 1') {
        if (playZone1.length > playZone2.length) {
          discard((prev) => [
            ...prev,
            playerDecks.Deck2[playerDecks.Deck2.length - 1].id,
          ]);
          playerDecks.Deck1.pop();
          // setplayer2Deck((prev) => prev.slice(0, -1));
          syncGameLog([
            ...gameLog,
            `Player 1 discarded the top card of Player 2's deck using Wisened.`,
          ]);
        }
      }
      if (Owner === 'Player 2') {
        if (playZone2.length > playZone1.length) {
          discard((prev) => [
            ...prev,
            playerDecks.Deck1[playerDecks.Deck1.length - 1].id,
          ]);
          playerDecks.Deck1.pop();
          // setplayer1Deck((prev) => prev.slice(0, -1));
          syncGameLog([
            ...gameLog,
            `Player 2 discarded the top card of Player 1's deck using Wisened.`,
          ]);
        }
      }
      return;
    },
    //Weave
    20: (card, Owner, localNegated, playerDecks, otherCard) => {
      // console.log(playerDecks, 'weave EH');
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }
      const topThreeIds =
        Owner === 'Player 1' ? player1Deck.slice(-3) : player2Deck.slice(-3);

      setPlayInteraction((prev) => [
        ...prev,
        {
          card,
          Owner,
          context: { topThreeIds },
          otherCard: otherCard,
          playerDecks: playerDecks,
        },
      ]);
    },
    //Measure
    21: (card, Owner, localNegated, playerDecks) => {
      // testing Return so we can isolate issues
      // return;
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }
      if (Owner === 'Player 1') {
        if (playerDecks.Deck1.length < playerDecks.Deck2.length) {
          discard((prev) => [
            ...prev,
            playerDecks.Deck2[playerDecks.Deck2.length - 1].id,
          ]);
          playerDecks.Deck2.pop();
          // setplayer2Deck((prev) => prev.slice(0, -1));
          syncGameLog([
            ...gameLog,
            `Player 1 discarded the top card of Player 2's deck.`,
          ]);
        }
      }
      if (Owner === 'Player 2') {
        if (playerDecks.Deck2.length < playerDecks.Deck1.length) {
          discard((prev) => [
            ...prev,
            playerDecks.Deck1[playerDecks.Deck1.length - 1].id,
          ]);
          playerDecks.Deck1.pop();
          // setplayer1Deck((prev) => prev.slice(0, -1));
          syncGameLog([
            ...gameLog,
            `Player 2 discarded the top card of Player 1's deck.`,
          ]);
        }
      }
    },
    //Cut
    22: (card, Owner, localNegated, playerDecks) => {
      if (localNegated.has(Owner)) {
        clearNegation(Owner);
        return;
      }
      syncGameLog([...gameLog, `${Owner} has lost the game.`]);
    },
  };
  const modalResolvers = useRef<(() => void)[]>([]);

  useEffect(() => {
    if (phase !== 'play') return;
    if (playZone1.length === 0 || playZone2.length === 0) return;
    const playerDecks = { Deck1: [...player1Deck], Deck2: [...player2Deck] };
    const nextSkipped = new Set(skippedPlayers);
    const latestP2 = playZone2[playZone2.length - 1];
    const latestP1 = playZone1[playZone1.length - 1];
    const allPlayed: Card[] = [];
    const localNegated = new Set(negatedPlayers);

    if (skippedPlayers.has('Player 1')) {
      nextSkipped.delete('Player 1');
    } else if (latestP1) {
      allPlayed.push(latestP1);
    }

    if (skippedPlayers.has('Player 2')) {
      nextSkipped.delete('Player 2');
    } else if (latestP2) {
      allPlayed.push(latestP2);
    }
    setSkippedPlayers(nextSkipped);
    console.log('latestp1&2', latestP1, latestP2);
    if (latestP1.id === 9 || latestP2.id === 9) {
      const playZone = latestP1.id === 9 ? playZone1 : playZone2;
      let cardToTrigger: Card | undefined;

      for (let i = playZone.length - 1; i >= 0; i--) {
        if (playZone[i].Name === 'Nostalgic') {
          cardToTrigger = playZone[i - 1];
          break;
        }
      }
      if (latestP1.id === 9) {
        latestP1.Priority = cardToTrigger ? cardToTrigger.id : null;
      } else {
        latestP2.id = cardToTrigger!.id;
      }
    }
    if (
      ((latestP1.id === 5 || latestP1.id === 20) && latestP2.id !== 6) ||
      ((latestP2.id === 5 || latestP2.id === 20) && latestP1.id !== 6)
    ) {
      if (latestP1.id === 20 || latestP2.id === 20) {
        if (latestP1.id === 20 && latestP2.id === 20) {
          const handler = effectHandlers[20];
          // problem right now where the second call for weave is not getting the last known value of p1Deck because we're calling it with the old player Decks.
          handler(latestP1, latestP1.Owner!, localNegated, playerDecks);
          handler(latestP2, latestP2.Owner!, localNegated, playerDecks);
        } else {
          const card = latestP1.id === 20 ? latestP1 : latestP2;
          const otherCard = latestP1.id === 20 ? latestP2 : latestP1;
          const handler = effectHandlers[20];
          handler(card, card.Owner!, localNegated, playerDecks, otherCard);
        }
      } else if (latestP1.id === 5 || latestP2.id === 5) {
        const card = latestP1.id === 5 ? latestP1 : latestP2;
        const otherCard = latestP1.id === 5 ? latestP2 : latestP1;
        const handler = effectHandlers[5];
        handler(card, card.Owner!, localNegated, playerDecks, otherCard);
      }
      //edge case for an old version of nostalgic
      // const handler = effectHandlers[9];
      // const card = latestP1.id === 9 ? latestP1 : latestP2;
      // const otherCard = latestP1.id === 9 ? latestP2 : latestP1;
      // handler(card, card.Owner!, skippedPlayers, otherCard);
    } else {
      const sorted = allPlayed
        .map(({ id, Owner }) => {
          const card = cardLibrary.find((c) => c.id === id);
          return card ? { card, Owner } : null;
        })
        .filter(Boolean)
        .sort((a, b) => (a!.card.Priority ?? 99) - (b!.card.Priority ?? 99));

      const modalPromises: Promise<void>[] = [];

      (sorted as { card: any; Owner: any }[]).forEach(({ card, Owner }) => {
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
                handler(card, Owner, localNegated, playerDecks);
              })
            );
          } else {
            handler(card, Owner, localNegated, playerDecks);
          }
        }
      });
      // console.log(playerDecks, 'playerDecks');
      setplayer1Deck(playerDecks.Deck1);
      setplayer2Deck(playerDecks.Deck2);
    }
    // doing this so we can actually have Covetous take the card played last turn, rather than the most recent one. In order to do this, we'll use a card array and have Covetous always look at position 0 for p2, 1 for p1.
    if (latestP1 && latestP2) {
      setCardsPlayedLastTurn([latestP1, latestP2]);
    } else if (latestP1 && !latestP2) {
      setCardsPlayedLastTurn([
        latestP1,
        { Name: 'No Card', Text: 'no text', id: 0, Priority: null },
      ]);
    } else if (latestP2 && !latestP1) {
      setCardsPlayedLastTurn([
        { Name: 'No Card', Text: 'no text', id: 0, Priority: null },
        latestP2,
      ]);
    }
  }, [turn]);

  
  const [draftState, setDraftState] = useState(initialDraftState);

  useEffect(() => {
    if (!lobbyId) return;
    socket.emit('requestDraftState', { lobbyId });
    socket.on('draftStateSync', (state) => {
      setDraftState(state);
    });
    return () => {
      socket.off('draftStateSync');
    };
  }, [lobbyId]);



  const updateDraftState = (newState: typeof draftState) => {
    setDraftState(newState);
    socket.emit('draftStateUpdate', { lobbyId, draftState: newState });
  };


  const shuffle = () => {
    if (draftState.deckArray.length < 24) {
      return;
    }
    const tempArray = [...draftState.deckArray];
    for (let i = tempArray.length - 1; i >= 0; i--) {
      const tempPlace: number = Math.floor(Math.random() * 24);
      [tempArray[i], tempArray[tempPlace]] = [tempArray[tempPlace], tempArray[i]];
    }
    updateDraftState({ ...draftState, deckArray: tempArray });
    syncGameLog([...gameLog, `${name} shuffled the deck.`]);
  };

  const setPhaseSynced = (newPhase: string) => {
    setPhase(newPhase);
    if (lobbyId) {
      socket.emit('phaseUpdate', { lobbyId, phase: newPhase });
    }
  };

  const initializePlayPhase = () => {
    setplayer1Deck((prev) => [
      ...prev,
      {
        id: 21,
        Owner: 'Player 1',
        Name: 'Measure',
        Priority: 8,
        Multiplier: 1,
        Text: `Count the remaining cards in both decks. If your opponent has more, discard the top card of their deck. It has no effect.`,
      },
      {
        id: 20,
        Owner: 'Player 1',
        Name: 'Weave',
        Priority: 2,
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
        Priority: 8,
        Multiplier: 1,
        Text: `Count the remaining cards in both decks. If your opponent has more, discard the top card of their deck. It has no effect.`,
      },
      {
        id: 20,
        Owner: 'Player 2',
        Name: 'Weave',
        Priority: 2,
        Multiplier: 1,
        Text: `Look at the top 3 cards of your deck and put them back in any order.`,
      },
    ]);
  };

  useEffect(() => {
    if (!lobbyId) return;
    socket.emit('requestPhase', { lobbyId });
    const handler = (newPhase: string) => {
      setPhase(newPhase);
      if (newPhase === 'play') {
        initializePlayPhase();
      }
    };
    socket.on('phaseSync', handler);
    return () => {
      socket.off('phaseSync', handler);
    };
  }, [lobbyId]);

  const deal = () => {
    if (draftState.deckArray.length === 0 && draftState.draftArray.length === 0) {
      setPhaseSynced('play');
      return;
    }
    if (draftState.draftArray.length === 0 && draftState.deckArray.length > 0) {
      const tempdraftArray: number[] = [];
      const tempdeckArray = [...draftState.deckArray];
      while (tempdraftArray.length < 3 && tempdeckArray.length > 0) {
        tempdraftArray.push(tempdeckArray.shift()!);
      }
      updateDraftState({ ...draftState, draftArray: tempdraftArray, deckArray: tempdeckArray });
    }
  };

  const syncGameLog = (newLog: string[]) => {
    setGameLog(newLog);
    socket.emit('gameLogUpdate', { lobbyId, gameLog: newLog });
  };

  useEffect(() => {
    const handler = (newLog: string[]) => {
      setGameLog(newLog);
    };
    socket.on('gameLogSync', handler);
    return () => {
      socket.off('gameLogSync', handler);
    };
  }, [lobbyId]);

  const cardClick = (card: Card) => {

    if (phase === 'draft') {
      const fullCard = cardLibrary.find((c) => c.id === card.id);
      if (!fullCard) return;
      if (draftState.activePlayer === 'Player 1') {
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
      } else if (draftState.activePlayer === 'Player 2') {
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
      }

      const idx = draftState.draftArray.indexOf(card.id);
      const newDraftArray = [...draftState.draftArray];
      if (idx !== -1) newDraftArray.splice(idx, 1);
 // Card 15 is "resourceful". When drafted, it lets the player that drafted it also draft the 3rd card of that round, rather than it being discarded. This useEffect is doing 2 things. First, it, under "normal" conditions, discards the third card and resets the draftArray. Because this is where we do that, we also have an if check to see if card 15 got drafted. If so, instead of moving the 3rd card to the discard pile, we give it to that player.
      let newResourcefulDrafted = draftState.resourcefulDrafted;
      if (card.id === 15) {
        newResourcefulDrafted = draftState.activePlayer;
      }
      if (draftState.resourcefulDrafted && draftState.activePlayer === draftState.resourcefulDrafted) {
        newResourcefulDrafted = null;
      }
      if (newDraftArray.length === 2) {
  // This is our way of implementing the S/Snake draft style. Whenever the draftArray changes, we check if it has 2 cards in it and we swap the players if so. 3=>2 will always represent a change in player, while a 2=>3 jump should always retain the same player so whoever just picked can pick again.
        const newActivePlayer = draftState.activePlayer === 'Player 1' ? 'Player 2' : 'Player 1';
        updateDraftState({
          ...draftState,
          draftArray: newDraftArray,
          activePlayer: newActivePlayer,
          resourcefulDrafted: newResourcefulDrafted,
        });
      } else if (newDraftArray.length === 1) {
        const toDiscard = newDraftArray[0];
        const fullCard = cardLibrary.find((c) => c.id === toDiscard);
        const toTop: Card = {
          Name: fullCard!.Name,
          id: toDiscard,
          Text: fullCard!.Text,
          Priority: fullCard!.Priority,
          Multiplier: 1,
        };
        
        const p1Last = player1Deck[player1Deck.length - 1];
        const p2Last = player2Deck[player2Deck.length - 1];
        
        if (p1Last && p1Last.id === 15) {
          toTop.Owner = 'Player 1';
          setplayer1Deck((prev) => [...prev, toTop]);
        } else if (p2Last && p2Last.id === 15) {
          toTop.Owner = 'Player 2';
          setplayer2Deck((prev) => [...prev, toTop]);
        } else {
          discard((prev) => [...prev, toDiscard]);
        }
        
        updateDraftState({
          ...draftState,
          draftArray: [],
          activePlayer: draftState.activePlayer,
          resourcefulDrafted: newResourcefulDrafted,
        });
      } else if (newDraftArray.length === 0 && draftState.resourcefulDrafted) {
        updateDraftState({
          ...draftState,
          draftArray: [],
          activePlayer: draftState.activePlayer,
          resourcefulDrafted: newResourcefulDrafted,
        });
      }
      
      if (card.id === 15) {
        syncGameLog([
          ...gameLog,
          `${draftState.activePlayer} drafted Resourceful. The last card will be added to their deck, not discarded.`,
        ]);
      }
    }
  };
  // go to the next one
  const nextCards = () => {
    if (!skippedPlayers.has('Player 1')) {
      const p1Top = player1Deck[player1Deck.length - 1];
      if (p1Top) {
        // console.log('p1top', p1Top);
        setplayZone1((prev) => [...prev, p1Top]);
        setplayer1Deck((prev) => prev.slice(0, -1));
      }
    }
    if (!skippedPlayers.has(`Player 2`)) {
      const p2Top = player2Deck[player2Deck.length - 1];
      if (p2Top) {
        // console.log('p2top', p2Top);
        setplayZone2((prev) => [...prev, p2Top]);
        setplayer2Deck((prev) => prev.slice(0, -1));
      }
      // console.log('test')
    }
    setTurn((t) => t + 1);
  };

  const handleInteractionComplete = (
    result: any,
    otherCard: Card,
    playerDeck: string
    // playerDecks: { Deck1: Card[]; Deck2: Card[] }
  ) => {
    const playerDecks = JSON.parse(playerDeck);
    const { card, Owner, context } = playInteraction[0];
    // if (otherCard) {
    //     const sorted: Card[] = [selectedCard, otherCard];
    //     sorted.sort((a, b) => (a!.Priority ?? 99) - (b!.Priority ?? 99));
    //     const localNegated = new Set(negatedPlayers);
    //     const modalPromises: Promise<void>[] = [];
    //     sorted.forEach(({ card, Owner }) => {
    //       const handler = effectHandlers[card.id];
    //       if (!handler) return;
    //       const timesToRun = doubledPlayers.has(Owner!) ? 2 : 1;
    //       if (doubledPlayers.has(Owner!)) {
    //         setDoubledPlayers((prev) => {
    //           const next = new Set(prev);
    //           next.delete(Owner!);
    //           return next;
    //         });
    //       }

    //       for (let i = 0; i < timesToRun; i++) {
    //         if (card.Modal) {
    //           modalPromises.push(
    //             new Promise((resolve) => {
    //               modalResolvers.current.push(resolve);
    //               handler(card, Owner!, localNegated);
    //             })
    //           );
    //         } else {
    //           handler(card, Owner!, localNegated);
    //         }
    //       }
    //     });
    //   } else {
    //     const handler = effectHandlers[selectedCard.id];
    //     handler(selectedCard, selectedCard.Owner!, negatedPlayers);
    //   }
    {
      if (
        card.Name === 'Weave' &&
        Array.isArray(result) &&
        result.every((r: any) => typeof r.id === 'number')
      ) {
        const Owner = result[0].Owner;
        // console.log(playerDecks, 'Weave HIC', result, 'Owner', Owner);
        const localNegated = new Set(negatedPlayers);
        const reorderedCards = result as Card[];
        // console.log(reorderedCards, 'top3');
        const sliceSize = reorderedCards.length;
        if (otherCard) {
          const handler = effectHandlers[otherCard.id];
          const sorted: number[] = [2, otherCard.Priority ?? 99];
          sorted.sort((a, b) => (a ?? 99) - (b ?? 99));
          for (let i = 0; i < sorted.length; i++) {
            if (sorted[i] === 2) {
              // console.log('we are in a stage of the for loop for id=2');
              if (Owner === 'Player 1') {
                // console.log(Owner);
                let p1Deck = playerDecks.Deck1.slice(
                  0,
                  playerDecks.Deck1.length - sliceSize
                );
                p1Deck = [...p1Deck, ...reorderedCards];
                // console.log(p1Deck, 'p1', playerDecks.Deck1);
                playerDecks.Deck1 = p1Deck;
                // setplayer1Deck((prev) => {
                //   const rest = prev.slice(0, prev.length - sliceSize);
                //   return [...rest, ...reorderedCards];
                // });
              } else {
                // console.log(Owner);
                let p2Deck = playerDecks.Deck2.slice(
                  0,
                  playerDecks.Deck2.length - sliceSize
                );
                p2Deck = [...p2Deck, ...reorderedCards];
                // console.log(p2Deck, 'p2', playerDecks.Deck2);
                playerDecks.Deck2 = p2Deck;

                // setplayer2Deck((prev) => {
                //   const rest = prev.slice(0, prev.length - sliceSize);
                //   return [...rest, ...reorderedCards];
                // });
              }
            } else {
              // console.log('we are in a stage of the for loop for id!=2');
              handler(otherCard, otherCard.Owner!, localNegated, playerDecks);
            }
          }
          setplayer1Deck(playerDecks.Deck1);
          setplayer2Deck(playerDecks.Deck2);
        } else {
          // console.log('we are in a stage of the for loop for id=2');
          if (Owner === 'Player 1') {
            // console.log(Owner);
            let p1Deck = playerDecks.Deck1.slice(
              0,
              playerDecks.Deck1.length - sliceSize
            );
            p1Deck = [...p1Deck, ...reorderedCards];
            playerDecks.Deck1 = [...p1Deck];
            // console.log(p1Deck, 'p1', playerDecks.Deck1);
            setplayer1Deck([...p1Deck]);
            // setplayer1Deck((prev) => {
            //   const rest = prev.slice(0, prev.length - sliceSize);
            //   return [...rest, ...reorderedCards];
            // });
          } else {
            // console.log(Owner);
            let p2Deck = playerDecks.Deck2.slice(
              0,
              playerDecks.Deck2.length - sliceSize
            );
            p2Deck = [...p2Deck, ...reorderedCards];
            playerDecks.Deck2 = p2Deck;
            // console.log(p2Deck, 'p2', playerDecks.Deck2);
            setplayer2Deck([...p2Deck]);
          }
        }
        // console.log('p1', playerDecks.Deck1, 'p2', playerDecks.Deck2);
        syncGameLog([
          ...gameLog,
          `${Owner} wove the top ${sliceSize} cards of their deck.`,
        ]);
      } else if (
        card.Name === 'Indecisive' &&
        Array.isArray(result) &&
        result.length === 1
      ) {
        const localNegated = new Set(negatedPlayers);
        // console.log(Owner);
        const selectedCard = result[0] as Card;
        selectedCard.Owner = Owner;
        if (otherCard) {
          const handler = effectHandlers[otherCard.id];
          const sorted: number[] = [3, otherCard.Priority ?? 99];
          sorted.sort((a, b) => (a ?? 99) - (b ?? 99));
          for (let i = 0; i < sorted.length; i++) {
            if (sorted[i] === 3) {
              if (Owner === 'Player 1') {
                playerDecks.Deck1.push(selectedCard);
                // setplayer1Deck((prev) => [...prev, selectedCard]);
              } else {
                playerDecks.Deck2.push(selectedCard);
                // setplayer2Deck((prev) => [...prev, selectedCard]);
              }

              syncGameLog([
                ...gameLog,
                `Indecisive put a card on top of ${Owner}'s deck.`,
              ]);
            } else {
              handler(otherCard, otherCard.Owner!, localNegated, playerDecks);
            }
          }
        } else {
          if (Owner === 'Player 1') {
            playerDecks.Deck1.push(selectedCard);
            // setplayer1Deck((prev) => [...prev, selectedCard]);
          } else {
            playerDecks.Deck2.push(selectedCard);
            // setplayer2Deck((prev) => [...prev, selectedCard]);
          }
        }
        const discardPileClone = discardPile.filter(
          (id) => id !== selectedCard.id
        );
        discard(discardPileClone);
      }
      setplayer1Deck(playerDecks.Deck1);
      setplayer2Deck(playerDecks.Deck2);
    }
    // } else if (card.Name === 'Nostalgic' && Array.isArray(result)) {
    //   const selectedCard: Card = result[0];
    //   const otherCard: Card = result[1];
    //   if (otherCard) {
    //     const sorted: Card[] = [selectedCard, otherCard];
    //     sorted.sort((a, b) => (a!.Priority ?? 99) - (b!.Priority ?? 99));
    //     const localNegated = new Set(negatedPlayers);
    //     const modalPromises: Promise<void>[] = [];
    //     sorted.forEach(({ card, Owner }) => {
    //       const handler = effectHandlers[card.id];
    //       if (!handler) return;
    //       const timesToRun = doubledPlayers.has(Owner!) ? 2 : 1;
    //       if (doubledPlayers.has(Owner!)) {
    //         setDoubledPlayers((prev) => {
    //           const next = new Set(prev);
    //           next.delete(Owner!);
    //           return next;
    //         });
    //       }

    //       for (let i = 0; i < timesToRun; i++) {
    //         if (card.Modal) {
    //           modalPromises.push(
    //             new Promise((resolve) => {
    //               modalResolvers.current.push(resolve);
    //               handler(card, Owner!, localNegated);
    //             })
    //           );
    //         } else {
    //           handler(card, Owner!, localNegated);
    //         }
    //       }
    //     });
    //   } else {
    //     const handler = effectHandlers[selectedCard.id];
    //     handler(selectedCard, selectedCard.Owner!, negatedPlayers);
    //   }
    //   setGameLog((prev) => [
    //     ...prev,
    //     `${Owner} replayed ${selectedCard.Name} using Nostalgic.`,
    //   ]);
    // const handler = effectHandlers[selectedCard.id];
    // handler(selectedCard, Owner, negatedPlayers)
    // this goes first
    // if (card.Name === 'Impulsive') {
    //   const selectedCard: Card = result?.[0];
    //   const unselected = context.topTwoIds.find(
    //     (c: Card) => c.id !== selectedCard.id
    //   );
    //   if (selectedCard) {
    //     if (Owner === 'Player 1') {
    //       setplayer1Deck((prev) => [
    //         ...prev.slice(0, -2),
    //         ...(unselected ? [unselected] : []),
    //       ]);
    //       setplayZone1((prev) => [...prev, selectedCard]);
    //     } else {
    //       setplayer2Deck((prev) => [
    //         ...prev.slice(0, -2),
    //         ...(unselected ? [unselected] : []),
    //       ]);
    //       setplayZone2((prev) => [...prev, selectedCard]);
    //     }
    //     const handler = effectHandlers[selectedCard.id];
    //     handler(selectedCard, Owner, negatedPlayers);
    //     setGameLog((prev) => [
    //       ...prev,
    //       `${Owner} played ${selectedCard.Name} using Impulsive.`,
    //     ]);
    //   }
    // } else
    setPlayInteraction((prev) => prev.slice(1));
    // console.log(playInteraction)
    const resolver = modalResolvers.current.pop();

    if (resolver) resolver();
    // setplayer1Deck(playerDecks.Deck1);
    // setplayer2Deck(playerDecks.Deck2);
  };

  
  const [myPlayerId, setMyPlayerId] = useState<'Player 1' | 'Player 2' | null>(null);
  const [hasJoined, setHasJoined] = useState(false);
  const hasJoinedRef = useRef(false);

  
  useEffect(() => {
    if (lobbyId && name && name.trim() !== '' && !hasJoined && !hasJoinedRef.current && socket.connected) {
      hasJoinedRef.current = true;
      setHasJoined(true);
      socket.emit('joinLobby', { lobbyId, name }, (response: any) => {
      });
    }
    
    return () => {
    };
  }, [lobbyId, name, hasJoined, socket.connected]);

  useEffect(() => {
    socket.on('assignPlayer', (playerId) => {
      setMyPlayerId(playerId);
    });
    return () => {
      socket.off('assignPlayer');
    };
  }, []);

  
  const [players, setPlayers] = useState<string[]>([]);
  const [lobbyFull, setLobbyFull] = useState(false);

  
  useEffect(() => {
    function handlePlayersUpdate(playerNames: string[]) {
      setPlayers(playerNames);
      if (playerNames.length > 2 && !playerNames.includes(name)) {
        setLobbyFull(true);
      } else {
        setLobbyFull(false);
      }
    }
    socket.on('playersUpdate', handlePlayersUpdate);
    return () => {
      socket.off('playersUpdate', handlePlayersUpdate);
    };
  }, [name]);

  useEffect(() => {
    if (lobbyId && hasJoined && draftState.deckArray.length === 24 && !draftState.draftArray.length) {
      socket.emit('draftStateUpdate', { lobbyId, draftState });
    }
  }, [lobbyId, hasJoined]);


  
  const opponent = players.find((p) => p !== name) || '';

  if (lobbyFull) {
    return (
      <div>
        <h2>Lobby: {lobbyId}</h2>
        <h3>Lobby is full or you are not a participant.</h3>
        <button onClick={() => navigate('/')}>Return to Lobby</button>
      </div>
    );
  }

  const buildPlayState = () => ({
    playZone1,
    playZone2,
    player1Deck,
    player2Deck,
    skippedPlayers: Array.from(skippedPlayers),
    doubledPlayers: Array.from(doubledPlayers),
    negatedPlayers: Array.from(negatedPlayers),
    quadrupledPlayers: Array.from(quadrupledPlayers),
    discardPile,
    turn,
    cardsPlayedLastTurn,
    playInteraction,
  });

  const applyPlayState = (playState: any) => {
    setplayZone1(playState.playZone1 || []);
    setplayZone2(playState.playZone2 || []);
    setplayer1Deck(playState.player1Deck || []);
    setplayer2Deck(playState.player2Deck || []);
    setSkippedPlayers(new Set(Array.isArray(playState.skippedPlayers) ? playState.skippedPlayers : []));
    setDoubledPlayers(new Set(Array.isArray(playState.doubledPlayers) ? playState.doubledPlayers : []));
    setNegatedPlayers(new Set(Array.isArray(playState.negatedPlayers) ? playState.negatedPlayers : []));
    setQuadrupledPlayers(new Set(Array.isArray(playState.quadrupledPlayers) ? playState.quadrupledPlayers : []));
    discard(playState.discardPile || []);
    setTurn(playState.turn || 1);
    setCardsPlayedLastTurn(playState.cardsPlayedLastTurn || []);
    setPlayInteraction(playState.playInteraction || []);
  };

  const emitPlayAction = (action: any) => {
    if (phase !== 'play' || !lobbyId) return;
    socket.emit('playAction', { lobbyId, action });
  };

  useEffect(() => {
    if (phase !== 'play' || !lobbyId) return;
    socket.emit('requestPlayState', { lobbyId });
    const handler = (playState: any) => {
      applyPlayState(playState);
    };
    socket.on('playStateSync', handler);
    return () => {
      socket.off('playStateSync', handler);
    };
  }, [phase, lobbyId]);

  useEffect(() => {
    if (phase !== 'play') return;
    emitPlayAction({
      playZone1,
      player1Deck,
      playZone2,
      player2Deck,
      skippedPlayers,
      doubledPlayers,
      negatedPlayers,
      quadrupledPlayers,
      discardPile,
      turn,
      cardsPlayedLastTurn,
      playInteraction,
    });
  }, [playZone1, playZone2, player1Deck, player2Deck, skippedPlayers, doubledPlayers, negatedPlayers, quadrupledPlayers, discardPile, turn, cardsPlayedLastTurn, playInteraction]);

  return (
    <div>
      <h2>Lobby: {lobbyId}</h2>
      <h3>Your Name: {name}</h3>
      {opponent && <h4>Opponent: {opponent}</h4>}
      <div>
        {players.length > 0 && (
          <div>
            <strong>Players in lobby:</strong> {players.join(', ')}
          </div>
        )}
      </div>
      {rules === 'Off' && <button onClick={() => setRules('On')}>Rules</button>}
      {rules === 'On' && <RulesOverlay onClose={() => setRules('Off')} />}

      {cardsList === 'Off' && (
        <button onClick={() => setCardList('On')}>Card List</button>
      )}
      {cardsList === 'On' && (
        <CardList
          onClose={() => setCardList('Off')}
        />
      )}
      {gameLogOverlay === 'Off' && (
        <button onClick={() => setGameLogOverlay('On')}>Game Log</button>
      )}
      {gameLogOverlay === 'On' && (
        <GameLog log={gameLog} onClose={() => setGameLogOverlay('Off')} />
      )}
      <>
        {phase === 'draft' ? (
          <DraftBoard
            activePlayer={draftState.activePlayer}
            deckArray={draftState.deckArray}
            draftArray={draftState.draftArray}
            cardLibrary={cardLibrary}
            onCardClick={cardClick} 
            onShuffle={shuffle}
            phase={phase}
            onDeal={deal}
            myPlayerId={myPlayerId}
            resourcefulDrafted={draftState.resourcefulDrafted}
          />
        ) : (
          <PlayBoard
            onComplete={handleInteractionComplete}
            negatedPlayers={negatedPlayers}
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
            myPlayerId={myPlayerId}
          />
        )}
      </>
    </div>
  );
}

export default GamePage; 