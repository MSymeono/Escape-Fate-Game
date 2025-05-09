import CardBack from './assets/CardBack.png'
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
        <div className="card-container">
          <div className="card-inner">
            <div className="card-front" onClick={onClick}>
              <h3>{card.Name}</h3>
              <p>{card.Text}</p>
              <p>{card.Priority}</p>
            </div>
            <div className="card-back">
              <img src={CardBack} alt="card back" />
            </div>
          </div>
        </div>
      );
    }
  
    if (phase === 'play'){
    return (
      <div className="card-container card-play">
        <div className="card-face">
          <h3>{card.Name}</h3>
          <p className="card-text">{card.Text}</p>
          <div className="card-hover-details">
            <p>Priority: {card.Priority ?? '—'}</p>
            {/* Add more details here if you want */}
          </div>
        </div>
      </div>
    );}
  };
  

  export default Card