import { useState, useEffect } from 'react';

import Square from "./Square";

const INITIAL_GAME_STATE = ["", "", "", "", "", "", "", "", ""];



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

  const checkForWinner = () => {

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