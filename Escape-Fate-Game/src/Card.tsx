import CardBack from './assets/CardBack.png'
import './Card.css'
type CardProps = {
    card: CardType;
    onClick?: () => void;
    isSelected?: boolean;
    zone?: "draft" | "player1Deck" | "player2Deck" | "board";
  };
  
  const Card = ({ card, onClick }: CardProps) => {
    return (
      
      <div className="card-container">
      <div className="card-inner">
        <div className="card-front" onClick={onClick}>
          <h3>{card.Name}</h3>
          <p>{card.Text}</p>
        </div>
        <div className="card-back">
          <img src={CardBack} alt="card back" />
        </div>
      </div>
    </div>
    );
  };

  export default Card