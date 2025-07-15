import './cardList.css'


const CardList = ({ onClose, cardLibrary }: { onClose: () => void }) => {
    return (
      <div className="card-list">
        <div className="card-content">
          <h2>Card list</h2>
            <ul>
                {cardLibrary.map(card => (
                <li key={card.id}>
                {card.Name}
                {card.Priority !== null && ` (Priority: ${card.Priority})`}
                <ul>
                    <li>{card.Text}</li>
                </ul>
                </li>
            ))}
            </ul>
          <button onClick={onClose}>Hide Card List</button>
        </div>
      </div>
    );
  };
  
  export default CardList;