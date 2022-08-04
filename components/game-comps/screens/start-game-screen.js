import React from 'react';
import Link from 'next/link';
import BackButton from '../../buttons/back-button';
import StartButton from '../../buttons/start-button';

const ButtonLink = React.forwardRef(({ onClick, href }, ref) => {
  return(
    <a href={href} onClick={onClick} ref={ref}>
      <BackButton className="start-screen-button" icon="BACK" />
    </a>
  );
});

export default function StartGameScreen(props) {
  /*
    TODO: add dynamic objective text for game modes in #game-objective
  */

  return(
    <div id="start-game-screen" className="game-screen">
      <div className="title-area">
        <h1>{props.gameMode}</h1>
      </div>
      <div id="game-info">
        <h2 id="reps">25</h2>
        <p id="game-objective">Placeholder for "game-objective" text</p>
      </div>
      <div id="button-area">
        <Link href="/" passHref>
          <ButtonLink />
        </Link>
        <StartButton className="start-screen-button start-button" icon="START" onClick={props.startGame} />
      </div>
    </div>
  );
};
