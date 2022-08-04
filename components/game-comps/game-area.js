import React, { useState } from 'react';
import StartGameScreen from './screens/start-game-screen';
import PlayScreen from './screens/play-screen';

export default function GameArea(props) {
  /* 
    TODO: props.time-interval from parent "settings": track int between changes
  */

  const [started, setStarted] = useState(false);

  const startGame = () => {
    if(started) {
      setStarted(false);
    } else {
      setStarted(true);
    };
  };

  const displayGameScreen = (isStarted) => {
    let gameScreen;
    if(isStarted) {
      gameScreen = <PlayScreen gameMode={props.gameMode} quitGame={startGame} />
    } else {
      gameScreen = <StartGameScreen gameMode={props.gameMode} startGame={startGame} />
    };
    return gameScreen;
  };

  return(
    <div id="game-area">
      {displayGameScreen(started)}
    </div>
  );
};
