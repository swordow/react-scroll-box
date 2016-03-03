import {Component} from 'react';
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
export class ScrollBox extends Component {

  render() {
    return (
      <GenericScrollBox {...this.props}>
        <div className="scroll-viewport">{this.props.children}</div>
      </GenericScrollBox>
    );
  }
}
