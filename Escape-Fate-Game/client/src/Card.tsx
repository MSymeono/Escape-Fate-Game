import CardBack from '/BackofCard.png.png'
import './Card.css'
type CardProps = {
    card: CardType;
    onClick?: () => void;
    isSelected?: boolean;
    zone?: "draft" | "player1Deck" | "player2Deck" | "board";
  };
  
  const Card = ({ card, onClick, phase }: CardProps) => {
    if (phase === 'draft') {
      return (
        <div className={`card-container ${phase}`}>
          <div className={`card-inner ${phase}`}>
            <div className={`card-front ${phase}`} onClick={onClick}>
              <h3>{card.Name}</h3>
              <p>{card.Text}</p>
              <p>{card.Priority}</p>
            </div>
            <div className={`card-back ${phase}`}>
              <img src={CardBack} alt="card back" />
            </div>
          </div>
        </div>
      );
    }
  
    if (phase === 'play') {
      return (
        <div className={`card-container ${phase}`}>
          <div className={`card-inner ${phase}`}>
            <div className={`card-front ${phase}`}>
              <h3>{card.Name}</h3>
              <p className="card-text">{card.Text}</p>
              <div className="card-hover-details">
                {card.Priority !== null && (
                  <p>Priority: {card.Priority}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
  

  export default Card