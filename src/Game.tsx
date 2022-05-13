import { useState, useEffect } from 'react';

import Square from "./Square";

type Scores = {
  [key: string]: number;
}

const INITIAL_GAME_STATE = ["", "", "", "", "", "", "", "", ""];
const INITIAL_SCORES:Scores = { X: 0, O: 0 };

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
  const [scores, setScores] = useState(INITIAL_SCORES);

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
    const storedScores = localStorage.getItem("scores");
    if (storedScores) {
      setScores(JSON.parse(storedScores));
    } 
  }, []);

  useEffect(() => {
    if (gameState === INITIAL_GAME_STATE) {
      return;
    }
    checkForWinner();
    changePlayer();
  }, gameState);

  const resetBoard = () => setGameState(INITIAL_GAME_STATE);

  const handleWin = () => {
    window.alert(`Congratulations for player ${currentPlayer}! You won!`);
    resetBoard();
    const newPlayerScore = scores[currentPlayer] + 1;
    const newScores = { ...scores };
    newScores[currentPlayer] = newPlayerScore;
    setScores(newScores);
    localStorage.setItem("scores", JSON.stringify(newScores));
  }

  const handleDraw = () => {
    window.alert("The game ended in a draw!");
    resetBoard();
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
      <div className='mx-auto w-96 text-2xl text-serif text-white mt-5'>
        <p>Next Player: <span>{currentPlayer}</span></p>
        <p>Player X won <span>{scores["X"]}</span> times!</p>
        <p>Player O won <span>{scores["O"]}</span> times!</p>
      </div>
    </div>
    
  );
}

export default Game;