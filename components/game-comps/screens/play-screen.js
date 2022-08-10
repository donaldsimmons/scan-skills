import React, { useState, useEffect, useRef } from 'react';
import PauseScreen from './pause-screen';
import PauseButton from '../../buttons/pause-button';

export default function PlayScreen(props) {
  const [paused, setPaused] = useState(false);
  const [countdownActive, setCountdownActive] = useState(true);
  const [repCount, setRepCount] = useState(0);
  const timers = useRef({
    "initialTimer": "",
    "countdawnTimer": "",
    "recursionTimer": "",
    "colorSwitchTimer": ""
  });
  const colors = useRef({
    "previous": "",
    "current": ""
  });
  const docElements = useRef({
    "screen": "",
    "pauseIcon": "",
  });

  useEffect(() => {
    docElements.current["screen"] = document.getElementById("play-screen");
    docElements.current["pauseIcon"] = document.getElementById("pause-button").getElementsByTagName("svg")[0];

    startCountdown();

    timers.current["initialTimer"] = setTimeout(() => {
      colors.current["previous"] = "white"
      colors.current["current"] = pickColor();
      setColor();
      playGame();
    }, 2000);
  }, []);

  const togglePause = () => {
    if(paused) {
      setPaused(false);
      playGame();
    } else {
      setPaused(true);
      stopTimers();
      return(false);
    };
  }

  const startCountdown = () => {
    const cdTimer = document.getElementById("countdown-area").getElementsByTagName("h1")[0];
    let secondsRemaining = 3;
    timers.current["countdownTimer"] = setInterval(() => {
      if(secondsRemaining == 1) {
        setCountdownActive(false);
        clearInterval(timers.current["countdownTimer"]);
      } else {
        cdTimer.innerHTML = secondsRemaining -= 1;
      }
    }, 1000);
  }

  const pickColor = () => {
    const colorIndex = Math.floor(Math.random() * (5-0 + 1) + 0);
    const colors = ["blue", "red", "yellow", "green", "purple", "orange"];
    return colors[colorIndex];
  }

  const setColor = () => {
    docElements.current["screen"].classList.replace("bg-"+colors.current["previous"], "bg-"+colors.current["current"]);
    docElements.current["pauseIcon"].setAttribute("style", "background-color: "+colors.current["current"]);
  }

  const playGame = () => {
    colors.current["previous"] = colors.current["current"];
    colors.current["current"] = "white";
    setColor();

    gameTimer();
  };

  const gameTimer = () => {
    timers.current["colorSwitchTimer"] = setTimeout(() => {
      colors.current["previous"] = "white";
      colors.current["current"] = pickColor();
      setColor();
      setRepCount(repCount+=1);
    }, 1000);

    timers.current["recursionTimer"] = setTimeout(() => {
      if(repCount < props.totalReps) {
        playGame();
      };
    }, props.timeInterval*1000);
  };

  const stopTimers = () => {
    clearInterval(timers.current["countdownTimer"]);
    clearTimeout(timers.current["initialTimer"]);
    clearTimeout(timers.current["recursionTimer"]);
    clearTimeout(timers.current["colorSwitchTimer"]);
  }

  const displayCountdown = (countdownActive) => {
    if(countdownActive) {
      return(
        <div id="countdown-area">
          <h1>3</h1>
        </div>
      );
    };
  };

  const displayPauseScreen = (isPaused) => {
    if(isPaused) {
      return <PauseScreen currentReps={repCount} totalReps={props.totalReps} timeInterval={props.timeInterval} togglePause={togglePause} quitGame={props.quitGame} />
    };
  };

  return(
    <div id="play-screen" className="game-screen bg-white">
      <h2 className="reps game-text">{repCount + " / " + props.totalReps}</h2>
      <div id="game-button-area">
        <PauseButton className="game-button game-text" onClick={togglePause} />
      </div>
      {displayCountdown(countdownActive)}
      {displayPauseScreen(paused)}
    </div>
  );
};
