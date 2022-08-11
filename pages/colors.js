import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import GameArea from '../components/game-comps/game-area';

export default function Colors() {
  const [settings, setSettings] = useState({
    "mode": "",
    "reps": "",
    "interval": ""
  });
  const router = useRouter();
  const query = router.query;

  useEffect(() => {
    const localMode = window.localStorage.getItem("mode");
    const localReps = window.localStorage.getItem("reps");
    const localInterval = window.localStorage.getItem("interval");

    if(localMode === null) {
      setSettings({"mode": query.mode, "reps": query.reps, "interval": query.interval});
      window.localStorage.setItem("mode", query.mode);
      window.localStorage.setItem("reps", query.reps);
      window.localStorage.setItem("interval", query.interval);
    }else{
      setSettings(({
        "mode": localMode,
        "reps": localReps,
        "interval": localInterval
      }));
    };
  }, []);

  return(
    <>
      <Head>
        <title>Identify the Color</title>
      </Head>
      <GameArea gameMode={settings["mode"]} totalReps={settings["reps"]} timeInterval={settings["interval"]} />
    </>
  );
};
