import React, { useState } from 'react';
import Head from 'next/head';
import GameArea from '../components/game-comps/game-area';

export default function Colors() {
  return(
    <>
      <Head>
        <title>Identify the Color</title>
      </Head>
      <GameArea gameMode="colors" />
    </>
  );
};
