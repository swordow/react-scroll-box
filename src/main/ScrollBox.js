import React from 'react';
import {GenericScrollBox} from './GenericScrollBox';

/**
 * @class ScrollBox
 * @extends GenericScrollBox
 * @classdesc
 * Basic scrollable area that can hold arbitrary content.
 *
 * @property {React.Props} props Tag attributes. See {@link GenericScrollBox} properties.
 * @property {Array.<React.Element>} children Arbitrary set of children rendered inside scroll area.
 * @property {Function} [props.onViewportScroll]
 */
export function ScrollBox(props) {
  return (
    <GenericScrollBox {...props}>
      <div className="scroll-box-viewport">{props.children}</div>
    </GenericScrollBox>
  );
}
