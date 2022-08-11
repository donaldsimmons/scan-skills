import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import StartButton from '../components/buttons/start-button';

const StartButtonLink = React.forwardRef(({ onClick, href }, ref) => {
  return(
    <a href={href} onClick={onClick} ref={ref}>
      <StartButton icon="START" />
    </a>
  );
});

export default function Home() {
  const [gameSettings, setGameSettings] = useState({
    "mode": "colors",
    "reps": 25,
    "interval": 5
  });

  useEffect(()=> {
    window.localStorage.clear();
  });

  const updateMode = (e) => {
    setGameSettings((prevState) => ({...prevState, "mode": e.target.value}));
  }

  const updateReps = (e) => {
    setGameSettings((prevState) => ({...prevState, "reps": e.target.value}));
  }

  const updateInterval = (e) => {
    setGameSettings((prevState) => ({...prevState, "interval": e.target.value}));
  };

  return (
    <div className={""}>
      <Head>
        <title>ScanSkills | Train Your Scanning Skills</title>
      </Head>

      <main id="home-page" className="title-screen">
        <div className="title-area">
          <h1>ScanSkills</h1>
        </div>
        <div id="game-selection-area">
          <div id="selection-area">
            <h2>Game Settings</h2>
            <div id="mode-select">
              <label>Game Mode</label>
              <select value={gameSettings["mode"]} onChange={updateMode}>
                <option value="colors">Colors</option>
              </select>
            </div>
            <div id="rep-slider" className="settings-slider">
              <label>Reps</label>
              <input type="range" min="5" max="50" step="5" value={gameSettings["reps"]} className="slider" onChange={updateReps} />
              <label>{gameSettings["reps"]}</label>
            </div>
            <div id="interval-slider" className="settings-slider">
              <label>Time Interval</label>
              <input type="range" min="1" max="10" step="1" value={gameSettings["interval"]} className="slider" onChange={updateInterval} />
              <label>{gameSettings["interval"]}</label>
            </div>
          </div>
          <div id="description-area">
            <h2>Description</h2>
            <p>Random colors will flash periodically at a set interval. Try to identify each color by scanning between reps of your given exercise.</p>
            <p>Time Interval: Adjust the length of time (in seconds) a single color will remain on screen.</p>
          </div>
        </div>
        <div id="button-area">
          <Link href={{
              pathname: "/"+gameSettings["mode"],
              query: {
                "mode": gameSettings["mode"],
                "reps": gameSettings["reps"],
                "interval": gameSettings["interval"]
              }
            }} as={"/"+gameSettings["mode"]} passHref>
            <StartButtonLink icon="START" />
          </Link>
        </div>
      </main>
    </div>
  )
}
