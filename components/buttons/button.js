import React, { useRef } from 'react';

function Button(props, ref) {
  const onClickMethod = () => {
    if(props.onClick) {
      props.onClick();
    };
  };

  return(
    <button id={props.id} className={props.className} onClick={() => onClickMethod()} ref={ref}>
      {props.icon}
    </button>
  );
};

export default React.forwardRef(Button);
