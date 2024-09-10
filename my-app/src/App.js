import React, { useState } from 'react';
import Dado from './components/Dado';
import './App.css';

const rollDie = () => Math.floor(Math.random() * 6) + 1;
const checkWin = (total) => total === 7 || total === 11;

function App() {
  const [die1, setDie1] = useState(1);
  const [die2, setDie2] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);
  const [wins, setWins] = useState(0);
  const [totalRolls, setTotalRolls] = useState(0);

  const rollDice = () => {
    if (isCooldown) return;

    setIsRolling(true);
    setIsCooldown(true);

    let rollCount = 0;
    const maxRolls = 5;
    const interval = 100;

    const intervalId = setInterval(() => {
      const newDie1 = rollDie();
      const newDie2 = rollDie();
      setDie1(newDie1);
      setDie2(newDie2);
      rollCount++;

      if (rollCount >= maxRolls) {
        clearInterval(intervalId);
        setIsRolling(false);
        const sum = newDie1 + newDie2;
        setTotalRolls(prevTotal => prevTotal + 1);
        if (checkWin(sum)) {
          setWins(prevWins => prevWins + 1);
        }

        setTimeout(() => {
          setIsCooldown(false);
        }, 1000);
      }
    }, interval);
  };

  const winPercentage = totalRolls === 0 ? 0 : (wins / totalRolls) * 100;

  return (
    <div className="App">
      <h1>Jogo dos Dados</h1>
      <div className="dice">
        <Dado value={die1} isRolling={isRolling} />
        <Dado value={die2} isRolling={isRolling} />
      </div>
      <button onClick={rollDice} disabled={isCooldown}>
        {isCooldown ? 'Aguarde...' : 'Jogar'}
      </button>
      <div className="result">
        {isRolling ? <p>Rolando...</p> : (checkWin(die1 + die2) ? <p>Você ganhou!</p> : <p>Você perdeu!</p>)}
      </div>
      <div className="score">
        <p>Vitórias: {wins}</p>
        <p>Jogadas Totais: {totalRolls}</p>
        <p>Percentual de Vitórias: {winPercentage.toFixed(2)}%</p>
      </div>
    </div>
  );
}

export default App;
