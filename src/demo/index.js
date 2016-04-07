import React, {Component} from 'react';
import ReactDOM, {findDOMNode} from 'react-dom';
import classNames from 'classnames';

import './index.less';
import {ScrollBox} from '../main/ScrollBox';
import {GenericScrollBox, FastTrack, ScrollAxes} from '../main/GenericScrollBox';

class Demo extends Component {

  state = {
    nativeScroll: null,
    axes: ScrollAxes.XY,
    hoverProximity: 50,
    disabled: false,
    outset: true,
    scrollMinX: 2,
    scrollMinY: 2,

    captureHandleDrag: true,

    // Fast tracking
    fastTrack: FastTrack.GOTO,
    fastTrackDuration: 500,

    // Keyboard
    captureKeyboard: true,
    keyboardStepX: 30,
    keyboardStepY: 30,
    keyboardScrollDuration: 200,

    // Wheel
    captureWheel: true,
    wheelStepX: 30,
    wheelStepY: 30,
    propagateWheelScroll: true,
    swapWheelAxes: false,
    wheelScrollDuration: 100
  };

  render() {
    let {nativeScroll, ...props} = this.state;
    if (nativeScroll == null) {
      props.nativeScroll = 'orientation' in window;
    } else {
      props.nativeScroll = nativeScroll;
    }
    return (
      <div className="container">
        <h1>React <code>ScrollBox</code> Component</h1>
        <div className="row">

          <ScrollBox {...props} className="scroll-box_example scroll-box--wrapped">
            <div className="scroll-box__bg">

              <GenericScrollBox className="form-control scroll-box__nested-example scroll-box--wrapped">
                <textarea className="scroll-box__viewport"
                          defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."/>
              </GenericScrollBox>

            </div>
          </ScrollBox>

        </div>
        <div className="row">
          <form>

            <div className="col-md-4">

              <fieldset className="form-group">
                <p><a name="native-scroll"/><code className="prop-name">nativeScroll</code></p>
                <p>
                  Use native scrollbars. By default, this flag is set to <code>true</code> on mobile platforms and
                  <code>false</code> on desktops. Paltform is considered mobile if <code>window.orientation</code> is
                  defined.
                </p>
                <div className="radio">
                  <label>
                    <input type="radio"
                           name="native-scroll"
                           checked={this.state.nativeScroll === false}
                           onChange={e => this.setState({nativeScroll: false})}/>
                    Custom scrollbars
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio"
                           name="native-scroll"
                           checked={this.state.nativeScroll === true}
                           onChange={e => this.setState({nativeScroll: true})}/>
                    Native scrollbars
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio"
                           name="native-scroll"
                           checked={this.state.nativeScroll === null}
                           onChange={e => this.setState({nativeScroll: null})}/>
                    Platform-dependent scrollbars
                  </label>
                </div>
            </fieldset>

              <fieldset className="form-group">
                <p><code className="prop-name">axes</code></p>
                <p>
                  Scroll axes which are managed by scroll box. If scroll axis is not listed then corresponding scroll
                  offset would be constantly equal to 0.
                </p>
                <div className="radio">
                  <label>
                    <input type="radio"
                           name="axes"
                           checked={this.state.axes === ScrollAxes.X}
                           onChange={e => this.setState({axes: ScrollAxes.X})}/>
                    <code>ScrollAxes.X</code>
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio"
                           name="axes"
                           checked={this.state.axes === ScrollAxes.Y}
                           onChange={e => this.setState({axes: ScrollAxes.Y})}/>
                    <code>ScrollAxes.Y</code>
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio"
                           name="axes"
                           checked={this.state.axes === ScrollAxes.XY}
                           onChange={e => this.setState({axes: ScrollAxes.XY})}/>
                    <code>ScrollAxes.XY</code>
                  </label>
                </div>
              </fieldset>

              <fieldset className={classNames('form-group', {'form-group--disabled': props.nativeScroll})}>
                <p><code className="prop-name">hoverProximity</code></p>
                <p>
                  <a href="#native-scroll"
                     className={classNames({hidden: !props.nativeScroll})}>
                    <i className="fa fa-fw fa-warning fa--left"/>Requires custom scrollbars to be enabled
                  </a>
                </p>
                <p>
                  Maximum distance between cursor and scroll track edge where track is considered to be hovered. Useful
                  when you want to have thin scrollbars but don't want make user aim precisely to grab them. Set to 0 to
                  disable hover proximity detection.
                </p>
                <div className="input-group">
                  <input type="number"
                         disabled={props.nativeScroll}
                         className="form-control"
                         value={this.state.hoverProximity}
                         onChange={e => this.setState({hoverProximity: e.target.value})}/>
                  <div className="input-group-addon">px</div>
                </div>
              </fieldset>

              <fieldset className="form-group">
                <p><code className="prop-name">disabled</code></p>
                <div className="checkbox">
                  <label>
                    <input type="checkbox"
                           checked={this.state.disabled}
                           onChange={e => this.setState({disabled: e.target.checked})}/>
                    Disable scroll box
                  </label>
                </div>
              </fieldset>

              <fieldset className="form-group">
                <p><code className="prop-name">outset</code></p>
                <p>
                  Display scrollbars outside of scrollable area. On mobile devices when native scrollbars are used this
                  property has no effect because scrollbars have no widths and thus don't crop any space from viewport.
                </p>
                <div className="checkbox">
                  <label>
                    <input type="checkbox"
                           checked={this.state.outset}
                           onChange={e => this.setState({outset: e.target.checked})}/>
                    Ouset scrollbars
                  </label>
                </div>
              </fieldset>

              <fieldset className={classNames('form-group', {'form-group--disabled': props.nativeScroll})}>
                <p><code className="prop-name">scrollMinX</code> <code className="prop-name">scrollMinY</code></p>
                <p>
                  <a href="#native-scroll"
                     className={classNames({hidden: !props.nativeScroll})}>
                    <i className="fa fa-fw fa-warning fa--left"/>Requires custom scrollbars to be enabled
                  </a>
                </p>
                <p>Minimum scrollable disatnce to allow scrolling.</p>
                <div className="input-group">
                  <div className="input-group-addon">X</div>
                  <input type="number"
                         disabled={props.nativeScroll}
                         className="form-control"
                         value={this.state.scrollMinX}
                         onChange={e => this.setState({scrollMinX: e.target.value})}/>
                  <div className="input-group-addon">px</div>
                </div>
                <div className="input-group">
                  <div className="input-group-addon">Y</div>
                  <input type="number"
                         disabled={props.nativeScroll}
                         className="form-control"
                         value={this.state.scrollMinY}
                         onChange={e => this.setState({scrollMinY: e.target.value})}/>
                  <div className="input-group-addon">px</div>
                </div>
              </fieldset>

            </div>

            <div className="col-md-4">

              <fieldset className={classNames('form-group', {'form-group--disabled': props.nativeScroll})}>
                <p><a name="fast-track"/><code className="prop-name">fastTrack</code></p>
                <p>
                  <a href="#native-scroll"
                     className={classNames({hidden: !props.nativeScroll})}>
                    <i className="fa fa-fw fa-warning fa--left"/>Requires custom scrollbars to be enabled
                  </a>
                </p>
                <p>Defines expected behavior when user clicks on scroll track.</p>
                <div className="radio">
                  <label>
                    <input type="radio"
                           name="fast-track"
                           disabled={props.nativeScroll}
                           checked={this.state.fastTrack === FastTrack.PAGING}
                           onChange={e => this.setState({fastTrack: FastTrack.PAGING})}/>
                    <code>FastTrack.PAGING</code>
                    <p><small>Content is scrolled by one page.</small></p>
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio"
                           name="fast-track"
                           disabled={props.nativeScroll}
                           checked={this.state.fastTrack === FastTrack.GOTO}
                           onChange={e => this.setState({fastTrack: FastTrack.GOTO})}/>
                    <code>FastTrack.GOTO</code>
                    <p><small>Content is scrolled directly to the corresponding position.</small></p>
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio"
                           name="fast-track"
                           disabled={props.nativeScroll}
                           checked={this.state.fastTrack === FastTrack.OFF}
                           onChange={e => this.setState({fastTrack: FastTrack.OFF})}/>
                    <code>FastTrack.OFF</code>
                    <p><small>Prevent fast tracking.</small></p>
                  </label>
                </div>
              </fieldset>

              <fieldset className={classNames('form-group', {'form-group--disabled': props.nativeScroll || this.state.fastTrack == FastTrack.OFF})}>
                <p><code className="prop-name">fastTrackDuration</code></p>
                <p>
                  <a href="#native-scroll"
                     className={classNames({hidden: !props.nativeScroll})}>
                    <i className="fa fa-fw fa-warning fa--left"/>Requires custom scrollbars to be enabled
                  </a>
                </p>
                <p>
                  <a href="#fast-track"
                     className={classNames({hidden: this.state.fastTrack != FastTrack.OFF})}>
                    <i className="fa fa-fw fa-warning fa--left"/>Requires fast track to be enabled
                  </a>
                </p>
                <p>Animation duration of fast track smooth scroll.</p>
                <div className="input-group">
                  <input type="number"
                         disabled={props.nativeScroll}
                         className="form-control"
                         value={this.state.fastTrackDuration}
                         onChange={e => this.setState({fastTrackDuration: e.target.value})}/>
                  <div className="input-group-addon">msec</div>
                </div>
              </fieldset>

              <fieldset className="form-group">
                <p><code className="prop-name">captureKeyboard</code></p>
                <p>
                  Use keyboard for scrolling when scroll box viewport or its nested content is focused. Keyboard is
                  never captured for text input elements placed in scroll box.
                </p>
                <div className="checkbox">
                  <label>
                    <input type="checkbox"
                           checked={this.state.captureKeyboard}
                           onChange={e => this.setState({captureKeyboard: e.target.checked})}/>
                    Use keyboard
                  </label>
                </div>
              </fieldset>

              <fieldset className={classNames('form-group', {'form-group--disabled': !this.state.captureKeyboard})}>
                <p><code className="prop-name">keyboardStepX</code> <code className="prop-name">keyboardStepY</code></p>
                <p>
                  <a href="#native-scroll"
                     className={classNames({hidden: !props.nativeScroll})}>
                    <i className="fa fa-fw fa-warning fa--left"/>Requires custom scrollbars to be enabled
                  </a>
                </p>
                <p>Keyboard scrolling distance.</p>
                <div className="input-group">
                  <div className="input-group-addon">X</div>
                  <input type="number"
                         className="form-control"
                         value={this.state.keyboardStepX}
                         onChange={e => this.setState({keyboardStepX: e.target.value})}/>
                  <div className="input-group-addon">px</div>
                </div>
                <div className="input-group">
                  <div className="input-group-addon">Y</div>
                  <input type="number"
                         className="form-control"
                         value={this.state.keyboardStepY}
                         onChange={e => this.setState({keyboardStepY: e.target.value})}/>
                  <div className="input-group-addon">px</div>
                </div>
              </fieldset>

              <fieldset className={classNames('form-group', {'form-group--disabled': !this.state.captureKeyboard})}>
                <p><code className="prop-name">keyboardScrollDuration</code></p>
                <p>
                  <a href="#native-scroll"
                     className={classNames({hidden: !props.nativeScroll})}>
                    <i className="fa fa-fw fa-warning fa--left"/>Requires custom scrollbars to be enabled
                  </a>
                </p>
                <p>
                  Keyboard smooth scrolling animation duration.
                </p>
                <div className="input-group">
                  <input type="number"
                         className="form-control"
                         value={this.state.keyboardScrollDuration}
                         onChange={e => this.setState({keyboardScrollDuration: e.target.value})}/>
                  <div className="input-group-addon">msec</div>
                </div>
              </fieldset>

            </div>

            <div className="col-md-4">

              <fieldset className={classNames('form-group', {'form-group--disabled': props.nativeScroll})}>
                <p><code className="prop-name">wheelStepX</code> <code className="prop-name">wheelStepY</code></p>
                <p>
                  <a href="#native-scroll"
                     className={classNames({hidden: !props.nativeScroll})}>
                    <i className="fa fa-fw fa-warning fa--left"/>Requires custom scrollbars to be enabled
                  </a>
                </p>
                <p>
                  Wheel scrolling distance.
                </p>
                <div className="input-group">
                  <div className="input-group-addon">X</div>
                  <input type="number"
                         disabled={props.nativeScroll}
                         className="form-control"
                         value={this.state.wheelStepX}
                         onChange={e => this.setState({wheelStepX: e.target.value})}/>
                  <div className="input-group-addon">px</div>
                </div>
                <div className="input-group">
                  <div className="input-group-addon">Y</div>
                  <input type="number"
                         disabled={props.nativeScroll}
                         className="form-control"
                         value={this.state.wheelStepY}
                         onChange={e => this.setState({wheelStepY: e.target.value})}/>
                  <div className="input-group-addon">px</div>
                </div>
              </fieldset>

              <fieldset className={classNames('form-group', {'form-group--disabled': props.nativeScroll})}>
                <p><code className="prop-name">propagateWheelScroll</code></p>
                <p>
                  <a href="#native-scroll"
                     className={classNames({hidden: !props.nativeScroll})}>
                    <i className="fa fa-fw fa-warning fa--left"/>Requires custom scrollbars to be enabled
                  </a>
                </p>
                <p>
                  Propagate wheel scroll event to parent if scrolling reached maximum or minimum value.
                </p>
                <div className="checkbox">
                  <label>
                    <input type="checkbox"
                           disabled={props.nativeScroll}
                           checked={this.state.propagateWheelScroll}
                           onChange={e => this.setState({propagateWheelScroll: e.target.checked})}/>
                    Propagate wheel scroll
                  </label>
                </div>
              </fieldset>

              <fieldset className={classNames('form-group', {'form-group--disabled': props.nativeScroll})}>
                <p><code className="prop-name">swapWheelAxes</code></p>
                <p>
                  <a href="#native-scroll"
                     className={classNames({hidden: !props.nativeScroll})}>
                    <i className="fa fa-fw fa-warning fa--left"/>Requires custom scrollbars to be enabled
                  </a>
                </p>
                <div className="checkbox">
                  <label>
                    <input type="checkbox"
                           disabled={props.nativeScroll}
                           checked={this.state.swapWheelAxes}
                           onChange={e => this.setState({swapWheelAxes: e.target.checked})}/>
                    Swap wheel scrolling axes
                  </label>
                </div>
              </fieldset>

              <fieldset className={classNames('form-group', {'form-group--disabled': props.nativeScroll})}>
                <p><code className="prop-name">wheelScrollDuration</code></p>
                <p>
                  <a href="#native-scroll"
                     className={classNames({hidden: !props.nativeScroll})}>
                    <i className="fa fa-fw fa-warning fa--left"/>Requires custom scrollbars to be enabled
                  </a>
                </p>
                <p>
                  Wheel smooth scrolling animation duration.
                </p>
                <div className="input-group">
                  <input type="number"
                         disabled={props.nativeScroll}
                         className="form-control"
                         value={this.state.wheelScrollDuration}
                         onChange={e => this.setState({wheelScrollDuration: e.target.value})}/>
                  <div className="input-group-addon">msec</div>
                </div>
              </fieldset>

              <fieldset className={classNames('form-group', {'form-group--disabled': props.nativeScroll})}>
                <p><code className="prop-name">touchInertia</code></p>
                <p>
                  <a href="#native-scroll"
                     className={classNames({hidden: !props.nativeScroll})}>
                    <i className="fa fa-fw fa-warning fa--left"/>Requires custom scrollbars to be enabled
                  </a>
                </p>
                <p>
                  Sensivity of touch inertia. Greater values cause longer distance the content would travel after touch
                  finishes. Set to 0 to disable intertia.
                </p>
                <input type="number"
                       disabled={props.nativeScroll}
                       className="form-control"
                       value={this.state.touchInertia}
                       onChange={e => this.setState({touchInertia: e.target.value})}/>
              </fieldset>

            </div>

          </form>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('demo'));
