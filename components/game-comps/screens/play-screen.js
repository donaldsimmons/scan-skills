import React, { useState } from 'react';
import PauseScreen from './pause-screen';
import PauseButton from '../../buttons/pause-button';

export default function PlayScreen(props) {
  /*
    props.rep-count: received from parent
    shows proportion of done to total (display as done / total))

    props.time-interval: received from parent
    determines interval between color, letter, etc. changes
  */
  const [paused, setPaused] = useState(false);

  const togglePause = () => {
    if(paused) {
      setPaused(false);
    } else {
      setPaused(true);
    };
  }

  const displayPauseScreen = (isPaused) => {
    if(isPaused) {
      return <PauseScreen currentReps="14" totalReps="25" togglePause={togglePause} quitGame={props.quitGame} />
    };
  };

  return(
    <div id="play-screen" className="game-screen">
      <h2 className="rep-counter">14/25</h2>
      <div id="game-button-area">
        <PauseButton className="game-button" onClick={togglePause} />
      </div>
      {displayPauseScreen(paused)}
    </div>
  );
};
