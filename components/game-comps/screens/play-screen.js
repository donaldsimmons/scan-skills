import React, { useState, useEffect, useRef } from 'react';
import PauseScreen from './pause-screen';
import PauseButton from '../../buttons/pause-button';

export default function PlayScreen(props) {
  /* States w/ effects */
  const [paused, setPaused] = useState(false);
  const [pauseButtonHidden, setPauseButtonHidden] = useState(false);
  const [countdownActive, setCountdownActive] = useState(true);
  const [countdownValue, setCountdownValue] = useState(3);
  const [currentColor, setCurrentColor] = useState();
  const [repCount, setRepCount] = useState(0);
  /* Manages Timeouts to switch screen colors */
  const [onColorScreen, setOnColorScreen] = useState(false);
  const [onWhiteScreen, setOnWhiteScreen] = useState(true);

  /* Control-flow-only states */
  const [gameActive, setGameActive] = useState(false);
  const [resumed, setResumed] = useState(false);

  /* Ref to elements for style/content changes */
  const screenRef = useRef();
  const buttonRef = useRef();
  const countdownRef = useRef();

  useEffect(() => {
    startCountdown();
  }, []);

  useEffect(() => {
    if(gameActive) {
      if(paused) {
        setPauseButtonHidden(true);
        togglePauseButtonVisibility(false);
        setCountdownValue(3);
        setOnColorScreen(false);
      } else {
        setCurrentColor("white");
        setCountdownActive(true);
        setResumed(true);
        setOnWhiteScreen(true);
        startCountdown();
      }; 
    };
  }, [paused]);

  useEffect(() => {
    if(pauseButtonHidden) {
      buttonRef.current.classList.add("hidden");
    } else {
      buttonRef.current.classList.remove("hidden");
    };
  }, [pauseButtonHidden]);

  useEffect(() => {
    if(countdownActive) {
      setPauseButtonHidden(true);
    } else {
      setPauseButtonHidden(false);
    };
  }, [countdownActive]);

  useEffect(() => {
    if(!paused) {
      const secondCDTimer = setTimeout(() => {
        if(countdownValue==1) {
          setPauseButtonHidden(true);
          setCountdownActive(false);
          setGameActive(true);
          setRepCount(repCount+1);
        } else {
          setCountdownValue(countdownValue-1);
          clearTimeout(secondCDTimer);
        };
      }, 1000);
    };
  }, [countdownValue]);

  useEffect(() => {
    if(gameActive) {
      setScreenColor();
    };
  }, [currentColor]);

  useEffect(() => {
    if(gameActive && !paused) {
      setOnColorScreen(true);
    };
  }, [repCount]);

  useEffect(() => {
    if(gameActive && onColorScreen && !paused) {
      setCurrentColor(pickColor());
      setOnWhiteScreen(false);
      const showColorTimer = setTimeout(() => {
        if(resumed) {
          setResumed(false);
        };
        setOnWhiteScreen(true);
      }, props.timeInterval*1000);
      return(() => {return clearTimeout(showColorTimer)});
    };
  }, [onColorScreen]);

  useEffect(() => {
    if(gameActive && onWhiteScreen && !paused && !resumed) {
      setOnColorScreen(false);
      if(repCount < props.totalReps) {
        setCurrentColor("white");
        const showWhiteTimer = setTimeout(() => {
          setRepCount(repCount+1);
        }, 1000);
        return(() => {return clearTimeout(showWhiteTimer)});
      } else {
        setGameActive(false);
      };
    };
  }, [onWhiteScreen]);

  const pickColor = () => {
    const colorIndex = Math.floor(Math.random() * (5-0 + 1) + 0);
    const colors = ["blue", "red", "yellow", "green", "purple", "orange"];
    return colors[colorIndex];
  };

  const setScreenColor = () => {
    screenRef.current.classList.replace(screenRef.current.classList[1], "bg-"+currentColor);
    buttonRef.current.setAttribute("style", "background-color: "+currentColor)
  };

  const startCountdown = () => {
    const firstCDTimer = setTimeout(() => {
      setCountdownValue(countdownValue-1); 
    }, 1000);
    return(() => { return(clearTimeout(firstCDTimer))});
  };

  const togglePauseState = () => {
    if(paused) {
      setPaused(false);
    } else {
      setPaused(true);
    };
  };

  const togglePauseButtonVisibility = (visible) => {
    if(visible) {
      buttonRef.current.classList.remove("hidden");
    } else {
      buttonRef.current.classList.add("hidden");
    };
  };

  const displayCountdown = (countdownActive) => {
    if(countdownActive) {
      return(
        <div id="countdown-area">
          <h1 ref={countdownRef}>{countdownValue}</h1>
        </div>
      );
    };
  };

  const displayPauseScreen = (isPaused) => {
    if(isPaused) {
      return <PauseScreen currentReps={repCount} totalReps={props.totalReps} timeInterval={props.timeInterval} togglePause={togglePauseState} quitGame={props.quitGame} />
    };
  };

  return(
    <div id="play-screen" className="game-screen bg-white" ref={screenRef}>
      <h2 className="reps game-text hidden">{repCount + " / " + props.totalReps}</h2>
      <div id="game-button-area">
        <PauseButton className="game-button hidden" onClick={togglePauseState} ref={buttonRef} />
      </div>
      {displayCountdown(countdownActive)}
      {displayPauseScreen(paused)}
    </div>
  );
};
