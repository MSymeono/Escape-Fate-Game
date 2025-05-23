import './gameLog.css';

const GameLog = ({ onClose, gameLog }: { onClose: () => void; log: string[] }) => {
  return (
    <div className="game-log">
      <div className="game-log-content">
        <h2>Game Log</h2>
        <ul>
          {gameLog.map((entry:string, index:number) => (
            <li key={index}>
              {entry}
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Hide Log</button>
      </div>
    </div>
  );
};

export default GameLog;
