import './rulesOverlay.css'


const RulesOverlay = ({ onClose }: { onClose: () => void }) => {
    return (
      <div className="rules-overlay">
        <div className="rules-content">
          <h2>Game Rules</h2>
          <ul>
            <li>Blahblahblah</li>
            <li>Blahblahblah</li>
            <li>Blahblahblah</li>
            {/* Add more here */}
          </ul>
          <button onClick={onClose}>Hide Rules</button>
        </div>
      </div>
    );
  };
  
  export default RulesOverlay;
  