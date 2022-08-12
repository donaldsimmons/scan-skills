import React, { useRef } from 'react';
import Button from './button';

function PauseButton(props, ref) {
  const pauseIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em"><path d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2zm6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2z" fill="currentColor" /></svg>

  return(
    <Button id="pause-button" className={props.className} icon={pauseIcon} onClick={props.onClick} ref={ref} />
  );
};

export default React.forwardRef(PauseButton); 
