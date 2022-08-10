import Button from './button';

export default function StartButton(props) {
  return(
    <Button id="start-button" className={props.className} icon={props.icon} onClick={props.onClick} />
  );
};
