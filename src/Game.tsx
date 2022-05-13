import { useState, useEffect } from 'react';

import Square from "./Square";

const INITIAL_GAME_STATE = ["", "", "", "", "", "", "", "", ""];

const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function Game() {

  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const [currentPlayer, setCurrentPlayer] = useState("X");

  const handleCellClick = (event: any) => {
    const cellIndex = Number(event.target.getAttribute("data-cell-index"));
    const currentValue = gameState[cellIndex];
    if (currentValue) {
      return
    }
    const newValues = [...gameState];
    newValues[cellIndex] = currentPlayer;
    setGameState(newValues);
  };

  useEffect(() => {
    checkForWinner();
    changePlayer();
  }, gameState);

  const handleWin = () => {
    window.alert(`Congratulations for player ${currentPlayer}! You won!`);
  }

  const handleDraw = () => {
    window.alert("The game ended in a draw!");
  }

  const checkForWinner = () => {
    let roundWon = false;
    for (let i = 0; i < WINNING_COMBOS.length; i++) {
      const winCombo = WINNING_COMBOS[i];
      let a = gameState[winCombo[0]]
      let b = gameState[winCombo[1]]
      let c = gameState[winCombo[2]]

      if ([a, b, c].includes("")) {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }
    if (roundWon) {
      setTimeout(() => handleWin(), 500);
      return;
    }
    if (!gameState.includes("")) {
      setTimeout(() => handleDraw(), 500);
      return;
    }

  }

  const changePlayer = () => {
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  return (
    <div className="h-full p-8 text-slate-800 bg-gradient-to-r from-cyan-500 to-blue-500" onClick = {handleCellClick}>
      <h1 className="text-center text-5xl mb-4 font-display text-white">
      Tic Tac Toe Game
      </h1>
      <div className='grid grid-cols-3 gap-3 mx-auto w-96'>
        {gameState.map((player, index) => (
          <Square onClick={handleCellClick} key={index} {...{index, player}} />
        ))}
      </div>
      <div>Scores Go there</div>
    </div>
    
  );
}

export default Game;