import React from 'react';

interface RequestFormItemProps {
  title: string;
  className?: string;
}

const RequestFormStepPanel: React.FunctionComponent<RequestFormItemProps> = (props) => {
  return (
    <fieldset className={props.className}>
      <legend>{props.title}</legend>
      {props.children}
    </fieldset>
  )
}

export default RequestFormStepPanel;
