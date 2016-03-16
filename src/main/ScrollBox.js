import React from 'react';
import {GenericScrollBox} from './GenericScrollBox';

export function ScrollBox(props) {
  return (
    <GenericScrollBox {...props}>
      <div className="scroll-box__viewport">
        {props.children}
      </div>
    </GenericScrollBox>
  );
}
