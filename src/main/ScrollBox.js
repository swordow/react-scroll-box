import React from 'react';
import {GenericScrollBox} from './GenericScrollBox';

/**
 * @class ScrollBox
 * @extends GenericScrollBox
 * @classdesc
 * Basic scrollable area that can hold arbitrary content.
 *
 * @property {React.Props} props Tag attributes. See {@link GenericScrollBox} properties.
 * @property {Array.<React.Element>} props.children Arbitrary set of children rendered inside scroll area.
 */
export class ScrollBox extends React.Component {

  getDelegate() {
    return this.refs.scroll;
  }

  render() {
    return (
      <GenericScrollBox {...this.props} ref="scroll">
        <div className="scroll-box-viewport">{this.props.children}</div>
      </GenericScrollBox>
    );
  }
}
