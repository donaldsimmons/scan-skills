import StartButton from "../../buttons/start-button";
import BackButton from "../../buttons/back-button";

export default function PauseScreen(props) {
  return(
    <div id="pause-screen">
      <div className="title-area">
        <h1>Paused</h1>
      </div>
      <div id="game-info">
        <h3 className="reps">{props.currentReps} / { props.totalReps}</h3>
        <h3 className="interval">7 seconds</h3>
      </div>
      <div id="button-area">
        <StartButton className="start-button" icon="RESUME" onClick={props.togglePause} />
        <BackButton icon="QUIT" onClick={props.quitGame}/>
      </div>
    </div>
  );
};
