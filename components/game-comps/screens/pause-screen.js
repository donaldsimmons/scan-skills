import StartButton from "../../buttons/start-button";

export default function PauseScreen(props) {
  return(
    <div id="pause-screen">
      <div className="title-area">
        <h1>Paused</h1>
      </div>
      <h3 className="rep-counter">{props.currentReps} / { props.totalReps}</h3>
      <StartButton className="start-button" icon="RESUME" onClick={props.togglePause} />
    </div>
  );
};
