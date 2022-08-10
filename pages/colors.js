import React, { useState } from 'react';
import Head from 'next/head';
import GameArea from '../components/game-comps/game-area';

export default function Colors() {
  let totalReps = 5;
  let timeInterval = 3;

  return(
    <>
      <Head>
        <title>Identify the Color</title>
      </Head>
      <GameArea gameMode="colors" totalReps={totalReps} timeInterval={timeInterval} />
    </>
  );
};
