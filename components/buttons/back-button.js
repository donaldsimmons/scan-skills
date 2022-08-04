import Button from './button';

export default function BackButton(props) {
  return(
    <Button id="back-button" className={props.className} icon={props.icon} />
  );
};
