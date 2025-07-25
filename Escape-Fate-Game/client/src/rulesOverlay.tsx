import './rulesOverlay.css'


const RulesOverlay = ({ onClose, phase }: { onClose: () => void; phase: string }) => {
    return (
      <div className="rules-overlay">
        <div className="rules-content">
          <h1>Game Rules</h1>
          <div className="rules-scrollable">
            <h2>The game is played in two phases: a draft phase and a play phase.</h2>
            <h3>Draft Phase</h3>
            <h4>Players take turns drafting cards from the draft pool in an S fashion (player 1 drafts a card, then player 2 drafts a card, then player 2 drafts a card, then player 1 drafts a card, etc.).</h4>
            <ul>
              <li>Player 1 draws 3 cards from the draft pool, picks one, and passes the other two cards to Player 2.</li>
              <li>Player 2 picks a card and discards the last card.</li>
              <li>Player 2 then draws three new cards from the draft pool to begin the next draft cycle.</li>
            </ul>
            <h4>When a card is selected, it is placed into that player's deck in order. Therefore, the first card drafted is placed on the bottom of their deck, and the last card drafted is placed on the top of their deck.</h4>
            <h4>Drafting continues until no cards remain in the draft pool.</h4>
            <h4>After drafting has concluded, three additional cards are added to each player's deck:</h4>
            <ul>
              <li>CUT is placed on the bottom of the player's deck.</li>
              <li>MEASURE is placed second from the top of the player's deck</li>
              <li>WEAVE is placed on top of the player's deck</li>
            </ul>

            <h3>Play Phase</h3>
            <ul>
              <li>Each turn, each player plays the top card of their deck at the same time.</li>
              <li>The function of each card resolves in order of the card's priority.</li>
              <li>Turns continue until a CUT card is either played or discarded from a player's deck.</li>
              <li>The game is over when a player plays a CUT card (loss), or discards a CUT card (win).</li>
              <li>If both players play or discard their CUT card at the same time, the game ends in a draw.</li>

            </ul>
          </div>
          <button onClick={onClose}>Hide Rules</button>
        </div>
      </div>
    );
  };
  
  export default RulesOverlay;
  