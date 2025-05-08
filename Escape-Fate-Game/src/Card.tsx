type CardProps = {
    card: CardType;
    onClick?: () => void;
    isSelected?: boolean;
    zone?: "draft" | "player1Deck" | "player2Deck" | "board";
  };
  
  const Card = ({ card, onClick, isSelected, zone }: CardProps) => {
    // Handle styles and click behavior based on zone/props
    return (
      <div className={`card ${zone} ${isSelected ? "selected" : ""}`} onClick={onClick}>
        <h3>{card.Name}</h3>
        <p>{card.Text}</p>
      </div>
    );
  };

  export default Card