import React from 'react';
import { withPreventEvent } from '../../hofs/dom';

type ControlProp = { disable: boolean, onClick: () => void }

interface RequestFromStepControlProps {
  nextControl?: ControlProp;
  prevControl?: ControlProp;
  restartControl?: ControlProp;
}

const RequestFromStepControl = (props: RequestFromStepControlProps) => (
  <div>
    {props.prevControl && (
      <button 
        type="button"
        disabled={props.prevControl.disable}
        onClick={withPreventEvent(props.prevControl.onClick)}>
        Back
      </button>
    )}
    {props.nextControl && (
      <button 
        type="button"
        disabled={props.nextControl.disable}
        onClick={withPreventEvent(props.nextControl.onClick)}>
        Next
      </button>
    )}
    {props.restartControl && (
      <button 
        type="button"
        disabled={props.restartControl.disable}
        onClick={withPreventEvent(props.restartControl.onClick)}>
        Restart
      </button>
    )}
  </div>
);


export default RequestFromStepControl;