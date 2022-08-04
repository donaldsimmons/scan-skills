export default function Button(props) {
  const onClickMethod = () => {
    if(props.onClick) {
      props.onClick();
    };
  };

  return(
    <button id={props.id} className={props.className} onClick={() => onClickMethod()}>
      {props.icon}
    </button>
  );
};
