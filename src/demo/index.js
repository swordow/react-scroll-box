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

    // Fast tracking
    fastTrack: FastTrack.GOTO,
    fastTrackDuration: 500,

    // Keyboard
    captureKeyboard: true,
    keyboardStepX: 30,
    keyboardStepY: 30,
    keyboardScrollDuration: 200,

    // Wheel
    wheelStepX: 30,
    wheelStepY: 30,
    propagateWheelScroll: true,
    swapWheelAxes: false,
    wheelScrollDuration: 100,

    // Touch
    //touchInertia: 20
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
                <p><kbd>nativeScroll</kbd></p>
                <p>
                  Use native scroll mechanism. By default, this flag is set to <code>true</code> on mobile platforms
                  and <code>false</code> on desktops but you can change it manually.
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
                    Platform-dependent
                  </label>
                </div>
            </fieldset>

              <fieldset className="form-group">
                <p><kbd>axes</kbd></p>
                <p>
                  Scroll axes that are allowed to be affected. If scroll axis is not allowed to be changed, corresponding
                  scroll offset would be constantly equal to 0.
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

              <fieldset className={classNames('form-group', {'form-group_disabled': props.nativeScroll})}>
                <p><kbd>hoverProximity</kbd></p>
                <p>
                  Maximum distance between cursor and scroll track border when track is considered to be hovered.
                  Useful when you want to have thin scrollbars but don't want make user aim precisely with cursor
                  to grab them.
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
                <p><kbd>disabled</kbd></p>
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
                <p><kbd>outset</kbd></p>
                <p>
                  Display scrollbars outside of scrollable area. On mobile devices when native scrollbar is used
                  this has no effect because scrollbars do not crop any space from viewport.
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

              <fieldset className={classNames('form-group', {'form-group_disabled': props.nativeScroll})}>
                <p><kbd>scrollMinX</kbd> <kbd>scrollMinY</kbd></p>
                <p>
                  Minimum scroll size to allow scrolling.
                </p>
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

              <fieldset className={classNames('form-group', {'form-group_disabled': props.nativeScroll})}>
                <p><kbd>fastTrack</kbd></p>
                <p>
                  Defines expected behavior when user clicks on scroll track.
                </p>
                <div className="radio">
                  <label>
                    <input type="radio"
                           name="fast-track"
                           disabled={props.nativeScroll}
                           checked={this.state.fastTrack === FastTrack.PAGING}
                           onChange={e => this.setState({fastTrack: FastTrack.PAGING})}/>
                    <code>FastTrack.PAGING</code>
                    <p><small>When user clicks on scrolling track, content is scrolled by one page in corresponding direction.</small></p>
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
                    <p><small>When user clicks on scrolling track, content is scrolled directly to the corresponding position.</small></p>
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

              <fieldset className={classNames('form-group', {'form-group_disabled': props.nativeScroll || this.state.fastTrack == FastTrack.OFF})}>
                <p><kbd>fastTrackDuration</kbd></p>
                <p>
                  Fast track animation duration.
                </p>
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
                <p><kbd>captureKeyboard</kbd></p>
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

              <fieldset className={classNames('form-group', {'form-group_disabled': !this.state.captureKeyboard})}>
                <p><kbd>keyboardStepX</kbd> <kbd>keyboardStepY</kbd></p>
                <p>
                  Keyboard scrolling distance.
                </p>
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

              <fieldset className={classNames('form-group', {'form-group_disabled': !this.state.captureKeyboard})}>
                <p><kbd>keyboardScrollDuration</kbd></p>
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

              <fieldset className={classNames('form-group', {'form-group_disabled': props.nativeScroll})}>
                <p><kbd>wheelStepX</kbd> <kbd>wheelStepY</kbd></p>
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

              <fieldset className={classNames('form-group', {'form-group_disabled': props.nativeScroll})}>
                <p><kbd>propagateWheelScroll</kbd></p>
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

              <fieldset className={classNames('form-group', {'form-group_disabled': props.nativeScroll})}>
                <p><kbd>swapWheelAxes</kbd></p>
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

              <fieldset className={classNames('form-group', {'form-group_disabled': props.nativeScroll})}>
                <p><kbd>wheelScrollDuration</kbd></p>
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

              <fieldset className={classNames('form-group', {'form-group_disabled': props.nativeScroll})}>
                <p><kbd>touchInertia</kbd></p>
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
